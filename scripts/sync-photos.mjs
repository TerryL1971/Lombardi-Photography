#!/usr/bin/env node
// scripts/sync-photos.mjs
//
// Syncs the Lightroom Classic "Hard Drive" publish folder to the website.
//
//   npm run sync                 # sync from the default publish folder
//   npm run sync -- --dir <path> # sync from another folder
//   npm run sync -- --dry-run    # report what would change, touch nothing
//   npm run sync -- --no-prune   # don't delete unused images from Cloudinary
//
// Each sub-folder of the publish folder is one collection (Lightroom names it
// after the published collection). Every new/changed JPEG is resized to a
// 2048px master and uploaded once to Cloudinary, which serves the grid (1000px)
// and lightbox (2048px) sizes from it. data/collections.json is updated; your
// ordering, covers, titles and hidden flags (set via /arrange) are preserved.
//
// Needs CLOUDINARY_URL in .env.local (Cloudinary dashboard → API Keys →
// "API environment variable": cloudinary://<key>:<secret>@<cloud-name>).

import { createHash } from 'node:crypto'
import { existsSync } from 'node:fs'
import { readdir, readFile, writeFile } from 'node:fs/promises'
import { homedir } from 'node:os'
import { basename, extname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { v2 as cloudinary } from 'cloudinary'
import exifr from 'exifr'
import sharp from 'sharp'

const args = process.argv.slice(2)
const has = (f) => args.includes(f)
const opt = (f) => {
  const i = args.indexOf(f)
  return i >= 0 ? args[i + 1] : undefined
}

const DATA_FILE = fileURLToPath(new URL('../data/collections.json', import.meta.url))
const DIR =
  opt('--dir') ?? process.env.LR_PUBLISH_DIR ?? join(homedir(), 'Pictures', 'PictureItByTerry Website')
const DRY = has('--dry-run')
const PRUNE = !has('--no-prune')
const MASTER_PX = 2048
const ROOT = 'picture-it' // Cloudinary folder for all site photos
const CONCURRENCY = 4

/** Delivery URLs: Cloudinary resizes and picks WebP/AVIF per browser (cached after first view). */
function deliveryUrl(cloud, publicId, version, width) {
  return `https://res.cloudinary.com/${cloud}/image/upload/c_limit,w_${width},f_auto,q_auto/v${version}/${publicId}`
}

// ---------------------------------------------------------------------------

function slugify(s) {
  return s
    .replace(/ß/g, 'ss')
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function text(v) {
  if (!v) return ''
  if (typeof v === 'string') return v.trim()
  if (Array.isArray(v)) return text(v[0])
  if (typeof v === 'object' && 'value' in v) return text(v.value)
  return ''
}

async function pool(items, n, fn) {
  let i = 0
  await Promise.all(
    Array.from({ length: Math.min(n, items.length) }, async () => {
      while (i < items.length) await fn(items[i++])
    }),
  )
}

async function readMeta(buf) {
  try {
    const m = (await exifr.parse(buf, { xmp: true, iptc: true, tiff: true, exif: true })) ?? {}
    const taken = m.DateTimeOriginal ?? m.CreateDate ?? null
    return {
      title: text(m.title) || text(m.ObjectName) || text(m.Headline),
      caption: text(m.description) || text(m.Caption) || text(m.ImageDescription),
      takenAt: taken instanceof Date && !Number.isNaN(+taken) ? taken.toISOString() : null,
    }
  } catch {
    return { title: '', caption: '', takenAt: null }
  }
}

async function master(buf) {
  const { data, info } = await sharp(buf)
    .rotate()
    .resize({ width: MASTER_PX, height: MASTER_PX, fit: 'inside', withoutEnlargement: true })
    .jpeg({ quality: 88, mozjpeg: true })
    .toBuffer({ resolveWithObject: true })
  return { data, width: info.width, height: info.height }
}

function upload(publicId, data) {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ public_id: publicId, overwrite: true, resource_type: 'image' }, (err, res) =>
        err ? reject(err) : resolve(res),
      )
      .end(data)
  })
}

// ---------------------------------------------------------------------------

async function main() {
  if (!existsSync(DIR)) {
    console.error(`✖ Publish folder not found: ${DIR}\n  Pass --dir <path> or set LR_PUBLISH_DIR.`)
    process.exit(1)
  }
  if (!DRY && !process.env.CLOUDINARY_URL) {
    console.error('✖ CLOUDINARY_URL missing. Add it to .env.local (see the top of this script).')
    process.exit(1)
  }
  const cloud = cloudinary.config().cloud_name

  const data = JSON.parse(await readFile(DATA_FILE, 'utf8'))
  const ignore = new Set(data.ignore ?? [])
  const folders = (await readdir(DIR, { withFileTypes: true }))
    .filter((d) => d.isDirectory() && !d.name.startsWith('.') && !ignore.has(d.name))
    .map((d) => d.name)
    .sort((a, b) => a.localeCompare(b))

  if (folders.length === 0) {
    console.error(`✖ No collection folders in ${DIR}. Nothing to do (and nothing deleted).`)
    process.exit(1)
  }

  console.log(`Publish folder: ${DIR}\n${folders.length} collection folder(s)${DRY ? '  [dry run]' : ''}\n`)

  const totals = { added: 0, updated: 0, removed: 0, unchanged: 0 }
  const jobs = []

  for (const folder of folders) {
    let col = data.collections.find((c) => c.source === folder)
    if (!col) {
      let slug = slugify(folder.replace(/[_\s]+$/, ''))
      while (data.collections.some((c) => c.slug === slug)) slug += '-2'
      col = { slug, source: folder, title: folder.replace(/[_\s]+$/, ''), year: 0, cover: null, photos: [] }
      data.collections.push(col)
      console.log(`  + new collection "${col.title}" (${slug})`)
    }

    const files = (await readdir(join(DIR, folder)))
      .filter((f) => !f.startsWith('.') && /\.jpe?g$/i.test(f))
      .sort((a, b) => a.localeCompare(b))

    const existing = new Map(col.photos.map((p) => [p.id, p]))
    const seen = new Set()
    const fresh = []
    const stats = { added: 0, updated: 0, unchanged: 0 }

    for (const file of files) {
      const id = `${col.slug}-${slugify(basename(file, extname(file)))}`
      seen.add(id)
      jobs.push(async () => {
        const buf = await readFile(join(DIR, folder, file))
        const hash = createHash('sha1').update(buf).digest('hex').slice(0, 12)
        const prev = existing.get(id)
        if (prev && prev.hash === hash) {
          stats.unchanged++
          return
        }
        const meta = await readMeta(buf)
        const photo = {
          id,
          file,
          hash,
          width: 0,
          height: 0,
          title: meta.title,
          caption: meta.caption,
          takenAt: meta.takenAt,
          ...(prev?.hidden ? { hidden: true } : {}),
          thumb: '',
          large: '',
        }
        if (!DRY) {
          const m = await master(buf)
          const res = await upload(`${ROOT}/${col.slug}/${slugify(basename(file, extname(file)))}`, m.data)
          photo.publicId = res.public_id
          photo.thumb = deliveryUrl(cloud, res.public_id, res.version, 1000)
          photo.large = deliveryUrl(cloud, res.public_id, res.version, MASTER_PX)
          photo.width = res.width
          photo.height = res.height
        }
        if (prev) {
          Object.assign(prev, photo)
          stats.updated++
        } else {
          fresh.push(photo)
          stats.added++
        }
      })
    }

    // Runs after every upload job has finished (see below).
    col._finish = () => {
      const removed = col.photos.filter((p) => !seen.has(p.id)).length
      // Keep your arranged order; append new photos by capture time.
      fresh.sort((a, b) => (a.takenAt ?? a.file).localeCompare(b.takenAt ?? b.file))
      col.photos = [...col.photos.filter((p) => seen.has(p.id)), ...fresh]
      if (col.cover && !col.photos.some((p) => p.id === col.cover)) col.cover = null
      if (!col.year) {
        const years = col.photos.map((p) => p.takenAt?.slice(0, 4)).filter(Boolean)
        const mode = years.sort((a, b) => years.filter((y) => y === b).length - years.filter((y) => y === a).length)[0]
        col.year = mode ? Number(mode) : new Date().getFullYear()
      }
      totals.added += stats.added
      totals.updated += stats.updated
      totals.unchanged += stats.unchanged
      totals.removed += removed
      console.log(
        `  ${col.title.padEnd(26)} ${String(col.photos.length).padStart(4)} photos` +
          `   +${stats.added} ~${stats.updated} -${removed}`,
      )
    }
  }

  let done = 0
  const total = jobs.length
  await pool(jobs, CONCURRENCY, async (job) => {
    await job()
    done++
    if (!DRY && done % 25 === 0) process.stdout.write(`  …${done}/${total}\r`)
  })

  console.log('')
  for (const col of data.collections) {
    if (col._finish) col._finish()
    delete col._finish
  }

  const missing = data.collections.filter((c) => !folders.includes(c.source) && c.photos.length)
  for (const c of missing) console.log(`  ! "${c.source}" has no publish folder — left unchanged`)

  if (DRY) {
    console.log(`\nDry run: +${totals.added} ~${totals.updated} -${totals.removed} (unchanged ${totals.unchanged}). Nothing written.`)
    return
  }

  await writeFile(DATA_FILE, JSON.stringify(data, null, 2) + '\n')

  let pruned = 0
  if (PRUNE) {
    const keep = new Set(data.collections.flatMap((c) => c.photos.map((p) => p.publicId)))
    let cursor
    const stale = []
    do {
      const page = await cloudinary.api.resources({ type: 'upload', prefix: `${ROOT}/`, max_results: 500, next_cursor: cursor })
      for (const r of page.resources) if (!keep.has(r.public_id)) stale.push(r.public_id)
      cursor = page.next_cursor
    } while (cursor)
    for (let i = 0; i < stale.length; i += 100) await cloudinary.api.delete_resources(stale.slice(i, i + 100))
    pruned = stale.length
  }

  console.log(
    `\n✔ Done: +${totals.added} added, ~${totals.updated} updated, -${totals.removed} removed, ` +
      `${totals.unchanged} unchanged${PRUNE ? `, ${pruned} unused image(s) deleted from Cloudinary` : ''}.` +
      `\n  Review on /arrange (npm run dev), then commit data/collections.json and push to publish.`,
  )
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})

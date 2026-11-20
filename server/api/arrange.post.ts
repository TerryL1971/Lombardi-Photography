// server/api/arrange.post.ts — saves /arrange edits back to data/collections.json (local dev only)
import { writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import type { SiteData } from '../../app/types/gallery'

export default defineEventHandler(async (event) => {
  if (!import.meta.dev) throw createError({ statusCode: 404 })
  const body = await readBody<SiteData>(event)
  if (!body || !Array.isArray(body.collections) || !Array.isArray(body.ignore)) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid data' })
  }
  // Guard against accidentally saving a truncated list.
  const current = await loadSiteData()
  const before = current.collections.reduce((n, c) => n + c.photos.length, 0)
  const after = body.collections.reduce((n, c) => n + c.photos.length, 0)
  if (after !== before) {
    throw createError({ statusCode: 409, statusMessage: 'Photo count changed — reload /arrange and try again.' })
  }
  await writeFile(join(process.cwd(), 'data', 'collections.json'), JSON.stringify(body, null, 2) + '\n')
  return { ok: true }
})

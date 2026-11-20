// server/utils/site-data.ts
// Reads data/collections.json (bundled as a Nitro server asset; read live from
// disk in dev, so /arrange edits show up immediately) and shapes it for pages.
import type {
  CollectionDetail,
  CollectionSummary,
  Photo,
  SiteData,
  StoredCollection,
  StoredPhoto,
} from '../../app/types/gallery'

export async function loadSiteData(): Promise<SiteData> {
  const raw = await useStorage('assets:data').getItem<SiteData | string>('collections.json')
  const data = typeof raw === 'string' ? (JSON.parse(raw) as SiteData) : raw
  if (!data) throw createError({ statusCode: 500, statusMessage: 'collections.json missing' })
  return data
}

const visiblePhotos = (c: StoredCollection) => c.photos.filter((p) => !p.hidden && p.thumb)

/** Collections that are not hidden and have at least one published photo, in arranged order. */
export function visibleCollections(data: SiteData) {
  return data.collections.filter((c) => !c.hidden && visiblePhotos(c).length > 0)
}

export function toPhoto(c: StoredCollection, p: StoredPhoto, i: number): Photo {
  const title = p.title || `No. ${i + 1}`
  return {
    id: p.id,
    collection: c.slug,
    collectionTitle: c.title,
    year: c.year,
    title,
    caption: p.caption,
    alt: p.caption || `${c.title} ${c.year}, ${title}. Photograph by Terry C Lombardi.`,
    width: p.width,
    height: p.height,
    thumb: p.thumb,
    large: p.large,
  }
}

export function summarize(c: StoredCollection): CollectionSummary {
  const photos = visiblePhotos(c)
  const coverIdx = Math.max(0, photos.findIndex((p) => p.id === c.cover))
  const cover = toPhoto(c, photos[coverIdx]!, coverIdx)
  return {
    slug: c.slug,
    title: c.title,
    year: c.year,
    count: photos.length,
    cover: { thumb: cover.thumb, width: cover.width, height: cover.height, alt: cover.alt },
  }
}

export function detail(data: SiteData, slug: string): CollectionDetail | null {
  const list = visibleCollections(data)
  const i = list.findIndex((c) => c.slug === slug)
  if (i === -1) return null
  const c = list[i]!
  const link = (x?: StoredCollection) => (x ? { slug: x.slug, title: x.title } : null)
  return {
    ...summarize(c),
    photos: visiblePhotos(c).map((p, n) => toPhoto(c, p, n)),
    prev: link(list[i - 1]),
    next: link(list[i + 1]),
  }
}

export function findPhoto(data: SiteData, id: string) {
  for (const c of visibleCollections(data)) {
    const photos = visiblePhotos(c)
    const i = photos.findIndex((p) => p.id === id)
    if (i !== -1) {
      return {
        photo: toPhoto(c, photos[i]!, i),
        collection: summarize(c),
        index: i,
        related: [1, 2, 3]
          .map((k) => photos[(i + k) % photos.length]!)
          .filter((p, k, arr) => p.id !== id && arr.findIndex((q) => q.id === p.id) === k)
          .map((p) => toPhoto(c, p, photos.indexOf(p))),
      }
    }
  }
  return null
}

/** The large rendition of the photo chosen as the home-page background. */
export function homeBackground(data: SiteData) {
  for (const c of data.collections) {
    const p = c.photos.find((x) => x.id === data.homeBackground && x.large)
    if (p) return { url: p.large, width: p.width, height: p.height }
  }
  return null
}

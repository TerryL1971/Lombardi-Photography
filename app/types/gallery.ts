// app/types/gallery.ts

/** A photo as the site sees it (built server-side from data/collections.json). */
export interface Photo {
  id: string
  collection: string
  collectionTitle: string
  year: number
  /** Lightroom title, or "No. n" (position in the collection) when none is set. */
  title: string
  /** Lightroom caption (may be empty). */
  caption: string
  alt: string
  /** Pixel size of the large rendition. */
  width: number
  height: number
  /** ~1000px rendition for grids. */
  thumb: string
  /** ~2048px rendition for the lightbox / detail page. */
  large: string
}

export interface CollectionSummary {
  slug: string
  title: string
  year: number
  count: number
  cover: Pick<Photo, 'thumb' | 'width' | 'height' | 'alt'>
}

export interface CollectionDetail extends CollectionSummary {
  photos: Photo[]
  prev: Pick<CollectionSummary, 'slug' | 'title'> | null
  next: Pick<CollectionSummary, 'slug' | 'title'> | null
}

export interface PrintOption {
  size: string
  finish: string
  price: number
}

export interface CartLine {
  /** `${photoId}__${size}__${finish}` */
  key: string
  photoId: string
  title: string
  image: string
  size: string
  finish: string
  unitPrice: number
  quantity: number
}

/* ---- Raw data file shape (data/collections.json) ---- */

export interface StoredPhoto {
  id: string
  file: string
  hash: string
  /** Cloudinary public ID (picture-it/<collection>/<file>). */
  publicId?: string
  width: number
  height: number
  title: string
  caption: string
  takenAt: string | null
  hidden?: boolean
  thumb: string
  large: string
}

export interface StoredCollection {
  slug: string
  /** Folder name written by the Lightroom publish service. */
  source: string
  title: string
  year: number
  cover: string | null
  hidden?: boolean
  photos: StoredPhoto[]
}

export interface SiteData {
  homeBackground: string | null
  /** Publish folders the sync script should skip. */
  ignore: string[]
  collections: StoredCollection[]
}

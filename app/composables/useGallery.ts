// app/composables/useGallery.ts
import galleryData from '~~/data/gallery.json'
import type { Category, Photo } from '~/types/gallery'

const photos = galleryData as Photo[]

export const CATEGORIES: Category[] = ['Cities', 'Streets', 'Gardens']

/**
 * Static gallery access. The dataset is a bundled JSON file (no CMS) — this
 * composable is the single place the rest of the app reads it from.
 */
export function useGallery() {
  const all = (): Photo[] => photos

  const byCategory = (category: Category | 'All'): Photo[] =>
    category === 'All' ? photos : photos.filter((p) => p.category === category)

  const featured = (limit = 6): Photo[] =>
    photos.filter((p) => p.featured).slice(0, limit)

  const bySlug = (slug: string): Photo | undefined =>
    photos.find((p) => p.slug === slug)

  const priceRange = (photo: Photo): { min: number; max: number } => {
    const prices = photo.availableSizes.map((s) => s.price)
    return { min: Math.min(...prices), max: Math.max(...prices) }
  }

  /** Other photos in the same category, for "More from this series". */
  const related = (photo: Photo, limit = 3): Photo[] =>
    photos
      .filter((p) => p.category === photo.category && p.id !== photo.id)
      .slice(0, limit)

  return { all, byCategory, featured, bySlug, priceRange, related, CATEGORIES }
}

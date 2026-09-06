// app/types/gallery.ts
export type Category = 'Cities' | 'Streets' | 'Gardens'

export interface PrintOption {
  size: string
  finish: string
  price: number
}

export interface Photo {
  id: string
  slug: string
  title: string
  category: Category
  year: number
  location: string
  image: string
  alt: string
  orientation: 'portrait' | 'landscape'
  featured: boolean
  description: string
  availableSizes: PrintOption[]
}

export interface CartLine {
  /** `${photoId}__${size}__${finish}` */
  key: string
  photoId: string
  slug: string
  title: string
  image: string
  size: string
  finish: string
  unitPrice: number
  quantity: number
}

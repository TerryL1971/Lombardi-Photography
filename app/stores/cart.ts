// app/stores/cart.ts
import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'
import type { CartLine, Photo, PrintOption } from '~/types/gallery'

const STORAGE_KEY = 'lombardi-cart-v1'

function lineKey(photoId: string, size: string, finish: string) {
  return `${photoId}__${size}__${finish}`
}

export const useCartStore = defineStore('cart', () => {
  const lines = ref<CartLine[]>([])
  /** Flips true once we've read localStorage on the client — used to avoid SSR hydration flicker. */
  const ready = ref(false)

  const count = computed(() =>
    lines.value.reduce((n, l) => n + l.quantity, 0),
  )
  const subtotal = computed(() =>
    lines.value.reduce((sum, l) => sum + l.unitPrice * l.quantity, 0),
  )
  const isEmpty = computed(() => lines.value.length === 0)

  function addPrint(photo: Photo, option: PrintOption, quantity = 1) {
    const key = lineKey(photo.id, option.size, option.finish)
    const existing = lines.value.find((l) => l.key === key)
    if (existing) {
      existing.quantity += quantity
      return
    }
    lines.value.push({
      key,
      photoId: photo.id,
      slug: photo.slug,
      title: photo.title,
      image: photo.image,
      size: option.size,
      finish: option.finish,
      unitPrice: option.price,
      quantity,
    })
  }

  function setQuantity(key: string, quantity: number) {
    const line = lines.value.find((l) => l.key === key)
    if (!line) return
    line.quantity = quantity
    if (line.quantity <= 0) remove(key)
  }

  function remove(key: string) {
    lines.value = lines.value.filter((l) => l.key !== key)
  }

  function clear() {
    lines.value = []
  }

  /**
   * Client-only persistence. Called from a plugin after the store is created so
   * the server render stays deterministic (empty cart) and the client rehydrates
   * on mount.
   */
  function hydrate() {
    if (import.meta.server) return
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) lines.value = JSON.parse(raw) as CartLine[]
    } catch {
      // corrupt or unavailable storage — start empty
    }
    ready.value = true
    watch(
      lines,
      (value) => {
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(value))
        } catch {
          // ignore write failures (private mode, quota)
        }
      },
      { deep: true },
    )
  }

  return {
    lines,
    ready,
    count,
    subtotal,
    isEmpty,
    addPrint,
    setQuantity,
    remove,
    clear,
    hydrate,
  }
})

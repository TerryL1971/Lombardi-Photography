// app/composables/useLightbox.ts
import { computed, ref, shallowRef } from 'vue'
import type { Photo } from '~/types/gallery'

/**
 * Shared lightbox state. Kept at module scope so the grid can open it and the
 * overlay component (mounted once in the layout) can render it. Side effects
 * like keyboard navigation and scroll-lock live in Lightbox.vue, which consumes
 * this — that way the listeners are registered exactly once.
 */
const isOpen = ref(false)
const items = shallowRef<Photo[]>([])
const index = ref(0)

const current = computed<Photo | null>(() => items.value[index.value] ?? null)
const hasMultiple = computed(() => items.value.length > 1)

/** Direction of the last navigation, for the frame transition (1 = next, -1 = prev). */
const direction = ref<1 | -1>(1)

function open(list: Photo[], startIndex: number) {
  items.value = list
  index.value = Math.max(0, Math.min(startIndex, list.length - 1))
  direction.value = 1
  isOpen.value = true
}

function openById(list: Photo[], id: string) {
  const i = list.findIndex((p) => p.id === id)
  open(list, i === -1 ? 0 : i)
}

function close() {
  isOpen.value = false
}

function next() {
  if (!hasMultiple.value) return
  direction.value = 1
  index.value = (index.value + 1) % items.value.length
}

function prev() {
  if (!hasMultiple.value) return
  direction.value = -1
  index.value = (index.value - 1 + items.value.length) % items.value.length
}

export function useLightbox() {
  return {
    isOpen,
    items,
    index,
    current,
    hasMultiple,
    direction,
    open,
    openById,
    close,
    next,
    prev,
  }
}

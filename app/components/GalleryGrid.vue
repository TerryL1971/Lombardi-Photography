<!-- app/components/GalleryGrid.vue -->
<script setup lang="ts">
import type { Photo } from '~/types/gallery'

const props = withDefaults(
  defineProps<{
    photos: Photo[]
    /** 'masonry' = CSS multi-column flow; 'grid' = even rows. */
    layout?: 'masonry' | 'grid'
    priorityCount?: number
  }>(),
  { layout: 'masonry', priorityCount: 3 },
)

const emit = defineEmits<{ (e: 'open', index: number): void }>()

// Keep the sizes hint in sync with the layout so NuxtImg requests sensible widths.
const sizes = computed(() =>
  props.layout === 'masonry'
    ? 'xs:100vw sm:50vw lg:33vw'
    : 'xs:100vw sm:50vw lg:33vw',
)
</script>

<template>
  <div
    :class="
      layout === 'masonry'
        ? 'gap-4 [column-fill:_balance] sm:columns-2 lg:columns-3 [&>*]:mb-4 [&>*]:break-inside-avoid'
        : 'grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'
    "
  >
    <PhotoCard
      v-for="(photo, i) in photos"
      :key="photo.id"
      :photo="photo"
      :priority="i < priorityCount"
      :sizes="sizes"
      @open="emit('open', i)"
    />
  </div>
</template>

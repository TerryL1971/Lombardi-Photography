<!-- app/components/PhotoGrid.vue -->
<script setup lang="ts">
import type { Photo } from '~/types/gallery'

withDefaults(defineProps<{ photos: Photo[]; priorityCount?: number }>(), { priorityCount: 4 })
const emit = defineEmits<{ (e: 'open', index: number): void }>()
</script>

<template>
  <!-- Two-column masonry at each photo's natural shape, 5px gutters -->
  <div class="gap-[5px] sm:columns-2 [&>*]:mb-[5px] [&>*]:break-inside-avoid">
    <button
      v-for="(photo, i) in photos"
      :key="photo.id"
      type="button"
      class="group relative block w-full overflow-hidden bg-black/[0.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-clay"
      :aria-label="`Open ${photo.title}`"
      @click="emit('open', i)"
    >
      <img
        :src="photo.thumb"
        :alt="photo.alt"
        :width="photo.width"
        :height="photo.height"
        :loading="i < priorityCount ? 'eager' : 'lazy'"
        decoding="async"
        class="block h-auto w-full transition-opacity duration-150 group-hover:opacity-85"
      />
    </button>
  </div>
</template>

<!-- app/components/GalleryGrid.vue -->
<script setup lang="ts">
import type { Photo } from '~/types/gallery'

withDefaults(
  defineProps<{
    photos: Photo[]
    priorityCount?: number
  }>(),
  { priorityCount: 4 },
)

const emit = defineEmits<{ (e: 'open', index: number): void }>()
</script>

<template>
  <!-- Two even columns of 4:3 covers with a 5px gutter; one column on phones -->
  <div class="grid grid-cols-1 gap-[5px] sm:grid-cols-2">
    <PhotoCard
      v-for="(photo, i) in photos"
      :key="photo.id"
      :photo="photo"
      :priority="i < priorityCount"
      sizes="xs:100vw sm:50vw xxl:750px"
      @open="emit('open', i)"
    />
  </div>
</template>

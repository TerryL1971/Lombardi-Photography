<!-- app/components/PhotoCard.vue -->
<script setup lang="ts">
import type { Photo } from '~/types/gallery'

const props = defineProps<{
  photo: Photo
  /** Eager-load the first row for a good LCP. */
  priority?: boolean
  sizes?: string
}>()

defineEmits<{ (e: 'open'): void }>()

const { priceRange } = useGallery()
const range = computed(() => priceRange(props.photo))
</script>

<template>
  <button
    type="button"
    class="group relative block w-full overflow-hidden rounded-sm bg-ink-soft text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clay focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
    @click="$emit('open')"
  >
    <NuxtImg
      :src="photo.image"
      :alt="photo.alt"
      :sizes="sizes ?? 'xs:100vw sm:50vw lg:33vw'"
      :loading="priority ? 'eager' : 'lazy'"
      :preload="priority"
      :width="photo.orientation === 'portrait' ? 1000 : 1500"
      :height="photo.orientation === 'portrait' ? 1250 : 1000"
      class="w-full origin-center object-cover transition-transform duration-[900ms] ease-out-expo group-hover:scale-[1.04]"
      :class="photo.orientation === 'portrait' ? 'aspect-[4/5]' : 'aspect-[3/2]'"
    />

    <!-- Hover / focus caption -->
    <div
      class="pointer-events-none absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-ink/80 via-ink/10 to-transparent p-5 opacity-0 transition-opacity duration-500 ease-out-expo group-hover:opacity-100 group-focus-visible:opacity-100"
    >
      <p class="eyebrow text-clay/90">{{ photo.category }}</p>
      <p class="mt-1 font-serif text-lg text-paper">{{ photo.title }}</p>
      <p class="mt-0.5 text-xs text-paper/60">
        Prints from {{ formatPrice(range.min) }}
      </p>
    </div>
  </button>
</template>

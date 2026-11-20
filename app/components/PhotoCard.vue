<!-- app/components/PhotoCard.vue -->
<script setup lang="ts">
import type { Photo } from '~/types/gallery'

defineProps<{
  photo: Photo
  /** Eager-load the first row for a good LCP. */
  priority?: boolean
  sizes?: string
}>()

defineEmits<{ (e: 'open'): void }>()
</script>

<template>
  <button
    type="button"
    class="group relative block aspect-[4/3] w-full overflow-hidden bg-black/[0.03] text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-clay"
    @click="$emit('open')"
  >
    <NuxtImg
      :src="photo.image"
      :alt="photo.alt"
      :sizes="sizes ?? 'xs:100vw sm:50vw'"
      :loading="priority ? 'eager' : 'lazy'"
      :preload="priority"
      width="1500"
      height="1125"
      class="absolute inset-0 h-full w-full object-cover"
    />

    <!-- Hover / focus: white 90% wash with a centred dark caption -->
    <div
      class="pointer-events-none absolute inset-0 flex items-center justify-center bg-white/90 px-[8%] py-[8%] text-center text-ink opacity-0 transition-opacity duration-150 ease-out group-hover:opacity-100 group-focus-visible:opacity-100"
    >
      <div>
        <p class="pb-1 text-[15px] font-bold leading-[15px] sm:text-[18px] sm:leading-[18px] lg:text-[24px] lg:leading-6">
          {{ photo.title }}
        </p>
        <p class="pt-2.5 text-sm leading-5 lg:pt-3 lg:text-[17px]">
          {{ photo.location }} {{ photo.year }}
        </p>
      </div>
    </div>
  </button>
</template>

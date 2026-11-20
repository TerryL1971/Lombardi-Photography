<!-- app/components/CollectionCard.vue -->
<script setup lang="ts">
import type { CollectionSummary } from '~/types/gallery'

defineProps<{
  collection: CollectionSummary
  /** Eager-load the first row for a good LCP. */
  priority?: boolean
}>()
</script>

<template>
  <NuxtLink
    :to="`/collection/${collection.slug}`"
    class="group relative block aspect-[4/3] w-full overflow-hidden bg-black/[0.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-clay"
  >
    <img
      :src="collection.cover.thumb"
      :alt="collection.cover.alt"
      :width="collection.cover.width"
      :height="collection.cover.height"
      :loading="priority ? 'eager' : 'lazy'"
      :fetchpriority="priority ? 'high' : undefined"
      decoding="async"
      class="absolute inset-0 h-full w-full object-cover"
    />

    <!-- Hover / focus: white 90% wash with a centred dark caption -->
    <div
      class="pointer-events-none absolute inset-0 flex items-center justify-center bg-white/90 px-[8%] py-[8%] text-center text-ink opacity-0 transition-opacity duration-150 ease-out group-hover:opacity-100 group-focus-visible:opacity-100"
    >
      <div>
        <p class="pb-1 text-[15px] font-bold leading-[15px] sm:text-[18px] sm:leading-[18px] lg:text-[24px] lg:leading-6">
          {{ collection.title }}
        </p>
        <p class="pt-2.5 text-sm leading-5 lg:pt-3 lg:text-[17px]">{{ collection.year }}</p>
      </div>
    </div>
  </NuxtLink>
</template>

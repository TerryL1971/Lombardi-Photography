<!-- app/components/CategoryTiles.vue -->
<script setup lang="ts">
import { computed } from 'vue'
import type { Category } from '~/types/gallery'

const { byCategory } = useGallery()

// One representative frame per category (by slug), plus a one-line description.
const meta: Record<Category, { cover: string; blurb: string }> = {
  Cities: {
    cover: 'lucerne-chapel-bridge',
    blurb: 'Old-town skylines, bridges and squares.',
  },
  Streets: {
    cover: 'rue-du-bain-aux-plantes',
    blurb: 'The lanes and courtyards just off the main view.',
  },
  Gardens: {
    cover: 'tulip-season',
    blurb: 'Spring mornings in the beds at Keukenhof.',
  },
}

const tiles = computed(() =>
  (Object.keys(meta) as Category[]).map((name) => {
    const photos = byCategory(name)
    const cover = photos.find((p) => p.slug === meta[name].cover) ?? photos[0]!
    return { name, count: photos.length, blurb: meta[name].blurb, cover }
  }),
)
</script>

<template>
  <div class="grid gap-4 sm:grid-cols-3 sm:gap-5">
    <NuxtLink
      v-for="tile in tiles"
      :key="tile.name"
      :to="`/gallery?category=${tile.name}`"
      class="group relative block overflow-hidden rounded-sm bg-ink-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clay focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
    >
      <NuxtImg
        :src="tile.cover.image"
        :alt="tile.cover.alt"
        sizes="xs:100vw sm:33vw"
        width="800"
        height="1000"
        class="aspect-[4/5] w-full object-cover transition-transform duration-[900ms] ease-out-expo group-hover:scale-[1.05]"
      />
      <div
        class="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/25 to-transparent"
      />
      <div class="absolute inset-x-0 bottom-0 p-5 sm:p-6">
        <p class="font-serif text-2xl text-paper">{{ tile.name }}</p>
        <p class="mt-1 text-sm text-paper/55">{{ tile.blurb }}</p>
        <p
          class="mt-3 flex items-center gap-1.5 text-xs uppercase tracking-widest text-clay"
        >
          {{ tile.count }} photographs
          <span
            class="transition-transform duration-300 ease-out-expo group-hover:translate-x-1"
          >&rarr;</span>
        </p>
      </div>
    </NuxtLink>
  </div>
</template>

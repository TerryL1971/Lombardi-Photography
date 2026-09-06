<!-- app/pages/gallery/index.vue -->
<script setup lang="ts">
import { computed } from 'vue'
import type { Category } from '~/types/gallery'

const { byCategory, CATEGORIES } = useGallery()
const { open } = useLightbox()
const route = useRoute()
const router = useRouter()

type Filter = Category | 'All'
const filters: Filter[] = ['All', ...CATEGORIES]

const active = computed<Filter>(() => {
  const q = route.query.category
  return filters.includes(q as Filter) ? (q as Filter) : 'All'
})

const photos = computed(() => byCategory(active.value))

function setFilter(f: Filter) {
  router.replace({
    query: f === 'All' ? {} : { category: f },
  })
}

useHead(() => ({
  title:
    active.value === 'All'
      ? 'Gallery — Lombardi Photography'
      : `${active.value} — Lombardi Photography`,
}))
</script>

<template>
  <div class="container-wide pb-24 pt-28 sm:pt-36">
    <header class="mb-10 sm:mb-14">
      <p class="eyebrow">The gallery</p>
      <h1 class="mt-3 font-serif text-4xl text-paper sm:text-5xl">
        Every frame, print-ready.
      </h1>
      <p class="mt-4 max-w-xl text-paper/60">
        {{ photos.length }} photograph{{ photos.length === 1 ? '' : 's' }}. Tap
        any image to enlarge it, move through the set, and order a print.
      </p>
    </header>

    <!-- Filters -->
    <div class="mb-10 flex flex-wrap gap-2 border-b border-paper/10 pb-5">
      <button
        v-for="f in filters"
        :key="f"
        type="button"
        class="rounded-full px-4 py-2 text-sm transition"
        :class="
          active === f
            ? 'bg-paper text-ink'
            : 'text-paper/55 hover:bg-paper/10 hover:text-paper'
        "
        @click="setFilter(f)"
      >
        {{ f }}
      </button>
    </div>

    <Transition name="lightbox-fade" mode="out-in">
      <GalleryGrid
        :key="active"
        :photos="photos"
        layout="masonry"
        :priority-count="6"
        @open="(i) => open(photos, i)"
      />
    </Transition>
  </div>
</template>

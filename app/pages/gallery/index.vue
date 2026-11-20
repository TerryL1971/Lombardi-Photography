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

function scrollToWork() {
  document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })
}

useHead(() => ({
  title:
    active.value === 'All'
      ? 'Collection — Lombardi Photography'
      : `${active.value} — Lombardi Photography`,
}))
</script>

<template>
  <div>
    <!-- Masthead: stays put while the collection scrolls up over it -->
    <section
      class="sticky top-[65px] flex h-[75vh] items-center justify-center px-[5%] text-center"
    >
      <div class="max-w-[800px]">
        <h1 class="mb-2 text-[25px] leading-[29px] text-white sm:text-[28px] sm:leading-[33px] lg:mb-2.5 lg:text-[60px] lg:leading-[70px]">
          Hi, I'm Terry Lombardi!
        </h1>
        <p class="text-sm leading-5 text-[#ccc] lg:text-xl lg:leading-7">
          Scroll down to see some of my work
        </p>
      </div>
      <button
        type="button"
        aria-label="Scroll to the collection"
        class="absolute bottom-[45px] left-[calc(50%-30px)] grid h-10 w-[60px] place-items-center"
        @click="scrollToWork"
      >
        <span class="block h-4 w-4 -translate-y-1 rotate-45 border-b-2 border-r-2 border-white" />
      </button>
    </section>

    <section id="work" class="relative z-10 scroll-mt-[65px] bg-ink">
      <div class="mx-auto max-w-[1500px] pt-[26px] sm:pt-[30px] lg:pt-[70px]">
        <!-- Category filter, styled like the nav (bold = active) -->
        <div class="mb-6 flex flex-wrap justify-center gap-x-6 gap-y-2 px-[5%] text-[18px] leading-6">
          <button
            v-for="f in filters"
            :key="f"
            type="button"
            class="text-paper transition hover:text-clay"
            :class="{ 'font-bold': active === f }"
            :aria-pressed="active === f"
            @click="setFilter(f)"
          >
            {{ f }}
          </button>
        </div>

        <Transition name="lightbox-fade" mode="out-in">
          <GalleryGrid
            :key="active"
            :photos="photos"
            @open="(i) => open(photos, i)"
          />
        </Transition>
      </div>
    </section>
  </div>
</template>

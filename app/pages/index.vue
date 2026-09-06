<!-- app/pages/index.vue -->
<script setup lang="ts">
const { featured } = useGallery()
const { open } = useLightbox()
const featuredPhotos = featured(6)

useHead({ title: 'Lombardi Photography — Cities, Streets & Gardens' })
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="relative flex min-h-[92vh] items-end overflow-hidden">
      <NuxtImg
        src="/images/hero.jpg"
        alt="Low winter sun breaking through bare trees in Hyde Park, London, empty green benches and a dusting of snow on the ground"
        sizes="xs:100vw xl:1920px"
        width="1920"
        height="1120"
        loading="eager"
        preload
        fetchpriority="high"
        class="absolute inset-0 h-full w-full object-cover"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/25" />

      <div class="container-wide relative z-10 pb-16 sm:pb-24">
        <p class="eyebrow animate-fade-up">Lombardi Photography</p>
        <h1
          class="mt-4 max-w-4xl font-serif text-4xl leading-[1.05] text-paper animate-fade-up sm:text-6xl lg:text-7xl"
          style="animation-delay: 80ms"
        >
          Light, held still —<br class="hidden sm:block" />
          one city, one street, one bed of flowers at a time.
        </h1>
        <p
          class="mt-6 max-w-xl text-base text-paper/70 animate-fade-up sm:text-lg"
          style="animation-delay: 160ms"
        >
          Travel and place photography by Terry Lombardi — the old towns of
          Europe, the lanes behind them, and the gardens in between. Every frame
          in the gallery can be ordered as an archival print.
        </p>
        <div
          class="mt-9 flex flex-wrap gap-3 animate-fade-up"
          style="animation-delay: 240ms"
        >
          <NuxtLink to="/gallery" class="btn-primary">View the gallery</NuxtLink>
          <NuxtLink to="/about" class="btn-outline">About Terry</NuxtLink>
        </div>
      </div>

      <div
        class="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-paper/40 sm:flex"
      >
        <span class="text-[10px] uppercase tracking-widest">Scroll</span>
        <span class="h-8 w-px bg-paper/30" />
      </div>
    </section>

    <!-- Intro -->
    <section class="container-wide py-20 sm:py-28">
      <div class="grid gap-10 md:grid-cols-[1fr_1.4fr] md:gap-16">
        <h2 class="font-serif text-2xl text-paper sm:text-3xl">
          A small, working portfolio.
        </h2>
        <div class="space-y-4 text-paper/65">
          <p>
            I travel with a camera because I can't help it. What you see here is
            a curated slice — a decade of wandering the old quarters of Heidelberg,
            Lucerne, Strasbourg and London, the working lanes just off the
            postcard views, and a few spring mornings lost in the beds at
            Keukenhof.
          </p>
          <p>
            If a photograph stays with you, it can hang on your wall. Pick a
            size and finish from the print panel on any image.
          </p>
          <NuxtLink
            to="/gallery"
            class="inline-flex items-center gap-2 pt-2 text-sm text-clay transition hover:gap-3"
          >
            Browse all work
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M5 12h14M13 6l6 6-6 6" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Featured -->
    <section class="container-wide pb-24 sm:pb-32">
      <div class="mb-8 flex items-end justify-between">
        <div>
          <p class="eyebrow">Selected work</p>
          <h2 class="mt-2 font-serif text-3xl text-paper">Featured frames</h2>
        </div>
        <NuxtLink
          to="/gallery"
          class="hidden text-sm text-paper/50 transition hover:text-paper sm:block"
        >
          All {{ useGallery().all().length }} photographs &rarr;
        </NuxtLink>
      </div>

      <GalleryGrid
        :photos="featuredPhotos"
        layout="masonry"
        @open="(i) => open(featuredPhotos, i)"
      />
    </section>
  </div>
</template>

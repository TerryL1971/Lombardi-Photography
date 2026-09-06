<!-- app/pages/gallery/[slug].vue -->
<script setup lang="ts">
import { computed } from 'vue'

const route = useRoute()
const { bySlug, related, all } = useGallery()
const { open } = useLightbox()

const photo = computed(() => bySlug(String(route.params.slug)))

if (!photo.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'That photograph could not be found.',
    fatal: true,
  })
}

const order = usePrintOrder(() => photo.value!)
const relatedPhotos = computed(() => related(photo.value!, 3))

function openHere() {
  const list = all()
  open(
    list,
    list.findIndex((p) => p.id === photo.value!.id),
  )
}

useHead(() => ({
  title: `${photo.value!.title} — Lombardi Photography`,
  meta: [
    { name: 'description', content: photo.value!.description },
    { property: 'og:image', content: photo.value!.image },
    { property: 'og:title', content: `${photo.value!.title} — Lombardi Photography` },
  ],
}))
</script>

<template>
  <div v-if="photo" class="container-wide pb-24 pt-24 sm:pt-32">
    <NuxtLink
      to="/gallery"
      class="mb-8 inline-flex items-center gap-2 text-sm text-paper/50 transition hover:text-paper"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <path d="M19 12H5M11 6l-6 6 6 6" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
      Back to gallery
    </NuxtLink>

    <div class="grid gap-10 lg:grid-cols-[1.6fr_1fr] lg:gap-16">
      <!-- Image -->
      <div>
        <button
          type="button"
          class="group relative block w-full overflow-hidden rounded-sm bg-ink-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clay"
          aria-label="Open full-screen"
          @click="openHere"
        >
          <NuxtImg
            :src="photo.image"
            :alt="photo.alt"
            sizes="xs:100vw lg:900px"
            :width="photo.orientation === 'portrait' ? 1200 : 1600"
            :height="photo.orientation === 'portrait' ? 1500 : 1067"
            loading="eager"
            preload
            class="w-full object-cover"
          />
          <span
            class="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full bg-ink/70 px-3 py-1.5 text-xs text-paper/80 opacity-0 backdrop-blur transition group-hover:opacity-100"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M8 3H5a2 2 0 0 0-2 2v3M16 3h3a2 2 0 0 1 2 2v3M21 16v3a2 2 0 0 1-2 2h-3M3 16v3a2 2 0 0 0 2 2h3" stroke-linecap="round" />
            </svg>
            View full screen
          </span>
        </button>
      </div>

      <!-- Order column -->
      <div class="lg:sticky lg:top-28 lg:self-start">
        <p class="eyebrow">{{ photo.category }} &middot; {{ photo.year }}</p>
        <h1 class="mt-2 font-serif text-3xl text-paper sm:text-4xl">
          {{ photo.title }}
        </h1>
        <p class="mt-2 text-sm text-paper/50">{{ photo.location }}</p>
        <p class="mt-5 text-paper/65">{{ photo.description }}</p>

        <div class="mt-8 rounded-lg border border-paper/10 bg-ink-soft p-6">
          <p class="mb-5 text-xs uppercase tracking-widest text-paper/45">
            Order an archival print
          </p>
          <PrintOrderControls :order="order" />

          <Transition name="lightbox-fade" mode="out-in">
            <button
              v-if="!order.justAdded.value"
              key="add"
              type="button"
              class="btn-primary mt-6 w-full"
              @click="order.addToCart()"
            >
              Add to cart
            </button>
            <div v-else key="added" class="mt-6 space-y-3">
              <p class="flex items-center gap-2 text-sm text-paper/70">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="text-clay">
                  <path d="M5 12l4.5 4.5L19 7" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                Added to your cart.
              </p>
              <div class="flex gap-2">
                <NuxtLink to="/cart" class="btn-primary flex-1">View cart</NuxtLink>
                <button type="button" class="btn-outline flex-1" @click="order.reset()">
                  Order another
                </button>
              </div>
            </div>
          </Transition>

          <p class="mt-4 text-center text-xs text-paper/35">
            Made to order &middot; ships in 5–7 business days
          </p>
        </div>
      </div>
    </div>

    <!-- Related -->
    <section v-if="relatedPhotos.length" class="mt-24">
      <h2 class="mb-8 font-serif text-2xl text-paper">
        More from {{ photo.category }}
      </h2>
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <NuxtLink
          v-for="rp in relatedPhotos"
          :key="rp.id"
          :to="`/gallery/${rp.slug}`"
          class="group block overflow-hidden rounded-sm bg-ink-soft"
        >
          <NuxtImg
            :src="rp.image"
            :alt="rp.alt"
            sizes="xs:100vw sm:33vw"
            :width="rp.orientation === 'portrait' ? 800 : 1000"
            :height="rp.orientation === 'portrait' ? 1000 : 667"
            class="aspect-[3/2] w-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-105"
          />
          <p class="px-1 pt-3 font-serif text-paper">{{ rp.title }}</p>
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

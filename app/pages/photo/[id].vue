<!-- app/pages/photo/[id].vue -->
<script setup lang="ts">
const route = useRoute()
const { open } = useLightbox()

const { data, error } = await useFetch(() => `/api/photos/${route.params.id}`)

if (error.value || !data.value) {
  throw createError({ statusCode: 404, statusMessage: 'That photograph could not be found.', fatal: true })
}

const photo = computed(() => data.value!.photo)
const order = usePrintOrder(photo)
const shopOn = useAppConfig().shop.enabled

useHead(() => ({
  title: `${photo.value.collectionTitle} — ${photo.value.title} — Picture It by Terry`,
  meta: [
    { name: 'description', content: photo.value.alt },
    { property: 'og:image', content: photo.value.large },
  ],
}))
</script>

<template>
  <div v-if="data" class="container-wide pb-24 pt-10 sm:pt-14">
    <NuxtLink
      :to="`/collection/${data.collection.slug}`"
      class="mb-8 inline-flex items-center gap-2 text-sm text-paper/50 transition hover:text-paper"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <path d="M19 12H5M11 6l-6 6 6 6" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
      Back to {{ data.collection.title }}
    </NuxtLink>

    <div class="grid gap-10 lg:grid-cols-[1.6fr_1fr] lg:gap-16">
      <div>
        <button
          type="button"
          class="group relative block w-full overflow-hidden bg-ink-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clay"
          aria-label="Open full-screen"
          @click="open([photo], 0)"
        >
          <img :src="photo.large" :alt="photo.alt" :width="photo.width" :height="photo.height" class="h-auto w-full" />
        </button>
      </div>

      <div class="lg:sticky lg:top-[97px] lg:self-start">
        <p class="eyebrow">{{ photo.collectionTitle }} &middot; {{ photo.year }}</p>
        <h1 class="mt-2 text-3xl text-paper sm:text-4xl">{{ photo.title }}</h1>
        <p v-if="photo.caption" class="mt-5 text-paper/65">{{ photo.caption }}</p>

        <div v-if="shopOn" class="mt-8 border border-paper/10 bg-ink-soft p-6">
          <p class="mb-5 text-sm text-clay-deep">Order a print</p>
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
              <p class="text-sm text-paper/70">Added to your cart.</p>
              <div class="flex gap-2">
                <NuxtLink to="/cart" class="btn-primary flex-1">View cart</NuxtLink>
                <button type="button" class="btn-outline flex-1" @click="order.reset()">Order another</button>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </div>

    <section v-if="data.related.length" class="mt-24">
      <h2 class="mb-8 text-2xl text-paper">More from {{ data.collection.title }}</h2>
      <div class="grid grid-cols-1 gap-[5px] sm:grid-cols-3">
        <NuxtLink
          v-for="rp in data.related"
          :key="rp.id"
          :to="`/photo/${rp.id}`"
          class="block aspect-[4/3] overflow-hidden bg-ink-soft"
        >
          <img :src="rp.thumb" :alt="rp.alt" loading="lazy" class="h-full w-full object-cover transition-opacity hover:opacity-85" />
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

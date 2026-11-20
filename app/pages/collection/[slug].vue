<!-- app/pages/collection/[slug].vue -->
<script setup lang="ts">
const route = useRoute()
const { open } = useLightbox()

const { data: collection, error } = await useFetch(
  () => `/api/collections/${route.params.slug}`,
)

if (error.value || !collection.value) {
  throw createError({ statusCode: 404, statusMessage: 'That collection could not be found.', fatal: true })
}

useHead(() => ({
  title: `${collection.value!.title} ${collection.value!.year} — Picture It by Terry`,
  meta: [
    {
      name: 'description',
      content: `${collection.value!.count} photographs from ${collection.value!.title}, ${collection.value!.year}, by Terry C Lombardi.`,
    },
    { property: 'og:image', content: collection.value!.cover.thumb },
  ],
}))
</script>

<template>
  <div v-if="collection" class="pb-16">
    <header class="page-header">
      <h1>{{ collection.title }}</h1>
      <p>{{ collection.year }} &middot; {{ collection.count }} photographs</p>
    </header>

    <div class="mx-auto max-w-[1500px]">
      <PhotoGrid :photos="collection.photos" @open="(i) => open(collection!.photos, i)" />
    </div>

    <!-- Previous / next collection -->
    <nav class="mx-auto mt-14 flex max-w-[1500px] items-start justify-between gap-6 px-[5%] text-[18px]">
      <NuxtLink v-if="collection.prev" :to="`/collection/${collection.prev.slug}`" class="pager">
        <span class="block text-sm text-clay-deep">&larr; Previous</span>
        {{ collection.prev.title }}
      </NuxtLink>
      <span v-else />
      <NuxtLink to="/collection" class="hidden self-center text-sm text-clay-deep transition hover:text-paper sm:block">
        All collections
      </NuxtLink>
      <NuxtLink v-if="collection.next" :to="`/collection/${collection.next.slug}`" class="pager text-right">
        <span class="block text-sm text-clay-deep">Next &rarr;</span>
        {{ collection.next.title }}
      </NuxtLink>
      <span v-else />
    </nav>
  </div>
</template>

<style scoped>
.pager {
  @apply font-bold text-paper transition hover:text-clay;
}
</style>

<!-- app/pages/collection/index.vue -->
<script setup lang="ts">
useHead({ title: 'Collection — Picture It by Terry' })

const { data: collections } = await useFetch('/api/collections', { default: () => [] })

function scrollToWork() {
  document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <div>
    <!-- Masthead: stays put while the collection scrolls up over it -->
    <section class="sticky top-[65px] flex h-[75vh] items-center justify-center px-[5%] text-center">
      <div class="max-w-[800px]">
        <h1 class="mb-2 text-[25px] leading-[29px] text-white sm:text-[28px] sm:leading-[33px] lg:mb-2.5 lg:text-[60px] lg:leading-[70px]">
          Hi, I'm Terry C Lombardi!
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
        <div v-if="collections.length" class="grid grid-cols-1 gap-[5px] sm:grid-cols-2">
          <CollectionCard
            v-for="(c, i) in collections"
            :key="c.slug"
            :collection="c"
            :priority="i < 2"
          />
        </div>
        <p v-else class="px-[5%] py-24 text-center text-clay-deep">
          New photographs are on their way, please check back soon.
        </p>
      </div>
    </section>
  </div>
</template>

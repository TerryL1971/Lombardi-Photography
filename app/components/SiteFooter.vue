<!-- app/components/SiteFooter.vue -->
<script setup lang="ts">
import { useWindowScroll } from '@vueuse/core'
import { computed } from 'vue'

const year = new Date().getFullYear()
const shopOn = useAppConfig().shop.enabled
const { y } = useWindowScroll()
const showFixed = computed(() => y.value > 600)

function toTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <footer class="relative z-10 bg-ink px-[5%] py-[25px] text-center text-sm leading-5 text-dim sm:py-[60px] sm:text-base">
    <button type="button" class="text-dim transition hover:text-clay" @click="toTop">
      <span class="mr-2.5">&uarr;</span>Back to Top
    </button>

    <nav class="mt-6 flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm">
      <NuxtLink class="footer-link" to="/collection">Collection</NuxtLink>
      <NuxtLink class="footer-link" to="/about">Meet the Photographer</NuxtLink>
      <NuxtLink class="footer-link" to="/contact">Contact</NuxtLink>
      <NuxtLink v-if="shopOn" class="footer-link" to="/cart">Cart</NuxtLink>
    </nav>

    <p class="mt-6 text-xs">
      &copy; {{ year }} Picture It by Terry &middot; Terry C Lombardi. All photographs &copy; Terry C Lombardi.
    </p>
  </footer>

  <!-- Fixed round back-to-top button -->
  <Transition name="lightbox-fade">
    <button
      v-if="showFixed"
      type="button"
      aria-label="Back to top"
      class="group fixed bottom-6 right-6 z-30 grid h-[60px] w-[60px] place-items-center rounded-full bg-white/10 transition hover:bg-white/20"
      @click="toTop"
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" class="opacity-30 transition group-hover:opacity-50">
        <path d="M12 19V5M5 12l7-7 7 7" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </button>
  </Transition>
</template>

<style scoped>
.footer-link {
  color: #555;
  transition: color 0.15s ease;
}
.footer-link:hover {
  color: #c0c6cc;
}
</style>

<!-- app/components/NavBar.vue -->
<script setup lang="ts">
import { ref, watch } from 'vue'

const route = useRoute()

const mobileOpen = ref(false)
watch(
  () => route.fullPath,
  () => {
    mobileOpen.value = false
  },
)

function isActive(to: string) {
  if (to === '/') return route.path === '/'
  if (to === '/collection') return route.path.startsWith('/collection') || route.path.startsWith('/photo')
  return route.path.startsWith(to)
}

const links = [
  { label: 'Home', to: '/' },
  { label: 'Collection', to: '/collection' },
  { label: 'Meet the Photographer', to: '/about' },
  { label: 'Contact', to: '/contact' },
]
</script>

<template>
  <header
    class="fixed inset-x-0 top-0 z-40 flex h-[65px] items-center bg-ink px-[5%] lg:px-[3%]"
  >
    <!-- Left: page links (desktop) / hamburger (mobile) -->
    <nav class="hidden flex-1 whitespace-nowrap lg:block">
      <NuxtLink
        v-for="link in links"
        :key="link.to"
        :to="link.to"
        class="nav-link mr-5 last:mr-0"
        :class="{ 'font-bold': isActive(link.to) }"
      >
        {{ link.label }}
      </NuxtLink>
    </nav>
    <div class="flex-1 lg:hidden">
      <button
        type="button"
        class="grid h-10 w-10 place-items-center text-paper"
        :aria-expanded="mobileOpen"
        aria-label="Open menu"
        @click="mobileOpen = true"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">
          <path d="M3 6h18M3 12h18M3 18h18" stroke-linecap="round" />
        </svg>
      </button>
    </div>

    <!-- Centre: wordmark -->
    <NuxtLink to="/" class="flex shrink-0 flex-col items-center px-4 text-paper" aria-label="Picture It by Terry — home">
      <span class="font-display text-[22px] font-light leading-none tracking-wide">Picture It</span>
      <span class="-mt-0.5 ml-6 font-script text-[22px] leading-none">by Terry</span>
    </NuxtLink>

    <!-- Right: cart -->
    <div class="flex flex-1 justify-end">
      <NavCartButton />
    </div>

    <!-- Full-screen mobile menu -->
    <Transition name="lightbox-fade">
      <div
        v-if="mobileOpen"
        class="fixed inset-0 z-50 flex flex-col items-center justify-center bg-ink lg:hidden"
      >
        <button
          type="button"
          class="absolute right-[5%] top-3 grid h-10 w-10 place-items-center text-paper"
          aria-label="Close menu"
          @click="mobileOpen = false"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">
            <path d="M5 5l14 14M19 5L5 19" stroke-linecap="round" />
          </svg>
        </button>
        <nav class="flex flex-col items-center gap-[30px]">
          <NuxtLink
            v-for="link in links"
            :key="link.to"
            :to="link.to"
            class="text-[22px] leading-8 text-paper"
            :class="{ 'font-bold': isActive(link.to) }"
          >
            {{ link.label }}
          </NuxtLink>
          <NuxtLink to="/cart" class="text-[22px] leading-8 text-paper" exact-active-class="font-bold">
            Cart
          </NuxtLink>
        </nav>
      </div>
    </Transition>
  </header>
</template>

<style scoped>
.nav-link {
  @apply text-[18px] leading-6 text-paper;
}
</style>

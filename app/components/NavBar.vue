<!-- app/components/NavBar.vue -->
<script setup lang="ts">
import { useWindowScroll } from '@vueuse/core'
import { computed, ref, watch } from 'vue'

const route = useRoute()
const cart = useCartStore()

const { y } = useWindowScroll()
const isHome = computed(() => route.path === '/')
const scrolled = computed(() => y.value > 24)
/** Transparent only at the top of the homepage; solid everywhere else. */
const solid = computed(() => !isHome.value || scrolled.value)

const mobileOpen = ref(false)
watch(
  () => route.fullPath,
  () => {
    mobileOpen.value = false
  },
)

const links = [
  { label: 'Gallery', to: '/gallery' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
]
</script>

<template>
  <header
    class="fixed inset-x-0 top-0 z-40 transition-colors duration-500 ease-out-expo"
    :class="
      solid
        ? 'border-b border-paper/10 bg-ink/85 backdrop-blur-md'
        : 'border-b border-transparent bg-transparent'
    "
  >
    <div class="container-wide flex h-16 items-center justify-between md:h-20">
      <NuxtLink
        to="/"
        class="font-serif text-lg tracking-tight text-paper transition hover:text-white md:text-xl"
      >
        Lombardi<span class="text-clay">.</span>
        <span class="hidden text-sm tracking-widest text-paper/50 md:inline">
          &nbsp;PHOTOGRAPHY</span
        >
      </NuxtLink>

      <nav class="hidden items-center gap-9 md:flex">
        <NuxtLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="text-sm text-paper/70 transition hover:text-paper"
          active-class="!text-paper"
        >
          {{ link.label }}
        </NuxtLink>
        <NavCartButton />
      </nav>

      <div class="flex items-center gap-2 md:hidden">
        <NavCartButton />
        <button
          type="button"
          class="grid h-10 w-10 place-items-center rounded-full text-paper transition hover:bg-paper/10"
          :aria-expanded="mobileOpen"
          aria-label="Toggle menu"
          @click="mobileOpen = !mobileOpen"
        >
          <svg
            v-if="!mobileOpen"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
          >
            <path d="M3 6h18M3 12h18M3 18h18" stroke-linecap="round" />
          </svg>
          <svg
            v-else
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
          >
            <path d="M6 6l12 12M18 6L6 18" stroke-linecap="round" />
          </svg>
        </button>
      </div>
    </div>

    <Transition name="lightbox-fade">
      <div
        v-if="mobileOpen"
        class="border-t border-paper/10 bg-ink/95 backdrop-blur-md md:hidden"
      >
        <nav class="container-wide flex flex-col py-4">
          <NuxtLink
            v-for="link in links"
            :key="link.to"
            :to="link.to"
            class="border-b border-paper/5 py-3 text-base text-paper/80"
            active-class="!text-paper"
          >
            {{ link.label }}
          </NuxtLink>
        </nav>
      </div>
    </Transition>
  </header>
</template>

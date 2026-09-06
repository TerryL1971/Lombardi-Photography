<!-- app/components/NavCartButton.vue -->
<script setup lang="ts">
import { computed } from 'vue'

const cart = useCartStore()
// Only show the badge once the client cart has hydrated, to avoid an SSR flash.
const badge = computed(() => (cart.ready && cart.count > 0 ? cart.count : null))
</script>

<template>
  <NuxtLink
    to="/cart"
    class="relative grid h-10 w-10 place-items-center rounded-full text-paper transition hover:bg-paper/10"
    :aria-label="`Cart${badge ? `, ${badge} item${badge > 1 ? 's' : ''}` : ' (empty)'}`"
  >
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="M2.5 3.5h2.2l2.2 11.1a1.5 1.5 0 0 0 1.5 1.2h8.6a1.5 1.5 0 0 0 1.5-1.2L21.5 7H6" />
      <circle cx="9" cy="20" r="1.4" />
      <circle cx="17" cy="20" r="1.4" />
    </svg>
    <ClientOnly>
      <Transition name="lightbox-fade">
        <span
          v-if="badge"
          class="absolute -right-0.5 -top-0.5 grid place-items-center rounded-full bg-clay px-1 text-[10px] font-semibold leading-none text-ink"
          style="height: 18px; min-width: 18px"
        >
          {{ badge }}
        </span>
      </Transition>
    </ClientOnly>
  </NuxtLink>
</template>

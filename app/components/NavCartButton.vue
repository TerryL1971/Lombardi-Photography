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
      width="19"
      height="19"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.5"
    >
      <path
        d="M4 7h16l-1.2 11.2a2 2 0 0 1-2 1.8H7.2a2 2 0 0 1-2-1.8L4 7Z"
        stroke-linejoin="round"
      />
      <path d="M8.5 7V6a3.5 3.5 0 1 1 7 0v1" stroke-linecap="round" />
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

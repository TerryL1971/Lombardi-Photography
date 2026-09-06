<!-- app/components/CartItem.vue -->
<script setup lang="ts">
import type { CartLine } from '~/types/gallery'

const props = defineProps<{ line: CartLine }>()
const cart = useCartStore()

const lineTotal = computed(() => props.line.unitPrice * props.line.quantity)
</script>

<template>
  <div class="flex gap-4 py-6 sm:gap-6">
    <NuxtLink :to="`/gallery/${line.slug}`" class="shrink-0">
      <NuxtImg
        :src="line.image"
        :alt="line.title"
        width="200"
        height="200"
        sizes="96px sm:128px"
        class="h-24 w-24 rounded-sm object-cover sm:h-32 sm:w-32"
      />
    </NuxtLink>

    <div class="flex min-w-0 flex-1 flex-col">
      <div class="flex items-start justify-between gap-4">
        <div class="min-w-0">
          <NuxtLink
            :to="`/gallery/${line.slug}`"
            class="font-serif text-lg leading-tight text-paper transition hover:text-clay"
          >
            {{ line.title }}
          </NuxtLink>
          <p class="mt-1 text-sm text-paper/50">
            {{ line.size }}&Prime; &middot; {{ line.finish }}
          </p>
          <p class="mt-0.5 text-xs text-paper/40">
            {{ formatPrice(line.unitPrice) }} each
          </p>
        </div>
        <p class="shrink-0 font-serif text-lg text-paper">
          {{ formatPrice(lineTotal) }}
        </p>
      </div>

      <div class="mt-auto flex items-center justify-between pt-4">
        <div class="inline-flex items-center rounded-lg border border-paper/15">
          <button
            type="button"
            class="grid h-9 w-9 place-items-center text-paper/70 transition hover:text-paper"
            aria-label="Decrease quantity"
            @click="cart.setQuantity(line.key, line.quantity - 1)"
          >
            &minus;
          </button>
          <span class="w-9 text-center text-sm tabular-nums">{{ line.quantity }}</span>
          <button
            type="button"
            class="grid h-9 w-9 place-items-center text-paper/70 transition hover:text-paper disabled:opacity-30"
            :disabled="line.quantity >= 10"
            aria-label="Increase quantity"
            @click="cart.setQuantity(line.key, line.quantity + 1)"
          >
            +
          </button>
        </div>

        <button
          type="button"
          class="text-xs uppercase tracking-widest text-paper/40 transition hover:text-paper"
          @click="cart.remove(line.key)"
        >
          Remove
        </button>
      </div>
    </div>
  </div>
</template>

<!-- app/pages/cart.vue -->
<script setup lang="ts">
import { computed } from 'vue'

const cart = useCartStore()

const SHIP_FLAT = 12
const FREE_SHIP_OVER = 150

const shipping = computed(() =>
  cart.isEmpty || cart.subtotal >= FREE_SHIP_OVER ? 0 : SHIP_FLAT,
)
const total = computed(() => cart.subtotal + shipping.value)

useHead({ title: 'Cart — Picture It by Terry' })
</script>

<template>
  <div class="container-wide pb-24 pt-12 sm:pt-16">
    <h1 class="mb-10 font-serif text-4xl text-paper sm:text-5xl">Your cart</h1>

    <ClientOnly>
      <div v-if="cart.isEmpty" class="border-t border-paper/10 py-20 text-center">
        <p class="font-serif text-2xl text-paper">Nothing here yet.</p>
        <p class="mx-auto mt-3 max-w-sm text-paper/55">
          Browse the collection and add a print from any photograph.
        </p>
        <NuxtLink to="/collection" class="btn-primary mt-8">Open the collection</NuxtLink>
      </div>

      <div v-else class="grid gap-12 lg:grid-cols-[1.6fr_1fr] lg:gap-16">
        <div class="divide-y divide-paper/10 border-y border-paper/10">
          <CartItem v-for="line in cart.lines" :key="line.key" :line="line" />
        </div>

        <aside class="lg:sticky lg:top-[97px] lg:self-start">
          <div class="rounded-none border border-paper/10 bg-ink-soft p-6">
            <h2 class="font-serif text-xl text-paper">Summary</h2>
            <dl class="mt-5 space-y-3 text-sm">
              <div class="flex justify-between text-paper/65">
                <dt>Subtotal</dt>
                <dd class="tabular-nums">{{ formatPrice(cart.subtotal) }}</dd>
              </div>
              <div class="flex justify-between text-paper/65">
                <dt>Shipping</dt>
                <dd class="tabular-nums">
                  {{ shipping === 0 ? 'Free' : formatPrice(shipping) }}
                </dd>
              </div>
              <div
                v-if="shipping > 0"
                class="rounded bg-clay/10 px-3 py-2 text-xs text-clay"
              >
                {{ formatPrice(FREE_SHIP_OVER - cart.subtotal) }} more for free shipping.
              </div>
              <div
                class="flex justify-between border-t border-paper/10 pt-3 font-serif text-lg text-paper"
              >
                <dt>Total</dt>
                <dd class="tabular-nums">{{ formatPrice(total) }}</dd>
              </div>
            </dl>

            <NuxtLink to="/checkout" class="btn-primary mt-6 w-full">
              Checkout
            </NuxtLink>
            <NuxtLink
              to="/collection"
              class="mt-3 block text-center text-sm text-paper/50 transition hover:text-paper"
            >
              Continue browsing
            </NuxtLink>
          </div>

          <p class="mt-4 px-2 text-xs leading-relaxed text-paper/35">
            This is a portfolio demo. Checkout is a mock flow — no payment is
            taken and no print is made.
          </p>
        </aside>
      </div>

      <template #fallback>
        <div class="border-t border-paper/10 py-20 text-center text-paper/40">
          Loading your cart…
        </div>
      </template>
    </ClientOnly>
  </div>
</template>

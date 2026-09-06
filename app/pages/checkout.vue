<!-- app/pages/checkout.vue -->
<script setup lang="ts">
import { computed, reactive, ref } from 'vue'

const cart = useCartStore()

const SHIP_FLAT = 12
const FREE_SHIP_OVER = 150
const shipping = computed(() =>
  cart.subtotal >= FREE_SHIP_OVER ? 0 : SHIP_FLAT,
)
const total = computed(() => cart.subtotal + shipping.value)

const form = reactive({
  name: '',
  email: '',
  address: '',
  city: '',
  region: '',
  postal: '',
  country: 'United States',
})

const errors = ref<Record<string, string>>({})
const confirmed = ref(false)
const orderRef = ref('')
const confirmedTotal = ref(0)
const confirmedCount = ref(0)

function validate() {
  const next: Record<string, string> = {}
  if (!form.name.trim()) next.name = 'Required'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = 'Enter a valid email'
  if (!form.address.trim()) next.address = 'Required'
  if (!form.city.trim()) next.city = 'Required'
  if (!form.postal.trim()) next.postal = 'Required'
  errors.value = next
  return Object.keys(next).length === 0
}

function submit() {
  if (!validate()) return
  // Mock order placement — no network, no payment.
  orderRef.value =
    'LP-' +
    Math.random().toString(36).slice(2, 6).toUpperCase() +
    '-' +
    Math.floor(1000 + Math.random() * 9000)
  confirmedTotal.value = total.value
  confirmedCount.value = cart.count
  confirmed.value = true
  cart.clear()
}

useHead({ title: 'Checkout — Lombardi Photography' })
</script>

<template>
  <div class="container-wide pb-24 pt-28 sm:pt-36">
    <ClientOnly>
      <!-- Confirmation -->
      <div v-if="confirmed" class="mx-auto max-w-lg py-10 text-center">
        <div
          class="mx-auto grid h-16 w-16 place-items-center rounded-full border border-clay/40 text-clay"
        >
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M5 12l4.5 4.5L19 7" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </div>
        <h1 class="mt-6 font-serif text-3xl text-paper sm:text-4xl">Order confirmed</h1>
        <p class="mt-3 text-paper/60">
          Thank you, {{ form.name.split(' ')[0] || 'friend' }}. A receipt is on its
          way to <span class="text-paper/80">{{ form.email }}</span>.
        </p>

        <dl class="mx-auto mt-8 max-w-xs space-y-2 text-sm">
          <div class="flex justify-between text-paper/55">
            <dt>Order reference</dt>
            <dd class="font-mono text-paper/80">{{ orderRef }}</dd>
          </div>
          <div class="flex justify-between text-paper/55">
            <dt>Prints</dt>
            <dd>{{ confirmedCount }}</dd>
          </div>
          <div class="flex justify-between text-paper/55">
            <dt>Charged</dt>
            <dd>{{ formatPrice(confirmedTotal) }}</dd>
          </div>
        </dl>

        <p class="mx-auto mt-8 max-w-sm text-xs leading-relaxed text-paper/35">
          This is a portfolio demonstration. No payment was processed and no
          print will be produced.
        </p>
        <NuxtLink to="/gallery" class="btn-primary mt-8">Back to the gallery</NuxtLink>
      </div>

      <!-- Empty guard -->
      <div
        v-else-if="cart.ready && cart.isEmpty"
        class="border-t border-paper/10 py-20 text-center"
      >
        <p class="font-serif text-2xl text-paper">Your cart is empty.</p>
        <NuxtLink to="/gallery" class="btn-primary mt-8">Open the gallery</NuxtLink>
      </div>

      <!-- Checkout form -->
      <div v-else class="grid gap-12 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
        <div>
          <h1 class="mb-8 font-serif text-4xl text-paper sm:text-5xl">Checkout</h1>
          <form class="space-y-5" novalidate @submit.prevent="submit">
            <div>
              <label class="field-label" for="name">Full name</label>
              <input id="name" v-model="form.name" class="field" autocomplete="name" />
              <p v-if="errors.name" class="mt-1 text-xs text-clay">{{ errors.name }}</p>
            </div>
            <div>
              <label class="field-label" for="email">Email</label>
              <input id="email" v-model="form.email" type="email" class="field" autocomplete="email" />
              <p v-if="errors.email" class="mt-1 text-xs text-clay">{{ errors.email }}</p>
            </div>
            <div>
              <label class="field-label" for="address">Shipping address</label>
              <input id="address" v-model="form.address" class="field" autocomplete="street-address" placeholder="Street address" />
              <p v-if="errors.address" class="mt-1 text-xs text-clay">{{ errors.address }}</p>
            </div>
            <div class="grid gap-5 sm:grid-cols-2">
              <div>
                <label class="field-label" for="city">City</label>
                <input id="city" v-model="form.city" class="field" autocomplete="address-level2" />
                <p v-if="errors.city" class="mt-1 text-xs text-clay">{{ errors.city }}</p>
              </div>
              <div>
                <label class="field-label" for="region">State / Region</label>
                <input id="region" v-model="form.region" class="field" autocomplete="address-level1" />
              </div>
            </div>
            <div class="grid gap-5 sm:grid-cols-2">
              <div>
                <label class="field-label" for="postal">Postal code</label>
                <input id="postal" v-model="form.postal" class="field" autocomplete="postal-code" />
                <p v-if="errors.postal" class="mt-1 text-xs text-clay">{{ errors.postal }}</p>
              </div>
              <div>
                <label class="field-label" for="country">Country</label>
                <input id="country" v-model="form.country" class="field" autocomplete="country-name" />
              </div>
            </div>

            <button type="submit" class="btn-primary w-full !mt-8">
              Place order &middot; {{ formatPrice(total) }}
            </button>
            <p class="text-center text-xs text-paper/35">
              Mock checkout — no card field, no charge.
            </p>
          </form>
        </div>

        <aside class="lg:sticky lg:top-28 lg:self-start">
          <div class="rounded-lg border border-paper/10 bg-ink-soft p-6">
            <h2 class="font-serif text-xl text-paper">Order</h2>
            <ul class="mt-5 space-y-4">
              <li
                v-for="line in cart.lines"
                :key="line.key"
                class="flex gap-3 text-sm"
              >
                <NuxtImg
                  :src="line.image"
                  :alt="line.title"
                  width="120"
                  height="120"
                  sizes="56px"
                  class="h-14 w-14 shrink-0 rounded-sm object-cover"
                />
                <div class="min-w-0 flex-1">
                  <p class="truncate text-paper">{{ line.title }}</p>
                  <p class="text-xs text-paper/45">
                    {{ line.size }}&Prime; {{ line.finish }} &times; {{ line.quantity }}
                  </p>
                </div>
                <p class="tabular-nums text-paper/70">
                  {{ formatPrice(line.unitPrice * line.quantity) }}
                </p>
              </li>
            </ul>
            <dl class="mt-5 space-y-2 border-t border-paper/10 pt-4 text-sm">
              <div class="flex justify-between text-paper/60">
                <dt>Subtotal</dt>
                <dd>{{ formatPrice(cart.subtotal) }}</dd>
              </div>
              <div class="flex justify-between text-paper/60">
                <dt>Shipping</dt>
                <dd>{{ shipping === 0 ? 'Free' : formatPrice(shipping) }}</dd>
              </div>
              <div class="flex justify-between border-t border-paper/10 pt-2 font-serif text-lg text-paper">
                <dt>Total</dt>
                <dd>{{ formatPrice(total) }}</dd>
              </div>
            </dl>
          </div>
        </aside>
      </div>

      <template #fallback>
        <div class="py-20 text-center text-paper/40">Loading checkout…</div>
      </template>
    </ClientOnly>
  </div>
</template>

// app/plugins/cart.client.ts
import { useCartStore } from '~/stores/cart'

/**
 * Rehydrates the cart from localStorage once, on the client, after Pinia is
 * ready. Keeps SSR output deterministic (server always renders an empty cart).
 */
export default defineNuxtPlugin(() => {
  const cart = useCartStore()
  cart.hydrate()
})

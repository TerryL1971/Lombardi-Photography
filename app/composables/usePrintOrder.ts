// app/composables/usePrintOrder.ts
import { computed, ref, watch } from 'vue'
import type { MaybeRefOrGetter } from 'vue'
import { toValue } from 'vue'
import type { Photo } from '~/types/gallery'

/**
 * Shared print-selection logic used by both the slide-in PrintOrderPanel and the
 * inline order form on the photo detail page. Owns the size/finish/quantity
 * selection, keeps finish valid when size changes, and exposes the live total.
 */
export function usePrintOrder(photoInput: MaybeRefOrGetter<Photo>) {
  const cart = useCartStore()
  const photo = computed(() => toValue(photoInput))

  const sizes = computed(() => [...new Set(PRINT_OPTIONS.map((s) => s.size))])
  const finishesFor = (size: string) =>
    PRINT_OPTIONS
      .filter((s) => s.size === size)
      .map((s) => s.finish)

  const selectedSize = ref(sizes.value[0]!)
  const selectedFinish = ref(finishesFor(selectedSize.value)[0]!)
  const quantity = ref(1)
  const justAdded = ref(false)

  function reset() {
    selectedSize.value = sizes.value[0]!
    selectedFinish.value = finishesFor(selectedSize.value)[0]!
    quantity.value = 1
    justAdded.value = false
  }

  watch(() => photo.value.id, reset)

  watch(selectedSize, (size) => {
    const finishes = finishesFor(size)
    if (!finishes.includes(selectedFinish.value)) {
      selectedFinish.value = finishes[0]!
    }
  })

  const option = computed(
    () =>
      PRINT_OPTIONS.find(
        (s) =>
          s.size === selectedSize.value && s.finish === selectedFinish.value,
      ) ?? PRINT_OPTIONS[0]!,
  )

  const lineTotal = computed(() => option.value.price * quantity.value)

  function decrement() {
    quantity.value = Math.max(1, quantity.value - 1)
  }
  function increment() {
    quantity.value = Math.min(10, quantity.value + 1)
  }

  function addToCart() {
    cart.addPrint(photo.value, option.value, quantity.value)
    justAdded.value = true
  }

  return {
    sizes,
    finishesFor,
    selectedSize,
    selectedFinish,
    quantity,
    justAdded,
    option,
    lineTotal,
    reset,
    decrement,
    increment,
    addToCart,
  }
}

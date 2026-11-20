<!-- app/components/PrintOrderControls.vue -->
<script setup lang="ts">
// Renders the size / finish / quantity / live-price controls. The selection
// state itself lives in a usePrintOrder() instance owned by the parent, so the
// slide-in panel and the inline detail-page form stay in sync with one source.
defineProps<{ order: ReturnType<typeof usePrintOrder> }>()
</script>

<template>
  <div class="space-y-6">
    <fieldset>
      <legend class="field-label">Size (inches)</legend>
      <div class="grid grid-cols-2 gap-2">
        <button
          v-for="size in order.sizes.value"
          :key="size"
          type="button"
          class="rounded-none border px-3 py-2.5 text-sm transition"
          :class="
            order.selectedSize.value === size
              ? 'border-clay bg-clay/10 text-paper'
              : 'border-paper/15 text-paper/60 hover:border-paper/35'
          "
          @click="order.selectedSize.value = size"
        >
          {{ size }}
        </button>
      </div>
    </fieldset>

    <fieldset>
      <legend class="field-label">Finish</legend>
      <div class="flex flex-wrap gap-2">
        <button
          v-for="finish in order.finishesFor(order.selectedSize.value)"
          :key="finish"
          type="button"
          class="rounded-full border px-4 py-2 text-sm transition"
          :class="
            order.selectedFinish.value === finish
              ? 'border-clay bg-clay/10 text-paper'
              : 'border-paper/15 text-paper/60 hover:border-paper/35'
          "
          @click="order.selectedFinish.value = finish"
        >
          {{ finish }}
        </button>
      </div>
    </fieldset>

    <div>
      <p class="field-label">Quantity</p>
      <div class="inline-flex items-center rounded-none border border-paper/15">
        <button
          type="button"
          class="grid h-10 w-10 place-items-center text-paper/70 transition hover:text-paper disabled:opacity-30"
          :disabled="order.quantity.value <= 1"
          aria-label="Decrease quantity"
          @click="order.decrement()"
        >
          &minus;
        </button>
        <span class="w-10 text-center text-sm tabular-nums">{{ order.quantity.value }}</span>
        <button
          type="button"
          class="grid h-10 w-10 place-items-center text-paper/70 transition hover:text-paper disabled:opacity-30"
          :disabled="order.quantity.value >= 10"
          aria-label="Increase quantity"
          @click="order.increment()"
        >
          +
        </button>
      </div>
    </div>

    <div class="flex items-baseline justify-between border-t border-paper/10 pt-5">
      <span class="text-sm text-paper/55">
        {{ formatPrice(order.option.value.price) }}
        <template v-if="order.quantity.value > 1"> &times; {{ order.quantity.value }}</template>
      </span>
      <span class="font-serif text-2xl text-paper">
        {{ formatPrice(order.lineTotal.value) }}
      </span>
    </div>
  </div>
</template>

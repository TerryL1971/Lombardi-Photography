<!-- app/components/PrintOrderPanel.vue -->
<script setup lang="ts">
import { toRef, watch } from 'vue'
import type { Photo } from '~/types/gallery'

const props = defineProps<{ photo: Photo; open: boolean }>()
const emit = defineEmits<{ (e: 'close'): void }>()

const order = usePrintOrder(toRef(props, 'photo'))

watch(
  () => props.open,
  (isOpen) => {
    if (isOpen) order.justAdded.value = false
  },
)
</script>

<template>
  <Transition name="lightbox-fade">
    <div
      v-if="open"
      class="absolute inset-0 z-20 flex justify-end bg-ink/60"
      @click.self="emit('close')"
    >
      <Transition name="panel-slide" appear>
        <aside
          class="flex h-full w-full max-w-md flex-col overflow-y-auto border-l border-paper/10 bg-ink-soft"
          role="dialog"
          aria-label="Order a print"
        >
          <div class="flex items-center justify-between border-b border-paper/10 px-6 py-4">
            <p class="eyebrow">Order a print</p>
            <button
              type="button"
              class="grid h-9 w-9 place-items-center rounded-full text-paper/70 transition hover:bg-paper/10 hover:text-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clay"
              aria-label="Close order panel"
              @click="emit('close')"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M6 6l12 12M18 6L6 18" stroke-linecap="round" />
              </svg>
            </button>
          </div>

          <div class="flex gap-4 px-6 py-5">
            <NuxtImg
              :src="photo.image"
              :alt="photo.alt"
              width="160"
              height="160"
              sizes="120px"
              class="h-20 w-20 shrink-0 object-cover"
            />
            <div>
              <p class="font-serif text-lg leading-tight text-paper">{{ photo.title }}</p>
              <p class="mt-1 text-xs text-paper/50">
                {{ photo.category }} &middot; {{ photo.location }}
              </p>
              <p class="mt-2 text-xs text-paper/45">
                Archival pigment print. Ships in 5–7 business days.
              </p>
            </div>
          </div>

          <PrintOrderControls :order="order" class="px-6 pb-6" />

          <div class="mt-auto border-t border-paper/10 px-6 py-5">
            <Transition name="lightbox-fade" mode="out-in">
              <div v-if="!order.justAdded.value" key="add">
                <button type="button" class="btn-primary w-full" @click="order.addToCart()">
                  Add to cart
                </button>
              </div>
              <div v-else key="added" class="space-y-3">
                <p class="flex items-center gap-2 text-sm text-paper/70">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="text-clay">
                    <path d="M5 12l4.5 4.5L19 7" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                  Added to your cart.
                </p>
                <div class="flex gap-2">
                  <NuxtLink to="/cart" class="btn-primary flex-1">View cart</NuxtLink>
                  <button type="button" class="btn-outline flex-1" @click="emit('close')">
                    Keep browsing
                  </button>
                </div>
              </div>
            </Transition>
          </div>
        </aside>
      </Transition>
    </div>
  </Transition>
</template>

<style scoped>
.panel-slide-enter-active {
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
.panel-slide-leave-active {
  transition: transform 0.28s ease;
}
.panel-slide-enter-from,
.panel-slide-leave-to {
  transform: translateX(100%);
}
</style>

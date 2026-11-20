<!-- app/components/Lightbox.vue -->
<script setup lang="ts">
import { onKeyStroke, useScrollLock } from '@vueuse/core'
import { nextTick, ref, watch } from 'vue'

const { isOpen, items, index, current, hasMultiple, close, next, prev } =
  useLightbox()

const showOrder = ref(false)
const closeBtn = ref<HTMLButtonElement | null>(null)
let lastFocused: HTMLElement | null = null

// Lock body scroll while open (VueUse handles the padding/iOS quirks).
const locked = useScrollLock(
  import.meta.client ? document.body : null,
)

watch(isOpen, async (open) => {
  locked.value = open
  if (open) {
    lastFocused = (document.activeElement as HTMLElement) ?? null
    await nextTick()
    closeBtn.value?.focus()
  } else {
    showOrder.value = false
    lastFocused?.focus?.()
  }
})

// Reset the order panel whenever the visible photo changes.
watch(index, () => {
  showOrder.value = false
})

onKeyStroke('Escape', (e) => {
  if (!isOpen.value) return
  e.preventDefault()
  if (showOrder.value) showOrder.value = false
  else close()
})
onKeyStroke('ArrowRight', () => {
  if (isOpen.value && !showOrder.value) next()
})
onKeyStroke('ArrowLeft', () => {
  if (isOpen.value && !showOrder.value) prev()
})
</script>

<template>
  <ClientOnly>
    <Teleport to="body">
      <Transition name="lightbox-fade">
        <div
          v-if="isOpen && current"
          class="fixed inset-0 z-[60] flex flex-col bg-ink/95 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          :aria-label="`${current.collectionTitle}, ${current.title} — enlarged view`"
        >
          <Transition name="lightbox-zoom" appear>
            <div class="flex h-full w-full flex-col">
              <!-- Top bar -->
              <div
                class="flex items-center justify-between px-4 py-3 sm:px-6 sm:py-4"
              >
                <p class="text-xs tracking-widest text-paper/50">
                  {{ index + 1 }} <span class="mx-1">/</span> {{ items.length }}
                </p>
                <button
                  ref="closeBtn"
                  type="button"
                  class="grid h-10 w-10 place-items-center rounded-full text-paper/80 transition hover:bg-paper/10 hover:text-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clay"
                  aria-label="Close"
                  @click="close"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                    <path d="M6 6l12 12M18 6L6 18" stroke-linecap="round" />
                  </svg>
                </button>
              </div>

              <!-- Stage -->
              <div class="relative flex min-h-0 flex-1 items-center justify-center px-4 pb-4 sm:px-16">
                <button
                  v-if="hasMultiple"
                  type="button"
                  class="absolute left-2 z-10 hidden h-11 w-11 place-items-center rounded-full bg-ink/40 text-paper/80 transition hover:bg-ink/70 hover:text-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clay sm:grid"
                  aria-label="Previous photo"
                  @click="prev"
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                    <path d="M15 5l-7 7 7 7" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </button>

                <div class="relative flex h-full w-full items-center justify-center overflow-hidden">
                  <Transition name="frame-swap">
                    <img
                      :key="current.id"
                      :src="current.large"
                      :alt="current.alt"
                      :width="current.width"
                      :height="current.height"
                      loading="eager"
                      class="max-h-full max-w-full object-contain shadow-2xl shadow-black/50"
                    />
                  </Transition>
                </div>

                <button
                  v-if="hasMultiple"
                  type="button"
                  class="absolute right-2 z-10 hidden h-11 w-11 place-items-center rounded-full bg-ink/40 text-paper/80 transition hover:bg-ink/70 hover:text-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clay sm:grid"
                  aria-label="Next photo"
                  @click="next"
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                    <path d="M9 5l7 7-7 7" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </button>
              </div>

              <!-- Caption bar -->
              <div class="border-t border-paper/10 bg-ink/80 px-4 py-4 sm:px-8 sm:py-5">
                <div class="mx-auto flex max-w-5xl flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                  <div class="min-w-0">
                    <p class="eyebrow">{{ current.collectionTitle }} &middot; {{ current.year }}</p>
                    <h2 class="mt-1 font-serif text-xl text-paper sm:text-2xl">
                      {{ current.title }}
                    </h2>
                    <p v-if="current.caption" class="mt-1 line-clamp-2 max-w-xl text-sm text-paper/55">
                      {{ current.caption }}
                    </p>
                  </div>
                  <div class="flex shrink-0 items-center gap-2">
                    <div class="flex gap-2 sm:hidden">
                      <button v-if="hasMultiple" type="button" class="btn-outline !px-4 !py-2.5" aria-label="Previous" @click="prev">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M15 5l-7 7 7 7" stroke-linecap="round" stroke-linejoin="round"/></svg>
                      </button>
                      <button v-if="hasMultiple" type="button" class="btn-outline !px-4 !py-2.5" aria-label="Next" @click="next">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M9 5l7 7-7 7" stroke-linecap="round" stroke-linejoin="round"/></svg>
                      </button>
                    </div>
                    <button type="button" class="btn-primary" @click="showOrder = true">
                      Order this print
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Transition>

          <!-- Slide-in order panel -->
          <PrintOrderPanel
            v-if="current"
            :photo="current"
            :open="showOrder"
            @close="showOrder = false"
          />
        </div>
      </Transition>
    </Teleport>
  </ClientOnly>
</template>

<!-- app/pages/arrange.vue -->
<!--
  Local arranging tool (works only under `npm run dev`). Drag collections and
  photos into order, pick covers and the home background, rename, hide. "Save"
  writes data/collections.json; commit + push to publish.
-->
<script setup lang="ts">
import { computed, ref } from 'vue'
import type { SiteData, StoredCollection } from '~/types/gallery'

useHead({ title: 'Arrange — Picture It by Terry', meta: [{ name: 'robots', content: 'noindex' }] })

const data = ref<SiteData | null>(null)
const loadError = ref('')
const selectedSlug = ref<string | null>(null)
const dirty = ref(false)
const status = ref('')
const saving = ref(false)

async function load() {
  try {
    data.value = await $fetch<SiteData>('/api/arrange')
    selectedSlug.value ??= data.value.collections.find((c) => c.photos.length)?.slug ?? data.value.collections[0]?.slug ?? null
    dirty.value = false
  } catch {
    loadError.value = 'The arrange tool only works on your computer while running `npm run dev`.'
  }
}
onMounted(load)

const selected = computed(() => data.value?.collections.find((c) => c.slug === selectedSlug.value) ?? null)
const touch = () => {
  dirty.value = true
  status.value = ''
}

const coverOf = (c: StoredCollection) =>
  c.photos.find((p) => p.id === c.cover && !p.hidden) ?? c.photos.find((p) => !p.hidden)

function setCover(id: string) {
  if (!selected.value) return
  selected.value.cover = id
  touch()
}
function setHome(id: string) {
  if (!data.value) return
  data.value.homeBackground = id
  touch()
}

async function save() {
  if (!data.value) return
  saving.value = true
  try {
    await $fetch('/api/arrange', { method: 'POST', body: data.value })
    dirty.value = false
    status.value = 'Saved. Commit and push data/collections.json to publish.'
  } catch (e: unknown) {
    status.value = `Save failed: ${(e as { statusMessage?: string }).statusMessage ?? 'unknown error'}`
  } finally {
    saving.value = false
  }
}

if (import.meta.client) {
  window.addEventListener('beforeunload', (e) => {
    if (dirty.value) e.preventDefault()
  })
}
</script>

<template>
  <div class="px-[3%] pb-16 pt-6">
    <div class="sticky top-[65px] z-20 -mx-[3%] mb-6 flex flex-wrap items-center gap-4 border-b border-paper/10 bg-ink px-[3%] py-3">
      <h1 class="text-xl">Arrange</h1>
      <p class="text-sm text-clay-deep">
        Drag to reorder &middot; ★ sets the cover &middot; ⌂ sets the home background
      </p>
      <div class="ml-auto flex items-center gap-3">
        <span class="text-sm" :class="dirty ? 'text-clay' : 'text-clay-deep'">
          {{ status || (dirty ? 'Unsaved changes' : 'All changes saved') }}
        </span>
        <button type="button" class="btn-primary !py-2" :disabled="!dirty || saving" @click="save">
          {{ saving ? 'Saving…' : 'Save' }}
        </button>
      </div>
    </div>

    <p v-if="loadError" class="py-24 text-center text-clay-deep">{{ loadError }}</p>

    <div v-else-if="data" class="grid gap-6 lg:grid-cols-[340px_1fr]">
      <!-- Collections -->
      <aside>
        <h2 class="mb-3 text-sm font-normal text-clay-deep">Collections (site order)</h2>
        <ArrangeSortable
          :items="data.collections"
          :item-key="(c) => c.slug"
          class="space-y-1"
          @moved="touch"
        >
          <template #default="{ item: c }">
            <div
              class="flex cursor-grab items-center gap-3 border p-2 active:cursor-grabbing"
              :class="[
                c.slug === selectedSlug ? 'border-clay bg-ink-soft' : 'border-paper/10',
                c.hidden || !c.photos.length ? 'opacity-50' : '',
              ]"
              @click="selectedSlug = c.slug"
            >
              <div class="h-10 w-14 shrink-0 bg-ink-muted">
                <img v-if="coverOf(c)" :src="coverOf(c)!.thumb" alt="" class="h-full w-full object-cover" loading="lazy" />
              </div>
              <div class="min-w-0 flex-1">
                <p class="truncate text-sm font-bold">{{ c.title }}</p>
                <p class="text-xs text-clay-deep">
                  {{ c.year }} &middot; {{ c.photos.length }} photos
                  <template v-if="c.hidden"> &middot; hidden</template>
                  <template v-if="!c.photos.length"> &middot; not published yet</template>
                </p>
              </div>
            </div>
          </template>
        </ArrangeSortable>
      </aside>

      <!-- Selected collection -->
      <section v-if="selected">
        <div class="mb-4 flex flex-wrap items-end gap-4">
          <label class="min-w-[220px] flex-1">
            <span class="field-label">Title</span>
            <input v-model="selected.title" class="field" @input="touch" />
          </label>
          <label class="w-28">
            <span class="field-label">Year</span>
            <input v-model.number="selected.year" type="number" class="field" @input="touch" />
          </label>
          <label class="flex items-center gap-2 pb-3 text-sm">
            <input v-model="selected.hidden" type="checkbox" @change="touch" />
            Hide collection
          </label>
        </div>
        <p class="mb-4 text-xs text-clay-deep">
          Lightroom folder: “{{ selected.source }}” &middot; web address: /collection/{{ selected.slug }}
        </p>

        <p v-if="!selected.photos.length" class="py-16 text-center text-clay-deep">
          No photos yet. Publish this collection from Lightroom, then run <code class="text-paper">npm run sync</code>.
        </p>

        <ArrangeSortable
          v-else
          :key="selected.slug"
          :items="selected.photos"
          :item-key="(p) => p.id"
          class="grid grid-cols-3 gap-2 sm:grid-cols-4 xl:grid-cols-6"
          @moved="touch"
        >
          <template #default="{ item: p, index }">
            <div
              class="group relative cursor-grab active:cursor-grabbing"
              :class="{ 'opacity-35': p.hidden }"
            >
              <img :src="p.thumb" :alt="p.file" class="aspect-[4/3] w-full object-cover" loading="lazy" draggable="false" />
              <span class="absolute left-1 top-1 bg-black/60 px-1 text-[11px]">{{ index + 1 }}</span>
              <div class="absolute right-1 top-1 flex gap-1">
                <button
                  type="button"
                  class="tool"
                  :class="{ '!bg-white !text-ink': (selected.cover ?? selected.photos.find((x) => !x.hidden)?.id) === p.id }"
                  title="Use as collection cover"
                  @click.stop="setCover(p.id)"
                >★</button>
                <button
                  type="button"
                  class="tool"
                  :class="{ '!bg-white !text-ink': data.homeBackground === p.id }"
                  title="Use as home-page background"
                  @click.stop="setHome(p.id)"
                >⌂</button>
                <button
                  type="button"
                  class="tool"
                  :title="p.hidden ? 'Show on site' : 'Hide from site'"
                  @click.stop="p.hidden = !p.hidden; touch()"
                >{{ p.hidden ? '◌' : '●' }}</button>
              </div>
              <p class="truncate pt-1 text-[11px] text-clay-deep">{{ p.title || p.file }}</p>
            </div>
          </template>
        </ArrangeSortable>
      </section>
    </div>
  </div>
</template>

<style scoped>
.tool {
  @apply grid h-6 w-6 place-items-center bg-black/60 text-xs text-white opacity-80 transition hover:opacity-100;
}
</style>

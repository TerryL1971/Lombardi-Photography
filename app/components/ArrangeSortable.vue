<!-- app/components/ArrangeSortable.vue -->
<!-- Drag-and-drop wrapper used by /arrange. Reorders `items` in place. -->
<script setup lang="ts" generic="T">
import { useSortable } from '@vueuse/integrations/useSortable'
import { ref } from 'vue'

const props = defineProps<{ items: T[]; itemKey: (item: T) => string; tag?: string }>()
const emit = defineEmits<{ (e: 'moved'): void }>()

const el = ref<HTMLElement | null>(null)
// VueUse's default onUpdate moves the array element (and undoes Sortable's own
// DOM move so Vue stays in charge of rendering); we only need to know it happened.
useSortable(el, props.items, {
  animation: 150,
  onEnd: (e: { oldIndex?: number; newIndex?: number }) => {
    if (e.oldIndex !== e.newIndex) emit('moved')
  },
})
</script>

<template>
  <!-- Each item gets a real wrapper element: Sortable moves elements, and a bare
       slot fragment's hidden anchors would leave Vue's DOM out of step (duplicates). -->
  <component :is="tag ?? 'div'" ref="el">
    <div v-for="(item, i) in items" :key="itemKey(item)">
      <slot :item="item" :index="i" />
    </div>
  </component>
</template>

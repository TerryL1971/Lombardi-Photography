<!-- app/layouts/default.vue -->
<script setup lang="ts">
import { computed } from 'vue'

const route = useRoute()
/** The home page is a full-screen splash with no header or footer. */
const isSplash = computed(() => route.path === '/')
</script>

<template>
  <div class="flex min-h-screen flex-col bg-ink">
    <NavBar v-if="!isSplash" />
    <main class="flex-1" :class="{ 'pt-[65px]': !isSplash }">
      <slot />
    </main>
    <SiteFooter v-if="!isSplash" />
    <!-- Single lightbox instance, portalled to <body>, shared via useLightbox() -->
    <Lightbox />
  </div>
</template>

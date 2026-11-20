<!-- app/error.vue -->
<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()

const is404 = computed(() => props.error?.statusCode === 404)

useHead({ title: is404.value ? 'Not found — Picture It by Terry' : 'Something went wrong' })
</script>

<template>
  <div class="flex min-h-screen flex-col bg-ink">
    <NavBar />
    <main class="container-wide flex flex-1 flex-col items-center justify-center py-32 text-center">
      <p class="eyebrow">{{ error.statusCode }}</p>
      <h1 class="mt-4 max-w-xl font-serif text-4xl text-paper sm:text-5xl">
        {{ is404 ? 'This frame isn\'t in the collection.' : 'Something went wrong.' }}
      </h1>
      <p class="mt-4 max-w-md text-paper/55">
        {{
          is404
            ? 'The page or photograph you were looking for has moved or never existed.'
            : (error.statusMessage || 'An unexpected error occurred. Try again in a moment.')
        }}
      </p>
      <div class="mt-8 flex gap-3">
        <button type="button" class="btn-primary" @click="clearError({ redirect: '/collection' })">
          Open the collection
        </button>
        <button type="button" class="btn-outline" @click="clearError({ redirect: '/' })">
          Go home
        </button>
      </div>
    </main>
    <SiteFooter />
  </div>
</template>

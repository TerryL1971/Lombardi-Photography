<!-- app/pages/contact.vue -->
<script setup lang="ts">
import { reactive, ref } from 'vue'

useHead({
  title: 'Contact — Lombardi Photography',
  meta: [
    {
      name: 'description',
      content:
        'Get in touch about prints, custom sizes, commissions or licensing.',
    },
  ],
})

const form = reactive({
  name: '',
  email: '',
  topic: 'A print enquiry',
  message: '',
})

const topics = [
  'A print enquiry',
  'A custom size or finish',
  'A commission',
  'Licensing an image',
  'Something else',
]

const errors = ref<Record<string, string>>({})
const sent = ref(false)

function submit() {
  const next: Record<string, string> = {}
  if (!form.name.trim()) next.name = 'Required'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = 'Enter a valid email'
  if (form.message.trim().length < 10) next.message = 'A little more detail, please'
  errors.value = next
  if (Object.keys(next).length) return
  // Mock submission — no network call in this portfolio demo.
  sent.value = true
}
</script>

<template>
  <div class="container-prose pb-24 pt-24 sm:pt-32">
    <p class="eyebrow">Contact</p>
    <h1 class="mt-3 font-serif text-4xl text-paper sm:text-5xl">Say hello</h1>

    <Transition name="lightbox-fade" mode="out-in">
      <div v-if="sent" key="sent" class="mt-10 rounded-lg border border-clay/30 bg-clay/5 p-8">
        <p class="font-serif text-2xl text-paper">Thanks, {{ form.name.split(' ')[0] }}.</p>
        <p class="mt-2 text-paper/65">
          Your message about "{{ form.topic.toLowerCase() }}" has been noted. In
          the real site this would land in my inbox and I'd reply within a day or
          two.
        </p>
        <NuxtLink to="/gallery" class="btn-outline mt-6">Back to the gallery</NuxtLink>
      </div>

      <div v-else key="form">
        <p class="mt-4 max-w-lg text-paper/60">
          Questions about a print, a wall you're trying to fill, a commission or
          licensing — this reaches me directly.
        </p>

        <form class="mt-10 space-y-5" novalidate @submit.prevent="submit">
          <div class="grid gap-5 sm:grid-cols-2">
            <div>
              <label class="field-label" for="name">Name</label>
              <input id="name" v-model="form.name" class="field" autocomplete="name" />
              <p v-if="errors.name" class="mt-1 text-xs text-clay">{{ errors.name }}</p>
            </div>
            <div>
              <label class="field-label" for="email">Email</label>
              <input id="email" v-model="form.email" type="email" class="field" autocomplete="email" />
              <p v-if="errors.email" class="mt-1 text-xs text-clay">{{ errors.email }}</p>
            </div>
          </div>

          <div>
            <label class="field-label" for="topic">What's it about?</label>
            <select id="topic" v-model="form.topic" class="field">
              <option v-for="t in topics" :key="t" :value="t">{{ t }}</option>
            </select>
          </div>

          <div>
            <label class="field-label" for="message">Message</label>
            <textarea id="message" v-model="form.message" rows="6" class="field resize-y" />
            <p v-if="errors.message" class="mt-1 text-xs text-clay">{{ errors.message }}</p>
          </div>

          <button type="submit" class="btn-primary w-full sm:w-auto">Send message</button>
          <p class="text-xs text-paper/35">
            Portfolio demo — this form validates and confirms, but doesn't send
            an email.
          </p>
        </form>
      </div>
    </Transition>
  </div>
</template>

<!-- app/pages/index.vue -->
<script setup lang="ts">
useHead({ title: 'Picture It by Terry' })

const cart = useCartStore()
const { data: site } = await useFetch('/api/site')

/** Chosen on /arrange; falls back to a bundled photo before the first sync. */
const background = computed(() => site.value?.background?.url ?? '/images/hero.jpg')

const socials = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/terry-c-lombardi/',
    path: 'M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.5h4v11H3v-11zm6.5 0h3.8v1.6h.1c.5-1 1.8-2 3.8-2 4 0 4.8 2.6 4.8 6v5.4h-4v-4.8c0-1.2 0-2.6-1.6-2.6s-1.9 1.2-1.9 2.5v4.9h-4v-11z',
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/PictureItByTerry',
    path: 'M14 8.5V6.8c0-.8.5-1 .9-1H17V2.2L14.1 2.2C10.9 2.2 10.2 4.6 10.2 6.1v2.4H8v3.7h2.2V22H14v-9.8h2.8l.4-3.7H14z',
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/pictureitbyterry/',
    path: 'M12 7.3A4.7 4.7 0 1 0 12 16.7 4.7 4.7 0 0 0 12 7.3zm0 7.7a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm6-7.9a1.1 1.1 0 1 1-2.2 0 1.1 1.1 0 0 1 2.2 0zM21.9 8.2c-.1-1.6-.4-3-1.6-4.2S17.4 2.5 15.8 2.4C14.2 2.3 9.8 2.3 8.2 2.4 6.6 2.5 5.2 2.8 4 4S2.5 6.6 2.4 8.2c-.1 1.6-.1 6 0 7.6.1 1.6.4 3 1.6 4.2s2.6 1.5 4.2 1.6c1.6.1 6 .1 7.6 0 1.6-.1 3-.4 4.2-1.6s1.5-2.6 1.6-4.2c.1-1.6.1-6 0-7.6zM19.8 18c-.3.9-1 1.5-1.8 1.8-1.3.5-4.3.4-5.8.4s-4.5.1-5.8-.4c-.9-.3-1.5-1-1.8-1.8-.5-1.3-.4-4.3-.4-5.8s-.1-4.5.4-5.8c.3-.9 1-1.5 1.8-1.8 1.3-.5 4.3-.4 5.8-.4s4.5-.1 5.8.4c.9.3 1.5 1 1.8 1.8.5 1.3.4 4.3.4 5.8s.1 4.5-.4 5.8z',
  },
  {
    label: 'Email',
    href: 'mailto:pictureitbyterry@gmail.com',
    path: 'M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zm9 7.2L4 7v10h16V7l-8 5.2zM5.2 6.8 12 11l6.8-4.2H5.2z',
  },
]
</script>

<template>
  <section class="relative flex min-h-screen items-center justify-center overflow-hidden px-[5%] py-16">
    <!-- Background photo under a 75% black wash -->
    <img
      :src="background"
      alt=""
      fetchpriority="high"
      class="fixed inset-0 h-full w-full object-cover"
    />
    <div class="fixed inset-0 bg-black/75" />

    <div class="relative z-10 mx-auto w-full max-w-[800px] text-center animate-fade-up">
      <h1 class="font-display text-[56px] font-light leading-[1.05] text-white sm:text-[80px] lg:text-[100px]">
        Picture It...
      </h1>
      <p class="mt-1 font-script text-[56px] leading-none text-white sm:text-[84px] lg:text-[100px]">
        by Terry
      </p>
      <p class="mt-6 text-[14px] text-clay sm:text-[17px] lg:text-[20px]">
        Looking through the eyes of my lens
      </p>

      <div class="py-5">
        <NuxtLink
          to="/collection"
          class="inline-block rounded-full border border-white bg-white/80 px-10 font-display text-[20px] font-bold leading-[40px] text-[#111] transition hover:bg-white"
        >
          Collection
        </NuxtLink>
      </div>

      <ul class="flex justify-center gap-3">
        <li v-for="s in socials" :key="s.label">
          <a
            :href="s.href"
            class="splash-icon"
            :aria-label="s.label"
            :target="s.href.startsWith('http') ? '_blank' : undefined"
            rel="noopener"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path :d="s.path" /></svg>
          </a>
        </li>
        <li>
          <NuxtLink
            to="/cart"
            class="splash-icon"
            :aria-label="cart.ready && cart.count ? `Cart, ${cart.count} items` : 'Cart'"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M2.5 3.5h2.2l2.2 11.1a1.5 1.5 0 0 0 1.5 1.2h8.6a1.5 1.5 0 0 0 1.5-1.2L21.5 7H6" />
              <circle cx="9" cy="20" r="1.4" />
              <circle cx="17" cy="20" r="1.4" />
            </svg>
          </NuxtLink>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.splash-icon {
  @apply grid h-[38px] w-[38px] place-items-center rounded-full bg-black/10 text-white transition hover:text-clay;
}
.splash-icon svg {
  @apply h-[25px] w-[25px];
}
</style>

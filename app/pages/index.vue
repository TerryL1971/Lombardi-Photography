<!-- app/pages/index.vue -->
<script setup lang="ts">
useHead({ title: 'Lombardi Photography — Cities, Streets & Gardens' })

const cart = useCartStore()
</script>

<template>
  <section class="relative flex min-h-screen items-center justify-center overflow-hidden px-[5%] py-16">
    <!-- Background photo under a 75% black wash -->
    <NuxtImg
      src="/images/hero.jpg"
      alt=""
      sizes="xs:100vw xl:1920px"
      width="1920"
      height="1120"
      loading="eager"
      preload
      fetchpriority="high"
      class="fixed inset-0 -z-0 h-full w-full object-cover"
    />
    <div class="fixed inset-0 bg-black/75" />

    <div class="relative z-10 mx-auto w-full max-w-[800px] text-center animate-fade-up">
      <h1 class="font-display text-[48px] font-light leading-[1.05] text-white sm:text-[80px] lg:text-[100px]">
        Lombardi...
      </h1>
      <p class="mt-1 font-script text-[54px] leading-none text-white sm:text-[84px] lg:text-[100px]">
        Photography
      </p>
      <p class="mt-6 text-[14px] text-clay sm:text-[17px] lg:text-[20px]">
        Looking through the eyes of my lens
      </p>

      <div class="py-5">
        <NuxtLink
          to="/gallery"
          class="inline-block rounded-full border border-white bg-white/80 px-10 font-display text-[20px] font-bold leading-[40px] text-[#111] transition hover:bg-white"
        >
          Collection
        </NuxtLink>
      </div>

      <!-- Icon row (stands in for the reference's social icons) -->
      <ul class="flex justify-center gap-4">
        <li>
          <NuxtLink to="/about" class="splash-icon" aria-label="Meet the Photographer">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <circle cx="12" cy="8" r="4" />
              <path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6" stroke-linecap="round" />
            </svg>
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/contact" class="splash-icon" aria-label="Contact">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <rect x="3" y="5" width="18" height="14" rx="1.5" />
              <path d="M3.5 6l8.5 7 8.5-7" stroke-linejoin="round" />
            </svg>
          </NuxtLink>
        </li>
        <li>
          <NuxtLink
            to="/cart"
            class="splash-icon relative"
            :aria-label="cart.ready && cart.count ? `Cart, ${cart.count} items` : 'Cart'"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
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

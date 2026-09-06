<!-- app/components/SiteFooter.vue -->
<script setup lang="ts">
const year = new Date().getFullYear()
</script>

<template>
  <footer class="border-t border-paper/10 bg-ink">
    <div class="container-wide py-14">
      <div class="flex flex-col gap-12 md:flex-row md:justify-between">
        <div class="max-w-sm">
          <p class="font-serif text-xl text-paper">Lombardi<span class="text-clay">.</span></p>
          <p class="mt-3 text-sm leading-relaxed text-paper/55">
            Travel and place photography — European old towns, side streets and
            gardens. Prints are made to order on archival paper and canvas.
          </p>
        </div>

        <div class="flex gap-16 sm:gap-24">
          <nav class="flex flex-col gap-2.5 text-sm">
            <p class="mb-1 text-xs font-medium uppercase tracking-widest text-paper/35">
              Explore
            </p>
            <NuxtLink class="footer-link" to="/gallery">Gallery</NuxtLink>
            <NuxtLink class="footer-link" to="/about">About</NuxtLink>
            <NuxtLink class="footer-link" to="/contact">Contact</NuxtLink>
          </nav>

          <nav class="flex flex-col gap-2.5 text-sm">
            <p class="mb-1 text-xs font-medium uppercase tracking-widest text-paper/35">
              Prints
            </p>
            <NuxtLink class="footer-link" to="/gallery?category=Cities">Cities</NuxtLink>
            <NuxtLink class="footer-link" to="/gallery?category=Streets">Streets</NuxtLink>
            <NuxtLink class="footer-link" to="/gallery?category=Gardens">Gardens</NuxtLink>
          </nav>
        </div>
      </div>

      <div class="mt-12 border-t border-paper/10 pt-6 text-xs text-paper/40">
        <p>
          &copy; {{ year }} Lombardi Photography. All images shown for portfolio
          demonstration.
        </p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer-link {
  @apply text-paper/55 transition hover:text-paper;
}
</style>

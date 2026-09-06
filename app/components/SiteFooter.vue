<!-- app/components/SiteFooter.vue -->
<script setup lang="ts">
const year = new Date().getFullYear()
</script>

<template>
  <footer class="border-t border-paper/10 bg-ink">
    <div class="container-wide py-14">
      <div class="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
        <div class="max-w-sm">
          <p class="font-serif text-xl text-paper">Lombardi<span class="text-clay">.</span></p>
          <p class="mt-3 text-sm leading-relaxed text-paper/55">
            Travel and place photography — European old towns, side streets and
            gardens. Prints are made to order on archival paper and canvas.
          </p>
        </div>

        <nav class="grid grid-cols-2 gap-x-12 gap-y-2 text-sm sm:grid-cols-3">
          <NuxtLink class="footer-link" to="/gallery">Gallery</NuxtLink>
          <NuxtLink class="footer-link" to="/about">About</NuxtLink>
          <NuxtLink class="footer-link" to="/contact">Contact</NuxtLink>
          <NuxtLink class="footer-link" to="/gallery?category=Cities">Cities</NuxtLink>
          <NuxtLink class="footer-link" to="/gallery?category=Streets">Streets</NuxtLink>
          <NuxtLink class="footer-link" to="/gallery?category=Gardens">Gardens</NuxtLink>
        </nav>
      </div>

      <div
        class="mt-12 flex flex-col gap-2 border-t border-paper/10 pt-6 text-xs text-paper/40 sm:flex-row sm:items-center sm:justify-between"
      >
        <p>&copy; {{ year }} Lombardi Photography. All images shown for portfolio demonstration.</p>
        <p>Built with Nuxt &middot; Deployed on Vercel</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer-link {
  @apply py-1 text-paper/55 transition hover:text-paper;
}
</style>

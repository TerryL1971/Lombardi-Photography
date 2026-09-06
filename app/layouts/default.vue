<!-- app/layouts/default.vue -->
<template>
  <div class="flex min-h-screen flex-col bg-ink">
    <NavBar />
    <main class="flex-1">
      <slot />
    </main>
    <SiteFooter />
    <!-- Single lightbox instance, portalled to <body>, shared via useLightbox() -->
    <Lightbox />
  </div>
</template>

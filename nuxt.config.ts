// nuxt.config.ts
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@nuxt/image',
  ],

  css: ['~/assets/css/main.css'],

  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      title: 'Lombardi Photography — Cities, Streets & Gardens',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            'Lombardi Photography — travel and place photography from the old towns, side streets and gardens of Europe. Browse the gallery and order archival prints.',
        },
        { name: 'theme-color', content: '#141210' },
        { property: 'og:title', content: 'Lombardi Photography' },
        {
          property: 'og:description',
          content:
            'Travel and place photography from the old towns, side streets and gardens of Europe. Order archival prints.',
        },
        { property: 'og:type', content: 'website' },
        { property: 'og:image', content: '/images/hero.jpg' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: '',
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Inter:wght@400;500;600&display=swap',
        },
      ],
    },
    pageTransition: { name: 'page', mode: 'out-in' },
  },

  image: {
    // Picsum-sourced local assets live in /public/images.
    // @nuxt/image auto-selects the Vercel provider on deploy and IPX locally.
    quality: 72,
    format: ['webp'],
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
    },
  },

  nitro: {
    preset: 'vercel',
  },
})

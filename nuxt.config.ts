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
      title: 'Picture It by Terry',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            'Personal portfolio of landscape and architecture photography by Terry C Lombardi. Browse the collection and order prints.',
        },
        { name: 'theme-color', content: '#222222' },
        { property: 'og:title', content: 'Picture It by Terry' },
        {
          property: 'og:description',
          content:
            'Personal portfolio of landscape and architecture photography by Terry C Lombardi.',
        },
        { property: 'og:type', content: 'website' },
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
          href: 'https://fonts.googleapis.com/css2?family=Allura&family=Josefin+Sans:wght@300;400&family=Mulish:wght@400;600;700&display=swap',
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
    // data/collections.json is read by server/utils/site-data.ts
    serverAssets: [{ baseName: 'data', dir: '../data' }],
  },

  routeRules: {
    // Old demo URLs
    '/gallery': { redirect: { to: '/collection', statusCode: 301 } },
    '/gallery/**': { redirect: { to: '/collection', statusCode: 301 } },
    // Local-only arranging tool; never index it
    '/arrange': { headers: { 'X-Robots-Tag': 'noindex' } },
  },
})

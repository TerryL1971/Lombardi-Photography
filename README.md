# Lombardi Photography

Portfolio piece — a photographer's portfolio and print shop, built to demonstrate
Vue / Nuxt fluency plus e-commerce logic applied to a visual product.

**Not a live client build.** All photographs are Terry Lombardi's own travel work
(Heidelberg, Lucerne, Strasbourg, London, Keukenhof); the shop, cart and checkout
are a functional mock — no payment is processed and no print is made.

## Stack

| | |
|---|---|
| Framework | [Nuxt 4](https://nuxt.com) (Vue 3, Composition API, `<script setup>`) |
| Styling | Tailwind CSS via `@nuxtjs/tailwindcss` |
| State | Pinia (`@pinia/nuxt`) — cart, with `localStorage` persistence |
| Utilities | VueUse (`onKeyStroke`, `useScrollLock`, `useWindowScroll`) |
| Images | `@nuxt/image` — responsive `<NuxtImg>`, WebP, lazy-loading |
| Data | local JSON (`data/gallery.json`) — no CMS |
| Deploy target | Vercel (Nitro `vercel` preset) |

## What it demonstrates

- **Gallery + lightbox interaction** — filterable masonry grid, an overlay
  lightbox (not a route) with keyboard navigation, scroll-lock, focus handling
  and native `<Transition>` crossfades.
- **E-commerce logic on a non-standard product** — ordering a print of a specific
  photo with size × finish variants and a live-updating price, a cart with
  quantities and persistence, and a mock checkout with validation and an order
  confirmation.
- **Framework-native technique** — Vue's built-in `<Transition>` rather than a
  motion library; shared selection logic extracted into a `usePrintOrder()`
  composable used by both the slide-in panel and the inline detail-page form.

## Project layout

```
app/
  components/    NavBar, SiteFooter, GalleryGrid, PhotoCard, Lightbox,
                 PrintOrderPanel, PrintOrderControls, CartItem, NavCartButton
  composables/   useGallery, useLightbox, usePrintOrder
  stores/        cart.ts  (Pinia)
  pages/         index, gallery/index, gallery/[slug], cart, checkout,
                 about, contact
  plugins/       cart.client.ts  (rehydrate cart from localStorage)
  assets/css/    main.css
data/gallery.json        21 photographs + print options
public/images/           web-sized JPEG masters
```

## Develop

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (Vercel preset)
npm run preview    # preview the build locally
```

## Deploy (Vercel)

1. Push this repo to GitHub.
2. Import it in Vercel — the Nuxt preset is detected automatically; no env vars.
3. `@nuxt/image` switches to Vercel's image optimizer on deploy.

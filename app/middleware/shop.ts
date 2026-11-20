// app/middleware/shop.ts — sends visitors away from shop pages while the shop is off
export default defineNuxtRouteMiddleware(() => {
  if (!useAppConfig().shop.enabled) return navigateTo('/collection', { redirectCode: 302 })
})

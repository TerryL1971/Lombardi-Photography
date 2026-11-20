// app/app.config.ts
export default defineAppConfig({
  shop: {
    /**
     * Print shop on/off. While false the site is a pure portfolio: no cart icon,
     * no "Order this print", and /cart, /checkout redirect to the collection.
     * Flip to true (and push) to turn print ordering back on.
     */
    enabled: false,
  },
})

// app/plugins/protect-images.client.ts
// Disables the right-click menu site-wide (except in form fields, so the contact
// form still allows paste) and blocks dragging images out of the page.
// This deters casual saving only; it can't stop screenshots — the watermark
// remains the real protection.
export default defineNuxtPlugin(() => {
  const route = useRoute()
  const inFormField = (t: EventTarget | null) =>
    t instanceof Element && !!t.closest('input, textarea, select, [contenteditable="true"]')

  document.addEventListener('contextmenu', (e) => {
    if (route.path.startsWith('/arrange') || inFormField(e.target)) return
    e.preventDefault()
  })

  document.addEventListener('dragstart', (e) => {
    if (e.target instanceof HTMLImageElement) e.preventDefault()
  })
})

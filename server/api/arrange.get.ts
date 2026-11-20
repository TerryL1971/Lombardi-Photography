// server/api/arrange.get.ts — raw data for the /arrange page (local dev only)
export default defineEventHandler(async () => {
  if (!import.meta.dev) throw createError({ statusCode: 404 })
  return await loadSiteData()
})

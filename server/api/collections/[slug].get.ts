// server/api/collections/[slug].get.ts — one collection with its photos
export default defineEventHandler(async (event) => {
  const data = await loadSiteData()
  const found = detail(data, getRouterParam(event, 'slug') ?? '')
  if (!found) throw createError({ statusCode: 404, statusMessage: 'Collection not found' })
  return found
})

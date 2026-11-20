// server/api/photos/[id].get.ts — a single photo for /photo/[id]
export default defineEventHandler(async (event) => {
  const data = await loadSiteData()
  const found = findPhoto(data, getRouterParam(event, 'id') ?? '')
  if (!found) throw createError({ statusCode: 404, statusMessage: 'Photo not found' })
  return found
})

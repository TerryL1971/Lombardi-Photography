// server/api/collections/index.get.ts — cover grid for /collection
export default defineEventHandler(async () => {
  const data = await loadSiteData()
  return visibleCollections(data).map(summarize)
})

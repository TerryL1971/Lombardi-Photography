// server/api/site.get.ts — data for the home splash
export default defineEventHandler(async () => {
  const data = await loadSiteData()
  return { background: homeBackground(data) }
})

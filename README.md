# Picture It by Terry

Photography portfolio and print shop for Terry C Lombardi, live at
**https://shop.pictureitbyterry.com**. Photos come straight from Lightroom
Classic collections; the design mirrors the Adobe Portfolio site at
pictureitbyterry.com.

> Print checkout is still a non-functional demo: no payment is taken and no
> print is ordered.

## Updating photos (the everyday workflow)

1. **Lightroom Classic:** in the Publish Services panel, click **Publish** on
   the *Picture It Website* service. Changed, added and removed photos are written
   to `~/Pictures/PictureItByTerry Website/<collection name>/`.
2. **Terminal, in this folder:** `npm run sync`
   Uploads new/changed photos to Cloudinary, deletes removed ones, and updates
   `data/collections.json`. Unchanged photos are skipped, so re-runs are quick.
   (`npm run sync -- --dry-run` shows what would change without touching anything.)
3. **Arrange (optional):** `npm run dev`, open http://localhost:3000/arrange.
   Drag collections and photos into order, ★ a cover photo, ⌂ the home-page
   background, rename a collection, set its year, or hide photos/collections.
   Click **Save**.
4. **Publish:** commit and push. Vercel redeploys the site automatically.

```bash
git add data/collections.json
git commit -m "Update photos"
git push
```

## One-time setup

### Cloudinary (photo hosting)

1. Create a free account at cloudinary.com.
2. Dashboard → **API Keys** → copy the **API environment variable**
   (`cloudinary://<key>:<secret>@<cloud-name>`).
3. Add it to `.env.local` in this folder (never commit this file):
   ```
   CLOUDINARY_URL=cloudinary://<key>:<secret>@<cloud-name>
   ```
The site itself doesn't need the key. Photo URLs are public and stored in
`data/collections.json`. Only `npm run sync` uses it.

### Lightroom Classic publish service

1. **Library → Publish Services panel → Hard Drive → Set Up…**
2. **Publish Service → Description:** `Picture It Website`
3. **Export Location:** *Specific folder* → `~/Pictures`, tick *Put in Subfolder*:
   `PictureItByTerry Website`
4. **File Naming:** *Filename* (keep the original names; they become the photo IDs)
5. **File Settings:** JPEG, Quality 85, Color Space sRGB
6. **Image Sizing:** *Resize to Fit: Long Edge* 2400 px, *Don't Enlarge*
7. **Metadata:** *Copyright & Contact Info Only* or *All Except Camera Raw Info*.
   Any **Title** or **Caption** you set in Lightroom appears on the site.
8. **Watermarking:** your choice; it is baked into what the site shows.
9. **Save.**
10. For each collection: right-click the service → **Create Published Collection…**,
    give it **exactly the same name as the Lightroom collection** (e.g.
    `Eastbourne, UK_`, `Rothenburg o.d.T. Dec 2019`), then select all photos in the
    original collection and drag them onto it. Click **Publish**.

The site matches publish folders to collections by that name (the `source` field
in `data/collections.json`). A folder with a new name becomes a new collection at
the end of the list; rename it on `/arrange`. Folders listed under `ignore` in
`data/collections.json` are skipped.

To use a different publish folder: `LR_PUBLISH_DIR=/path npm run sync` or
`npm run sync -- --dir /path`.

## Stack

| | |
|---|---|
| Framework | Nuxt 4 (Vue 3) on Vercel, `vercel` Nitro preset |
| Styling | Tailwind CSS. Fonts: Mulish, Josefin Sans Light, Allura (Google Fonts) |
| Photos | Lightroom Classic → `scripts/sync-photos.mjs` (sharp, exifr) → Cloudinary |
| Data | `data/collections.json`, read server-side via `server/api/*` |
| State | Pinia cart with `localStorage` persistence |

## Project layout

```
app/pages/        index (splash), collection/, collection/[slug], photo/[id],
                  about, contact, cart, checkout, arrange (local only)
app/components/   NavBar, SiteFooter, CollectionCard, PhotoGrid, Lightbox,
                  PrintOrderPanel, PrintOrderControls, CartItem, ArrangeSortable
app/utils/prints.ts   print sizes, finishes and prices (one list for all photos)
server/api/       site, collections, photos, arrange (dev-only read/write)
server/utils/site-data.ts   shapes collections.json for the pages
scripts/sync-photos.mjs     Lightroom → Cloudinary sync
data/collections.json       collections, order, covers, photo list
```

## Development

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
```

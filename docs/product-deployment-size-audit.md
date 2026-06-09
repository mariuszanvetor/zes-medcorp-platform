# Product Deployment Size Audit

Generated: 2026-06-09T12:14:47.719Z

## Root Cause Summary

The failed deployment had two separate risks:

1. Product indexation was not safe because products marked indexable still included source-derived titles, mixed-language public names, and generic descriptions.
2. The Vercel upload package was too large because generated product assets were committed under `public/` and product redirects were expanded into tens of thousands of custom Next.js redirects.

## Quality Safety Reset

| Metric | Result |
| --- | ---: |
| Products in catalog | 8,823 |
| Products reset in this run | 0 |
| Product detail pages currently indexable | 0 |
| Product detail URLs allowed in sitemap | 0 |

All product detail pages remain noindex until a future manual approval/indexation phase.

## Asset Size Audit

| Asset area | Files | Size | Deployment status |
| --- | ---: | ---: | --- |
| Local product images archive | 8,764 | 769.4 MB | Ignored by Git/Vercel |
| Local product documents archive | 114 | 103.7 MB | Ignored by Git/Vercel |
| Public product images | 0 | 0.0 MB | Not shipped |
| Public product documents | 0 | 0.0 MB | Not shipped |
| Product catalog JSON | 1 | 93.4 MB | Still part of app data; next optimization target |

## Largest Runtime Risk Areas

- `public/product-images` previously contained thousands of static files and roughly 769.4 MB.
- `public/product-documents` previously contained 114 files and roughly 103.7 MB.
- `data/product-catalog/products.json` remains large and should be split or moved to a runtime data source before mass catalog publishing.

## Redirect Cleanup

| Redirect source | Before | After |
| --- | ---: | ---: |
| Product slug redirects in `next.config.ts` | 36,351 | 0 |
| Product redirects handled programmatically in `/produse/[slug]` | 0 | 36,351 |
| Legacy non-product redirects in `next.config.ts` | 12 | 12 |

The product redirect map remains available as data, but it is no longer expanded into Next.js custom routes.

## Asset Policy

- Source-limited products do not ship static product assets.
- Non-public products do not ship static product assets.
- Reviewed display products may use same-site proxy URLs instead of committed static files.
- Future indexable products must use lightweight remote/object-storage assets or a server-side proxy/cache, not thousands of committed `public/` files.
- Local product assets are retained in ignored `data/product-assets-local/` for repair and review workflows.

## Category Data Coverage

- emergency: 1,434 products
- surgical-instruments: 1,340 products
- diagnostic: 1,266 products
- medical-furniture: 1,023 products
- operator-protection: 731 products
- patient-care: 545 products
- monitoring: 537 products
- physiotherapy: 375 products
- sterilization: 359 products
- laboratory: 269 products
- gynecology: 241 products
- electromedical: 225 products
- medical-bags: 108 products
- medical-lights: 102 products
- scales-measures: 102 products
- ent: 79 products
- anatomy-models: 69 products
- veterinary: 18 products

## Deployment Risk After Fix

Risk is materially lower because static product assets and 36k product redirects are removed from the Vercel upload/build route. Remaining risk is the 93+ MB product JSON file and the size of full catalog runtime imports. The next architecture step should split catalog data by category/status or move it to a lightweight runtime data source before any future mass product deployment.

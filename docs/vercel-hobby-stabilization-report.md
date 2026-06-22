# Vercel Hobby Stabilization Report

## Scope

This phase stabilizes ZESCORP after the Vercel Hobby fair-use pause while preserving the GIMA catalog SEO strategy.

The public application no longer imports the full internal GIMA catalog at runtime. A build-time script now creates a small public catalog containing only verified display products.

## Product Indexation Policy

Only products with `reviewStatus` equal to `premium` or `indexable_verified` may be indexable.

All other products remain:

- `noindex,follow`
- excluded from sitemap
- excluded from on-demand product rendering unless included in the generated public display subset

The product sitemap is temporarily capped at 500 verified product URLs.

## Current Counts

| Metric | Count |
| --- | ---: |
| Source products | 8,823 |
| Runtime public products | 658 |
| Indexable verified products | 500 |
| Display-only noindex products | 158 |
| Product URLs in sitemap | 500 |
| Public product redirects | 631 |

## Files Changed

- `scripts/product-catalog/build-public-catalog.mjs`
- `data/product-catalog/products-public.json`
- `data/product-catalog/product-redirects-public.json`
- `src/lib/product-catalog.ts`
- `src/app/produse/[slug]/page.tsx`
- `src/app/produse/categorie/[slug]/page.tsx`
- `src/app/sitemap.ts`
- `src/lib/server-rate-limit.ts`
- `src/app/api/zes-guide/route.ts`
- `src/app/api/zes-guide/file-analysis/route.ts`
- `src/app/api/leads/route.ts`
- `src/app/api/product-assets/images/[code]/[...file]/route.ts`
- `src/app/api/product-assets/documents/[code]/[...file]/route.ts`
- `src/proxy.ts`
- `package.json`
- `.vercelignore`

## Runtime Reduction

Expected reduction:

- Product runtime data loaded by public pages: from roughly 99 MB to a small curated subset.
- Product sitemap URLs: capped at 500.
- Product redirects loaded by runtime: reduced from tens of thousands to 631 public redirects.
- Product detail rendering: static-first; weak/unknown product slugs no longer trigger on-demand rendering.
- Product asset proxy: stricter rate limits and long cache headers.
- Expensive POST endpoints: stricter anonymous limits and suspicious request blocking.
- Vercel Image Optimization: remains disabled through `images.unoptimized = true`.

Expected Vercel usage impact:

- Fluid Active CPU: materially lower because public product pages import a smaller catalog and avoid dynamic fallback for weak products.
- Function invocations: lower for bad bot traffic through proxy blocking and stricter API limits.
- Image optimization transformations: expected to stay near zero because Next image optimization is disabled.
- ISR reads/writes: lower because product pages are static-first and no aggressive revalidation was added.

## Vercel Monitoring Checklist

### After 1 Hour

- Fluid Active CPU should not climb rapidly after deploy.
- Image Optimization Transformations should remain flat.
- Function Invocations should not spike from `/api/product-assets/*` or `/api/zes-guide`.
- Confirm no deployment upload warning appears.

Warning thresholds:

- Fluid Active CPU > 20 minutes in first hour
- Function Invocations > 5,000 in first hour
- Image Optimization Transformations > 50 in first hour

### After 24 Hours

- Fluid Active CPU should remain below 1 hour/day.
- Function Invocations should remain comfortably below daily pro-rata free plan pace.
- ISR Writes should remain very low.
- Check Vercel request paths for repeated product asset proxy hits.

Warning thresholds:

- Fluid Active CPU > 2 hours/day
- Function Invocations > 75,000/day
- ISR Writes > 5,000/day
- Image Optimization Transformations > 100/day

### After 7 Days

- Fluid Active CPU should remain below weekly pace for Hobby.
- Check whether bots are repeatedly hitting held-back product URLs.
- Review Search Console crawl stats after the sitemap cap.

Warning thresholds:

- Fluid Active CPU > 3 hours/week
- Function Invocations > 400,000/week
- ISR Reads > 250,000/week
- Image Optimization Transformations > 500/week

## Remaining Risks

- Product images/documents are still proxied when requested. Long-term, move verified product assets to CDN/static object storage.
- Full internal catalog files remain in the repository for local work, but are excluded from Vercel deployment through `.vercelignore`.
- The public catalog generator should be kept as the only path to product indexation.
- Future indexation should happen in batches of 100-500 products with Vercel Usage review between batches.

## Recommended Next Step

Keep the 500-product cap for at least 7 days after deploy. If Vercel usage remains stable, increase the cap gradually only after another manual product QA pass.

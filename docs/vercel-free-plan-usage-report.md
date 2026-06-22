# Vercel Free Plan Usage Reduction Report

Generated: 2026-06-22

## Context

Observed Vercel free-plan pressure:

- Fluid Active CPU: 13h 38m / 4h
- Image Optimization Transformations: 5.1K / 5K
- ISR Reads: 299K / 1M
- ISR Writes: 49K / 200K
- Function Invocations: 79K / 1M

## Root causes found

1. Next.js Image Optimization was enabled while product/category/marketing pages use `next/image`.
   This can consume Vercel Image Optimization Transformations for product images, landing visuals, logo and page media.

2. Product image/document proxy routes used `fetch(..., { next: { revalidate: 2592000 } })`.
   That can create Data Cache / ISR read-write activity for remote product assets.

3. Expensive API endpoints existed without a shared server-side abuse guard:
   - `/api/zes-guide`
   - `/api/zes-guide/file-analysis`
   - `/api/leads`
   - `/api/product-assets/images/[code]/[...file]`
   - `/api/product-assets/documents/[code]/[...file]`

4. Admin pages are intentionally dynamic:
   - `/admin/content-ops`
   - `/admin/lead-flow`
   - `/admin/leads`
   - `/admin/seo-launch`

5. Product detail pages are rendered on demand to avoid a huge deployment package. They remain cacheable/indexation-controlled by product quality rules, but should not be mass-crawled before a stable launch batch is approved.

## Files changed

- `next.config.ts`
  - Added `images.unoptimized = true` to disable Vercel Image Optimization completely.

- `src/lib/server-rate-limit.ts`
  - Added a lightweight in-memory server-side rate limiter keyed by IP/user-agent fingerprint.

- `src/app/api/zes-guide/route.ts`
  - Added rate limiting: 24 requests / 5 minutes per client.
  - Added `Cache-Control: no-store`.

- `src/app/api/zes-guide/file-analysis/route.ts`
  - Added rate limiting: 8 uploads / 5 minutes per client.
  - Added `Cache-Control: no-store`.

- `src/app/api/leads/route.ts`
  - Added rate limiting: 12 submissions / 5 minutes per client.
  - Preserved existing duplicate-submission cooldown.
  - Added `Cache-Control: no-store`.

- `src/app/api/product-assets/images/[code]/[...file]/route.ts`
  - Added generous image proxy rate limiting: 480 image requests / 5 minutes per client.
  - Removed `next.revalidate` from remote fetches to avoid ISR/Data Cache churn.
  - Kept one-year CDN/browser cache headers.

- `src/app/api/product-assets/documents/[code]/[...file]/route.ts`
  - Added document proxy rate limiting: 120 document requests / 5 minutes per client.
  - Removed `next.revalidate` from remote fetches to avoid ISR/Data Cache churn.
  - Kept one-year CDN/browser cache headers.

## Dynamic/API route audit

API routes:

- `/api/leads`: dynamic by design; now rate-limited and no-store.
- `/api/zes-guide`: dynamic AI endpoint; now rate-limited and no-store.
- `/api/zes-guide/file-analysis`: dynamic file-analysis endpoint; now rate-limited and no-store.
- `/api/admin/verify-access`: dynamic admin auth endpoint; already has attempt limiting.
- `/api/product-assets/images/[code]/[...file]`: dynamic product asset proxy; now CDN-cached, rate-limited, and no longer uses ISR/Data Cache revalidation.
- `/api/product-assets/documents/[code]/[...file]`: dynamic product document proxy; now CDN-cached, rate-limited, and no longer uses ISR/Data Cache revalidation.

Dynamic pages:

- Admin pages remain `force-dynamic` intentionally.
- Product detail pages remain on-demand to avoid massive build/deployment uploads.
- Product category pages have static params and are cacheable.
- SEO/service/landing/resource pages are static or SSG through local data.

Client-side timers:

- Floating ZES assistant uses a local `setTimeout` for UI auto-open only; it does not poll.
- No cron-like browser polling loops were found in public pages.

## Expected Vercel usage reduction

- Image Optimization Transformations: expected to drop to zero for new requests because `images.unoptimized = true` disables the optimizer.
- ISR Reads/Writes: expected to drop for product asset proxy requests because remote asset fetches no longer use `next.revalidate`.
- Fluid Active CPU: expected to decrease from fewer image transformations, fewer expensive API bursts, and rate-limited AI/file/lead endpoints.
- Function Invocations: not eliminated for API/proxy routes, but abusive bursts should be capped. Product asset responses keep long CDN cache headers to reduce repeated origin execution.

## Remaining recommendations

1. Keep product indexation staged. Do not expose thousands of product URLs to Google until the deployment package and asset strategy are stable.
2. Move product media to external object storage/CDN when possible, then serve direct CDN URLs instead of a Next.js API proxy.
3. Monitor Vercel Analytics after deployment for:
   - top function routes by CPU
   - bot user agents hitting `/api/product-assets/*`
   - repeated `/api/zes-guide` calls
4. If product asset proxy still dominates invocations, switch product image URLs to a dedicated CDN/storage domain and keep the proxy only as fallback.

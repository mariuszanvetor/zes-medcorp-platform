# Vercel SEO Safety Report

Audit date: 2026-06-23T06:50:31.121Z

## Current Safety State

- Image Optimization disabled: yes.
- Runtime public products: 658.
- Indexable products: 500.
- Product URLs in sitemap: 500.
- Product detail pages are static-first.
- Product categories are static with long revalidate.

## Top 20 Vercel Risks

| # | Risc | Impact CPU | Impact SEO | Recomandare |
| --- | --- | --- | --- | --- |
| 1 | Product asset proxy bot hits | High CPU/functions | Medium SEO | Move assets to CDN; monitor /api/product-assets |
| 2 | Increasing sitemap above 500 too fast | Medium | High | Increase in batches of 250 after usage review |
| 3 | Unknown product slug hits | Medium | Low | Keep dynamicParams=false for public subset |
| 4 | ZES API abuse | High | Low | Keep strict rate limits/origin checks |
| 5 | File analysis endpoint abuse | High | Low | Keep low anonymous limits |
| 6 | Lead spam POSTs | Medium | Medium | Honeypot + cooldown + limits |
| 7 | Bad bots crawling legacy URLs | Medium | Low | Proxy blocks spam patterns |
| 8 | Documents downloaded repeatedly | Medium | Low | Long cache + lower rate limit |
| 9 | Large JSON accidentally deployed | High | Medium | Keep full catalog ignored by Vercel |
| 10 | Next Image re-enabled | High | Medium | Keep images.unoptimized=true |
| 11 | ISR writes from product changes | Medium | Medium | Batch deploy instead of frequent regeneration |
| 12 | Admin route probing | Low | Low | Keep noindex and access checks |
| 13 | Sitemap file too large later | Medium | High | Split sitemap before 10k products |
| 14 | Category pages with search params | Low | Medium | Keep static pages and avoid runtime filters |
| 15 | Redirect maps too large | High | Medium | Keep programmatic/public limited redirects |
| 16 | External remote image latency | Medium | Low | Move verified assets to CDN |
| 17 | Crawl spikes after Search Console submit | Medium | High | Submit in controlled batches |
| 18 | Clarity/session scripts overhead | Low | Low | Keep but watch long sessions |
| 19 | Over-broad middleware | Medium | Low | Exclude static/assets/sitemap/API asset routes |
| 20 | Frequent deploys with asset churn | Medium | Low | Avoid committing generated heavy assets |

## Expansion Safety

500 -> 750 products: only after 7 stable days and QA 50/50 PASS.
750 -> 1000 products: only after Search Console shows crawl/indexing health and Vercel CPU remains below 50% weekly pace.

## Required Post-Deploy Monitoring

Use Vercel Usage after every production deployment:

| Moment | What to check | Warning threshold | Action |
| --- | --- | --- | --- |
| 1h | Fluid CPU, Function Invocations, Image Optimization, `/api/product-assets/*` | CPU > 20 min or Image Optimization grows unexpectedly | pause catalog expansion |
| 24h | CPU/day pace, ISR Reads/Writes, API hot paths | CPU > 2h/day or Functions > 75k/day | reduce API/asset exposure |
| 7d | weekly CPU pace, crawl stats, sitemap behavior | CPU > 3h/week or product asset proxy dominates | keep 500-product cap |

Do not increase product indexation until the 7-day check is clean.

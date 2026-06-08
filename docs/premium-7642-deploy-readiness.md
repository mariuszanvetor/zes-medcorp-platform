# Premium 7,642 Deploy Readiness

Generated: 2026-06-08T20:28:11.490Z

Scope: premium-ready GIMA products only. No deploy, no indexation and no sitemap inclusion changes were performed.

## Readiness Summary

| Check | Result |
| --- | ---: |
| Premium-ready products | 4348 |
| Product pages kept noindex | yes |
| Indexable products | 0 |
| Product detail URLs added to sitemap | 0 |
| Products with verified local images | 4348 |
| Products with broken documents | 0 |
| Products with related product coverage >= 8 | 4348 |
| Products with service coverage >= 3 | 4348 |
| Average SEO authority score | 9.41/10 |
| Category-only public title blockers | 0 |
| Weak public slug blockers | 0 |

## Verified Conditions

- Product metadata remains noindex because product detail metadata uses `noIndex: !isProductIndexable(product)`.
- Product sitemap behavior remains gated by `getIndexableProducts()`.
- Product category pages remain noindex while no indexable reviewed products exist.
- Premium product pages retain local image paths and local document links only.
- No source/import/review metadata was added to public rendering.
- Redirect behavior was not changed in this phase.

## Category Readiness

| Category | Premium products | Avg authority |
| --- | ---: | ---: |
| Diagnostic medical | 601 | 9.37 |
| Laborator / IVD | 114 | 9.54 |
| Urgenta | 644 | 9.36 |
| Sterilizare | 164 | 9.45 |
| Mobilier medical | 570 | 9.57 |
| ORL | 23 | 9.12 |
| Ginecologie | 118 | 9.07 |
| Consumabile | 0 | 0.00 |
| Electromedicale | 99 | 9.38 |
| Instrumentar chirurgical | 551 | 9.30 |
| Ingrijire pacient | 210 | 9.11 |
| Monitorizare | 257 | 9.65 |
| Dezinfectie | 0 | 0.00 |
| Protectie operator | 552 | 9.65 |
| Genti medicale | 70 | 9.06 |
| Cantare si masurare | 69 | 9.05 |
| Fizioterapie | 190 | 9.31 |
| Veterinar | 4 | 9.11 |
| Modele anatomice | 48 | 9.34 |
| Lampi medicale | 64 | 9.28 |

## Remaining Blockers

- Products remain intentionally noindex until a separate indexation approval phase.
- Non-premium/source-limited products remain hidden from category grids.
- 0 premium-flagged products still have category-only public titles and should be repaired before a full customer-facing deployment.
- 0 premium-flagged products still have weak public slugs and should be repaired before indexation.
- The catalog has many existing redirects from prior slug repair phases; build warns that custom route count exceeds 1,000, but routing still compiles.

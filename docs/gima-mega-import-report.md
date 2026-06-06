# GIMA Mega Import Report

Generated: 2026-06-05T21:22:13.716Z

Source:
- Official GIMA public product pages: https://www.gimaitaly.com/Prodotti/<SKU>
- Official GIMA public catalogue PDF: https://www.gimaitaly.com/en/assets/cataloghi/GIMA_International_Catalogue_2024_LR_ENG.pdf

## Summary

- Target product count: 1000
- Total products in catalog: 1000
- Products added during Product-GIMA-MEGA-01 scale batch: 500
- Products enriched/updated during final refresh: 950
- Products translated/display-ready: 1000
- Product statuses: 950 `image_verified`, 50 `translated`
- Categories covered: 13
- Duplicates skipped: 0
- Failed imports/product pages: 47
- Real images verified: 950
- Placeholder images used: 50
- Broken image checks: 0
- Real image coverage: 95.0%
- Indexing: imported, translated and image_verified products remain noindex and are excluded from sitemap until manual review.

## Category Coverage

- Diagnostic medical (diagnostic): 25
- Laborator / IVD (laboratory): 107
- Urgenta (emergency): 63
- Sterilizare (sterilization): 65
- Mobilier medical (medical-furniture): 48
- ORL (ent): 27
- Ginecologie (gynecology): 8
- Consumabile (consumables): 82
- Electromedicale (electromedical): 143
- Instrumentar chirurgical (surgical-instruments): 129
- Ingrijire pacient (patient-care): 197
- Monitorizare (monitoring): 99
- Dezinfectie (disinfection): 7

## Image Audit

- Real images are accepted only when the GIMA product image URL responds as an image.
- Product image source URL is stored internally as `imageSourceUrl`.
- Placeholder images are used only when no verified image is available.
- Broken images are not written as public product images.

## Sample Product URLs

- /produse/gima-xc-2000-centrifuge-24035
- /produse/gima-hemo-control-23994
- /produse/gima-urine-analyzer-bluetooth-24046
- /produse/gima-emergency-trolley-neo-plus-45720
- /produse/gima-medical-trolley-easy-27880
- /produse/gima-ent-chair-otopex-27552
- /produse/gima-disposable-skin-staple-remover-25892
- /produse/gima-heating-underblanket-single-28660
- /produse/gima-heating-underblanket-double-28661
- /produse/gima-heating-pad-without-cover-28670

## Failures

- 28646: Product page HTTP 500
- 28380: Product page HTTP 500
- 24153: Product page HTTP 500
- 33099: Product page HTTP 500
- 35350: Product page HTTP 500
- 35336: Product page HTTP 500
- 35352: Product page HTTP 500
- 35373: Product page HTTP 500
- 35376: Product page HTTP 500
- 35377: Product page HTTP 500
- 25747: Product page HTTP 500
- 30501: Product page HTTP 500
- 30506: Product page HTTP 500
- 30509: Product page HTTP 500
- 30500: Product page HTTP 500
- 29601: Product page HTTP 500
- 29602: Product page HTTP 500
- 20730: Product page HTTP 500
- 20696: Product page HTTP 500
- 20687: Product page HTTP 500
- 20690: Product page HTTP 500
- 20691: Product page HTTP 500
- 20600: Product page HTTP 500
- 20601: Product page HTTP 500
- 20602: Product page HTTP 500
- 20603: Product page HTTP 500
- 20604: Product page HTTP 500
- 20610: Product page HTTP 500
- 20738: Product page HTTP 500
- 20739: Product page HTTP 500
- 20743: Product page HTTP 500
- 20737: Product page HTTP 500
- 20740: Product page HTTP 500
- 20741: Product page HTTP 500
- 20621: Product page HTTP 500
- 20622: Product page HTTP 500
- 20623: Product page HTTP 500
- 20625: Product page HTTP 500
- 20626: Product page HTTP 500
- 20627: Product page HTTP 500
- 20650: Product page HTTP 500
- 20659: Product page HTTP 500
- 20641: Product page HTTP 500
- 20642: Product page HTTP 500
- 20643: Product page HTTP 500
- 20644: Product page HTTP 500
- 20645: Product page HTTP 500

## Build Performance Notes

- Batch 1 target: 500 products.
- Batch 2 target used in this run: 1000 products.
- Next recommended batch: increase by 500 products only after production build and UX smoke remain stable.
- Products stay noindex during import scale-up to avoid duplicate-content SEO risk.

## Review Workflow

Statuses:
- imported
- translated
- image_verified
- reviewed
- indexable
- excluded

Only `reviewStatus: "indexable"` products should be added to sitemap.

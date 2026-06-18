# Curated GIMA 50 Indexation Report

Generated: 2026-06-18T15:17:07.008Z

## Summary

| Metric | Count |
| --- | ---: |
| Total products | 8823 |
| Products made indexable now | 50 |
| Products already indexable | 0 |
| Total indexable products | 50 |
| Products kept noindex | 8773 |
| Accidental indexable products reset | 0 |
| Expected sitemap product URLs | 50 |

## Scope

Only the curated 50-product batch was made indexable. The broader GIMA catalog remains noindex and excluded from sitemap.

## Guard Used

A product was included only when it had:

- `publicDisplayReady = true`
- `catalogStatus = ready_for_publish`
- `strictQualityStatus = pass`
- `strictQualityScore >= 90`
- verified local image metadata
- Romanian title and Romanian description
- product-specific content
- specifications, features, or source-confirmed documents

## Category Distribution

| Category | Indexable products |
| --- | ---: |
| diagnostic | 10 |
| monitoring | 8 |
| laboratory | 8 |
| emergency | 8 |
| sterilization | 8 |
| medical-furniture | 8 |

## Sample URLs

- /produse/tensiometru-brat-ihealth-track-connected-23499
- /produse/tensiometru-incheietura-ihealth-sense-bp7-23501
- /produse/glucometru-wireless-ihealth-bg5-23514
- /produse/camp-chirurgical-bistratificat-50x50-cm-cutie-350-bucati-23580
- /produse/camp-chirurgical-bistratificat-45x75-cm-cutie-360-bucati-23581
- /produse/camp-chirurgical-bistratificat-75x90-cm-cutie-170-bucati-23582
- /produse/analizor-hemoglobina-hemo-control-23994
- /produse/centrifuga-de-laborator-xc-2000-24035
- /produse/analizor-de-urina-gima-cu-bluetooth-24046
- /produse/monitor-multiparametric-gimacare-6-parametri-24128
- /produse/analizor-imunologic-fluorescent-24600
- /produse/lanterna-medicala-led-omega-metalica-25436
- /produse/dispozitiv-iluminare-faringiana-throat-scope-25499
- /produse/spatule-linguale-cutie-100-bucati-25510
- /produse/garou-rapid-fara-latex-albastru-25748
- /produse/cutie-inox-pentru-sterilizare-26653
- /produse/cutie-inox-pentru-sterilizare-20x10x6-cm-26654
- /produse/cutie-inox-pentru-sterilizare-25x12x6-cm-26655
- /produse/cutie-inox-pentru-sterilizare-30x15x6-cm-26656
- /produse/cutie-inox-pentru-sterilizare-50x20x10-cm-26657

## Document Safety

Product document links under `/product-documents/` are not rendered unless they are deployable. This prevents indexed product pages from exposing broken PDF links after the asset archive was moved out of Vercel static deployment.

## Deployment Verdict

Pending build, content check and SEO audit.

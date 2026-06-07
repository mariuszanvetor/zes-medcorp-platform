# GIMA Index Ready Report

Generated: 2026-06-07T06:19:14.930Z

## Summary

- Products in catalog: 8823
- Products made indexable: 3901
- Products kept noindex: 4922
- Ready products skipped by final safety gate: 2
- Sitemap product count expected: 3901
- Product category sitemap count expected: 18
- Broken image/doc failures in indexable set: 0
- English leakage in indexable set: 0

## Indexation Rules Applied

- Only products with `catalogStatus = ready_for_publish` and clean public content were converted to `reviewStatus = indexable`.
- Non-ready products remain noindex and excluded from sitemap.
- Product pages are included in sitemap only through `getIndexableProducts()`.
- Product page metadata removes noindex only when `reviewStatus = indexable`.
- No source/import/review metadata is rendered publicly by the product page components.

## Category Distribution

| Category | Indexable products |
| --- | ---: |
| Instrumentar chirurgical | 661 |
| Diagnostic medical | 634 |
| Urgenta | 600 |
| Mobilier medical | 449 |
| Ingrijire pacient | 245 |
| Monitorizare | 200 |
| Fizioterapie | 162 |
| Laborator / IVD | 160 |
| Protectie operator | 158 |
| Sterilizare | 155 |
| Electromedicale | 111 |
| Ginecologie | 102 |
| Cantare si masurare | 73 |
| Genti medicale | 59 |
| Lampi medicale | 52 |
| ORL | 42 |
| Modele anatomice | 36 |
| Veterinar | 2 |

## Sample URLs

- /produse/glucoza-benzi-cutie-cu-25-23511
- /produse/glucoza-benzi-cutie-cu-50-23512
- /produse/camp-medical-50x50-cutie-cu-350-23580
- /produse/ihealth-neo-bp5s-arm-b-p-monitor-cu-display-23495
- /produse/ihealth-track-connected-arm-b-p-m-23499
- /produse/ihealth-sense-bp7-wrist-b-p-monitor-23501
- /produse/ihealth-air-wireless-23525
- /produse/perfection-brushes-25715
- /produse/garou-rapid-fara-latex-spandex-elastan-verde-45-2-5-one-mana-use-eliberare-rapida-asia-25749
- /produse/kit-cu-6-curele-din-silicon-albastru-20418
- /produse/violet-si-albastru-deschis-albastru-20465
- /produse/lant-metalic-pentru-foarfeca-si-pensa-20590

## Products Kept Noindex

- Total kept noindex: 4922
- Reason: not ready_for_publish, missing final safety gate, missing verified local image, weak title/content, or review-needed state.

## Ready Products Skipped By Final Gate

- 33313: F9089p-100 foam ø 32x36 mm solid oval snap pediatric rest, stress, ECG holter cutie cu 2,000 (20 bags of 100)
- 33373: F9053n foam ø 23x30 mm solid oval 4 mm socket pediatric, neonatal monitoring ECG recording cutie cu 150 (5 bags of 30)

## Final Safety Check

- Romanian title required: passed
- Romanian slug required: passed
- Verified local image required: passed
- Local documents must resolve when present: passed
- No public source/import/review metadata exposure: passed by route/component audit
- No English leakage except allowed technical terms: passed

## Validation

- `npm run build -- --webpack`: passed
- `npm run content:check`: passed
- `npm run audit:seo`: passed
- Built sitemap product URLs: 3,901
- Built sitemap product category URLs: 18
- Admin URLs in built sitemap: 0

## Deployment Verdict

Ready for deploy.

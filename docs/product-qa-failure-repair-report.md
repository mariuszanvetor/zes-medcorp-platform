# Product QA Failure Repair Report

Generated: 2026-06-08T08:18:09.475Z

Scope: repaired the existing 500-product batch only. No import, deploy, indexation or sitemap inclusion was performed.

## Failure Patterns Extracted From Random QA

- Mixed English/Romanian product names such as `Split Grounding Pad`, `Paper Filtru`, `Crutches - Blue - Pair`, `Podology Scaun`, `Wearable Mesh Nebulizer`, `Hot Air Sterilizator`.
- English/source fragments in slugs such as `box-of`, `produs-de-laborator`, `mobilier-medical`, `shelves`, `trolley`, `chair`, `wireless`, `c-mount`.
- Source-table titles built from dimensions or notes instead of product names, such as `183x152 cm 6.9 kg` and `available in 45 days`.
- Generic category titles such as `Ingrijire pacient 28582` and `Mobilier medical 27449`.
- Wrong or broad category assignments for oxygen/emergency and patient-care rows.
- Template-like descriptions and features that did not read like product-specific catalog copy.

## Strict Rules Added

- Reject public title/slug English source fragments unless they are allowed model/technical terms such as WiFi, Bluetooth, ECG, SpO2, LED, USB, CE, ISO or model names.
- Reject generic title starts such as `produs`, `echipament`, `dispozitiv`, `articol`, `mobilier medical` and table-derived dimension-only names.
- Repair category/source-table titles with deterministic Romanian titles while preserving model, brand and product code.
- Normalize category assignments for obvious mismatches, especially emergency oxygen/evacuation products, patient-care accessories and veterinary furniture.
- Rewrite short public descriptions, applications, benefits, service text and image alt text in Romanian for the 500-product batch.
- Rebuild Romanian slugs and keep redirects for changed slugs.
- Preserve noindex and prevent product sitemap inclusion.

## Final Full Audit Distribution

- A: 144
- B: 356
- C: 0
- D: 0
- A + B: 500 / 500 (100.0%)

## Asset And Safety Audit

- Products audited: 500
- Verified product images: 500
- Products with local documents: 16
- Broken images: 0
- Broken documents: 0
- Products indexed: 0
- Product sitemap inclusion: 0

## Repaired Product Examples

| Code | Before pattern | Final Romanian title | Final slug |
| --- | --- | --- | --- |
| 30498 | source/mixed title repair | Electrod neutru divizat 3M 9165 cu cablu - cutie cu 40 | electrod-neutru-divizat-3m-9165-cu-cablu-cutie-cu-40-30498 |
| 34583 | source/mixed title repair | Filtru de hartie - cutie cu 10 | filtru-de-hartie-cutie-cu-10-34583 |
| 43101 | source/mixed title repair | Carje de cot Evolution albastre pereche | carje-de-cot-evolution-albastre-pereche-43101 |
| 27271 | source/mixed title repair | Geanta de transport | geanta-de-transport-27271 |
| 32185 | source/mixed title repair | Camera MicFiEye WiFi si USB cu montura C | camera-micfieye-wifi-si-usb-cu-montura-c-32185 |
| 28020 | source/mixed title repair | Scaun podologie mecanic alb | scaun-podologie-mecanic-alb-28020 |
| 28065 | source/mixed title repair | Nebulizator portabil cu membrana vibranta | nebulizator-portabil-cu-membrana-vibranta-28065 |
| 28582 | source/mixed title repair | Saltea pentru ingrijire pacient 198 x 86 cm | saltea-pentru-ingrijire-pacient-198-x-86-cm-28582 |
| 27265 | source/mixed title repair | Cantar digital plat Seca 813 | cantar-digital-plat-seca-813-27265 |
| 34880 | source/mixed title repair | Saltea de evacuare pentru urgenta 183 x 152 cm | saltea-de-evacuare-pentru-urgenta-183-x-152-cm-34880 |
| 24022 | source/mixed title repair | Sistem de testare hemoglobina Mission Hb | sistem-de-testare-hemoglobina-mission-hb-24022 |
| 27799 | source/mixed title repair | Carja T-bar mare | carja-t-bar-mare-27799 |
| 71606 | source/mixed title repair | Endoscop ORL cu rezolutie 18.000 pixeli si lungime de lucru 320 mm | endoscop-orl-cu-rezolutie-18-000-pixeli-si-lungime-de-lucru-320-mm-71606 |
| 49124 | source/mixed title repair | Lampa medicala pentru configuratie speciala | lampa-medicala-pentru-configuratie-speciala-49124 |
| 28507 | source/mixed title repair | Lighean pentru spalarea parului | lighean-pentru-spalarea-parului-28507 |

## Unrecoverable Products

- 0 products in the 500-product batch remain C/D under the strict gate.

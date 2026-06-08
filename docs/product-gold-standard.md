# ZESCORP Product Gold Standard

Generated: 2026-06-07

## Purpose

This document defines the definitive ZESCORP product-page standard. The current gold set contains exactly 20 products across:

- Laboratory
- Emergency
- Medical furniture
- Monitoring
- Sterilization

These products remain `noindex` until a separate publication/indexation approval phase. They are the benchmark for repairing the rest of the imported catalog.

## Gold Products

| Category | Product code | Romanian title | URL |
| --- | --- | --- | --- |
| Laboratory | 24035 | Centrifugă de laborator XC-2000 | `/produse/centrifuga-de-laborator-xc-2000-24035` |
| Laboratory | 23994 | Analizor hemoglobină și hematocrit Hemo Control | `/produse/analizor-hemoglobina-si-hematocrit-hemo-control-23994` |
| Laboratory | 24046 | Analizor de urină cu Bluetooth | `/produse/analizor-de-urina-cu-bluetooth-24046` |
| Laboratory | 23580 | Câmp chirurgical steril netesut 50 x 50 cm | `/produse/camp-chirurgical-steril-netesut-dublu-strat-50-x-50-cm-23580` |
| Emergency | 25748 | Garou rapid albastru | `/produse/garou-rapid-albastru-25748` |
| Emergency | 45720 | Cărucior de urgență Neo Plus | `/produse/carucior-de-urgenta-neo-plus-45720` |
| Emergency | 34068 | Targă pliabilă pentru scări | `/produse/targa-pliabila-pentru-scari-34068` |
| Emergency | 34069 | Targă electrică pentru scări | `/produse/targa-electrica-pentru-scari-34069` |
| Medical furniture | 27487 | Masă peste pat Elite | `/produse/masa-peste-pat-elite-27487` |
| Medical furniture | 27552 | Scaun ORL Otopex cu tetieră verde Toronto | `/produse/scaun-orl-otopex-cu-tetiera-verde-toronto-27552` |
| Medical furniture | 43430 | Scaun hidraulic pentru transfer pacient | `/produse/scaun-hidraulic-pentru-transfer-pacient-43430` |
| Medical furniture | 43202 | Scaun cu rotile pliabil cu funcție toaletă | `/produse/scaun-cu-rotile-pliabil-cu-functie-toaleta-43202` |
| Monitoring | 24128 | Monitor multiparametric pentru 6 parametri | `/produse/monitor-multiparametric-pentru-6-parametri-24128` |
| Monitoring | 32773 | Tensiometru de încheietură Jolly | `/produse/tensiometru-de-incheietura-jolly-32773` |
| Monitoring | 33245 | ECG portabil Cardio-C cu 3 canale | `/produse/ecg-portabil-cardio-c-cu-3-canale-33245` |
| Monitoring | 33246 | ECG portabil PM10 cu software și Bluetooth | `/produse/ecg-portabil-pm10-cu-software-si-bluetooth-33246` |
| Sterilization | 35660 | Autoclavă Hydra Evo cu imprimantă, 15 l | `/produse/autoclava-hydra-evo-cu-imprimanta-15-l-35660` |
| Sterilization | 35712 | Autoclavă Prestige 12 l | `/produse/autoclava-prestige-12-l-35712` |
| Sterilization | 35640 | Sterilizator rapid cu bile GIMA Quick | `/produse/sterilizator-rapid-cu-bile-gima-quick-35640` |
| Sterilization | 35900 | Aparat de sigilare D-351 pentru sterilizare | `/produse/aparat-de-sigilare-d-351-pentru-sterilizare-35900` |

## Required Product Structure

Every product page must contain:

1. Breadcrumb: `Produse -> Categorie -> Produs`
2. Product image gallery with local images
3. Romanian product title
4. Category badge in Romanian
5. Product code
6. Short commercial summary
7. Primary CTA: `Solicită ofertă`
8. Secondary CTAs: `Sună acum`, `WhatsApp`
9. `Descriere produs`
10. `Caracteristici`
11. `Conținut pachet` only when source-confirmed
12. `Specificații tehnice`
13. `Documente produs`
14. `Utilizare recomandată`
15. `Livrare și ofertare`
16. `Avantaje pentru achiziție`
17. `Service și mentenanță`
18. Related products
19. Related services
20. Quote form

## Content Rules

Product content must be written for Romanian medical buyers, not translated mechanically.

Required fields:

- `romanianTitle`: natural Romanian commercial title
- `romanianShortSummary`: one sentence, buyer-oriented
- `romanianDescription`: one paragraph, human-written, specific to the product
- `romanianApplications`: 3 specific use cases
- `romanianBenefits`: 3 buyer benefits
- `romanianFeatures`: 3 source-grounded product characteristics
- `romanianSpecifications`: real specifications only
- `relatedProductCodes`: 3-4 relevant product codes
- `relatedServices`: 2-3 relevant ZESCORP service routes

Forbidden public copy:

- Generic text such as `este un produs din categoria...`
- Internal notes such as `oferta se confirmă manual`
- Source/import/review wording
- Raw extraction fragments
- Untranslated product types
- Fake stock
- Fake prices
- Invented certifications
- Invented specifications

## Translation Rules

Use natural Romanian while preserving brand and model names.

Examples:

- `foetal monitor` -> `monitor fetal`
- `multi-parameter monitor` -> `monitor multiparametric`
- `emergency trolley` -> `cărucior de urgență`
- `folding bedside rail` -> `bară pliabilă pentru pat`
- `stair stretcher` -> `targă pentru scări`
- `hot bead sterilizer` -> `sterilizator rapid cu bile`
- `impulse sealing machine` -> `aparat de sigilare`
- `blood pressure monitor` -> `tensiometru`
- `overbed table` -> `masă peste pat`
- `patient transfer chair` -> `scaun pentru transfer pacient`

Allowed English/technical terms:

- Brand names
- Model names
- CE, FDA, ISO
- Bluetooth, WiFi
- PACS, RIS, DICOM
- ECG, AED, IVD
- Standard units and measurements

Everything else must be Romanian.

## SEO Rules

Products remain `noindex` until an approval phase. When a product is approved for indexing, it must satisfy all of these:

- Romanian title
- Romanian URL slug
- Local product image
- Human-written description
- Real specifications or real documents
- No English leakage except approved terms
- No broken images or documents
- No visible source/import/review metadata
- Category is correct
- Sitemap inclusion only after `reviewStatus = indexable`

Slug format:

`romanian-product-name-product-code`

Examples:

- `/produse/centrifuga-de-laborator-xc-2000-24035`
- `/produse/monitor-multiparametric-pentru-6-parametri-24128`
- `/produse/autoclava-hydra-evo-cu-imprimanta-15-l-35660`

## Image Rules

Images must be:

- Local files under `/public/product-images/[code]/`
- Real product images
- High enough quality for main display
- Never external source URLs in public HTML
- Never broken
- Paired with Romanian alt text

Gallery rules:

- Main image must be the best product image
- Secondary images may appear only if they are product-relevant and not pixelated
- Thumbnails may be smaller, but selected main image must remain clear
- Category placeholders are allowed only for non-public repair drafts, never for publish-ready products

## Document Rules

Documents must be local files under `/public/product-documents/[code]/`.

Allowed public labels:

- `Manual în limba engleză`
- `Certificat CE`
- `Fișă tehnică`

Do not show:

- External source links
- Source URLs
- Placeholder document links
- Fake document labels

If no document exists, the page may say:

`Documentația produsului poate fi solicitată în cadrul cererii de ofertă.`

## Technical Specification Rules

Specifications must be source-grounded or directly derived from confirmed product fields.

Allowed examples:

- Product code
- Product type
- Model
- Capacity
- Dimensions
- Weight
- Power supply
- Number of channels/parameters
- Document availability

Forbidden:

- Generic filler specs
- Fake performance values
- Unverified certifications
- Values copied from unrelated products
- Raw malformed extraction fragments

## Service Rules

Every product must connect to ZESCORP services:

- Offer preparation
- Installation / commissioning when relevant
- Maintenance contracts
- Multi-vendor service
- Consumables/accessory planning

Service text should be practical:

`ZESCORP poate verifica aplicația, accesoriile, documentația și opțiunile de service înainte de ofertare.`

## Review Gate

A product becomes `ready_for_publish` only after:

- Human-readable Romanian title
- Correct Romanian slug
- Correct commercial category
- Real image exists
- Description is product-specific
- Applications, benefits and features are product-specific
- At least one of specs, features or documents is source-grounded
- No broken assets
- No English leakage
- No source/import metadata exposure

Indexation is a separate decision. `ready_for_publish` does not automatically mean `indexable`.

## Scaling Recommendation

Use these 20 products as the only template for future repair batches. The next repair batch should be small:

- 20-50 products at a time
- One category at a time
- Human review before indexation
- No sitemap inclusion until final quality audit

The current rollback remains correct: the broad imported catalog should stay `noindex` until individual products meet this standard.

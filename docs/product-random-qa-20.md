# Product Random QA 20

Generated: 2026-06-08T04:33:56.851Z

Scope: audit-only random QA of 20 products from the current 500 repaired product batch. No products were modified, no deploy was performed, and no indexation/sitemap changes were made.

## Verdict

- PASS: 1
- MINOR ISSUE: 4
- MAJOR ISSUE: 15
- Catalog batch approved by acceptance rule (>18/20 PASS): NO

Because the random sample has 18 or fewer pure PASS results, this batch should not be deployed or indexed without another repair pass.

## Sample Coverage

- Products audited: 20
- Categories represented: 13
- Category spread: diagnostic: 1, electromedical: 1, emergency: 5, ent: 1, gynecology: 1, laboratory: 1, medical-furniture: 4, medical-lights: 1, monitoring: 1, patient-care: 1, scales-measures: 1, sterilization: 1, surgical-instruments: 1
- Products with documents in sample: 7
- Products with multiple gallery images in sample: 7

## Findings Table

| # | Classification | Product | Category | Specs | Docs | URL | Screenshot | Key findings |
| --- | --- | --- | --- | ---: | --- | --- | --- | --- |
| 1 | MINOR ISSUE | Tensiometru Ri-champion Smart Pro+ | diagnostic | 4 | no | http://localhost:3000/produse/tensiometru-ri-champion-smart-pro-49951 | [screenshot](../.qa-product-random-20/screenshots/01-49951.png) | Description is commercial but still template-like for a buyer-facing product page. Specification set is thin (<5 specs). |
| 2 | MAJOR ISSUE | 3M 9165 Split Grounding Pad - Precorded - Box Of 40 | electromedical | 4 | no | http://localhost:3000/produse/3m-9165-split-grounding-pad-precorded-box-of-40-30498 | [screenshot](../.qa-product-random-20/screenshots/02-30498.png) | Title is mixed-language, source-like, or not natural Romanian. Slug contains English/source fragments or generic catalog wording. Description is commercial but still template-like for a buyer-facing product page. Specification set is thin (<5 specs). |
| 3 | MAJOR ISSUE | Paper Filtru - Box Of 10 | emergency | 5 | no | http://localhost:3000/produse/paper-filtru-box-of-10-34583 | [screenshot](../.qa-product-random-20/screenshots/03-34583.png) | Title is mixed-language, source-like, or not natural Romanian. Slug contains English/source fragments or generic catalog wording. Description is commercial but still template-like for a buyer-facing product page. |
| 4 | MAJOR ISSUE | Riester Ri-focus Lampa Frontala LED | ent | 4 | no | http://localhost:3000/produse/riester-ri-focus-lampa-frontala-led-30931 | [screenshot](../.qa-product-random-20/screenshots/04-30931.png) | Title is mixed-language, source-like, or not natural Romanian. Description is commercial but still template-like for a buyer-facing product page. Specification set is thin (<5 specs). |
| 5 | MINOR ISSUE | Doppler fetal GIMA D2005 cu ecran | gynecology | 4 | no | http://localhost:3000/produse/doppler-fetal-gima-d2005-cu-ecran-29505 | [screenshot](../.qa-product-random-20/screenshots/05-29505.png) | Description is commercial but still template-like for a buyer-facing product page. Specification set is thin (<5 specs). |
| 6 | MAJOR ISSUE | Analizor Lactate Scout 4 | laboratory | 4 | no | http://localhost:3000/produse/produs-de-laborator-lactate-scout-4-23992 | [screenshot](../.qa-product-random-20/screenshots/06-23992.png) | Slug contains English/source fragments or generic catalog wording. Description is commercial but still template-like for a buyer-facing product page. Specification set is thin (<5 specs). |
| 7 | MAJOR ISSUE | Mobilier Medical D Colin Press-mate 8800 | medical-furniture | 5 | no | http://localhost:3000/produse/mobilier-medical-d-colin-press-mate-8800-45764 | [screenshot](../.qa-product-random-20/screenshots/07-45764.png) | Title is mixed-language, source-like, or not natural Romanian. Slug contains English/source fragments or generic catalog wording. Description is commercial but still template-like for a buyer-facing product page. |
| 8 | MINOR ISSUE | Lampa medicala PrimaLED flexibila pentru perete | medical-lights | 4 | no | http://localhost:3000/produse/lampa-medicala-primaled-flexibila-pentru-perete-49128 | [screenshot](../.qa-product-random-20/screenshots/08-49128.png) | Description is commercial but still template-like for a buyer-facing product page. Specification set is thin (<5 specs). |
| 9 | MINOR ISSUE | Omron Gs CUFF2 M 22-32 Cm - de rezerva | monitoring | 4 | no | http://localhost:3000/produse/omron-gs-cuff2-m-22-32-cm-de-rezerva-49893 | [screenshot](../.qa-product-random-20/screenshots/09-49893.png) | Description is commercial but still template-like for a buyer-facing product page. Specification set is thin (<5 specs). |
| 10 | MAJOR ISSUE | Evolution Crutches - Blue - Pair | patient-care | 5 | no | http://localhost:3000/produse/evolution-crutches-blue-pair-43101 | [screenshot](../.qa-product-random-20/screenshots/10-43101.png) | Title is mixed-language, source-like, or not natural Romanian. Slug contains English/source fragments or generic catalog wording. Description is commercial but still template-like for a buyer-facing product page. |
| 11 | MAJOR ISSUE | Carrying Geanta | scales-measures | 4 | no | http://localhost:3000/produse/carrying-geanta-27271 | [screenshot](../.qa-product-random-20/screenshots/11-27271.png) | Title is mixed-language, source-like, or not natural Romanian. Slug contains English/source fragments or generic catalog wording. Description is commercial but still template-like for a buyer-facing product page. Specification set is thin (<5 specs). |
| 12 | PASS | Sterilizator rapid cu bile GIMA Quick | sterilization | 11 | no | http://localhost:3000/produse/sterilizator-rapid-cu-bile-gima-quick-35640 | [screenshot](../.qa-product-random-20/screenshots/12-35640.png) | No material issues found. |
| 13 | MAJOR ISSUE | Surgical Marker pentru Piele - Single Tip - Sterile - Box Of 100 | surgical-instruments | 4 | no | http://localhost:3000/produse/surgical-marker-pentru-piele-single-tip-sterile-box-of-100-33182 | [screenshot](../.qa-product-random-20/screenshots/13-33182.png) | Title is mixed-language, source-like, or not natural Romanian. Slug contains English/source fragments or generic catalog wording. Description is commercial but still template-like for a buyer-facing product page. Specification set is thin (<5 specs). |
| 14 | MAJOR ISSUE | Targă pliabilă pentru scări | emergency | 15 | yes | http://localhost:3000/produse/targa-pliabila-pentru-scari-34068 | [screenshot](../.qa-product-random-20/screenshots/14-34068.png) | Product image is missing or too small. |
| 15 | MAJOR ISSUE | Cărucior de urgență Neo Plus | emergency | 17 | yes | http://localhost:3000/produse/carucior-de-urgenta-neo-plus-45720 | [screenshot](../.qa-product-random-20/screenshots/15-45720.png) | Product image is missing or too small. |
| 16 | MAJOR ISSUE | Masă peste pat Elite | medical-furniture | 15 | yes | http://localhost:3000/produse/masa-peste-pat-elite-27487 | [screenshot](../.qa-product-random-20/screenshots/16-27487.png) | Product image is missing or too small. |
| 17 | MAJOR ISSUE | Mobilier Medical 2 Shelves 40x36 Cm + Baza 75 | medical-furniture | 4 | yes | http://localhost:3000/produse/mobilier-medical-2-shelves-40x36-cm-baza-75-27880 | [screenshot](../.qa-product-random-20/screenshots/17-27880.png) | Title is mixed-language, source-like, or not natural Romanian. Slug contains English/source fragments or generic catalog wording. Product image is missing or too small. Specification set is thin (<5 specs). |
| 18 | MAJOR ISSUE | Defibrilator semiautomat CU-SPR multilingv | emergency | 4 | yes | http://localhost:3000/produse/defibrilator-semiautomat-cu-spr-multilingv-35402 | [screenshot](../.qa-product-random-20/screenshots/18-35402.png) | Product image is missing or too small. Specification set is thin (<5 specs). |
| 19 | MAJOR ISSUE | Scaun ORL Otopex cu tetieră verde Toronto | medical-furniture | 11 | yes | http://localhost:3000/produse/scaun-orl-otopex-cu-tetiera-verde-toronto-27552 | [screenshot](../.qa-product-random-20/screenshots/19-27552.png) | Product image is missing or too small. |
| 20 | MAJOR ISSUE | Ischia Scaun pentru Transfer Pacient - Albastru | emergency | 5 | yes | http://localhost:3000/produse/ischia-scaun-pentru-transfer-pacient-albastru-44840 | [screenshot](../.qa-product-random-20/screenshots/20-44840.png) | Title is mixed-language, source-like, or not natural Romanian. Product image is missing or too small. |

## Detailed Audit

### 1. Tensiometru Ri-champion Smart Pro+

- URL: http://localhost:3000/produse/tensiometru-ri-champion-smart-pro-49951
- Screenshot: [01-49951.png](../.qa-product-random-20/screenshots/01-49951.png)
- Classification: MINOR ISSUE
- Romanian title quality: PASS
- Romanian slug quality: PASS
- Description quality: MINOR - commercial but template-like/short.
- Specification quality: MINOR - fewer than 5 specs.
- Image quality: PASS - Real local image rendered; single-image gallery is acceptable.
- Document quality: PASS - No documents available in source/data; no broken or fake document links shown.
- Category correctness: PASS / no obvious mismatch detected in page QA.
- Related products: PASS
- Related services: PASS
- CTA visibility: PASS (Solicita oferta, Suna acum, WhatsApp, Discuta cu ZES)
- Minor issues: Description is commercial but still template-like for a buyer-facing product page. Specification set is thin (<5 specs).

### 2. 3M 9165 Split Grounding Pad - Precorded - Box Of 40

- URL: http://localhost:3000/produse/3m-9165-split-grounding-pad-precorded-box-of-40-30498
- Screenshot: [02-30498.png](../.qa-product-random-20/screenshots/02-30498.png)
- Classification: MAJOR ISSUE
- Romanian title quality: FAIL - title is not natural Romanian.
- Romanian slug quality: FAIL - slug contains source/English wording.
- Description quality: MINOR - commercial but template-like/short.
- Specification quality: MINOR - fewer than 5 specs.
- Image quality: PASS - Real local image rendered; single-image gallery is acceptable.
- Document quality: PASS - No documents available in source/data; no broken or fake document links shown.
- Category correctness: PASS / no obvious mismatch detected in page QA.
- Related products: PASS
- Related services: PASS
- CTA visibility: PASS (Solicita oferta, Suna acum, WhatsApp, Discuta cu ZES)
- Major issues: Title is mixed-language, source-like, or not natural Romanian. Slug contains English/source fragments or generic catalog wording.
- Minor issues: Description is commercial but still template-like for a buyer-facing product page. Specification set is thin (<5 specs).

### 3. Paper Filtru - Box Of 10

- URL: http://localhost:3000/produse/paper-filtru-box-of-10-34583
- Screenshot: [03-34583.png](../.qa-product-random-20/screenshots/03-34583.png)
- Classification: MAJOR ISSUE
- Romanian title quality: FAIL - title is not natural Romanian.
- Romanian slug quality: FAIL - slug contains source/English wording.
- Description quality: MINOR - commercial but template-like/short.
- Specification quality: PASS
- Image quality: PASS - Real local image rendered; single-image gallery is acceptable.
- Document quality: PASS - No documents available in source/data; no broken or fake document links shown.
- Category correctness: PASS / no obvious mismatch detected in page QA.
- Related products: PASS
- Related services: PASS
- CTA visibility: PASS (Solicita oferta, Suna acum, WhatsApp, Discuta cu ZES)
- Major issues: Title is mixed-language, source-like, or not natural Romanian. Slug contains English/source fragments or generic catalog wording.
- Minor issues: Description is commercial but still template-like for a buyer-facing product page.

### 4. Riester Ri-focus Lampa Frontala LED

- URL: http://localhost:3000/produse/riester-ri-focus-lampa-frontala-led-30931
- Screenshot: [04-30931.png](../.qa-product-random-20/screenshots/04-30931.png)
- Classification: MAJOR ISSUE
- Romanian title quality: FAIL - title is not natural Romanian.
- Romanian slug quality: PASS
- Description quality: MINOR - commercial but template-like/short.
- Specification quality: MINOR - fewer than 5 specs.
- Image quality: PASS - Real local image rendered; single-image gallery is acceptable.
- Document quality: PASS - No documents available in source/data; no broken or fake document links shown.
- Category correctness: PASS / no obvious mismatch detected in page QA.
- Related products: PASS
- Related services: PASS
- CTA visibility: PASS (Solicita oferta, Suna acum, WhatsApp, Discuta cu ZES)
- Major issues: Title is mixed-language, source-like, or not natural Romanian.
- Minor issues: Description is commercial but still template-like for a buyer-facing product page. Specification set is thin (<5 specs).

### 5. Doppler fetal GIMA D2005 cu ecran

- URL: http://localhost:3000/produse/doppler-fetal-gima-d2005-cu-ecran-29505
- Screenshot: [05-29505.png](../.qa-product-random-20/screenshots/05-29505.png)
- Classification: MINOR ISSUE
- Romanian title quality: PASS
- Romanian slug quality: PASS
- Description quality: MINOR - commercial but template-like/short.
- Specification quality: MINOR - fewer than 5 specs.
- Image quality: PASS - Real local image rendered; single-image gallery is acceptable.
- Document quality: PASS - No documents available in source/data; no broken or fake document links shown.
- Category correctness: PASS / no obvious mismatch detected in page QA.
- Related products: PASS
- Related services: PASS
- CTA visibility: PASS (Solicita oferta, Suna acum, WhatsApp, Discuta cu ZES)
- Minor issues: Description is commercial but still template-like for a buyer-facing product page. Specification set is thin (<5 specs).

### 6. Analizor Lactate Scout 4

- URL: http://localhost:3000/produse/produs-de-laborator-lactate-scout-4-23992
- Screenshot: [06-23992.png](../.qa-product-random-20/screenshots/06-23992.png)
- Classification: MAJOR ISSUE
- Romanian title quality: PASS
- Romanian slug quality: FAIL - slug contains source/English wording.
- Description quality: MINOR - commercial but template-like/short.
- Specification quality: MINOR - fewer than 5 specs.
- Image quality: PASS - Real local image rendered; single-image gallery is acceptable.
- Document quality: PASS - No documents available in source/data; no broken or fake document links shown.
- Category correctness: PASS / no obvious mismatch detected in page QA.
- Related products: PASS
- Related services: PASS
- CTA visibility: PASS (Solicita oferta, Suna acum, WhatsApp, Discuta cu ZES)
- Major issues: Slug contains English/source fragments or generic catalog wording.
- Minor issues: Description is commercial but still template-like for a buyer-facing product page. Specification set is thin (<5 specs).

### 7. Mobilier Medical D Colin Press-mate 8800

- URL: http://localhost:3000/produse/mobilier-medical-d-colin-press-mate-8800-45764
- Screenshot: [07-45764.png](../.qa-product-random-20/screenshots/07-45764.png)
- Classification: MAJOR ISSUE
- Romanian title quality: FAIL - title is not natural Romanian.
- Romanian slug quality: FAIL - slug contains source/English wording.
- Description quality: MINOR - commercial but template-like/short.
- Specification quality: PASS
- Image quality: PASS - Real local image rendered; single-image gallery is acceptable.
- Document quality: PASS - No documents available in source/data; no broken or fake document links shown.
- Category correctness: PASS / no obvious mismatch detected in page QA.
- Related products: PASS
- Related services: PASS
- CTA visibility: PASS (Solicita oferta, Suna acum, WhatsApp, Discuta cu ZES)
- Major issues: Title is mixed-language, source-like, or not natural Romanian. Slug contains English/source fragments or generic catalog wording.
- Minor issues: Description is commercial but still template-like for a buyer-facing product page.

### 8. Lampa medicala PrimaLED flexibila pentru perete

- URL: http://localhost:3000/produse/lampa-medicala-primaled-flexibila-pentru-perete-49128
- Screenshot: [08-49128.png](../.qa-product-random-20/screenshots/08-49128.png)
- Classification: MINOR ISSUE
- Romanian title quality: PASS
- Romanian slug quality: PASS
- Description quality: MINOR - commercial but template-like/short.
- Specification quality: MINOR - fewer than 5 specs.
- Image quality: PASS - Real local image rendered; single-image gallery is acceptable.
- Document quality: PASS - No documents available in source/data; no broken or fake document links shown.
- Category correctness: PASS / no obvious mismatch detected in page QA.
- Related products: PASS
- Related services: PASS
- CTA visibility: PASS (Solicita oferta, Suna acum, WhatsApp, Discuta cu ZES)
- Minor issues: Description is commercial but still template-like for a buyer-facing product page. Specification set is thin (<5 specs).

### 9. Omron Gs CUFF2 M 22-32 Cm - de rezerva

- URL: http://localhost:3000/produse/omron-gs-cuff2-m-22-32-cm-de-rezerva-49893
- Screenshot: [09-49893.png](../.qa-product-random-20/screenshots/09-49893.png)
- Classification: MINOR ISSUE
- Romanian title quality: PASS
- Romanian slug quality: PASS
- Description quality: MINOR - commercial but template-like/short.
- Specification quality: MINOR - fewer than 5 specs.
- Image quality: PASS - Real local image rendered; single-image gallery is acceptable.
- Document quality: PASS - No documents available in source/data; no broken or fake document links shown.
- Category correctness: PASS / no obvious mismatch detected in page QA.
- Related products: PASS
- Related services: PASS
- CTA visibility: PASS (Solicita oferta, Suna acum, WhatsApp, Discuta cu ZES)
- Minor issues: Description is commercial but still template-like for a buyer-facing product page. Specification set is thin (<5 specs).

### 10. Evolution Crutches - Blue - Pair

- URL: http://localhost:3000/produse/evolution-crutches-blue-pair-43101
- Screenshot: [10-43101.png](../.qa-product-random-20/screenshots/10-43101.png)
- Classification: MAJOR ISSUE
- Romanian title quality: FAIL - title is not natural Romanian.
- Romanian slug quality: FAIL - slug contains source/English wording.
- Description quality: MINOR - commercial but template-like/short.
- Specification quality: PASS
- Image quality: PASS - Real local image rendered; single-image gallery is acceptable.
- Document quality: PASS - No documents available in source/data; no broken or fake document links shown.
- Category correctness: PASS / no obvious mismatch detected in page QA.
- Related products: PASS
- Related services: PASS
- CTA visibility: PASS (Solicita oferta, Suna acum, WhatsApp, Discuta cu ZES)
- Major issues: Title is mixed-language, source-like, or not natural Romanian. Slug contains English/source fragments or generic catalog wording.
- Minor issues: Description is commercial but still template-like for a buyer-facing product page.

### 11. Carrying Geanta

- URL: http://localhost:3000/produse/carrying-geanta-27271
- Screenshot: [11-27271.png](../.qa-product-random-20/screenshots/11-27271.png)
- Classification: MAJOR ISSUE
- Romanian title quality: FAIL - title is not natural Romanian.
- Romanian slug quality: FAIL - slug contains source/English wording.
- Description quality: MINOR - commercial but template-like/short.
- Specification quality: MINOR - fewer than 5 specs.
- Image quality: PASS - Real local image rendered; single-image gallery is acceptable.
- Document quality: PASS - No documents available in source/data; no broken or fake document links shown.
- Category correctness: PASS / no obvious mismatch detected in page QA.
- Related products: PASS
- Related services: PASS
- CTA visibility: PASS (Solicita oferta, Suna acum, WhatsApp, Discuta cu ZES)
- Major issues: Title is mixed-language, source-like, or not natural Romanian. Slug contains English/source fragments or generic catalog wording.
- Minor issues: Description is commercial but still template-like for a buyer-facing product page. Specification set is thin (<5 specs).

### 12. Sterilizator rapid cu bile GIMA Quick

- URL: http://localhost:3000/produse/sterilizator-rapid-cu-bile-gima-quick-35640
- Screenshot: [12-35640.png](../.qa-product-random-20/screenshots/12-35640.png)
- Classification: PASS
- Romanian title quality: PASS
- Romanian slug quality: PASS
- Description quality: PASS
- Specification quality: PASS
- Image quality: PASS - Real local image rendered; single-image gallery is acceptable.
- Document quality: PASS - No documents available in source/data; no broken or fake document links shown.
- Category correctness: PASS / no obvious mismatch detected in page QA.
- Related products: PASS
- Related services: PASS
- CTA visibility: PASS (Solicita oferta, Suna acum, WhatsApp, Discuta cu ZES)

### 13. Surgical Marker pentru Piele - Single Tip - Sterile - Box Of 100

- URL: http://localhost:3000/produse/surgical-marker-pentru-piele-single-tip-sterile-box-of-100-33182
- Screenshot: [13-33182.png](../.qa-product-random-20/screenshots/13-33182.png)
- Classification: MAJOR ISSUE
- Romanian title quality: FAIL - title is not natural Romanian.
- Romanian slug quality: FAIL - slug contains source/English wording.
- Description quality: MINOR - commercial but template-like/short.
- Specification quality: MINOR - fewer than 5 specs.
- Image quality: PASS - Real local image rendered; single-image gallery is acceptable.
- Document quality: PASS - No documents available in source/data; no broken or fake document links shown.
- Category correctness: PASS / no obvious mismatch detected in page QA.
- Related products: PASS
- Related services: PASS
- CTA visibility: PASS (Solicita oferta, Suna acum, WhatsApp, Discuta cu ZES)
- Major issues: Title is mixed-language, source-like, or not natural Romanian. Slug contains English/source fragments or generic catalog wording.
- Minor issues: Description is commercial but still template-like for a buyer-facing product page. Specification set is thin (<5 specs).

### 14. Targă pliabilă pentru scări

- URL: http://localhost:3000/produse/targa-pliabila-pentru-scari-34068
- Screenshot: [14-34068.png](../.qa-product-random-20/screenshots/14-34068.png)
- Classification: MAJOR ISSUE
- Romanian title quality: PASS
- Romanian slug quality: PASS
- Description quality: PASS
- Specification quality: PASS
- Image quality: MAJOR ISSUE - Product image is missing or too small.
- Document quality: PASS - Local document links visible.
- Category correctness: PASS / no obvious mismatch detected in page QA.
- Related products: PASS
- Related services: PASS
- CTA visibility: PASS (Solicita oferta, Suna acum, WhatsApp, Discuta cu ZES)
- Major issues: Product image is missing or too small.

### 15. Cărucior de urgență Neo Plus

- URL: http://localhost:3000/produse/carucior-de-urgenta-neo-plus-45720
- Screenshot: [15-45720.png](../.qa-product-random-20/screenshots/15-45720.png)
- Classification: MAJOR ISSUE
- Romanian title quality: PASS
- Romanian slug quality: PASS
- Description quality: PASS
- Specification quality: PASS
- Image quality: MAJOR ISSUE - Product image is missing or too small.
- Document quality: PASS - Local document links visible.
- Category correctness: PASS / no obvious mismatch detected in page QA.
- Related products: PASS
- Related services: PASS
- CTA visibility: PASS (Solicita oferta, Suna acum, WhatsApp, Discuta cu ZES)
- Major issues: Product image is missing or too small.

### 16. Masă peste pat Elite

- URL: http://localhost:3000/produse/masa-peste-pat-elite-27487
- Screenshot: [16-27487.png](../.qa-product-random-20/screenshots/16-27487.png)
- Classification: MAJOR ISSUE
- Romanian title quality: PASS
- Romanian slug quality: PASS
- Description quality: PASS
- Specification quality: PASS
- Image quality: MAJOR ISSUE - Product image is missing or too small.
- Document quality: PASS - Local document links visible.
- Category correctness: PASS / no obvious mismatch detected in page QA.
- Related products: PASS
- Related services: PASS
- CTA visibility: PASS (Solicita oferta, Suna acum, WhatsApp, Discuta cu ZES)
- Major issues: Product image is missing or too small.

### 17. Mobilier Medical 2 Shelves 40x36 Cm + Baza 75

- URL: http://localhost:3000/produse/mobilier-medical-2-shelves-40x36-cm-baza-75-27880
- Screenshot: [17-27880.png](../.qa-product-random-20/screenshots/17-27880.png)
- Classification: MAJOR ISSUE
- Romanian title quality: FAIL - title is not natural Romanian.
- Romanian slug quality: FAIL - slug contains source/English wording.
- Description quality: PASS
- Specification quality: MINOR - fewer than 5 specs.
- Image quality: MAJOR ISSUE - Product image is missing or too small.
- Document quality: PASS - Local document links visible.
- Category correctness: PASS / no obvious mismatch detected in page QA.
- Related products: PASS
- Related services: PASS
- CTA visibility: PASS (Solicita oferta, Suna acum, WhatsApp, Discuta cu ZES)
- Major issues: Title is mixed-language, source-like, or not natural Romanian. Slug contains English/source fragments or generic catalog wording. Product image is missing or too small.
- Minor issues: Specification set is thin (<5 specs).

### 18. Defibrilator semiautomat CU-SPR multilingv

- URL: http://localhost:3000/produse/defibrilator-semiautomat-cu-spr-multilingv-35402
- Screenshot: [18-35402.png](../.qa-product-random-20/screenshots/18-35402.png)
- Classification: MAJOR ISSUE
- Romanian title quality: PASS
- Romanian slug quality: PASS
- Description quality: PASS
- Specification quality: MINOR - fewer than 5 specs.
- Image quality: MAJOR ISSUE - Product image is missing or too small.
- Document quality: PASS - Local document links visible.
- Category correctness: PASS / no obvious mismatch detected in page QA.
- Related products: PASS
- Related services: PASS
- CTA visibility: PASS (Solicita oferta, Suna acum, WhatsApp, Discuta cu ZES)
- Major issues: Product image is missing or too small.
- Minor issues: Specification set is thin (<5 specs).

### 19. Scaun ORL Otopex cu tetieră verde Toronto

- URL: http://localhost:3000/produse/scaun-orl-otopex-cu-tetiera-verde-toronto-27552
- Screenshot: [19-27552.png](../.qa-product-random-20/screenshots/19-27552.png)
- Classification: MAJOR ISSUE
- Romanian title quality: PASS
- Romanian slug quality: PASS
- Description quality: PASS
- Specification quality: PASS
- Image quality: MAJOR ISSUE - Product image is missing or too small.
- Document quality: PASS - Local document links visible.
- Category correctness: PASS / no obvious mismatch detected in page QA.
- Related products: PASS
- Related services: PASS
- CTA visibility: PASS (Solicita oferta, Suna acum, WhatsApp, Discuta cu ZES)
- Major issues: Product image is missing or too small.

### 20. Ischia Scaun pentru Transfer Pacient - Albastru

- URL: http://localhost:3000/produse/ischia-scaun-pentru-transfer-pacient-albastru-44840
- Screenshot: [20-44840.png](../.qa-product-random-20/screenshots/20-44840.png)
- Classification: MAJOR ISSUE
- Romanian title quality: FAIL - title is not natural Romanian.
- Romanian slug quality: PASS
- Description quality: PASS
- Specification quality: PASS
- Image quality: MAJOR ISSUE - Product image is missing or too small.
- Document quality: PASS - Local document links visible.
- Category correctness: PASS / no obvious mismatch detected in page QA.
- Related products: PASS
- Related services: PASS
- CTA visibility: PASS (Solicita oferta, Suna acum, WhatsApp, Discuta cu ZES)
- Major issues: Title is mixed-language, source-like, or not natural Romanian. Product image is missing or too small.

## Issue Counts

- Description is commercial but still template-like for a buyer-facing product page.: 12
- Specification set is thin (<5 specs).: 11
- Title is mixed-language, source-like, or not natural Romanian.: 9
- Slug contains English/source fragments or generic catalog wording.: 8
- Product image is missing or too small.: 7

## Recommendation

The sampled batch does not pass random QA. Repair exact title/slug/content issues listed above, then rerun random QA before deployment or indexation.

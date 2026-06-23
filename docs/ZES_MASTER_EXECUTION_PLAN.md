# ZES Master Execution Plan

Scop: crestere SEO controlata si generare de lead-uri B2B pentru ZES MEDCORP, fara revenire la consum excesiv Vercel si fara indexare masiva de continut slab.

Surse consolidate:

- `docs/SEO_GROWTH_PLAN_NEXT_30_DAYS.md`
- `docs/SEARCH_CONSOLE_GROWTH_PLAN.md`
- `docs/MONEY_PAGES_AUDIT.md`
- `docs/PRODUCT_CATALOG_AUDIT.md`
- `docs/VERCEL_SEO_SAFETY_REPORT.md`

## Regula De Scor

Impact total = impact SEO + impact lead-uri + impact Vercel.

Score = Impact total / Efort.

Scala:

- Impact SEO: 1-10
- Impact lead-uri: 1-10
- Impact Vercel: 1-10, unde 10 inseamna reducere mare de risc/cost
- Efort: puncte relative, 1 = rapid, 8 = complex
- Risc: low / medium / high

## Backlog Unic Prioritizat

| Rank | P | Task | Descriere | SEO | Lead | Vercel | Efort | Score | Risc |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | --- |
| 1 | P0 | Pastreaza limita de 500 produse indexabile | Nu mari sitemapul produselor pana cand Vercel Usage este stabil 7 zile si QA trece. | 8 | 6 | 10 | 2 | 12.0 | low |
| 2 | P0 | Monitorizare Vercel dupa deploy | Verifica Fluid CPU, invocations, ISR si product asset proxy la 1h, 24h, 7 zile. | 6 | 5 | 10 | 2 | 10.5 | low |
| 3 | P1 | CTA above-the-fold pe top 10 money pages | Adauga/clarifica CTA principal, telefon si WhatsApp in primul viewport pe paginile comerciale prioritare. | 8 | 10 | 2 | 2 | 10.0 | medium |
| 4 | P1 | Bloc "ce trimiti pentru oferta" pe service/radioprotectie | Adauga microcopy comercial: aparat, simptome, oras, poze, termen, buget. | 7 | 10 | 2 | 2 | 9.5 | low |
| 5 | P0 | Pastreaza Next Image Optimization dezactivat | Verifica sa ramana `images.unoptimized = true` si sa nu apara `/_next/image`. | 5 | 3 | 10 | 2 | 9.0 | low |
| 6 | P1 | Linkuri homepage catre 5 money pages | Leaga homepage spre service radiologie, service CT, radioprotectie, RF shielding, PACS. | 9 | 7 | 1 | 2 | 8.5 | low |
| 7 | P1 | Lead form scurt pe paginile service | Formular scurt pentru solicitare service: echipament, problema, oras, telefon/email. | 6 | 10 | 1 | 2 | 8.5 | medium |
| 8 | P0 | Protejeaza API-urile scumpe | Pastreaza rate-limit strict pe ZES, file analysis si leads; nu relaxa limitele fara date. | 4 | 5 | 10 | 3 | 6.3 | low |
| 9 | P1 | Linkuri din ghiduri catre money pages | Adauga legaturi contextuale din ghiduri/articole catre service, radioprotectie, PACS si produse high-ticket. | 9 | 6 | 1 | 3 | 5.3 | low |
| 10 | P1 | Export si rutina Search Console | Pregateste exportul GSC queries/pages/indexing si matricea pentru quick wins. | 9 | 5 | 2 | 3 | 5.3 | low |
| 11 | P1 | Diferentiere PACS pe 3 intentii | Separare clara intre PACS produs, PACS serviciu si arhivare PACS. | 8 | 7 | 1 | 3 | 5.3 | medium |
| 12 | P1 | Telefon/WhatsApp pe mobile money pages | Asigura contact vizibil, fara overlap, pe service si infrastructura. | 5 | 10 | 1 | 3 | 5.3 | medium |
| 13 | P1 | Optimizeaza top 20 produse slabe | Rescrie copy pentru primele 20 produse din auditul de catalog, cu aplicatii si beneficii reale. | 8 | 6 | 1 | 3 | 5.0 | medium |
| 14 | P2 | FAQ comercial pe produse high-ticket | Adauga FAQ pentru RMN, CT, radiologie digitala, PACS/RIS, mamograf, ecograf. | 7 | 6 | 1 | 3 | 4.7 | medium |
| 15 | P0 | Nu indexa produse fara specs/docs/features reale | Pastreaza noindex pentru produse fara specificatii reale, documente sau caracteristici utile. | 8 | 3 | 10 | 5 | 4.2 | low |
| 16 | P1 | Reparare canibalizare service hub vs service specific | Clarifica rolul `/service-aparatura-medicala` ca hub si rolul paginilor `/servicii/service-*` ca intent specific. | 8 | 6 | 1 | 4 | 3.8 | medium |
| 17 | P2 | Category pages cu introducere comerciala mai solida | Imbunatateste paginile de categorii pentru a evita thin content si browsing pasiv. | 7 | 5 | 2 | 4 | 3.5 | medium |
| 18 | P2 | Adauga data attributes CTA | Standardizeaza `data-cta` pentru oferta, WhatsApp, telefon, ZES si formular. | 4 | 7 | 2 | 4 | 3.3 | low |
| 19 | P2 | Studii de caz anonimizate | Creeaza 5 studii de caz pentru CT, RMN, RX, PACS si service fara clienti inventati. | 7 | 6 | 1 | 5 | 2.8 | medium |
| 20 | P2 | Pregateste batch 500 -> 750 produse | Selecteaza 300 candidati, QA 100, publica doar 250 daca QA 95% PASS. | 8 | 5 | 6 | 7 | 2.7 | high |
| 21 | P2 | Migrare asseturi produs catre CDN/storage | Plan si implementare pentru imagini/documente fara proxy runtime pe Vercel. | 5 | 3 | 10 | 7 | 2.6 | high |
| 22 | P2 | Paginile noi service cu intent comercial | Service ventilatoare, sterilizatoare, ecografe Bucuresti, laborator IVD Bucuresti. | 8 | 8 | 1 | 7 | 2.4 | medium |
| 23 | P2 | Paginile noi high-ticket infrastructura | Relocare RMN, relocare CT, camera CBCT la cheie, UPS imagistica. | 8 | 8 | 1 | 7 | 2.4 | medium |
| 24 | P3 | Dashboard saptamanal GSC/Clarity | Document sau script operational pentru GSC, Clarity, Vercel Usage. | 5 | 4 | 5 | 6 | 2.3 | medium |
| 25 | P3 | Schema review extins | Verifica Service/Product/FAQ/Breadcrumb pe toate paginile prioritare. | 6 | 3 | 1 | 5 | 2.0 | low |
| 26 | P3 | Core Web Vitals manual QA | Teste mobile/desktop pe money pages si produse reprezentative. | 4 | 3 | 4 | 6 | 1.8 | medium |

## Top 10 Taskuri Cu Cel Mai Mare Impact SEO

1. Export si rutina Search Console.
2. Linkuri homepage catre 5 money pages.
3. Linkuri din ghiduri catre money pages.
4. Pastreaza limita de 500 produse indexabile.
5. Optimizeaza top 20 produse slabe.
6. Diferentiere PACS pe 3 intentii.
7. Reparare canibalizare service hub vs service specific.
8. Nu indexa produse fara specs/docs/features reale.
9. Pregateste batch 500 -> 750 produse.
10. Paginile noi service cu intent comercial.

## Top 10 Taskuri Care Aduc Cele Mai Multe Lead-uri

1. CTA above-the-fold pe top 10 money pages.
2. Bloc "ce trimiti pentru oferta" pe service/radioprotectie.
3. Lead form scurt pe paginile service.
4. Telefon/WhatsApp pe mobile money pages.
5. Paginile noi service cu intent comercial.
6. Paginile noi high-ticket infrastructura.
7. Diferentiere PACS pe 3 intentii.
8. Linkuri homepage catre 5 money pages.
9. Linkuri din ghiduri catre money pages.
10. FAQ comercial pe produse high-ticket.

## Top 10 Taskuri Care Reduc Cel Mai Mult Riscul Vercel

1. Pastreaza limita de 500 produse indexabile.
2. Monitorizare Vercel dupa deploy.
3. Pastreaza Next Image Optimization dezactivat.
4. Protejeaza API-urile scumpe.
5. Nu indexa produse fara specs/docs/features reale.
6. Migrare asseturi produs catre CDN/storage.
7. Pregateste batch 500 -> 750 produse cu QA si pauza.
8. Category pages statice si fara filtre runtime grele.
9. Evita redirect maps mari; pastreaza redirecturi publice limitate.
10. Evita deploy-uri frecvente cu asset churn.

## Decizie Strategica

Pentru urmatoarele 7 zile, nu obiectivul este sa crestem numarul de produse indexabile. Obiectivul este sa stoarcem mai multe lead-uri din paginile comerciale existente si sa stabilizam Vercel dupa unblock.

Extinderea la 750 produse este justificata doar dupa:

- 7 zile fara crestere periculoasa Vercel Fluid CPU.
- QA 50/50 PASS pe candidatii noi.
- Search Console nu indica probleme majore de crawl/indexing.
- Primele 20 produse slabe au fost reparate sau retrase din prioritate.

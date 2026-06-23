# ZES Phase 01 Implementation Plan

Perioada: urmatoarele 7 zile.

Obiectiv: crestere rapida de lead-uri B2B si siguranta Vercel, fara extinderea indexarii produselor.

Nu se implementeaza in aceasta faza:

- crestere peste 500 produse in sitemap
- indexare batch nou
- migrare masiva de catalog
- pagini noi in volum mare

## Task 1 - Pastreaza limita de 500 produse indexabile

Prioritate: P0

Fisiere afectate:

- `src/app/sitemap.ts`
- `src/lib/product-catalog.ts`
- `scripts/product-catalog/build-public-catalog.mjs`
- `docs/vercel-hobby-stabilization-report.md`

Modificari recomandate:

- Verifica explicit ca limita `MAX_SITEMAP_PRODUCT_URLS = 500` ramane activa.
- Verifica faptul ca doar `premium` sau `indexable_verified` pot deveni indexabile.
- Adauga in raport o nota operationala: orice crestere la 750 necesita QA si monitorizare.

Risc: low.

Impact estimat:

- SEO: protejeaza calitatea sitemapului.
- Lead-uri: indirect, mentine stabilitatea site-ului.
- Vercel: foarte mare, previne crawl/indexation spike.

## Task 2 - Monitorizare Vercel dupa deploy

Prioritate: P0

Fisiere afectate:

- `docs/vercel-hobby-stabilization-report.md`
- optional: `docs/VERCEL_SEO_SAFETY_REPORT.md`

Modificari recomandate:

- Creeaza checklist operational pentru 1h, 24h si 7 zile.
- Noteaza manual valorile Fluid CPU, Function Invocations, ISR Reads/Writes, Image Optimization.
- Marcheaza pragurile de alerta: Fluid CPU > 20 min in prima ora, > 2h/zi, Image Optimization > 0 crestere relevanta.

Risc: low.

Impact estimat:

- SEO: mediu, previne degradari prin blocare.
- Lead-uri: mediu, mentine uptime.
- Vercel: foarte mare.

## Task 3 - CTA above-the-fold pe top 10 money pages

Prioritate: P1

Fisiere afectate:

- `src/data/seo-commercial-landings.ts`
- `src/data/service-maintenance-landings.ts`
- `src/data/radioprotection-rf-landings.ts`
- `src/data/revenue-landing-pages.ts`
- componente CTA relevante din `src/components/sections/`

Pagini tinta:

- `/service-aparatura-medicala`
- `/servicii/service-radiologie`
- `/servicii/service-computer-tomograf`
- `/servicii/service-rmn`
- `/servicii/radioprotectie`
- `/servicii/rf-shielding-rmn`
- `/servicii/cusca-faraday-rmn`
- `/servicii/pacs-medical`
- `/produse/rmn`
- `/produse/computer-tomograf`

Modificari recomandate:

- In primul viewport, pastreaza un singur CTA primar: `Solicita oferta` sau `Solicita interventie`.
- CTA secundar maxim: `WhatsApp` sau `Suna acum`.
- Adauga microcopy de incredere: `Raspuns comercial pentru proiecte reale, dupa verificare tehnica.`

Risc: medium, pentru ca poate afecta layout mobile.

Impact estimat:

- SEO: mare prin intent clar si engagement.
- Lead-uri: foarte mare.
- Vercel: neutru.

## Task 4 - Bloc "ce trimiti pentru oferta" pe service/radioprotectie

Prioritate: P1

Fisiere afectate:

- `src/data/service-maintenance-landings.ts`
- `src/data/radioprotection-rf-landings.ts`
- `src/data/seo-commercial-landings.ts`
- componente de landing page folosite de serviciile comerciale

Modificari recomandate:

- Adauga bloc compact cu 4-6 puncte:
  - tip echipament / proiect
  - oras
  - problema sau obiectiv
  - termen dorit
  - poze/documente, daca exista
  - telefon/email
- Textul trebuie sa fie comercial, nu explicativ SEO.

Risc: low.

Impact estimat:

- SEO: mediu-mare.
- Lead-uri: foarte mare, reduce frictiunea.
- Vercel: neutru.

## Task 5 - Pastreaza Next Image Optimization dezactivat

Prioritate: P0

Fisiere afectate:

- `next.config.ts`
- eventual componente care folosesc `next/image`

Modificari recomandate:

- Confirma `images.unoptimized = true`.
- Verifica prin HTML live ca nu apar requesturi `/_next/image`.
- Nu introduce transformari Next Image pe catalogul de produse.

Risc: low.

Impact estimat:

- SEO: mediu, prin stabilitate.
- Lead-uri: indirect.
- Vercel: foarte mare, previne depasirea Image Optimization.

## Task 6 - Linkuri homepage catre 5 money pages

Prioritate: P1

Fisiere afectate:

- `src/app/page.tsx`
- `src/components/sections/*`
- eventual datele pentru piloni/homepage

Money pages:

- `/servicii/service-radiologie`
- `/servicii/service-computer-tomograf`
- `/servicii/radioprotectie`
- `/servicii/rf-shielding-rmn`
- `/servicii/pacs-medical`

Modificari recomandate:

- In sectiunea celor trei piloni sau Featured Projects, adauga linkuri contextuale clare.
- Nu readauga complexitate AI/tooling pe homepage.
- Anchor text comercial: `Service radiologie`, `Service CT`, `Radioprotectie`, `RF shielding RMN`, `PACS medical`.

Risc: low.

Impact estimat:

- SEO: foarte mare.
- Lead-uri: mare.
- Vercel: neutru.

## Task 7 - Lead form scurt pe paginile service

Prioritate: P1

Fisiere afectate:

- `src/components/forms/*`
- `src/components/sections/*`
- `src/data/service-maintenance-landings.ts`
- `src/app/api/leads/route.ts` doar daca sunt necesare campuri noi, altfel nu

Modificari recomandate:

- Formular scurt:
  - nume/companie
  - telefon/email
  - tip echipament
  - oras
  - problema / solicitare
- Pastreaza honeypot/rate-limit.
- Nu adauga DB/CRM.

Risc: medium, pentru ca atinge conversia si validarea formularelor.

Impact estimat:

- SEO: mediu.
- Lead-uri: foarte mare.
- Vercel: mic risc daca endpointul este folosit mai mult; pastreaza limitele.

## Task 8 - Protejeaza API-urile scumpe

Prioritate: P0

Fisiere afectate:

- `src/lib/server-rate-limit.ts`
- `src/app/api/zes-guide/route.ts`
- `src/app/api/zes-guide/file-analysis/route.ts`
- `src/app/api/leads/route.ts`
- `src/app/api/product-assets/images/[code]/[...file]/route.ts`
- `src/app/api/product-assets/documents/[code]/[...file]/route.ts`

Modificari recomandate:

- Nu relaxa limitele actuale fara date Vercel.
- Pastreaza blocarea user-agentilor suspecti.
- Pastreaza long cache pentru asset proxy.
- Daca apar spike-uri, scade limitele pentru documente si file analysis.

Risc: low daca nu se schimba UX-ul normal.

Impact estimat:

- SEO: indirect.
- Lead-uri: mediu, protejeaza disponibilitatea.
- Vercel: foarte mare.

## Task 9 - Linkuri din ghiduri catre money pages

Prioritate: P1

Fisiere afectate:

- `src/data/articles.ts`
- `src/data/seo-clusters.ts`
- `src/data/glossary.ts`
- `src/lib/internal-linking.ts`

Modificari recomandate:

- Pentru fiecare ghid relevant, adauga 1-2 linkuri naturale catre:
  - service radiologie
  - service CT
  - service RMN
  - radioprotectie
  - RF shielding
  - PACS
- Evita link spam.
- Linkurile trebuie sa fie contextuale, in paragrafe sau sectiuni de next step.

Risc: low.

Impact estimat:

- SEO: foarte mare.
- Lead-uri: mediu-mare.
- Vercel: neutru.

## Task 10 - Export si rutina Search Console

Prioritate: P1

Fisiere afectate:

- `docs/SEARCH_CONSOLE_GROWTH_PLAN.md`
- optional: `docs/ZES_GSC_WEEKLY_TRACKING.md`

Modificari recomandate:

- Export manual GSC:
  - top queries 3 luni
  - top pages 3 luni
  - indexing reasons
  - sitemap status
  - crawl stats
  - Core Web Vitals
- Creeaza lista:
  - pagini pozitia 4-15
  - CTR sub 1%
  - impressions mari, clicks mici
  - crawled/discovered not indexed
- Foloseste exportul pentru urmatoarea faza de titles/meta/internal links.

Risc: low.

Impact estimat:

- SEO: foarte mare.
- Lead-uri: mediu.
- Vercel: mediu, ajuta sa nu crestem sitemapul orb.

## Ordinea Recomandata In 7 Zile

1. Task 1, 2, 5, 8: siguranta Vercel si guardrails.
2. Task 3, 4, 7: conversie lead-uri pe service/money pages.
3. Task 6, 9: internal linking catre pagini cu valoare.
4. Task 10: GSC export pentru faza urmatoare.

## Criterii De Inchidere Phase 01

- Sitemap produs ramane la 500 produse GIMA.
- `/_next/image` ramane absent.
- Top 10 money pages au CTA clar in primul viewport.
- Paginile service au cerere oferta mai usor de completat.
- Homepage trimite mai clar spre paginile comerciale.
- Ghidurile imping autoritate catre money pages.
- Exista export sau checklist GSC pentru deciziile urmatoare.

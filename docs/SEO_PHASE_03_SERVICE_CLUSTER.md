# SEO-03 Service & Maintenance Revenue Cluster

## Obiectiv

Phase SEO-03 creeaza un cluster comercial cu intentie mare pentru service, mentenanta si suport tehnic pentru aparatura medicala. Paginile sunt orientate spre lead-uri rapide: clinici si centre medicale care detin deja echipamente, au downtime, cauta interventie, contract de mentenanta sau suport preventiv.

Acest cluster nu este blog si nu este continut educational general. Fiecare pagina directioneaza vizitatorul catre contact, WhatsApp, cerere de service, suport urgent si ofertare.

## URL-uri create

| URL | Word count | FAQ schema | Breadcrumb schema | Service schema |
| --- | ---: | --- | --- | --- |
| `/servicii/service-radiologie` | 2573 | da | da | da |
| `/servicii/service-rmn` | 2567 | da | da | da |
| `/servicii/service-computer-tomograf` | 2557 | da | da | da |
| `/servicii/service-ecograf` | 2538 | da | da | da |
| `/servicii/service-mamograf` | 2513 | da | da | da |
| `/servicii/service-c-arm` | 2558 | da | da | da |
| `/servicii/service-pacs-ris` | 2565 | da | da | da |
| `/servicii/mentenanta-echipamente-medicale` | 2544 | da | da | da |
| `/servicii/contract-mentenanta-radiologie` | 2574 | da | da | da |
| `/servicii/interventii-tehnice-echipamente-medicale` | 2561 | da | da | da |

## Target keywords

| URL | Keyword principal | Keyword-uri secundare |
| --- | --- | --- |
| `/servicii/service-radiologie` | service radiologie | service RX, mentenanta radiologie, service detector digital, interventii radiologie |
| `/servicii/service-rmn` | service RMN | mentenanta RMN, suport RMN, service rezonanta magnetica, RF shielding RMN |
| `/servicii/service-computer-tomograf` | service computer tomograf | service CT, mentenanta CT, interventii computer tomograf, suport camera CT |
| `/servicii/service-ecograf` | service ecograf | service ecografe, reparatii ecograf, mentenanta ecograf, sonde ecograf |
| `/servicii/service-mamograf` | service mamograf | mentenanta mamograf, service mamografie, interventii mamograf, suport mamografie digitala |
| `/servicii/service-c-arm` | service C-arm | service arc C, mentenanta C-arm, interventii C-arm, service imagistica intraoperatorie |
| `/servicii/service-pacs-ris` | service PACS RIS | suport PACS, service RIS, suport DICOM, mentenanta PACS |
| `/servicii/mentenanta-echipamente-medicale` | mentenanta echipamente medicale | mentenanta aparatura medicala, contract mentenanta medicala, service preventiv, suport echipamente medicale |
| `/servicii/contract-mentenanta-radiologie` | contract mentenanta radiologie | contract service radiologie, mentenanta RX, mentenanta imagistica, service preventiv radiologie |
| `/servicii/interventii-tehnice-echipamente-medicale` | interventii tehnice echipamente medicale | interventii service aparatura medicala, suport tehnic medical, diagnostic echipamente medicale, service urgent medical |

## Structura comerciala

Fiecare pagina include:

- H1 unic;
- introducere comerciala cu pain point clar;
- sectiuni despre downtime, cost operational si risc;
- proces de service: preluare caz, triere, diagnostic, oferta, interventie, mentenanta;
- argumente pentru mentenanta preventiva si contracte de suport;
- CTA pentru contact, WhatsApp, cerere service si suport urgent;
- FAQ comercial pentru preluare rapida si ofertare;
- linkuri interne catre produse, servicii, mentenanta si contact.

## Internal links

Clusterul este conectat catre:

- produse relevante: `/produse/rmn`, `/produse/computer-tomograf`, `/produse/radiologie-digitala`, `/produse/ecograf`, `/produse/mamograf`, `/produse/c-arm`, `/produse/pacs-ris`, `/produse/monitor-pacient`, `/produse/ups-medical`;
- servicii conexe: `/service-aparatura-medicala`, `/contracte-mentenanta`, `/servicii/pacs-medical`, `/servicii/arhivare-pacs`, `/servicii/diagnostic-la-distanta`, `/radioprotectie-plumbare-rx`;
- pagini de infrastructura: `/servicii/infrastructura-imagistica`, `/solutii-medicale/camere-rmn`, `/solutii-medicale/camere-ct`;
- contact: `/contact`.

Homepage/pilonul `Service & Maintenance` trimite acum direct catre:

- `/servicii/service-radiologie`;
- `/servicii/service-rmn`;
- `/servicii/mentenanta-echipamente-medicale`.

Pagina `/servicii` listeaza automat toate paginile din cluster prin `seoCommercialLandings`.

## Sitemap

`src/app/sitemap.ts` include `seoCommercialLandings`, iar SEO-03 extinde aceeasi sursa prin `serviceMaintenanceLandings`. Cele 10 URL-uri sunt incluse automat in sitemap ca rute comerciale indexabile.

Admin routes si produsele GIMA noindex nu sunt afectate.

## Oportunitati comerciale

1. **Lead-uri rapide din downtime**: vizitatorii care cauta service sau interventie au intentie imediata, mai rapida decat traficul de produs.
2. **Contracte recurente**: paginile de mentenanta pot transforma interventiile punctuale in contracte preventive.
3. **Imagistica medicala**: service radiologie, RMN, CT, mamograf, C-arm si PACS/RIS conecteaza ZESCORP cu centre care au echipamente cu valoare ridicata.
4. **Upsell catre infrastructura**: service-ul poate descoperi nevoi de radioprotectie, PACS, UPS, camera CT/RMN sau modernizare.
5. **Reducerea costului de vanzare**: paginile cer date concrete: echipament, model, oras, simptom, urgenta si contact.

## Fisiere modificate

- `src/data/service-maintenance-landings.ts`
- `src/data/seo-commercial-landings.ts`
- `src/components/sections/ServicesSection.tsx`
- `src/app/servicii/service-radiologie/page.tsx`
- `src/app/servicii/service-rmn/page.tsx`
- `src/app/servicii/service-computer-tomograf/page.tsx`
- `src/app/servicii/service-ecograf/page.tsx`
- `src/app/servicii/service-mamograf/page.tsx`
- `src/app/servicii/service-c-arm/page.tsx`
- `src/app/servicii/service-pacs-ris/page.tsx`
- `src/app/servicii/mentenanta-echipamente-medicale/page.tsx`
- `src/app/servicii/contract-mentenanta-radiologie/page.tsx`
- `src/app/servicii/interventii-tehnice-echipamente-medicale/page.tsx`

## Validare

Validari rulate:

- `npm run build -- --webpack`
- `npm run content:check`
- `npm run audit:seo`

Verificari recomandate dupa deploy:

- toate URL-urile returneaza `200`;
- toate apar in `sitemap.xml`;
- canonical catre `https://www.zescorp.ro/...`;
- `FAQPage`, `BreadcrumbList` si `Service` schema prezente;
- fara `noindex`;
- fara overflow orizontal pe mobil;
- CTA-urile de contact, WhatsApp si suport urgent sunt vizibile.

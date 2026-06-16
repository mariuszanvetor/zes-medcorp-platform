# SEO Phase 01 - Commercial Landing Expansion

Data: 2026-06-16

## Obiectiv

Extinderea site-ului ZESCORP cu landing pages comerciale indexabile pentru interogari B2B cu intentie ridicata: service aparatura medicala, aparatura medicala Bucuresti, PACS, arhivare PACS, proiectare radiologie, cusca Faraday RMN, infrastructura imagistica, diagnostic la distanta, CBCT si RX room design.

Aceste pagini sunt landing pages comerciale, nu articole de blog. Fiecare pagina raspunde la:

- ce este serviciul/produsul;
- cui se adreseaza;
- beneficii comerciale;
- proces de implementare;
- factori de cost;
- intrebari frecvente;
- de ce ZESCORP;
- CTA pentru contact, oferta personalizata si consultanta.

## Pagini create sau refacute

| URL | Tip | Keyword principal | Status indexare | Word count HTML |
| --- | --- | --- | --- | ---: |
| `/service-aparatura-medicala` | service | service aparatura medicala | indexabil | 1.739 |
| `/aparatura-medicala-bucuresti` | comercial local | aparatura medicala Bucuresti | indexabil | 1.685 |
| `/servicii/pacs-medical` | serviciu digital imagistica | PACS medical | indexabil | 1.675 |
| `/servicii/arhivare-pacs` | serviciu digital imagistica | arhivare PACS | indexabil | 1.657 |
| `/servicii/proiectare-radiologie` | infrastructura radiologie | proiectare radiologie | indexabil | 1.641 |
| `/servicii/cusca-faraday-rmn` | RF shielding | cusca Faraday RMN | indexabil | 1.660 |
| `/servicii/infrastructura-imagistica` | infrastructura imagistica | infrastructura imagistica | indexabil | 1.619 |
| `/servicii/diagnostic-la-distanta` | teleradiologie/PACS | diagnostic la distanta | indexabil | 1.638 |
| `/produse/cbct` | produs comercial | CBCT | indexabil | 1.624 |
| `/servicii/rx-room-design` | proiectare RX | RX room design | indexabil | 1.620 |

## Cuvinte cheie tintite

### Service si mentenanta

- service aparatura medicala
- mentenanta aparatura medicala
- service echipamente medicale
- service echipamente biomedicale

### Aparatura medicala si produse

- aparatura medicala Bucuresti
- echipamente medicale Bucuresti
- CBCT
- aparat CBCT
- imagistica dentara CBCT

### PACS si diagnostic digital

- PACS medical
- PACS imagistica
- arhivare PACS
- stocare DICOM
- diagnostic la distanta
- teleradiologie

### Radiologie si infrastructura

- proiectare radiologie
- infrastructura imagistica
- RX room design
- camera RX
- cusca Faraday RMN
- RF shielding RMN

## Implementare tehnica

Au fost adaugate:

- `src/data/seo-commercial-landings.ts`
- `src/components/sections/SeoCommercialLandingPage.tsx`
- rute explicite pentru toate cele 10 URL-uri comerciale.

Fiecare pagina foloseste:

- SEO title unic;
- meta description unic;
- H1 unic;
- structura H2/H3 comerciala;
- `FAQSchema`;
- `BreadcrumbSchema`;
- `ServiceSchema`;
- canonical prin `createWebsiteMetadata`;
- CTA catre `/contact`, `/project-intake`, telefon, email si WhatsApp.

## Modificari sitemap

`src/app/sitemap.ts` include acum toate paginile din `seoCommercialLandings`.

Ruta `/service-aparatura-medicala` a fost scoasa din lista statica pentru a evita duplicarea in sitemap si este inclusa prin noul sistem SEO commercial landings.

Produsele GIMA raman gestionate separat prin regulile existente de indexare/noindex. Aceasta faza nu a schimbat indexarea produselor importate.

Verificare build: toate cele 10 URL-uri noi apar in sitemap-ul generat.

## Modificari internal linking

### Homepage

`src/components/sections/ServicesSection.tsx` a primit linkuri comerciale compacte in cardurile celor trei piloni:

- Medical Infrastructure:
  - `/servicii/infrastructura-imagistica`
  - `/servicii/proiectare-radiologie`
  - `/servicii/cusca-faraday-rmn`

- Medical Equipment:
  - `/aparatura-medicala-bucuresti`
  - `/produse/cbct`
  - `/servicii/pacs-medical`

- Service & Maintenance:
  - `/service-aparatura-medicala`
  - `/servicii/arhivare-pacs`
  - `/servicii/diagnostic-la-distanta`

### Pagina `/servicii`

`src/app/servicii/page.tsx` include acum o sectiune "Pagini comerciale" cu linkuri catre toate cele 10 landing pages.

### Linkuri intre landing pages

Fiecare pagina include linkuri contextuale spre:

- servicii conexe;
- solutii medicale relevante;
- contact;
- service/mentenanta;
- infrastructura imagistica;
- radioprotectie/RF shielding;
- PACS/arhivare/diagnostic la distanta.

## Validare

- `npm run build -- --webpack`: passed
- `npm run content:check`: passed
- `npm run audit:seo`: passed, 0 errors / 0 warnings
- word count HTML pentru fiecare pagina: peste 1.500 cuvinte

## Observatii

Nu au fost inventate certificari, proiecte realizate sau preturi finale. Costurile sunt prezentate ca factori de cost si scenarii comerciale, nu ca tarife garantate.

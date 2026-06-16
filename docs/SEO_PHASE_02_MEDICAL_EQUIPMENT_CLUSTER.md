# SEO-02 Medical Equipment Revenue Cluster

## Obiectiv

Phase SEO-02 extinde zona comerciala pentru echipamente medicale cu pagini orientate spre ofertare, consultanta si analiza de proiect. Paginile nu sunt articole si nu sunt ghiduri educationale; fiecare URL este construit ca landing comercial pentru lead-uri B2B, cereri de oferta, dotari medicale, oportunitati de licitatii si proiecte de infrastructura.

## Pagini create

| URL | Keyword principal | Intent comercial |
| --- | --- | --- |
| `/produse/rmn` | RMN | oferta RMN, camera RMN, RF shielding, instalare, service |
| `/produse/computer-tomograf` | computer tomograf | oferta CT, camera CT, radioprotectie, service, infrastructura |
| `/produse/radiologie-digitala` | radiologie digitala | RX digital, camera RX, detector digital, PACS |
| `/produse/ecograf` | ecograf | oferta ecograf, sonde, aplicatii clinice, service ecografe |
| `/produse/mamograf` | mamograf | mamografie digitala, screening, radioprotectie, PACS |
| `/produse/c-arm` | C-arm | arc C, imagistica intraoperatorie, service C-arm |
| `/produse/imprimanta-dicom` | imprimanta DICOM | imprimare DICOM, PACS, consumabile, integrare |
| `/produse/ups-medical` | UPS medical | alimentare echipamente critice, continuitate electrica |
| `/produse/monitor-pacient` | monitor pacient | monitor multiparametric, functii vitale, service biomedical |
| `/produse/pacs-ris` | PACS RIS | PACS, RIS, DICOM, arhivare imagistica, diagnostic la distanta |

## Keyword-uri secundare

| URL | Keyword-uri secundare |
| --- | --- |
| `/produse/rmn` | aparat RMN, camera RMN, RF shielding RMN, oferta RMN |
| `/produse/computer-tomograf` | CT medical, camera CT, oferta computer tomograf, service CT |
| `/produse/radiologie-digitala` | RX digital, echipament radiologie digitala, camera RX, detector digital |
| `/produse/ecograf` | aparat ecografie, ecograf medical, oferta ecograf, service ecografe |
| `/produse/mamograf` | mamografie digitala, oferta mamograf, camera mamografie, service mamograf |
| `/produse/c-arm` | arc C, C-arm medical, oferta C-arm, service C-arm |
| `/produse/imprimanta-dicom` | printer DICOM, imprimare imagistica medicala, PACS DICOM, film medical |
| `/produse/ups-medical` | UPS aparatura medicala, UPS clinica, UPS imagistica, alimentare echipamente medicale |
| `/produse/monitor-pacient` | monitor multiparametric, monitor functii vitale, oferta monitor pacient, service monitor pacient |
| `/produse/pacs-ris` | PACS medical, RIS radiologie, arhivare DICOM, diagnostic la distanta |

## Modificari sitemap

`src/app/sitemap.ts` include deja `seoCommercialLandings`. SEO-02 extinde aceeasi sursa prin `medicalEquipmentLandings`, astfel cele 10 URL-uri noi sunt incluse automat in sitemap ca pagini indexabile comerciale.

Produsele GIMA importate raman gestionate separat prin `getIndexableProducts()` si nu sunt afectate de aceasta faza. SEO-02 creeaza pagini comerciale statice de categorie/echipament, nu indexeaza catalogul GIMA.

## Modificari internal linking

Au fost adaugate sau consolidate linkuri interne in:

- `/produse`: sectiune noua "Echipamente medicale" cu link catre toate cele 10 pagini.
- `/servicii`: lista comerciala preia automat toate paginile din `seoCommercialLandings`.
- homepage / `ServicesSection`: pilonul "Medical Equipment" trimite catre RMN, computer tomograf, ecograf si aparatura medicala Bucuresti.
- fiecare landing SEO-02: linkuri catre pagini relevante precum infrastructura imagistica, PACS, radioprotectie, service, mentenanta si contact.

## Schema si metadata

Fiecare pagina SEO-02 foloseste:

- SEO title unic;
- meta description unic;
- canonical prin `createWebsiteMetadata`;
- FAQ schema;
- Breadcrumb schema;
- Product schema;
- Service schema pentru contextul comercial ZESCORP.

## Oportunitati comerciale identificate

1. **Imagistica premium**: RMN, CT, mamograf si radiologie digitala pot genera proiecte cu valoare mare, in care ZESCORP poate vinde echipament, infrastructura, integrare PACS, instalare si service.
2. **Software imagistica**: PACS/RIS, arhivare PACS, DICOM si diagnostic la distanta creeaza oportunitati recurente de integrare, suport si mentenanta.
3. **Echipamente clinice cu volum**: ecografe, monitoare pacient si UPS medical pot genera cereri rapide de oferta, dotari multi-site si contracte de mentenanta.
4. **Interventii si sali specializate**: C-arm, CT, RX si mamografie creeaza oportunitati pentru radioprotectie, pregatirea spatiului, service si consultanta tehnica.
5. **Licitatii si proiecte de dotare**: paginile raspund cautarilor comerciale care pot veni de la administratori, clinici, spitale private, consultanti si echipe de achizitii.

## Fisiere modificate

- `src/data/medical-equipment-landings.ts`
- `src/data/seo-commercial-landings.ts`
- `src/components/sections/SeoCommercialLandingPage.tsx`
- `src/app/produse/page.tsx`
- `src/app/servicii/page.tsx`
- `src/components/sections/ServicesSection.tsx`
- `src/app/produse/rmn/page.tsx`
- `src/app/produse/computer-tomograf/page.tsx`
- `src/app/produse/radiologie-digitala/page.tsx`
- `src/app/produse/ecograf/page.tsx`
- `src/app/produse/mamograf/page.tsx`
- `src/app/produse/c-arm/page.tsx`
- `src/app/produse/imprimanta-dicom/page.tsx`
- `src/app/produse/ups-medical/page.tsx`
- `src/app/produse/monitor-pacient/page.tsx`
- `src/app/produse/pacs-ris/page.tsx`

## Validare recomandata

- `npm run build -- --webpack`
- `npm run content:check`
- `npm run audit:seo`
- smoke pe cele 10 URL-uri;
- verificare sitemap pentru cele 10 URL-uri;
- verificare FAQ/Breadcrumb/Product schema in HTML;
- verificare ca paginile sunt indexabile si nu au `noindex`.

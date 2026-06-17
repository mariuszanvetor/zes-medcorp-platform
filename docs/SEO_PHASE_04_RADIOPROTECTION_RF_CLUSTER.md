# SEO Phase 04 - Radioprotection & RF Shielding Revenue Cluster

## Obiectiv

Phase SEO-04 adauga un cluster comercial pentru proiecte de radioprotectie, plumbare camere RX, amenajare radiologie, radioprotectie CT/mamografie, RF shielding RMN, camere RMN la cheie, ecranare electromagnetica medicala si consultanta preliminara CNCAN.

Paginile sunt landing pages comerciale, nu articole de blog. Fiecare pagina este orientata spre lead-uri B2B: proprietari de clinici, centre de imagistica, spitale private, manageri de proiect, arhitecti medicali si echipe de achizitii.

## Pagini create

| URL | Keyword principal | Cuvinte randate | Schema |
| --- | --- | ---: | --- |
| `/servicii/radioprotectie` | radioprotectie | 2709 | FAQ, Breadcrumb, Service |
| `/servicii/placare-plumb-camera-rx` | placare plumb camera RX | 2751 | FAQ, Breadcrumb, Service |
| `/servicii/amenajare-camera-radiologie` | amenajare camera radiologie | 2728 | FAQ, Breadcrumb, Service |
| `/servicii/proiectare-camera-rx` | proiectare camera RX | 2715 | FAQ, Breadcrumb, Service |
| `/servicii/radioprotectie-ct` | radioprotectie CT | 2735 | FAQ, Breadcrumb, Service |
| `/servicii/radioprotectie-mamografie` | radioprotectie mamografie | 2710 | FAQ, Breadcrumb, Service |
| `/servicii/rf-shielding-rmn` | RF shielding RMN | 2751 | FAQ, Breadcrumb, Service |
| `/servicii/camera-rmn-la-cheie` | camera RMN la cheie | 2743 | FAQ, Breadcrumb, Service |
| `/servicii/ecranare-electromagnetica-medicala` | ecranare electromagnetica medicala | 2730 | FAQ, Breadcrumb, Service |
| `/servicii/consultanta-cncan-radiologie` | consultanta CNCAN radiologie | 2735 | FAQ, Breadcrumb, Service |

## Keyword-uri secundare

- radioprotectie medicala
- protectie radiologica
- radioprotectie camere RX
- plumbare camera RX
- pereti plumb radiologie
- usa plumbata RX
- camera radiologie
- proiect camera RX
- amenajare camera CT
- radioprotectie computer tomograf
- camera mamografie
- RF shielding medical
- cusca Faraday RMN
- ecranare RF RMN
- camera RMN la cheie
- consultanta CNCAN radiologie
- documentatie CNCAN camera RX

## Structura comerciala

Fiecare pagina raspunde explicit la:

- ce serviciu se poate solicita;
- cui se adreseaza;
- beneficii comerciale si operationale;
- proces de implementare;
- documente si date necesare;
- riscuri si conformitate;
- factori care influenteaza bugetul;
- timeline si planificare;
- de ce ZESCORP;
- intrebari frecvente;
- cerere de oferta si consultanta.

## Modificari sitemap

Paginile sunt incluse automat in `src/app/sitemap.ts` prin `seoCommercialLandings`.

Pentru a evita duplicarea rutei `/servicii/rf-shielding-rmn`, sitemap-ul filtreaza acum rutele din `serviceFunnels` daca aceeasi cale exista deja in clusterul comercial.

## Internal linking

Au fost adaugate linkuri contextuale intre clusterul SEO-04 si:

- `/produse/rmn`
- `/produse/computer-tomograf`
- `/produse/mamograf`
- `/produse/radiologie-digitala`
- `/servicii/service-rmn`
- `/servicii/service-computer-tomograf`
- `/servicii/service-mamograf`
- `/servicii/service-radiologie`
- `/servicii/mentenanta-echipamente-medicale`
- `/servicii/pacs-medical`
- `/servicii/infrastructura-imagistica`
- `/contact`

Homepage/sectiunea de servicii include acum scurtaturi comerciale catre:

- `/servicii/radioprotectie`
- `/servicii/rf-shielding-rmn`
- `/servicii/consultanta-cncan-radiologie`

## Siguranta si conformitate

Textele evita promisiunile definitive despre autorizare CNCAN, grosimi finale sau rezultate care necesita specialisti autorizati. Paginile folosesc formulare orientate spre evaluare preliminara, oferta personalizata, validare de specialitate si pregatirea documentatiei.

## Validare locala initiala

- `npm run build -- --webpack`: pass
- Rutele SEO-04 apar ca rute statice in build.
- Fiecare pagina are peste 2500 de cuvinte randate.
- FAQ schema, Breadcrumb schema si Service schema sunt prezente in HTML-ul generat.
- Canonical local generat pe `https://www.zescorp.ro/...`.

## Oportunitati comerciale urmarite

- cereri pentru plumbare camere RX;
- modernizari de camere radiologie;
- proiecte CT si mamografie;
- camere RMN la cheie;
- RF shielding pentru RMN;
- ecranare electromagnetica medicala;
- consultanta preliminara CNCAN;
- service si mentenanta asociate echipamentelor de imagistica.

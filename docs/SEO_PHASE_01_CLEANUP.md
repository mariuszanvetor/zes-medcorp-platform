# SEO Phase 01 Cleanup - Premium Commercial Pages

Data: 2026-06-16

## Obiectiv

Curatarea celor 10 landing pages SEO-01 pentru a elimina tonul de continut generat si a le transforma in pagini comerciale premium orientate spre client, ofertare si conversie.

## Pagini modificate

- `/service-aparatura-medicala`
- `/aparatura-medicala-bucuresti`
- `/servicii/pacs-medical`
- `/servicii/arhivare-pacs`
- `/servicii/proiectare-radiologie`
- `/servicii/cusca-faraday-rmn`
- `/servicii/infrastructura-imagistica`
- `/servicii/diagnostic-la-distanta`
- `/produse/cbct`
- `/servicii/rx-room-design`

## Texte eliminate sau rescrise

Au fost eliminate/rescrise formulele care explicau pagina, intentia SEO sau structura continutului:

- `Pagina este construita pentru...`
- `Pagina ofera repere...`
- heading-ul generic despre cumparatori B2B;
- formularea `Scopul acestei pagini...`;
- formularea `O pagina comerciala buna...`;
- formularea `nu doar o pagina de contact`.

Inlocuiri principale:

- `Pagina este construita pentru administratori...` a devenit copy direct despre suport pentru administratori, responsabili tehnici si proprietari de clinici.
- `Pagina ofera repere comerciale...` a devenit `ZESCORP poate oferi repere comerciale...`.
- `Pagina este construita pentru cumparatori B2B...` a devenit `Decizie, oferta si implementare pentru echipe medicale care nu isi permit blocaje.`
- `Scopul acestei pagini...` a devenit `Rezultatul urmarit este o discutie suficient de clara...`.
- `O pagina comerciala buna...` a devenit `Experienta trebuie sa duca beneficiarul spre actiune...`.

## Probleme UI rezolvate

### Hero contrast

Problema potentiala:

- hero-ul avea gradient cu zona deschisa in partea dreapta, iar continutul alb putea deveni vulnerabil la contrast in anumite viewport-uri.

Fix:

- hero-ul comun pentru landing pages foloseste acum un gradient complet inchis:
  - `#04152d`
  - `#062a55`
  - `#0b3f78`

Rezultat:

- textul alb din hero ramane pe fundal inchis;
- CTA-ul secundar cu stil outline ramane lizibil;
- cardul de oferta ramane separat pe fundal alb cu text inchis.

### Audit contrast

Verificarea componentelor SEO-01 nu a mai identificat cazuri evidente de text alb pe fundal deschis dupa ajustarea hero-ului.

## Corectii de capitalizare si nume proprii

Normalizari aplicate in continutul SEO-01:

- `Bucuresti` -> `București`
- `Romania` -> `România`
- `Zescorp` -> `ZESCORP`
- `Pacs` -> `PACS`
- `Rmn` -> `RMN`
- `Cbct` -> `CBCT`
- `Dicom` -> `DICOM`

Termenii pastrati ca acronime comerciale/tehnice:

- PACS
- RIS
- RMN
- CT
- CBCT
- DICOM
- RF
- HVAC
- UPS

## Fisiere modificate

- `src/data/seo-commercial-landings.ts`
- `src/components/sections/SeoCommercialLandingPage.tsx`
- `src/components/sections/ServicesSection.tsx`
- `src/app/servicii/page.tsx`
- `docs/SEO_PHASE_01_COMMERCIAL_LANDINGS.md`

## Validare textuală

Auditul local cu `rg` nu mai gaseste expresiile interzise in:

- `src/data/seo-commercial-landings.ts`
- `src/components/sections/SeoCommercialLandingPage.tsx`
- `docs/SEO_PHASE_01_COMMERCIAL_LANDINGS.md`

## Validare tehnica

- `npm run build -- --webpack`: passed
- `npm run content:check`: passed
- `npm run audit:seo`: passed, 0 errors / 0 warnings

## Word count dupa cleanup

- `/service-aparatura-medicala`: 1.720 cuvinte
- `/aparatura-medicala-bucuresti`: 1.671 cuvinte
- `/servicii/pacs-medical`: 1.661 cuvinte
- `/servicii/arhivare-pacs`: 1.643 cuvinte
- `/servicii/proiectare-radiologie`: 1.627 cuvinte
- `/servicii/cusca-faraday-rmn`: 1.646 cuvinte
- `/servicii/infrastructura-imagistica`: 1.605 cuvinte
- `/servicii/diagnostic-la-distanta`: 1.624 cuvinte
- `/produse/cbct`: 1.610 cuvinte
- `/servicii/rx-room-design`: 1.606 cuvinte

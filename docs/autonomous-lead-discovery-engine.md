# ZESCORP Autonomous Lead Discovery Engine

## Scop

Phase 82A adauga discovery automat controlat peste baza persistenta Phase 81A.

Motorul:

- cauta prin API-uri configurabile;
- viziteaza website-uri oficiale publice;
- extrage nume companie, domeniu, email business public, telefon public, oras si categorie;
- pastreaza audit pentru fiecare candidat;
- sare domeniile procesate anterior;
- importa numai date business publice;
- exporta workbook-ul actualizat;
- nu trimite emailuri si nu integreaza CRM.

Review-ul uman ramane obligatoriu inainte de outreach. Lead-urile descoperite automat intra implicit ca `Verified Public Contact` sau `Needs Manual Verification`, nu ca `Ready for Outreach`.

## Incarcare environment

`npm run leads:auto` incarca automat `.env.local` din radacina proiectului inainte ca adaptoarele sa citeasca `process.env`. Variabilele oferite explicit de terminal au prioritate. `.env.local` ramane ignorat de Git, iar valorile secrete nu sunt afisate.

## Provideri

### Google Custom Search JSON API

Configurare:

```env
GOOGLE_CUSTOM_SEARCH_API_KEY=
GOOGLE_CUSTOM_SEARCH_CX=
```

Motorul foloseste endpoint-ul oficial `customsearch.googleapis.com/customsearch/v1`.

### Google Places Text Search (Legacy)

Configurare:

```env
GOOGLE_PLACES_API_KEY=
```

Motorul foloseste endpoint-ul oficial `maps.googleapis.com/maps/api/place/textsearch/json`, compatibil cu cheia configurata, apoi cere numai campurile necesare prin `maps.googleapis.com/maps/api/place/details/json`: nume, adresa, website, telefon si Google Maps URL.

Request-urile Google Places sunt logate cu URL complet, dar parametrul `key` este redactat. Raspunsurile de eroare sunt logate redactat pentru diagnostic. Restrictionati cheia API la serviciul si mediul necesar.

Adaptorul folosise initial Text Search (New), `POST places.googleapis.com/v1/places:searchText`. Acest endpoint necesita activarea separata a serviciului `Places API (New)` si headerele `X-Goog-Api-Key` plus `X-Goog-FieldMask`. Pentru cheia operationala curenta serviciul New nu este activ, in timp ce endpoint-ul legacy este activ si returneaza rezultate valide. Phase 82A foloseste explicit varianta legacy compatibila.

### Bing

Microsoft a retras Bing Search APIs la 11 august 2025. Phase 82A nu scrapeaza HTML-ul Bing si nu pretinde ca exista un API oficial activ.

Adaptorul Bing ruleaza numai daca exista un endpoint compatibil aprobat explicit:

```env
BING_SEARCH_ENDPOINT=
BING_SEARCH_API_KEY=
```

Fara aceste variabile, sesiunea noteaza provider-ul ca `skipped`.

Referinte:

- [Google Custom Search JSON API](https://developers.google.com/custom-search/v1/overview)
- [Google Places Text Search (Legacy)](https://developers.google.com/maps/documentation/places/web-service/legacy/search-text)
- [Google Place Details (Legacy)](https://developers.google.com/maps/documentation/places/web-service/legacy/details)
- [Microsoft Bing Search API retirement](https://learn.microsoft.com/en-us/lifecycle/announcements/bing-search-api-retirement)

## Crawl website oficial

Pentru fiecare domeniu nou:

1. motorul verifica memoria persistenta;
2. viziteaza homepage-ul si maximum doua cai conventionale de contact;
3. ramane pe acelasi domeniu;
4. extrage numai emailuri si telefoane publicate;
5. acorda `confidenceScore`;
6. scrie eveniment in `discovery-audit.json`;
7. adauga domeniul in `processed-domains.json`.

Motorul foloseste pauze intre request-uri, timeout si limita maxima `100`. Nu face crawling nelimitat.

## Memorie persistenta

Fisiere noi:

- `data/lead-research/processed-domains.json`
- `data/lead-research/discovery-audit.json`

`processed-domains.json` previne repetarea. Un domeniu procesat astazi este sarit maine.

`discovery-audit.json` pastreaza:

- sesiune;
- provider;
- query;
- domeniu;
- website;
- eveniment;
- motiv;
- URL-uri sursa;
- timestamp.

Directorul `data/lead-research/` contine date operationale locale si este ignorat de Git. Nu commitati lead-uri descoperite, log-uri de sesiune sau date publice colectate. Exemplele sintetice pentru documentatie si QA sunt pastrate separat in `data/lead-research-examples/`.

## Comenzi

Discovery implicit:

```powershell
npm run leads:auto
```

Discovery limitat:

```powershell
npm run leads:auto -- --category centre-radiologie-rx --city Bucuresti --limit 100
```

Dry run:

```powershell
npm run leads:auto -- --category centre-radiologie-rx --city Bucuresti --limit 20 --dry-run
```

Raport:

```powershell
npm run leads:report
```

Export workbook:

```powershell
npm run leads:export
```

## Reguli de operare

- Nu rula comenzi mutante in paralel.
- Nu elimina domenii procesate decat dupa review manual.
- Nu promova automat lead-uri la `Ready for Outreach`.
- Revizuieste sursa oficiala, relevanta si template-ul inainte de orice mesaj.
- Inregistreaza imediat opt-out-ul.
- Nu incarca date medicale ori date despre pacienti.

## Workbook

Export:

`outputs/phase-81a/ZESCORP-Verified-Lead-Research-Assistant.xlsx`

Phase 82A adauga foile:

- `Discovery Audit`
- `Processed Domains`

Workbook-ul ramane un instrument de review si operare manuala.

# ZESCORP Verified Lead Research Assistant

## Scop

Phase 81A adauga memorie persistenta pentru prospectarea B2B. Sistemul retine companiile deja gasite, sursele publice verificate, sesiunile de research, duplicatele, opt-out-urile si lead-urile respinse.

Este un asistent de research si organizare. Nu trimite emailuri, mesaje LinkedIn sau WhatsApp automat. Nu face scraping agresiv.

## Baza persistenta

Fisierele JSON din `data/lead-research/` sunt sursa de adevar:

- `verified-leads.json`
- `research-sessions.json`
- `do-not-contact.json`
- `rejected-leads.json`
- `source-log.json`

Importurile manuale auditate pot fi pastrate in `data/lead-research/imports/`.

Directorul `data/lead-research/` este operational, local si ignorat de Git. Nu commitati baza live. Pentru forma documentata a unui import folositi `data/lead-research-examples/import-candidates.example.json`, care contine exclusiv date sintetice `.invalid`.

## Model lead verificat

Fiecare lead include:

- identitate: `leadId`, `companyName`, `normalizedCompanyName`;
- clasificare: `category`, `subcategory`;
- localizare: `city`, `county`, `country`;
- canale publice: `website`, `contactPage`, `publicEmail`, `publicPhone`, `publicLinkedIn`;
- audit: `sourceUrls`, `sourceType`, `fieldSources`, `dateDiscovered`, `dateVerified`, `lastSeenAt`, `researchSessionId`;
- scoring: `relevanceScore`, `contactabilityScore`, `projectPotentialScore`, `partnershipPotentialScore`, `geographicFitScore`, `totalLeadScore`, `priority`;
- operare: `suggestedServiceAngle`, `outreachStatus`, `notes`.

`fieldSources` pastreaza URL-ul oficial pentru datele cheie. Nu completati un email, telefon, persoana sau locatie daca sursa publica nu sustine informatia.

## Dedupe persistent

Motorul cauta duplicate prin:

1. domeniul website-ului;
2. email public;
3. telefon public normalizat;
4. numele companiei normalizat;
5. potrivire fuzzy a numelui in acelasi oras.

Daca un duplicat este gasit:

- nu se adauga un rand nou;
- se completeaza recordul existent cu surse sau date mai bune;
- se actualizeaza `lastSeenAt`;
- se scrie un eveniment in `source-log.json`;
- sesiunea incrementeaza `duplicatesSkipped`.

## Research session memory

Fiecare sesiune retine:

- `sessionId`, data, query, categorie, oras/regiune;
- URL-urile verificate;
- lead-uri gasite si lead-uri noi;
- duplicate sarite;
- lead-uri respinse;
- notite.

Astfel, research-ul de maine nu reintroduce companiile gasite astazi.

## Comenzi

Pornire sesiune manuala:

```powershell
npm run leads:research -- --query "clinici radiologie Bucuresti"
npm run leads:research -- --category centre-radiologie-rx --city Bucuresti
```

Comanda creeaza sesiunea si un CSV cu query-uri pentru research manual. Nu acceseaza web-ul automat.

Import JSON dupa verificarea paginilor oficiale:

```powershell
npm run leads:import -- --file data/lead-research/imports/manual-2026-06-02.json
```

Deduplicare:

```powershell
npm run leads:dedupe
```

Coada zilnica:

```powershell
npm run leads:daily
```

Raport:

```powershell
npm run leads:report
```

Export Excel:

```powershell
npm run leads:export
```

Test determinist de memorie:

```powershell
npm run leads:test
```

## Flux zilnic recomandat

1. Ruleaza `npm run leads:research -- --category <categorie> --city <oras>`.
2. Foloseste CSV-ul generat in `outputs/phase-81a/` ca lista de query-uri manuale.
3. Deschide doar pagini publice oficiale si verifica relevanta companiei.
4. Creeaza un JSON de import cu URL sursa pentru fiecare camp important.
5. Ruleaza `npm run leads:import -- --file <fisier>`.
6. Ruleaza `npm run leads:dedupe`.
7. Ruleaza `npm run leads:daily`.
8. Revizuieste manual coada si personalizeaza fiecare mesaj relevant.
9. Ruleaza `npm run leads:export` pentru workbook-ul actualizat.

Ruleaza comenzile care modifica baza (`research`, `import`, `dedupe`, `dnc`, `status`) secvential, nu in paralel. Workflow-ul este local si auditabil, nu un serviciu multi-user.

## Categorii de research

Sistemul include:

1. clinici imagistica medicala;
2. centre radiologie RX;
3. centre CT/RMN;
4. clinici stomatologice CBCT/RX;
5. clinici veterinare cu radiologie;
6. distribuitori aparatura medicala;
7. service aparatura medicala;
8. firme radioprotectie / plumbare;
9. proiectare medicala;
10. HVAC/electric medical;
11. consultanti fonduri europene medicale;
12. spitale private;
13. centre ortopedie/chirurgie/recuperare;
14. laboratoare / IVD.

Workbook-ul exportat contine query-uri, criterii de includere/excludere, unghi de servicii si template-uri.

## Scoring

Scorul ordoneaza cercetarea si outreach-ul manual:

- `relevanceScore`;
- `contactabilityScore`;
- `projectPotentialScore`;
- `partnershipPotentialScore`;
- `geographicFitScore`;
- `totalLeadScore`.

Prioritati:

- `High`: scor total >= 80;
- `Medium`: scor total 55-79;
- `Low`: scor total < 55.

Un scor mare nu reprezinta permisiune de contact. Coada zilnica include numai lead-uri cu status `Ready for Outreach`, sursa publica si email sau telefon business public.

## Statusuri

- `Research Candidate`
- `Needs Manual Verification`
- `Verified Public Contact`
- `Ready for Outreach`
- `Contacted`
- `Follow-up Due`
- `Replied`
- `Qualified Lead`
- `Not Relevant`
- `Do Not Contact`

## Conformitate

- Nu trimite nimic automat.
- Nu importa date personale nepublice.
- Nu colecta date medicale sau date despre pacienti.
- Pastreaza URL-ul oficial si data verificarii.
- Marcheaza imediat `Do Not Contact` dupa opt-out.
- Maximum doua follow-up-uri relevante dupa primul mesaj manual.
- Nu promite autorizare CNCAN, conformitate finala sau rezultate garantate.

## Seed initial

Seed-ul Phase 81A importa exclusiv contacte business publice verificate manual din pagini oficiale. Placeholder-ele Phase 80A raman separate si nu sunt marcate ca lead-uri verificate.

## Phase 82A: discovery automat controlat

Pentru providerii configurabili, skip persistent pe domenii si auditul fiecarui candidat foloseste
[`docs/autonomous-lead-discovery-engine.md`](./autonomous-lead-discovery-engine.md).

## Phase 83A: outreach controlat

Pentru statusuri operationale, aprobare umana, drafturi personalizate si workbook-ul de trimitere manuala foloseste
[`docs/outreach-operating-system.md`](./outreach-operating-system.md).

## Phase 83B: calificare comerciala

Pentru ranking orientat spre contracte, separarea competitorilor/distribuitorilor si lista `Send First` foloseste:

```powershell
npm run qualification:test
npm run qualification:export
```

Motorul este read-only fata de baza persistenta. Ghid:
[`docs/commercial-qualification-engine.md`](./commercial-qualification-engine.md).

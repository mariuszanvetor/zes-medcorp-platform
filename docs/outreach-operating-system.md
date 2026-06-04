# ZESCORP Outreach Operating System

## Scop

Phase 83A transforma baza locala de lead-uri publice verificate intr-un flux controlat de outreach. Sistemul ordoneaza lead-uri, genereaza drafturi personalizate si exporta un workbook operational.

Nu trimite emailuri. Nu executa SMTP. Nu integreaza CRM. Fiecare mesaj necesita review si trimitere manuala din `office@zescorp.ro`.

## Model local

Fisier operational local:

`data/lead-research/outreach-state.json`

Directorul `data/lead-research/` este ignorat de Git. Nu commitati lead-uri, drafturi sau audit operational.

Statusuri:

- `not_reviewed`
- `approved_for_contact`
- `drafted`
- `sent_manual`
- `replied`
- `follow_up_due`
- `not_interested`
- `do_not_contact`
- `won`
- `lost`

Fiecare record retine separat `approvalStatus`. Un draft poate exista pentru review, dar intra in `Manual Send Queue` numai dupa aprobare umana explicita.

## Segmentare

Fiecare lead primeste:

- `prioritySegment`: `high_priority`, `medium_priority` sau `low_priority`;
- `category`;
- `city`;
- `serviceFit`;
- `likelyNeed`;
- `estimatedContractValue`;
- `nextBestAction`;
- `templateId`.

Valoarea contractuala este o banda interna orientativa, nu oferta si nu promisiune comerciala.

## Template-uri

Sistemul include template-uri pentru:

1. camera RX si clarificare preliminara CNCAN;
2. infrastructura CT/RMN;
3. plumbare si protectie RX;
4. RF shielding;
5. service si mentenanta;
6. CBCT/RX dentar;
7. amenajare medicala.

Personalizarea foloseste exclusiv date verificate: companie, oras, categorie, website si email business public. Nu inventeaza persoane de contact sau proiecte active.

## Comenzi

Revizuire lead-uri sortate:

```powershell
npm run outreach:review
```

Aprobare manuala explicita:

```powershell
npm run outreach:review -- --approve LEAD-ID-1,LEAD-ID-2
```

Generare maximum 20 drafturi:

```powershell
npm run outreach:draft -- --limit 20
```

Export workbook:

```powershell
npm run outreach:export
```

Follow-up-uri scadente:

```powershell
npm run outreach:followups
```

Actualizare status dupa trimitere manuala:

```powershell
npm run outreach:status -- --lead-id LEAD-ID --status sent_manual
```

Test determinist izolat:

```powershell
npm run outreach:test
```

## Workbook

Export:

`outputs/phase-83a/ZESCORP-Outreach-Operating-System.xlsx`

Foi:

- `Outreach Dashboard`
- `Approved Leads`
- `Drafted Emails`
- `Manual Send Queue`
- `Follow-up Queue`
- `Replied Leads`
- `Do Not Contact`
- `Won-Lost`
- `Templates`

## Reguli obligatorii

- Drafturile nu sunt emailuri trimise.
- Nu exista cod SMTP ori Gmail API.
- Aproba numai contacte business publice relevante.
- Verifica sursa oficiala inainte de trimitere.
- Trimite manual, individual si proportional.
- Marcheaza imediat opt-out-ul.
- Nu folosi date despre pacienti.
- Nu promite autorizare CNCAN, conformitate finala, pret sau rezultat garantat.

## Calificare comerciala read-only

Phase 83B adauga un pas separat de calificare inainte de contactul manual:

```powershell
npm run qualification:test
npm run qualification:export
```

Foloseste `outputs/phase-83b/ZESCORP-Qualified-Outreach.xlsx` pentru a selecta primele conturi de contactat. Workbook-ul separa prospectele de clienti directi de competitori, distribuitori, producatori, service providers, profile DNC si profile low-fit. Nu modifica baza verificata si nici `outreach-state.json`.

Foaia `Top 25 Opportunities` este lista recomandata `Send First`. Verifica sursa oficiala inainte de a folosi draftul editabil din `Personalized Outreach`.

Ghid complet: `docs/commercial-qualification-engine.md`.

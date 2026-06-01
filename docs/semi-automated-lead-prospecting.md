# ZESCORP Semi-Automated Lead Prospecting

## Scop

Acest sistem organizează prospectarea B2B pentru ZESCORP fără trimitere automată, scraping agresiv sau date inventate. Workbook-ul generează cozi zilnice de lucru, scoruri orientative, texte de pornire și reguli de conformitate.

Seed-ul inițial conține 100 de task-uri de research marcate clar. Nu conține firme, emailuri sau telefoane inventate.

## Fișiere

- `outputs/phase-80a/ZESCORP-Semi-Automated-Prospecting-Engine.xlsx`
- `outputs/phase-80a/lead-master-template.csv`
- `outputs/phase-80a/today-outreach.csv`
- `outputs/phase-80a/follow-up-queue.csv`
- `outputs/phase-80a/high-priority-partners.csv`

Generator:

```powershell
node scripts/prospecting-engine.mjs
node scripts/build-prospecting-workbook.mjs
```

Import opțional de contacte business publice verificate:

```powershell
node scripts/prospecting-engine.mjs --input=outputs/phase-80a/lead-master-template.csv --output=outputs/phase-80a/import-review
```

Înainte de import, completați sau înlocuiți numai rândurile pentru care există contacte business publice verificabile. Generatorul elimină duplicatele pe baza identității publice a firmei/contactului.

## Foi workbook

| Foaie | Rol |
| --- | --- |
| `Dashboard` | KPI operaționali și distribuția task-urilor de research |
| `Lead Master` | Sursa editabilă pentru firme, surse publice, status și opt-out |
| `Today Outreach` | Maximum 30 task-uri manuale și 20 task-uri LinkedIn research |
| `Follow-up Queue` | 10 slot-uri demonstrative, activate numai după primul contact manual |
| `High Priority Partners` | 5 direcții de research pentru parteneriate |
| `Templates` | Email, LinkedIn și follow-up-uri adaptabile |
| `Scoring Rules` | Scoruri pe categorii și semnale de verificare |
| `Search Queries` | Interogări pentru research manual |
| `Compliance Notes` | Reguli obligatorii de lucru |

## Model Lead Master

Coloanele obligatorii includ:

- companie, categorie și oraș;
- website, email business public, telefon business public și pagină de contact;
- URL-ul sursă și data ultimei verificări;
- scor, motivul priorității și unghiul de servicii;
- subiect, corp email, follow-up 1 și follow-up 2;
- status, ultima contactare, următoarea acțiune;
- opt-out / do-not-contact;
- URL LinkedIn public și owner intern.

Un rând devine `Ready for Manual Outreach = Yes` numai dacă:

1. are nume de companie;
2. are `Source URL`;
3. are cel puțin un canal business public;
4. are `Last Verified Date`;
5. este marcat `Verified public business contact`;
6. nu este marcat `Do not contact`.

## Categorii și unghiuri

| Categorie | Exemple de query | Unghi de outreach | Cadence |
| --- | --- | --- | --- |
| Clinici imagistică | `"centru imagistică" {city} contact` | infrastructură, extindere, radioprotecție, service | ziua 0, 5, 14 |
| Centre radiologie | `"centru radiologie" {city} contact` | camere RX, plumbare, modernizare | ziua 0, 4, 12 |
| Cabinete stomatologice CBCT/RX | `"CBCT" stomatologie {city} contact` | spațiu CBCT/RX și radioprotecție | ziua 0, 6, 15 |
| Clinici veterinare cu radiologie | `"radiologie veterinară" {city}` | RX veterinar și configurare spațiu | ziua 0, 7, 16 |
| Distribuitori aparatură medicală | `"distribuitor aparatură medicală" România contact` | parteneriat instalare și infrastructură | ziua 0, 5, 14 |
| Service aparatură medicală | `"service aparatură medicală" {city} contact` | intervenții, escaladări și acoperire regională | ziua 0, 6, 15 |
| Firme proiectare medicală | `"proiectare clinică medicală" România contact` | cerințe speciale și coordonare tehnică | ziua 0, 5, 14 |
| HVAC/electric medical | `"HVAC medical" România firmă` | instalații, UPS și coordonare cu echipamentele | ziua 0, 7, 16 |
| Consultanți fonduri europene medicale | `"fonduri europene" clinică medicală consultant` | brief tehnic și cereri de ofertă | ziua 0, 4, 11 |

Workbook-ul conține mai multe query-uri și template-uri pentru fiecare categorie.

## Rutina zilnică

1. Deschideți `Search Queries` și selectați un mix relevant de categorii.
2. Cercetați manual organizațiile. Nu folosiți scraping agresiv.
3. Completați `Lead Master` numai cu date business publice și păstrați URL-ul sursă.
4. Verificați relevanța serviciului și personalizați mesajul.
5. Trimiteți manual maximum mesajele relevante din coada zilnică.
6. Logați statusul, data contactării și următoarea acțiune.
7. Marcați imediat orice opt-out ca `Do not contact`.
8. Folosiți follow-up-ul limitat; opriți după cadence sau mai devreme dacă nu există interes.

Volumele sunt limite operaționale, nu obiective care justifică mesaje irelevante:

- maximum 30 task-uri de outreach manual;
- maximum 20 task-uri de LinkedIn research;
- maximum 10 follow-up-uri;
- maximum 5 parteneri prioritari.

## Phase 81A: memorie persistenta

Pentru research public verificat, deduplicare intre sesiuni si exportul workbook-ului imbogatit foloseste
[`docs/verified-lead-research-assistant.md`](./verified-lead-research-assistant.md).

Phase 80A ramane template-ul de prospectare. Phase 81A devine sursa persistenta pentru companii reale, surse publice si cozi manuale auditate.

## Scoring

Scorul ordonează munca, dar nu înlocuiește verificarea manuală:

- scor de bază pe categorie;
- bonus pentru website, email business public, telefon, pagină de contact și URL sursă;
- bonus pentru contact business public verificat;
- penalizare de blocare pentru `Do not contact`.

## Conformitate

- Nu există trimitere automată.
- Nu se folosesc date personale nepublice.
- Nu se introduc date medicale sau date despre pacienți.
- Identitatea expeditorului este inclusă în template-uri.
- Emailurile includ linie de opt-out.
- Cererile LinkedIn se personalizează și se trimit manual.
- Opt-out-ul oprește orice follow-up.
- Research-ul trebuie să rămână proporțional și relevant.

## Extindere sigură

Următorul pas rezonabil este importul controlat al unor contacte business publice verificate, urmat de rularea generatorului. Orice integrare viitoare cu un CRM trebuie să păstreze aceleași gate-uri: sursă publică, verificare, opt-out și trimitere manuală până la o revizuire juridică și operațională separată.

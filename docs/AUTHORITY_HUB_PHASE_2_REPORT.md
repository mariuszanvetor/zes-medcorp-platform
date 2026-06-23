# Authority Hub Phase 2 - raport implementare

Data: 2026-06-23

## Obiectiv

Authority Hub Phase 2 adauga 30 de articole expert pentru cresterea autoritatii organice ZESCORP pe teme comerciale si tehnice cu intentie B2B: radiologie, CT, RMN, PACS, UPS medical, radioprotectie, service aparatura medicala si infrastructura medicala.

Articolele sunt publicate in Knowledge Hub, folosesc structura existenta a platformei si includ FAQ, schema, linkuri interne, repere/citatii si CTA catre contact.

## Pagini create

1. `/knowledge-hub/radiologie-digitala-in-clinici-private-decizii-comerciale`
2. `/knowledge-hub/camera-rx-in-spatiu-existent-ce-verifici-inainte-de-oferta`
3. `/knowledge-hub/radiologie-si-pacs-cum-se-leaga-imaginile-de-raportare`
4. `/knowledge-hub/ct-pentru-centru-imagistica-ce-influenteaza-investitia`
5. `/knowledge-hub/camera-ct-cerinte-de-infrastructura-inainte-de-instalare`
6. `/knowledge-hub/service-ct-cum-reduci-riscul-de-downtime`
7. `/knowledge-hub/rmn-in-clinica-privata-ce-trebuie-planificat-inainte-de-achizitie`
8. `/knowledge-hub/rf-shielding-rmn-ce-intrebari-pui-inainte-de-oferta`
9. `/knowledge-hub/camera-rmn-si-accesul-magnetului-risc-comercial-major`
10. `/knowledge-hub/pacs-ris-in-retea-medicala-cum-planifici-scalarea`
11. `/knowledge-hub/arhivare-pacs-ce-costuri-apar-dupa-primul-an`
12. `/knowledge-hub/dicom-worklist-si-pacs-de-ce-conteaza-pentru-erori`
13. `/knowledge-hub/ups-medical-pentru-imagistica-ce-protejeaza-si-ce-nu`
14. `/knowledge-hub/ups-pentru-pacs-si-servere-medicale-cum-estimezi-autonomia`
15. `/knowledge-hub/radioprotectie-pentru-camera-rx-greseli-de-bugetare`
16. `/knowledge-hub/radioprotectie-ct-vs-rx-de-ce-nu-se-bugeteaza-la-fel`
17. `/knowledge-hub/plumbare-camera-rx-ce-date-trebuie-inainte-de-deviz`
18. `/knowledge-hub/service-aparatura-medicala-cum-prioritizezi-echipamentele-critice`
19. `/knowledge-hub/contract-mentenanta-aparatura-medicala-ce-trebuie-sa-includa`
20. `/knowledge-hub/audit-tehnic-aparatura-medicala-inainte-de-buget`
21. `/knowledge-hub/relocare-aparatura-medicala-riscuri-si-planificare`
22. `/knowledge-hub/infrastructura-medicala-pentru-clinici-cu-imagistica`
23. `/knowledge-hub/proiectare-clinica-medicala-cu-zone-tehnice-critice`
24. `/knowledge-hub/centru-imagistica-medicala-cum-alegi-primele-servicii`
25. `/knowledge-hub/imagistica-medicala-si-service-de-ce-contractul-se-planifica-devreme`
26. `/knowledge-hub/consultanta-imagistica-medicala-cand-merita-inainte-de-oferta`
27. `/knowledge-hub/mamografie-radioprotectie-si-flux-clinic-ce-trebuie-stabilit`
28. `/knowledge-hub/ecografie-in-clinica-cand-devine-service-ul-important`
29. `/knowledge-hub/laborator-ivd-infrastructura-si-service-pentru-continuitate`
30. `/knowledge-hub/camera-radiologie-si-pregatirea-documentelor-pentru-oferta`

## Clustere acoperite

- Radiologie si camere RX: planificare, documente, PACS, oferta si radioprotectie.
- CT: infrastructura, investitie si service.
- RMN: infrastructura, acces magnet si RF shielding.
- PACS/RIS: scalare, DICOM, worklist si costuri operationale.
- UPS medical: continuitate pentru imagistica, servere si PACS.
- Radioprotectie: bugetare, plumbare, CT vs RX si documente pentru oferta.
- Service aparatura medicala: prioritizare echipamente critice, mentenanta, audit si relocare.
- Infrastructura medicala: clinici cu imagistica, zone tehnice, laborator IVD si consultanta.

## Citatii si repere folosite

- IAEA - Radiation Protection of Patients: `https://www.iaea.org/resources/rpop`
- CNCAN - sistem autorizare surse de radiatii ionizante: `https://www.cncan.ro/surse-de-radiatii-ionizante/sistem-autorizare/autorizatia-de-utilizare-functionare-si-sau-pentru-practici/`
- CNCAN - norme de securitate radiologica: `https://www.cncan.ro/legislatie/norme/norme-de-securitate-radiologica/`
- DICOM Standard: `https://www.dicomstandard.org/`
- DICOM Current Edition: `https://www.dicomstandard.org/current`
- FDA - MRI magnetic resonance imaging: `https://www.fda.gov/radiation-emitting-products/medical-imaging/mri-magnetic-resonance-imaging`
- FDA - MR environment safety information: `https://www.fda.gov/regulatory-information/search-fda-guidance-documents/testing-and-labeling-medical-devices-safety-magnetic-resonance-mr-environment`
- IEC - UPS overview: `https://www.iec.ch/blog/what-ups`
- FDA - Remanufacturing and servicing medical devices: `https://www.fda.gov/medical-devices/quality-and-compliance-medical-devices/remanufacturing-and-servicing-medical-devices`
- European Commission - Medical Devices regulations: `https://health.ec.europa.eu/medical-devices-sector/new-regulations_en`

## Internal linking

Fiecare articol trimite contextual catre pagini comerciale si instrumente existente:

- `/service-aparatura-medicala`
- `/contracte-mentenanta`
- `/servicii/pacs-medical`
- `/servicii/arhivare-pacs`
- `/servicii/radioprotectie`
- `/servicii/placare-plumb-camera-rx`
- `/servicii/rf-shielding-rmn`
- `/produse/rmn`
- `/produse/computer-tomograf`
- `/produse/ups-medical`
- `/contact`

## SEO si schema

Articolele folosesc ruta existenta `/knowledge-hub/[slug]`, care genereaza:

- metadata title si description din modelul de articol;
- canonical pe URL-ul public;
- Article schema;
- Breadcrumb schema;
- FAQ schema;
- CTA catre contact;
- related tools si related articles.

Sitemap-ul include articolele automat prin lista globala `articles`.

## Validare locala

- `npm run content:check` - trecut.
- `npm run audit:seo` - trecut cu `0` erori si `0` warnings.
- `npm run build -- --webpack` - trecut.

Guard-ul de catalog produse ramane activ:

- produse publice: 658;
- produse indexabile: 500;
- limita maxima produse indexabile: 500;
- sitemap/SEO safety: pass.

## Recomandari dupa deploy

1. Verifica in Search Console indexarea primelor 10 articole cu teme diferite.
2. Monitorizeaza query-uri noi pentru PACS, radioprotectie, CT, RMN si service aparatura medicala.
3. Dupa 14-30 zile, adauga linkuri interne din paginile care primesc impresii catre money pages relevante.
4. Nu creste indexarea produselor pana cand Vercel Usage ramane stabil cel putin 7 zile.

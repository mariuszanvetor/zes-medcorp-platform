# Phase 01 Monitoring Plan

Context: Phase 01 este live in productie pe commit `02d5a919`.

Scop: masurarea impactului real in urmatoarele 7 zile si stabilirea momentului corect pentru Phase 02, fara a creste riscul Vercel sau a dilua calitatea SEO.

## KPI-uri De Urmarit

### Search Console

| KPI | Ce masoara | Frecventa |
| --- | --- | --- |
| Impresii totale | cresterea vizibilitatii organice | zilnic |
| Clickuri totale | trafic organic real | zilnic |
| CTR mediu | atractivitatea titlurilor/meta | zilnic |
| Pozitie medie pe money queries | progres pe intent comercial | saptamanal |
| Pagini cu pozitii 4-15 | oportunitati rapide de optimizare | saptamanal |
| Crawled currently not indexed | risc de calitate/crawl waste | zilnic |
| Discovered currently not indexed | risc de sitemap prea larg | zilnic |
| Sitemap last read | confirmare crawl sitemap | zilnic |
| Product URLs indexate | stabilitatea lotului de 500 produse | saptamanal |

### Vercel Usage

| KPI | Prag de atentie | Prag critic |
| --- | ---: | ---: |
| Fluid Active CPU | peste 20 min in prima ora dupa deploy sau peste 1h/zi | peste 2h/zi |
| Function Invocations | crestere >25% fata de ziua anterioara | crestere >50% fara explicatie |
| ISR Reads | crestere brusca pe produse/categorii | trend accelerat 2 zile consecutiv |
| ISR Writes | orice spike neobisnuit | crestere continua fara deploy |
| Image Optimization | trebuie sa ramana practic 0 | orice crestere relevanta |
| Requests catre API assets | crestere brusca pe images/documents | spike de bot sau loop |

### Leads

| KPI | Ce masoara |
| --- | --- |
| Total lead submissions | volum de cereri |
| Leads din service pages | impact direct Phase 01 |
| Leads din money pages | calitatea traficului comercial |
| WhatsApp clicks | intent rapid de contact |
| Contact page visits | intent comercial indirect |
| Lead form errors | frictiune formular |
| Rate-limit hits pe `/api/leads` | risc abuz sau formular prea expus |

### Organic Traffic

| KPI | Ce masoara |
| --- | --- |
| Organic sessions | cresterea traficului non-paid |
| Landing pages organice | pagini care castiga vizibilitate |
| Engagement pe service pages | calitatea vizitei |
| Scroll / CTA interaction in Clarity | claritate comerciala |
| Mobile traffic behavior | probleme UX pe mobil |

### Product Page Performance

| KPI | Ce masoara |
| --- | --- |
| Product impressions | vizibilitate catalog controlat |
| Product clicks | trafic long-tail |
| Product CTR | calitate title/meta |
| Product pages cu noindex accidental | risc SEO tehnic |
| Product image/API usage | risc Vercel |
| Product pages in sitemap | trebuie sa ramana 500 GIMA detail URLs |

### Service Page Performance

| KPI | Ce masoara |
| --- | --- |
| Impresii pe `/servicii/*` | crestere cluster service |
| Clickuri pe service pages | trafic comercial |
| CTA clicks | conversie soft |
| Lead submissions | conversie hard |
| Pozitii pe queries service | maturizarea SEO |
| Bounce/engagement in Clarity | claritate si relevanta |

## Verificari Zilnice

### Ziua 1-7

1. Vercel Usage:
   - Fluid Active CPU
   - Function Invocations
   - ISR Reads/Writes
   - Image Optimization
   - top paths daca exista spike
2. Search Console:
   - sitemap status
   - indexing reasons
   - pagini cu erori noi
   - crestere `Crawled currently not indexed`
3. Site sanity:
   - homepage
   - `/servicii/service-radiologie`
   - `/servicii/radioprotectie`
   - `/produse`
   - `/sitemap.xml`
4. Leads:
   - numar cereri noi
   - sursa paginii
   - erori de formular
5. Clarity:
   - rage clicks pe CTA/formular
   - scroll depth pe service pages
   - probleme mobile evidente

## Verificari Saptamanale

1. Export Search Console pe 7 zile si 3 luni:
   - queries
   - pages
   - devices
   - indexing
   - sitemap
2. Top 20 queries comerciale:
   - pozitie
   - impresii
   - CTR
   - pagina asociata
3. Top 20 money pages:
   - impresii
   - clickuri
   - CTR
   - leads/CTA clicks
4. Product catalog:
   - confirma 500 product URLs in sitemap
   - confirma lipsa cresterii Image Optimization
   - confirma lipsa spike-urilor pe asset proxy
5. Backlog:
   - listeaza 10 pagini cu potential rapid
   - listeaza 10 probleme de UX/conversie
   - listeaza orice risc Vercel

## Warning Thresholds

Nu se continua cu Phase 02 daca apare oricare dintre urmatoarele:

- Fluid Active CPU depaseste 2h/zi.
- Function Invocations cresc cu peste 50% fara crestere reala de trafic.
- Image Optimization creste relevant peste 0.
- Product URLs in sitemap depasesc 500 GIMA detail URLs.
- GSC arata crestere abrupta pe `Crawled currently not indexed`.
- 3+ pagini money importante primesc noindex/canonical gresit.
- Lead form are rata mare de erori sau rate-limit hits neobisnuite.
- Clarity arata probleme mobile majore pe formularele service.

## Success Thresholds

Phase 01 este considerata stabila daca dupa 7 zile:

- Vercel Usage ramane sub pragurile de alerta.
- Image Optimization ramane 0 sau fara crestere relevanta.
- Sitemap este citit fara erori.
- Product sitemap ramane la 500 GIMA detail URLs.
- Service pages nu au noindex si raman canonical corect.
- Exista cel putin o crestere masurabila in impresii pe money pages sau queries comerciale.
- Nu apar erori majore de indexare.
- Lead submissions sau CTA interactions cresc fata de baseline.

## Cand Pornim Phase 02

Porneste Phase 02 doar daca:

1. Vercel este stabil minimum 7 zile.
2. Nu exista spike-uri neexplicate pe CPU/API/ISR.
3. GSC nu raporteaza probleme noi de indexare.
4. Sitemap-ul este citit corect.
5. Money pages Phase 01 incep sa primeasca impresii sau clickuri.
6. Nu exista probleme mobile critice in Clarity.
7. Cel putin 3-5 pagini comerciale arata semnale clare:
   - impresii in crestere
   - CTR imbunatatibil
   - pozitii 4-20
   - interactiuni CTA/formular

## Cand NU Pornim Phase 02

Nu porni Phase 02 daca:

- Vercel este aproape de limitele Hobby.
- Google descopera prea multe pagini dar nu le indexeaza.
- Product catalog consuma disproportionat CPU/API.
- Service pages au trafic, dar nu convertesc si nu s-a verificat UX-ul.
- Exista semnale de bot crawling agresiv.
- Exista pagini cu continut slab care au fost accidental expuse/indexate.
- Nu exista baseline clar pentru leads si CTA.

## Estimari De Castig

Estimari prudente, presupunand ca site-ul ramane stabil si Google continua crawl-ul normal.

### Dupa 7 zile

- SEO:
  - crestere mica spre moderata in impresii pe paginile deja crawlate.
  - primele semnale pe service/money pages.
  - imbunatatire interna prin linkuri homepage + ghiduri.
- Lead-uri:
  - posibila crestere usoara a interactiunilor CTA/WhatsApp.
  - formularele service ar trebui sa reduca frictiunea.
- Vercel:
  - consum stabil daca bot traffic nu creste agresiv.

### Dupa 30 zile

- SEO:
  - crestere vizibila pe long-tail service, radioprotectie, PACS si produse.
  - apar pozitii 4-20 care pot fi optimizate in Phase 02.
  - mai multe pagini comerciale primesc impresii consistente.
- Lead-uri:
  - crestere probabila in cereri de service/consultanta.
  - WhatsApp si contact pot deveni canale principale pentru lead-uri rapide.
- Vercel:
  - daca usage ramane stabil, se poate testa o extindere foarte mica si controlata.

### Dupa 90 zile

- SEO:
  - clusterul service ar trebui sa produca trafic comercial recurent.
  - paginile PACS/radioprotection/RF pot castiga autoritate prin internal linking.
  - catalogul de 500 produse poate aduce long-tail controlat.
- Lead-uri:
  - crestere semnificativa asteptata din service/mentenanta si pagini comerciale.
  - date suficiente pentru prioritizarea urmatoarelor landing pages.
- Vercel:
  - daca nu exista spike-uri, se poate planifica Phase 02 cu extindere prudenta.

## Decizie Recomandata

In urmatoarele 7 zile nu se extinde indexarea produselor. Focusul este:

1. monitorizare Vercel;
2. monitorizare GSC;
3. verificare conversii;
4. identificarea paginilor cu pozitii 4-20;
5. pregatirea Phase 02 doar pe baza datelor.

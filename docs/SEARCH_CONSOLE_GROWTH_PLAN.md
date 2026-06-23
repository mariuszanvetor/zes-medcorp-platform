# Search Console Growth Plan

## Phase 01 Weekly Export Routine

Aceasta rutina se ruleaza manual saptamanal, inainte de orice extindere de sitemap sau indexare de produse.

### Exporturi obligatorii

1. Performance > Search results > ultimele 3 luni:
   - Queries
   - Pages
   - Countries
   - Devices
2. Indexing > Pages:
   - indexed
   - crawled currently not indexed
   - discovered currently not indexed
   - duplicate/canonical states
3. Sitemaps:
   - sitemap status
   - discovered URLs
   - last read date
4. Settings > Crawl stats:
   - total crawl requests
   - average response time
   - by response code
   - by file type
5. Core Web Vitals:
   - mobile URLs needing improvement
   - desktop URLs needing improvement

### Liste de decizie

Pastreaza un tabel operational cu:

| Segment | Regula | Actiune |
| --- | --- | --- |
| Quick wins | Pozitie 4-15, impresii in crestere | Imbunatatire title/meta, CTA si internal links |
| CTR slab | CTR sub 1% si impresii relevante | Rescriere titlu/meta cu intent comercial |
| Lead pages | Clickuri catre servicii/produse | Adauga CTA si formular scurt unde lipsesc |
| Crawled not indexed | Pagini comerciale cu valoare | Verifica thin content, canonical si linkuri interne |
| Product safety | Produse neindexate descoperite | Nu creste sitemapul fara QA si control Vercel |

### Praguri de oprire

Nu se mareste sitemapul de produse daca:

- Fluid Active CPU depaseste 2h/zi pe Vercel Hobby.
- Function Invocations cresc accelerat fata de saptamana anterioara.
- Product URLs in sitemap sunt deja la limita operationala de 500.
- GSC arata crestere mare de `Crawled - currently not indexed` pe produse.

### Output pentru urmatoarea faza

La finalul exportului saptamanal, noteaza:

- Top 20 queries comerciale cu impresii si pozitie medie.
- Top 20 pages cu impresii mari si CTR mic.
- Top 10 pagini care merita refresh de titlu/meta.
- Top 10 pagini care merita internal links noi.
- Top 10 pagini care pot genera lead-uri daca primesc CTA/form mai clar.
- Riscuri Vercel observate in aceeasi perioada.

Audit date: 2026-06-23T06:50:31.121Z

## Access Status

No Google Search Console export or API credential was available locally during this audit. This report defines the exact extraction and decision workflow to run after access is available.

## Data To Export

1. Performance > Search results > Queries: last 3 months, top 1000.
2. Performance > Pages: last 3 months, top 1000.
3. Indexing > Pages: all reasons.
4. Sitemaps: submitted and indexed counts.
5. Crawl stats: last 90 days.
6. Core Web Vitals: mobile and desktop affected URLs.

## Query Buckets To Watch

- Service: service aparatura medicala, service radiologie, service RMN, service CT, service ecograf.
- Infrastructure: radioprotectie, camera RX, camera CT, camera RMN, RF shielding, cusca Faraday.
- Products: aparatura medicala, ecograf, mamograf, monitor pacient, PACS RIS, UPS medical.
- Local: aparatura medicala Bucuresti, service aparatura medicala Bucuresti.

## Quick-Win Rules

- Position 4-15 + impressions > 100: improve title, intro, CTA and internal links.
- CTR < 1% + position < 12: rewrite title/meta for commercial intent.
- Crawled not indexed on money pages: inspect thin content, canonical, noindex and duplicate sections.
- Discovered not indexed on product pages: do not force indexation; improve product quality and reduce sitemap load.

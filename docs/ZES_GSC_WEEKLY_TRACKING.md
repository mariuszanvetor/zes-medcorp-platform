# ZES GSC Weekly Tracking

Scop: transformarea exporturilor Search Console in decizii comerciale controlate pentru ZES MEDCORP, fara crestere riscanta de crawl sau cost Vercel.

## Cand se ruleaza

O data pe saptamana, ideal luni dimineata, dupa verificarea Vercel Usage pentru ultimele 7 zile.

## Date de exportat

| Export | Interval | Ce se urmareste |
| --- | --- | --- |
| Queries | 3 luni | intent comercial, pozitii 4-15, CTR sub 1% |
| Pages | 3 luni | pagini cu impresii mari si clickuri putine |
| Indexing reasons | curent | crawled/discovered not indexed, duplicate canonical |
| Sitemaps | curent | numar URL-uri descoperite si last read |
| Crawl stats | 7 zile | request volume, response time, file types |
| Core Web Vitals | curent | probleme mobile pe money pages |

## Clasificare actiuni

| Prioritate | Regula | Actiune |
| --- | --- | --- |
| P0 | Vercel usage creste peste prag | opreste extinderile de sitemap si investigheaza bot/API |
| P1 | Money page pozitie 4-15 | optimizeaza title/meta, CTA, internal links |
| P1 | CTR sub 1% pe query comercial | rescrie snippetul si primul viewport |
| P2 | Pagina descoperita dar neindexata | verifica thin content, canonical, linkuri interne |
| P3 | Query informational fara lead intent | muta in backlog de continut, nu in sprint comercial |

## Template saptamanal

| Data | Top query | Pagina | Impresii | Clickuri | Pozitie | CTR | Actiune | Owner | Status |
| --- | --- | --- | ---: | ---: | ---: | ---: | --- | --- | --- |
| YYYY-MM-DD |  |  |  |  |  |  |  |  |  |

## Praguri Vercel de verificat inainte de actiuni SEO

- Fluid Active CPU: alerta la peste 2h/zi.
- Function Invocations: alerta la crestere brusca fata de media saptamanii anterioare.
- ISR Reads/Writes: alerta la crestere accelerata pe rute de produse.
- Image Optimization: trebuie sa ramana fara crestere relevanta, deoarece imaginile sunt neoptimizate de Next.

## Regula pentru catalog produse

Nu se depaseste limita operationala de 500 produse in sitemap pana cand:

- GSC confirma ca lotul curent este crawlat fara probleme majore.
- Vercel Usage ramane stabil 7 zile.
- Random QA pentru urmatorul lot trece fara probleme majore.
- Titlurile, descrierile si imaginile lotului urmator sunt verificate.

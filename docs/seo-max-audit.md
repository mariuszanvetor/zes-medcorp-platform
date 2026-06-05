# SEO-MAX-01 Audit

Date: 2026-06-05

## Scope

This phase audited and upgraded the public SEO architecture for ZESCORP across:

- public route inventory and sitemap wiring;
- commercial metadata and canonical coverage;
- admin/private route exclusion;
- schema coverage for commercial templates;
- internal linking to money pages;
- commercial topic coverage across medical infrastructure, medical equipment, service and maintenance;
- Search Console priority planning.

No lead database, outreach data, API keys, CRM, SMTP, auth or backend persistence was changed.

## Route Inventory

Automated checks now include:

- `npm run content:check`
- `npm run audit:seo`

Current results:

- SEO audit inventory: 198 public/source routes.
- Content checker inventory: 229 routes/articles across articles, comparison pages, calculators, glossary terms, revenue pages and public routes.
- Admin routes remain excluded from sitemap source.
- Admin routes remain explicitly `index: false` and `follow: false`.
- Sitemap source includes commercial landing pages, revenue landing pages and maintenance contract pages.

Generated audit artifact:

- `docs/seo-max-route-audit.json`

## Issues Found

1. Missing dedicated money pages for some high-intent commercial searches:
   - amenajare cabinet medical;
   - service ecografe;
   - service laborator / IVD.

2. Maintenance contract pages were newly added in Phase 84C and needed full sitemap/content-check coverage.

3. SEO audit tooling did not exist as a repeatable command.

4. Some money-page crawl paths were too implicit for a simple static audit because links were rendered from data arrays.

5. Search Console priority data did not yet include the new recurring maintenance and newly added commercial pages.

## Fixes Implemented

### New SEO Audit Command

Added:

```bash
npm run audit:seo
```

The script checks:

- public/source route inventory;
- admin noindex/nofollow;
- admin sitemap exclusion;
- Organization and LocalBusiness schema presence;
- commercial template schema coverage;
- image `alt` attributes for `next/image`;
- commercial metadata title/description length ranges;
- money-page internal linking;
- revenue category coverage.

The audit writes:

```text
docs/seo-max-route-audit.json
```

### Pages Added

Added three commercially justified landing pages:

- `/amenajare-cabinet-medical`
- `/service-ecografe`
- `/service-laborator-ivd`

Each uses the shared commercial landing architecture with:

- metadata title and description;
- canonical metadata through `createWebsiteMetadata`;
- Service schema;
- FAQ schema;
- Breadcrumb schema;
- internal links;
- ZES CTA and contact/lead path;
- compliance/safety wording where service is involved.

### Maintenance SEO Coverage

The Phase 84C maintenance engine is now integrated into SEO checks:

- `/contracte-mentenanta`
- `/contracte-mentenanta/mentenanta-imagistica-medicala`
- `/contracte-mentenanta/mentenanta-radiologie-digitala`
- `/contracte-mentenanta/mentenanta-ecografe`
- `/contracte-mentenanta/mentenanta-laborator-ivd`
- `/contracte-mentenanta/contracte-service-multimarca`
- `/contracte-mentenanta/interventii-suport-tehnic`

### Internal Linking

Footer service links were expanded to provide stable crawl paths to high-value commercial pages:

- amenajare centre imagistica;
- amenajare cabinet medical;
- radioprotectie RX;
- service aparatura medicala;
- service ecografe;
- service laborator IVD;
- contracte mentenanta.

Existing contextual links in commercial and maintenance templates continue to connect parent hubs, sibling services, contact, project intake and related resources.

### Search Console Priorities

Updated `src/data/seo-indexing-priorities.ts` to include:

- `/amenajare-cabinet-medical`
- `/service-ecografe`
- `/service-laborator-ivd`
- `/contracte-mentenanta`

These are marked high/critical depending on revenue intent.

## Commercial Coverage

### Medical Infrastructure

Covered:

- amenajare clinica medicala;
- amenajare cabinet medical;
- amenajare centru imagistica;
- amenajare camera CT;
- amenajare camera RMN;
- radioprotectie medicala;
- placare/plumbare radiologie;
- RF shielding RMN;
- cusca Faraday RMN.

Primary routes:

- `/amenajare-cabinet-medical`
- `/amenajare-centre-imagistica`
- `/solutii-medicale/camere-ct`
- `/solutii-medicale/camere-rmn`
- `/radioprotectie-plumbare-rx`
- `/plumbare-radiologica`
- `/solutii-medicale/rf-shielding-rmn`

### Medical Equipment

Covered:

- aparatura medicala;
- aparatura imagistica medicala;
- echipamente radiologie;
- echipamente laborator IVD;
- ecografe;
- mamografie;
- C-Arm;
- PACS / RIS.

Primary routes:

- `/solutii-medicale/echipamente-imagistica-diagnostic`
- `/solutii-medicale/ecografe-sisteme-ultrasunete`
- `/solutii-medicale/sisteme-mamografie`
- `/solutii-medicale/sisteme-c-arm`
- `/solutii-medicale/echipamente-laborator-ivd`
- `/solutii-medicale/solutii-pacs-ris`

### Service & Maintenance

Covered:

- service aparatura medicala;
- service radiologie;
- service ecografe;
- service laborator IVD;
- contracte mentenanta aparatura medicala;
- mentenanta preventiva aparatura medicala;
- relocare aparatura medicala;
- instalare aparatura medicala.

Primary routes:

- `/service-aparatura-medicala`
- `/service-radiologie-romania`
- `/service-ecografe`
- `/service-laborator-ivd`
- `/contracte-mentenanta`
- `/solutii-medicale/relocare-echipamente-medicale`
- `/solutii-medicale/instalare-punere-in-functiune`

## Schema Status

Global:

- Organization schema present in root layout.
- LocalBusiness schema present in root layout.
- ContactPoint included through Organization schema.
- WebSite schema present in root layout.

Commercial templates:

- BreadcrumbList schema.
- Service schema.
- FAQPage schema.

Article/content architecture:

- Existing article, glossary and structured data components remain in place.

## Sitemap And Canonical Status

Sitemap:

- Static hubs remain present.
- Commercial pages are generated from `commercialLandingPages`.
- Revenue solution pages are generated from `revenueLandingPages`.
- Maintenance pages are generated from `maintenanceContractPages`.
- Admin routes are not present in sitemap source.

Canonical:

- Shared metadata helper uses `https://www.zescorp.ro` from brand/site config.
- New pages use `createWebsiteMetadata` with explicit `path`.

## Quality And Safety Notes

Content added in this phase avoids:

- fake certifications;
- fake clients;
- fake guarantees;
- final CNCAN/legal claims;
- unsafe equipment repair instructions;
- spam or city-page doorway patterns.

Service pages use preliminary triage language and push toward qualified evaluation rather than unsafe self-repair.

## Remaining Recommendations

1. After deploy, inspect the new URLs in Search Console:
   - `/amenajare-cabinet-medical`
   - `/service-ecografe`
   - `/service-laborator-ivd`
   - `/contracte-mentenanta`

2. Review Clarity recordings for:
   - footer usage;
   - ZES CTA clicks on new commercial pages;
   - maintenance calculator engagement;
   - contact form drop-off.

3. Consider future location pages only after evidence from Search Console or paid search query data. Do not create broad city pages without demand proof.

4. Add real project photos and anonymized project examples when available. Do not invent portfolio proof.

5. Continue refining Romanian copy after real customer conversations reveal the highest-converting vocabulary.

## Validation

Commands run during this phase:

```bash
npm run audit:seo
npm run content:check
```

Latest status before final build:

- `npm run audit:seo`: passed, 0 errors, 0 warnings.
- `npm run content:check`: passed.
- Global structured data now includes Organization, LocalBusiness and WebSite.

Final build validation is part of the phase closeout.

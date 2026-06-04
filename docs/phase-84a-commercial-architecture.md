# Phase 84A: Commercial Architecture Expansion

Phase 84A positions ZESCORP as a complete medical infrastructure, medical equipment and technical-services company.

The public commercial architecture is organized under:

```text
/solutii-medicale
```

## Pillar 1: Medical Infrastructure

- `/solutii-medicale/camere-ct`
- `/solutii-medicale/camere-rmn`
- `/solutii-medicale/rf-shielding-rmn`
- `/solutii-medicale/radioprotectie-imagistica`
- `/solutii-medicale/dezvoltare-unitati-medicale`

## Pillar 2: Medical Equipment

- `/solutii-medicale/echipamente-imagistica-diagnostic`
- `/solutii-medicale/ecografe-sisteme-ultrasunete`
- `/solutii-medicale/sisteme-mamografie`
- `/solutii-medicale/sisteme-c-arm`
- `/solutii-medicale/echipamente-laborator-ivd`
- `/solutii-medicale/solutii-pacs-ris`

## Pillar 3: Service & Maintenance

- `/solutii-medicale/service-echipamente-medicale`
- `/solutii-medicale/contracte-mentenanta-preventiva`
- `/solutii-medicale/relocare-echipamente-medicale`
- `/solutii-medicale/instalare-punere-in-functiune`
- `/solutii-medicale/suport-tehnic-echipamente`
- `/solutii-medicale/service-multi-vendor`

## Conversion architecture

Every revenue landing page includes:

- commercial-intent metadata and canonical URL;
- Breadcrumb, FAQ and Service schema;
- specific audience, scope, required-information and workflow sections;
- a concise technical/compliance note;
- a dedicated lead form using the existing `/api/leads` flow;
- ZES-seeded CTA;
- direct phone, email and WhatsApp actions;
- related internal links.

No new AI functionality, calculators or backend integration were added.

## Crawl and navigation

- The hub and all revenue pages are included in `src/app/sitemap.ts`.
- The homepage exposes the three pillars before the specialized radiology-entry section.
- The main header links to `/solutii-medicale`.
- The footer surfaces the hub and selected high-value routes.
- `npm run content:check` verifies all required Phase 84A routes and sitemap wiring.

## QA checklist

```powershell
npm run build -- --webpack
npm run content:check
```

Representative smoke routes:

```text
/
/solutii-medicale
/solutii-medicale/camere-ct
/solutii-medicale/echipamente-imagistica-diagnostic
/solutii-medicale/contracte-mentenanta-preventiva
/sitemap.xml
```

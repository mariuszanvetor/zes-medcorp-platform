# Deployment Readiness

This document is the staging/live demo checklist for SITE ZESCORP. It focuses on safe public demo readiness, not activation of new integrations.

## Current readiness status

- Next.js App Router build is the deployment authority.
- Public routes are statically generated where possible.
- `/api/leads` is server-side and mock-safe by default.
- Admin routes are dynamic, internal, noindex/nofollow and excluded from sitemap.
- Sitemap is generated from public route/data sources only.
- Robots points crawlers to `/sitemap.xml`.
- AI Discovery, Proposal Builder, Project Intake and mock document intelligence remain preliminary.
- ZES homepage conversation can run in `real`, `fallback` or `mock` mode depending on server-side AI configuration.

## Public vs admin routes

Public demo routes:

- `/`
- `/ai-discovery`
- `/proposal-builder`
- `/project-intake`
- `/planificare`
- `/calculatoare`
- `/comparatii`
- `/glosar`
- `/knowledge-hub`
- `/servicii`
- `/contact`

Internal routes:

- `/admin/leads`
- `/admin/lead-flow`
- `/admin/seo-launch`
- `/admin/content-ops`

Admin requirements:

- keep `robots.index=false` and `robots.follow=false`;
- keep admin routes out of sitemap;
- keep public header/footer free of admin links;
- keep visible labels: internal demo, mock data, no CRM/no DB;
- enable `ADMIN_ACCESS_ENABLED=true` and set `ADMIN_ACCESS_PASSWORD` before any real operational use.

## Required environment variables for safe demo

Safe default:

```env
ZES_AI_ENABLED=false
ZES_AI_MODEL=gpt-5.4
ZES_AI_REQUEST_TIMEOUT_MS=12000
LEAD_INTEGRATION_MODE=mock
EMAIL_PROVIDER=mock
LEAD_STORAGE_PROVIDER=mock
LEAD_CONFIRMATION_EMAIL_ENABLED=false
HIGH_PRIORITY_ALERT_EMAIL_ENABLED=false
ADMIN_ACCESS_ENABLED=false
```

Optional server-side AI activation:

```env
ZES_AI_ENABLED=true
ZES_AI_MODEL=gpt-5.4
OPENAI_API_KEY=
```

`OPENAI_API_KEY` must remain server-side only and must never be prefixed with `NEXT_PUBLIC_`.

Recommended staging/live demo admin gate:

```env
ADMIN_ACCESS_ENABLED=true
ADMIN_ACCESS_PASSWORD=<strong password in Vercel only>
ADMIN_ACCESS_TTL_SECONDS=28800
```

Optional analytics:

```env
NEXT_PUBLIC_GA_ID=
NEXT_PUBLIC_GTM_ID=
```

Real email can be activated later only with:

```env
LEAD_INTEGRATION_MODE=email-only
EMAIL_PROVIDER=resend
EMAIL_FROM=
LEAD_NOTIFICATION_EMAIL=office@zescorp.ro
RESEND_API_KEY=
RESEND_VERIFIED_DOMAIN=
RESEND_DOMAIN_VERIFIED=true
```

Google Sheets can be activated later only with:

```env
LEAD_INTEGRATION_MODE=email-and-sheets
GOOGLE_SHEETS_SPREADSHEET_ID=
GOOGLE_SHEETS_CLIENT_EMAIL=
GOOGLE_SHEETS_PROJECT_ID=
GOOGLE_SHEETS_PRIVATE_KEY=
GOOGLE_SHEETS_TAB_NAME=Leads
```

Do not prefix secrets with `NEXT_PUBLIC_`.

## Mock vs real integration modes

- `ZES AI mock`: `ZES_AI_ENABLED=false` or missing key. Homepage ZES uses the deterministic engine directly.
- `ZES AI fallback`: AI is requested but the provider response fails validation or times out. ZES falls back automatically to deterministic guidance.
- `ZES AI real`: server-side AI returns validated structured JSON and the UI labels the runtime accordingly.
- `ZES file analysis`: upload analysis runs in the same runtime strategy (`real`, `fallback`, `mock`) and never exposes API keys client-side.
- `mock`: lead submission returns safe mock modes and does not call external providers.
- `email-only`: internal notification email may send if `EMAIL_PROVIDER=resend` is correctly configured.
- `sheets-only`: Sheets may be attempted if Sheets env vars are configured.
- `email-and-sheets`: email and Sheets may both run when their env vars are valid.
- `crm`: reserved for future integration and should not be used now.

For SITE ZESCORP staging/live demo, keep integrations mock unless a controlled real email/Sheets test is intentionally planned.

## Pre-deploy checklist

1. Run `npm run content:check`.
2. Run `npm run build -- --webpack`.
3. Confirm `.env.example` contains placeholders only.
4. Confirm no real API keys or private keys are committed.
5. Confirm `LEAD_INTEGRATION_MODE=mock` unless intentionally testing real integrations.
6. Confirm admin password env is set if admin pages are used outside a private preview.
7. Confirm `https://www.zescorp.ro` remains the canonical base URL.
8. Confirm homepage CTAs point to AI Discovery, Proposal Builder and Project Intake.
9. Confirm public copy does not imply compliance guarantees or final engineering approval.
10. If `ZES_AI_ENABLED=true`, confirm `OPENAI_API_KEY` exists only in server-side environment configuration.
11. Confirm privacy text near ZES input is visible.
12. Confirm legal pages remain accessible.

## Post-deploy smoke checklist

Open:

- `/`
- `/ai-discovery`
- `/proposal-builder`
- `/project-intake`
- `/api/zes-guide` through homepage ZES interaction or route test
- `/admin/lead-flow`
- `/admin/leads`
- `/sitemap.xml`
- `/robots.txt`

Verify:

- public routes return 200;
- admin routes return 200 only behind intended admin gate/demo mode;
- admin pages include noindex/nofollow;
- sitemap excludes `/admin/*`;
- AI Discovery, Proposal Builder and Project Intake submit successfully in mock mode;
- ZES chat works in `mock` mode when AI is disabled or keyless;
- if AI is enabled, ZES surfaces `real` or `fallback` runtime without breaking the conversation;
- file analysis endpoint `/api/zes-guide/file-analysis` accepts supported files and returns safe preliminary output;
- lead response shows `integrationMode=mock`, `emailMode=mock`, `sheetsMode=mock`, `storageMode=mock`;
- no false error state appears after a successful mock response.

## Rollback notes

If real email causes issues:

```env
EMAIL_PROVIDER=mock
LEAD_INTEGRATION_MODE=mock
```

If Sheets causes issues:

```env
LEAD_INTEGRATION_MODE=email-only
```

If admin exposure is a concern:

```env
ADMIN_ACCESS_ENABLED=true
ADMIN_ACCESS_PASSWORD=<new strong password>
```

Redeploy after environment changes and run one controlled internal test from `/admin/lead-flow`.

## Known staging/demo limitations

- AI Discovery remains deterministic in current architecture.
- ZES can use real AI only when explicitly enabled server-side; otherwise it remains deterministic.
- ZES upload analysis is preliminary and should not be treated as final technical validation.
- DOCX/XLSX are accepted for manual-review guidance in this phase (no full parsing pipeline).
- Admin lead workflow is client-side session state only.
- No CRM, database or persistent lead dashboard is active.
- PDF export is browser-side and preliminary.
- All calculators and proposals are planning aids, not final engineering, regulatory or commercial approvals.

## Phase 77A homepage and assistant launch notes

- Homepage is trust-first and company-first: infrastructure expertise is shown before AI interaction depth.
- Floating ZES assistant is enabled as lightweight concierge with popup state persisted client-side.
- Auto-popup behavior is intentionally conservative (delay/scroll trigger) to avoid blocking core content.
- Sticky conversion bar is disabled on homepage to keep CTA hierarchy clear.
- No new backend dependencies were introduced for floating behavior.

## Phase 77B landing and popup notes

- New focused landing routes:
  - `/service-aparatura-medicala`
  - `/radioprotectie-plumbare-rx`
- Landing CTAs can open ZES popup directly and seed conversation intent.
- Popup composer is pinned at the bottom for better mobile and desktop usability.
- Conversation viewport auto-scrolls to newest responses and lead-state updates.

## Phase 78A trust and portfolio rollout notes

- Homepage includes trust-first sections for operational credibility and real-world project context.
- Added anonymized portfolio showcase focused on:
  - radioprotectie,
  - CT/RMN infrastructure,
  - service and modernization flows.
- Contact trust layer now emphasizes direct phone/email/WhatsApp actions.
- ZES remains integrated as guided assistant, but public hierarchy prioritizes company competence and implementation readiness.

## Phase 79A commercial landing rollout

- Added five focused lead-generation routes:
  - `/amenajare-centre-imagistica`
  - `/proiectare-radiologie`
  - `/autorizare-cncan-camera-rx`
  - `/service-radiologie-romania`
  - `/plumbare-radiologica`
- Each route uses the shared commercial landing renderer, FAQ/Service/Breadcrumb schema and canonical metadata.
- Each route provides a seeded ZES CTA plus direct phone, email and WhatsApp actions from centralized brand config.
- Commercial CTA hooks expose stable `data-cta` and `data-page-intent` attributes for Clarity review and future analytics refinement.
- Sitemap and internal linking include the commercial cluster. Admin routes remain excluded.
- Legacy commercial WordPress paths redirect permanently only where no useful local route exists.

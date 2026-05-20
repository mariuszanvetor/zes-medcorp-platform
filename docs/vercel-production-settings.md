# Vercel Production Settings

Recommended deployment target: Vercel.

This project is compatible with Vercel because it uses:

- Next.js App Router.
- Static and SSG pages.
- Metadata routes for sitemap, robots, manifest, icons.
- A server API route at `/api/leads`.

## Import Settings

Use these settings unless Vercel auto-detects them correctly:

| Setting | Value |
| --- | --- |
| Framework preset | Next.js |
| Install command | `npm install` |
| Build command | `npm run build` |
| Output directory | leave default |
| Development command | `npm run dev` |
| Node.js version | Vercel default compatible with Next.js 16, or Node 20+ |

## Environment Variables

Safe to leave empty initially:

```txt
NEXT_PUBLIC_GTM_ID=
NEXT_PUBLIC_GA_ID=
CRM_PROVIDER=
CRM_API_KEY=
CRM_WEBHOOK_URL=
EMAIL_PROVIDER=
EMAIL_API_KEY=
LEAD_NOTIFICATION_EMAIL=
```

Initial launch recommendation:

- Leave analytics IDs empty until GA4/GTM properties are confirmed.
- Leave CRM/email variables empty because integrations are mocked.
- Do not add secrets until the CRM/email implementation is activated and reviewed.

## Runtime Notes

- `/api/leads` currently validates, scores, and returns a mocked response.
- No database is required for the current launch.
- No email provider is required for the current launch.
- No CRM provider is required for the current launch.
- The site should still work safely if all environment variables are empty.

## Production Domains

Add:

- `www.zescorp.ro` as primary.
- `zescorp.ro` as redirect/apex domain.

See `docs/domain-configuration.md` for DNS details.

## Pre-Production Preview Checks

Before promoting to production:

- Build passes in Vercel.
- Preview deployment loads homepage, services, Knowledge Hub article, calculator, and contact.
- `/api/leads` returns a mocked success response for valid form submissions.
- `/admin/leads` has `noindex`.
- No secrets appear in build logs.
- No environment variables contain real values unless intentionally configured.

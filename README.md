# ZES MEDCORP Platform

Next.js App Router platform for ZES MEDCORP, focused on medical infrastructure, medical technology, imaging, IVD/laboratory equipment, shielding, service, Knowledge Hub content, calculators, and lead-generation tools.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- React
- ESLint

## Local Development

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open:

```txt
http://localhost:3000
```

If local Turbopack dev mode causes environment-specific issues, try:

```bash
npm run dev -- --webpack
```

## Build And Start

Production build:

```bash
npm run build
```

Run the production server locally:

```bash
npm run start
```

## Important Routes

- `/` - homepage
- `/services` - services overview
- `/knowledge-hub` - technical content hub
- `/ai-project-advisor` - project advisor tool
- `/calculator-proiect-medical` - medical project calculator
- `/radiology-room-planner` - radiology planning tool
- `/service-diagnostic` - service diagnostic tool
- `/proposal-builder` - preliminary proposal builder
- `/contact` - consultation/contact flow
- `/admin/leads` - internal demo prototype, noindex
- `/api/leads` - mocked lead endpoint, no real CRM/email/database integration

## Documentation

- [Route inventory](./docs/route-inventory.md)
- [Environment variables](./docs/environment-variables.md)
- [Deployment guide](./docs/deployment-guide.md)
- [Domain configuration](./docs/domain-configuration.md)
- [Vercel production settings](./docs/vercel-production-settings.md)
- [Search Console setup](./docs/search-console-setup.md)
- [Analytics activation](./docs/analytics-activation.md)
- [Final launch checklist](./docs/final-launch-checklist.md)
- [Post-launch checklist](./docs/post-launch-checklist.md)
- [Brand asset replacement plan](./docs/brand-assets.md)
- [Lead integration plan](./docs/lead-integration-plan.md)

## Environment Variables

Use `.env.example` as the placeholder reference. Do not commit real secrets.

Current optional placeholders:

- `NEXT_PUBLIC_GTM_ID`
- `NEXT_PUBLIC_GA_ID`
- `CRM_PROVIDER`
- `CRM_API_KEY`
- `CRM_WEBHOOK_URL`
- `EMAIL_PROVIDER`
- `EMAIL_API_KEY`
- `LEAD_NOTIFICATION_EMAIL`

## Deployment

Vercel is the recommended hosting option for this Next.js project.

Node hosting is also possible if the host supports `npm run build`, `npm run start`, API routes, HTTPS, and reverse proxying.

Static export is not the default recommendation because the project includes `/api/leads`.

See [docs/deployment-guide.md](./docs/deployment-guide.md) before deploying.

## Production Safety

- No real CRM is connected.
- No production email is sent.
- No database lead storage is active.
- `/admin/leads` is noindex and excluded from the sitemap.
- Analytics variables are optional and should not include personal data in event payloads.

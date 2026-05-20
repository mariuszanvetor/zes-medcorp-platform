# Deployment Guide

This project uses Next.js App Router with static pages, dynamic SSG article routes, `sitemap.xml`, `robots.txt`, a web manifest, app icons, Open Graph images, and one mocked API route at `/api/leads`.

Do not deploy from this document automatically. Use it as the pre-deployment checklist.

## Hosting Compatibility

Hosting must support:

- Next.js App Router.
- Node.js runtime for `next start` or a managed Next.js platform.
- API routes, because `/api/leads` exists.
- Static assets from `public/`.
- Generated metadata routes: `/sitemap.xml`, `/robots.txt`, `/manifest.webmanifest`.

Recommended runtime:

- Managed Next.js hosting, preferably Vercel.
- Node.js hosting is acceptable if it supports long-running Node processes and reverse proxying.
- Pure static hosting is not recommended while `/api/leads` exists.

## Option A: Vercel Recommended

Vercel is the simplest deployment path for a Next.js App Router application.

Steps:

1. Connect the GitHub repository to Vercel.
2. Import the project.
3. Keep the default Next.js build settings unless the hosting UI suggests otherwise.
4. Add environment variables only when needed:
   - `NEXT_PUBLIC_GTM_ID`
   - `NEXT_PUBLIC_GA_ID`
   - CRM/email variables later, after real integration is approved.
5. Deploy to a preview environment.
6. Connect the production domain:
   - `zescorp.ro`
   - `www.zescorp.ro`
7. Verify canonical URLs use `https://www.zescorp.ro`.
8. Verify:
   - `https://www.zescorp.ro/sitemap.xml`
   - `https://www.zescorp.ro/robots.txt`
   - `https://www.zescorp.ro/manifest.webmanifest`
9. Confirm `/admin/leads` remains noindex and is not linked from public navigation.
10. Submit the sitemap in Google Search Console after production DNS is stable.

## Option B: Node Hosting

Use this only on infrastructure that supports Node.js services.

Commands:

```bash
npm install
npm run build
npm run start
```

Operational notes:

- Use a process manager such as PM2 or the hosting provider's process supervisor.
- Put the app behind HTTPS.
- Use a reverse proxy such as Nginx, Caddy, or the provider's proxy layer.
- Forward `Host`, `X-Forwarded-Proto`, and client IP headers correctly.
- Configure environment variables in the host, not in committed files.
- Monitor memory, CPU, logs, and response status codes.

## Option C: Static Export

Static export is not the default recommendation.

Limitations:

- The project includes `/api/leads`, which requires a server/runtime.
- Future CRM/email integrations will also require server execution.
- A static export would need the API route removed or replaced with an external endpoint.

Only consider static hosting if the lead API is intentionally removed or moved to another service.

## Final QA Commands

Use these before any deployment:

```bash
npm run build
npm run start
```

For local development:

```bash
npm run dev
```

If local Turbopack dev mode causes environment-specific issues, try:

```bash
npm run dev -- --webpack
```

Keep `npm run build` as the final authority before shipping.

## Pre-Deployment Checks

- Build passes.
- No real secrets are committed.
- `.env.example` contains placeholders only.
- `/admin/leads` is noindex and excluded from sitemap.
- `/api/leads` remains mocked until CRM/email integration is approved.
- `robots.txt` allows indexing and points to the sitemap.
- `sitemap.xml` includes all intended public indexed content routes.
- Brand assets resolve.
- Open Graph images resolve.
- Forms submit to the mocked API without sending external email or CRM requests.

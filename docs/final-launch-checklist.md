# Final Launch Checklist

Use this checklist for the first real production launch. Do not enable live CRM/email until those integrations are implemented and approved.

## Before Deploy

- `npm run build` passes locally.
- No real secrets are committed.
- `.env.example` contains placeholders only.
- `/admin/leads` is noindex.
- `/admin/leads` is not in `sitemap.xml`.
- `/api/leads` is not in `sitemap.xml`.
- `/api/leads` is still mocked and safe.
- Brand assets resolve.
- Open Graph assets resolve.
- No fake client names, fake logos, or fake testimonials were added.

## Deploy

- Connect the repository to Vercel.
- Import as a Next.js project.
- Keep build command: `npm run build`.
- Keep install command: `npm install`.
- Add env vars only when real values are ready.
- Deploy to preview first.
- Promote to production after QA.

## DNS And SSL

- Add `www.zescorp.ro` to the hosting project.
- Add `zescorp.ro` to the hosting project.
- Set `www.zescorp.ro` as canonical/primary.
- Configure DNS:
  - `www` CNAME to Vercel target.
  - apex/root A record to Vercel target.
- Verify HTTPS for both `www` and apex/root.
- Verify apex redirects to `https://www.zescorp.ro`.

## Production URL QA

Open:

- `https://www.zescorp.ro/`
- `https://www.zescorp.ro/services`
- `https://www.zescorp.ro/contact`
- `https://www.zescorp.ro/knowledge-hub`
- `https://www.zescorp.ro/calculator-proiect-medical`
- `https://www.zescorp.ro/radiology-room-planner`
- `https://www.zescorp.ro/proposal-builder`
- `https://www.zescorp.ro/ghiduri/cost-camera-rmn`
- `https://www.zescorp.ro/calculatoare/cost-camera-rmn`

Check:

- No console errors.
- No horizontal overflow on mobile.
- Header and footer render correctly.
- Sticky CTA does not block form controls.
- Forms validate required fields.
- Tool results render correctly.

## Sitemap And Robots

- Open `https://www.zescorp.ro/sitemap.xml`.
- Open `https://www.zescorp.ro/robots.txt`.
- Confirm sitemap points use `https://www.zescorp.ro`.
- Confirm robots references the sitemap.
- Confirm admin and API routes are absent from sitemap.

## Metadata And Social

Check representative pages:

- Homepage uses `/og/home.png`.
- Services use `/og/services.png`.
- Knowledge Hub/articles/guides use `/og/knowledge.png`.
- Tools/calculators use `/og/tools.png`.
- Canonicals use `https://www.zescorp.ro`.
- Public pages do not have `noindex`.
- `/admin/leads` does have `noindex`.

Social preview tools:

- LinkedIn Post Inspector.
- Facebook Sharing Debugger.
- X/Twitter Card Validator or live card preview where available.

## Search Console

- Add Search Console property.
- Verify domain ownership.
- Submit sitemap.
- Inspect homepage.
- Inspect one service page.
- Inspect one Knowledge Hub article.
- Inspect one calculator/guide.
- Monitor coverage during the first week.

## Analytics

- Add `NEXT_PUBLIC_GTM_ID` and/or `NEXT_PUBLIC_GA_ID` only when ready.
- Redeploy after adding IDs.
- Validate pageviews.
- Validate lead and CTA events.
- Confirm no PII in analytics payloads.

## Forms And Lead API

- Submit contact form with test data.
- Submit AI Project Advisor lead.
- Submit calculator lead.
- Submit Radiology Planner lead.
- Submit Service Diagnostic lead.
- Submit Proposal Builder lead.
- Confirm API response is mocked and safe.
- Confirm no real email or CRM action occurs.

## Lighthouse And Mobile

- Run Lighthouse on homepage.
- Run Lighthouse on services page.
- Run Lighthouse on article page.
- Run Lighthouse on calculator/tool page.
- Run Lighthouse on contact page.
- Check mobile at 360px, 390px, 430px, and tablet width.

## Backup And Rollback

- Keep a copy of the release commit or deployment tag.
- Confirm previous deployment can be restored from hosting dashboard.
- Export DNS settings or screenshot final DNS records.
- Save final environment variable names, not secret values, in internal documentation.

## After Launch

- Monitor Vercel logs.
- Monitor `/api/leads` errors.
- Monitor Search Console.
- Monitor analytics events if enabled.
- Collect real form feedback.
- Plan CRM/email activation separately.

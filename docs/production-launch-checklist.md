# Production Launch Checklist

Use this checklist before switching the ZES MEDCORP platform from mock-safe mode to real business operation.

## Build And Runtime

- Run `npm run build`.
- Run `npm run content:check`.
- Start production locally with `npm run start`.
- Smoke test `/`, `/contact`, `/proposal-builder`, `/project-intake`, `/privacy-policy`, `/terms`, `/sitemap.xml` and `/robots.txt`.
- Confirm `/admin/leads` remains noindex and is not present in sitemap.

## Vercel And Environment

- Verify `www.zescorp.ro` is the primary production domain.
- Verify apex `zescorp.ro` redirects to `https://www.zescorp.ro`.
- Keep real secrets out of Git.
- Confirm mock defaults before launch:
  - `LEAD_INTEGRATION_MODE=mock`
  - `EMAIL_PROVIDER=mock`
  - `LEAD_STORAGE_PROVIDER=mock`
- Add analytics IDs only when privacy review is complete:
  - `NEXT_PUBLIC_GTM_ID`
  - `NEXT_PUBLIC_GA_ID`

## Resend Activation

- Verify sending domain in Resend.
- Add DNS records.
- Add server-side Vercel env vars:
  - `EMAIL_PROVIDER=resend`
  - `EMAIL_FROM=ZES MEDCORP <office@zescorp.ro>`
  - `LEAD_NOTIFICATION_EMAIL=office@zescorp.ro`
  - `RESEND_API_KEY`
- Redeploy.
- Submit a test lead with demo data.
- Confirm `emailMode` is `live`.
- Roll back to `EMAIL_PROVIDER=mock` if delivery is not confirmed.

## Google Sheets Activation

- Create the lead log Sheet.
- Add tab `Leads`.
- Share the Sheet with the Google service account.
- Add Vercel env vars:
  - `GOOGLE_SHEETS_ID`
  - `GOOGLE_SERVICE_ACCOUNT_EMAIL`
  - `GOOGLE_PRIVATE_KEY`
  - `GOOGLE_SHEETS_TAB_NAME=Leads`
- Set `LEAD_INTEGRATION_MODE=email-and-sheets` only after email has been validated.
- Submit a test lead with demo data and confirm row creation.

## Legal And Trust

- Review `/privacy-policy`.
- Review `/terms`.
- Review `/cookie-policy`.
- Review `/gdpr`.
- Review `/disclaimer`.
- Confirm contact data is correct:
  - `SC ZES MEDCORP S.R.L.`
  - `office@zescorp.ro`
  - `0725 514 782`
  - `CUI 52942540`
  - `J2025089432009`
  - `Str. Năzuinței nr. 11B, Bragadiru, Ilfov`

## Smoke Testing

- Submit contact form in mock mode.
- Generate Proposal Builder result.
- Export proposal PDF.
- Run Project Intake summary.
- Check footer legal links.
- Test mobile viewport for sticky CTA and legal pages.
- Check social previews after deployment.

## Rollback

- Keep latest stable deployment available.
- Roll back integrations by setting:
  - `EMAIL_PROVIDER=mock`
  - `LEAD_INTEGRATION_MODE=mock`
  - `LEAD_STORAGE_PROVIDER=mock`
- Redeploy and verify mock API response.

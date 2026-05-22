# Final Production Status

Last reviewed: 2026-05-22

## Current Status

The ZES MEDCORP platform is production-ready for public browsing, lead capture, internal Resend email notifications, mock storage, and prepared Google Sheets logging. The site remains intentionally lightweight: no database, no CRM, no authentication, and no customer email automation are active.

## Validation Commands

Latest local validation:

- `npm run build`: passed.
- `npm run content:check`: passed.
- Local production route smoke: passed, 0 route failures.
- Local mock `/api/leads` smoke: passed with `integrationMode=mock`, `emailMode=mock`, `sheetsMode=mock`, `storageMode=mock`.

Build output:

- 106 static pages generated.
- `/api/leads` remains dynamic.
- `/admin/lead-flow` remains dynamic.
- `/admin/leads` remains noindex and sitemap-excluded.

## Route Smoke Test Results

Public and legal routes were checked locally and on production at `https://www.zescorp.ro`.

Checked routes:

- `/`
- `/services`
- `/contact`
- `/proposal-builder`
- `/project-intake`
- `/planificare`
- `/knowledge-hub`
- `/calculatoare/cost-camera-rmn`
- `/radiology-room-planner`
- `/privacy-policy`
- `/terms`
- `/cookie-policy`
- `/gdpr`
- `/disclaimer`
- `/companie`
- `/admin/leads`
- `/admin/lead-flow`
- `/sitemap.xml`
- `/robots.txt`

Result:

- All checked routes returned HTTP 200.
- `/admin/leads` and `/admin/lead-flow` return noindex metadata.
- `/sitemap.xml` excludes admin routes.
- Legal and company pages are present in the sitemap.
- `robots.txt` is reachable.

## Lead Flow Status

Production lead API test result:

- Endpoint: `https://www.zescorp.ro/api/leads`
- HTTP status: 200
- `success`: `true`
- `ok`: `true`
- `integrationMode`: `email-only`
- `emailMode`: `live`
- `sheetsMode`: `mock`
- `storageMode`: `mock`
- `priority`: `Low priority`
- `highPriorityPrepared`: `false`
- `highPriorityEmailEnabled`: `false`

Current behavior:

- Real internal Resend notification email is active.
- Customer confirmation emails are not active.
- Google Sheets logging is prepared but inactive in production.
- Lead storage remains mock-only.
- Frontend success detection should treat HTTP 200 plus `success: true` / `ok: true` as successful, regardless of whether storage, email, or Sheets are in `live` or `mock` mode.
- Duplicate rapid submissions are rate-limited. A repeated controlled test returned HTTP 429 as expected.

## Email Status

Active:

- Internal lead notification through Resend.
- Recipient configured through server-side environment variables.
- Email mode reported by API as `live`.

Inactive:

- Customer confirmation emails.
- Marketing automation.
- Newsletter or bulk email flows.
- CRM email sequences.

Operational notes:

- High-priority alert behavior is prepared but was not triggered by the low-priority smoke test.
- If a sent email is not visible in the inbox, check Resend Events, spam/quarantine, mailbox routing, MX records, and Vercel function logs.
- Rollback: set `EMAIL_PROVIDER=mock` and redeploy.

## Google Sheets Status

Current production mode:

- `LEAD_INTEGRATION_MODE=email-only`
- `sheetsMode=mock`

Google Sheets integration is scaffolded and documented but not active in the tested production response.

Activation checklist:

1. Confirm the Google Sheet has a `Leads` tab and the documented columns.
2. Confirm the service account has access to the Sheet.
3. Confirm Vercel has the server-side Sheets environment variables.
4. Set `LEAD_INTEGRATION_MODE=email-and-sheets`.
5. Redeploy.
6. Submit one controlled test lead.
7. Verify exactly one row appears.
8. Roll back to `LEAD_INTEGRATION_MODE=email-only` if needed.

## PDF Export Status

Proposal Builder includes client-side PDF export using the prepared proposal document structure.

Expected PDF content:

- ZES MEDCORP branding
- Proposal title and generated date
- Proposal identifier/version metadata
- Project summary
- Assumptions and validation notes
- Technical stages and recommendations
- Related services / next actions
- Company contact footer
- Preliminary proposal disclaimer

Known limitation:

- Romanian diacritics may be normalized depending on the current browser-side PDF path. Full typographic Romanian support should be handled later with embedded fonts or server-side PDF rendering.
- Automated headless browser export could not be completed in the local QA environment because Chrome remote debugging did not become available. This is an environment limitation of the smoke pass, not a detected application error.

Manual pre-launch check:

- Generate one proposal from `/proposal-builder`.
- Export PDF.
- Open the file and verify header, footer, company data, disclaimer, spacing, and readable section hierarchy.

## SEO And Indexability Status

Checked:

- `/sitemap.xml` returns 200.
- `/robots.txt` returns 200.
- Admin routes are excluded from sitemap.
- Admin routes include noindex metadata.
- Public legal/company pages are included.

Recommended post-launch checks:

- Submit sitemap in Google Search Console.
- Inspect canonical URLs for the homepage, services, calculators, guides, and Knowledge Hub articles.
- Use Google URL Inspection for priority commercial pages.
- Validate social previews after deployment changes.

## Analytics And Privacy Status

Current checks:

- GA/gtag surface is present.
- GTM was not detected in the checked production homepage HTML.
- No public secret key names were detected in homepage HTML.
- Lead analytics sanitization strips personal fields such as name, email, phone, company, contact name, and message.
- Lead events should use source, mode, category, score, priority, complexity, urgency, and status fields only.

Safety rules:

- Do not send names, emails, phone numbers, company names, free-text messages, API responses with PII, or full lead payloads to analytics.
- Keep provider keys server-side only.
- Do not use `NEXT_PUBLIC_` for private keys or provider secrets.

## Security And Privacy Status

Current state:

- No database is active.
- No CRM is active.
- No authentication is active.
- Admin pages are still demo/internal and noindex.
- Admin pages are not linked from public navigation.
- Real lead data should not be displayed in admin until authentication and storage security are implemented.
- No real secrets were found in the scanned public/client surface.

Before real admin use:

1. Add authentication.
2. Restrict admin access by role.
3. Add real storage with retention rules.
4. Add audit logging.
5. Review GDPR/legal wording with counsel.

## Known Issues And Limitations

- Google Sheets is prepared but inactive in the latest production test.
- Admin dashboard remains demo-only and must not be used for real private lead review.
- Customer confirmation emails are intentionally disabled.
- CRM/database storage is intentionally absent.
- PDF export is browser-side and should be manually checked after browser or styling changes.
- Full mobile visual QA should be repeated on real devices after deployment.

## Rollback Notes

Email rollback:

- Set `EMAIL_PROVIDER=mock`.
- Redeploy.
- Confirm `/api/leads` returns `emailMode=mock`.

Sheets rollback:

- Set `LEAD_INTEGRATION_MODE=email-only`.
- Redeploy.
- Confirm `/api/leads` returns `sheetsMode=mock`.

Full safe-mode rollback:

- Set `EMAIL_PROVIDER=mock`.
- Set `LEAD_INTEGRATION_MODE=mock`.
- Redeploy.
- Confirm `emailMode=mock`, `sheetsMode=mock`, and `storageMode=mock`.

## Next Recommended Actions

1. Confirm Resend inbox delivery with `office@zescorp.ro` after each deployment.
2. Activate Google Sheets with one controlled test lead only.
3. Verify frontend success state on Contact, Proposal Builder, Project Intake, and `/admin/lead-flow`.
4. Run a manual PDF export from Proposal Builder.
5. Add authentication before any real admin data display.
6. Submit sitemap in Google Search Console.
7. Run Lighthouse/mobile QA on the main conversion pages.

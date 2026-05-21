# Real Activation Readiness Audit

## Audit Date

Phase 51 audit for the ZES MEDCORP platform.

## Current Status

The platform is **not ready for full real business mode** yet.

It is **ready for a controlled staging test of internal Resend lead notifications** after manual provider setup, domain verification and approved recipient configuration.

Production should remain:

```env
LEAD_INTEGRATION_MODE=mock
EMAIL_PROVIDER=mock
```

until the manual activation checklist is completed.

## Readiness Verdict

| Area | Status | Notes |
| --- | --- | --- |
| Lead forms | Ready for mock and staging tests | Forms use the shared lead capture architecture, validation and source attribution. |
| `/api/leads` | Ready for controlled staging | Mock default remains safe. Response avoids returning contact details or full messages. |
| Resend email scaffold | Ready for staging only | Requires `LEAD_INTEGRATION_MODE=email-only` or `email-and-sheets`, `EMAIL_PROVIDER=resend`, `RESEND_API_KEY`, `EMAIL_FROM`, and `LEAD_NOTIFICATION_EMAIL`. |
| User confirmation email | Not active | Explicitly gated behind `LEAD_CONFIRMATION_EMAIL_ENABLED=true`. Keep disabled for first activation. |
| Google Sheets scaffold | Ready for staging only | Requires Sheets mode, service account env vars, API enabled and Sheet sharing. |
| Admin dashboard | Not ready for real data | Demo-only, noindex, excluded from sitemap, but still lacks authentication. |
| Analytics | Safe by design | Events are optional, fail silently and filter known PII fields. |
| CRM/database | Not ready | Keep mocked until auth, storage and operational process are defined. |

## Lead Entry Points Audited

The following lead sources are routed through the shared `LeadCaptureForm` and `/api/leads` flow:

- Contact page
- AI Project Advisor
- Medical Project Calculator
- Radiology Room Planner
- Service Diagnostic
- Proposal Builder
- Project Intake
- Programmatic calculators under `/calculatoare/*`

Findings:

- Required fields are validated: name, email, phone, source tool and source page.
- Source attribution is included through `sourceTool` and `sourcePage`.
- Generated context can include complexity, risk, urgency and budget category.
- Form analytics use sanitized payloads and avoid name, email, phone, company and free-text message.
- Success states are local and do not depend on a real provider.

## API And Integration Mode Audit

`/api/leads` currently:

- Parses and validates the lead payload.
- Computes deterministic lead score, priority and next action.
- Builds CRM, storage, email and Google Sheets payloads.
- Calls mock storage by default.
- Calls email provider only if `LEAD_INTEGRATION_MODE` requests email and `EMAIL_PROVIDER` is configured.
- Attempts Google Sheets append only if integration mode requests Sheets.
- Returns safe mode summary:
  - `integrationMode`
  - `storageMode`
  - `emailMode`
  - `sheetsMode`
  - `score`
  - `priority`
  - `nextAction`

Safety notes:

- Default integration mode is `mock`.
- Missing or invalid integration mode normalizes to `mock`.
- Missing Resend config returns controlled `config-error`.
- Missing Google Sheets config returns controlled configuration status.
- API responses do not return full contact details, full message text, email HTML, API keys or provider secrets.

## Email Readiness

Current safe behavior:

- Missing `EMAIL_PROVIDER` is treated as mock.
- `EMAIL_PROVIDER=mock` sends no real email.
- `EMAIL_PROVIDER=resend` is only active when `LEAD_INTEGRATION_MODE=email-only` or `email-and-sheets`.
- Internal notifications require `LEAD_NOTIFICATION_EMAIL`.
- User confirmation emails remain disabled unless `LEAD_CONFIRMATION_EMAIL_ENABLED=true`.
- SMTP is a placeholder and returns `unsupported`.

Activation prerequisites:

- Resend account created.
- Sending domain verified.
- DNS records applied and verified.
- `RESEND_API_KEY` added only in Vercel.
- `EMAIL_FROM` uses a verified sender.
- `LEAD_NOTIFICATION_EMAIL` is an approved ZES internal mailbox.
- Test lead sent in staging before production.

## Google Sheets Readiness

Current safe behavior:

- Default `LEAD_INTEGRATION_MODE=mock` does not append rows.
- Sheets append only runs in `sheets-only` or `email-and-sheets`.
- Required env vars are checked server-side:
  - `GOOGLE_SHEETS_ID`
  - `GOOGLE_SERVICE_ACCOUNT_EMAIL`
  - `GOOGLE_PRIVATE_KEY`
  - optional `GOOGLE_SHEETS_TAB_NAME`
- Private key newlines are normalized server-side.
- No Google dependency is required for build.

Activation prerequisites:

- Dedicated Google Sheet created.
- `Leads` tab created with approved columns.
- Google Sheets API enabled.
- Service account created.
- Sheet shared with service account email.
- Credentials added only in Vercel.
- Test append verified in staging.
- Sheet access restricted to approved ZES staff.

## Admin Safety

Status:

- `/admin/leads` has `robots: noindex, nofollow`.
- `/admin/leads` is excluded from sitemap.
- It is not linked from the public header/navigation.
- It uses demo data only.
- Admin shell includes demo/internal warnings.

Blocker:

- Do not connect `/admin/leads` to real lead data until authentication, role-based access, audit logging and data retention rules exist.

## Analytics Privacy

Status:

- Analytics only activates when `NEXT_PUBLIC_GTM_ID` or `NEXT_PUBLIC_GA_ID` exist.
- Tracking helpers are SSR-safe and fail silently.
- Known PII keys are filtered:
  - name
  - email
  - phone
  - company
  - contactName
  - message
  - generatedSummary
- Lead events track source, category, project type, risk, complexity, urgency and budget category.

Manual check before activation:

- Confirm GTM tags do not capture form field values.
- Confirm no custom GTM variable reads names, email, phone or textarea content.

## Environment Audit

Current expected safe defaults:

```env
LEAD_INTEGRATION_MODE=mock
EMAIL_PROVIDER=mock
LEAD_CONFIRMATION_EMAIL_ENABLED=false
LEAD_STORAGE_PROVIDER=mock
NEXT_PUBLIC_GTM_ID=
NEXT_PUBLIC_GA_ID=
```

Server-only secrets must not use `NEXT_PUBLIC_`:

- `RESEND_API_KEY`
- `GOOGLE_PRIVATE_KEY`
- `GOOGLE_SERVICE_ACCOUNT_EMAIL`
- `CRM_API_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `SMTP_PASS`

## Fixes Made During Audit

- Real email is now gated by `LEAD_INTEGRATION_MODE`; `EMAIL_PROVIDER=resend` alone is not enough.
- User-facing confirmation email is now disabled unless `LEAD_CONFIRMATION_EMAIL_ENABLED=true`.
- Email and deployment docs were updated to reflect the safer activation requirements.

## Recommended Activation Order

1. **Resend internal lead notifications**
   - Use staging first.
   - Keep user confirmation disabled.
   - Validate recipient, sender, formatting and failure behavior.

2. **Google Sheets lead log**
   - Use staging first.
   - Confirm service account access and row shape.
   - Restrict Sheet access.

3. **Admin authentication**
   - Add real auth before real lead display.
   - Keep noindex as defense in depth.

4. **Real database**
   - Add Postgres/Supabase/Neon only after auth and retention rules exist.

5. **CRM**
   - Add HubSpot or another CRM after lead scoring and sales ownership process are stable.

## Blockers Before Production Real Mode

- Privacy/contact wording must be reviewed for real lead storage and email sending.
- Resend sending domain must be verified.
- ZES internal recipient list must be approved.
- Google Sheet access policy must be defined.
- A staging test must pass for email and Sheets before production.
- Admin authentication must exist before any real lead dashboard data.
- No patient data warning should remain visible near forms.
- GTM/GA must be reviewed to ensure no PII capture.

## Rollback Plan

Immediate rollback:

```env
LEAD_INTEGRATION_MODE=mock
EMAIL_PROVIDER=mock
LEAD_CONFIRMATION_EMAIL_ENABLED=false
```

Then redeploy.

Expected rollback behavior:

- Forms continue to submit.
- `/api/leads` still validates and scores leads.
- No email is sent.
- No Google Sheet row is appended.
- Admin remains demo-only.

## Test Checklist

Before staging activation:

- `npm run build`
- `npm run content:check`
- `node scripts/test-lead-api.mjs` against a local or preview deployment
- Submit a contact form with fake test data
- Submit Proposal Builder lead with fake test data
- Submit Project Intake lead with fake test data
- Confirm API returns `success: true`
- Confirm `storageMode`, `emailMode`, `sheetsMode`, `integrationMode`
- Confirm no real provider activity in mock mode

Before production activation:

- Verify Resend DNS.
- Verify `EMAIL_FROM`.
- Verify `LEAD_NOTIFICATION_EMAIL`.
- Verify Google Sheet tab and columns.
- Verify Sheet sharing with service account.
- Confirm no secrets in repo.
- Confirm no secrets in client bundle.
- Confirm admin remains noindex.
- Confirm sitemap excludes admin and API routes.
- Confirm Search Console is not asked to index `/admin/leads`.

## Manual Verification Steps

1. Deploy preview with mock defaults.
2. Submit a fake test lead.
3. Confirm `emailMode: "mock"` and `sheetsMode: "mock"`.
4. Set staging env:
   - `LEAD_INTEGRATION_MODE=email-only`
   - `EMAIL_PROVIDER=resend`
   - `RESEND_API_KEY`
   - `EMAIL_FROM`
   - `LEAD_NOTIFICATION_EMAIL`
5. Redeploy staging.
6. Submit a fake test lead.
7. Confirm internal email arrives.
8. Set staging env for Sheets.
9. Switch to `LEAD_INTEGRATION_MODE=email-and-sheets`.
10. Submit fake test lead.
11. Confirm internal email and Sheet row.
12. Roll back to mock and confirm no further provider activity.


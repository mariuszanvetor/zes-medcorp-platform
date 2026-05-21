# Environment Variables

No real secrets should be committed to the repository. Use `.env.local` locally and the hosting provider environment variable UI for production.

The committed `.env.example` contains placeholders only.

## Analytics

| Variable | Required now | Required later | Purpose |
| --- | --- | --- | --- |
| `NEXT_PUBLIC_GTM_ID` | No | Optional | Enables Google Tag Manager when configured. |
| `NEXT_PUBLIC_GA_ID` | No | Optional | Enables Google Analytics 4 when configured. |

Notes:

- Both are safe to expose to the browser because they are `NEXT_PUBLIC_` variables.
- Leave empty until real analytics properties exist.
- Analytics events must not include names, emails, phone numbers, company names, or free-text lead messages.

## CRM / Lead Routing

| Variable | Required now | Required later | Purpose |
| --- | --- | --- | --- |
| `LEAD_INTEGRATION_MODE` | No | Yes, when real routing is enabled | Current safe value is `mock`. Future options: `email-only`, `sheets-only`, `email-and-sheets`, `crm`. |
| `CRM_PROVIDER` | No | Yes, when CRM sync is enabled | Future CRM provider name. |
| `CRM_API_KEY` | No | Yes, when CRM sync is enabled | Future CRM API key. Never commit a real value. |
| `CRM_WEBHOOK_URL` | No | Optional | Future webhook endpoint for CRM or automation routing. |

Current state:

- CRM integration is mocked only.
- `/api/leads` prepares mode summaries but does not store leads, send email, append Sheets rows, or send data to an external CRM.
- Recommended first real mode after staging validation is `LEAD_INTEGRATION_MODE=email-and-sheets`.

## Email Notifications

| Variable | Required now | Required later | Purpose |
| --- | --- | --- | --- |
| `EMAIL_PROVIDER` | No | Yes, when email is enabled | Safe default is `mock`. `resend` enables the Resend scaffold when required env vars exist. `smtp` is reserved for later. |
| `EMAIL_FROM` | No | Yes, when email is enabled | Verified sender address for future transactional email. |
| `EMAIL_API_KEY` | No | Yes, when email is enabled | Future email API key. Never commit a real value. |
| `LEAD_NOTIFICATION_EMAIL` | No | Yes, when internal notifications are enabled | Internal destination for lead notifications. |
| `RESEND_API_KEY` | No | Optional | Future Resend API key if Resend is selected. |
| `SENDGRID_API_KEY` | No | Optional | Future SendGrid API key if SendGrid is selected. |
| `SMTP_HOST` | No | Optional | Future SMTP host if SMTP/Gmail Workspace is selected. |
| `SMTP_PORT` | No | Optional | Future SMTP port. |
| `SMTP_USER` | No | Optional | Future SMTP username. |
| `SMTP_PASS` | No | Optional | Future SMTP password. |

Current state:

- Email sending is mocked unless `EMAIL_PROVIDER=resend` and required server-side env vars are configured.
- Missing Resend configuration returns a controlled `config-error`; it does not crash the lead API.
- SMTP is a placeholder and returns `unsupported` until implemented.
- No production email is sent by default.

## Lead Storage

| Variable | Required now | Required later | Purpose |
| --- | --- | --- | --- |
| `LEAD_STORAGE_PROVIDER` | No | Yes, when real storage is enabled | Current safe value is `mock`. Future options may include Postgres, Supabase, Neon, Airtable, Google Sheets, HubSpot, or webhook. |
| `LEAD_DATABASE_URL` | No | Yes, for Postgres-style storage | Future server-side database connection string. Never commit a real value. |
| `SUPABASE_URL` | No | Optional | Future Supabase project URL if Supabase is selected. |
| `SUPABASE_SERVICE_ROLE_KEY` | No | Optional | Future server-side Supabase service key. Never expose as `NEXT_PUBLIC_*`. |
| `GOOGLE_SHEETS_ID` | No | Optional | Future temporary Sheets workflow identifier. |
| `GOOGLE_SERVICE_ACCOUNT_EMAIL` | No | Optional | Future service account email for Sheets logging. |
| `GOOGLE_PRIVATE_KEY` | No | Optional | Future service account private key. Preserve newlines or use escaped `\n`. Never expose client-side or commit. |
| `GOOGLE_SHEETS_TAB_NAME` | No | Optional | Future lead log tab name. Default planned value: `Leads`. |
| `AIRTABLE_API_KEY` | No | Optional | Future Airtable API key. Never commit a real value. |
| `AIRTABLE_BASE_ID` | No | Optional | Future Airtable base identifier. |

Current state:

- Lead storage is mocked only.
- `/api/leads` returns a mock `leadId` and `storageMode: "mock"`.
- `/api/leads` also prepares a Google Sheets row shape and returns `sheetsMode: "mock"`.
- The Sheets adapter can append later using server-side service account env vars, but missing config must not break builds or form submissions.
- No persistent database, Google Sheet, Airtable base, CRM record, or webhook is used.
- Admin lead review still uses demo data only.

## Admin Authentication

| Variable | Required now | Required later | Purpose |
| --- | --- | --- | --- |
| `AUTH_PROVIDER` | No | Yes, when admin auth is enabled | Future selected provider: Auth.js, Clerk, Supabase Auth or custom. |
| `AUTH_SECRET` | No | Yes, for custom/server auth | Future server-side auth secret. Never commit a real value. |
| `ADMIN_EMAILS` | No | Yes, for allowlisted admin access | Comma-separated internal admin emails for future access control. |
| `NEXTAUTH_URL` | No | If using Auth.js | Canonical app URL for Auth.js / NextAuth. |
| `NEXTAUTH_SECRET` | No | If using Auth.js | Auth.js session secret. Never commit a real value. |
| `CLERK_SECRET_KEY` | No | If using Clerk | Clerk server-side secret key. Never commit a real value. |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | No | If using Clerk | Clerk browser publishable key. |

Current state:

- Admin auth is not enabled.
- `/admin/leads` uses demo data only.
- Admin routes remain noindex and absent from public navigation.
- Do not connect real lead storage before admin authentication and authorization exist.

## Production Safety Rules

- Do not commit `.env.local`.
- Do not place real API keys in `.env.example`.
- Rotate any secret that is accidentally committed.
- Keep analytics payloads free of personal data.
- Enable CRM/email only after legal, privacy, and operational review.
- Enable real lead storage only after admin authentication, access control, and privacy review are complete.

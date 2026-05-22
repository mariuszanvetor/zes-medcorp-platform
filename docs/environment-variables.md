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
| `EMAIL_PROVIDER` | No | Yes, when email is enabled | Safe default is `mock`. `resend` enables the Resend scaffold only when `LEAD_INTEGRATION_MODE` requests email and required env vars exist. `smtp` is reserved for later. |
| `EMAIL_FROM` | No | Yes, when email is enabled | Verified sender address for future transactional email. |
| `EMAIL_API_KEY` | No | Yes, when email is enabled | Future email API key. Never commit a real value. |
| `LEAD_NOTIFICATION_EMAIL` | No | Yes, when internal notifications are enabled | Internal destination for lead notifications. |
| `LEAD_CONFIRMATION_EMAIL_ENABLED` | No | Optional | Keep `false` until user-facing confirmation wording and privacy text are approved. |
| `HIGH_PRIORITY_ALERT_EMAIL_ENABLED` | No | Optional | Keep `false` during first Resend activation to avoid duplicate internal emails. |
| `LEAD_SUBMISSION_COOLDOWN_SECONDS` | No | Optional | Lightweight in-memory duplicate submission cooldown. Default is `45`. |
| `RESEND_API_KEY` | No | Optional | Future Resend API key if Resend is selected. |
| `RESEND_VERIFIED_DOMAIN` | No | Yes, when Resend is enabled | Verified Resend sender domain, for example `zescorp.ro`. |
| `RESEND_DOMAIN_VERIFIED` | No | Yes, when Resend is enabled | Set to `true` only after Resend confirms domain verification. |
| `RESEND_REQUEST_TIMEOUT_MS` | No | Optional | Provider request timeout. Default is `8000`. |
| `SENDGRID_API_KEY` | No | Optional | Future SendGrid API key if SendGrid is selected. |
| `SMTP_HOST` | No | Optional | Future SMTP host if SMTP/Gmail Workspace is selected. |
| `SMTP_PORT` | No | Optional | Future SMTP port. |
| `SMTP_USER` | No | Optional | Future SMTP username. |
| `SMTP_PASS` | No | Optional | Future SMTP password. |

Current state:

- Email sending is mocked unless `LEAD_INTEGRATION_MODE` requests email, `EMAIL_PROVIDER=resend`, required server-side env vars are configured, and Resend domain verification is confirmed.
- Missing Resend configuration returns a controlled `config-error`; it does not crash the lead API.
- User-facing lead confirmation remains mock-disabled unless `LEAD_CONFIRMATION_EMAIL_ENABLED=true`.
- High-priority alert emails remain disabled unless `HIGH_PRIORITY_ALERT_EMAIL_ENABLED=true`.
- SMTP is a placeholder and returns `unsupported` until implemented.
- No production email is sent by default.

## Lead Storage

| Variable | Required now | Required later | Purpose |
| --- | --- | --- | --- |
| `LEAD_STORAGE_PROVIDER` | No | Yes, when real storage is enabled | Current safe value is `mock`. Future options may include Postgres, Supabase, Neon, Airtable, Google Sheets, HubSpot, or webhook. |
| `LEAD_DATABASE_URL` | No | Yes, for Postgres-style storage | Future server-side database connection string. Never commit a real value. |
| `SUPABASE_URL` | No | Optional | Future Supabase project URL if Supabase is selected. |
| `SUPABASE_SERVICE_ROLE_KEY` | No | Optional | Future server-side Supabase service key. Never expose as `NEXT_PUBLIC_*`. |
| `GOOGLE_SHEETS_SPREADSHEET_ID` | No | Yes, when Sheets logging is enabled | Google Sheet ID for the lead log. |
| `GOOGLE_SHEETS_CLIENT_EMAIL` | No | Yes, when Sheets logging is enabled | Google service account email with access to the Sheet. |
| `GOOGLE_SHEETS_PRIVATE_KEY` | No | Yes, when Sheets logging is enabled | Google service account private key. Preserve newlines or use escaped `\n`. Never expose client-side or commit. |
| `GOOGLE_SHEETS_PROJECT_ID` | No | Optional | Service-account project ID for operational reference. Current adapter does not require it. |
| `GOOGLE_SHEETS_TAB_NAME` | No | Optional | Lead log tab name. Default planned value: `Leads`. |
| `GOOGLE_SHEETS_REQUEST_TIMEOUT_MS` | No | Optional | Google token/append timeout. Default is `10000`. |
| `AIRTABLE_API_KEY` | No | Optional | Future Airtable API key. Never commit a real value. |
| `AIRTABLE_BASE_ID` | No | Optional | Future Airtable base identifier. |

Current state:

- Lead storage is mocked only.
- `/api/leads` returns a mock `leadId` and `storageMode: "mock"`.
- `/api/leads` also prepares a Google Sheets row shape and returns `sheetsMode: "mock"` unless `LEAD_INTEGRATION_MODE=sheets-only` or `email-and-sheets`.
- With `LEAD_INTEGRATION_MODE=email-and-sheets`, the API sends the internal email notification and attempts a Sheets append.
- Sheets success returns `sheetsMode: "real"`.
- Missing Sheets config returns `sheetsMode: "config-error"` without exposing secrets or stack traces.
- Provider append failures return `sheetsMode: "provider-error"`.
- Legacy aliases `GOOGLE_SHEETS_ID`, `GOOGLE_SERVICE_ACCOUNT_EMAIL` and `GOOGLE_PRIVATE_KEY` are still accepted by code for compatibility, but new Vercel deployments should use the primary `GOOGLE_SHEETS_*` names above.
- No persistent database, Google Sheet, Airtable base, CRM record, or webhook is used.
- Admin lead review still uses demo data only.

## Admin Authentication

| Variable | Required now | Required later | Purpose |
| --- | --- | --- | --- |
| `AUTH_PROVIDER` | No | Yes, when admin auth is enabled | Future selected provider: Auth.js, Clerk, Supabase Auth or custom. |
| `AUTH_SECRET` | No | Yes, for custom/server auth | Future server-side auth secret. Never commit a real value. |
| `ADMIN_EMAILS` | No | Yes, for allowlisted admin access | Comma-separated internal admin emails for future access control. |
| `ADMIN_ACCESS_ENABLED` | No | Optional first protection layer | Set to `true` to require the simple admin password gate for `/admin/leads` and `/admin/lead-flow`. Default is `false`. |
| `ADMIN_ACCESS_PASSWORD` | No | Yes, if `ADMIN_ACCESS_ENABLED=true` | Server-side password for the temporary admin gate. Use a strong value in Vercel and never commit it. |
| `ADMIN_ACCESS_TTL_SECONDS` | No | Optional | Temporary admin cookie lifetime. Default is `28800` seconds, with accepted values from 5 minutes to 24 hours. |
| `NEXTAUTH_URL` | No | If using Auth.js | Canonical app URL for Auth.js / NextAuth. |
| `NEXTAUTH_SECRET` | No | If using Auth.js | Auth.js session secret. Never commit a real value. |
| `CLERK_SECRET_KEY` | No | If using Clerk | Clerk server-side secret key. Never commit a real value. |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | No | If using Clerk | Clerk browser publishable key. |

Current state:

- Full admin auth is not enabled.
- Optional simple password protection is available through `/api/admin/verify-access`.
- When `ADMIN_ACCESS_ENABLED=false`, admin stays in demo-open warning mode.
- When `ADMIN_ACCESS_ENABLED=true`, admin content is rendered only after a valid password sets a temporary HTTP-only `/admin` cookie.
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

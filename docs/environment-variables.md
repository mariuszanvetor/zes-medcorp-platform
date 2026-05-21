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
| `CRM_PROVIDER` | No | Yes, when CRM sync is enabled | Future CRM provider name. |
| `CRM_API_KEY` | No | Yes, when CRM sync is enabled | Future CRM API key. Never commit a real value. |
| `CRM_WEBHOOK_URL` | No | Optional | Future webhook endpoint for CRM or automation routing. |

Current state:

- CRM integration is mocked only.
- `/api/leads` does not store leads or send data to an external CRM.

## Email Notifications

| Variable | Required now | Required later | Purpose |
| --- | --- | --- | --- |
| `EMAIL_PROVIDER` | No | Yes, when email is enabled | Future email provider, such as Resend, SendGrid, SMTP, or Workspace mail. |
| `EMAIL_API_KEY` | No | Yes, when email is enabled | Future email API key. Never commit a real value. |
| `LEAD_NOTIFICATION_EMAIL` | No | Yes, when internal notifications are enabled | Internal destination for lead notifications. |

Current state:

- Email sending is mocked only.
- No production email is sent.

## Lead Storage

| Variable | Required now | Required later | Purpose |
| --- | --- | --- | --- |
| `LEAD_STORAGE_PROVIDER` | No | Yes, when real storage is enabled | Current safe value is `mock`. Future options may include Postgres, Supabase, Neon, Airtable, Google Sheets, HubSpot, or webhook. |
| `LEAD_DATABASE_URL` | No | Yes, for Postgres-style storage | Future server-side database connection string. Never commit a real value. |
| `SUPABASE_URL` | No | Optional | Future Supabase project URL if Supabase is selected. |
| `SUPABASE_SERVICE_ROLE_KEY` | No | Optional | Future server-side Supabase service key. Never expose as `NEXT_PUBLIC_*`. |
| `GOOGLE_SHEETS_ID` | No | Optional | Future temporary Sheets workflow identifier. |
| `AIRTABLE_API_KEY` | No | Optional | Future Airtable API key. Never commit a real value. |
| `AIRTABLE_BASE_ID` | No | Optional | Future Airtable base identifier. |

Current state:

- Lead storage is mocked only.
- `/api/leads` returns a mock `leadId` and `storageMode: "mock"`.
- No persistent database, sheet, Airtable base, CRM record, or webhook is used.
- Admin lead review still uses demo data only.

## Production Safety Rules

- Do not commit `.env.local`.
- Do not place real API keys in `.env.example`.
- Rotate any secret that is accidentally committed.
- Keep analytics payloads free of personal data.
- Enable CRM/email only after legal, privacy, and operational review.
- Enable real lead storage only after admin authentication, access control, and privacy review are complete.

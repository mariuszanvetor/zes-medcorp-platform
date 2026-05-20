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

## Production Safety Rules

- Do not commit `.env.local`.
- Do not place real API keys in `.env.example`.
- Rotate any secret that is accidentally committed.
- Keep analytics payloads free of personal data.
- Enable CRM/email only after legal, privacy, and operational review.

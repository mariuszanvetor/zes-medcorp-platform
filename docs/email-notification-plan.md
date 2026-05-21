# Email Notification Plan

## Current State

Email notifications are prepared in mock mode only.

- Lead submissions are validated, scored and accepted by the mocked lead API.
- Internal notification, user confirmation and high-priority alert templates are rendered.
- The email adapter returns a mock success response.
- No real provider is called.
- No email is sent.
- No API keys are required.

This keeps the platform backend-ready without exposing secrets or sending production email prematurely.

Email now sits behind the broader lead integration decision layer:

- `LEAD_INTEGRATION_MODE=mock` keeps all lead routing mocked.
- `LEAD_INTEGRATION_MODE=email-only` is the future email-only path.
- `LEAD_INTEGRATION_MODE=email-and-sheets` is the recommended first real launch flow after staging validation.
- Google Sheets logging remains a separate mock-prepared payload until credentials and provider code are approved.

Provider behavior:

- `EMAIL_PROVIDER=mock` or a missing value sends no real email.
- `EMAIL_PROVIDER=resend` uses the Resend API only when `RESEND_API_KEY`, `EMAIL_FROM` and the needed recipient env vars exist.
- `EMAIL_PROVIDER=smtp` is reserved as a future fallback and currently returns a controlled unsupported response.

## Email Types

### Internal Lead Notification

Purpose: notify the ZES team when a qualified lead arrives.

Should include:
- source tool and source page
- inquiry type and project type
- lead score and priority
- indicative budget category if available
- risk and complexity if available
- recommended next action
- admin review link

Should avoid:
- unnecessary sensitive details
- medical patient data
- long free-form text unless operationally needed
- analytics identifiers or tracking payloads

### Lead Confirmation Email

Purpose: future user-facing confirmation after a form submission.

Should include:
- confirmation that the request was received
- short project context
- expected next step
- privacy-safe language

This email should be activated only after final privacy text and consent wording are live.

### High-Priority Alert

Purpose: flag urgent or commercially important leads.

Prepared when:
- lead priority is `Critical / immediate opportunity`
- score is 80 or higher
- urgency is immediate
- generated risk level is critical

This remains mock-only until a provider is configured.

## Provider Options

### Recommended First Option: Resend

Good fit for a Next.js app because it has a simple API, strong transactional email ergonomics and clean deployment on Vercel.

The current scaffold can call Resend via `fetch`; no dependency is required.

Future env vars:
- `EMAIL_PROVIDER=resend`
- `RESEND_API_KEY=`
- `EMAIL_FROM=`
- `LEAD_NOTIFICATION_EMAIL=`

### SendGrid

Useful if the business already uses SendGrid or needs mature deliverability tooling.

Future env vars:
- `EMAIL_PROVIDER=sendgrid`
- `SENDGRID_API_KEY=`
- `EMAIL_FROM=`
- `LEAD_NOTIFICATION_EMAIL=`

### SMTP

Useful for traditional hosting or an existing business mailbox provider.

SMTP remains a placeholder in code for now. A real SMTP implementation should be added only after choosing a transport approach and testing deliverability.

Future env vars:
- `EMAIL_PROVIDER=smtp`
- `SMTP_HOST=`
- `SMTP_PORT=`
- `SMTP_USER=`
- `SMTP_PASS=`
- `EMAIL_FROM=`
- `LEAD_NOTIFICATION_EMAIL=`

### Gmail Workspace SMTP

Possible if ZES wants notifications through Google Workspace, but should be configured with proper app passwords or managed credentials.

Future env vars:
- `EMAIL_PROVIDER=gmail-workspace`
- `SMTP_HOST=`
- `SMTP_PORT=`
- `SMTP_USER=`
- `SMTP_PASS=`

## Required Environment Variables

Current safe defaults:

```env
LEAD_INTEGRATION_MODE=mock
EMAIL_PROVIDER=mock
EMAIL_FROM=
LEAD_NOTIFICATION_EMAIL=
```

Future provider-specific variables:

```env
RESEND_API_KEY=
SENDGRID_API_KEY=
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASS=
```

Never commit real secrets. Production secrets should live only in the hosting provider environment settings.

## Privacy And Security Rules

- Do not send personal data to analytics.
- Do not log full lead payloads in production.
- Do not include patient information in lead forms or emails.
- Internal email recipients must be approved business addresses.
- User confirmation emails should be enabled only after privacy and consent wording is finalized.
- Admin lead review must require authentication before real data is stored or displayed.
- API responses should avoid returning full contact details, full email bodies or full free-form messages.

## Testing Plan

1. Submit a lead through a form in mock mode.
2. Confirm `/api/leads` returns `emailMode: "mock"`.
3. Confirm no provider API key is required.
4. Confirm no real email arrives.
5. Confirm high-priority leads prepare a mock alert.
6. Confirm build passes with empty provider credentials.
7. In staging, enable one provider with test credentials only.
8. Send test notifications to an internal address.
9. Review deliverability, formatting and privacy content.
10. Enable production notifications after final privacy review.

## Launch Path

1. Keep `EMAIL_PROVIDER=mock` for initial production launch if real email is not ready.
2. Keep `LEAD_INTEGRATION_MODE=mock` until integration sign-off.
3. Verify the sending domain and add Resend secrets in the deployment platform.
4. Set `EMAIL_PROVIDER=resend` in staging.
5. Test internal lead notification first in staging.
6. Add Google Sheets logging only after sheet permissions and service account access are reviewed.
7. Move to `LEAD_INTEGRATION_MODE=email-and-sheets` for the first real launch flow.
8. Add user confirmation email only after consent/privacy text is approved.
9. Monitor failures and avoid blocking form submissions if email delivery fails.

See `docs/resend-email-setup.md` for the step-by-step Resend activation plan.

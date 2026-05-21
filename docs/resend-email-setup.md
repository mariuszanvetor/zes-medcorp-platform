# Resend Email Setup

## Current State

Email remains mock-safe by default. Real Resend delivery is allowed only for internal lead notifications after the production environment confirms sender-domain verification.

- `EMAIL_PROVIDER=mock` sends no real email.
- Missing `EMAIL_PROVIDER` is treated as mock.
- `EMAIL_PROVIDER=resend` only attempts delivery when `LEAD_INTEGRATION_MODE` requests email and required env vars exist.
- User-facing lead confirmation remains disabled unless `LEAD_CONFIRMATION_EMAIL_ENABLED=true`.
- High-priority alert emails are prepared but not sent unless `HIGH_PRIORITY_ALERT_EMAIL_ENABLED=true`.
- Rapid duplicate submissions are blocked by an in-memory cooldown.
- SMTP is documented as a future fallback and is not implemented yet.

## Future Setup Steps

1. Create a Resend account.
2. Verify the sending domain for ZES.
3. Add the DNS records Resend provides.
4. Wait for domain verification to complete.
5. Create a Resend API key.
6. Add env vars in Vercel or the selected hosting provider.
7. Set `LEAD_INTEGRATION_MODE=email-only`.
8. Set `EMAIL_PROVIDER=resend`.
9. Keep `LEAD_CONFIRMATION_EMAIL_ENABLED=false`.
10. Redeploy the app.
11. Submit one controlled test lead from Contact, Proposal Builder and Project Intake.
12. Check that exactly one internal notification is received per submission.
13. Roll back to `EMAIL_PROVIDER=mock` or `LEAD_INTEGRATION_MODE=mock` if delivery fails or formatting needs review.

## Required Environment Variables

```env
LEAD_INTEGRATION_MODE=email-only
EMAIL_PROVIDER=resend
RESEND_API_KEY=
RESEND_VERIFIED_DOMAIN=zescorp.ro
RESEND_DOMAIN_VERIFIED=true
RESEND_REQUEST_TIMEOUT_MS=8000
EMAIL_FROM=
LEAD_NOTIFICATION_EMAIL=office@zescorp.ro
LEAD_CONFIRMATION_EMAIL_ENABLED=false
HIGH_PRIORITY_ALERT_EMAIL_ENABLED=false
LEAD_SUBMISSION_COOLDOWN_SECONDS=45
```

Use a verified sender for `EMAIL_FROM`, for example:

```env
EMAIL_FROM=ZES MEDCORP <office@zescorp.ro>
```

Do not commit real values. Keep API keys only in the hosting provider environment settings.

`RESEND_DOMAIN_VERIFIED=true` should be set only after Resend shows the sending domain as verified. `EMAIL_FROM` must use the verified domain.

## What Gets Sent

When enabled, the adapter can send:

- internal lead notification
- high-priority alert for critical/high-score leads only if explicitly enabled
- lead confirmation email only if `LEAD_CONFIRMATION_EMAIL_ENABLED=true` in a future phase

Email bodies use the shared templates in `src/lib/email-templates.ts`.

The internal notification includes lead score, urgency, source, project type, contact details, recommendation summary, scoring rationale and quick action suggestions. No analytics event receives name, email, phone or message content.

## Safety Rules

- Do not expose `RESEND_API_KEY` to client code.
- Do not use `NEXT_PUBLIC_` for email secrets.
- Do not send email bodies or full lead payloads to analytics.
- Avoid collecting or forwarding patient medical data.
- Keep confirmation wording preliminary and non-contractual.
- If Resend returns an error, the API returns a controlled provider error and does not expose secrets.
- If required env vars are missing or domain verification is not confirmed, the API fails the email step safely without crashing form submission.
- Keep `HIGH_PRIORITY_ALERT_EMAIL_ENABLED=false` during first activation to avoid duplicate internal emails.

## Controlled Live Test Flow

1. Confirm env vars are present in Vercel without printing secret values.
2. Submit one Contact form test with clearly marked demo data.
3. Submit one Proposal Builder lead test with clearly marked demo data.
4. Submit one Project Intake lead test with clearly marked demo data.
5. Verify the inbox receives exactly one internal email per test.
6. Confirm the API response reports `emailMode=live`.
7. Confirm user-facing confirmation email remains disabled.
8. Repeat one submission quickly and confirm the duplicate cooldown returns `429`.
9. Roll back to mock if any message formatting or sender validation issue appears.

## Rollback

Set:

```env
LEAD_INTEGRATION_MODE=mock
EMAIL_PROVIDER=mock
```

Then redeploy. Form submissions will continue using the mock email path.

## SMTP Fallback

SMTP is intentionally not implemented in this phase because a reliable SMTP implementation usually needs a mailer dependency or provider-specific transport decisions.

Future SMTP env vars are already reserved:

```env
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASS=
EMAIL_FROM=
LEAD_NOTIFICATION_EMAIL=
```

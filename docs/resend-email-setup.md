# Resend Email Setup

## Current State

Email remains mock-safe by default.

- `EMAIL_PROVIDER=mock` sends no real email.
- Missing `EMAIL_PROVIDER` is treated as mock.
- `EMAIL_PROVIDER=resend` only attempts delivery when `LEAD_INTEGRATION_MODE` requests email and required env vars exist.
- User-facing lead confirmation remains disabled unless `LEAD_CONFIRMATION_EMAIL_ENABLED=true`.
- SMTP is documented as a future fallback and is not implemented yet.

## Future Setup Steps

1. Create a Resend account.
2. Verify the sending domain for ZES.
3. Add the DNS records Resend provides.
4. Wait for domain verification to complete.
5. Create a Resend API key.
6. Add env vars in Vercel or the selected hosting provider.
7. Set `LEAD_INTEGRATION_MODE=email-only` or `email-and-sheets`.
8. Set `EMAIL_PROVIDER=resend`.
9. Redeploy the app.
10. Submit a test lead with non-real contact data.
11. Check that the internal notification email is received.
12. Roll back to `EMAIL_PROVIDER=mock` or `LEAD_INTEGRATION_MODE=mock` if delivery fails or formatting needs review.

## Required Environment Variables

```env
LEAD_INTEGRATION_MODE=email-only
EMAIL_PROVIDER=resend
RESEND_API_KEY=
EMAIL_FROM=
LEAD_NOTIFICATION_EMAIL=
LEAD_CONFIRMATION_EMAIL_ENABLED=false
```

Use a verified sender for `EMAIL_FROM`, for example:

```env
EMAIL_FROM=ZES MEDCORP <office@zescorp.ro>
```

Do not commit real values. Keep API keys only in the hosting provider environment settings.

## What Gets Sent

When enabled, the adapter can send:

- internal lead notification
- high-priority alert for critical/high-score leads
- lead confirmation email only if `LEAD_CONFIRMATION_EMAIL_ENABLED=true`

Email bodies use the shared templates in `src/lib/email-templates.ts`.

## Safety Rules

- Do not expose `RESEND_API_KEY` to client code.
- Do not use `NEXT_PUBLIC_` for email secrets.
- Do not send email bodies or full lead payloads to analytics.
- Avoid collecting or forwarding patient medical data.
- Keep confirmation wording preliminary and non-contractual.
- If Resend returns an error, the API returns a controlled provider error and does not expose secrets.

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

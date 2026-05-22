# Lead Flow Monitor

## Purpose

`/admin/lead-flow` is an internal diagnostic page for checking lead flow readiness and running a controlled lead test.

It is not linked from public navigation, is not included in the sitemap, and uses `noindex, nofollow` metadata.

## What It Shows

The panel shows safe status summaries only:

- current `LEAD_INTEGRATION_MODE`
- expected email mode
- expected Google Sheets mode
- storage mode
- Resend configuration presence
- Google Sheets configuration presence
- confirmation email enabled or disabled
- high-priority alert enabled or disabled
- duplicate submission cooldown

It never displays API keys, private keys, full env values, or a full environment dump.

## Safe Test

The `Ruleaza test lead intern` button posts a clearly marked demo payload to `/api/leads`.

The payload uses:

- source: `admin-lead-flow-monitor`
- source page: `/admin/lead-flow`
- demo name, email, phone and company values
- no real client data
- no patient or medical record data

Important: if production email is active, the test can send a real internal notification. If Google Sheets is active, the test can append one row to the lead log.

The test result shows:

- HTTP status
- success
- integration mode
- email mode
- sheets mode
- storage mode
- score
- priority

## Mode Meanings

The monitor uses this label mapping:

- `real` / `live`: active production integration.
- `mock`: safe simulation; no external call for that layer.
- `config-error`: configuration issue; usually missing or unsafe env vars.
- `provider-error`: provider issue; env vars are present enough to attempt the call, but the external provider did not confirm success.

### `emailMode`

- `mock`: no real email was sent.
- `live`: Resend accepted the email request.
- `config-error`: email was requested, but configuration is incomplete or unsafe.
- `provider-error`: provider call failed or timed out safely.
- `unsupported`: selected provider is not implemented.

### `sheetsMode`

- `mock`: Sheets logging was not requested.
- `real`: row append succeeded.
- `config-error`: Sheets logging was requested, but required env vars are missing.
- `provider-error`: Google provider call failed or timed out safely.

### `storageMode`

- `mock`: no persistent database storage.

## Troubleshooting

| Status | Meaning | First checks |
| --- | --- | --- |
| `mock` | Safe simulation. | Confirm this is expected for the current environment. |
| `config-error` | Required configuration is missing or unsafe. | Check Vercel env vars. Do not print secrets. |
| `provider-error` | Provider call failed or timed out. | Check provider dashboard and Vercel logs. |
| `429` | Duplicate cooldown triggered. | Wait for cooldown, then retry once. |
| email `live`, inbox empty | Resend accepted the send but mailbox did not show it yet. | Check inbox, spam/quarantine, Resend events, recipient address, domain and MX/mailbox setup. |
| sheets `real`, row missing | API reported append success but the expected Sheet view does not show it. | Check tab name, filters, sorted ranges, Sheet ID and service account access. |

### `config-error`

Check Vercel server-side env vars. Do not print secrets in logs.

For Sheets:

- `GOOGLE_SHEETS_SPREADSHEET_ID`
- `GOOGLE_SHEETS_CLIENT_EMAIL`
- `GOOGLE_SHEETS_PRIVATE_KEY`
- `GOOGLE_SHEETS_TAB_NAME=Leads`

For Resend:

- `EMAIL_PROVIDER=resend`
- `EMAIL_FROM`
- `LEAD_NOTIFICATION_EMAIL`
- `RESEND_API_KEY`
- `RESEND_VERIFIED_DOMAIN`
- `RESEND_DOMAIN_VERIFIED=true`

### `provider-error`

For Sheets, verify:

- Google Sheets API is enabled.
- Sheet is shared with the service account email.
- Private key newlines are preserved or escaped as `\n`.
- The tab name matches `GOOGLE_SHEETS_TAB_NAME`.

For Resend, verify:

- sending domain is verified
- API key is active
- sender address belongs to the verified domain

### `429`

The test uses stable demo contact data, so rapid repeated clicks can hit duplicate-submission cooldown. Wait for the cooldown window and retry.

### Email Sent But Not Received

- Check Resend dashboard for delivery status.
- Check spam/quarantine.
- Confirm `LEAD_NOTIFICATION_EMAIL`.
- Confirm exactly one internal notification is expected when `HIGH_PRIORITY_ALERT_EMAIL_ENABLED=false`.

### Sheets Row Missing

- Confirm `sheetsMode=real`.
- Confirm the Sheet tab is named `Leads` or matches `GOOGLE_SHEETS_TAB_NAME`.
- Confirm the service account has edit access.
- Confirm the configured Spreadsheet ID is from the Sheet URL, not the tab gid.

## Safety Rules

- Do not expose admin routes publicly.
- Do not include `/admin/lead-flow` in sitemap.
- Do not paste secrets into browser-visible fields.
- Do not use real client data in the diagnostic test.
- Keep admin authentication requirement before showing real stored leads.

## Daily Check Routine

1. Open `/admin/lead-flow`.
2. Confirm email mode is `live` when production notifications should be active.
3. Confirm Sheets mode is `real` when logging should be active.
4. Run one internal test lead only when needed.
5. Verify the internal lead email reaches the expected mailbox.
6. Verify a single row appears in the Google Sheet.
7. Confirm there are no repeated `429` false positives during normal use.
8. Review Resend events if an email is missing.
9. Review Vercel logs if `config-error` or `provider-error` appears.
10. Check Search Console weekly for indexation and coverage issues.

## Rollback Guide

If Google Sheets has problems but email works:

```env
LEAD_INTEGRATION_MODE=email-only
```

If Resend has delivery or configuration problems:

```env
EMAIL_PROVIDER=mock
LEAD_INTEGRATION_MODE=mock
```

After changing env vars, redeploy and run one internal test from `/admin/lead-flow`.

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

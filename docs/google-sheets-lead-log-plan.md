# Google Sheets Lead Log Plan

## Purpose

Google Sheets is a practical first lead log because it gives ZES a simple backup and review layer before a full CRM or database is connected.

It should be treated as an early operational log, not a permanent CRM and not a secure admin system.

Current state:

- The platform builds a Google Sheets row shape.
- `/api/leads` returns `sheetsMode: "mock"`.
- The adapter has a no-dependency service-account JWT + `fetch` scaffold for future real append.
- No service account is connected by default.
- No row is appended unless `LEAD_INTEGRATION_MODE` requests Sheets and all required server env vars are configured.

## Future Setup Steps

1. Create a dedicated Google Sheet for ZES lead intake.
2. Add a tab named `Leads`.
3. Create a Google Cloud service account.
4. Enable the Google Sheets API in the Google Cloud project.
5. Share the Sheet with the service account email.
6. Add env vars in Vercel or the selected hosting provider.
7. Set `LEAD_INTEGRATION_MODE=email-and-sheets` or `LEAD_INTEGRATION_MODE=sheets-only` in staging.
8. Redeploy the app.
9. Test a form submission with non-real contact data.
10. Verify that a row appears in the Sheet.
11. Review access permissions and privacy wording.
12. Enable in production only after sign-off.

## Required Environment Variables

```env
LEAD_INTEGRATION_MODE=email-and-sheets
GOOGLE_SHEETS_ID=
GOOGLE_SERVICE_ACCOUNT_EMAIL=
GOOGLE_PRIVATE_KEY=
GOOGLE_SHEETS_TAB_NAME=Leads
```

`GOOGLE_PRIVATE_KEY` must preserve newlines. In Vercel, paste the full private key with line breaks when supported, or use escaped `\n` sequences. The adapter normalizes escaped newlines server-side.

Do not commit real values. Store them only in the hosting provider environment settings.

## Suggested Columns

Create the `Leads` tab with this header row:

1. `timestamp`
2. `leadId`
3. `sourceTool`
4. `sourcePage`
5. `inquiryType`
6. `projectType`
7. `company`
8. `name`
9. `email`
10. `phone`
11. `urgency`
12. `score`
13. `priority`
14. `estimatedBudgetRange`
15. `complexity`
16. `riskLevel`
17. `recommendedNextStep`
18. `message`

## Fields To Store

Recommended initial fields:

- lead ID
- received timestamp
- source tool
- source page
- inquiry type
- project type
- company
- contact name
- email
- phone
- urgency
- estimated budget range
- complexity
- risk level
- lead score
- priority
- recommended next action
- recommended services

## Fields Not To Store

Avoid storing:

- patient names
- patient medical information
- clinical records
- unnecessary personal data
- raw analytics payloads
- browser identifiers
- API keys or internal secrets
- overly long free-form messages unless operationally required

Lead forms should continue to discourage users from submitting patient data.

## Privacy Notes

- Restrict Sheet access to approved ZES staff.
- Use a dedicated Sheet, not a personal spreadsheet.
- Review sharing links and disable public access.
- Do not use Sheets as the long-term source of truth once real admin/database workflows exist.
- Document retention and deletion rules before storing real leads.
- Keep analytics payloads free of PII.
- Never expose the service account key to browser code.
- Use only server-side environment variables for `GOOGLE_PRIVATE_KEY`.
- Do not send Sheet row contents to analytics.
- Keep `/admin/leads` protected before any real lead display is connected.

## Testing Plan

1. Keep `LEAD_INTEGRATION_MODE=mock`.
2. Submit a mock lead and confirm `sheetsMode: "mock"`.
3. Optionally run `node scripts/test-lead-api.mjs` while the local app is running.
4. Add test credentials in staging only.
5. Switch staging to `LEAD_INTEGRATION_MODE=email-and-sheets`.
6. Submit a non-real test lead.
7. Confirm row append and email notification.
8. Test provider failure behavior by removing one staging env var.
9. Confirm form submission returns a controlled configuration response, not a stack trace.
10. Confirm production remains mock until approved.

## Rollback Plan

If Sheets logging fails:

1. Set `LEAD_INTEGRATION_MODE=mock`.
2. Keep form submissions available.
3. Use email-only mode as a temporary fallback if email is stable.
4. Review provider errors in server logs without logging full lead payloads.
5. Re-enable Sheets only after credentials and permissions are fixed.

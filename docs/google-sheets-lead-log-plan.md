# Google Sheets Lead Log Plan

## Purpose

Google Sheets is a practical first lead log because it gives ZES a simple backup and review layer before a full CRM or database is connected.

It should be treated as an early operational log, not a permanent CRM and not a secure admin system.

Current state:

- The platform builds a Google Sheets row shape.
- `/api/leads` returns `sheetsMode: "mock"`.
- No Google API dependency is installed.
- No service account is connected.
- No row is appended.

## Future Setup Steps

1. Create a dedicated Google Sheet for ZES lead intake.
2. Create a tab named `Leads`.
3. Create a Google Cloud service account.
4. Share the Sheet with the service account email.
5. Add credentials only to the deployment environment.
6. Enable `LEAD_INTEGRATION_MODE=email-and-sheets` in staging first.
7. Submit test leads with non-real contact data.
8. Confirm rows are appended correctly.
9. Review access permissions and privacy wording.
10. Enable in production only after sign-off.

## Required Environment Variables

```env
LEAD_INTEGRATION_MODE=email-and-sheets
GOOGLE_SHEETS_ID=
GOOGLE_SERVICE_ACCOUNT_EMAIL=
GOOGLE_PRIVATE_KEY=
GOOGLE_SHEETS_TAB_NAME=Leads
```

Do not commit real values. Store them only in the hosting provider environment settings.

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

## Testing Plan

1. Keep `LEAD_INTEGRATION_MODE=mock`.
2. Submit a mock lead and confirm `sheetsMode: "mock"`.
3. Add test credentials in staging only.
4. Switch staging to `LEAD_INTEGRATION_MODE=email-and-sheets`.
5. Submit a non-real test lead.
6. Confirm row append and email notification.
7. Test provider failure behavior.
8. Confirm form submission does not expose stack traces.
9. Confirm production remains mock until approved.

## Rollback Plan

If Sheets logging fails:

1. Set `LEAD_INTEGRATION_MODE=mock`.
2. Keep form submissions available.
3. Use email-only mode as a temporary fallback if email is stable.
4. Review provider errors in server logs without logging full lead payloads.
5. Re-enable Sheets only after credentials and permissions are fixed.


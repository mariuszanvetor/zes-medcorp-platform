# Lead Storage Plan

## Current Mode

Lead storage is currently mock-only.

The platform now has:

- `src/lib/lead-storage.ts` for provider-ready storage contracts
- `src/lib/integrations/mock-lead-storage.ts` for safe mock responses
- `/api/leads` wired to validate, score, prepare CRM/email/Google Sheets payloads and call mock storage

No lead is stored permanently.
No database is connected.
No CRM receives data.
No email is sent.
No Google Sheet is updated.

## Current Mock Behavior

The mock provider:

- Generates a mock lead ID
- Returns a successful storage response
- Does not persist data after the request
- Does not maintain a server-side lead list
- Leaves `/admin/leads` on demo data

This is intentional. Real lead storage must not be enabled before authentication, privacy review and operational ownership are ready.

## Future Storage Options

Supported future provider names are documented in code:

- `vercel-postgres`
- `supabase`
- `neon`
- `airtable`
- `google-sheets`
- `hubspot`
- `custom-webhook`
- `mock`

### Recommended First Real Integration

Recommended first production path:

1. Keep `LEAD_INTEGRATION_MODE=mock` until final launch review
2. Enable internal email notifications in staging
3. Add Google Sheets lead logging in staging
4. Move to `LEAD_INTEGRATION_MODE=email-and-sheets` only after privacy and access review
5. Add authenticated admin, database storage and CRM later

This gives ZES a practical early lead flow without forcing a full database/admin system before operations are ready.

### Recommended Future Database Implementation

After the Email + Google Sheets MVP is stable:

1. Add authentication and role-based admin access
2. Use Postgres-compatible storage: Vercel Postgres or Neon
3. Store validated lead payloads server-side
4. Keep CRM/email delivery resilient and non-blocking
5. Add CRM sync as a separate queue/retry step

## Environment Variables

Current/future variables:

```bash
LEAD_INTEGRATION_MODE=mock
LEAD_STORAGE_PROVIDER=mock
LEAD_DATABASE_URL=
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
GOOGLE_SHEETS_ID=
GOOGLE_SERVICE_ACCOUNT_EMAIL=
GOOGLE_PRIVATE_KEY=
GOOGLE_SHEETS_TAB_NAME=Leads
AIRTABLE_API_KEY=
AIRTABLE_BASE_ID=
```

Rules:

- Keep real secrets out of Git.
- Use server-side env vars for storage keys.
- Never expose service role keys in `NEXT_PUBLIC_*` variables.
- Keep `LEAD_STORAGE_PROVIDER=mock` until real storage is approved.

## What Should Be Stored

Store only data needed for legitimate lead handling:

- Lead ID
- Source tool/page
- Inquiry type
- Project type
- Contact name
- Email
- Phone
- Company
- Urgency
- Message
- Generated summary
- Budget/risk/complexity estimates
- Lead score and priority
- Status
- Internal notes
- Timestamps
- Consent/privacy metadata when implemented

## What Should Not Be Stored

Do not store:

- Patient medical data
- Patient names
- Clinical records
- Unnecessary sensitive personal data
- Browser fingerprinting data
- Raw analytics payloads with personal identifiers
- Secrets or API keys

Lead forms should explicitly discourage users from submitting patient data.

## Privacy And Security Notes

Before real storage:

- Add authentication to `/admin/leads`
- Add server-side authorization checks
- Keep admin routes `noindex, nofollow`
- Keep admin routes out of sitemap
- Add audit logging for lead views and edits
- Define data retention rules
- Document who can access leads
- Avoid logging full lead payloads in production
- Redact personal data from analytics events
- Use HTTPS-only production deployment

## GDPR-Like Considerations

Before launch with real storage:

- Add privacy policy language for lead forms
- Explain why contact/project data is collected
- Explain retention period
- Define deletion/export process
- Restrict access to authorized staff
- Keep data minimization as a rule
- Avoid collecting medical patient information

## Admin Dashboard Requirement

`/admin/leads` must remain demo-only until:

- Authentication exists
- Real storage exists
- Access controls exist
- Audit logging exists
- Privacy/security review is complete

The current dashboard must not be connected to real data without these controls.

## Backup And Export

For Postgres storage:

- Enable automated backups
- Document restore process
- Export only with access control
- Redact personal data where possible
- Keep CRM sync separate from backup strategy

For temporary tools such as Google Sheets or Airtable:

- Use least-privilege access
- Review sharing settings
- Avoid patient or sensitive data
- Treat them as transitional, not long-term storage

## Future Migration Path

Recommended sequence:

1. Keep mock storage live in production
2. Add authentication and admin protection
3. Add Postgres schema and migrations
4. Implement real `LeadStorageProvider`
5. Add safe server-side lead listing for admin
6. Add status updates and notes
7. Add CRM/email queue integration
8. Add export/backup process
9. Run privacy/security review before using real lead data

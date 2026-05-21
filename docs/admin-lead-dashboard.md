# Admin Lead Dashboard Prototype

## Current Scope

`/admin/leads` is an internal frontend prototype for reviewing future ZES MEDCORP leads.

Current behavior:

- Uses demo/mock data from `src/data/demo-leads.ts`
- Does not read from `/api/leads`
- Does not store leads
- Does not connect to CRM
- Does not send email
- Does not include authentication or user roles
- Remains `noindex, nofollow`
- Is not included in the sitemap
- Is not linked from the public header navigation

The page is intended to model how a future lead qualification command center could work.

## Dashboard Capabilities

The prototype currently includes:

- Lead overview metrics
- Qualification funnel by stage
- Priority queue
- Source analysis
- Next action board
- Project type breakdown
- Urgency and risk breakdown
- Frontend-only filtering and sorting
- Lead score, readiness score, priority, urgency, risk and budget display
- Lead detail panel with summary, contact info, source attribution, recommended services, missing information, next action, follow-up outline and internal notes

## Demo Data Rules

Demo leads must remain fictional.

Do not add:

- Real client names
- Real contact details
- Real project details
- Real emails or phone numbers
- Real commercial opportunities

Use clear demo naming such as `Demo Healthcare Group` and reserved `demo.invalid` email addresses.

## Future CRM Integration Path

A future implementation can connect the dashboard to the lead architecture created earlier:

1. Receive leads through `/api/leads`
2. Validate and score payloads with `src/lib/forms.ts` and `src/lib/lead-scoring.ts`
3. Build CRM payloads with `src/lib/integrations/crm-adapter.ts`
4. Send notifications through `src/lib/integrations/email-adapter.ts`
5. Persist leads in a database
6. Render real lead data in `/admin/leads`
7. Add status updates, owner assignment and activity history

Possible CRM targets:

- HubSpot
- Pipedrive
- Zoho
- Custom CRM
- Webhook-based workflow

## Authentication Requirement

Before using real lead data, `/admin/leads` must be protected.

Minimum future requirements:

- Authentication
- Role-based access
- Server-side authorization checks
- Audit log for lead views and updates
- Session timeout
- No public indexing

The current prototype must not be treated as a secure admin system.

## Lead Storage Requirement

Before production use, leads need persistent storage.

Recommended future data model:

- Lead ID
- Source tool/page
- Contact
- Company
- Project profile
- Generated summary
- Budget/risk/complexity estimates
- Lead score and priority
- Status
- Owner
- Notes
- Activity timeline
- Created/updated timestamps

## Privacy And Security Notes

- Do not send personally identifiable information to analytics.
- Do not expose admin pages in public navigation.
- Keep `/admin/leads` out of the sitemap.
- Keep `robots: noindex, nofollow`.
- Avoid storing medical patient data.
- Add data retention rules before storing real leads.
- Add consent/privacy language before real production capture.

## Launch Order For Real Admin

Recommended order:

1. Add authentication and route protection
2. Add database schema and lead persistence
3. Connect real `/api/leads` storage
4. Add CRM/email adapter configuration
5. Add admin status updates and owner assignment
6. Add audit logging
7. Add export/reporting only after privacy review

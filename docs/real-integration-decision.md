# Real Integration Decision

## Recommendation

The first real lead integration should be **Email + Google Sheets**.

This gives ZES a simple operational flow:

1. The team receives an internal email when a lead is submitted.
2. The lead is logged in a controlled Google Sheet for early review and backup.
3. CRM, database storage and authenticated admin workflows can be added later.

Current implementation remains mock-only. No email is sent and no Sheet is updated.

## Option A: Email-Only Lead Notification

Best for: MVP validation and fastest operational start.

Pros:
- Fastest to implement.
- Easy for the ZES team to monitor.
- No admin dashboard or database required.
- Low technical overhead.

Cons:
- Leads can be missed, forwarded or lost in inboxes.
- No structured reporting.
- No durable operational log.
- Harder to track status and follow-up ownership.

Setup complexity: Low  
Risk level: Low, if recipients and privacy wording are approved.

## Option B: Email + Google Sheets

Best for: early launch with a simple backup/log.

Pros:
- Email gives fast notification.
- Sheets creates a lightweight structured log.
- Easy for non-technical staff to review.
- Useful before a real CRM is chosen.
- Low cost and low infrastructure complexity.

Cons:
- Sheets is not a long-term CRM or secure admin system.
- Sharing permissions must be tightly controlled.
- Not ideal for sensitive data or high lead volume.
- Requires careful service account setup.

Setup complexity: Low to medium  
Risk level: Medium, mainly because spreadsheet access must be controlled.

Recommendation: **Use this first after privacy review.**

## Option C: Supabase / Postgres

Best for: future authenticated admin dashboard and durable internal storage.

Pros:
- Proper database-backed source of truth.
- Better auditability and reporting.
- Works well with authenticated admin workflows.
- Scales beyond early launch.

Cons:
- Requires schema design, migrations and backups.
- Requires admin authentication before real data is visible.
- More operational responsibility than Sheets.

Setup complexity: Medium  
Risk level: Medium, depending on auth, backups and access controls.

## Option D: HubSpot CRM

Best for: sales pipeline management and commercial follow-up.

Pros:
- Strong pipeline, ownership and deal management.
- Good long-term sales visibility.
- Can support lifecycle stages and follow-up automation.

Cons:
- Requires CRM process decisions before integration.
- Can be overkill before lead volume is validated.
- API mapping and privacy settings need careful setup.
- Failed CRM sync should not block lead submission.

Setup complexity: Medium to high  
Risk level: Medium, mostly around process and data governance.

## Option E: Airtable

Best for: simple operational review with a richer interface than Sheets.

Pros:
- Easy tabular review and filtering.
- More structured than a simple spreadsheet.
- Good for lightweight operations.

Cons:
- Still not a full CRM or secure admin system.
- Requires access governance.
- API keys and base permissions must be protected.
- May become transitional technical debt.

Setup complexity: Low to medium  
Risk level: Medium.

## Decision

Use this sequence:

1. Keep production in `LEAD_INTEGRATION_MODE=mock` until final review.
2. Enable email notification first in staging.
3. Add Google Sheets logging in staging.
4. Move to `LEAD_INTEGRATION_MODE=email-and-sheets` only after privacy, recipient and access review.
5. Add CRM/database/auth later when operational volume justifies it.

## Mode Mapping

| Mode | Meaning |
| --- | --- |
| `mock` | Current default. Prepare all payloads but make no external calls. |
| `email-only` | Future mode for internal email notifications only. |
| `sheets-only` | Future mode for Google Sheets logging only. |
| `email-and-sheets` | Recommended first real launch flow. |
| `crm` | Future CRM routing mode after sales process is defined. |


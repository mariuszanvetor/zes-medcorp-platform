# Lead Integration Plan

This document describes the current mocked lead-routing layer and the future path for CRM, email notifications, lead scoring and review workflows.

## Current Mocked State

- `/api/leads` validates incoming lead payloads and returns a mock response.
- No leads are stored in a database.
- No CRM calls are made.
- No emails are sent.
- The endpoint now builds future CRM and email payloads in memory only.
- The admin lead review page uses demo data only and is not part of public navigation.

## Lead Scoring

Lead scoring is deterministic and defined in `src/lib/lead-scoring.ts`.

Signals currently used:

- Source tool, such as Proposal Builder, Service Diagnostic or calculators.
- Inquiry type and project type.
- Urgency.
- Estimated budget range.
- Complexity.
- Risk level.
- Generated summary.
- Recommended services when available.
- Technical keywords such as RMN, CT, RX, CNCAN, RF shielding, IVD, laboratory, service and downtime.

Score range is `0-100`.

Priority categories:

- Low priority
- Medium priority
- High priority
- Critical / immediate opportunity

## Future CRM Options

The placeholder CRM adapter is in `src/lib/integrations/crm-adapter.ts`.

Supported future directions:

- HubSpot
- Pipedrive
- Zoho
- Custom CRM
- Webhook-based routing

Required environment variables later:

- `CRM_PROVIDER`
- `CRM_API_KEY`
- `CRM_WEBHOOK_URL`

Recommended CRM rollout:

1. Keep mock mode active in staging.
2. Add provider-specific adapter behind the same contract.
3. Send only validated leads.
4. Add idempotency keys before retries.
5. Add logging and error monitoring.
6. Add consent and privacy review before production.

## Future Email Options

The placeholder email adapter is in `src/lib/integrations/email-adapter.ts`.

Supported future directions:

- Resend
- SendGrid
- SMTP
- Gmail Workspace
- Internal notification workflow

Required environment variables later:

- `EMAIL_PROVIDER`
- `EMAIL_API_KEY`
- `LEAD_NOTIFICATION_EMAIL`

Recommended email rollout:

1. Start with internal notifications only.
2. Add confirmation emails after legal/privacy copy is approved.
3. Add provider-specific delivery and bounce handling.
4. Add rate limiting before production exposure.

## Privacy Notes

- Analytics events must not include PII.
- Do not send names, emails, phone numbers, company names or free-text messages to analytics.
- CRM and email payloads can include contact details only after the lead form is intentionally submitted.
- No lead database exists in this phase.
- The admin prototype uses demo data only.

## Launch Order

1. Keep the current mocked endpoint and scoring in production-safe mode.
2. Review lead scoring thresholds with sales and service owners.
3. Configure internal email notification in staging.
4. Add CRM adapter in staging.
5. Add logging, monitoring, consent copy and rate limiting.
6. Enable production CRM/email routing.
7. Add persistent storage only after auth, retention and access-control requirements are defined.

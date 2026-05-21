# Security And Privacy Checklist

This checklist keeps the platform safe while lead capture, email and storage move from mock mode to real operation.

## Current Safety State

- No authentication is active.
- No real database is connected.
- No real CRM is connected by default.
- No real email is sent by default.
- `/admin/leads` is demo-only and must not display real lead data before authentication.

## Personal Data Rules

- Do not send names, emails, phone numbers, company names or free-text messages to analytics.
- Do not log full lead payloads in production.
- Do not store patient data.
- Do not request medical diagnosis, patient identity or clinical records through public forms.
- Keep server-only secrets unprefixed by `NEXT_PUBLIC_`.

## Forms And Leads

- Required fields must validate before submission.
- Lead success states must explain that requests are preliminary.
- Forms should include a clear note not to transmit patient medical data.
- Mock API responses must not return PII.
- Real lead storage must not be activated before access control exists for admin review.

## Analytics

- GA/GTM IDs are optional.
- Events must stay category-based:
  - source page
  - source tool
  - project type
  - risk level
  - complexity
  - budget range
  - urgency
- Do not create custom GTM variables that read form values containing PII.

## Email

- Internal notification emails may include lead details only after `LEAD_NOTIFICATION_EMAIL` is approved.
- User confirmation emails should stay disabled until privacy text and consent wording are reviewed.
- Rollback path must remain `EMAIL_PROVIDER=mock`.

## Google Sheets

- Use a dedicated service account.
- Share only the target Sheet with the service account.
- Store only fields needed for operational lead review.
- Avoid storing sensitive attachments or patient data.
- Rollback path must remain `LEAD_INTEGRATION_MODE=mock`.

## Admin

- Keep `/admin/leads` noindex/nofollow.
- Do not link admin pages from public navigation.
- Add authentication before real data display.
- Add role-based permissions before status updates, notes, exports or analytics views.

## Legal Review

- Review legal pages before real launch.
- Confirm company details are accurate.
- Confirm cookie and analytics language matches active integrations.
- Confirm calculators, proposal PDFs and planning tools are described as preliminary and orientative.

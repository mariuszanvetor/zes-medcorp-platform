# Admin Lead Lifecycle

This document describes the current internal demo lifecycle for lead intelligence review. The admin layer is still prototype-only: no CRM, no database persistence, no real admin data source and no real document parsing are active.

## Current lifecycle

1. AI Discovery collects deterministic project context such as domain, project stage, missing information, risk, complexity and recommended next action.
2. Mock Document Context may add descriptor-only signals such as document type, likely target flow, missing information and privacy warnings. No file is uploaded or parsed.
3. Proposal Builder can import local discovery context and produce preliminary proposal intelligence, assumptions and validation needs.
4. Project Intake can import local discovery context and collect structured project readiness information.
5. `/api/leads` normalizes the submitted context into compact lead intelligence fields.
6. Internal email and Google Sheets scaffolds receive only compact summaries when those integrations are active.
7. `/admin/leads` displays deterministic demo leads for review, including readiness, risk, complexity, source context, intelligence summary and mock document context where present.
8. `/admin/lead-flow` shows integration mode diagnostics and the mock-safe lifecycle timeline.

Phase 75G adds `ZES Guide` as a visible lead source in demo review. These leads represent inline conversational captures from homepage.

Phase 76A adds runtime visibility for ZES AI:

- `real`: server-side OpenAI response was accepted and merged into the ZES turn;
- `fallback`: AI was requested, but ZES returned to deterministic guidance because the provider response failed, timed out or could not be validated;
- `mock`: AI is disabled or missing configuration, so ZES remains deterministic.

## Phase 71L mock action workflow

`/admin/leads` now includes a deterministic mock admin workflow for selected demo leads.

Available client-side actions:

- mark as reviewed;
- assign follow-up type;
- choose next action;
- mark as ready for offer;
- mark as needs clarification;
- mark as high priority.

Mock workflow statuses:

- New;
- Reviewed;
- Needs clarification;
- Ready for offer;
- High priority.

The workflow state is browser memory only. It is not written to an API, database, CRM, email provider or Google Sheets. Reloading the page resets the workflow state.

The action history panel records:

- local timestamp;
- lead company/source label;
- workflow status;
- follow-up type;
- selected next action.

It intentionally avoids PII-heavy data and does not include email, phone, raw notes or document contents.

## Fields that should appear in admin review

- lead source and source page;
- ZES AI mode when the source is `ZES Guide`;
- ZES AI intent when the source is `ZES Guide`;
- project domain or project type;
- readiness score;
- risk and complexity;
- lead score and priority;
- intelligence summary;
- recommended next action;
- missing information;
- validation needs;
- recommended services;
- mock document context when available.

## Demo examples included

- AI Discovery lead with mock document context.
- ZES Guide service lead with high urgency.
- ZES Guide project lead with ofertare intent.
- Proposal Builder lead.
- Project Intake lead.
- High urgency service/maintenance lead.
- Equipment offer/commercial lead.

All examples use fake demo data only.

## Mock-only boundaries

- No real CRM is connected.
- No real lead database is connected.
- Admin lead rows are demo data, not production lead storage.
- Mock document context is descriptor-only and contains no uploaded file content.
- Admin routes remain noindex and excluded from sitemap.

## Future integration path

1. Keep current email and Sheets integrations as the first live notification/logging layer.
2. Add stronger admin authentication before showing real lead records.
3. Add a server-side lead store with deletion/export rules.
4. Map lead intelligence fields into CRM properties.
5. Add real document upload/parsing only after privacy, retention and security rules exist.

## QA routine

1. Open `/admin/lead-flow` and confirm the lifecycle timeline is visible.
2. Run the safe internal test only when duplicate cooldown will not interfere.
3. Confirm the response summary shows integration, ZES AI, email, Sheets and storage modes.
4. Open `/admin/leads`.
5. Select the AI Discovery demo lead and verify mock document context appears.
6. Select Proposal Builder, Project Intake, service and equipment demo leads.
7. Confirm each ZES Guide lead displays source context, AI mode, intent, readiness, risk, complexity and recommended next action.
8. Confirm no secrets, real customer data or raw document contents appear.
9. Apply each mock action status to a selected lead.
10. Confirm the list badge updates locally and the action appears in local review history.
11. Reload the page and confirm the mock workflow resets, proving no persistence was added.

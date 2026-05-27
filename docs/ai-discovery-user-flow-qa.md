# AI Discovery User Flow QA

Phase 71G verifies the end-to-end planning journey:

AI Discovery -> Proposal Builder -> PDF -> lead submission -> email / Sheets / admin intelligence.

The flow remains deterministic and preliminary. It does not use a real AI API, database, CRM, authentication changes or active document upload.

## Phase 75C conversational QA focus

Phase 75C upgrades AI Discovery from form-like sections to a conversational guided planning experience.

Extra QA checks:

1. Confirm assistant guidance cards and project context cards are visible at the top of `/ai-discovery`.
2. Confirm scenario-aware blocks appear when a scenario is passed, for example `/ai-discovery?scenario=ct-clinic` and `/ai-discovery?scenario=mri-room`.
3. Confirm scenario blocks show concerns, likely blockers, recommended questions and suggested services.
4. Confirm sidebar shows project readiness, commercial readiness, risk and complexity indicators.
5. Confirm compliance/funding hints stay preliminary and never claim guaranteed approvals.
6. Confirm copy remains professional and sales-aware without aggressive language.

## Phase 71H visual QA notes

Automated in-app browser QA was attempted against the local production server on May 27, 2026, but the Codex browser pane was not available in this desktop session. The browser connection returned `No active Codex browser pane available`.

Because of that limitation, Phase 71H validation uses:

- route smoke checks against the local production server;
- mock API submissions for AI Discovery, Proposal Builder and Project Intake source payloads;
- source-level review of the handoff UI, context import banners and lead success copy;
- this manual visual QA checklist for the next browser pass.

Manual browser pass still required:

1. Open `/ai-discovery` and confirm the two-column workspace stacks cleanly on mobile.
2. Answer a few guided questions, click `Continua cu ipoteze preliminare` and confirm the status copy changes.
3. Click `Continua spre Proposal Builder` and confirm `Context preluat din AI Discovery` appears.
4. Confirm `Ignora contextul` is visible and does not feel destructive or hidden.
5. Repeat the same handoff into `/project-intake` and confirm `Context AI Discovery` appears.
6. Submit mock/test leads only and confirm success UI appears for HTTP 200 with mock/live modes.
7. Check `/admin/lead-flow` and `/admin/leads` for readable status panels, no public navigation links and no secret exposure.

## Phase 71I document parsing QA notes

Phase 71I is architecture-only. The correct user-facing behavior is still:

- AI Discovery may suggest useful documents;
- documents remain optional;
- no active upload field is exposed;
- no upload endpoint is active;
- no OCR, AI parsing or document persistence is active;
- users can continue with assumptions.

Safe QA checks:

1. Open `/ai-discovery` and confirm the document block says upload is not active.
2. Confirm Proposal Builder and Project Intake do not require documents.
3. Confirm lead submissions do not include raw file content.
4. Confirm `src/lib/ai-intelligence/document-intelligence.ts` mock helpers classify file descriptors only and do not read files.
5. Confirm admin routes remain noindex and absent from sitemap.

Future browser QA should verify that any later file picker includes accepted types, size copy, privacy copy and a clear "continue without documents" path before real upload is enabled.

## Phase 71J mock document UI QA notes

Phase 71J makes document parsing visible as a mock/demo section only.

Expected behavior:

- `/ai-discovery` shows `Document parsing mock`.
- The panel offers descriptor buttons only, not a real file input.
- Selecting a descriptor shows detected document type, mock signals, target flows, missing information, warnings and suggested next action.
- The copy clearly says no upload, no OCR, no AI parsing and no file storage are active.
- Continuing to Proposal Builder or Project Intake stores only compact `mockDocumentContext` in local browser handoff.
- Lead submission may include compact mock document summary, not file content.
- `/admin/lead-flow` shows a mock document visibility panel with demo-only labels.

Regression checks:

1. Search source for `type="file"` and confirm no production upload control was added.
2. Confirm `/api/leads` still receives JSON lead payloads only.
3. Confirm no new upload API route exists.
4. Confirm admin pages remain noindex and absent from sitemap.
5. Confirm mock document warnings mention privacy and preliminary use.

## Tested flows

### A. Direct AI Discovery lead

Expected behavior:

- `/ai-discovery` loads as a public planning workspace.
- User can answer only a few guided questions.
- User can choose `Continua cu ipoteze preliminare`.
- Documents are clearly optional.
- Lead form submits to `/api/leads`.
- Success state appears for HTTP 200 with `emailMode=mock/live`, `sheetsMode=mock/real`, `storageMode=mock`.
- Lead payload includes compact discovery intelligence: domains, stage, confidence, missing info count, risk, complexity and recommended next action.

### B. AI Discovery -> Proposal Builder

Expected behavior:

- Discovery context is saved locally before navigation.
- Proposal Builder shows `Context preluat din AI Discovery`.
- Imported context can be edited or ignored.
- Generated proposal includes proposal intelligence.
- PDF export includes imported context and proposal intelligence.
- Lead submission source becomes `proposal-builder-from-discovery` when context exists.

### C. AI Discovery -> Project Intake

Expected behavior:

- Project Intake detects local context.
- Safe fields are prefilled.
- User can edit or ignore imported data.
- Lead summary includes compact discovery context.
- Submission source becomes `project-intake-from-discovery`.

### D. Direct Proposal Builder

Expected behavior:

- Proposal Builder works without discovery context.
- Proposal intelligence still appears, based on form data.
- PDF export remains deterministic and local.
- Lead submission source remains `proposal-builder`.

### E. Direct Project Intake

Expected behavior:

- Intake wizard works without discovery context.
- Result summary and readiness score appear.
- Lead submission source remains `project-intake`.

## Lead success and error states

Success should display when:

- HTTP status is 200;
- API returns `success: true` / `ok: true`;
- email mode is `mock`, `live` or `real`;
- Sheets mode is `mock` or `real`;
- storage mode is `mock`.

Error should display when:

- HTTP response is non-200;
- validation errors are returned;
- duplicate cooldown returns 429;
- provider/config errors are fatal for a requested integration;
- API explicitly returns `success: false` or `ok: false`.

429 copy should tell the user to wait briefly before retrying.

## PDF QA checklist

- Proposal ID and version appear.
- Company details are present.
- Disclaimer is present.
- Imported discovery context appears only when context exists.
- Proposal intelligence is compact and readable.
- PDF remains a preliminary technical planning document.
- Filename remains project-specific where possible.

## Mobile QA checklist

Check these routes at mobile width:

- `/ai-discovery`
- `/proposal-builder`
- `/project-intake`
- result panels
- intelligence panels
- lead forms
- PDF buttons

Look for:

- no horizontal overflow;
- buttons wrapping cleanly;
- badges not forcing layout width;
- sticky panels becoming normal stacked content;
- readable lead forms.

## Admin / email / Sheets consistency

The same deterministic intelligence should appear in:

- `/api/leads` safe response summary;
- internal lead notification email;
- Google Sheets row fields;
- `/admin/leads` demo/review dashboard;
- `/admin/lead-flow` test result summary.

Google Sheets manual header update is required before production Sheets activation with Phase 71F fields. See `docs/google-sheets-lead-log-plan.md`.

## Admin lifecycle QA

Phase 71K adds an internal lifecycle view so the team can review how a lead moves from discovery to admin triage.

Check `/admin/lead-flow`:

- lifecycle timeline is visible;
- AI Discovery, Proposal Builder, Project Intake and Mock Document Context are listed;
- readiness, risk, complexity and domain are framed as demo intelligence;
- integration modes remain safe and do not expose secrets.

Check `/admin/leads`:

- demo leads are clearly labeled mock/demo;
- AI Discovery demo lead shows mock document context;
- Proposal Builder, Project Intake, service and equipment leads show source context and intelligence summary;
- recommended next action and missing information are easy to find.
- mock admin workflow label is visible;
- local status badges include New, Reviewed, Needs clarification, Ready for offer and High priority;
- changing follow-up type or next action creates a local action history entry;
- action history avoids email, phone, raw notes and document contents;
- reloading the page resets workflow state.

No admin screen should show raw document content, real customer data, API keys or private env values.

## Production test checklist

1. Deploy and confirm Vercel status is Ready.
2. Open `/ai-discovery`, `/proposal-builder`, `/project-intake`, `/admin/lead-flow`, `/admin/leads`.
3. Submit one AI Discovery test lead.
4. Submit one Proposal Builder test lead.
5. Submit one Project Intake test lead.
6. Confirm frontend success messages.
7. Confirm internal email arrives if Resend is active.
8. Confirm one Sheet row per test if Sheets is active.
9. Confirm no customer confirmation email is sent.
10. Confirm no PII appears in analytics events.

## Known limitations

- No active file upload or document parsing yet.
- Discovery context handoff is local browser storage, not a saved account/session.
- PDF diacritics remain limited by the lightweight browser PDF generator.
- Admin review remains demo/prototype until stronger auth and real storage exist.
- Lead intelligence is deterministic and preliminary, not a final engineering or regulatory assessment.

## Rollback notes

If lead integrations misbehave:

```env
LEAD_INTEGRATION_MODE=email-only
```

If email delivery misbehaves:

```env
EMAIL_PROVIDER=mock
LEAD_INTEGRATION_MODE=mock
```

Redeploy after env changes and run one controlled internal test from `/admin/lead-flow`.

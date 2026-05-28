# Lead Intelligence

Phase 71F adds deterministic lead intelligence for internal review. It does not add a database, CRM, real AI API or new authentication.

## Model

The normalized model lives in:

- `src/lib/ai-intelligence/lead-intelligence.ts`

It accepts:

- lead payload;
- lead scoring result;
- recommended services when available.

It returns:

- `leadSource`
- `sourceContext`
- `projectDomain`
- `projectStage`
- `readinessScore`
- `urgencyScore`
- `complexityLevel`
- `riskLevel`
- `missingInformationSummary`
- `validationNeeds`
- `recommendedServices`
- `recommendedCalculators`
- `recommendedNextAction`
- `internalSummary`
- `followUpPriority`
- `followUpType`
- `commercialIntent`
- `confidenceLevel`

## Source compatibility

The model normalizes leads from:

- ZES Guide conversation (homepage inline capture);
- AI Discovery;
- Proposal Builder;
- Proposal Builder from AI Discovery;
- Project Intake;
- Project Intake from AI Discovery;
- calculators;
- radiology planner;
- service diagnostic;
- standard contact forms.

Simple contact forms still work. They receive lower confidence and a qualification-oriented next action.

ZES Guide leads can include extra metadata from conversation context:

- detected intent/path;
- readiness/maturity label;
- recommended follow-up;
- selected services;
- missing info summary;
- optional city/equipment-model/project-type conversation fields.
- `aiMode` and `aiModel` runtime labels;
- `fileAnalysisIncluded` and compact file-analysis summary;
- preliminary request/offer brief summary.

## API behavior

`/api/leads` enriches every valid lead before email, storage mock and Google Sheets processing.

The safe client response can include:

- score;
- priority;
- readiness score;
- risk level;
- complexity level;
- recommended next action;
- integration modes.

It does not return full raw notes, secrets or provider payloads.

## Email usage

Internal lead notifications include a compact lead intelligence section:

- source context;
- project domain;
- stage;
- readiness;
- urgency;
- complexity;
- risk;
- commercial intent;
- confidence;
- follow-up type;
- missing information;
- validation needs;
- suggested services;
- suggested calculators;
- recommended next action.

Customer confirmation emails remain disabled unless explicitly enabled in a future phase.

When ZES file analysis is present, include only compact summary fields, not raw file content.

## Google Sheets usage

The Sheets row now includes intelligence fields in addition to the previous lead fields:

- readiness score;
- intelligence complexity;
- intelligence risk;
- intelligence recommended next action;
- suggested services;
- missing info;
- source context;
- follow-up priority;
- follow-up type.

Manual Sheet headers must be updated before using real Sheets logging in production.

## Admin usage

`/admin/leads` remains demo-only, but the review panel now shows:

- follow-up type;
- commercial intent;
- confidence;
- source context;
- validation needs;
- recommended calculators.

This mirrors how future real lead data can be reviewed once stronger auth and persistent storage exist.

## Privacy boundaries

- Do not send PII to analytics.
- Do not include API keys, env vars or provider payloads in client responses.
- Do not store patient data.
- Do not store raw uploaded files in this phase.
- Do not expose real lead data in admin without stronger authentication.
- Keep intelligence deterministic and preliminary.
- Avoid legal, regulatory or engineering certainty language.

## Future persistence boundary

When local handoff moves to server persistence, lead intelligence should store a compact review summary, not the full browser context. Recommended persisted fields:

- lead source and source context;
- project domain and stage;
- readiness, urgency, complexity and risk;
- missing information summary;
- validation needs;
- recommended services and next action;
- follow-up priority and follow-up type;
- confidence level;
- linked discovery context ID or proposal snapshot ID where available.

Avoid storing:

- raw long notes unless explicitly submitted by the user as part of a lead;
- patient data or clinical records;
- raw uploaded plans/photos before consent, authentication and retention rules exist;
- provider error payloads;
- analytics identifiers that can identify the person.

Migration path:

1. Continue sending compact intelligence through `/api/leads`.
2. Add server-side context IDs after authentication and data retention rules exist.
3. Map the compact lead intelligence into Google Sheets/CRM fields.
4. Keep admin review behind stronger auth before showing real stored leads.
5. Add deletion/export processes before storing documents or long-term project records.

## Future document-derived signals

Phase 71I prepares document parsing in mock mode only. Phase 71J makes mock document context visible in AI Discovery and `/admin/lead-flow`. Lead Intelligence should not assume any real document parsing is active yet.

When a future parsing layer is enabled, Lead Intelligence may consume only compact reviewed signals:

- document type submitted;
- plans available;
- equipment sheet available;
- equipment list/table available;
- site photos available;
- missing information labels;
- validation needs;
- parser confidence and warnings.

Do not include:

- raw document text;
- file contents;
- screenshots or image data;
- patient data;
- unreviewed OCR output;
- full filenames if they may contain personal or sensitive information.

Email, Sheets and future CRM should receive document-derived summaries only after the user submits a lead and accepts the parsed context.

Current mock document summaries may include:

- document type descriptor such as PDF, DOCX, XLSX or image;
- mock extraction signals;
- missing information;
- privacy warnings;
- suggested next action;
- target flows.

They must not include:

- actual file bytes;
- raw OCR text;
- real uploaded filenames from users;
- private document content.

## QA expectations

- AI Discovery leads include domain, stage, confidence, missing info count, risk, complexity and next action.
- Proposal Builder leads include proposal intelligence summary and readiness.
- Project Intake leads include readiness, risk, complexity and missing information.
- Calculator leads still receive deterministic domain/risk/readiness inference even without discovery context.
- `/admin/lead-flow` should show the safe response fields without exposing raw notes.

## Admin lifecycle visibility

Phase 71K adds a clearer demo lead lifecycle across `/admin/lead-flow` and `/admin/leads`.

The admin monitor should show how context moves through:

- AI Discovery;
- mock document context;
- Proposal Builder;
- Project Intake;
- admin review.

The demo review center should make these fields visible without connecting real storage:

- source context;
- project domain;
- readiness score;
- risk and complexity;
- intelligence summary;
- recommended next action;
- missing information;
- mock document context when available.

See `docs/admin-lead-lifecycle.md` for the internal QA routine and future CRM/storage path.

Phase 71L adds local-only admin action controls on `/admin/leads`. These controls let the reviewer simulate review status, follow-up type and next action selection, then record a timestamped local history item. This is intentionally not a source of truth for Lead Intelligence. It is a UI rehearsal for a future CRM/storage workflow.

Lead Intelligence rules for this mock workflow:

- do not treat local workflow status as persisted lead status;
- do not send workflow actions to analytics;
- do not trigger email, Sheets or CRM;
- do not include PII-heavy fields in the action history;
- keep action labels deterministic and review-oriented.

## Future CRM mapping

When CRM integration is added, map these fields into internal CRM properties:

- readiness score;
- urgency score;
- risk level;
- complexity level;
- commercial intent;
- follow-up type;
- recommended services;
- recommended next action;
- source context.

The CRM should store a compact summary, not raw long notes or sensitive documents.

## Phase 76D ZES payload enrichment

ZES lead submissions now include compact workflow metadata in `metadata`:

- `conversationPhase`
- `leadCompletionStatus`
- `collectedFields`
- `missingFields`
- `closingSummary`
- `fileAnalysisIncluded`
- `fileAnalysisSummary`
- `nextBestAction`
- `aiMode` and `aiModel`

These fields are deterministic and compact. They are used for internal triage and should not be exposed to public analytics as raw conversation data.

# ZES Guide Agent

`ZES Guide` is the public conversational sales and project guide used as the main above-the-fold entry on homepage (`/#zes-guide`).

It is designed as a medical infrastructure sales engineer style assistant:

- technical and consultative;
- commercial-aware;
- calm and enterprise-oriented;
- deterministic and mock-safe.

## Current mode

Phase 76A introduces a hybrid runtime:

- server-side OpenAI integration is available through `/api/zes-guide`;
- fallback to the deterministic engine remains mandatory;
- no client-side API key exposure;
- no streaming;
- no backend conversation persistence;
- no CRM/database/auth coupling;
- no upload/OCR/parsing activation.

Environment controls:

- `ZES_AI_ENABLED=true|false`
- `ZES_AI_MODEL=gpt-5.4` (recommended default)
- `OPENAI_API_KEY=...`

Runtime modes:

- `real`: server-side OpenAI returned validated structured JSON;
- `fallback`: OpenAI was requested but failed validation or request handling, so ZES used the deterministic engine;
- `mock`: AI is disabled or missing a key, so ZES uses the deterministic engine directly.

Phase 76B/76C extends the same flow with in-conversation file analysis and preliminary request generation:

- users can attach files directly in ZES chat;
- ZES returns a file analysis summary in the same conversation;
- high-intent sessions can produce a compact preliminary request/offer brief before lead submission;
- lead capture remains inline and uses `/api/leads`.

## Architecture

- response engine: `src/lib/zes-guide-engine.ts`
- AI adapter and fallback merge: `src/lib/zes-ai.ts`
- server route: `src/app/api/zes-guide/route.ts`
- file analysis adapter: `src/lib/zes-file-analysis.ts`
- file analysis route: `src/app/api/zes-guide/file-analysis/route.ts`
- UI: `src/components/ai/ZESGuide.tsx`
- homepage integration: `src/components/sections/ZESGuideSection.tsx`

## Server-side AI route

`/api/zes-guide` accepts:

- current user message;
- current deterministic conversation state;
- short recent history (client-supplied, not persisted server-side).

The route:

1. computes a deterministic fallback turn first;
2. checks `ZES_AI_ENABLED`, `OPENAI_API_KEY` and `ZES_AI_MODEL`;
3. if enabled, calls OpenAI server-side only;
4. requests structured JSON via the Responses API;
5. sanitizes the AI output;
6. merges AI phrasing and structured guidance back onto the deterministic scaffold;
7. falls back safely if the AI call or schema parsing fails.

No raw conversation is stored by the application.

## Phase 75F unified flow

Phase 75F makes ZES the single conversational front door:

- users start from one input and one conversation;
- ZES asks follow-up questions based on detected scenario;
- ZES collects missing information progressively;
- ZES surfaces compact lead summary after each assistant turn;
- existing tools stay active, but are presented as internal capabilities of ZES.

The user is not required to choose AI Discovery vs Proposal Builder vs Project Intake upfront.

## Phase 75G lead conversion layer

Phase 75G extends the conversation with inline lead capture for high-intent requests.

Trigger patterns:

- urgent service/maintenance;
- CT/RMN project with enough context;
- equipment quote requests;
- funding-related projects with commercial maturity.

Inline capture panel collects compact business-contact data:

- name;
- company/clinic;
- phone;
- email;
- city;
- short description;
- urgency;
- optional equipment/model (service path);
- optional project type (project path).

Submission stays on existing `/api/leads` mock-safe flow and includes:

- source `ZES Guide`;
- detected intent/path;
- readiness/maturity;
- recommended follow-up;
- selected services;
- missing information summary.

## Supported intent buckets

- CT project
- RMN/MRI project
- radiology modernization
- service/maintenance
- laboratory/IVD
- shielding/radioprotection
- CNCAN-related guidance
- funding/european funds
- equipment offer intent
- project planning
- general unknown inquiry

### Scenario paths explicitly covered

- Service / maintenance
- CT / radiology project
- RMN / MRI project
- Funding / european funds
- Equipment offer

## Deterministic response shape

Each response includes:

- short consultative answer;
- missing questions;
- recommended services;
- suggested workflows/tools;
- commercial opportunity type;
- lead readiness;
- urgency and maturity signal;
- next best action;
- CTA list;
- compact lead intent summary.

Additionally, each conversation turn can include:

- capability chips (`Planificare proiect`, `Ofertare`, `Service triage`, `CNCAN`, etc.);
- document request language with explicit demo-only limitation;
- closing prompts when intent/readiness is high.

## Structured AI output shape

When server-side AI is active, ZES requests structured JSON with:

- `reply`
- `intent`
- `urgency`
- `projectType`
- `domain`
- `missingInfo`
- `recommendedServices`
- `nextBestAction`
- `leadReadiness`
- `ctaLabel`
- `ctaTarget`
- `safetyNotes`
- `followUpQuestion`
- `capabilityChips`

If the AI output fails schema validation or cannot be parsed, ZES returns to deterministic guidance immediately.

## File analysis in ZES

Uploads are handled inside the same ZES conversation UI.

Supported types:

- images: `jpg`, `jpeg`, `png`, `webp`;
- documents: `pdf`, `txt`, `md`;
- accepted with manual-review fallback: `doc`, `docx`, `xls`, `xlsx`.

Current limit:

- 8 MB per file.

Behavior:

- image/text/pdf: analyzed preliminarily (server-side AI when enabled, deterministic fallback otherwise);
- doc/docx/xls/xlsx: received and routed to manual review guidance;
- no permanent raw file storage is added in this phase.

File analysis response includes:

- `fileSummary`
- `detectedItems`
- `extractedSpecs`
- `risks`
- `missingInfo`
- `recommendedServices`
- `nextBestAction`
- `confidence`
- `limitations`
- `targetFlow`

## Preliminary request generator

When intent is high, ZES can generate:

- service request brief;
- project/offer context brief;
- missing info checklist;
- recommended next action.

These are explicitly preliminary (`cerere structurata`, `context pentru ofertare`) and not final legal/commercial commitments.

## Routing strategy

ZES routes users toward existing flows:

- AI Discovery
- Proposal Builder
- Project Intake
- Service Diagnostic
- Contact
- relevant calculators/comparisons/services when applicable

If a specific flow is uncertain, ZES defaults to AI Discovery.

Routing copy should emphasize internal orchestration, for example:

- "ZES va pregati contextul pentru ofertare."
- "ZES poate structura cererea de proiect."
- "ZES poate evalua prioritatea de service."

## Safety boundaries

ZES must not:

- claim final engineering validation;
- claim CNCAN/DSP approval certainty;
- guarantee pricing or timeline;
- imply real AI is active;
- request or expose sensitive personal data in analytics.

ZES must also not imply real file parsing. Recommended phrasing:

- "Momentan analiza documentelor este in mod demo; pentru proiect real, echipa ZESCORP poate verifica planurile manual."

Privacy note in UI:

- users are asked not to enter patient data or unnecessary sensitive medical data;
- users are warned not to upload patient medical records;
- the conversation context is used for the current reply and lead preparation only;
- the application does not persist conversation state server-side in this phase.

## Cost-control notes

- prefer `gpt-5.4` as the default runtime model for a better cost/performance balance;
- reserve `gpt-5.5` for premium production quality where higher reasoning cost is acceptable;
- keep `max_output_tokens` modest because ZES replies should stay concise and structured;
- if cost or reliability is a concern, set `ZES_AI_ENABLED=false` and the homepage experience remains usable through deterministic fallback.

## QA checklist

1. Verify prompt starters render and trigger responses.
2. Verify free-text entry returns deterministic intent detection.
3. Verify CTA links are valid and route to existing pages.
4. Verify copy keeps preliminary validation framing.
5. Verify no fake typing/streaming behavior appears.
6. Verify AI disabled mode returns `mock` runtime behavior.
7. Verify AI-enabled requests fall back cleanly if the key is missing or the provider response fails.
8. Verify `npm run build -- --webpack` and `npm run content:check` pass.
9. Trigger a high-intent scenario and confirm inline lead capture appears naturally.
10. Submit a mock ZES lead and confirm success plus returned integration modes.

## Phase 76D conversation quality rules

- ZES now tracks explicit conversation phases: `early-discovery`, `qualification`, `offer-prep`, `service-prep`, `lead-capture-ready`, `lead-captured`, `waiting-for-file`, `completed-closed`.
- ZES keeps `collectedAnswers`, `askedQuestionIds`, `lastAskedQuestionId`, `leadCompletionStatus` and `fileUploadStatus` in conversation state.
- Anti-repetition is enforced by selecting only unanswered questions and deduping missing info in turn details.
- Closing intent (`trimite`, `oferta`, `contactati-ma`, `vreau sa facem`, or explicit `da`) now accelerates lead closing instead of opening new generic questions.

Lead completion thresholds:

- Service path: equipment/service intent + symptom + urgency/downtime + city/contact.
- Project path: project type + city + timeline/budget + plan or project description + phone/email.

When threshold is reached, ZES switches to a closing summary and keeps only 1-2 closing actions.

Safety frequency rules:

- Service safety warning appears once at first relevant service risk.
- CNCAN/compliance warning appears once per relevant project context.
- Upload hint appears only when useful and not already resolved.

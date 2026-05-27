# AI Magic Layer

The AI Magic Layer is the product direction for an AI-assisted medical infrastructure sales engineer experience inside ZES MEDCORP.

It is not a generic chatbot. It is a guided planning and commercial-intelligence layer for clinics, imaging projects, laboratories, modernization work and service needs.

Current Phase 75A status:

- deterministic only;
- mock-safe;
- no real OpenAI API calls;
- no streaming;
- no server-side conversational memory;
- no OCR or document parsing;
- no CRM, database or authenticated lead workspace.

Phase 75B/75C/75D/75E/75F/75G status:

- AI Magic scenarios are now connected to `/ai-discovery` via deterministic query handoff;
- scenario seeds prefill discovery intent, stage, domains and urgency;
- AI Discovery includes scenario-aware conversational guidance and commercial hints;
- AI Discovery uses a stronger ZES Copilot presence with layered intelligence cards, dependency groups and opportunity markers;
- conversational rhythm is segmented into guidance, scenario blockers, transitions and advisory notes;
- local context handoff carries AI Magic fields into Proposal Builder and Project Intake summaries;
- homepage AI Magic section now positions `ZES AI Copilot` as the primary guided planning entry;
- homepage includes a visible `Discuta cu ZES` conversational panel with deterministic intent routing and CTA guidance;
- `ZES Guide` can detect project intent, highlight missing information and route toward AI Discovery, Proposal Builder, Project Intake, service flow or contact;
- homepage now treats ZES as the primary above-the-fold conversational entry (`Discuta cu ZES despre proiectul tau medical`);
- ZES runs scenario-specific follow-up paths (service, CT, RMN, funding, ofertare echipamente) and builds lead summaries progressively;
- high-intent ZES conversations can open inline lead capture and submit through existing mock-safe `/api/leads` flow;
- no real AI provider, streaming, OCR, CRM or persistence changes were introduced.

## Product vision

The future experience should help a serious medical buyer move from unclear project intent to a structured technical and commercial discussion.

The assistant should behave like a careful medical infrastructure sales engineer:

- understand the project scenario;
- ask useful questions progressively;
- identify infrastructure areas that may matter;
- separate RMN/RF shielding from CT/RX radioprotection;
- detect commercial urgency and maturity;
- prepare the context for Proposal Builder, Project Intake and internal lead review;
- recommend next planning steps without claiming final approval or final compliance.

The tone should remain:

- professional;
- technical;
- calm;
- assistive;
- high-trust;
- non-alarmist.

## Conversational intake vision

The future conversational layer should guide users through structured project discovery instead of asking them to fill a long generic form.

Expected conversation flow:

1. Identify project type.
2. Clarify project stage.
3. Detect relevant domains.
4. Ask only the next useful questions.
5. Mark unknown information without blocking progress.
6. Suggest optional documents when helpful.
7. Summarize readiness, risks and missing information.
8. Route the user toward Proposal Builder, Project Intake or technical contact.

The assistant should always allow:

- "Nu stiu inca";
- "Continua cu ipoteze preliminare";
- "Pot adauga documente mai tarziu";
- partial answers;
- future human validation.

## Adaptive questioning

Adaptive questioning should use domain and stage signals, not a generic script.

Examples:

- RMN: ask about magnet type, access route, RF shielding, HVAC, electric, quench assumptions and vendor datasheet.
- CT/RX: ask about room layout, neighbors, radioprotection, CNCAN stage, HVAC/electric and patient flow.
- IVD/laboratory: ask about analyzer types, sample flow, validation, calibration, QC, water/drainage, HVAC and service.
- Modernization: ask about downtime, active equipment, migration, existing documentation and phased implementation.
- Service: ask about model, serial number, symptoms, error codes, service history, downtime and parts availability.

The system should not ask every possible question. It should select high-value questions based on context and confidence.

## Project planning assistant

The planning assistant should produce preliminary guidance in structured form:

- likely infrastructure areas;
- likely missing information;
- project dependencies;
- validation needs;
- operational risks;
- suggested services;
- suggested calculators;
- suggested comparisons, glossary terms and articles;
- next best action.

The output should be suitable for:

- user-facing planning;
- Proposal Builder enrichment;
- Project Intake prefill;
- internal lead qualification;
- future CRM summaries.

## Sales-aware intelligence

The AI Magic Layer should include commercial intelligence, but not aggressive sales pressure.

Signals to detect:

- opportunity type;
- urgency;
- project maturity;
- commercial readiness;
- planning readiness;
- infrastructure complexity;
- potential phased implementation;
- service/maintenance opportunity;
- missing information that blocks a real offer;
- likely next human action.

Example commercial interpretations:

- "CT clinic" may indicate high-intent radioprotection, CNCAN and infrastructure planning.
- "Camera RMN" may indicate RF shielding, access route, HVAC/electric and vendor coordination.
- "Extindere imagistica" may indicate multi-service planning and phased implementation.
- "Modernizare radiologie" may indicate downtime, migration and service continuity.
- "Service/mentenanta" may indicate urgent triage or preventive maintenance opportunity.

All commercial signals are preliminary and should support better follow-up, not automated hard-selling.

## Lead scoring evolution

The current platform already contains deterministic lead scoring and lead intelligence.

The AI Magic Layer should evolve lead scoring with:

- discovery completeness;
- project domain;
- stage and urgency;
- infrastructure complexity;
- document availability;
- equipment clarity;
- commercial intent;
- operational impact;
- missing information count;
- confidence level.

Future real AI should enrich summaries, but deterministic scoring should remain as fallback and audit trail.

## Future AI integration boundaries

Real AI integration may be introduced later for:

- conversational phrasing;
- summarization;
- document context extraction;
- better question ranking;
- proposal narrative drafting;
- internal lead review support.

Real AI must not:

- guarantee CNCAN, DSP or other approvals;
- claim final engineering validation;
- invent standards or legal requirements;
- generate fake prices, fake case studies or fake certifications;
- send PII to analytics;
- store documents without clear consent and retention policy;
- replace specialist review.

Any future AI provider should be wrapped behind a server-side adapter with:

- explicit environment controls;
- mock fallback;
- request/response minimization;
- timeout handling;
- safe error handling;
- no secret exposure;
- no client-side API keys.

## Deterministic fallback behavior

The deterministic fallback should always be available.

Fallback behavior should:

- use known project context;
- map scenario to domains and services;
- ask safe generic planning questions;
- surface missing information;
- provide preliminary readiness and complexity levels;
- route users to Proposal Builder or Project Intake;
- avoid hallucination;
- keep the site useful even if AI provider access is disabled.

Phase 75A implements this fallback as a homepage guided planning concept section using:

- `src/lib/ai-magic-layer.ts`;
- `src/components/sections/AIMagicLayerSection.tsx`;
- existing AI Discovery, Proposal Builder and Project Intake paths.

Phase 75C extends fallback behavior inside `/ai-discovery`:

- assistant-style guidance cards;
- scenario-specific blockers and recommended questions;
- commercial readiness markers and next-step hints;
- copilot sidebar with deterministic project/commercial readiness;
- compliance/funding hints only when relevant to the detected domains and scenario.

## Privacy and PII boundaries

The AI Magic Layer should follow data minimization:

- do not ask for personal data until lead capture is appropriate;
- do not put detailed notes or PII into URLs;
- do not send PII to analytics;
- do not expose internal summaries publicly;
- do not persist user context server-side without a future privacy model;
- do not process uploaded documents until upload consent, storage rules and parsing mode are defined.

Recommended future privacy design:

- local context for short-lived handoff;
- server-side storage only after explicit submission;
- clear lead privacy text;
- redaction guidance for documents;
- admin authentication before real lead display;
- audit and retention policy before CRM/database activation.

## Current labels

Every public AI Magic surface should clearly label the current mode:

- AI-assisted demo;
- guided planning mode;
- deterministic mock intelligence;
- preliminary guidance;
- validation needed.

These labels protect trust and set correct expectations before real AI is activated.

## Future roadmap

Recommended next phases:

1. AI Magic route or workspace variant after homepage concept validation.
2. Server-side AI adapter with mock fallback and strict privacy controls.
3. Conversation memory model with local and server modes.
4. Document parsing adapter with OCR/vision disabled by default.
5. Proposal intelligence enhancement using AI-generated drafts with deterministic guardrails.
6. Admin review assistant for internal lead triage.
7. CRM handoff mapping after auth and real storage exist.
8. Human review workflow for high-value projects and compliance-sensitive cases.

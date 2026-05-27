# ZES Guide Agent

`ZES Guide` is the public deterministic conversational sales and project guide used as the main above-the-fold entry on homepage (`/#zes-guide`).

It is designed as a medical infrastructure sales engineer style assistant:

- technical and consultative;
- commercial-aware;
- calm and enterprise-oriented;
- deterministic and mock-safe.

## Current mode

- no real OpenAI API;
- no streaming;
- no backend conversation persistence;
- no CRM/database/auth coupling;
- no upload/OCR/parsing activation.

## Architecture

- response engine: `src/lib/zes-guide-engine.ts`
- UI: `src/components/ai/ZESGuide.tsx`
- homepage integration: `src/components/sections/ZESGuideSection.tsx`

## Phase 75F unified flow

Phase 75F makes ZES the single conversational front door:

- users start from one input and one conversation;
- ZES asks follow-up questions based on detected scenario;
- ZES collects missing information progressively;
- ZES surfaces compact lead summary after each assistant turn;
- existing tools stay active, but are presented as internal capabilities of ZES.

The user is not required to choose AI Discovery vs Proposal Builder vs Project Intake upfront.

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

## QA checklist

1. Verify prompt starters render and trigger responses.
2. Verify free-text entry returns deterministic intent detection.
3. Verify CTA links are valid and route to existing pages.
4. Verify copy keeps preliminary validation framing.
5. Verify no fake typing/streaming behavior appears.
6. Verify `npm run build -- --webpack` and `npm run content:check` pass.

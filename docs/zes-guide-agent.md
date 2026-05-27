# ZES Guide Agent

`ZES Guide` is the public deterministic conversational sales and project guide used on homepage (`/#zes-guide`).

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

## Routing strategy

ZES routes users toward existing flows:

- AI Discovery
- Proposal Builder
- Project Intake
- Service Diagnostic
- Contact
- relevant calculators/comparisons/services when applicable

If a specific flow is uncertain, ZES defaults to AI Discovery.

## Safety boundaries

ZES must not:

- claim final engineering validation;
- claim CNCAN/DSP approval certainty;
- guarantee pricing or timeline;
- imply real AI is active;
- request or expose sensitive personal data in analytics.

## QA checklist

1. Verify prompt starters render and trigger responses.
2. Verify free-text entry returns deterministic intent detection.
3. Verify CTA links are valid and route to existing pages.
4. Verify copy keeps preliminary validation framing.
5. Verify no fake typing/streaming behavior appears.
6. Verify `npm run build -- --webpack` and `npm run content:check` pass.

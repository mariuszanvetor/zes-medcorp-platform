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
- Do not expose real lead data in admin without stronger authentication.
- Keep intelligence deterministic and preliminary.
- Avoid legal, regulatory or engineering certainty language.

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

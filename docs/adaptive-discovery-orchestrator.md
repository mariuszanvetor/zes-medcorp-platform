# Adaptive discovery orchestrator

The adaptive discovery orchestrator turns the Phase 71A intelligence architecture into a deterministic planning engine. It is not a public chatbot and it does not call an AI API. It decides what the assistant should ask next, what can be assumed temporarily, what risks are visible and what resources should be recommended.

Implementation:

- `src/lib/ai-intelligence/discovery-orchestrator.ts`
- `src/data/intelligence/discovery-fixtures.ts`

## Input shape

The orchestrator accepts `IntelligenceInput`, a partial project context that can include:

- free-text project description;
- intent and project stage;
- known domains;
- equipment and room types;
- existing/new building signal;
- modernization signal;
- urgency;
- budget/timeline clarity;
- plan availability;
- equipment specification availability;
- location/surface clarity;
- constraints.

The input is intentionally tolerant. The user should not need to know every technical detail before the system can help.

## Output shape

`orchestrateAdaptiveDiscovery()` returns:

- detected domains;
- related domains;
- project stage;
- confidence score and level;
- missing information;
- next best questions;
- optional upload prompts;
- non-blocking continue flag;
- risk and complexity assessment;
- recommendations;
- relevant resources;
- likely services;
- lead intelligence output;
- proposal preparation notes;
- safe validation disclaimer.

## Adaptive question logic

Question logic combines:

- baseline discovery stages from `discovery.ts`;
- domain-specific question banks in `discovery-orchestrator.ts`;
- known-answer filtering;
- project stage;
- equipment specificity;
- existing-space and modernization signals;
- documentation availability.

Supported question domains:

- imaging/RMN/CT/RX;
- IVD and laboratory;
- surgery/OR;
- dental imaging;
- sterilization;
- cardiology;
- ultrasound;
- ATI/critical care;
- clinic modernization;
- general clinic setup;
- electrical, HVAC and UPS infrastructure;
- operational workflow.

Examples:

- RMN asks about 1.5T/3T, RF shielding/Faraday, quench/HVAC and magnet access.
- CT asks about equipment model, radioprotection, controlled areas and control room layout.
- IVD asks about test menu, analyzers, LIS, validation and service access.
- OR/ATI asks about procedure types, HVAC, gases, power continuity and specialist review.
- Modernization asks about downtime, phasing and existing infrastructure.

## Non-blocking assumptions

The orchestrator must not block progress just because details are missing.

`canContinueWithAssumptions()` returns `true` for most partial contexts. When information is missing, the result marks:

- what is missing;
- why it matters;
- confidence level;
- assumptions note;
- validation needs.

The assistant can continue with phrases such as:

> Puteți continua cu ipoteze orientative; informațiile lipsă vor fi marcate explicit și trebuie validate înainte de decizii finale.

It should avoid:

- final estimates;
- final engineering claims;
- regulatory certainty;
- hiding uncertainty.

## Upload prompt behavior

Upload prompts are optional. They should never stop the user from continuing.

Typical prompts:

- room plan, sketch or releveu for imaging, OR, lab, modernization and clinic setup;
- equipment datasheet when equipment is selected or likely;
- existing-space photos for modernization or existing buildings;
- technical plans for electrical, HVAC or UPS dependencies.

Every prompt includes:

- title;
- reason;
- artifact types;
- related domains;
- note that the user may continue without documents.

Future UI should phrase uploads as helpful preparation, not a requirement.

## Risk and complexity logic

Risk detection is deterministic and based on visible project signals:

- high-power or complex equipment;
- RF shielding;
- radioprotection;
- HVAC dependency;
- UPS/backup needs;
- regulatory/authorization dependencies;
- operational downtime;
- unclear equipment specifications;
- aggressive timeline;
- missing room layout;
- multi-vendor complexity;
- critical-care, OR or sterilization scope.

The output includes:

- `riskLevel`: low, medium, high, critical;
- `complexityLevel`: low, moderate, high, critical;
- risk reasons;
- validation needs.

## Recommendation output

Recommendations combine domain requirements, regulatory awareness and existing ZES ecosystem resources.

The output can surface:

- likely infrastructure areas;
- likely services needed;
- relevant calculators;
- related articles, glossary and comparisons;
- Project Intake and Proposal Builder next steps;
- proposal preparation notes.

All recommendations must remain preliminary and conditional.

## Lead intelligence output

The orchestrator provides deterministic lead signals:

- readiness score;
- urgency score;
- commercial intent;
- missing-information score;
- recommended follow-up type;
- internal summary.

Follow-up types:

- educational nurture;
- technical clarification;
- proposal preparation;
- urgent technical review.

These are planning signals only, not automatic CRM actions.

## Fixtures

Sample contexts live in `src/data/intelligence/discovery-fixtures.ts`:

- MRI/RMN project;
- IVD laboratory;
- dental CBCT;
- surgery/OR room;
- clinic modernization;
- general clinic setup;
- ultrasound/cardiology cabinet.

They are designed as sanity examples for future tests, demos and admin review tooling.

## Safety rules

The orchestrator must:

- separate RMN RF shielding from CT/RX radioprotection;
- treat CNCAN, DSP and other validation areas as human-review paths;
- mark estimates as preliminary;
- allow incomplete discovery without pretending confidence is high;
- avoid legal, medical or engineering certainty;
- avoid storing or sending personal data.

## Future UI integration path

Recommended sequence:

1. Add an internal admin preview page for testing fixtures.
2. Add a controlled Project Intake enhancement using orchestrator output.
3. Add conversational UI only after safety copy, privacy handling and event tracking are reviewed.
4. Add document upload only after storage, privacy, retention and security policies exist.
5. Add AI API orchestration only after deterministic outputs define the safe boundaries.

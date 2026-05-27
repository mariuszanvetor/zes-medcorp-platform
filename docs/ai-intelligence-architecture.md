# AI intelligence architecture

This document defines the foundation for a future ZES MEDCORP medical infrastructure intelligence system. It is not a generic chatbot plan and it is not a promise of automatic engineering validation. The direction is an AI-assisted planning layer that helps users describe projects, uncover missing information, understand likely infrastructure dependencies and prepare better technical discussions.

The system must remain professional, technical and careful. It can guide, qualify and structure planning context, but it must not claim to replace certified engineering, official approvals or specialist regulatory review.

## Product direction

The target product direction is:

**AI-assisted medical infrastructure and equipment planning intelligence.**

The future assistant should:

- guide users conversationally through incomplete project context;
- request useful details progressively instead of forcing a long form immediately;
- invite plans, sketches, equipment sheets or photos when they would reduce uncertainty;
- identify likely infrastructure, workflow, service and validation considerations;
- recommend relevant ZES services, calculators, comparisons, glossary terms and project-intake actions;
- qualify leads naturally by readiness, urgency, missing information and complexity.

It must not:

- guarantee compliance, authorization or final engineering approval;
- hallucinate standards or regulations;
- confuse RF shielding for RMN with radioprotection for CT/RX;
- generate final technical specifications from incomplete data;
- present preliminary cost, timeline or compliance outputs as final.

## Current implementation

The Phase 71A foundation is implemented as a data and engine layer only. No unfinished public AI UI has been exposed.

Key files:

- `src/lib/ai-intelligence/types.ts`
- `src/data/intelligence/medical-domains.ts`
- `src/lib/ai-intelligence/domain-graph.ts`
- `src/lib/ai-intelligence/discovery.ts`
- `src/lib/ai-intelligence/recommendation-engine.ts`
- `src/lib/ai-intelligence/regulatory-awareness.ts`
- `src/lib/ai-intelligence/document-intelligence.ts`
- `src/lib/ai-intelligence/lead-proposal-intelligence.ts`
- `src/lib/ai-intelligence/safety.ts`
- `src/lib/ai-intelligence/index.ts`

## Domain architecture

The architecture supports multiple medical and infrastructure domains, not only RMN/CT:

- MRI/RMN
- CT
- radiology/RX
- dental imaging
- IVD/laboratory
- surgery/OR
- ATI/critical care
- sterilization
- ultrasound
- cardiology
- clinic modernization
- healthcare infrastructure
- medical electrical systems
- HVAC
- UPS/power continuity
- operational workflow

Each domain profile contains:

- typical equipment types;
- room types;
- infrastructure requirements;
- operational considerations;
- validation areas;
- common dependencies;
- related services, tools and content resources.

This keeps future intelligence behavior grounded in structured domain data instead of prompt-only heuristics.

## Knowledge graph structure

The knowledge graph layer models relationships between domains, requirements and related resources.

Core entity types include:

- equipment types;
- room types;
- HVAC implications;
- electrical and UPS implications;
- RF shielding and radioprotection;
- workflow and staffing considerations;
- operational constraints;
- implementation complexity;
- validation requirements;
- planning dependencies.

The graph supports:

- domain matching from user input;
- requirement lookup by domain;
- dependency discovery between domains;
- related service/tool/content surfacing.

## Adaptive discovery model

The adaptive discovery layer is designed to ask better questions over time. It should tolerate incomplete information, detect what is already known and skip irrelevant questions.

Discovery stages:

1. Intent
2. Medical domain
3. Space/site context
4. Equipment context
5. Infrastructure dependencies
6. Documentation and validation
7. Operation and service impact
8. Next step

The model supports:

- progressive questions;
- project-stage inference;
- missing-information detection;
- confidence scoring;
- skipped-stage logic;
- future upload suggestions.

Example behavior:

- An RMN project should quickly ask about equipment, room, RF shielding, HVAC, power, access and available plans.
- A CT/RX project should route toward radioprotection, CNCAN-aware planning, layout and controlled-area considerations.
- An IVD project should emphasize workflow, analyzers, utilities, LIS/integration, validation and service access.
- A modernization project should ask about downtime, phasing, existing infrastructure and operational continuity.

## Recommendation engine design

Recommendations are deterministic and contextual. They are derived from domain matches, critical requirements, related resources and project signals.

Recommendation types:

- infrastructure;
- operational;
- regulatory awareness;
- service;
- documentation;
- next step.

Each recommendation includes:

- rationale;
- confidence level;
- validation-required flag;
- related domains;
- related services, calculators, tools or articles.

Every recommendation should use conditional language. Preferred framing:

> Based on the available information, this area should be checked during technical validation.

Avoid:

> This is approved, compliant or final.

## Regulatory awareness layer

The regulatory-awareness layer is intentionally conservative. It identifies areas that may require specialist review or official verification, but it does not provide legal certainty.

Modeled flags include:

- CNCAN awareness for CT/RX/CBCT and other ionizing-radiation contexts;
- RF shielding separation for RMN;
- DSP awareness for medical spaces, laboratories and clinic workflows;
- IVD validation and operational documentation;
- specialist review for OR, ATI and sterilization areas.

Rules:

- CNCAN is not the same as RF shielding.
- DSP and CNCAN must be treated as separate planning areas.
- The assistant may suggest verification paths, not claim approval.
- Regulatory outputs must include uncertainty and human-review framing.

## Lead and proposal intelligence

The lead/proposal intelligence layer prepares future handoff into Proposal Builder, Project Intake and admin review.

It can produce:

- proposal starter summaries;
- likely domains;
- probable services;
- assumptions;
- missing-information lists;
- validation needs;
- recommended next actions;
- readiness and priority scoring.

The scoring is not a sales guarantee. It is intended to help the team understand whether a lead is exploratory, qualified, ready for technical review or ready for a preliminary proposal.

## Document and plan understanding prep

No OCR, vision or document analysis has been implemented in this phase.

The architecture prepares interfaces for future:

- PDF analysis;
- room plans;
- sketches;
- equipment sheets;
- layouts;
- site photos;
- laboratory workflow maps.

Future document understanding should extract only planning signals such as dimensions, access, utilities, workflow constraints, RF penetrations, radioprotection layout questions and equipment requirements. It must not treat uploaded files as final proof of compliance.

Privacy rule:

- users should be encouraged to remove unnecessary personal or sensitive data before upload.

## Safety and trust principles

Core principles:

- preliminary guidance, not final validation;
- no regulatory certainty;
- clear domain separation;
- no false precision;
- data minimization;
- escalation to human validation.

Prohibited behavior:

- promising CNCAN/DSP approval;
- claiming final compliance;
- replacing authorized engineering;
- confusing RF shielding with lead shielding;
- inventing standards, prices, certifications or case studies;
- exposing personal data in analytics.

## Future phase roadmap

Recommended next phases:

1. Orchestration engine: connect discovery, recommendations, safety and content retrieval into one deterministic planning pipeline.
2. AI UI/chat layer: conversational intake interface with progressive questions and safe uncertainty framing.
3. Proposal intelligence: transform discovery outputs into proposal assumptions, technical stages and missing-information lists.
4. Document intelligence: add upload workflows, extraction interfaces and optional OCR/vision only after privacy and security review.
5. Recommendation engine expansion: richer scoring, domain-specific rules and semantic resource matching.
6. Memory/context system: session-level project memory without leaking PII into analytics.
7. Analytics: safe tracking for journey completion, recommendation clicks and lead readiness levels.
8. Multi-user collaboration: future project workspace, comments and shared planning context.
9. Admin review workflows: human review queues, escalation reasons, validation checklists and lead follow-up context.

## Validation status

This phase should pass:

- `npm run build`
- `npm run content:check`

The architecture intentionally adds no public unfinished route, no backend, no database, no real AI API and no new compliance claims.

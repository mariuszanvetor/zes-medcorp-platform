# Proposal Intelligence

Phase 71E upgrades Proposal Builder with a deterministic proposal intelligence layer. It does not call a real AI API, does not store proposals permanently and does not create final engineering or compliance conclusions.

## Current flow

1. Proposal Builder collects structured project inputs.
2. If AI Discovery context exists locally, it is imported as optional context.
3. The proposal engine creates the existing budget, timeline, risk and modular proposal assembly.
4. `src/lib/ai-intelligence/proposal-intelligence.ts` combines Proposal Builder inputs, optional AI Discovery context, adaptive discovery output, budget, complexity and risk signals.
5. The output is shown in Proposal Builder, included in the PDF document and summarized in the lead payload.

## Output shape

The proposal intelligence output includes:

- project intelligence summary;
- proposal readiness score;
- complexity analysis and drivers;
- risk analysis;
- missing information;
- assumptions;
- likely infrastructure areas;
- validation needs;
- recommended services;
- recommended calculators and resources;
- internal lead notes;
- next best action;
- discussion preparation checklist.

## AI Discovery context usage

When context exists, Proposal Builder can:

- prefill safe fields;
- enrich the project summary;
- add missing information and validation needs;
- adjust risk and complexity interpretation;
- include imported context in the PDF;
- mark the lead as `proposal-builder-from-discovery`.

The user can ignore the context at any time. The imported context remains local-only until the user explicitly submits a lead.

## PDF usage

The PDF now includes a compact "Intelligence propunere" section:

- readiness score;
- project intelligence summary;
- complexity;
- next best action;
- discussion preparation items;
- validation notes.

The PDF remains a preliminary technical planning document. It is not a final engineering approval, legal opinion, regulatory approval or binding commercial offer.

## Lead payload usage

Proposal Builder lead submissions include a compact generated summary with:

- readiness score;
- complexity;
- missing information count;
- short project intelligence summary;
- internal lead notes.

The flow must not send PII to analytics. Full raw discovery notes should not be added unless the user explicitly submits them as part of the lead form message.

## Future persistence handoff

Proposal Builder currently reads AI Discovery context from local browser storage. When a backend persistence layer exists, Proposal Builder should:

- load a compact discovery context by `contextId`, not by detailed query parameters;
- show the same `Context preluat din AI Discovery` review block before using imported data;
- allow the user to ignore or edit imported data before generating a proposal;
- create a proposal snapshot that references the context ID, proposal version and generated timestamp;
- include only compact assumptions, missing information and validation needs in the PDF;
- keep raw notes, documents and PII out of analytics and public URLs;
- treat server-loaded context as user-provided preliminary context, not validated engineering input.

Suggested persisted proposal intelligence fields:

- proposal readiness score;
- complexity level and top complexity drivers;
- risk level and risk reasons;
- missing information count and labels;
- validation needs;
- recommended services/resources;
- next best action;
- internal lead notes summary;
- source context such as `proposal-builder-from-discovery`.

## Future document context

Phase 71I prepares document parsing as a mock-only architecture. Proposal Builder should not consume real parsed documents yet.

When a later phase enables parsing, Proposal Builder may use reviewed document context to:

- add a short document-derived assumptions section;
- mark plans, equipment sheets or equipment tables as available;
- list missing information found from the document review;
- improve proposal readiness only after the user accepts the imported context;
- include a compact document context note in the PDF.

It must not:

- include raw document text in the PDF;
- treat parsed content as final engineering validation;
- guarantee prices, timelines, CNCAN/DSP approval or technical compliance;
- send file contents to analytics, email or Google Sheets.

See `docs/document-parsing-architecture.md` for file limits, privacy handling and future parsing boundaries.

## Safety boundaries

The system must always frame outputs as preliminary:

- no final compliance claims;
- no final engineering approval;
- no guaranteed cost or timeline;
- no regulatory certainty;
- no replacement for specialist validation.

Use language such as:

- `necesita validare tehnica`;
- `depinde de amplasament, echipament si documentatie`;
- `orientativ`;
- `preliminar`;
- `de clarificat inainte de oferta finala`.

## QA expectations

- Direct Proposal Builder works without AI Discovery context.
- Proposal Builder from AI Discovery shows imported context and allows ignoring it.
- PDF includes proposal intelligence without becoming a long technical report.
- Lead payload includes only compact intelligence, not raw long notes.
- Successful mock/live email and mock/real Sheets modes must produce a success state in the frontend.

## Future real AI path

A future AI API integration should keep this deterministic layer as a guardrail:

1. Use the deterministic engine to structure known facts.
2. Let AI draft summaries only inside safe boundaries.
3. Keep regulatory claims constrained by a curated knowledge layer.
4. Store proposal versions only after authentication and explicit user consent.
5. Add admin review before any AI-generated proposal becomes customer-facing beyond preliminary guidance.

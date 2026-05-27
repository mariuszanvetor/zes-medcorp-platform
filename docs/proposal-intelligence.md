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

## Future real AI path

A future AI API integration should keep this deterministic layer as a guardrail:

1. Use the deterministic engine to structure known facts.
2. Let AI draft summaries only inside safe boundaries.
3. Keep regulatory claims constrained by a curated knowledge layer.
4. Store proposal versions only after authentication and explicit user consent.
5. Add admin review before any AI-generated proposal becomes customer-facing beyond preliminary guidance.

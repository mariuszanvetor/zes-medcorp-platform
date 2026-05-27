# AI Discovery context handoff

Phase 71D adds local context handoff from `/ai-discovery` into Proposal Builder, Project Intake and lead submission.

The goal is continuity: users should not lose the project context they already provided. The implementation stays frontend-only and does not add database, auth, backend persistence or server-side sessions.

## Storage strategy

The handoff uses:

- `sessionStorage` for the active browser session;
- `localStorage` as a fallback for returning to the workflow;
- compact query parameters only as a navigation signal.

Detailed notes and generated summaries are not placed in the URL.

Storage key:

- `zes.aiDiscovery.context.v1`

Main helper:

- `src/lib/ai-intelligence/discovery-context.ts`

## Stored context

The stored object is compact and serializable:

- source and timestamp;
- selected next step;
- detected domains;
- project stage;
- trimmed notes;
- known answer booleans;
- missing information labels;
- risk level;
- complexity level;
- readiness score;
- validation needs;
- suggested services;
- suggested calculators and resources;
- optional upload-needed flags;
- generated summary.

## What is not stored

The local context should not contain:

- names, emails or phone numbers;
- patient data;
- uploaded files;
- full document content;
- raw provider/API responses;
- secret environment data;
- analytics identifiers.

## AI Discovery CTAs

The `/ai-discovery` CTAs save context before navigation:

- Continue to Proposal Builder;
- Continue to Project Intake;
- Request technical review.

The destination URL gets a lightweight query signal such as:

- `source=ai-discovery`
- `domains=...`
- `risk=...`
- `confidence=...`

The full structured context is read locally from storage.

## Proposal Builder usage

Proposal Builder now:

- detects stored AI Discovery context;
- shows “Context preluat din AI Discovery”;
- pre-fills safe fields such as project type, imaging, shielding, lab, equipment, stage and description;
- adds discovery assumptions, missing information and validation needs into proposal assembly;
- passes imported context into the deterministic proposal intelligence engine;
- shows readiness, risk, missing information and validation needs in the proposal result;
- includes a compact intelligence section in the exported PDF;
- enriches the lead summary with readiness, risk/complexity and missing information count;
- allows the user to ignore the context;
- includes context-derived assumptions/missing info in generated proposal/PDF output through the existing proposal data model.

The user can edit every field. Nothing is locked.

## Project Intake usage

Project Intake now:

- detects stored AI Discovery context;
- shows a local context summary;
- pre-fills safe fields such as project type, stage, building status, documentation status and technical requirements;
- allows the user to ignore the context;
- includes a compact discovery summary in the lead payload when submitted.

The user can continue, edit or overwrite all imported values.

## Lead submission behavior

When available, discovery context is included as a compact generated summary in:

- AI Discovery lead submissions;
- Proposal Builder leads submitted after discovery import;
- Project Intake leads submitted after discovery import.

Source attribution changes to:

- `ai-discovery`
- `proposal-builder-from-discovery`
- `project-intake-from-discovery`

Analytics receives only safe classifications such as source, project type, risk and complexity. It must not receive names, emails, phones or full notes.

## Privacy and safety copy

User-facing copy should remain clear:

- “Poti modifica sau ignora aceste date.”
- “Contextul este folosit doar local pentru a continua proiectul.”
- “Nu inlocuieste analiza tehnica finala.”
- “Nu reprezinta autorizare sau validare finala.”

## Future path

Future phases can replace local handoff with:

1. authenticated project sessions;
2. server-side encrypted storage;
3. saved proposal versions;
4. admin review workflows;
5. document upload and extraction with explicit retention rules.

Until then, local storage is the safest continuity layer.

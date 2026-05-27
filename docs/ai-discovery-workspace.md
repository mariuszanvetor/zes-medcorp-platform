# AI Discovery workspace

`/ai-discovery` is the first public guided discovery workspace built on the deterministic medical infrastructure intelligence architecture.

It is not a generic chatbot and it does not use a real AI API yet. The workspace uses the Phase 71A/71B deterministic orchestrator to guide users through project context, missing information, risk signals and next-step recommendations.

Phase 75C adds a premium conversational planning layer on top of the same deterministic engine:

- assistant-style guidance cards and project context cards;
- progressive question flow with scenario-aware prompts;
- AI copilot sidebar with project and commercial readiness markers;
- deterministic compliance/funding hints where relevant;
- no streaming, no model improvisation and no API behavior changes.

## What it does now

- guides the user through deterministic project discovery;
- supports partial answers and "continue with assumptions";
- saves compact local context for Proposal Builder and Project Intake;
- marks uploads/documents as optional future inputs;
- sends only compact lead context when the user submits a lead.
- accepts partial project context through structured controls and free text;
- supports multiple medical infrastructure domains, including imaging, RMN, CT, radiology, dental, IVD/laboratory, OR, ATI, sterilization, cardiology, ultrasound, modernization, HVAC, electrical, UPS and workflow;
- runs `orchestrateAdaptiveDiscovery()` client-side with deterministic rules;
- shows live detected domains, confidence, missing information, risk, complexity, readiness score and recommended resources;
- suggests optional document types such as sketches, plans, equipment datasheets, photos and technical plans;
- shows a descriptor-based mock document parsing preview for future PDF/DOCX/XLSX/image support;
- allows users to continue with assumptions instead of blocking when details are missing;
- offers handoff CTAs to Proposal Builder and Project Intake;
- uses `LeadCaptureForm` to send discovery context for preliminary ZES review.
- accepts AI Magic scenario handoff from query params such as `?scenario=ct-clinic` and `?scenario=mri-room`;
- applies deterministic scenario seeds for intent, stage, domains and urgency;
- carries AI Magic commercial context in local handoff summaries for Proposal Builder and Project Intake.

## What it does not do yet

- It does not call a real AI model.
- It does not upload or process files.
- It does not perform OCR, image analysis or document understanding.
- It does not expose a real file input.
- It does not store project sessions permanently.
- It does not produce final engineering validation.
- It does not claim CNCAN, DSP or other regulatory approval.

## Safety framing

Visible copy and generated lead context must keep these boundaries:

- preliminary planning support only;
- final requirements depend on project, equipment, site and competent specialists;
- RF shielding for RMN is separate from radioprotection for CT/RX;
- users may continue without documents;
- users should not include patient data or unnecessary sensitive data.

## Lead context handling

When the lead form is opened, the workspace passes a structured but compact generated summary:

- detected domains;
- project stage;
- confidence score;
- risk and complexity;
- missing information;
- validation needs;
- recommended next actions;
- safety note.

The form still uses the existing `/api/leads` flow, so Resend and Google Sheets behavior remains controlled by current environment variables. Analytics receives only safe mode and classification data, not names, emails, phone numbers or full notes.

## Future context handoff

Phase 71D adds local context handoff. The current Proposal Builder and Project Intake links include lightweight query parameters:

- `source=ai-discovery`
- `domains`
- `risk`
- `confidence`

The full compact discovery context is saved locally in `sessionStorage` and `localStorage` using `src/lib/ai-intelligence/discovery-context.ts`. It can be loaded by Proposal Builder and Project Intake to show a summary, prefill safe fields and include a compact generated summary in lead submissions.

Phase 75B/75C extends the local handoff with an optional `aiMagic` block:

- scenario id and scenario label;
- opportunity type, urgency and maturity;
- planning/commercial readiness and complexity;
- sales signals;
- suggested services and recommended next steps.

Detailed notes or sensitive data are not put in URLs. The user can edit or ignore imported context at any time.

See `docs/ai-discovery-context-handoff.md` for implementation details.

## Future persistence layer

Current behavior is intentionally local-only. The handoff context is stored under:

- `zes.aiDiscovery.context.v1` in `sessionStorage`;
- the same key in `localStorage` as a fallback when the user returns to the flow.

When backend persistence is introduced, the following data can move from local browser storage to server-side project context storage:

- context ID, version, created/updated timestamps and source;
- detected domains and project stage;
- safe structured answers such as plans available, equipment specs available, budget known and timeline known;
- compact notes summary, not unbounded raw notes;
- confidence, readiness, risk and complexity values;
- missing information labels and validation needs;
- recommended services, calculators, resources and next actions;
- selected next step such as Proposal Builder, Project Intake or technical review.

Do not persist by default:

- name, email, phone or company before an explicit lead submission;
- patient data or medical records;
- raw uploads, photos, PDFs or sketches before explicit upload consent and retention rules exist;
- provider payloads, API responses, analytics identifiers or secrets;
- long free-text notes without truncation and review.

Recommended safe handoff payload shape:

```ts
type PersistedDiscoveryContext = {
  contextId: string;
  version: "v1";
  createdAt: string;
  updatedAt: string;
  source: "ai-discovery";
  selectedNextStep: "proposal-builder" | "project-intake" | "technical-review" | "unknown";
  project: {
    domains: string[];
    stage: string;
    knownAnswers: Record<string, boolean | string | number | undefined>;
    notesSummary?: string;
  };
  intelligence: {
    confidenceScore: number;
    readinessScore: number;
    riskLevel: string;
    complexityLevel: string;
    missingInformation: string[];
    validationNeeds: string[];
  };
  recommendations: {
    suggestedServices: string[];
    suggestedCalculators: Array<{ label: string; href: string }>;
    suggestedResources: Array<{ label: string; href: string; type: string }>;
    nextActions: string[];
  };
  privacy: {
    containsPii: false;
    containsPatientData: false;
    retentionClass: "project-intake-preliminary";
  };
};
```

Migration path:

1. Keep local storage as the default handoff during the frontend-only phase.
2. Add authenticated server persistence only after admin/auth and retention rules exist.
3. Store compact context only after explicit user action, such as "trimite pentru analiza preliminara".
4. Replace full local handoff with a short `contextId` reference in URLs.
5. Load the context server-side in Proposal Builder, Project Intake and admin review.
6. Add deletion/export/retention procedures before storing real project documents.
7. Keep deterministic safety framing even after real AI or document intelligence is added.

## Future AI API path

Recommended order:

1. Keep deterministic orchestrator as the source of truth for allowed outputs.
2. Add an internal fixture preview for QA.
3. Add optional LLM narration only around deterministic outputs.
4. Add retrieval from services, calculators, glossary, comparisons and articles.
5. Add strict prompt safety rules for uncertainty and validation language.
6. Add human-review escalation before any real compliance-sensitive output.

## Future upload path

Recommended order:

1. Define privacy and retention rules.
2. Add upload UI with explicit consent and file-type limits.
3. Store files only after storage/auth decisions exist.
4. Add OCR/vision extraction as a separate server-side pipeline.
5. Return extracted signals with confidence and limitations, never final approvals.

Phase 71I adds the safe document parsing architecture in `docs/document-parsing-architecture.md` and mock-only helpers in `src/lib/ai-intelligence/document-intelligence.ts`.

Supported future inputs:

- PDF project documents and equipment sheets;
- DOC/DOCX briefs, notes and project specifications;
- XLS/XLSX equipment lists, budget tables and room schedules;
- images/screenshots for site photos, sketches and plan captures.

Until a later phase enables real parsing, AI Discovery should only show upload guidance. It must not expose an active upload control, parse documents, persist files or imply that document intelligence is already active.

## Mock document preview

Phase 71J adds `DiscoveryMockDocumentPanel` as a visible demo surface. The user can choose a predefined descriptor such as:

- plan camera PDF;
- brief proiect DOCX;
- lista echipamente XLSX;
- fotografie / screenshot.

The workspace then shows deterministic mock context:

- detected document type;
- possible future extraction signals;
- target flows for the context;
- missing information;
- privacy warnings;
- suggested next action.

If the user continues to Proposal Builder, Project Intake or lead submission, the local discovery context may include `mockDocumentContext`. This is still compact and local. It does not contain a real file, file bytes, OCR text, uploaded content or raw document data.

## Validation checklist

After changes to the workspace:

- run `npm run build`;
- run `npm run content:check`;
- smoke `/ai-discovery`;
- test mobile stacking and horizontal overflow;
- verify Proposal Builder and Project Intake links;
- test lead form success path in mock or active integration mode;
- confirm no public upload control implies active file processing.

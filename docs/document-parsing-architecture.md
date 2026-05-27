# Document parsing architecture

Phase 71I prepares the future upload and document parsing layer without enabling production parsing. Phase 71J adds descriptor-based mock UI visibility. The platform remains deterministic, frontend-safe and mock-only. No OCR, AI extraction, file upload, file persistence or server-side document storage is active.

## Current status

Current public UI shows optional upload guidance and a descriptor-based mock document section in AI Discovery. It does not include an active file picker or upload endpoint.

Current code support:

- `src/components/ai/DiscoveryUploadGuidance.tsx` shows optional document guidance.
- `src/components/ai/DiscoveryMockDocumentPanel.tsx` lets users select demo descriptors such as PDF plan, DOCX brief, XLSX equipment list or image/screenshot.
- `src/lib/ai-intelligence/document-intelligence.ts` defines artifact types, future file policies and deterministic mock parsing helpers.
- AI Discovery local handoff can include compact mock document context, but no file content is stored or parsed.
- Proposal Builder, Project Intake and Lead Intelligence consume the compact summary only when the user chooses to continue.

## Supported future document types

| Type | Extensions | Max size | Future use |
| --- | --- | ---: | --- |
| PDF | `.pdf` | 15 MB | Plans, datasheets, exported project documents, checklists |
| DOC | `.doc` | 10 MB | Older briefs, notes, project specifications |
| DOCX | `.docx` | 10 MB | Briefs, requirements, meeting notes, technical lists |
| XLS | `.xls` | 10 MB | Equipment lists, rough budgets, operational tables |
| XLSX | `.xlsx` | 10 MB | Equipment schedules, room tables, cost planning sheets |
| Images/screenshots | `.png`, `.jpg`, `.jpeg`, `.webp` | 8 MB | Space photos, screenshots of plans, quick sketches |

These limits are planning defaults for the future production parser. They can be tightened before launch if hosting, privacy or provider constraints require it.

## Accepted file policy

Future real parsing should reject:

- unsupported extensions or MIME types;
- files above the configured limit;
- archives such as `.zip`, `.rar`, `.7z`;
- executables, scripts and unknown binary formats;
- files that appear to contain patient medical data;
- files uploaded without explicit user consent and privacy notice.

The client should show clear copy:

- documents are optional;
- users can continue without documents;
- users should remove patient data and unnecessary personal data;
- parsing is preliminary and does not replace technical validation.

## Mock mode behavior

Mock mode must remain the default until a later production phase.

Mock behavior:

- classifies the intended file type from filename, MIME type or declared type;
- checks size against future limits;
- returns deterministic mock signals such as `brief proiect`, `lista echipamente` or `context vizual spatiu`;
- never reads file bytes;
- never calls OCR, AI or third-party parsing APIs;
- never stores the file;
- never returns hidden file content to analytics or lead payloads.

The mock helper output can be used by QA fixtures and future UI previews, but not as evidence that real parsing works.

## Phase 71J mock UI behavior

The AI Discovery mock document panel is descriptor-based. It offers predefined demo choices:

- PDF room/project plan;
- DOCX project brief;
- XLSX equipment list;
- image/screenshot of space or plan.

The panel shows:

- detected document type;
- mock signals that might be extracted later;
- likely target flows: AI Discovery, Proposal Builder, Project Intake and Lead Intelligence;
- missing information;
- privacy warnings;
- suggested next action.

The panel must not:

- render `<input type="file">`;
- read local files;
- call upload endpoints;
- parse document contents;
- persist file names from real users;
- imply production parsing is active.

The local handoff payload may include `mockDocumentContext` with compact signals and warnings. It must not include raw uploaded content, because there is no upload.

## Future real parsing mode

Future real parsing should be server-side only.

Recommended pipeline:

1. User sees an explicit upload notice and confirms that no patient data is intentionally included.
2. Client sends the file to a protected upload endpoint.
3. Server validates extension, MIME type, size and rate limits.
4. Server stores the file only if persistence and retention rules are already approved.
5. Parser extracts a limited set of planning signals.
6. Extracted signals are normalized into compact context, not raw document dumps.
7. The source document and extracted signals receive confidence and limitation metadata.
8. User can review, edit or ignore extracted context before using it downstream.

Real parsing providers should be introduced in this order:

1. Structured office parsing for DOCX/XLSX where possible.
2. PDF text extraction for machine-readable PDFs.
3. OCR for scanned PDFs/images only after privacy and security review.
4. AI-assisted summarization only around already extracted signals and deterministic guardrails.

## Parsing output shape

Future parsed context should stay compact:

```ts
type ParsedDocumentContext = {
  documentId: string;
  fileType: "pdf" | "doc" | "docx" | "xls" | "xlsx" | "image";
  originalFileName: string;
  parsedAt: string;
  parserMode: "mock" | "real";
  confidenceLevel: "low" | "medium" | "high";
  extractedSignals: {
    projectType?: string;
    roomTypes?: string[];
    equipmentTypes?: string[];
    dimensions?: string[];
    utilities?: string[];
    workflowNotes?: string[];
    regulatoryFlags?: string[];
    missingInformation?: string[];
  };
  warnings: string[];
  privacy: {
    containsPii: "unknown" | "no" | "possible";
    containsPatientData: "unknown" | "no" | "possible";
    retentionClass: "transient" | "project-context";
  };
};
```

Avoid sending raw file text into lead emails, Google Sheets or analytics.

## Downstream integration

AI Discovery:

- can use parsed signals to mark known answers such as plans available, equipment specs available or surface known;
- can add missing information and validation needs;
- should always show the user that document-derived context is preliminary.

Proposal Builder:

- can include a small `Document context` section in assumptions and missing information;
- can adjust proposal readiness only after user review;
- should not turn parsed data into final pricing, legal compliance or engineering approval.

Project Intake:

- can prefill documentation status, equipment availability and technical requirement flags;
- must allow editing and ignoring imported data.

Lead Intelligence:

- can include compact indicators such as `plans available`, `equipment list provided` or `photos provided`;
- should not send raw content or file names that expose sensitive data to analytics;
- should map only reviewed summary fields to email, Sheets or future CRM.

## Privacy and PII rules

- Do not request patient data.
- Do not parse medical records.
- Do not persist files before auth, retention and deletion policies exist.
- Do not expose file contents in the browser console, analytics, client API response or public routes.
- Do not include raw document text in Google Sheets.
- Do not send file contents in internal notification emails.
- Prefer extracted planning signals over document excerpts.
- Allow users to continue without documents.

## Operational safeguards

Before real parsing:

- add authentication or a protected upload token strategy;
- add rate limiting;
- add antivirus/malware scanning if files are stored;
- define retention and deletion rules;
- define maximum files per lead/session;
- add user-visible privacy text;
- add admin handling rules for sensitive files;
- add rollback mode to disable parsing immediately.

Rollback mode:

```env
DOCUMENT_PARSING_MODE=mock
DOCUMENT_UPLOAD_ENABLED=false
```

These env vars are not active yet; they are the recommended future control surface.

## QA checklist

- AI Discovery still says uploads are optional and inactive.
- AI Discovery mock document panel is clearly labeled `mock/demo only`.
- No route exposes a real file input unless a later phase enables it.
- No upload endpoint exists yet.
- Mock helpers do not read files.
- Build and content check pass.
- Lead submissions still use compact summaries only.
- Admin pages remain noindex and excluded from sitemap.

## Admin lifecycle visibility

Phase 71K keeps document intelligence mock-only but makes it easier to review internally:

- `/admin/lead-flow` shows Mock Document Context as a lifecycle stage;
- `/admin/leads` shows mock document signals, missing information, target flows and privacy warnings for demo leads that include document context;
- all labels must remain `mock`, `demo` or equivalent;
- no actual file input, upload endpoint, OCR output or raw document content should appear in admin.

Future real parsing should continue to map only compact reviewed document signals into Lead Intelligence, email, Sheets or CRM.

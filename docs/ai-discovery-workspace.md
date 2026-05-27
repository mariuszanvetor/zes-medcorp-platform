# AI Discovery workspace

`/ai-discovery` is the first public guided discovery workspace built on the deterministic medical infrastructure intelligence architecture.

It is not a generic chatbot and it does not use a real AI API yet. The workspace uses the Phase 71A/71B deterministic orchestrator to guide users through project context, missing information, risk signals and next-step recommendations.

## What it does now

- Accepts partial project context through structured controls and free text.
- Supports multiple medical infrastructure domains, including imaging, RMN, CT, radiology, dental, IVD/laboratory, OR, ATI, sterilization, cardiology, ultrasound, modernization, HVAC, electrical, UPS and workflow.
- Runs `orchestrateAdaptiveDiscovery()` client-side with deterministic rules.
- Shows live detected domains, confidence, missing information, risk, complexity, readiness score and recommended resources.
- Suggests optional document types such as sketches, plans, equipment datasheets, photos and technical plans.
- Allows users to continue with assumptions instead of blocking when details are missing.
- Offers handoff CTAs to Proposal Builder and Project Intake.
- Uses `LeadCaptureForm` to send discovery context for preliminary ZES review.

## What it does not do yet

- It does not call a real AI model.
- It does not upload or process files.
- It does not perform OCR, image analysis or document understanding.
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

The current Proposal Builder and Project Intake links include lightweight query parameters:

- `source=ai-discovery`
- `domains`
- `risk`
- `confidence`

Future phases can replace this with a safe local project context model or authenticated workspace storage. Until storage exists, the workspace should not imply that full context is automatically transferred.

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

## Validation checklist

After changes to the workspace:

- run `npm run build`;
- run `npm run content:check`;
- smoke `/ai-discovery`;
- test mobile stacking and horizontal overflow;
- verify Proposal Builder and Project Intake links;
- test lead form success path in mock or active integration mode;
- confirm no public upload control implies active file processing.

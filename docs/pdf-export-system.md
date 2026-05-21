# PDF Export System

## Current Implementation

Proposal Builder now supports real client-side PDF export without a backend and without new dependencies.

Implementation files:

- `src/lib/proposal-document.ts` defines the structured proposal document.
- `src/components/proposal/ProposalDocumentPreview.tsx` renders the on-page preview.
- `src/lib/proposal-pdf.ts` generates a deterministic PDF file in the browser.
- `src/components/ai/ProposalBuilderResult.tsx` exposes the export controls.

The selected approach is a lightweight browser-safe PDF writer. It creates a valid PDF Blob, generates pages, writes text, sections, tables, page footers and a professional disclaimer, then downloads the file locally.

## Why This Approach

Benefits:

- No backend required.
- No paid services.
- No extra dependencies.
- Deterministic output from existing proposal data.
- Works with Next.js App Router because the export runs inside a client component.
- Keeps sensitive inputs local to the browser unless the user submits a lead form.

Tradeoffs:

- The lightweight PDF generator uses built-in PDF fonts.
- Romanian diacritics are normalized in the generated PDF for compatibility with standard PDF fonts.
- The generated PDF is intentionally clean and text-focused rather than visually identical to the web preview.
- Advanced layouts, embedded custom fonts and exact brand typography should be handled by a future server-side PDF renderer.

## PDF Structure

The exported PDF includes:

- ZES MEDCORP branding
- SC ZES MEDCORP S.R.L. company details
- proposal title
- proposal identifier
- local version label
- generated date
- document type
- project summary
- assumptions
- recommended services
- technical stages
- modular recommendations
- budget estimate and disclaimer
- timeline
- risk register
- missing information
- validation notes
- suggested next actions
- related resources/services
- page footer and page numbering
- professional preliminary-proposal disclaimer

The PDF deliberately avoids:

- fake signatures
- fake approvals
- fake certifications
- exact pricing guarantees
- final engineering approval language

## Proposal Identity and Versioning Prep

The current export creates a local proposal snapshot at generation time.

Current fields:

- proposal ID, for example `ZES-PROP-[date]-[hash]`
- version label, currently `v1.0 - previzualizare locală`
- document type: `Propunere tehnică preliminară`
- generated timestamp
- project type
- budget/timeline/risk summary

The snapshot is not persisted. It only prepares the structure for a future saved proposal system.

Future saved proposal versions should add:

- server-side proposal records
- revision reasons
- user/admin attribution after authentication
- version comparison
- export event history
- CRM or Google Drive attachment handling, if needed

## Export UX

Proposal Builder now shows:

- `Descarcă propunerea PDF`
- `Deschide pentru print`

The download button creates a `.pdf` file directly. The print option opens the generated PDF Blob in a new tab, where the browser/PDF viewer can print or save.

## File Naming

Filenames are generated from the proposal type:

- `zes-propunere-rmn.pdf`
- `zes-propunere-ct.pdf`
- `zes-propunere-modernizare.pdf`
- `zes-propunere-laborator-ivd.pdf`
- `zes-propunere-service.pdf`
- fallback: `zes-propunere-[tip-proiect].pdf`

## Analytics

The export flow tracks only safe, non-PII events:

- `proposal_pdf_export`
- `proposal_print`

Tracked fields may include:

- source page
- source tool
- project type
- budget range
- complexity
- risk level
- export/open status

No names, emails, phone numbers, company names or free-text messages are sent to analytics.

## Current Limitations

- PDF generation is browser-side and local only.
- No proposal is stored permanently.
- No PDF is attached to a CRM record.
- No official logo image is embedded in the PDF yet.
- No digital signature, engineering approval, legal approval or authorization language is added.
- PDF layout is intentionally text-focused for reliability.

## Browser Limitations

Desktop browsers should support Blob download reliably.

Potential limitations:

- Some mobile browsers may preview the PDF instead of downloading.
- Popup blockers may prevent the print/open-new-tab flow.
- Browser PDF viewers differ in print controls and filename handling.
- The direct PDF generator does not embed custom fonts.

The UI shows a graceful error message if export/open fails.

## Diacritics Strategy

The current dependency-free PDF generator uses built-in PDF Type 1 fonts. To avoid broken characters in PDF viewers, Romanian diacritics are normalized in the exported PDF.

The web preview keeps Romanian copy as normal UTF-8 text.

Full Romanian diacritics in the PDF should be handled later by either:

- a server-side PDF renderer with embedded fonts
- a browser renderer that supports custom font embedding
- a dedicated PDF service after backend activation

This was intentionally not added now because it would require heavier rendering logic or additional dependencies.

## Mobile Notes

On mobile, users may need to:

- open the page in a full browser instead of an in-app browser
- use the browser share/save action
- use the generated PDF preview tab for print/save

No layout-breaking modal or heavy export flow is used.

## Future Improvements

Potential next steps:

- Add a server-side PDF endpoint after backend activation.
- Use a dedicated renderer such as Playwright, React PDF or a hosted PDF service.
- Embed official brand fonts and final logo assets.
- Add richer tables, page headers and controlled cover page artwork.
- Add optional CRM attachment upload after real CRM integration exists.
- Add proposal version IDs once real storage exists.
- Add saved proposal history after authentication and lead storage exist.
- Add comparison between proposal snapshots.
- Add official PDF logo embedding after final brand assets are supplied.

## Legal and Disclaimer Notes

The PDF must remain framed as preliminary technical guidance. It should not be treated as:

- final engineering approval
- legal authorization advice
- final commercial offer
- final equipment compatibility confirmation
- guarantee of project timing or cost

Final project validation depends on site conditions, equipment specifications, documentation, authorization status and a technical review by ZES.

## Branding Customization

Current PDF branding uses:

- `ZES MEDCORP`
- `SC ZES MEDCORP S.R.L.`
- `office@zescorp.ro`
- `0725 514 782`
- `CUI 52942540`
- `Reg. Com. J2025089432009`
- `Str. Năzuinței nr. 11B, Bragadiru, Ilfov`
- ZES blue accents
- clean white background
- professional technical layout

When final brand assets are supplied, the PDF generator can be extended to embed a logo image or use a server-side renderer for higher fidelity.

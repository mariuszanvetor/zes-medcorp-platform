# Production demo checklist

This checklist is for the ZES MEDCORP staging/live demo before a deploy review or client presentation.

The platform currently presents ZES-guided planning with either server-side AI or deterministic fallback, local handoff, mock document context, proposal PDF export and internal admin demo workflows. It must not be presented as an engineering approval system, CRM, database, OCR pipeline or regulatory authority.

## Demo boundaries

- AI Discovery remains preliminary.
- Homepage ZES can run in `real`, `fallback` or `mock` mode depending on server-side environment configuration.
- Proposal Builder creates an orientative technical proposal, not a final offer or engineering approval.
- Project Intake collects structured project context for a later technical discussion.
- Mock document intelligence uses descriptors only. No real file upload, OCR, parsing or storage is active.
- Admin pages are internal, noindex/nofollow and excluded from sitemap.
- Admin lead review uses demo data and local-only workflow actions.
- Email and Google Sheets behavior depends on deployment environment variables. Do not run uncontrolled test submissions in production.

## Public demo flow

1. Open `/`.
2. Verify `/#zes-guide` is the dominant above-the-fold entry.
3. Test `Discuta cu ZES` with at least one starter prompt and one free-text prompt.
4. Verify ZES returns consultative guidance with a visible runtime label (`real`, `fallback` or `mock`).
5. Verify capability chips and lead summary update after each meaningful assistant response.
6. Verify document language is clearly demo-only (no fake parsing claims).
7. Trigger a high-intent ZES path (service urgent or CT/RMN) and verify inline lead capture appears.
8. Submit one mock ZES lead from inline panel and confirm success + mode summary.
9. Test file analysis in ZES with one image and one PDF; confirm the analysis appears in conversation.
10. Test an unsupported file type and verify graceful manual-review messaging.
9. Open `/ai-discovery` (ZES AI Copilot workspace).
10. Optional: open `/ai-discovery?scenario=ct-clinic` or `/ai-discovery?scenario=mri-room` to demo AI Magic scenario handoff.
11. Answer a few guided questions.
12. Use `Continua cu ipoteze preliminare` if details are incomplete.
13. Review the live intelligence panel: domains, missing information, readiness, risk, complexity and recommended next actions.
14. Open the mock document section and select a descriptor if demoing future document parsing.
15. Continue to `/proposal-builder`.
16. Verify the imported context appears and can be edited or ignored.
17. Generate the proposal result.
18. Export the PDF and verify branding, company details, proposal ID, disclaimer and readable section hierarchy.
19. Return to `/ai-discovery` or open `/project-intake`.
20. Verify the imported context appears in Project Intake and remains editable.
21. Submit a lead only in the intended environment and with safe test data.

For Phase 75C/75D conversational demo quality, also confirm:

- ZES Copilot guidance is visible in AI Discovery;
- scenario concerns and blockers are visible for seeded scenarios;
- project and commercial readiness indicators are visible in the sidebar;
- dependency groups and opportunity markers are visible in the sidebar;
- compliance/funding hints stay preliminary and non-committal.

## Admin demo flow

1. Open `/admin/lead-flow`.
2. Confirm the page shows internal, noindex, mock/demo and no CRM/no DB labels.
3. Review integration modes: email, Sheets, storage and runtime flags.
4. Run `Ruleaza test lead intern` only when a controlled internal test is intended.
5. Verify the response summary uses safe fields only: success, score, priority, emailMode, sheetsMode, storageMode and integrationMode.
6. Open `/admin/leads`.
7. Review demo leads by source: AI Discovery, Proposal Builder, Project Intake, service and commercial/equipment leads.
8. Apply local mock actions: reviewed, needs clarification, ready for offer or high priority.
9. Confirm the local action history updates without backend persistence.
10. Open `/admin/seo-launch` for Search Console indexing priorities.
11. Open `/admin/content-ops` for LinkedIn and outreach operating material.

## Mobile QA

Check at a narrow viewport before presentation:

- Header and mobile navigation open/close cleanly.
- Hero CTA buttons wrap without overflow.
- Public demo entry cards stack cleanly.
- AI Discovery conversation and intelligence panels stack vertically.
- Proposal Builder cards, result panels and PDF export controls remain readable.
- Project Intake step controls and option cards are tappable and not cramped.
- Admin dashboards remain usable even when dense; horizontal overflow should be limited to intentionally scrollable tables if present.
- Sticky CTA labels remain short enough for mobile.

## Deploy smoke test

After a deploy reaches `Ready`, open:

- `/`
- `/service-aparatura-medicala`
- `/radioprotectie-plumbare-rx`
- `/ai-discovery`
- `/proposal-builder`
- `/project-intake`
- `/admin/lead-flow`
- `/admin/leads`
- `/admin/content-ops`
- `/admin/seo-launch`
- `/sitemap.xml`
- `/robots.txt`

Expected results:

- Public routes return 200.
- Admin routes return 200 only after the configured admin gate allows access.
- Admin routes include noindex/nofollow metadata.
- `/sitemap.xml` does not include `/admin/*`.
- `/robots.txt` references `/sitemap.xml`.
- No page presents deterministic planning as final approval or guaranteed compliance.

## Lead flow smoke test

Use one controlled test payload at most unless debugging:

1. Submit from AI Discovery or Admin Lead Flow Monitor.
2. Confirm the frontend success state is shown for HTTP 200 responses.
3. Confirm 429 cooldown messaging appears only when rate limiting is triggered.
4. Confirm no PII is sent to analytics.
5. If email is active, verify the internal notification reaches the configured recipient.
6. If Sheets is active, verify exactly one row is appended with expected columns.
7. Confirm no customer confirmation email is sent unless explicitly enabled in a future phase.
8. For ZES leads with file analysis, confirm metadata includes compact file analysis summary only.

## SEO and indexability

- Submit or refresh `/sitemap.xml` in Search Console after production deploy.
- Request indexing first for homepage, AI Discovery, Proposal Builder, Project Intake, key hubs and high-intent service/calculator pages.
- Do not request indexing for admin routes.
- Confirm legal/company pages remain accessible and included where intended.
- Confirm no public page has accidental noindex metadata.

## Mock-only limitations to mention

- Real AI may be connected only server-side and only when `ZES_AI_ENABLED=true` plus `OPENAI_API_KEY` are configured.
- If AI is disabled or unavailable, ZES must remain useful through deterministic fallback.
- Upload analysis is preliminary; no permanent raw file storage is active.
- DOCX/XLSX parsing is still manual-review guidance in this phase.
- No proposal persistence exists.
- No CRM, database or real admin data source is active.
- Admin workflow actions are local to the browser session.
- Project context handoff uses local browser storage, not server persistence.
- Proposal PDFs are generated client-side and may vary by browser print/PDF implementation.

## Rollback notes

For a safe demo fallback:

- Set `LEAD_INTEGRATION_MODE=mock` to disable real integration flows.
- Set `EMAIL_PROVIDER=mock` to prevent real email sending.
- Set `LEAD_CONFIRMATION_EMAIL_ENABLED=false`.
- Set `HIGH_PRIORITY_ALERT_EMAIL_ENABLED=false`.
- Keep `ADMIN_ACCESS_ENABLED=true` and rotate `ADMIN_ACCESS_PASSWORD` if shared during testing.
- Redeploy after environment changes.
- Re-run the deploy smoke test and one mock lead test.

## Final pre-presentation check

- Build passes with `npm run build -- --webpack`.
- Content check passes with `npm run content:check`.
- Route smoke passes for all demo routes.
- Admin routes are noindex/nofollow.
- Sitemap excludes admin routes.
- Demo data is clearly labeled as mock/internal.
- Public copy remains professional, technical and preliminary.
- ZES branding is consistent: `ZES`, `ZES Copilot`, `ZES AI Copilot`, `ZES Guided Planning`.

## Phase 76D conversation QA scenarios

1. RX shielding close:
   - feed project type, city, budget, timeline, CNCAN status, plan availability and phone;
   - verify ZES closes with summary and does not keep asking repeated questions.
2. Service close:
   - use equipment symptom + close intent (`trimite cererea`) + phone/city;
   - verify inline lead capture appears quickly.
3. File already uploaded:
   - upload plan/image, continue conversation;
   - verify ZES uses file context and does not re-ask for same file.
4. Fallback mode:
   - set AI disabled/missing key;
   - verify deterministic close behavior still works.

## Phase 77A visual and floating QA

1. Desktop hero: verify headline, premium visual and shortcut landing links.
2. Mobile hero: verify no overflow and CTA readability.
3. Floating ZES button:
   - visible on homepage and public routes;
   - hidden on admin routes and `/ai-discovery`.
4. Floating popup:
   - auto-open timing after short delay/scroll;
   - minimize/close/reopen works;
   - state persistence works after refresh.
5. Popup conversation:
   - text, upload and lead capture remain functional;
   - conversation continuity preserved in popup mode.

## Phase 77B popup and landing QA

1. In popup mode, verify input bar remains visible while scrolling conversation.
2. Send one prompt and confirm auto-scroll keeps latest ZES response in view.
3. Upload one file and confirm analysis notice appears without losing input access.
4. Trigger high intent and verify compact `Cerere pregatita` card appears before full lead form.
5. Open `/service-aparatura-medicala` and confirm CTA opens/seeds ZES service prompt.
6. Open `/radioprotectie-plumbare-rx` and confirm CTA opens/seeds radioprotectie prompt.

## Phase 78A trust and conversion QA

1. Homepage must read as a real implementation company before AI:
   - trust copy,
   - workflow clarity,
   - project showcase realism.
2. Portfolio cards:
   - readable challenge/delivery/context,
   - no fake client names,
   - consistent visual quality.
3. Human contact visibility:
   - phone/email/WhatsApp actions visible and working.
4. Service landing:
   - support expectations clear,
   - urgent conversion CTA visible.
5. Radioprotectie landing:
   - preliminary framing clear,
   - technical support/contact reassurance visible.
6. ZES remains available but does not visually dominate trust sections.

## Phase 78B popup UX fix QA

1. Open popup, minimize, reopen, close, reopen and refresh page:
   - state persistence should remain stable,
   - no double-open or invisible-stuck panel.
2. In popup mode, verify composer is always visible at the bottom:
   - upload button,
   - input,
   - send button.
3. Send a message and confirm latest user/assistant content stays in view automatically.
4. Upload a file and confirm analysis feedback appears without losing composer visibility.
5. Trigger lead-ready state and confirm compact final card:
   - `Cerere pregatita pentru preluare`,
   - one primary action,
   - one secondary action.
6. Confirm seeded popup CTAs from landing pages still open the same conversation context.

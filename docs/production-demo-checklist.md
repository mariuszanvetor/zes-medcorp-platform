# Production demo checklist

This checklist is for the ZES MEDCORP staging/live demo before a deploy review or client presentation.

The platform currently presents deterministic planning intelligence, local handoff, mock document context, proposal PDF export and internal admin demo workflows. It must not be presented as a live AI engineering approval system, CRM, database, OCR pipeline or regulatory authority.

## Demo boundaries

- AI Discovery is deterministic and preliminary.
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
4. Verify ZES returns deterministic consultative guidance (intent, missing info, next action and CTA routing).
5. Verify capability chips and lead summary update after each meaningful assistant response.
6. Verify document language is clearly demo-only (no fake parsing claims).
7. Trigger a high-intent ZES path (service urgent or CT/RMN) and verify inline lead capture appears.
8. Submit one mock ZES lead from inline panel and confirm success + mode summary.
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

## SEO and indexability

- Submit or refresh `/sitemap.xml` in Search Console after production deploy.
- Request indexing first for homepage, AI Discovery, Proposal Builder, Project Intake, key hubs and high-intent service/calculator pages.
- Do not request indexing for admin routes.
- Confirm legal/company pages remain accessible and included where intended.
- Confirm no public page has accidental noindex metadata.

## Mock-only limitations to mention

- No real AI API is connected.
- No real OCR, upload endpoint or document parsing is active.
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

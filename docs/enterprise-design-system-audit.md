# Enterprise Design System Audit

Phase 72A audit scope: homepage, AI Discovery, Proposal Builder, Project Intake, admin demo pages, shared UI primitives, typography, spacing, CTA hierarchy and mobile responsiveness.

This phase is audit and planning only. No business logic, integrations or route architecture should change as part of this document.

## Phase 75D addendum (ZES Copilot presence)

The platform now applies a targeted visual/voice upgrade on top of the earlier design audit:

- `ZES Copilot` naming is now the primary AI presence across homepage and AI Discovery.
- AI Discovery sidebar uses layered intelligence cards (readiness, risk, blockers, dependencies, opportunity markers).
- Conversational rhythm in discovery now includes scenario transitions and infrastructure advisory notes.
- Homepage now surfaces the AI Magic section earlier for stronger enterprise guided-planning positioning.

Design intent remains unchanged:

- calm medical-business visual language,
- deterministic/mock-safe behavior disclosure,
- no fake streaming or chatbot theatrics,
- no changes to lead/API logic.

## Phase 75F addendum (single conversational entry)

Homepage now prioritizes ZES as the single conversational entry:

- headline-first guided conversation above fold;
- dominant input + send action;
- deterministic follow-up rhythm instead of tool-first selection;
- lead summary and capability chips visible during chat.

Design implication:

- separate tool CTAs are now supporting modules;
- conversation surface acts as primary navigation into planning, ofertare, service and contact;
- the visual system should keep this section clear and uncluttered on mobile.

## Phase 76B/76C addendum (final launch experience)

The launch pass reinforces one primary public interaction model:

- users talk with ZES first;
- users can attach files in the same chat flow;
- users receive concise guidance plus a preliminary request brief;
- users can submit lead data inline without route hopping.

Design implications:

- the composer row (input, upload, send) must stay prominent and readable on mobile;
- upload status should be explicit but lightweight;
- conversion panels should be short and contextual;
- supporting tools remain available, but the homepage hierarchy must keep ZES as the first decision point.

## Methodology

Reviewed:

- public route HTML smoke for `/`, `/ai-discovery`, `/proposal-builder`, `/project-intake`;
- admin route HTML smoke for `/admin/lead-flow`, `/admin/leads`;
- shared component source in `src/components/ui`, `src/components/sections`, `src/components/ai`, `src/components/admin`, `src/components/layout`;
- route and sitemap behavior from the current Next.js app.

Note: the in-app browser pane was unavailable during this audit, so the visual assessment is based on route smoke, HTML/source inspection and accumulated component patterns. A screenshot pass should be the first step of Phase 72B before implementation changes.

## Executive Summary

The platform is enterprise-capable in structure and content depth, but the interface now has the typical signs of rapid product expansion:

- too many card styles with slightly different radii, borders, shadows and backgrounds;
- several dark/glass tool surfaces competing with the light enterprise medical-business aesthetic;
- CTA hierarchy is strong in individual places but inconsistent across the journey;
- tool pages are information-rich but can feel dense because many panels use equal visual weight;
- admin pages are useful and well-labeled as demo/internal, but tables and panels need a cleaner command-center system;
- typography is generally professional, but some headings are oversized for compact tool surfaces;
- mobile structure is mostly safe, but sticky sidebars, wide tables and dense badges need stricter responsive rules.

Recommended design direction: keep the current white/blue premium system, reduce decorative shadows, consolidate panels, make CTAs journey-based, and separate public authority pages from internal/admin utility pages.

## Component Inventory

### UI Primitives

- `src/components/ui/Button.tsx`: primary, secondary, outline, ghost and dark variants. Strong baseline, but some variants are context-dependent and used differently across dark/light surfaces.
- `src/components/ui/Card.tsx`: surface, dark, glass and outline variants. Good abstraction, but many pages override card visuals manually with custom rounded/shadow classes.
- `src/components/ui/Badge.tsx`: used heavily for trust, status and mode labels. Needs density rules so badges do not dominate mobile layouts.
- `src/components/ui/Section.tsx`: consistent section spacing scale. Some route-level pages still hand-roll layout spacing.
- `src/components/ui/Container.tsx`: solid max-width system.
- `src/components/ui/CTA.tsx`: useful, but not consistently used across AI/tool flows.

### Layout

- `src/components/layout/Header.tsx`: clean and stable, but primary CTA still points to legacy advisor rather than the newer AI Discovery entry point.
- `src/components/layout/Footer.tsx`: mature grouping; should remain the legal/contact anchor.
- `src/components/layout/ConversionStickyCTA.tsx`: useful, but should be reviewed against mobile fatigue and page-specific CTA hierarchy.

### Public Sections

- `HeroSection`: strong first impression; current hero is polished but large and visually dominant.
- `EnterpriseTrustBand`: strong trust layer and should become the reference pattern for enterprise positioning blocks.
- `PublicDemoEntrySection`: good staging/demo entry pattern; can become the model for journey cards.
- `AIToolsPreviewSection`: useful but visually heavy due to dark panel and many equally weighted tool cards.
- `EcosystemNavigation`: important for crawl and user journeys; should become more visually calm and systematic.
- `FinalCTASection`: strong conversion closure, but should be harmonized with new consultative CTA language.

### AI / Tool Components

- `DiscoveryWorkspace`: good deterministic workspace structure with main flow plus intelligence sidebar.
- `DiscoveryConversation`: useful but panel-heavy; should get a clearer step system and lighter repeated cards.
- `DiscoveryIntelligencePanel`: important, but should become a compact status summary on mobile and a persistent expert panel on desktop.
- `DiscoveryMockDocumentPanel`: safely labeled, but should visually read as demo/prep rather than a primary feature.
- `ProposalBuilder`: dark/glass form surface creates a different product mood than AI Discovery and Project Intake.
- `ProposalBuilderResult`: functionally rich; needs hierarchy cleanup so intelligence, PDF, lead CTA and recommendations do not compete.
- `ProjectIntakeWizard`: strong wizard foundation; needs a more polished progress rail and consistent field grouping.
- `LeadCaptureForm`: central conversion component; should receive the clearest enterprise form pattern.

### Admin Components

- `AdminShell`: now has strong internal/demo labels. Needs a stricter admin navigation pattern.
- `LeadReviewCenter`: feature-rich, but visually dense. Needs table/card split, toolbar, and detail drawer/panel rules.
- `LeadFlowMonitor`: clear diagnostics, but lifecycle/status cards should be standardized with admin dashboard components.
- `AdminAccessGate` and `AdminAccessNotice`: appropriate for current temporary protection.

## Route Findings

### Homepage

Strengths:

- strong brand presence and hero image;
- clear trust framing;
- now has demo entry paths to AI Discovery, Proposal Builder and Project Intake;
- ecosystem navigation improves crawl and user flow.

Issues:

- many sequential sections have card-heavy layouts, which can make the page feel long before the user reaches a focused action;
- CTA hierarchy splits between contact, AI Discovery, Project Intake and older advisor/calculator paths;
- dark AI tools block is visually strong but may feel heavier than the enterprise medical aesthetic.

Priority:

- make AI Discovery the primary planning CTA;
- demote older advisor language where needed;
- standardize homepage cards to one enterprise card style;
- add a sharper section rhythm: orient, choose path, validate, contact.

### AI Discovery

Strengths:

- best current expression of the future product direction;
- deterministic and safely framed;
- live intelligence sidebar is valuable;
- context handoff paths are clear.

Issues:

- repeated rounded panels with similar weight can reduce scanning speed;
- sidebar can become long and dense;
- mock document panel should remain visibly secondary;
- mobile needs a distinct summary-first order.

Priority:

- create a `WorkspacePanel` component for repeated AI panels;
- create a compact intelligence summary pattern for mobile;
- separate primary action row from secondary handoff actions.

### Proposal Builder

Strengths:

- rich proposal intelligence and PDF export;
- strong deterministic assembly engine;
- clear preliminary disclaimers.

Issues:

- dark/glass form surface is less consistent with the newer light enterprise system;
- result page has many high-weight panels;
- PDF preview/export controls need a cleaner document-action group.

Priority:

- move Proposal Builder toward the same light workspace visual language as AI Discovery;
- create a `ResultSummaryHeader` for score, complexity, readiness and next action;
- make PDF export a calm utility action, not a competing primary CTA.

### Project Intake

Strengths:

- clear multi-step flow;
- good lead-quality positioning;
- imports discovery context.

Issues:

- wizard progress, form fields and summary cards need a more refined enterprise rhythm;
- some option sets can feel dense on mobile;
- step labels should use a consistent short Romanian style.

Priority:

- improve progress rail;
- group fields into fewer visual bands;
- add clearer "edit/continue" affordances after imported context.

### Admin Demo Pages

Strengths:

- clearly internal/demo/noindex;
- lead lifecycle and mock workflow are useful;
- admin functionality is now realistic for review rehearsals.

Issues:

- `/admin/leads` has very high visual density, wide table, many metrics and sticky detail panel;
- admin components reuse public card language instead of a stricter dashboard language;
- mock action controls need a more compact toolbar treatment later.

Priority:

- define admin dashboard components: metric tile, status table, detail panel, action toolbar, history feed;
- keep admin light/blue but reduce public marketing shadows;
- make mobile admin acceptable but not over-optimized, since primary use is desktop.

## Typography Audit

Current strengths:

- type is readable and generally restrained;
- headings use strong line-height and text balance;
- body copy is professional.

Risks:

- `text-6xl` and `text-7xl` appear across many route heroes, which can flatten hierarchy and make tool pages feel like landing pages;
- compact panels sometimes use headings that are too large for the amount of content;
- badge uppercase tracking is common and can make dense admin/tool views feel busy.

Recommended scale:

- public hero H1: 48-64px desktop, 36-44px mobile;
- tool/workspace page H1: 40-56px desktop, 34-40px mobile;
- panel heading: 20-28px;
- card title: 16-20px;
- dashboard metric value: 24-32px;
- body: 15-17px with 1.65-1.8 line-height.

## Spacing Audit

Current strengths:

- `Section` gives a useful global spacing system;
- most routes use enough breathing room;
- forms and cards rarely feel cramped on desktop.

Risks:

- many nested cards/panels add cumulative padding and long scroll depth;
- large shadows plus large gaps make tool workflows feel less compact than operational software;
- admin pages need denser but organized spacing.

Recommended spacing tokens:

- page section: `py-20/py-28` public, `py-12/py-16` tool/admin;
- workspace panel: 20-24px padding;
- dense admin panel: 16-20px padding;
- card gap: 16-24px;
- major section gap: 48-72px.

## CTA Hierarchy Audit

Recommended global hierarchy:

1. Primary planning action: AI Discovery or Project Intake depending on page context.
2. Proposal action: Proposal Builder after enough project context exists.
3. Consultation action: Contact / technical review.
4. Educational action: calculators, comparisons, glossary, Knowledge Hub.

Findings:

- homepage now points more clearly to AI Discovery, Proposal Builder and Project Intake;
- header CTA still points to `/ai-project-advisor`, which should likely move to `/ai-discovery` in the redesign phase;
- repeated "analiza preliminara" CTAs are appropriate but need context-specific labels;
- tool result pages should have one primary next step and a smaller secondary group.

## Mobile Responsiveness Audit

Known safe patterns:

- most complex grids collapse to one column;
- wide admin and comparison tables use horizontal overflow;
- button groups generally stack.

Risks to test with screenshots in Phase 72B:

- sticky CTA at small widths;
- admin table usability;
- badge wrapping in AI Discovery and admin pages;
- Proposal Builder dark panels on mobile;
- Project Intake option cards;
- PDF export/action controls;
- intelligence sidebar order on mobile.

## Priority Redesign List

### P0 - Foundation Before Component Changes

1. Define enterprise design tokens for radius, shadow, spacing, panel surfaces and text scale.
2. Decide whether tools stay light-first or keep dark/glass surfaces.
3. Align primary CTA strategy around AI Discovery, Project Intake and Proposal Builder.
4. Run screenshot QA at desktop, tablet and mobile before edits.

### P1 - Shared Component Consolidation

1. Add `WorkspacePanel` for AI/tool panels.
2. Add `DashboardPanel`, `MetricTile`, `StatusBadge`, `ActionToolbar` for admin.
3. Add `PageHero` variants for public, tool, and admin pages.
4. Add `CTAGroup` with primary/secondary/tertiary rules.
5. Reduce custom one-off shadows and rounded values.

### P2 - Key Page Redesign Targets

1. AI Discovery: improve panel hierarchy and mobile intelligence summary.
2. Proposal Builder: migrate from dark/glass to light enterprise workspace.
3. Project Intake: polish wizard progress and field grouping.
4. Homepage: simplify section rhythm and CTA ladder.
5. Admin leads: create command-center density system.

### P3 - Polish Pass

1. Normalize Romanian microcopy and diacritics in visible UI.
2. Reduce overuse of uppercase badges in dense screens.
3. Standardize disclaimer/caution blocks.
4. Audit mobile sticky CTA and footer density.
5. Review print/PDF controls visually after Proposal Builder redesign.

## Recommended Phase 72B Implementation Plan

Phase 72B should not redesign every page at once. Suggested order:

1. Add design tokens and non-breaking component variants.
2. Build `WorkspacePanel`, `CTAGroup`, `DashboardPanel` and `MetricTile`.
3. Update AI Discovery first because it is the strategic product direction.
4. Update Proposal Builder to align with AI Discovery.
5. Update Project Intake.
6. Update admin pages with dashboard-specific components.
7. Run visual screenshot QA and mobile checks after each page group.

## Validation Checklist For Future Redesign

Every redesign slice should verify:

- `npm run build -- --webpack`;
- `npm run content:check`;
- route smoke for `/`, `/ai-discovery`, `/proposal-builder`, `/project-intake`, `/admin/lead-flow`, `/admin/leads`;
- admin remains noindex/nofollow;
- sitemap excludes admin;
- no changes to lead integration modes;
- no new real AI, upload, CRM, email or Sheets behavior.

## Phase 77A launch polish decisions

- Homepage is now trust-first: hero visual + enterprise copy first, AI interaction second.
- ZES is positioned as premium concierge, not as the entire brand identity.
- Core public rhythm: Hero -> Services -> Trust layer -> Technical domains -> ZES guided planning -> Workflow.
- Primary CTA hierarchy simplified around `Discuta cu ZES` and technical evaluation flows.
- Floating assistant introduced with compact popup behavior for low-friction access.
- Sticky conversion bar is hidden on homepage to reduce CTA conflict with floating ZES.

## Phase 77B visual and conversion addendum

- Floating assistant panel was simplified for readability: lighter header, reduced dense text and compact metadata panels.
- Popup now prioritizes conversation flow with persistent bottom message bar and improved mobile tap targets.
- Service-first and radioprotection-first landing pages were added for high-intent entry:
  - `/service-aparatura-medicala`
  - `/radioprotectie-plumbare-rx`
- Homepage shortcut routing now includes those two focused funnels for faster conversion paths.

## Phase 78A trust-first company positioning

- Homepage now prioritizes company credibility before AI depth:
  - implementation capability,
  - portfolio-style project context,
  - workflow and human contact clarity.
- Added trust/proof structure:
  - operational trust layer,
  - project showcase cards with anonymized real-world context,
  - direct contact actions (phone/email/WhatsApp).
- ZES remains prominent but repositioned as assistant to a real technical company, not as a standalone AI demo.
- Landing pages `/service-aparatura-medicala` and `/radioprotectie-plumbare-rx` now include stronger support expectations and trust-oriented conversion paths.

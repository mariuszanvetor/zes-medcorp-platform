# Internal Linking Checklist

Internal links should guide the visitor toward the next useful action. They should not look like SEO stuffing.

## Minimum Link Pattern

Every new article should include:

- [ ] One main service link.
- [ ] One related service link where relevant.
- [ ] One tool or calculator link.
- [ ] One related Knowledge Hub article or guide.
- [ ] Contact or Proposal Builder only when the page has commercial intent.

## Link Types

### Main Service

Use the service most directly related to the article:

- Medical construction: `/services/constructii-medicale`
- Medical fit-out: `/services/amenajari-medicale`
- Radiology: `/services/radiologie`
- RF shielding for RMN: `/services/rf-shielding`
- Radiation protection / lead shielding: `/services/protectie-radiologica`
- Medical equipment: `/services/aparatura-medicala`
- Imaging equipment: `/services/imagistica-medicala`
- IVD / laboratory: `/services/ivd-laborator`
- Service and maintenance: `/services/service-aparatura-medicala`

### Tools And Calculators

Match the tool to the intent:

- Broad project planning: `/ai-project-advisor`
- Budget/complexity planning: `/calculator-proiect-medical`
- Radiology room planning: `/radiology-room-planner`
- Service triage: `/service-diagnostic`
- Structured preliminary proposal: `/proposal-builder`
- RMN room cost: `/calculatoare/cost-camera-rmn`
- CT room cost: `/calculatoare/cost-camera-ct`
- IVD/lab setup: `/calculatoare/cost-laborator-ivd`
- Imaging equipment: `/calculatoare/cost-echipamente-imagistica`
- Service planning: `/calculatoare/service-aparatura`

### Guides

Use `/ghiduri/*` pages when the user intent is planning or cost research:

- `/ghiduri/cost-clinica-medicala`
- `/ghiduri/cost-camera-rmn`
- `/ghiduri/cost-camera-ct`
- `/ghiduri/autorizare-dsp`
- `/ghiduri/autorizare-cncan`
- `/ghiduri/amenajare-radiologie`
- `/ghiduri/echipamente-ivd-laborator`
- `/ghiduri/aparatura-imagistica-medicala`
- `/ghiduri/service-aparatura-medicala`

## Rules

- Do not add every service to every article.
- Do not repeat the same CTA in every section.
- Do not link irrelevant tools just to increase link count.
- Use one primary CTA and a few contextual supporting links.
- Keep related articles genuinely related.
- Prefer links that help the visitor make a decision.

## Technical Checks

- [ ] All service URLs exist.
- [ ] All tool/calculator URLs exist.
- [ ] All related article slugs exist in `src/data/articles.ts`.
- [ ] All CTA destinations exist.
- [ ] No admin/internal pages are linked from public content.
- [ ] Run `npm run content:check`.

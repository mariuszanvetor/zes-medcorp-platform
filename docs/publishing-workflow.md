# ZES MEDCORP Publishing Workflow

This workflow keeps future SEO publishing controlled, useful and technically credible. It is designed for semi-automated content expansion without bulk publishing, doorway pages or AI-spam patterns.

## Publishing Steps

1. Select topic
   - Pick one topic from `docs/topic-queue.md` or add a new reviewed idea.
   - Avoid publishing multiple near-identical pages in the same batch.

2. Define search intent
   - Write the user question in plain language.
   - Mark the intent as commercial, informational, comparison, FAQ or planning.
   - Confirm the page has a real reason to exist.

3. Define primary keyword
   - Choose one main keyword or query.
   - Add 3-6 natural supporting terms.
   - Do not force repeated exact-match wording.

4. Define related services
   - Add one main service and one or two adjacent services.
   - Use only real service routes.
   - Keep RF shielding and radiation protection separate.

5. Define related tools/calculators
   - Choose the most relevant tool first.
   - Use calculators only when they match the intent.
   - Prefer Proposal Builder for broader planning pages.

6. Draft article
   - Use the existing `Article` shape in `src/data/articles.ts`.
   - Keep the article concise, practical and technically useful.
   - Use sections, bullets, callouts and FAQ only where they clarify the topic.

7. Check technical accuracy
   - Validate equipment, room, service and workflow terminology.
   - Do not invent regulations, certifications, prices, clients or project outcomes.
   - Use cautious language for authorization topics.

8. Check RF vs radiation terminology
   - RMN/MRI: RF shielding, Faraday cage, EMI, RF doors, filters, waveguides, penetrations.
   - CT/RX/fluoroscopy: radiation protection, lead shielding, lead glass, controlled areas, CNCAN.
   - Do not imply CNCAN applies to RF shielding itself.

9. Check internal links
   - Link to one main service.
   - Link to one related service.
   - Link to one tool/calculator.
   - Link to one related guide or Knowledge Hub article.
   - Avoid link stuffing.

10. Check CTA
    - Match the CTA to intent.
    - Use Radiology Room Planner for room planning.
    - Use Service Diagnostic for service/maintenance problems.
    - Use Proposal Builder for structured project scoping.
    - Use Contact for direct consultation.

11. Run build
    ```bash
    npm run build
    ```

12. Run content checks
    ```bash
    npm run content:check
    ```

13. Commit
    - Commit only the article and required support changes.
    - Keep commit messages specific, for example: `Add RMN infrastructure FAQ article`.

14. Push
    - Push to the active branch after build and content check pass.

15. Request indexing in Search Console
    - Deploy first.
    - Inspect the new URL in Google Search Console.
    - Request indexing only after confirming the live page, canonical URL, metadata and schema.

## Release Rules

- Publish controlled batches, not mass content drops.
- Do not publish thin variants of the same page.
- Do not create fake regulatory certainty.
- Do not publish exact price claims without validated commercial input.
- Do not use fake testimonials, fake case studies or fake client logos.
- Keep every article useful enough to support a real consultation.

## Files Usually Touched

- `src/data/articles.ts`
- `docs/topic-queue.md` if adding or reprioritizing ideas
- `docs/article-review-checklist.md`
- `docs/internal-linking-checklist.md`

Avoid touching layout, routes, SEO infrastructure, analytics or lead architecture unless the article exposes a real defect.

# Article Review Checklist

Use this checklist before publishing any new Knowledge Hub article, guide or long-tail FAQ page.

## Content Quality

- [ ] The article answers one clear search intent.
- [ ] The introduction is specific, not generic.
- [ ] The article is useful without sounding like filler.
- [ ] Paragraphs are readable and not repetitive.
- [ ] The tone is calm, technical and commercial, not hype-driven.
- [ ] There is no keyword stuffing.
- [ ] The title and H1 are natural.
- [ ] The description explains the page value clearly.
- [ ] The FAQ section answers real questions.
- [ ] The CTA fits the topic.

## Anti-Spam Review

- [ ] No repeated generic phrases such as "premium", "enterprise", "advanced" or "AI-assisted" unless clearly justified.
- [ ] No doorway-page pattern.
- [ ] No duplicated article structure with only keywords swapped.
- [ ] No inflated claims.
- [ ] No fake case studies.
- [ ] No fake client names or logos.
- [ ] No fake certifications.
- [ ] No unverifiable statistics.
- [ ] No exact pricing promises.
- [ ] No legal or regulatory guarantees.

## Technical Accuracy

- [ ] RMN/MRI content uses RF shielding, Faraday cage, EMI, RF doors, filters, waveguides and penetrations correctly.
- [ ] CT/RX/fluoroscopy content uses radiation protection, lead shielding, lead glass, controlled areas and CNCAN correctly.
- [ ] RF shielding is not presented as radiation protection.
- [ ] Lead/radiation shielding is not presented as RF shielding.
- [ ] CNCAN is not presented as applying to RF shielding itself.
- [ ] DSP and CNCAN are clearly separated where both appear.
- [ ] IVD/lab content focuses on workflow, analyzers, calibration, validation, integration and service.
- [ ] Service content focuses on uptime, diagnostics, preventive maintenance, spare parts and operational continuity.
- [ ] Budget language is explicitly indicative when estimates are discussed.

## Article Data

- [ ] `slug` is unique and stable.
- [ ] `title` is specific.
- [ ] `description` is not duplicated from another article.
- [ ] `category` matches an existing `ArticleCategory`.
- [ ] `tags` are useful and limited.
- [ ] `readingTime` is realistic.
- [ ] `targetKeyword` matches the intent.
- [ ] `intro` is present.
- [ ] `sections` contain useful titles and body text.
- [ ] `faqs` include at least 3 practical questions.
- [ ] `relatedServices` use real service URLs.
- [ ] `relatedTools` use real tool/calculator URLs.
- [ ] `relatedArticles` use real article slugs.
- [ ] `cta` has relevant `title`, `description`, `label` and `href`.
- [ ] `publishedAt` and `updatedAt` are set.

## Final Checks

- [ ] Run `npm run content:check`.
- [ ] Run `npm run build`.
- [ ] Review the generated page locally if the article is strategically important.
- [ ] Confirm the article appears in sitemap after build.
- [ ] Confirm no admin/internal route was exposed publicly.

# Search Console Indexing Workflow

This document describes the internal SEO routine for prioritizing and submitting important URLs after each deploy.

## Goal

Keep the most valuable ZES MEDCORP pages visible to Google as quickly as possible without spamming Search Console.

## What to prioritize

1. Homepage
2. Contact page
3. Proposal Builder
4. Project Intake
5. Calculator hub and top calculators
6. Comparison hub and top comparisons
7. Glossary hub and top glossary terms
8. Planning hub and top journeys
9. Important service pages
10. High-value articles
11. Legal and company pages

## Sitemap submission

1. Open Search Console.
2. Select the correct property for `zescorp.ro`.
3. Go to Sitemaps.
4. Submit `/sitemap.xml`.
5. Confirm that the sitemap is processed successfully.
6. Recheck after deploys that change URL coverage.

## URL inspection workflow

1. Open the URL Inspection tool.
2. Paste the exact page URL.
3. Check whether Google reports the page as indexed, discovered, or excluded.
4. If the page is critical and not indexed, use **Request indexing** once the page is stable.
5. Reinspect after a reasonable delay instead of repeating the request many times.

## Request indexing routine

Use manual indexing requests for:

- New critical landing pages
- New calculator pages with strong intent
- New comparison pages
- New glossary terms that anchor semantic clusters
- Pages that support lead capture

Do not request indexing repeatedly for the same URL in a short interval.

## Interpreting common states

- **Indexed**: The page is already in Google.
- **Submitted and indexed**: Sitemap and indexing are aligned.
- **Discovered - currently not indexed**: Google knows the page but has not chosen to index it yet.
- **Crawled - currently not indexed**: Google crawled the page but did not keep it in the index yet.
- **Duplicate, Google chose different canonical**: Review canonical consistency and internal linking.

## Weekly SEO routine

1. Review sitemap health.
2. Inspect the highest-priority pages.
3. Check which pages moved from discovered to indexed.
4. Request indexing only for the pages that matter most.
5. Review internal links from articles, calculators, comparisons and glossary terms.
6. Add new links only where they help discovery and context.

## What not to do

- Do not spam the same URL with repeated requests.
- Do not request indexing for every low-value page after every deploy.
- Do not rely on Search Console instead of improving internal links and content quality.
- Do not submit pages that are still broken, incomplete or unstable.

## Internal operational notes

- The SEO launch checklist lives in the internal admin panel.
- The priority URL data is maintained in `src/data/seo-indexing-priorities.ts`.
- The list is intended to guide manual review, not automation.


# Post-Launch Checklist

Use this after the production deployment is live. Do not connect real services until the relevant accounts and privacy review are ready.

## Search And Indexing

- Add the site to Google Search Console.
- Verify ownership for `zescorp.ro` and `www.zescorp.ro`.
- Submit `https://www.zescorp.ro/sitemap.xml`.
- Check `https://www.zescorp.ro/robots.txt`.
- Confirm `/admin/leads` is not indexed.
- Monitor Search Console coverage, indexing status, and crawl errors.
- Check canonical URLs on key pages.

## Analytics And Conversion Tracking

- Configure GA4 and/or GTM only after real IDs are available.
- Set:
  - `NEXT_PUBLIC_GTM_ID`
  - `NEXT_PUBLIC_GA_ID`
- Validate pageview tracking.
- Validate CTA click events.
- Validate tool completion events.
- Validate lead form submit events.
- Confirm analytics events do not send personal data.

## Forms And Lead Flow

- Test the contact form.
- Test AI Project Advisor lead capture.
- Test Calculator proiect medical lead capture.
- Test Radiology Room Planner lead capture.
- Test Service Diagnostic lead capture.
- Test Proposal Builder lead capture.
- Test programmatic calculator lead capture.
- Confirm `/api/leads` returns the expected mocked success response until real CRM/email is enabled.
- When real CRM/email is later connected, verify routing in staging before production.

## Social Sharing

- Test homepage social preview.
- Test services social preview.
- Test Knowledge Hub article social preview.
- Test tools/calculators social preview.
- Use LinkedIn, Facebook, and X/Twitter sharing/debugger tools after deployment.
- Confirm `og:image` URLs return `200` on the public domain.

## Performance And UX

- Run Lighthouse on homepage, services, Knowledge Hub article, calculator/tool, and contact page.
- Check mobile layout at common widths.
- Check header and sticky CTA behavior.
- Check form usability on mobile.
- Check for horizontal overflow.
- Review browser console errors.

## Technical SEO

- Verify schema output on homepage, service pages, article pages, guides, and FAQ sections.
- Confirm sitemap includes intended public pages only.
- Confirm no duplicate canonical URLs.
- Confirm no unexpected noindex tags on public pages.
- Confirm internal links between services, guides, articles, tools, and contact.

## Operational Monitoring

- Monitor 404s and server errors.
- Monitor API route errors for `/api/leads`.
- Review search queries and conversion paths after Search Console data appears.
- Review high-intent guide and calculator performance.
- Keep a log of content updates and technical fixes after launch.

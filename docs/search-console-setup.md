# Google Search Console Setup

Use this after the production site is live at:

```txt
https://www.zescorp.ro
```

## Property Setup

Recommended property type:

- Domain property for `zescorp.ro`, if DNS verification is possible.

Alternative:

- URL-prefix property for `https://www.zescorp.ro`.

Domain property is better because it covers:

- `zescorp.ro`
- `www.zescorp.ro`
- HTTP and HTTPS variants
- subdomains, if added later

## Verification

Preferred verification:

- DNS TXT record from Google Search Console.

Steps:

1. Open Google Search Console.
2. Add property: `zescorp.ro`.
3. Choose DNS verification.
4. Add the TXT record in the DNS provider.
5. Wait for DNS propagation.
6. Click Verify.

## Sitemap Submission

Submit:

```txt
https://www.zescorp.ro/sitemap.xml
```

Before submission, confirm:

- URL returns `200`.
- URLs inside the sitemap use `https://www.zescorp.ro`.
- `/admin/leads` is not present.
- `/api/leads` is not present.

## Robots Check

Verify:

```txt
https://www.zescorp.ro/robots.txt
```

Expected:

- Allows public indexing.
- References `https://www.zescorp.ro/sitemap.xml`.

## Indexing Checks

Inspect these URLs first:

- `https://www.zescorp.ro/`
- `https://www.zescorp.ro/services`
- `https://www.zescorp.ro/contact`
- `https://www.zescorp.ro/knowledge-hub`
- `https://www.zescorp.ro/knowledge-hub/diferenta-dintre-rf-shielding-si-ecranarea-cu-plumb`
- `https://www.zescorp.ro/ghiduri/cost-camera-rmn`
- `https://www.zescorp.ro/calculatoare/cost-camera-rmn`

Do not request indexing for `/admin/leads`.

## Canonical Verification

Check page source or Search Console URL Inspection:

- Canonical should use `https://www.zescorp.ro`.
- HTTP and apex/root versions should redirect to `www`.
- No public page should unexpectedly show `noindex`.

## Monitoring

Review weekly after launch:

- Pages indexed.
- Crawled but not indexed.
- 404 errors.
- Redirect issues.
- Duplicate canonical issues.
- Mobile usability issues.
- Core Web Vitals once enough data exists.
- Search queries by cluster: RMN, CT, CNCAN, IVD, service, aparatura.

## Performance Checks

After launch:

- Run Lighthouse on homepage, service page, article, calculator, and contact.
- Monitor Search Console Page Experience.
- Review mobile layout and sticky CTA behavior.

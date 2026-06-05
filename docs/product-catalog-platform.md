# Product Catalog Platform

## Objective

The product catalog turns ZESCORP into a medical product and services platform without creating a duplicate-content catalog. Products can be imported from the public GIMA catalog, reviewed internally, connected to ZESCORP services, and used for quotation requests.

Imported products are **noindex by default**. A product becomes indexable only after manual review, commercial rewriting, and explicit promotion to `indexable`.

## Architecture

Core files:

- `data/product-catalog/products.json` - persistent local product database.
- `data/product-catalog/import-sessions.json` - import audit trail.
- `src/lib/product-catalog.ts` - category definitions, review status helpers, paths, and safe commercial fallback copy.
- `src/app/produse/page.tsx` - product catalog hub.
- `src/app/produse/categorie/[slug]/page.tsx` - category pages.
- `src/app/produse/[slug]/page.tsx` - product pages with quote form.
- `src/components/forms/ProductQuoteForm.tsx` - product quotation lead flow.
- `scripts/product-catalog/import-gima.mjs` - import pipeline for CSV, JSON, or URL inputs.

## Categories

The catalog uses eight commercial categories:

- Diagnostic
- Laboratory
- Emergency
- Sterilization
- Medical Furniture
- ENT
- Gynecology
- Consumables

Each category has a ZESCORP service angle so product pages naturally connect to installation, service, maintenance, and quotation workflows.

## Review Workflow

Allowed product statuses:

- `imported` - imported from a public source, noindex.
- `reviewed` - checked internally, still noindex.
- `approved` - commercially approved and rewritten, still noindex unless intentionally promoted.
- `indexable` - approved for search indexing and sitemap inclusion.

Indexing rule:

Only `reviewStatus: "indexable"` products enter the sitemap. Product and category metadata set `noindex` unless the relevant product set contains indexable items.

This stricter rule prevents accidental duplicate-content exposure from imported supplier catalog text.

## Commercial Copy Requirements

Before a product can become `approved` or `indexable`, add ZESCORP-owned commercial content:

- `romanianTitle`
- `romanianDescription`
- `romanianApplications`
- `romanianBenefits`
- `romanianSpecifications`
- `commercialCategory`
- `imageUrl`
- `imageAlt`
- `publicDisplayReady`
- `commercialDescription`
- `applications`
- `installationConsiderations`
- `maintenanceConsiderations`
- `relatedServices`

The content should describe how ZESCORP can support the product commercially and technically. It should not copy the supplier catalog description.

Public product pages must not expose import metadata such as source URL, raw review status, import status, or internal source fields. Those details remain in the data layer and audit workflow only.

## Import Command

Run:

```bash
npm run products:import -- --input path/to/gima-products.csv
```

Dry run:

```bash
npm run products:import -- --input path/to/gima-products.csv --dry-run
```

URL input is also supported:

```bash
npm run products:import -- --input https://example.com/gima-products.json --dry-run
```

## Input Fields

The importer accepts CSV or JSON rows. Recommended fields:

- `sourceProductName`, `name`, or `title`
- `gimaCode`, `code`, or `productCode`
- `category`
- `subcategory`
- `productUrl` or `url`
- `sourceUrl`

Unknown category values are rejected unless they can be mapped to one of the approved catalog categories.

## Deduplication

The importer deduplicates by:

- GIMA code
- Product URL
- Generated slug

If a product already exists, the importer updates source URLs and session data instead of creating another row.

## Product Quotation Flow

Every product page includes a product-specific lead form for:

- city
- estimated quantity
- purchase stage
- support need
- clinical/application context

Lead submissions are routed through the existing lead flow with `sourceTool: "product-catalog"` and a generated product summary. No CRM, database, or email automation is added by the product catalog itself.

## Sitemap and SEO Safety

The sitemap uses:

- `getIndexableProducts()`
- `productCategories`

Imported, reviewed, and approved-but-not-indexable products are excluded from sitemap output.

The SEO audit checks:

- product detail pages use `noIndex: !isProductIndexable`
- category pages use `noIndex: !hasIndexableProducts`
- indexable products have rewritten commercial descriptions
- product sitemap coverage is based on `getIndexableProducts`

## Human Review Checklist

Before promoting a product:

1. Verify product name, code, and official source URL.
2. Confirm the category and service fit.
3. Remove or avoid copied supplier descriptions.
4. Write ZESCORP-owned commercial copy.
5. Add installation and maintenance considerations.
6. Add related services.
7. Mark `reviewStatus` as `approved`.
8. Promote to `indexable` only when the page is commercially useful and not duplicate content.

## Boundaries

Do not:

- scrape aggressively
- import unverified product claims as final ZESCORP copy
- expose imported products as indexable by default
- invent certifications, stock, pricing, or availability
- send automated outreach from the product catalog
- store API keys in the product database

The catalog is a controlled quotation and commercial discovery system, not a duplicate supplier catalog.

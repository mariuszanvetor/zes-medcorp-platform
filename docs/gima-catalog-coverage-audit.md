# GIMA Catalog Coverage Audit

Generated: 2026-06-06

Scope: coverage audit only. No product import, no product modification, no catalog data rewrite.

## Executive Summary

- Estimated GIMA catalog size from strict unique SKU extraction: **8,819 products**
- GIMA public catalog positioning: **over 9,500 sales opportunities** including variants/configurations
- Products currently imported in ZESCORP catalog: **1,000**
- Estimated imported coverage: **11.3%**
- Estimated missing products: **7,819**
- Largest uncovered areas: **Emergency / paramedical**, **Diagnostic**, **Surgical instruments**, **Furniture**, **Operator protection / consumables**

## Method

Sources used:

- GIMA public catalog PDF text already extracted locally from the official public 2024 catalog.
- Previous import-session metadata, which recorded **8,820 candidate SKUs** from the same public catalog source.
- Current ZESCORP product database: `data/product-catalog/products.json`.

Counting method:

- Extracted unique 5-digit SKU-like product codes from public catalog page ranges.
- Excluded index/appendix pages from product category estimates.
- Used section/page ranges from the catalog headings to estimate category-level availability.
- Compared estimated public SKU count against current imported product categories.

Important caveat:

GIMA states the catalog has “over 9,500 sales opportunities.” The strict SKU extraction found **8,819 unique 5-digit SKU candidates** from product sections. The difference likely includes product variants, configurations, packs, non-5-digit identifiers, and sales opportunities not represented as unique SKU codes in the extracted text. For import planning, **8,819** is the safer actionable estimate.

## Overall Coverage

| Metric | Count |
|---|---:|
| Estimated actionable GIMA SKUs | 8,819 |
| Imported ZESCORP products | 1,000 |
| Estimated missing products | 7,819 |
| Coverage | 11.3% |

## Category Coverage Table

| GIMA catalog section | ZESCORP mapped category | Estimated total products | Imported products | Coverage |
|---|---|---:|---:|---:|
| Diagnostic tests - Laboratory | Laboratory / IVD | 216 | 105 | 48.6% |
| Operator's protection | Consumables / Disinfection | 733 | 89 | 12.1% |
| Holloware - Surgical instruments - Syringes | Surgical Instruments | 1,342 | 129 | 9.6% |
| Medical bags + Health care + Patient aids + Human anatomy | Patient Care | 731 | 197 | 26.9% |
| Scales, diagnostics, loupes, medical lights, audiometry | Diagnostic | 1,539 | 25 | 1.6% |
| Furniture | Medical Furniture | 766 | 48 | 6.3% |
| Physiotherapy, nebulizers, suction, cautery, electrosurgery | Electromedical | 610 | 143 | 23.4% |
| Gynaecology & Proctology | Gynecology | 257 | 10 | 3.9% |
| ECG, Monitors & Ultrasound | Monitoring | 534 | 99 | 18.5% |
| First Aid - Paramedical - Emergency | Emergency | 1,459 | 63 | 4.3% |
| Sterilization | Sterilization | 378 | 65 | 17.2% |
| Veterinary | Missing category | 57 | 0 | 0.0% |

## Missing Categories

Fully missing or not explicitly represented as a public catalog category:

- Veterinary
- Medical bags as a dedicated category
- Anatomy models as a dedicated category
- Operator protection as a dedicated category
- Scales and measures as a dedicated category

These can be mapped into existing ZESCORP categories, but dedicated category pages may improve catalog clarity once enough products are imported and reviewed.

## Partially Covered Categories

Largest gaps by missing product count:

| Priority | Area | Estimated missing products | Reason |
|---:|---|---:|---|
| 1 | First Aid / Paramedical / Emergency | 1,396 | High SKU volume and strong service/clinic procurement relevance |
| 2 | Diagnostic | 1,514 | Large section, currently very low import coverage |
| 3 | Surgical instruments | 1,213 | Large, SKU-dense section with many variants |
| 4 | Furniture | 718 | Commercially relevant for medical fit-out and clinic development |
| 5 | Operator protection / consumables | 644 | Recurring procurement potential |
| 6 | Patient care | 534 | Strong volume, broad clinic relevance |
| 7 | Monitoring | 435 | Commercially relevant for equipment quotes and maintenance |
| 8 | Electromedical | 467 | Good fit for equipment/service offers |

## Largest Uncovered Opportunities

1. **Emergency / paramedical**
   - Estimated coverage: 4.3%
   - Strong fit for service, recurring replacement, urgent procurement and clinic/hospital purchasing.

2. **Diagnostic**
   - Estimated coverage: 1.6%
   - Large gap across dermatoscopes, audiometry, respiratory, scales, medical lights, and diagnostic devices.

3. **Surgical instruments**
   - Estimated coverage: 9.6%
   - Large SKU volume; import should be selective to avoid low-value clutter.

4. **Medical furniture**
   - Estimated coverage: 6.3%
   - Strong commercial fit with ZESCORP’s medical infrastructure positioning.

5. **Consumables / operator protection**
   - Estimated coverage: 12.1%
   - Useful for recurring opportunities, but should be curated to avoid becoming a low-margin commodity catalog.

## Recommended Next Import Strategy

Recommended sequence:

1. **Finish commercially relevant existing categories**
   - Laboratory / IVD
   - Monitoring
   - Electromedical
   - Sterilization

2. **Add missing high-value category coverage**
   - Diagnostic
   - Medical furniture
   - Emergency / paramedical

3. **Import selectively for accessories and consumables**
   - Prioritize products that support installed equipment, maintenance contracts, or recurring procurement.
   - Avoid flooding public UX with low-value commodity variants.

4. **Create additional category structure only after imports**
   - Veterinary
   - Operator protection
   - Medical bags
   - Anatomy models
   - Scales and measures

5. **Keep review gates**
   - Imported
   - Localized
   - Image verified
   - Reviewed
   - Ready for publish
   - Indexable only after manual SEO/commercial approval

## Coverage Recommendation

The next controlled batch should not be a blind “import everything” run.

Recommended next batch:

- 300 Emergency / paramedical products
- 300 Diagnostic products
- 200 Furniture products
- 200 Surgical instruments, curated by commercial relevance
- 100 Monitoring / electromedical products

This would move the catalog from **1,000 imported products** toward roughly **2,100 products**, while improving commercial usefulness rather than simply increasing count.

## Final Verdict

ZESCORP currently covers about **11.3%** of the actionable GIMA catalog by strict SKU count.

The imported catalog is a meaningful foundation, but it is not close to complete. The biggest commercial opportunity is not just adding more products; it is prioritizing high-intent categories that support ZESCORP’s revenue pillars:

- equipment quotation,
- clinic/facility development,
- medical furniture and fit-out,
- service and maintenance,
- recurring procurement.


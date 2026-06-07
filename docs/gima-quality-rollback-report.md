# GIMA Quality Rollback Report

Generated: 2026-06-07T06:56:31.288Z

## Emergency Rollback Summary

- Total products audited: 8823
- Products reverted from indexable to noindex: 3901
- Product detail URLs removed from sitemap: 3901
- Products passing strict gate: 0
- Products failing strict gate: 8823
- Product hub/category pages: kept noindex during rollback
- Product data deleted: 0

## Strict Gate Rules

A product passes only when it has:

- Natural Romanian title
- No repeated nonsense characters, duplicated syllables, table artifacts or raw extraction noise
- No mixed English product type except approved technical terms
- Category sanity match
- Verified local real image
- Non-generic Romanian description
- At least one real specification, characteristic or local document
- No broken images or documents

## Failure Counts

| Failure | Products |
| --- | ---: |
| generic_template_description | 8823 |
| bad_title_repetition_or_artifact | 4989 |
| missing_or_unverified_real_image | 1898 |
| english_product_type_in_title | 199 |
| localization_leak | 112 |
| category_mismatch_accesoriu brut sau termen netradus in diagnostic | 24 |
| category_mismatch_text de imbracaminte/accesoriu in instrumentar chirurgical | 22 |
| category_mismatch_termen incompatibil cu fizioterapie | 1 |
| title_missing_or_too_short | 1 |

## Category Quality Distribution

| Category | Total | Strict pass | Failed |
| --- | ---: | ---: | ---: |
| anatomy-models | 69 | 0 | 69 |
| diagnostic | 1266 | 0 | 1266 |
| electromedical | 225 | 0 | 225 |
| emergency | 1429 | 0 | 1429 |
| ent | 79 | 0 | 79 |
| gynecology | 241 | 0 | 241 |
| laboratory | 278 | 0 | 278 |
| medical-bags | 108 | 0 | 108 |
| medical-furniture | 1019 | 0 | 1019 |
| medical-lights | 102 | 0 | 102 |
| monitoring | 536 | 0 | 536 |
| operator-protection | 731 | 0 | 731 |
| patient-care | 544 | 0 | 544 |
| physiotherapy | 375 | 0 | 375 |
| scales-measures | 98 | 0 | 98 |
| sterilization | 365 | 0 | 365 |
| surgical-instruments | 1340 | 0 | 1340 |
| veterinary | 18 | 0 | 18 |

## Worst Failure Examples

- gima-d-600-medical-heat-sealer: "D-600 medical heat sealer" (sterilization) - english_product_type_in_title, localization_leak, generic_template_description, missing_or_unverified_real_image
- 10577: "Diagnostic medical cod 10577" (diagnostic) - bad_title_repetition_or_artifact, generic_template_description, category_mismatch_accesoriu brut sau termen netradus in diagnostic, missing_or_unverified_real_image
- 10801: "Diagnostic medical cod 10801" (diagnostic) - bad_title_repetition_or_artifact, generic_template_description, category_mismatch_accesoriu brut sau termen netradus in diagnostic, missing_or_unverified_real_image
- 23917: "Laborator / IVD cod 23917" (laboratory) - bad_title_repetition_or_artifact, localization_leak, generic_template_description, missing_or_unverified_real_image
- 23918: "Laborator / IVD cod 23918" (laboratory) - bad_title_repetition_or_artifact, localization_leak, generic_template_description, missing_or_unverified_real_image
- 27378: "Mobilier medical cod 27378" (medical-furniture) - bad_title_repetition_or_artifact, localization_leak, generic_template_description, missing_or_unverified_real_image
- 27379: "Mobilier medical cod 27379" (medical-furniture) - bad_title_repetition_or_artifact, localization_leak, generic_template_description, missing_or_unverified_real_image
- 27388: "Mobilier medical cod 27388" (medical-furniture) - bad_title_repetition_or_artifact, localization_leak, generic_template_description, missing_or_unverified_real_image
- 27539: "Mobilier medical cod 27539" (medical-furniture) - bad_title_repetition_or_artifact, localization_leak, generic_template_description, missing_or_unverified_real_image
- 27554: "Mobilier medical cod 27554" (medical-furniture) - bad_title_repetition_or_artifact, localization_leak, generic_template_description, missing_or_unverified_real_image
- 28064: "Fizioterapie cod 28064" (physiotherapy) - bad_title_repetition_or_artifact, generic_template_description, category_mismatch_termen incompatibil cu fizioterapie, missing_or_unverified_real_image
- 28127: "Fizioterapie cod 28127" (physiotherapy) - bad_title_repetition_or_artifact, localization_leak, generic_template_description, missing_or_unverified_real_image
- 31345: "Diagnostic medical cod 31345" (diagnostic) - bad_title_repetition_or_artifact, generic_template_description, category_mismatch_accesoriu brut sau termen netradus in diagnostic, missing_or_unverified_real_image
- 31346: "Diagnostic medical cod 31346" (diagnostic) - bad_title_repetition_or_artifact, generic_template_description, category_mismatch_accesoriu brut sau termen netradus in diagnostic, missing_or_unverified_real_image
- 31546: "Diagnostic medical cod 31546" (diagnostic) - bad_title_repetition_or_artifact, localization_leak, generic_template_description, category_mismatch_accesoriu brut sau termen netradus in diagnostic, missing_or_unverified_real_image
- 31548: "Diagnostic medical cod 31548" (diagnostic) - bad_title_repetition_or_artifact, localization_leak, generic_template_description, category_mismatch_accesoriu brut sau termen netradus in diagnostic, missing_or_unverified_real_image
- 31549: "Diagnostic medical cod 31549" (diagnostic) - bad_title_repetition_or_artifact, localization_leak, generic_template_description, category_mismatch_accesoriu brut sau termen netradus in diagnostic, missing_or_unverified_real_image
- 31566: "Diagnostic medical cod 31566" (diagnostic) - bad_title_repetition_or_artifact, generic_template_description, category_mismatch_accesoriu brut sau termen netradus in diagnostic, missing_or_unverified_real_image
- 31567: "Diagnostic medical cod 31567" (diagnostic) - bad_title_repetition_or_artifact, generic_template_description, category_mismatch_accesoriu brut sau termen netradus in diagnostic, missing_or_unverified_real_image
- 32159: "Diagnostic medical cod 32159" (diagnostic) - bad_title_repetition_or_artifact, generic_template_description, category_mismatch_accesoriu brut sau termen netradus in diagnostic, missing_or_unverified_real_image
- 32920: "Diagnostic medical cod 32920" (diagnostic) - bad_title_repetition_or_artifact, localization_leak, generic_template_description, missing_or_unverified_real_image
- 32923: "Diagnostic medical cod 32923" (diagnostic) - bad_title_repetition_or_artifact, localization_leak, generic_template_description, missing_or_unverified_real_image
- 34177: "Urgenta cod 34177" (emergency) - bad_title_repetition_or_artifact, localization_leak, generic_template_description, missing_or_unverified_real_image
- 34349: "Urgenta cod 34349" (emergency) - bad_title_repetition_or_artifact, localization_leak, generic_template_description, missing_or_unverified_real_image
- 34369: "Urgenta cod 34369" (emergency) - bad_title_repetition_or_artifact, localization_leak, generic_template_description, missing_or_unverified_real_image
- 34488: "Urgenta cod 34488" (emergency) - bad_title_repetition_or_artifact, localization_leak, generic_template_description, missing_or_unverified_real_image
- 34502: "Urgenta cod 34502" (emergency) - bad_title_repetition_or_artifact, localization_leak, generic_template_description, missing_or_unverified_real_image
- 34522: "Urgenta cod 34522" (emergency) - bad_title_repetition_or_artifact, localization_leak, generic_template_description, missing_or_unverified_real_image
- 35321: "Monitorizare cod 35321" (monitoring) - bad_title_repetition_or_artifact, localization_leak, generic_template_description, missing_or_unverified_real_image
- 44692: "Mobilier medical cod 44692" (medical-furniture) - bad_title_repetition_or_artifact, localization_leak, generic_template_description, missing_or_unverified_real_image

## Public Display Changes

- Product detail pages remain available only as noindex pages.
- Product detail URLs are removed from sitemap.
- Category and hub pages are noindex while catalog repair continues.
- Category grids show only products that pass the strict public display gate.
- Failed products remain in the local database for repair and review.

## SEO Protection Verdict

SEO quality is protected by rollback. Product indexation should remain disabled until a manual quality audit approves a smaller, verified set.

# Route Inventory

Production base URL: `https://www.zescorp.ro`

Status legend:

- `Indexed`: intended for public search indexing and included in `sitemap.xml`.
- `Noindex`: intentionally excluded from public indexing.
- `Utility`: public technical asset or protocol route, not a content landing page.
- `Static`: prerendered static route.
- `SSG`: statically generated dynamic route.
- `Dynamic`: server-rendered or API route.

## Main Pages

| Route | Status | Rendering | Sitemap |
| --- | --- | --- | --- |
| `/` | Indexed | Static | Yes |
| `/about` | Indexed | Static | Yes |
| `/projects` | Indexed | Static | Yes |
| `/contact` | Indexed | Static | Yes |
| `/services` | Indexed | Static | Yes |
| `/knowledge-hub` | Indexed | Static | Yes |

## Services

| Route | Status | Rendering | Sitemap |
| --- | --- | --- | --- |
| `/services/constructii-medicale` | Indexed | Static | Yes |
| `/services/amenajari-medicale` | Indexed | Static | Yes |
| `/services/radiologie` | Indexed | Static | Yes |
| `/services/rf-shielding` | Indexed | Static | Yes |
| `/services/protectie-radiologica` | Indexed | Static | Yes |
| `/services/aparatura-medicala` | Indexed | Static | Yes |
| `/services/imagistica-medicala` | Indexed | Static | Yes |
| `/services/ivd-laborator` | Indexed | Static | Yes |
| `/services/service-aparatura-medicala` | Indexed | Static | Yes |

## AI Tools

| Route | Status | Rendering | Sitemap |
| --- | --- | --- | --- |
| `/ai-project-advisor` | Indexed | Static | Yes |
| `/calculator-proiect-medical` | Indexed | Static | Yes |
| `/radiology-room-planner` | Indexed | Static | Yes |
| `/service-diagnostic` | Indexed | Static | Yes |
| `/proposal-builder` | Indexed | Static | Yes |

## Programmatic Calculators

| Route | Status | Rendering | Sitemap |
| --- | --- | --- | --- |
| `/calculatoare/cost-camera-rmn` | Indexed | Static | Yes |
| `/calculatoare/cost-camera-ct` | Indexed | Static | Yes |
| `/calculatoare/cost-laborator-ivd` | Indexed | Static | Yes |
| `/calculatoare/cost-echipamente-imagistica` | Indexed | Static | Yes |
| `/calculatoare/service-aparatura` | Indexed | Static | Yes |

## Guides

| Route | Status | Rendering | Sitemap |
| --- | --- | --- | --- |
| `/ghiduri/cost-clinica-medicala` | Indexed | Static | Yes |
| `/ghiduri/cost-camera-rmn` | Indexed | Static | Yes |
| `/ghiduri/cost-camera-ct` | Indexed | Static | Yes |
| `/ghiduri/autorizare-dsp` | Indexed | Static | Yes |
| `/ghiduri/autorizare-cncan` | Indexed | Static | Yes |
| `/ghiduri/amenajare-radiologie` | Indexed | Static | Yes |
| `/ghiduri/echipamente-ivd-laborator` | Indexed | Static | Yes |
| `/ghiduri/aparatura-imagistica-medicala` | Indexed | Static | Yes |
| `/ghiduri/service-aparatura-medicala` | Indexed | Static | Yes |

## Knowledge Hub Articles

| Route | Status | Rendering | Sitemap |
| --- | --- | --- | --- |
| `/knowledge-hub/cum-se-construieste-o-clinica-medicala-in-romania` | Indexed | SSG | Yes |
| `/knowledge-hub/ce-trebuie-sa-stii-despre-autorizarea-cncan` | Indexed | SSG | Yes |
| `/knowledge-hub/diferenta-dintre-rf-shielding-si-ecranarea-cu-plumb` | Indexed | SSG | Yes |
| `/knowledge-hub/costuri-in-amenajarea-unei-camere-de-radiologie` | Indexed | SSG | Yes |
| `/knowledge-hub/greseli-critice-in-proiectarea-camerelor-rmn` | Indexed | SSG | Yes |
| `/knowledge-hub/dsp-vs-cncan-diferente-pentru-proiecte-medicale` | Indexed | SSG | Yes |
| `/knowledge-hub/cum-alegi-aparatura-medicala-pentru-o-clinica` | Indexed | SSG | Yes |
| `/knowledge-hub/ghid-pentru-echipamente-ivd-si-laborator` | Indexed | SSG | Yes |
| `/knowledge-hub/mentenanta-aparaturii-medicale-ce-trebuie-urmarit` | Indexed | SSG | Yes |
| `/knowledge-hub/imagistica-medicala-ct-rmn-rx-si-integrare-tehnica` | Indexed | SSG | Yes |

## Admin / Internal

| Route | Status | Rendering | Sitemap |
| --- | --- | --- | --- |
| `/admin/leads` | Noindex | Static | No |
| `/api/leads` | Internal API | Dynamic | No |

Notes:

- `/admin/leads` is a demo prototype only. It has `robots: noindex, nofollow` and is not linked from public navigation.
- `/api/leads` is currently a mocked lead endpoint. It validates/scorers payloads but does not store leads, send email, or connect to a CRM.

## Utility Routes And Assets

| Route | Status | Rendering | Sitemap |
| --- | --- | --- | --- |
| `/robots.txt` | Utility | Static | Not applicable |
| `/sitemap.xml` | Utility | Static | Not applicable |
| `/manifest.webmanifest` | Utility | Static | Not applicable |
| `/favicon.ico` | Utility asset | Static | No |
| `/icon.png` | Utility asset | Static | No |
| `/apple-icon.png` | Utility asset | Static | No |
| `/og/home.png` | Utility asset | Static file | No |
| `/og/services.png` | Utility asset | Static file | No |
| `/og/knowledge.png` | Utility asset | Static file | No |
| `/og/tools.png` | Utility asset | Static file | No |

# Conversion Events

This document maps the current analytics architecture to future Google Ads, GA4, and GTM conversion setup.

No real tracking IDs are committed. Events only become external when `NEXT_PUBLIC_GTM_ID` or `NEXT_PUBLIC_GA_ID` are configured and the analytics provider is activated.

## Privacy Rule

Do not send personal data to analytics.

Never include:

- name
- email
- phone
- company
- free-text message
- generated full summary

Allowed fields:

- source page
- source tool
- inquiry type
- project type
- estimated budget range
- complexity
- risk level
- urgency
- CTA label
- destination
- article, guide, or calculator slug

## Current Event Names

CTA events:

- `cta_click`
- `consultation_click`
- `ai_tool_click`

Tool events:

- `ai_project_advisor_start`
- `ai_project_advisor_complete`
- `calculator_project_complete`
- `radiology_planner_complete`
- `service_diagnostic_complete`
- `proposal_builder_complete`
- `programmatic_calculator_complete`

Lead events:

- `lead_form_view`
- `lead_form_submit_attempt`
- `lead_form_submit_success`
- `lead_form_submit_error`

Content events:

- `article_cta_click`
- `guide_cta_click`
- `calculator_cta_click`

## Primary Conversions

Use these as Google Ads primary conversion candidates after production testing:

| Event | Recommended conversion name | Notes |
| --- | --- | --- |
| `lead_form_submit_success` with source `/contact` | Contact consultation submit | Highest priority for direct inquiries |
| `lead_form_submit_success` with sourceTool `proposal-builder` | Proposal request | High commercial intent |
| `lead_form_submit_success` with sourceTool `service-diagnostic` | Service evaluation request | High urgency potential |
| `lead_form_submit_success` with sourceTool `programmatic-calculator` | Calculator lead submit | Good for RMN, CT, IVD, service calculators |
| `lead_form_submit_success` with sourceTool `radiology-room-planner` | Radiology planning request | Strong for CT/RMN/RX searches |

## Secondary Conversions

Use these as observation or GA4 key events before making them Google Ads primary conversions:

| Event | Use |
| --- | --- |
| `proposal_builder_complete` | User generated a preliminary proposal |
| `radiology_planner_complete` | User completed radiology planning |
| `programmatic_calculator_complete` | User completed a high-intent calculator |
| `service_diagnostic_complete` | User completed service triage |
| `calculator_project_complete` | User completed general medical project calculator |
| `consultation_click` | User clicked toward contact |

## Micro-Conversions

Track these to understand funnel quality, not as final bidding goals at launch:

- `article_cta_click`
- `guide_cta_click`
- `calculator_cta_click`
- `ai_tool_click`
- `lead_form_view`
- `lead_form_submit_attempt`
- `lead_form_submit_error`

These help diagnose where traffic hesitates: CTA, form, tool, or contact flow.

## Suggested GA4 Parameters

Map payload fields as custom dimensions where useful:

- `sourcePage`
- `sourceTool`
- `inquiryType`
- `projectType`
- `estimatedBudgetRange`
- `complexity`
- `riskLevel`
- `urgency`
- `ctaLabel`
- `destination`
- `articleSlug`
- `guideSlug`
- `calculatorSlug`

Do not map PII fields.

## Google Ads Conversion Strategy

Initial setup:

1. Import GA4 key events into Google Ads after they are tested.
2. Set only `lead_form_submit_success` variants as primary conversions.
3. Keep tool completions and CTA clicks as secondary/observation conversions.
4. Segment by sourceTool and sourcePage to understand lead quality.
5. Review search terms before automated bidding.

Suggested primary conversion grouping:

- Contact lead
- Proposal lead
- Radiology planner lead
- Calculator lead
- Service diagnostic lead

## Quality Review

Before turning on bidding automation:

- Submit test leads from each major tool.
- Confirm no names, phones, emails, companies, or messages appear in analytics payloads.
- Confirm conversion events fire once per successful submission.
- Confirm errors do not fire success events.
- Confirm `/admin/leads` is noindex and not used as an ads landing page.

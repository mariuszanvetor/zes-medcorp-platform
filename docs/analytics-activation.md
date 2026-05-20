# Analytics Activation

Analytics is prepared but not active unless IDs are provided.

Current supported variables:

```txt
NEXT_PUBLIC_GTM_ID=
NEXT_PUBLIC_GA_ID=
```

Do not add real IDs to the repository. Configure them in the hosting provider environment variables.

## Activation Options

Option A: Google Tag Manager

1. Create a GTM web container.
2. Copy the container ID from GTM.
3. Add it in Vercel as:

```txt
NEXT_PUBLIC_GTM_ID=YOUR_GTM_CONTAINER_ID
```

4. Redeploy.

Option B: Google Analytics 4

1. Create or select a GA4 property.
2. Copy the GA4 measurement ID.
3. Add it in Vercel as:

```txt
NEXT_PUBLIC_GA_ID=YOUR_GA4_MEASUREMENT_ID
```

4. Redeploy.

Option C: Both

- Use both only if the tracking plan requires it.
- Avoid duplicate pageviews if GA4 is also configured inside GTM.

## Existing Event Names

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

## Recommended Conversions

Mark these as high-value conversions:

- `lead_form_submit_success`
- `proposal_builder_complete`
- `radiology_planner_complete`
- `service_diagnostic_complete`

Secondary engagement:

- `calculator_project_complete`
- `programmatic_calculator_complete`
- `consultation_click`
- `ai_tool_click`

## Privacy Rules

Analytics events must not include:

- name
- email
- phone
- company
- free-text message
- generated lead summary containing personal details

Allowed event fields:

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

## Validation After Activation

After deploy:

1. Open the site in production.
2. Check browser network requests for GTM/GA scripts.
3. Use GA4 DebugView or GTM Preview mode.
4. Click homepage CTAs.
5. Complete one tool flow.
6. Submit a test lead with non-real test data.
7. Confirm events appear without PII.

Do not enable remarketing or ad integrations until privacy policy and consent requirements are reviewed.

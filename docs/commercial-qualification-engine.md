# ZESCORP Commercial Qualification Engine

Phase 83B converts the verified public-business lead database into a revenue-oriented, human-reviewed prospect list.

The engine is intentionally read-only:

- it reads `data/lead-research/verified-leads.json`;
- it reads `data/lead-research/do-not-contact.json`;
- it may read `data/lead-research/outreach-state.json` to surface follow-up candidates;
- it does not write to the research database or the outreach state;
- it does not send email, call SMTP, use Gmail APIs or modify CRM data.

## Commands

```bash
npm run qualification:test
npm run qualification:export
```

The export command creates:

```text
outputs/phase-83b/ZESCORP-Qualified-Outreach.xlsx
```

## Commercial classification

Each lead is placed in one segment:

- `Ideal Client`
- `Good Prospect`
- `Low Fit Prospect`
- `Competitor`
- `Distributor`
- `Manufacturer`
- `Service Provider`
- `Do Not Contact`

Direct customer outreach includes only `Ideal Client` and `Good Prospect` records.

Competitors, distributors, manufacturers, service providers, low-fit records and DNC records remain visible for audit but are excluded from the commercial queue. Distributors and service providers can be reviewed separately for a deliberate partnership approach.

## Opportunity score

The opportunity score is an internal prioritization model from `0` to `100`. It is not a statement that a lead has an active procurement process.

The score is composed from:

- likelihood of buying services;
- probability of an expansion project;
- imaging or radiology activity;
- clinic-size signals;
- infrastructure needs;
- maintenance potential;
- estimated project-value potential.

Only verified public business fields are used. The workbook exposes the evidence used for each ranking.

## Estimated opportunity

Estimated opportunity ranges and midpoint values are commercial planning models, not offers or guarantees.

They help answer:

- who to contact first;
- which service angle is most relevant;
- where human review time is most valuable.

Formal technical scope, radioprotection requirements and CNCAN-related steps require validation by competent specialists.

## Outreach styles

Every qualified prospect receives three editable starting points:

- `A. Executive / Management`
- `B. Technical / Engineering`
- `C. Operations / Clinic Administration`

The recommended style is selected from the verified category and infrastructure signals. Messages:

- use no invented contact names;
- do not claim an active project;
- do not make false certifications or outcome claims;
- include a soft CTA;
- include the sender identity `office@zescorp.ro`;
- include an opt-out line.

## Workbook sheets

- `Executive Dashboard`
- `Top 25 Opportunities`
- `Top 50 Opportunities`
- `Qualified Prospects`
- `Competitors`
- `Distributors`
- `Manufacturers`
- `Do Not Contact`
- `Follow-up Candidates`
- `Personalized Outreach`

## Daily operating rule

Start with `Top 25 Opportunities`.

For each record:

1. Open the official source URLs.
2. Confirm the public business contact and the relevant service angle.
3. Choose the most suitable outreach style.
4. Edit the message for accuracy and context.
5. Send manually from `office@zescorp.ro`.
6. Record sent, reply, follow-up or opt-out state in the outreach operating system.

No automatic sending is permitted.

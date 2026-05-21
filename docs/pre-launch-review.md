# Pre-Launch Review

Final review before public launch or integration activation.

## Brand And Contact

- Company name: `SC ZES MEDCORP S.R.L.`
- Email: `office@zescorp.ro`
- Phone: `0725 514 782`
- CUI: `52942540`
- Nr. Reg. Com.: `J2025089432009`
- Address: `Str. Năzuinței nr. 11B, Bragadiru, Ilfov`
- Confirm these appear consistently in footer, contact page, schema and proposal PDFs.

## Public Pages

- Homepage communicates infrastructure, equipment, imaging, IVD, shielding, service and planning.
- Service pages keep RF shielding separate from CT/RX radiation protection.
- Contact page explains what to prepare before a technical discussion.
- Project Intake and Proposal Builder explain preliminary/orientative output.
- Legal pages are visible from the footer.

## SEO And Schema

- No fake review schema.
- No fake rating schema.
- No fake offers.
- Organization and LocalBusiness schema use verified company details only.
- Sitemap includes legal pages and company page.
- Admin route is excluded from sitemap and noindexed.

## Conversion Flow

- Primary CTAs lead to contact, Project Intake, Proposal Builder or relevant planning tools.
- CTAs do not create fake urgency.
- Tool results guide users toward technical validation.
- Forms set realistic expectations after submission.

## Mobile QA

- Header and footer links remain readable.
- Sticky CTA does not cover form submit buttons.
- Legal pages have readable line lengths.
- Proposal export buttons fit on mobile.
- Contact form fields remain tappable.

## Integration Readiness

- Resend remains mock unless explicitly enabled.
- Real Resend activation requires `LEAD_INTEGRATION_MODE=email-only`, `EMAIL_PROVIDER=resend`, `RESEND_API_KEY`, `EMAIL_FROM`, `LEAD_NOTIFICATION_EMAIL`, `RESEND_VERIFIED_DOMAIN` and `RESEND_DOMAIN_VERIFIED=true`.
- User-facing confirmation emails remain off with `LEAD_CONFIRMATION_EMAIL_ENABLED=false`.
- High-priority alert emails remain off with `HIGH_PRIORITY_ALERT_EMAIL_ENABLED=false` during first live testing to avoid duplicate internal notifications.
- Live testing should use one Contact, one Proposal Builder and one Project Intake demo submission, then verify `emailMode=live`.
- Duplicate submission cooldown should return `429` for rapid repeats.
- Google Sheets remains mock unless explicitly enabled.
- CRM remains placeholder only.
- No database or auth is active.
- Mock lead API test passes before any real provider activation.

## Rollback Steps

- Revert integrations to mock env values.
- Redeploy.
- Verify `/api/leads` returns `mock` modes.
- If a production deployment regresses, roll back to the previous Vercel deployment.

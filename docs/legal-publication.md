# Legal publication checklist

This repository publishes the public legal and transparency documents for `repero.ai`. It does not implement product-side privacy operations in `app.repero.ai`, and it must not be used to infer blanket GDPR or AI Act compliance.

## Required before merge or commercial publication

- Exact contracting/legal name and legal form, if applicable.
- Registered or business address.
- Belgian BCE/KBO enterprise number.
- VAT number and VAT status, if applicable.
- Verified legal contact email and verified privacy contact.
- Hosting-disclosure facts and final wording, if legally required.
- Governing-law, jurisdiction, consumer, complaint, and publication-contact approach.

Until these facts are supplied, the Legal Notice and related policy sections intentionally state that they are not ready for commercial publication rather than displaying invented values.

## Required from the `ai-platform` audit

- Authentication providers enabled in production.
- LLM/model providers actually enabled in production.
- Object storage, database, infrastructure-hosting, and observability providers.
- Transactional-email and payment providers.
- Processor/subprocessor roles, data locations, international transfers, and applicable arrangements.
- Retention schedule, backup handling, deletion behavior, and export behavior.
- AI provenance indicators and the actual behavior of human/AI/mixed/unknown labels.
- Point-of-interaction AI notice and rights-request workflow.

Do not publish a public subprocessor inventory until this audit confirms it.

## Required before payment opening

- Final commercial Terms clauses and final contracting identity.
- B2C/B2B policy and consumer-withdrawal treatment.
- Refund, cancellation, and subscription-renewal policy.
- VAT, price-display, invoice, and payment wording.
- Liability clauses requiring owner/legal review.
- Post-termination export and deletion approach; controller/processor or DPA terms where relevant.

## Current public-site tracking position

The audited repository has no intentional analytics or marketing cookies, local storage, session storage, CMP, or Google Fonts dependency. Cloudflare Pages/edge delivery is confirmed. Cloudflare dashboard features, including Web Analytics, Zaraz, bot/security settings, and runtime cookies, must be checked before every publication that changes tracking.

The unused `WaitlistForm.astro` and `/api/waitlist` endpoint remain in the repository but are not rendered by current Access pages. If reactivated, their D1, queue, optional email-worker, data-retention, notice, and rights-operation implications must be assessed first.

## Maintenance

Update both languages together, retain the stable URLs, update the visible date, and run `npm run check` plus `npm run test:legal-publication` before release. Any introduction of non-essential tracking requires prior consent and withdrawal controls before that technology runs.

# Brand cleanup inventory

Scope: complete `brand/` tree plus directly related assets outside it, inspected before cleanup on 2026-08-10. `ARCHIVE` means removed from the working tree but retained in Git history; `DELETE` means obsolete or untracked material with no preservation requirement.

## Keep

- `brand/README.md` — rewritten to describe the consolidated system and its guardrails.
- `brand/audit/repero-brand-audit.md` — consolidated audit; required foundation source material.
- `brand/audit/repero-brand-tokens.proposed.json` — consolidated token proposal; required foundation source material.
- `brand/logo/original/repero-icon-original.svg` — immutable reference copy of the original canonical icon.
- `brand/logo/flat/repero-mark-flat.svg` — current flat-mark candidate: frozen silhouette, `#050A1C` structure, and `#22D3EE` detached dot.
- `brand/wordmark/repero-wordmark-experimental.svg` — current experimental `[R]epero AI` candidate; its flat R is the only R.
- `brand/social/linkedin/repero-founder-story-1200x1200.svg` — current LinkedIn application using the current candidate direction.
- `public/brand/repero-icon.svg` — unchanged production canonical original, still referenced by the website and asset-generation workflow.
- `public/og-default.svg` — active site default Open Graph image.
- `docs/branding-assets.md` — documentation for the still-active original-icon generation workflow.
- `scripts/generate-brand-assets.mjs` — generates production icon derivatives from the unchanged original.
- `scripts/validate-brand-assets.mjs` — validates those production derivatives.

## Archive

- `brand/app/brand-audit.md` — underlying application audit, superseded in the clean tree by the consolidated audit.
- `brand/app/brand-tokens.proposed.json` — underlying proposal, superseded by the consolidated proposal.
- `brand/guidelines/brand-guidelines.md` — prior guidance for superseded typographic-R variants.
- `brand/logo/repero-r.svg` — superseded custom-R geometry.
- `brand/logo/repero-r-light.svg` — light duplicate of superseded custom-R geometry.
- `brand/logo/repero-r-dark.svg` — dark variant of superseded custom-R geometry.
- `brand/logo/repero-r-mono.svg` — monochrome variant of superseded custom-R geometry.
- `brand/social/linkedin-landscape-1200x627.svg` — older social template outside the retained LinkedIn application.
- `brand/social/linkedin-square-1200x1200.svg` — older social template outside the retained LinkedIn application.
- `brand/social/open-graph-1200x630.svg` — older brand social template, not the active site Open Graph image.
- `brand/social/twitter-x-1600x900.svg` — older brand social template.
- `brand/templates/social-landscape-1200x630.svg` — generic template from the superseded identity package.
- `brand/templates/social-square-1200x1200.svg` — generic template from the superseded identity package.
- `brand/tokens/repero.tokens.json` — older standalone token set superseded by the consolidated proposal.
- `brand/wordmark/experimental/rationale.md` — rationale for superseded gradient/highlight studies.
- `brand/wordmark/experimental/repero-wordmark-comparison.svg` — obsolete comparison board.
- `brand/wordmark/experimental/repero-wordmark-experimental.svg` — earlier gradient/highlight wordmark study, superseded by the flat candidate.
- `brand/wordmark/repero-wordmark.svg` — superseded typographic-R wordmark.
- `brand/wordmark/repero-wordmark-light.svg` — duplicate light typographic-R wordmark.
- `brand/wordmark/repero-wordmark-dark.svg` — dark typographic-R wordmark.
- `public/brand/repero-icon-transparent.svg` — historical transparent derivative; not needed in the consolidated working tree.
- `public/favicon.svg` — byte-identical legacy duplicate of `public/brand/repero-icon.svg`.

## Delete

- `brand/comparisons/repero-flat-identity-comparison.svg` — obsolete comparison surface.
- `brand/flat-brand-evaluation.md` — temporary evaluation document that only describes removed variant sets.
- `brand/logo/experimental-flat/repero-flat-dark-small.svg` — dark small-size variant; unnecessary alternate.
- `brand/logo/experimental-flat/repero-flat-dark.svg` — dark alternate; the light candidate is the retained master.
- `brand/logo/experimental-flat/repero-flat-light-small.svg` — small-size alternate; no special geometry variants retained.
- `brand/logo/experimental-flat/repero-flat-light.svg` — moved unchanged to `brand/logo/flat/repero-mark-flat.svg`.
- `brand/logo/experimental-flat/repero-flat-mono-dark.svg` — monochrome experiment.
- `brand/logo/experimental-flat/repero-flat-mono-light.svg` — monochrome experiment.
- `brand/social/linkedin/repero-founder-story-1200x1200.png` — obsolete generated PNG export; it was already deleted in the working tree before this cleanup.
- `brand/wordmark/experimental/repero-wordmark-flat-space-grotesk-dark.svg` — dark alternate of the retained wordmark candidate.
- `brand/wordmark/experimental/repero-wordmark-flat-space-grotesk-light.svg` — moved unchanged to `brand/wordmark/repero-wordmark-experimental.svg`.

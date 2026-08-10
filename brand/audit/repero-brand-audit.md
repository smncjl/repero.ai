# Repero consolidated brand audit

Status: evidence and consolidation only. Prepared from the application audit in `brand/app/` (the supplied audit material is present there rather than at the brief's `brand/audit/app/` path), the implemented public website, and the logo assets in this repository. No production UI or logo asset was changed.

# Executive Summary

The two interfaces already share a strong structural vocabulary: dark/slate environments, restrained sky/cyan signalling, thin cool borders, nested rounded containers, compact semibold utility hierarchy, and purposeful status colour. The public site is a dark-first, more expressive presentation of the application's darker surfaces; the product is a denser, light-or-dark workspace with a sky action system.

The canonical logo source is [`public/brand/repero-icon.svg`](../../public/brand/repero-icon.svg). `docs/branding-assets.md` calls it the source of truth and requires generated favicon/distribution assets to be rendered from it. It is also the logo actually used by `src/components/Header.astro` and `src/components/Seo.astro`. Its cyan, rounded, open R-like stroke and detached locator dot are the strongest distinct brand motifs.

The most important consolidation decision is therefore one of *roles*, not forced colour matching: retain slate/ink for structure, retain sky/cyan for connection and intent, retain a stepped rounded hierarchy, and preserve the logo's geometry exactly. The product's `sky-600` action blue and the logo's cyan gradient are related but not identical; neither should be silently substituted for the other.

# Official Logo Analysis

### Asset inventory and canonical source

| Asset | Role / status | Evidence |
| --- | --- | --- |
| `public/brand/repero-icon.svg` | **Canonical official source**: dark rounded-square app icon containing the R-like mark and locator dot | Explicitly named source of truth in `docs/branding-assets.md`; header, SEO favicon links, Organization JSON-LD, and generator use this file. |
| `public/brand/repero-icon-transparent.svg` | Approved transparent-context variant of the same mark | Documented as a special-context variant; same foreground geometry but no container/background. |
| `public/favicon.svg` | Duplicate packaged favicon SVG, not the documented source | Byte-for-byte visual duplicate of `repero-icon.svg`; website SEO instead references the canonical icon and generated derivatives. |
| `brand/logo/repero-r*.svg` and `brand/wordmark/repero-wordmark*.svg` | Existing typographic/wordmark artifacts, **not canonical for this audit** and not referenced by the public site | `brand/README.md`/guidelines describe a different typographic R; `rg` finds no site use. They should not be adopted, changed, or treated as a replacement for the official app icon under this brief. |

### Geometry of the frozen official icon

The canonical SVG has a `512 × 512` viewBox. A dark rounded-square container starts at `(24,24)`, measures `464 × 464`, and has `rx=112`; its radius is deliberately large (about 24% of the container width). The mark itself is a single open centreline path stroked at `44` units (8.6% of the canvas), with `round` caps and joins. It is not a conventional filled typographic R.

- **Rounded upper-left transition:** the stem centreline rises from `(196,352)` to `(196,160)` and turns into the top bowl through `C196 146.745 206.745 136 220 136`. This is a 24-unit-radius quarter-turn in the centreline, then amplified by the 22-unit stroke radius and round join. The result is a continuous, soft entry into the bowl rather than a sharp stem/top-bar corner.
- **Main vertical stem:** the visual stem is centred at `x=196`, from `y=160` to `y=352`; its round-capped lower end reaches approximately `y=374`. The visible stroke range is approximately `x=174–218`.
- **Bowl:** it begins at `(220,136)`, runs across to `(274,136)`, then curves to the rightmost centreline point `(350,212)` and returns through `(281,287.587)`. It is open rather than a closed counter; the substantial dark negative space inside is essential to the mark's reading.
- **Diagonal leg:** the bowl exit near `(281,287.587)` moves to `(351,352)`. It is a single rounded stroke, visually more like a dynamic route than a conventional baseline leg.
- **Endpoint dot:** a detached outer cyan disc is centred at `(350,384)` with radius `32`; its near-white inner highlight disc has radius `14`. It visually touches/overlaps the leg's rounded lower end, but remains a separate path. The dot is roughly 1.45× the stroke radius and is the mark's locator/arrival cue.
- **Negative space:** the open bowl/counter, the gap around the diagonal, and the dark surround are active parts of recognition. Filling the counter, attaching the dot as a generic period, or tightening the mark into a text glyph would change the silhouette.
- **Colour and gradient:** the container uses `#0B1531 → #050A1C` from `(80,56)` to `(440,456)`, with a `#38BDF8` 18%-opaque, 10-unit border. The stroke gradient runs from `#A5F3FC` (0%) through `#38BDF8` (50%) to `#22D3EE` (100%), along `(168,128) → (350,392)`. This makes the mark brighter at the rounded entry and more saturated toward the leg/dot. The dot is `#22D3EE` at 95% opacity.
- **Internal highlights:** translucent `#E0F2FE` strokes add depth without changing the silhouette: a 18-unit vertical line at `x=220` (14% opacity) and a 18-unit horizontal line from `(196,240)` to `(276,240)` (12% opacity). The transparent variant raises these to 18% and 14%, respectively. The dot also contains a near-white `#E0F2FE` inner circle at 95% opacity.

Conclusion: the rounded upper-left transition is a distinctive, frozen feature and directly supports the brand's broader preference for continuous, softened geometry. The open stroke, internal negative space, directional diagonal, and endpoint dot are equally distinctive. Do not redraw, simplify, convert to a generic typographic R, or use it to construct a wordmark in this audit.

# app.repero.ai Visual Language

This section consolidates observations from `brand/app/brand-audit.md` and its paired proposed-token file; these are observations, not final brand decisions.

| Area | Observed implementation | Deliberate vs. incidental |
| --- | --- | --- |
| Colours | Tailwind slate dominates light/dark canvases, surfaces, text, and borders (`slate-50…950`). Sky drives actions, user messages, focus, tags, and auth/billing emphasis (`sky-50…600`). Emerald, amber, and rose stay semantic. | Slate + sky roles are repeated across core chat/auth/billing and are deliberate. The sole `cyan-400/10` billing glow is incidental support, not evidence of a cyan-first product palette. |
| Typography | Default browser/Tailwind sans; most UI is 14px, with 12px/11px metadata and semibold hierarchy. No custom typeface is loaded. | The hierarchy is deliberate; a named font is not an observed brand decision. |
| Spacing | Repeating 4px-derived scale: 4, 8, 12, 16, 20, 24, 32, 40px. | Deliberate implicit system. |
| Radius | `md` 6px, `lg` 8px, `xl` 12px, `2xl` 16px, pill; auth/billing extend to 24–32px. | Stepped containment is deliberate; feature-scale 24–32px values are unnormalised drift/feature emphasis. |
| Surfaces | Light chat canvas with white/slate cards and thin slate boundaries; dark mode reverses this. The composer remains a dark workbench even in light mode. | Deliberate functional contrast. |
| Components | Rounded message bubbles, bordered sidebar/project groups, dark rounded composer, compact sky send action, pills/counts, context/artifact cards. | These form the clearest product identity. |
| Interaction | 150–200ms state changes, sky focus, muted hover deltas, mobile drawer, rotating disclosure. | Functional and restrained, not decorative. |

# repero.ai Visual Language

The public site has a centralized visual layer in `src/styles/global.css`, applied across the localized marketing, use-case, waitlist, legal, and blog routes.

| Area | Observed implementation | Deliberate vs. incidental |
| --- | --- | --- |
| Colours | Dark-first background: `#050A1F → #08112B → #0B132E`, plus radial sky (`#38BDF8` at 16%) and mint/emerald (`#4DF9C4` at 9%) atmosphere. Primary surfaces are slate-950/900; borders slate-800/700. CTAs use sky-600, with sky-500 hover and sky-400/300 supporting emphasis. | Dark/slate + sky is systematic. The low-opacity emerald/mint glow is atmospheric secondary treatment, not a general identity colour. `tailwind.config.mjs` `brand: #1D4ED8` is unused and incidental. |
| Typography | Google-loaded Space Grotesk, then Segoe UI/sans; 400/500/700 are requested. Headline uses 36px then 60px, 0.95 line-height and tight tracking; body uses 18–20px / 32px. Eyebrows are 12px, semibold, uppercase, `0.24em` tracking. | Space Grotesk and display/eyebrow contrast are clear site decisions. Inter inside OG/blog SVG assets and the unreferenced wordmark is asset-local rather than site typography. |
| Spacing | `page-shell` has max-width `72rem` and 24px gutters. Hero uses 32px/56px vertical space; sections use 32–48px gaps; cards generally use 24px padding. | A coherent marketing-scale cadence, broader than the product's dense UI scale. |
| Radius | 8px CTA; 12px inputs; 16px cards; 24px section shells/images; 28px screenshot frames; 20px legal cards; pills for chips/nav. | Nested rounded containment is intentional. Exact values have slight cross-route drift (legal 20/16px and screenshot 28px). |
| Surfaces | Transparent/blurred slate panels, dark cards, thin boundaries, dark hero mockups, soft dark shadows and muted sky glows. | Deliberate dark-premium presentation. |
| Buttons/nav | Solid sky primary, dark outlined secondary; header is a rounded translucent panel, navigation uses pills on hover, locale chip is a sky-tinted pill. | Strong recurring interaction language. |
| Hierarchy | Bright bold display message, quiet slate supporting text, sky eyebrow/chip/action, dense card information. | Deliberate and consistently reused. |
| Logo usage | Header uses `public/brand/repero-icon.svg` at 36px with text “Repero AI”; SEO uses the same SVG for favicon/Organization logo. | Canonical icon usage is deliberate; text remains a separate word rather than a wordmark. |
| Recurring motifs | Soft rectangular frames, nested cards, translucent borders, limited halos, small uppercase labels, and product screenshots framed as calm workspaces. | Repeated across home, product story, waitlist and use-case components. Blog illustrations add indigo/emerald/pink story-specific colours, so they are editorial rather than primary interface tokens. |

# Shared Visual DNA

| Principle | Application evidence | Website evidence | Logo relationship |
| --- | --- | --- | --- |
| Calm dark/slate structure | `slate-100`/white light surfaces and `slate-950`/`900` dark surfaces | Dark gradient, slate-950/900 panels, slate-800 boundaries | The icon's `#0B1531 → #050A1C` container belongs naturally to this ink/dark range. |
| Sky/cyan as signal | Sky controls actions, focus, user messages and selected states | Sky CTA, eyebrow, chips, focus, glow and frame shadow | The logo's cyan gradient/dot is a more distinctive, higher-saturation expression of the same signal role. |
| Soft containment | Stepped `md` → `2xl`, message bubbles and nested work panels | 8px → 28px stepped cards, header, chips and frames | The icon container and its rounded upper-left stroke transition use the same continuous rather than sharp geometry. |
| Quiet information hierarchy | Small muted metadata, 14px body, semibold labels | Large display type + slate support + uppercase sky eyebrows | Both depend on contrast and weight, not broad colour noise. |
| Direction and retrieval | Conversation, context, artifact and composer flow | “Search / Upload / Generate / Decide” chips and workflow screenshots | The diagonal leg terminating at a locator dot can credibly symbolize route, retrieval, or arrival without literal reuse. |
| Controlled expressiveness | Most core controls are flat with restrained transitions | Sparse blur, gradients, and shadow used around focal marketing panels | The logo's gradient/highlights are best treated as a signature asset treatment, not as a reason to gradient-fill UI. |

# Inconsistencies

1. **Accent hue and role differ.** The application uses solid Tailwind sky (`#0284C7` action; `#0EA5E9`/`#38BDF8` support), while the icon culminates at cyan `#22D3EE`, and the site combines both. Evidence: `brand/app/brand-audit.md`, `src/styles/global.css`, and `public/brand/repero-icon.svg`. This is compatible as a family, but not yet a documented mapping.
2. **Typography is materially different.** The product has no loaded brand font; the website deliberately loads Space Grotesk; icon/OG/blog assets use Inter or Arial. Evidence: application audit typography section, `src/styles/global.css`, `public/og-default.svg`. A single official typeface cannot be inferred.
3. **Default environmental tone differs.** Product chat defaults to a light workspace with a dark composer, whereas the public site is exclusively dark-first and atmospheric. Evidence: application audit surface/composer observations; body and surface rules in `src/styles/global.css`.
4. **Radius scale is shared in direction but not exact value.** Product controls start at 6/8/12/16px and expand to 24–32px; site controls/cards start at 8/12/16/24px with a 28px screenshot frame. Evidence: `brand/app/brand-audit.md`; `src/styles/global.css`.
5. **Logo deployment is uneven.** The public site uses the canonical icon but pairs it with plain text “Repero AI”; app audit evidence reports no product logo/favicons at all. Evidence: `Header.astro`, `Seo.astro`, and application audit “Existing Logo Language.”
6. **Non-canonical typographic assets create decision ambiguity.** `brand/logo/` and `brand/wordmark/` include an alternate filled R and finished wordmarks, but the documented canonical source is the open-stroke app icon and no website component references those files. Evidence: `brand/README.md`, `docs/branding-assets.md`, and repository reference search. This audit does not legitimize or alter the alternate files.
7. **Marketing illustration palette is broader.** Blog SVGs introduce indigo, emerald and pink beyond the product/website interface palette. Evidence: `public/blog/*.svg`. These should remain editorial/art-direction choices unless formally promoted.

# Elements That Should Be Frozen

- `public/brand/repero-icon.svg` as the canonical official source, including its `512 × 512` proportions, rounded container, upper-left stem-to-bowl transition, 44-unit stroke, open negative space, diagonal, detached endpoint dot, gradient, and highlights.
- The transparent variant's shared foreground geometry. It may vary only in the documented removal of its container/background and associated opacity values; it is not a new drawing.
- Sky/blue as the application’s action, focus and user-intent signal, and slate as its structural neutral system (application audit evidence).
- Semantic role separation for emerald positive, amber warning and rose destructive states (application audit evidence).
- Stepped soft-containment logic: small controls, medium panels, large containers, and pill-only compact metadata (both implementations).
- The canonical source-to-generated-asset workflow in `docs/branding-assets.md`; generated outputs must derive from the canonical SVG.

# Elements That Can Evolve

- A documented cross-surface colour mapping between product sky and logo cyan, with semantic roles and contrast testing before any implementation change.
- An explicit typography decision: retain distinct product/site typography deliberately, or select a shared family after testing. Current code does not evidence one canonical family.
- A harmonised large-radius ladder for auth, billing, legal, screenshot frames and future marketing panels; preserve the hierarchy while reducing undocumented 20–32px variation.
- The balance of default light/dark product environments and the amount of marketing atmosphere (glow/blur). Both exist now; neither needs to be declared universal without product validation.
- Editorial illustration palette rules, if consistency across blog/social is desired.
- Logo placement and an eventual wordmark specification only after an explicit brand decision. The intended concept in the brief is `[official Repero R]epero AI`; no wordmark is created or approved by this audit.

# Proposed Brand Principles

1. **A calm workspace, not a decorative AI surface.** Use low-noise slate/ink structure, thin cool boundaries and legible content hierarchy. Evidence: repeated slate surfaces/borders in product audit; `section-shell`, `surface`, and `feature-card` on the site.
2. **Soft geometry should show relationships.** Increase radius with object scale and step it down within nested structures. Evidence: product bubbles/panels and website header/cards/screenshot frames; logo's rounded entry reinforces the principle.
3. **Cyan is a signpost; sky is interaction.** Preserve the logo's cyan dot and gradient as an identity signature. Use action sky for controls/focus until a tested canonical mapping is adopted. Evidence: icon SVG versus application sky utilities.
4. **Direction ends in a point of recognition.** The logo's diagonal-to-dot relationship is a distinctive motif for retrieval, connection, and arrival; use it sparingly as an abstract compositional cue, never by rebuilding or detaching logo parts. Evidence: canonical SVG and the product/site's organizing/retrieval messaging.
5. **Negative space and restraint carry confidence.** Keep generous information separation, muted supporting copy and limited highlight effects. Evidence: open logo bowl, product thin-border surfaces, and site whitespace/low-opacity halos.
6. **Logo geometry is not UI geometry.** Interface radii may echo its softness, but no CSS token may be used to redraw, simplify, or approximate the official R. Evidence: canonical SVG construction and its dedicated generation workflow.

# Recommendations

1. **Adopt a documented role map before changing colours.** Define the product’s `sky-600`/`sky-500` interaction ramp separately from the logo’s `#A5F3FC → #38BDF8 → #22D3EE` signature ramp. Evidence: app audit identifies sky as core action, while `repero-icon.svg` defines a three-stop cyan gradient. Do not replace one with the other wholesale.
2. **Use the canonical icon consistently wherever an icon is required.** Keep `public/brand/repero-icon.svg` as the sole source for public/favicon/generated outputs; add it to application surfaces only through an approved integration task. Evidence: `docs/branding-assets.md`, `Header.astro`, `Seo.astro`, and app audit's finding of no logo implementation.
3. **Freeze the logo before any wordmark work.** Do not alter the open stroke, upper-left transition, diagonal, dot or negative space. The existing `brand/logo`/`brand/wordmark` files are not site-referenced and must not be treated as a substitute decision. Evidence: canonical-source documentation and reference search.
4. **Preserve radius hierarchy while standardising only after validation.** A candidate ladder can align 8/12/16/24/28–32px cases, but it must keep product compact controls denser than marketing containers. Evidence: product’s 6–16px core controls versus website `rounded-lg`/`xl`/`2xl`/`1.75rem` rules.
5. **Defer a single-font rollout.** Space Grotesk is actual public-site code; the product uses the default stack; Inter appears only in SVG text/assets. Evidence: `global.css`, app audit typography, `og-default.svg`. Any typography convergence needs readability and localization validation rather than a token-only change.
6. **Keep marketing atmosphere subordinate to content and logo.** Continue using low-opacity sky/mint glows only around focal panels and avoid copying the logo gradient onto cards or buttons. Evidence: `global.css` uses 9–16% radial accents; the icon reserves its gradient for the mark itself.
7. **Treat blog illustration colours as editorial until proven otherwise.** Do not elevate indigo/pink/emerald illustration colours to core UI or logo tokens. Evidence: `public/blog/*.svg` uses them variably, whereas both core interfaces consistently rely on slate and sky.

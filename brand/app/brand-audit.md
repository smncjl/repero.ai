# Repero AI visual-language audit

Status: audit only, based on the current repository state on 2026-08-08. This document does not change product styling, introduce a brand system, or alter any logo asset.

Scope: the primary product surface is the server-rendered chat UI under `apps/product_platform/apps/chat_ui/templates`. The Django admin was inspected but treated as an operational surface, not as brand-defining product UI. Tailwind is loaded from its CDN using the default palette; there is no custom Tailwind theme or locally compiled CSS.

## Existing Product Language

### Colours

The product uses Tailwind's default **slate** scale as its dominant neutral system. It is intentional: slate is consistently used for application canvases, cards, borders, body text, metadata, and their dark-mode counterparts. The product also explicitly opts into system dark mode in `chat_ui/base.html`.

| Role | Actual implemented values | Where used / importance | Assessment |
| --- | --- | --- | --- |
| Light canvas | `slate-100` `#f1f5f9`; `white` `#ffffff` | Page canvas; chat panel; primary cards | Core, intentional |
| Dark canvas | `slate-950` `#020617`; `slate-900` `#0f172a` | Dark page canvas, chat panel, composer, billing/auth surfaces | Core, intentional |
| Light raised surface | `slate-50` `#f8fafc`, `slate-100` `#f1f5f9`, `white` `#ffffff` | Sidebar sections, assistant states, nested items | Core, intentional |
| Dark raised surface | `slate-900` `#0f172a`, `slate-950` `#020617`, frequently with alpha | Sidebar, composer, context panels, billing cards, auth card | Core, intentional |
| Borders | Light `slate-200` `#e2e8f0` / `slate-300` `#cbd5e1`; dark `slate-700` `#334155` / `slate-800` `#1e293b` | Nearly every card, input, panel, and divider; `border-slate-300` appears 72 times and dark `border-slate-700` 78 times in product/auth templates | Core, intentional |
| Primary text | Light `slate-900` `#0f172a`; dark `slate-100` `#f1f5f9` | Main body content, inputs, assistant messages | Core, intentional |
| Secondary / metadata text | Light `slate-500` `#64748b` / `slate-600` `#475569`; dark `slate-400` `#94a3b8` / `slate-300` `#cbd5e1` | Labels, timestamps, helper copy, section headings; `text-slate-500` appears 99 times | Core, intentional |
| Interactive accent | `sky-600` `#0284c7` (solid user/send action); `sky-500` `#0ea5e9`; `sky-400` `#38bdf8`; pale `sky-50` `#f0f9ff` / `sky-100` `#e0f2fe` | New-chat, user messages, send button, selected action, focus, tags, usage ring, auth glow | Core, intentional; broad use establishes sky rather than cyan as the implemented accent |
| Accent on dark | `sky-200` `#bae6fd`, `sky-300` `#7dd3fc`, `sky-400` `#38bdf8` | Dark-mode controls, plan actions, auth links and labels | Core, intentional |
| Success / positive | `emerald-50` `#ecfdf5`, `emerald-100` `#d1fae5`, `emerald-700` `#047857`, `emerald-800` `#065f46`; dark uses `emerald-950` `#022c22` and `emerald-800` `#065f46` | Optional artifact-tone cycle and status indicators | Secondary semantic system, intentional but less frequent |
| Warning | `amber-50` `#fffbeb`, `amber-100` `#fef3c7`, `amber-600` `#d97706`; dark uses `amber-950` `#451a03` | Workspace-lock states, system message, billing “coming soon” | Semantic, intentional |
| Error / destructive | `rose-50` `#fff1f2`, `rose-100` `#ffe4e6`, `rose-500` `#f43f5e`, `rose-700` `#be123c`; dark uses `rose-950` `#4c0519` | Form errors, archive/delete, upload failure | Semantic, intentional |
| Cyan | `cyan-400` `#22d3ee` at 10% alpha | One billing-page background glow | Incidental supporting highlight, not sufficient evidence for a primary cyan rule |

Evidence: `chat_ui/base.html`, `partials/sidebar.html`, `partials/message_item.html`, `partials/composer.html`, `billing_plan.html`, and `partials/auth_styles.html`. The standalone admin templates use an additional blue/white operational presentation and should not expand the brand palette.

### Geometry

Rounded geometry is a genuine, recurring product principle. It is not confined to a single feature: it appears in navigation, project groups, message bubbles, the composer, cards, document/context panels, badges, menus, inputs, the billing view, and authentication.

| Implemented radius | Typical use | Frequency in product/auth templates |
| --- | --- | --- |
| `rounded-md` = `0.375rem` / 6px | Compact buttons, selects, inline controls | 57 occurrences |
| `rounded-full` = `9999px` | Counts, labels, status chips, usage ring, bullets | 46 occurrences |
| `rounded-lg` = `0.5rem` / 8px | Buttons, inputs, list items, menus | 42 occurrences |
| `rounded-xl` = `0.75rem` / 12px | Groups, panels, inputs, action menus | 31 occurrences |
| `rounded-2xl` = `1rem` / 16px | Message bubbles, main chat container, large cards | Used throughout; the class extractor's base-token count understates responsive/conditional occurrences |
| Custom large radii | `1.5rem`, `1.75rem`, `2rem` | Auth cards and premium/usage billing containers | Deliberate feature-level expansion, not yet globally normalized |

The chat uses `rounded-2xl` bubbles for both user and assistant messages. Nested structures step down through `xl`, `lg`, and `md`; pills are reserved for compact labels, counts, and status. This forms a coherent “soft containment” hierarchy, not indiscriminate rounding.

### Typography

No brand font is loaded. The browser/Tailwind default sans-serif stack therefore renders the product's UI type. Markdown code uses the explicit system monospace stack `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New` in `chat_ui/base.html`.

| Style | Actual implementation | Use |
| --- | --- | --- |
| Interface body | Tailwind `text-sm` = 14px, default line-height 20px; 120 occurrences | Controls, messages, body UI |
| Compact metadata | `text-xs` = 12px; 113 occurrences | Secondary labels, helper text |
| Dense labels | Arbitrary `text-[11px]` / 11px; 98 occurrences | Uppercase section labels, message role labels, badges |
| Tiny markers | `text-[10px]` / 10px | Numbered/initial chips |
| Page headings | `text-2xl` = 24px, with `text-3xl` = 30px and `text-4xl` = 36px in auth/billing | Auth hero, billing metrics, page headings |
| Weight | `font-semibold` = 600 (153 occurrences); `font-medium` = 500 (15 occurrences) | Strong, compact hierarchy; 700 is mainly auth button text |
| Labels | Uppercase + `tracking-wide` (0.025em) is common; billing uses 0.22–0.30em tracking | Content category and system-status labeling |
| Long-form | `leading-6` / 24px and `leading-relaxed` in billing/details | Readable explanatory copy |

The existing hierarchy relies more on size, weight, case, and muted slate tone than on a custom typeface. A typeface selection is therefore an evolution decision, not an existing brand value.

### Spacing

The source uses Tailwind's default 4px-derived spacing scale consistently. The densest recurring units are `gap-2` / `px-2` / `py-2` (8px), `px-3` (12px), `px-4` / `p-4` (16px), `gap-3` / `py-3` (12px), and `mt-2` (8px). Larger containers use `p-5` (20px), `p-6` (24px), `p-8` (32px), and page gutters of 16–40px depending on breakpoint.

This is evidence of an implicit scale: 4, 8, 12, 16, 20, 24, 32, 40px. It is coherent enough to normalize as a documentation token set, but no current centralized token source exists.

### Components that carry the identity

- **Conversation shell and sidebar:** light/dark neutral split, thin borders, restrained sky action treatments, rounded project groups and count pills. This is the most persistent product surface.
- **Message bubbles:** `rounded-2xl`, slim border, 16px horizontal/12px vertical padding; the user gets a solid `sky-600` response bubble while the assistant is white/slate. This is the clearest interaction signature.
- **Composer:** a dark, layered `rounded-2xl` control even in the light chat canvas, with a compact sky send button. It anchors the workflow and creates an intentional dark “workbench” moment.
- **Context and artifact containers:** nested rounded cards, hairline borders, pills, and optional semantic artifact tones. These express Repero as a place to organize work, not just exchange text.
- **Authentication and billing:** darker atmospheric surfaces, broad radii, subtle blur/shadows, and sky light/glow. They use the same neutral-and-sky vocabulary but are more expressive than the core chat surface.

### Motion and interaction

Implemented interaction is controlled and functional rather than decorative:

- `transition` / 150–200ms color and transform changes on buttons, sidebar movement, menu states, and disclosure arrows.
- Hover normally changes a surface or border one slate/sky step; auth adds a small brightness and shadow change.
- Inputs visibly focus with `sky-500` borders; auth inputs add a 4px translucent `sky-500`-family focus ring.
- Details disclosures rotate their chevron 90 degrees when open; mobile sidebar translates over a dim backdrop.
- Loading/streaming includes a `blink-slow` opacity animation (1.7s ease-in-out).
- Active state is present in auth buttons (`translateY(1px)`) and copy/send controls change their content/state in JavaScript.

## Existing Logo Language

No Repero logo, R icon, wordmark, favicon, or image asset is present in the tracked application repository. A full file search found no product media file, and template/reference search found no logo or favicon reference. The visible product name is plain text (`Repero AI`) in login/signup, allauth titles, and email copy.

Consequently, this repository cannot establish a canonical logo source, variants, favicon usage, application usage, or landing usage. There is also no landing page implementation in this repository to audit. Third-party icons inside `.venv` are excluded from this assessment and are not Repero assets.

The official R described in the brief is **not analyzed here** because its source asset was not supplied or found. Its geometry remains frozen by instruction. Add the canonical vector/raster and the current deployment/marketing source location to a later audit pass; do not infer or redraw it from the textual description.

## Shared Visual Principles

| Principle | Evidence | Appears in | Official brand rule? |
| --- | --- | --- | --- |
| Soft containment through layered rounded geometry | `md` through `2xl` radii across controls, cards, chat bubbles, panels, and auth/billing; 46 `rounded-full` pills | Whole chat UI, auth, billing | Yes. Preserve the hierarchy: larger objects get larger radii; labels/counts become pills. |
| Slate-led calm surfaces | Slate dominates canvases, surfaces, borders, primary and muted text in both themes | Every product route | Yes. Use slate as the structural system, not pure black/white as a default. |
| Sky as purposeful interaction signal | New-chat, send, user messages, focused inputs, labels, auth CTA, billing ring | Conversation, composer, auth, billing | Yes. Treat sky as an action/connection color, not as blanket decoration. |
| High legibility through quiet contrast | Thin slate borders, white/slate content cards, strong main text, much muted metadata | Core chat and sidebars | Yes. Maintain semantic contrast and avoid noisy surfaces. |
| Dense, semibold utility typography | 14px/12px/11px hierarchy, 600 emphasis, uppercase tracking for labels | Core chat, context, billing | Yes, as a hierarchy rule. A particular typeface is not yet evidenced. |
| One focused dark workbench inside a mixed UI | Composer remains dark in the light-mode chat; dark mode coherently reverses surfaces | Composer and dark-mode routes | Yes, as a product-derived layout motif; use sparingly. |
| Semantic colour stays secondary | Emerald, amber, and rose are reserved for status, errors, locks, and optional artifact categorization | Messages, forms, artifacts, billing | Yes. Do not promote these to general identity accents. |

## Proposed Repero Brand DNA

The product evidence supports this working DNA:

> Repero is a calm, rounded workspace for active thinking: slate structure, sky signals, and soft containers that keep conversations, sources, and artifacts legible.

It is deliberately not a generic “premium SaaS” prescription. Its distinctive evidence is the combination of a conversational workbench, consistently nested soft geometry, utility-like micro-labels, and sky being assigned to user intent and system connection. Any future brand expression should begin with these operating characteristics rather than import another company's visual tropes.

The official R may eventually reinforce this DNA if a direct visual comparison shows that its rounded upper-left transition uses the same sense of continuous, soft geometry. That is a hypothesis only; it cannot be validated from the current repository.

## Elements That Should Be Frozen

- The official Repero R geometry, including its distinctive rounded upper-left transition, until an explicit decision changes it.
- Existing product and logo assets: this audit makes no asset changes.
- The semantic meaning of error (`rose`), warning (`amber`), and positive (`emerald`) states.
- Sky's existing role as the primary action, user-message, and focus colour.
- The dark/light mode capability and its slate-based contrast structure.
- Rounded hierarchy in the product: large containers, medium controls, and pill-like labels/counts should not be flattened without a product redesign decision.

## Elements That Can Evolve

- A documented semantic token layer, provided the initial values map exactly to existing values before any visual changes are proposed.
- Consolidation of currently ad hoc large radii (`1.5rem`, `1.75rem`, `2rem`) into a reviewed scale.
- A future brand typeface decision, since no branded font currently exists.
- A defined logo asset package, favicon, and placement rules after the canonical R source is supplied.
- The optional artifact tone cycle, which is controlled by `artifact_tones_enabled` and is less central than the slate/sky base system.
- The billing/auth atmospheric treatments, which can be aligned more closely with chat after product validation.

## Inconsistencies Found

- **No logo implementation:** product and auth screens show text only; no asset, favicon, canonical source, or landing implementation is in this repository. This blocks a code-based product-to-logo comparison.
- **No centralized design-token source:** values are repeated as Tailwind utility classes and a small number of inline CSS/RGB values. The system is consistent in practice but not encoded as a reusable source of truth.
- **Radius drift at large sizes:** common components follow `md`/`lg`/`xl`/`2xl`, while auth and billing add custom 20px, 24px, 28px, and 32px equivalents. This may be intentional emphasis, but it is undocumented.
- **Tone split by route:** core conversation uses a light canvas by default with a dark composer; auth and billing are dark-first and more atmospheric. Both share slate/sky, but their elevation/shadow density differs.
- **Accent terminology:** the implementation is predominantly Tailwind `sky`, not cyan. The sole `cyan-400/10` use is a billing glow, so “restrained cyan” is not substantiated as a product rule.
- **Admin is visually separate:** the Django admin templates use a different operational style and should not drive public product/brand decisions.

## Recommendations

1. Treat the proposed JSON file as documentation only. Validate its semantic names with the design/product team before wiring it into templates or a Tailwind configuration.
2. Obtain the canonical official R source (preferably SVG), its approved variants, current favicon, and the deployment/marketing repository path. Then run a targeted Phase 3 comparison using actual proportions, colour, endpoint treatment, and negative space—without modifying the logo.
3. Preserve rounded hierarchy in any new brand work. Use the product's nested-container logic rather than applying one oversized radius universally.
4. Define sky as the action/connection colour and retain slate as the structural palette. Reserve emerald, amber, and rose for their existing semantic meanings.
5. Before a public-facing redesign, decide whether the dark auth/billing atmosphere or the light conversation canvas is the default brand environment. The audit supports both as product-native variants, not an unqualified choice between them.
6. Do not claim a custom branded typeface, canonical logo construction, or cyan-led identity until source evidence exists.

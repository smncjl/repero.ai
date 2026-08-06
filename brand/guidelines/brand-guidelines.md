# Repero AI Brand Guidelines v1.0

## Purpose

Repero AI gives work a calm, dependable place to live. Its identity should feel composed before it feels clever: clear hierarchy, deliberate spacing, and one recognizable accent. It is a product for organizing work with AI, not an AI character or an LLM interface.

## The existing application icon

The application icon is the source of truth and remains unchanged at `public/brand/repero-icon.svg`.

What works:

- Its rounded dark container is compact and premium at favicon, avatar, and mobile-icon scale.
- The cyan R-like stroke, rounded terminals, and locator dot make a memorable, ownable silhouette.
- The dark/cyan contrast gives strong small-scale recognition.

What does not transfer to typography:

- The open stroke does not establish a conventional stem, counter, and leg quickly enough to read as an R in a word.
- The inner highlight strokes and detached locator dot are effective icon details but become visual noise beside type.
- Its light stroke weight and large rounded joins are balanced inside a square container, not on a text baseline.

Why it fails as the first letter: letterforms are read as a rhythm of stable masses. The icon's outline, floating dot, and absent baseline turn the first character into an illustration, interrupting the word's reading rhythm.

What remains identical: the application icon files, their geometry, colors, gradients, and generated-asset workflow are untouched. The new system retains only the conceptual cues: dark ink, cyan locator point, rounded bowl, and an active diagonal.

## Official typographic R

Use `logo/repero-r.svg` only as the first character of the Repero wordmark or as a large typographic monogram. It is not a replacement application icon.

The R has a 12-unit stem, a closed counter, a quiet rounded bowl, and a substantial diagonal leg. These decisions make the letter readable from 48 px while retaining the original icon's bowl-to-leg motion. The single cyan dot sits at the leg's endpoint: it preserves the locator cue without asking the reader to decode several icon details. The dot may be monochrome when production constraints require it.

At 48–96 px, use the standalone R at its native proportions. Do not add outlines, highlights, gradients, or effects.

## Official wordmark

Use the assets in `wordmark/`:

- `repero-wordmark.svg` is the default two-tone master.
- `repero-wordmark-light.svg` is for pale backgrounds.
- `repero-wordmark-dark.svg` is for dark backgrounds.

The custom R is deliberately slightly wider than the following Inter letterforms, giving it enough visual weight to open a word without looking like an icon pasted beside it. The `epero` and `AI` use Inter Semibold with tightened display tracking; the separate AI spacing lets the descriptor read as part of the name without competing with it. This produces a familiar, calm reading rhythm and keeps the wordmark compatible with the product UI.

Use Inter for all supporting typography. Recommended weights: 400 for body, 500 for labels, 600 for headings and the wordmark companion text, and 700 only for emphasis. Use sentence case, tight but not compressed display tracking, and generous line spacing in body copy.

## Colour

| Token | Value | Use |
| --- | --- | --- |
| Ink | `#0B1531` | Primary wordmark, text, structure |
| Ink strong | `#050A1C` | Dark canvas |
| Surface | `#F8FCFF` | Calm pale canvas |
| Surface raised | `#FFFFFF` | Cards and social panels |
| Accent | `#22D3EE` | Locator dot and restrained emphasis |
| Accent bright | `#67E8F9` | Locator dot on dark |
| Text on dark | `#F4FBFF` | Wordmark and text on dark |
| Line | `#D8E4EE` | Quiet boundaries |

Ink carries recognition; cyan is a signpost, not a fill color. This limited palette improves legibility, keeps interfaces calm, and makes the locator dot a consistent Repero signature. Do not introduce gradients in the wordmark or typography.

## Clear space and minimum sizes

Let **x** equal the diameter of the wordmark's cyan locator dot.

- Keep at least `4x` clear space on every side of a wordmark.
- Keep at least `3x` clear space on every side of the standalone typographic R.
- The wordmark minimum width is 168 px in digital use and 32 mm in print.
- The standalone typographic R minimum height is 48 px in digital use and 10 mm in print.
- Below these sizes, use the unchanged application icon rather than the typographic R.

The clear-space rule prevents neighboring UI or marketing copy from merging with the R's active diagonal and dot. The minimum sizes preserve the counter and make recognition immediate.

## Monochrome and dark mode

For one-color print, embossing, or constrained UI, use `logo/repero-r-mono.svg` and render the entire mark in a single solid color. On light surfaces use Ink; on dark surfaces use Text on dark. Do not retain a cyan dot in an otherwise monochrome mark.

On dark backgrounds use the dark wordmark. Its near-white letterforms maintain contrast without the glare of pure white, while the lighter cyan dot retains the locator cue. Never put the light wordmark over a busy photograph or low-contrast color.

## Incorrect usage

- Do not replace the application icon with the typographic R.
- Do not use the application icon as the first letter of “Repero.”
- Do not redraw, stretch, rotate, crop, outline, or add shadows to the wordmark.
- Do not recolor individual letters or turn the full wordmark cyan.
- Do not use the cyan dot as decoration elsewhere in the wordmark.
- Do not set the wordmark in another typeface or manually re-space it.
- Do not place it on gradients, photos, glows, or noisy backgrounds.

These restrictions keep the wordmark legible, preserve its one distinctive cue, and prevent its recognition from fragmenting across channels.

## Social media usage

Use the ready-made assets in `social/` as starting points: LinkedIn square (`1200 × 1200`), LinkedIn landscape (`1200 × 627`), Open Graph (`1200 × 630`), and Twitter/X (`1600 × 900`). The matching generic canvases in `templates/` can be edited for campaigns.

Keep copy to one idea, ideally two lines. Preserve the 72 px outer margin on social templates; avoid screenshots, device frames, product mockups, illustrations, and decorative effects. The whitespace makes the message quicker to scan, while the compact wordmark and single cyan accent make attribution clear without dominating the post.

## Rationale summary

Every element has one job: the closed, heavier R improves reading; the retained bowl, diagonal, and locator point create continuity with the app icon; Inter creates a seamless product-to-brand experience; restrained cyan improves recall; and generous whitespace turns organization into a visible brand behavior.

# FR Homepage Carousel And How-It-Works Design

## Objective

Improve the French marketing experience by replacing the current single product screenshot on the homepage with a compact product carousel, then support that lighter homepage with a dedicated explanatory page that can carry richer SEO-focused copy.

This work is intentionally scoped to French first. English and other locales should follow only after the French structure, copy approach, and visual framing are validated.

## Why This Change

The current French homepage proves the product with only one screenshot. That is useful, but it under-explains the product model:

- projects
- conversations
- active context
- indexed documents and sources
- generated artifacts
- search and retrieval

At the same time, putting all of that explanation directly on the homepage would make the landing heavier and weaken conversion. The right split is:

- homepage for fast product proof and CTA
- dedicated explanatory page for depth, pedagogy, and search-oriented copy

## Scope

### In Scope

- Update the French homepage hero visual area to use a product carousel instead of a single screenshot.
- Keep the existing homepage promise, CTA logic, and short supporting cards.
- Introduce a dedicated French page for explanatory product storytelling at `/fr/comment-ca-marche`.
- Reuse the existing screenshots already available for French.
- Add French SEO metadata for the new page through the centralized SEO component and existing layout patterns.
- Link the homepage and explanatory page together in a way that feels natural for both users and crawlers.

### Out Of Scope

- Localizing the same experience to English, German, Spanish, Italian, or Dutch in this iteration.
- Creating translated screenshots for non-French markets.
- Large homepage information architecture changes beyond the hero media and closely related supporting copy.
- Building a long feature matrix or pricing-style comparison content.

## Audience And Product Positioning

The French homepage should help a visitor quickly understand that Repero AI is not just a chat interface. It is an AI workspace where the useful work stays attached to its context and remains retrievable later.

The explanatory page should make that mental model explicit:

- work starts in a project
- context stays active
- documents and sources remain attached
- generated artifacts remain findable
- users can resume a conversation or decision later without rebuilding context

## Recommended Approach

Use a compact carousel on the homepage hero and move deeper explanation to a dedicated “how it works” page.

This balances:

- product proof
- conversion speed
- SEO depth
- future extensibility to English after validation

## Homepage Design

### Structure

Keep the current French homepage hero structure:

- left column: promise, supporting paragraph, primary CTA, secondary CTA, chips
- right column: product visual

Replace the current single screenshot in the right column with a compact carousel module.

### Carousel Behavior

The homepage carousel should stay simple and feel like product evidence, not like a decorative marketing slider.

Recommended structure:

- one main active screenshot
- one short benefit title
- one short supporting sentence
- visible navigation using vertical thumbnails or compact preview tabs
- four to five slides maximum

Avoid:

- auto-rotation
- long captions
- dense annotations inside the homepage module
- interactions that compete with the main CTA

### Recommended Slide Set

The French homepage carousel should prioritize these screens:

1. Artifacts
2. Active context
3. Search
4. Sources and documents
5. Projects and conversations

Each slide should answer one product question:

- Artifacts: can I keep generated outputs connected to the conversation?
- Active context: can I see what is currently attached to the work?
- Search: can I retrieve past work quickly?
- Sources/documents: are uploaded and web sources visible in one place?
- Projects/conversations: how is the workspace organized?

### Copy Model For Each Slide

Each slide should include:

- a short title focused on user value
- a one-sentence explanation

Example pattern:

- title: “Retrouvez vos artefacts sans perdre le contexte”
- sentence: “Les contenus générés restent liés à la conversation, aux sources et au projet concerné.”

The copy should describe outcomes, not UI controls.

### Homepage Content Below The Hero

Keep the three short cards currently used on the French homepage:

- problem
- solution
- direction

They may be tightened slightly so the carousel remains the strongest proof element on the page.

Do not turn the homepage into a long feature explainer. Depth belongs on the dedicated page.

## Dedicated “How It Works” Page

### Purpose

Create a French explanatory page at `/fr/comment-ca-marche`, designed for:

- richer product explanation
- stronger internal linking
- SEO-oriented topic coverage
- clearer onboarding for visitors who need more detail before clicking into the app

### Narrative Angle

This page should explain how users keep, structure, and retrieve AI work without losing context.

The framing should not be “feature list.” It should be a practical workflow narrative.

### Recommended Page Structure

1. Short intro that restates the problem clearly.
2. Four or five sections, each centered on one screenshot.
3. For each section:
   - benefit-led heading
   - screenshot
   - two to four paragraphs explaining what the user sees and why it matters
4. Closing section with CTA to the app and link to use cases.

### Recommended Sections

1. Centraliser le travail dans un projet
2. Garder le contexte actif sous la main
3. Retrouver documents, web et artefacts
4. Conserver les sorties générées sans perdre leur origine
5. Reprendre une conversation ou une décision plus tard

### SEO Role

This page should carry the richer explanatory copy that would be too heavy for the homepage.

It is the right place to naturally cover themes such as:

- organisation du travail avec l’IA
- retrouver une conversation IA
- garder le contexte d’un travail IA
- documents et artefacts IA
- espace de travail IA

The page should remain readable first and SEO-effective second. No keyword stuffing.

## Internationalization Strategy

Do not ship this experience to all locales yet.

Reasoning:

- the existing screenshots contain French UI labels
- showing French UI on English or other localized pages reduces clarity and trust
- validating the content structure in French first lowers risk before translation work

Follow-up sequence:

1. ship and validate French
2. adapt structure and copy for English
3. localize additional markets only once screenshots or visual alternatives are ready

## SEO And Metadata

The new French page should use the existing centralized SEO flow through `src/components/Seo.astro`.

Requirements:

- canonical URL
- localized title and meta description
- French `og:locale`
- internal links from homepage and, if appropriate, use-case pages

Additional schema is optional and out of scope for the first implementation.

## Content And UX Constraints

- Homepage remains conversion-oriented.
- Carousel captions stay short.
- Explanatory depth moves to the dedicated page.
- Existing visual language should be preserved.
- The implementation should avoid introducing a heavy JavaScript dependency just for a simple carousel if Astro-native behavior is sufficient.

## Testing Expectations

Verify:

- French homepage renders correctly with the carousel on desktop and mobile
- slide navigation remains usable and readable
- no layout regression in the hero
- dedicated page is reachable and linked logically
- SEO metadata is correct for the new page
- build output remains valid

## Risks

### Risk: homepage becomes too busy

Mitigation:

- keep carousel copy minimal
- cap the slide count at five
- keep long explanation off the homepage

### Risk: screenshots feel repetitive

Mitigation:

- assign each screenshot a distinct narrative role
- avoid duplicate captions that say the same thing

### Risk: future non-French rollout creates inconsistency

Mitigation:

- explicitly scope this work to French first
- reuse the pattern in English only after localized assets or equivalent visual treatment exists

## Implementation Notes

This design does not prescribe the final component decomposition, but the implementation should favor:

- one reusable homepage carousel component
- one reusable screenshot-with-copy section pattern for the explanatory page

The implementation should follow existing site patterns rather than introducing a separate design language for these pages.

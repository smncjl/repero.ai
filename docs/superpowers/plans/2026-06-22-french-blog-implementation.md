# French Blog Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a French content-driven blog under `/fr/blog` with centralized article SEO, sitemap entries, and RSS output.

**Architecture:** Use a single Astro Content Collection named `blog`, filtered by `lang` and `draft` in localized routes. Extend the centralized SEO component with optional article metadata and JSON-LD support so existing pages keep their current interface while blog pages opt into richer metadata.

**Tech Stack:** Astro 5, Astro Content Collections, Markdown, TypeScript, Tailwind CSS, static route generation

---

### Task 1: Add a build-output regression check for the blog

**Files:**
- Create: `scripts/test-blog-build.mjs`
- Modify: `package.json`

- [ ] **Step 1: Write the failing test**

Create `scripts/test-blog-build.mjs` that reads `dist/fr/blog/index.html`, `dist/fr/blog/chatgpt-claude-conversations-bordel/index.html`, `dist/fr/rss.xml`, and `dist/sitemap.xml`, then throws if any file is missing or expected blog SEO markers are absent.

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run build && node scripts/test-blog-build.mjs`
Expected: FAIL because the blog pages and feed do not exist yet.

- [ ] **Step 3: Wire the test into package scripts**

Add a script entry for `test:blog-build`.

- [ ] **Step 4: Re-run the failing test**

Run: `npm run build && npm run test:blog-build`
Expected: FAIL for missing blog output.

### Task 2: Add the content collection and shared blog helpers

**Files:**
- Create: `src/content.config.ts`
- Create: `src/lib/blog.ts`

- [ ] **Step 1: Write the failing test**

Use the existing build/test command from Task 1.
Expected: it still fails because blog routes do not exist.

- [ ] **Step 2: Add the collection schema and helpers**

Define the `blog` collection schema and add helpers for published filtering, sorting, reading-time estimation, canonical path construction, and related-post selection.

- [ ] **Step 3: Run the build test**

Run: `npm run build && npm run test:blog-build`
Expected: still FAIL because routes are not implemented yet.

### Task 3: Extend centralized SEO for article support

**Files:**
- Modify: `src/components/Seo.astro`
- Modify: `src/layouts/BaseLayout.astro`

- [ ] **Step 1: Write the failing test**

Rely on the Task 1 output test checking for `article:published_time`, canonical, and JSON-LD markers in the future blog page.

- [ ] **Step 2: Add optional article metadata props**

Extend the SEO API with optional `ogLocale`, `article`, and `schema` props while preserving backward compatibility for existing callers.

- [ ] **Step 3: Run the build test**

Run: `npm run build && npm run test:blog-build`
Expected: still FAIL because no blog page consumes the new metadata yet.

### Task 4: Build the French blog listing and article pages

**Files:**
- Create: `src/pages/fr/blog/index.astro`
- Create: `src/pages/fr/blog/[slug].astro`
- Modify: `src/styles/global.css`

- [ ] **Step 1: Write the failing test**

Use the same output test from Task 1.

- [ ] **Step 2: Implement the listing page**

Render non-draft French posts sorted by descending `pubDate`, displaying title, description, category, date, and reading time.

- [ ] **Step 3: Implement the article page**

Generate static paths from the French published posts, render Markdown content, back link, related posts, and pass article SEO metadata to `BaseLayout`.

- [ ] **Step 4: Add minimal blog typography styles**

Add focused classes for article prose and metadata while keeping the existing landing style language.

- [ ] **Step 5: Run the build test**

Run: `npm run build && npm run test:blog-build`
Expected: may still FAIL until content and feed are added.

### Task 5: Add French blog content, sitemap entries, and RSS

**Files:**
- Create: `src/content/blog/chatgpt-claude-conversations-bordel.md`
- Create: `src/content/blog/outils-ia-non-techniques.md`
- Create: `src/content/blog/ia-produire-rien-retrouver.md`
- Create: `src/pages/fr/rss.xml.ts`
- Modify: `src/pages/sitemap.xml.ts`

- [ ] **Step 1: Write the failing test**

Use the same output test, which should still fail until the published article and RSS are present.

- [ ] **Step 2: Add the three French Markdown posts**

Mark only `chatgpt-claude-conversations-bordel` as published. Keep the other two in draft.

- [ ] **Step 3: Add the French RSS route**

Emit a valid RSS feed for published French posts only.

- [ ] **Step 4: Extend the manual sitemap**

Add `/fr/blog` and published French post URLs only.

- [ ] **Step 5: Run the build test**

Run: `npm run build && npm run test:blog-build`
Expected: PASS

### Task 6: Full verification

**Files:**
- Modify: none

- [ ] **Step 1: Run the full project verification**

Run: `npm run check && npm run test:blog-build`
Expected: PASS

- [ ] **Step 2: Inspect generated outputs for correctness**

Check:
- `dist/fr/blog/index.html`
- `dist/fr/blog/chatgpt-claude-conversations-bordel/index.html`
- `dist/fr/rss.xml`
- `dist/sitemap.xml`

- [ ] **Step 3: Summarize residual risks**

Call out that English blog routes are structurally supported through `lang` frontmatter but not yet created.

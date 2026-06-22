# French Blog Design

## Goal

Add a content-driven French blog to the existing Astro marketing site using Content Collections, preserving the current multilingual URL structure and centralized SEO component.

## Scope

- Create a `blog` content collection backed by Markdown files in `src/content/blog`.
- Support localized filtering through `lang` frontmatter.
- Launch only French pages at `/fr/blog` and `/fr/blog/[slug]`.
- Render only published French posts in listing, article pages, sitemap, and RSS.
- Keep unpublished future articles in content as drafts.
- Extend the existing SEO component so article pages emit correct canonical, Open Graph, article metadata, and JSON-LD without regressing existing pages.

## Content Model

Each blog post will live in `src/content/blog/*.md` and use this frontmatter:

- `title: string`
- `description: string`
- `pubDate: date`
- `updatedDate?: date`
- `author: string`
- `category: string`
- `tags: string[]`
- `lang: 'fr' | 'en'`
- `draft: boolean` default `false`

The slug will come from the Markdown filename so pages stay fully content-driven.

## Routing

- Listing: `/fr/blog`
- Article: `/fr/blog/[slug]`
- RSS: `/fr/rss.xml`

No root `/blog` page will be created at this stage.

## Rendering

The blog should visually match the existing landing site by reusing:

- `BaseLayout`
- `Header`
- `Footer`
- global utility classes and dark visual language

The listing page shows:

- title
- description
- category
- publication date
- reading time

The article page shows:

- article header metadata
- rendered Markdown body
- back link to `/fr/blog`
- simple related posts based on category overlap first, then shared tags

## SEO

Keep SEO centralized through `src/components/Seo.astro`.

Extend it to support:

- article `og:type`
- canonical per post
- Open Graph published and modified timestamps
- JSON-LD `BlogPosting`
- optional extra JSON-LD blocks without affecting existing pages

Existing marketing pages should continue using the same component unchanged.

## Sitemap And RSS

The existing manual sitemap route should be extended to include:

- `/fr/blog`
- every published French blog post

Draft posts must be excluded.

Add `/fr/rss.xml` only if it does not already exist. The feed should contain published French posts only.

## Publication Schedule

Three French Markdown posts will be created immediately, but only S1 is published now:

- `chatgpt-claude-conversations-bordel` -> published
- `outils-ia-non-techniques` -> draft
- `ia-produire-rien-retrouver` -> draft

This preserves the weekly rollout requirement.

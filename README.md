# Repero AI Landing Website

Public marketing website for Repero AI.

Repero AI helps users keep, organize and retrieve what they search, upload, generate and decide with AI.

## Stack

- Astro
- TypeScript
- Tailwind CSS
- Cloudflare Pages

## Local development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Cloudflare Pages deployment

Recommended settings:

- Framework preset: Astro
- Build command: `npm run build`
- Output directory: `dist`
- Node.js version: use the version defined by the project

## Environment variables

The waitlist form endpoint must be configurable.

```bash
PUBLIC_WAITLIST_ENDPOINT=https://example.com/api/waitlist
```

If no endpoint is configured, the website shows a clear fallback message.

## Public repository notice

This repository contains only the public marketing website for Repero AI.

Do not commit:

- secrets
- private infrastructure details
- backend configuration
- API keys
- pricing internals
- quota internals
- private product roadmap details

## License

All rights reserved.

See LICENSE.

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

For the waitlist endpoint and D1/queue bindings, use Cloudflare Pages local emulation:

```bash
npx wrangler pages dev dist
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
- Add a Pages Function at `functions/api/waitlist.js`
- Create a D1 database and bind it as `DB`
- Optionally create a Queue and bind it as `WAITLIST_QUEUE` if you want async follow-up processing

## Environment variables

The waitlist form endpoint defaults to `/api/waitlist`.

```bash
PUBLIC_WAITLIST_ENDPOINT=/api/waitlist
```

You can override it if you want to send submissions to another service.

### Waitlist storage

The waitlist Function creates its D1 table on first use, so deployment stays quick.

Recommended table fields:

- email
- language
- profile
- intended use
- message
- source page
- created at

Queue usage is optional for now. If you set `WAITLIST_QUEUE`, the Function will also enqueue new submissions for later processing, which makes it easy to add email confirmation or CRM sync without changing the form.

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

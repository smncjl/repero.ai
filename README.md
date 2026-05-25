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
- Create a D1 database and bind it as `DB`
- Optionally create a Queue and bind it as `WAITLIST_QUEUE` if you want async follow-up processing

Default site URL:

```bash
SITE_URL=https://repero.ai
```

Pages deploys the Function automatically. Anything inside `functions/` is published with the site, so `/api/waitlist` becomes available after the Pages deployment.

SEO routes:

- `/robots.txt`
- `/sitemap.xml`

You can configure bindings in the Cloudflare dashboard, or copy `wrangler.example.toml` to a local `wrangler.toml` if you want repository-free local configuration.

`wrangler.example.toml` is not deployed by Cloudflare. It is intentionally an example so the public repository does not publish project-specific infrastructure IDs. Do not commit a real `wrangler.toml` unless you intentionally want the repository to be the source of truth for Pages configuration.

If you want confirmation emails, point the Pages Function at a separate email worker with:

```bash
EMAIL_WORKER_URL=
EMAIL_WORKER_SECRET=
```

The worker owns:

- `WAITLIST_FROM_EMAIL`
- `WAITLIST_FROM_NAME`

## Environment variables

The waitlist form endpoint defaults to `/api/waitlist`.

```bash
PUBLIC_WAITLIST_ENDPOINT=/api/waitlist
```

You can override it if you want to send submissions to another service.

### Waitlist storage

The waitlist Function will try to ensure its D1 table exists on first use. If your database was created before the current schema was added, run the SQL in `schemas/waitlist.sql` once in the D1 console.

Recommended table fields:

- email
- language
- profile
- intended use
- message
- source page
- created at

### Anti-spam and email

The waitlist Function includes a simple honeypot field named `website`. If a bot fills it, the submission is ignored.

If `EMAIL_WORKER_URL` and `EMAIL_WORKER_SECRET` are set, the Function notifies the external email worker after the signup is stored in D1. Email confirmation is optional and will not block the waitlist submission if the worker is unavailable.

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

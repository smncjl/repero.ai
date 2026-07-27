# Repero branding assets

This repository is the official, reproducible source for Repero branding assets used by the marketing site and distributed to other Repero repositories.

## Official SVG source

The source of truth is:

```text
public/brand/repero-icon.svg
```

Do not redraw the logo when generating raster assets. The transparent variant at `public/brand/repero-icon-transparent.svg` can be used for special design contexts, but generated favicons and distribution icons must be rendered from `public/brand/repero-icon.svg`.

## Official background color

The official solid background color for generated padded assets is:

```text
#050A1C
```

This is the dark end color used by the official icon background gradient and is used as the canvas color for maskable icon padding.

## Generation rules

Run generation from the repository root:

```bash
npm run brand:generate
```

The script `scripts/generate-brand-assets.mjs` renders deterministic PNG assets from the official SVG with the existing `sharp` dependency available in the Astro toolchain. It also builds `favicon.ico` from the generated 16 px and 32 px PNG favicons.

Generated files are written to:

```text
public/brand/generated/
```

This directory is intentionally ignored by Git: PNG and ICO files are build artifacts, not pull-request inputs. The SVG source and the versioned generator are sufficient to reproduce them.

## Cloudflare deployment

The standard build command remains:

```bash
npm run build
```

npm automatically runs the versioned `prebuild` script first. It generates and validates every branding asset before Astro copies `public/` into the deployed Cloudflare output. No Cloudflare-specific command and no committed binary file are required.

`sharp` is declared as a direct runtime dependency so that asset generation also works when Cloudflare installs production dependencies only.

## Maskable safe margin

The maskable PWA icon is generated as a 512 × 512 px canvas using the official background color. The official SVG is centered at 80% of the canvas size, leaving a 10% margin on each edge. This keeps the important brand mark inside the standard maskable safe area while preserving the original logo artwork.

## Validation

Validate generated dimensions from the repository root:

```bash
npm run brand:validate
```

The validation script checks that each PNG has the expected dimensions and that `favicon.ico` contains 16 × 16 px and 32 × 32 px entries.

## Generated files

The generated distribution set is:

```text
public/brand/generated/favicon.ico
public/brand/generated/favicon-16x16.png
public/brand/generated/favicon-32x32.png
public/brand/generated/apple-touch-icon-180x180.png
public/brand/generated/pwa-icon-192x192.png
public/brand/generated/pwa-icon-512x512.png
public/brand/generated/pwa-icon-maskable-512x512.png
public/brand/generated/notification-badge-96x96.png
```

## Copying to other repositories

For repositories such as `ai-platform`, first run `npm ci && npm run brand:generate && npm run brand:validate`, then copy the files from `public/brand/generated/` without renaming unless the target repository has an explicit convention. If the target app needs its own manifest, reference the copied PWA files from that app's manifest there. The marketing site in this repository intentionally does not become a PWA as part of this branding asset workflow.

When assets need to be refreshed, regenerate and validate them here first, then copy the validated generated files to the consuming repository.

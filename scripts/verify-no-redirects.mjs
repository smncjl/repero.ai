import { spawn } from 'node:child_process';
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { setTimeout as delay } from 'node:timers/promises';

const repoRoot = process.cwd();
const previewOrigin = 'http://127.0.0.1:4321';
const previewUrl = new URL(previewOrigin);

function fail(message) {
  console.error(message);
  process.exitCode = 1;
  throw new Error(message);
}

async function walkHtmlFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...await walkHtmlFiles(fullPath));
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      files.push(fullPath);
    }
  }

  return files;
}

function extractSitemapLocs(xml) {
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
}

function extractHeadLinks(html, rel) {
  const pattern = rel === 'canonical'
    ? /<link\s+rel="canonical"\s+href="([^"]+)"/gi
    : /<link\s+rel="alternate"\s+hreflang="[^"]+"\s+href="([^"]+)"/gi;

  return [...html.matchAll(pattern)].map((match) => match[1]);
}

function assertNoTrailingSlash(urlString, context) {
  const url = new URL(urlString);
  if (url.pathname !== '/' && url.pathname.endsWith('/')) {
    fail(`${context} uses a trailing slash URL: ${urlString}`);
  }
}

async function waitForPreviewServer() {
  const deadline = Date.now() + 30_000;

  while (Date.now() < deadline) {
    try {
      const response = await fetch(new URL('/robots.txt', previewUrl), { redirect: 'manual' });
      if (response.ok) {
        return;
      }
    } catch {
      // Server is not ready yet.
    }

    await delay(250);
  }

  fail('Preview server did not become ready in time.');
}

async function main() {
  const distDir = path.join(repoRoot, 'dist');
  const sitemapPath = path.join(distDir, 'sitemap.xml');
  const sitemapXml = await readFile(sitemapPath, 'utf8');
  const sitemapLocs = extractSitemapLocs(sitemapXml);

  if (sitemapLocs.length === 0) {
    fail('No sitemap URLs were found to verify.');
  }

  for (const loc of sitemapLocs) {
    assertNoTrailingSlash(loc, 'Sitemap entry');
  }

  const htmlFiles = await walkHtmlFiles(distDir);
  for (const htmlFile of htmlFiles) {
    const html = await readFile(htmlFile, 'utf8');
    const canonicalLinks = extractHeadLinks(html, 'canonical');
    const alternateLinks = extractHeadLinks(html, 'alternate');

    for (const canonical of canonicalLinks) {
      assertNoTrailingSlash(canonical, `${path.relative(repoRoot, htmlFile)} canonical`);
    }

    for (const alternate of alternateLinks) {
      assertNoTrailingSlash(alternate, `${path.relative(repoRoot, htmlFile)} alternate`);
    }
  }

  const astroBinary = process.platform === 'win32'
    ? path.join(repoRoot, 'node_modules', '.bin', 'astro.cmd')
    : path.join(repoRoot, 'node_modules', '.bin', 'astro');

  const preview = spawn(astroBinary, ['preview', '--host', '127.0.0.1', '--port', '4321', '--strictPort'], {
    cwd: repoRoot,
    stdio: 'inherit'
  });

  const shutdown = () => {
    if (!preview.killed) {
      preview.kill('SIGTERM');
    }
  };

  process.on('exit', shutdown);
  process.on('SIGINT', () => {
    shutdown();
    process.exit(130);
  });
  process.on('SIGTERM', () => {
    shutdown();
    process.exit(143);
  });

  try {
    await waitForPreviewServer();

    for (const loc of sitemapLocs) {
      const localUrl = new URL(new URL(loc).pathname, previewOrigin);
      const response = await fetch(localUrl, { redirect: 'manual' });
      const locationHeader = response.headers.get('location');

      if (response.status !== 200) {
        fail(`Expected 200 for ${loc}, got ${response.status}`);
      }

      if (locationHeader) {
        fail(`Expected no redirect for ${loc}, but got Location: ${locationHeader}`);
      }
    }

    for (const url of [new URL('/sitemap.xml', previewOrigin), new URL('/robots.txt', previewOrigin)]) {
      const response = await fetch(url, { redirect: 'manual' });
      const locationHeader = response.headers.get('location');

      if (response.status !== 200) {
        fail(`Expected 200 for ${url.href}, got ${response.status}`);
      }

      if (locationHeader) {
        fail(`Expected no redirect for ${url.href}, but got Location: ${locationHeader}`);
      }
    }

    console.log(`Verified ${sitemapLocs.length} sitemap URLs and ${htmlFiles.length} HTML files without trailing-slash canonicals or redirects.`);
  } finally {
    shutdown();
  }
}

main().catch((error) => {
  if (!process.exitCode) {
    process.exitCode = 1;
  }
  console.error(error instanceof Error ? error.message : error);
});

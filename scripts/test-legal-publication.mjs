import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const dist = join(process.cwd(), 'dist');
const routes = [
  ['en/privacy.html', 'https://repero.ai/en/privacy', 'https://repero.ai/fr/privacy'],
  ['fr/privacy.html', 'https://repero.ai/fr/privacy', 'https://repero.ai/en/privacy'],
  ['en/cookies.html', 'https://repero.ai/en/cookies', 'https://repero.ai/fr/cookies'],
  ['fr/cookies.html', 'https://repero.ai/fr/cookies', 'https://repero.ai/en/cookies'],
  ['en/terms.html', 'https://repero.ai/en/terms', 'https://repero.ai/fr/terms'],
  ['fr/terms.html', 'https://repero.ai/fr/terms', 'https://repero.ai/en/terms'],
  ['en/trust/ai.html', 'https://repero.ai/en/trust/ai', 'https://repero.ai/fr/trust/ai'],
  ['fr/trust/ai.html', 'https://repero.ai/fr/trust/ai', 'https://repero.ai/en/trust/ai'],
  ['en/legal-notice.html', 'https://repero.ai/en/legal-notice', 'https://repero.ai/fr/mentions-legales'],
  ['fr/mentions-legales.html', 'https://repero.ai/fr/mentions-legales', 'https://repero.ai/en/legal-notice']
];

function assert(value, message) {
  if (!value) throw new Error(message);
}

const sitemap = readFileSync(join(dist, 'sitemap.xml'), 'utf8');
const css = readdirSync(join(dist, '_astro'))
  .filter((file) => file.endsWith('.css'))
  .map((file) => readFileSync(join(dist, '_astro', file), 'utf8'))
  .join('\n');
assert(!css.includes('fonts.googleapis.com'), 'Generated CSS must not reference Google Fonts.');

for (const [file, canonical, alternate] of routes) {
  const html = readFileSync(join(dist, file), 'utf8');
  assert(html.includes(`<link rel="canonical" href="${canonical}">`), `Missing canonical in ${file}`);
  assert(html.includes(`href="${alternate}"`), `Missing reciprocal alternate in ${file}`);
  assert(html.includes('<header'), `Missing shared header in ${file}`);
  assert(html.includes('<footer'), `Missing shared footer in ${file}`);
  assert(sitemap.includes(`<loc>${canonical}</loc>`), `Missing sitemap URL ${canonical}`);
  assert(!html.includes('fonts.googleapis.com'), `Google Fonts reference in ${file}`);
}

console.log(`Legal publication assertions passed for ${routes.length} routes.`);

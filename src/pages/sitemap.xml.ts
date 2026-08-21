import { SITE_URL, absoluteUrl } from '../config/site';
import { buildBlogIndexPath, buildBlogPostPath, getPublishedBlogPosts } from '../lib/blog';

interface Entry {
  path: string;
  alternates?: Array<{ lang: 'en' | 'fr'; path: string }>;
}

const entries: Entry[] = [
  { path: '/en', alternates: [{ lang: 'fr', path: '/fr' }] },
  { path: '/fr', alternates: [{ lang: 'en', path: '/en' }] },
  { path: '/en/trust/ai', alternates: [{ lang: 'fr', path: '/fr/trust/ai' }] },
  { path: '/fr/trust/ai', alternates: [{ lang: 'en', path: '/en/trust/ai' }] },
  { path: '/en/waitlist', alternates: [{ lang: 'fr', path: '/fr/liste-attente' }] },
  { path: '/fr/liste-attente', alternates: [{ lang: 'en', path: '/en/waitlist' }] },
  { path: '/en/use-cases', alternates: [{ lang: 'fr', path: '/fr/cas-usages' }] },
  { path: '/fr/cas-usages', alternates: [{ lang: 'en', path: '/en/use-cases' }] },
  { path: '/en/use-cases/everyday', alternates: [{ lang: 'fr', path: '/fr/cas-usages/quotidien' }] },
  { path: '/fr/cas-usages/quotidien', alternates: [{ lang: 'en', path: '/en/use-cases/everyday' }] },
  { path: '/en/use-cases/developers', alternates: [{ lang: 'fr', path: '/fr/cas-usages/developpeurs' }] },
  { path: '/fr/cas-usages/developpeurs', alternates: [{ lang: 'en', path: '/en/use-cases/developers' }] },
  { path: '/en/use-cases/data-teams', alternates: [{ lang: 'fr', path: '/fr/cas-usages/data' }] },
  { path: '/fr/cas-usages/data', alternates: [{ lang: 'en', path: '/en/use-cases/data-teams' }] },
  { path: '/en/use-cases/tradespeople', alternates: [{ lang: 'fr', path: '/fr/cas-usages/techniciens' }] },
  { path: '/fr/cas-usages/techniciens', alternates: [{ lang: 'en', path: '/en/use-cases/tradespeople' }] },
  { path: '/fr/guide' },
];

function escapeXml(value: string) {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
}

export async function GET() {
  const publishedFrenchPosts = await getPublishedBlogPosts('fr');
  const dynamicEntries: Entry[] = [
    { path: buildBlogIndexPath('fr') },
    ...publishedFrenchPosts.map((post) => ({ path: buildBlogPostPath(post) }))
  ];
  const uniqueEntries = new Map<string, Entry>();
  for (const entry of [...entries, ...dynamicEntries]) {
    uniqueEntries.set(entry.path, entry);
  }
  const allEntries = [...uniqueEntries.values()];
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${allEntries
  .map((entry) => {
    const loc = absoluteUrl(entry.path, SITE_URL);
    const alternates = entry.alternates
      ?.map((alternate) => `    <xhtml:link rel="alternate" hreflang="${alternate.lang}" href="${escapeXml(absoluteUrl(alternate.path, SITE_URL))}" />`)
      .join('\n') ?? '';

    return `  <url>
    <loc>${escapeXml(loc)}</loc>
${alternates ? `${alternates}\n` : ''}  </url>`;
  })
  .join('\n')}
</urlset>
`;

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8'
    }
  });
}

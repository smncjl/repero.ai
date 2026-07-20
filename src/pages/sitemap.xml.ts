import { SITE_URL, absoluteUrl } from '../config/site';
import { buildBlogIndexPath, buildBlogPostPath, getPublishedBlogPosts } from '../lib/blog';

interface Entry {
  path: string;
  alternates?: Array<{ lang: 'en' | 'fr' | 'de' | 'it' | 'es' | 'nl'; path: string }>;
}

const entries: Entry[] = [
  { path: '/en', alternates: [{ lang: 'fr', path: '/fr' }, { lang: 'de', path: '/de' }, { lang: 'it', path: '/it' }, { lang: 'es', path: '/es' }, { lang: 'nl', path: '/nl' }] },
  { path: '/fr', alternates: [{ lang: 'en', path: '/en' }, { lang: 'de', path: '/de' }, { lang: 'it', path: '/it' }, { lang: 'es', path: '/es' }, { lang: 'nl', path: '/nl' }] },
  { path: '/de', alternates: [{ lang: 'en', path: '/en' }, { lang: 'fr', path: '/fr' }, { lang: 'it', path: '/it' }, { lang: 'es', path: '/es' }, { lang: 'nl', path: '/nl' }] },
  { path: '/it', alternates: [{ lang: 'en', path: '/en' }, { lang: 'fr', path: '/fr' }, { lang: 'de', path: '/de' }, { lang: 'es', path: '/es' }, { lang: 'nl', path: '/nl' }] },
  { path: '/es', alternates: [{ lang: 'en', path: '/en' }, { lang: 'fr', path: '/fr' }, { lang: 'de', path: '/de' }, { lang: 'it', path: '/it' }, { lang: 'nl', path: '/nl' }] },
  { path: '/nl', alternates: [{ lang: 'en', path: '/en' }, { lang: 'fr', path: '/fr' }, { lang: 'de', path: '/de' }, { lang: 'it', path: '/it' }, { lang: 'es', path: '/es' }] },
  { path: '/en/waitlist', alternates: [{ lang: 'fr', path: '/fr/liste-attente' }, { lang: 'de', path: '/de/waitlist' }, { lang: 'it', path: '/it/waitlist' }, { lang: 'es', path: '/es/waitlist' }, { lang: 'nl', path: '/nl/waitlist' }] },
  { path: '/fr/liste-attente', alternates: [{ lang: 'en', path: '/en/waitlist' }, { lang: 'de', path: '/de/waitlist' }, { lang: 'it', path: '/it/waitlist' }, { lang: 'es', path: '/es/waitlist' }, { lang: 'nl', path: '/nl/waitlist' }] },
  { path: '/de/waitlist', alternates: [{ lang: 'en', path: '/en/waitlist' }, { lang: 'fr', path: '/fr/liste-attente' }, { lang: 'it', path: '/it/waitlist' }, { lang: 'es', path: '/es/waitlist' }, { lang: 'nl', path: '/nl/waitlist' }] },
  { path: '/it/waitlist', alternates: [{ lang: 'en', path: '/en/waitlist' }, { lang: 'fr', path: '/fr/liste-attente' }, { lang: 'de', path: '/de/waitlist' }, { lang: 'es', path: '/es/waitlist' }, { lang: 'nl', path: '/nl/waitlist' }] },
  { path: '/es/waitlist', alternates: [{ lang: 'en', path: '/en/waitlist' }, { lang: 'fr', path: '/fr/liste-attente' }, { lang: 'de', path: '/de/waitlist' }, { lang: 'it', path: '/it/waitlist' }, { lang: 'nl', path: '/nl/waitlist' }] },
  { path: '/nl/waitlist', alternates: [{ lang: 'en', path: '/en/waitlist' }, { lang: 'fr', path: '/fr/liste-attente' }, { lang: 'de', path: '/de/waitlist' }, { lang: 'it', path: '/it/waitlist' }, { lang: 'es', path: '/es/waitlist' }] },
  { path: '/en/use-cases', alternates: [{ lang: 'fr', path: '/fr/cas-usages' }, { lang: 'de', path: '/de/use-cases' }, { lang: 'it', path: '/it/use-cases' }, { lang: 'es', path: '/es/use-cases' }, { lang: 'nl', path: '/nl/use-cases' }] },
  { path: '/fr/cas-usages', alternates: [{ lang: 'en', path: '/en/use-cases' }, { lang: 'de', path: '/de/use-cases' }, { lang: 'it', path: '/it/use-cases' }, { lang: 'es', path: '/es/use-cases' }, { lang: 'nl', path: '/nl/use-cases' }] },
  { path: '/de/use-cases', alternates: [{ lang: 'en', path: '/en/use-cases' }, { lang: 'fr', path: '/fr/cas-usages' }, { lang: 'it', path: '/it/use-cases' }, { lang: 'es', path: '/es/use-cases' }, { lang: 'nl', path: '/nl/use-cases' }] },
  { path: '/it/use-cases', alternates: [{ lang: 'en', path: '/en/use-cases' }, { lang: 'fr', path: '/fr/cas-usages' }, { lang: 'de', path: '/de/use-cases' }, { lang: 'es', path: '/es/use-cases' }, { lang: 'nl', path: '/nl/use-cases' }] },
  { path: '/es/use-cases', alternates: [{ lang: 'en', path: '/en/use-cases' }, { lang: 'fr', path: '/fr/cas-usages' }, { lang: 'de', path: '/de/use-cases' }, { lang: 'it', path: '/it/use-cases' }, { lang: 'nl', path: '/nl/use-cases' }] },
  { path: '/nl/use-cases', alternates: [{ lang: 'en', path: '/en/use-cases' }, { lang: 'fr', path: '/fr/cas-usages' }, { lang: 'de', path: '/de/use-cases' }, { lang: 'it', path: '/it/use-cases' }, { lang: 'es', path: '/es/use-cases' }] },
  { path: '/en/use-cases/everyday', alternates: [{ lang: 'fr', path: '/fr/cas-usages/quotidien' }, { lang: 'de', path: '/de/use-cases/everyday' }, { lang: 'it', path: '/it/use-cases/everyday' }, { lang: 'es', path: '/es/use-cases/everyday' }, { lang: 'nl', path: '/nl/use-cases/everyday' }] },
  { path: '/fr/cas-usages/quotidien', alternates: [{ lang: 'en', path: '/en/use-cases/everyday' }, { lang: 'de', path: '/de/use-cases/everyday' }, { lang: 'it', path: '/it/use-cases/everyday' }, { lang: 'es', path: '/es/use-cases/everyday' }, { lang: 'nl', path: '/nl/use-cases/everyday' }] },
  { path: '/de/use-cases/everyday', alternates: [{ lang: 'en', path: '/en/use-cases/everyday' }, { lang: 'fr', path: '/fr/cas-usages/quotidien' }, { lang: 'it', path: '/it/use-cases/everyday' }, { lang: 'es', path: '/es/use-cases/everyday' }, { lang: 'nl', path: '/nl/use-cases/everyday' }] },
  { path: '/it/use-cases/everyday', alternates: [{ lang: 'en', path: '/en/use-cases/everyday' }, { lang: 'fr', path: '/fr/cas-usages/quotidien' }, { lang: 'de', path: '/de/use-cases/everyday' }, { lang: 'es', path: '/es/use-cases/everyday' }, { lang: 'nl', path: '/nl/use-cases/everyday' }] },
  { path: '/es/use-cases/everyday', alternates: [{ lang: 'en', path: '/en/use-cases/everyday' }, { lang: 'fr', path: '/fr/cas-usages/quotidien' }, { lang: 'de', path: '/de/use-cases/everyday' }, { lang: 'it', path: '/it/use-cases/everyday' }, { lang: 'nl', path: '/nl/use-cases/everyday' }] },
  { path: '/nl/use-cases/everyday', alternates: [{ lang: 'en', path: '/en/use-cases/everyday' }, { lang: 'fr', path: '/fr/cas-usages/quotidien' }, { lang: 'de', path: '/de/use-cases/everyday' }, { lang: 'it', path: '/it/use-cases/everyday' }, { lang: 'es', path: '/es/use-cases/everyday' }] },
  { path: '/en/use-cases/developers', alternates: [{ lang: 'fr', path: '/fr/cas-usages/developpeurs' }, { lang: 'de', path: '/de/use-cases/developers' }, { lang: 'it', path: '/it/use-cases/developers' }, { lang: 'es', path: '/es/use-cases/developers' }, { lang: 'nl', path: '/nl/use-cases/developers' }] },
  { path: '/fr/cas-usages/developpeurs', alternates: [{ lang: 'en', path: '/en/use-cases/developers' }, { lang: 'de', path: '/de/use-cases/developers' }, { lang: 'it', path: '/it/use-cases/developers' }, { lang: 'es', path: '/es/use-cases/developers' }, { lang: 'nl', path: '/nl/use-cases/developers' }] },
  { path: '/de/use-cases/developers', alternates: [{ lang: 'en', path: '/en/use-cases/developers' }, { lang: 'fr', path: '/fr/cas-usages/developpeurs' }, { lang: 'it', path: '/it/use-cases/developers' }, { lang: 'es', path: '/es/use-cases/developers' }, { lang: 'nl', path: '/nl/use-cases/developers' }] },
  { path: '/it/use-cases/developers', alternates: [{ lang: 'en', path: '/en/use-cases/developers' }, { lang: 'fr', path: '/fr/cas-usages/developpeurs' }, { lang: 'de', path: '/de/use-cases/developers' }, { lang: 'es', path: '/es/use-cases/developers' }, { lang: 'nl', path: '/nl/use-cases/developers' }] },
  { path: '/es/use-cases/developers', alternates: [{ lang: 'en', path: '/en/use-cases/developers' }, { lang: 'fr', path: '/fr/cas-usages/developpeurs' }, { lang: 'de', path: '/de/use-cases/developers' }, { lang: 'it', path: '/it/use-cases/developers' }, { lang: 'nl', path: '/nl/use-cases/developers' }] },
  { path: '/nl/use-cases/developers', alternates: [{ lang: 'en', path: '/en/use-cases/developers' }, { lang: 'fr', path: '/fr/cas-usages/developpeurs' }, { lang: 'de', path: '/de/use-cases/developers' }, { lang: 'it', path: '/it/use-cases/developers' }, { lang: 'es', path: '/es/use-cases/developers' }] },
  { path: '/en/use-cases/data-teams', alternates: [{ lang: 'fr', path: '/fr/cas-usages/data' }, { lang: 'de', path: '/de/use-cases/data-teams' }, { lang: 'it', path: '/it/use-cases/data-teams' }, { lang: 'es', path: '/es/use-cases/data-teams' }, { lang: 'nl', path: '/nl/use-cases/data-teams' }] },
  { path: '/fr/cas-usages/data', alternates: [{ lang: 'en', path: '/en/use-cases/data-teams' }, { lang: 'de', path: '/de/use-cases/data-teams' }, { lang: 'it', path: '/it/use-cases/data-teams' }, { lang: 'es', path: '/es/use-cases/data-teams' }, { lang: 'nl', path: '/nl/use-cases/data-teams' }] },
  { path: '/de/use-cases/data-teams', alternates: [{ lang: 'en', path: '/en/use-cases/data-teams' }, { lang: 'fr', path: '/fr/cas-usages/data' }, { lang: 'it', path: '/it/use-cases/data-teams' }, { lang: 'es', path: '/es/use-cases/data-teams' }, { lang: 'nl', path: '/nl/use-cases/data-teams' }] },
  { path: '/it/use-cases/data-teams', alternates: [{ lang: 'en', path: '/en/use-cases/data-teams' }, { lang: 'fr', path: '/fr/cas-usages/data' }, { lang: 'de', path: '/de/use-cases/data-teams' }, { lang: 'es', path: '/es/use-cases/data-teams' }, { lang: 'nl', path: '/nl/use-cases/data-teams' }] },
  { path: '/es/use-cases/data-teams', alternates: [{ lang: 'en', path: '/en/use-cases/data-teams' }, { lang: 'fr', path: '/fr/cas-usages/data' }, { lang: 'de', path: '/de/use-cases/data-teams' }, { lang: 'it', path: '/it/use-cases/data-teams' }, { lang: 'nl', path: '/nl/use-cases/data-teams' }] },
  { path: '/nl/use-cases/data-teams', alternates: [{ lang: 'en', path: '/en/use-cases/data-teams' }, { lang: 'fr', path: '/fr/cas-usages/data' }, { lang: 'de', path: '/de/use-cases/data-teams' }, { lang: 'it', path: '/it/use-cases/data-teams' }, { lang: 'es', path: '/es/use-cases/data-teams' }] },
  { path: '/en/use-cases/tradespeople', alternates: [{ lang: 'fr', path: '/fr/cas-usages/techniciens' }, { lang: 'de', path: '/de/use-cases/tradespeople' }, { lang: 'it', path: '/it/use-cases/tradespeople' }, { lang: 'es', path: '/es/use-cases/tradespeople' }, { lang: 'nl', path: '/nl/use-cases/tradespeople' }] },
  { path: '/fr/cas-usages/techniciens', alternates: [{ lang: 'en', path: '/en/use-cases/tradespeople' }, { lang: 'de', path: '/de/use-cases/tradespeople' }, { lang: 'it', path: '/it/use-cases/tradespeople' }, { lang: 'es', path: '/es/use-cases/tradespeople' }, { lang: 'nl', path: '/nl/use-cases/tradespeople' }] },
  { path: '/de/use-cases/tradespeople', alternates: [{ lang: 'en', path: '/en/use-cases/tradespeople' }, { lang: 'fr', path: '/fr/cas-usages/techniciens' }, { lang: 'it', path: '/it/use-cases/tradespeople' }, { lang: 'es', path: '/es/use-cases/tradespeople' }, { lang: 'nl', path: '/nl/use-cases/tradespeople' }] },
  { path: '/it/use-cases/tradespeople', alternates: [{ lang: 'en', path: '/en/use-cases/tradespeople' }, { lang: 'fr', path: '/fr/cas-usages/techniciens' }, { lang: 'de', path: '/de/use-cases/tradespeople' }, { lang: 'es', path: '/es/use-cases/tradespeople' }, { lang: 'nl', path: '/nl/use-cases/tradespeople' }] },
  { path: '/es/use-cases/tradespeople', alternates: [{ lang: 'en', path: '/en/use-cases/tradespeople' }, { lang: 'fr', path: '/fr/cas-usages/techniciens' }, { lang: 'de', path: '/de/use-cases/tradespeople' }, { lang: 'it', path: '/it/use-cases/tradespeople' }, { lang: 'nl', path: '/nl/use-cases/tradespeople' }] },
  { path: '/nl/use-cases/tradespeople', alternates: [{ lang: 'en', path: '/en/use-cases/tradespeople' }, { lang: 'fr', path: '/fr/cas-usages/techniciens' }, { lang: 'de', path: '/de/use-cases/tradespeople' }, { lang: 'it', path: '/it/use-cases/tradespeople' }, { lang: 'es', path: '/es/use-cases/tradespeople' }] },
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

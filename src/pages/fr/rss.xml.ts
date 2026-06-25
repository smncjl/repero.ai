import { SITE_NAME, SITE_URL, absoluteUrl } from '../../config/site';
import { buildBlogPostPath, getPublishedBlogPosts } from '../../lib/blog';

function escapeXml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function GET() {
  const posts = await getPublishedBlogPosts('fr');
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(`${SITE_NAME} Blog (FR)`)}</title>
    <link>${escapeXml(absoluteUrl('/fr/blog', SITE_URL))}</link>
    <description>${escapeXml('Les derniers articles Repero AI sur l’IA, la mémoire de travail et l’organisation des contenus.')}</description>
    <language>fr</language>
${posts
  .map((post) => {
    const link = absoluteUrl(buildBlogPostPath(post), SITE_URL);

    return `    <item>
      <title>${escapeXml(post.data.title)}</title>
      <description>${escapeXml(post.data.description)}</description>
      <link>${escapeXml(link)}</link>
      <guid>${escapeXml(link)}</guid>
      <pubDate>${post.data.pubDate.toUTCString()}</pubDate>
    </item>`;
  })
  .join('\n')}
  </channel>
</rss>
`;

  return new Response(body, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8'
    }
  });
}

import { SITE_URL } from '../config/site';

export function GET() {
  return new Response(`User-agent: *
Allow: /

Sitemap: ${new URL('/sitemap.xml', SITE_URL).href}
`, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8'
    }
  });
}

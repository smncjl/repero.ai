export const LEGAL_LAST_UPDATED = '2026-09-04';

export const legalDates = {
  en: '4 September 2026',
  fr: '4 septembre 2026'
} as const;

export function legalUrls(lang: 'en' | 'fr', path: string, alternatePath: string) {
  const site = 'https://repero.ai';
  return {
    canonical: new URL(`/${lang}${path}`, site).href,
    alternate: {
      lang: lang === 'en' ? 'fr' as const : 'en' as const,
      href: new URL(`/${lang === 'en' ? 'fr' : 'en'}${alternatePath}`, site).href
    }
  };
}

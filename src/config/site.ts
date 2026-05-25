export const SITE_NAME = 'Repero AI';
export const SITE_URL = 'https://repero.ai';
export const DEFAULT_OG_IMAGE = '/og-default.svg';

export function absoluteUrl(path: string, baseUrl: string = SITE_URL) {
  return new URL(path, baseUrl).href;
}

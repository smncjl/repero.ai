export const SITE_NAME = 'Repero AI';
export const SITE_URL = 'https://repero.ai';
export const DEFAULT_OG_IMAGE = '/og-default.svg';

function stripTrailingSlash(value: string) {
  if (value === '/') {
    return value;
  }

  return value.replace(/\/+$/, '');
}

export function absoluteUrl(path: string, baseUrl: string = SITE_URL) {
  const url = new URL(path, baseUrl);
  url.pathname = stripTrailingSlash(url.pathname) || '/';
  return url.href;
}

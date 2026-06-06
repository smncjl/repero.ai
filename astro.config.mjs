import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: process.env.SITE_URL || 'https://repero.ai',
  trailingSlash: 'never',
  build: {
    format: 'file'
  },
  integrations: [tailwind()],
  output: 'static',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'fr', 'de', 'it', 'es', 'nl']
  }
});

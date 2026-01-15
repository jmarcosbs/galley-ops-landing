import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const SITE_URL = (process.env.PUBLIC_SITE_URL ?? 'https://example.galleyops.com').replace(/\/$/, '');

export default defineConfig({
  srcDir: './src',
  site: SITE_URL,
  compressHTML: true,
  integrations: [sitemap()],
});

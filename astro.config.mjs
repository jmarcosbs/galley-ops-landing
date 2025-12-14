import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const SITE_URL = (process.env.PUBLIC_SITE_URL ?? 'https://restaurantemarinheiros.com.br').replace(/\/$/, '');

export default defineConfig({
  srcDir: './src',
  site: SITE_URL,
  compressHTML: true,
  integrations: [sitemap()],
});

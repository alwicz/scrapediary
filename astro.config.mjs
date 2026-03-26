// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://alwicz.github.io',
  base: '/scrapediary/',
  output: 'static',
  integrations: [sitemap()],
});

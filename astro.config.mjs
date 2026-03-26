// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { rehypeBaseUrl } from './plugins/rehype-base-url.mjs';

export default defineConfig({
  site: 'https://alwicz.github.io',
  base: '/scrapediary/',
  output: 'static',
  integrations: [sitemap()],
  markdown: {
    rehypePlugins: [[rehypeBaseUrl, { base: '/scrapediary/' }]],
  },
});

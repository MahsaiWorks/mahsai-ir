import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://mahsai.ir',
  output: 'static',
  integrations: [sitemap()],
});

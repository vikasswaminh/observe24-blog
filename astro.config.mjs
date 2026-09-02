import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Static output for Cloudflare Pages.
// No SSR adapter — everything is pre-rendered to HTML/CSS/JS and served
// from the CDN edge.
//
// Sitemap: emits /sitemap-index.xml at the site root, declared in robots.txt.
// Submitted to Google Search Console. Drafts/templates are filtered out so
// they don't get crawled or indexed.
export default defineConfig({
  site: 'https://24observe.com',
  output: 'static',
  build: {
    format: 'directory',
    assets: '_assets',
  },
  server: {
    host: '0.0.0.0',
    port: 4321,
  },
  trailingSlash: 'ignore',
  compressHTML: true,
  integrations: [
    sitemap({
      // Drop draft / template pages so they never hit Google's index.
      filter: (page) => !page.includes('/blog/blog-template'),
      // Global defaults — Google largely ignores priority/changefreq anyway
      // (they re-derive from crawl signals), but we set sane values so the
      // sitemap validates clean.
      changefreq: 'weekly',
      priority: 0.7,
    }),
  ],
});

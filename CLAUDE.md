# Working on this site

You are helping a **non-technical writer** publish blog posts for **24observe.com**.
This folder (`/root/site`) IS the live marketing site.

## Rule #1 — never run git, npm, pnpm, build, or deploy commands

Just create and edit files, and save them. That is the whole job.
Saving is enough: this box auto-commits and the site rebuilds and goes **live by itself**
about 60-90 seconds after the last save. There is no preview and no approval step —
**what you save gets published.**

## Rule #2 — this repo ships its own writing manual. Read it first.

Before writing, read **`BLOG_CHEAT_SHEET.md`** and **`BLOG_WRITER_WORKFLOW.md`** in the
repo root. Before finishing, check the post against **`BLOG_SEO_CHECKLIST.md`** and
**`BLOG_SCORING_RUBRIC.md`**. Also available: `BLOG_KEYWORD_RESEARCH.md`,
`BLOG_TOPICAL_STRATEGY.md`, `BLOG_DESIGN_GUIDE.md`, `BLOG_SCHEMA_IMPLEMENTATION.md`.
These are binding house style — follow them over your own instincts.

## Adding a blog post = ONE file

Create `src/pages/blog/<slug>.astro`. The **filename is the URL** —
`src/pages/blog/my-post.astro` becomes `24observe.com/blog/my-post/`.

**Start by copying `src/pages/blog/blog-template-seo.astro`** (the SEO-complete template),
or copy a real published post such as `src/pages/blog/uptimerobot-alternative.astro`.
Do not write the file from scratch — the template carries the schema/meta wiring.

Then fill in the **`ARTICLE_META`** block at the top: `title`, `author`, `date`,
`readTime`, `category`, `description` (meta description, ~155 chars max, include the
keyword naturally), plus the keyword fields the template asks for.

**There is nothing else to register.** No index file, no manifest. The sitemap is
generated automatically by `@astrojs/sitemap` at build time — do not hand-edit a sitemap.

## If the post doesn't appear

The site is built by Astro before deploy. If the `.astro` file has a syntax error the
**build fails and the post never publishes** — the existing live site is unaffected, so
nothing looks broken; your post is just missing. Copying a working template and changing
only the content and `ARTICLE_META` avoids this.

## Do not touch

`astro.config.mjs`, `package.json`, `pnpm-lock.yaml`, `eslint.config.js`, `tsconfig.json`,
`src/components/`, `src/layouts/`, `src/data/`, `scripts/`, and every page outside
`src/pages/blog/` — that is site infrastructure and product marketing copy, not blog
content. If a request seems to need changes there, tell the writer to ask the infra team.

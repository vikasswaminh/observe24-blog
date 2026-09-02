# 24observe.com — marketing site

The public site at **https://24observe.com**. Astro, static output, deployed to Cloudflare Pages.

This repo contains only the website. It has no product source, no database, no credentials.

## Run it locally

```sh
pnpm install
pnpm dev        # http://localhost:4321
```

You need Node 22 (see `.nvmrc`) and pnpm 9.

## Ship a change

1. Branch off `main`.
2. Make the change, check it locally with `pnpm dev`.
3. `pnpm build` — this must pass. It is the deploy gate.
4. Open a PR. Cloudflare builds a **preview URL** for the branch; check your change there.
5. Merge to `main` → Cloudflare builds and deploys to production automatically. No manual step.

There is no GitHub Actions CI here. The Cloudflare Pages build is the gate: if `pnpm build` fails, the deploy fails and nothing ships.

## Commands

| | |
|---|---|
| `pnpm dev` | local dev server |
| `pnpm build` | production build → `dist/` (**must pass to deploy**) |
| `pnpm preview` | serve the built `dist/` locally |
| `pnpm typecheck` | `astro check` — types + unused-import errors across `.astro` |
| `pnpm lint` | eslint over `src/**/*.ts` (see caveat below) |

`pnpm lint` only covers the `.ts` files — there is no Astro eslint parser, so the `.astro` pages are not linted. `pnpm typecheck` is what actually covers them. Inherited from the monorepo on extraction; worth fixing.

## Layout

```
src/
  pages/        every URL is a file here — 85 of them
    blog/       blog posts + the two templates
    compare/    competitor comparisons
    docs/       product documentation
    product/    per-feature pages
    solutions/  per-audience pages
    legal/
  layouts/
    Base.astro  THE shared <head> — title, description, canonical, OG, JSON-LD
  components/   Faq, Footer, IntegrationGrid, LogoMarquee, PageSchema, StatusPill, TopBar
  data/
    integrations.ts   the integrations catalog (see "Kept in sync by hand" below)
  icons/logos/  vendor SVGs (monochrome, fill=currentColor)
  styles/       tokens.css, components.css
public/         static assets served as-is — robots.txt, _headers, _redirects, fonts, screenshots
```

## SEO — read before touching page meta

`Base.astro` is the single source for `<head>`. It emits title, description, canonical, OG/Twitter
cards, and JSON-LD (Organization + WebSite + an auto `BreadcrumbList` on every non-home page).
**Do not hand-roll these in a page.**

Rules the money pages are currently held to (all 33 verified passing):

- **Title 30–60 chars**, keyword first. Over 60 and Google rewrites it — at 70+, essentially always.
- **Description 140–160 chars.** Not a ranking factor; this is a click-through play.
- **Exactly one `<h1>` per page.** The final call-to-action band uses `<h2 class="h1">` — the class
  carries the styling. Copying an `<h1>` into it is the mistake that's been made before.
- If a title contains a number, **put the same number in the `<h1>`**. Numbers survive Google's
  rewriting 97% of the time when they appear in both, 26% when only in the title.
- No square brackets in titles (rewritten ~78% of the time).

Set `noindex` on a page that shouldn't be indexed: `<Base title="..." noindex>`.

## Writing a blog post — known to be painful

Today a post is a hand-written `.astro` file: copy `src/pages/blog/blog-template.astro`, edit the
`ARTICLE_META` object, hand-maintain the `TOC` array so its ids match the `<section id>` attributes,
and write the prose as markup. Each post carries its own copy of ~400 lines of CSS.

This is a known problem and is being fixed — the plan is markdown via Astro content collections,
one renderer, a real `/blog` index. Until then, copy the template and follow the `BLOG_*.md`
playbooks in this directory.

Note there is currently **no `/blog` index page**; posts are reachable only by direct link.

## Kept in sync by hand

`src/data/integrations.ts` is vendored from the product repo's `@observe24/integrations` package,
which the in-product dashboard catalog still uses. **Adding a vendor or flipping a status means
editing both.** It's ~100 lines of public copy and changes rarely.

Note also that `status: 'webhook'` vs `'native'` and the `verified` badge are honesty claims that
must match what the product actually does — the file's own comments explain the rules. Don't
promote a vendor to `native` or `verified` to make the page look better.

## Deploy

Cloudflare Pages, project `observe24`, production branch `main`. Merging to `main` is the deploy.

For the emergency manual path (needs a Cloudflare token, normally unnecessary):

```sh
pnpm build
npx wrangler pages deploy dist --project-name=observe24 --branch=main --commit-dirty=true
```

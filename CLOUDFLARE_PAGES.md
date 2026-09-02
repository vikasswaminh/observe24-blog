# Cloudflare Pages — 24Observe marketing site

The site lives at **https://observe24.pages.dev** (free CF subdomain) and deploys
via `wrangler pages deploy`. Manual control, no Git integration, no surprise PRs
auto-shipping to production.

---

## One-time setup

1. **Create a scoped API token** at https://dash.cloudflare.com/profile/api-tokens
   - **Create Custom Token** → permissions: `Account → Cloudflare Pages → Edit`
   - Account resources: include your account
   - TTL: optional but recommended (e.g. 90 days, then rotate)
2. **Grab your Account ID** — right sidebar of any page on dash.cloudflare.com
3. **Save creds locally** (gitignored):
   ```bash
   cp apps/web/.env.local.example apps/web/.env.local
   # edit with your real values
   chmod 600 apps/web/.env.local
   ```

That's it — never paste the token again.

---

## Deploy

```bash
# from repo root
pnpm --filter @observe24/web deploy

# or from inside apps/web
cd apps/web && pnpm deploy
```

What it does:
1. Sources `.env.local` for the CF token + account ID
2. Verifies the token (fails fast if revoked)
3. Builds the static site (`astro build` → `dist/`)
4. Uploads via `wrangler pages deploy` to the `observe24` project, branch=`main`

Deploy time: ~30 seconds end-to-end.

### Preview deploy on a branch

```bash
pnpm --filter @observe24/web deploy:preview
```

Or with a specific branch name:

```bash
cd apps/web && pnpm exec sh scripts/deploy.sh feature-branch-name
```

CF gives each preview a unique `<hash>.observe24.pages.dev` URL.

---

## Live URLs

| URL | Notes |
|---|---|
| https://observe24.pages.dev | Production alias — always points at the latest `main` deploy |
| https://`<hash>`.observe24.pages.dev | Immutable per-deploy URL, kept forever for rollback |

Custom domain (when ready): dashboard → observe24 project → **Custom domains** →
add `24observe.com` and `www.24observe.com`. Free, auto-cert, you just point DNS.

---

## What the build produces

```
apps/web/dist/
  index.html               37 KB     ← landing
  pricing/index.html       11 KB
  features/index.html      13 KB
  security/index.html      10 KB
  self-host/index.html     10 KB
  docs/index.html          10 KB
  changelog/index.html     11 KB
  about/index.html          8 KB
  _assets/                 24 KB     ← compiled CSS, hashed for cache-forever
  _headers                            ← edge headers (HSTS, asset cache, CSP-ish)
  _redirects                          ← /sign-in, /sign-up, /app/* → app.24observe.com
  favicon.svg
  robots.txt
```

Total ~196 KB. No framework JS shipped to the browser; the dashboard hero animation
is a single ~80-line vanilla-JS island.

---

## Rollback

CF Pages keeps every deploy. Two ways to roll back:

1. **Dashboard** → observe24 project → **Deployments** → pick a previous one →
   "Rollback to this deployment". Instant.
2. **CLI** — re-deploy from a previous git SHA:
   ```bash
   git checkout <sha>
   cd apps/web && pnpm deploy
   git checkout main
   ```

---

## Token hygiene

- Tokens go in `.env.local` (gitignored), never in `.env` (also gitignored but
  shared by other tooling), never in commits, never in chat tools
- Rotate every ~90 days, or set a TTL when creating the token and let CF expire it
- Revoke immediately if leaked: dashboard → API Tokens → **Roll** or **Delete**

---

## Switching to Git integration later

If/when you want every push to `main` to auto-deploy without running a command:

1. CF dashboard → observe24 project → **Settings** → **Builds & deployments** →
   **Connect to Git** → pick `vikasswaminh/observe24`
2. Build command: `corepack enable && pnpm install --frozen-lockfile && pnpm --filter @observe24/web build`
3. Output dir: `apps/web/dist`
4. Env: `NODE_VERSION=22`, `PNPM_VERSION=9.15.9`

After that, `pnpm deploy` becomes a fallback for emergencies. Both paths can
coexist; the most recent deploy wins.

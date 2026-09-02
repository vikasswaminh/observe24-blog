#!/usr/bin/env sh
# Deploy 24observe marketing site to Cloudflare Pages.
#
# Usage:
#   pnpm --filter @observe24/web deploy                # production (branch=main)
#   pnpm --filter @observe24/web deploy preview        # preview deploy on a branch
#
# Requires:
#   CLOUDFLARE_API_TOKEN     — scoped to "Cloudflare Pages: Edit"
#   CLOUDFLARE_ACCOUNT_ID
#
# Source these from .env.local (gitignored), 1Password, or your shell init.
# DO NOT paste them into chat tools or commit them.

set -eu

PROJECT="observe24"
BRANCH="${1:-main}"

# Source local env if present
if [ -f .env.local ]; then
  # shellcheck disable=SC1091
  set -a; . ./.env.local; set +a
fi

if [ -z "${CLOUDFLARE_API_TOKEN:-}" ] || [ -z "${CLOUDFLARE_ACCOUNT_ID:-}" ]; then
  echo "ERROR: CLOUDFLARE_API_TOKEN and CLOUDFLARE_ACCOUNT_ID must be set." >&2
  echo "       Source from .env.local (in this dir) or your shell." >&2
  exit 1
fi

# Verify token before doing any work — fail fast with a clear error.
# Uses Node's built-in fetch so we don't depend on curl being installed.
echo "→ verifying token"
node --no-warnings -e "
const url = 'https://api.cloudflare.com/client/v4/accounts/' + process.env.CLOUDFLARE_ACCOUNT_ID + '/tokens/verify';
fetch(url, { headers: { Authorization: 'Bearer ' + process.env.CLOUDFLARE_API_TOKEN } })
  .then(r => r.json())
  .then(j => {
    if (!j.success) {
      console.error('  token verify failed:', JSON.stringify(j.errors));
      process.exit(1);
    }
    console.log('  ok (token id ' + j.result.id + ')');
  })
  .catch(e => { console.error('  verify request failed:', e.message); process.exit(1); });
"

echo "→ building"
pnpm build

echo "→ deploying $PROJECT (branch=$BRANCH)"
npx wrangler@latest pages deploy dist \
  --project-name="$PROJECT" \
  --branch="$BRANCH" \
  --commit-dirty=true

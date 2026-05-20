#!/usr/bin/env bash
# Production build with optional site gate (.env.production or .env).
# Usage on the server:
#   cd /var/www/patellawva
#   echo 'VITE_SITE_PASSWORD=your-passphrase' > .env.production
#   bash scripts/deploy-build.sh

set -euo pipefail
cd "$(dirname "$0")/.."

if [ -f .env.production ]; then
  set -a
  # shellcheck disable=SC1091
  source .env.production
  set +a
elif [ -f .env ]; then
  set -a
  # shellcheck disable=SC1091
  source .env
  set +a
fi

if [ -z "${VITE_SITE_PASSWORD:-}" ]; then
  echo "[deploy-build] WARNING: VITE_SITE_PASSWORD is empty — site will be public (no passphrase gate)."
else
  echo "[deploy-build] Site gate enabled (passphrase set)."
fi

npm install
npm run build
echo "[deploy-build] Done. Serve the dist/ folder (reload nginx if needed)."

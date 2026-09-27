#!/usr/bin/env bash
# Idempotent bootstrap for the jhony.dev Cloud Agent environment.
# Runs after the repository is checked out. Safe to run repeatedly.
set -euo pipefail

repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$repo_root"

# Use the package manager pinned in package.json ("packageManager") so the
# environment matches local development exactly.
corepack enable
corepack install

# Install dependencies exactly as locked. Native deps (esbuild, sharp) build
# against the active Node runtime, which satisfies the ">=22.12" engines range.
corepack pnpm install --frozen-lockfile

# Astro resolves the Sanity connection at config load (see astro.config.mjs).
# Values come from the environment. Never write them into the script.
if [ ! -f .env ]; then
  if [ -z "${SANITY_PROJECT_ID:-}" ] || [ -z "${SANITY_DATASET:-}" ]; then
    echo "cloud-agent-install: SANITY_PROJECT_ID and SANITY_DATASET must be set in the environment" >&2
    exit 1
  fi
  umask 077
  cat > .env <<EOF
SANITY_PROJECT_ID=${SANITY_PROJECT_ID}
SANITY_DATASET=${SANITY_DATASET}
EOF
  echo "cloud-agent-install: wrote .env from the environment"
else
  echo "cloud-agent-install: .env already present, leaving it untouched"
fi

echo "cloud-agent-install: done (node $(node -v), pnpm $(corepack pnpm -v))"

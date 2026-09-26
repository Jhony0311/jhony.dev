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

# Astro resolves the Sanity connection at config load (see astro.config.mjs),
# so dev/build need these present. They are public, non-secret identifiers
# (the same values are committed in sanity.config.ts), not credentials.
if [ ! -f .env ]; then
  cat > .env <<'EOF'
SANITY_PROJECT_ID=y08cu22h
SANITY_DATASET=production
EOF
  echo "cloud-agent-install: wrote .env with public Sanity project/dataset"
else
  echo "cloud-agent-install: .env already present, leaving it untouched"
fi

echo "cloud-agent-install: done (node $(node -v), pnpm $(corepack pnpm -v))"

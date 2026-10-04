#!/usr/bin/env bash
# Idempotent bootstrap for the jhony.dev Cloud Agent environment.
# Runs after the repository is checked out. Safe to run repeatedly.
set -euo pipefail

repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$repo_root"

# package.json#packageManager is the version pin. The executable is the standalone
# pnpm binary. Corepack skips pnpm's install script, so its shim never gets
# that binary and then shadows PNPM_HOME after nvm use.
corepack disable pnpm || true

case "$(uname -s)" in
  Darwin) default_pnpm_home="$HOME/Library/pnpm" ;;
  *) default_pnpm_home="$HOME/.local/share/pnpm" ;;
esac
export PNPM_HOME="${PNPM_HOME:-$default_pnpm_home}"
export PATH="$PNPM_HOME/bin:$PATH"

package_manager="$(node -p "require('./package.json').packageManager")"
case "$package_manager" in
  pnpm@*) ;;
  *)
    echo "cloud-agent-install: packageManager must be pnpm, got ${package_manager}" >&2
    exit 1
    ;;
esac
pnpm_version="${package_manager#pnpm@}"
pnpm_version="${pnpm_version%%+*}"

if [[ ! -x "$PNPM_HOME/bin/pnpm" ]] || [[ "$("$PNPM_HOME/bin/pnpm" --version)" != "$pnpm_version" ]]; then
  curl -fsSL https://get.pnpm.io/install.sh | env PNPM_VERSION="$pnpm_version" sh -
  export PATH="$PNPM_HOME/bin:$PATH"
fi

# Install dependencies exactly as locked. Native deps (esbuild, sharp) build
# against the active Node runtime, which satisfies the ">=22.12" engines range.
"$PNPM_HOME/bin/pnpm" install --frozen-lockfile

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

echo "cloud-agent-install: done (node $(node -v), pnpm $("$PNPM_HOME/bin/pnpm" --version))"

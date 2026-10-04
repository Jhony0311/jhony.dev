#!/usr/bin/env bash
set -euo pipefail

project_id="${SANITY_PROJECT_ID_VAR:-${SANITY_PROJECT_ID_SECRET:-${SANITY_STUDIO_PROJECT_ID_VAR:-${SANITY_STUDIO_PROJECT_ID_SECRET:-}}}}"
dataset="${SANITY_DATASET_VAR:-${SANITY_DATASET_SECRET:-${SANITY_STUDIO_DATASET_VAR:-${SANITY_STUDIO_DATASET_SECRET:-}}}}"

if [ -z "$project_id" ] || [ -z "$dataset" ]; then
  echo "The selected GitHub environment must provide a Sanity project id and dataset." >&2
  echo "Project id: SANITY_PROJECT_ID or SANITY_STUDIO_PROJECT_ID." >&2
  echo "Dataset: SANITY_DATASET or SANITY_STUDIO_DATASET." >&2
  exit 1
fi

echo "::add-mask::$project_id"

umask 077
cat > .env <<EOF
SANITY_PROJECT_ID=${project_id}
SANITY_DATASET=${dataset}
SANITY_STUDIO_PROJECT_ID=${project_id}
SANITY_STUDIO_DATASET=${dataset}
EOF

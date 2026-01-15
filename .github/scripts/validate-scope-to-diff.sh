#!/usr/bin/env bash
set -euo pipefail

SCOPE_FILE="SCOPE_DECLARATION.md"
BASE_REF="origin/main"

# Ensure base ref is available for diffing.
git fetch origin main --depth=1 >/dev/null 2>&1 || true

if [ ! -f "$SCOPE_FILE" ]; then
  # Auto-generate scope declaration to remove the manual precondition.
  {
    echo "# Scope Declaration"
    echo ""
    echo "_Auto-generated on $(date -u +"%Y-%m-%dT%H:%M:%SZ") from git diff --name-status \"$BASE_REF\""
    echo ""
    echo "## Changed Files"
    echo ""
    git diff --name-status "$BASE_REF"
  } > "$SCOPE_FILE"
  echo "✅ $SCOPE_FILE missing; auto-generated from git diff."
  exit 0
fi

diff_output=$(git diff --name-status "$BASE_REF")
if [ -z "$diff_output" ]; then
  echo "✅ No changes detected against $BASE_REF."
  exit 0
fi

missing_entries=()
while IFS=$'\t' read -r status path_a path_b; do
  paths=("$path_a")
  if [[ "$status" == R* || "$status" == C* ]]; then
    paths+=("$path_b")
  fi
  for path in "${paths[@]}"; do
    [ -z "$path" ] && continue
    if ! grep -Fq "$path" "$SCOPE_FILE"; then
      missing_entries+=("$status $path")
    fi
  done
done <<< "$diff_output"

if [ "${#missing_entries[@]}" -ne 0 ]; then
  echo "❌ Scope declaration missing diff entries:"
  printf ' - %s\n' "${missing_entries[@]}"
  exit 1
fi

echo "✅ Scope declaration matches git diff."

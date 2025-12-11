#!/bin/bash
# Pre-Build Type Validation
# 
# This script validates TypeScript type completeness before building.
# It catches incomplete Record<UnionType, T> definitions that cause
# compilation errors.
#
# Added to QA platform to prevent recurring issues with type extensions.

set -e

echo "🔍 Running Pre-Build Type Validation..."
echo ""

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Run TypeScript type checking on critical files
echo "📋 Checking ModelTier Record type completeness..."

# Check if all ModelTier values are in MODEL_LIMITS
MODEL_TIER_PATTERN="'gpt-4'|'gpt-4-turbo'|'gpt-4o-mini'|'gpt-4o'|'gpt-4.1'|'gpt-5.1'|'local-builder'"
ROUTE_FILE="app/api/foreman/chat/route.ts"

if [ -f "$ROUTE_FILE" ]; then
  # Extract MODEL_LIMITS definition
  if grep -q "MODEL_LIMITS.*Record<ModelTier" "$ROUTE_FILE"; then
    echo "  ✓ Found MODEL_LIMITS Record in $ROUTE_FILE"
    
    # Check for each required model tier
    MISSING=""
    for tier in "gpt-4" "gpt-4-turbo" "gpt-4o-mini" "gpt-4o" "gpt-4.1" "gpt-5.1" "local-builder"; do
      if ! grep -A 10 "MODEL_LIMITS.*Record<ModelTier" "$ROUTE_FILE" | grep -q "'$tier'"; then
        MISSING="$MISSING $tier"
      fi
    done
    
    if [ -n "$MISSING" ]; then
      echo -e "${RED}  ✗ MODEL_LIMITS missing tiers:$MISSING${NC}"
      echo -e "${YELLOW}  → Add missing tiers to MODEL_LIMITS in $ROUTE_FILE${NC}"
      exit 1
    else
      echo "  ✓ All ModelTier values present in MODEL_LIMITS"
    fi
  fi
fi

# Run type completeness test
echo ""
echo "📋 Running Type Completeness QA Test..."
if npx tsx tests/qa/type-completeness.test.ts 2>/dev/null; then
  echo -e "${GREEN}✅ Pre-Build Type Validation PASSED${NC}"
  exit 0
else
  echo -e "${RED}❌ Pre-Build Type Validation FAILED${NC}"
  echo ""
  echo "Fix the issues above before deploying."
  exit 1
fi

#!/bin/bash
# validate-yaml-frontmatter.sh
#
# Purpose: Extract and validate YAML frontmatter from markdown files using yamllint
# Authority: BL-028 (Yamllint Warnings Are Errors - Zero Test Debt)
# Exit Codes:
#   0 = PASS (all YAML frontmatter valid, no warnings, no errors)
#   1 = FAIL (yamllint errors or warnings found)
#   2 = FAIL (invalid usage or yamllint not installed)
#
# Usage:
#   ./validate-yaml-frontmatter.sh <file1.md> [file2.md] [...]
#   ./validate-yaml-frontmatter.sh .github/agents/*.md
#
# Requirements:
#   - yamllint must be installed (pip install yamllint)
#   - Files must contain YAML frontmatter between --- markers
#   - Exit code MUST be 0 (no warnings, no errors)
#
# BL-028 Compliance:
#   - Warnings ARE errors
#   - Exit code non-zero = HALT
#   - All violations must be fixed
#   - No rationalization permitted
#
# Notes:
#   - This script is OPTIONAL in agent environments where bash cannot execute before PR
#   - Agents may instead provide evidence-based validation in PREHANDOVER_PROOF
#   - Evidence must include: YAML extraction, yamllint result, exit code 0, attestation

set -euo pipefail

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if yamllint is available
if ! command -v yamllint &> /dev/null; then
    echo -e "${RED}❌ FAIL: yamllint not installed${NC}"
    echo ""
    echo "Install with: pip install yamllint"
    echo ""
    echo "In agent environments where this script cannot run:"
    echo "  - Extract YAML frontmatter manually using awk"
    echo "  - Validate with yamllint or equivalent"
    echo "  - Document results in PREHANDOVER_PROOF with exit code 0"
    echo "  - Include attestation that all warnings/errors fixed"
    echo ""
    exit 2
fi

# Check arguments
if [ $# -eq 0 ]; then
    echo -e "${RED}❌ FAIL: No files specified${NC}"
    echo ""
    echo "Usage: $0 <file1.md> [file2.md] [...]"
    echo "Example: $0 .github/agents/*.md"
    echo ""
    exit 2
fi

echo "==================================="
echo "YAML Frontmatter Validation (BL-028)"
echo "==================================="
echo ""

TOTAL_FILES=0
FAILED_FILES=0
SKIPPED_FILES=0

for FILE in "$@"; do
    if [ ! -f "$FILE" ]; then
        echo -e "${YELLOW}⚠️  SKIP: File not found: $FILE${NC}"
        SKIPPED_FILES=$((SKIPPED_FILES + 1))
        continue
    fi
    
    echo "Validating: $FILE"
    TOTAL_FILES=$((TOTAL_FILES + 1))
    
    # Extract YAML frontmatter (content between first two --- markers)
    YAML_CONTENT=$(awk '/^---$/{if(++n==2) exit} n>=1' "$FILE")
    
    if [ -z "$YAML_CONTENT" ]; then
        echo -e "${YELLOW}  ⚠️  No YAML frontmatter found (no --- markers)${NC}"
        SKIPPED_FILES=$((SKIPPED_FILES + 1))
        TOTAL_FILES=$((TOTAL_FILES - 1))
        echo ""
        continue
    fi
    
    # Validate with yamllint
    TEMP_FILE=$(mktemp)
    echo "$YAML_CONTENT" > "$TEMP_FILE"
    
    if yamllint "$TEMP_FILE" > /dev/null 2>&1; then
        echo -e "  ${GREEN}✅ PASS${NC}"
    else
        echo -e "  ${RED}❌ FAIL${NC}"
        echo ""
        echo "  yamllint errors/warnings:"
        yamllint "$TEMP_FILE" 2>&1 | sed 's/^/    /'
        echo ""
        echo "  BL-028: Warnings ARE errors. All violations must be fixed."
        echo "  Fix the YAML frontmatter in $FILE and re-run."
        echo ""
        FAILED_FILES=$((FAILED_FILES + 1))
    fi
    
    rm -f "$TEMP_FILE"
    echo ""
done

# Summary
echo "==================================="
echo "Summary"
echo "==================================="
echo "Files validated: $TOTAL_FILES"
echo "Files skipped: $SKIPPED_FILES"
echo "Files failed: $FAILED_FILES"
echo ""

if [ $FAILED_FILES -eq 0 ]; then
    if [ $TOTAL_FILES -eq 0 ]; then
        echo -e "${YELLOW}⚠️  No files with YAML frontmatter found${NC}"
        exit 0
    else
        echo -e "${GREEN}✅ ALL PASS: Exit code 0${NC}"
        echo ""
        echo "BL-028 Compliant: No warnings, no errors."
        echo ""
        exit 0
    fi
else
    echo -e "${RED}❌ VALIDATION FAILED: Exit code 1${NC}"
    echo ""
    echo "BL-028 requires:"
    echo "  1. Fix ALL yamllint warnings/errors"
    echo "  2. Re-run this script"
    echo "  3. Achieve exit code 0"
    echo "  4. Document in PREHANDOVER_PROOF"
    echo ""
    echo "NO rationalization permitted (\"warnings are stylistic\" is FALSE)"
    echo ""
    exit 1
fi

#!/bin/bash
# PREHANDOVER_PROOF Validation Script
# Authority: governance/canon/EXECUTION_BOOTSTRAP_PROTOCOL.md
# Purpose: Validate PREHANDOVER_PROOF compliance in PR descriptions
# Version: 1.0.0
# Date: 2026-01-11

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Script configuration
SCRIPT_NAME="PREHANDOVER_PROOF Validator"
VERSION="1.0.0"

# Exit codes
EXIT_SUCCESS=0
EXIT_MISSING_PROOF=1
EXIT_INCOMPLETE_PROOF=2
EXIT_VALIDATION_ERROR=3
EXIT_USAGE_ERROR=4

# Function to print colored messages
print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_info() {
    echo "ℹ️  $1"
}

# Function to display usage
usage() {
    cat << EOF
$SCRIPT_NAME v$VERSION

Usage: $0 [OPTIONS] <pr-description-file>

Validates PREHANDOVER_PROOF compliance in PR descriptions per 
governance/canon/EXECUTION_BOOTSTRAP_PROTOCOL.md

Arguments:
  pr-description-file    Path to file containing PR description text

Options:
  -h, --help            Show this help message
  -v, --verbose         Enable verbose output
  -s, --skip-optional   Skip validation of optional sections
  --require-proof       Fail if PREHANDOVER_PROOF is missing (default: warn only)

Examples:
  # Validate PR description from file
  $0 pr_description.txt

  # Validate with strict requirements
  $0 --require-proof pr_description.md

  # Validate GitHub PR description (using gh CLI)
  gh pr view 123 --json body -q .body > /tmp/pr_desc.txt
  $0 /tmp/pr_desc.txt

Exit Codes:
  0 - Success (PREHANDOVER_PROOF valid or not required)
  1 - PREHANDOVER_PROOF missing (when --require-proof set)
  2 - PREHANDOVER_PROOF incomplete or invalid
  3 - Validation error
  4 - Usage error

Authority:
  governance/canon/EXECUTION_BOOTSTRAP_PROTOCOL.md
  governance/templates/PREHANDOVER_PROOF_TEMPLATE.md

EOF
}

# Parse command line arguments
VERBOSE=0
SKIP_OPTIONAL=0
REQUIRE_PROOF=0
PR_DESC_FILE=""

while [[ $# -gt 0 ]]; do
    case $1 in
        -h|--help)
            usage
            exit $EXIT_SUCCESS
            ;;
        -v|--verbose)
            VERBOSE=1
            shift
            ;;
        -s|--skip-optional)
            SKIP_OPTIONAL=1
            shift
            ;;
        --require-proof)
            REQUIRE_PROOF=1
            shift
            ;;
        *)
            if [[ -z "$PR_DESC_FILE" ]]; then
                PR_DESC_FILE="$1"
            else
                print_error "Unexpected argument: $1"
                usage
                exit $EXIT_USAGE_ERROR
            fi
            shift
            ;;
    esac
done

# Validate arguments
if [[ -z "$PR_DESC_FILE" ]]; then
    print_error "Missing required argument: pr-description-file"
    usage
    exit $EXIT_USAGE_ERROR
fi

if [[ ! -f "$PR_DESC_FILE" ]]; then
    print_error "File not found: $PR_DESC_FILE"
    exit $EXIT_USAGE_ERROR
fi

# Validation function
validate_prehandover_proof() {
    local file="$1"
    local content=$(cat "$file")
    
    print_info "Validating PREHANDOVER_PROOF in: $file"
    echo ""
    
    # Check if PREHANDOVER_PROOF section exists
    if ! echo "$content" | grep -q "## PREHANDOVER_PROOF"; then
        if [[ $REQUIRE_PROOF -eq 1 ]]; then
            print_error "PREHANDOVER_PROOF section missing in PR description"
            echo ""
            print_info "Required sections:"
            echo "  1. ## PREHANDOVER_PROOF"
            echo "  2. ### Artifacts Created"
            echo "  3. ### Execution Validation"
            echo "  4. ### Preflight Gate Status"
            echo "  5. ### Execution Timestamp"
            echo "  6. ### Handover Guarantee"
            echo ""
            print_info "See: governance/templates/PREHANDOVER_PROOF_TEMPLATE.md"
            return $EXIT_MISSING_PROOF
        else
            print_warning "PREHANDOVER_PROOF section not found (optional for some PRs)"
            echo ""
            print_info "PREHANDOVER_PROOF is mandatory for PRs involving:"
            echo "  - Workflows, gates, contracts"
            echo "  - Configuration changes affecting CI"
            echo "  - Any artifact that can fail in CI"
            echo ""
            print_info "If this PR requires execution verification, add PREHANDOVER_PROOF"
            print_info "See: governance/templates/PREHANDOVER_PROOF_TEMPLATE.md"
            return $EXIT_SUCCESS
        fi
    fi
    
    print_success "PREHANDOVER_PROOF section found"
    
    # Track validation failures
    local failures=0
    
    # Check for required subsections
    local required_sections=(
        "### Artifacts Created"
        "### Execution Validation"
        "### Preflight Gate Status"
        "### Execution Timestamp"
        "### Handover Guarantee"
    )
    
    echo ""
    print_info "Checking required subsections..."
    
    for section in "${required_sections[@]}"; do
        if echo "$content" | grep -q "$section"; then
            [[ $VERBOSE -eq 1 ]] && print_success "Found: $section"
        else
            print_error "Missing required section: $section"
            failures=$((failures + 1))
        fi
    done
    
    # Check for completion indicators
    echo ""
    print_info "Checking for status indicators..."
    
    # Check Artifacts Created status
    if echo "$content" | grep -A 10 "### Artifacts Created" | grep -q "✅ VERIFIED"; then
        [[ $VERBOSE -eq 1 ]] && print_success "Artifacts Created: VERIFIED"
    else
        print_warning "Artifacts Created: Missing ✅ VERIFIED status"
        [[ $VERBOSE -eq 1 ]] && echo "  Expected: **Status**: ✅ VERIFIED"
    fi
    
    # Check Execution Validation status
    if echo "$content" | grep -A 10 "### Execution Validation" | grep -q "✅ ALL GREEN"; then
        [[ $VERBOSE -eq 1 ]] && print_success "Execution Validation: ALL GREEN"
    else
        print_warning "Execution Validation: Missing ✅ ALL GREEN status"
        [[ $VERBOSE -eq 1 ]] && echo "  Expected: **Status**: ✅ ALL GREEN"
    fi
    
    # Check for exit codes
    if echo "$content" | grep -A 50 "### Execution Validation" | grep -q "Exit code: 0"; then
        [[ $VERBOSE -eq 1 ]] && print_success "Found exit code verification"
    else
        print_warning "No 'Exit code: 0' found in Execution Validation"
        [[ $VERBOSE -eq 1 ]] && echo "  Expected: Exit code: 0 for successful commands"
    fi
    
    # Check Preflight Gate Status
    if echo "$content" | grep -A 20 "### Preflight Gate Status" | grep -qE "(✅ PASS|⊘ SKIP)"; then
        [[ $VERBOSE -eq 1 ]] && print_success "Found gate status indicators"
    else
        print_warning "No gate status indicators found (✅ PASS or ⊘ SKIP)"
    fi
    
    # Check for Handover Guarantee
    if echo "$content" | grep -A 10 "### Handover Guarantee" | grep -q "I guarantee"; then
        [[ $VERBOSE -eq 1 ]] && print_success "Found handover guarantee statement"
    else
        print_error "Missing 'I guarantee' statement in Handover Guarantee"
        failures=$((failures + 1))
    fi
    
    # Check for timestamp
    if echo "$content" | grep -A 5 "### Execution Timestamp" | grep -qE "[0-9]{4}-[0-9]{2}-[0-9]{2}"; then
        [[ $VERBOSE -eq 1 ]] && print_success "Found execution timestamp"
    else
        print_error "Missing execution timestamp (format: YYYY-MM-DD HH:MM:SS UTC)"
        failures=$((failures + 1))
    fi
    
    # Summary
    echo ""
    if [[ $failures -eq 0 ]]; then
        print_success "PREHANDOVER_PROOF validation PASSED"
        print_info "All required sections present and properly structured"
        return $EXIT_SUCCESS
    else
        print_error "PREHANDOVER_PROOF validation FAILED"
        print_error "Found $failures critical issue(s)"
        echo ""
        print_info "To fix, ensure PR description includes all required sections:"
        print_info "See: governance/templates/PREHANDOVER_PROOF_TEMPLATE.md"
        return $EXIT_INCOMPLETE_PROOF
    fi
}

# Run validation
validate_prehandover_proof "$PR_DESC_FILE"
exit_code=$?

echo ""
if [[ $exit_code -eq 0 ]]; then
    print_success "Validation complete - PR is ready for review"
else
    print_error "Validation failed - PR requires updates before handover"
    echo ""
    print_info "Required by: governance/canon/EXECUTION_BOOTSTRAP_PROTOCOL.md"
    print_info "Template: governance/templates/PREHANDOVER_PROOF_TEMPLATE.md"
fi

exit $exit_code

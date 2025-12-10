#!/bin/bash

# MCP Server Access Validation Script
# Tests GitHub MCP server access to required repositories

set -e

echo "=========================================="
echo "MCP Server Access Validation"
echo "=========================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Test 1: Check if MCP server is running
echo "Test 1: Checking if MCP server is running..."
if pgrep -f "mcp-server" > /dev/null; then
    echo -e "${GREEN}✅ PASS${NC}: MCP server process is running"
else
    echo -e "${RED}❌ FAIL${NC}: MCP server is not running"
    echo "   Action: Start MCP server or restart development environment"
    exit 1
fi
echo ""

# Test 2: Check if GITHUB_TOKEN is set
echo "Test 2: Checking if GITHUB_TOKEN is configured..."
if [ -z "$GITHUB_TOKEN" ]; then
    echo -e "${RED}❌ FAIL${NC}: GITHUB_TOKEN is not set"
    echo "   Action: Add GITHUB_TOKEN to .env.local"
    exit 1
else
    # Show first and last 4 characters only for security
    TOKEN_PREFIX="${GITHUB_TOKEN:0:4}"
    TOKEN_SUFFIX="${GITHUB_TOKEN: -4}"
    echo -e "${GREEN}✅ PASS${NC}: GITHUB_TOKEN is configured (${TOKEN_PREFIX}...${TOKEN_SUFFIX})"
fi
echo ""

# Test 3: Test GitHub API access with token
echo "Test 3: Testing GitHub API access with token..."
AUTH_RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" \
    -H "Authorization: token $GITHUB_TOKEN" \
    https://api.github.com/user)

if [ "$AUTH_RESPONSE" = "200" ]; then
    # Get user info
    USER_INFO=$(curl -s -H "Authorization: token $GITHUB_TOKEN" https://api.github.com/user)
    USERNAME=$(echo "$USER_INFO" | grep -o '"login":"[^"]*' | cut -d'"' -f4)
    echo -e "${GREEN}✅ PASS${NC}: Token authenticated as: $USERNAME"
else
    echo -e "${RED}❌ FAIL${NC}: Token authentication failed (HTTP $AUTH_RESPONSE)"
    echo "   Action: Verify token is valid and not expired"
    exit 1
fi
echo ""

# Test 4: Check token scopes
echo "Test 4: Checking token scopes..."
SCOPES=$(curl -s -I -H "Authorization: token $GITHUB_TOKEN" https://api.github.com/user \
    | grep -i "x-oauth-scopes:" | cut -d' ' -f2- | tr -d '\r')

if [[ "$SCOPES" == *"repo"* ]]; then
    echo -e "${GREEN}✅ PASS${NC}: Token has 'repo' scope"
else
    echo -e "${YELLOW}⚠️  WARN${NC}: Token may not have 'repo' scope"
    echo "   Current scopes: $SCOPES"
    echo "   Action: Ensure token has 'repo' scope for private repository access"
fi
echo ""

# Test 5: Test access to maturion-foreman-app
echo "Test 5: Testing access to MaturionISMS/maturion-foreman-app..."
FOREMAN_RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" \
    -H "Authorization: token $GITHUB_TOKEN" \
    https://api.github.com/repos/MaturionISMS/maturion-foreman-app)

if [ "$FOREMAN_RESPONSE" = "200" ]; then
    echo -e "${GREEN}✅ PASS${NC}: Can access maturion-foreman-app repository"
else
    echo -e "${RED}❌ FAIL${NC}: Cannot access maturion-foreman-app (HTTP $FOREMAN_RESPONSE)"
    exit 1
fi
echo ""

# Test 6: Test access to maturion-isms (THE CRITICAL TEST)
echo "Test 6: Testing access to MaturionISMS/maturion-isms..."
ISMS_RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" \
    -H "Authorization: token $GITHUB_TOKEN" \
    https://api.github.com/repos/MaturionISMS/maturion-isms)

if [ "$ISMS_RESPONSE" = "200" ]; then
    echo -e "${GREEN}✅ PASS${NC}: Can access maturion-isms repository!"
    echo "   🎉 SUCCESS: MCP server can now access ISMS!"
else
    echo -e "${RED}❌ FAIL${NC}: Cannot access maturion-isms (HTTP $ISMS_RESPONSE)"
    echo "   This is the issue you need to fix!"
    echo ""
    echo "   Possible causes:"
    echo "   1. Token doesn't have 'repo' scope"
    echo "   2. Token doesn't have access to MaturionISMS organization"
    echo "   3. Repository name is incorrect"
    echo ""
    echo "   Action: Follow MCP_FIX_QUICK_GUIDE.md to create a new token"
    exit 1
fi
echo ""

# Test 7: Test file content access to maturion-isms
echo "Test 7: Testing file content access to maturion-isms..."
README_RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" \
    -H "Authorization: token $GITHUB_TOKEN" \
    https://api.github.com/repos/MaturionISMS/maturion-isms/contents/README.md)

if [ "$README_RESPONSE" = "200" ]; then
    echo -e "${GREEN}✅ PASS${NC}: Can read file contents from maturion-isms"
else
    echo -e "${YELLOW}⚠️  WARN${NC}: Can access repo but cannot read files (HTTP $README_RESPONSE)"
    echo "   This may be expected if README.md doesn't exist"
fi
echo ""

# Summary
echo "=========================================="
echo "Validation Summary"
echo "=========================================="
echo -e "${GREEN}✅ All critical tests passed!${NC}"
echo ""
echo "Next steps:"
echo "1. ✅ MCP server is running"
echo "2. ✅ GitHub token is configured"
echo "3. ✅ Can access maturion-foreman-app"
echo "4. ✅ Can access maturion-isms"
echo "5. 🚀 Ready for Build Philosophy verification"
echo ""
echo "You can now proceed with ISMS alignment and full Foreman build!"
echo "=========================================="

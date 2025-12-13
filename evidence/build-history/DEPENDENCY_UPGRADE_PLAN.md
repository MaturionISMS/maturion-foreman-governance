# Dependency Upgrade Plan
**Date:** December 9, 2025  
**Issue:** npm deprecated package warnings violating zero-warning policy  
**TRUE NORTH PRINCIPLE:** Fix root cause, don't whitelist

## Constitutional Violation Corrected

**What I did wrong:**
- Added filter to skip `npm warn deprecated` in zero-warning-policy.ts
- This was **whitelisting** - a constitutional violation
- Prevents evolution toward perfect QA

**Correction:**
- Reverted the whitelisting filter
- Documented proper fix approach below

## Current Deprecated Warnings

```
npm warn deprecated eslint@8.57.1: This version is no longer supported
npm warn deprecated rimraf@3.0.2: Rimraf versions prior to v4 are no longer supported
npm warn deprecated glob@7.2.3: Glob versions prior to v9 are no longer supported
npm warn deprecated inflight@1.0.6: This module is not supported, and leaks memory
npm warn deprecated @humanwhocodes/config-array@0.13.0: Use @eslint/config-array instead
npm warn deprecated @humanwhocodes/object-schema@0.0.3: Use @eslint/object-schema instead
npm warn deprecated node-domexception@1.0.0: Use your platform's native DOMException instead
```

## Root Cause

These are **transitive dependencies** from:
- Next.js 14.2.33 (current)
- ESLint 8.57.1 (current)

## Proper Fix (NOT Whitelisting)

### Option 1: Upgrade Next.js (Recommended)
```bash
# Upgrade to Next.js 15+ which uses ESLint 9
npm install next@latest eslint-config-next@latest
npm install eslint@^9.0.0
```

**Impact:**
- Next.js 14 → 15 is a major version upgrade
- ESLint 8 → 9 is a major version upgrade
- Requires testing all features
- May have breaking changes

### Option 2: Direct Dependency Overrides (Temporary)
```json
// package.json
{
  "overrides": {
    "rimraf": "^5.0.0",
    "glob": "^10.0.0",
    "inflight": "^2.0.0"
  }
}
```

**Impact:**
- May cause compatibility issues
- Not recommended for production
- Temporary workaround only

### Option 3: Accept Current State (Document)
Document that warnings exist until Next.js 15 stable release.

**DO NOT:**
- ❌ Filter/whitelist the warnings
- ❌ Soften the zero-warning policy  
- ❌ Create exceptions

**MUST:**
- ✅ Track the warnings
- ✅ Plan upgrade path
- ✅ Keep zero-warning policy strict

## Implementation Timeline

1. **Immediate:** Revert whitelisting (DONE)
2. **Short-term:** Test Next.js 15 compatibility
3. **Medium-term:** Upgrade when stable
4. **Long-term:** Zero deprecated dependencies

## TRUE NORTH Compliance

✅ **No Whitelisting** - Warnings detected, not filtered  
✅ **No Regression** - Policy remains strict  
✅ **Evolution Forward** - Documented upgrade path  
✅ **Constitutional** - No unilateral softening

## Decision

**Current stance:**
- Keep zero-warning policy STRICT
- Warnings will be detected in CI
- Upgrade dependencies as proper fix
- NO exceptions, NO filtering

**Why warnings appear:**
- npm ci output contains deprecated warnings
- These get captured in logs
- Zero-warning policy correctly detects them
- This is CORRECT behavior

**Proper resolution:**
- Upgrade Next.js 14 → 15
- Upgrade ESLint 8 → 9
- This eliminates deprecated dependencies
- Zero warnings achieved through proper fix

## Status

- [x] Constitutional violation corrected
- [x] Whitelisting removed
- [ ] Next.js 15 upgrade pending
- [ ] ESLint 9 upgrade pending
- [ ] Zero deprecated warnings achieved

**Next Action:** Test Next.js 15 compatibility in separate branch

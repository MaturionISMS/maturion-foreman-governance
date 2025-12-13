# React & ESLint Governance Architecture

## Purpose

Govern React Hook compliance and ESLint rule adherence to prevent build failures from linting errors.

## Problem Statement

**Build Failures #5 & #6**:
1. React Hook `useEffect` missing dependency `fetchAlerts`
2. ESLint rule violation: Assigning to reserved variable `module`

**Root Cause**: No architecture governing React Hook rules and ESLint compliance.

## Architecture Components

### 1. React Hook Compliance Governor

**Responsibility**: Ensure all React Hooks follow exhaustive-deps rule

**Rules**:
- All dependencies used in useEffect must be in dependency array
- Functions used in useEffect must be memoized with useCallback or included in deps
- No unstable references in dependency arrays

**Enforcement**:
- Pre-commit lint checks
- QA test validates hook compliance
- Build fails on violations

### 2. ESLint Rule Compliance Governor

**Responsibility**: Prevent usage of reserved variables and enforce Next.js rules

**Rules**:
- No assignment to reserved names: `module`, `exports`, `require`, `__dirname`, `__filename`
- Follow all Next.js-specific ESLint rules
- Zero tolerance for ESLint errors (warnings acceptable with justification)

**Enforcement**:
- Pre-commit lint checks
- QA test validates rule compliance
- Build fails on violations

## Implementation

### Files Created

1. **Architecture**: `REACT_ESLINT_GOVERNANCE_ARCHITECTURE.md`
2. **QA Test (RED)**: `tests/qa/react-eslint-validation.test.ts`
3. **Validator**: `lib/foreman/governance/react-eslint-validator.ts`

### QA Workflow

```
Architecture → RED QA → Fix Issues → GREEN QA → Deploy
```

### RED QA Test

Test validates:
- React Hook exhaustive-deps compliance
- ESLint reserved variable usage
- Next.js rule compliance

Expected: Test is RED before fixes, GREEN after fixes.

## Prevention Strategy

### Pre-Commit Checklist

1. ✅ Run ESLint: `npm run lint`
2. ✅ Check React Hooks manually
3. ✅ Avoid reserved variable names
4. ✅ Run QA test: `npx tsx tests/qa/react-eslint-validation.test.ts`
5. ✅ Fix all errors before commit

### CI/CD Integration

Add to pre-build validation:
```bash
npm run lint -- --max-warnings 0
```

## Common Violations

### 1. Missing Hook Dependencies

**Problem**:
```tsx
useEffect(() => {
  fetchData();
}, [filter]); // Missing fetchData
```

**Solution**:
```tsx
const fetchData = useCallback(async () => {
  // implementation
}, [/* dependencies */]);

useEffect(() => {
  fetchData();
}, [filter, fetchData]);
```

### 2. Reserved Variable Assignment

**Problem**:
```ts
const module = parseModule(); // 'module' is reserved
```

**Solution**:
```ts
const parsedModule = parseModule();
// or
const importedModule = parseModule();
```

## Governance Memory

This architecture was created in response to Build Failures #5 & #6, which occurred because no governance existed for React Hook and ESLint compliance.

**Lesson**: Linting rules are governance rules. Violations must be caught by architecture before deployment.

## Success Criteria

- ✅ All React Hooks comply with exhaustive-deps
- ✅ No reserved variable assignments
- ✅ ESLint passes with zero errors
- ✅ QA test transitions from RED to GREEN
- ✅ Build succeeds

## Version

**Version**: 1.0.0  
**Created**: 2025-12-11  
**Authority**: Build Philosophy Compliance  
**Status**: Active

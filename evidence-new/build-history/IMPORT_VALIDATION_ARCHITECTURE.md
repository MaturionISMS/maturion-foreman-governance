# Import Verification Architecture

**Date**: 2025-12-11  
**Component**: Import Validation System  
**Purpose**: Govern and prevent import-related build failures through architecture-first design

## Problem Statement

Four sequential build failures occurred due to incorrect imports:
1. Missing legacy model names (backward compatibility)
2. Incomplete Record types (type completeness)
3. Non-existent function `checkQICCompliance`
4. Non-existent function `detectDrift`

**Pattern**: Importing functions that don't exist in source modules.

## Architectural Solution

### Component: Import Validation Governance

**Location**: `lib/foreman/governance/import-validator.ts`

**Purpose**: Validate all imports before code is committed, ensuring functions being imported actually exist.

### Architecture Principles

1. **Preventive Architecture**: Stop import errors before they happen
2. **Automated Validation**: Check imports programmatically
3. **CI/CD Integration**: Run validation in pipeline
4. **Clear Feedback**: Identify exact missing exports

### Design

```typescript
/**
 * Import Validation Architecture
 * 
 * Validates that all imports reference actual exports
 */

interface ImportValidationResult {
  valid: boolean;
  missingExports: Array<{
    file: string;
    importedName: string;
    availableExports: string[];
  }>;
}

export async function validateImports(
  files: string[]
): Promise<ImportValidationResult>;
```

### Integration Points

1. **Pre-commit hook**: Validate before commit
2. **CI/CD pipeline**: Run in build validation
3. **Type checker**: Use TypeScript for validation
4. **QA tests**: Red-to-green testing

## QA-First Workflow

### Red QA Phase

**Test**: `tests/qa/import-validation.test.ts`

Creates failing tests that validate:
- All imported functions exist in source modules
- Import paths are correct
- Module exports match expectations

### Build to Green Phase

After Red QA fails, fix imports to make tests pass:
1. Verify actual exports in source module
2. Update import to use correct function name
3. Run tests → should turn GREEN
4. Commit

### Evidence Trail

Each fix must show:
- ❌ RED: Test failing with missing import
- ✅ GREEN: Test passing after fix
- 📋 Log: Documentation of what was fixed

## Current Status

### Missing Components (To Be Built)

1. ❌ `lib/foreman/governance/import-validator.ts` - Not yet created
2. ❌ `tests/qa/import-validation.test.ts` - Not yet created
3. ❌ Pre-commit hook for import validation - Not yet configured
4. ❌ CI/CD integration - Not yet added

### Why This Matters

**Build Philosophy Violation**: Building code without RED QA first means:
- No failing test to make pass
- No proof of building to green
- No evidence trail
- Reactive fixes instead of preventive architecture

## Remediation Plan

### Step 1: Create Import Validator Architecture

File: `lib/foreman/governance/import-validator.ts`

```typescript
/**
 * Validates that all imports in TypeScript files
 * reference actual exports in source modules
 */
export async function validateAllImports(): Promise<ImportValidationResult>;
export function findMissingExports(file: string): MissingExport[];
export function suggestCorrectImport(missingExport: MissingExport): string[];
```

### Step 2: Create RED QA Test

File: `tests/qa/import-validation.test.ts`

```typescript
describe('Import Validation', () => {
  it('should validate all imports reference existing exports', async () => {
    const result = await validateAllImports();
    expect(result.valid).toBe(true);
    expect(result.missingExports).toHaveLength(0);
  });
});
```

### Step 3: Run Test (Should Fail)

```bash
npx tsx tests/qa/import-validation.test.ts
# Expected: FAIL - missing imports detected
```

### Step 4: Fix Imports (Build to Green)

Fix all import errors, then:

```bash
npx tsx tests/qa/import-validation.test.ts
# Expected: PASS - all imports valid
```

### Step 5: Add to CI/CD

```yaml
- name: Validate Imports
  run: npm run qa:imports
```

## Lessons Learned

### Root Cause of Pattern

**Why 4 import failures occurred**:
1. No architecture governing import validation
2. No RED QA to catch import errors
3. No automated validation before commit
4. Manual checking is error-prone

### Build Philosophy Application

**What should have happened**:
1. Create import validation architecture
2. Write RED QA test (should fail)
3. Fix imports to make test GREEN
4. Document evidence trail
5. Commit with proof

**What actually happened**:
1. Wrote code with incorrect imports
2. Committed without validation
3. CI/CD caught errors (reactive)
4. Fixed each error as it appeared (reactive)
5. No architectural prevention created

### Prevention Strategy

Going forward:
1. ✅ Create import validator architecture
2. ✅ Write RED QA tests
3. ✅ Build to GREEN with evidence
4. ✅ Add to pre-commit hooks
5. ✅ Integrate with CI/CD
6. ✅ Document in governance memory

## Acceptance Criteria

- [ ] Import validator architecture created
- [ ] RED QA test written and failing
- [ ] Imports fixed (test GREEN)
- [ ] Pre-commit hook configured
- [ ] CI/CD integration added
- [ ] Evidence trail documented
- [ ] Governance memory updated

## Status

**Current**: Architecture documented but not implemented  
**Next**: Implement import validator + RED QA  
**Goal**: Prevent future import failures through architecture

---

**Note to Self**: This is Build Philosophy in action - architecture first, RED QA, build to GREEN, evidence trail. No shortcuts.

# Regression Prevention Lessons

**Date**: 2025-12-24  
**Status**: Canonical Lesson  
**Authority**: Governance Memory  
**Source Basis**: Phase 1 Classification, Wave Model, Build Philosophy, Cumulative QA

---

## Executive Summary

**Regression**: When new work breaks previously working functionality.

**Prevention Strategy**: Cumulative QA—running all previous wave QA when completing new waves.

**Key Lesson**: Regression is prevented by design, not discovered by accident.

---

## What Regression Is

### Definition

**Regression**: A defect where previously working, tested functionality breaks due to new changes.

### Examples

**Example 1: Feature Regression**
- Wave 1 implements login feature
- Login tests pass (100% GREEN)
- Wave 2 implements dashboard feature
- Dashboard tests pass, but login tests now fail
- **Regression**: Dashboard changes broke login

**Example 2: Performance Regression**
- Wave 1 implements data loading
- Load time: 200ms (acceptable)
- Wave 2 adds new feature
- Load time: 5000ms (25x slower)
- **Regression**: New feature degraded performance

**Example 3: Contract Regression**
- Wave 1 defines API contract: `POST /users { name, email }`
- Wave 2 changes contract: `POST /users { username, email }`
- Existing clients break
- **Regression**: API contract changed unexpectedly

---

## Why Regression Happens

### Cause 1: Lack of Cumulative Testing

**Problem**: Only testing new code, not re-testing old code.

**Process**:
```
Wave 1 complete → Tests pass ✓
Wave 2 complete → Wave 2 tests pass ✓
Wave 1 tests NOT re-run → Regression undetected ❌
```

**Why This Fails**: New code can break old code. If old tests aren't re-run, regression is invisible.

### Cause 2: Implicit Assumptions

**Problem**: Assuming "if it worked before, it still works."

**Reality**: Changes can have unexpected side effects.

**Examples**:
- Shared state modification
- Global variable changes
- Dependency updates
- Configuration changes
- Timing changes

### Cause 3: Incomplete Test Coverage

**Problem**: Old functionality wasn't fully tested, so regression can't be detected.

**Example**:
- Login feature tested for happy path only
- Edge case (invalid password) not tested
- Wave 2 breaks edge case handling
- No test fails (because edge case test didn't exist)

**Lesson**: Can't detect regression if test didn't exist in first place.

### Cause 4: Test Brittleness

**Problem**: Tests coupled to implementation details, break on valid refactors.

**Example**:
- Test checks internal variable names
- Refactor renames variables
- Test fails even though behavior is correct
- **False regression**

**Lesson**: Tests should validate behavior, not implementation.

### Cause 5: Ignored Test Failures

**Problem**: Test fails, but failure is dismissed as "probably unrelated."

**Process**:
```
Wave 2 complete → Wave 2 tests pass ✓
Wave 1 tests re-run → 1 test fails ❌
Developer: "That test was flaky anyway" → Ignore failure
Regression merged
```

**Lesson**: **All test failures are real until proven otherwise.** No dismissals allowed.

---

## Regression Prevention Model

### Principle: Cumulative QA

**Definition**: When completing Wave N, run QA for ALL previous waves (0, 1, 2, ..., N-1) plus Wave N.

**Process**:
```
Wave 1 completes
  → Run Wave 1 QA (10 tests) → 100% GREEN ✓

Wave 2 completes
  → Run Wave 1 QA (10 tests) + Wave 2 QA (15 tests)
  → Total: 25 tests → Must be 100% GREEN ✓

Wave 3 completes
  → Run Wave 1 QA + Wave 2 QA + Wave 3 QA (10+15+20 = 45 tests)
  → Must be 100% GREEN ✓
```

**Guarantee**: If Wave 3 QA is 100% GREEN (including cumulative QA), then:
- Wave 3 functionality works
- Wave 2 functionality still works
- Wave 1 functionality still works
- **No regression occurred**

### Why Cumulative QA Works

**Detection Speed**: Regression caught immediately at wave boundary, not later.

**Clear Cause**: If Wave 3 cumulative QA fails Wave 2 test, Wave 3 caused regression. No mystery.

**Forced Fix**: Cannot complete Wave 3 until cumulative QA is 100% GREEN. Must fix regression before proceeding.

**Quality Guarantee**: System is always 100% GREEN across all completed waves.

---

## Regression Prevention Rules

### Rule 1: Always Run Cumulative QA

**Statement**: When completing a wave, run ALL previous wave QA plus current wave QA.

**Enforcement**: Wave completion gates verify cumulative QA was run and passed.

### Rule 2: 100% GREEN Across All Waves

**Statement**: Cumulative QA must be 100% GREEN. One failing test = Wave BLOCKED.

**Absoluteness**:
- Not "99% passing" (that's TOTAL FAILURE)
- Not "Old tests are flaky" (all failures are real)
- Not "Will fix later" (must fix NOW)

**Enforcement**: Wave cannot complete until cumulative QA is 100% GREEN.

### Rule 3: No Test Dismissals

**Statement**: All test failures are treated as real regressions until proven otherwise.

**Never Allowed**:
- "That test was flaky"
- "Probably unrelated"
- "We'll investigate later"
- "Known issue"

**Required**:
- Investigate failure immediately
- Determine root cause
- Fix if regression (Wave N change broke Wave M functionality)
- Fix test if false failure (test was incorrectly written)

### Rule 4: Test Coverage Must Be Complete

**Statement**: Can't detect regression if test didn't exist. All functionality must be tested.

**Implication**: Red QA (created before building) must cover ALL architectural functionality, not just happy paths.

**Enforcement**: Architecture checklist ensures comprehensive coverage.

### Rule 5: Tests Validate Behavior, Not Implementation

**Statement**: Tests should check what system does, not how it does it.

**Example (Bad Test)**:
```javascript
// Coupled to implementation
expect(user._internalState.sessionToken).toBeDefined()
```

**Example (Good Test)**:
```javascript
// Validates behavior
expect(user.isLoggedIn()).toBe(true)
```

**Lesson**: Good tests survive refactors without breaking.

---

## Cumulative QA Process

### Phase 1: Wave Completion

Developer completes Wave N work:
- All Wave N issues merged
- Wave N QA is GREEN

### Phase 2: Cumulative QA Execution

Run complete test suite:
```
Wave 0 QA + Wave 1 QA + Wave 2 QA + ... + Wave N QA
```

All tests must pass.

### Phase 3: Failure Analysis (If Any Test Fails)

**Process**:
1. **Identify Failing Test**: Which wave does the failing test belong to?
2. **Determine Cause**: Did Wave N change break Wave M functionality?
3. **Classify**:
   - **Real Regression**: Wave N change broke Wave M functionality → FIX Wave N
   - **False Failure**: Test was incorrectly written → FIX test
   - **Environmental Issue**: Test environment problem → FIX environment

### Phase 4: Fix and Re-Run

**If Real Regression**:
1. Fix Wave N change to restore Wave M functionality
2. Re-run cumulative QA
3. Verify 100% GREEN
4. Wave N can now complete

**If False Failure**:
1. Fix test to correctly validate behavior
2. Re-run cumulative QA
3. Verify 100% GREEN
4. Wave N can now complete

**If Environmental Issue**:
1. Fix test environment
2. Re-run cumulative QA
3. Verify 100% GREEN
4. Wave N can now complete

### Phase 5: Wave Completion

Only after cumulative QA is 100% GREEN:
- Mark Wave N complete
- Proceed to Wave N+1 (if dependencies met)

---

## Regression Detection Example

### Scenario

**Wave 1**: Login feature implemented
- Tests: `login_valid_credentials`, `login_invalid_credentials`, `login_lockout_after_3_failures`
- All tests pass ✓

**Wave 2**: Dashboard feature implemented
- Tests: `dashboard_displays_user_data`, `dashboard_loads_within_2s`
- Wave 2 tests pass ✓

**Cumulative QA**:
```
Run Wave 1 tests:
  - login_valid_credentials: ✓ PASS
  - login_invalid_credentials: ✓ PASS
  - login_lockout_after_3_failures: ❌ FAIL

Run Wave 2 tests:
  - dashboard_displays_user_data: ✓ PASS
  - dashboard_loads_within_2s: ✓ PASS
```

**Analysis**:
- Wave 2 tests pass
- Wave 1 test fails: `login_lockout_after_3_failures`
- **Regression Detected**: Wave 2 broke Wave 1 lockout functionality

**Investigation**:
- Dashboard feature added new session management
- Session management code interfered with login lockout logic
- Root cause identified

**Fix**:
- Modify dashboard session management to not interfere with login lockout
- Re-run cumulative QA
- All tests pass ✓

**Outcome**:
- Regression caught at wave boundary (immediately)
- Root cause identified quickly (Wave 2 change)
- Fixed before wave completion
- System remains 100% GREEN

---

## Anti-Patterns

### ❌ "We'll Test Later"

**Problem**: Not running cumulative QA after every wave.

**Result**: Regressions accumulate. By the time discovered, root cause is unclear (which wave broke it?).

### ❌ "That Test Is Flaky"

**Problem**: Dismissing test failures as "flaky" without investigation.

**Result**: Real regressions ignored. Failures accumulate.

### ❌ "We'll Fix It Next Wave"

**Problem**: Deferring regression fix to next wave.

**Result**: Wave N+1 builds on broken Wave N. Compounding failures.

### ❌ "Old Tests Don't Matter"

**Problem**: Only running new wave tests, not cumulative.

**Result**: Regression prevention fails completely.

---

## Benefits of Cumulative QA

### Benefit 1: Fast Regression Detection

Regression caught **immediately** at wave boundary, not weeks later.

### Benefit 2: Clear Root Cause

If Wave N cumulative QA fails Wave M test, Wave N caused regression. No mystery.

### Benefit 3: Forced Fix

Cannot proceed to Wave N+1 until cumulative QA is GREEN. Must fix regressions.

### Benefit 4: Quality Guarantee

System is 100% GREEN at every completed wave. Quality compounds, never erodes.

### Benefit 5: Safe Refactors

Can refactor confidently knowing cumulative QA will catch breaks.

---

## Lessons That Must Never Be Forgotten

### Lesson 1: Cumulative QA Prevents Regression

Running all previous wave tests when completing new wave catches regression immediately.

### Lesson 2: All Test Failures Are Real Until Proven Otherwise

No dismissals. All failures must be investigated and resolved.

### Lesson 3: Regression Fix Cannot Be Deferred

Must fix regression before wave completion. "Will fix later" is unacceptable.

### Lesson 4: Test Coverage Must Be Comprehensive

Can't detect regression if test didn't exist. Red QA must cover all functionality.

### Lesson 5: Quality Compounds When Regression Is Prevented

Each wave strengthens total system quality. Cumulative QA ensures quality never erodes.

---

## Conclusion

**Regression prevention is a design property, not an accident.**

Cumulative QA ensures:
- Regression caught immediately
- Root cause is clear
- Fix is forced before proceeding
- System is always 100% GREEN
- Quality compounds over time

**Immutable Rule**: When completing Wave N, run cumulative QA (all previous waves + Wave N). Must be 100% GREEN before wave completion.

---

**Source Documents**:
- `governance/execution/WAVE_MODEL.md`
- `BUILD_PHILOSOPHY.md`
- `governance/maturion/PRINCIPLES.md`
- `governance/execution/EXECUTION_INVARIANTS.md` (INV-7)

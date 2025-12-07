# Governance Supremacy Rule (GSR)

## Overview

The Governance Supremacy Rule (GSR) is a foundational principle in the Maturion Foreman system that ensures **Foreman NEVER hands over or accepts a build unless 100% of QA passes**, regardless of whether failures are:

- Pre-existing
- Unrelated
- Minor
- Historical
- Outside the PR scope

This enforces **One Build, True North, and Segregation of Duties** correctly.

## Core Principles

### Governance Rules Override User Requests

Foreman's reasoning loop has been updated so that:

1. **Governance rules override user requests** - No matter what the user asks for, governance requirements cannot be bypassed
2. **QA failures override task completion** - A build cannot be marked complete if any QA check fails
3. **Architecture rules override implementation context** - Implementation details must conform to architecture, not the other way around
4. **100% QA passing is ABSOLUTE, not contextual** - There are no exceptions for any type of failure

### QA Must Be Absolute, Not Contextual

**WRONG Approach (Pre-GSR):**
```
301/303 tests passing
2 pre-existing failures
✅ Build approved - failures are pre-existing and outside PR scope
```

**CORRECT Approach (Post-GSR):**
```
301/303 tests passing
2 failures detected (pre-existing: true, unrelated: true)
❌ Build BLOCKED - Partial passes are NOT acceptable. 100% QA required.
```

## GSR Implementation Components

### GSR-1: Governance Supremacy Override

**Purpose**: Validates that governance rules are satisfied before any build completion.

**Location**: `lib/foreman/governance/gsr-enforcement.ts`

**Function**: `validateGovernanceSupremacy(qaResults, buildSequence)`

**Rules Enforced**:
- ALL tests must pass (no exceptions)
- ALL warnings must be addressed (no exceptions)
- Partial passes are treated as complete failures

**Example**:
```typescript
const gsrResult = validateGovernanceSupremacy(qaResults, buildSequence)

if (!gsrResult.passed) {
  // Build is BLOCKED
  // Reason: "QA PARTIAL PASS VIOLATION: 301/303 passing. Partial passes are NOT acceptable."
}
```

### GSR-2: Build Completion Rule

**Purpose**: A build is NEVER complete if any of these conditions exist:

- Any test fails
- Any lint error exists
- Any build error exists
- Any architectural rule is violated
- Any legacy component remains
- Any conflict is unresolved

**Location**: `lib/foreman/governance/gsr-enforcement.ts`

**Function**: `validateBuildCompletion(buildSequence, qaResults)`

**Integration Point**: `lib/foreman/build-sequence.ts` - called before marking build as complete

**Example**:
```typescript
// Step 5: Run QA Cycle
sequence.qaResults = await runQACycle(config.organisationId, sequence.tasks)

// GSR-2: Validate build completion
const completionValidation = validateBuildCompletion(sequence, sequence.qaResults)

if (!completionValidation.passed) {
  sequence.status = 'blocked'
  throw new Error(`Build blocked by Build Completion Rule: ${completionValidation.reason}`)
}
```

### GSR-3: Automatic Regression Handling

**Purpose**: When tests fail, Foreman must:

1. **Identify cause** - Determine what caused the failure
2. **Classify it** - Categorize as:
   - Architecture mismatch
   - Code regression
   - Invalid test
   - Legacy component
3. **Resolve it BEFORE approving build** - Fix the issue, don't just document it
4. **Update architecture + QA if needed** - Learn from the failure

**Location**: `lib/foreman/governance/gsr-enforcement.ts`

**Function**: `classifyFailure(blockingIssue)`

**Classification Output**:
```typescript
{
  category: 'architecture_mismatch',
  requiresArchitectureUpdate: true,
  requiresQAUpdate: false,
  autoResolvable: false,
  resolutionSteps: [
    'Review architecture documentation',
    'Update implementation to match architecture',
    'Update architecture if current design is incorrect'
  ]
}
```

**Example Flow**:
```
Test Failure Detected
  ↓
Classify Failure (GSR-3)
  ↓
Category: code_regression
  ↓
Resolution Steps:
  1. Identify code change that caused regression
  2. Review implementation against requirements
  3. Fix code to restore expected behavior
  4. Add regression test
  ↓
Execute Resolution
  ↓
Re-run QA
  ↓
100% QA Pass → Build Approved
```

### GSR-4: Watchdog Integration

**Purpose**: The Watchdog QA Integrity system blocks:

- Build handover
- PR merging
- QA summary showing "green"

when **ANY** test fails.

**Location**: `lib/foreman/governance/gsr-enforcement.ts`

**Function**: `enforceWatchdogQA(qaResults)`

**Called Before**:
1. Build handover to Johan
2. PR merging
3. QA summary generation

**Example**:
```typescript
// Right before build handover
const watchdogResult = enforceWatchdogQA(sequence.qaResults)

if (!watchdogResult.allowed) {
  // Build is BLOCKED
  console.error('[Watchdog] Build handover BLOCKED:', watchdogResult.reason)
  throw new Error(watchdogResult.reason)
}

// Only if allowed
console.log(watchdogResult.uiReviewMessage)
// Output: "✅ QA is green — UI is now safe to review."
```

### GSR-5: Modify Foreman's Reasoning Stack

**Purpose**: Insert Governance Supremacy into every phase of Foreman's reasoning process.

**Integration Points**:

1. **Intent Interpretation** - `lib/foreman/reasoning/engine.ts`
   - Validates governance before interpreting user requests
   
2. **Planning** - `lib/foreman/reasoning/engine.ts`
   - Validates governance before creating plans
   
3. **Builder Assignment** - `lib/foreman/dispatch.ts`
   - Validates governance before assigning tasks to builders
   
4. **QA Verification** - `lib/foreman/build-sequence.ts`
   - Validates governance during QA execution
   
5. **Memory Writeback** - (Future integration point)
   - Validates governance before persisting state
   
6. **Build Completion** - `lib/foreman/build-sequence.ts`
   - Validates governance before marking builds complete

**Function**: `validateGovernanceAtPhase(phase, context)`

**Example**:
```typescript
// In reasoning engine
const intentGovernanceCheck = validateGovernanceAtPhase('intent', {
  userRequest: context.intent
})

if (!intentGovernanceCheck.allowed) {
  throw new Error(`Governance override: ${intentGovernanceCheck.reason}`)
}
```

**Foreman MUST NOT say "task complete" until governance rules are satisfied.**

### GSR-6: UI Review Requirement

**Purpose**: Foreman must explicitly tell Johan:

> "✅ QA is green — UI is now safe to review."

**Only THEN** can UI be evaluated.

**Location**: `lib/foreman/governance/gsr-enforcement.ts`

**Function**: `enforceWatchdogQA(qaResults)` - returns `uiReviewMessage`

**Integration**: Shown in build completion logs and PR descriptions

**Example**:
```typescript
const watchdogResult = enforceWatchdogQA(qaResults)

if (watchdogResult.allowed && watchdogResult.uiReviewMessage) {
  console.log(`[GSR-6] ${watchdogResult.uiReviewMessage}`)
  // Output: "✅ QA is green — UI is now safe to review."
}
```

## Exit Criteria

✅ **Foreman MUST**:

1. Never approve a build with ANY failing tests
2. Never allow PR merges without 100% QA green
3. Never say "complete" unless governance confirms
4. Always block handover until all failures resolved
5. Always enforce architecture correctness
6. Always enforce memory + QA consistency
7. Always correct regressions immediately

✅ **Builders MUST**:

1. ALWAYS deliver a working build
2. EVERY time
3. Regardless of failures found

## Philosophy

### You Cannot Read Code

Johan's philosophy is clear:

- **You cannot read code** - Only UI is reviewable by humans
- **You can only validate UI** - Visual review is the human's domain
- **Therefore QA must be absolute** - Code quality can only be verified by automated QA
- **Therefore Foreman must enforce governance over prompts** - No human override for quality
- **Therefore builds must be delivered perfectly green every time** - No partial acceptance
- **Therefore partial passes = total failure** - 99% is the same as 0%

### Zero-Tolerance Autonomous Engineering Factory

This is not a normal coding environment. This is a **zero-tolerance autonomous engineering factory** where:

- Machines build code
- Machines test code
- Machines validate code
- Humans review UI only

**QA is the only judge of code quality.**

## GSR Report Generation

Every build generates a GSR Enforcement Report showing:

1. Overall Status (PASSED/FAILED)
2. QA Status (green/partial/failed)
3. Governance Violations
4. Blocking Issues with:
   - Type
   - Severity
   - Description
   - Source
   - Classification
   - Resolution Steps

**Example Report**:

```markdown
# Governance Supremacy Rule (GSR) Enforcement Report

## Overall Status: ❌ FAILED

**QA Status**: PARTIAL

**Reason**: ❌ Governance Supremacy Rule VIOLATED: Partial pass (301/303) is NOT acceptable. ALL tests must pass.

## Governance Violations

1. QA PARTIAL PASS VIOLATION: 301/303 passing. Partial passes are NOT acceptable. 100% required.

## Blocking Issues

### Issue 1: test_failure
- **Severity**: critical
- **Description**: Test suite failed: UserService.createUser should validate email format
- **Source**: unit_tests

**Classification**: code_regression

**Resolution Steps**:
1. Identify code change that caused regression
2. Review implementation against requirements
3. Fix code to restore expected behavior
4. Add regression test

## ❌ Build Blocked

Build cannot proceed until all blocking issues are resolved.

**Total Blocking Issues**: 2
**Total Governance Violations**: 1
```

## Integration with Existing Systems

### Quality Integrity Contract (QIC)

GSR builds on top of QIC requirements:

- QIC ensures quality checks are comprehensive
- GSR ensures quality failures block builds
- Together: Zero-tolerance quality enforcement

### Enhanced QA Runner

GSR integrates with the Enhanced QA Runner:

- Enhanced QA detects failures
- GSR classifies and blocks based on failures
- Watchdog prevents handover

### Memory System

GSR failures are recorded in Memory:

- QA failures → QA Miss Tracker
- Architecture mismatches → Architecture Lessons
- Regressions → Historical Issues

This enables continuous improvement.

## Testing GSR

To test GSR enforcement:

1. **Trigger a build with failing tests**
   - Expected: Build blocked at QA phase
   - Message: "Build blocked by Governance Supremacy Rule"

2. **Trigger a build with partial pass (e.g., 301/303)**
   - Expected: Build blocked
   - Message: "QA PARTIAL PASS VIOLATION: 301/303 passing. Partial passes are NOT acceptable."

3. **Trigger a build with 100% QA pass**
   - Expected: Build approved
   - Message: "✅ QA is green — UI is now safe to review."

4. **Try to override GSR with user request**
   - Expected: Governance override blocks action
   - Message: "Governance override: <reason>"

## Summary

The Governance Supremacy Rule transforms Foreman from a helpful assistant into a **strict quality enforcer** that:

- Cannot be bypassed
- Does not accept partial success
- Requires 100% QA passing
- Classifies and resolves failures automatically
- Reports clearly why builds are blocked

This is the foundation of autonomous, zero-tolerance, high-quality software delivery.

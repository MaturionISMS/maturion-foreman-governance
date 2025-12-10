# PR Merge Validator: Independent Due Process Assurance

## Purpose

The PR Merge Validator is an **independent assurance agent** that runs **outside the build process** to verify that **due process was followed** according to the Build Philosophy.

**Key Principle**: The merge gate does NOT re-run QA. QA already ran during the build. The merge gate verifies that the **correct process** was followed.

**Analogy**: This is like a factory quality inspector checking that the manufacturing process was followed correctly, not re-manufacturing the product to test it.

---

## The Independent Assurance Model

### Inside the Box (Build Process)
- Foreman designs architecture
- Foreman creates red QA
- Foreman instructs builders
- Builders build to green
- Foreman validates green QA

### Outside the Box (PR Merge Validator)
- **Independent agent** (not Foreman, not builders)
- Runs at PR merge time
- Checks that due process was followed
- Verifies evidence exists for each step
- **Does not re-test quality** - validates process compliance

**Why independent?** To ensure no shortcuts were taken inside the box. The validator has no stake in the build - it only cares about process compliance.

---

## What the Validator Checks

The PR Merge Validator performs **6 Due Process Checks**:

### Check 1: Architecture Completeness Evidence

**What it checks**: Was complete architecture designed and validated?

**Evidence required**:
- Architecture document exists for this feature/change
- Architecture checklist validation report exists
- Validation report shows all relevant categories addressed
- Validation report is signed/timestamped by Foreman

**Pass criteria**:
```
✓ Architecture document found
✓ Checklist validation report found
✓ All relevant checklist items marked complete
✓ Validation timestamp before build started
```

**Fail criteria**:
```
✗ No architecture document
✗ No checklist validation
✗ Checklist incomplete
✗ Validation after build (process violated)
```

**If fails**: BLOCK merge - Architecture was not validated before building

---

### Check 2: Red QA Creation Evidence

**What it checks**: Was Red QA created before building?

**Evidence required**:
- QA test suite exists in repository
- QA manifest file exists (documents what tests check)
- Build log shows QA was run BEFORE building started
- Build log shows QA status was RED (failing)
- Timestamp proves Red QA existed before build

**Pass criteria**:
```
✓ QA test suite found
✓ QA manifest found
✓ Build log shows pre-build QA run
✓ Pre-build QA status: RED (X/Y tests failing)
✓ Red QA timestamp before build start
```

**Fail criteria**:
```
✗ No QA test suite
✗ No evidence of pre-build QA run
✗ Pre-build QA was GREEN (nothing to build?)
✗ QA created after build (process violated)
```

**If fails**: BLOCK merge - Building without Red QA violates philosophy

---

### Check 3: Build Instruction Compliance

**What it checks**: Was "Build to Green" instruction format used?

**Evidence required**:
- Build task record exists
- Build task shows instruction field
- Instruction field equals exactly "Build to Green"
- Build task includes architecture reference
- Build task includes QA suite reference

**Pass criteria**:
```
✓ Build task record found
✓ Instruction: "Build to Green" (exact match)
✓ Architecture reference provided
✓ QA suite reference provided
```

**Fail criteria**:
```
✗ No build task record
✗ Instruction is not "Build to Green"
✗ No architecture reference
✗ No QA suite reference
```

**If fails**: BLOCK merge - Incorrect instruction format used

---

### Check 4: Builder Validation Evidence

**What it checks**: Did builder validate the "Build to Green" instruction?

**Evidence required**:
- Builder validation log exists
- Validation log shows all 6 validation checks passed
- No BuildPhilosophyViolation errors in logs
- Builder accepted the instruction

**Pass criteria**:
```
✓ Builder validation log found
✓ All validation checks passed
✓ No philosophy violation errors
✓ Builder accepted instruction
```

**Fail criteria**:
```
✗ No validation log
✗ Validation checks failed
✗ Philosophy violation detected
✗ Builder rejected instruction (but build proceeded anyway?)
```

**If fails**: BLOCK merge - Builder validation was skipped or failed

---

### Check 5: Green QA Achievement Evidence

**What it checks**: Did QA turn green during the build?

**Evidence required**:
- Build completion log exists
- Log shows final QA run
- Final QA status: GREEN (100% passing)
- All tests that were red are now green
- Build completion timestamp

**Pass criteria**:
```
✓ Build completion log found
✓ Final QA run documented
✓ Final QA status: GREEN (Y/Y tests passing)
✓ All previously failing tests now pass
✓ Completion timestamp valid
```

**Fail criteria**:
```
✗ No build completion log
✗ No final QA run
✗ Final QA not 100% green
✗ Some tests still failing
```

**If fails**: BLOCK merge - Build incomplete or QA not green

---

### Check 6: Process Timeline Integrity

**What it checks**: Did steps happen in correct order?

**Evidence required**:
- Timestamps from all process steps
- Timeline reconstruction from logs

**Required order**:
1. Architecture designed (timestamp T1)
2. Architecture validated (timestamp T2, T2 > T1)
3. Red QA created (timestamp T3, T3 > T2)
4. Red QA run (timestamp T4, T4 >= T3)
5. Build instruction issued (timestamp T5, T5 > T4)
6. Builder validation (timestamp T6, T6 >= T5)
7. Building executed (timestamp T7, T7 > T6)
8. Green QA achieved (timestamp T8, T8 > T7)

**Pass criteria**:
```
✓ All timestamps present
✓ Timeline order is correct
✓ No steps skipped
✓ No steps out of order
```

**Fail criteria**:
```
✗ Missing timestamps
✗ Steps out of order (e.g., building before Red QA)
✗ Steps skipped
✗ Timeline inconsistencies
```

**If fails**: BLOCK merge - Process steps out of order (shortcut taken)

---

## Validator Output Format

### When All Checks Pass

```markdown
## PR Merge Validation Report

**PR**: #123 - Add dashboard feature
**Date**: 2025-12-10T10:00:00Z
**Validator**: Independent Due Process Validator v1.0

### Due Process Verification: ✅ PASS

#### Check 1: Architecture Completeness - ✅ PASS
- Architecture: foreman/architecture/dashboard.md
- Checklist validation: governance/validations/dashboard-checklist.md
- All items addressed: ✓
- Validated before build: ✓

#### Check 2: Red QA Creation - ✅ PASS
- QA suite: tests/qa/dashboard/
- QA manifest: tests/qa/dashboard/manifest.json
- Pre-build QA run: 2025-12-10T08:00:00Z
- Pre-build status: RED (0/15 passing)
- Red QA before build: ✓

#### Check 3: Build Instruction Compliance - ✅ PASS
- Build task: task-2025-12-10-001
- Instruction: "Build to Green" ✓
- Architecture reference: ✓
- QA suite reference: ✓

#### Check 4: Builder Validation - ✅ PASS
- Validation log: builds/dashboard/validation.log
- All checks passed: ✓
- No violations: ✓
- Builder accepted: ✓

#### Check 5: Green QA Achievement - ✅ PASS
- Build completion: builds/dashboard/completion.log
- Final QA run: 2025-12-10T09:30:00Z
- Final status: GREEN (15/15 passing)
- All tests green: ✓

#### Check 6: Process Timeline - ✅ PASS
- Architecture: 2025-12-10T07:00:00Z
- Validation: 2025-12-10T07:15:00Z
- Red QA: 2025-12-10T07:30:00Z
- Build start: 2025-12-10T08:00:00Z
- Build end: 2025-12-10T09:30:00Z
- Timeline correct: ✓

### Overall Result: ✅ MERGE ALLOWED

Due process was followed correctly. All evidence present.
Build Philosophy compliance verified.

**Assurance**: This build followed the correct process from architecture
through green QA. No shortcuts were taken.
```

### When Any Check Fails

```markdown
## PR Merge Validation Report

**PR**: #124 - Add user profile
**Date**: 2025-12-10T11:00:00Z
**Validator**: Independent Due Process Validator v1.0

### Due Process Verification: ❌ FAIL

#### Check 1: Architecture Completeness - ✅ PASS
[... details ...]

#### Check 2: Red QA Creation - ❌ FAIL
- QA suite: tests/qa/user-profile/ ✓
- QA manifest: tests/qa/user-profile/manifest.json ✓
- Pre-build QA run: NOT FOUND ✗
- Pre-build status: UNKNOWN ✗
- Red QA before build: ✗ NO EVIDENCE

**VIOLATION**: No evidence of Red QA run before building.
**IMPACT**: Cannot verify that Red QA existed before building started.
**REQUIRED**: Build logs must show Red QA run with RED status before build.

#### Check 3: Build Instruction Compliance - ✅ PASS
[... details ...]

#### Check 4: Builder Validation - ✅ PASS
[... details ...]

#### Check 5: Green QA Achievement - ✅ PASS
[... details ...]

#### Check 6: Process Timeline - ⚠️ WARNING
- Architecture: 2025-12-10T10:00:00Z
- Validation: NOT FOUND ✗
- Red QA: 2025-12-10T10:15:00Z
- Build start: 2025-12-10T10:10:00Z ✗ BEFORE RED QA!
- Build end: 2025-12-10T11:00:00Z
- Timeline correct: ✗ OUT OF ORDER

**VIOLATION**: Build started before Red QA was created.
**IMPACT**: Builder may have built without Red QA specification.
**REQUIRED**: Red QA must exist before build starts.

### Overall Result: ❌ MERGE BLOCKED

Due process was NOT followed correctly.

**Violations Found**: 2
1. No evidence of Red QA run before building
2. Build started before Red QA was created

**Required Actions**:
1. Investigate why Red QA was not run before building
2. Investigate timeline violation
3. Re-do build following correct process:
   - Design architecture
   - Validate architecture
   - Create Red QA
   - RUN Red QA to verify RED status
   - THEN issue "Build to Green"
4. Provide complete evidence trail
5. Re-submit for validation

**Assurance**: This build did NOT follow the correct process.
Shortcuts were detected. Merge is blocked until corrected.
```

---

## Validator Implementation

### Where It Runs

The validator runs as a **GitHub workflow** that triggers on PR events:

```yaml
# .github/workflows/pr-merge-validator.yml
name: PR Merge Validator (Independent Assurance)

on:
  pull_request:
    types: [opened, synchronize, reopened, ready_for_review]
  pull_request_review:
    types: [submitted]

jobs:
  validate-due-process:
    name: Verify Build Philosophy Due Process
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout PR
        uses: actions/checkout@v3
        with:
          ref: ${{ github.event.pull_request.head.sha }}
          
      - name: Run Independent Due Process Validator
        run: |
          npm run validate:due-process
          
      - name: Post Validation Report
        uses: actions/github-script@v6
        with:
          script: |
            // Post validation report as PR comment
            
      - name: Set Merge Gate Status
        run: |
          # If validation passes: exit 0 (allow merge)
          # If validation fails: exit 1 (block merge)
```

### Validator Script

```typescript
// scripts/validate-due-process.ts

import { validateDueProcess } from '@/lib/validators/due-process-validator'

async function main() {
  console.log('PR Merge Validator: Independent Due Process Assurance')
  console.log('Running outside the box to verify inside the box compliance\n')
  
  // Run all 6 checks
  const result = await validateDueProcess({
    prNumber: process.env.PR_NUMBER,
    commitSha: process.env.COMMIT_SHA
  })
  
  // Generate report
  const report = generateValidationReport(result)
  
  // Output report
  console.log(report)
  
  // Write report to file
  await writeReport(report, 'pr-merge-validation-report.md')
  
  // Exit with appropriate code
  if (result.overall === 'PASS') {
    console.log('\n✅ MERGE ALLOWED: Due process verified')
    process.exit(0)
  } else {
    console.log('\n❌ MERGE BLOCKED: Due process violations detected')
    process.exit(1)
  }
}

main()
```

### Validator Logic

```typescript
// lib/validators/due-process-validator.ts

export async function validateDueProcess(context: ValidationContext): Promise<ValidationResult> {
  
  const checks = {
    check1: await validateArchitectureCompleteness(context),
    check2: await validateRedQACreation(context),
    check3: await validateBuildInstructionCompliance(context),
    check4: await validateBuilderValidation(context),
    check5: await validateGreenQAAchievement(context),
    check6: await validateProcessTimeline(context)
  }
  
  const allPassed = Object.values(checks).every(check => check.status === 'PASS')
  
  return {
    overall: allPassed ? 'PASS' : 'FAIL',
    checks,
    violations: Object.values(checks)
      .filter(check => check.status === 'FAIL')
      .map(check => check.violation),
    timestamp: new Date().toISOString()
  }
}

async function validateArchitectureCompleteness(context: ValidationContext) {
  // Look for architecture document
  const architectureDoc = await findArchitectureDocument(context)
  
  if (!architectureDoc) {
    return {
      status: 'FAIL',
      violation: 'No architecture document found',
      details: 'Architecture must be designed before building'
    }
  }
  
  // Look for checklist validation
  const checklistValidation = await findChecklistValidation(context)
  
  if (!checklistValidation) {
    return {
      status: 'FAIL',
      violation: 'No architecture checklist validation found',
      details: 'Architecture must be validated against checklist'
    }
  }
  
  // Verify all items addressed
  if (!checklistValidation.allItemsAddressed) {
    return {
      status: 'FAIL',
      violation: 'Architecture checklist incomplete',
      details: `Missing items: ${checklistValidation.missingItems.join(', ')}`
    }
  }
  
  return {
    status: 'PASS',
    evidence: {
      architecture: architectureDoc.path,
      validation: checklistValidation.path,
      timestamp: checklistValidation.timestamp
    }
  }
}

async function validateRedQACreation(context: ValidationContext) {
  // Look for QA test suite
  const qaTestSuite = await findQATestSuite(context)
  
  if (!qaTestSuite) {
    return {
      status: 'FAIL',
      violation: 'No QA test suite found',
      details: 'Red QA must be created before building'
    }
  }
  
  // Look for pre-build QA run in logs
  const preBuildQA = await findPreBuildQARun(context)
  
  if (!preBuildQA) {
    return {
      status: 'FAIL',
      violation: 'No evidence of pre-build QA run',
      details: 'Build logs must show Red QA run before building started'
    }
  }
  
  // Verify QA was RED
  if (preBuildQA.status !== 'RED') {
    return {
      status: 'FAIL',
      violation: 'Pre-build QA was not RED',
      details: `QA status was ${preBuildQA.status}. Must be RED (failing) before building.`
    }
  }
  
  return {
    status: 'PASS',
    evidence: {
      qaSuite: qaTestSuite.path,
      preBuildRun: preBuildQA.timestamp,
      status: preBuildQA.status,
      testResults: `${preBuildQA.passing}/${preBuildQA.total} passing`
    }
  }
}

// Similar implementations for checks 3-6...
```

---

## Integration with Build Philosophy

### Updated Phase 6: Merge Gate Checks

The workflow document needs updating to reflect that merge gates verify **process**, not **quality**:

**Old approach** (re-test everything):
```
Gate 4: Final QA is 100% Green
Check: Run QA suite one final time
Command: npm run test -- qa-suite-name
```

**New approach** (verify evidence):
```
Gate 4: Green QA Achievement Evidence
Check: Verify build completion log shows QA turned green
Evidence: Build completion log with final QA status GREEN
No re-run: We verify the evidence, not re-test
```

**Why better**: 
- Faster (no redundant QA runs)
- Validates process compliance
- Independent verification
- Clear separation of concerns

---

## The Assurance Model

### Inside the Box (Build Process)
**Responsibility**: Produce quality code
**Accountability**: Foreman + Builders
**Validation**: QA tests (run during build)

### Outside the Box (Merge Validator)
**Responsibility**: Verify due process
**Accountability**: Independent validator
**Validation**: Evidence collection and timeline analysis

### Why This Works
- **Separation of concerns**: Quality vs Process
- **Independence**: Validator has no stake in build success
- **Efficiency**: No redundant quality testing
- **Clarity**: Clear pass/fail based on evidence
- **Accountability**: Process violations are detected and blocked

---

## Evidence Requirements

For every PR merge, the following evidence must exist:

1. **Architecture Evidence**
   - Architecture document (`.md` file)
   - Checklist validation report

2. **Red QA Evidence**
   - QA test suite files
   - QA manifest file
   - Build log showing pre-build QA run
   - Pre-build QA status: RED

3. **Build Instruction Evidence**
   - Build task record
   - Instruction: "Build to Green"
   - Architecture and QA references

4. **Builder Validation Evidence**
   - Builder validation log
   - All checks passed
   - No philosophy violations

5. **Green QA Evidence**
   - Build completion log
   - Final QA run results
   - Final status: GREEN (100%)

6. **Timeline Evidence**
   - Timestamps for all process steps
   - Steps in correct order

**If any evidence is missing → Process was not followed → Merge blocked**

---

## Benefits of This Approach

### For Johan
✅ **Independent assurance** - Outside the box verification
✅ **No shortcuts possible** - Process violations are caught
✅ **Clear accountability** - Know exactly what was done
✅ **Confidence in builds** - Process guarantees quality

### For Foreman
✅ **Clear requirements** - Must maintain evidence trail
✅ **Process discipline** - Cannot skip steps
✅ **Accountability** - Evidence proves compliance

### For Builders
✅ **Clear constraints** - Must follow process
✅ **No ambiguity** - Evidence requirements are clear

### For the System
✅ **Audit trail** - Complete process documentation
✅ **Learning** - Evidence shows what works
✅ **Continuous improvement** - Process gaps are identified

---

## Failure Scenarios and Recovery

### Scenario 1: Missing Architecture Validation

**Validator finds**: No checklist validation report

**Action**: 
1. Block merge
2. Foreman creates checklist validation
3. Documents validation in governance memory
4. Re-submits PR
5. Validator re-runs → Should pass

---

### Scenario 2: Build Started Before Red QA

**Validator finds**: Timeline shows build before Red QA

**Action**:
1. Block merge
2. Investigate: Why was process violated?
3. Discard build (it's invalid)
4. Re-do build following correct process
5. Re-submit with complete evidence trail

---

### Scenario 3: No Builder Validation Log

**Validator finds**: No evidence builder validated instruction

**Action**:
1. Block merge
2. Investigate: Did builder skip validation?
3. Fix builder if validation was skipped
4. Re-run build with validation
5. Re-submit with validation evidence

---

## Summary

The PR Merge Validator is your **independent assurance** that:
- Architecture was designed first ✓
- Architecture was validated against checklist ✓
- Red QA was created before building ✓
- "Build to Green" instruction was used ✓
- Builder validated the instruction ✓
- QA turned green during build ✓
- Process steps happened in correct order ✓

**It doesn't re-test quality. It verifies process compliance.**

**This is your guarantee that no shortcuts were taken.**

---

*Version*: 1.0  
*Authority*: Build Philosophy  
*Status*: Active and Enforced  
*Last Updated*: 2025-12-10

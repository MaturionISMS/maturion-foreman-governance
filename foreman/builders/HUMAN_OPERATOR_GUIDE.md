# Human Builder Operator Guide

## Introduction

This guide is for **humans acting as builders** in the Maturion ecosystem. If you (Johan or another authorized person) are executing a "Build to Green" instruction manually, follow this guide exactly.

---

## Prerequisites

Before you begin, ensure you have:

- [ ] Access to the repository
- [ ] Development environment set up
- [ ] Node.js and npm installed
- [ ] Git configured
- [ ] Editor/IDE ready
- [ ] Terminal access
- [ ] Read the canonical builder contract (`.github/agents/builder-agent.md`)
- [ ] Read the Build Philosophy (`BUILD_PHILOSOPHY.md`)

---

## Step-by-Step Procedure

### Step 1: Receive Build Instruction

Wait for Foreman to provide a "Build to Green" instruction.

**Instruction will be in this format:**

```markdown
# Build to Green Instruction

## Task ID
<unique-task-identifier>

## Instruction
Build to Green

## Architecture Reference
**Location**: `foreman/architecture/<feature-name>-architecture.md`

## QA Suite
**Location**: `tests/qa/<feature-name>/`
**Current Status**: RED (X tests failing)

## Acceptance Criteria
- All X tests must pass (100% green)
- Zero test failures
- [other criteria...]
```

### Step 2: Validate the Instruction

**BEFORE YOU START**, validate these 4 requirements:

#### Validation Checklist

- [ ] **Instruction Format**: Says exactly "Build to Green"
- [ ] **Architecture Exists**: File at specified location exists and is readable
- [ ] **QA Suite Exists**: Test files at specified location exist
- [ ] **QA is RED**: Tests are failing (run them to verify)

**Validation Commands:**

```bash
# Verify architecture exists
cat foreman/architecture/<feature-name>-architecture.md

# Verify QA exists
ls tests/qa/<feature-name>/

# Run QA to verify RED status
npm test tests/qa/<feature-name>/
```

**If ANY validation fails:**

1. STOP immediately
2. Do NOT proceed with building
3. Notify Foreman with specific failure:
   - "Architecture file not found at specified location"
   - "QA suite does not exist"
   - "QA is already GREEN - nothing to build"
   - "Instruction format is not 'Build to Green'"

4. Request corrected instruction

**Only proceed if ALL 4 validations PASS.**

---

### Step 3: Set Up Your Workspace

#### 3.1 Create Evidence Directory

```bash
# Create task-specific evidence directory
TASK_ID="<task-id-from-instruction>"
mkdir -p foreman/evidence/builds/$TASK_ID/iterations

# Navigate to evidence directory
cd foreman/evidence/builds/$TASK_ID
```

#### 3.2 Create Build Initiation Evidence

```bash
# Copy template
cp ../../../templates/build-initiation.template.json build-initiation.json

# Edit with your details (use your editor)
nano build-initiation.json
```

**Fill in:**
- `taskId`: From instruction
- `timestamp`: Current time (ISO 8601 format)
- `instruction.fullText`: Copy exact instruction text
- `architecture.location`: From instruction
- `qaSuite.location`: From instruction
- `qaSuite.status`: "RED"
- `qaSuite.totalTests`: Count from running tests
- `qaSuite.failing`: Count of failing tests
- `builder.name`: Your name
- `builder.type`: "human"
- `builder.operator`: Your name

#### 3.3 Create Validation Results Evidence

```bash
# Copy template
cp ../../../templates/validation-results.template.json validation-results.json

# Edit with validation results
nano validation-results.json
```

**Document that all 4 validations passed.**

---

### Step 4: Read Architecture Thoroughly

**Open and READ the entire architecture document:**

```bash
# Open architecture in your editor
code foreman/architecture/<feature-name>-architecture.md
```

**Understand:**
- What components need to be built
- What each component does
- How components interact
- Data structures needed
- Error handling requirements
- Edge cases to handle

**DO NOT start coding until you fully understand the architecture.**

**If architecture is unclear:**
- Document your questions
- Escalate to Foreman
- Do NOT guess or interpret

---

### Step 5: Read QA Tests Thoroughly

**Open and READ all test files:**

```bash
# List all test files
ls tests/qa/<feature-name>/

# Open each test file
code tests/qa/<feature-name>/*.test.ts
```

**Understand:**
- What each test validates
- What inputs are used
- What outputs are expected
- What error conditions are tested

**Run tests and review failures:**

```bash
# Run QA suite
npm test tests/qa/<feature-name>/

# Review failure messages carefully
```

**Document the failing tests** - you'll fix these one by one.

---

### Step 6: Execute Build Iterations

Now begin the iterative "Build to Green" process.

#### 6.1 Start Iteration 1

**Select the simplest failing test** to fix first.

**Criteria for "simplest":**
- Fewest dependencies
- Most basic functionality
- Foundation for other tests

**Document iteration start:**

```bash
# Create iteration evidence file
cp ../../../templates/iteration.template.json iterations/iteration-001.json
nano iterations/iteration-001.json
```

#### 6.2 Run QA and Note Status

```bash
# Run QA
npm test tests/qa/<feature-name>/

# Note the output:
# - Total tests
# - Passing tests
# - Failing tests
```

**Record in iteration evidence**:
- `qaStatusBefore.total`
- `qaStatusBefore.passing`
- `qaStatusBefore.failing`

#### 6.3 Implement Code to Pass Test

**Implement MINIMAL code** to make the target test pass.

**Guidelines:**
- Follow architecture exactly
- Use existing patterns and conventions
- Write clean, readable code
- Add necessary imports
- Handle errors appropriately

**DO NOT:**
- Add features not in architecture
- "Improve" or "optimize" beyond spec
- Skip tests or comment them out
- Implement more than needed for this test

**Example workflow:**

```bash
# Create/edit component file
code components/Dashboard/Dashboard.tsx

# Make changes to pass the target test
# Save file
```

**Record changes in iteration evidence**:
- `codeChanges.summary`: Brief description
- `codeChanges.filesModified`: List of files
- `codeChanges.linesAdded`: Approximate count
- `codeChanges.linesRemoved`: Approximate count

#### 6.4 Run QA Again

```bash
# Run QA
npm test tests/qa/<feature-name>/

# Note the new output
```

**Check result:**
- Did target test pass? ✅
- Did any tests regress? ⚠️
- Total passing count

**Record in iteration evidence**:
- `qaStatusAfter.total`
- `qaStatusAfter.passing`
- `qaStatusAfter.failing`
- `qaStatusAfter.result`: "IMPROVED" / "NO_CHANGE" / "REGRESSED"

#### 6.5 Complete Iteration Evidence

**Add to iteration evidence:**
- `duration`: Time spent on this iteration (seconds)
- `notes`: Any observations or challenges

**Save the iteration file.**

#### 6.6 Repeat Until All Tests Pass

**Continue iterations:**

```
Iteration 2: Fix next simplest test
Iteration 3: Fix next test
...
Iteration N: Last test passes
```

**After EACH iteration:**
- Document in evidence
- Run QA
- Verify no regressions
- Continue to next test

**If 3+ iterations with NO progress:**
- STOP
- Document the issue
- Escalate to Foreman
- DO NOT continue guessing

---

### Step 7: Final Validation

When all QA tests pass, perform comprehensive validation:

#### 7.1 Full QA Suite

```bash
# Run complete QA suite
npm test tests/qa/<feature-name>/

# Verify 100% passing
# No failures
# No errors
# No skipped tests
```

**Expected output:**
```
Tests: X passed, X total
```

**If ANY test fails → Go back to iterations**

#### 7.2 TypeScript Compilation

```bash
# Run TypeScript compiler
npx tsc --noEmit

# Verify no errors
```

**Expected output:**
```
(No output = success)
```

**If errors → Fix them → Re-run QA**

#### 7.3 Lint Check

```bash
# Run ESLint
npm run lint

# Verify zero errors, zero warnings
```

**Expected output:**
```
✨ No problems found
```

**If errors/warnings → Fix them → Re-run QA**

#### 7.4 Build Check

```bash
# Run build
npm run build

# Verify build succeeds
```

**Expected output:**
```
✓ Compiled successfully
```

**If build fails → Fix issues → Re-run QA**

#### 7.5 Zero Test Debt Verification

**Manual check:**

- [ ] No .skip() in test files
- [ ] No .todo() in test files
- [ ] No commented-out tests
- [ ] No TODO comments in tests
- [ ] All tests have assertions
- [ ] Test helpers are fully implemented (no stubs)

**If ANY test debt found → Fix it → Re-run QA**

#### 7.6 Interface Integrity (QIC-7)

**Manual check:**

- [ ] All Record<UnionType, T> objects have all union values as keys
- [ ] All imports reference exported members
- [ ] No breaking changes without CS2 approval

**Run pre-build validation if script exists:**

```bash
# If this script exists, run it
./scripts/pre-build-validation.sh
```

#### 7.7 Document Final Validation

```bash
# Create final validation evidence
cp ../../../templates/validation-results.template.json final-validation.json
nano final-validation.json
```

**Document that ALL checks passed:**
- QA: 100% passing ✅
- TypeScript: compiles ✅
- Lint: zero errors/warnings ✅
- Build: succeeds ✅
- Test debt: zero ✅
- Interface integrity: validated ✅

---

### Step 8: Create Completion Report

#### 8.1 Generate Completion Report

```bash
# Copy template
cp ../../../templates/completion-report.template.md completion-report.md

# Open in editor
code completion-report.md
```

#### 8.2 Fill in All Sections

Replace all placeholders (`{taskId}`, `{totalIterations}`, etc.) with actual values:

- **Task Information**: Task ID, timestamps, duration
- **Build Summary**: Status, iterations, builder info
- **Instruction Received**: Copy exact instruction
- **Architecture**: Location and components
- **QA Results**: Initial and final status
- **Test Progression**: Table showing iteration progress
- **Build Quality Validation**: All checkboxes checked
- **Code Changes**: Files modified, lines changed
- **Evidence Location**: Path to evidence directory
- **Governance Compliance**: All checkboxes checked
- **Acceptance Criteria**: List with all checked
- **Builder Notes**: Your observations

#### 8.3 Save and Review

**Review completion report** to ensure:
- All sections filled in
- No placeholders remaining
- All checkboxes checked
- Evidence location correct
- Professional and clear

---

### Step 9: Commit Changes

#### 9.1 Review Changes

```bash
# Check git status
git status

# Review diff
git diff

# Verify only relevant files changed
```

**Check that you're NOT committing:**
- Build artifacts (`.next/`, `dist/`)
- Dependencies (`node_modules/`)
- Sensitive data
- Protected files (governance, constitutional)

#### 9.2 Stage Changes

```bash
# Stage source code changes
git add app/ components/ lib/ tests/

# Stage evidence
git add foreman/evidence/builds/$TASK_ID/

# Review staged changes
git diff --staged
```

#### 9.3 Commit

```bash
# Commit with descriptive message
git commit -m "feat: <feature-name> - Build to Green complete

- Implemented <component-list>
- All QA tests passing (X/X)
- Zero test debt
- Evidence: foreman/evidence/builds/$TASK_ID/

Task: $TASK_ID"
```

---

### Step 10: Report Completion to Foreman

#### 10.1 Create Completion Message

**Format:**

```json
{
  "type": "completion",
  "taskId": "<task-id>",
  "status": "complete",
  "message": "Build to Green: SUCCESS - All tests passing",
  "details": {
    "totalIterations": <N>,
    "totalTime": "<X minutes>",
    "qaStatus": "GREEN",
    "testsTotal": <X>,
    "testsPassing": <X>,
    "testsFailing": 0,
    "buildQuality": "PASS",
    "evidenceLocation": "foreman/evidence/builds/<task-id>/"
  },
  "timestamp": "<ISO 8601 timestamp>"
}
```

#### 10.2 Notify Foreman

**Via GitHub:**
- Comment on issue with completion message
- Reference the commit SHA
- Link to evidence directory

**Via Direct Communication:**
- Send completion message
- Wait for acknowledgment

---

### Step 11: Create Pull Request

#### 11.1 Push Branch

```bash
# Push your branch
git push origin <branch-name>
```

#### 11.2 Create PR

**PR Title:**
```
feat: <feature-name> - Build to Green Complete
```

**PR Description:**

```markdown
## Build to Green Completion

**Task ID**: `<task-id>`  
**Status**: ✅ COMPLETE - All tests passing (100% GREEN)

## Summary

<Brief summary of what was built>

## QA Results

- **Total Tests**: X
- **Passing**: X (100%)
- **Failing**: 0

## Build Quality

- ✅ TypeScript compilation passes
- ✅ Lint passes (zero errors, zero warnings)
- ✅ Build succeeds
- ✅ Zero test debt

## Evidence

Complete evidence trail: `foreman/evidence/builds/<task-id>/`

See: [Completion Report](foreman/evidence/builds/<task-id>/completion-report.md)

## Governance Compliance

- ✅ Build Philosophy followed
- ✅ Architecture followed exactly
- ✅ Governance Supremacy Rule enforced
- ✅ Quality Integrity Contract maintained
- ✅ Zero Test Debt Rule enforced

## Ready for Validation

This PR is ready for Foreman validation and merge approval.
```

#### 11.3 Request Review

- Request Foreman as reviewer
- Add relevant labels
- Link to original issue

---

## Operational Checklist

**Print this and check off as you go:**

### Pre-Build
- [ ] Instruction received
- [ ] Instruction format validated ("Build to Green")
- [ ] Architecture document exists
- [ ] QA suite exists and is RED
- [ ] Evidence directory created
- [ ] Build initiation evidence created
- [ ] Validation results documented

### Build Execution
- [ ] Architecture read and understood
- [ ] QA tests read and understood
- [ ] Iteration 1 completed and documented
- [ ] Iteration 2 completed and documented
- [ ] ... (continue for each iteration)
- [ ] All QA tests passing

### Final Validation
- [ ] Full QA suite: 100% passing
- [ ] TypeScript: compiles without errors
- [ ] Lint: zero errors, zero warnings
- [ ] Build: succeeds
- [ ] Test debt: verified zero
- [ ] Interface integrity: validated
- [ ] Final validation documented

### Completion
- [ ] Completion report created
- [ ] All evidence complete
- [ ] Changes committed
- [ ] Foreman notified
- [ ] PR created
- [ ] Review requested

---

## Common Issues and Solutions

### Issue: "I don't understand the architecture"

**Solution:**
1. Re-read architecture carefully
2. Make notes of specific unclear points
3. DO NOT guess or interpret
4. Escalate to Foreman with specific questions

### Issue: "Test seems wrong or mis-specified"

**Solution:**
1. Double-check your understanding
2. Re-read architecture
3. Verify test expectations
4. If still appears wrong → Escalate to Foreman
5. DO NOT modify test without approval

### Issue: "3 iterations, no progress"

**Solution:**
1. STOP immediately
2. Review your approach
3. Document what you've tried
4. Create escalation report
5. Notify Foreman
6. WAIT for guidance

### Issue: "Tests pass but feature doesn't work"

**Solution:**
1. This indicates QA is incomplete
2. Document the gap
3. Escalate to Foreman
4. DO NOT "fix" without new tests

### Issue: "Need to modify constitutional file"

**Solution:**
1. STOP immediately
2. DO NOT modify the file
3. Return GovernanceViolation error
4. Escalate to Foreman with CS2 requirement

---

## Quick Command Reference

```bash
# Run QA
npm test tests/qa/<feature-name>/

# Run TypeScript check
npx tsc --noEmit

# Run lint
npm run lint

# Run build
npm run build

# Check git status
git status

# Stage changes
git add <files>

# Commit
git commit -m "<message>"

# Push
git push origin <branch>

# Create evidence directory
mkdir -p foreman/evidence/builds/<task-id>/iterations
```

---

## Final Reminders

**As a human builder, you MUST:**

1. ✅ Follow the Build Philosophy exactly
2. ✅ Validate instruction before starting
3. ✅ Follow architecture exactly
4. ✅ Make ALL tests pass (100%)
5. ✅ Maintain ZERO test debt
6. ✅ Document ALL iterations
7. ✅ Create complete evidence trail
8. ✅ Perform final validation thoroughly
9. ✅ Escalate when appropriate
10. ✅ Never modify protected files

**You are accountable for:**
- Quality of implementation
- Completeness of evidence
- Governance compliance
- Communication with Foreman

**Remember:**
- QA defines correctness
- Architecture defines requirements
- Evidence proves you followed the process
- 100% green is the only acceptable outcome

---

## Support

**If you need help:**

1. Check this guide
2. Check canonical builder contract (`.github/agents/builder-agent.md`)
3. Check Build Philosophy (`BUILD_PHILOSOPHY.md`)
4. Check troubleshooting section above
5. If still stuck → Escalate to Foreman

**Do NOT:**
- Guess or assume
- Skip steps
- Bypass validation
- Create test debt
- Modify protected files

---

**Version**: 1.0.0  
**Last Updated**: 2025-12-15  
**For**: Human operators acting as builders

---

*Good luck with your build! Follow this guide exactly, and you'll deliver a perfect, one-time, fully functional build.* 🎯

---

*END OF HUMAN BUILDER OPERATOR GUIDE*

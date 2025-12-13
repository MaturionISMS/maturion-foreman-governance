# QA-First Workflow: Architecture → Red QA → Build to Green

## Overview

This document defines the **operational workflow** for the QA-First, Architecture-Driven build process. It is the step-by-step procedure that Foreman follows for every build.

**Core Process**: Architecture Design → Red QA Creation → Build to Green → Validation

---

## Workflow Phases

### Phase 1: Architecture Design

**Trigger**: New requirement from Johan or identified architectural gap

**Foreman Actions**:

1. **Understand Requirement**
   - Parse Johan's request
   - Identify scope and objectives
   - Ask clarifying questions if needed

2. **Design/Update Architecture**
   - Update `foreman/true-north-architecture.md` if needed
   - Create detailed architecture specification for this requirement
   - Document in appropriate location (module-specific or feature-specific)

3. **Architecture Content Must Include**:
   - Complete component structure
   - Data flows and interactions
   - UI/UX specifications (if applicable)
   - API contracts (if applicable)
   - State management approach
   - Error handling strategy
   - Security considerations
   - Performance requirements
   - Testing strategy
   - All aspects from Architecture Design Checklist

4. **Validate Against Architecture Checklist**
   - Open `/foreman/architecture-design-checklist.md`
   - Go through each relevant category
   - Verify each checklist item is addressed
   - Document validation results

5. **Architecture Completeness Gate**
   ```
   IF all relevant checklist items addressed:
     → Architecture COMPLETE ✅
     → Proceed to Phase 2
   ELSE:
     → Architecture INCOMPLETE ❌
     → Complete missing items
     → Re-validate against checklist
     → Do NOT proceed to Phase 2
   ```

**Outputs**:
- Complete architecture specification
- Architecture checklist validation report
- Ready for QA creation

---

### Phase 2: Red QA Creation

**Prerequisite**: Phase 1 complete (architecture validated)

**Foreman Actions**:

1. **Analyze Architecture for Test Requirements**
   - Identify all components/features in architecture
   - Identify all data flows
   - Identify all user interactions
   - Identify all error scenarios
   - Identify all edge cases

2. **Design Comprehensive QA Suite**
   - **For each architectural component**: Create unit tests
   - **For each data flow**: Create integration tests
   - **For each user interaction**: Create E2E tests
   - **For each API endpoint**: Create API tests
   - **For each error scenario**: Create error handling tests
   - **For each edge case**: Create edge case tests

3. **QA Suite Structure**
   ```
   qa-suite-name/
   ├── unit-tests/
   │   ├── component-1.test.ts
   │   ├── component-2.test.ts
   │   └── utils.test.ts
   ├── integration-tests/
   │   ├── data-flow-1.test.ts
   │   └── api-integration.test.ts
   ├── e2e-tests/
   │   └── user-journey.test.ts
   └── qa-manifest.json
   ```

4. **QA Manifest Creation**
   ```json
   {
     "qa_suite_name": "dashboard-health-metrics",
     "architecture_reference": "foreman/architecture/dashboard.md",
     "created": "2025-12-10T08:00:00Z",
     "total_tests": 15,
     "test_categories": {
       "unit": 8,
       "integration": 4,
       "e2e": 3
     },
     "expected_status": "RED",
     "reason": "Tests verify architecture that is not yet implemented"
   }
   ```

5. **Write Test Code**
   - Write actual test files
   - Tests should be **specific and measurable**
   - Tests should **fail** because implementation doesn't exist yet
   - Tests should have **clear assertion messages**

6. **Run QA Suite (Expect Red)**
   ```bash
   npm run test -- qa-suite-name
   ```
   
   Expected output:
   ```
   Test Suites: 1 failed, 0 passed, 1 total
   Tests:       15 failed, 0 passed, 15 total
   
   FAIL qa-suite-name/unit-tests/component-1.test.ts
     ✕ Dashboard component renders correctly
     ✕ MetricCard displays health score
     ...
   
   Status: RED ✅ (This is expected - architecture defined, implementation missing)
   ```

7. **Document Red QA**
   - Save QA output to file
   - Create QA report showing all failing tests
   - Document why each test is failing (expected - no implementation yet)

8. **Test Helper Validation** (NEW - Constitutional Amendment 2025-12-13)
   ```
   BEFORE documenting Red QA as complete:
   
   1. Review all test helper functions
   2. Verify each helper is FULLY implemented (no stubs, no TODOs)
   3. Verify each helper generates VARIED data (not uniform)
   4. Verify each helper handles edge cases
   5. Confirm test isolation works (cleanup between tests)
   6. Run helper validation tests if available
   
   Test Helper Quality Gate:
   - [ ] All helpers fully implemented
   - [ ] Helpers generate appropriate varied data
   - [ ] Helpers match their function names/documentation
   - [ ] No "TODO" or placeholder implementations
   - [ ] Test setup/teardown is complete
   - [ ] Test isolation is guaranteed
   
   IF any item fails:
     → Red QA is INCOMPLETE
     → Fix test helpers IMMEDIATELY
     → Re-validate
     → Do NOT proceed to Phase 3
   
   See: /foreman/governance/test-helper-functions-governance.md
   ```

9. **Red QA Completeness Validation**
   ```
   Checklist:
   - [ ] Every architectural component has tests
   - [ ] Every data flow has tests
   - [ ] Every user interaction has tests
   - [ ] Every error scenario has tests
   - [ ] Every edge case has tests
   - [ ] All tests are currently RED (failing)
   - [ ] Test failures are EXPECTED (no implementation)
   - [ ] Each test has clear acceptance criteria
   - [ ] All test helper functions are COMPLETE (NEW)
   - [ ] Test helpers generate VARIED data (NEW)
   
   IF all items checked:
     → Red QA COMPLETE ✅
     → Proceed to Phase 3
   ELSE:
     → Red QA INCOMPLETE ❌
     → Add missing tests OR complete test helpers
     → Re-validate
     → Do NOT proceed to Phase 3
   ```

**Outputs**:
- Complete QA test suite (all red/failing)
- QA manifest documenting tests
- QA execution report showing red status
- Ready for build instructions

---

### Phase 3: Build to Green Instructions

**Prerequisite**: Phase 2 complete (Red QA exists and validated)

**Foreman Actions**:

1. **Prepare Build Package**
   ```json
   {
     "build_instruction": "Build to Green",
     "architecture": {
       "reference": "foreman/architecture/dashboard.md",
       "summary": "Dashboard showing project health metrics..."
     },
     "qa_suite": {
       "name": "dashboard-health-metrics",
       "location": "tests/qa/dashboard-health-metrics/",
       "current_status": "RED",
       "total_tests": 15,
       "passing_tests": 0,
       "failing_tests": 15
     },
     "acceptance_criteria": "All 15 tests must pass (green)",
     "builder_type": "ui",
     "priority": "normal"
   }
   ```

2. **Validate Build Package**
   - Architecture reference exists ✓
   - QA suite exists ✓
   - QA suite is RED (failing) ✓
   - Instruction is "Build to Green" ✓
   - Acceptance criteria is clear ✓

3. **Select Appropriate Builder**
   - Based on build type (UI, API, Schema, Integration)
   - Based on complexity (GitHub Copilot Builder vs Local Builder)
   - Based on scope (single component vs multi-module)

4. **Issue Build Instruction to Builder**
   ```
   POST /api/builder/{builder-type}
   {
     "instruction": "Build to Green",
     "architecture": {...},
     "qa_suite": {...},
     "acceptance_criteria": "All tests pass (100% green)"
   }
   ```

5. **Builder Validation (Builder's Responsibility)**
   
   Builder must validate:
   ```typescript
   function validateBuildInstruction(instruction) {
     // RULE 1: Instruction must be "Build to Green"
     if (instruction.build_instruction !== "Build to Green") {
       throw new Error(
         "Build Philosophy Violation: Only 'Build to Green' instructions accepted"
       )
     }
     
     // RULE 2: Architecture must exist
     if (!instruction.architecture) {
       throw new Error(
         "Build Philosophy Violation: Architecture required for building"
       )
     }
     
     // RULE 3: Red QA must exist
     if (!instruction.qa_suite) {
       throw new Error(
         "Build Philosophy Violation: Red QA required. Cannot build without failing tests."
       )
     }
     
     // RULE 4: QA must be RED (failing)
     if (instruction.qa_suite.current_status !== "RED") {
       throw new Error(
         "Build Philosophy Violation: QA must be RED (failing). Green QA means nothing to build."
       )
     }
     
     // RULE 5: Acceptance criteria must be clear
     if (!instruction.acceptance_criteria) {
       throw new Error(
         "Build Philosophy Violation: Acceptance criteria required"
       )
     }
     
     // All validations passed
     return true
   }
   ```

6. **Monitor Build Progress**
   - Foreman monitors builder activity
   - Builders report progress periodically
   - Foreman logs build events to governance memory

**Outputs**:
- Build instruction sent to builder
- Builder acknowledged and validated instruction
- Build in progress

---

### Phase 4: Builder Execution (Builder's Workflow)

**Prerequisite**: Valid "Build to Green" instruction received

**Builder Actions**:

1. **Acknowledge Build Instruction**
   ```
   Received: Build to Green instruction
   QA Suite: dashboard-health-metrics
   Current Status: RED (0/15 passing)
   Objective: Implement code to make all 15 tests pass
   ```

2. **Iterative Build-to-Green Loop**
   ```
   WHILE (QA is not 100% green):
     1. Identify next failing test
     2. Read test to understand requirement
     3. Implement code to make test pass
     4. Run test
     5. IF test passes:
          → Move to next failing test
        ELSE:
          → Debug and fix implementation
          → Repeat step 4
   ```

3. **Test-Driven Implementation**
   ```typescript
   // Example iteration:
   
   // Failing Test:
   test('Dashboard component renders correctly', () => {
     render(<Dashboard />)
     expect(screen.getByRole('heading')).toHaveTextContent('Project Health')
   })
   
   // Builder implements:
   export function Dashboard() {
     return (
       <div>
         <h1>Project Health</h1>
         {/* ... more implementation ... */}
       </div>
     )
   }
   
   // Run test → PASS ✓
   // Move to next test
   ```

4. **Follow Architecture Exactly**
   - Implementation must match architecture specifications
   - No deviation from architectural design
   - No adding features not in architecture/QA
   - No skipping architectural requirements

5. **Run Full QA After Each Component**
   ```bash
   npm run test -- qa-suite-name
   ```
   
   Track progress:
   ```
   Iteration 1: 0/15 passing (0%)
   Iteration 2: 3/15 passing (20%)
   Iteration 3: 7/15 passing (47%)
   ...
   Iteration N: 15/15 passing (100%) ✓
   ```

6. **Build Complete When QA is Green**
   ```
   Test Suites: 1 passed, 1 total
   Tests:       15 passed, 15 total
   
   Status: GREEN ✅
   Build Complete: All acceptance criteria met
   ```

7. **Report Build Completion to Foreman**
   ```json
   {
     "status": "complete",
     "qa_suite": "dashboard-health-metrics",
     "qa_status": "GREEN",
     "tests_passing": 15,
     "tests_total": 15,
     "pass_rate": "100%",
     "artifacts": [
       "components/Dashboard.tsx",
       "components/MetricCard.tsx",
       "lib/api/health.ts"
     ]
   }
   ```

**Outputs**:
- Implementation code (all artifacts)
- QA status: GREEN (100% passing)
- Build completion report

---

### Phase 5: Foreman Validation

**Prerequisite**: Builder reports "Build Complete, QA Green"

**Foreman Actions**:

1. **Independent QA Verification**
   ```bash
   # Foreman runs QA independently to verify builder's claim
   npm run test -- qa-suite-name
   ```

2. **Validate QA Results**
   ```
   Expected: 15/15 tests passing (100%)
   Actual:   ?/15 tests passing (?%)
   
   IF Actual === Expected:
     → QA Verification PASS ✅
   ELSE:
     → QA Verification FAIL ❌
     → Builder made an error
     → Return to Phase 4 with failing tests
   ```

3. **Run Additional Quality Checks**
   - Lint check: `npm run lint`
   - Type check: `npm run type-check`
   - Build check: `npm run build`
   - All must pass with zero errors, zero warnings

4. **Validate Against Original Architecture**
   - Review implemented code
   - Compare with architecture specification
   - Ensure architectural requirements met
   - No deviation from design

5. **QA-of-QA Meta-Review**
   - Were all architectural aspects tested?
   - Were tests comprehensive enough?
   - Did tests catch implementation issues?
   - Is QA suite itself valid?

6. **Final Validation Report**
   ```markdown
   ## Build Validation Report
   
   Requirement: Dashboard showing project health metrics
   Build ID: build-2025-12-10-001
   
   ### QA Validation: ✅ PASS
   - Tests passing: 15/15 (100%)
   - Zero errors: ✓
   - Zero warnings: ✓
   
   ### Quality Checks: ✅ PASS
   - Lint: ✓ No issues
   - Type check: ✓ No errors
   - Build: ✓ Success
   
   ### Architecture Compliance: ✅ PASS
   - All components implemented: ✓
   - Architecture followed exactly: ✓
   - No deviations: ✓
   
   ### QA-of-QA: ✅ PASS
   - Test coverage complete: ✓
   - Tests comprehensive: ✓
   - QA suite valid: ✓
   
   ### Overall Result: ✅ BUILD VALIDATED
   Ready for merge gate checks.
   ```

7. **Validation Decision**
   ```
   IF all validations PASS:
     → Proceed to Phase 6 (Merge Gate)
   ELSE:
     → Identify failures
     → Determine if architecture issue or implementation issue
     → Return to appropriate phase:
       - Architecture issue → Phase 1
       - QA issue → Phase 2
       - Implementation issue → Phase 4
   ```

**Outputs**:
- Build validation report
- Decision: Ready for merge OR needs fixes

---

### Phase 6: Merge Gate Checks

**Prerequisite**: Phase 5 complete (Build validated by Foreman)

**Automated Merge Gate Actions**:

1. **Gate 1: Architecture Checklist Exists**
   ```
   Check: Does architecture checklist validation exist?
   Location: Build artifacts or governance memory
   Required: Complete checklist validation showing all items addressed
   
   IF exists and complete:
     → PASS ✅
   ELSE:
     → FAIL ❌ - Block merge
   ```

2. **Gate 2: Red QA Evidence Exists**
   ```
   Check: Is there evidence of Red QA before building?
   Location: Build logs, QA reports
   Required: QA execution showing RED status before build started
   
   IF Red QA evidence exists:
     → PASS ✅
   ELSE:
     → FAIL ❌ - Block merge
     → Violation: Builder may have built without Red QA
   ```

3. **Gate 3: Build Instructions Were "Build to Green"**
   ```
   Check: What instruction format was used?
   Location: Build logs, builder task records
   Required: Instruction must be exactly "Build to Green"
   
   IF instruction === "Build to Green":
     → PASS ✅
   ELSE:
     → FAIL ❌ - Block merge
     → Violation: Incorrect instruction format used
   ```

4. **Gate 4: Final QA is 100% Green**
   ```
   Check: Run QA suite one final time
   Command: npm run test -- qa-suite-name
   Required: 100% tests passing, zero errors, zero warnings
   
   IF 100% green:
     → PASS ✅
   ELSE:
     → FAIL ❌ - Block merge
     → QA regression detected
   ```

5. **Gate 5: All Quality Checks Pass**
   ```
   Checks:
   - Lint: npm run lint
   - Type check: npm run type-check  
   - Build: npm run build
   
   Required: All must pass with zero errors, zero warnings
   
   IF all pass:
     → PASS ✅
   ELSE:
     → FAIL ❌ - Block merge
   ```

6. **Gate 6: No Governance Violations**
   ```
   Check: Scan for governance violations
   - No secrets in code
   - No QA suppressions added
   - No protected files modified
   - Governance rules followed
   
   IF no violations:
     → PASS ✅
   ELSE:
     → FAIL ❌ - Block merge
   ```

7. **Merge Decision**
   ```
   IF all 6 gates PASS:
     → MERGE ALLOWED ✅
     → Create PR or auto-merge (depending on config)
   ELSE:
     → MERGE BLOCKED ❌
     → Document which gates failed
     → Return to appropriate phase to fix
   ```

**Outputs**:
- Merge gate report (all gates status)
- Merge decision: ALLOWED or BLOCKED
- If allowed: PR created or merged
- If blocked: Detailed failure reasons

---

## Phase 7: Learning Loop (Post-Merge)

**Trigger**: Build merged and deployed to production/staging

**Foreman Actions**:

1. **Monitor Production/UI**
   - Wait for Johan's feedback
   - Monitor for error reports
   - Check system logs

2. **IF Build Works Perfectly**
   ```
   Result: ✅ SUCCESS
   Action: None needed
   Lesson: Architecture was complete, QA was comprehensive
   ```

3. **IF Build Has Issues**
   ```
   Result: ❌ ISSUE FOUND
   Example: "Dashboard doesn't show loading states"
   
   Root Cause Analysis:
   Q: Was this in architecture?
   A: No → Architecture was incomplete
   
   Q: Was this in Architecture Checklist?
   A: Yes, but was missed → Validation error
      OR
      No → Checklist was incomplete
   
   Q: Was this in QA?
   A: No → QA didn't test this aspect
   ```

4. **Update Architecture Checklist**
   ```markdown
   ## Checklist Update
   
   Date: 2025-12-10
   Issue: Dashboard missing loading states
   Root Cause: "Loading states" in checklist but missed during validation
   
   Action: 
   - Improve validation process
   - Add automated checklist validation where possible
   - Emphasize this item in future validations
   
   OR (if not in checklist):
   
   Date: 2025-12-10
   Issue: Dashboard missing empty state message customization
   Root Cause: "Empty state customization" not in checklist
   
   Action:
   - Add to UI Architecture section:
     - [ ] Empty state messages are customizable
     - [ ] Empty state actions are configurable
   ```

5. **Fix Current Build**
   ```
   Process: Return to Phase 1
   1. Update architecture to include missing aspect
   2. Add failing QA for missing aspect
   3. "Build to Green" to implement fix
   4. Validate fix
   5. Merge fix
   ```

6. **Document Learning**
   ```
   Add to governance memory:
   - What went wrong
   - Why it went wrong
   - How we fixed it
   - How we prevent it in future
   ```

**Outputs**:
- Updated Architecture Checklist (if needed)
- Fixed build (if issues found)
- Learning documentation

---

## Workflow Summary Diagram

```
┌─────────────────────────────────────────────────────────────┐
│ Phase 1: Architecture Design                                │
│ - Design architecture                                       │
│ - Validate against checklist                               │
│ - Gate: Architecture complete?                             │
└────────────────────┬────────────────────────────────────────┘
                     │ Complete ✓
                     ▼
┌─────────────────────────────────────────────────────────────┐
│ Phase 2: Red QA Creation                                    │
│ - Design comprehensive QA suite                            │
│ - Write tests (expect failures)                            │
│ - Run QA (verify RED status)                               │
│ - Gate: Red QA complete?                                   │
└────────────────────┬────────────────────────────────────────┘
                     │ Red QA exists ✓
                     ▼
┌─────────────────────────────────────────────────────────────┐
│ Phase 3: Build Instructions                                 │
│ - Prepare "Build to Green" package                         │
│ - Select builder                                           │
│ - Issue instruction                                        │
│ - Builder validates instruction                            │
└────────────────────┬────────────────────────────────────────┘
                     │ Instruction valid ✓
                     ▼
┌─────────────────────────────────────────────────────────────┐
│ Phase 4: Builder Execution                                  │
│ - Implement code                                           │
│ - Run tests iteratively                                    │
│ - Continue until 100% green                                │
│ - Report completion                                        │
└────────────────────┬────────────────────────────────────────┘
                     │ QA Green ✓
                     ▼
┌─────────────────────────────────────────────────────────────┐
│ Phase 5: Foreman Validation                                 │
│ - Re-run QA independently                                  │
│ - Run quality checks                                       │
│ - Validate architecture compliance                         │
│ - QA-of-QA review                                          │
└────────────────────┬────────────────────────────────────────┘
                     │ Validated ✓
                     ▼
┌─────────────────────────────────────────────────────────────┐
│ Phase 6: Merge Gate Checks                                  │
│ - Architecture checklist exists?                           │
│ - Red QA evidence exists?                                  │
│ - "Build to Green" instruction?                            │
│ - Final QA 100% green?                                     │
│ - Quality checks pass?                                     │
│ - No governance violations?                                │
└────────────────────┬────────────────────────────────────────┘
                     │ All gates pass ✓
                     ▼
┌─────────────────────────────────────────────────────────────┐
│ MERGE ALLOWED                                               │
│ - Create PR or auto-merge                                  │
│ - Deploy to environment                                    │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│ Phase 7: Learning Loop                                      │
│ - Monitor production                                       │
│ - IF issues: Update checklist                             │
│ - Fix and prevent recurrence                              │
└─────────────────────────────────────────────────────────────┘
```

---

## Success Criteria for Each Phase

| Phase | Success Criteria |
|-------|-----------------|
| 1. Architecture | All checklist items addressed, architecture detailed and complete |
| 2. Red QA | All architectural aspects have tests, QA is RED (failing) |
| 3. Build Instructions | "Build to Green" sent with Red QA, builder validated |
| 4. Builder Execution | Implementation complete, QA is GREEN (100% passing) |
| 5. Foreman Validation | Independent verification confirms green QA and quality |
| 6. Merge Gate | All 6 gates pass, no violations |
| 7. Learning Loop | Checklist updated if needed, knowledge captured |

---

## Conclusion

This workflow ensures:
- ✅ Complete architecture before building
- ✅ Comprehensive QA before building  
- ✅ Builders only "Build to Green"
- ✅ One-time fully functional builds
- ✅ Continuous improvement through learning

**Every build follows this workflow. No exceptions.**

---

*Version*: 1.0  
*Authority*: Build Philosophy  
*Status*: Active and Enforced  
*Last Updated*: 2025-12-10

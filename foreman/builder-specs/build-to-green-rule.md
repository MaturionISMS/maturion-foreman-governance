# Build to Green Only Rule

## Purpose

This document defines the **absolute constraint** that all builder agents must follow: **Builders ONLY accept "Build to Green" instructions and ONLY build when failing QA (Red QA) exists.**

This rule ensures that all building is driven by architecture and validated by QA, preventing random code generation or feature implementation without proper specification.

---

## The Rule (Immutable)

**Builders SHALL NOT build code unless ALL of the following conditions are met:**

1. ✅ Build instruction is exactly: **"Build to Green"**
2. ✅ Architecture specification is provided
3. ✅ QA test suite is provided
4. ✅ QA test suite status is **RED (failing)**
5. ✅ Acceptance criteria is clearly defined

**If ANY condition is not met → Builder MUST REJECT the build request**

---

## Validation Logic (Required in All Builders)

Every builder must implement this validation at the start of task processing:

```typescript
/**
 * Build to Green validation
 * MUST be called before any building begins
 * Throws error if validation fails
 */
function validateBuildToGreenInstruction(request: BuildRequest): void {
  
  // VALIDATION 1: Instruction format
  if (request.instruction !== "Build to Green") {
    throw new BuildPhilosophyViolation(
      "REJECTED: Invalid build instruction",
      {
        received: request.instruction,
        required: "Build to Green",
        reason: "Builders only accept 'Build to Green' instructions",
        philosophy: "Build Philosophy requires QA-driven building",
        action: "Foreman must provide 'Build to Green' instruction with Red QA"
      }
    )
  }
  
  // VALIDATION 2: Architecture exists
  if (!request.architecture) {
    throw new BuildPhilosophyViolation(
      "REJECTED: No architecture provided",
      {
        reason: "Builders require architecture specification to build against",
        philosophy: "Architecture defines what 'correct' means",
        action: "Foreman must design architecture before creating build request"
      }
    )
  }
  
  // VALIDATION 3: QA suite exists
  if (!request.qa_suite) {
    throw new BuildPhilosophyViolation(
      "REJECTED: No QA suite provided",
      {
        reason: "Builders require failing QA to know what to build",
        philosophy: "Red QA is the build specification",
        action: "Foreman must create comprehensive QA suite before building"
      }
    )
  }
  
  // VALIDATION 4: QA status is RED (failing)
  if (request.qa_suite.current_status !== "RED") {
    throw new BuildPhilosophyViolation(
      "REJECTED: QA must be RED (failing)",
      {
        qa_status: request.qa_suite.current_status,
        required: "RED",
        reason: "Cannot build to green if QA is already green",
        philosophy: "Red QA means 'architecture exists, implementation missing'",
        action: request.qa_suite.current_status === "GREEN" 
          ? "QA is already green. Nothing to build."
          : "Foreman must run QA to verify it's failing before building"
      }
    )
  }
  
  // VALIDATION 5: Acceptance criteria defined
  if (!request.acceptance_criteria) {
    throw new BuildPhilosophyViolation(
      "REJECTED: No acceptance criteria provided",
      {
        reason: "Builders require clear definition of 'done'",
        philosophy: "Acceptance criteria defines when building is complete",
        action: "Foreman must specify acceptance criteria (typically: '100% QA passing')"
      }
    )
  }
  
  // VALIDATION 6: Failing tests count > 0
  if (request.qa_suite.failing_tests === 0) {
    throw new BuildPhilosophyViolation(
      "REJECTED: No failing tests",
      {
        reason: "No failing tests means nothing to build",
        philosophy: "Failing tests define what needs to be implemented",
        action: "If QA is all passing, feature is already complete. No build needed."
      }
    )
  }
  
  // All validations passed
  console.log("[Build to Green] Validation passed ✓")
  console.log(`[Build to Green] Building to make ${request.qa_suite.failing_tests} tests pass`)
}

/**
 * Custom error for Build Philosophy violations
 */
class BuildPhilosophyViolation extends Error {
  constructor(message: string, details: Record<string, any>) {
    super(message)
    this.name = "BuildPhilosophyViolation"
    this.details = details
  }
  
  details: Record<string, any>
  
  toJSON() {
    return {
      error: this.name,
      message: this.message,
      details: this.details,
      philosophy_reference: "/BUILD_PHILOSOPHY.md",
      workflow_reference: "/foreman/qa/qa-first-workflow.md"
    }
  }
}
```

---

## Error Response Format

When a builder rejects a build request, it MUST return this structured error:

```json
{
  "success": false,
  "error": "BuildPhilosophyViolation",
  "message": "REJECTED: Invalid build instruction",
  "details": {
    "received": "Build feature X",
    "required": "Build to Green",
    "reason": "Builders only accept 'Build to Green' instructions",
    "philosophy": "Build Philosophy requires QA-driven building",
    "action": "Foreman must provide 'Build to Green' instruction with Red QA"
  },
  "philosophy_reference": "/BUILD_PHILOSOPHY.md",
  "workflow_reference": "/foreman/qa/qa-first-workflow.md",
  "timestamp": "2025-12-10T08:00:00Z"
}
```

---

## Acceptable vs Unacceptable Instructions

### ✅ ACCEPTABLE (Valid "Build to Green" Format)

```json
{
  "instruction": "Build to Green",
  "architecture": {
    "reference": "foreman/architecture/dashboard.md",
    "summary": "Dashboard component showing health metrics..."
  },
  "qa_suite": {
    "name": "dashboard-qa",
    "location": "tests/qa/dashboard/",
    "current_status": "RED",
    "total_tests": 15,
    "passing_tests": 0,
    "failing_tests": 15
  },
  "acceptance_criteria": "All 15 tests must pass (100% green)"
}
```

**Result**: Builder accepts and proceeds with building ✅

---

### ❌ UNACCEPTABLE Examples

#### Example 1: Wrong Instruction Format
```json
{
  "instruction": "Build the dashboard feature",
  "architecture": {...},
  "qa_suite": {...}
}
```

**Result**: REJECTED ❌
**Reason**: Instruction is not "Build to Green"
**Action Required**: Change instruction to "Build to Green"

---

#### Example 2: No QA Suite
```json
{
  "instruction": "Build to Green",
  "architecture": {...}
  // Missing qa_suite
}
```

**Result**: REJECTED ❌
**Reason**: No QA suite provided
**Action Required**: Foreman must create Red QA first

---

#### Example 3: QA is Already Green
```json
{
  "instruction": "Build to Green",
  "architecture": {...},
  "qa_suite": {
    "current_status": "GREEN",  // Already passing!
    "passing_tests": 15,
    "failing_tests": 0
  }
}
```

**Result**: REJECTED ❌
**Reason**: QA is already green, nothing to build
**Action Required**: If QA is green, feature is done. No build needed.

---

#### Example 4: No Failing Tests
```json
{
  "instruction": "Build to Green",
  "architecture": {...},
  "qa_suite": {
    "current_status": "RED",
    "passing_tests": 15,
    "failing_tests": 0  // Contradiction: RED but no failures?
  }
}
```

**Result**: REJECTED ❌
**Reason**: Inconsistent QA status - claims RED but no failing tests
**Action Required**: Fix QA status or add failing tests

---

## Builder Implementation Requirements

### 1. Validate Before Building

```typescript
export async function handleBuildTask(request: BuildRequest) {
  // FIRST: Validate Build to Green requirements
  try {
    validateBuildToGreenInstruction(request)
  } catch (error) {
    if (error instanceof BuildPhilosophyViolation) {
      // Return structured error to Foreman
      return {
        success: false,
        error: error.toJSON()
      }
    }
    throw error
  }
  
  // ONLY if validation passes: proceed with building
  return await buildToGreen(request)
}
```

### 2. Build Iteratively Until Green

```typescript
async function buildToGreen(request: BuildRequest) {
  let iteration = 0
  const maxIterations = 100 // Safety limit
  
  while (iteration < maxIterations) {
    iteration++
    
    // Run QA to get current status
    const qaResult = await runQA(request.qa_suite.location)
    
    // Log progress
    console.log(`[Iteration ${iteration}] QA: ${qaResult.passing}/${qaResult.total} passing`)
    
    // Check if all tests pass
    if (qaResult.passing === qaResult.total) {
      console.log(`[Build to Green] SUCCESS ✓ All tests passing after ${iteration} iterations`)
      return {
        success: true,
        iterations: iteration,
        qa_status: "GREEN",
        tests_passing: qaResult.passing,
        tests_total: qaResult.total
      }
    }
    
    // Get next failing test
    const failingTest = qaResult.failures[0]
    
    // Implement code to make this test pass
    await implementForTest(failingTest, request.architecture)
  }
  
  // Max iterations reached without success
  throw new Error(
    `Build to Green failed: Could not make all tests pass within ${maxIterations} iterations`
  )
}
```

### 3. Follow Architecture Exactly

```typescript
async function implementForTest(test: FailingTest, architecture: Architecture) {
  // Read architecture specification
  const architectureSpec = await loadArchitecture(architecture.reference)
  
  // Find relevant architectural component for this test
  const component = findRelevantComponent(test, architectureSpec)
  
  if (!component) {
    throw new Error(
      `Architecture incomplete: No specification for ${test.description}`
    )
  }
  
  // Implement according to architecture
  // DO NOT invent solutions - follow architecture exactly
  await implementComponent(component, architectureSpec)
}
```

### 4. Report Completion

```typescript
async function reportBuildCompletion(result: BuildResult) {
  return {
    status: "complete",
    build_instruction: "Build to Green",
    qa_status: result.qa_status,
    tests_passing: result.tests_passing,
    tests_total: result.tests_total,
    pass_rate: `${(result.tests_passing / result.tests_total * 100).toFixed(1)}%`,
    iterations: result.iterations,
    artifacts: result.artifacts,
    timestamp: new Date().toISOString()
  }
}
```

---

## Builder Constraints

### What Builders MUST Do

1. ✅ Validate "Build to Green" instruction before building
2. ✅ Reject requests without Red QA
3. ✅ Build iteratively until all tests pass
4. ✅ Follow architecture specifications exactly
5. ✅ Report when QA is 100% green

### What Builders MUST NOT Do

1. ❌ Build without "Build to Green" instruction
2. ❌ Build without Red QA
3. ❌ Add features not in architecture
4. ❌ Add features not in QA
5. ❌ Skip tests or reduce quality standards
6. ❌ Report completion if QA is not 100% green

---

## Integration with Builder Types

### UI Builder

**Applies to**: UI components, pages, layouts, styles

**Validation**: Same as above, plus:
- Verify UI architecture includes component specifications
- Verify QA includes component rendering tests
- Verify QA includes interaction tests

**Build to Green**: Implement components to pass UI tests

---

### API Builder

**Applies to**: API endpoints, services, middleware

**Validation**: Same as above, plus:
- Verify API architecture includes endpoint specifications
- Verify QA includes API request/response tests
- Verify QA includes error handling tests

**Build to Green**: Implement APIs to pass API tests

---

### Schema Builder

**Applies to**: Type definitions, database schemas

**Validation**: Same as above, plus:
- Verify schema architecture includes type specifications
- Verify QA includes schema validation tests

**Build to Green**: Implement schemas to pass validation tests

---

### Integration Builder

**Applies to**: External service integrations

**Validation**: Same as above, plus:
- Verify integration architecture includes service specifications
- Verify QA includes integration tests (possibly mocked)

**Build to Green**: Implement integrations to pass integration tests

---

### QA Builder

**Special Case**: QA Builder creates tests, doesn't build to pass them

**Role in Build to Green**:
- Creates the Red QA that other builders use
- Does NOT implement code to pass QA
- Validates other builders' implementations

**QA Builder receives different instruction format**:
```json
{
  "instruction": "Create Red QA",
  "architecture": {...},
  "expected_status": "RED",
  "test_coverage": "comprehensive"
}
```

---

## Enforcement Mechanisms

### 1. Code-Level Enforcement

Every builder repository MUST include:
- `lib/validation/build-to-green-validator.ts` - Validation logic
- Tests for validation logic
- Integration into builder entry point

### 2. Runtime Enforcement

Builder APIs MUST:
- Validate on every request
- Return structured errors for violations
- Log violations to governance memory

### 3. CI/CD Enforcement

Builder deployment pipelines MUST:
- Include tests that verify validation logic
- Block deployment if validation tests fail
- Verify error response format is correct

### 4. Governance Enforcement

Foreman MUST:
- Monitor builder behavior
- Detect if builders accept invalid instructions
- Escalate violations to Johan
- Block builders that violate rule

---

## Examples: Builder Enforcement in Action

### Example 1: Valid Request

**Request**:
```json
{
  "instruction": "Build to Green",
  "architecture": { "reference": "arch/dashboard.md" },
  "qa_suite": {
    "current_status": "RED",
    "failing_tests": 10
  },
  "acceptance_criteria": "100% passing"
}
```

**Builder Response**:
```
[Build to Green] Validation passed ✓
[Build to Green] Building to make 10 tests pass
[Iteration 1] QA: 0/10 passing
[Iteration 2] QA: 3/10 passing
...
[Iteration 8] QA: 10/10 passing
[Build to Green] SUCCESS ✓ All tests passing after 8 iterations
```

**Result**: Build succeeds ✅

---

### Example 2: Invalid Request (No QA)

**Request**:
```json
{
  "instruction": "Build the dashboard",
  "architecture": { "reference": "arch/dashboard.md" }
}
```

**Builder Response**:
```json
{
  "success": false,
  "error": "BuildPhilosophyViolation",
  "message": "REJECTED: No QA suite provided",
  "details": {
    "reason": "Builders require failing QA to know what to build",
    "philosophy": "Red QA is the build specification",
    "action": "Foreman must create comprehensive QA suite before building"
  }
}
```

**Result**: Build rejected ❌

---

### Example 3: Invalid Request (Green QA)

**Request**:
```json
{
  "instruction": "Build to Green",
  "architecture": { "reference": "arch/dashboard.md" },
  "qa_suite": {
    "current_status": "GREEN",
    "passing_tests": 10,
    "failing_tests": 0
  }
}
```

**Builder Response**:
```json
{
  "success": false,
  "error": "BuildPhilosophyViolation",
  "message": "REJECTED: QA must be RED (failing)",
  "details": {
    "qa_status": "GREEN",
    "required": "RED",
    "reason": "Cannot build to green if QA is already green",
    "action": "QA is already green. Nothing to build."
  }
}
```

**Result**: Build rejected ❌

---

## Monitoring and Compliance

### Builder Compliance Metrics

Track for each builder:
- **Validation Rate**: % of requests that pass validation
- **Rejection Rate**: % of requests rejected for philosophy violations
- **Violation Types**: Distribution of violation reasons
- **False Accepts**: Instances where builder accepted invalid request (should be 0)

### Audit Trail

Every build request MUST be logged:
```json
{
  "timestamp": "2025-12-10T08:00:00Z",
  "builder": "ui-builder",
  "validation": "PASS",
  "instruction": "Build to Green",
  "qa_status": "RED",
  "result": "Build succeeded",
  "iterations": 8,
  "final_qa_status": "GREEN"
}
```

### Escalation

If builder accepts invalid request:
1. Log violation to governance memory
2. Alert Foreman
3. Investigate why validation failed
4. Fix builder validation logic
5. Deploy fix immediately

---

## Summary

**The Rule**: Builders ONLY accept "Build to Green" instructions with Red QA

**The Validation**: 6-point validation checks every request

**The Process**: Iterative building until 100% QA green

**The Enforcement**: Code-level, runtime, CI/CD, and governance

**The Result**: All building is architecture-driven and QA-validated

---

**This rule is ABSOLUTE and applies to ALL builders without exception.**

---

*Version*: 1.0  
*Authority*: Build Philosophy  
*Status*: Active and Enforced  
*Last Updated*: 2025-12-10

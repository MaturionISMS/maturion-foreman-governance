# VALIDATOR CONVERGENCE CHECKLIST

## Status
Governance Process Definition  
Version: v1  
Authority: Johan Ras  
Applies To: All Validators (CS1-CS6, GSR, QIEL, Build Philosophy)  
Scope: Maturion Platform  
Source of Truth: `maturion/canon/BOOTSTRAP_CANON.md`

---

## 1. Purpose

This document defines the **mandatory validator convergence requirements** to ensure all validators follow consistent, predictable, and terminal pass/fail rules across the Maturion governance ecosystem.

This is a **governance definition only**.  
- It defines **what** validator convergence means  
- It defines **mandatory checks** all validators must implement  
- It defines **terminal pass/fail rules** with no ambiguity  
- It does **not** define execution logic, CI automation, or enforcement mechanisms  
- Implementation responsibility remains with builder agents per canonical governance

**Key Principle**:  
Validators must converge on identical terminal state semantics to ensure governance gates provide consistent, auditable, and trustworthy enforcement.

---

## 2. Governance Authority and Canon Sources

This checklist operates **downstream** from and in **full alignment** with:

1. **Primary Canon**: `maturion/canon/BOOTSTRAP_CANON.md` (when created)  
   - Defines bootstrap requirements and validator foundations  
   - Establishes validator terminal state invariants  
   - Defines validator convergence as a core governance requirement

2. **Governance Canon**: `governance/canon/GOVERNANCE_PURPOSE_AND_SCOPE.md`  
   - Defines One-Time Build Law  
   - Establishes QA-as-Proof requirements  
   - Defines evidence-driven validation

3. **Gate Canon**: `GOVERNANCE_GATE_CANON.md`  
   - Defines gate execution point (PR merge time only)  
   - Establishes evidence-based validation requirements  
   - Defines zero-tolerance enforcement

4. **Learning Workflow**: `maturion/process/LESSONS_TO_CANON_WORKFLOW.md`  
   - Defines how validator failures inform canonical learning  
   - Establishes promotion criteria for validator improvements  
   - Ensures continuous validator improvement without regression

**Authority Hierarchy**:  
If conflict exists between this document and higher canonical governance, **higher canon prevails**.

---

## 3. What is Validator Convergence?

**Validator Convergence** is the state where all validators across the Maturion ecosystem implement **identical terminal pass/fail semantics**, ensuring:

- Predictable outcomes (no ambiguity in PASS vs FAIL)  
- Auditable decisions (every outcome traceable to specific violations)  
- Terminal states (FAIL is never overwritten or recomputed)  
- Consistent structure (same violation schema, same checks format)  
- Fail-safe defaults (missing infrastructure causes FAIL, not crash)

### 3.1 Why Convergence Matters

**Without convergence**:
- Gate decisions become unpredictable  
- Audit trails become incomplete  
- Failures may be masked by recovery logic  
- Evidence may be inconsistent across validators  
- Trust in governance enforcement degrades

**With convergence**:
- All validators speak the same "language" of compliance  
- Gate executor can trust validator outputs uniformly  
- Audit trails are complete and consistent  
- Failures are always terminal and visible  
- Governance enforcement is trustworthy

### 3.2 Convergence is Not Implementation Uniformity

Validators may differ in:
- What they check (CS1 checks constitution, QIEL checks quality metrics)  
- How they detect violations (file scanning vs. API calls vs. test execution)  
- What evidence they collect (files, logs, metrics)

Validators must be identical in:
- **Status semantics**: PASS/FAIL meaning and terminal behavior  
- **Violation structure**: Same schema for reporting violations  
- **Checks structure**: Same schema for reporting detailed check results  
- **Failure handling**: Missing dependencies always cause FAIL  
- **No recomputation**: Final status is never recalculated after violations detected

---

## 4. Mandatory Validator Checks (Convergence Requirements)

All validators **MUST** implement the following checks to achieve convergence.

### 4.1 Status Initialization (MANDATORY)

**Requirement**:
```
status = PASS (initial state)
```

**Rationale**:  
All validators start in PASS state. Violations discovered during validation cause transition to FAIL. No validator may start in FAIL or UNKNOWN state.

**Convergence Rule**:  
Every validator initializes `status = "PASS"` before beginning checks.

---

### 4.2 Terminal FAIL State (MANDATORY)

**Requirement**:
```
If any violation detected → status = FAIL
FAIL is terminal and NEVER overwritten
```

**Rationale**:  
Once a violation is detected, the validator has failed. No subsequent logic may change FAIL back to PASS. This ensures failures are never masked.

**Convergence Rule**:  
Once `status = "FAIL"`, no code path may reassign status to any other value.

**Anti-Pattern (FORBIDDEN)**:
```typescript
// ❌ FORBIDDEN: Recomputing status after violations
if (violations.length > 0) {
  status = "FAIL";
}
// Later...
status = violations.length === 0 ? "PASS" : "FAIL"; // ❌ Overwrites terminal FAIL
```

**Correct Pattern (REQUIRED)**:
```typescript
// ✅ REQUIRED: Terminal FAIL
let status = "PASS";
if (violations.length > 0) {
  status = "FAIL"; // Terminal - never reassigned
}
// No further status reassignment allowed
```

---

### 4.3 Violation Reflection in Checks (MANDATORY)

**Requirement**:
```
checks.* accurately reflect detected violations
If check X fails → checks.X = false AND violation recorded
```

**Rationale**:  
The `checks` object provides detailed breakdown of what passed and what failed. It must accurately reflect the validator's findings. Inaccurate checks mislead auditors and downstream systems.

**Convergence Rule**:  
Every check field (`checks.checkName`) is:
- `true` if that check passed  
- `false` if that check failed AND a violation was recorded for it

**Example**:
```typescript
// ✅ REQUIRED: Checks reflect reality
checks.protectedFilesIntact = true; // Initially
if (protectedFileModified) {
  checks.protectedFilesIntact = false; // Reflects failure
  violations.push({ type: "PROTECTED_FILE_MODIFIED", ... });
  status = "FAIL"; // Terminal
}
```

---

### 4.4 Missing Infrastructure Causes FAIL (MANDATORY)

**Requirement**:
```
If required helper/file/dependency missing → status = FAIL
Missing infrastructure does NOT cause crash/exception
```

**Rationale**:  
Validators must be **fail-safe**. If a validator cannot perform its checks due to missing infrastructure, it must FAIL gracefully, not crash. Crashing masks the failure and prevents audit trail creation.

**Convergence Rule**:  
All validators implement graceful degradation:
- Try to load required dependencies/files  
- If load fails → record violation, set `status = "FAIL"`, continue execution to produce result  
- Never throw unhandled exceptions that prevent result generation

**Example**:
```typescript
// ✅ REQUIRED: Fail-safe for missing infrastructure
let baselineHashes;
try {
  baselineHashes = loadBaselineHashes();
} catch (error) {
  checks.infrastructureAvailable = false;
  violations.push({
    type: "INFRASTRUCTURE_MISSING",
    description: "Cannot load baseline hashes",
    severity: "CRITICAL"
  });
  status = "FAIL"; // Terminal FAIL, but execution continues
  baselineHashes = {}; // Safe fallback to allow result generation
}
```

---

### 4.5 No Final Recomputation of Status (MANDATORY)

**Requirement**:
```
status is set during validation logic
status is NEVER recomputed at the end
```

**Rationale**:  
Recomputing status at the end (e.g., `status = violations.length > 0 ? "FAIL" : "PASS"`) can overwrite a terminal FAIL state if violations array is accidentally cleared or if logic errors occur. Status must be set **once** during validation and never touched again.

**Convergence Rule**:  
No validator may contain logic that reassigns `status` after initial violation detection.

**Anti-Pattern (FORBIDDEN)**:
```typescript
// ❌ FORBIDDEN: Final recomputation
let status = "PASS";
// ... validation logic sets status = "FAIL" ...
// Later at return:
return {
  status: violations.length > 0 ? "FAIL" : "PASS", // ❌ Overwrites terminal state
  violations,
  checks
};
```

**Correct Pattern (REQUIRED)**:
```typescript
// ✅ REQUIRED: Status is terminal
let status = "PASS";
// ... validation logic sets status = "FAIL" if needed ...
// At return:
return {
  status, // ✅ Use terminal status, never recompute
  violations,
  checks
};
```

---

### 4.6 Consistent Violation Schema (MANDATORY)

**Requirement**:
```
All violations use identical schema:
{
  type: string,
  description: string,
  severity: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW"
}
```

**Rationale**:  
The gate executor and audit systems depend on consistent violation structure. Variance in violation schema breaks automation and audit tooling.

**Convergence Rule**:  
Every validator reports violations using the canonical schema defined in CS1 validator (aligned per cs1-validator-fix-summary.md).

**Example**:
```typescript
// ✅ REQUIRED: Canonical violation schema
violations.push({
  type: "PROTECTED_FILE_MODIFIED", // Violation type code
  description: "BUILD_PHILOSOPHY.md was modified", // Human-readable description
  severity: "CRITICAL" // Impact severity
});
```

---

### 4.7 Consistent Checks Schema (MANDATORY)

**Requirement**:
```
All validators provide checks object with boolean fields
checks.checkName = true/false based on check result
```

**Rationale**:  
The `checks` object enables granular audit and debugging. Consistency across validators allows uniform reporting and analysis.

**Convergence Rule**:  
Every validator exposes a `checks` object where:
- Each field name describes a specific check  
- Each field value is boolean (true = passed, false = failed)  
- Field names are descriptive and unique within that validator

**Example**:
```typescript
// ✅ REQUIRED: Consistent checks schema
interface CS1Checks {
  protectedFilesIntact: boolean;
  noSuppressions: boolean;
  protectedPathsIntact: boolean;
  noBypassAttempts: boolean;
  constitutionalFilesIntact: boolean;
}

// In validator:
const checks: CS1Checks = {
  protectedFilesIntact: true,
  noSuppressions: true,
  protectedPathsIntact: true,
  noBypassAttempts: true,
  constitutionalFilesIntact: true
};
// Update checks as validation proceeds...
```

---

### 4.8 Invariant Applied Consistently Across Validators (MANDATORY)

**Requirement**:
```
Terminal FAIL invariant applies to ALL validators
No validator may have different status semantics
```

**Rationale**:  
Governance enforcement depends on uniform behavior. If some validators treat FAIL as recoverable while others treat it as terminal, the governance system becomes unpredictable and untrustworthy.

**Convergence Rule**:  
Every validator in the ecosystem (CS1, CS2, CS3, CS4, CS5, CS6, GSR, QIEL, Build Philosophy, future validators) implements **identical terminal FAIL semantics**.

**Validation**:  
Before a new validator is deployed, it must be validated against this checklist to ensure convergence.

---

## 5. Convergence Conditions (When Validators Are Aligned)

Validators are considered **converged** when all of the following conditions are met:

### 5.1 Structural Convergence

**Condition**: All validators use identical result schema

**Validation**:
```typescript
interface ValidatorResult {
  status: "PASS" | "FAIL";
  violations: Array<{
    type: string;
    description: string;
    severity: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
  }>;
  checks: Record<string, boolean>;
  evidence?: Record<string, any>; // Optional, validator-specific
}
```

**Pass Criteria**: ✅ All validators return results matching this schema

---

### 5.2 Semantic Convergence

**Condition**: All validators implement terminal FAIL semantics

**Validation**:
- Status starts at PASS  
- Any violation → status = FAIL (terminal)  
- FAIL is never overwritten or recomputed  
- Missing infrastructure → FAIL (not crash)

**Pass Criteria**: ✅ All validators implement terminal FAIL correctly

---

### 5.3 Behavioral Convergence

**Condition**: All validators behave predictably under failure conditions

**Validation**:
- Test Case 1: No violations → status = PASS  
- Test Case 2: Any violation → status = FAIL  
- Test Case 3: Multiple violations → status = FAIL (not multi-fail)  
- Test Case 4: Missing dependency → status = FAIL (graceful degradation)  
- Test Case 5: Violation detected → status never recomputed later

**Pass Criteria**: ✅ All validators pass all 5 test cases

---

### 5.4 Audit Convergence

**Condition**: All validators produce auditable results

**Validation**:
- Violations are recorded with type, description, severity  
- Checks accurately reflect pass/fail state of each check  
- Evidence is collected (when applicable)  
- Result is deterministic (same input → same output)

**Pass Criteria**: ✅ All validators produce complete audit trails

---

## 6. Terminal Pass/Fail Rules (No Ambiguity)

These rules eliminate ambiguity in validator outcomes.

### 6.1 PASS Definition

**A validator result is PASS if and only if:**

1. ✅ `status === "PASS"`  
2. ✅ `violations.length === 0`  
3. ✅ All checks in `checks` object are `true`  
4. ✅ No exceptions thrown during validation  
5. ✅ All required infrastructure was available

**PASS Outcome**:  
The validator found **zero violations**. The PR complies fully with this validator's requirements.

---

### 6.2 FAIL Definition

**A validator result is FAIL if and only if:**

1. ❌ `status === "FAIL"`  
2. ❌ `violations.length > 0`  
3. ❌ At least one check in `checks` object is `false`  
4. ❌ Required infrastructure was missing, OR  
5. ❌ Violations were detected during validation

**FAIL Outcome**:  
The validator found **one or more violations**. The PR does NOT comply with this validator's requirements. Merge is blocked.

**FAIL is terminal**: Once FAIL, always FAIL for that validation run.

---

### 6.3 No Partial Pass

**Rule**: There is **no such thing** as "partial pass" or "soft fail"

**Rationale**:  
Governance is binary. Either the PR complies (PASS) or it doesn't (FAIL). Introducing "partial pass" or severity-based outcomes creates ambiguity and weakens enforcement.

**Enforcement**:  
Any validator that attempts to introduce partial outcomes is **non-convergent** and must be corrected.

---

### 6.4 No Recoverable FAIL

**Rule**: FAIL is **never recoverable** within a single validation run

**Rationale**:  
If a validator detects a violation and sets `status = FAIL`, no subsequent logic should "fix" the violation and change status back to PASS. Fixes happen in the PR, not in validator logic.

**Enforcement**:  
Validators may **not** implement auto-remediation. Validators observe and report, they do not fix.

---

### 6.5 No Conditional FAIL

**Rule**: FAIL criteria are **absolute**, not conditional on context

**Rationale**:  
Governance rules do not vary by developer, by time of day, by PR size, or by any other context. If a violation exists, it's a FAIL, regardless of external factors.

**Enforcement**:  
Validators may **not** implement context-dependent pass/fail logic (e.g., "allow if developer is senior" or "skip check on Fridays").

---

## 7. Separation: Governance Definition vs. Execution Responsibility

### 7.1 This Document Defines Governance Only

This document establishes:
- **What** validator convergence means  
- **What** checks are mandatory  
- **What** terminal pass/fail rules are  
- **How** validators must behave to be considered converged

This document does **NOT**:
- ❌ Implement validator logic  
- ❌ Provide code samples for implementation (examples shown are illustrative only)  
- ❌ Execute validators or gates  
- ❌ Enforce convergence (enforcement is via code review and canonical learning)

### 7.2 Execution Responsibility Per Agent Role

Execution of validator convergence is the responsibility of:

**Builder Agents**:
- Implement new validators following this checklist  
- Refactor existing validators to achieve convergence  
- Test validators against convergence conditions (Section 5)  
- Ensure validators are fail-safe (Section 4.4)

**Foreman**:
- Detect validator divergence during gate failures  
- Promote non-convergent validator behavior to canonical learning (via LESSONS_TO_CANON_WORKFLOW)  
- Instruct builders to correct non-convergent validators

**Governance Administrator**:
- Maintain this checklist as canonical governance  
- Update checklist when new convergence requirements are identified  
- **Never** implement validator logic (out of scope)

**Johan Ras**:
- Approve changes to validator convergence requirements  
- Resolve conflicts when validators cannot converge without breaking changes

### 7.3 No Implied CI Logic or Automation

This checklist does **not** imply:
- Automated convergence testing (may be added in future)  
- Automated validator generation  
- Automated convergence enforcement gates  
- CI pipelines for validator validation

Such automation **may** be implemented in future, but requires separate architecture and approval.

---

## 8. Alignment with One-Time Build Law

This checklist supports **One-Time Build Law** by:

### 8.1 Preventing False Negatives

- Terminal FAIL ensures violations are never masked  
- Graceful degradation (4.4) ensures missing infrastructure doesn't hide failures  
- No recomputation (4.5) prevents logic errors from creating false PASS

**Effect**: If a validator says PASS, it truly found zero violations. Trust in gates increases.

### 8.2 Preventing False Positives

- Status initialized to PASS (4.1) ensures only real violations cause FAIL  
- Accurate checks reflection (4.3) ensures FAIL corresponds to actual violations  
- Consistent schemas (4.6, 4.7) reduce mis-interpretation risk

**Effect**: If a validator says FAIL, there is a real violation. No wasted investigation of false alarms.

### 8.3 Enabling Build-to-Green

- Consistent terminal semantics allow builders to trust gate feedback  
- Predictable outcomes allow builders to fix violations confidently  
- Auditable results allow builders to understand exactly what failed

**Effect**: Builders can achieve 100% GREEN QA on first attempt because gates are trustworthy and predictable.

---

## 9. Alignment with Existing Governance

This checklist aligns with and reinforces:

### 9.1 QA-as-Proof

**From**: `governance/canon/GOVERNANCE_PURPOSE_AND_SCOPE.md` Section 3

**Alignment**:  
Validators are proof mechanisms. Terminal FAIL semantics ensure that proof is trustworthy. If a validator passes, it **proves** compliance. If it fails, it **proves** non-compliance.

### 9.2 Evidence-Based Validation

**From**: `GOVERNANCE_GATE_CANON.md` Section 4

**Alignment**:  
Consistent violation and checks schemas (4.6, 4.7) enable evidence collection. Auditable results (5.4) provide evidence trail for compliance.

### 9.3 Zero-Tolerance Enforcement

**From**: `GOVERNANCE_GATE_CANON.md` Section 5

**Alignment**:  
Terminal FAIL (4.2), no partial pass (6.3), no recoverable FAIL (6.4), no conditional FAIL (6.5) all enforce zero-tolerance. Either compliant or blocked, no middle ground.

### 9.4 Learning Promotion

**From**: `maturion/process/LESSONS_TO_CANON_WORKFLOW.md`

**Alignment**:  
When a validator diverges from this checklist, that's a lesson qualifying for promotion. Foreman detects divergence, promotes lesson, this checklist is updated, all validators converge.

---

## 10. Audit Readiness and Enforceability

### 10.1 Audit Trail Requirements

Every validator execution MUST produce:
- **Status**: PASS or FAIL (terminal)  
- **Violations**: Array of violations with type/description/severity  
- **Checks**: Detailed pass/fail breakdown  
- **Evidence**: Supporting data (file hashes, test results, logs, etc.)

### 10.2 Audit Questions (Must Be Answerable)

For any validator execution, the following MUST be answerable:

1. **Did it pass or fail?** (status field)  
2. **If failed, what violations were found?** (violations array)  
3. **Which specific checks failed?** (checks object)  
4. **What evidence supports the result?** (evidence object)  
5. **Was the result deterministic?** (re-run with same input → same result)

### 10.3 Enforceability

This checklist is enforceable through:

**Code Review**:  
All validator implementations reviewed against this checklist before merge.

**Test Coverage**:  
All validators tested against convergence conditions (Section 5) before deployment.

**Learning Promotion**:  
Non-convergent validator behavior triggers lesson promotion per `LESSONS_TO_CANON_WORKFLOW.md`, leading to corrective updates.

**Gate Enforcement**:  
Non-convergent validators may cause gate failures (e.g., gate executor expects consistent schema). Gate failures force correction.

---

## 11. Validator Convergence Validation Checklist

Use this checklist to validate a validator's convergence:

### Validator Name: `__________________`

**Structural Checks**:
- [ ] Returns `ValidatorResult` schema (status, violations, checks, evidence)  
- [ ] Violations use canonical schema (type, description, severity)  
- [ ] Checks object contains boolean fields

**Semantic Checks**:
- [ ] Status initialized to PASS  
- [ ] Any violation → status = FAIL  
- [ ] FAIL is never overwritten  
- [ ] No final recomputation of status

**Behavioral Checks**:
- [ ] Test: No violations → PASS  
- [ ] Test: Any violation → FAIL  
- [ ] Test: Multiple violations → FAIL  
- [ ] Test: Missing infrastructure → FAIL (graceful)  
- [ ] Test: Status remains terminal after set to FAIL

**Audit Checks**:
- [ ] Violations recorded with complete data  
- [ ] Checks accurately reflect validation results  
- [ ] Evidence collected (if applicable)  
- [ ] Result is deterministic

**Result**:
- [ ] ✅ **CONVERGED** - All checks pass  
- [ ] ❌ **DIVERGENT** - One or more checks fail (requires correction)

---

## 12. Cross-References

This checklist aligns with and references:

1. **`maturion/canon/BOOTSTRAP_CANON.md`** (when created)  
   - Validator foundations and terminal state requirements

2. **`governance/canon/GOVERNANCE_PURPOSE_AND_SCOPE.md`**  
   - Section 2: Governance as Canonical Memory  
   - Section 3: Build Philosophy (One-Time Build Law)

3. **`GOVERNANCE_GATE_CANON.md`**  
   - Section 4: Evidence-Based Validation  
   - Section 5: Zero-Tolerance Enforcement

4. **`maturion/process/LESSONS_TO_CANON_WORKFLOW.md`**  
   - Learning promotion for validator divergence

5. **`evidence-new/cs1-validator-fix-summary.md`**  
   - Canonical violation and checks schemas (established by CS1 fix)

---

## 13. Explicit Non-Scope

This checklist **does not**:
- ❌ Implement validator logic or provide code  
- ❌ Define CI/CD pipelines for validators  
- ❌ Create automated convergence testing (future work)  
- ❌ Specify validator deployment or versioning  
- ❌ Replace validator implementation guides (future work)  
- ❌ Override validator-specific requirements (validators may have additional checks beyond convergence)

---

## 14. Revision History

| Version | Date       | Author                | Changes                              |
|---------|------------|-----------------------|--------------------------------------|
| v1      | 2025-12-23 | Governance Admin      | Initial creation per Issue #653      |

---

**End of VALIDATOR CONVERGENCE CHECKLIST**

🔒 **Effect**:  
This checklist ensures all validators across the Maturion ecosystem implement consistent terminal pass/fail semantics, enabling trustworthy, auditable, and predictable governance enforcement. Validators become reliable proof mechanisms supporting One-Time Build Law and Build-to-Green requirements.

# Issue Complexity Report

**Purpose**: Records complexity and safety analysis for all issues evaluated for autonomous execution.

**Created**: 2025-12-11  
**Last Updated**: 2025-12-11

---

## Overview

This report provides detailed analysis of issue complexity and safety scores to enable smart autonomous execution decisions. Each issue is evaluated across multiple factors:

- **Complexity Score** (0-100): Measures technical difficulty and scope
- **Safety Score** (0-100): Measures autonomous execution safety (higher = safer)
- **Risk Classification**: SAFE, CONDITIONAL, or UNSAFE

---

## Risk Classification Thresholds

### SAFE (Autonomous Execution Allowed)
- Complexity Score: < 70
- Safety Score: ≥ 70
- No governance-protected paths touched
- Approved for autonomous wave execution

### CONDITIONAL (Human Approval Required)
- Complexity Score: 70-100
- Safety Score: 50-70
- Moderate risk requiring review
- Requires human approval before execution

### UNSAFE (Escalate to Johan)
- Touches governance-protected paths, OR
- Safety Score: < 50
- High risk of violations or regressions
- Must escalate to Johan

---

## Complexity Factors (0-100 points)

1. **Code Surface Touched** (0-20 points)
   - Measures breadth of code modifications
   - Factors: refactoring scope, rewrite indicators

2. **Architectural Depth** (0-15 points)
   - Measures architectural impact
   - Factors: core system changes, framework modifications

3. **Files Modified** (0-15 points)
   - Estimates number of files affected
   - Factors: issue type, scope indicators

4. **Builder Difficulty** (0-10 points)
   - Estimates difficulty for builder execution
   - Factors: complexity keywords, integration requirements

5. **Dependency Impact** (0-10 points)
   - Measures impact on dependencies
   - Factors: breaking changes, API modifications

6. **Security Sensitivity** (0-10 points)
   - Measures security implications
   - Factors: authentication, credentials, security labels

7. **Governance Sensitivity** (0-10 points)
   - Measures governance implications
   - Factors: workflow changes, policy modifications

8. **Historical Incidents** (0-5 points)
   - Checks for past incident patterns
   - Factors: bug labels, critical indicators

9. **Drift-Prone Area** (0-5 points)
   - Checks if issue touches known drift areas
   - Factors: QIEL config, drift monitor, workflows

---

## Safety Factors (100 points base, deductions applied)

1. **Governance Boundaries** (0-25 points deducted)
   - Deducts for governance or constitutional labels

2. **Workflow Modification Risk** (0-20 points deducted)
   - Deducts for workflow or CI/CD changes

3. **File Protection Level** (0-20 points deducted)
   - Deducts for touching CS1-protected files

4. **Mutation Radius** (0-15 points deducted)
   - Deducts for system-wide or global changes

5. **Regression Likelihood** (0-10 points deducted)
   - Deducts for bug fixes, hotfixes, refactors

6. **Builder Reliability** (0-10 points deducted)
   - Deducts based on builder performance history

---

## Governance-Protected Paths (Automatic UNSAFE)

Issues touching these paths are automatically classified as UNSAFE:

- `.github/workflows/`
- `foreman/constitution/`
- `docs/governance/`
- `.github/foreman/agent-contract.md`
- `BUILD_PHILOSOPHY.md`
- `foreman/architecture-design-checklist.md`

---

## Analysis Entries

Detailed analysis entries are appended below as issues are evaluated.

---

# Foreman Constitution

## Overview

This directory contains the **immutable constitutional documents** that define Foreman's governance, authority, and operational boundaries.

These files are **protected by QIC (Quality Integrity Contract)** and cannot be modified without explicit constitutional review.

---

## Constitutional Files

### Architectural Decision Records (ADRs)

**Purpose**: Document constitutional architectural decisions with binding authority

**ADRs in this directory**:
- `ADR-0000-HYBRID-GITHUB-CONTROL-PLANE.md` - Decision to operate hybrid GitHub control plane (GitHub App + MCP Service)

**Status**: Constitutional decision records - immutable without new ADR and constitutional review

### `guardrails.json`

**Purpose**: Defines immutable paths, required checks, and protected files

**Contents**:
- `immutablePaths`: Directories that cannot be modified without review
- `requiredChecks`: QA checks that must pass for all PRs
- `protectedFiles`: Specific files that require approval to modify

**Protection Level**: CS1 (Guardrail Integrity Validation)

**Modification Process**: Constitutional review required

---

## Immutable Paths

The following paths are constitutionally protected:

1. **`.github/workflows`**
   - All GitHub Actions workflows
   - QIC and QIEL enforcement
   - Deployment and governance automation

2. **`foreman/constitution`**
   - This directory
   - All constitutional documents
   - Guardrails definition

3. **`docs/governance`**
   - Governance documentation
   - QIC and QIEL rules
   - Constitutional QA standards

4. **`.github/foreman/agent-contract.md`**
   - Foreman's constitutional contract
   - Authority and responsibility definitions
   - Governance Supremacy Rule

---

## Required Checks

All PRs must pass these checks:

1. **qiel** - QA Integration and Environment Lock-in
2. **deploy-check** - Deployment verification
3. **qic** - Quality Integrity Contract
4. **foreman-governance** - Governance compliance

**No PR can merge without passing ALL required checks.**

---

## Protected Files

The following files have additional protection:

1. **`.github/workflows/qiel.yml`**
   - QIEL workflow definition
   - ONE FILE architecture enforcement

2. **`.github/workflows/deploy-check.yml`**
   - Deployment verification workflow

3. **`.github/foreman/agent-contract.md`**
   - Foreman's constitutional contract

**Modifying these files requires:**
- Explicit justification
- Constitutional review
- Human approval
- Documentation update

---

## Constitutional QA Categories

### CS1: Guardrail Integrity Validation

Ensures this directory and all constitutional files are protected.

**Test File**: `tests/qic/guardrails.test.ts`

**Checks**:
- ✅ All constitutional files exist
- ✅ Guardrails define required protections
- ✅ No workflows modify constitutional files
- ✅ `.gitignore` doesn't exclude constitutional files

### CS2: Architecture Change Approval Enforcement

Ensures architecture changes require approval.

**Test File**: `tests/qic/architecture-integrity.test.ts`

### CS3: Incident Feedback Loop Validation

Ensures deployments trigger verification.

**Test File**: `tests/qic/incident-feedback.test.ts`

### CS5: Performance Fix Enforcement

Ensures no lazy code patterns.

**Test File**: `tests/qic/performance-integrity.test.ts`

### CS6: External Builder Protection

**CRITICAL**: Prevents catastrophic governance failures by blocking external builders.

**Test File**: `tests/qic/cs6-external-builder-protection.test.ts`

**Module**: `lib/foreman/constitution/external-builder-protection.ts`

**Enforces**:
- ✅ All non-Maturion builders blocked
- ✅ Auto-reassignment to Foreman
- ✅ Auto-bootstrap of Maturion Builder
- ✅ Commit inspection and rejection
- ✅ Critical CS4 alerts raised
- ✅ Robotics Law 8 enforcement

**Robotics Law 8 — External Builder Prohibition**:
> "No external builder may execute code in this repository. Only Maturion-certified builders may be used."

### WIE: Wiring Integrity Enforcement

Ensures correct component wiring.

**Test File**: `tests/qic/ui-wiring.test.ts`

---

## Governance Supremacy Rule (GSR)

The Governance Supremacy Rule is absolute:

1. **Governance rules override user requests**
2. **QA failures override task completion**
3. **Architecture rules override implementation**
4. **100% QA passing is ABSOLUTE, not contextual**

This constitution **implements** GSR through:
- Immutable path protection
- Required check enforcement
- Constitutional QA categories
- Automated test validation

---

## Modification Process

### For Guardrails.json

1. **Proposal Phase**:
   - Document proposed change
   - Explain rationale
   - Identify affected systems
   - List alternatives considered

2. **Review Phase**:
   - Technical review (architecture impact)
   - Security review (if applicable)
   - Governance review (constitutional impact)

3. **Approval Phase**:
   - Human approval required
   - Cannot be automated
   - Must be explicit

4. **Implementation Phase**:
   - Update `guardrails.json`
   - Update tests in `tests/qic/guardrails.test.ts`
   - Update documentation
   - Verify all tests pass

### For Other Constitutional Files

1. Create Architecture Change Request (ACR) issue
2. Link PR to ACR issue
3. Include `Architecture-Change-Approval: true` in PR metadata
4. Obtain human approval
5. Pass all constitutional QA checks

**Foreman cannot self-approve constitutional changes.**

---

## Emergency Procedures

### What Constitutes an Emergency

- Critical security vulnerability in constitutional files
- Governance drift causing system failure
- Complete system lockout due to governance misconfiguration

### Emergency Response

1. **Immediate**: Revert to last known good configuration
2. **Short-term**: Create temporary bypass (with time limit)
3. **Long-term**: Conduct constitutional review and proper fix

**Emergency bypasses must**:
- Have explicit time limit (< 24 hours)
- Be documented in incident log
- Trigger immediate constitutional review
- Be reverted as soon as proper fix is ready

**Emergency bypasses cannot**:
- Become permanent
- Set precedent for future bypasses
- Weaken future enforcement

---

## Integration with QIC

This constitution is enforced by:

```
.github/workflows/qic.yml
  ↓
tests/qic/guardrails.test.ts (CS1)
  ↓
Validates:
  - guardrails.json exists and is valid
  - All constitutional files exist
  - No workflows modify constitutional files
  - Immutable paths are protected
```

**Result**: Constitution is self-enforcing through automated tests.

---

## Relationship to Agent Contract

### Agent Contract Defines

- Foreman's identity and purpose
- Operational authority
- Builder orchestration
- Governance Supremacy Rule

### Constitution Implements

- Immutable path protection
- Required check enforcement
- Constitutional QA categories
- Modification procedures

**The Agent Contract is WHAT. The Constitution is HOW.**

---

## Future Evolution

### How the Constitution Can Grow

1. **Add immutable paths** (strengthen protection)
2. **Add required checks** (strengthen enforcement)
3. **Add protected files** (strengthen governance)
4. **Add constitutional QA categories** (strengthen standards)

### How the Constitution Cannot Change

1. ❌ Remove immutable paths (weaken protection)
2. ❌ Remove required checks (weaken enforcement)
3. ❌ Remove protected files (weaken governance)
4. ❌ Allow bypasses (weaken standards)

**The constitution can only strengthen, never weaken.**

---

## Compliance

### How to Verify Compliance

```bash
# Run guardrail integrity tests
npm run test:guardrails

# Run all constitutional QA
npm run test:qic

# Run full QIC validation
npm run qiel:full
```

### What Compliance Looks Like

- ✅ All constitutional files exist
- ✅ All protected paths are tracked in git
- ✅ No workflows modify constitutional files
- ✅ All required checks are defined
- ✅ All constitutional QA tests pass

### What Non-Compliance Looks Like

- ❌ Constitutional files missing or modified
- ❌ Workflows modifying protected files
- ❌ Required checks removed or bypassed
- ❌ Constitutional QA tests failing

**Non-compliance blocks merge. No exceptions.**

---

## Contact and Questions

For questions about the constitution:
- Review: `.github/foreman/agent-contract.md`
- Documentation: `docs/governance/`
- Test suite: `tests/qic/`

For modification proposals:
- Create Architecture Change Request issue
- Follow modification process above
- Obtain human approval

**Remember**: The constitution exists to protect the system. When in doubt, the answer is NO.

---

## Summary

This constitution:
- ✅ Defines immutable paths and protected files
- ✅ Enforces required checks for all PRs
- ✅ Implements constitutional QA categories
- ✅ Provides modification procedures
- ✅ Integrates with QIC for automated enforcement
- ✅ Can strengthen but never weaken

**Protect the constitution. Maintain the standards. Preserve the integrity.**

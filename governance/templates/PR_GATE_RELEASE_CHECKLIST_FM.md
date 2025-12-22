# PR Gate Release Checklist — FM (Foreman) Agent

## Status
**Type**: PR Gate Release Checklist (Canonical Documentation)  
**Authority**: Governance (Canonical)  
**Version**: 1.0.0  
**Effective Date**: 2025-12-22  
**Agent Role**: FM (Foreman) Agent  
**Canonical Reference**: `governance/canon/AGENT_ROLE_GATE_APPLICABILITY.md`

---

## Purpose

This checklist defines the **complete set of requirements** that FM (Foreman) Agents must satisfy for PR gate approval.

**Predictability Guarantee**: If all checklist items are satisfied, the PR gate **MUST pass**.

If a PR satisfies all items but still fails, that is a **governance defect**, not an agent failure.

---

## Agent Role Definition

**FM (Foreman) Agents**: Agents orchestrating builds, managing workflows, and enforcing governance

**Examples**:
- Foreman App agents
- Foreman runtime orchestration
- Workflow management agents

**Canonical Reference**: `governance/canon/AGENT_ROLE_GATE_APPLICABILITY.md` Section 4.3

---

## Important: Dual-Role Capability

FM agents may act in different capacities:
- **As Orchestrator**: Managing governance, learning, failures → Use this checklist
- **As Builder**: Building application code → Use Builder Agent checklist instead

**Rule**: When FM acts as builder (producing application code), builder gates apply. When FM acts as orchestrator, FM-scoped gates apply.

---

## Complete PR Gate Checklist for FM Agents (Orchestrator Role)

### Category 1: FM-Scoped Governance Requirements

**Gate**: FM governance compliance  
**Canonical Reference**: `governance/canon/LEARNING_PROMOTION_RULE.md`, `governance/canon/FAILURE_PROMOTION_RULE.md`

#### Learning Promotion
- [ ] **1.1** Learning promotion rules followed (lessons captured and promoted to governance)
- [ ] **1.2** Learning artifacts properly structured
- [ ] **1.3** Learning promotion evidence complete (if applicable to PR)

#### Failure Promotion
- [ ] **1.4** Failure promotion rules followed (failures classified and recorded)
- [ ] **1.5** Failure artifacts properly structured
- [ ] **1.6** Failure promotion evidence complete (if applicable to PR)

#### Effectiveness Tracking
- [ ] **1.7** Effectiveness tracking maintained (metrics updated)
- [ ] **1.8** Effectiveness evidence documented (if applicable to PR)

---

### Category 2: FM Orchestration Contracts

**Gate**: FM workflow compliance  
**Canonical Reference**: `governance/canon/GOVERNANCE_PURPOSE_AND_SCOPE.md` (Section 4.2)

- [ ] **2.1** FM orchestration contracts satisfied
- [ ] **2.2** Builder recruitment follows canonical process (if applicable)
- [ ] **2.3** Workflow sequencing correct (architecture → QA → build → verification)
- [ ] **2.4** No unauthorized scope expansion

---

### Category 3: Constitutional Safeguards (FM-Scoped)

**Gate**: CS1, CS3, CS4, CS5, CS6 (FM-relevant)  
**Canonical Reference**: `GOVERNANCE_GATE_CANON.md`

#### CS1: Constitutional Integrity (FM-owned files)
- [ ] **3.1** No modifications to FM constitutional files without approval
- [ ] **3.2** No governance bypasses in FM workflows

#### CS3: Incident Feedback Loop
- [ ] **3.3** Incident feedback loop operational
- [ ] **3.4** Post-deployment verification configured (if applicable)
- [ ] **3.5** No unresolved critical FM incidents blocking work

#### CS4: Compliance Monitoring
- [ ] **3.6** FM alert system functional
- [ ] **3.7** No suppressed critical alerts in FM systems
- [ ] **3.8** Governance notifications operational

#### CS5: Performance Enforcement (Continuous Execution)
- [ ] **3.9** Continuous execution maintained (OPOJD compliance)
- [ ] **3.10** No illegitimate pauses in FM orchestration
- [ ] **3.11** Execution continuity ≥ 95%

#### CS6: Execution Boundary
- [ ] **3.12** Execution boundaries respected (no unauthorized operations)
- [ ] **3.13** Resource access appropriate and scoped
- [ ] **3.14** Tenant isolation maintained (if applicable)

---

### Category 4: Gates That DO NOT Apply (When Acting as Orchestrator)

**Confirmation**: The following builder-specific gates are **NOT REQUIRED** for FM agents acting as orchestrators:

**Explicitly NOT Required (Orchestrator Role)**:
- ❌ Builder QA reports (unless FM is building application code)
- ❌ Architecture artifacts (unless FM is designing new architecture)
- ❌ Build-to-Green (unless FM is executing application builds)
- ❌ 100% GREEN QA / QIEL (unless FM is building application code)

**Rationale**: FM orchestrates and governs. Builder gates apply only when FM acts as builder.

**Canonical Reference**: `governance/canon/AGENT_ROLE_GATE_APPLICABILITY.md` Section 5.3.3

---

### Category 5: When FM Acts as Builder

**Rule**: If FM PR includes application code changes (not just orchestration/governance):
- FM must satisfy **Builder Agent checklist** in addition to FM-specific requirements
- All builder gates apply (Build-to-Green, architecture, QA reports, QIEL, etc.)
- This is cumulative, not substitutive

**Use Both Checklists**:
- `PR_GATE_RELEASE_CHECKLIST_FM.md` (this document)
- `PR_GATE_RELEASE_CHECKLIST_BUILDER.md`

---

## Predictability Invariant

> **If all applicable checklist items above are satisfied, the PR gate MUST pass.**

If a PR satisfies all items but the gate fails:
1. This is classified as a **governance defect**
2. The gate logic must be updated to align with this checklist
3. This is NOT an FM agent failure

---

## Usage Instructions

### For FM Agents (Pre-Handover)

Before creating a PR or requesting review:
1. Determine role for this PR: **Orchestrator** or **Builder**
   - Orchestrator: Managing governance, learning, failures, workflows
   - Builder: Building application code
2. Review applicable checklist(s)
3. Verify each applicable item is satisfied
4. Generate required artifacts (if any)
5. Submit PR when all applicable items are checked

### For PR Gate Implementation

Gate logic must:
1. Detect agent role as "fm"
2. Determine FM capacity: Orchestrator or Builder
3. Evaluate appropriate checklist items
4. Block PR if ANY applicable item is not satisfied
5. Pass PR if ALL applicable items are satisfied
6. Provide clear failure messages citing specific checklist items

---

## FM Work Examples

**FM Orchestrator Work** (subject to this checklist only):
- Managing learning promotion
- Managing failure promotion
- Orchestrating builder workflows
- Updating effectiveness tracking
- Managing FM runtime configuration
- Incident response coordination

**FM Builder Work** (subject to Builder + FM checklists):
- Building FM App features
- Implementing new FM runtime logic
- Adding FM application code

**FM Governance Work** (subject to Governance Admin checklist):
- Updating governance canon (if explicitly authorized)
- Evolving governance policies (rare - usually delegated)

---

## Related Documents

- `governance/canon/AGENT_ROLE_GATE_APPLICABILITY.md` - Agent role gate definitions
- `governance/canon/LEARNING_PROMOTION_RULE.md` - Learning promotion requirements
- `governance/canon/FAILURE_PROMOTION_RULE.md` - Failure promotion requirements
- `governance/canon/GOVERNANCE_PURPOSE_AND_SCOPE.md` - FM role definition (Section 4.2)
- `GOVERNANCE_GATE_CANON.md` - Constitutional safeguards (CS1, CS3, CS4, CS5, CS6)
- `PR_GATE_RELEASE_CHECKLIST_BUILDER.md` - Builder checklist (use when FM acts as builder)

---

## Versioning

### v1.0.0 (2025-12-22)
- Initial release
- Complete FM orchestrator gate requirements documented
- Dual-role capability clarified (orchestrator vs builder)
- Traceable to existing gate behavior
- Predictability invariant established

---

**End of FM (Foreman) Agent PR Gate Release Checklist**

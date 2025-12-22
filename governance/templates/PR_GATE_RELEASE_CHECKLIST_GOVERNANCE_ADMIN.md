# PR Gate Release Checklist — Governance Administrator Agent

## Status
**Type**: PR Gate Release Checklist (Canonical Documentation)  
**Authority**: Governance (Canonical)  
**Version**: 1.0.0  
**Effective Date**: 2025-12-22  
**Agent Role**: Governance Administrator Agent  
**Canonical Reference**: `governance/canon/AGENT_ROLE_GATE_APPLICABILITY.md`

---

## Purpose

This checklist defines the **complete set of requirements** that Governance Administrator Agents must satisfy for PR gate approval.

**Predictability Guarantee**: If all checklist items are satisfied, the PR gate **MUST pass**.

If a PR satisfies all items but still fails, that is a **governance defect**, not an agent failure.

---

## Agent Role Definition

**Governance Administrator Agents**: Agents maintaining governance artifacts, schemas, policies, and enforcement

**Examples**:
- Governance repository administrator
- Policy maintenance agents
- Schema evolution agents
- Governance audit agents

**Canonical Reference**: `governance/canon/AGENT_ROLE_GATE_APPLICABILITY.md` Section 4.2

---

## Complete PR Gate Checklist for Governance Administrator Agents

### Category 1: Governance Artifact Compliance

**Gate**: Governance structure validation  
**Canonical Reference**: `governance/canon/GOVERNANCE_COMPLETENESS_MODEL.md`

- [ ] **1.1** All modified governance schemas are valid (parseable, well-formed)
- [ ] **1.2** All modified governance policies are complete (no broken references, no internal contradictions)
- [ ] **1.3** Canonical references are correct (all document references resolve)
- [ ] **1.4** No governance contradictions introduced (new content aligns with existing canon)
- [ ] **1.5** Governance completeness maintained (no required artifacts removed without replacement)
- [ ] **1.6** Markdown syntax valid (if applicable)
- [ ] **1.7** JSON/YAML syntax valid (if applicable)

---

### Category 2: Governance Enforcement Alignment (if modifying enforcement)

**Gate**: Enforcement semantic validation  
**Canonical Reference**: `governance/canon/AGENT_ROLE_GATE_APPLICABILITY.md`, `GOVERNANCE_GATE_CANON.md`

**Note**: This category only applies when PR modifies enforcement logic, workflows, or gate definitions.

- [ ] **2.1** Enforcement changes align with canonical governance
- [ ] **2.2** No enforcement weakening introduced
- [ ] **2.3** No CI-discovery logic introduced (gates remain enforcement-only)
- [ ] **2.4** Gate applicability correctly defined (agent-role aware)
- [ ] **2.5** No builder-specific gates applied to non-builder agents
- [ ] **2.6** Enforcement changes cite canonical authority

**If PR does NOT modify enforcement**: Skip Category 2 entirely.

---

### Category 3: Constitutional Safeguards (Governance-Scoped)

**Gate**: CS1 (Constitutional integrity - for governance files only)  
**Canonical Reference**: `GOVERNANCE_GATE_CANON.md`

- [ ] **3.1** No modifications to protected governance files without explicit approval (if applicable)
- [ ] **3.2** No governance bypasses introduced
- [ ] **3.3** Changes follow governance change management process
- [ ] **3.4** Version increments documented (where applicable)

---

### Category 4: Gates That DO NOT Apply

**Confirmation**: The following builder-specific gates are **NOT REQUIRED** for Governance Administrator agents:

**Explicitly NOT Required**:
- ❌ Build-to-Green enforcement (no application code to build)
- ❌ Architecture and build artifacts (governance is documentation)
- ❌ Builder QA reports (no `.qa/builder/*` artifacts expected)
- ❌ 100% GREEN QA / QIEL (no tests to execute)
- ❌ Build Philosophy compliance (no build process applicable)
- ❌ Test infrastructure requirements
- ❌ Vercel deployment simulation

**Rationale**: Governance administrators maintain governance artifacts (documentation, schemas, policies). These are not executable applications requiring builds or tests.

**Canonical Reference**: `governance/canon/AGENT_ROLE_GATE_APPLICABILITY.md` Section 5.2.4

---

## Predictability Invariant

> **If all applicable checklist items above are satisfied, the PR gate MUST pass.**

If a PR satisfies all items but the gate fails:
1. This is classified as a **governance defect**
2. The gate logic must be updated to align with this checklist
3. This is NOT a governance administrator failure

**Critical**: If a builder-specific gate blocks a governance PR, this is a **misapplied gate** (governance error), not a compliance failure.

---

## Usage Instructions

### For Governance Administrator Agents (Pre-Handover)

Before creating a PR or requesting review:
1. Review this checklist completely
2. Verify each applicable item is satisfied
3. Ensure governance artifacts are valid and complete
4. If modifying enforcement: Verify alignment with canon (Category 2)
5. Confirm no builder-specific requirements are being applied
6. Submit PR when all applicable items are checked

### For PR Gate Implementation

Gate logic must:
1. Detect agent role as "governance-administrator"
2. Evaluate only the items in this checklist
3. **NOT** evaluate builder-specific requirements
4. Block PR if ANY applicable item is not satisfied
5. Pass PR if ALL applicable items are satisfied
6. Provide clear failure messages citing specific checklist items

**Critical**: Gate must NOT require:
- `.qa/builder/*` artifacts from governance PRs
- Architecture documents for governance clarifications
- Build-to-Green evidence for policy updates
- Test execution for schema changes

---

## Governance Work Examples

**Valid Governance Administrator PRs** (subject to this checklist):
- Adding or updating governance schemas
- Clarifying governance policies
- Updating agent contracts
- Maintaining governance completeness
- Evolving governance documentation
- Updating enforcement semantics (when authorized)

**Not Governance Administrator Work** (different role/checklist applies):
- Building application features (Builder Agent role)
- Modifying runtime FM logic (FM Agent role)
- Implementing code changes (Builder Agent role)

---

## Related Documents

- `governance/canon/AGENT_ROLE_GATE_APPLICABILITY.md` - Agent role gate definitions
- `governance/canon/GOVERNANCE_COMPLETENESS_MODEL.md` - Governance completeness requirements
- `governance/canon/GOVERNANCE_PURPOSE_AND_SCOPE.md` - Role definitions
- `GOVERNANCE_GATE_CANON.md` - Constitutional safeguards
- `governance/agents/governance-administrator.agent.md` - Agent contract

---

## Versioning

### v1.0.0 (2025-12-22)
- Initial release
- Complete governance administrator gate requirements documented
- Explicit exclusion of builder-specific requirements
- Traceable to existing gate behavior
- Predictability invariant established

---

**End of Governance Administrator Agent PR Gate Release Checklist**

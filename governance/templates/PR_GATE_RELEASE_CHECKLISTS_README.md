# PR Gate Release Checklists

## Status
**Type**: Canonical Governance Documentation  
**Authority**: Governance (Canonical)  
**Version**: 1.0.0  
**Effective Date**: 2025-12-22  
**Canonical Reference**: `governance/canon/AGENT_ROLE_GATE_APPLICABILITY.md`

---

## Purpose

This directory contains **PR Gate Release Checklists** that define the complete set of requirements each agent role must satisfy for PR gate approval.

**Predictability Guarantee**: If all checklist items for a role are satisfied, the PR gate **MUST pass**.

These checklists operationalize the canonical governance clarification in `governance/canon/AGENT_ROLE_GATE_APPLICABILITY.md`.

---

## Available Checklists

### 1. Builder Agent Checklist
**File**: `PR_GATE_RELEASE_CHECKLIST_BUILDER.md`

**For**: Agents executing build-to-green for application code changes

**Requirements Include**:
- Build-to-Green enforcement (Architecture → Red QA → Build → Green QA)
- Architecture and build artifacts
- Builder QA reports (`.qa/builder/*`)
- 100% GREEN QA (QIEL - zero failures, zero test debt)
- Build Philosophy compliance
- All constitutional safeguards (CS1-CS6, GSR)

**Examples**: GitHub Copilot building features, local builder agents, CI/CD builders

---

### 2. Governance Administrator Agent Checklist
**File**: `PR_GATE_RELEASE_CHECKLIST_GOVERNANCE_ADMIN.md`

**For**: Agents maintaining governance artifacts, schemas, policies

**Requirements Include**:
- Governance artifact compliance (schemas valid, policies complete)
- Governance enforcement alignment (if modifying enforcement)
- Constitutional safeguards (governance-scoped only)

**Explicitly NOT Required**:
- ❌ Build-to-Green enforcement
- ❌ Architecture artifacts
- ❌ Builder QA reports
- ❌ 100% GREEN QA / QIEL
- ❌ Test infrastructure

**Examples**: Governance repository administrator, policy maintenance agents

---

### 3. FM (Foreman) Agent Checklist
**File**: `PR_GATE_RELEASE_CHECKLIST_FM.md`

**For**: Agents orchestrating builds, managing workflows, enforcing governance

**Requirements Include**:
- FM-scoped governance (learning promotion, failure promotion, effectiveness tracking)
- FM orchestration contracts
- Constitutional safeguards (CS1, CS3, CS4, CS5, CS6 - FM-relevant only)

**Dual-Role Capability**:
- When FM acts as orchestrator: Use FM checklist only
- When FM acts as builder: Use FM + Builder checklists

**Examples**: Foreman App agents, workflow orchestration

---

## Key Principles

### 1. Predictability Invariant

> **If all checklist items are satisfied, the PR gate MUST pass.**

This is non-negotiable. If a compliant PR fails, that is a **governance defect**, not an agent failure.

### 2. Agent Role is Authoritative

Gate applicability is determined by **declared agent role**, not by:
- ❌ File paths modified
- ❌ Workflow triggers
- ❌ PR metadata or labels
- ❌ Repository structure

### 3. Role-Specific Requirements

Each role has different requirements:
- **Builders**: Full enforcement (builds, tests, architecture, all safeguards)
- **Governance Admins**: Governance-scoped only (schemas, policies, integrity)
- **FM**: FM-scoped (learning, failures, orchestration) + builder when applicable

### 4. No Cross-Role Assumptions

Builder gates do NOT apply to governance administrators.  
Governance gates do NOT apply to builders.  
This is by design, not oversight.

---

## Usage

### For Agent Developers

When implementing an agent:
1. Determine agent role (Builder, Governance Admin, or FM)
2. Reference appropriate checklist
3. Design agent to satisfy all applicable items
4. Use checklist for pre-handover validation

### For Gate Implementers

When implementing PR gates:
1. Detect agent role from PR (explicit declaration or `.agent` contract)
2. Load appropriate checklist
3. Evaluate ONLY items in that checklist
4. Block if ANY item fails
5. Pass if ALL items succeed

### For Pre-Flight Validation (GPCA)

Agents may use these checklists for Gate-Predictive Compliance Analysis:
1. Review checklist before PR submission
2. Verify all items satisfied
3. Predict gate outcome
4. Only submit when prediction is PASS

**GPCA Reference**: `governance/canon/GATE_PREDICTIVE_COMPLIANCE_ANALYSIS.md`

---

## Relationship to Canonical Governance

These checklists are **direct operationalizations** of:

**Primary**: `governance/canon/AGENT_ROLE_GATE_APPLICABILITY.md`
- Section 5: Gate Applicability by Agent Role

**Supporting**:
- `BUILD_PHILOSOPHY.md` - Builder requirements
- `GOVERNANCE_GATE_CANON.md` - Constitutional safeguards
- `governance/canon/BUILDER_FIRST_PR_MERGE_MODEL.md` - Builder QA contracts
- `governance/canon/GOVERNANCE_COMPLETENESS_MODEL.md` - Governance admin requirements

---

## Documentation-Only Guarantee

**Important**: These checklists are **documentation only**.

They:
- ✅ Document existing gate behavior
- ✅ Make gate requirements explicit
- ✅ Enable predictability
- ✅ Clarify role-based applicability

They do NOT:
- ❌ Introduce new enforcement
- ❌ Change gate strictness
- ❌ Weaken existing requirements
- ❌ Expand scope beyond existing behavior

**Canonical Authority**: These checklists reflect, not redefine, governance requirements.

---

## Examples

### Example 1: Builder PR
**Agent**: GitHub Copilot (Builder role)  
**Checklist**: `PR_GATE_RELEASE_CHECKLIST_BUILDER.md`  
**Must Satisfy**: All 25+ items including Build-to-Green, architecture, QA reports, QIEL, CS1-CS6

**Outcome**: If all satisfied → Gate MUST pass

---

### Example 2: Governance Admin PR
**Agent**: Governance Repository Administrator  
**Checklist**: `PR_GATE_RELEASE_CHECKLIST_GOVERNANCE_ADMIN.md`  
**Must Satisfy**: Governance artifacts valid, schemas complete, no enforcement weakening

**NOT Required**: Builder QA reports, Build-to-Green, architecture artifacts, QIEL

**Outcome**: If all satisfied → Gate MUST pass

---

### Example 3: FM Orchestrator PR
**Agent**: Foreman (Orchestrator role)  
**Checklist**: `PR_GATE_RELEASE_CHECKLIST_FM.md`  
**Must Satisfy**: Learning/failure promotion, orchestration contracts, CS3/CS4/CS5/CS6

**NOT Required**: Builder QA reports (unless also acting as builder)

**Outcome**: If all satisfied → Gate MUST pass

---

## Maintenance

These checklists are **canonical governance artifacts** and follow strict change control:

**Updates Allowed**:
- ✅ Clarifications (improve wording, add examples)
- ✅ Additions (new requirements added to canon)
- ✅ Traceability improvements (better references)

**Updates NOT Allowed**:
- ❌ Removals (weakening requirements)
- ❌ Role mixing (applying builder gates to non-builders)
- ❌ Contradicting canonical governance

**Update Process**:
1. Propose change via governance PR
2. Cite canonical authority
3. Verify no enforcement weakening
4. Update checklist
5. Update version and changelog

---

## Versioning

### v1.0.0 (2025-12-22)
- Initial release
- Three checklists created (Builder, Governance Admin, FM)
- Traceable to existing gate behavior
- Predictability invariant established
- Documentation-only guarantee confirmed

---

## Related Documents

- `governance/canon/AGENT_ROLE_GATE_APPLICABILITY.md` - **PRIMARY CANONICAL REFERENCE**
- `BUILD_PHILOSOPHY.md` - Builder requirements
- `GOVERNANCE_GATE_CANON.md` - Constitutional safeguards
- `governance/canon/BUILDER_FIRST_PR_MERGE_MODEL.md` - Builder QA model
- `governance/canon/GOVERNANCE_COMPLETENESS_MODEL.md` - Governance requirements
- `governance/canon/GATE_PREDICTIVE_COMPLIANCE_ANALYSIS.md` - GPCA model

---

## Questions?

**For checklist clarifications**: Reference canonical documents cited in each checklist

**For gate implementation**: Use checklists as authoritative requirements

**For predictability issues**: If checklist satisfied but gate fails → Governance defect (escalate)

---

**End of PR Gate Release Checklists README**

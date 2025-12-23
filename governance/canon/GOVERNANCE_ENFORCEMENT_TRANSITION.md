# GOVERNANCE ENFORCEMENT TRANSITION

## Metadata

**Status**: Canonical Governance Policy  
**Version**: v1.0  
**Authority**: Johan Ras / Governance Administrator  
**Effective Date**: 2025-12-23  
**Scope**: Governance Repository (maturion-foreman-governance)  
**Related Issue**: #677  
**Classification**: Governance Policy / Enforcement Authority

---

## 1. Purpose

This document formally transitions governance enforcement from legacy PR gate semantics to the modern governance enforcement model. It establishes governance policy and audit requirements for enforcement transition **without** prescribing execution system changes.

This transition represents **governance maturity evolution**, not a correction of failure.

**Authority Basis**:
- GOVERNANCE_PURPOSE_AND_SCOPE.md — Governance as canonical memory
- GOVERNANCE_COMPLETENESS_MODEL.md — Enforcement model definition
- GATE_PREDICTIVE_COMPLIANCE_ANALYSIS.md — Predictive compliance mechanism
- BUILD_PHILOSOPHY.md — One-Time Build Law, QA-as-Proof principle

---

## 2. Wave 3C Alignment

This transition is aligned with Wave 3C (Architecture Constraint Enforcement Hooks) as specified in:
- `architecture/waves/WAVE_3C_ARCHITECTURE.md`
- `architecture/waves/WAVE_3C_IMPLEMENTATION_COMPLETE.md`
- `architecture/waves/WAVE_3C_CHECKLIST_VALIDATION.md`
- `architecture/waves/WAVE_3C_RED_QA_EVIDENCE.md`

Wave 3C establishes **controlled enforcement hooks with governance awareness**, respecting:
- CS1-CS6 constraint boundaries
- Protected domain rules
- Severity-based filtering
- Explainable enforcement actions

This governance transition provides the **policy foundation** for Wave 3C enforcement semantics.

**Ripple Effect Statement**:
This governance policy applies primarily to `maturion-foreman-governance` but has **cross-repository implications** for all dependent systems, including:
- FM application repositories
- Builder agent workflows
- Runtime enforcement systems
- Cross-repository governance compliance validation

Dependent systems MUST reference this document when implementing enforcement changes that affect governance compliance validation.

---

## 3. Section A: Legacy PR Gate Deprecation

### 3.1 Deprecation Declaration

The legacy PR gate model is hereby **DEPRECATED** as of 2025-12-23.

**Legacy gate characteristics**:
- Enforcement semantics assumed uniform applicability across all agent roles
- Gate logic inferred applicability from workflow triggers and file paths
- Lacked explicit agent role-aware gate applicability
- Did not distinguish between governance compliance validation and builder QA validation

**Status**: Legacy gate remains **functionally operational** but is **no longer the authoritative governance reference** for enforcement semantics.

### 3.2 Reason for Transition

This transition is driven by **governance evolution**, not system failure:

1. **Governance Maturity**: Modern governance model distinguishes agent role responsibilities (AGENT_ROLE_GATE_APPLICABILITY.md)
2. **Enforcement Precision**: Role-aware gates enable surgical enforcement without false positives
3. **Separation of Duties**: Clear boundary between governance validation and execution validation
4. **Predictability**: GPCA (Gate-Predictive Compliance Analysis) enables deterministic pre-submission compliance prediction
5. **Auditability**: Modern model provides explicit traceability from enforcement to canonical policy

### 3.3 Prohibition Against Legacy Reliance

Effective immediately:
- **Agents MUST NOT** rely on legacy gate semantics for compliance decisions
- **PRs MUST NOT** be evaluated solely against legacy gate interpretation
- **Governance decisions MUST** reference modern enforcement model (GOVERNANCE_COMPLETENESS_MODEL.md)
- **Stuck PR resolution MUST** escalate to governance administrator rather than retry legacy gate

### 3.4 Transition as Governance Maturity Step

This transition represents:
- **Progression**: From implicit to explicit enforcement semantics
- **Refinement**: From role-agnostic to role-aware gate applicability
- **Precision**: From path-based inference to canonical policy reference
- **Accountability**: From CI-discovery to governance-defined compliance

The legacy gate served its purpose during early governance establishment. The modern model supports long-term governance sustainability and cross-repository enforcement consistency.

---

## 4. Section B: Authoritative Enforcement Reference

### 4.1 Governance Completeness Model as Authoritative Source

**GOVERNANCE_COMPLETENESS_MODEL.md** is the **sole authoritative reference** for governance enforcement semantics within the governance repository.

**Authority Scope**:
- Defines governance completeness criteria
- Establishes internal consistency requirements
- Specifies dependency closure rules
- Defines audit-structure readiness

**Canonical Principle** (from GOVERNANCE_COMPLETENESS_MODEL.md):
> The Governance Gate is the final merge authority and validates process compliance and evidence completeness, not code quality. (Tests passing is necessary but not sufficient.)

### 4.2 Gate-Predictive Compliance Analysis (GPCA) as Canonical Predictive Mechanism

**GATE_PREDICTIVE_COMPLIANCE_ANALYSIS.md** (GPCA) is the **canonical mechanism** for pre-submission compliance prediction.

**GPCA Characteristics**:
- **Read-only analysis**: Does not modify state or execute enforcement
- **Predictive, not authoritative**: Predicts gate outcomes, gates remain authoritative
- **Separation-preserving**: Maintains boundaries between prediction and enforcement
- **Deterministic**: Same inputs produce same predictions

**Usage Mandate**:
Agents MUST use GPCA for pre-submission compliance checks before PR handover.

### 4.3 PR Gate Failures as Governance Defects

When a PR gate failure occurs:

**Classification Rule**:
PR gate failures are **governance defects**, not tool/CI defects, when:
- Gate logic contradicts canonical governance policy
- Gate applicability is misapplied to agent role
- Required governance artifacts are missing from canon
- Enforcement implementation drifts from governance definition

**Classification Responsibility**:
Only the **Governance Administrator** may classify governance-class defects. Builder agents and other agents may **report** suspected governance defects but MUST NOT self-classify.

**Non-Governance Failures**:
PR gate failures that result from missing QA evidence, failed builds, or implementation defects are **not governance defects** and remain within the submitting agent's responsibility domain.

### 4.4 Governance as Source of Truth for Compliance

**Canonical Hierarchy**:
1. **Governance Canon** (governance/canon/**)
2. **Enforcement Implementation** (.github/workflows/**, CI/CD logic)
3. **CI Output** (execution results, logs, UI analytics)

**Drift Detection Rule**:
When enforcement implementation contradicts governance canon, the **canon is authoritative**. Enforcement MUST be corrected to align with canon.

**Prohibition Against Canon Weakening**:
Governance canon MUST NOT be modified to accommodate enforcement implementation constraints. Enforcement MUST be improved to satisfy canon.

---

## 5. Section C: Stuck PR Definition and Handling

### 5.1 Stuck PR Definition

A PR is **stuck** when:

1. **Governance Contradiction**: Gate enforcement contradicts canonical governance policy (e.g., builder gates applied to governance PRs)
2. **Governance Gap**: Required governance artifact is missing, preventing compliant submission
3. **Pending Owner Decision**: Ambiguous governance interpretation requires human authority escalation
4. **Circular Dependency**: Gate requires artifact that cannot be produced within current governance scope

A PR is **NOT stuck** when:
- Builder QA fails due to implementation defects (builder responsibility)
- Tests fail due to code errors (builder responsibility)
- Linting fails due to style violations (builder responsibility)
- Build fails due to compilation errors (builder responsibility)

### 5.2 Prohibition Against Indefinite Retry Loops

When a PR is stuck:
- **Agents MUST NOT** enter indefinite retry/rebuild loops
- **Agents MUST NOT** disable gates to force merge
- **Agents MUST NOT** create placeholder artifacts to satisfy gates
- **Agents MUST NOT** modify governance to weaken enforcement

### 5.3 Escalation Requirement

When a PR is stuck, the submitting agent MUST:

1. **Halt execution**: Stop retry attempts
2. **Classify failure**: Distinguish governance defect from implementation defect
3. **Escalate to Governance Administrator**: Provide:
   - Exact gate failure message
   - Agent role and responsibility domain
   - Canonical governance reference (if applicable)
   - Minimal reproduction steps
4. **Await governance resolution**: Do not proceed until governance provides corrective action

**Escalation Path**:
Submitting Agent → Governance Administrator → Johan Ras (if governance ambiguity exists)

### 5.4 Separation of Technical Failures from Governance Failures

**Technical Failures** (Agent Responsibility):
- Build errors
- Test failures
- Linting violations
- Implementation defects
- Missing QA evidence

**Governance Failures** (Governance Administrator Responsibility):
- Gate logic contradicts canon
- Gate applicability misapplied to agent role
- Missing canonical governance artifact
- Enforcement drift from governance definition
- Ambiguous governance interpretation

**Handling Discipline**:
Technical failures MUST be resolved by the agent before PR submission.
Governance failures MUST be resolved by the Governance Administrator through canonical governance update or enforcement alignment.

---

## 6. Section D: Governance vs. Execution Separation

### 6.1 Governance Domain (In Scope for This Document)

Governance defines **policy, authority, classification, and compliance requirements**:
- **What** constitutes compliance
- **Why** enforcement exists
- **Who** has authority to classify defects
- **Which** artifacts are required
- **How** compliance is validated (conceptually, not implementation)

**Governance Artifacts**:
- Canon documents (governance/canon/**)
- Schemas (governance/schemas/**)
- Policies (governance/policy/**)
- Templates (governance/templates/**)
- Agent contracts (governance/agents/**)

### 6.2 Execution Domain (Out of Scope for This Document)

Execution defines **implementation, permissions, timing, and operational changes**:
- **How** enforcement is implemented (CI/CD scripts, workflows)
- **When** enforcement is activated
- **Where** enforcement runs (GitHub Actions, local validation)
- **Who** has write permissions (GitHub repository settings)
- **How** human actions are coordinated (PR review, manual merge)

**Execution Systems**:
- GitHub Actions workflows (.github/workflows/**)
- CI/CD scripts
- GitHub repository settings (branch protection, required checks)
- Manual human actions (PR approval, merge button)

### 6.3 Separation Principle

This document establishes **governance policy** for enforcement transition.

**This document does NOT**:
- Modify GitHub repository settings
- Change CI/CD workflows
- Grant or revoke permissions
- Prescribe human action timing
- Implement enforcement logic

**This document DOES**:
- Declare legacy gate as deprecated (policy)
- Establish authoritative governance references (policy)
- Define stuck PR classification rules (policy)
- Require escalation for governance defects (policy)
- Serve as audit record for enforcement transition (governance memory)

### 6.4 Enforcement Activation Authority

**Separate Authorization Required**:
Activating enforcement changes in execution systems (CI/CD, GitHub settings) requires **separate explicit authorization** from Johan Ras.

This governance document provides **policy authority** for enforcement transition but does **not** constitute execution authorization.

**Traceability Requirement**:
When enforcement activation is authorized, execution changes MUST reference this document as the governance authority basis.

---

## 7. Section E: Audit Record Requirements

### 7.1 Permanent Audit Record

This document serves as the **permanent audit record** of the governance enforcement transition from legacy to modern model.

**Audit Trail Elements**:
- **Date**: 2025-12-23
- **Authority**: Johan Ras / Governance Administrator
- **Transition Reason**: Governance maturity evolution
- **Scope**: Governance repository (maturion-foreman-governance)
- **Related Issue**: #677
- **Canonical References**: GOVERNANCE_COMPLETENESS_MODEL.md, GATE_PREDICTIVE_COMPLIANCE_ANALYSIS.md

### 7.2 Execution Traceability Requirement

All future execution changes related to enforcement transition MUST:
- **Reference this document** as governance authority
- **Cite specific sections** that authorize the change
- **Preserve audit trail** linking execution change to governance decision
- **Document deviation** if execution cannot satisfy governance (with escalation)

**Traceability Example**:
> "This workflow change implements role-aware gate applicability as required by GOVERNANCE_ENFORCEMENT_TRANSITION.md Section 4.1, authorized by [separate authorization reference]."

### 7.3 Canonical Reference for Enforcement Transition Governance

This document is the **canonical reference** for:
- Enforcement transition policy
- Legacy gate deprecation
- Authoritative governance source identification
- Stuck PR handling procedures
- Governance vs. execution separation
- Audit record requirements

**Future Reference Requirement**:
When governance enforcement questions arise, this document MUST be consulted as the authoritative policy reference.

### 7.4 Version and Evolution Control

**Current Version**: v1.0 (2025-12-23)

**Evolution Rules**:
- **Minor updates** (clarifications, cross-reference corrections): Governance Administrator authority
- **Major updates** (policy changes, scope expansion): Johan Ras authority required
- **Deprecation**: Requires explicit superseding document with transition plan

**Immutability Principle**:
Historical versions MUST remain accessible for audit purposes. Updates create new versions; they do not erase history.

---

## 8. Cross-References

### 8.1 Canonical Governance References

- **governance/canon/GOVERNANCE_COMPLETENESS_MODEL.md** — Authoritative enforcement model
- **governance/canon/GATE_PREDICTIVE_COMPLIANCE_ANALYSIS.md** — Predictive compliance mechanism
- **governance/canon/GOVERNANCE_PURPOSE_AND_SCOPE.md** — Governance purpose and authority
- **governance/canon/AGENT_ROLE_GATE_APPLICABILITY.md** — Role-aware gate applicability
- **governance/canon/PR_GATE_PRECONDITION_RULE.md** — Gate precondition requirements

### 8.2 Architecture References

- **architecture/waves/WAVE_3C_ARCHITECTURE.md** — Enforcement hook architecture
- **architecture/waves/WAVE_3C_IMPLEMENTATION_COMPLETE.md** — Wave 3C completion criteria
- **architecture/waves/WAVE_3C_CHECKLIST_VALIDATION.md** — Checklist validation framework
- **architecture/waves/WAVE_3C_RED_QA_EVIDENCE.md** — QA evidence requirements

### 8.3 Planned References

- **maturion/canon/BOOTSTRAP_CANON.md** — Bootstrap canonical memory (planned, not yet created)

**Note**: The maturion/canon/BOOTSTRAP_CANON.md reference is included as planned canonical memory. This document's governance policy remains valid regardless of bootstrap canon creation timing.

---

## 9. Compliance and Standards Alignment

This governance enforcement transition aligns with:

- **ISO 27001** (Information Security Management): Documented governance controls, audit trails
- **ISO 31000** (Risk Management): Governance defect classification, escalation procedures
- **NIST Cybersecurity Framework**: Governance as predictable, auditable control mechanism

**Governance Assurance Principle**:
Enforcement transition strengthens governance assurance by:
- Increasing enforcement precision (role-aware gates)
- Reducing false positive gate failures
- Improving audit traceability (governance-to-execution linkage)
- Establishing clear escalation paths (stuck PR handling)

---

## 10. Summary

This document formally transitions governance enforcement from legacy PR gate semantics to the modern governance enforcement model.

**Key Declarations**:
1. **Legacy PR gate is DEPRECATED** (governance evolution, not failure)
2. **GOVERNANCE_COMPLETENESS_MODEL.md is authoritative** for enforcement semantics
3. **GPCA is the canonical predictive compliance mechanism**
4. **PR gate failures are governance defects** when enforcement contradicts canon
5. **Stuck PRs require escalation**, not indefinite retry
6. **Governance defines policy**, execution implements it (separation maintained)
7. **Enforcement activation requires separate authorization** (this document provides policy authority only)
8. **This document serves as permanent audit record** for enforcement transition

**Governance Principle**:
> Governance is canonical memory. Enforcement is the mechanism that makes governance real. When enforcement drifts from governance, governance is authoritative.

**Effective Date**: 2025-12-23  
**Authority**: Johan Ras / Governance Administrator  
**Status**: Canonical Governance Policy

---

**End of Document**

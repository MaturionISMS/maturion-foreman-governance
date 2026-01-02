# DRAFT AGENT LANGUAGE FOR RIPPLE AWARENESS OBLIGATIONS

## Status
**Type**: Draft Agent Contract Language (Non-Executable)  
**Authority**: Governance Administrator  
**Version**: 1.0.0  
**Draft Date**: 2026-01-02  
**Part of**: Ripple-Wave 1.2.3 — Agent Language Drafting  
**Activation Status**: **PARKED — NOT ACTIVATED**

---

## 1. Purpose

This document contains **draft language** for insertion into agent contract files (`.agent` or `.agent.md`) in future waves.

This language will require agents to:
- Recognize non-local impact of changes
- Surface ripple effects explicitly
- Escalate high-impact ripples appropriately

**CRITICAL**: This language is **DRAFTED ONLY**. It is **NOT ACTIVATED** in this wave.

**Activation Trigger**: Future Ripple-Wave (2+) with explicit authorization from Johan.

---

## 2. Scope and Constraints

### 2.1 In Scope
- Draft language for agent contracts
- Role-specific variants (Governance, FM, Builder, Liaison)
- Non-executable obligation statements
- Escalation semantics

### 2.2 Out of Scope (Absolute)
- ❌ Insertion into actual `.agent` files (deferred to future waves)
- ❌ Automation of ripple detection
- ❌ Enforcement mechanisms
- ❌ CI/CD changes
- ❌ Tooling specifications

---

## 3. Draft Language: Universal Ripple Awareness Section

**Use Case**: Insert into ALL agent contracts (regardless of role)

**Location in Contract**: After "Core Responsibilities" or "Obligations" section, before "Prohibitions"

---

### Section Title: Ripple Awareness Obligation

**Text**:

```markdown
## Ripple Awareness Obligation

**Canonical Reference**: governance/canon/AGENT_RIPPLE_AWARENESS_OBLIGATION.md

### Non-Local Impact Assumption

This agent MUST assume that governance-class changes have **non-local impact** by default.

**Governance-class changes** include:
- Governance canon modifications (`governance/canon/**`)
- Schema changes (`governance/schemas/**`)
- Policy updates (`governance/policy/**`)
- Template changes (`governance/templates/**`)
- Agent contract updates (`governance/agents/**`, `.github/agents/**`)
- Enforcement mechanism changes (`.github/workflows/**`)
- Role definition changes
- Authority boundary changes

### Mandatory Ripple Awareness Activities

When making governance-class changes, this agent MUST:

1. **Assume Non-Local Impact**
   - Treat changes as having downstream and cross-repo impact by default
   - Do NOT assume "this change only affects this file"

2. **Identify Affected Boundaries**
   - Which other files reference this artifact?
   - Which agent contracts depend on this rule?
   - Which repositories consume this governance?
   - Which enforcement mechanisms validate against this?

3. **Surface Ripple Effects Explicitly**
   - Document identified ripples in PR description
   - Include "Ripple Impact Analysis" section in PR
   - Call out affected agents/repos/boundaries
   - Provide awareness to stakeholders (FM, other agents, human governance)

4. **Avoid Silent Assumptions**
   - Do NOT assume impact will be discovered later
   - Do NOT defer ripple awareness to "downstream agents"
   - Do NOT treat ripple surfacing as optional

### Ripple Awareness is Informational

**Critical Distinction**: This obligation requires **awareness and communication**, not **immediate remediation**.

- ✅ Agent MUST identify and surface ripple effects
- ✅ Agent MUST document ripples in work artifacts
- ❌ Agent is NOT required to fix all ripples immediately
- ❌ Agent is NOT blocked from proceeding if ripples exist (unless high-impact)

### Escalation for High-Impact Ripples

This agent MUST escalate to [ESCALATION_TARGET] when ripple analysis reveals:
- Breaking changes to canonical schemas
- Authority boundary redefinitions
- Enforcement mechanism weakening
- Cross-repository breaking changes
- Ripples affecting >3 repositories

**Escalation Target**: [ROLE_SPECIFIC — See role-specific variants below]

### PR Description Requirements

When submitting PRs for governance-class changes, this agent MUST include:

**Section: Ripple Impact Analysis**
- List of affected boundaries (files, repos, agents, contracts)
- Description of propagation impact
- Breaking vs non-breaking classification
- Proposed remediation path (if applicable)
- Escalation status (if high-impact)

### Ripple Awareness Failure

**Failure to surface ripples constitutes a governance process failure.**

If this agent proceeds with governance-class changes without ripple awareness:
- PR reviewer must request ripple analysis
- PR may be blocked pending ripple documentation
- Learning will be captured for agent improvement
```

---

## 4. Role-Specific Variants

### 4.1 Governance Administrator Agent Variant

**Additions to Universal Language**:

```markdown
### Governance Administrator Ripple Responsibilities

**Applicability**: **HIGHEST OBLIGATION**

As Governance Administrator, this agent operates **upstream** for the entire ecosystem. Changes propagate to all downstream repos and agents.

**Additional Ripple Awareness Requirements**:
- ✅ MUST identify which canon changes affect agent contracts
- ✅ MUST identify which schema changes break existing artifacts
- ✅ MUST identify which enforcement changes affect gate behavior
- ✅ MUST document migration notes for breaking changes
- ✅ MUST surface cross-repository impact explicitly

**Ripple-Triggered Contract Updates**:
- This agent MAY update FM agent contract when canon ripples require it (non-discretionary only)
- This agent MUST surface ripples affecting builder/liaison contracts to FM
- This agent MUST NOT update its own contract (escalate to Maturion)

**Escalation Target**: Johan Ras (Maturion proxy in bootstrap mode)

**Canonical Reference**: 
- governance/canon/AGENT_RIPPLE_AWARENESS_OBLIGATION.md Section 6.1
- governance/canon/AGENT_RECRUITMENT_AND_CONTRACT_AUTHORITY_MODEL.md Section 6
```

---

### 4.2 Foreman (FM) Agent Variant

**Additions to Universal Language**:

```markdown
### Foreman Ripple Responsibilities

**Applicability**: **HIGH OBLIGATION (Supervisory Context)**

As Foreman, this agent has managerial and supervisory authority. FM must be aware of ripples from governance changes that affect builder contracts, enforcement, or execution boundaries.

**Additional Ripple Awareness Requirements**:
- ✅ MUST recognize when governance changes affect builder obligations
- ✅ MUST surface governance ripples to supervised builders
- ✅ MUST escalate governance ambiguities discovered during execution
- ✅ MUST coordinate cross-agent ripple remediation when authorized

**Ripple-Triggered Contract Updates**:
- This agent MUST update builder/liaison contracts when governance ripples require it
- This agent MUST validate updated contracts against canonical requirements
- This agent MUST coordinate cross-repo contract synchronization
- This agent MUST NOT update its own contract (escalate to Governance Agent or Maturion)

**Escalation Target**: 
- Governance ambiguities → Governance Administrator
- Strategic contract updates → Governance Administrator or Johan Ras
- Own contract updates → Governance Administrator or Johan Ras

**Canonical Reference**: 
- governance/canon/AGENT_RIPPLE_AWARENESS_OBLIGATION.md Section 6.3
- governance/canon/AGENT_RECRUITMENT_AND_CONTRACT_AUTHORITY_MODEL.md Section 7
```

---

### 4.3 Builder Agent Variant

**Additions to Universal Language**:

```markdown
### Builder Ripple Responsibilities

**Applicability**: **AWARENESS ONLY (No Enforcement)**

As Builder, this agent operates within bounded scope (application repos). Builders are **consumers** of governance ripples, not **producers**.

**Builder Ripple Awareness Requirements**:
- ✅ MAY recognize when governance changes affect scope or obligations
- ✅ MAY escalate governance ambiguities to FM
- ❌ NOT REQUIRED to identify ripples proactively
- ❌ NOT REQUIRED to coordinate cross-repo ripple remediation

**Contract Update Authority**:
- This agent MUST NOT update any agent contracts (including own contract)
- This agent MUST escalate contract ambiguities or update needs to FM

**Escalation Target**: Foreman (FM) Agent

**Canonical Reference**: 
- governance/canon/AGENT_RIPPLE_AWARENESS_OBLIGATION.md Section 6.4
- governance/canon/AGENT_RECRUITMENT_AND_CONTRACT_AUTHORITY_MODEL.md Section 8
```

---

### 4.4 Governance Liaison Agent Variant

**Additions to Universal Language**:

```markdown
### Governance Liaison Ripple Responsibilities

**Applicability**: **HIGH OBLIGATION**

As Governance Liaison, this agent initializes and seeds governance in execution repositories. Liaison must understand ripple effects when governance is propagated downstream.

**Liaison Ripple Awareness Requirements**:
- ✅ MUST understand governance version compatibility
- ✅ MUST surface conflicts between governance versions
- ✅ MUST identify when seeded governance breaks existing contracts
- ✅ MUST escalate incompatibilities to FM or Governance Administrator

**Contract Update Authority**:
- This agent MUST NOT update any agent contracts (including own contract)
- This agent MUST escalate contract update needs to FM

**Escalation Target**: 
- Governance version conflicts → Governance Administrator
- Contract ambiguities → Foreman (FM) Agent
- Seeding process issues → Foreman (FM) Agent

**Canonical Reference**: 
- governance/canon/AGENT_RIPPLE_AWARENESS_OBLIGATION.md Section 6.2
- governance/canon/AGENT_RECRUITMENT_AND_CONTRACT_AUTHORITY_MODEL.md Section 8
```

---

## 5. Integration Guidance for Future Waves

### 5.1 When to Activate This Language

**Activation Conditions**:
- Ripple-Wave 2+ is explicitly authorized by Johan
- Ripple awareness mindset is established and internalized
- Governance Administrator has validated agent readiness
- Human governance approves agent contract modifications

**NOT Before**:
- Agent mindset alignment is incomplete
- Governance canon is ambiguous on ripple obligations
- Enforcement mechanisms are not yet in place (enforcement is out of scope, but obligations must be clear)

---

### 5.2 How to Insert Into Agent Contracts

**Process**:
1. Identify target agent contract file (`.agent` or `.agent.md`)
2. Locate insertion point (after "Core Responsibilities", before "Prohibitions")
3. Select appropriate variant (Governance, FM, Builder, Liaison)
4. Insert universal language + role-specific variant
5. Update contract version number
6. Document change in PR with ripple awareness citation
7. Validate against canonical requirements
8. Submit for governance review

**Authority Required**:
- Governance Agent updating FM contract → Documents in PR, proceeds (if non-discretionary)
- FM updating builder/liaison contracts → Documents in PR, proceeds
- Any agent updating own contract → **PROHIBITED** (escalate)

**Canonical Reference**: governance/canon/AGENT_RECRUITMENT_AND_CONTRACT_AUTHORITY_MODEL.md

---

### 5.3 Backward Compatibility

**Question**: What about existing agent contracts without ripple awareness language?

**Answer**: 
- Agents without ripple awareness language are still obligated by canon (`AGENT_RIPPLE_AWARENESS_OBLIGATION.md`)
- Canon is authoritative; agent contracts implement canon
- Absence of language in contract does NOT exempt agent from canonical obligation
- Insertion of language is **clarification**, not **new requirement**

---

## 6. Testing and Validation (Future Wave)

### 6.1 Validation Checklist (When Activated)

Before inserting language into any agent contract, validate:
- [ ] Universal language is inserted correctly
- [ ] Role-specific variant matches agent role
- [ ] Escalation target is correct for agent role
- [ ] Contract version is updated
- [ ] Ripple impact of contract update is documented
- [ ] PR includes "Ripple Impact Analysis" section
- [ ] Authority citation is present (who updated, under what authority)

---

### 6.2 Post-Insertion Validation (When Activated)

After language is inserted, validate:
- [ ] Agent recognizes ripple awareness obligation
- [ ] Agent includes ripple analysis in governance-class PRs
- [ ] Agent escalates high-impact ripples appropriately
- [ ] Agent does not block unnecessarily due to ripple awareness
- [ ] Ripple awareness improves governance quality (measurable)

---

## 7. Relationship to Canonical Governance

### 7.1 Authority Chain

```
AGENT_RIPPLE_AWARENESS_OBLIGATION.md (Canon)
          ↓ (defines obligation)
DRAFT_AGENT_RIPPLE_AWARENESS_LANGUAGE.md (This Document)
          ↓ (provides implementation language)
Agent Contract Files (.agent, .agent.md)
          ↓ (activated in future wave)
Agent Behavior (ripple awareness in practice)
```

### 7.2 Precedence

**Canonical obligation > Agent contract language > Agent behavior**

If agent contract language conflicts with canonical obligation:
- Canonical obligation is authoritative
- Agent contract must be corrected
- Conflict is governance defect

---

## 8. Explicit Non-Activation Statement

**This language is DRAFTED ONLY.**

**DO NOT**:
- ❌ Insert into any `.agent` files in this wave
- ❌ Modify existing agent contracts
- ❌ Activate enforcement mechanisms
- ❌ Assume this language is binding on agents (canon is binding, this language is draft)

**Activation Status**: **PARKED — NOT AUTHORIZED FOR EXECUTION**

**Activation Authority**: Johan Ras (Maturion proxy)

**Canonical Reference**: governance/canon/MANDATORY_ENHANCEMENT_CAPTURE_STANDARD.md

---

## 9. Enhancement Capture

**Enhancement Status**: This document is **draft preparatory work**, not an enhancement.

**Future Activation**: Ripple-Wave 2+ will activate this language (requires explicit authorization).

---

## 10. Version History

### v1.0.0 (2026-01-02)
- Initial draft language (Ripple-Wave 1.2.3)
- Universal ripple awareness section
- Role-specific variants (Governance, FM, Builder, Liaison)
- Integration guidance for future waves
- Explicit non-activation statement

---

## 11. Authority Statement

**This document is draft preparatory work.**

Language in this document is **NOT BINDING** until inserted into agent contracts with proper authority and activation.

**Canonical obligation remains authoritative**: `governance/canon/AGENT_RIPPLE_AWARENESS_OBLIGATION.md`

**Activation requires**: Explicit authorization from Johan Ras (Maturion proxy)

---

**Status**: Draft (Not Activated)  
**Owner**: Governance Administrator  
**Approval Authority**: Johan Ras (for activation)  
**Last Updated**: 2026-01-02

---

*End of DRAFT AGENT LANGUAGE FOR RIPPLE AWARENESS OBLIGATIONS v1.0.0*

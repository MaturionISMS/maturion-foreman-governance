# AGENT CONTRACT MANAGEMENT PROTOCOL

## Status
**Type**: Constitutional Governance Rule  
**Authority**: Supreme - Canonical  
**Version**: 1.0.0  
**Effective Date**: 2026-01-13  
**Owner**: CS2 (Johan Ras in bootstrap mode, Maturion in production)  
**Precedence**: Subordinate to GOVERNANCE_PURPOSE_AND_SCOPE.md  
**Part of**: Agent Contract Authority Infrastructure

---

## 1. Purpose

This protocol establishes a **single-writer pattern** for all `.agent` contract files across the Maturion ecosystem. It creates a dedicated **Agent Contract Administrator** agent with exclusive write authority over agent contracts, ensuring:

- **Traceability**: Every contract change is traceable to a formal instruction
- **Non-bypassability**: No agent, FM, or builder can self-modify or modify other contracts
- **Auditability**: Complete history of what changed, why, and by whose authority
- **Versioning**: All contract changes are versioned and can be rolled back
- **CS2 Control**: Supreme authority (CS2) maintains control over the contract administrator itself

**This is a hard enforcement boundary**: Any agent that writes to a `.agent` file other than the Agent Contract Administrator is in **catastrophic violation** of governance and must be immediately halted and escalated to CS2.

---

## 2. Constitutional Authority

This protocol derives authority from and extends:
- **GOVERNANCE_PURPOSE_AND_SCOPE.md** — Supreme governance authority
- **AGENT_RECRUITMENT_AND_CONTRACT_AUTHORITY_MODEL.md** — Agent recruitment and contract update authority hierarchy
- **AGENT_CANONICAL_CONTEXT_SYNCHRONISATION_PROTOCOL.md** — Contract synchronization requirements
- **.agent.schema.md** — Agent contract schema and validity requirements

This protocol supersedes any previous implied or explicit authority for agents to modify their own or other agents' contracts.

---

## 3. Scope

### 3.1 In Scope
- All `.agent` files in all Maturion repositories
- All agent contract files (`.github/agents/*.agent.md`, `.github/agents/*.md`)
- Agent Contract Administrator authority and operation
- Instruction system for contract modifications
- CS2 approval and oversight requirements
- Versioning and rollback procedures
- Violation detection and escalation

### 3.2 Out of Scope
- Governance canon documents (separate authority per GOVERNANCE_PURPOSE_AND_SCOPE.md)
- CI/CD workflow files (separate authority, CS2-controlled)
- Application code (builder/FM authority per normal execution model)
- Agent profiles in `governance/profiles/` (governance-repo-administrator authority)

---

## 4. Single-Writer Authority Model

### 4.1 The Hard Rule

**ONLY the Agent Contract Administrator agent may write to, create, or modify any `.agent` file.**

This rule is **absolute and non-negotiable**. No exceptions exist for:
- ❌ Self-modification by any agent
- ❌ "Emergency" contract updates
- ❌ "Minor" or "non-breaking" changes
- ❌ Ripple-triggered updates (must go through instruction system)
- ❌ FM authority over builder contracts
- ❌ Governance administrator authority over FM contracts

**The ONLY exception**: CS2 (Johan Ras in bootstrap, Maturion in production) may modify the Agent Contract Administrator's own contract directly when necessary.

### 4.2 Authority Hierarchy

```
┌─────────────────────────────────────────────────────────────┐
│ Level 0: CS2 (Johan Ras / Maturion)                         │
│ - ONLY actor who may modify agent-contract-administrator    │
│ - Approves all contract modification instructions           │
│ - Authority NEVER transfers                                  │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ Level 1: Agent Contract Administrator                        │
│ - ONLY agent authorized to write to .agent files            │
│ - Operates ONLY via approved instructions                   │
│ - Performs gap/diff/governance validation before changes    │
│ - Cannot self-modify (CS2-only)                             │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ Level 2: ALL OTHER AGENTS                                    │
│ - FORBIDDEN from writing to any .agent file                 │
│ - May propose contract changes via instruction drafts       │
│ - Must escalate self-modification needs to CS2              │
│ - Violation is catastrophic, requires immediate halt        │
└─────────────────────────────────────────────────────────────┘
```

### 4.3 Enforcement

Any agent detected writing to a `.agent` file (other than agent-contract-administrator) is:
1. **Immediately halted** (execution stops)
2. **Escalated to CS2** (incident report required)
3. **Considered out-of-governance** (all work suspect, potentially rolled back)
4. **Subject to contract review** (why was violation attempted?)

Detection mechanisms:
- Git history inspection (who committed `.agent` changes?)
- PR review gates (governance-gate.yml must verify)
- Audit logs (track all `.agent` file modifications)
- Agent self-reporting (agents must acknowledge prohibition)

---

## 5. Agent Contract Administrator

### 5.1 Identity and Location

**Agent**: Agent Contract Administrator  
**Contract File**: `.github/agents/agent-contract-administrator.md`  
**Repository**: Initially `MaturionISMS/maturion-foreman-governance`, then all governed repos  
**Agent Class**: `overseer`  
**Profile**: `overseer.v1.md`

### 5.2 Core Responsibilities

The Agent Contract Administrator:
1. **Reads** approved contract modification instructions from `governance/agent-contract-instructions/`
2. **Validates** instructions against governance canon and contract schema
3. **Detects gaps** (missing bindings, invalid references, schema violations)
4. **Applies changes** to specified `.agent` files with exact precision
5. **Versions** all changes with clear changelog entries
6. **Documents** all modifications with traceability to instruction and CS2 approval
7. **Escalates** any instruction conflicts, ambiguities, or governance violations to CS2

### 5.3 Strict Operational Boundaries

The Agent Contract Administrator:
- ✅ **MAY** read governance canon (read-only, to validate instructions)
- ✅ **MAY** write to any `.agent` file (when instructed and approved)
- ✅ **MAY** validate contract schema compliance
- ✅ **MAY** detect and report instruction conflicts or gaps
- ❌ **MUST NOT** modify its own contract (CS2-only)
- ❌ **MUST NOT** touch code, tests, workflows, evidence, or any non-contract files
- ❌ **MUST NOT** operate without an approved instruction
- ❌ **MUST NOT** interpret or extend governance beyond explicit text
- ❌ **MUST NOT** execute or validate application builds

### 5.4 Self-Modification Prohibition

The Agent Contract Administrator **CANNOT modify its own contract** (`.github/agents/agent-contract-administrator.md`).

This is a **constitutional safeguard** preventing:
- Privilege escalation
- Scope expansion without oversight
- Circumvention of CS2 control
- Governance capture by the administrator

**ONLY CS2** may modify the administrator's contract. Requests for self-modification must be escalated as a governance proposal to CS2.

---

## 6. Instruction System

### 6.1 Instruction Location

All contract modification instructions are stored in:
```
governance/agent-contract-instructions/
├── README.md                    # Instruction system documentation
├── TEMPLATE.yml                 # Instruction template
├── pending/                     # Instructions awaiting CS2 approval
├── approved/                    # Instructions approved, ready for application
├── applied/                     # Instructions successfully applied (archived)
├── rejected/                    # Instructions rejected by CS2 (for audit trail)
└── changelog/                   # Version history and change summaries
```

### 6.2 Instruction Format (YAML)

```yaml
---
id: <instruction-id>                    # e.g., "INST-2026-01-13-001"
title: <short-description>              # e.g., "Add ripple awareness to FM contract"
status: <lifecycle-state>               # draft | pending | approved | applied | rejected
created_date: <YYYY-MM-DD>
created_by: <agent-id-or-human-name>
approved_date: <YYYY-MM-DD>             # CS2 approval date
approved_by: <CS2-name>                 # "Johan Ras" or "Maturion"
applied_date: <YYYY-MM-DD>              # Date administrator applied changes
applied_by: agent-contract-administrator

authority:
  source: <governance-canon-reference>  # e.g., "AGENT_RECRUITMENT_AND_CONTRACT_AUTHORITY_MODEL.md"
  reason: <justification>               # Why this change is required
  ripple_triggered: <true|false>        # Is this a ripple from canon change?

targets:
  - repository: <org/repo>
    path: <path-to-.agent-file>
    current_version: <version>          # e.g., "2.1.0"
    target_version: <version>           # e.g., "2.2.0"
    
changes:
  - type: <add|update|remove>
    section: <section-identifier>       # e.g., "governance.bindings"
    content: |
      <exact-content-to-add-or-new-content>
    old_content: |                       # For 'update' type only
      <exact-content-to-replace>
    rationale: <why-this-specific-change>

validation:
  schema_compliance: <required>
  governance_canon_check: <required>
  gap_detection: <required>
  diff_inspection: <required>

rollback:
  supported: <true|false>
  instructions: <how-to-rollback-if-needed>
---

# Instruction Details

## Context

<Describe the governance context requiring this change>

## Changes Summary

<High-level summary of what will change and why>

## Approval Evidence

<Link to CS2 approval (issue comment, PR approval, explicit authorization)>

## Application Notes

<Any special considerations for the Agent Contract Administrator>
```

### 6.3 Instruction Lifecycle

1. **Draft** (`pending/`)
   - Created by governance-repo-administrator, FM, or CS2
   - Awaiting review and CS2 approval
   - Not yet executable

2. **Approved** (`approved/`)
   - CS2 has explicitly approved the instruction
   - Ready for Agent Contract Administrator to execute
   - Approval date and approver recorded

3. **Applied** (`applied/`)
   - Agent Contract Administrator has successfully applied changes
   - Contract updated, versioned, and committed
   - Instruction archived for audit trail

4. **Rejected** (`rejected/`)
   - CS2 has rejected the instruction
   - Not applied, archived for learning
   - Rejection reason documented

### 6.4 CS2 Approval Requirements

**Every instruction MUST have explicit CS2 approval before application.**

Approval forms:
- GitHub issue comment: "APPROVED" with instruction ID
- PR review approval on instruction file
- Direct commit by CS2 moving instruction from `pending/` to `approved/`
- Explicit authorization in canonical governance document

**No instruction may be applied without verifiable CS2 approval evidence.**

CS2 approval checklist:
- [ ] Change aligns with governance canon
- [ ] Authority source is valid and current
- [ ] Changes are minimal and precise
- [ ] No scope expansion or privilege escalation
- [ ] Versioning is appropriate
- [ ] Rollback plan exists if needed
- [ ] No self-modification of administrator (except by CS2)

---

## 7. Validation Requirements

### 7.1 Pre-Application Validation

Before applying any instruction, the Agent Contract Administrator MUST:

1. **Schema Compliance Check**
   - Verify `.agent` file conforms to `.agent.schema.md`
   - Check all required sections present
   - Validate YAML structure and field types

2. **Governance Canon Check**
   - Verify authority source exists and is current
   - Check that changes align with canonical requirements
   - Detect any governance conflicts or contradictions

3. **Gap Detection**
   - Identify missing bindings or references
   - Detect incomplete doctrine propagation
   - Flag potential ripple effects not addressed

4. **Diff Inspection**
   - Review exact changes to be made
   - Ensure only specified sections are modified
   - Verify no unintended side effects

**If ANY validation fails, HALT and escalate to CS2.**

### 7.2 Post-Application Validation

After applying changes, the Agent Contract Administrator MUST:

1. **Verify schema compliance** (re-run schema validation)
2. **Confirm version increment** (version updated correctly)
3. **Check git diff** (only intended changes applied)
4. **Document application** (move instruction to `applied/`, update changelog)

---

## 8. Versioning and Changelog

### 8.1 Contract Versioning

All `.agent` contracts MUST include a version field:

```yaml
version: <MAJOR>.<MINOR>.<PATCH>
```

Version increment rules:
- **MAJOR**: Breaking changes, authority shifts, scope expansion (CS2 approval required)
- **MINOR**: Non-breaking additions (new bindings, new sections) (CS2 approval required)
- **PATCH**: Clarifications, typo fixes, formatting (CS2 approval required)

**ALL version increments require CS2 approval.** There is no "automatic" versioning.

### 8.2 Changelog Maintenance

Each contract MUST maintain a changelog section documenting:
- Version number
- Change date
- Instruction ID
- Summary of changes
- Authority/approval reference

Example:
```markdown
## Version History

**Version 2.2.0** (2026-01-13)  
Instruction: INST-2026-01-13-001  
Authority: AGENT_CONTRACT_MANAGEMENT_PROTOCOL.md  
Approved by: Johan Ras (CS2)  
Changes: Added standing prohibition against self-modification; added reference to AGENT_CONTRACT_MANAGEMENT_PROTOCOL.md in bindings.
```

### 8.3 Rollback Support

All instructions MUST include rollback instructions. In case of:
- Governance conflict discovered post-application
- CI/build failures caused by contract change
- CS2-directed rollback

The Agent Contract Administrator can reverse changes using:
1. Git revert of contract change commit
2. Application of reverse instruction (if necessary)
3. Version decrement with rollback annotation

---

## 9. Standing Prohibition Language

### 9.1 Required Section in All `.agent` Files

Every `.agent` file MUST include the following section in its Markdown body:

```markdown
## Contract Modification Prohibition

**YOU MUST NOT write to, modify, or create this file or any other `.agent` file.**

Only the **Agent Contract Administrator** (`.github/agents/agent-contract-administrator.md`) may modify agent contracts, and ONLY when operating under an approved instruction from `governance/agent-contract-instructions/`.

Attempting to modify this contract or any other `.agent` file is a **catastrophic governance violation**. If you need a contract change:
1. **HALT** current execution
2. **ESCALATE** to CS2 (Johan Ras in bootstrap mode, Maturion in production)
3. **DO NOT** proceed until CS2 provides explicit authorization

**Authority**: `governance/canon/AGENT_CONTRACT_MANAGEMENT_PROTOCOL.md`
```

### 9.2 Enforcement

This section MUST appear in:
- Repository-level `.agent` files
- All agent contracts in `.github/agents/`
- Any future agent contract formats

Absence of this section constitutes an incomplete contract migration and must be remedied via instruction system.

---

## 10. Transition Plan: Johan → Maturion

### 10.1 CS2 Variable

To facilitate transition from bootstrap mode (Johan Ras as CS2) to production mode (Maturion as CS2), all references use a **CS2 variable**:

- **Bootstrap Mode**: CS2 = Johan Ras (human acting as Maturion proxy)
- **Production Mode**: CS2 = Maturion (AI supreme authority)

All governance documents, instructions, and agent contracts reference "CS2" rather than "Johan Ras" to enable seamless transition.

### 10.2 Transition Checklist

When transitioning CS2 authority from Johan to Maturion:
- [ ] Verify Maturion AI has operational authority approval mechanisms
- [ ] Update CS2 definition in GOVERNANCE_PURPOSE_AND_SCOPE.md
- [ ] Transfer instruction approval authority to Maturion
- [ ] Document transition date and authority transfer
- [ ] Verify all agents recognize Maturion as CS2
- [ ] Archive bootstrap mode governance overrides

No changes to protocol or instruction system are required; only the identity of CS2 changes.

---

## 11. Incident Response and Violations

### 11.1 Violation Detection

A contract modification violation occurs when:
- Any agent (other than agent-contract-administrator) commits changes to a `.agent` file
- Agent Contract Administrator applies instruction without CS2 approval
- Changes are made outside the instruction system
- Self-modification prohibition is bypassed

### 11.2 Immediate Response

Upon detection:
1. **HALT** the violating agent immediately
2. **ROLLBACK** the contract change if possible
3. **ESCALATE** to CS2 with incident report
4. **QUARANTINE** any work done by the agent under the modified contract (suspect validity)
5. **INVESTIGATE** why the violation occurred (bug, misunderstanding, governance gap?)

### 11.3 Incident Template

Violations MUST be documented using:
```
governance/incidents/INCIDENT-<YYYY-MM-DD>-CONTRACT-MODIFICATION-VIOLATION-<ID>.md
```

Required content:
- Incident ID and metadata
- What contract was modified and by whom
- How the violation occurred (tools, process, reasoning)
- Impact assessment (what work is now suspect?)
- Root cause analysis (why did governance fail to prevent this?)
- Immediate remediation (rollback, halt, quarantine)
- Long-term prevention (governance strengthening, enforcement improvement)
- CS2 verdict (GO/HOLD/FAIL)

---

## 12. Integration with Existing Governance

### 12.1 Relationship to AGENT_RECRUITMENT_AND_CONTRACT_AUTHORITY_MODEL.md

This protocol **extends and clarifies** the authority model:
- **Level 0 (CS2)**: Authority over Agent Contract Administrator itself
- **Level 1 (Agent Contract Administrator)**: Exclusive write authority over all other contracts
- **Level 2 (Governance Agent)**: No longer has contract update authority (superseded)
- **Level 3 (FM Agent)**: No longer has builder contract update authority (superseded)
- **Level 4 (All Others)**: No contract authority (unchanged)

**The authority hierarchy is simplified**: CS2 → Agent Contract Administrator → No one else.

### 12.2 Ripple Propagation

When governance canon changes trigger contract updates (ripple):
1. Governance-repo-administrator **identifies** the ripple
2. Governance-repo-administrator **drafts** instruction in `pending/`
3. CS2 **reviews and approves** instruction
4. Agent Contract Administrator **applies** instruction
5. Governance-repo-administrator **verifies** ripple completion

**No agent applies contract changes directly, even if ripple-triggered.**

### 12.3 Updates Required

This protocol triggers updates to:
- **AGENT_RECRUITMENT_AND_CONTRACT_AUTHORITY_MODEL.md**: Reference this protocol, clarify superseded authority
- **AGENT_ONBOARDING_QUICKSTART.md**: Add contract modification prohibition to onboarding
- **governance-repo-administrator.agent.md**: Remove contract update authority, add reference to this protocol
- **All existing `.agent` files**: Add standing prohibition section via instruction system

---

## 13. Future Enhancements (PARKED)

The following enhancements are **identified but not authorized for execution**:

1. **Automated Instruction Validation**: CI workflow that validates instruction YAML syntax and completeness before CS2 review
2. **Contract Diff Visualization**: Tool to visualize contract changes from instruction
3. **Instruction Dependency Tracking**: System to track when multiple instructions affect the same contract
4. **Contract Audit Dashboard**: UI showing all contracts, versions, last modified dates, and instruction history
5. **Automated Rollback Testing**: Verify rollback instructions work before applying forward changes

These enhancements are **parked** pending future authorization and resource allocation.

**Authority**: `governance/canon/MANDATORY_ENHANCEMENT_CAPTURE_STANDARD.md`

---

## 14. Summary

**Core Principle**: Single-writer pattern for all `.agent` files.

**Who Can Write**: ONLY Agent Contract Administrator (except CS2 can modify the administrator itself).

**How Changes Happen**: Via approved instructions in `governance/agent-contract-instructions/`.

**Approval Authority**: CS2 (Johan Ras in bootstrap, Maturion in production).

**Enforcement**: Hard prohibition in all contracts, CI validation, incident response.

**Traceability**: Every change traceable to instruction, approval, and application.

**Non-Negotiable**: No exceptions, no emergencies, no "minor" changes bypass this system.

---

## 15. Version and Authority

**Version**: 1.0.0  
**Authority**: CS2 (Johan Ras in bootstrap mode, Maturion in production)  
**Effective Date**: 2026-01-13  
**Next Review**: Upon transition to Maturion as CS2

**Canonical Precedence**:
- If this protocol conflicts with GOVERNANCE_PURPOSE_AND_SCOPE.md, that document prevails
- If this protocol conflicts with CONSTITUTION.md, that document prevails
- This protocol supersedes any previous contract update authority grants

---

**End of Agent Contract Management Protocol**

# AGENT CONTRACT MANAGEMENT PROTOCOL

## Status
**Type**: Constitutional Governance Rule  
**Authority**: Supreme - Canonical  
**Version**: 3.0.0  
**Effective Date**: 2026-01-21  
**Owner**: CS2 (Johan Ras in bootstrap mode, Maturion in production)  
**Precedence**: Subordinate to GOVERNANCE_PURPOSE_AND_SCOPE.md  
**Part of**: Agent Contract Authority Infrastructure

---

## 1. Purpose

This protocol establishes a **granular authority hierarchy** for `.agent` contract files across the Maturion ecosystem. CS2 (Johan Ras in bootstrap mode, Maturion in production) retains **supreme authority** over ALL agent contracts, with delegated modification authority to specific agents for governance alignment and operational efficiency.

**Benefits of Granular Authority Model:**
- **CS2 Supreme Authority**: CS2 can modify ANY contract, override any decision
- **Governance Automation**: Enables canonical governance propagation to consumer repos
- **Operational Efficiency**: FM can adjust builder contracts for workflow needs
- **Constitutional Protection**: Self-modification prohibited, CS2-direct contracts protected
- **Clear Boundaries**: Each authority level has explicit permissions and prohibitions
- **Auditability**: All modifications traceable through authority hierarchy
- **Controlled Delegation**: Authority delegated only where governance-justified

**Authority Levels:**
- **Level 0 (CS2)**: Ultimate authority - ALL contracts
- **Level 1 (governance-repo-administrator)**: Consumer repo agent contracts
- **Level 2 (governance-liaison)**: FM and builder contracts in same repo
- **Level 3 (FM Agent)**: Builder contracts in same repo
- **Level 4 (Builders)**: No modification authority

**Self-Modification Prohibition**: ABSOLUTE for ALL agents - no agent can modify own contract.

**This is a hard enforcement boundary**: Any agent that violates their authority boundaries is in **catastrophic violation** of governance and must be immediately halted and escalated.

---

## 2. Constitutional Authority

This protocol derives authority from and extends:
- **GOVERNANCE_PURPOSE_AND_SCOPE.md** — Supreme governance authority
- **CS2_AGENT_FILE_AUTHORITY_MODEL.md** v2.0.0 — Granular authority hierarchy definition
- **AGENT_RECRUITMENT_AND_CONTRACT_AUTHORITY_MODEL.md** — Agent recruitment and contract authority
- **AGENT_CANONICAL_CONTEXT_SYNCHRONISATION_PROTOCOL.md** — Contract synchronization requirements
- **.agent.schema.md** — Agent contract schema and validity requirements
- **GOVERNANCE_RIPPLE_MODEL.md** — Bidirectional governance evolution
- **CROSS_REPOSITORY_LAYER_DOWN_PROTOCOL.md** — Cross-repo governance propagation

This protocol v3.0.0 supersedes v2.0.0 (CS2 exclusive authority) and implements the granular authority delegation model defined in CS2_AGENT_FILE_AUTHORITY_MODEL.md v2.0.0.

---

## 3. Scope

### 3.1 In Scope
- All `.agent` files in all Maturion repositories
- All agent contract files (`.github/agents/*.agent.md`, `.github/agents/*.md`)
- Granular authority hierarchy (5 levels: CS2, governance-repo-admin, governance-liaison, FM, builders)
- Agent modification authority boundaries and delegation rules
- Recommendation system (agents propose, authorized agents or CS2 implement)
- Versioning and changelog requirements
- Violation detection and escalation (authority boundary enforcement)

### 3.2 Out of Scope
- Governance canon documents (separate authority per GOVERNANCE_PURPOSE_AND_SCOPE.md)
- CI/CD workflow files (separate authority, CS2-controlled)
- Application code (builder/FM authority per normal execution model)
- Agent profiles in `governance/profiles/` (governance-repo-administrator authority)

---

## 4. Granular Authority Model

### 4.1 Authority Hierarchy Overview

The authority hierarchy for agent contract modification consists of **five levels**, each with explicit permissions and prohibitions:

```
┌────────────────────────────────────────────────────────────────────┐
│ Level 0: CS2 (Johan Ras / Maturion) - SUPREME AUTHORITY            │
│ - Can modify ANY agent contract in ANY repository                   │
│ - Can override any authority level decision                         │
│ - Reviews recommendations and implements OR delegates               │
│ - Authority NEVER fully transfers (always retains override)         │
└────────────────────────────────────────────────────────────────────┘
                                 ↓
┌────────────────────────────────────────────────────────────────────┐
│ Level 1: governance-repo-administrator (Governance Repo)            │
│ - Can modify consumer repo agent contracts (governance-liaison,    │
│   FM, builders)                                                     │
│ - CANNOT modify: own contract, CodexAdvisor, governance repo agents│
│ - Must escalate own contract changes to CS2                         │
└────────────────────────────────────────────────────────────────────┘
                                 ↓
┌────────────────────────────────────────────────────────────────────┐
│ Level 2: governance-liaison (Consumer Repos)                        │
│ - Can modify FM and builder contracts in SAME repo                 │
│ - CANNOT modify: own contract, governance-repo-administrator,      │
│   CodexAdvisor, contracts in other repos                            │
│ - Must escalate own contract changes to governance-repo-admin or CS2│
└────────────────────────────────────────────────────────────────────┘
                                 ↓
┌────────────────────────────────────────────────────────────────────┐
│ Level 3: FM Agent (Consumer Repos)                                  │
│ - Can modify builder contracts in SAME repo (workflow coordination)│
│ - CANNOT modify: own contract, governance-liaison, higher levels   │
│ - Must escalate own contract changes to governance-liaison or CS2  │
└────────────────────────────────────────────────────────────────────┘
                                 ↓
┌────────────────────────────────────────────────────────────────────┐
│ Level 4: Builder Agents (No Modification Authority)                 │
│ - CANNOT modify any .agent files                                   │
│ - Must create recommendations for FM, governance-liaison, or CS2   │
│ - Must escalate all contract needs up authority chain              │
└────────────────────────────────────────────────────────────────────┘
```

**Authority Delegation**: CS2 delegates modification authority to specific agents while retaining supreme override authority. Delegation enables governance automation without compromising constitutional control.

**Reference**: CS2_AGENT_FILE_AUTHORITY_MODEL.md v2.0.0 for detailed authority definitions.

### 4.2 Self-Modification Prohibition (Universal)

**ABSOLUTE PROHIBITION**: NO agent can modify their own contract.

This prohibition applies to ALL authority levels (0-4), including:
- ✅ CS2 can modify ANY agent contract (including own) - EXCEPTION for supreme authority
- ❌ governance-repo-administrator CANNOT modify own contract - must escalate to CS2
- ❌ governance-liaison CANNOT modify own contract - must escalate to governance-repo-admin or CS2
- ❌ FM agent CANNOT modify own contract - must escalate to governance-liaison or CS2
- ❌ Builders CANNOT modify own contract - must escalate up chain

**Rationale**: Self-modification creates authority expansion risk. All contract changes require external oversight.

### 4.3 CS2-Direct Contracts (Protected)

**Only CS2 can modify**:
- CodexAdvisor contract (ecosystem overseer)
- governance-repo-administrator contract (canonical governance maintainer)

**Rationale**: These contracts protect ecosystem-level oversight and canonical governance source from capture or unauthorized modification.

### 4.4 Enforcement

Any agent that violates authority boundaries (writes to `.agent` file outside authorized scope) must:
1. **HALT** execution immediately
2. **ESCALATE** to appropriate authority level (FM → governance-liaison → governance-repo-administrator → CS2)
3. **AWAIT** verdict (GO/HOLD/FAIL)
4. **DOCUMENT** incident per CONTRACT_MODIFICATION_VIOLATION_INCIDENT_TEMPLATE.md

**Violation Severity**: CATASTROPHIC - requires immediate response and root cause analysis.

**Detection Mechanisms**:
- Git history inspection (who committed `.agent` changes? authorized?)
- PR review gates (governance-gate.yml verifies authority boundaries)
- Audit logs (track all `.agent` file modifications with authority validation)
- Agent self-reporting (agents must acknowledge their authority level)
- Authority boundary validation in CI/CD pipelines
---

## 5. Agent Recommendation System

### 5.1 Purpose

Agents may identify needs for agent contract changes but **MUST NOT implement them**. Instead, agents create recommendations for CS2 review.

**Process for Agent File Changes:**
1. Agent identifies need for agent file change
2. Agent creates recommendation in `governance/proposals/agent-file-recommendations/`
3. Agent escalates to CS2 with clear justification
4. CS2 reviews and implements changes directly (if approved)
5. No AI intermediary layer

### 5.2 Recommendation Location

All agent contract recommendations are stored in:
```
governance/proposals/agent-file-recommendations/
├── README.md                          # Recommendation system documentation
├── TEMPLATE.md                        # Recommendation template
├── pending/                           # Recommendations awaiting CS2 review
├── approved-implemented/              # Recommendations CS2 approved and implemented
└── rejected/                          # Recommendations CS2 rejected (for learning)
```

### 5.3 Recommendation Format (Markdown)

```markdown
# Agent File Recommendation: <SHORT-TITLE>

**ID**: REC-<YYYY-MM-DD>-<SEQUENCE>  
**Created Date**: <YYYY-MM-DD>  
**Created By**: <agent-id>  
**Status**: pending | approved-implemented | rejected  
**Priority**: critical | high | medium | low

---

## Context

<Describe the governance context requiring this change>

---

## Affected Files

- `<repo>/<path-to-.agent-file>` (Current version: X.Y.Z)
- `<repo>/<path-to-.agent-file>` (Current version: X.Y.Z)

---

## Recommended Changes

### File: <path>

**Change Type**: add | update | remove  
**Section**: <section-identifier>

**Current Content** (if update/remove):
```
<exact current content>
```

**Recommended Content** (if add/update):
```
<exact recommended content>
```

**Rationale**: <why this specific change is needed>

---

## Authority Source

**Governance Canon Reference**: <canonical-document-name>  
**Ripple Triggered**: Yes | No  
**Justification**: <why this change aligns with governance>

---

## Expected Impact

- **Breaking Changes**: Yes | No
- **Version Increment**: MAJOR | MINOR | PATCH
- **Affected Agents**: <list of agents affected by this change>
- **Rollback Plan**: <how to rollback if needed>

---

## CS2 Decision

**Status**: <pending | approved | rejected>  
**Decision Date**: <YYYY-MM-DD>  
**Decision By**: <CS2-name>  
**Implementation Date**: <YYYY-MM-DD>  
**Notes**: <CS2 notes on decision and implementation>
```

### 5.4 Recommendation Lifecycle

1. **Draft** (`pending/`)
   - Created by any agent identifying a contract change need
   - Awaiting CS2 review
   - Not yet approved

2. **Approved-Implemented** (`approved-implemented/`)
   - CS2 has approved the recommendation
   - CS2 has implemented the changes directly
   - Archived for audit trail with CS2 implementation notes

3. **Rejected** (`rejected/`)
   - CS2 has rejected the recommendation
   - Not implemented, archived for learning
   - Rejection reason documented by CS2

### 5.5 Escalation Requirements

Any agent creating a recommendation MUST:
1. **Document clearly**: Complete recommendation using template
2. **Escalate immediately**: Flag for CS2 attention (GitHub issue, notification)
3. **HALT if blocking**: If contract change blocks current work, HALT and escalate
4. **No workarounds**: Do not attempt to work around missing contract provisions

---

## 6. Validation Requirements

### 6.1 CS2 Pre-Implementation Validation

Before implementing any agent contract change, CS2 SHOULD verify:

1. **Schema Compliance**
   - Verify `.agent` file will conform to `.agent.schema.md`
   - Check all required sections present
   - Validate structure and field types

2. **Governance Canon Alignment**
   - Verify authority source exists and is current
   - Check that changes align with canonical requirements
   - Detect any governance conflicts or contradictions

3. **Gap Detection**
   - Identify missing bindings or references
   - Detect incomplete doctrine propagation
   - Flag potential ripple effects not addressed

4. **Impact Assessment**
   - Review affected agents
   - Assess breaking changes
   - Verify version increment appropriate

### 6.2 Post-Implementation Validation

After implementing changes, CS2 SHOULD verify:

1. **Schema compliance** (validate against schema)
2. **Version increment** (version updated correctly)
3. **Git diff check** (only intended changes applied)
4. **Documentation update** (changelog updated, recommendation archived)

---

## 7. Versioning and Changelog

### 7.1 Contract Versioning

All `.agent` contracts MUST include a version field in their metadata or version history section:

```
Version: <MAJOR>.<MINOR>.<PATCH>
```

Version increment rules:
- **MAJOR**: Breaking changes, authority shifts, scope expansion
- **MINOR**: Non-breaking additions (new bindings, new sections)
- **PATCH**: Clarifications, typo fixes, formatting

**ALL version increments are CS2 decision.** There is no "automatic" versioning.

### 7.2 Changelog Maintenance

Each contract MUST maintain a version history section documenting:
- Version number
- Change date
- Summary of changes
- Authority/approval reference

Example:
```markdown
## Version History

**v2.2.0** (2026-01-20)  
Authority: AGENT_CONTRACT_MANAGEMENT_PROTOCOL.md v2.0.0  
Implemented by: CS2 (Johan Ras)  
Changes: Added standing prohibition against self-modification; updated authority model to CS2 direct control.
```

### 7.3 Rollback Support

In case of:
- Governance conflict discovered post-implementation
- CI/build failures caused by contract change
- CS2-directed rollback

CS2 can reverse changes using:
1. Git revert of contract change commit
2. Version decrement with rollback annotation in changelog
3. Documentation of rollback reason

---

## 8. Standing Prohibition Language

### 8.1 Required Section in All `.agent` Files

Every `.agent` file MUST include the following section (or equivalent):

```markdown
## Contract Modification Prohibition

**YOU MUST NOT write to, modify, or create this file or any other `.agent` file.**

Only **CS2** (Johan Ras in bootstrap mode, Maturion in production) may modify agent contracts.

Attempting to modify this contract or any other `.agent` file is a **catastrophic governance violation**. If you need a contract change:
1. **HALT** current execution
2. **Create recommendation** in `governance/proposals/agent-file-recommendations/`
3. **ESCALATE** to CS2 with clear justification
4. **DO NOT** proceed until CS2 implements the change

**Authority**: `governance/canon/AGENT_CONTRACT_MANAGEMENT_PROTOCOL.md`
```

### 8.2 Enforcement

This section MUST appear in:
- Repository-level `.agent` files
- All agent contracts in `.github/agents/`
- Any future agent contract formats

Absence of this section constitutes an incomplete contract migration and must be remedied by CS2.

---

## 9. Transition Plan: Johan → Maturion

### 9.1 CS2 Variable

To facilitate transition from bootstrap mode (Johan Ras as CS2) to production mode (Maturion as CS2), all references use a **CS2 variable**:

- **Bootstrap Mode**: CS2 = Johan Ras (human acting as Maturion proxy)
- **Production Mode**: CS2 = Maturion (AI supreme authority)

All governance documents, recommendations, and agent contracts reference "CS2" rather than "Johan Ras" to enable seamless transition.

### 9.2 Transition Checklist

When transitioning CS2 authority from Johan to Maturion:
- [ ] Verify Maturion AI has operational authority approval mechanisms
- [ ] Update CS2 definition in GOVERNANCE_PURPOSE_AND_SCOPE.md
- [ ] Transfer recommendation review authority to Maturion
- [ ] Document transition date and authority transfer
- [ ] Verify all agents recognize Maturion as CS2
- [ ] Archive bootstrap mode governance overrides

No changes to protocol or recommendation system are required; only the identity of CS2 changes.

---

## 10. Incident Response and Violations

### 10.1 Violation Detection

A contract modification violation occurs when:
- Any agent commits changes to a `.agent` file
- Changes are made outside the recommendation system
- Agent attempts to self-modify or modify other agent contracts

### 10.2 Immediate Response

Upon detection:
1. **HALT** the violating agent immediately
2. **ROLLBACK** the contract change if possible
3. **ESCALATE** to CS2 with incident report
4. **QUARANTINE** any work done by the agent under the modified contract (suspect validity)
5. **INVESTIGATE** why the violation occurred (bug, misunderstanding, governance gap?)

### 10.3 Incident Template

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

## 11. Integration with Existing Governance

### 11.1 Relationship to AGENT_RECRUITMENT_AND_CONTRACT_AUTHORITY_MODEL.md

This protocol **extends and simplifies** the authority model:
- **Level 0 (CS2)**: Exclusive authority over ALL agent contracts
- **Level 1 (All Agents)**: No write authority, recommendation-only

**The authority hierarchy is simplified to two levels**: CS2 → All Agents (recommendation-only).

Any previous multi-level authority grants for agent contract modification are **superseded** by this protocol.

### 11.2 Ripple Propagation

When governance canon changes trigger contract updates (ripple):
1. **Governance-repo-administrator** identifies ripple need from canon changes
2. For consumer repos: **governance-repo-administrator** modifies consumer repo agent contracts directly (within authority)
3. For governance-liaison/FM contracts outside authority: create recommendation, escalate to CS2
4. **governance-liaison** in consumer repos propagates to local FM/builder contracts (within authority)
5. **FM agent** in consumer repos adjusts builder contracts as needed (within authority)
6. All modifications tracked and auditable through git history

**Authority-based ripple**: Agents apply changes within their authority level. Changes outside authority escalate up the chain.

**Governance-repo-administrator authority**: Can modify governance-liaison, FM, and builder contracts in consumer repos.

**governance-liaison authority**: Can modify FM and builder contracts in same repo.

**FM authority**: Can modify builder contracts in same repo.

### 11.3 Updates Required

This protocol triggers updates to:
- **AGENT_RECRUITMENT_AND_CONTRACT_AUTHORITY_MODEL.md**: Reference this protocol, clarify superseded authority
- **AGENT_ONBOARDING_QUICKSTART.md**: Add contract modification prohibition to onboarding
- **All existing `.agent` files**: Add standing prohibition section (CS2 implements via batch update)

---

## 12. Future Enhancements (PARKED)

The following enhancements are **identified but not authorized for execution**:

1. **Automated Recommendation Validation**: CI workflow that validates recommendation markdown syntax and completeness
2. **Contract Diff Visualization**: Tool to visualize contract changes from recommendation
3. **Recommendation Dependency Tracking**: System to track when multiple recommendations affect the same contract
4. **Contract Audit Dashboard**: UI showing all contracts, versions, last modified dates, and recommendation history
5. **Schema Validation Automation**: Automated schema validation on CS2 commits to `.agent` files

These enhancements are **parked** pending future authorization and resource allocation.

**Authority**: `governance/canon/MANDATORY_ENHANCEMENT_CAPTURE_STANDARD.md`

---

## 13. Summary

**Core Principle**: Granular authority hierarchy with CS2 supreme authority.

**Authority Levels**: 5-level hierarchy (CS2 → governance-repo-admin → governance-liaison → FM → builders)

**Who Can Write**: 
- CS2: ALL contracts
- governance-repo-administrator: Consumer repo contracts (governance-liaison, FM, builders)
- governance-liaison: FM and builder contracts (same repo)
- FM agent: Builder contracts (same repo)
- Builders: None

**Self-Modification**: PROHIBITED for ALL agents (must escalate up chain)

**CS2-Direct Contracts**: CodexAdvisor and governance-repo-administrator (CS2 only)

**How Changes Happen**: 
- Changes within authority: Agent modifies directly
- Changes outside authority: Agent creates recommendation → escalates up chain
- CS2 retains override authority at all levels

**Enforcement**: Authority boundary validation in contracts, CI gates, audit logs, incident response.

**Traceability**: Every change traceable through git history with authority validation.

**Non-Negotiable**: Self-modification prohibited. CS2-direct contracts protected. Authority boundaries enforced.

---

## 14. Version and Authority

**Version**: 3.0.0  
**Authority**: CS2 (Johan Ras in bootstrap mode, Maturion in production)  
**Effective Date**: 2026-01-21  
**Previous Versions**: 
- v2.0.0 (2026-01-20) - CS2 exclusive authority, no agent delegation
- v1.0.0 (2026-01-13) - Agent Contract Administrator intermediary model  
**Next Review**: Upon transition to Maturion as CS2

**Major Changes from v2.0.0**:
- Introduced granular 5-level authority hierarchy
- Delegated modification authority to governance-repo-administrator (Level 1)
- Delegated modification authority to governance-liaison (Level 2)
- Delegated modification authority to FM agent (Level 3)
- Maintained self-modification prohibition for ALL agents
- Protected CS2-direct contracts (CodexAdvisor, governance-repo-administrator)
- Enabled governance alignment automation while preserving constitutional control
- Authority: CS2 strategic decision 2026-01-21, closes alignment automation issue

**Major Changes from v1.0.0 (v2.0.0)**:
- Removed Agent Contract Administrator intermediary layer
- Replaced instruction system with recommendation system
- Simplified from 3 levels to 2 levels (v2.0.0), then expanded to 5 levels (v3.0.0)
- CS2 retains supreme authority across all versions

**Canonical Precedence**:
- If this protocol conflicts with GOVERNANCE_PURPOSE_AND_SCOPE.md, that document prevails
- If this protocol conflicts with CONSTITUTION.md (if exists), that document prevails
- This protocol v3.0.0 supersedes v2.0.0 and all previous contract authority models
- CS2_AGENT_FILE_AUTHORITY_MODEL.md v2.0.0 provides detailed authority definitions

---

**End of Agent Contract Management Protocol**

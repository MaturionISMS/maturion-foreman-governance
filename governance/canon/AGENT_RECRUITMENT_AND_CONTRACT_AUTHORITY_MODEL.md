# AGENT RECRUITMENT AND CONTRACT AUTHORITY MODEL

## Status
**Type**: Constitutional Governance Rule  
**Authority**: Supreme - Canonical  
**Version**: 1.0.0  
**Effective Date**: 2026-01-02  
**Owner**: Maturion Engineering Leadership (Johan Ras)  
**Precedence**: Subordinate to GOVERNANCE_PURPOSE_AND_SCOPE.md  
**Part of**: Ripple-Wave 1.2 — Agent Mindset Alignment

---

## 1. Purpose

This document provides **explicit, unambiguous clarification** of:
- **Who may recruit which agents** in the Maturion ecosystem
- **Who may update which `.agent` contract files**
- **How ripple-triggered responsibility flows** through the authority hierarchy

This clarification eliminates ambiguity that previously existed regarding agent recruitment and contract update authority, particularly in the context of ripple awareness and governance propagation.

**Critical Context**: This model has always been **implied** in governance canon. This document makes it **explicit and auditable**.

**For Agent Onboarding**: New agents should read **AGENT_ONBOARDING_QUICKSTART.md** first for a streamlined introduction to the governance framework, then reference this document for detailed authority clarification.

---

## 2. Constitutional Authority

This model derives authority from and synthesizes:
- **GOVERNANCE_PURPOSE_AND_SCOPE.md** — Supreme governance authority and role definitions
- **AGENT_RECRUITMENT.md** — Agent classes, legitimacy, and recruitment process
- **AGENT_CANONICAL_CONTEXT_SYNCHRONISATION_PROTOCOL.md** — Authority to synchronize agent contracts
- **RIPPLE_INTELLIGENCE_LAYER.md** — Ripple propagation and cross-boundary awareness
- **AGENT_RIPPLE_AWARENESS_OBLIGATION.md** — Agent obligation to surface ripple effects
- **FOREMAN_AUTHORITY_AND_SUPERVISION_MODEL.md** — FM managerial and supervisory authority
- **FM_ROLE_CANON.md** — FM role definition and responsibilities

---

## 3. Scope

### 3.1 In Scope
- Agent recruitment authority hierarchy
- `.agent` contract file update authority
- Ripple-triggered contract update responsibilities
- Escalation paths for contract ambiguities
- Bootstrap mode clarifications

### 3.2 Out of Scope (Absolute)
- ❌ Automation of recruitment processes
- ❌ Automation of contract updates
- ❌ CI/CD enforcement mechanisms
- ❌ Agent contract template modifications
- ❌ Runtime behavior changes
- ❌ Modifications to `.agent` files (deferred to future waves)

This document defines **authority and responsibility**, not **implementation or automation**.

---

## 4. Four-Level Authority Hierarchy

### 4.1 Overview

```
┌─────────────────────────────────────────────────────────────┐
│ Level 1: MATURION (Supreme Authority)                       │
│ - Recruits: Governance Agent, FM Agent (per repo)           │
│ - Updates: First-level `.agent` contracts                   │
│ - Authority: NEVER transfers                                │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ Level 2: GOVERNANCE AGENT                                    │
│ - Recruits: NONE (no recruitment authority)                 │
│ - Updates: FM `.agent` contract (ripple-triggered only)     │
│ - Escalates: Own contract updates to Maturion              │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ Level 3: FOREMAN (FM) AGENT                                  │
│ - Recruits: ALL second-level agents (Builders, Liaison)     │
│ - Updates: ALL `.agent` files EXCEPT own                    │
│ - Escalates: Own contract updates to Governance/Maturion   │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ Level 4: ALL OTHER AGENTS (Builders, Liaison, etc.)         │
│ - Recruits: NONE (no recruitment authority)                 │
│ - Updates: NONE (no contract update authority)              │
│ - Escalates: ALL contract/recruitment questions to FM      │
└─────────────────────────────────────────────────────────────┘
```

---

## 5. Level 1: Maturion (Supreme Authority)

### 5.1 Identity

**Maturion** is the supreme governance authority in the Maturion ecosystem.

In bootstrap mode, **Johan Ras acts as mechanical proxy for Maturion**.

### 5.2 Recruitment Authority

Maturion has **sole authority** to recruit:

1. **Governance Agent** (governance repository)
   - Repository: `MaturionISMS/maturion-foreman-governance`
   - Contract: `governance/agents/governance-administrator.agent.md`
   - Contract: `.github/agents/governance-repo-administrator.agent.md`

2. **Foreman (FM) Agent** (per execution repository)
   - One FM per execution repository
   - Contract: `.github/agents/foreman.agent.md` (or equivalent)
   - Example repos: Application repos, service repos, infrastructure repos

**Invariant**: Maturion recruitment authority **NEVER transfers**. No agent may recruit first-level agents.

### 5.3 Contract Update Authority

Maturion has **sole authority** to update:
- Governance Agent `.agent` contract files
- Foreman (FM) Agent `.agent` contract files (when NOT ripple-triggered)

**Rationale**: First-level agents have ecosystem-wide authority. Their contracts must be controlled by supreme authority.

### 5.4 Bootstrap Mode

**During Bootstrap** (ecosystem establishment phase):
- Johan Ras acts as **mechanical proxy for Maturion**
- Johan manually recruits Governance Agent
- Johan manually recruits FM Agent per execution repo
- Johan manually updates first-level agent contracts

**After Bootstrap** (full automation):
- Maturion AI acts as supreme authority
- Manual intervention only for strategic decisions

**Current State**: Bootstrap mode active. Johan is mechanical proxy.

### 5.5 Escalation Target

**All unresolvable agent authority conflicts escalate to Maturion (Johan in bootstrap mode).**

---

## 6. Level 2: Governance Agent

### 6.1 Identity

**Governance Agent** is the repository-scoped custodian of governance canon in the governance repository (`MaturionISMS/maturion-foreman-governance`).

**Canonical References**:
- `governance/agents/governance-administrator.agent.md`
- `.github/agents/governance-repo-administrator.agent.md`

### 6.2 Recruitment Authority

**NONE**

Governance Agent has **NO authority to recruit any agents**.

**Rationale**: Governance Agent maintains canon. FM orchestrates execution. Recruitment is execution orchestration, not governance maintenance.

### 6.3 Contract Update Authority

Governance Agent has **limited contract update authority**:

#### 6.3.1 CAN Update

✅ **FM Agent `.agent` contract** (ripple-triggered only)

**Conditions**:
- Canon change creates ripple affecting FM contract
- Update aligns FM contract with canonical requirements
- Update is **non-discretionary** (required by canon)
- Update is **non-strategic** (no new FM authority granted)

**Example Scenarios**:
- Canon adds new mandatory governance loading requirement → FM contract must reference it
- Canon clarifies enforcement responsibility → FM contract must reflect it
- Canon updates governance versioning protocol → FM contract must align

**Canonical Reference**: `governance/canon/AGENT_CANONICAL_CONTEXT_SYNCHRONISATION_PROTOCOL.md` Section 3.2

#### 6.3.2 CANNOT Update

❌ **Own `.agent` contract**
- Governance Agent **MUST NOT** update its own contract
- Self-modification violates separation of duties
- Escalate to Maturion (Johan)

❌ **Any other agent contracts**
- Builder contracts
- Governance Liaison contracts
- Execution-scoped agent contracts
- Escalate to FM or Maturion

### 6.4 Ripple-Triggered FM Contract Updates

**Process**:
1. Governance Agent makes canon change
2. Governance Agent identifies ripple affecting FM contract
3. Governance Agent updates FM contract to align with canon (non-discretionary only)
4. Governance Agent documents ripple and update in PR
5. PR undergoes governance review (human approval if strategic)

**Constraints**:
- Update MUST be directly required by canon change
- Update MUST NOT grant new FM authority
- Update MUST NOT weaken FM obligations
- Update MUST be auditable (documented ripple analysis)

**Escalation Rule**: If FM contract update is **discretionary** or **strategic**, escalate to Maturion (Johan) for approval.

### 6.5 Escalation Responsibilities

Governance Agent MUST escalate to Maturion (Johan) for:
- Own contract updates
- Strategic FM contract updates
- Contract authority ambiguities
- Cross-repository contract conflicts

---

## 7. Level 3: Foreman (FM) Agent

### 7.1 Identity

**Foreman (FM) Agent** is the autonomous orchestration and governance intelligence within execution repositories.

One FM per execution repository.

**Canonical References**:
- `governance/maturion/FM_ROLE_CANON.md`
- `governance/canon/FOREMAN_AUTHORITY_AND_SUPERVISION_MODEL.md`
- `.github/agents/foreman.agent.md` (per repo)

### 7.2 Recruitment Authority

FM has **authority to recruit ALL second-level agents**, including:

✅ **Builder Agents**
- Agents that implement code to satisfy Red QA
- Agent class: Builder
- Canonical Reference: `governance/canon/AGENT_RECRUITMENT.md`

✅ **Governance Liaison Agents**
- Agents that seed governance in execution repositories
- Agents that maintain governance version synchronization
- Agent class: Administrator
- Canonical Reference: `governance/canon/GOVERNANCE_LIAISON_ROLE_SURVEY.md`

✅ **Execution-Scoped Agents**
- Test automation agents
- Deployment agents
- Monitoring agents
- Any agent operating within execution repository scope

**Invariant**: FM recruitment authority covers **ALL agents except**:
- Governance Agent (recruited by Maturion)
- Other FM agents (recruited by Maturion)

**Canonical Reference**: `governance/canon/AGENT_RECRUITMENT.md` Section 4 (FM sole recruiting authority)

### 7.3 Contract Update Authority

FM has **authority to update ALL `.agent` contract files EXCEPT its own**.

#### 7.3.1 CAN Update

✅ **All builder `.agent` contracts**
- When governance ripples require contract updates
- When builder scope changes
- When enforcement requirements change

✅ **All Governance Liaison `.agent` contracts**
- When governance seeding protocol changes
- When governance version requirements change

✅ **All execution-scoped agent contracts**
- When execution requirements change
- When orchestration responsibilities shift

**Canonical Reference**: `governance/canon/AGENT_CANONICAL_CONTEXT_SYNCHRONISATION_PROTOCOL.md` Section 3.3

#### 7.3.2 CANNOT Update

❌ **Own `.agent` contract**
- FM **MUST NOT** update its own contract
- Self-modification violates separation of duties
- Escalate to Governance Agent or Maturion (Johan)

❌ **Governance Agent `.agent` contract**
- Governance Agent contract is first-level authority
- Escalate to Maturion (Johan)

### 7.4 Ripple-Triggered Contract Updates

**Process**:
1. Governance Agent makes canon change
2. Governance Agent surfaces ripple affecting builder/liaison contracts
3. **FM receives ripple notification** (explicit communication or PR review)
4. FM updates affected builder/liaison contracts in execution repos
5. FM documents updates in execution repo PRs
6. FM validates updated contracts against canonical requirements

**FM Responsibilities in Ripple Propagation**:
- ✅ Monitor governance changes for ripples affecting supervised agents
- ✅ Update builder and liaison contracts when governance ripples require it
- ✅ Validate contract updates against canonical governance
- ✅ Coordinate cross-repo contract synchronization
- ✅ Escalate governance ambiguities to Governance Agent or Maturion

**Canonical Reference**: `governance/canon/AGENT_RIPPLE_AWARENESS_OBLIGATION.md` Section 6.3

### 7.5 Escalation Responsibilities

FM MUST escalate to Governance Agent or Maturion (Johan) for:
- Own contract updates
- Governance Agent contract updates
- Governance canon ambiguities
- Contract requirements that conflict with canonical governance

---

## 8. Level 4: All Other Agents

### 8.1 Identity

**All Other Agents** includes:
- Builder Agents
- Governance Liaison Agents
- Test Automation Agents
- Deployment Agents
- Monitoring Agents
- Any agent not in Levels 1-3

### 8.2 Recruitment Authority

**NONE**

All other agents have **NO authority to recruit any agents**.

**Invariant**: Agents **MUST NOT self-recruit** or recruit peers.

**Escalation**: Any recruitment need escalates to FM.

### 8.3 Contract Update Authority

**NONE**

All other agents have **NO authority to update any `.agent` contract files**, including their own.

**Rationale**:
- Self-modification violates separation of duties
- Contract updates are governance/orchestration responsibility
- Agents execute within contracts, they do not modify them

**Escalation**: Any contract update need escalates to FM or Governance Agent (depending on contract type).

### 8.4 Ripple Awareness Responsibility

All other agents MUST:
- ✅ Recognize when governance changes affect their obligations
- ✅ Escalate governance ambiguities to FM
- ✅ Request contract clarification from FM when needed
- ❌ MUST NOT modify contracts directly
- ❌ MUST NOT recruit other agents

**Canonical Reference**: `governance/canon/AGENT_RIPPLE_AWARENESS_OBLIGATION.md` Section 6.4

---

## 9. Ripple-Triggered Responsibility Chain

### 9.1 Governance Change Ripple Flow

```
┌─────────────────────────────────────────────────────────────┐
│ 1. Governance Agent makes canon change                      │
│    (e.g., updates BUILDER_CONTRACT_BINDING_CHECKLIST.md)    │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ 2. Governance Agent identifies ripple                       │
│    - Affects FM contract? → Update FM contract              │
│    - Affects builder contracts? → Surface ripple to FM      │
│    - Affects liaison contracts? → Surface ripple to FM      │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ 3. FM receives ripple notification                          │
│    (via PR review, explicit communication, or canon sync)   │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ 4. FM updates builder/liaison contracts in execution repos  │
│    - Updates all affected contracts                         │
│    - Documents ripple propagation                           │
│    - Validates against canonical requirements               │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ 5. Builders/Liaison agents recognize updated contracts      │
│    - Escalate ambiguities to FM                             │
│    - Request clarification if needed                        │
└─────────────────────────────────────────────────────────────┘
```

### 9.2 Responsibility Summary by Ripple Type

| Ripple Affects | Governance Agent | FM Agent | Other Agents |
|----------------|------------------|----------|--------------|
| **FM Contract** | Updates (non-discretionary) | Escalates (if own contract) | N/A |
| **Builder Contracts** | Surfaces ripple to FM | Updates in execution repos | Escalates ambiguities to FM |
| **Liaison Contracts** | Surfaces ripple to FM | Updates in execution repos | Escalates ambiguities to FM |
| **Canon/Schema** | Maintains and updates | Monitors and propagates | Escalates ambiguities to FM |
| **Enforcement** | Updates gate logic | Updates builder obligations | Complies with updated obligations |

### 9.3 Cross-Repository Contract Synchronization

**Scenario**: Governance change affects builder contracts across multiple execution repositories.

**Responsibility Chain**:
1. **Governance Agent**: Surfaces ripple affecting builder contracts (in governance repo PR)
2. **FM (per execution repo)**: Updates builder contracts in each execution repo
3. **Builders (per execution repo)**: Recognize updated contracts, escalate ambiguities

**Coordination Mechanism**:
- Governance Agent documents ripple in canonical governance PR
- FM monitors governance repo for ripples (or receives explicit notification)
- FM coordinates cross-repo contract updates
- FM validates consistency across execution repos

**Canonical Reference**: `governance/canon/GOVERNANCE_RIPPLE_MODEL.md` Section 4 (Downward Ripple)

---

## 10. Authority Boundaries and Prohibitions

### 10.1 Self-Modification is Prohibited

**Invariant**: **NO agent may update its own `.agent` contract file.**

**Rationale**: Self-modification violates separation of duties and creates governance risk.

**Enforcement**: Agents must escalate own contract update needs to higher authority.

**Authority Chain for Own Contract Updates**:
- Governance Agent → Maturion (Johan)
- FM Agent → Governance Agent or Maturion (Johan)
- Builder/Liaison/Other → FM Agent

---

### 10.2 Peer Recruitment is Prohibited

**Invariant**: **NO agent may recruit peer-level agents.**

**Examples of Prohibited Peer Recruitment**:
- ❌ Builder recruiting another builder
- ❌ Governance Liaison recruiting another liaison
- ❌ Test agent recruiting deployment agent

**Allowed Recruitment**:
- ✅ Maturion recruiting first-level agents (Governance, FM)
- ✅ FM recruiting second-level agents (Builders, Liaison, execution-scoped)

**Rationale**: Recruitment is an orchestration responsibility, not an execution responsibility.

---

### 10.3 Cross-Level Authority Violations

**Prohibited Actions**:
- ❌ Builder updating any `.agent` contract
- ❌ Governance Liaison recruiting any agent
- ❌ Builder recruiting any agent
- ❌ Governance Agent recruiting FM
- ❌ FM recruiting Governance Agent
- ❌ FM updating own contract
- ❌ Governance Agent updating own contract

**All cross-level violations are governance incidents and MUST be escalated.**

---

## 11. Bootstrap Mode Clarifications

### 11.1 Current State: Bootstrap Mode Active

**Bootstrap Mode Definition**: Ecosystem establishment phase where human proxy (Johan) acts as mechanical Maturion.

**Bootstrap Mode Characteristics**:
- Johan manually recruits Governance Agent
- Johan manually recruits FM Agent per execution repo
- Johan manually updates first-level agent contracts
- Johan approves strategic governance changes
- Johan resolves agent authority conflicts

### 11.2 Bootstrap → Production Transition

**Post-Bootstrap State** (Future):
- Maturion AI acts as supreme authority
- Agent recruitment becomes automated (within authority boundaries)
- Contract updates become automated (within ripple-triggered boundaries)
- Manual intervention only for strategic decisions

**Governance Position**: Bootstrap mode will remain active until explicitly decommissioned by Johan.

---

## 12. Escalation Paths

### 12.1 Contract Update Escalation

| Agent Role | Needs to Update | Escalates To |
|------------|-----------------|--------------|
| Governance Agent | Own contract | Maturion (Johan) |
| Governance Agent | FM contract (strategic) | Maturion (Johan) |
| Governance Agent | FM contract (ripple-triggered) | Documents in PR, proceeds |
| FM Agent | Own contract | Governance Agent or Maturion (Johan) |
| FM Agent | Governance Agent contract | Maturion (Johan) |
| FM Agent | Builder/Liaison contract | Documents in PR, proceeds |
| Builder Agent | Own contract | FM Agent |
| Liaison Agent | Own contract | FM Agent |
| Any Agent | Contract ambiguity | Next level up (Builder→FM, FM→Governance, Governance→Maturion) |

### 12.2 Recruitment Escalation

| Agent Role | Needs to Recruit | Escalates To |
|------------|------------------|--------------|
| Governance Agent | Any agent | Maturion (Johan) — Governance Agent has no recruitment authority |
| FM Agent | Builder/Liaison/Execution agent | Proceeds (within authority) |
| FM Agent | Governance Agent or FM | Maturion (Johan) |
| Builder/Liaison/Other | Any agent | FM Agent |

---

## 13. Relationship to Existing Governance Models

### 13.1 AGENT_RECRUITMENT.md

**Relationship**: This model **synthesizes and clarifies** agent recruitment authority from AGENT_RECRUITMENT.md.

**Key Clarifications**:
- Makes explicit that Maturion recruits first-level agents
- Makes explicit that FM recruits all second-level agents
- Makes explicit that no agent may self-recruit or recruit peers

**Precedence**: Both models are canonical and complementary. This model provides explicit authority hierarchy.

---

### 13.2 AGENT_CANONICAL_CONTEXT_SYNCHRONISATION_PROTOCOL.md

**Relationship**: This model **extends** synchronization protocol with ripple-triggered contract update authority.

**Key Clarifications**:
- Governance Agent may update FM contract (ripple-triggered, non-discretionary)
- FM may update all second-level agent contracts
- No agent may update own contract

**Precedence**: Both models are canonical and complementary. This model clarifies update authority boundaries.

---

### 13.3 AGENT_RIPPLE_AWARENESS_OBLIGATION.md

**Relationship**: This model **implements** ripple responsibility chain for contract updates.

**Integration**:
- Ripple awareness obligation defines WHAT agents must surface
- This model defines WHO updates contracts in response to ripples
- Together: Complete ripple propagation model

---

### 13.4 FOREMAN_AUTHORITY_AND_SUPERVISION_MODEL.md

**Relationship**: This model **clarifies** FM recruitment and contract update authority.

**Key Clarifications**:
- FM sole recruiting authority for second-level agents
- FM contract update authority for all supervised agents
- FM escalation path for own contract updates

---

## 14. Non-Negotiable Invariants

### 14.1 Supreme Authority Never Transfers

**Invariant**: Maturion recruitment authority for first-level agents **NEVER transfers**.

---

### 14.2 Self-Modification is Prohibited

**Invariant**: No agent may update its own `.agent` contract file.

---

### 14.3 Peer Recruitment is Prohibited

**Invariant**: No agent may recruit peer-level agents.

---

### 14.4 Authority is Explicit and Auditable

**Invariant**: All recruitment and contract updates **MUST be documented** with clear authority citation.

---

## 15. Success Criteria

This model is successful when:

- ✅ NO uncertainty exists about who may recruit which agents
- ✅ NO uncertainty exists about who may update which `.agent` files
- ✅ Ripple-triggered responsibility chain is explicit and auditable
- ✅ Escalation paths are clear for all agent authority questions
- ✅ Self-modification and peer recruitment are eliminated
- ✅ Future automation can be layered safely on explicit authority model
- ✅ All agent authority actions cite this model as canonical reference

---

## 16. Closing Principle

**Authority exists to enable responsibility.**

Agents without clear authority boundaries create governance risk.

Before this model:
> "I think I can update this contract, but I'm not sure."

After this model:
> "I have explicit authority to update this contract because [canonical reference]."

**Authority is explicit. Responsibility is auditable. Governance is predictable.**

---

## 17. Version History

### v1.0.0 (2026-01-02)
- Initial canonical definition (Ripple-Wave 1.2 steering update)
- Defines four-level authority hierarchy
- Clarifies recruitment authority boundaries
- Clarifies contract update authority boundaries
- Establishes ripple-triggered responsibility chain
- Integrates with AGENT_RIPPLE_AWARENESS_OBLIGATION.md

---

## 18. Authority Statement

**This document is constitutional and binding.**

All agents MUST:
- Operate within explicit authority boundaries
- Escalate when authority is unclear
- Document authority citation for all recruitment and contract updates
- Never self-modify contracts
- Never recruit peer-level agents

**Violations constitute governance incidents and must be escalated to Maturion (Johan).**

---

**Status**: Active and Enforced  
**Owner**: Governance Administrator  
**Approval Authority**: Johan Ras (Maturion Proxy)  
**Last Updated**: 2026-01-02

---

*End of AGENT RECRUITMENT AND CONTRACT AUTHORITY MODEL v1.0.0*

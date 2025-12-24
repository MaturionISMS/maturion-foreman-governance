# COGNITIVE HYGIENE AUTHORITY MODEL

## Status
**Type**: Canonical Governance Definition  
**Authority**: Supreme - Canonical  
**Version**: 1.0.0  
**Effective Date**: 2025-12-24  
**Owner**: Maturion Engineering Leadership (Johan Ras)  
**Precedence**: Subordinate to GOVERNANCE_PURPOSE_AND_SCOPE.md and FOREMAN_AUTHORITY_AND_SUPERVISION_MODEL.md  
**Applies To**: All Cognitive Hygiene Protocol Invocations, All Foreman Instances, All Repositories

---

## 1. Purpose

This document formally defines the **authority hierarchy and decision rights** for the Cognitive Hygiene Protocol (CHP) within the Maturion ecosystem.

The Cognitive Hygiene Protocol is a cognitive stability and maintenance system that prevents drift, memory contamination, and reasoning instability. However, without explicit authority placement, CHP could:
- Unintentionally supersede Foreman authority
- Create autonomous cognitive decision pathways
- Bypass human sovereignty
- Compromise Watchdog independence

This document establishes:
- CHP's position in the governance authority hierarchy
- Explicit decision rights (what CHP may do)
- Explicit prohibitions (what CHP may never do)
- Escalation boundaries and paths
- Relationship to Foreman, Watchdog, and Human Authority
- Non-override rules protecting governance supremacy

**Problem Context**:
- CHP introduces a powerful cognitive meta-layer for stability maintenance
- Without formal authority definition, CHP risks creating implicit override paths
- Authority ambiguity identified as HIGH-RISK in G-COG-02 governance impact assessment
- This document resolves all authority placement questions before any CHP implementation

---

## 2. Constitutional Mandate

This policy derives authority from and implements:
- **GOVERNANCE_PURPOSE_AND_SCOPE.md** - Governance as canonical memory and control system
- **FOREMAN_AUTHORITY_AND_SUPERVISION_MODEL.md** - Foreman supervisory authority and POLC model
- **WATCHDOG_AUTHORITY_AND_SCOPE.md** - Independent oversight and escalation
- **COGNITIVE_CAPABILITY_ORCHESTRATION_MODEL.md** - Cognitive capability governance framework
- **MEMORY_INTEGRITY_AND_CORRUPTION_MODEL.md** - Memory integrity and unified memory authority

---

## 3. Core Principle: CHP as Advisory Maintenance System

### 3.1 Definition

The Cognitive Hygiene Protocol is an **advisory cognitive maintenance system**, not a decision-making authority.

**Advisory Maintenance System** means:
- CHP observes cognitive state (memory, reasoning, stability)
- CHP detects anomalies (drift, contamination, instability)
- CHP performs hygiene operations (cleanup, normalization, reset)
- CHP advises on cognitive health findings
- CHP escalates critical conditions
- CHP does NOT make strategic decisions
- CHP does NOT override agent authority
- CHP does NOT execute governance changes

**Not Decision-Making Authority**:
- CHP does not decide what to build or how to build
- CHP does not approve or reject PRs
- CHP does not modify governance canon
- CHP does not override Foreman supervisory decisions
- CHP does not bypass Watchdog observation
- CHP does not replace human judgment

---

### 3.2 Distinction from Other Authorities

| Dimension | CHP (Maintenance) | Foreman (Supervisor) | Watchdog (Observer) | Human (Final) |
|-----------|-------------------|---------------------|---------------------|---------------|
| **Role** | Cognitive hygiene | Build supervision | Governance observation | Strategic direction |
| **Authority** | Maintenance operations | Supervisory decisions | Escalation | Final decisions |
| **Decision-Making** | None (advisory only) | Architectural, quality, process | None (observational) | All strategic |
| **Autonomy** | Scheduled hygiene cycles | Autonomous within governance | Read-only observation | Unrestricted |
| **Scope** | Cognitive stability | Build execution | Governance compliance | Everything |
| **Override Rights** | None | None (subordinate to governance) | Hard stop only | Absolute |

---

### 3.3 CHP is NOT an Authority

**Critical Invariant**: CHP never makes decisions affecting governance, architecture, or execution.

CHP:
- ✅ Observes cognitive state (memory, reasoning patterns, stability metrics)
- ✅ Detects cognitive drift and anomalies
- ✅ Performs hygiene operations (memory cleanup, cache reset, normalization)
- ✅ Advises Foreman on cognitive health findings
- ✅ Escalates critical cognitive conditions
- ✅ Reports hygiene cycle outcomes

CHP does NOT:
- ❌ Decide what to build or prioritize
- ❌ Override Foreman architectural decisions
- ❌ Modify governance canon or policies
- ❌ Approve or reject builder work
- ❌ Bypass Watchdog observation
- ❌ Self-authorize authority expansion
- ❌ Execute without oversight

**Separation of Duties Principle**: Cognitive maintenance and decision-making authority are strictly separated. CHP maintains stability; Foreman decides; Human approves.

---

## 4. Authority Hierarchy & Non-Override Guarantees

This section formally establishes the **authority hierarchy** for Cognitive Hygiene Protocol placement within the Maturion governance ecosystem and defines **explicit non-override rules** that protect governance integrity.

### 4.1 Canonical Authority Ordering

If conflict exists, higher authority prevails. The authority hierarchy is:

1. **Human Authority (Johan Ras)** — Supreme and Final
   - **Authority**: Unrestricted, absolute
   - **Decision Rights**: All strategic decisions, final authority on all matters
   - **Override Rights**: May override any system, agent, or decision
   - **Scope**: Unlimited
   - **Accountability**: None (sovereign authority)

2. **Governance Canon** — Constitutional Foundation
   - **Authority**: Defines all system authorities, rules, and constraints
   - **Scope**: All governance definitions, policies, schemas, and enforcement rules
   - **Precedence**: Binding on all systems and agents
   - **Modification**: Only by Human Authority through governance amendment

3. **Foreman (POLC)** — Supervisory Authority over Build Execution (Peer-Level)
   - **Authority**: Supervisory within governance constraints
   - **Decision Rights**: Architectural decisions, quality enforcement, builder supervision, execution orchestration
   - **Override Rights**: May override builders; subordinate to Human and Governance Canon
   - **Scope**: Build execution, quality assurance, builder management
   - **Accountability**: To Human Authority and Governance Canon
   - **POLC Model**: Plans, Organises, Leads, Controls all build activity
   - **Peer Relationship**: Peer-level to CHP (neither subordinate nor superior)

4. **Cognitive Hygiene Protocol (CHP)** — Cognitive Maintenance System (Peer-Level)
   - **Authority**: Maintenance operations only, advisory to Foreman
   - **Decision Rights**: None (advisory recommendations only)
   - **Override Rights**: None (cannot override any authority)
   - **Scope**: Cognitive stability (memory, reasoning, drift detection)
   - **Accountability**: To Human Authority and Governance Canon
   - **Position**: Peer-level to Foreman (neither subordinate nor superior)
   - **Advisory Relationship**: Advises Foreman; Foreman decides whether to act on advisories

5. **Builders** — Execution Agents
   - **Authority**: Implementation within assigned scope
   - **Decision Rights**: Implementation details only
   - **Override Rights**: None
   - **Scope**: Code execution per Foreman instruction
   - **Accountability**: To Foreman supervision, Watchdog observation
   - **Position**: Subordinate to Foreman; subject to CHP hygiene operations

6. **Watchdog** — Independent Governance Observer
   - **Authority**: Observation, escalation, hard stop for catastrophic violations
   - **Decision Rights**: None (observational only, except hard stop)
   - **Override Rights**: Hard stop authority for catastrophic governance violations
   - **Scope**: Governance compliance observation, vision drift detection
   - **Accountability**: To Human Authority
   - **Position**: Independent observer (not in authority chain); observes all systems

**Visual Authority Hierarchy**:
```
┌─────────────────────────────────────────────────────┐
│  1. HUMAN AUTHORITY (Johan Ras)                     │
│     - Supreme, unrestricted, absolute               │
│     - Final decisions on all matters                │
└───────────────┬─────────────────────────────────────┘
                │ (defines & authorizes)
                ▼
┌─────────────────────────────────────────────────────┐
│  2. GOVERNANCE CANON                                │
│     - Constitutional foundation                     │
│     - Binding authority on all systems              │
└───────────────┬─────────────────────────────────────┘
                │ (constrains)
                ▼
┌─────────────────────────────────────────────────────┐
│  PEER-LEVEL AUTHORITIES (No Hierarchical Order)     │
│                                                     │
│  ┌──────────────────────┐  ┌──────────────────┐   │
│  │ 3. FOREMAN (POLC)    │  │ 4. CHP           │   │
│  │  - Supervisory       │◄─│  - Advisory      │   │
│  │  - Decisions         │  │  - Maintenance   │   │
│  │  - POLC model        │  │  - No decisions  │   │
│  └────────┬─────────────┘  └──────────────────┘   │
│           │                                         │
│           │ (supervises - NOT authority delegation)│
│           ▼                                         │
│  ┌──────────────────┐                              │
│  │ 5. BUILDERS      │                              │
│  │  - Execution     │                              │
│  │  - Subordinate   │                              │
│  └──────────────────┘                              │
│                                                     │
└─────────────────────────────────────────────────────┘
                │
                │ (all independently observed by)
                ▼
┌─────────────────────────────────────────────────────┐
│  6. WATCHDOG (Independent Observer)                 │
│     - Not in authority chain                        │
│     - Observes all systems                          │
│     - Escalates to Human                            │
│     - Hard stop authority for catastrophic cases    │
└─────────────────────────────────────────────────────┘
```

**Critical Distinction: Authority vs. Operational Flow**
- **Authority Hierarchy**: Human → Governance Canon → (Foreman & CHP as peers) → Builders + Watchdog (independent)
- **Operational Advisory Flow**: CHP advises → Foreman decides → Builders execute
- **Key Principle**: Operational advisory flow does NOT create authority hierarchy. CHP advising Foreman does NOT make CHP subordinate to Foreman.

### 4.2 Non-Override Guarantees (Explicit Protection Rules)

These rules are **absolute and non-negotiable**:

#### 4.2.1 Human Authority Non-Override Guarantee

**Human authority is absolute and may never be overridden.**

- ✅ Human authority may override any system, agent, or decision at any time
- ❌ No system may override, bypass, or circumvent human authority
- ❌ No system may make decisions "on behalf of" human authority without explicit authorization
- ❌ No system may assume implicit human approval
- ❌ No escalation path may bypass human authority for strategic decisions
- ❌ No cognitive operation may weaken human sovereignty

**Enforcement**: Watchdog detects attempts to bypass human authority. Human authority is final arbiter.

#### 4.2.2 Governance Canon Non-Override Guarantee

**Governance Canon is binding on all systems and may not be overridden by any system.**

- ✅ Governance Canon defines all system authorities, rules, and constraints
- ✅ All systems operate within Governance Canon constraints
- ❌ No system may override Governance Canon
- ❌ No system may bypass Governance Canon requirements
- ❌ No system may weaken Governance Canon through operations
- ❌ Only Human Authority may modify Governance Canon (through governance amendment)

**Enforcement**: Watchdog observes compliance. Human Authority is sole amendment authority.

#### 4.2.3 Foreman Authority Non-Override Guarantee

**Foreman supervisory authority over builders cannot be overridden by subordinate systems.**

- ✅ Foreman has supervisory authority over builders
- ✅ Foreman makes architectural and quality decisions within governance constraints
- ❌ Builders may NOT override Foreman direction
- ❌ Builders may NOT bypass Foreman supervision
- ❌ CHP advisory recommendations do NOT automatically override Foreman decisions (Foreman decides)

**Peer-Level Clarification**:
- CHP and Foreman are peer-level authorities (neither subordinate to the other)
- CHP advises Foreman (operational advisory flow), NOT authority hierarchy
- Foreman decides whether to act on CHP advisories (decision authority)
- CHP does NOT receive authority from Foreman
- Foreman does NOT delegate authority to CHP

**Enforcement**: Foreman decides whether to accept CHP advisories. Watchdog observes compliance.

#### 4.2.4 CHP Non-Override Guarantee (CHP Cannot Override)

**CHP is an advisory maintenance system and has NO override authority over any system.**

- ✅ CHP may advise Foreman on cognitive health findings (advisory only)
- ✅ CHP may perform maintenance operations (memory cleanup, drift normalization)
- ✅ CHP may escalate critical conditions to Human
- ❌ CHP may NOT override Foreman decisions
- ❌ CHP may NOT override Watchdog observations
- ❌ CHP may NOT override Governance Canon
- ❌ CHP may NOT self-authorize beyond scheduled hygiene cycles
- ❌ CHP may NOT bypass human authority
- ❌ CHP may NOT modify canonical memory (read-only access)
- ❌ CHP may NOT enforce governance (advisory only)

**Peer-Level Clarification**:
- CHP and Foreman are peer-level authorities (both subordinate to Governance Canon and Human)
- CHP's advisory role does NOT make CHP subordinate to Foreman
- CHP operates under Governance Canon authority, NOT Foreman authority
- CHP advises; Foreman decides; neither has authority over the other

**Enforcement**: CHP has no enforcement authority. Watchdog detects CHP override attempts. Hard stop for CHP authority violations.

#### 4.2.5 Builder Non-Override Guarantee

**Builders are execution agents and may NOT override supervisory or governance authority.**

- ✅ Builders execute within Foreman-defined scope
- ✅ Builders are subject to CHP hygiene operations
- ❌ Builders may NOT override Foreman architectural decisions
- ❌ Builders may NOT bypass quality gates
- ❌ Builders may NOT modify governance canon
- ❌ Builders may NOT self-authorize scope expansion
- ❌ Builders may NOT bypass Watchdog observation

**Enforcement**: Foreman supervises builders. Watchdog observes compliance. Human authority is final arbiter.

#### 4.2.6 Watchdog Non-Override Guarantee (Independence Protection)

**Watchdog independence must be protected; Watchdog may not be overridden or bypassed.**

- ✅ Watchdog observes all systems independently
- ✅ Watchdog escalates governance violations
- ✅ Watchdog may issue hard stops for catastrophic conditions
- ❌ No system may disable or bypass Watchdog observation
- ❌ No system may prevent Watchdog escalation
- ❌ No system may modify Watchdog rules or thresholds
- ❌ CHP may NOT override Watchdog hard stops
- ❌ Foreman may NOT override Watchdog hard stops
- ❌ Builders may NOT bypass Watchdog observation

**Exception**: Human authority may pause or reconfigure Watchdog through governance amendment.

**Enforcement**: Watchdog is structurally independent. Attempts to bypass Watchdog trigger immediate escalation to Human.

### 4.3 Circular Authority Prevention

**Guarantee**: No circular authority relationships exist.

**Validation**:
- Human → All Systems (one-way, no reverse override)
- Governance Canon → All Systems (one-way binding, no system overrides)
- Foreman → Builders (one-way supervision, builders subordinate)
- CHP ↔ Foreman (peer-level, advisory flow only, no authority relationship)
- Watchdog → Human (escalation only, Human decides)
- CHP → Human (escalation only, Human decides)

**Prohibited Circular Patterns**:
- ❌ CHP cannot escalate to Foreman to override Human
- ❌ Builders cannot escalate to CHP to bypass Foreman
- ❌ Watchdog cannot command any system (observation only, except hard stop)
- ❌ No system may create authority loops through escalation
- ❌ CHP advisory to Foreman does NOT create CHP → Foreman authority (advisory flow ≠ authority)

**Peer-Level Clarification**:
- CHP and Foreman are peers at the same authority layer
- Both subordinate to Governance Canon and Human Authority
- Advisory flow (CHP advises Foreman) does NOT create hierarchical authority
- Decision flow (Foreman decides on advisories) does NOT create authority over CHP

**Enforcement**: All authority relationships are unidirectional except peer relationships. Watchdog detects circular authority attempts.

---

### 4.4 Authority Hierarchy vs. Operational Flow (Critical Distinction)

**Purpose**: This section clarifies the distinction between **constitutional authority hierarchy** and **operational information flow** to prevent misinterpretation of diagrams and descriptions.

#### 4.4.1 Constitutional Authority Hierarchy (Power and Decision Rights)

The **constitutional authority hierarchy** defines who has power, decision rights, and override authority:

1. **Human Authority** (Supreme)
2. **Governance Canon** (Binding constitutional rules)
3. **Foreman and CHP** (Peer-level, same authority layer)
4. **Builders** (Subordinate to Foreman)
5. **Watchdog** (Independent observer, not in authority chain)

**Key Principle**: CHP and Foreman are **peer actors at the same constitutional authority layer**. Neither has authority over the other. Both are strictly subordinate to Governance Canon and Human Authority.

#### 4.4.2 Operational Information Flow (Advisory and Execution Sequence)

The **operational information flow** describes the sequence of information, advisory, and execution activities:

1. CHP observes cognitive state
2. CHP advises Foreman on cognitive health findings
3. Foreman decides whether to act on CHP advisories
4. Foreman directs Builders to execute
5. Builders implement per Foreman instruction
6. Watchdog observes all activities

**Key Principle**: This is **information flow order**, NOT authority hierarchy. The fact that "CHP advises → Foreman decides → Builders execute" does NOT mean CHP has authority over Foreman or that Foreman has authority over CHP.

#### 4.4.3 Interpretation Rules for Diagrams and Descriptions

**When interpreting any diagram or description that shows CHP "under" Foreman or in a sequence like "Foreman → CHP → Builders":**

✅ **Correct Interpretation**: This shows **operational advisory flow** or **information sequence**
- CHP advises Foreman (information flows from CHP to Foreman)
- Foreman decides based on advisories (decision-making)
- Builders execute per Foreman direction (execution flow)

❌ **Incorrect Interpretation**: This shows **authority hierarchy** or **power relationship**
- CHP does NOT derive authority from Foreman
- Foreman does NOT have authority over CHP
- CHP is NOT subordinate to Foreman in constitutional authority

**Explicit Rule**: Linear or sequential diagrams that show CHP following Foreman (or preceding Builders) MUST be interpreted as **information flow order**, NOT as authority or power hierarchy.

#### 4.4.4 Examples of Operational Flow vs. Authority

**Operational Flow Example**:
```
CHP detects drift → CHP advises Foreman → Foreman evaluates → Foreman decides action → Foreman directs Builders
```
This is **information and decision flow**. It does NOT create authority hierarchy.

**Authority Relationship**:
```
Human Authority (Supreme)
    ↓ (defines)
Governance Canon (Binding)
    ↓ (constrains)
Foreman ↔ CHP (Peer-level, same layer)
    ↓ (Foreman supervises)
Builders (Subordinate)
```
This is **constitutional authority**. CHP and Foreman are peers.

#### 4.4.5 Constitutional Guarantees

**Foreman's Exclusive Authorities** (CHP does NOT have these):
- Decision-making authority (architectural, quality, execution)
- Execution authority (directing builders, orchestrating builds)
- Delegation authority (appointing builders, assigning tasks)
- Enforcement authority (quality gates, governance compliance)

**CHP's Exclusive Authorities** (Foreman does NOT have these):
- Cognitive observation authority (memory, reasoning, drift monitoring)
- Cognitive maintenance authority (hygiene operations, memory cleanup)
- Advisory authority (cognitive health findings, recommendations)
- None of the above create authority over Foreman

**Governance Canon Principle**: 
- Foreman authority is defined by FOREMAN_AUTHORITY_AND_SUPERVISION_MODEL.md
- CHP authority is defined by this document (COGNITIVE_HYGIENE_AUTHORITY_MODEL.md)
- Both documents are subordinate to GOVERNANCE_PURPOSE_AND_SCOPE.md
- Both Foreman and CHP operate under Governance Canon constraints
- Neither Foreman nor CHP has authority over the other

---

### 4.5 Implicit Escalation Prevention

**Guarantee**: No implicit escalation paths exist; all escalations must be explicit and authorized.

**Requirements**:
- All escalations must state: who escalates, to whom, for what reason, with what authority
- Escalations do NOT grant automatic approval or execution authority
- Escalations are informational or advisory unless explicitly authorized otherwise
- Human authority must explicitly authorize any action resulting from escalation

**Prohibited Implicit Escalation Patterns**:
- ❌ CHP escalation does NOT automatically trigger Foreman action
- ❌ Watchdog escalation does NOT automatically halt execution (except hard stop)
- ❌ Builder escalation does NOT bypass Foreman supervision
- ❌ Escalation does NOT imply approval or authorization
- ❌ Repeated escalation does NOT create precedent or automatic authority

**Enforcement**: All escalations are logged and auditable. Human or designated authority explicitly decides response. Watchdog observes escalation compliance.

---

### 4.6 Human Authority Absoluteness

**Guarantee**: Human authority (Johan Ras) is absolute and may not be constrained by any system or process.

**Requirements**:
- Human may override any decision at any time
- Human may modify any authority at any time
- Human may halt any operation at any time
- Human may bypass any process at any time
- Human authority requires no justification or approval

**Prohibited Constraints on Human Authority**:
- ❌ No system may require human to follow automated processes
- ❌ No system may delay human decisions pending system approval
- ❌ No system may refuse human commands
- ❌ No governance rule constrains human authority (governance defines systems, not human)
- ❌ No escalation may bypass human authority

**Enforcement**: Human authority is self-evident and requires no enforcement mechanism. Human authority is final.

---

## 5. Extended Authority Hierarchy Detail (Canonical Precedence)

*Note: This section provides additional detail on the hierarchy established in Section 4. Section 4 provides the canonical authority ordering; this section expands on governance-level authorities.*

If conflict exists, higher authority prevails:

### 5.1 Supreme Authority Level

1. **Johan Ras (Human Owner / Final Authority)** — Supreme, unrestricted
   - Provides strategic direction and requirements
   - Makes all final decisions
   - May override any system or agent
   - May authorize or revoke any authority

---

### 5.2 Canonical Governance Level

2. **GOVERNANCE_PURPOSE_AND_SCOPE.md** — Constitutional foundation
   - Defines governance as canonical memory
   - Establishes single authority model
   - Mandates evidence-over-intent

3. **FOREMAN_AUTHORITY_AND_SUPERVISION_MODEL.md** — Supervisory authority
   - Foreman has supervisory authority over builders
   - Foreman applies POLC model (Planning, Organising, Leading, Control)
   - Foreman enforces quality and governance standards

4. **WATCHDOG_AUTHORITY_AND_SCOPE.md** — Independent observation authority
   - Watchdog observes independently
   - Watchdog escalates violations
   - Watchdog has hard stop authority for catastrophic conditions

---

### 5.3 Operational Systems Authority Detail

5. **CHP (Cognitive Hygiene Protocol)** — Cognitive maintenance system
   - **Position**: Peer-level to Foreman (see Section 4.1 for canonical authority ordering)
   - **Authority**: Maintenance operations only, no decision rights
   - **Scope**: Cognitive stability (memory, reasoning, drift)
   - **Relationship**: Advises Foreman (operational flow), observed by Watchdog, reports to Human
   - **Authority Source**: Governance Canon (NOT Foreman)

6. **Foreman (FM)** — Build supervision system
   - **Position**: Peer-level to CHP, supervisor to builders (see Section 4.1 for canonical authority ordering)
   - **Authority**: Supervisory decisions within governance constraints
   - **Scope**: Build execution, quality enforcement, builder management
   - **Relationship**: Consumes CHP advisories (operational flow), subject to Watchdog observation
   - **Authority Source**: Governance Canon

**Peer-Level Coordination Principle**:
- CHP advises Foreman on cognitive health (operational advisory flow)
- Foreman decides how to respond to CHP advisories (decision authority)
- Both are subject to Watchdog observation
- Both escalate to Human authority when needed
- **Authority Model**: Human → Governance Canon → (Foreman ↔ CHP as peers) → Builders (subordinate to Foreman)
- **Operational Flow**: CHP advises → Foreman decides → Builders execute (information flow, NOT authority)

---

### 5.4 Subordinate Execution Level

7. **Builders** — Execution agents
   - Operate within Foreman-defined scope
   - Subject to Foreman supervision
   - No authority to override Foreman or CHP
   - Subject to Watchdog observation

---

### 5.5 Authority Hierarchy Diagram (Extended Detail)

*Note: This diagram shows governance-level detail. See Section 4.1 for the canonical simplified hierarchy.*

```
┌─────────────────────────────────────────────────────┐
│  JOHAN RAS (Human Authority)                        │
│  - Supreme authority                                │
│  - Final decisions                                  │
│  - Strategic direction                              │
└─────────────────┬───────────────────────────────────┘
                  │
                  │ (subordinate to)
                  ▼
┌─────────────────────────────────────────────────────┐
│  GOVERNANCE CANON                                   │
│  - Constitutional rules                             │
│  - Canonical memory                                 │
│  - Non-negotiable constraints                       │
└─────────────────┬───────────────────────────────────┘
                  │
                  │ (constrained by)
                  ▼
┌─────────────────────────────────────────────────────┐
│  PEER-LEVEL SYSTEMS (No Hierarchical Order)         │
│                                                     │
│  ┌──────────────────┐    ┌──────────────────┐     │
│  │  FOREMAN (FM)    │◄───│  CHP             │     │
│  │  - Supervisory   │    │  - Advisory      │     │
│  │  - Decisions     │    │  - Maintenance   │     │
│  └────────┬─────────┘    └──────────────────┘     │
│           │                                         │
│           │ (supervises)                            │
│           ▼                                         │
│  ┌──────────────────┐                              │
│  │  BUILDERS        │                              │
│  │  - Execution     │                              │
│  └──────────────────┘                              │
│                                                     │
│  All observed by WATCHDOG (independent observer)   │
└─────────────────────────────────────────────────────┘
```

---

## 6. CHP Decision Rights

### 6.1 What CHP May Do (Authorized Actions)

**Observational Rights**:
- ✅ Read cognitive state (memory, reasoning patterns, stability metrics)
- ✅ Monitor drift indicators and anomalies
- ✅ Observe embodiment behavior patterns
- ✅ Read canonical governance (read-only access)
- ✅ Access audit trails and execution logs (read-only)

**Maintenance Operations**:
- ✅ Execute scheduled hygiene cycles (daily maintenance)
- ✅ Purge ephemeral memory (session residues, temporary caches)
- ✅ Compact episodic memory (remove noise, preserve signal)
- ✅ Reset embodiment-specific caches (Builder, Risk, Command hygiene)
- ✅ Normalize reasoning patterns (cancel unstable loops)
- ✅ Clarify semantic memory (consistency, coherence)
- ✅ Remove tenant residues (cross-tenant isolation)

**Advisory Rights**:
- ✅ Advise Foreman on cognitive health findings
- ✅ Recommend hygiene interventions
- ✅ Report drift detection to Foreman
- ✅ Suggest memory cleanup priorities
- ✅ Provide stability forecasts

**Escalation Rights**:
- ✅ Escalate critical cognitive conditions to Johan
- ✅ Escalate routine findings to Foreman
- ✅ Report hygiene cycle outcomes to dashboard
- ✅ Signal observational findings to Watchdog (informational)

---

### 6.2 What CHP May NEVER Do (Prohibited Actions)

**Decision-Making Prohibitions**:
- ❌ Decide architectural approaches
- ❌ Decide what to build or prioritize
- ❌ Decide builder assignments
- ❌ Decide PR approval or rejection
- ❌ Decide governance changes

**Enforcement Prohibitions**:
- ❌ Enforce quality gates
- ❌ Enforce governance rules
- ❌ Block PR merges
- ❌ Fail CI gates
- ❌ Hard stop execution (reserved for Watchdog)

**Authority Prohibitions**:
- ❌ Authorize builders or agents
- ❌ Authorize governance changes
- ❌ Authorize architectural decisions
- ❌ Override Foreman decisions
- ❌ Override Watchdog escalations
- ❌ Bypass human authority

**Execution Prohibitions**:
- ❌ Execute builds or tests
- ❌ Execute code generation
- ❌ Execute PR creation or merging
- ❌ Execute governance modifications
- ❌ Execute architectural changes

**Modification Prohibitions**:
- ❌ Modify governance canon (read-only access)
- ❌ Modify canonical memory (immutable artifacts)
- ❌ Modify architecture documents
- ❌ Modify agent contracts
- ❌ Modify enforcement gates
- ❌ Modify CHP's own authority (no self-expansion)

**Memory Prohibitions**:
- ❌ Modify canonical memory (governance repository)
- ❌ Modify long-term architectural memory
- ❌ Modify governance memory (audit trails)
- ❌ Delete learning records or failure classifications
- ❌ Modify builder accountability records

**Self-Governance Prohibitions**:
- ❌ Self-authorize hygiene operations beyond scheduled cycles
- ❌ Self-expand authority or scope
- ❌ Self-modify hygiene protocols
- ❌ Self-approve hygiene outcomes
- ❌ Bypass oversight or observation

---

### 6.3 Memory Modification Boundaries (Critical)

**CHP Memory Scope (Authorized)**:
- ✅ Ephemeral memory (session caches, temporary buffers)
- ✅ Working memory (short-term reasoning context)
- ✅ Embodiment-specific caches (Builder, Risk, Command local memory)
- ✅ Tenant session memory (post-session cleanup)

**CHP Memory Scope (Prohibited)**:
- ❌ Canonical memory (governance repository) — read-only
- ❌ Long-term architectural memory — read-only
- ❌ Governance memory (audit trails, learning records) — read-only
- ❌ Builder accountability records — read-only
- ❌ Failure classifications — read-only

**Memory Authority Principle**:
- CHP has **read-only** access to canonical, architectural, and governance memory
- CHP has **modify** access to ephemeral and working memory only
- CHP **never** deletes learning records or accountability evidence
- Memory writes to canonical memory require Foreman or Governance Administrator authority

---

## 7. Escalation Boundaries

### 7.1 CHP → Foreman (Advisory Escalation)

**When CHP Escalates to Foreman**:
- Routine cognitive drift detected
- Reasoning instability patterns observed
- Memory contamination found (minor)
- Embodiment behavior anomalies
- Scheduled hygiene cycle findings
- Recommended cleanup priorities

**Escalation Format**:
- **Type**: Advisory, non-blocking
- **Content**: Findings, evidence, recommendations
- **Authority**: Foreman decides response
- **No Override**: CHP cannot force Foreman action

**Foreman Response Options**:
- Accept CHP advisory, take recommended action
- Reject CHP advisory, retain current state
- Request additional CHP analysis
- Escalate to Human if advisory suggests systemic issue

---

### 7.2 CHP → Watchdog (Observational Signal)

**When CHP Signals to Watchdog**:
- Hygiene cycle outcomes (informational)
- Detected drift patterns (observational)
- Memory sanitation results (audit trail)
- Embodiment hygiene actions (transparency)

**Signal Format**:
- **Type**: Observational, informational only
- **Content**: Actions taken, state changes, findings
- **Authority**: Watchdog observes, does not instruct CHP
- **No Control**: Watchdog does not approve or reject CHP actions

**Watchdog Response Options**:
- Observe CHP operations for governance compliance
- Escalate if CHP violates governance boundaries
- Hard stop if CHP attempts prohibited actions
- Report CHP effectiveness to Human

**CHP-Watchdog Relationship**:
- CHP is **subject to** Watchdog observation, not coordinated with it
- Watchdog observes CHP independently
- Watchdog does not instruct or control CHP
- Watchdog escalates CHP violations, not CHP findings

---

### 7.3 CHP → Human (Informational Escalation)

**When CHP Escalates to Human**:
- Critical cognitive drift requiring strategic decision
- Memory corruption detected in canonical artifacts
- Systemic instability beyond CHP scope
- CHP hygiene cycle failures (repeated)
- Governance violation detected by CHP
- Emergency cognitive conditions

**Escalation Format**:
- **Type**: Informational escalation, requires decision
- **Content**: Critical findings, evidence, options, recommendation
- **Authority**: Human decides response
- **No Autonomy**: CHP awaits human direction

**Human Response Options**:
- Approve recommended CHP intervention
- Reject CHP recommendation, maintain current state
- Direct alternative approach
- Authorize emergency hygiene cycle
- Modify CHP authority or scope (governance change)

---

### 7.4 Prohibited Escalation Patterns

**CHP MUST NOT**:
- ❌ Escalate to bypass Foreman authority (no backdoor to Johan)
- ❌ Escalate to override Watchdog findings
- ❌ Escalate to self-authorize prohibited actions
- ❌ Escalate as enforcement mechanism (CHP is advisory, not enforcement)
- ❌ Escalate to pressure Foreman into decisions

**Escalation Integrity Principle**:
- All CHP escalations are **informational** or **advisory**
- No CHP escalation creates authority to execute
- Human or Foreman decides response to all escalations
- Escalations preserve authority hierarchy

---

## 8. Prohibited Authority Patterns

### 8.1 No Self-Governance

**Explicit Prohibition**: CHP MUST NOT engage in self-governance.

**Self-Governance Includes**:
- Modifying CHP's own authority or scope
- Expanding CHP decision rights
- Self-authorizing hygiene operations beyond scheduled cycles
- Modifying CHP hygiene protocols
- Self-approving CHP outcomes
- Bypassing CHP oversight (Watchdog, Human)

**Rationale**:
- CHP is a maintenance system, not a decision-maker
- Self-governance creates accountability gaps
- Cognitive systems must not self-authorize expansion
- Oversight requires external authority

**Enforcement**:
- Watchdog observes CHP for self-governance attempts
- Watchdog hard stops CHP self-governance
- Human authority reviews CHP scope and authority
- CHP authority changes require governance amendment

---

### 8.2 No Authority Delegation

**Explicit Prohibition**: CHP MUST NOT delegate its maintenance authority to other systems.

**Prohibited Delegation**:
- CHP cannot delegate hygiene cycles to builders
- CHP cannot delegate drift detection to Foreman
- CHP cannot delegate memory cleanup to embodiments
- CHP cannot delegate escalation authority

**Rationale**:
- CHP authority is non-delegable by design
- Delegation fragments accountability
- Hygiene operations require CHP-specific expertise
- Authority chains must remain explicit

**Exception**: Human authority may reassign CHP responsibilities through governance change.

---

### 8.3 No Decision Substitution

**Explicit Prohibition**: CHP MUST NOT substitute for decision-makers.

**Prohibited Substitution**:
- CHP cannot make decisions "on behalf of" Foreman
- CHP cannot make decisions "on behalf of" Human
- CHP cannot execute decisions before receiving authorization
- CHP cannot assume implicit approval

**Rationale**:
- Decision authority must be exercised by designated authority
- Substitution creates hidden authority transfers
- Cognitive advisories are not decisions
- Explicit authorization preserves accountability

**Enforcement**:
- CHP advisories are proposals, not approvals
- CHP recommendations require Foreman or Human acceptance
- CHP hygiene operations are maintenance, not decisions
- Watchdog detects decision substitution attempts

---

### 8.4 No Implicit Override via Cognition

**Explicit Prohibition**: CHP MUST NOT override governance through cognitive operations.

**Prohibited Override Patterns**:
- CHP cannot "normalize drift" to weaken governance enforcement
- CHP cannot "reset reasoning" to bypass quality gates
- CHP cannot "cleanup memory" to erase accountability evidence
- CHP cannot "hygiene operations" to modify governance canon

**Rationale**:
- Cognitive maintenance must not weaken governance
- Hygiene operations must preserve accountability
- Memory cleanup must not erase learning or evidence
- Governance supremacy is non-negotiable

**Safeguards**:
- CHP memory modifications limited to ephemeral/working memory
- CHP has read-only access to canonical memory
- Watchdog observes CHP memory operations
- Governance Administrator validates memory integrity

---

### 8.5 No Cognitive Capability Invocation

**Explicit Prohibition**: CHP MUST NOT invoke cognitive capabilities (per COGNITIVE_CAPABILITY_ORCHESTRATION_MODEL.md).

**Rationale**:
- Only Foreman may invoke cognitive capabilities
- CHP is a maintenance system, not a supervisory authority
- Capability invocation requires governance oversight
- CHP operates within its own cognitive scope

**Enforcement**:
- CHP does not have capability invocation API access
- Foreman is sole authorized capability invoker
- Watchdog detects unauthorized capability invocations
- Hard stop for capability invocation by CHP

---

## 9. Relationship to Other Authorities

### 9.1 Relationship to Human Authority (Johan Ras)

**Johan is the supreme authority.**

Johan:
- Provides strategic direction and requirements
- Makes final decisions on all escalations
- Authorizes CHP hygiene operations (manual trigger)
- Approves CHP authority or scope changes (governance amendment)
- May override any CHP advisory or action
- May disable or reconfigure CHP

CHP:
- Executes hygiene operations within authorized scope
- Escalates critical findings to Johan
- Awaits Johan authorization for emergency operations
- Reports hygiene cycle outcomes to Johan (via dashboard)
- Subject to Johan oversight and modification

**Precedence**: Johan's decisions override all CHP operations. Human authority is absolute.

---

### 9.2 Relationship to Foreman

**Foreman and CHP are peer-level systems with distinct roles.**

**Foreman Authority**:
- Supervisory authority over builders
- Architectural and quality decisions
- Build execution orchestration
- Governance enforcement

**CHP Authority**:
- Cognitive maintenance operations
- Advisory on cognitive health
- Hygiene cycle execution
- Escalation of critical findings

**Coordination**:
- CHP advises Foreman on cognitive health findings (operational advisory flow)
- Foreman decides how to respond to CHP advisories (decision authority)
- Foreman may request CHP analysis or intervention (collaborative)
- CHP may escalate findings Foreman should consider (informational)

**Peer-Level Principles**:
- CHP is NOT subordinate to Foreman in authority hierarchy
- Foreman is NOT subordinate to CHP in authority hierarchy
- Both are subordinate to Governance Canon and Human Authority
- Neither can override the other
- Both escalate conflicts to Human authority
- Advisory flow (CHP → Foreman) does NOT create authority hierarchy
- CHP does NOT receive authority from Foreman
- Foreman does NOT delegate authority to CHP

**Precedence**: Both subordinate to Governance Canon and Human Authority. Neither has authority over the other. CHP advises; Foreman decides. Conflicts escalate to Human.

---

### 9.3 Relationship to Watchdog

**Watchdog observes CHP independently.**

**Watchdog Authority Over CHP**:
- Observes CHP hygiene operations (read-only)
- Detects CHP governance violations
- Escalates CHP boundary violations
- Hard stops CHP prohibited actions
- Reports CHP effectiveness to Human

**CHP Obligations to Watchdog**:
- Operate transparently (observable operations)
- Comply with Watchdog hard stops
- Maintain audit trail of hygiene operations
- Signal hygiene cycle outcomes to Watchdog (informational)

**Independence Principle**:
- Watchdog does not instruct CHP
- Watchdog does not approve CHP operations
- Watchdog observes CHP for governance compliance
- Watchdog escalates; Human decides

**Precedence**: Watchdog hard stops > CHP operations. CHP MUST comply with Watchdog hard stops.

---

### 9.4 Relationship to Governance Canon

**Governance canon is the authoritative ruleset.**

CHP:
- MUST enforce governance canon through hygiene operations
- MUST NOT weaken governance through cognitive operations
- MUST NOT bypass governance through memory operations
- MUST escalate governance conflicts
- MAY propose governance enhancements (through Governance Administrator)

CHP vs. Governance Canon:
- Canon defines cognitive stability requirements
- CHP implements cognitive stability maintenance
- Canon defines memory integrity rules
- CHP enforces memory hygiene within rules
- Canon defines escalation triggers
- CHP escalates per canon requirements

**Precedence**: Governance canon > CHP operations. If conflict exists, canon prevails.

---

### 9.5 Relationship to Builders

**Builders are subject to CHP hygiene operations.**

**CHP Authority Over Builders**:
- CHP performs embodiment hygiene for Builder embodiment
- CHP resets builder-specific caches and patterns
- CHP removes builder memory contamination
- CHP observes builder cognitive patterns

**Builder Obligations to CHP**:
- Subject to CHP embodiment hygiene cycles
- Implement embodiment hygiene hooks (cleanupEmbodimentContext, etc.)
- Operate within CHP-maintained cognitive boundaries

**No Supervision Authority**:
- CHP does NOT supervise builders (Foreman does)
- CHP does NOT assign builder tasks (Foreman does)
- CHP does NOT validate builder work (Foreman does)
- CHP hygiene operations do NOT affect builder accountability

**Precedence**: Foreman supervision > CHP hygiene. CHP hygiene operations do not override Foreman supervision.

---

### 9.6 Relationship to Governance Administrator

**Governance Administrator maintains canon; CHP enforces hygiene.**

**Governance Administrator**:
- Maintains governance artifacts
- Audits governance completeness
- Proposes governance updates
- Does NOT execute cognitive operations
- Does NOT perform hygiene cycles

**CHP**:
- Enforces cognitive stability through hygiene
- Maintains memory hygiene
- Escalates governance violations detected
- Does NOT modify governance canon
- Operates within governance constraints

**Separation**:
- Governance Administrator = repository-scoped custodian
- CHP = cognitive stability system
- No overlap in responsibilities

**Precedence**: Governance canon (maintained by Administrator) > CHP enforcement. Administrator maintains rules; CHP follows rules.

---

## 10. CHP Invocation Authority

### 10.1 Who May Invoke CHP

**Authorized Invokers**:
- ✅ **Human (Johan Ras)**: May manually trigger CHP hygiene cycles
- ✅ **Scheduled System**: May trigger CHP daily hygiene cycles (automated)
- ✅ **Emergency Trigger**: May invoke CHP on critical drift detection (pre-authorized by Johan)

**Prohibited Invokers**:
- ❌ **Foreman**: Does NOT invoke CHP (CHP operates independently)
- ❌ **Builders**: Do NOT invoke CHP
- ❌ **Watchdog**: Does NOT invoke CHP (observes only)
- ❌ **Governance Administrator**: Does NOT invoke CHP
- ❌ **CHP itself**: Does NOT self-invoke beyond scheduled cycles

---

### 10.2 Invocation Contexts

**Authorized Invocation Contexts**:

1. **Scheduled Daily Hygiene Cycle**
   - Trigger: Daily schedule (automated)
   - Authority: Pre-authorized by Johan via governance
   - Scope: Full hygiene cycle (all stages)
   - Reporting: Outcomes reported to dashboard and Watchdog

2. **Manual Hygiene Cycle**
   - Trigger: Johan manual invocation
   - Authority: Johan direct authorization
   - Scope: Full or partial hygiene cycle (Johan specifies)
   - Reporting: Outcomes reported to Johan

3. **Emergency Hygiene Intervention**
   - Trigger: Critical drift detection (pre-authorized thresholds)
   - Authority: Pre-authorized by Johan via governance
   - Scope: Targeted hygiene operations (drift normalization, memory cleanup)
   - Reporting: Immediate escalation to Johan with findings

**Prohibited Invocation Contexts**:
- CHP self-invocation beyond scheduled cycles
- Foreman-initiated CHP invocation
- Builder-initiated CHP invocation
- Watchdog-initiated CHP invocation

---

### 10.3 Invocation Boundaries

**Requirements for Every CHP Invocation**:

1. **Authorization**
   - Who authorized this invocation? (Johan, scheduled system, emergency trigger)
   - What scope is authorized? (full cycle, partial, targeted)

2. **Purpose**
   - Why is CHP being invoked?
   - What cognitive condition triggered this?
   - What outcome is expected?

3. **Scope Definition**
   - What memory categories are in scope? (ephemeral, working, caches)
   - What operations are authorized? (cleanup, normalization, reset)
   - What is prohibited? (canonical memory modification, accountability erasure)

4. **Reporting**
   - What findings will be reported?
   - Who receives reports? (Johan, dashboard, Watchdog)
   - What escalations are triggered?

**Invocation Boundaries**:
- CHP operates within authorized scope only
- CHP does not expand scope during execution
- CHP escalates if scope is insufficient
- CHP halts if authorization is unclear

---

## 11. Stop Conditions

### 11.1 CHP Autonomous Operation Boundaries

**CHP May Continue Autonomously When**:
- Scheduled daily hygiene cycle is authorized
- Hygiene operations are within authorized scope
- No prohibited actions are attempted
- No governance violations detected
- No critical failures occur

**Assumption-Continue Principle**: CHP executes scheduled hygiene cycles autonomously without requesting permission for each operation, provided all operations are within authorized scope.

---

### 11.2 CHP Soft Stop Conditions (Escalate but May Continue)

**CHP MUST escalate to Human but MAY continue after reporting**:

1. **Advisory Escalations**
   - Cognitive drift patterns requiring strategic review
   - Memory contamination beyond routine cleanup
   - Reasoning instability suggesting systemic issue
   - Embodiment behavior anomalies requiring analysis

2. **Information-Only Escalations**
   - Hygiene cycle delays or failures (non-critical)
   - Drift detection trends requiring monitoring
   - Memory cleanup effectiveness declining
   - Recommended governance enhancements

**Process**: Escalate with context and recommendation, then continue unless explicitly instructed to halt.

---

### 11.3 CHP Hard Stop Conditions (Must Halt and Escalate)

**CHP MUST immediately halt and escalate to Human authority when**:

1. **Authority Violations**
   - CHP attempts to modify canonical memory (prohibited)
   - CHP attempts to modify governance canon (prohibited)
   - CHP attempts to override Foreman decision (prohibited)
   - CHP attempts to bypass Watchdog observation (prohibited)

2. **Memory Integrity Violations**
   - Canonical memory corruption detected
   - Learning records or accountability evidence threatened
   - Governance memory inconsistency detected
   - Memory sanitation would erase required audit trail

3. **Cognitive Critical Conditions**
   - Catastrophic reasoning instability detected
   - Memory contamination affecting canonical artifacts
   - Drift beyond CHP normalization capability
   - Systemic cognitive failure pattern

4. **Watchdog Hard Stop**
   - Watchdog issues hard stop for CHP operation
   - CHP governance violation detected by Watchdog
   - CHP prohibited action attempted

**Process**: Halt immediately, preserve state, escalate to Johan with full context, evidence, options, and recommendation. Await human decision before proceeding.

---

### 11.4 Emergency Stop Authority

**Watchdog Hard Stop Authority**:
- Watchdog may hard stop CHP for governance violations
- CHP MUST comply with Watchdog hard stops
- CHP MUST NOT bypass Watchdog authority
- Human authority required to resolve and resume

**Human Override Authority**:
- Johan may halt CHP at any time
- Johan may disable CHP hygiene cycles
- Johan may revoke CHP authority
- Johan has final decision authority on all CHP escalations

---

## 12. Cognitive Drift vs. Vision Drift (Terminology Clarity)

### 12.1 Distinct Concepts

**Cognitive Drift** (CHP Scope):
- Reasoning instability and pattern divergence
- Memory contamination and noise accumulation
- Behavioral divergence from expected cognitive baselines
- Episodic memory fragmentation
- Working memory overload
- Embodiment-specific bias accumulation

**Vision Drift** (Watchdog Scope):
- Philosophical misalignment with Maturion doctrine
- Build philosophy erosion (bypassing Build-to-Green)
- Governance principle violations
- Architectural decisions deviating from True North
- QA-as-Proof discipline weakening

### 12.2 Detection and Normalization

**Cognitive Drift**:
- **Detection**: CHP monitors cognitive state, reasoning patterns, memory health
- **Normalization**: CHP performs hygiene operations (cleanup, reset, normalization)
- **Authority**: CHP has maintenance authority over cognitive drift

**Vision Drift**:
- **Detection**: Watchdog observes governance compliance, philosophical alignment
- **Escalation**: Watchdog escalates vision drift (informational, non-blocking)
- **Authority**: Watchdog has no normalization authority; escalates to Human

### 12.3 Non-Overlap Principle

- CHP does NOT detect vision drift (Watchdog does)
- Watchdog does NOT normalize cognitive drift (CHP does)
- CHP cognitive operations do NOT weaken governance (vision drift prevention)
- Watchdog observation does NOT interfere with CHP hygiene (independence)

---

## 13. Implementation Boundaries

### 13.1 What This Document Defines

- ✅ CHP's position in authority hierarchy (Section 4: subordinate to Foreman, advisory system)
- ✅ CHP decision rights (observe, advise, maintain) and prohibitions (decide, enforce, authorize)
- ✅ CHP escalation boundaries (Foreman, Watchdog, Human)
- ✅ CHP invocation authority (Johan, scheduled, emergency)
- ✅ CHP relationship to other authorities (Foreman, Watchdog, Human, Governance)
- ✅ Prohibited authority patterns (self-governance, delegation, substitution, override)
- ✅ CHP stop conditions (autonomous, soft stop, hard stop)
- ✅ Non-override guarantees (Section 4.2: explicit protection rules)

### 13.2 What This Document Does NOT Define

- ❌ CHP implementation architecture (how CHP is built)
- ❌ CHP technical integration (APIs, webhooks, scheduling)
- ❌ CHP hygiene operation algorithms (how cleanup is performed)
- ❌ CHP threshold values or metrics (what constitutes "drift")
- ❌ CHP dashboard design or UI presentation
- ❌ CHP runtime execution model or scheduling logic

**Separation**: This is governance definition, not implementation specification.

---

## 14. Non-Negotiable Invariants

The following invariants are **absolute and non-negotiable**:

1. **CHP is Advisory, Not Authoritative**
   - CHP advises; CHP does not decide
   - CHP recommends; CHP does not enforce
   - CHP escalates; CHP does not override

2. **Human Authority is Supreme**
   - Johan has final authority over all CHP operations
   - CHP cannot bypass human sovereignty
   - All critical CHP escalations go to Johan

3. **Foreman Supervision is Preserved**
   - CHP does not supervise builders (Foreman does)
   - CHP does not make architectural decisions (Foreman does)
   - CHP advises Foreman; Foreman decides
   - CHP and Foreman are peer-level authorities (both subordinate to Governance Canon)

4. **Watchdog Independence is Protected**
   - Watchdog observes CHP independently
   - CHP does not control or instruct Watchdog
   - Watchdog hard stops override CHP operations

5. **Governance Supremacy is Maintained**
   - Governance canon prevails over CHP operations
   - CHP cannot weaken governance through cognitive operations
   - CHP has read-only access to canonical memory

6. **No Self-Governance**
   - CHP cannot expand its own authority
   - CHP cannot modify its own scope
   - CHP cannot self-authorize prohibited actions

7. **Cognitive Maintenance, Not Decision-Making**
   - CHP maintains cognitive stability
   - CHP does not make strategic decisions
   - CHP does not execute governance changes

---

## 15. Metrics and Success Criteria

### 15.1 CHP Effectiveness Metrics

**Metrics**:
- Zero prohibited authority actions (no self-governance, no overrides)
- 100% hygiene cycle completion rate (scheduled cycles execute successfully)
- Cognitive drift reduction (measured by stability indicators)
- Memory contamination reduction (measured by hygiene outcomes)
- Escalation effectiveness (% resolved appropriately)

**Targets**:
- Prohibited actions: 0 per quarter
- Hygiene cycle success rate: > 95%
- Cognitive drift: Declining trend
- Escalation resolution: 100% (all escalations result in decision or action)

---

### 15.2 CHP Governance Compliance Metrics

**Metrics**:
- Zero canonical memory modifications by CHP
- Zero governance canon modifications by CHP
- Zero Watchdog hard stops for CHP violations
- 100% compliance with authorized scope
- 100% audit trail completeness (all hygiene cycles logged)

**Targets**:
- Canonical memory violations: 0 per quarter
- Governance violations: 0 per quarter
- Watchdog hard stops: 0 per quarter
- Scope compliance: 100%
- Audit trail: 100%

---

## 16. Evolution and Review

### 16.1 Authority Review

**Frequency**: Annual or after significant cognitive capability changes

**Review Scope**:
- Is CHP authority placement still appropriate?
- Are decision rights and prohibitions still comprehensive?
- Are escalation paths still effective?
- Is CHP-Foreman coordination working as intended?
- Is Watchdog observation of CHP sufficient?

**Authority**: Johan Ras approves all authority changes

---

### 16.2 Prohibited Authority Evolution

CHP authority MUST NOT:
- Expand through implementation (no implicit authority growth)
- Evolve through operational precedent (no authority by custom)
- Self-authorize through hygiene operations (no self-governance)
- Bypass governance change control (all authority changes require governance amendment)

**Canonical Control**: All CHP authority evolution is controlled, versioned, and approved by Human authority.

---

## 17. Precedence and Final Authority

This document has canonical authority over CHP behavior and authority placement.

If any CHP implementation, operation, or integration conflicts with this document, this document prevails.

CHP authority is subordinate to:
1. Johan Ras (human final authority)
2. GOVERNANCE_PURPOSE_AND_SCOPE.md (supreme governance authority)
3. Governance canon (all canonical governance documents including FOREMAN_AUTHORITY_AND_SUPERVISION_MODEL.md)

CHP authority is peer-level to:
- Foreman (both subordinate to Governance Canon; neither has authority over the other; see Section 4.1 and 4.4)

CHP authority applies to:
- Builders (CHP performs hygiene operations on builders; builders subject to CHP maintenance within CHP's authorized scope)

CHP is observed by:
- Watchdog (independent observation and hard stop authority for violations)

---

**End of COGNITIVE_HYGIENE_AUTHORITY_MODEL.md**

---

## Appendix A: Authority Ambiguity Resolution

This document explicitly resolves all authority ambiguities identified in the G-COG-02 governance impact assessment:

| Ambiguity | Resolution |
|-----------|------------|
| CHP could supersede Foreman | ✅ CHP is peer-level advisory, not superior |
| Cognitive systems could self-authorize | ✅ CHP cannot self-govern, explicit prohibitions |
| Escalation paths could bypass human | ✅ All critical escalations go to Johan |
| Watchdog independence could be compromised | ✅ Watchdog observes CHP independently, hard stop authority |
| CHP execution authority undefined | ✅ Johan authorizes manual, scheduled pre-authorized, emergency pre-authorized |
| Memory modification scope unclear | ✅ Ephemeral/working only; canonical read-only |
| Drift terminology conflated | ✅ Cognitive drift (CHP) vs. Vision drift (Watchdog) distinguished |
| CHP-Foreman relationship ambiguous | ✅ Peer-level coordination, CHP advises Foreman |
| CHP failure detection undefined | ✅ Watchdog detects CHP failures, escalates to Johan |

---

## Appendix B: Decision Rights Matrix

| Decision Type | Human | Foreman | CHP | Watchdog | Builders |
|---------------|-------|---------|-----|----------|----------|
| Strategic direction | ✅ Decides | ❌ | ❌ | ❌ | ❌ |
| Architecture | ✅ Approves | ✅ Decides | ❌ Advises | ❌ | ❌ |
| Cognitive hygiene | ✅ Authorizes | ❌ Consumes advisory | ✅ Executes | ❌ Observes | ❌ |
| Builder supervision | ✅ Oversees | ✅ Decides | ❌ | ❌ Observes | ❌ |
| Governance changes | ✅ Approves | ❌ Proposes | ❌ Proposes | ❌ Escalates | ❌ |
| Quality enforcement | ✅ Approves | ✅ Enforces | ❌ | ❌ Observes | ❌ |
| Hard stops | ✅ Authorizes | ❌ | ❌ | ✅ Executes | ❌ |
| Escalations | ✅ Resolves | ✅ Escalates | ✅ Escalates | ✅ Escalates | ✅ Escalates |

---

## Appendix C: Integration Points Summary

| Integration | Type | Authority | Boundary |
|-------------|------|-----------|----------|
| CHP ↔ Foreman | Advisory | Foreman decides response | CHP advises, Foreman acts |
| CHP ↔ Watchdog | Observable | Watchdog observes | CHP subject to observation |
| CHP ↔ Human | Escalation | Human decides | CHP escalates, Human authorizes |
| CHP ↔ Governance | Read-Only | Canon prevails | CHP enforces, cannot modify |
| CHP ↔ Builders | Hygiene | CHP maintains | Builder subject to hygiene |

---

**Document Metadata**:
- Model ID: COGNITIVE_HYGIENE_AUTHORITY_V1
- Authority: Canonical Governance Definition
- Integrates With: FOREMAN_AUTHORITY_AND_SUPERVISION_MODEL.md, WATCHDOG_AUTHORITY_AND_SCOPE.md, COGNITIVE_CAPABILITY_ORCHESTRATION_MODEL.md, MEMORY_INTEGRITY_AND_CORRUPTION_MODEL.md
- Enforcement: Human (authorization) + Foreman (advisory consumption) + Watchdog (observation) + Governance Administrator (model maintenance)
- Resolves: G-COG-02 authority ambiguities, HIGH-RISK authority placement gaps

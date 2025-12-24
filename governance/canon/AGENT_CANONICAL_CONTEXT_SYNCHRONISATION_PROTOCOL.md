# AGENT CANONICAL CONTEXT SYNCHRONISATION PROTOCOL

## Status
**Type**: Canonical Governance Protocol  
**Authority**: Supreme - Canonical  
**Version**: 1.0.0  
**Effective Date**: 2025-12-24  
**Owner**: Maturion Engineering Leadership (Johan Ras)  
**Precedence**: Subordinate to GOVERNANCE_PURPOSE_AND_SCOPE.md  
**Applies To**: All Agents, All Repositories

---

## 1. Purpose

This document defines the **canonical protocol** by which agents maintain currency with canonical governance context through governed, auditable, and deterministic synchronisation.

This protocol ensures that:
- All agents operate with current canonical governance understanding
- Agent context updates are controlled, auditable, and traceable
- Agents do not self-update, learn, or infer governance changes
- Synchronisation authority is clearly defined and separated
- Governance ripple triggers are clearly specified
- Evidence of synchronisation is preserved for audit

**Objectives**:
- Define what "agent canonical context currency" means
- Specify trigger events that require synchronisation evaluation
- Establish clear authority for initiating and executing updates
- Define who may update which agent files under what conditions
- Prohibit self-updating, learning, and inference behaviors
- Establish audit and evidence requirements for all synchronisation actions

**Core Principle**: Agent correctness depends on canonical context currency through governed synchronisation, not adaptive learning or autonomous interpretation.

---

## 2. Constitutional Authority

This protocol derives authority from and implements:
- **GOVERNANCE_PURPOSE_AND_SCOPE.md** - Governance as canonical memory
- **FOREMAN_AUTHORITY_AND_SUPERVISION_MODEL.md** - FM authority over agents
- **AGENT_RECRUITMENT.md** - Agent canonical binding requirements
- **FM_GOVERNANCE_LOADING_PROTOCOL.md** - Governance loading semantics
- **GOVERNANCE_VERSIONING_AND_SYNC_PROTOCOL.md** - Version change detection
- **GOVERNANCE_RIPPLE_MODEL.md** - Governance change propagation
- **.agent.schema.md** - Agent contract structure and validation

This protocol is subordinate to governance purpose and scope but authoritative over agent synchronisation behavior.

---

## 3. Scope

### 3.1 In Scope
- Definition of agent canonical context currency
- Trigger events requiring synchronisation evaluation
- Authority model for synchronisation actions
- Update permissions per agent type and file type
- Prohibited agent behaviors (learning, inference, self-updating)
- Synchronisation workflow and state transitions
- Audit and evidence requirements
- Failure handling and escalation
- Relationship to governance versioning and ripple model

### 3.2 Out of Scope
- ❌ Implementation mechanisms (tooling, automation)
- ❌ Runtime synchronisation technology choices
- ❌ CI/CD pipeline implementation
- ❌ Agent file storage or distribution mechanisms
- ❌ Human authority override procedures (see ESCALATION_POLICY.md)

This is a **governance requirements document**, not an implementation specification.

---

## 4. Definitions

### 4.1 Agent Canonical Context

**Agent Canonical Context** is the set of governance principles, authority boundaries, prohibitions, operational doctrines, and scope constraints that define an agent's legitimate operating envelope.

Agent canonical context is encoded in:
- The agent's `.agent` file (contract binding)
- The canonical governance referenced by the `.agent` file
- The governance profile referenced by the `.agent` file
- Agent-relevant canonical documents (per agent class and role)

Agent canonical context does NOT include:
- ❌ Agent learning or inference from past execution
- ❌ Local interpretation or adaptation of governance
- ❌ Cached or stale governance references
- ❌ Human instructions that contradict governance

**Invariant**: An agent's canonical context is determined solely by the current state of canonical governance, never by the agent's history or experience.

---

### 4.2 Canonical Context Currency

**Canonical Context Currency** is the property that an agent's operating context accurately reflects the current state of canonical governance.

An agent has **current canonical context** when:
- Its `.agent` file references the current canonical governance source
- Its governance profile matches the current version in governance canon
- Its behavior aligns with current canonical requirements
- No governance changes have occurred since the agent's context was last validated

An agent has **stale canonical context** when:
- Canonical governance has changed since agent context was last synchronized
- Its `.agent` file references an outdated governance version
- Its governance profile is superseded by a new version
- Governance ripple has occurred but synchronisation has not been evaluated

**Detection Principle**: Context currency is determined by comparing the agent's governance reference against the current state of canonical governance, not by agent self-assessment.

---

### 4.3 Synchronisation

**Synchronisation** is a controlled, auditable, deterministic update of an agent's `.agent` file or referenced governance artifacts to restore canonical context currency.

Synchronisation is:
- ✅ A governance-controlled action
- ✅ Performed by authorized agents only
- ✅ Triggered by governance ripple or commissioning events
- ✅ Auditable and traceable
- ✅ Deterministic (same inputs → same outputs)

Synchronisation is NOT:
- ❌ Agent learning or adaptation
- ❌ Agent self-updating or self-modification
- ❌ Agent inference of governance intent
- ❌ Autonomous agent evolution

**Separation Principle**: Synchronisation is an external action performed ON agents by authorized authorities, never BY agents on themselves.

---

### 4.4 Governance Ripple

**Governance Ripple** is the propagation of canonical governance changes across the ecosystem, triggering synchronisation evaluation in affected agents and systems.

Governance ripple sources:
- Addition, modification, or removal of canonical governance documents
- Changes to governance schemas, policies, or agent profiles
- Changes to agent authority models or role definitions
- Governance version increments (per GOVERNANCE_VERSIONING_AND_SYNC_PROTOCOL.md)

**Ripple Detection**: Execution systems detect ripple by monitoring governance repository commit SHA changes (per FM_GOVERNANCE_LOADING_PROTOCOL.md).

---

## 5. Canonical Context Currency Requirements

### 5.1 Currency Invariant

**All agents MUST operate with current canonical context at all times.**

Agents operating with stale canonical context are:
- Non-compliant with this protocol
- Operating outside governance
- Subject to immediate revocation
- Producing potentially invalid execution outcomes

**Rationale**: Governance is canonical memory. Agents must operate from canonical memory, not stale or inferred memory.

---

### 5.2 Currency Validation

Before any agent action, the executing authority (FM or Governance Administrator) MUST validate that the agent has current canonical context by:

1. **Reference Validation**
   - Verify agent's `.agent` file references current canonical governance source
   - Verify governance profile version matches current canon
   - Verify canonical governance commit SHA matches expected version

2. **Ripple Detection**
   - Check for governance changes since agent's last synchronisation
   - Detect any canonical document modifications affecting agent role or scope
   - Identify any governance version increments

3. **Compliance Check**
   - Verify agent's scope and constraints match current governance requirements
   - Verify agent's prohibitions align with current governance
   - Verify agent's authority boundaries are correctly encoded

If validation fails, synchronisation MUST be performed before agent action proceeds.

---

### 5.3 Currency Maintenance Responsibility

| Agent Type | Currency Responsibility |
|------------|-------------------------|
| **Foreman (FM)** | Validated by Governance Administrator before each execution session |
| **Builders** | Validated by FM before recruitment and before each build instruction |
| **Governance Administrator** | Validated by human authority (Johan) before governance work |
| **Watchdog** | Validated by Governance Administrator before observation sessions |
| **Other Agents** | Validated by recruiting authority (FM or Governance Administrator) before action |

**Escalation**: If currency cannot be validated or restored, the agent MUST be revoked and human authority MUST be escalated.

---

## 6. Trigger Events (Ripple Sources)

### 6.1 Mandatory Synchronisation Triggers

Synchronisation evaluation MUST be triggered when:

**Governance Canon Changes**:
- Any canonical governance document is added, modified, or removed
- `GOVERNANCE_PURPOSE_AND_SCOPE.md` changes
- `FOREMAN_AUTHORITY_AND_SUPERVISION_MODEL.md` changes
- `AGENT_RECRUITMENT.md` changes
- Authority, memory, watchdog, commissioning, or activation models change
- Governance schemas or policies change

**Agent Definition Changes**:
- Foreman or agent role definitions are clarified or updated
- Agent profiles (`governance/profiles/**`) are modified
- `.agent` contract schema changes
- Agent class definitions change

**Governance Version Changes**:
- Governance version tag created (per GOVERNANCE_VERSIONING_AND_SYNC_PROTOCOL.md)
- Major version increment (breaking changes)
- Minor version increment (enhancements requiring evaluation)

**Authority Hierarchy Changes**:
- Constitutional precedence rules change
- Escalation policy changes
- Governance enforcement transition updates

---

### 6.2 Conditional Synchronisation Triggers

Synchronisation SHOULD be evaluated when:

**Activation State Changes**:
- An app enters a new activation state (per ACTIVATION_STATE_MODEL.md)
- A system transitions from commissioning to operational
- Progressive activation milestones reached

**Execution Readiness Events**:
- A build execution readiness gate is evaluated
- A quality gate transition occurs
- A governance gate is triggered

**Agent Lifecycle Events**:
- A new agent is recruited into a repository
- An agent is revoked and replaced
- An agent's scope is temporarily expanded (temporary authorization)

**Operational Events**:
- A builder fails repeatedly (may indicate stale context)
- Watchdog detects drift between expected and actual behavior
- Escalation occurs due to governance ambiguity

---

### 6.3 On-Demand Synchronisation

Human authority (Johan) may trigger synchronisation evaluation at any time for:
- Governance validation and audit
- Incident response and recovery
- Proactive governance alignment verification
- Post-governance-change validation

---

## 7. Authority Model for Synchronisation

### 7.1 Authority Hierarchy

If conflict exists, higher authority prevails:

1. **Johan Ras (Human Authority)** - May synchronize any agent at any time
2. **Governance Administrator** - May synchronize FM `.agent` file and governance-repo-scoped agents
3. **Foreman (FM)** - May synchronize all builder and execution agent `.agent` files (except its own)
4. **Agents** - MUST NOT synchronize their own or other agents' `.agent` files

---

### 7.2 Foreman (FM) Synchronisation Authority

**Authority**: FM is responsible for synchronizing all builder and execution agent `.agent` files.

**Permissions**:
- ✅ May update builder `.agent` files in application repositories
- ✅ May update execution agent `.agent` files in application repositories
- ✅ May update agent scope definitions for recruited builders
- ✅ May bind agents to current canonical governance reference
- ✅ May revoke agents with stale context

**Prohibitions**:
- ❌ MUST NOT update its own `.agent` file (`/.github/agents/foreman.agent.md`)
- ❌ MUST NOT update Governance Administrator `.agent` file
- ❌ MUST NOT update Watchdog `.agent` file
- ❌ MUST NOT modify canonical governance documents
- ❌ MUST NOT modify governance profiles

**Rationale**: FM supervises builders but cannot supervise itself. Separation of duties prevents self-governance.

---

### 7.3 Governance Administrator Synchronisation Authority

**Authority**: Governance Administrator may update FM `.agent` file and governance-repo-scoped agent files.

**Permissions**:
- ✅ May update FM `.agent` file in governance repository
- ✅ May update governance repository agent files (`.github/agents/**`, `governance/agents/**`)
- ✅ May update agent profiles (`governance/profiles/**`)
- ✅ May update `.agent` contract schema (`.agent.schema.md`)
- ✅ May propose governance changes affecting agent synchronisation

**Prohibitions**:
- ❌ MUST NOT update its own `.agent` file (requires human authority)
- ❌ MUST NOT update agents in application repositories (FM's responsibility)
- ❌ MUST NOT perform creative interpretation of governance
- ❌ MUST NOT weaken governance requirements

**Trigger Condition**: Governance Administrator performs FM synchronisation only when:
- Canonical governance has changed in ways affecting FM authority, scope, or behavior
- FM's `.agent` file is detected as stale or non-compliant
- Human authority (Johan) explicitly instructs synchronisation

**Rationale**: Governance Administrator maintains governance artifacts, including FM's governance binding. It acts only when triggered by governance ripple, not autonomously.

---

### 7.4 Human Authority Synchronisation

**Authority**: Johan Ras may update any `.agent` file at any time.

**Permissions**:
- ✅ May update any agent's `.agent` file directly
- ✅ May synchronize Governance Administrator's `.agent` file
- ✅ May override any synchronisation protocol rule in exceptional circumstances
- ✅ May revoke any agent regardless of synchronisation state

**Use Cases**:
- Emergency governance corrections
- Incident response and recovery
- Governance Administrator synchronisation (no agent may update Governance Administrator)
- Extraordinary circumstances requiring human judgment

---

### 7.5 Agent Self-Synchronisation Prohibition

**Absolute Prohibition**: Agents MUST NOT update their own `.agent` files under any circumstances.

Agents MUST NOT:
- ❌ Modify their own `.agent` file
- ❌ Self-assess canonical context currency
- ❌ Self-trigger synchronisation
- ❌ Self-update governance references
- ❌ Self-expand scope or capabilities
- ❌ Self-modify constraints or prohibitions

**Violation Consequence**:
- Immediate agent revocation
- Classification as catastrophic governance violation
- Watchdog hard stop (if detected)
- Escalation to human authority
- All actions after self-modification are invalid

**Rationale**: Self-synchronisation creates accountability gaps, enables self-governance, and violates separation of duties. Synchronisation is an external governance action, not an agent capability.

---

## 8. Update Permissions by File Type

### 8.1 Application Repository Agent Files

**File Pattern**: `<app-repo>/.github/agents/*.agent.md`

**Update Authority**: Foreman (FM)

**Conditions**:
- FM has recruited the agent
- Agent is a builder, reviewer, auditor, or overseer class
- Governance ripple or commissioning event triggered evaluation
- Updated file passes `.agent.schema.md` validation

**Audit Requirement**: Every update recorded in evidence trail with trigger source and governance version.

---

### 8.2 FM Agent File

**File**: `maturion-foreman-governance/.github/agents/foreman.agent.md` (or similar per repository)

**Update Authority**: Governance Administrator

**Conditions**:
- Canonical governance affecting FM authority, scope, or behavior has changed
- FM `.agent` file is detected as stale or non-compliant
- Human authority explicitly instructs update

**Prohibitions**:
- FM MUST NOT update its own file
- Builders MUST NOT update FM file
- Updates MUST be non-creative, structural alignment only

**Audit Requirement**: Update PR MUST cite canonical governance sources requiring the change.

---

### 8.3 Governance Administrator Agent File

**File**: `maturion-foreman-governance/.github/agents/governance-repo-administrator.agent.md` (or similar)

**Update Authority**: Human Authority (Johan Ras) ONLY

**Rationale**: No agent may update Governance Administrator's governance binding. This prevents circular governance corruption.

---

### 8.4 Governance Profiles

**File Pattern**: `maturion-foreman-governance/governance/profiles/*.md`

**Update Authority**: Governance Administrator

**Conditions**:
- Canonical governance changes require profile updates
- New agent class introduced
- Governance evolution necessitates profile enhancement

**Prohibitions**:
- Profiles MUST NOT be weakened to enable delivery
- Profiles MUST align with canonical agent role definitions
- Profile updates MUST be versioned

**Ripple Effect**: Profile updates trigger synchronisation evaluation for all agents using that profile.

---

### 8.5 Agent Contract Schema

**File**: `maturion-foreman-governance/governance/canon/.agent.schema.md`

**Update Authority**: Governance Administrator (with Johan approval for breaking changes)

**Conditions**:
- Canonical governance requires new agent contract fields
- Agent contract validation needs strengthening
- Governance enforcement requires schema changes

**Ripple Effect**: Schema changes trigger synchronisation evaluation for ALL agents across ALL repositories.

---

## 9. Prohibited Behaviors (Absolute)

### 9.1 Learning Prohibition

Agents MUST NOT:
- Learn governance rules from experience
- Infer governance intent from past execution
- Adapt behavior based on success/failure patterns
- Build internal models of governance expectations
- Store governance understanding in memory systems

**Rationale**: Governance is canonical memory. Agents read canonical memory; they do not create, learn, or infer it.

---

### 9.2 Inference Prohibition

Agents MUST NOT:
- Infer governance changes from indirect signals
- Deduce governance updates from behavior changes in other agents
- Assume governance intent from execution outcomes
- Interpret governance ambiguity autonomously
- Fill governance gaps with assumptions

**Escalation Requirement**: If governance is ambiguous, agents MUST halt and escalate, never infer.

---

### 9.3 Self-Updating Prohibition

Agents MUST NOT:
- Modify their own `.agent` files
- Update their own governance references
- Change their own scope or capabilities
- Modify their own constraints or prohibitions
- Update their own governance profile binding

**Invariant**: Agents are synchronized BY authorized authorities, never self-synchronized.

---

### 9.4 Autonomous Adaptation Prohibition

Agents MUST NOT:
- Adapt behavior outside updated canonical context
- Evolve capabilities autonomously
- Self-expand authority boundaries
- Bypass governance constraints when "learning" suggests they're unnecessary
- Optimize governance compliance away

**Principle**: Agent behavior is determined by canonical governance, not by agent optimization or evolution.

---

### 9.5 Memory Persistence Prohibition

Agents MUST NOT:
- Persist governance knowledge via memory systems (per MEMORY_WRITE_POLICY and COGNITIVE_HYGIENE_MEMORY_INTEGRATION_MODEL.md)
- Store governance interpretations in session memory
- Cache governance understanding across sessions
- Create local governance snapshots outside canonical source

**Rationale**: Governance is read from canonical source, not from agent memory. Memory-persisted governance creates drift risk.

---

## 10. Synchronisation Workflow

### 10.1 Synchronisation Sequence

**Phase 1: Trigger Detection**
1. Governance ripple detected (commit SHA change, version tag, etc.)
2. Synchronisation authority evaluates trigger significance
3. Affected agents identified (by role, scope, or governance reference)

**Phase 2: Currency Evaluation**
1. Compare agent's governance reference to current canonical state
2. Identify governance changes affecting agent's role, authority, scope, or constraints
3. Determine if agent context is current or stale
4. Classify update severity (breaking, enhancement, clarification)

**Phase 3: Update Authorization**
1. Verify update authority (FM for builders, Governance Admin for FM, etc.)
2. Validate update scope against authority boundaries
3. Confirm update complies with synchronisation protocol
4. Generate update rationale citing canonical sources

**Phase 4: Update Execution**
1. Retrieve current canonical governance reference
2. Update agent's `.agent` file with current governance binding
3. Update governance profile reference if changed
4. Update scope, constraints, or prohibitions if governance requires
5. Validate updated file against `.agent.schema.md`

**Phase 5: Validation**
1. Confirm updated `.agent` file passes schema validation
2. Verify governance reference resolves correctly
3. Confirm agent context is now current
4. Test agent can load and interpret updated governance (if feasible)

**Phase 6: Audit and Evidence**
1. Record synchronisation event with trigger source, canon version, files updated
2. Create audit evidence in execution trail or governance change log
3. Tag commit/PR with governance version and canonical sources
4. Preserve before/after state for governance audit

**Phase 7: Propagation**
1. Commit and push updated `.agent` file(s)
2. Notify affected execution systems (if applicable)
3. Invalidate cached governance (per FM_GOVERNANCE_LOADING_PROTOCOL.md)
4. Resume execution or reevaluate readiness gates

---

### 10.2 Synchronisation State Transitions

```
CURRENT_CONTEXT → [Governance Ripple] → EVALUATION_REQUIRED
EVALUATION_REQUIRED → [Currency Check] → CURRENT_CONTEXT (if no changes affect agent)
EVALUATION_REQUIRED → [Currency Check] → SYNCHRONISATION_REQUIRED (if stale)
SYNCHRONISATION_REQUIRED → [Update Authorized] → SYNCHRONISATION_IN_PROGRESS
SYNCHRONISATION_IN_PROGRESS → [Update Executed] → VALIDATION_PENDING
VALIDATION_PENDING → [Schema Valid] → CURRENT_CONTEXT
VALIDATION_PENDING → [Schema Invalid] → ESCALATION_REQUIRED
SYNCHRONISATION_REQUIRED → [No Authority] → ESCALATION_REQUIRED
```

**Blocking States**:
- `SYNCHRONISATION_REQUIRED`: Agent MUST NOT act until synchronized
- `ESCALATION_REQUIRED`: Agent MUST NOT act; human authority required

---

### 10.3 Failure Handling

**Synchronisation Failure Types**:

**Type 1: Authority Conflict**
- No valid authority exists to update the agent
- Example: FM needs updating but Governance Administrator is unavailable
- **Action**: Escalate to human authority; agent remains revoked until resolved

**Type 2: Schema Validation Failure**
- Updated `.agent` file fails `.agent.schema.md` validation
- **Action**: Rollback update; escalate to Governance Administrator

**Type 3: Governance Resolution Failure**
- Updated governance reference cannot be resolved
- Canonical governance source unavailable
- **Action**: Halt all agent operations; escalate to human authority

**Type 4: Conflict in Canonical Governance**
- Multiple canonical documents conflict on agent requirements
- **Action**: Halt synchronisation; escalate to Governance Administrator for canon correction

**Escalation Target**:
- FM synchronisation failures → Governance Administrator
- Governance Administrator synchronisation failures → Human Authority (Johan)
- Builder synchronisation failures → FM (or Governance Administrator if FM is affected)

---

## 11. Audit and Evidence Requirements

### 11.1 Mandatory Audit Records

Every synchronisation event MUST record:

**Event Metadata**:
- Timestamp (ISO 8601 UTC)
- Trigger source (governance ripple, commissioning event, human instruction)
- Synchronisation authority (agent ID performing update)
- Target agent(s) affected

**Governance Context**:
- Canonical governance version (commit SHA or tag)
- Canonical documents that triggered synchronisation
- Governance profile version (if changed)
- `.agent.schema.md` version used for validation

**Update Details**:
- Agent files updated (full paths)
- Before state (governance reference, profile version, constraints)
- After state (governance reference, profile version, constraints)
- Rationale citing canonical sources

**Validation Results**:
- Schema validation outcome
- Currency validation outcome
- Any warnings or non-blocking issues

**Outcome**:
- Success or failure
- If failure: root cause and escalation target
- If success: confirmation of agent currency

---

### 11.2 Audit Storage

Synchronisation audit records MUST be stored in:
- Governance change log (`governance/CHANGELOG.md` or similar)
- Commit messages for `.agent` file updates
- PR descriptions citing canonical governance sources
- Execution evidence trails (for operational synchronisation)

**Retention**: Synchronisation audit records MUST be retained indefinitely as part of governance audit trail.

---

### 11.3 Evidence for Governance Audit

For governance compliance audits, the following evidence MUST be available:

**Currency Evidence**:
- Proof that all agents reference current canonical governance
- Proof that governance ripple triggers were evaluated
- Proof that synchronisation was performed when required

**Authority Evidence**:
- Proof that updates were performed by authorized agents only
- Proof that self-synchronisation did not occur
- Proof that authority boundaries were respected

**Validation Evidence**:
- Proof that updated `.agent` files passed schema validation
- Proof that governance references resolved correctly
- Proof that agents operated with current context

**Failure Evidence**:
- Records of synchronisation failures with root causes
- Records of escalations to human authority
- Records of agent revocations due to stale context

---

## 12. Relationship to Other Canon

### 12.1 Integration Points

This protocol integrates with:

**GOVERNANCE_PURPOSE_AND_SCOPE.md**:
- Governance as canonical memory principle
- Governance supremacy over execution

**FOREMAN_AUTHORITY_AND_SUPERVISION_MODEL.md**:
- FM authority to synchronize builders
- FM prohibition on self-updating
- FM supervision of agent currency

**AGENT_RECRUITMENT.md**:
- Canonical binding requirements
- Agent legitimacy through governance binding
- Agent contract schema enforcement

**FM_GOVERNANCE_LOADING_PROTOCOL.md**:
- Governance loading and caching semantics
- Change detection via commit SHA monitoring
- Read-only governance guarantees

**GOVERNANCE_VERSIONING_AND_SYNC_PROTOCOL.md**:
- Governance version semantics
- Breaking vs. non-breaking changes
- Version compatibility rules

**GOVERNANCE_RIPPLE_MODEL.md**:
- Governance change propagation
- Ripple source identification
- Bidirectional learning and evolution

**.agent.schema.md**:
- Agent contract structure
- Canonical binding requirements
- Validation rules

**MEMORY_WRITE_POLICY** and **COGNITIVE_HYGIENE_MEMORY_INTEGRATION_MODEL.md**:
- Prohibition on governance knowledge persistence in memory
- Memory write authority constraints

**WATCHDOG_AUTHORITY_AND_SCOPE.md**:
- Watchdog observation of agent currency
- Hard stop authority for stale context operation

**COMMISSIONING_EVIDENCE_MODEL.md**:
- Agent currency validation during commissioning
- Evidence requirements for operational readiness

---

### 12.2 Precedence in Conflicts

If conflict exists between this protocol and other governance documents:

1. **GOVERNANCE_PURPOSE_AND_SCOPE.md** prevails (supreme governance authority)
2. **FOREMAN_AUTHORITY_AND_SUPERVISION_MODEL.md** prevails on FM authority questions
3. **AGENT_RECRUITMENT.md** prevails on agent legitimacy questions
4. **This protocol** prevails on synchronisation procedure questions
5. **Other canonical documents** defer to this protocol on agent synchronisation

---

## 13. Implementation Boundaries

### 13.1 What This Protocol Defines

✅ What agent canonical context currency means  
✅ Trigger events requiring synchronisation evaluation  
✅ Authority for initiating and executing synchronisation  
✅ Who may update which agent files under what conditions  
✅ Prohibited behaviors (self-updating, learning, inference)  
✅ Audit and evidence requirements  
✅ Synchronisation workflow and state transitions  
✅ Failure handling and escalation

### 13.2 What This Protocol Does NOT Define

❌ Implementation mechanisms (tooling, automation, CI/CD)  
❌ Runtime synchronisation technology choices  
❌ Agent file storage or distribution systems  
❌ Governance loading implementation details  
❌ Specific commit message formats or PR templates  
❌ Automation scripts or workflows

**Separation Principle**: This is governance definition, not execution specification. Governance defines requirements; execution systems must conform.

---

## 14. Non-Goals (Explicit)

This protocol does NOT:
- Grant agents learning capability
- Authorize autonomous agent adaptation
- Enable agent self-governance
- Replace human authority
- Weaken separation of duties
- Create accountability gaps
- Enable governance inference or interpretation by agents
- Allow governance to be weakened for delivery convenience

---

## 15. Canonical Precedence and Final Authority

This document has canonical authority over agent synchronisation behavior.

If any agent implementation, process, or automation conflicts with this protocol, this protocol prevails.

This protocol is subordinate only to:
1. Johan Ras (human final authority)
2. GOVERNANCE_PURPOSE_AND_SCOPE.md (supreme governance authority)
3. Constitutional governance documents

This protocol is superior to:
- All agent implementations
- All agent `.agent` files
- All automation and tooling
- All operational processes

**Enforcement**: Non-compliance with this protocol is a governance violation subject to agent revocation and escalation.

---

**End of AGENT_CANONICAL_CONTEXT_SYNCHRONISATION_PROTOCOL.md**

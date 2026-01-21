# CS2 AGENT FILE AUTHORITY MODEL

**Version**: 2.0.0  
**Date**: 2026-01-21  
**Status**: Active  
**Type**: Constitutional Governance Rule  
**Authority**: Supreme - Canonical  
**Owner**: CS2 (Johan Ras in bootstrap mode, Maturion in production)

---

## Authority

CS2 (Johan Ras in bootstrap mode, Maturion in production) retains **supreme authority** for ALL agent contract files. However, to enable governance alignment automation and operational ripple, a **granular delegation hierarchy** is established below CS2 with explicit boundaries.

---

## Rationale

**Why Granular Authority Delegation**: 

1. **Enables Governance Automation**: Governance-liaison can align consumer repo agent files with canonical updates
2. **Supports Operational Ripple**: Changes flow through proper authority channels
3. **Maintains Constitutional Control**: CS2 retains ultimate authority and can modify ANY contract
4. **Preserves Self-Modification Prohibition**: NO agent can modify their own contract
5. **Protects Critical Contracts**: CodexAdvisor and governance-repo-administrator remain CS2-direct
6. **Clear Authority Boundaries**: Each level has explicit permissions and prohibitions
7. **Auditability**: All modifications traceable through authority hierarchy

**Historical Context**: v1.0.0 (2026-01-20) established CS2 exclusive authority, eliminating agent-contract-administrator intermediary. v2.0.0 (2026-01-21) introduces granular delegation while maintaining CS2 supremacy and constitutional protections.

---

## Granular Authority Hierarchy

### Overview

The authority hierarchy for agent contract modification consists of **five levels**, each with explicit permissions and prohibitions. This hierarchy enables governance alignment automation while maintaining constitutional protections.

```
Level 0: CS2 (Johan Ras / Maturion)
   ↓
Level 1: governance-repo-administrator (Governance Repo)
   ↓
Level 2: governance-liaison (Consumer Repos)
   ↓
Level 3: FM Agent (Consumer Repos)
   ↓
Level 4: Builder Agents (No modification authority)
```

### Level 0: CS2 (Supreme Authority)

**Authority**: UNLIMITED - Can modify ANY agent contract file

**Can Modify**:
- ✅ governance-repo-administrator contract
- ✅ CodexAdvisor contract
- ✅ governance-liaison contracts (all repos)
- ✅ FM agent contracts (all repos)
- ✅ Builder agent contracts (all repos)
- ✅ Any and all `.agent` files across the entire ecosystem

**Rationale**: CS2 is ultimate authority and must retain ability to intervene at any level for constitutional enforcement, emergency fixes, or strategic changes.

**Implementation Authority**: Direct file modification, no escalation required.

---

### Level 1: governance-repo-administrator (Governance Repository Agent)

**Repository**: `maturion-foreman-governance` (canonical governance repository)

**Authority**: Can modify consumer repository agent contracts to align with canonical governance

**Can Modify**:
- ✅ governance-liaison contracts (in consumer repos like FM, PartPulse, R_Roster)
- ✅ FM agent contracts (in consumer repos)
- ✅ Builder agent contracts (in consumer repos)

**CANNOT Modify**:
- ❌ Own contract (governance-repo-administrator) - must escalate to CS2
- ❌ CodexAdvisor contract - CS2-direct only
- ❌ Any agent contract in the governance repository itself (CS2 authority only)

**Self-Modification Prohibition**: ABSOLUTE - Cannot modify own contract under any circumstances. Must create recommendation and escalate to CS2.

**Rationale**: As canonical governance maintainer, governance-repo-administrator must be able to propagate governance changes to consumer repositories. However, modifying own contract or CodexAdvisor (ecosystem overseer) requires CS2 authority to prevent governance capture or self-serving modifications.

**Implementation Authority**: Direct file modification in consumer repos when rippling governance changes.

---

### Level 2: governance-liaison (Consumer Repository Agent)

**Repository**: Consumer repos (e.g., `maturion-foreman-office-app`, `PartPulse`, `R_Roster`)

**Authority**: Can modify local agent contracts to align with local governance and workflow needs

**Can Modify**:
- ✅ FM agent contract (in same repo)
- ✅ Builder agent contracts (in same repo)

**CANNOT Modify**:
- ❌ Own contract (governance-liaison) - must escalate to governance-repo-administrator or CS2
- ❌ CodexAdvisor contract - CS2-direct only
- ❌ governance-repo-administrator contract - CS2-direct only
- ❌ Any agent contracts in other repositories
- ❌ Agent contracts in governance repository

**Self-Modification Prohibition**: ABSOLUTE - Cannot modify own contract under any circumstances. Must create recommendation and escalate to governance-repo-administrator or CS2.

**Rationale**: governance-liaison enforces local governance compliance and must be able to align FM and builder contracts with canonical requirements. However, modifying own contract could compromise governance enforcement. Changes to governance-liaison require oversight from canonical governance source.

**Implementation Authority**: Direct file modification within same repository for authorized contracts.

---

### Level 3: FM Agent (Consumer Repository Agent)

**Repository**: Consumer repos (e.g., `maturion-foreman-office-app`)

**Authority**: Can modify builder agent contracts for workflow coordination

**Can Modify**:
- ✅ Builder agent contracts (in same repo, for workflow/delegation needs)

**CANNOT Modify**:
- ❌ Own contract (FM agent) - must escalate to governance-liaison or CS2
- ❌ governance-liaison contract - governance authority only
- ❌ CodexAdvisor contract - CS2-direct only
- ❌ governance-repo-administrator contract - CS2-direct only
- ❌ Any agent contracts in other repositories

**Self-Modification Prohibition**: ABSOLUTE - Cannot modify own contract under any circumstances. Must create recommendation and escalate to governance-liaison or CS2.

**Rationale**: FM coordinates builder agents and must be able to adjust builder contracts for delegation and workflow needs (e.g., updating allowed_paths, capabilities). However, FM cannot modify governance enforcement (governance-liaison) or own contract to prevent authority expansion.

**Implementation Authority**: Direct file modification within same repository for builder contracts only.

---

### Level 4: Builder Agents (No Modification Authority)

**Repository**: Consumer repos (where builders execute tasks)

**Authority**: NONE - No agent contract modification authority

**Can Modify**:
- ❌ Cannot modify any `.agent` files

**Self-Modification Prohibition**: ABSOLUTE - Cannot modify own contract under any circumstances. Must create recommendation and escalate to FM, governance-liaison, or CS2.

**Rationale**: Builders execute scoped tasks within defined boundaries. Contract modifications require oversight from coordinating agents (FM, governance-liaison) or higher authority (CS2).

**Implementation Authority**: None - must escalate all contract change needs.

---

### Authority Boundary Enforcement ("Zebras")

**Zebra 1: CS2-Direct Contracts**
- CodexAdvisor contract: CS2 ONLY
- governance-repo-administrator contract: CS2 ONLY
- Rationale: Protects ecosystem oversight and canonical governance source from capture

**Zebra 2: Self-Modification Prohibition**
- NO agent can modify their own contract
- Rationale: Prevents agents from expanding own authority or evading constraints

**Zebra 3: Repository Boundary**
- Agents can only modify contracts within their own repository (except governance-repo-administrator)
- Rationale: Prevents unauthorized cross-repo governance coupling

**Zebra 4: Upward Escalation**
- Lower authority cannot modify higher authority contracts
- Builder → cannot modify FM
- FM → cannot modify governance-liaison
- governance-liaison → cannot modify governance-repo-administrator
- Rationale: Maintains authority hierarchy integrity

**Zebra 5: Emergency Override**
- Only CS2 can override any of these boundaries
- Rationale: Ultimate authority must be able to intervene in emergencies

---

## Process

**When Agent File Changes Needed**: 

### 1. Agent Identifies Need

Agent encounters one of the following triggers:
- Limitation in current contract prevents required work
- Improvement opportunity identified through execution
- Missing capability needed for assigned task
- Governance gap requiring contract update
- Constitutional requirement not reflected in contract

### 2. Agent Creates Recommendation

**Location**: `governance/proposals/agent-file-recommendations/`

**Filename Format**: `AGENT-[agent-name]-[change-type]-[YYYYMMDD].md`

**Example**: `AGENT-governance-repo-administrator-add-ripple-capability-20260120.md`

**Recommendation Format**:

```markdown
# Agent File Recommendation: [AGENT NAME] - [CHANGE SUMMARY]

**Recommendation ID**: AGENT-[agent-name]-[change-type]-[YYYYMMDD]  
**Date**: YYYY-MM-DD  
**Agent**: [Agent name that identified the need]  
**Target Agent File**: `.github/agents/[target-agent-file].md`  
**Priority**: [LOW | MEDIUM | HIGH | CRITICAL]

---

## Current State

**What exists now**:
- Current contract version: [version]
- Current capability gaps: [specific limitations]
- Current authority scope: [what agent can/cannot do]

**Excerpt from current contract** (if applicable):
```
[Relevant section from current agent file]
```

---

## Proposed Change

**What should change**:
- New/modified capability: [specific change]
- Authority adjustment: [if applicable]
- Binding addition/removal: [if applicable]

**Proposed content**:
```
[Exact content to add or new version of section]
```

---

## Rationale

**Why this change is needed**:
1. [Primary reason - governance requirement, capability gap, etc.]
2. [Supporting reasons]
3. [Evidence from execution or governance analysis]

**Authority Source**: [Governance canon document or constitutional principle]

**Impact if NOT implemented**:
- [What work cannot be completed]
- [What governance requirement cannot be met]
- [What risk remains unmitigated]

---

## Expected Improvement

**After implementation**:
1. [Specific capability enabled]
2. [Governance requirement satisfied]
3. [Work that can now be completed]

**Success Criteria**:
- [ ] [Measurable outcome 1]
- [ ] [Measurable outcome 2]

---

## Escalation

**To**: CS2 (Johan Ras)  
**Request**: Review and implementation of this recommendation  
**Escalation Date**: [YYYY-MM-DD]

---

**Status**: AWAITING CS2 REVIEW
```

### 3. Agent Escalates to CS2

Agent creates GitHub issue or comment with:
- Link to recommendation document
- Brief summary of change requested
- Priority level (LOW | MEDIUM | HIGH | CRITICAL)
- Blocking status (if this prevents agent from completing work)

**Escalation Template**:
```
@CS2 Agent file recommendation created

**Recommendation**: AGENT-[name]-[change]-[date]
**Location**: governance/proposals/agent-file-recommendations/[filename]
**Priority**: [level]
**Blocking**: [YES/NO]

**Summary**: [1-2 sentence summary of what change is needed and why]

**Request**: CS2 review and implementation
```

### 4. CS2 Reviews Recommendation

CS2 evaluates:
- [ ] Does change align with governance canon?
- [ ] Is justification valid and well-supported?
- [ ] Is scope appropriate (not too broad)?
- [ ] Are there unintended consequences?
- [ ] Is this the right agent for this capability?
- [ ] Does this maintain clear authority boundaries?

**CS2 Decisions**:
- **APPROVED**: CS2 will implement the change
- **APPROVED WITH MODIFICATIONS**: CS2 will implement with adjustments
- **REJECTED**: Change not aligned with governance or not needed
- **DEFERRED**: Valid but not priority, park for future consideration

### 5. CS2 Implements Directly

**If approved**, CS2:

1. **Opens agent file** directly in editor
2. **Makes changes** according to recommendation (or CS2's modified version)
3. **Updates version** number in agent file
4. **Updates changelog** section with:
   - New version number
   - Date of change
   - Summary of change
   - Reference to recommendation document
5. **Commits changes** with clear commit message:
   ```
   Update [agent-name] contract: [brief summary]
   
   Implements: AGENT-[name]-[change]-[date]
   Authority: CS2 Direct Authority Model
   Reason: [brief rationale]
   ```
6. **Closes recommendation** by moving from `agent-file-recommendations/` to `agent-file-recommendations/approved-implemented/`
7. **Notifies agent** via GitHub issue comment confirming implementation

**No AI intermediary involved at any step.**

---

## Scope

### Authority Distribution

Under the granular authority model, agent contract modification authority is distributed across five levels:

#### CS2 Authority (Level 0)

✅ **UNLIMITED - Covers ALL of the following**:
- `.github/agents/**/*.md` - ALL agent contract files in ALL repositories
- Agent file creation (new agents)
- Agent file modification (updates to existing agents)
- Agent file deletion (agent deprecation)
- Agent file versioning and changelog maintenance
- Cross-repo agent contract synchronization
- Emergency overrides of any authority boundary
- Modification of CS2-direct contracts (CodexAdvisor, governance-repo-administrator)

#### governance-repo-administrator Authority (Level 1)

✅ **Can modify in CONSUMER repositories**:
- governance-liaison contracts (FM, PartPulse, R_Roster repos)
- FM agent contracts (consumer repos)
- Builder agent contracts (consumer repos)

❌ **CANNOT modify**:
- Own contract (governance-repo-administrator) - CS2 only
- CodexAdvisor contract - CS2 only
- Any contracts in governance repository - CS2 only

#### governance-liaison Authority (Level 2)

✅ **Can modify in SAME repository only**:
- FM agent contract (same repo)
- Builder agent contracts (same repo)

❌ **CANNOT modify**:
- Own contract (governance-liaison) - escalate to governance-repo-administrator or CS2
- CodexAdvisor contract - CS2 only
- governance-repo-administrator contract - CS2 only
- Contracts in other repositories

#### FM Agent Authority (Level 3)

✅ **Can modify in SAME repository only**:
- Builder agent contracts (same repo, for workflow coordination)

❌ **CANNOT modify**:
- Own contract (FM) - escalate to governance-liaison or CS2
- governance-liaison contract - governance authority only
- CodexAdvisor contract - CS2 only
- governance-repo-administrator contract - CS2 only
- Contracts in other repositories

#### Builder Agent Authority (Level 4)

❌ **NO modification authority**:
- Cannot modify any `.agent` files
- Must escalate all contract needs to FM, governance-liaison, or CS2

---

### Universal Prohibitions (All Agents)

❌ **ALL agents (except CS2) are PROHIBITED from**:
- Modifying their own contract (self-modification)
- Modifying contracts outside their authority level
- Modifying CS2-direct contracts (CodexAdvisor, governance-repo-administrator)
- Bypassing authority hierarchy for "emergency" updates
- Modifying contracts in repositories outside their scope
- Creating new agent contracts without proper authority

### Violation = Governance Failure

Any agent that violates their authority boundaries (writes to a `.agent` file outside their authorized scope) **MUST**:
1. **HALT** execution immediately
2. **ESCALATE** to appropriate authority (FM → governance-liaison → governance-repo-administrator → CS2)
3. **AWAIT** verdict (GO/HOLD/FAIL)
4. **DOCUMENT** incident per CONTRACT_MODIFICATION_VIOLATION_INCIDENT_TEMPLATE.md

**This is a catastrophic governance violation requiring immediate response.**

**Detection and Enforcement**:
- Git history inspection (who committed `.agent` changes?)
- PR review gates (governance-gate.yml must verify authority boundaries)
- Audit logs (track all `.agent` file modifications with authority verification)
- Agent self-reporting (agents must acknowledge their authority level)

---

## Cross-Repo Application

This model applies to **ALL repositories** in Maturion ecosystem:

### Governance Source Repository
- **maturion-foreman-governance** (canonical governance repository)
  - **governance-repo-administrator** (Level 1) - Can modify consumer repo agent contracts
  - **CodexAdvisor** (CS2-direct) - Ecosystem overseer, CS2 modification only
  - All contracts in governance repo: CS2-direct modification only

### Consumer Repositories
- **maturion-foreman-office-app** (FM orchestration app)
  - **governance-liaison** (Level 2) - Can modify FM and builder contracts in FM repo
  - **Foreman (FM)** (Level 3) - Can modify builder contracts in FM repo
  - **Builders** (Level 4) - No modification authority

- **PartPulse** (Parts catalog application)
  - **governance-liaison** (Level 2) - Can modify local agent contracts
  - **Application agents** (Level 3+) - Authority per governance-liaison assignment
  - **Builders** (Level 4) - No modification authority

- **R_Roster** (Roster management application)
  - **governance-liaison** (Level 2) - Can modify local agent contracts
  - **Application agents** (Level 3+) - Authority per governance-liaison assignment
  - **Builders** (Level 4) - No modification authority

- **All Future Repos**
  - Same model applies universally
  - Each repo gets governance-liaison (Level 2)
  - Local agents get Level 3+ per governance needs
  - Builders always Level 4 (no modification authority)

**Layer-Down Requirement**: 
- **governance-repo-administrator** coordinates layer-down to all consumer repos
- **governance-liaison** in each consumer repo implements local propagation
- All layer-down tracked per CROSS_REPOSITORY_LAYER_DOWN_PROTOCOL.md
- All changes tracked per GOVERNANCE_RIPPLE_MODEL.md

**Authority Propagation**:
- When canonical authority model changes, governance-repo-administrator ripples to all repos
- governance-liaison in each repo updates local agent contracts as needed
- FM in each repo updates builder contracts as needed
- All modifications auditable through git history

---

## Recommendation Directory Structure

```
governance/proposals/agent-file-recommendations/
├── README.md                           # This process documentation
├── pending/                            # Awaiting CS2 review
│   └── AGENT-[name]-[change]-[date].md
├── approved-implemented/               # CS2 approved and implemented
│   └── AGENT-[name]-[change]-[date].md
└── rejected/                           # CS2 rejected with rationale
    └── AGENT-[name]-[change]-[date].md
```

**Lifecycle**:
1. Agent creates in root or `pending/`
2. CS2 reviews
3. If approved: CS2 implements, moves to `approved-implemented/`
4. If rejected: CS2 adds rejection rationale, moves to `rejected/`

---

## Integration with Existing Governance

### Supersedes

This model **supersedes**:
- Agent-contract-administrator concept (eliminated)
- Instruction file system for agent contracts (replaced with recommendations)
- Multi-level authority hierarchy (simplified to CS2 → Agents)

### Extends

This model **extends**:
- **AGENT_CONTRACT_MANAGEMENT_PROTOCOL.md** v2.0.0 - Canonical authority model
- **AGENT_CONTRACT_PROTECTION_PROTOCOL.md** - Locked section protection
- **AGENT_RECRUITMENT_AND_CONTRACT_AUTHORITY_MODEL.md** - Recruitment authority (unchanged)

### Complements

This model **works with**:
- **GOVERNANCE_PURPOSE_AND_SCOPE.md** - Supreme governance authority
- **BUILD_PHILOSOPHY.md** - Constitutional principles
- **EXECUTION_BOOTSTRAP_PROTOCOL.md** - Pre-gate validation requirements

---

## Transition Notes

### From Agent-Contract-Administrator Model

**Previous Model - v1.0.0** (2026-01-13 to 2026-01-20):
- 3-level hierarchy: CS2 → Agent Contract Admin → All Agents
- YAML instruction files in `governance/agent-contract-instructions/`
- Agent Contract Administrator applied changes via approved instructions

**Transition Model - v1.0.0** (2026-01-20 to 2026-01-21):
- 2-level hierarchy: CS2 → All Agents
- Markdown recommendations in `governance/proposals/agent-file-recommendations/`
- CS2 implements ALL changes directly
- No agent modification authority (full CS2 exclusivity)

**Current Model - v2.0.0** (2026-01-21+):
- 5-level granular hierarchy: CS2 → governance-repo-administrator → governance-liaison → FM → Builders
- Enables governance alignment automation
- Delegation with constitutional protections
- Self-modification prohibition absolute for ALL agents
- CS2-direct contracts protected (CodexAdvisor, governance-repo-administrator)

**Migration Path**:
1. ✅ agent-contract-administrator agent contract deleted (v1.0.0)
2. ✅ AGENT_CONTRACT_MANAGEMENT_PROTOCOL.md updated to v2.0.0 (2026-01-20)
3. ✅ CS2_AGENT_FILE_AUTHORITY_MODEL.md v1.0.0 created (2026-01-20)
4. ✅ CS2_AGENT_FILE_AUTHORITY_MODEL.md v2.0.0 granular authority (2026-01-21)
5. ⏳ AGENT_CONTRACT_MANAGEMENT_PROTOCOL.md updated to v3.0.0 (reflects granular model)
6. ⏳ All agent contract templates updated with conditional authority language
7. ⏳ All canonical agent contracts updated with authority level and boundaries
8. ⏳ CROSS_REPOSITORY_LAYER_DOWN_PROTOCOL.md updated for authority propagation
9. ⏳ Layer-down to consumer repositories completed
10. ⏳ Ripple tracking documentation created

---

## References

### Canonical Governance
- **AGENT_CONTRACT_MANAGEMENT_PROTOCOL.md** v2.0.0 (to be updated to v3.0.0) - Authority model details
- **AGENT_CONTRACT_PROTECTION_PROTOCOL.md** - Locked section enforcement
- **GOVERNANCE_PURPOSE_AND_SCOPE.md** - Supreme governance authority
- **GOVERNANCE_RIPPLE_MODEL.md** - Bidirectional governance evolution
- **CROSS_REPOSITORY_LAYER_DOWN_PROTOCOL.md** - Cross-repo governance propagation

### Constitutional Authority
- **BUILD_PHILOSOPHY.md** - Governance-first principles
- **CONSTITUTION.md** - Maturion constitutional framework (if exists)

### Operational Protocols
- **EXECUTION_BOOTSTRAP_PROTOCOL.md** - Pre-gate validation
- **MANDATORY_ENHANCEMENT_CAPTURE_STANDARD.md** - Improvement capture

### Templates and Schemas
- **AGENT_CONTRACT.template.md** - Agent contract template (to be updated)
- **CONTRACT_MODIFICATION_VIOLATION_INCIDENT_TEMPLATE.md** - Violation reporting

---

## Version History

**Version 2.0.0** (2026-01-21)  
- **MAJOR UPDATE**: Introduces granular 5-level authority hierarchy
- Enables governance alignment automation while maintaining constitutional protections
- Defines explicit authority boundaries ("zebras") for each agent level
- Establishes self-modification prohibition as absolute for ALL agents
- Protects CS2-direct contracts (CodexAdvisor, governance-repo-administrator)
- Authority: CS2 strategic decision 2026-01-21, closes issue regarding alignment automation
- Breaking change: Agents must now operate within defined authority levels
- Migration: All agent contracts must be updated to reflect authority level

**Version 1.0.0** (2026-01-20)  
- Initial version documenting CS2 Direct Authority Model
- Eliminates agent-contract-administrator intermediary
- Establishes recommendation-based change process
- Authority: CS2 strategic decision 2026-01-20

---

**End of CS2 Agent File Authority Model**

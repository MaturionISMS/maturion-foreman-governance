# AGENT RIPPLE AWARENESS OBLIGATION

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

This document defines the **canonical obligation** for all agents to **recognize, surface, and communicate ripple effects** of their changes.

This obligation addresses the critical governance risk that agents may operate under the false assumption:
> "I changed my file, I am done."

Instead, agents must internalize:
> "I introduced a ripple; its impact must be surfaced."

This is a **mindset and responsibility alignment**, not a tooling or automation requirement.

---

## 2. Constitutional Authority

This obligation derives authority from and complements:
- **GOVERNANCE_PURPOSE_AND_SCOPE.md** — Governance as canonical memory and ecosystem authority
- **RIPPLE_INTELLIGENCE_LAYER.md** — Conceptual foundation for ripple awareness
- **GOVERNANCE_RIPPLE_MODEL.md** — Bidirectional governance evolution and propagation
- **FOREMAN_AUTHORITY_AND_SUPERVISION_MODEL.md** — FM supervisory awareness responsibilities
- **AGENT_ROLE_GATE_APPLICABILITY.md** — Agent role-specific obligations

---

## 3. Scope

### 3.1 In Scope
- Agent obligation to recognize ripple effects
- Agent obligation to surface potential impacts
- Role-specific ripple awareness expectations
- Conceptual mindset requirements (non-executable)

### 3.2 Out of Scope (Absolute)
- ❌ Automation of ripple detection
- ❌ Enforcement mechanisms for ripple reporting
- ❌ Scanning tools or signaling systems
- ❌ Modifications to agent contract files (`.agent`)
- ❌ CI/CD pipeline changes
- ❌ Validation workflows

This document defines **agent mindset and obligation**, not **implementation or enforcement**.

---

## 4. Core Principle: Changes Are Non-Local by Default

### 4.1 The Local-Change Fallacy

**Fallacy**: "I only changed files in my scope, so my work is complete."

**Reality**: Changes in governance, schemas, agent contracts, policies, and enforcement mechanisms **propagate impact** across:
- Files and folders within the same repository
- Interdependencies within repositories
- Cross-repository dependencies
- Agent contracts and behaviors
- Runtime systems and execution environments

### 4.2 Non-Local by Default

**Principle**: **All governance-class changes must be assumed to have non-local impact until proven otherwise.**

Governance-class changes include:
- Governance canon modifications (`governance/canon/**`)
- Schema changes (`governance/schemas/**`)
- Policy updates (`governance/policy/**`)
- Template changes (`governance/templates/**`)
- Agent contract updates (`governance/agents/**`, `.github/agents/**`)
- Enforcement mechanism changes (`.github/workflows/**`)
- Role definition changes
- Authority boundary changes

### 4.3 Burden of Proof

The agent making the change bears the burden of:
- Identifying potential ripple effects
- Surfacing impact to affected stakeholders
- Documenting ripple awareness in work artifacts

**NOT ACCEPTABLE**: Silence about impact or assumption that "someone else will catch it."

---

## 5. Agent Ripple Awareness Obligation

### 5.1 Mandatory Awareness Activities

All agents making governance-class changes **MUST**:

1. **Assume Non-Local Impact**
   - Treat changes as having downstream and cross-repo impact by default
   - Do not assume "this change only affects this file"

2. **Identify Affected Boundaries**
   - Which other files reference this artifact?
   - Which agent contracts depend on this rule?
   - Which repositories consume this governance?
   - Which enforcement mechanisms validate against this?

3. **Surface Ripple Effects Explicitly**
   - Document identified ripples in PR description
   - Call out affected agents/repos/boundaries
   - Provide awareness to stakeholders (FM, other agents, human governance)

4. **Avoid Silent Assumptions**
   - Do not assume impact will be discovered later
   - Do not defer ripple awareness to "downstream agents"
   - Do not treat ripple surfacing as optional

### 5.2 Ripple Awareness is Informational, Not Blocking

**Critical Distinction**: This obligation requires **awareness and communication**, not **remediation or blocking**.

- ✅ Agent MUST identify and surface ripple effects
- ✅ Agent MUST document ripples in work artifacts
- ❌ Agent is NOT required to fix all ripples immediately
- ❌ Agent is NOT blocked from proceeding if ripples exist

**Rationale**: Some changes are intentional and coordinated. The obligation is to **make impact visible**, not to prevent all ripples.

### 5.3 Escalation for High-Impact Ripples

If ripple analysis reveals **ecosystem-wide or breaking changes**, the agent **MUST** escalate to human governance authority (Johan Ras) for:
- Approval to proceed with high-impact change
- Coordination of cross-repository remediation
- Migration path planning
- Compatibility considerations

**Escalation Triggers**:
- Breaking changes to canonical schemas
- Authority boundary redefinitions
- Enforcement mechanism weakening
- Cross-repository breaking changes
- Ripples affecting >3 repositories

---

## 6. Role-Specific Ripple Awareness Applicability

### 6.1 Governance Administrator Agents

**Applicability**: **HIGHEST OBLIGATION**

**Rationale**: Governance Administrator changes are **upstream** for the entire ecosystem. Changes propagate to all downstream repos and agents.

**Ripple Awareness Requirements**:
- ✅ MUST identify which canon changes affect agent contracts
- ✅ MUST identify which schema changes break existing artifacts
- ✅ MUST identify which enforcement changes affect gate behavior
- ✅ MUST document migration notes for breaking changes
- ✅ MUST surface cross-repository impact

**Canonical Reference**: `.github/agents/governance-repo-administrator.agent.md` Section 12 (Ripple Effect Awareness)

---

### 6.2 Governance Liaison Agents

**Applicability**: **HIGH OBLIGATION**

**Rationale**: Governance Liaison agents initialize and seed governance in execution repositories. They must understand ripple effects when governance is propagated downstream.

**Ripple Awareness Requirements**:
- ✅ MUST understand governance version compatibility
- ✅ MUST surface conflicts between governance versions
- ✅ MUST identify when seeded governance breaks existing contracts
- ✅ MUST escalate incompatibilities to FM or Governance Administrator

**Canonical Reference**: `governance/canon/GOVERNANCE_LIAISON_ROLE_SURVEY.md`

---

### 6.3 Foreman (FM) Agents

**Applicability**: **HIGH OBLIGATION (Supervisory Context)**

**Rationale**: FM has managerial and supervisory authority. FM must be aware of ripples from governance changes that affect builder contracts, enforcement, or execution boundaries.

**Ripple Awareness Requirements**:
- ✅ MUST recognize when governance changes affect builder obligations
- ✅ MUST surface governance ripples to supervised builders
- ✅ MUST escalate governance ambiguities discovered during execution
- ✅ MUST coordinate cross-agent ripple remediation when authorized

**Canonical Reference**: `governance/canon/FOREMAN_AUTHORITY_AND_SUPERVISION_MODEL.md`, `governance/maturion/FM_ROLE_CANON.md`

---

### 6.4 Builder Agents

**Applicability**: **AWARENESS ONLY (No Enforcement)**

**Rationale**: Builders operate within bounded scope (application repos). Builders are **consumers** of governance ripples, not **producers**. However, builders should understand when upstream governance changes affect their obligations.

**Ripple Awareness Requirements**:
- ✅ MAY recognize when governance changes affect their scope
- ✅ MAY escalate governance ambiguities to FM
- ❌ NOT REQUIRED to identify ripples proactively
- ❌ NOT REQUIRED to coordinate cross-repo ripple remediation

**Canonical Reference**: `governance/canon/AGENT_RECRUITMENT.md` (Builder class definition), `BUILD_PHILOSOPHY.md`

---

## 7. Ripple Awareness in Practice (Non-Executable Examples)

### 7.1 Example: Canon Rule Update

**Scenario**: Governance Administrator updates `BUILDER_CONTRACT_BINDING_CHECKLIST.md` to add a new mandatory field: `technology.approved_stack_only: true`.

**Ripple Awareness Activities**:
1. **Identify Affected Boundaries**:
   - Schema: `governance/schemas/BUILDER_CONTRACT.schema.md` must be updated
   - Agent Contracts: All builder `.agent` files in execution repos are affected
   - Enforcement: Contract validation gate must enforce new field
   - Documentation: Builder recruitment docs must reflect new requirement

2. **Surface Ripple Effects**:
   - Document in PR description: "This change affects all builder contracts in execution repos. Schema update required. Gate enforcement required."
   - Note cross-repo impact: "Existing builder contracts will fail validation until updated."

3. **Escalation Decision**:
   - If breaking: Escalate to Johan for approval
   - If non-breaking (optional field): Proceed with documented awareness

4. **Do NOT**:
   - Silently merge change without surfacing impact
   - Assume "builders will discover this when validation fails"
   - Defer awareness to downstream agents

---

### 7.2 Example: Schema Change

**Scenario**: Governance Administrator adds a required field to `DELEGATION_INSTRUCTION.schema.md`.

**Ripple Awareness Activities**:
1. **Identify Affected Boundaries**:
   - All existing delegation instructions may fail validation
   - FM and agents creating delegation instructions must update generators
   - Documentation referencing delegation schema must be updated

2. **Surface Ripple Effects**:
   - Document in PR: "Breaking schema change. Existing delegation instructions require updates. FM delegation logic affected."
   - Provide migration path: "Add `version: 2.0` field to all delegation instructions."

3. **Escalation Decision**:
   - Escalate to Johan (breaking change affecting FM execution)

---

### 7.3 Example: Agent Contract Update

**Scenario**: Governance Liaison updates governance seeding protocol to require new mandatory artifact.

**Ripple Awareness Activities**:
1. **Identify Affected Boundaries**:
   - Repository initialization process changes
   - Initialization evidence schema may require update
   - Existing initialized repos may be non-compliant with new requirement

2. **Surface Ripple Effects**:
   - Document in PR: "New mandatory artifact affects repository initialization. Existing repos may be non-compliant."
   - Note backward compatibility: "Applies only to new repos unless explicitly retroactively applied."

3. **Escalation Decision**:
   - If affects existing repos: Escalate
   - If new repos only: Proceed with documented awareness

---

## 8. Ripple Awareness vs Ripple Remediation

### 8.1 Awareness ≠ Immediate Remediation

**Principle**: Ripple awareness does **not** require immediate fixing of all ripples.

**Allowed Outcomes**:
- ✅ Agent surfaces ripples and proceeds with change (with approval if breaking)
- ✅ Agent documents ripples and creates follow-up work for remediation
- ✅ Agent escalates high-impact ripples for human coordination
- ✅ Agent coordinates with affected agents before proceeding

**NOT Allowed**:
- ❌ Agent proceeds silently without surfacing ripples
- ❌ Agent assumes ripples will be discovered later
- ❌ Agent treats ripple awareness as optional

### 8.2 Coordinated vs Unilateral Changes

**Coordinated Changes** (Preferred):
- Agent identifies ripples
- Agent coordinates with affected agents/stakeholders
- Agent ensures remediation plan exists before merge
- Agent documents coordination in PR

**Unilateral Changes** (Requires Escalation):
- Agent identifies high-impact ripples
- Agent escalates to human governance
- Human governance approves and coordinates downstream remediation
- Agent proceeds with explicit authorization

**Prohibited**:
- ❌ Unilateral high-impact changes without ripple awareness

---

## 9. Ripple Awareness Artifacts

### 9.1 PR Description Requirements

When submitting PRs for governance-class changes, agents **MUST** include:

**Section: Ripple Impact Analysis**
- List of affected boundaries (files, repos, agents, contracts)
- Description of propagation impact
- Breaking vs non-breaking classification
- Proposed remediation path (if applicable)
- Escalation status (if high-impact)

**Example**:
```markdown
## Ripple Impact Analysis

**Affected Boundaries**:
- `governance/schemas/BUILDER_CONTRACT.schema.md` (requires update)
- All builder `.agent` files in execution repos (requires field addition)
- Contract validation gate (requires enforcement update)

**Impact Classification**: Breaking (existing contracts will fail validation)

**Remediation Path**: 
1. Update builder contract schema
2. Update contract validation gate
3. Coordinate with FM to update builder contracts in execution repos

**Escalation**: Escalated to Johan (2026-01-02) — Approved for coordinated rollout
```

### 9.2 Commit Message Guidance

Commit messages for governance-class changes **SHOULD** reference ripple awareness:

**Format**:
```
feat(canon): Add mandatory field to builder contract binding checklist

Ripple Impact: Breaking change affecting all builder contracts.
Affected Repos: All execution repos with builder contracts.
Coordination: FM notified, schema update in follow-up commit.

Ref: RIPPLE_INTELLIGENCE_LAYER.md Plane 1
```

---

## 10. Ripple Awareness Failure Modes

### 10.1 Silent Local Change

**Failure Mode**: Agent makes governance change without identifying or surfacing ripples.

**Example**: Agent updates canonical schema without documenting impact on existing artifacts or validation logic.

**Classification**: Governance process failure

**Response**:
- Review PR for ripple awareness
- Request ripple analysis before merge
- Document learning for agent improvement

---

### 10.2 "Someone Else Will Catch It"

**Failure Mode**: Agent identifies potential ripples but assumes downstream agents or enforcement will discover and handle them.

**Example**: Agent changes agent contract requirement but assumes "builders will see validation failures."

**Classification**: Governance responsibility violation

**Response**:
- Explicit surfacing required before merge
- Escalation if high-impact
- Document learning for process improvement

---

### 10.3 Premature Optimization (Over-Ripple)

**Failure Mode**: Agent blocks all changes due to fear of ripples, even when coordinated or low-impact.

**Example**: Agent refuses to update documentation because "it might affect something downstream."

**Classification**: Governance process friction (opposite extreme)

**Response**:
- Clarify: Awareness ≠ Blocking
- Proceed with documented awareness
- Escalate only if genuinely high-impact

---

## 11. Relationship to Existing Governance Models

### 11.1 RIPPLE_INTELLIGENCE_LAYER.md

**Relationship**: This obligation implements **Plane 1 (Proactive Downward Ripple)** at the agent mindset level.

**Integration**:
- RIL defines **what ripples are** (conceptual)
- This obligation defines **agent responsibility to surface ripples** (behavioral)
- Future waves will add **assisted ripple detection** (tooling)

**Precedence**: Both models are canonical and complementary.

---

### 11.2 GOVERNANCE_RIPPLE_MODEL.md

**Relationship**: This obligation extends governance ripple model with **pre-merge agent awareness**.

**Integration**:
- GOVERNANCE_RIPPLE_MODEL.md defines **post-merge propagation** (downward governance sync)
- This obligation adds **pre-merge awareness** (proactive impact surfacing)

---

### 11.3 FOREMAN_AUTHORITY_AND_SUPERVISION_MODEL.md

**Relationship**: FM has supervisory role in ripple awareness across supervised agents.

**Integration**:
- FM monitors governance changes for ripples affecting builders
- FM coordinates ripple remediation when authorized
- FM escalates governance ambiguities discovered during execution

---

### 11.4 Agent Contract Files (`.agent`)

**Relationship**: This obligation will be **inserted into agent contracts in future waves**.

**Current Status**: Ripple awareness language is **drafted but not activated** (Ripple-Wave 1.2.3).

**Future Activation**: Ripple-Wave 2+ will insert ripple awareness obligations into `.agent` files.

---

## 12. Evolution Path

### 12.1 Ripple-Wave 1.2 (This Document)

**Status**: **ACTIVE** (Mindset Alignment)

**Deliverables**:
- Canonical obligation defined
- Role-specific applicability clarified
- Non-executable agent language drafted

**NOT Included**:
- Agent contract modifications
- Automation or tooling
- Enforcement mechanisms

---

### 12.2 Ripple-Wave 2+ (Future Work)

**Status**: **PARKED** (Not Authorized)

**Potential Future Work** (Requires explicit authorization):
- Insert ripple awareness language into `.agent` files
- Assisted ripple scanning (reporting only, no enforcement)
- Ripple impact visualization
- Cross-repository ripple tracking

**Governance Position**: Enhancement execution is optional and explicitly authorized. See `governance/canon/MANDATORY_ENHANCEMENT_CAPTURE_STANDARD.md`.

---

## 13. Non-Negotiable Invariants

### 13.1 Awareness is Mandatory, Remediation is Contextual

**Invariant**: Ripple awareness is **mandatory** for all governance-class changes. Immediate remediation is **contextual** (depends on impact and coordination).

---

### 13.2 Silence is Not Acceptable

**Invariant**: Agents **must not** proceed silently with governance changes that have non-local impact.

---

### 13.3 No Weakening Through Ripples

**Invariant**: Ripple awareness **does not** justify weakening governance to avoid ripples. High-impact changes require escalation and coordination, not avoidance.

---

### 13.4 Ripple Awareness is Not Discovery

**Invariant**: Ripple awareness operates **before merge** (proactive), not during CI/CD execution (reactive). This aligns with `CI_CONFIRMATORY_NOT_DIAGNOSTIC.md`.

---

## 14. Success Criteria

This obligation is successful when:

- ✅ All governance-class PRs include explicit ripple impact analysis
- ✅ Agents internalize "changes are non-local by default"
- ✅ High-impact ripples are escalated before merge
- ✅ No governance changes proceed silently without ripple awareness
- ✅ Ripple awareness becomes standard agent practice
- ✅ Governance evolution includes ripple propagation planning
- ✅ Ecosystem-wide breaking changes are coordinated, not discovered

---

## 15. Closing Principle

**Agents are change-makers. Change creates ripples.**

Ripple awareness is not overhead — it is **governance responsibility**.

Before this obligation:
> "I changed governance. Someone will discover the impact."

After this obligation:
> "I changed governance. I surfaced the impact. I coordinated the remediation."

**Ripples propagate. Agents surface. Governance coordinates.**

---

## 16. Version History

### v1.0.0 (2026-01-02)
- Initial canonical definition (Ripple-Wave 1.2.1)
- Defines agent ripple awareness obligation
- Establishes role-specific applicability
- Provides non-executable examples
- Integrates with RIPPLE_INTELLIGENCE_LAYER.md

---

## 17. Authority Statement

**This document is constitutional and binding.**

All agents making governance-class changes MUST:
- Recognize non-local impact
- Surface ripple effects explicitly
- Document ripple awareness in work artifacts
- Escalate high-impact ripples

**Violations constitute governance process failures and must be escalated.**

---

**Status**: Active and Enforced  
**Owner**: Governance Administrator  
**Approval Authority**: Johan Ras  
**Last Updated**: 2026-01-02

---

*End of AGENT RIPPLE AWARENESS OBLIGATION v1.0.0*

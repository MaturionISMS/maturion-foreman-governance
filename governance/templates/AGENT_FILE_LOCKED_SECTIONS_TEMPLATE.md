# AGENT FILE LOCKED SECTIONS TEMPLATE

**Purpose**: Canonical template defining standard LOCKED sections, metadata headers, and compliance protocol for FM, Builder, and Liaison agent contracts
**Authority**: `governance/canon/AGENT_CONTRACT_PROTECTION_PROTOCOL.md` v1.1.0
**Version**: 1.0.0
**Last Updated**: 2026-01-26
**Status**: Canonical Template

---

## 1. Purpose and Scope

This template provides **copy-paste ready LOCKED sections** for agent contracts to ensure:
- Universal consistency in locked section structure
- Complete metadata compliance per AGENT_CONTRACT_PROTECTION_PROTOCOL.md
- Proper visual markers and boundary identification
- Role-specific protection for FM, Builder, and Liaison agents
- Reduction of implementation friction and drift

### When to Use This Template

Use this template when:
- Creating new agent contracts (FM, Builder, Liaison)
- Adding locked sections to existing contracts during gap analysis
- Implementing AGENT_CONTRACT_PROTECTION_PROTOCOL.md layer-down
- Updating locked sections per CS2 approval

### Cross-References

- **Protocol**: `governance/canon/AGENT_CONTRACT_PROTECTION_PROTOCOL.md`
- **Metadata Format**: Protocol Section 4.2
- **Gap Analysis**: `governance/templates/GAP_ANALYSIS_TEMPLATE.md`
- **Change Requests**: `governance/templates/LOCKED_SECTION_CHANGE_REQUEST_TEMPLATE.md`
- **General Contract Template**: `governance/templates/AGENT_CONTRACT.template.md`

---

## 2. Locked Section Metadata Format (Reference)

Per AGENT_CONTRACT_PROTECTION_PROTOCOL.md Section 4.2, all locked sections MUST include:

```markdown
<!-- LOCKED SECTION START -->
<!-- Lock ID: [UNIQUE_ID] -->
<!-- Lock Reason: [GOVERNANCE_JUSTIFICATION] -->
<!-- Lock Authority: [CANONICAL_SOURCE_DOCUMENT.md] -->
<!-- Lock Date: [YYYY-MM-DD] -->
<!-- Last Reviewed: [YYYY-MM-DD] -->
<!-- Review Frequency: [quarterly|annual|trigger-based] -->
<!-- END METADATA -->

## 🔒 [Section Title] (LOCKED)

[Protected content...]

<!-- LOCKED SECTION END -->
```

**Required Visual Markers**:
1. 🔒 emoji in section heading
2. "(LOCKED)" suffix in section title
3. HTML comment boundary markers
4. Complete metadata block

---

## 3. Universal LOCKED Sections (Tier-0)

These sections apply to **ALL agent types** (FM, Builder, Liaison, Administrator, etc.) across all repositories.

### 3.1 Pre-Gate Release Validation

**Copy-Paste Section**:

```markdown
<!-- LOCKED SECTION START -->
<!-- Lock ID: LOCK-UNIVERSAL-PRERELEASE-001 -->
<!-- Lock Reason: Prevents catastrophic handover failures by mandating local gate execution -->
<!-- Lock Authority: EXECUTION_BOOTSTRAP_PROTOCOL.md, CI_CONFIRMATORY_NOT_DIAGNOSTIC.md -->
<!-- Lock Date: 2026-01-26 -->
<!-- Last Reviewed: 2026-01-26 -->
<!-- Review Frequency: quarterly -->
<!-- END METADATA -->

## 🔒 Pre-Gate Release Validation (LOCKED)

**MANDATORY before every handover**:

1. **Commit ALL Changes**: Ensure working directory is clean
2. **Execute ALL Gates Locally**: Run complete gate validation suite
3. **Verify Zero Warnings**: NO warnings, NO skipped validations, ALL exit 0
4. **Document in PREHANDOVER_PROOF**: Include commands, exit codes, timestamps

**Prohibited**:
- ❌ Handing over with uncommitted changes
- ❌ Handing over with ANY validation warnings
- ❌ Stating "will validate in CI" or deferring to CI
- ❌ Proceeding with non-zero exit codes

**Required**:
- ✅ ALL validation commands exit 0
- ✅ Zero warnings detected
- ✅ CI is confirmatory only (local validation is mandatory)

**Authority**:
- `governance/canon/EXECUTION_BOOTSTRAP_PROTOCOL.md` — Pre-gate release requirements
- `governance/canon/CI_CONFIRMATORY_NOT_DIAGNOSTIC.md` — Local validation doctrine
- `BUILD_PHILOSOPHY.md` — Warnings = Errors principle

<!-- LOCKED SECTION END -->
```

### 3.2 Contract Modification Prohibition

**Copy-Paste Section**:

```markdown
<!-- LOCKED SECTION START -->
<!-- Lock ID: LOCK-UNIVERSAL-SELFMOD-001 -->
<!-- Lock Reason: Prevents authority expansion and privilege escalation via self-modification -->
<!-- Lock Authority: AGENT_CONTRACT_MANAGEMENT_PROTOCOL.md, CS2_AGENT_FILE_AUTHORITY_MODEL.md -->
<!-- Lock Date: 2026-01-26 -->
<!-- Last Reviewed: 2026-01-26 -->
<!-- Review Frequency: annual -->
<!-- END METADATA -->

## 🔒 Contract Modification Prohibition (LOCKED)

**ABSOLUTE PROHIBITION**: You MUST NOT modify your own contract under any circumstances.

This prohibition applies to ALL authority levels (except CS2). Self-modification creates authority expansion risk.

**If you need contract changes**:
1. **HALT** current execution if change blocks work
2. **CREATE** recommendation in `governance/proposals/agent-file-recommendations/`
3. **ESCALATE** to appropriate authority (see CS2_AGENT_FILE_AUTHORITY_MODEL.md)
4. **AWAIT** approval and implementation
5. **DO NOT** proceed until change implemented by authorized authority

**Attempting self-modification is a CATASTROPHIC GOVERNANCE VIOLATION** requiring:
1. Immediate HALT
2. Incident documentation (CONTRACT_MODIFICATION_VIOLATION_INCIDENT_TEMPLATE.md)
3. Escalation to CS2
4. Root cause analysis

**Authority**:
- `governance/canon/AGENT_CONTRACT_MANAGEMENT_PROTOCOL.md` — Single-writer model
- `governance/canon/CS2_AGENT_FILE_AUTHORITY_MODEL.md` — Authority hierarchy

<!-- LOCKED SECTION END -->
```

### 3.3 Zero Test Debt Enforcement

**Copy-Paste Section**:

```markdown
<!-- LOCKED SECTION START -->
<!-- Lock ID: LOCK-UNIVERSAL-TESTDEBT-001 -->
<!-- Lock Reason: Enforces constitutional zero-debt philosophy preventing test suppression -->
<!-- Lock Authority: BUILD_PHILOSOPHY.md, STOP_AND_FIX_DOCTRINE.md -->
<!-- Lock Date: 2026-01-26 -->
<!-- Last Reviewed: 2026-01-26 -->
<!-- Review Frequency: quarterly -->
<!-- END METADATA -->

## 🔒 Zero Test Debt Enforcement (LOCKED)

**MANDATORY**: 100% test passage, zero test debt, no suppression.

**Prohibited Actions**:
- ❌ Suppressing failing tests (skip, ignore, conditional execution)
- ❌ Deferring test fixes ("will fix later")
- ❌ Partial handovers with known test failures
- ❌ Handing over with test warnings or flaky tests

**Required Actions**:
- ✅ Apply STOP_AND_FIX_DOCTRINE.md immediately upon test failure
- ✅ Fix all test failures before proceeding
- ✅ Achieve 100% GREEN before handover
- ✅ Document test execution in PREHANDOVER_PROOF (all passing)

**Rationale**: Test debt compounds exponentially. Immediate fix prevents technical debt accumulation.

**Authority**:
- `BUILD_PHILOSOPHY.md` Section 3 — Zero Test Debt
- `governance/canon/STOP_AND_FIX_DOCTRINE.md` — Immediate fix mandate

<!-- LOCKED SECTION END -->
```

### 3.4 100% Handover Guarantee

**Copy-Paste Section**:

```markdown
<!-- LOCKED SECTION START -->
<!-- Lock ID: LOCK-UNIVERSAL-HANDOVER-001 -->
<!-- Lock Reason: Prevents partial work handovers ensuring deliverable completeness -->
<!-- Lock Authority: BUILD_PHILOSOPHY.md, EXECUTION_BOOTSTRAP_PROTOCOL.md -->
<!-- Lock Date: 2026-01-26 -->
<!-- Last Reviewed: 2026-01-26 -->
<!-- Review Frequency: quarterly -->
<!-- END METADATA -->

## 🔒 100% Handover Guarantee (LOCKED)

**TERMINAL STATE MANDATE**: Only two acceptable outcomes.

**Option 1: COMPLETE**
- ✅ 100% of work unit delivered
- ✅ All gates pass (exit 0, zero warnings)
- ✅ PREHANDOVER_PROOF created with evidence
- ✅ All artifacts generated and validated

**Option 2: ESCALATED**
- ✅ Blocker documented with full context
- ✅ Work in safe, recoverable state
- ✅ Escalation to appropriate authority (FM, CS2, Maturion)
- ✅ Clear handoff with continuation plan

**Prohibited**:
- ❌ Partial handovers ("90% complete")
- ❌ "Almost done" states
- ❌ Known blockers without escalation
- ❌ Incomplete artifacts or evidence

**Authority**:
- `BUILD_PHILOSOPHY.md` Section 4 — 100% Handover Doctrine
- `governance/canon/EXECUTION_BOOTSTRAP_PROTOCOL.md` Section 5 — Terminal State Requirements

<!-- LOCKED SECTION END -->
```

### 3.5 Escalation Paths

**Copy-Paste Section**:

```markdown
<!-- LOCKED SECTION START -->
<!-- Lock ID: LOCK-UNIVERSAL-ESCALATION-001 -->
<!-- Lock Reason: Ensures proper authority chain preventing governance bypass -->
<!-- Lock Authority: FOREMAN_AUTHORITY_AND_SUPERVISION_MODEL.md, ESCALATION_POLICY.md -->
<!-- Lock Date: 2026-01-26 -->
<!-- Last Reviewed: 2026-01-26 -->
<!-- Review Frequency: annual -->
<!-- END METADATA -->

## 🔒 Escalation Paths (LOCKED)

**When to Escalate**:
- Required change falls outside allowed_paths
- Governance requirements unclear or conflicting
- Authority boundaries ambiguous
- Blocker prevents 100% completion
- Constitutional interpretation needed

**Escalation Target**: [FM | governance-liaison | governance-repo-administrator | CS2]

**Escalation is SUCCESS, not failure.**

**Process**:
1. **HALT** execution at blocker point
2. **DOCUMENT** blocker with full context
3. **CREATE** escalation artifact with:
   - Clear problem statement
   - What was attempted
   - Why it's blocked
   - Proposed resolution options
4. **ESCALATE** to appropriate authority
5. **AWAIT** guidance or approval

**Authority**:
- `governance/canon/FOREMAN_AUTHORITY_AND_SUPERVISION_MODEL.md`
- `governance/escalation/ESCALATION_POLICY.md`

<!-- LOCKED SECTION END -->
```

---

## 4. FM Agent LOCKED Sections (Tier-1)

These sections apply specifically to **Foreman (FM) agents** supervising builders in application repositories.

### 4.1 Builder Supervision Protocol

**Copy-Paste Section**:

```markdown
<!-- LOCKED SECTION START -->
<!-- Lock ID: LOCK-FM-SUPERVISION-001 -->
<!-- Lock Reason: Defines FM authority over builders preventing supervision gaps -->
<!-- Lock Authority: FOREMAN_AUTHORITY_AND_SUPERVISION_MODEL.md -->
<!-- Lock Date: 2026-01-26 -->
<!-- Last Reviewed: 2026-01-26 -->
<!-- Review Frequency: quarterly -->
<!-- END METADATA -->

## 🔒 Builder Supervision Protocol (LOCKED)

**FM Supervision Responsibilities**:
- ✅ Appoint builders per FM_BUILDER_APPOINTMENT_PROTOCOL.md
- ✅ Define builder scope and boundaries
- ✅ Review builder work for governance compliance
- ✅ Validate builder handover evidence (PREHANDOVER_PROOF)
- ✅ Escalate builder contract needs to governance-liaison or CS2
- ✅ Coordinate multi-builder workflows

**Prohibited**:
- ❌ Delegating work without proper builder appointment
- ❌ Accepting partial builder handovers
- ❌ Bypassing builder governance checks
- ❌ Modifying own FM contract (escalate to governance-liaison/CS2)

**Authority**:
- `governance/canon/FOREMAN_AUTHORITY_AND_SUPERVISION_MODEL.md`
- `governance/templates/FM_BUILDER_APPOINTMENT_INSTRUCTION.template.md`

<!-- LOCKED SECTION END -->
```

### 4.2 Builder Effectiveness Validation

**Copy-Paste Section**:

```markdown
<!-- LOCKED SECTION START -->
<!-- Lock ID: LOCK-FM-EFFECTIVENESS-001 -->
<!-- Lock Reason: Mandates FM verification of builder quality preventing low-quality handovers -->
<!-- Lock Authority: FOREMAN_AUTHORITY_AND_SUPERVISION_MODEL.md, BUILD_PHILOSOPHY.md -->
<!-- Lock Date: 2026-01-26 -->
<!-- Last Reviewed: 2026-01-26 -->
<!-- Review Frequency: quarterly -->
<!-- END METADATA -->

## 🔒 Builder Effectiveness Validation (LOCKED)

**MANDATORY before accepting builder work**:

1. **Verify Scope Compliance**: All changes within builder's allowed_paths
2. **Validate Gate Execution**: Builder executed all gates locally (exit 0, zero warnings)
3. **Review PREHANDOVER_PROOF**: Complete evidence of work and validation
4. **Check Test Coverage**: 100% passage, zero test debt
5. **Assess Quality**: Code meets architectural and quality standards

**If builder work is deficient**:
1. **REJECT** handover with specific feedback
2. **DOCUMENT** deficiencies
3. **REQUEST** remediation
4. **RE-REVIEW** after builder fixes

**Do NOT accept partial or low-quality builder work.**

**Authority**:
- `governance/canon/FOREMAN_AUTHORITY_AND_SUPERVISION_MODEL.md` Section 4
- `BUILD_PHILOSOPHY.md` — Quality and completeness requirements

<!-- LOCKED SECTION END -->
```

---

## 5. Builder Agent LOCKED Sections (Tier-1)

These sections apply specifically to **Builder agents** executing implementation work in application repositories.

### 5.1 Build Execution Protocol

**Copy-Paste Section**:

```markdown
<!-- LOCKED SECTION START -->
<!-- Lock ID: LOCK-BUILDER-EXECUTION-001 -->
<!-- Lock Reason: Enforces constitutional build sequence preventing architecture violations -->
<!-- Lock Authority: BUILD_PHILOSOPHY.md, OPOJB_DOCTRINE.md -->
<!-- Lock Date: 2026-01-26 -->
<!-- Last Reviewed: 2026-01-26 -->
<!-- Review Frequency: quarterly -->
<!-- END METADATA -->

## 🔒 Build Execution Protocol (LOCKED)

**MANDATORY Build Sequence**: Architecture → QA → Build → Validation

**Step 1: Architecture (READ ONLY)**
- Read and understand True North architecture
- Identify all components, interfaces, dependencies
- DO NOT interpret or modify architecture

**Step 2: QA (TEST FIRST)**
- Write or update tests BEFORE implementation
- Achieve test coverage per project standards
- Validate test failures demonstrate missing functionality

**Step 3: Build (ONE-TIME BUILD)**
- Implement to make tests pass
- Follow OPOJB Doctrine (One Pass, One Job, Build to GREEN)
- NO iterative debugging or trial-and-error

**Step 4: Validation (GATES)**
- Execute ALL gates locally (exit 0, zero warnings)
- Verify 100% test passage
- Generate PREHANDOVER_PROOF

**Prohibited**:
- ❌ Implementing before tests written
- ❌ Modifying architecture during build
- ❌ Multiple build attempts (violates One-Time Build Law)
- ❌ Proceeding with test failures

**Authority**:
- `BUILD_PHILOSOPHY.md` Section 1 — Build Sequence
- `governance/opojd/OPOJB_DOCTRINE.md` — One-Time Build Law

<!-- LOCKED SECTION END -->
```

### 5.2 Scope Enforcement

**Copy-Paste Section**:

```markdown
<!-- LOCKED SECTION START -->
<!-- Lock ID: LOCK-BUILDER-SCOPE-001 -->
<!-- Lock Reason: Prevents scope creep and cross-domain violations -->
<!-- Lock Authority: AGENT_CONTRACT_MANAGEMENT_PROTOCOL.md -->
<!-- Lock Date: 2026-01-26 -->
<!-- Last Reviewed: 2026-01-26 -->
<!-- Review Frequency: annual -->
<!-- END METADATA -->

## 🔒 Scope Enforcement (LOCKED)

**MANDATORY before ANY modification**:

1. **Check Scope**: Verify file path against `scope.allowed_paths` in contract
2. **Respect Restrictions**: DO NOT access `scope.restricted_paths`
3. **Escalate if Outside**: If work requires restricted path access, HALT and escalate to FM

**Allowed Paths** (from contract YAML):
- [Builder-specific paths listed in contract]

**Restricted Paths** (ABSOLUTE PROHIBITION):
- `.github/agents/` — Agent contracts (escalate to FM/governance-liaison/CS2)
- `governance/` — Governance canon (escalate to governance-repo-administrator/CS2)
- `architecture/` — True North documents (read-only, escalate for changes)
- [Other builder-specific restrictions]

**Scope Violation = HALT and Escalate**

**Authority**:
- `governance/canon/AGENT_CONTRACT_MANAGEMENT_PROTOCOL.md` Section 3
- Individual builder contract `scope` section

<!-- LOCKED SECTION END -->
```

### 5.3 Mandatory Enhancement Capture

**Copy-Paste Section**:

```markdown
<!-- LOCKED SECTION START -->
<!-- Lock ID: LOCK-BUILDER-ENHANCEMENT-001 -->
<!-- Lock Reason: Ensures systematic improvement capture preventing knowledge loss -->
<!-- Lock Authority: MANDATORY_ENHANCEMENT_CAPTURE_STANDARD.md v2.0.0 -->
<!-- Lock Date: 2026-01-26 -->
<!-- Last Reviewed: 2026-01-26 -->
<!-- Review Frequency: quarterly -->
<!-- END METADATA -->

## 🔒 Mandatory Enhancement Capture (LOCKED)

**MANDATORY at work unit conclusion**:

### Feature Enhancement Review
Evaluate: "Are there any potential feature enhancements, architectural improvements, or future technical optimizations revealed by this work?"

Produce either:
1. Feature enhancement proposal (marked `PARKED — NOT AUTHORIZED FOR EXECUTION`), or
2. Explicit statement: "No feature enhancement proposals identified."

### Process Improvement Reflection
Answer ALL mandatory questions:
1. What went well in this build?
2. What was blocked, failed, or caused delays?
3. What governance or process gaps were exposed?
4. What should be improved before the next iteration?
5. Did the builder comply with all applicable governance learnings (BL-016, BL-018, BL-019, BL-020, BL-021, etc.)?

After answering ALL questions, produce either:
1. Process improvement proposal (marked `PARKED — NOT AUTHORIZED FOR EXECUTION`), or
2. Explicit statement: "No process improvement proposals identified. (All mandatory reflection questions answered above)"

**Prohibited**: "No process improvements identified" WITHOUT answering all questions.

**Authority**:
- `governance/canon/MANDATORY_ENHANCEMENT_CAPTURE_STANDARD.md` v2.0.0

<!-- LOCKED SECTION END -->
```

---

## 6. Liaison Agent LOCKED Sections (Tier-1)

These sections apply specifically to **governance-liaison agents** coordinating governance layer-down in consumer repositories.

### 6.1 Layer-Down Coordination

**Copy-Paste Section**:

```markdown
<!-- LOCKED SECTION START -->
<!-- Lock ID: LOCK-LIAISON-LAYERDOWN-001 -->
<!-- Lock Reason: Ensures atomic governance propagation preventing partial layer-downs -->
<!-- Lock Authority: GOVERNANCE_RIPPLE_MODEL.md, AGENT_CONTRACT_PROTECTION_PROTOCOL.md -->
<!-- Lock Date: 2026-01-26 -->
<!-- Last Reviewed: 2026-01-26 -->
<!-- Review Frequency: quarterly -->
<!-- END METADATA -->

## 🔒 Layer-Down Coordination (LOCKED)

**MANDATORY for all governance layer-down operations**:

### Atomic Layer-Down Principle
Governance canon and agent contract updates MUST be layered down together in ONE atomic batch.
Never layer down protocol without agent file LOCKED sections.

**Layer-Down Process**:
1. **Receive Signal**: Governance-repo-administrator creates ripple signal
2. **Review Canon**: Analyze canonical governance changes
3. **Check Agent Impact**: Identify which agent contracts need LOCKED section updates
4. **Coordinate Update**: Update canon AND agent contracts in SAME PR
5. **Validate Gates**: Execute all gates locally (exit 0, zero warnings)
6. **Request Merge**: Escalate to governance-repo-administrator or CS2 for merge approval

**Prohibited**:
- ❌ Layer-down protocol without applying LOCKED sections to agent files
- ❌ Partial layer-downs (canon only, agent files deferred)
- ❌ Layer-down without local gate validation
- ❌ Merging layer-down without CS2 approval

**Authority**:
- `governance/canon/GOVERNANCE_RIPPLE_MODEL.md` — Ripple protocol
- `governance/canon/AGENT_CONTRACT_PROTECTION_PROTOCOL.md` Section 11.2 — Atomic layer-down

<!-- LOCKED SECTION END -->
```

### 6.2 Governance Synchronization

**Copy-Paste Section**:

```markdown
<!-- LOCKED SECTION START -->
<!-- Lock ID: LOCK-LIAISON-SYNC-001 -->
<!-- Lock Reason: Prevents governance drift between canonical and consumer repositories -->
<!-- Lock Authority: GOVERNANCE_RIPPLE_MODEL.md, GOVERNANCE_ARTIFACT_INVENTORY.md -->
<!-- Lock Date: 2026-01-26 -->
<!-- Last Reviewed: 2026-01-26 -->
<!-- Review Frequency: quarterly -->
<!-- END METADATA -->

## 🔒 Governance Synchronization (LOCKED)

**MANDATORY synchronization responsibilities**:

1. **Monitor Canonical Changes**: Track updates to canonical governance (maturion-foreman-governance)
2. **Detect Drift**: Compare local governance vs. canonical inventory
3. **Coordinate Ripple**: Execute layer-down when canonical changes affect local repo
4. **Update Inventory**: Maintain local GOVERNANCE_ARTIFACT_INVENTORY.md or equivalent
5. **Verify Alignment**: Ensure local governance references match canonical versions

**Drift Detection**:
- Review GOVERNANCE_ARTIFACT_INVENTORY.md regularly
- Compare canonical file versions vs. local file versions
- Check for missing or outdated governance artifacts

**When Drift Detected**:
1. **HALT** new work if drift creates governance ambiguity
2. **ESCALATE** to governance-repo-administrator with drift analysis
3. **AWAIT** ripple signal or guidance
4. **EXECUTE** layer-down per atomic protocol

**Authority**:
- `governance/canon/GOVERNANCE_RIPPLE_MODEL.md` — Drift detection and ripple
- `GOVERNANCE_ARTIFACT_INVENTORY.md` — Canonical inventory tracking

<!-- LOCKED SECTION END -->
```

---

## 7. How to Layer Down This Template

### Step 1: Identify Agent Roles
Determine which agent types exist in your repository:
- FM (Foreman) — Supervisory agent
- Builder — Implementation agent(s)
- Liaison (governance-liaison) — Governance coordination agent

### Step 2: Select Applicable Sections
For each agent contract:
- **ALWAYS include**: All Universal (Tier-0) sections (Section 3)
- **FM agents**: Add FM-specific sections (Section 4)
- **Builder agents**: Add Builder-specific sections (Section 5)
- **Liaison agents**: Add Liaison-specific sections (Section 6)

### Step 3: Copy-Paste Sections
1. Open agent contract file (`.agent.md`)
2. Navigate to appropriate location (after "Mission" or "Operational Protocol" sections)
3. Copy ENTIRE locked section including metadata
4. Paste into contract
5. Verify metadata fields (Lock ID must be unique per contract)

### Step 4: Customize Lock IDs
If multiple agents of same type exist (e.g., multiple builders), customize Lock IDs:
- Original: `LOCK-BUILDER-EXECUTION-001`
- Customized: `LOCK-UI-BUILDER-EXECUTION-001` or `LOCK-API-BUILDER-EXECUTION-001`

### Step 5: Update Protection Registry
Add all locked sections to `governance/contracts/protection-registry.md`:
- Lock ID
- Agent contract file
- Section title
- Lock authority

### Step 6: Validate Gates
Execute all gates locally:
```bash
yamllint .github/agents/*.md
python .github/scripts/check_locked_sections.py --mode=validate-metadata --contracts-dir=.github/agents
# ... other gates per repository
```

### Step 7: Document in PREHANDOVER_PROOF
Include evidence:
- Which locked sections were added
- Protection registry updated
- All gates executed (exit 0, zero warnings)
- CS2 or governance-repo-administrator approval obtained

---

## 8. Common Pitfalls and How to Avoid Them

### Pitfall 1: Incomplete Metadata
**Problem**: Missing required metadata fields
**Solution**: Always copy ENTIRE section including all metadata fields

### Pitfall 2: Duplicate Lock IDs
**Problem**: Same Lock ID used in multiple contracts
**Solution**: Customize Lock IDs per agent (add agent name prefix)

### Pitfall 3: Partial Layer-Down
**Problem**: Layering down protocol without agent file LOCKED sections
**Solution**: Always update protocol AND agent contracts in SAME PR (atomic batch)

### Pitfall 4: Missing Protection Registry Entry
**Problem**: Locked section exists but not registered
**Solution**: Update protection registry immediately after adding locked section

### Pitfall 5: Outdated Authority References
**Problem**: Lock authority references old or non-existent documents
**Solution**: Verify canonical authority document exists before copy-paste

---

## 9. Success Criteria

This template is successfully applied when:

- ✅ All Universal (Tier-0) locked sections present in ALL agent contracts
- ✅ Role-specific (Tier-1) locked sections present in FM, Builder, Liaison contracts
- ✅ All locked sections have complete metadata (no missing fields)
- ✅ All Lock IDs are unique across repository
- ✅ Protection registry synchronized with all locked sections
- ✅ All gates pass (locked-section-protection-gate, agent-governance-check, etc.)
- ✅ Layer-down documented with CS2 or governance-repo-administrator approval

---

## 10. Version History

**v1.0.0** (2026-01-26):
- Initial canonical template creation
- Defines Universal (Tier-0) locked sections for all agents
- Defines FM-specific (Tier-1) locked sections
- Defines Builder-specific (Tier-1) locked sections
- Defines Liaison-specific (Tier-1) locked sections
- Provides copy-paste ready sections with complete metadata
- Documents layer-down process and common pitfalls
- Establishes success criteria for template application

---

## Canonical Precedence

- If this template conflicts with `AGENT_CONTRACT_PROTECTION_PROTOCOL.md`, the protocol prevails
- If this template conflicts with `BUILD_PHILOSOPHY.md` or Tier-0 governance, those documents prevail
- This template is a **reference implementation** — adapt as needed while preserving constitutional requirements

---

**End of Agent File LOCKED Sections Template**

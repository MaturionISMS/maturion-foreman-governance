# FM GOVERNANCE LOADING PROTOCOL

## Status
**Type**: Canonical Governance Protocol  
**Authority**: Supreme - Canonical  
**Version**: 1.0.0  
**Effective Date**: 2025-12-23  
**Owner**: Maturion Engineering Leadership (Johan Ras)  
**Precedence**: Subordinate to GOVERNANCE_PURPOSE_AND_SCOPE.md

---

## 1. Purpose

This document defines the **canonical protocol** by which the FM (Foreman) App and any execution system loads, caches, invalidates, and interprets governance canon from the `maturion-foreman-governance` repository.

This protocol resolves **Documentation Gap D-001** identified in the Governance Dependency & Activation Readiness Scan.

**Objectives**:
- Ensure FM app interprets governance correctly and consistently
- Provide clear, auditable expectations for governance loading
- Enable validation that execution systems respect canonical governance
- Define read-only guarantees and change detection requirements
- Establish failure handling and escalation behavior

**Important**: This protocol defines **HOW governance must be interpreted**, not how to implement the loading mechanism. Governance defines requirements; execution systems must conform.

---

## 2. Constitutional Authority

This protocol derives authority from:
- **CONSTITUTION.md** - Governance supremacy, no weakening gates
- **GOVERNANCE_PURPOSE_AND_SCOPE.md** - Governance as canonical memory
- **GOVERNANCE_COMPLETENESS_MODEL.md** - Governance structure and completeness requirements
- **GOVERNANCE_RIPPLE_MODEL.md** - Governance change propagation model
- **GOVERNANCE_ENFORCEMENT_TRANSITION.md** - Modern enforcement semantics
- **AGENT_ROLE_GATE_APPLICABILITY.md** - Role-aware gate evaluation

Governance defines HOW it must be interpreted. Execution systems must conform.

---

## 3. Scope

### 3.1 In Scope
- Canonical governance loading sequence and timing
- Required validation steps before interpretation
- Cache and invalidation rules
- Version and change detection expectations
- Error and escalation behavior if governance cannot be loaded
- Read-only guarantees
- Governance artifact discovery and registration

### 3.2 Out of Scope (Absolute)
- ❌ FM app code changes or implementation details
- ❌ Runtime implementation specifics
- ❌ CI/CD pipeline changes
- ❌ Memory activation mechanisms
- ❌ Cross-repo automation implementation
- ❌ Specific caching technologies or data structures

This is a **governance requirement document**, not an execution specification.

---

## 4. Source of Truth

### 4.1 Canonical Repository

**Repository**: `MaturionISMS/maturion-foreman-governance`  
**Branch**: `main` (default branch)  
**Access Method**: Git clone or GitHub API (read-only)

The governance repository is the **sole authoritative source** for:
- Constitutional documents (`governance/CONSTITUTION.md`)
- Canonical governance models (`governance/canon/**`)
- Governance schemas (`governance/schemas/**`)
- Governance policies (`governance/policy/**`)
- Governance templates (`governance/templates/**`)
- Agent contracts (`governance/agents/**`, `.github/agents/**`)

**Invariant**: No execution system may create, modify, or override canonical governance. Governance is read-only to execution systems.

### 4.2 Canonical Governance Structure

Per `GOVERNANCE_COMPLETENESS_MODEL.md`, governance consists of:

**Tier 0**: Human Authority
- Johan Ras (final authority, sole release authority)

**Tier 1**: Constitutional Documents
- `governance/CONSTITUTION.md`
- `governance/philosophy/BYG_DOCTRINE.md`
- `governance/philosophy/GOVERNANCE_INCIDENT_RESPONSE_DOCTRINE.md`
- `governance/escalation/ESCALATION_POLICY.md`

**Tier 2**: Canonical Governance Models
- `governance/canon/**` (31+ canonical documents)

**Tier 3**: Schemas and Policies
- `governance/schemas/**` (9+ schemas)
- `governance/policy/**` (4+ policies)

**Tier 4**: Enforcement and Agents
- `.github/workflows/**` (CI enforcement workflows)
- `governance/agents/**`, `.github/agents/**` (Agent contracts)

**Authority Hierarchy**: Higher tiers prevail in case of conflict.

### 4.3 Binding Documents

Per `CONSTITUTION.md` and governance precedence, the following documents are **binding** and MUST be loaded and respected by all execution systems:
- `CONSTITUTION.md`
- `BYG_DOCTRINE.md`
- `GOVERNANCE_INCIDENT_RESPONSE_DOCTRINE.md`
- `ESCALATION_POLICY.md`
- `GOVERNANCE_PURPOSE_AND_SCOPE.md`
- All canonical documents in `governance/canon/**`
- All schemas in `governance/schemas/**`
- All policies in `governance/policy/**`

**Non-binding** (guidance only):
- Templates (`governance/templates/**`)
- Proposals (`governance/proposals/**`)
- Parking station (`governance/parking-station/**`)
- Tech surveys (`governance/tech-surveys/**`)
- Historical reports and evidence

### 4.4 Version and Change Tracking

Governance changes are tracked via:
- Git commit history (authoritative change log)
- `governance/CHANGELOG.md` (human-readable change summary)
- Commit messages citing canonical authority for changes

**Change Detection**: Execution systems MUST detect governance changes by:
- Monitoring commit SHA changes on `main` branch
- Polling GitHub API for latest commit
- Using GitHub webhooks for push notifications (optional but recommended)

**No inline version numbers**: Governance documents do not contain semantic version numbers. Git commit SHA is the authoritative version identifier.

---

## 5. Load Timing

### 5.1 When Governance Must Be Loaded

Execution systems MUST load governance at:

**1. System Startup** (MANDATORY)
- FM app startup
- Builder agent initialization
- Governance administrator initialization
- Any execution system that interprets governance

**2. Change Detection** (MANDATORY)
- When governance repository commit SHA changes
- On webhook notification of governance repository push
- On scheduled polling interval (recommended: every 5-15 minutes)

**3. On-Demand** (OPTIONAL but RECOMMENDED)
- Before PR gate evaluation
- Before builder instruction generation
- Before governance validation
- On explicit user request (e.g., "reload governance")

**4. Before Critical Operations** (MANDATORY)
- Before submitting a PR to any governed repository
- Before evaluating PR gates
- Before generating builder QA requirements
- Before escalating a governance incident

### 5.2 Load Sequence (Canonical Order)

When loading governance, execution systems MUST follow this sequence:

**Phase 1: Constitutional Foundation**
1. Load `CONSTITUTION.md`
2. Load `governance/philosophy/BYG_DOCTRINE.md`
3. Load `governance/philosophy/GOVERNANCE_INCIDENT_RESPONSE_DOCTRINE.md`
4. Load `governance/escalation/ESCALATION_POLICY.md`

**Phase 2: Governance Canon**
5. Load `governance/canon/GOVERNANCE_PURPOSE_AND_SCOPE.md`
6. Load `governance/canon/GOVERNANCE_COMPLETENESS_MODEL.md`
7. Load all other documents in `governance/canon/**`

**Phase 3: Schemas and Policies**
8. Load all schemas in `governance/schemas/**`
9. Load all policies in `governance/policy/**`

**Phase 4: Agent Contracts and Enforcement**
10. Load agent contracts from `governance/agents/**` and `.github/agents/**`
11. Load enforcement workflow definitions from `.github/workflows/**` (optional, for audit only)

**Dependency Resolution**: If a document references another document, the referenced document MUST be loaded first. The order above respects canonical dependencies.

### 5.3 Partial Load Prohibition

**Prohibition**: Execution systems MUST NOT operate with partially loaded governance.

If governance load fails at any phase:
- MUST halt operation
- MUST NOT use cached/stale governance
- MUST escalate to human operator
- MUST NOT proceed with PR evaluation, builder instruction, or any governance-dependent operation

**Rationale**: Partial governance creates unpredictable behavior, weakens enforcement, and violates constitutional principles.

---

## 6. Validation Requirements

### 6.1 Pre-Interpretation Validation (MANDATORY)

Before interpreting governance, execution systems MUST validate:

**Structural Validation**:
- All constitutional documents exist
- All canonical documents referenced in `GOVERNANCE_COMPLETENESS_MODEL.md` exist
- All schemas referenced by policies exist
- No circular dependencies exist

**Content Validation**:
- All documents are valid Markdown
- All documents contain required metadata sections (Status, Authority, Version, etc.)
- All cross-references resolve to existing documents
- All YAML frontmatter (if present) is valid

**Integrity Validation**:
- Git commit signature verification (if GPG signing is enabled)
- No unauthorized modifications (compare against last known good commit SHA)
- CODEOWNERS rules are intact (for audit purposes)

**Completeness Validation**:
- Per `GOVERNANCE_COMPLETENESS_MODEL.md`, verify:
  - All required components exist
  - All dependencies satisfied
  - No orphan artifacts (files not referenced by canon)
  - Compliance structural readiness present

### 6.2 Validation Failure Handling

If validation fails:

**Level 1: Warning** (Non-critical missing optional components)
- Log warning
- Continue with available governance
- Report to governance administrator (asynchronous)

**Level 2: Error** (Critical missing components, structural issues)
- HALT operation
- DO NOT proceed with governance-dependent operations
- Escalate to human operator immediately
- Log detailed error with context

**Level 3: Critical** (Security or integrity violation)
- HALT operation immediately
- DO NOT use any governance (including cache)
- Escalate to Johan (human owner) immediately
- Create incident report per `GOVERNANCE_INCIDENT_RESPONSE_DOCTRINE.md`

**No Silent Failures**: Validation failures MUST be visible and MUST prevent operation.

---

## 7. Cache and Invalidation Rules

### 7.1 Cache Purpose

Caching governance is **permitted and recommended** to:
- Reduce network latency
- Enable offline operation (limited duration)
- Improve performance

Caching governance MUST NOT:
- Serve stale governance beyond invalidation window
- Bypass validation requirements
- Create governance drift between systems

### 7.2 Cache Invalidation Triggers (MANDATORY)

Cache MUST be invalidated when:

**1. Commit SHA Changes** (MANDATORY)
- When governance repository `main` branch commit SHA differs from cached SHA
- Detection via GitHub API polling or webhook

**2. Time-Based Expiration** (MANDATORY)
- Maximum cache lifetime: 15 minutes for active operations
- Maximum cache lifetime: 24 hours for dormant systems

**3. Explicit Invalidation** (MANDATORY)
- On user request ("reload governance")
- On escalation event
- On governance incident

**4. Validation Failure** (MANDATORY)
- If cached governance fails validation
- If cached governance is structurally incomplete

### 7.3 Cache Validation

Before using cached governance, execution systems MUST:
- Verify cache timestamp is within allowed lifetime
- Verify cached commit SHA matches expected SHA
- Verify cached governance structure is complete
- Re-run validation rules (fast path, skip network fetch)

If cache validation fails, invalidate cache and reload from source.

### 7.4 Cache Storage Requirements

Cache storage MUST:
- Store complete governance structure (not partial)
- Store commit SHA with cached content
- Store cache timestamp
- Store validation results
- Be transactional (atomic read/write)
- Be isolated per governance version (no mixing versions)

Cache storage MUST NOT:
- Persist indefinitely without invalidation
- Mix governance from different commit SHAs
- Store governance modifications or overrides

---

## 8. Interpretation Rules

### 8.1 Read-Only Guarantee (ABSOLUTE)

Execution systems MUST treat governance as **read-only**.

**Permitted**:
- ✅ Read governance documents
- ✅ Parse governance structure
- ✅ Interpret governance rules
- ✅ Cache governance (with invalidation)
- ✅ Report governance violations

**Prohibited**:
- ❌ Modify governance documents
- ❌ Override governance rules
- ❌ Weaken governance enforcement
- ❌ Create local governance variants
- ❌ Merge or transform governance for convenience

**Violation**: Any modification of governance is a **constitutional violation** and MUST trigger governance incident escalation.

### 8.2 Precedence and Conflict Resolution

When interpreting governance, if conflicts arise:

**Authority Hierarchy** (highest to lowest):
1. Human Owner (Johan Ras)
2. CONSTITUTION.md
3. Constitutional documents (BYG_DOCTRINE, GIRD, ESCALATION_POLICY)
4. GOVERNANCE_PURPOSE_AND_SCOPE.md
5. Canonical governance models (governance/canon/**)
6. Schemas and policies (governance/schemas/**, governance/policy/**)
7. Templates and guidance (governance/templates/**)

**Resolution Rule**: Higher authority always prevails.

If execution system cannot resolve conflict:
- HALT operation
- Escalate to governance administrator
- Document conflict with references to conflicting documents

**No Guessing**: Execution systems MUST NOT infer or assume governance intent.

### 8.3 Agent Role Awareness (MANDATORY)

Per `AGENT_ROLE_GATE_APPLICABILITY.md`, governance interpretation MUST be **agent-role aware**.

When evaluating gates or requirements:
1. Identify agent role (Builder, Governance Administrator, FM, etc.)
2. Load applicable gates/requirements for that role
3. Apply only role-specific enforcement
4. Reject gates not applicable to agent role

**Prohibition**: Gate applicability MUST NOT be inferred from file paths, workflow triggers, or PR metadata. Agent role is authoritative.

### 8.4 Modern Enforcement Model (MANDATORY)

Per `GOVERNANCE_ENFORCEMENT_TRANSITION.md`, execution systems MUST use **modern enforcement semantics**.

**Required**:
- ✅ Use `AGENT_ROLE_GATE_APPLICABILITY.md` for gate evaluation
- ✅ Use `PR_GATE_PRECONDITION_RULE.md` for PR validation
- ✅ Use `GOVERNANCE_COMPLETENESS_MODEL.md` for governance validation
- ✅ Use `BUILDER_FIRST_PR_MERGE_MODEL.md` for builder handover

**Prohibited** (Legacy):
- ❌ Legacy PR gate semantics (path-based inference)
- ❌ Uniform gate applicability (ignoring agent roles)
- ❌ Implicit enforcement rules

**Transition**: Legacy gates are **DEPRECATED** as of 2025-12-23. Execution systems MUST migrate to modern model.

---

## 9. Failure Handling and Escalation

### 9.1 Failure Classification

Governance loading failures are classified as:

**Class 1: Transient Network Failure**
- Cannot reach GitHub API
- Network timeout
- Temporary service unavailability

**Class 2: Structural Governance Failure**
- Missing required documents
- Invalid Markdown syntax
- Broken cross-references
- Schema validation failure

**Class 3: Constitutional Violation**
- Unauthorized governance modification
- Integrity check failure
- CODEOWNERS protection bypassed

**Class 4: Interpretation Failure**
- Unresolvable conflict between documents
- Ambiguous or contradictory rules
- Missing required governance for operation

### 9.2 Failure Response Protocol

**Class 1 Response** (Transient Network Failure):
1. Retry with exponential backoff (3 attempts, max 10 seconds between)
2. Use cached governance if valid and within lifetime (max 15 minutes old)
3. If retry fails and cache expired: escalate to Class 2

**Class 2 Response** (Structural Governance Failure):
1. HALT operation immediately
2. Log detailed error with file paths and validation failures
3. Escalate to governance administrator
4. DO NOT proceed with governance-dependent operations
5. Create incident report per `GOVERNANCE_INCIDENT_RESPONSE_DOCTRINE.md`

**Class 3 Response** (Constitutional Violation):
1. HALT operation immediately
2. Escalate to Johan (human owner) immediately
3. Create CRITICAL incident report
4. Disable affected system until resolution
5. Audit all systems for similar violations

**Class 4 Response** (Interpretation Failure):
1. HALT operation immediately
2. Document conflict with references to conflicting documents
3. Escalate to governance administrator
4. DO NOT guess or infer resolution
5. Wait for governance clarification

### 9.3 Escalation Paths

Per `ESCALATION_POLICY.md`:

**L1: Builder Agent** → **L2: Foreman** → **L3: Codex** → **L4: Human (Johan)**

Governance loading failures typically escalate:
- Class 1 (Transient): L2 (Foreman) - operational issue
- Class 2 (Structural): L3 (Codex/Governance Administrator) - governance defect
- Class 3 (Constitutional): L4 (Human) - security/integrity issue
- Class 4 (Interpretation): L3 (Governance Administrator) - governance ambiguity

**No Silent Recovery**: All escalations MUST create visible audit trail.

### 9.4 Failure Recovery

After governance loading failure resolution:
1. Invalidate all cached governance
2. Reload governance from source
3. Re-run validation
4. Verify failure is resolved
5. Resume operation only after validation passes
6. Document resolution in incident report

**No Partial Recovery**: Either governance loads completely and validates, or system remains halted.

---

## 10. Audit Expectations

### 10.1 Audit Trail Requirements

Execution systems MUST maintain audit trail for:

**Governance Load Events**:
- Timestamp of load
- Commit SHA loaded
- Load trigger (startup, change detection, on-demand)
- Load duration
- Validation result (pass/fail)
- Cache hit/miss

**Governance Usage Events**:
- When governance rule was applied
- Which document/section was referenced
- Agent role at time of application
- Operation context (PR evaluation, builder instruction, etc.)
- Result of governance enforcement (pass/fail)

**Governance Failure Events**:
- Failure classification
- Detailed error message
- Stack trace (if applicable)
- Escalation path taken
- Resolution status

### 10.2 Audit Log Format

Audit logs MUST be:
- Structured (JSON or equivalent)
- Timestamped with UTC timezone
- Include correlation IDs for multi-step operations
- Immutable once written
- Retained per `AUDIT_READINESS_MODEL.md` requirements (minimum 90 days)

### 10.3 Audit Queries (Required Capability)

Execution systems MUST support audit queries:
- "Show all governance loads in date range"
- "Show governance version at specific timestamp"
- "Show all governance violations for agent role"
- "Show governance loading failures"
- "Show escalations related to governance"

### 10.4 Audit Reporting

Per `AUDIT_READINESS_MODEL.md`, governance audit reports MUST include:
- Governance load frequency and success rate
- Average cache hit rate
- Governance version changes over time
- Escalation frequency and resolution time
- Compliance with loading protocol requirements

---

## 11. Change Detection and Notification

### 11.1 Change Detection Mechanism (MANDATORY)

Execution systems MUST implement governance change detection:

**Option 1: GitHub Webhooks** (RECOMMENDED)
- Subscribe to `push` events on `maturion-foreman-governance` repository
- Filter for `main` branch only
- Trigger governance reload on webhook receipt

**Option 2: API Polling** (ACCEPTABLE)
- Poll GitHub API for latest commit SHA on `main` branch
- Recommended interval: 5-15 minutes
- Trigger governance reload if SHA differs from cached SHA

**Option 3: Hybrid** (OPTIMAL)
- Use webhooks for real-time updates
- Use polling as fallback if webhook delivery fails

**Prohibition**: Execution systems MUST NOT operate indefinitely without governance change detection.

### 11.2 Change Notification Flow

When governance change detected:
1. Log governance change event with old and new commit SHA
2. Invalidate cached governance
3. Reload governance from source
4. Re-run validation
5. If validation passes: adopt new governance
6. If validation fails: escalate and halt operation
7. Notify dependent systems (if ripple model is implemented)

### 11.3 Graceful Transition

When governance changes:
- In-flight operations MAY complete with old governance
- New operations MUST use new governance
- Cache invalidation MUST be immediate (no grace period)
- No mixing old and new governance in single operation

### 11.4 Breaking Changes

If governance change is breaking (per `VERSIONING_AND_EVOLUTION_GOVERNANCE.md`):
- Governance SHOULD include transition period documentation
- Execution systems SHOULD log deprecation warnings
- Hard failures MUST NOT occur until transition period ends
- Johan (human owner) approval required for immediate breaking changes

---

## 12. Governance Loading Failure is System Failure

### 12.1 Critical Principle

**If governance cannot be loaded, the system cannot operate.**

Governance is not optional. Governance is not advisory. Governance is constitutional.

Execution without governance is:
- Unverifiable
- Unpredictable
- Unaccountable
- Unconstitutional

### 12.2 No Fallback Behavior

Execution systems MUST NOT implement "fallback" governance:
- ❌ Hardcoded governance rules
- ❌ Default governance assumptions
- ❌ "Best effort" governance
- ❌ Degraded mode without governance

**Rationale**: Fallback governance creates governance drift, enables weakening, and violates canonical memory principle.

### 12.3 Recovery Path

If governance cannot be loaded:
1. HALT operation
2. Escalate to appropriate level (per failure classification)
3. Wait for human intervention
4. Do NOT proceed until governance loads successfully

**No Workarounds**: Constitutional principles are non-negotiable.

---

## 13. Protocol Compliance Validation

### 13.1 Self-Audit Requirements

Execution systems MUST implement self-audit capability to verify compliance with this protocol:

**Audit Checklist**:
- ✅ Governance loaded at all required times
- ✅ Governance loaded in canonical order
- ✅ Validation performed before interpretation
- ✅ Cache invalidated per invalidation rules
- ✅ Governance treated as read-only
- ✅ Agent role awareness implemented
- ✅ Modern enforcement model used
- ✅ Failure handling follows escalation paths
- ✅ Audit trail complete and queryable
- ✅ Change detection operational

### 13.2 Governance Administrator Audit

The Governance Administrator MUST audit FM app and execution systems for protocol compliance:
- Review audit logs for governance load events
- Verify governance version consistency across systems
- Validate cache behavior (invalidation, expiration)
- Check escalation path adherence
- Confirm read-only guarantee

**Audit Frequency**: Quarterly or on governance incident.

### 13.3 Protocol Violation Consequences

Violation of this protocol is a **governance incident**.

Consequences:
- Incident report creation
- Root cause analysis
- Corrective action required
- Potential system suspension until compliance restored
- Learning promotion to prevent recurrence

**Repeat Violations**: Escalate to Johan for system design review.

---

## 14. Relationship to Other Governance Documents

### 14.1 Upstream Dependencies (This Protocol Depends On)

- **CONSTITUTION.md** - Governance supremacy, no weakening
- **GOVERNANCE_PURPOSE_AND_SCOPE.md** - Governance as canonical memory
- **GOVERNANCE_COMPLETENESS_MODEL.md** - Governance structure
- **ESCALATION_POLICY.md** - Escalation paths

### 14.2 Downstream Dependencies (Other Documents Depend On This)

- **GATE_PREDICTIVE_COMPLIANCE_ANALYSIS.md** - Requires governance loading for pre-submission analysis
- **LEARNING_INTAKE_AND_PROMOTION_MODEL.md** - Requires governance loading for learning classification
- **GOVERNANCE_RIPPLE_MODEL.md** - Requires governance change detection for propagation
- **AGENT_ROLE_GATE_APPLICABILITY.md** - Requires governance interpretation for gate evaluation

### 14.3 Parallel Protocols

- **PR_GATE_PRECONDITION_RULE.md** - Defines when gates must be GREEN (enforcement timing)
- **BUILDER_QA_HANDOVER_POLICY.md** - Defines builder handover requirements (execution quality)
- **PR_GATE_FAILURE_HANDLING_PROTOCOL.md** - Defines failure response (operational procedure)

---

## 15. Future Evolution

### 15.1 Planned Enhancements

**Phase 2** (FM App Governance Integration):
- Automated governance loading at FM app startup
- Real-time governance change detection via webhooks
- Governance version tracking in FM app database

**Phase 3** (Cross-Repository Governance):
- Governance ripple automation (per `GOVERNANCE_RIPPLE_MODEL.md`)
- Multi-repository governance consistency validation
- Centralized governance change notification

**Phase 4** (Advanced Governance Features):
- Governance semantic versioning
- Governance change impact analysis
- Governance A/B testing (controlled rollout)

### 15.2 Versioning

This protocol follows `VERSIONING_AND_EVOLUTION_GOVERNANCE.md`:
- Version increments on breaking changes
- Backward compatibility preserved when possible
- Transition periods for breaking changes
- Deprecation warnings before removal

Current Version: **1.0.0**

### 15.3 Feedback and Improvement

Per `LEARNING_INTAKE_AND_PROMOTION_MODEL.md`, if this protocol is:
- Ambiguous → Create governance incident, escalate to governance administrator
- Incomplete → Submit governance change proposal
- Conflicting with other documents → Escalate to governance administrator for resolution
- Blocking legitimate operations → Escalate to Johan with justification

**No Silent Non-Compliance**: Always escalate, never ignore protocol.

---

## 16. Summary and Checklist

### 16.1 FM App Implementation Checklist

For FM app to comply with this protocol:

- [ ] **Load governance at startup** (Phase 1-4 sequence)
- [ ] **Validate governance** before interpretation
- [ ] **Cache governance** with invalidation (15 min active, 24 hr dormant)
- [ ] **Detect changes** via webhook or polling (5-15 min)
- [ ] **Treat governance as read-only** (no modifications)
- [ ] **Use agent role awareness** (AGENT_ROLE_GATE_APPLICABILITY.md)
- [ ] **Use modern enforcement** (GOVERNANCE_ENFORCEMENT_TRANSITION.md)
- [ ] **Handle failures** per escalation paths (ESCALATION_POLICY.md)
- [ ] **Maintain audit trail** (load events, usage, failures)
- [ ] **Support audit queries** (governance version, violations, escalations)
- [ ] **Halt on governance failure** (no fallback, no degraded mode)
- [ ] **Self-audit compliance** with this protocol

### 16.2 Governance Administrator Validation Checklist

To validate FM app compliance:

- [ ] Review audit logs for governance load events
- [ ] Verify governance version matches repository commit SHA
- [ ] Validate cache behavior (invalidation, expiration)
- [ ] Check change detection operational (webhook or polling)
- [ ] Confirm read-only guarantee (no governance modifications)
- [ ] Verify agent role awareness in gate evaluation
- [ ] Validate modern enforcement model usage
- [ ] Check escalation path adherence
- [ ] Confirm audit trail completeness
- [ ] Test failure handling (simulate governance unavailability)

### 16.3 Key Principles (Summary)

1. **Governance is canonical memory** - Single source of truth
2. **Governance is read-only** - No modifications by execution systems
3. **Governance is mandatory** - Cannot operate without it
4. **Governance is versioned** - Git commit SHA is version
5. **Governance is validated** - Before interpretation, always
6. **Governance is cached** - With invalidation, not indefinitely
7. **Governance is agent-aware** - Role determines applicability
8. **Governance is escalation-aware** - Failures have clear paths
9. **Governance is auditable** - Every load, usage, failure logged
10. **Governance is constitutional** - Violations are incidents

---

## 17. Acceptance Criteria (Issue Resolution)

Per issue requirements, this document satisfies:

- ✅ **Source of truth defined** - Section 4 (Canonical Repository)
- ✅ **Load timing defined** - Section 5 (Startup, change detection, on-demand)
- ✅ **Validation requirements defined** - Section 6 (Pre-interpretation validation)
- ✅ **Cache invalidation rules defined** - Section 7 (Triggers, lifetime, storage)
- ✅ **Failure handling defined** - Section 9 (Classification, escalation, recovery)
- ✅ **Audit expectations defined** - Section 10 (Trail, logs, queries, reports)
- ✅ **Governance loading expectations explicit** - Throughout document
- ✅ **FM app can be audited against this document** - Section 13 (Compliance validation)
- ✅ **No execution assumptions made** - Scope explicitly excludes implementation
- ✅ **No activation implied** - Protocol defines requirements, not implementation

**This document is read-only governance. Implementation remains in FM app repository.**

---

## 18. Governance Gap Resolution

This document resolves:
- **Gap D-001** - FM app governance loading mechanism not documented
- **Risk R-001** - FM app may not interpret governance canon correctly
- **Gap W-001** - Governance canon synchronization protocol not established

This document provides foundation for:
- **Gap E-001** - Learning loop automation (depends on governance loading)
- **Gap E-002** - GPCA tooling (depends on governance loading)
- **Gap A-001** - GPCA activation (depends on governance interpretation)
- **Gap A-002** - Learning loop activation (depends on governance interpretation)

---

**Protocol Status**: ✅ **COMPLETE**  
**Activation**: Immediate (canonical upon merge)  
**Next Review**: After FM app Phase 2 implementation

---

*End of FM Governance Loading Protocol*

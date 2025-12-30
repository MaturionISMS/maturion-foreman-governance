# CI CONFIRMATORY NOT DIAGNOSTIC CANON

## Status
**Type**: Constitutional Governance Rule  
**Authority**: Supreme - Canonical  
**Version**: 1.0.0  
**Effective Date**: 2025-12-30  
**Owner**: Maturion Engineering Leadership (Johan Ras)  
**Precedence**: Subordinate only to GOVERNANCE_PURPOSE_AND_SCOPE.md

---

## 1. Purpose

This canon establishes that **CI execution is confirmatory, not diagnostic** across all governed repositories.

This principle protects:
- One-Time Build Law enforcement
- CS2 human verification constraints
- Deterministic governance boundaries
- Clear responsibility boundaries
- Auditability and evidence-driven decision-making

CI must not be allowed to function as a diagnostic or discovery mechanism.

---

## 2. Constitutional Mandate

This canon derives authority from and operationalizes:
- **GOVERNANCE_PURPOSE_AND_SCOPE.md** - Governance as canonical memory
- **BUILD_PHILOSOPHY.md** - One-Time Build Law, 100% GREEN mandate
- **PR_GATE_PRECONDITION_RULE.md** - Gate precondition enforcement ("No green gate, no handover")
- **AGENT_ROLE_GATE_APPLICABILITY.md** - Agent-role-aware gate evaluation
- **PR_GATE_EVALUATION_AND_ROLE_PROTOCOL.md** - Gate evaluation semantics
- **BYG_DOCTRINE.md** - Agent roles and authorities

---

## 3. Core Principle

> **CI execution is confirmatory, not diagnostic.**

CI validates that governance obligations were satisfied **before** handover.  
CI does **not** discover, diagnose, or debug failures.

**CI Role**:
- ✅ Confirm that required artifacts exist
- ✅ Confirm that required gates passed
- ✅ Confirm that process was followed
- ✅ Confirm that evidence is complete
- ✅ Confirm that compliance was achieved

**NOT CI Role**:
- ❌ Discover defects
- ❌ Debug failures
- ❌ Provide diagnostic surface
- ❌ Interpret failure causes
- ❌ Guide corrective action

**Principle**: If CI fails, the agent violated upstream governance obligations. The failure was preventable and should have been detected during preflight evaluation.

---

## 4. CI Role Definition

### 4.1 CI as Confirmation Mechanism

**Definition**: CI confirms that work handed over by an agent satisfies all applicable governance gates.

**Confirmation Semantics**:
- CI success means: "Agent satisfied all applicable gates before handover"
- CI failure means: "Agent violated preflight obligation or governance defect exists"

**Prohibition**: CI MUST NOT be treated as:
- A debugging interface
- A discovery mechanism
- A diagnostic surface
- A build iteration feedback loop
- A source of corrective guidance

### 4.2 CI Output Interpretation

**Allowed Interpretation**:
- CI passed → Governance obligations satisfied → Merge may proceed
- CI failed → Governance obligations NOT satisfied → Merge blocked

**Prohibited Interpretation**:
- ❌ "Let me read the CI logs to understand what failed"
- ❌ "Let me inspect CI output to diagnose the problem"
- ❌ "Let me run CI multiple times to iterate on fixes"
- ❌ "CI will tell me what's wrong"

**Rationale**: CS2 cannot read CI logs. Agents cannot reliably reason from opaque CI failure output. CI-based discovery leads to deadlock, delay, and authority diffusion.

### 4.3 CI Failure Classification

When CI fails, classify as follows:

**Agent Preflight Violation** (Most Common):
- Agent did not evaluate PR gates before handover
- Agent handed over work without achieving compliant state
- Agent did not produce required evidence or artifacts
- **Corrective Action**: Agent must perform preflight evaluation and correct failures **before** next handover

**Governance Defect** (Less Common):
- Gate misapplied (wrong agent role)
- Gate requirement ambiguous or contradictory
- Gate implementation does not match canon
- **Corrective Action**: Governance Administrator corrects governance or gate implementation

**NOT Classified As**:
- "CI caught a bug" (bugs should be caught during builder QA)
- "CI discovered a test failure" (tests should pass before handover)
- "CI found a compilation error" (compilation should succeed before handover)

---

## 5. Preflight PR-Gate Evaluation Obligation

### 5.1 Mandatory Preflight Evaluation

**Obligation**: All PR-gate criteria MUST be evaluated by the responsible agent **before handover**.

**Pre-Handover Requirements**:
1. Agent loads applicable PR-gate definitions (YAML, scripts, policies)
2. Agent evaluates or simulates gate checks in their own environment
3. Agent produces human-readable diagnostics and evidence
4. Agent achieves passing state for all applicable gates
5. Agent documents evidence in PR description or artifacts
6. **ONLY THEN** may agent hand over PR for merge consideration

**Prohibited**:
- ❌ Handing over PR without evaluating gates
- ❌ "Let CI check if it passes" (violates preflight obligation)
- ❌ Relying on CI output to discover gate failures
- ❌ Treating CI as first-pass validation

### 5.2 Preflight Evaluation Methods

Agents MUST use one or more of these methods to evaluate gates before handover:

**Method 1: Local Gate Execution**
- Agent runs gate validation scripts locally
- Agent verifies all required artifacts present and valid
- Agent confirms all preconditions satisfied

**Method 2: Preflight Checklist Validation**
- Agent uses PR-gate release checklist for their role
- Agent verifies all checklist items satisfied
- Agent documents checklist completion in PR description
- **Reference**: `governance/templates/PR_GATE_RELEASE_CHECKLIST_*.md`

**Method 3: Gate-Predictive Compliance Analysis (GPCA)**
- Agent uses GPCA to predict gate outcomes
- Agent addresses predicted failures before handover
- **Reference**: `governance/canon/GATE_PREDICTIVE_COMPLIANCE_ANALYSIS.md`

**Method 4: Evidence Artifact Pre-Generation**
- Agent generates all required evidence artifacts before handover
- Agent validates artifact schemas and completeness
- Agent includes artifacts in PR

**Guarantee**: If agent completes preflight evaluation successfully, CI MUST pass (unless governance defect exists).

### 5.3 Preflight Failure Handling

If preflight evaluation reveals gate failures:

**Agent MUST**:
- ✅ Fix the failure immediately
- ✅ Re-run preflight evaluation to confirm fix
- ✅ Document fix in commit message
- ✅ Achieve passing state before handover

**Agent MUST NOT**:
- ❌ Hand over with known failures ("CI will catch it")
- ❌ Escalate gate failures without attempting to fix
- ❌ Bypass gates or create placeholder artifacts
- ❌ Modify governance to weaken enforcement

**Exception**: If preflight reveals **governance defect** (gate misapplied, ambiguous requirement, contradictory gates):
- Agent MUST halt execution
- Agent MUST escalate to Governance Administrator
- Agent MUST NOT attempt to work around governance defect

---

## 6. Human Authority Protection

### 6.1 No CI Log Inspection Requirement

**Principle**: No execution path may require CS2 (human authority) to read CI logs.

**Rationale**: CS2 cannot reliably access or interpret CI logs. Requiring CI log inspection for decision-making violates human authority protection.

**Requirement**: All handovers MUST be explainable via:
- Governance artifacts (canon, policies, schemas)
- QA-to-Red and QA-to-Green reports
- Prehandover proof and evidence
- Agent-produced diagnostics
- PR description and commit messages

**Prohibited**: Situations where CS2 must:
- ❌ Read CI logs to understand failure
- ❌ Inspect CI output to diagnose problem
- ❌ Analyze CI analytics to determine corrective action
- ❌ Guess at failure cause from CI status

### 6.2 Upstream Governance Failure Classification

**Principle**: Any failure that would require CI log inspection constitutes an **upstream governance failure**.

**Governance Failure Indicators**:
- Agent handed over work without achieving compliant state (preflight violation)
- Gate requirements were ambiguous or undocumented (governance incompleteness)
- Gate was misapplied to wrong agent role (governance defect)
- Evidence artifacts were not produced or validated (process violation)

**NOT Governance Failures**:
- Implementation defects caught during builder QA (builder responsibility)
- Test failures caught during Green QA execution (builder responsibility)
- Compilation errors caught during build (builder responsibility)

**Response**: When CI failure would require log inspection:
1. Classify as upstream governance failure
2. Identify root cause (preflight violation vs. governance defect)
3. Correct upstream obligation (agent process or governance definition)
4. Prevent recurrence through learning promotion

---

## 7. Enforcement Semantics

### 7.1 CI Failure Interpretation

**CI Failure Indicates**:
- Breach of upstream governance obligations (most common)
- OR governance defect requiring correction (less common)

**CI Failure Does NOT Indicate**:
- Discovery of previously unknown defect
- Need for iterative debugging via CI
- Insufficient testing before handover (testing should be complete)

### 7.2 CI Success Interpretation

**CI Success Confirms**:
- Agent satisfied all applicable governance gates
- Evidence artifacts complete and valid
- Process obligations fulfilled
- Compliance achieved before handover

**CI Success Does NOT Mean**:
- "CI discovered the code is good" (code quality proven by builder QA)
- "CI validated functionality" (functionality validated by Green QA)
- "CI caught and prevented defects" (defects prevented by build-to-green)

### 7.3 Enforcement Points

**Primary Enforcement**: Agent preflight evaluation (before handover)

**Secondary Enforcement**: CI execution (confirmation only)

**Tertiary Enforcement**: Human review (final authority)

**Principle**: Defects prevented at primary enforcement point (preflight) minimize secondary enforcement failures (CI blocks) and eliminate tertiary enforcement burden (human debugging).

---

## 8. Agent Responsibilities

### 8.1 Builder Agent Responsibilities

Builder agents MUST:
- ✅ Evaluate all builder-specific gates before handover
- ✅ Achieve 100% GREEN QA before handover
- ✅ Generate all required evidence artifacts (architecture, QA reports, build logs)
- ✅ Validate artifact schemas and completeness
- ✅ Document evidence in PR description
- ✅ Predict and address gate failures before CI execution

Builder agents MUST NOT:
- ❌ Rely on CI to discover test failures
- ❌ Use CI as build iteration feedback loop
- ❌ Hand over without achieving compliant state
- ❌ Expect CI to provide diagnostic guidance

**Reference**: `governance/canon/BUILDER_FIRST_PR_MERGE_MODEL.md`

### 8.2 Governance Administrator Agent Responsibilities

Governance administrator agents MUST:
- ✅ Evaluate governance-scoped gates before handover
- ✅ Validate governance artifact compliance (schemas, policies)
- ✅ Verify enforcement alignment (no weakening, no CI-discovery introduction)
- ✅ Document changes in PR description with canonical references
- ✅ Predict and address applicable gate failures before CI execution

Governance administrator agents MUST NOT:
- ❌ Attempt to satisfy builder-specific gates (not applicable)
- ❌ Produce placeholder artifacts to satisfy misapplied gates
- ❌ Rely on CI to validate governance artifacts

**Reference**: `governance/canon/AGENT_ROLE_GATE_APPLICABILITY.md` Section 5.2

### 8.3 FM Agent Responsibilities

FM agents MUST:
- ✅ Evaluate FM-scoped gates before handover
- ✅ Satisfy learning promotion and failure promotion rules
- ✅ Maintain effectiveness tracking
- ✅ Validate orchestration contracts
- ✅ Predict and address applicable gate failures before CI execution

FM agents MUST NOT:
- ❌ Rely on CI for orchestration validation
- ❌ Use CI to discover learning or failure promotion gaps

**Reference**: `governance/canon/AGENT_ROLE_GATE_APPLICABILITY.md` Section 5.3

---

## 9. Contract Integration

This canon MUST be reflected in:

### 9.1 Governance Administrator Agent Contract

**Required Updates**:
- Add CI confirmatory principle to agent responsibilities
- Add preflight evaluation obligation to pre-handover checklist
- Add prohibition on CI-discovery reliance
- Add requirement to detect and escalate gate misapplication

**Reference**: `governance/agents/governance-administrator.agent.md`

### 9.2 Builder Agent Contracts

**Required Integration**:
- Builder contracts must reflect preflight evaluation obligation
- Builder QA reports must document gate evaluation before handover
- Builder evidence must demonstrate CI-confirmatory posture

**Reference**: Builder agent contracts (repository-specific)

### 9.3 FM Agent Contracts

**Required Integration**:
- FM contracts must reflect preflight evaluation obligation
- FM orchestration must enforce preflight evaluation before handover approval
- FM learning promotion must capture CI-discovery violations

**Reference**: FM agent contracts (repository-specific)

---

## 10. PR-Gate Layer-Down Guidance

This canon provides **layer-down guidance** for PR-gate implementation:

### 10.1 Gate Implementation Requirements

PR gates MUST:
- ✅ Validate that required artifacts exist (confirmation)
- ✅ Validate that artifacts satisfy schemas (confirmation)
- ✅ Validate that declarations are accurate (confirmation)
- ✅ Provide clear, actionable error messages referencing canonical requirements

PR gates MUST NOT:
- ❌ Re-run builder QA (QA complete before handover)
- ❌ Discover defects (defects prevented during build-to-green)
- ❌ Inspect CI logs for discovery (logs not diagnostic surface)
- ❌ Infer correctness from build analytics (evidence artifacts authoritative)

### 10.2 Gate Failure Messages

When gates fail, error messages MUST:
- ✅ Identify which gate failed
- ✅ Identify which requirement was not satisfied
- ✅ Reference canonical governance source
- ✅ Identify agent role and applicable gates
- ✅ Provide corrective action guidance ("Generate X artifact before handover")

Gate failure messages MUST NOT:
- ❌ Reference CI logs ("see logs for details")
- ❌ Provide vague errors ("validation failed")
- ❌ Omit canonical references
- ❌ Suggest iterative CI-based debugging

### 10.3 Gate Evaluation Order

Gates MUST evaluate in this order (fast-fail optimization):
1. Agent role detection (if fails, all other evaluation blocked)
2. Constitutional safeguards (CS1-CS6)
3. Required artifacts presence validation
4. Artifact schema validation
5. Semantic requirements validation (status fields, readiness declarations)

**Rationale**: Early detection of fundamental violations (wrong role, missing artifacts) prevents wasted evaluation of downstream requirements.

---

## 11. Related Documents

This canon integrates with and is operationalized by:

| Document | Relationship |
|----------|--------------|
| **PR_GATE_PRECONDITION_RULE.md** | Defines "no green gate, no handover" rule that this canon operationalizes |
| **PR_GATE_EVALUATION_AND_ROLE_PROTOCOL.md** | Defines gate evaluation process implementing this canon's preflight semantics |
| **AGENT_ROLE_GATE_APPLICABILITY.md** | Defines which gates apply to which agents (agent-specific preflight requirements) |
| **GATE_PREDICTIVE_COMPLIANCE_ANALYSIS.md** | Defines GPCA model supporting preflight evaluation |
| **BUILD_PHILOSOPHY.md** | Defines One-Time Build Law that this canon protects |
| **BUILDER_FIRST_PR_MERGE_MODEL.md** | Defines builder QA contracts enforced via preflight evaluation |
| **GOVERNANCE_PURPOSE_AND_SCOPE.md** | Establishes governance as canonical memory |
| **BYG_DOCTRINE.md** | Defines agent roles and authorities |

---

## 12. Transition and Adoption

### 12.1 Immediate Effect

This canon takes effect immediately upon merge for:
- All governed repositories
- All agent roles
- All PR-gated execution paths

### 12.2 Agent Behavior Transition

**Agents MUST**:
- ✅ Perform preflight evaluation starting immediately
- ✅ Document preflight evaluation in PR descriptions
- ✅ Halt and escalate if preflight reveals governance defect

**Agents MUST NOT**:
- ❌ Continue "let CI run and see what fails" pattern
- ❌ Rely on CI for discovery after this canon takes effect
- ❌ Bypass preflight evaluation

### 12.3 Gate Implementation Transition

**Existing Gates**:
- Continue to function as confirmation mechanisms (no change required)
- Gate failure messages should be enhanced to reference this canon

**New Gates**:
- MUST implement confirmatory semantics from inception
- MUST NOT introduce discovery or diagnostic behavior
- MUST reference this canon in design documentation

---

## 13. Audit and Compliance

### 13.1 Canon Compliance Indicators

**Compliance Indicators** (Evidence of canon adoption):
- ✅ Agents document preflight evaluation in PR descriptions
- ✅ CI failure rates decrease (preflight catches issues before CI)
- ✅ No escalations requiring CI log inspection
- ✅ Gate failure messages reference this canon
- ✅ Agent contracts reflect preflight obligation

**Non-Compliance Indicators** (Evidence of canon violation):
- ❌ Agents hand over without preflight evaluation
- ❌ Multiple CI iterations on same PR (discovery-driven iteration)
- ❌ Escalations requiring CI log reading
- ❌ "Let CI check" language in agent reasoning
- ❌ Gates re-running builder QA or tests

### 13.2 Periodic Canon Audit

**Governance Administrator MUST**:
- Audit agent PRs for preflight evaluation evidence (monthly)
- Audit gate implementations for confirmatory semantics (quarterly)
- Audit CI failure patterns for discovery-driven behavior (monthly)
- Report canon compliance violations to Johan Ras

**Audit Deliverables**:
- Canon compliance report
- Violation classification (agent vs. governance)
- Corrective action recommendations
- Learning promotion entries

---

## 14. Ripple Effect Protection

### 14.1 Ecosystem Impact

This canon is **upstream governance** affecting:
- All governed repositories
- All agent behaviors
- All gate implementations
- All PR-merge workflows

**High-Impact Change**: This canon fundamentally changes CI role interpretation across ecosystem.

### 14.2 Compatibility and Migration

**Backward Compatibility**:
- ✅ Canon does not weaken existing enforcement
- ✅ Canon does not introduce new gates
- ✅ Canon clarifies existing obligations (PR_GATE_PRECONDITION_RULE)
- ✅ Canon codifies proven practice (already working in governance repo and FM app repo)

**Migration Requirements**:
- Agents must adopt preflight evaluation behavior
- Gate failure messages should reference this canon
- Agent contracts should reflect preflight obligation
- No breaking changes to gate interfaces required

---

## 15. Success Criteria

This canon is successful when:

- ✅ CI's role is unambiguously confirmatory across all governed repositories
- ✅ Preflight PR-gate evaluation is mandatory and universal
- ✅ No agent relies on CI for discovery
- ✅ No escalation requires CI log inspection
- ✅ CI failure rates decrease (preflight prevents issues)
- ✅ Agent PRs document preflight evaluation evidence
- ✅ Gate implementations follow confirmatory semantics
- ✅ The principle is enforceable and auditable
- ✅ Human authority is protected (no CI log reading required)
- ✅ One-Time Build Law is preserved

---

## 16. Non-Negotiable Invariants

### 16.1 CI Role Immutability

**Invariant**: CI role as confirmatory mechanism is **non-negotiable**.

**Prohibition**: No agent, workflow, or process may:
- Treat CI as discovery mechanism
- Rely on CI logs for debugging
- Use CI as iterative feedback loop
- Bypass preflight evaluation and "let CI check"

**Enforcement**: Violations are governance incidents requiring escalation.

### 16.2 No Weakening of Enforcement

**Invariant**: This canon does NOT weaken CI enforcement.

**Confirmation**:
- ✅ CI continues to block merges on gate failures
- ✅ Gate requirements remain unchanged
- ✅ Enforcement strictness unchanged
- ✅ No new bypass mechanisms introduced

**Clarification**: Canon shifts responsibility **upstream** (to agent preflight) without relaxing **downstream** enforcement (CI confirmation).

### 16.3 Preflight Obligation Non-Optional

**Invariant**: Preflight PR-gate evaluation is **mandatory**, not advisory.

**Requirement**: All agents MUST evaluate applicable gates before handover.

**No Exceptions**: No agent role, repository, or workflow is exempt from preflight obligation.

---

## 17. Version History

### v1.0.0 (2025-12-30)
- Initial canon definition
- Establishes CI as confirmatory, not diagnostic
- Defines preflight PR-gate evaluation obligation
- Defines human authority protection requirements
- Defines enforcement semantics
- Integrates with existing PR-gate canon (PR_GATE_PRECONDITION_RULE, PR_GATE_EVALUATION_AND_ROLE_PROTOCOL, AGENT_ROLE_GATE_APPLICABILITY)
- Provides layer-down guidance for gate implementation
- Requires agent contract updates
- Defines audit and compliance requirements

---

## 18. Authority Statement

**This canon is constitutional and binding.**

All governed repositories, agents, and workflows MUST comply with this canon.

No execution path may:
- Treat CI as diagnostic or discovery mechanism
- Require CS2 to read CI logs
- Bypass preflight evaluation obligation
- Rely on CI-discovery pattern

**Violations are governance incidents and must be escalated per escalation policy.**

---

**Status**: Active and Enforced  
**Owner**: Governance Administrator  
**Approval Authority**: Johan Ras  
**Last Updated**: 2025-12-30

---

*End of CI Confirmatory Not Diagnostic Canon v1.0.0*

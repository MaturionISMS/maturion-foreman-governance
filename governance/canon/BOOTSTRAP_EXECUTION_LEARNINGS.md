# Bootstrap Execution Learnings

This document records structural learnings identified during
manual bootstrap execution (Wave 0).

These learnings inform future governance canon,
FM application automation, and delegated execution models.

Entries are additive and non-retroactive.

## BL-0001 — Governance Stabilisation Must Precede FM Recruitment

**Context:** Pre-Batch 3 (Governance Hardening & Readiness)

**Observed Issue:**  
FM recruitment was initially attempted while governance artifacts and authority boundaries were still in flux.

**Root Cause:**  
No explicit rule existed requiring governance lock and layer-down completion before FM activation.

**Learning:**  
Governance MUST be stabilised, locked, and layered down before FM is recruited or granted planning authority.

**Governance Impact:**  
Informs FM recruitment sequencing and Batch entry conditions.

**Status:** Recorded

## BL-0002 — Readiness Certification Is a Governance Function, Not an Execution Trigger

**Context:** Batch 3A — Final Readiness Certification

**Observed Issue:**  
Risk of interpreting readiness certification as implicit execution authorization.

**Root Cause:**  
Readiness and execution were not explicitly separated in early mental models.

**Learning:**  
Readiness certification records system state and constraints only; execution authority must be granted explicitly and separately.

**Governance Impact:**  
Clarifies Batch 3A vs Batch 3B boundary.

**Status:** Recorded

## BL-0003 — FM Identity Must Be Canonical Before Recruitment

**Context:** Batch 3B Entry Preparation

**Observed Issue:**  
Multiple legacy FM agent definitions created ambiguity in authority and scope.

**Root Cause:**  
Historical agent contracts were not deprecated before reuse.

**Learning:**  
Exactly one canonical FM agent definition MUST exist before FM recruitment. Legacy definitions must be removed or explicitly deprecated.

**Governance Impact:**  
Informs agent canonicalisation requirements and FM onboarding rules.

**Status:** Recorded

## BL-0004 — Bootstrap Execution Proxy Is a Governance-Safe Deviation

**Context:** Batch 3B — Wave 0 Bootstrap Execution

**Observed Issue:**  
FM could not perform GitHub platform actions prior to full automation.

**Root Cause:**  
Delegated execution pathways were not yet operational.

**Learning:**  
A human execution proxy may perform mechanical platform actions during bootstrap, provided authority, instruction, and auditability remain with FM and governance.

**Governance Impact:**  
Informs Bootstrap Execution Proxy clause and future automated delegation design.

**Status:** Recorded

### BL-0005 — Execution Visibility Gap Without Runtime

Context:
During Wave 0.2 task assignment dry run, FM correctly assigned tasks and established execution tracking.
However, CS2 experienced loss of real-time visibility into execution progress.

Observation:
GitHub provides no native mechanism for:
- long-running agent execution
- progress signaling
- background task monitoring
- agent wake/sleep awareness

Impact:
- FM appears inactive after assignment
- CS2 must manually poll for progress
- Execution continuity relies on human vigilance

Conclusion:
This is not an FM or governance defect.
This is an architectural gap requiring a runtime execution monitor.

Resolution Path (Future):
- Implement Maturion Runtime Execution Monitor inside FM App
- Provide UI-level execution state, timers, and alerts
- Enable FM to be event-driven rather than manually polled

Bootstrap Handling:
- During Wave 0 execution, CS2 acts as runtime observer
- Static execution trackers are acceptable temporarily

Formalisation Requirement:
This learning mandates the creation of a canonical specification for a
“Maturion Runtime Execution Monitor”.

This specification MUST be authored before any attempt to automate
execution, delegation, or progress monitoring, and MUST define:
- Responsibilities
- Authority boundaries
- Prohibited behaviors
- Governance integration
- Audit requirements

Reference Specification:
MATURION_RUNTIME_EXECUTION_MONITOR_SPEC.md

### BL-0006 — Builder Execution Requires Explicit Simulation During Bootstrap

**Context**

During Wave 0.2 (Controlled Task Assignment Dry Run), tasks were formally assigned by FM
to conceptual builder roles (e.g. `ui-builder`) using governed task assignment documents.

Despite correct planning, validation, tracking, and heartbeat protocols, no task execution
occurred. Tasks remained in `ASSIGNED` state indefinitely.

**Observation**

In the absence of a runtime execution layer:

- Builder roles are declarative, not active
- No mechanism exists to start, run, or complete work
- FM can plan and validate, but cannot trigger execution
- GitHub provides no native long-running agent execution

**Learning**

During bootstrap phases (Wave 0 / Wave 0.x), **builder execution must be explicitly
simulated or proxied**, with clear authorization and auditability.

“Assignment” alone is insufficient — execution must be declared.

**Governance Position**

Simulated execution is **not a governance breach** when:

- Explicitly authorized by CS2
- Clearly annotated as SIMULATED
- Limited to documentation-only or non-production artifacts
- Fully auditable via DAI and execution tracker

**Resolution Pattern (Bootstrap Only)**

1. FM assigns task as normal
2. If no runtime execution occurs within bounded time:
   - CS2 authorizes simulated execution
3. FM produces deliverable content via proxy
4. FM validates acceptance criteria
5. FM generates DAI
6. CS2 performs GitHub platform actions as execution proxy
7. Tracker marks task as COMPLETED (SIMULATED)

**Future Resolution (Post-Bootstrap)**

This learning directly motivates creation of:

- `MATURION_RUNTIME_EXECUTION_MONITOR`
- Active task state transitions (ASSIGNED → IN_PROGRESS → COMPLETED)
- Builder wake/sleep signaling
- UI-level execution visibility

**Status:** Recorded  
**Applicability:** Wave 0 / Bootstrap phases only

### BL-0007 — Irresponsible Appointment of Officials Will Collapse the Model (Critical)

**Context**
During transition from bootstrap (Wave 0.x) to production planning (Wave 1.0), the build process drifted toward coder-native execution patterns (implementation-first) and away from the Maturion governed pipeline (True North → QA-to-Red → Builders Build-to-Green).

**Observation**
This drift occurs when appointed officials (FM / Governance Liaison / Builders) do not internalize the Maturion-first constitution:
- CS2 verifies only UI outcomes
- True North architecture is mandatory
- QA-to-Red defines build tasks
- Builders build to green only
- Governance is constitutional, not advisory

**Root Cause**
Appointment was not treated as a controlled, gated act with explicit constitutional onboarding.
Agent contracts lacked a shared, repo-level “Agent Constitution” applying uniformly to all officials.

**Learning**
Appointment discipline is a security control.
Incorrect appointment (or incorrect agent mindset) is a platform risk that can negate the entire governance model.

**Requirement**
All officials MUST be appointed using a governed protocol that:
- binds them to BUILD_PHILOSOPHY and canonical governance
- explicitly encodes CS2’s UI-only verification constraint
- enforces sequencing: True North → QA-to-Red → Build-to-Green only
- defines escalation triggers and STOP conditions
- prevents coder-first defaults from reappearing under pressure

**Status:** Recorded (Critical)  
**Applies To:** FM, Governance Liaison, Builders, Watchdog roles

### BL-0008 — PR Gate Layer-Down Is a Mandatory Prerequisite to Builder Appointment

**Context**
After bootstrap validation (Wave 0.x), FM must formally appoint builders and begin real execution.
This requires enforceable PR merge discipline at the application repository level.

**Observation**
Although PR gate requirements were fully defined at the governance layer, they were not yet
mechanically layered down into the FM application repository as active, role-aware merge controls.

As a result:
- Builders could theoretically be appointed without enforceable merge authority boundaries
- Architecture could be produced without guaranteed build-to-green discipline
- Governance intent existed, but enforcement was incomplete

**Learning**
Builder appointment MUST NOT occur unless PR gate rules are:
- Present in the application repository
- Role-aware (Builder vs FM vs Governance)
- Actively enforceable
- Aligned with canonical governance definitions

Gate layer-down is not optional or implicit.
It is a hard prerequisite to builder appointment and architecture freeze.

**Required Correction**
Before FM appoints builders:
1. PR gate definitions must be layered down from governance
2. Gate ownership and red declarant authority must be enforceable
3. Merge rules must be verifiable in the application repository

**Status:** Recorded  
**Applies To:** All application repositories (FM app, SlotMaster, future apps)

---

## BL-009 — Platform Readiness Was Declared Without a Canonical Definition

### Classification
- **Type:** Governance Learning
- **Phase:** Bootstrap (Batch 1–3)
- **Severity:** Structural
- **Status:** Closed (Learning Captured)
- **Impacts:** All future build readiness declarations

---

### Summary

During the bootstrap execution batches, the platform was declared **“100% ready for build execution”** based on informal and incomplete readiness criteria.

Subsequent execution attempts demonstrated that this declaration was **substantively incorrect**, as multiple governance, sequencing, and authority misalignments were discovered that prevented safe, governed execution.

This was not an execution failure, but a **governance definition failure**.

---

### What Was Believed

At the time of declaration, “platform readiness” was assumed to mean:

- Core repositories existed
- Initial governance canon was present
- Agent roles were conceptually defined
- Execution mechanics could be tested

Based on these assumptions, a readiness certificate was issued.

---

### What Failed in Reality

The platform was **not ready for governed execution** because:

- Governance layer-down into application repositories was incomplete
- PR gate enforcement did not exist
- Agent contracts were insufficiently constrained
- FM pause/resume authority was not structurally enforced
- “Readiness” had no canonical, auditable definition
- Execution safety depended on human intervention rather than constitutional enforcement

The platform could not sustain governed execution without violating the One-Time Build philosophy.

---

### Root Cause

There was **no governance canon defining what “Platform Readiness for Build Execution” means**.

As a result:
- Readiness was declared based on intuition rather than constitutional criteria
- A readiness certificate was issued without enforceable guarantees
- The declaration could not survive contact with real execution

---

### Corrective Outcome

Execution was correctly halted once misalignment was detected.

Rather than retroactively correcting the readiness declaration, this deficiency is captured as a **Bootstrap Learning** in accordance with the ratcheting quality doctrine.

---

### Governance Action Required

This learning mandates the creation of a new governance canon that:

- Defines platform readiness constitutionally
- Specifies mandatory artefacts and enforcement points
- Prevents premature execution in future builds
- Enables deterministic, auditable readiness declarations

This canon applies **only to future builds** and is not retroactively applied to bootstrap execution.

---

### Ratchet Statement

This learning is accepted **once**.

Future platform builds **must not** be initiated without meeting an explicit, canonically defined platform readiness standard.

This condition is now permanently elevated.

---

## BL-010 — Platform Readiness Requires Deterministic Validation

### Classification
- **Type:** Governance Learning
- **Phase:** Platform Readiness Reset & Build Initiation Plan (Phase 1.2)
- **Severity:** Critical
- **Status:** Recorded
- **Impacts:** All future platform readiness declarations

---

### Context

Phase 1.2 Platform Readiness Gap Analysis identified that platform readiness canon (G-PLAT-READY-01) defines 6 readiness conditions but lacks deterministic, executable validation methods.

---

### Observed Issue

Platform readiness conditions use terms like `governance_completeness_state()` implying automation, but no such functions exist. Validation depends on human judgment, reintroducing subjectivity the canon was designed to eliminate.

---

### Root Cause

Readiness conditions were defined constitutionally (what must be true) without operational specifications (how to verify truth). Gap between canonical definition and validation implementation.

---

### Learning

Platform readiness conditions **MUST** be accompanied by deterministic validation methods with explicit evidence requirements. Readiness cannot be verified subjectively.

**Validation Requirements**:
- Each readiness condition MUST include a validation method specification
- Validation methods MUST be executable or have explicit manual procedures
- Evidence schemas MUST exist for all conditions
- "Operational" vs "defined" distinction MUST be explicit with test criteria
- Evidence MUST demonstrate enforcement occurred, not just that enforcement could occur

---

### Why This Gap Allowed Failure

Without deterministic validation, readiness declarations depend on evaluator interpretation. Different evaluators may reach different conclusions using identical artifacts. This permits premature readiness declaration based on incomplete validation — the exact failure mode BL-009 documented.

---

### Governance Action Required

This learning mandates updates to Platform Readiness Canon (G-PLAT-READY-01) to:
- Define deterministic validation methods for all 6 readiness conditions
- Distinguish "defined" from "operational" with evidence requirements
- Require enforcement evidence, not just existence evidence
- Establish evidence schemas for all conditions
- Specify validation procedures (automated or manual with explicit steps)

---

### Status

**Recorded** — Non-Retroactive  
**Applies To:** All future platform readiness declarations  
**Effective:** 2025-12-31

---

## BL-011 — Platform Readiness Must Distinguish Repository Scope

### Classification
- **Type:** Governance Learning
- **Phase:** Platform Readiness Reset & Build Initiation Plan (Phase 1.2)
- **Severity:** Critical
- **Status:** Recorded
- **Impacts:** All future platform readiness declarations

---

### Context

Phase 1.2 Platform Readiness Gap Analysis identified that platform readiness canon (G-PLAT-READY-01) evaluates "the platform" without distinguishing governance repository readiness from application repository readiness.

---

### Observed Issue

Platform readiness can be declared for governance repository while application repositories remain uninitialized, ungated, or without enforced contracts. No specification of which repositories must be ready for "platform readiness" to be true.

---

### Root Cause

Platform readiness was conceived as singular state but platform is multi-repository ecosystem. Canon does not specify whether readiness applies per-repository or ecosystem-wide.

---

### Learning

Platform readiness **MUST** specify scope: governance repository only, specific application repository, or ecosystem-wide. Different scopes have different readiness criteria.

**Scope Requirements**:
- Readiness declarations MUST include explicit scope (which repository/repositories)
- Per-repository readiness criteria MUST be explicit
- Ecosystem-wide readiness MUST aggregate per-repository states
- Layer-down completeness MUST be validated per-repository
- Governance repository readiness ≠ application repository readiness
- Build execution authority tied to build target repository readiness, not governance repository readiness

---

### Why This Gap Allowed Failure

Governance repository can be "ready" while build target repositories are not. Declaring "platform ready" based solely on governance repo state permits build initiation in unprepared repositories — the failure mode BL-009 identified.

---

### Governance Action Required

This learning mandates updates to Platform Readiness Canon (G-PLAT-READY-01) to:
- Define readiness scope categories (governance-layer, per-repository, ecosystem-wide)
- Specify which scope applies to each readiness condition
- Distinguish governance repository readiness from application repository readiness
- Require layer-down validation per target repository before build authorization
- Clarify that governance repository readiness is prerequisite, not sufficient condition

---

### Status

**Recorded** — Non-Retroactive  
**Applies To:** All future platform readiness declarations  
**Effective:** 2025-12-31

---

## BL-012 — AMBER Readiness Requires Explicit Exception Criteria

### Classification
- **Type:** Governance Learning
- **Phase:** Platform Readiness Reset & Build Initiation Plan (Phase 1.2)
- **Severity:** Critical
- **Status:** Recorded
- **Impacts:** All future AMBER readiness declarations

---

### Context

Phase 1.2 Platform Readiness Gap Analysis identified that platform readiness canon (G-PLAT-READY-01) defines AMBER state as "core conditions satisfied but optional elements incomplete" without defining which conditions are core vs optional.

---

### Observed Issue

All 6 readiness conditions are presented as equally mandatory, but AMBER state introduces "optional elements" without specification. AMBER can be used to bypass required conditions by reinterpreting them as optional.

---

### Root Cause

Canon treats all conditions as required but permits AMBER declaration without explicit criteria for when degradation is acceptable. No enumeration of which elements may be incomplete under AMBER.

---

### Learning

AMBER readiness state **MUST** include explicit, non-subjective criteria for which conditions may be incomplete and under what circumstances. "Optional elements" must be enumerated constitutionally, not determined per-declaration.

**AMBER Requirements**:
- Readiness canon MUST classify conditions as REQUIRED vs DEGRADABLE
- AMBER authorization criteria MUST be explicit (not "human judgment" alone)
- Risk thresholds for AMBER MUST be defined (acceptable vs unacceptable degradation)
- AMBER remediation requirements MUST be time-bound and enforceable
- AMBER MUST NOT permit critical enforcement gaps (gates, contracts, STOP mechanics)
- AMBER justification MUST cite specific enumerated exception case

---

### Why This Gap Allowed Failure

Without explicit AMBER criteria, any condition can be retroactively classified as "optional" to permit AMBER declaration. This is functionally equivalent to not having the condition at all — the exact failure mode BL-009 warned against.

---

### Governance Action Required

This learning mandates updates to Platform Readiness Canon (G-PLAT-READY-01) to:
- Classify each condition as REQUIRED (must be TRUE for any readiness) or DEGRADABLE (may be incomplete under AMBER with justification)
- Define explicit AMBER exception cases (e.g., "continuous monitoring deferred but manual audit scheduled")
- Prohibit AMBER for core enforcement mechanisms (gates, contracts, STOP authority)
- Require time-bound remediation plans for AMBER declarations
- Establish AMBER review cadence (must transition to GREEN or escalate)

---

### Status

**Recorded** — Non-Retroactive  
**Applies To:** All future AMBER readiness declarations  
**Effective:** 2025-12-31

---

## BL-013 — Platform Readiness Must Model Progressive Activation

### Classification
- **Type:** Governance Learning
- **Phase:** Platform Readiness Reset & Build Initiation Plan (Phase 1.2)
- **Severity:** Critical
- **Status:** Recorded
- **Impacts:** All future platform readiness models and declarations

---

### Context

Phase 1.2 Platform Readiness Gap Analysis identified that platform readiness canon (G-PLAT-READY-01) treats readiness as binary (GREEN/RED/AMBER) but bootstrap learnings demonstrate platform capabilities activate progressively.

---

### Observed Issue

Current canon defines only one readiness state: "Platform ready for governed build execution." No distinction between readiness for manual execution, delegated execution, supervised execution, and autonomous execution.

---

### Root Cause

Platform readiness was defined monolithically but platform capabilities mature through phases (governance ready → FM ready → builder ready → autonomous execution ready). Binary readiness model cannot represent partial capability readiness.

---

### Learning

Platform readiness **MUST** be modeled as progressive activation with explicit capability-based readiness stages. Different execution modes have different readiness prerequisites.

**Progressive Activation Requirements**:
- Readiness canon MUST define activation stages with explicit prerequisites
- Each stage MUST have explicit capability boundaries
- Readiness declarations MUST specify which activation stage is ready
- Higher activation stages MUST require all lower stage prerequisites
- Stage transitions MUST be explicit and auditable

**Activation Stages** (minimum model):
1. **Governance-Layer Ready**: Governance canon locked, completeness GREEN, layer-down complete in governance repository
2. **Repository Ready**: Application repository initialized, governance seeded, enforcement infrastructure present
3. **Manual Execution Ready**: Architecture frozen, QA-to-red complete, human proxy can execute builds
4. **Delegated Execution Ready**: FM operational, builders recruited, FM-instructs-human-executes viable
5. **Supervised Execution Ready**: Automated execution possible, human oversight active, halt authority proven
6. **Autonomous Execution Ready**: Full automation operational, continuous monitoring active, no human intervention required

---

### Why This Gap Allowed Failure

Binary readiness forces declaring "ready" when platform is only ready for manual execution, or declaring "not ready" when manual execution is viable. BL-009 occurred because platform was "ready enough" for some activities but not others — binary model cannot represent this nuance.

---

### Governance Action Required

This learning mandates updates to Platform Readiness Canon (G-PLAT-READY-01) to:
- Define progressive activation stage model
- Map each readiness condition to relevant activation stages
- Specify which stage declarations are valid (not all stages may be declarable immediately)
- Clarify that "Platform Ready for Governed Build Execution" implies a specific activation stage
- Integrate progressive activation with existing System Commissioning and Progressive Activation Protocol

---

### Status

**Recorded** — Non-Retroactive  
**Applies To:** All future platform readiness models  
**Effective:** 2025-12-31

---

## BL-014 — "Operational" Requires Evidence of Enforcement, Not Just Existence

### Classification
- **Type:** Governance Learning
- **Phase:** Platform Readiness Reset & Build Initiation Plan (Phase 1.2)
- **Severity:** Critical
- **Status:** Recorded
- **Impacts:** All future operational readiness validations

---

### Context

Phase 1.2 Platform Readiness Gap Analysis identified that platform readiness canon (G-PLAT-READY-01) requires governance to be "operational" but does not distinguish between "governance defined" and "governance enforced."

---

### Observed Issue

Multiple conditions use "operational," "active," "enforceable" without specifying evidence threshold. Governance existence (files present) conflated with governance enforcement (rules prevent violations). No test for "has governance actually blocked a violation?" vs "would governance theoretically block a violation?"

---

### Root Cause

Canon requires governance to be "operational" without defining what evidence proves operational status vs merely defined status. Permits declaring readiness when governance exists but has never enforced.

---

### Learning

"Operational" governance **MUST** be proven through enforcement evidence, not existence evidence. Readiness requires proof governance has enforced (past tense), not proof governance could enforce (conditional).

**Operational Evidence Requirements**:
- "Operational" MUST be defined as "has successfully enforced at least once" OR "enforcement mechanism tested and proven"
- Readiness MUST require enforcement test results, not just policy documents
- PR gates MUST have blocked at least one non-compliant PR (or test PR) as evidence they are operational
- STOP mechanics MUST have halted execution (or test halt succeeded) as evidence they are enforceable
- Branch protection MUST be verified programmatically (API check), not visually
- "Active" MUST mean "currently enforcing," not "configured but untested"

**Enforcement Test Requirements**:
- Before declaring operational, governance enforcement MUST be tested
- Tests MAY be synthetic (deliberate violation to prove blocking) if no natural violations occurred
- Test evidence MUST be documented and auditable
- Untested enforcement MUST be classified as "defined but not operational"

---

### Why This Gap Allowed Failure

BL-009 stated: "Execution safety depended on human intervention rather than constitutional enforcement." Governance existed but was not proven to enforce. Declaring readiness based on governance existence without enforcement evidence permits the exact failure mode: "A readiness certificate could be issued without guaranteeing governed execution."

---

### Governance Action Required

This learning mandates updates to Platform Readiness Canon (G-PLAT-READY-01) to:
- Define "operational" as "enforcement proven through evidence"
- Require enforcement test evidence for all operational claims
- Distinguish "defined" (exists) from "operational" (enforces) from "enforced" (has enforced)
- Specify test procedures for proving enforcement (synthetic violations acceptable)
- Require programmatic verification where possible (API checks vs manual inspection)
- Update evidence schemas to capture enforcement test results

---

## BL-015 — Architecture Must Be Wiring-Complete to Support One-Time Builds

### Classification
- **Type:** Architecture / Governance Learning
- **Phase:** Phase 4.3 → Phase 4.4 Transition
- **Severity:** Catastrophic (One-Time Build Violation)
- **Status:** Recorded
- **Impacts:** All future architecture definitions and QA-to-Red derivations

---

### Context

During Phase 4.3 (Architecture Definition) review, the architecture was found to be
structurally complete, fully traceable to requirements, and compliant with all
formal acceptance criteria.

However, a deeper inspection revealed that the architecture **did not guarantee**
a fully functional, one-time build application.

---

### Observed Issue

The architecture permitted:
- summary-level component definitions without explicit wiring
- implicit assumptions about component contracts
- reliance on builder interpretation to “fill in the gaps”
- QA derivation without ensuring runtime completeness

As a result, it was possible to:
- design a QA-to-Red suite
- recruit builders
- and still produce a *hollow build* (structure without behavior)

This failure mode is analogous to “a TV with buttons and casing, but no internal wiring.”

---

### Root Cause

Architecture completeness was evaluated using:
- structural coverage
- requirement traceability
- governance alignment

…but **not** evaluated against a stricter criterion:

> “Could this architecture, if implemented exactly as written, produce a fully
> functional application in a single build pass without interpretation?”

No canonical requirement existed that architecture must be **wiring-complete**.

---

### Learning

For a governed, one-time build system:

**Architecture MUST be wiring-complete, not just structurally complete.**

This means:
- No architectural element may exist without explicit operational definition
- All component contracts must be explicit (inputs, outputs, dependencies, failures)
- All runtime paths must be fully described end-to-end
- No reliance on “high-level” or “summary-only” descriptions is permitted
- Architecture must independently guarantee functional completeness

Traceability alone is insufficient.

---

### Governance Impact

This learning mandates that future architecture definitions:

- Are evaluated against a **wiring-completeness standard**
- Explicitly prohibit “summary-only” architecture sections
- Require every architectural unit to map to numbered QA components
- Ensure QA-to-Red cannot be defined without architectural wiring being complete

This learning directly informs:
- Architecture acceptance criteria
- QA-to-Red design requirements
- Builder task derivation rules

---

### Corrective Action Pattern

When wiring incompleteness is detected:
1. The issue must be classified as **catastrophic**
2. A formal FL/CI root cause analysis must be performed
3. Architecture must be corrected before QA-to-Red is finalized
4. Existing QA artifacts must be re-aligned, not silently patched

---

### Ratchet Statement

We do not accept architectures that *appear complete*.  
We accept only architectures that *cannot produce hollow builds*.

This condition is now permanently elevated.

---

### Status

**Recorded** — Non-Retroactive  
**Applies To:** All future operational readiness validations  
**Effective:** 2025-12-31

---

## BL-016 — FM Must Automatically Recognize and Respond to Execution Complexity Limits

### Classification
- **Type:** Governance Learning
- **Phase:** Wave 1.0.7 Execution Observation
- **Severity:** Structural
- **Status:** Recorded
- **Impacts:** FM Authority, Escalation Requirements, Execution Safety Model

---

### Context

During Wave 1.0.7 execution, real-world platform and cognitive constraints surfaced that tested the system's ability to self-recognize execution pressure without external prompting.

Bootstrap execution revealed that FM operates under practical constraints:
- Model context limits
- Platform execution time limits
- Cognitive capability boundaries
- Multi-step execution complexity thresholds

---

### Observed Issue

Existing governance defines:
- **When FM must escalate** (governance conflicts, unrecoverable failures, security concerns)
- **What conditions trigger hard stops** (CS violations, circuit breaker thresholds, catastrophic failures)
- **FM's authority to pause/halt for specific trigger conditions**

However, governance does NOT explicitly define:
- FM's obligation to self-recognize when execution complexity exceeds practical capability
- FM's authority to halt or pause **based on complexity/pressure assessment** (before hitting specific failure thresholds)
- FM's responsibility to filter execution pressure signals through FM judgment
- FM's expected behavior when task complexity approaches cognitive/platform limits

---

### Root Cause

FM escalation rules were defined for **specific failure conditions** (QA failures, governance violations, security incidents) but not for **general execution complexity assessment**.

The system implicitly assumed FM would:
- Recognize when a task exceeds reasonable execution capability
- Self-assess complexity vs. available resources (time, context, platform limits)
- Halt or pause execution proactively if complexity is impractical
- Do so without requiring external instruction or specific failure triggers

This expectation was **never explicitly canonized**.

---

### Learning

**When execution complexity exceeds practical capability** (model limits, context saturation, platform constraints, cognitive overload), **FM is expected to automatically recognize this condition, halt or pause execution if required, and re-evaluate execution strategy through FM authority** — even if this temporarily stops the build.

**This is NOT about automatic correction or enforcement.**  
**This is about automatic recognition and self-filtering by FM.**

**Key Characteristics**:
1. **Self-Recognition**: FM must detect when execution is approaching or exceeding practical limits
2. **FM Judgment**: FM evaluates whether complexity is manageable or requires intervention
3. **Proactive Halt/Pause**: FM may halt or pause execution **before** hitting specific failure thresholds
4. **Re-Evaluation**: FM re-evaluates execution strategy (decomposition, delegation, escalation to human)
5. **Authority Preservation**: FM retains decision-making authority; this is not automated enforcement

**Complexity Indicators** (non-exhaustive):
- Task requires reasoning beyond available context window
- Execution timeline exceeds platform limits (GitHub Actions timeouts)
- Multi-step orchestration complexity approaches cognitive saturation
- Dependency chains create unmaintainable execution state
- QA validation becomes impractically large or complex
- Architecture completeness requires iteration beyond practical bounds

**FM Response Options**:
- **Pause and Decompose**: Break complex task into smaller sub-tasks
- **Escalate for Simplification**: Request human authority to simplify requirements
- **Halt for Resource Allocation**: Halt execution until platform/cognitive resources available
- **Re-Plan Execution Strategy**: Adjust approach (phased execution, delegation, staged delivery)

---

### Why This Gap Allowed Pressure

Without explicit governance stating FM must self-recognize execution complexity:
- FM may proceed with impractical execution attempts (exhausting resources without outcome)
- FM may interpret "continue execution" mandate as "never halt for complexity"
- Human authority may need to externally observe and intervene (reactive, not proactive)
- Execution pressure accumulates until specific failure thresholds trigger (late detection)

Explicit governance enables FM to **proactively manage execution complexity** rather than **reactively respond to failures**.

---

### Governance Impact

This learning establishes:
- FM has **obligation** to self-recognize execution complexity limits
- FM has **authority** to halt/pause based on complexity assessment (not just specific failures)
- FM **judgment** is authoritative for complexity evaluation (with escalation if uncertain)
- Execution safety includes **proactive complexity management**, not just reactive failure response

**Integration with Existing Canon**:
- Extends **FOREMAN_AUTHORITY_AND_SUPERVISION_MODEL.md** escalation boundaries (§7.2 Soft Stop Conditions) to include complexity assessment
- Aligns with **BUILD_INTERVENTION_AND_ALERT_MODEL.md** Pause semantics (§3.4) for resource/strategic decisions
- Complements **CASCADING_FAILURE_CIRCUIT_BREAKER.md** by enabling halt **before** failure accumulation
- Integrates with **COGNITIVE_CAPABILITY_ORCHESTRATION_MODEL.md** by recognizing cognitive capability limits

---

### Governance Action Required

This learning informs future updates to:
- **FOREMAN_AUTHORITY_AND_SUPERVISION_MODEL.md**: Add "Execution Complexity Assessment" as soft stop condition (§7.2)
- **BUILD_INTERVENTION_AND_ALERT_MODEL.md**: Clarify Pause authority includes complexity-based pauses (§3.4)
- **FM_ROLE_CANON.md**: Add "Self-Recognize Complexity Limits" to core responsibilities (§7)

These updates are **informational**, not immediately required. This learning captures the expectation for future canonization.

---

### Status

**Recorded** — Non-Retroactive  
**Applies To:** All FM execution going forward  
**Effective:** 2026-01-03

---

### Ratchet Statement

FM is not expected to execute beyond practical capability.

FM is expected to self-recognize execution pressure and respond through FM authority.

This expectation is now explicitly recorded.

---


---

## BL-016 — AI Escalation and Capability Orchestration Must Be Operationally Active, Not Theoretical

### Classification
- **Type:** Governance Activation (Bootstrap-to-Canon Ratchet)
- **Phase:** Wave 1.0.7 Stress Analysis
- **Severity:** Critical (Silent Governance Gap)
- **Status:** Recorded — Activation Complete
- **Impacts:** All future FM execution, escalation decisions, and capability orchestration

---

### Context

During high-complexity execution (Wave 1.0.7), AI escalation and cognitive capability orchestration mechanisms existed in governance canon but **were not operationally activated**.

Governance defined:
- ESCALATION_POLICY.md (hierarchical authority levels L1-L4)
- COGNITIVE_CAPABILITY_ORCHESTRATION_MODEL.md (capability classes: reasoning, coding, analysis, etc.)
- FM escalation responsibilities (reactive, failure-triggered)

However:
- Escalation was **reactive only** (after failures), not **proactive** (before cognitive limits exceeded)
- Capability orchestration was **planning-only**, not **execution-relevant**
- FM had **no explicit halt semantics** for cognitive limit awareness
- Complexity-aware capability scaling was **not defined as binding FM behavior**

---

### Observed Issue

Wave 1.0.7 execution stress revealed:
- High-complexity task did not trigger proactive escalation
- Cognitive capability orchestration existed but was not integrated with escalation triggers
- FM proceeded per governance (escalate only after failures)
- Expectation: FM would escalate proactively based on complexity
- Reality: Proactive escalation was **not defined in governance**

**Root Cause**: Governance mechanisms existed but were **non-operational**. Humans implicitly relied upon escalation and capability scaling during Wave 1.0.7, but governance did not define these behaviors as **binding and active**.

This created a **silent governance gap** where escalation and capability orchestration were **expected in practice but non-binding in governance**.

---

### Learning

**Governance mechanisms that exist on paper but are not operationally activated are forbidden in a One-Time Build system.**

If governance defines escalation and capability orchestration:
- These mechanisms **MUST** be explicitly activated as **operational, binding behavior**
- FM **MUST** be expected to invoke, assess, and decide based on these mechanisms
- Escalation **MUST** include proactive triggers (complexity-aware), not just reactive triggers (failure-based)
- Capability orchestration **MUST** be execution-relevant, not just planning-relevant
- FM **MUST** have explicit halt semantics when cognitive limits are reached

**Theoretical governance creates false security**. If a mechanism is defined but not activated, humans assume it will engage when needed, but agents correctly follow only what is **explicit and binding**.

---

### Corrective Action (2026-01-03 Activation)

This learning mandates **immediate activation** of AI escalation and cognitive capability orchestration:

1. **ESCALATION_POLICY.md** amended to:
   - Activate proactive, complexity-aware escalation (not just reactive, failure-based)
   - Define explicit triggers: task complexity exceeds capability, cognitive saturation detected, no suitable capability class
   - Integrate with cognitive capability orchestration model
   - Redefine "escalation as failure signal" to include **proactive escalation as expected behavior**

2. **COGNITIVE_CAPABILITY_ORCHESTRATION_MODEL.md** amended to:
   - Activate as **operational governance** (not planning-only)
   - Add Section 5.5: Complexity-Aware Capability Scaling (ACTIVE)
   - Add Section 5.5.1: Explicit FM Halt Semantics for Cognitive Limits (ACTIVE)
   - Define mandatory FM responsibilities: assess complexity, select capability, switch when needed, halt when limits exceeded
   - Define audit requirements for all complexity assessments and capability selections

3. **FM_ROLE_CANON.md** amended to:
   - Add Section 9: Cognitive Capability Orchestration (ACTIVE)
   - Add Section 10: Explicit Halt Semantics for Cognitive Limits (ACTIVE)
   - Update Section 8: Escalation to include proactive, complexity-aware triggers
   - Define halt as **proactive, non-punitive, expected behavior** (not failure)

4. **BOOTSTRAP_EXECUTION_LEARNINGS.md** updated to:
   - Record this activation as BL-016 (bootstrap-to-canon ratchet)
   - Classify as critical governance gap revealed by execution stress
   - Document that activation makes mechanisms **operationally binding**, not theoretical

---

### Ratchet Statement

**This activation is permanent and non-retroactive.**

Going forward:
- AI escalation **MUST** be operational, not theoretical
- Cognitive capability orchestration **MUST** be execution-relevant, not planning-only
- FM **MUST** proactively assess complexity and escalate/halt when limits are reached
- Governance mechanisms that exist **MUST** be explicitly activated as binding behavior

**Theoretical governance that is not activated is governance debt.**

We do not accept governance mechanisms that exist on paper but are not operationally binding.

This condition is now permanently elevated.

---

### Status

**Recorded** — Non-Retroactive  
**Applies To:** All future FM execution, escalation decisions, and capability orchestration  
**Effective:** 2026-01-03

---

### Cross-References

- Issue: 🔴 ACTIVATE AI Escalation & Capability-Aware Scaling (Governance Activation)
- Survey: AI_ESCALATION_CAPABILITY_SCALING_SURVEY_AND_RCA.md
- Amended Artifacts:
  - governance/escalation/ESCALATION_POLICY.md (v2.0 — ACTIVE)
  - governance/canon/COGNITIVE_CAPABILITY_ORCHESTRATION_MODEL.md (v1.1.0 — ACTIVE)
  - governance/maturion/FM_ROLE_CANON.md (updated 2026-01-03)

---

## BL-017 — Execution Progress Must Be Systematically Recorded in a Single Canonical Artifact

### Classification
- **Type:** Governance Learning (Execution Integrity)
- **Phase:** Wave 1 Execution Observation
- **Severity:** Critical (Auditability and Wave Closure Risk)
- **Status:** Recorded
- **Impacts:** All future wave executions, FM responsibilities, wave closure certification

---

### Context

During Wave 1 execution in the FM App repository, a structural gap was identified at Wave closure:

- Execution progress was distributed across multiple long-lived and unstable PRs
- Some FM-referenced artifacts could not be reliably located
- Wave completion could not be certified based on a single authoritative progress record
- Progress knowledge relied partially on implicit memory rather than explicit evidence

This was surfaced during Wave 1 gate merge preparation and required progress reconstruction before wave closure could be validated.

---

### Observed Issue

Current governance **does not explicitly require**:

- A single canonical execution progress record
- Systematic artifact indexing (what exists, where, status)
- Explicit wave closure certification based on evidence
- A defined FM obligation to reconstruct progress when execution context spans multiple PRs

As a result:
- Progress can exist without being canonically recorded
- Wave closure risks being implicit rather than evidence-based
- Auditability and repeatability are weakened
- FM cannot certify wave completion from evidence alone

---

### Root Cause

**Governance gap**: No canon explicitly mandates that:

1. FM MUST maintain a canonical progress record per wave
2. The record MUST be authoritative over memory, PR history, and chat context
3. Progress MUST be recorded systematically (per phase, per artifact)
4. Wave closure MUST be certified based on evidence, not assumption

The One-Time Build system requires explicit evidence at all stages, but wave progress recording was implicitly assumed rather than constitutionally mandated.

---

### Learning

**For a governed, one-time build system with auditable wave execution:**

**Execution progress MUST be systematically and completely recorded in a single canonical progress artifact, suitable for audit and wave closure certification.**

This means:
- FM MUST maintain a canonical progress record per wave (e.g., `WAVE_<n>_IMPLEMENTATION_PROGRESS.md`)
- The progress record is authoritative over all other sources (memory, PR history, conversations)
- Progress MUST be recorded per wave and per phase
- Artifact index MUST be explicit (name → path → status)
- Wave closure certification MUST be based on evidence review, not assumption
- FM MUST reconstruct progress from all execution surfaces when context degrades
- Wave closure without certification is invalid

**Key Characteristics**:
1. **Single Source of Truth**: One canonical progress artifact per wave
2. **Systematic Recording**: Progress recorded per phase (architecture, QA, build, validation)
3. **Artifact Indexing**: All instructed artifacts explicitly tracked (name, path, status)
4. **Evidence-Based Certification**: Wave completion verdict derived from artifact review
5. **Reconstruction Obligation**: FM must reconstruct if progress context degrades
6. **Blocking Authority**: Wave gate merge blocked without certified completion

---

### Why This Gap Allowed Failure

Without explicit governance stating FM must maintain canonical progress records:
- Progress exists implicitly (in memory, PRs, conversations) but not authoritatively
- Wave closure can be declared based on "I think we're done" rather than "Evidence shows completion"
- Artifact location and status become ambiguous over time
- Auditability degrades as execution context spans multiple PRs or time periods
- Repeatability is impossible (future waves cannot learn from unclear past execution)

Explicit governance enables FM to **proactively maintain progress** rather than **retroactively reconstruct it under pressure**.

---

### Governance Impact

This learning establishes:
- FM has **obligation** to maintain canonical progress record per wave
- FM has **responsibility** to certify wave closure based on evidence
- FM MUST **reconstruct progress** if execution context degrades
- Wave gate merge is **blocked** without certified wave completion

**Integration with Existing Canon**:
- Extends **FOREMAN_AUTHORITY_AND_SUPERVISION_MODEL.md** Control responsibilities (§4.4) to include progress recording
- Extends **FM_ROLE_CANON.md** evidence trail maintenance (§6) to require canonical progress artifact
- Complements **WAVE_MODEL.md** wave completion criteria (§VIII) by requiring explicit certification
- Aligns with **AUDIT_READINESS_MODEL.md** by ensuring wave execution is fully auditable

---

### Governance Action Required

This learning informs creation of new governance canon:
- **MANDATORY_CANONICAL_PROGRESS_RECORDING_AND_WAVE_CLOSURE_CERTIFICATION.md**: Define constitutional requirement for progress recording
- **WAVE_IMPLEMENTATION_PROGRESS.template.md**: Define mandatory progress artifact format
- **WAVE_IMPLEMENTATION_PROGRESS.schema.md**: Define validation requirements for progress artifacts
- Layer-down to **FM_ROLE_CANON.md**: Add progress recording as core FM responsibility
- Layer-down to **FOREMAN_AUTHORITY_AND_SUPERVISION_MODEL.md**: Add to Control (C) phase responsibilities

These updates ensure future waves cannot experience the same progress ambiguity.

---

### Ratchet Statement

**This requirement is permanent and non-retroactive.**

Going forward:
- Wave execution progress **MUST** be recorded in a canonical artifact
- Wave closure **MUST** be certified based on evidence
- FM **MUST** maintain artifact indexes (name → path → status)
- Wave gate merge **MUST** be blocked without certified completion

**Implicit progress tracking is governance debt.**

We do not accept wave closures that depend on memory or assumption.

This condition is now permanently elevated.

---

### Status

**Recorded** — Non-Retroactive  
**Applies To:** All future wave executions  
**Effective:** 2026-01-04

---

### Cross-References

- Issue: #[ISSUE_NUMBER] — Mandatory Canonical Progress Recording & Wave Closure Certification
- Implements: MANDATORY_CANONICAL_PROGRESS_RECORDING_AND_WAVE_CLOSURE_CERTIFICATION.md (to be created)
- Template: governance/templates/WAVE_IMPLEMENTATION_PROGRESS.template.md (to be created)
- Schema: governance/schemas/WAVE_IMPLEMENTATION_PROGRESS.schema.md (to be created)
- Layer-Down Impacts:
  - governance/maturion/FM_ROLE_CANON.md
  - governance/canon/FOREMAN_AUTHORITY_AND_SUPERVISION_MODEL.md
  - governance/execution/WAVE_MODEL.md

---


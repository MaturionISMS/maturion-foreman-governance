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



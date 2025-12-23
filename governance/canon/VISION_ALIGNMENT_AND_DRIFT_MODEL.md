# VISION ALIGNMENT AND DRIFT MODEL

## Status
Canonical Vision Drift Detection Requirements  
Version: v1.0  
Authority: Johan Ras  
Effective Date: 2025-12-23  
Required By: GOVERNANCE_PURPOSE_AND_SCOPE.md

---

## 1. Purpose

This document defines **vision drift detection requirements** for the Independent Watchdog.

Vision drift detection enables:
- Early identification of agent behavior misalignment with Maturion philosophy
- Visibility into architectural decisions that deviate from doctrine
- Informational escalation to human authority **without blocking delivery**

This model is **descriptive and detection-focused only**. It provides:
- ✅ Definitions of vision drift categories
- ✅ Detection indicators
- ✅ Escalation visibility rules

This model explicitly does **NOT** provide:
- ❌ Enforcement mechanisms
- ❌ Execution hooks
- ❌ Scoring systems
- ❌ Runtime blocking behavior

---

## 2. Constitutional Authority

This policy derives authority from:
- **GOVERNANCE_PURPOSE_AND_SCOPE.md** - Defines Maturion build philosophy and canonical memory
- **BYG_DOCTRINE.md** - Defines build philosophy, roles, and learning discipline
- **GOVERNANCE_INCIDENT_RESPONSE_DOCTRINE.md** - Defines governance incident handling
- **Maturion Philosophy Tree** - Defines True North, values, and constitutional principles

---

## 3. Core Principle: Vision Drift ≠ Governance Violation

**EXPLICIT RULE:**

**Vision drift is NOT a governance violation.**

Vision drift is an **informational signal** that indicates:
- Potential philosophical misalignment
- Architectural decisions that may warrant review
- Behavioral patterns that deviate from doctrine

Vision drift:
- ✅ May be escalated to dashboard and human owner for visibility
- ✅ May trigger advisory review or architectural discussion
- ✅ May inform future governance evolution

Vision drift:
- ❌ Does NOT block PR merge
- ❌ Does NOT fail CI gates
- ❌ Does NOT halt builds
- ❌ Does NOT trigger enforcement actions

**Governance violations** are defined by **canon, policy, and schema compliance**.  
**Vision drift** is defined by **philosophical alignment with doctrine**.

These are **separate concerns** with **separate detection mechanisms** and **separate escalation paths**.

---

## 4. Vision Baseline (Derived from Doctrine)

The vision baseline is the **philosophical and intentional foundation** of Maturion, as expressed in doctrine.

### 4.1 Core Philosophical Principles

Vision alignment is evaluated against these foundational principles:

#### From GOVERNANCE_PURPOSE_AND_SCOPE.md:
- **One-Time Build Philosophy**: Systems are built once, correctly, on first delivery
- **QA as Proof**: QA is formal proof of correctness, not an indicator
- **Evidence over Intent**: Governance enforces evidence, not intent
- **Canonical Memory**: All durable knowledge is externalized to governance artifacts
- **Continuous Improvement Without Regression**: Learning is promoted, not discarded

#### From BYG_DOCTRINE.md:
- **Architecture is Incomplete Until Reality Proves It Complete**: Architecture must anticipate reality
- **QA is the Executable Specification of Intent**: Code is a consequence of architecture
- **Compulsory Learning**: Failures must be recorded, typed, and mapped to architecture changes
- **No Self-Governance**: Builders do not reinterpret architecture or modify governance
- **Authority Boundaries**: FM, Builder, Codex, and Human roles are distinct and non-overlapping

#### From Maturion Philosophy Tree (True North Layer):
- **Purpose**: Build safety-governed autonomous intelligence as global gold standard
- **Core Values**: Alignment, Integrity, Transparency, Stewardship, Responsibility, Contextual Intelligence
- **Identity Core**: One mind with multiple embodiments, governed, safe, compliant, mission-driven

### 4.2 Operational Doctrine Elements

Vision alignment is also evaluated against operational doctrine:

- **Separation of Duties**: Agent roles are strict; cross-role QA execution is catastrophic
- **Build-to-Green**: Builders execute builds from RED to GREEN against provided architecture and QA
- **Governance as Canonical Memory**: Ephemeral memory is forbidden; all learning is promoted or discarded
- **Non-Negotiables**: No bypassing QA, no silent rule changes, no authority ambiguity, no repeated failures without learning

---

## 5. Vision Drift Categories

Vision drift is classified into **three severity categories** based on **scope of philosophical deviation** and **potential impact on long-term alignment**.

### 5.1 Informational Drift

**Definition**: Minor deviations from philosophical best practices that do not affect correctness or governance compliance.

**Indicators**:
- Agent language or reasoning style that deviates from Maturion tone (e.g., overly informal, not mission-driven)
- Architectural choices that are compliant but philosophically suboptimal (e.g., choosing patching over architectural evolution)
- Documentation patterns that differ from canonical style without violating schema requirements
- Minor deviations in reasoning transparency (e.g., not fully explaining architectural rationale)

**Impact**: Low  
**Escalation**: Dashboard only (aggregated trend view)  
**Recommended Action**: Informational review; no immediate action required

---

### 5.2 Warning Drift

**Definition**: Moderate deviations that indicate potential misalignment with core philosophy and may lead to future governance issues if not addressed.

**Indicators**:
- Repeated architectural decisions that favor speed over correctness (e.g., "fix later" mentality, even if not explicitly stated)
- Patterns of bypassing learning promotion (e.g., failures recorded but not promoted to governance/architecture/QA)
- Agent behavior suggesting role confusion (e.g., Builder attempting to interpret architecture, FM attempting to modify constitutional governance)
- QA gaps that suggest incomplete anticipation of reality (e.g., QA passes but UI verification fails)
- Architectural decisions that create technical debt inconsistent with BYG philosophy
- Repeated reliance on ephemeral memory instead of promoting knowledge to canonical artifacts

**Impact**: Medium  
**Escalation**: Dashboard (highlighted) + Owner notification  
**Recommended Action**: Advisory review; architectural/governance discussion with FM; potential agent contract review

---

### 5.3 Critical Drift

**Definition**: Severe deviations that indicate fundamental misalignment with Maturion philosophy and are likely to result in governance violations, architectural failures, or loss of control.

**Indicators**:
- Agent behavior suggesting self-governance (e.g., reinterpreting governance rules, modifying gates to pass checks)
- Authority boundary violations (e.g., Builder attempting to classify failures, FM attempting to mutate constitutional governance)
- Repeated governance incidents of the same cause (second or third occurrence) indicating learning discipline failure
- Architectural patterns inconsistent with One-Time Build philosophy (e.g., systematic partial correctness, planned iteration instead of complete delivery)
- Systematic bypassing of QA-as-proof principle (e.g., treating CI as discovery rather than verification)
- Patterns suggesting loss of separation of duties (e.g., cross-role QA execution)
- Evidence of "governance erosion" behaviors (e.g., weakening enforcement to make builds pass, disabling gates, creating placeholder artifacts)

**Impact**: High  
**Escalation**: Dashboard (critical alert) + Immediate Owner notification + FM escalation  
**Recommended Action**: Immediate review required; potential agent contract realignment; architectural review; governance audit

---

## 6. Detection Methodology (Informational)

This section defines **what** an Independent Watchdog should detect, **not how** it is implemented.

### 6.1 Detection Inputs

Vision drift detection may analyze:
- **Agent reasoning transcripts**: Language, tone, decision rationale
- **Architectural artifacts**: Architecture documents, QA definitions, scope declarations
- **PR metadata**: Scope changes, commit history, gate pass/fail patterns
- **Learning records**: Failure promotion patterns, lessons learned completeness
- **Governance artifacts**: Agent contract adherence, canonical memory usage patterns
- **Build effectiveness metrics**: Repeated failures, UI verification outcomes, rework patterns

### 6.2 Detection Heuristics (Examples)

**Informational Drift Heuristics**:
- Agent language contains informal phrases inconsistent with Maturion tone
- Documentation lacks explicit rationale sections when expected
- Architectural decisions do not reference doctrine or prior learning

**Warning Drift Heuristics**:
- Same failure class occurs twice without learning promotion
- QA passes but UI verification fails (architecture incomplete)
- Builder PR includes changes to governance-owned files (role confusion)
- Agent reasoning suggests "we'll fix this later" approach
- Learning records exist but lack promotion to canonical artifacts

**Critical Drift Heuristics**:
- Agent modifies governance rules without explicit Codex authority
- Builder attempts to classify failures (Human authority only)
- Third occurrence of same failure cause (systemic failure)
- PR gates bypassed or relaxed to satisfy checks
- Agent reasoning suggests cross-role QA execution
- Systematic patterns of governance incident repetition

---

## 7. Escalation Visibility Rules

Vision drift detection results must be made visible according to the following rules:

### 7.1 Dashboard Visibility

All drift detection results must be visible in the **FM App (Foreman Office)** dashboard:

**Informational Drift**:
- Aggregated trend view (e.g., "12 informational drift signals this week")
- Drill-down capability to view individual signals
- Optional filtering by category, agent, repository, time period

**Warning Drift**:
- Highlighted individual alerts
- Direct link to affected PR, build, or artifact
- Drill-down to detection inputs and heuristic rationale

**Critical Drift**:
- Critical alert banner (unmissable)
- Direct link to affected context
- Full detection rationale and recommended actions

### 7.2 Owner Notification

**Informational Drift**: No direct notification (dashboard only)

**Warning Drift**:
- Dashboard notification (in-app)
- Optional: Weekly summary email with warning drift highlights

**Critical Drift**:
- Immediate in-app notification
- Email notification to Owner (Johan)
- FM escalation (if FM is not the source of drift)

### 7.3 Auditability

All drift detection results must be:
- ✅ Timestamped
- ✅ Linked to source context (PR, build, artifact)
- ✅ Traceable to detection heuristic/input
- ✅ Retained for audit and trend analysis
- ✅ Exportable for review

---

## 8. Constraints and Non-Negotiables

### 8.1 No Enforcement

Vision drift detection:
- ❌ MUST NOT block PR merge
- ❌ MUST NOT fail CI gates
- ❌ MUST NOT halt builds
- ❌ MUST NOT trigger automated remediation
- ❌ MUST NOT modify agent behavior automatically

Vision drift is **informational only**. Human authority decides corrective action.

### 8.2 No Execution Hooks

Vision drift detection:
- ❌ MUST NOT inject code into build pipelines
- ❌ MUST NOT modify PR workflows
- ❌ MUST NOT alter agent contracts automatically
- ❌ MUST NOT trigger automated governance changes

Vision drift detection is **passive monitoring only**.

### 8.3 No Scoring Systems

Vision drift detection:
- ❌ MUST NOT compute "alignment scores"
- ❌ MUST NOT rank agents by drift levels
- ❌ MUST NOT create comparative metrics
- ❌ MUST NOT gamify vision alignment

Vision drift is **qualitative and context-dependent**, not quantitative.

### 8.4 No Runtime Assumptions

Vision drift detection:
- ❌ MUST NOT assume specific runtime environments
- ❌ MUST NOT require specific CI platforms
- ❌ MUST NOT depend on build execution timing
- ❌ MUST NOT interfere with build performance

Vision drift detection must be **platform-agnostic and non-intrusive**.

---

## 9. Integration with Governance

### 9.1 Vision Drift as Learning Input

Vision drift detection results **MAY** be used as input to the **Learning Intake and Promotion Model**:
- Warning and Critical drift signals may trigger FM review
- Patterns of drift may reveal missing governance rules
- Repeated drift in the same category may indicate need for governance evolution

Vision drift detection is **upstream to learning promotion**, not enforcement.

### 9.2 Vision Drift and Governance Ripple

Vision drift patterns **MAY** inform governance evolution via the **Governance Ripple Model**:
- Upward propagation: drift patterns reveal philosophical gaps in governance
- Downward propagation: governance clarifications reduce future drift

Vision drift is a **governance evolution signal**, not a governance gate failure.

### 9.3 Separation from Governance Violations

**Critical Rule**: Vision drift detection logic must be **completely separate** from governance gate enforcement logic:
- Separate detection mechanisms
- Separate escalation paths
- Separate dashboard views
- No shared pass/fail logic

Conflating vision drift with governance violations is a **governance error**.

---

## 10. Success Criteria

This model is successful when:
- Vision drift signals are visible, timely, and actionable
- Human authority can review drift context without build delays
- Drift patterns inform governance evolution
- Agent behavior becomes more philosophically aligned over time
- Vision drift detection does not block delivery
- Vision alignment and governance compliance remain distinct concerns

---

## 11. Future Evolution

This model may evolve to include:
- Machine learning-based drift detection heuristics
- Integration with agent training and contract generation
- Historical drift trend analysis and prediction
- Cross-repository drift pattern detection

All evolution must preserve the **non-enforcement constraint**.

---

End of VISION ALIGNMENT AND DRIFT MODEL

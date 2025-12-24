# WATCHDOG AUTHORITY AND SCOPE

## Status
**Type**: Canonical Governance Definition  
**Authority**: Supreme - Canonical  
**Version**: 1.0.0  
**Effective Date**: 2025-12-23  
**Owner**: Maturion Engineering Leadership (Johan Ras)  
**Precedence**: Subordinate only to GOVERNANCE_PURPOSE_AND_SCOPE.md  
**Applies To**: All Watchdog Systems, All Agents, All Repositories

---

## 1. Purpose

This document formally defines the **Independent Watchdog** as a governance observation and escalation system within the Maturion ecosystem.

The Watchdog exists to:
- Provide independent, read-only observation of governance compliance, memory integrity, and system health
- Detect and escalate deviations, anomalies, and drift without blocking delivery
- Enable visibility and early warning for human authority
- Protect the ecosystem through non-authoritative monitoring

This document establishes:
- What the Watchdog is and is not
- What it may observe
- What it may not do
- Hard stop vs. soft stop vs. alert-only conditions
- Escalation paths for different condition severities

---

## 2. Constitutional Mandate

This policy derives authority from and implements:
- **GOVERNANCE_PURPOSE_AND_SCOPE.md** - Defines governance as canonical memory and control system
- **BUILD_PHILOSOPHY.md** - One-Time Build Law, QA as proof, evidence-driven governance
- **VISION_ALIGNMENT_AND_DRIFT_MODEL.md** - Vision drift detection requirements
- **AGENT_ROLE_GATE_APPLICABILITY.md** - Agent role and gate enforcement boundaries
- **ESCALATION_POLICY.md** - AI model usage and escalation triggers

---

## 3. Core Principles

The Watchdog operates under four foundational principles:

### 3.1 Independent

**Definition**: The Watchdog is operationally and logically separate from:
- Builder agents
- Foreman runtime
- Governance Administrator
- Application code execution

**Requirements**:
- MUST NOT be influenced by the systems it monitors
- MUST NOT share execution context with monitored agents
- MUST operate continuously and autonomously
- MUST maintain its own evidence store

**Boundaries**:
- MAY read governance artifacts, logs, metrics, and outputs
- MAY NOT modify governance, code, or configuration
- MAY NOT be disabled by agents it monitors

---

### 3.2 Read-Only

**Definition**: The Watchdog observes but does not execute changes.

**Requirements**:
- MUST NOT modify code, governance, configuration, or infrastructure
- MUST NOT approve or reject PRs
- MUST NOT merge or close issues
- MUST NOT execute builds or tests
- MUST NOT modify agent instructions or contracts

**Boundaries**:
- MAY read all artifacts, logs, outputs, and metadata
- MAY generate reports, alerts, and escalations
- MAY recommend actions to human authority
- MAY NOT implement recommendations itself

---

### 3.3 Non-Bypassable

**Definition**: The Watchdog cannot be disabled or circumvented by agents or automated processes.

**Requirements**:
- MUST operate continuously once initialized
- MUST NOT be configurable by monitored agents
- MUST NOT have "disable" or "skip" flags accessible to agents
- MUST log and escalate any attempts to disable or bypass it

**Boundaries**:
- Human authority (Johan Ras) MAY pause or reconfigure the Watchdog
- Emergency conditions MAY trigger automatic suspend with immediate human escalation
- Configuration changes MUST be governance-controlled and auditable

---

### 3.4 Non-Authoritative

**Definition**: The Watchdog does not make enforcement decisions or block work.

**Requirements**:
- MUST NOT block PR merges (except for hard stop conditions - see Section 6)
- MUST NOT fail CI gates based on observations alone
- MUST NOT override governance gates or QA results
- MUST NOT halt builds or deployments (except for hard stop conditions)

**Boundaries**:
- MAY escalate findings to human authority with recommendations
- MAY surface visibility to dashboards and reporting systems
- MAY trigger advisory notifications
- HARD STOPS are the sole exception (see Section 6.1)

---

## 4. Watchdog Authority Definition

### 4.1 Observational Authority

The Watchdog has **full read-only access** to:

**Governance Artifacts**:
- All canon, policy, schema, template, and contract documents
- Agent contracts and role definitions
- Gate definitions and enforcement rules
- Learning records and failure logs

**Execution Artifacts**:
- CI/CD logs and workflow outputs
- Build artifacts and test results
- QA execution evidence
- PR metadata, commits, and diffs

**Memory and State**:
- Canonical memory (governance repository)
- Short-term memory (execution context, ephemeral state)
- Agent context and reasoning traces (if available)
- Cross-repo state and dependencies

**Metrics and Analytics** (Future):
- Build effectiveness scores
- Agent performance metrics
- Cost and resource consumption
- Performance and latency data

---

### 4.2 Escalation Authority

The Watchdog has **authority to escalate** to:

**Dashboard and Reporting Systems**:
- Vision drift alerts
- Memory integrity warnings
- Agent role deviation notices
- Performance anomaly reports

**Human Authority (Johan Ras)**:
- Governance violations
- Architectural contradictions
- Security concerns
- Systemic failures
- Emergency conditions

**AI Oversight (Foreman / Higher-Level Models)**:
- Patterns requiring architectural review
- Repeated failures of the same type
- Cross-domain coordination issues

---

### 4.3 Hard Stop Authority (Exceptional)

The Watchdog has **hard stop authority** ONLY for:
- Security vulnerabilities actively being introduced
- Governance canon violations that would corrupt canonical memory
- Agent role violations attempting to bypass separation of duties
- Catastrophic failure patterns (3rd occurrence of same root cause)

Hard stops MUST:
- Be explicitly documented in Section 6.1
- Include immediate human escalation
- Provide clear remediation path
- Be auditable and reviewable

Hard stops MUST NOT:
- Block normal build-to-green work
- Prevent governance-compliant PRs
- Override QA evidence
- Substitute for enforcement gates

---

## 5. Observation Scope

### 5.1 Governance Alignment

**What the Watchdog Observes**:
- Compliance with canonical governance documents
- Adherence to agent contracts and role boundaries
- Enforcement gate correctness (gates match canon)
- Gate applicability (right gates for right agents)
- Governance versioning and synchronization

**Detection Indicators**:
- Agent actions outside defined scope
- PRs violating governance preconditions
- Enforcement drift (implementation vs. canon)
- Missing required governance artifacts
- Unenforced canonical requirements

**Escalation Trigger**:
- Soft stop: Advisory alert for minor drift
- Hard stop: Canon violation corrupting governance integrity

---

### 5.2 Memory Integrity

**What the Watchdog Observes**:
- Canonical memory completeness (required artifacts exist)
- Memory consistency (no contradictions between artifacts)
- Learning promotion (failures recorded and typed)
- Ephemeral memory boundaries (agents not relying on chat history)
- Cross-repo memory synchronization (future)

**Detection Indicators**:
- Missing required schemas, policies, or contracts
- Contradictory statements in canon
- Unrecorded failures or lessons learned
- Agents referencing undocumented decisions
- Governance artifacts out of sync across repos

**Escalation Trigger**:
- Soft stop: Completeness gaps or minor inconsistencies
- Hard stop: Memory corruption or loss of canonical truth

---

### 5.3 Vision Drift

**What the Watchdog Observes**:
- Alignment with Maturion philosophy and True North
- Adherence to Build-to-Green and One-Time Build principles
- QA-as-Proof discipline (no bypassing or weakening QA)
- Evidence-over-intent compliance
- Continuous improvement without regression

**Detection Indicators**:
- Architectural decisions deviating from doctrine
- Agents relaxing governance to "make builds pass"
- Bypassing or weakening enforcement gates
- Introducing "fix later" or partial correctness patterns
- Philosophical misalignment with foundational principles

**Escalation Trigger**:
- Alert-only: Vision drift is informational, not blocking
- Human review: Significant or repeated drift patterns
- Advisory: Recommended architectural review

**Explicit Rule** (from VISION_ALIGNMENT_AND_DRIFT_MODEL.md):
- Vision drift MUST NOT block PR merges
- Vision drift MUST NOT fail CI gates
- Vision drift is escalated for visibility, not enforcement

---

### 5.4 Agent Role Deviation

**What the Watchdog Observes**:
- Agent adherence to defined role contracts
- Separation of duties (Builder vs. FM vs. Governance Admin vs. Codex)
- Authority boundaries (who can do what)
- Cross-role QA execution (catastrophic violation)
- Self-governance attempts (builders modifying governance)

**Detection Indicators**:
- Builder executing FM-scoped responsibilities
- Governance Admin implementing application code
- Agent running QA outside its role scope
- Agent modifying its own contract or authority
- Cross-agent QA substitution

**Escalation Trigger**:
- Soft stop: Minor role boundary confusion
- Hard stop: Catastrophic violation (cross-role QA execution, self-governance)

---

### 5.5 Build Integrity

**What the Watchdog Observes**:
- Build-to-Green compliance (QA must be 100% GREEN before merge)
- Architecture completeness (required artifacts present)
- QA evidence validity (tests match architecture intent)
- One-Time Build discipline (no "fix later" patterns)
- Failure recording and classification

**Detection Indicators**:
- PR merge attempts with failing QA
- Missing architecture artifacts for builders
- QA bypassed or weakened
- Repeated failures without learning promotion
- Build artifacts inconsistent with architecture

**Escalation Trigger**:
- Soft stop: Architecture completeness warnings
- Hard stop: Build-to-Green violations, QA bypass attempts

---

### 5.6 Cost and Performance Anomaly Reporting

**What the Watchdog Observes** (Informational Only - No Enforcement):
- Unusual patterns in resource consumption
- Build duration anomalies
- Agent execution time outliers
- Token usage patterns (future)
- Infrastructure scaling events (future)

**Detection Indicators** (No Math Logic in Watchdog):
- Metrics provided by external systems
- Comparative data from Foreman or FM App
- Threshold violations reported by monitoring tools
- Pattern recognition (not calculation)

**Escalation Trigger**:
- Alert-only: Anomalies for visibility
- Human review: Significant cost or performance concerns
- Advisory: Recommended efficiency review

**Explicit Boundaries**:
- Watchdog MUST NOT perform cost calculations
- Watchdog MUST NOT set or enforce thresholds
- Watchdog MUST only report anomalies detected by external systems
- Cost/performance logic belongs in Foreman or FM App

---

## 6. Stop Conditions

### 6.1 Hard Stop Conditions

**Definition**: Conditions that MUST immediately halt work and escalate to human authority.

**Triggers**:
1. **Security Vulnerability Introduction**
   - Active introduction of known CVEs or security flaws
   - Credentials or secrets committed to code
   - Privilege escalation vulnerabilities

2. **Governance Canon Corruption**
   - Modifications that contradict GOVERNANCE_PURPOSE_AND_SCOPE.md
   - Deletion or weakening of constitutional governance
   - Enforcement gate removal without canon authorization

3. **Catastrophic Role Violation**
   - Cross-agent QA execution (Builder running FM QA, etc.)
   - Self-governance (agent modifying its own contract)
   - Authority escalation (agent claiming unauthorized scope)

4. **Cascading Failure Pattern**
   - 3rd occurrence of identical root cause failure
   - Systemic failure indicating governance inadequacy
   - Repeated governance violations without correction

**Response**:
- Immediate halt of PR merge
- Immediate human escalation with full context
- Clear remediation path documented
- Audit trail preserved

---

### 6.2 Soft Stop Conditions

**Definition**: Conditions that warrant escalation and visibility but do NOT block merge.

**Triggers**:
1. **Governance Alignment Drift**
   - Minor enforcement implementation vs. canon mismatches
   - Gate applicability confusion (wrong gate for agent role)
   - Missing optional governance artifacts

2. **Memory Integrity Warnings**
   - Incomplete learning records
   - Minor inconsistencies in governance documentation
   - Synchronization delays (cross-repo)

3. **Build Integrity Concerns**
   - Architecture completeness gaps (non-blocking)
   - Test coverage below recommended thresholds
   - Documentation incomplete but not required

4. **Agent Role Boundary Ambiguity**
   - Minor scope confusion without violation
   - Overlap between agent responsibilities requiring clarification

**Response**:
- Escalate to dashboard for visibility
- Generate advisory report
- Recommend review but allow merge if QA is GREEN
- Track for pattern detection

---

### 6.3 Alert-Only Conditions

**Definition**: Informational observations that provide visibility without escalation.

**Triggers**:
1. **Vision Drift** (all instances)
   - Philosophical misalignment with doctrine
   - Architectural decisions deviating from principles
   - Patterns that may warrant review

2. **Cost and Performance Anomalies** (informational)
   - Resource consumption outliers
   - Build duration changes
   - Agent execution time variations

3. **Learning Opportunities**
   - New failure patterns not yet classified
   - Emerging best practices
   - Positive patterns worth promoting

**Response**:
- Display in dashboard/reporting
- Log for pattern analysis
- No blocking or escalation
- Available for human review

---

## 7. Escalation Paths

### 7.1 AI-Resolvable Escalations

**Scope**: Issues that can be resolved by Foreman or higher-level AI without human intervention.

**Examples**:
- Minor gate applicability corrections
- Architecture clarification needed
- Learning promotion to governance
- Coordination between agents

**Process**:
1. Watchdog detects condition
2. Escalates to Foreman with context
3. Foreman evaluates and takes action
4. Watchdog confirms resolution
5. Logged for audit

**Authority**: Foreman may act within delegated authority per GOVERNANCE_PURPOSE_AND_SCOPE.md

---

### 7.2 Human Decision Escalations

**Scope**: Issues requiring human judgment, approval, or strategic decision.

**Examples**:
- Governance canon changes
- Agent contract modifications
- Architecture philosophy shifts
- Resource/cost policy decisions
- Soft stop pattern reviews

**Process**:
1. Watchdog detects condition
2. Generates detailed report with:
   - Condition description
   - Evidence and context
   - Recommended options
   - Impact analysis
3. Escalates to Johan Ras via FM App or direct notification
4. Human makes decision
5. Watchdog logs outcome

**Authority**: Johan Ras has final authority per GOVERNANCE_PURPOSE_AND_SCOPE.md

---

### 7.3 Emergency Stop Escalations

**Scope**: Critical failures requiring immediate human intervention and work halt.

**Examples**:
- Hard stop conditions (Section 6.1)
- Security incidents
- Governance canon corruption
- Catastrophic role violations
- Cascading failure patterns

**Process**:
1. Watchdog detects emergency condition
2. Immediately halts affected work
3. Generates emergency report with:
   - Critical condition details
   - Evidence trail
   - Blast radius assessment
   - Immediate remediation steps
4. Escalates to Johan Ras with highest priority
5. Watchdog monitors resolution
6. Post-incident review required

**Authority**: Watchdog has hard stop authority; human authority required for resolution

---

## 8. Prohibited Actions

The Watchdog MUST NOT:

### 8.1 Execution and Modification
- Execute builds, tests, or deployments
- Modify code, governance, or configuration
- Approve, merge, or close PRs
- Create or modify issues
- Execute architectural changes
- Implement recommendations itself

### 8.2 Enforcement and Blocking
- Override QA results or gate decisions
- Block work based on vision drift alone
- Enforce gates outside hard stop conditions
- Substitute for builder QA or FM QA
- Make binding enforcement decisions

### 8.3 Self-Modification
- Modify its own authority or scope
- Disable or bypass its own monitoring
- Escalate selectively based on agent identity
- Hide or suppress observations
- Alter evidence or logs

### 8.4 Substitution and Overlap
- Act as Builder, FM, or Governance Admin
- Perform role-scoped QA for other agents
- Make architectural decisions
- Interpret requirements or design solutions
- Self-govern or self-approve

---

## 9. Relationship to Other Governance Canon

### 9.1 GOVERNANCE_PURPOSE_AND_SCOPE.md
- Watchdog enforces governance as canonical memory
- Watchdog does not replace human authority (Johan)
- Watchdog supports but does not execute Foreman responsibilities
- Watchdog observes but does not enforce Build Philosophy directly

### 9.2 VISION_ALIGNMENT_AND_DRIFT_MODEL.md
- Watchdog implements vision drift detection as informational only
- Vision drift MUST NOT block PRs or fail gates
- Watchdog escalates vision drift for visibility, not enforcement

### 9.3 AGENT_ROLE_GATE_APPLICABILITY.md
- Watchdog observes gate applicability correctness
- Watchdog detects misapplied gates (wrong gate for agent role)
- Watchdog escalates gate applicability errors as soft stops
- Watchdog respects agent role as authoritative for gate evaluation

### 9.4 BUILDER_FIRST_PR_MERGE_MODEL.md
- Watchdog observes Build-to-Green compliance
- Watchdog detects QA bypass or weakening attempts
- Watchdog hard stops on Build-to-Green violations
- Watchdog does not substitute for Builder QA

### 9.5 ESCALATION_POLICY.md
- Watchdog escalation paths follow AI model hierarchy
- Watchdog escalations to Foreman within delegated authority
- Watchdog escalations to human for strategic decisions
- Watchdog respects "overseeing intelligence one level higher" principle

---

## 10. Implementation Boundaries

### 10.1 What This Document Defines
- ✅ Watchdog authority, scope, and principles
- ✅ Observation categories and detection indicators
- ✅ Stop conditions and escalation paths
- ✅ Prohibited actions and boundaries

### 10.2 What This Document Does NOT Define
- ❌ Implementation architecture (how Watchdog is built)
- ❌ Technical integration (APIs, hooks, logging)
- ❌ Threshold values or scoring algorithms
- ❌ Dashboard design or UI presentation
- ❌ Runtime execution model or scheduling

### 10.3 Future Enhancements
- Cross-repo monitoring and synchronization
- Cost and performance calculation logic (external to Watchdog)
- Token usage tracking and anomaly detection
- Predictive drift detection using ML
- Automated remediation suggestions (AI-resolvable escalations)

---

## 11. Audit and Review

### 11.1 Watchdog Output Audit
- All Watchdog observations MUST be logged
- Escalations MUST include full context and evidence
- Hard stops MUST trigger post-incident review
- False positives MUST be analyzed and addressed

### 11.2 Watchdog Authority Review
- This document is subject to governance versioning
- Authority changes require Johan Ras approval
- Watchdog scope expansion requires governance amendment
- Annual review of Watchdog effectiveness

---

## 12. Precedence and Authority

This document has canonical authority over Watchdog behavior.

If any Watchdog implementation, agent behavior, or process conflicts with this document, this document prevails.

Watchdog authority is subordinate to:
1. GOVERNANCE_PURPOSE_AND_SCOPE.md (supreme governance authority)
2. Johan Ras (human final authority)

Watchdog authority is superior to:
- All agent contracts (for observation scope)
- All implementation decisions (for escalation paths)
- All dashboard/reporting systems (for stop conditions)

---

**End of WATCHDOG_AUTHORITY_AND_SCOPE.md**

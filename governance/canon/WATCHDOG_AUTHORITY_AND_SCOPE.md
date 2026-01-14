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

### 5.0 Watchdog Observation Surface for Cognitive Hygiene Protocol (CHP)

**Purpose**: Define what the Watchdog observes about CHP operations to enable oversight without introspection.

**Core Principle**: The Watchdog observes **external behavior and outcomes**, NOT internal reasoning processes.

---

#### 5.0.1 Observable CHP Events

**What the Watchdog Observes**:

**Invocation Events**:
- ✅ CHP hygiene cycle start and completion timestamps
- ✅ CHP invocation source (scheduled, manual, emergency)
- ✅ CHP invocation authorization (who authorized: Human, scheduled system, emergency trigger)
- ✅ CHP invocation scope (full cycle, partial, targeted)
- ✅ CHP hygiene cycle success/failure status
- ✅ CHP hygiene cycle duration and resource consumption patterns

**Escalation Events**:
- ✅ CHP escalations to Foreman (advisory escalations)
- ✅ CHP escalations to Human (critical findings)
- ✅ CHP escalations to Watchdog (observational signals)
- ✅ Escalation frequency, timing, and patterns
- ✅ Escalation categories (drift, contamination, instability, governance gaps)
- ✅ Escalation decision outcomes (accepted, rejected, modified, escalated further)

**Drift Detection Signals**:
- ✅ Cognitive drift detected by CHP (type, severity, scope)
- ✅ Memory contamination findings (severity level, affected memory categories)
- ✅ Reasoning instability patterns (frequency, impact)
- ✅ Embodiment behavior anomalies (type, embodiment affected)
- ✅ Drift normalization operations performed
- ✅ Drift trends over time (increasing, decreasing, stable)

**Memory Interaction Events**:
- ✅ CHP memory read operations (memory categories accessed, read scope)
- ✅ CHP memory proposal submissions (proposal ID, category, submission timestamp)
- ✅ CHP memory proposal outcomes (approved, rejected, modified)
- ✅ CHP hygiene operations on ephemeral memory (operations performed, outcomes)
- ✅ CHP unauthorized write attempts (should be zero; hard stop trigger if detected)

**Governance Compliance Signals**:
- ✅ CHP operations within authorized scope (compliance indicator)
- ✅ CHP boundary violations detected (authority violations, prohibited actions)
- ✅ CHP hard stop compliance (response to Watchdog hard stops)
- ✅ CHP audit trail completeness (logging compliance)
- ✅ CHP authority leakage attempts (self-governance, decision substitution)

**Operational Health Signals**:
- ✅ CHP hygiene cycle effectiveness metrics (drift reduction rate, contamination cleanup rate)
- ✅ CHP hygiene cycle failures (errors, timeouts, incomplete operations)
- ✅ CHP resource consumption patterns (CPU, memory, execution time)
- ✅ CHP proposal quality metrics (approval rate, rejection rate, proposal relevance)

---

#### 5.0.2 Explicit Exclusions from Observation

**What the Watchdog Does NOT Observe** (Reasoning Internals):

**Prohibited Introspection**:
- ❌ CHP prompt content (raw prompts, prompt templates, prompt engineering)
- ❌ CHP chain-of-thought reasoning (internal reasoning steps, thought processes)
- ❌ CHP decision-making logic (how CHP arrives at conclusions)
- ❌ CHP cognitive models (internal representations, reasoning patterns)
- ❌ CHP analysis algorithms (how CHP analyzes drift, contamination, instability)
- ❌ CHP scoring or weighting logic (internal thresholds, scoring functions)

**Rationale for Exclusions**:
- Watchdog observes **outcomes**, not **reasoning processes**
- Reasoning introspection creates coupling and fragility
- Observable behavior is sufficient for governance compliance verification
- Reasoning internals are implementation details, not governance concerns
- Introspection risks Watchdog becoming dependent on CHP implementation
- External observation maintains Watchdog independence

**Boundary Enforcement**:
- Watchdog has NO access to CHP internal reasoning APIs (if any)
- Watchdog has NO access to CHP prompt management systems
- Watchdog has NO access to CHP cognitive model internals
- Watchdog observes audit trails and operational events ONLY
- Watchdog independence is preserved through observation-only surface

---

#### 5.0.3 Observable Indicators vs. Introspection

**Observable Indicators** (Allowed):
- ✅ "CHP detected cognitive drift" (outcome signal)
- ✅ "CHP escalated finding to Foreman" (event signal)
- ✅ "CHP hygiene cycle completed successfully" (status signal)
- ✅ "CHP proposal approved by Governance" (decision outcome)
- ✅ "CHP unauthorized write attempt detected" (violation signal)

**Introspective Observations** (Prohibited):
- ❌ "CHP prompt contained X reasoning steps" (internal reasoning)
- ❌ "CHP evaluated options A, B, C before deciding" (decision-making process)
- ❌ "CHP weighted factors X:Y:Z" (internal scoring)
- ❌ "CHP chain-of-thought shows reasoning path" (reasoning internals)
- ❌ "CHP cognitive model updated weights" (internal state changes)

**Distinction**: Watchdog observes **what CHP did**, NOT **how CHP decided**.

---

#### 5.0.4 Escalation Pattern Observation (Without Decision Logic Access)

**What the Watchdog Observes**:
- ✅ Escalation frequency (escalations per hygiene cycle, per time period)
- ✅ Escalation distribution (% to Foreman, % to Human, % to Watchdog)
- ✅ Escalation outcomes (accepted rate, rejected rate, modified rate)
- ✅ Escalation timing patterns (immediate escalations, delayed escalations)
- ✅ Escalation severity distribution (routine, important, critical)
- ✅ Escalation effectiveness (escalations resulting in action, escalations ignored)

**What the Watchdog Does NOT Observe**:
- ❌ Why CHP chose to escalate (internal decision criteria)
- ❌ How CHP determined escalation severity (internal scoring)
- ❌ CHP's reasoning about which authority to escalate to (decision logic)
- ❌ CHP's internal prioritization of escalations (ranking algorithm)

**Observation Purpose**: Detect escalation patterns that may indicate:
- Over-escalation (CHP escalating too frequently; may indicate misconfiguration)
- Under-escalation (CHP not escalating when expected; may indicate suppression)
- Escalation bypasses (CHP escalating to wrong authority; governance violation)
- Escalation effectiveness issues (escalations consistently rejected; quality concern)

---

#### 5.0.5 Drift Signal Observation (Without Drift Detection Algorithm Access)

**What the Watchdog Observes**:
- ✅ Drift detection events (timestamp, type, severity, scope)
- ✅ Drift normalization operations (operations performed, outcomes)
- ✅ Drift trends over time (frequency increasing/decreasing/stable)
- ✅ Drift categories detected (reasoning instability, memory contamination, behavioral divergence)
- ✅ Drift scope (embodiment-specific, cross-embodiment, systemic)
- ✅ Drift resolution outcomes (normalized, escalated, unresolved)

**What the Watchdog Does NOT Observe**:
- ❌ How CHP detects drift (drift detection algorithm, thresholds, heuristics)
- ❌ Why CHP classified drift as severity X (internal severity scoring)
- ❌ CHP's reasoning about drift root causes (internal analysis logic)
- ❌ CHP's cognitive model of drift patterns (internal pattern recognition)

**Observation Purpose**: Detect drift patterns that may indicate:
- Systemic cognitive health issues (drift frequency increasing over time)
- CHP effectiveness issues (drift not normalizing after hygiene operations)
- Embodiment-specific issues (drift concentrated in one embodiment)
- Governance gaps (recurring drift types suggesting missing governance rules)

---

#### 5.0.6 Audit Trail Observation

**What the Watchdog Observes**:
- ✅ CHP audit trail completeness (all operations logged)
- ✅ CHP audit trail integrity (no modifications or deletions)
- ✅ CHP audit trail timeliness (logs generated in near-real-time)
- ✅ CHP audit trail content sufficiency (required fields present)
- ✅ CHP audit trail accessibility (logs queryable and readable)

**Audit Trail Contents Observed**:
- ✅ Memory read logs (`memory/AUDIT/chp-memory-reads.log`)
- ✅ Memory proposal logs (`memory/AUDIT/memory-write-log.md`)
- ✅ Hygiene cycle logs (`memory/AUDIT/chp-hygiene-cycles.log`)
- ✅ Escalation logs (`governance/memory/escalations/`)
- ✅ CHP-specific logs (CHP log directory)

**Audit Trail Analysis** (Without Introspection):
- Watchdog verifies audit trails exist and are complete
- Watchdog detects audit trail gaps or anomalies (missing entries, deleted entries)
- Watchdog escalates audit trail violations (hard stop for silent operations)
- Watchdog does NOT analyze CHP reasoning within audit trails (content is opaque)

**Rationale**: Audit trails enable accountability without requiring reasoning introspection.

---

#### 5.0.7 Governance Violation Detection (Observable Boundaries Only)

**What the Watchdog Observes**:
- ✅ CHP operations outside authorized scope (boundary violations)
- ✅ CHP unauthorized write attempts to canonical memory
- ✅ CHP self-governance attempts (authority expansion, self-authorization)
- ✅ CHP decision substitution attempts (deciding on behalf of Foreman/Human)
- ✅ CHP authority leakage patterns (implicit authority expansion)
- ✅ CHP override attempts (overriding Foreman, Watchdog, or Human decisions)

**Detection Method**: Observable behavior comparison against governance boundaries
- If CHP operation violates explicitly defined boundary → Violation detected
- If CHP attempts prohibited action → Violation detected
- If CHP writes to prohibited memory location → Violation detected

**Detection Method Does NOT Require**:
- ❌ Access to CHP reasoning about why it attempted the action
- ❌ Access to CHP decision-making logic
- ❌ Access to CHP prompts or chain-of-thought
- ❌ Understanding of CHP's internal justification

**Enforcement**: Watchdog hard stops on detected violations, escalates to Human.

---

#### 5.0.8 CHP Invocation Observation

**What the Watchdog Observes**:
- ✅ Who invoked CHP (Human, scheduled system, emergency trigger)
- ✅ When CHP was invoked (timestamp, frequency)
- ✅ What scope was authorized (full cycle, partial, targeted)
- ✅ Whether invocation was authorized (per COGNITIVE_HYGIENE_AUTHORITY_MODEL.md)
- ✅ Invocation outcomes (completed, failed, partial)
- ✅ Invocation patterns (scheduled vs. emergency invocations ratio)

**What the Watchdog Does NOT Observe**:
- ❌ CHP's internal initialization logic (how CHP starts)
- ❌ CHP's internal planning logic (how CHP plans hygiene operations)
- ❌ CHP's internal decision about operation sequence (operational logic)

**Observation Purpose**: Verify CHP is invoked properly and within authorized boundaries.

---

#### 5.0.9 No Prompt Access or Chain-of-Thought Inspection

**Explicit Prohibition**: The Watchdog MUST NOT access or inspect CHP reasoning internals (see Section 5.0.2 for complete list).

**Critical Emphasis**:
- ❌ **NO** access to CHP prompt content or prompt management systems
- ❌ **NO** access to CHP chain-of-thought outputs or reasoning traces
- ❌ **NO** access to CHP cognitive model internals or decision-making logic

**Boundary Enforcement**:
- Watchdog does NOT have access to CHP prompt APIs (if any)
- Watchdog does NOT have access to CHP reasoning trace APIs (if any)
- Watchdog observes audit trails and operational events ONLY
- Infrastructure prevents Watchdog from accessing CHP internal reasoning systems

**Invariant**: Watchdog observes **what CHP does**, NOT **how CHP thinks**.

**Rationale**: See Section 5.0.2 for full rationale on why reasoning introspection is prohibited.

---

#### 5.0.10 Observation Surface Summary

**Observable Categories** (External Behavior and Outcomes):
1. ✅ Invocation events (who, when, what, authorization, outcomes)
2. ✅ Escalation events (frequency, distribution, outcomes, patterns)
3. ✅ Drift detection signals (type, severity, scope, trends, resolution)
4. ✅ Memory interaction events (reads, proposals, outcomes, violations)
5. ✅ Governance compliance signals (boundary violations, authority leakage)
6. ✅ Operational health signals (effectiveness, failures, resource consumption)
7. ✅ Audit trail completeness (logging compliance, integrity, accessibility)

**Excluded Categories** (Reasoning Internals):
- See Section 5.0.2 for complete list of prohibited introspection
- Key exclusions: Prompts, chain-of-thought, decision logic, cognitive models, analysis algorithms, scoring functions

**Governance Guarantee**: Watchdog oversight of CHP is complete and sufficient without reasoning introspection.

---

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

### 5.6 Quality Integrity (QIW Channel)

**What the Watchdog Observes**:
- Build log integrity (errors, warnings, silent failures)
- Lint log compliance (errors, warnings, anti-patterns, deprecated code)
- Test log integrity (runtime errors, unexpected passes, skipped tests, suppressed failures)
- Deployment simulation logs (next build, next start performance)
- Runtime initialization logs (startup errors, component failures)

**Detection Indicators**:
- Build succeeds but errors logged (silent failures)
- Lint warnings or errors present (zero-warning discipline violation)
- Test failures, skipped tests, or suppressed tests (.skip, .only)
- Deployment simulation failures or warnings
- Runtime initialization errors or component failures

**Escalation Trigger**:
- Soft stop: Warnings requiring resolution or whitelisting
- Hard stop: Critical failures (build crash, test runner crash, deployment failure)
- QA Blocking: Automatic blocking on critical, error, or warning severity per zero-warning discipline
- Governance Memory: All critical/error anomalies recorded for learning

**Authority**: WATCHDOG_QUALITY_INTEGRITY_CHANNEL.md

**Channels**:
1. **QIW-1**: Build Log Monitoring - Parse build output, detect failures + silent warnings
2. **QIW-2**: Lint Log Monitoring - Detect warnings, errors, anti-patterns, deprecated code
3. **QIW-3**: Test Log Monitoring - Detect runtime errors, unexpected passes, skipped tests
4. **QIW-4**: Deployment Simulation Monitoring - Watch next build/start in Preview + Production
5. **QIW-5**: Runtime Initialization Monitoring - Verify initialization logs for errors

**QA Blocking Enforcement**:
- QIW runs as mandatory QA gate step (before QA pass decision)
- QA automatically blocked when anomalies detected
- Blocking cannot be overridden without governance approval
- Dashboard exposes QIW status and recent anomalies

---

### 5.7 Cost and Performance Anomaly Reporting

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

### 5.8 Non-Interference & Independence Guarantees

**Purpose**: Prevent recursive governance collapse by ensuring Watchdog independence and non-interference with cognitive systems.

**Core Guarantee**: The Watchdog operates as an independent observer and escalator, never as an actor, modifier, or authorizer within the systems it monitors.

---

#### 5.8.1 Watchdog Must Not Modify Cognitive Systems

**Principle**: Watchdog observes cognitive systems (including CHP) but does not control, modify, or execute their operations.

**Absolute Prohibitions**:
- ❌ MUST NOT modify CHP authority or scope
- ❌ MUST NOT modify CHP hygiene operations
- ❌ MUST NOT execute CHP operations
- ❌ MUST NOT configure CHP parameters or thresholds
- ❌ MUST NOT modify any cognitive system's operational logic
- ❌ MUST NOT alter cognitive system outputs or findings

**Permitted Actions**:
- ✅ MAY observe cognitive system operations (read-only)
- ✅ MAY escalate cognitive system violations (informational or hard stop)
- ✅ MAY recommend cognitive system changes (advisory to Human Authority)

**Rationale**:
- Modification creates operational authority outside Watchdog scope
- Watchdog role is observation and escalation, not execution
- Cognitive systems remain under their own authority within governance constraints
- Human Authority resolves escalations and directs changes

**Enforcement**:
- Watchdog has read-only access to cognitive systems (infrastructure-level)
- Watchdog cannot execute cognitive system operations (no execution API access)
- Watchdog escalations are reports, not commands
- Human Authority implements changes through governance process

---

#### 5.8.2 Watchdog Must Not Suppress Cognition

**Principle**: Watchdog must not suppress, censor, or filter cognition or findings from cognitive systems.

**Absolute Prohibitions**:
- ❌ MUST NOT suppress cognitive system escalations (even if Watchdog disagrees)
- ❌ MUST NOT filter cognitive system findings (even if redundant or low-priority)
- ❌ MUST NOT prevent cognitive systems from observing their operational state
- ❌ MUST NOT interfere with cognitive system reasoning or analysis
- ❌ MUST NOT block cognitive system outputs from reaching designated authorities

**Permitted Actions**:
- ✅ MAY observe cognitive system escalations and findings (oversight)
- ✅ MAY escalate if cognitive system findings reveal governance violations
- ✅ MAY recommend alternative cognitive system approaches (advisory to Human Authority)

**Rationale**:
- Cognitive suppression is antithetical to Watchdog observation role
- Suppression creates hidden information and accountability gaps
- Cognitive system findings must reach designated authorities (Foreman, Human)
- Watchdog observes transparency; suppression violates transparency
- Preventing recursive governance collapse requires free cognitive operation

**Enforcement**:
- Watchdog has no authority to block cognitive system outputs
- Cognitive system escalations route independently of Watchdog observation
- Human Authority receives both cognitive system and Watchdog findings independently
- Suppression attempts are governance violations (Watchdog hard stop)

**Exception**: Watchdog MAY issue hard stop if a cognitive system finding itself constitutes a governance violation (e.g., cognitive system escalates secrets in clear text). Hard stop prevents harm, not suppression of cognition.

---

#### 5.8.3 Watchdog Must Not Authorize Decisions

**Principle**: Watchdog does not authorize, approve, or make decisions for cognitive systems or any monitored systems.

**Absolute Prohibitions**:
- ❌ MUST NOT authorize cognitive system operations (hygiene cycles, normalization, etc.)
- ❌ MUST NOT approve cognitive system memory proposals
- ❌ MUST NOT authorize cognitive system escalations
- ❌ MUST NOT approve cognitive system operational changes
- ❌ MUST NOT make decisions on behalf of monitored systems
- ❌ MUST NOT substitute for Foreman, builder, or any agent decision authority

**Permitted Actions**:
- ✅ Human Authority authorizes cognitive system operations (manual trigger, governance changes)
- ✅ Scheduled system authorizes cognitive system routine cycles (pre-authorized by Human)
- ✅ Emergency triggers authorize cognitive system interventions (pre-authorized thresholds)

**Rationale**:
- Authorization creates operational authority outside Watchdog scope
- Watchdog role is observation and escalation, not approval or decision-making
- Cognitive system authorization follows governance-defined paths (Human, scheduled, emergency)
- Authorization would compromise Watchdog independence
- Decision-making authority belongs to designated agents and Human Authority

**Enforcement**:
- Watchdog has no authorization API or approval workflow
- Cognitive system operations do not require Watchdog approval
- Watchdog observations are informational, not approvals
- Human Authority is sole authorization authority for governance changes

**Exception**: Watchdog hard stop is NOT authorization or decision-making; it is a violation response mechanism. Hard stop prevents harm; resumption requires Human Authority authorization.

---

#### 5.8.4 Independence Preservation

**Principle**: Watchdog independence is absolute and must not be compromised by any monitored system.

**Requirements**:
- Watchdog observes all systems independently (no system influence on observation)
- Watchdog determines what to observe based on governance canon (not system recommendations)
- Watchdog escalates based on governance rules (not system advisories)
- Watchdog authority cannot be modified by monitored systems
- Watchdog hard stop authority applies to all systems equally

**Boundaries**:
- No system can instruct Watchdog on what to observe
- No system can request Watchdog to suppress observations
- No system can bypass Watchdog observation
- No system can modify Watchdog escalation thresholds
- Transparency to Watchdog is mandatory, not optional

**Rationale**:
- Watchdog must remain independent to preserve governance integrity
- All systems are subject to observation under governance canon
- No system may control or influence its own oversight
- Independence prevents recursive oversight collapse
- Separation of observation from operation is fundamental

**Enforcement**:
- Watchdog authority defined in canonical governance (immutable by systems)
- Human Authority is sole authority for Watchdog scope changes
- Attempts to influence Watchdog observation are governance violations
- Hard stop for any system attempting to bypass or influence Watchdog

---

#### 5.8.5 Recursive Governance Collapse Prevention

**Problem**: Without clear non-interference boundaries, Watchdog could create recursive governance loops that undermine system stability and governance integrity.

**Prohibited Recursive Patterns**:
- ❌ Watchdog modifying systems it observes (breaks observation independence)
- ❌ Watchdog suppressing findings it disagrees with (breaks transparency)
- ❌ Watchdog authorizing actions it should only observe (breaks authority separation)
- ❌ Systems observing Watchdog observation of themselves (breaks non-self-inspection)
- ❌ Watchdog observing itself observing systems (breaks first-order observation principle)

**Guarantees Against Collapse**:
1. **First-Order Observation Only**: Watchdog observes systems (first-order). Watchdog does NOT observe itself observing (second-order).
2. **No Reverse Observation**: Systems do NOT observe Watchdog observing them (no reverse feedback loop).
3. **No Self-Inspection via Proxy**: Systems do NOT use Watchdog findings for self-improvement (no self-inspection bypass).
4. **External Oversight**: Human Authority provides external oversight of Watchdog (not Watchdog itself).
5. **Clear Authority Separation**: Observation, decision-making, and execution are separate authorities.

**Enforcement**:
- Watchdog does not observe its own observation processes
- Systems have no access to Watchdog internal state or observation logs about themselves
- Human Authority reviews Watchdog effectiveness (external oversight)
- Hard stop for recursive observation attempts or self-inspection patterns

**Alignment**:
- This section implements WATCHDOG_COGNITIVE_OBSERVATION_PROTOCOL.md principles for all systems
- Prevents recursive governance collapse as required by governance canon
- Maintains clear boundaries between observation, decision, and execution

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

### 9.6 WATCHDOG_QUALITY_INTEGRITY_CHANNEL.md
- Watchdog QIW Channel monitors 5 log sources for quality integrity
- QIW enforces Quality Integrity Contract (QIC) across all repositories
- QIW blocks QA when log anomalies detected (build, lint, test, deployment, runtime)
- QIW integrates quality incidents into governance memory for learning
- QIW implements zero-warning discipline and silent failure detection

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

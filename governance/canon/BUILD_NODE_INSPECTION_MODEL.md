# BUILD NODE INSPECTION & DRILL-DOWN GUARANTEES

## Status
Canonical Governance Standard  
Version: v1.0  
Authority: Johan Ras  
Applies To: All Maturion Applications, Foreman (FM), Builders, Wave Execution Systems, Governance Systems  

---

## 1. Purpose

This document defines the **canonical inspection and drill-down model** for all build nodes within the Maturion ecosystem.

Build node inspection ensures that **every node's current state, history, and governance context are transparent and accessible** without inference, enabling:

- Real-time visibility into current node state and status
- Complete historical audit trail of actions and decisions
- Access to governing checks and requirements that apply to the node
- Traceability to evidence artifacts that prove compliance
- Understanding of blocking conditions and outstanding work
- Awareness of STOP conditions and emergency states
- Decision accountability (who authorized what and when)

**Foundational Principle**: **No status without explanation.** Every build node must be fully inspectable to understand **what is happening, why it is happening, who authorized it, and what evidence supports it** — without guessing, inference, or institutional knowledge.

---

## 2. Constitutional Authority

This model derives authority from and implements:
- **BUILD_TREE_EXECUTION_MODEL.md** - Hierarchical build structure, node types, and execution states
- **GOVERNANCE_PURPOSE_AND_SCOPE.md** - Governance as canonical memory, evidence over intent
- **AUDIT_READINESS_MODEL.md** - Evidence catalog, traceability, and audit trail requirements
- **COMMISSIONING_EVIDENCE_MODEL.md** - Evidence over intent, immutable evidence, no silent activation
- **ACTIVATION_STATE_MODEL.md** - Activation state transitions and audit trail
- **FOREMAN_AUTHORITY_AND_SUPERVISION_MODEL.md** - Authority boundaries and supervision requirements
- **COMPLIANCE_AND_STANDARDS_GOVERNANCE.md** - ISO 27001, ISO 31000, NIST CSF alignment

---

## 3. Core Principles

### 3.1 No Status Without Explanation

**Principle**: Every status indicator must be accompanied by complete context explaining its meaning and derivation.

**Requirements**:
- Status displays MUST show why a node has that status
- Status MUST NOT be presented as isolated indicators without context
- Users MUST be able to drill down from any status to its evidence
- No "traffic light" indicators without explanation access

**Anti-Patterns**:
- ❌ Status badge (🟢/🟡/🔴) without explanation of criteria
- ❌ "BLOCKED" without showing what is blocking
- ❌ "COMPLETED" without link to evidence
- ❌ "FAILED" without link to failure details

**Compliant Patterns**:
- ✅ Status badge with hover/click to show status criteria and evidence
- ✅ "BLOCKED: Dependency Step 1.2.3 FAILED" with link to failure report
- ✅ "COMPLETED: All QA GREEN, Evidence: [link]"
- ✅ "FAILED: 3 tests failed, Details: [link]"

---

### 3.2 Complete Historical Visibility

**Principle**: All actions, decisions, and state changes must be recorded and accessible for inspection.

**Requirements**:
- Every state transition MUST be recorded with timestamp, actor, and reason
- Historical states MUST remain accessible (not overwritten)
- Decision history MUST show who authorized what and when
- Evidence MUST be timestamped and immutable

**Enforcement**:
- Append-only audit logs for all state transitions
- Immutable evidence artifacts with creation timestamps
- Decision log with authorization records
- No silent state changes (all changes logged)

---

### 3.3 Evidence-Driven Inspection

**Principle**: Inspection surfaces evidence artifacts, not uninterpreted raw data.

**Requirements**:
- Evidence MUST be linked from inspection interfaces
- Evidence MUST be read-only (no modification via inspection)
- Evidence MUST be contextualized (labeled, described)
- Raw logs MUST be interpreted and contextualized before display

**Boundaries**:
- ✅ Link to QA report (interpreted evidence)
- ✅ Link to architecture document (evidence of design)
- ✅ Link to approval record (evidence of authorization)
- ❌ Raw model reasoning dumps (uninterpreted)
- ❌ Unfiltered CI logs without summary
- ❌ Model internals or prompt chains

---

### 3.4 Authority Accountability

**Principle**: Every decision or state change must be attributable to an authorized actor.

**Requirements**:
- State transitions MUST record authorizing actor (Human/FM/Builder/Gate)
- Decisions MUST record decision-maker and authority basis
- Emergency stops MUST record who triggered and why
- Approvals MUST record approver and timestamp

**Enforcement**:
- Audit trail includes actor identification
- Authorization records are mandatory for state transitions
- Anonymous or unattributed actions are governance violations

---

## 4. Inspection Surface Requirements

### 4.1 Mandatory Inspection Attributes

**Every build node MUST provide inspection access to these attributes**:

#### 4.1.1 Current State
**What**: The node's current operational status  
**Requirements**:
- Current execution state (NOT_STARTED, READY, IN_PROGRESS, BLOCKED, PAUSED, COMPLETED, FAILED, EMERGENCY_STOPPED)
- Current activation state (if applicable: DORMANT, VALIDATED, READ_ONLY, LIMITED, ACTIVE, SUSPENDED, DECOMMISSIONED)
- Time in current state (duration since last state transition)
- State entry timestamp (ISO 8601)

**Presentation**:
- State name displayed prominently
- State description (what this state means)
- Time in state (e.g., "IN_PROGRESS for 45 minutes")
- Link to state definition in governance canon

---

#### 4.1.2 Governing Checks and Requirements
**What**: The governance rules, QA requirements, and gates that apply to this node  
**Requirements**:
- List of applicable governance gates with pass/fail status
- List of required checks (QA, security, architecture)
- Entry criteria for current state
- Exit criteria to advance to next state
- Dependencies that must be satisfied

**Presentation**:
- Checklist of requirements with status indicators
- Link to governance canon documents defining each requirement
- Clear indication of satisfied vs. outstanding requirements
- Blocking requirements highlighted

**Example**:
```
Governing Requirements for Step 1.2.3:
✅ Architecture documented (BUILD_TREE_EXECUTION_MODEL §9.3)
✅ Red QA created and RED (BUILDER_FIRST_PR_MERGE_MODEL §3.1)
⏳ Builder assigned (pending FM assignment)
❌ Build to Green instruction issued (BLOCKED: awaiting FM)
```

---

#### 4.1.3 Evidence Produced
**What**: Links to all evidence artifacts generated by this node  
**Requirements**:
- Links to QA reports (Red QA, Green QA)
- Links to architecture documents
- Links to test results
- Links to approval records
- Links to commissioning evidence
- Evidence artifacts MUST be read-only (no modification)
- Evidence MUST be labeled and dated

**Presentation**:
- Categorized list of evidence by type
- Each evidence item includes: title, type, timestamp, link
- Evidence status (current, superseded, expired)
- No raw unlabeled artifacts

**Example**:
```
Evidence for Sub-Wave 1.2:
- Architecture: Sub-Wave 1.2 Architecture.md (2025-12-24 10:30 UTC)
- Red QA: Sub-Wave 1.2 Red QA Suite (2025-12-24 11:00 UTC)
- Green QA: Sub-Wave 1.2 Green QA Results (2025-12-24 14:00 UTC) ✅
- Approval: FM Approval Record #SB-1.2-001 (2025-12-24 14:15 UTC)
```

---

#### 4.1.4 Audit Reports
**What**: Independent verification and survey reports  
**Requirements**:
- Links to tech survey reports (if applicable)
- Links to authority audit reports
- Links to compliance verification reports
- Links to security scan reports
- Reports MUST be timestamped and immutable

**Presentation**:
- List of audit reports by type
- Each report includes: title, auditor/authority, timestamp, link
- Report status (draft, final, approved)
- Findings summary (if available)

**Example**:
```
Audit Reports for Wave 1:
- Tech Survey: FM Governance Tech Survey (2025-12-20) - Status: GREEN
- Security Audit: CodeQL Security Scan (2025-12-24) - 0 vulnerabilities
- Architecture Review: Wave 1 Architecture Audit (2025-12-22) - Approved
```

---

#### 4.1.5 Decisions Taken
**What**: Record of all decisions affecting this node  
**Requirements**:
- Decision description (what was decided)
- Decision-maker (who authorized)
- Decision timestamp (when)
- Decision authority basis (governance rule that grants authority)
- Decision rationale (why, if documented)
- Link to decision record or approval artifact

**Presentation**:
- Chronological list of decisions
- Each decision includes: description, decision-maker, timestamp, authority, rationale
- Decision authority linked to governance canon
- Irreversible decisions marked

**Example**:
```
Decisions for Step 1.1.1:
1. Builder Assignment (2025-12-24 09:00 UTC)
   - Decision: Assigned to Builder Agent B-001
   - Decision-maker: FM (Foreman)
   - Authority: BUILD_TREE_EXECUTION_MODEL §6.2
   - Rationale: Builder capacity available, expertise match

2. Emergency Stop (2025-12-24 12:30 UTC)
   - Decision: Step emergency-stopped due to security vulnerability
   - Decision-maker: FM (Foreman)
   - Authority: BUILD_TREE_EXECUTION_MODEL §8.2
   - Rationale: Critical SQL injection vulnerability detected in PR

3. Resume Authorization (2025-12-24 14:00 UTC)
   - Decision: Authorized to resume execution
   - Decision-maker: Johan Ras (Human Authority)
   - Authority: BUILD_TREE_EXECUTION_MODEL §8.4
   - Rationale: Vulnerability remediated, additional QA added
```

---

#### 4.1.6 Outstanding Blocking Items
**What**: Current conditions preventing node progress  
**Requirements**:
- List of all active blocking conditions
- Blocking type (dependency, resource, governance, failure)
- Blocking source (which dependency failed, which gate blocked)
- Blocking severity (critical, high, medium, low)
- Unblocking criteria (what must happen to unblock)
- Responsible party for unblocking

**Presentation**:
- Prioritized list of blocking items
- Each item includes: description, type, severity, unblocking criteria, responsible party
- Link to source of block (failed dependency, gate report)
- Estimated unblock time (if available)

**Example**:
```
Blocking Items for Step 2.1.3:
1. [CRITICAL] Dependency Failure
   - Description: Step 1.2.5 FAILED (builds this step's database schema)
   - Type: Dependency
   - Unblocking Criteria: Step 1.2.5 must be remediated and COMPLETED
   - Responsible: Builder B-003 (assigned to Step 1.2.5)
   - Link: Step 1.2.5 Failure Report

2. [HIGH] Governance Gate Failure
   - Description: Architecture completeness check FAILED
   - Type: Governance
   - Unblocking Criteria: Architecture must document error handling strategy
   - Responsible: FM (Foreman)
   - Link: Architecture Gate Report
```

---

#### 4.1.7 STOP Conditions Reached
**What**: Emergency stop conditions and circuit breakers triggered  
**Requirements**:
- STOP condition type (emergency stop, circuit breaker, governance violation)
- STOP trigger (what caused the stop)
- STOP scope (application, wave, sub-wave, step)
- STOP timestamp
- STOP authority (who triggered)
- STOP status (active, investigating, remediated, cleared)
- Recovery criteria (what must happen to clear stop)

**Presentation**:
- Prominent alert if STOP condition active
- STOP condition details (type, trigger, scope, authority)
- Recovery status and criteria
- Link to investigation report (if available)
- Link to remediation plan (if available)

**Example**:
```
🛑 EMERGENCY STOP ACTIVE for Sub-Wave 1.3

STOP Details:
- Type: Emergency Stop (Security Incident)
- Trigger: Critical security vulnerability detected (CVE-2024-XXXXX)
- Scope: Sub-Wave 1.3 and all child steps
- Timestamp: 2025-12-24 13:45 UTC
- Authority: FM (Foreman)
- Authority Basis: BUILD_TREE_EXECUTION_MODEL §8.2

Recovery Status: INVESTIGATING
- Investigation: In Progress (Security Team)
- Remediation: Not Started
- Recovery Criteria:
  1. Vulnerability remediated
  2. Security audit completed
  3. Enhanced QA added
  4. Human Authority (Johan) approval to resume

Links:
- [Investigation Report] (pending)
- [Remediation Plan] (pending)
- [STOP Trigger Evidence] (security scan report)
```

---

### 4.2 Prohibited Inspection Content

**The following MUST NOT be surfaced via inspection interfaces**:

#### 4.2.1 Raw Cognitive Reasoning
**Prohibited**:
- AI model internal reasoning chains
- Uninterpreted "chain of thought" outputs
- Prompt engineering artifacts
- Model internal state or weights

**Rationale**: Raw cognitive reasoning is not evidence and is not auditable. Only **decisions and evidence** are governance-relevant.

**Compliant Alternative**: Provide decision records showing **what was decided** and **evidence supporting the decision**, not how the AI reasoned about it.

---

#### 4.2.2 Model Internals
**Prohibited**:
- Model architecture details
- Token probabilities
- Attention weights
- Model configuration parameters
- Fine-tuning datasets

**Rationale**: Model internals are implementation details, not governance artifacts. Governance cares about **outputs and evidence**, not model mechanics.

---

#### 4.2.3 Uninterpreted Logs Without Context
**Prohibited**:
- Raw CI/CD logs dumped without summary
- Unfiltered console output
- Stack traces without error description
- Log files without context or labels

**Rationale**: Uninterpreted logs require expertise to understand and are not accessible to all stakeholders. Logs must be **interpreted and contextualized** before presentation.

**Compliant Alternative**: Provide log summaries, error descriptions, and contextualized excerpts with explanations.

**Example**:
```
❌ Prohibited:
[View Raw CI Log] (2000 lines of uninterpreted output)

✅ Compliant:
Build Failed: 3 tests failed in authentication module
- Test: test_login_with_invalid_credentials (FAILED)
  Error: Expected HTTP 401, got HTTP 500
  Location: tests/auth/test_login.py:45
  [View Full Test Output]

- Test: test_logout_clears_session (FAILED)
  Error: Session cookie still present after logout
  Location: tests/auth/test_logout.py:23
  [View Full Test Output]

[View Complete Build Log] (contextualized, with summaries)
```

---

## 5. Drill-Down Requirements

### 5.1 Drill-Down Principle

**Users must be able to drill down from high-level summaries to detailed evidence at every level of the build tree.**

**Drill-Down Path Example**:
```
System Dashboard
  ↓ (click application)
Application Overview
  ↓ (click wave)
Wave Status
  ↓ (click sub-wave)
Sub-Wave Details
  ↓ (click step)
Step Inspection (all attributes from §4.1)
  ↓ (click evidence link)
Evidence Artifact (QA report, architecture doc, etc.)
```

### 5.2 Drill-Down Levels

#### Level 1: System-Wide Overview
**Scope**: All applications in Maturion ecosystem  
**Surface**:
- List of applications with status indicators
- High-level metrics (completion rate, failure rate)
- Active STOP conditions across all applications
- Recent decisions by Human Authority

**Drill-Down**: Click application → Application Overview

---

#### Level 2: Application Overview
**Scope**: Single application  
**Surface**:
- Application execution state
- Application activation state
- List of waves with status indicators
- Application-level blocking conditions
- Application-level evidence (requirements, architecture)
- Application-level decisions
- Application-level STOP conditions

**Drill-Down**: Click wave → Wave Status

---

#### Level 3: Wave Status
**Scope**: Single wave  
**Surface**:
- Wave execution state
- List of sub-waves with status indicators
- Wave-level governing checks
- Wave-level evidence
- Wave-level decisions
- Wave-level blocking conditions
- Wave-level STOP conditions

**Drill-Down**: Click sub-wave → Sub-Wave Details

---

#### Level 4: Sub-Wave Details
**Scope**: Single sub-wave  
**Surface**:
- Sub-wave execution state
- List of steps with status indicators
- Sub-wave-level governing checks
- Sub-wave-level evidence
- Sub-wave-level decisions
- Sub-wave-level blocking conditions
- Sub-wave-level STOP conditions

**Drill-Down**: Click step → Step Inspection

---

#### Level 5: Step Inspection (Atomic Level)
**Scope**: Single step  
**Surface**: All mandatory inspection attributes (§4.1)
- Current state (execution + activation)
- Governing checks and requirements
- Evidence produced (QA, architecture, approvals)
- Audit reports
- Decisions taken
- Outstanding blocking items
- STOP conditions reached

**Drill-Down**: Click evidence link → Evidence Artifact

---

#### Level 6: Evidence Artifact
**Scope**: Individual evidence document  
**Surface**:
- Evidence content (read-only)
- Evidence metadata (type, timestamp, creator)
- Evidence status (current, superseded, expired)
- Link back to owning node

**No Further Drill-Down**: This is the leaf level (evidence is atomic)

---

### 5.3 Lateral Navigation

**Users must be able to navigate laterally within a level**:
- From Wave 1 to Wave 2 (same application)
- From Step 1.2.1 to Step 1.2.2 (same sub-wave)
- From one evidence artifact to related artifacts

**Requirements**:
- Navigation controls (Previous/Next) within same level
- Breadcrumb trail showing current position in hierarchy
- "Related Nodes" links (dependencies, blocking nodes, blocked-by nodes)

---

### 5.4 Cross-Cutting Views

**Users must be able to view cross-cutting concerns across the build tree**:

#### 5.4.1 All STOP Conditions
**View**: List of all active STOP conditions across all nodes  
**Filtering**: By type, scope, authority, timestamp  
**Drill-Down**: Click STOP condition → Node with STOP condition

---

#### 5.4.2 All Blocking Conditions
**View**: List of all active blocking conditions across all nodes  
**Filtering**: By type, severity, responsible party  
**Drill-Down**: Click blocking condition → Blocked node

---

#### 5.4.3 All Decisions by Authority
**View**: List of all decisions filtered by decision-maker (Johan/FM/Builder/Gate)  
**Filtering**: By date range, authority type, node type  
**Drill-Down**: Click decision → Node where decision was made

---

#### 5.4.4 All Evidence by Type
**View**: Catalog of all evidence artifacts by type (QA/Architecture/Approval/Audit)  
**Filtering**: By type, date, node, status  
**Drill-Down**: Click evidence → Evidence artifact

---

## 6. Inspection Interface Requirements

### 6.1 Accessibility

**Inspection interfaces MUST be accessible to**:
- Human Authority (Johan) - full access to all levels
- Foreman (FM) - full access to all levels
- Builders - access to assigned steps and parent nodes
- Governance Administrator - full read-only access for audit
- Watchdog - full read-only access for observation

**Access Control**:
- Human Authority has unrestricted access
- FM and Governance Administrator have full read access
- Builders have restricted access (assigned nodes only)
- Watchdog has read-only access (no modification)

---

### 6.2 Real-Time Updates

**Inspection interfaces MUST reflect current state in real-time**:
- State changes reflected immediately (no refresh required)
- Status roll-up from children to parents updates in real-time
- New evidence appears immediately upon creation
- Blocking conditions appear/disappear as they change

**Implementation Notes**:
- WebSocket or polling for live updates
- Visual indicators for recent changes (e.g., "Updated 5 seconds ago")
- No stale data presented as current

---

### 6.3 Audit Trail Immutability

**Audit trail data displayed via inspection MUST be immutable**:
- Historical state transitions cannot be modified via inspection
- Evidence artifacts are read-only
- Decision records are read-only
- Timestamps cannot be altered

**Enforcement**:
- Inspection interfaces provide read-only views only
- Modification requires separate authorization workflows
- Modification history is itself logged (audit trail of audit trail)

---

### 6.4 Responsive Design

**Inspection interfaces MUST be usable across devices**:
- Desktop browser (primary interface)
- Mobile browser (summary views, drill-down capable)
- Terminal/CLI (for automated tooling and CI/CD integration)

**Responsive Behavior**:
- Desktop: Full detail, multi-column layouts
- Mobile: Stacked views, collapsible sections
- CLI: Text-based hierarchical views, JSON output for tooling

---

## 7. Integration with Existing Governance

### 7.1 Build Tree Execution Model Integration

**BUILD_TREE_EXECUTION_MODEL.md Alignment**:
- Inspection surfaces execution states defined in BUILD_TREE_EXECUTION_MODEL §4
- Inspection surfaces status roll-up semantics from BUILD_TREE_EXECUTION_MODEL §5
- Inspection surfaces authority boundaries from BUILD_TREE_EXECUTION_MODEL §6
- Inspection surfaces emergency stop details from BUILD_TREE_EXECUTION_MODEL §8

**Contribution**: Defines **how** build tree state is made visible and accessible.

---

### 7.2 Activation State Model Integration

**ACTIVATION_STATE_MODEL.md Alignment**:
- Inspection surfaces activation states (DORMANT, VALIDATED, READ_ONLY, etc.)
- Inspection surfaces activation state transitions and audit trail
- Inspection surfaces activation authorizations

**Contribution**: Defines inspection requirements for activation state visibility.

---

### 7.3 Audit Readiness Model Integration

**AUDIT_READINESS_MODEL.md Alignment**:
- Inspection provides self-service audit access to evidence
- Inspection surfaces evidence catalog and control mappings
- Inspection supports continuous audit readiness
- Inspection maintains evidence immutability

**Contribution**: Defines inspection requirements that support audit activities.

---

### 7.4 Commissioning Evidence Model Integration

**COMMISSIONING_EVIDENCE_MODEL.md Alignment**:
- Inspection surfaces commissioning evidence (not just operational evidence)
- Inspection enforces "evidence over intent" principle
- Inspection shows evidence lifecycle (current, superseded, expired)
- Inspection supports human authority approval workflows

**Contribution**: Defines inspection requirements for commissioning transparency.

---

### 7.5 Foreman Authority Model Integration

**FOREMAN_AUTHORITY_AND_SUPERVISION_MODEL.md Alignment**:
- Inspection shows FM decisions and authority basis
- Inspection shows FM supervision activities (QA creation, builder assignment)
- Inspection surfaces POLC (Plan, Organize, Lead, Control) evidence
- Inspection enables FM accountability

**Contribution**: Defines inspection requirements for FM supervision transparency.

---

## 8. Compliance and Standards Alignment

### 8.1 ISO 27001 Alignment

This inspection model satisfies:

- **A.12.4.1 (Event Logging)**: Audit trail inspection provides event log access
- **A.12.4.2 (Protection of Log Information)**: Immutable audit trail display prevents tampering
- **A.12.4.3 (Administrator and Operator Logs)**: Decision logs show administrator (FM/Johan) actions
- **A.12.4.4 (Clock Synchronization)**: Timestamps in ISO 8601 format ensure time synchronization
- **A.16.1.7 (Collection of Evidence)**: Evidence inspection provides auditable evidence access

---

### 8.2 NIST CSF Alignment

This inspection model supports:

- **ID.AM-1 (Asset Inventory)**: Build tree inspection provides inventory visibility
- **DE.CM-1 (Network Monitoring)**: Real-time inspection enables monitoring
- **DE.CM-7 (Monitoring for Unauthorized Activity)**: Audit trail inspection enables unauthorized activity detection
- **RS.AN-1 (Notifications from Detection Systems)**: STOP conditions and blocking items provide alert visibility
- **RS.AN-2 (Impact of Incidents)**: Drill-down enables impact analysis

---

### 8.3 ISO 31000 Alignment (Risk Management)

This inspection model supports:

- **Risk Identification**: Blocking conditions and STOP conditions surface risks
- **Risk Assessment**: Drill-down enables impact and likelihood assessment
- **Risk Treatment**: Unblocking criteria show risk treatment actions
- **Monitoring and Review**: Real-time inspection enables continuous risk monitoring

---

## 9. Implementation Guidance

### 9.1 Minimum Viable Inspection (MVI)

**For initial implementation, prioritize**:
1. Current state display (§4.1.1)
2. Blocking conditions (§4.1.6)
3. STOP conditions (§4.1.7)
4. Drill-down from Application → Wave → Sub-Wave → Step (§5.2)

**Then add**:
5. Evidence links (§4.1.3)
6. Decisions taken (§4.1.5)
7. Governing checks (§4.1.2)
8. Audit reports (§4.1.4)

**Finally add**:
9. Cross-cutting views (§5.4)
10. Lateral navigation (§5.3)
11. Real-time updates (§6.2)
12. Responsive design (§6.4)

---

### 9.2 Data Sources

**Inspection interfaces retrieve data from**:
- Build tree state database (execution states, activation states)
- Audit trail database (state transitions, decisions)
- Evidence catalog (evidence artifacts, links)
- Governance gate results (gate pass/fail, blocking conditions)
- Emergency stop registry (STOP conditions, recovery status)

**Data Integrity**:
- All data sources are append-only or immutable
- No retroactive modification
- Complete audit trail of data changes

---

### 9.3 Performance Considerations

**Real-time inspection at scale requires**:
- Efficient state roll-up algorithms (child state aggregation)
- Caching of frequently accessed data (with invalidation on change)
- Lazy loading of evidence artifacts (load on-demand, not eagerly)
- Pagination for large lists (e.g., hundreds of steps)

**Performance SLAs**:
- Current state display: < 1 second
- Drill-down navigation: < 2 seconds
- Evidence artifact load: < 3 seconds
- Cross-cutting views: < 5 seconds (may require indexing)

---

### 9.4 API Requirements

**Inspection data MUST be accessible via API for**:
- Programmatic access by governance tooling
- CLI interfaces
- Automated reporting
- External dashboards

**API Characteristics**:
- RESTful or GraphQL
- Authentication and authorization enforced
- Read-only (no state modification)
- Rate-limited to prevent abuse
- Versioned to support evolution

---

## 10. Roles and Responsibilities

### 10.1 Human Authority (Johan) Responsibilities

**Inspection Usage**:
- Review system-wide overview for situational awareness
- Drill down to investigate STOP conditions or blocking issues
- Review decisions for accountability and alignment
- Access audit reports for compliance verification

**Authority**:
- Full unrestricted access to all inspection interfaces
- May request additional inspection capabilities
- Final authority on inspection requirements

---

### 10.2 Foreman (FM) Responsibilities

**Inspection Usage**:
- Monitor all nodes for status and blocking conditions
- Review builder progress on assigned steps
- Verify evidence completeness before approval
- Investigate failures and emergency stops

**Authority**:
- Full read access to all inspection interfaces
- No authority to modify inspection data
- Recommends inspection enhancements

---

### 10.3 Builder Responsibilities

**Inspection Usage**:
- View assigned step status and requirements
- Review Red QA and governing checks for assigned steps
- Access evidence produced by own work
- Monitor blocking conditions affecting assigned work

**Authority**:
- Restricted access (assigned nodes and parents only)
- No access to other builders' steps (unless dependencies)
- No authority to modify inspection data

---

### 10.4 Governance Administrator Responsibilities

**Inspection Usage**:
- Audit inspection data for compliance
- Verify evidence completeness and traceability
- Monitor governance gate results
- Detect governance violations via cross-cutting views

**Authority**:
- Full read-only access to all inspection interfaces
- No authority to modify node state or evidence
- Escalates anomalies to Johan

---

### 10.5 Watchdog Responsibilities

**Inspection Usage**:
- Observe node states for cognitive hygiene
- Detect drift, anomalies, or governance violations
- Monitor decision patterns for authority violations
- Track emergency stop frequency and patterns

**Authority**:
- Full read-only access to all inspection interfaces
- No authority to modify or suppress data
- Escalates violations to Human Authority

---

## 11. Anti-Patterns and Violations

### 11.1 Status Without Context
**Violation**: Displaying status indicators without explanation or drill-down capability  
**Severity**: HIGH  
**Remediation**: Add context and drill-down links to all status displays

---

### 11.2 Inaccessible Evidence
**Violation**: Evidence exists but is not linked from inspection interfaces  
**Severity**: HIGH  
**Remediation**: Link all evidence artifacts from parent nodes

---

### 11.3 Anonymous Decisions
**Violation**: Decisions recorded without decision-maker or authority basis  
**Severity**: CRITICAL  
**Remediation**: Record decision-maker and authority for all decisions

---

### 11.4 Stale Status
**Violation**: Inspection displaying outdated state information  
**Severity**: MEDIUM  
**Remediation**: Implement real-time updates or add "Last Updated" timestamps

---

### 11.5 Uninterpreted Logs
**Violation**: Dumping raw logs without summary or context  
**Severity**: MEDIUM  
**Remediation**: Provide log summaries and contextualized excerpts

---

### 11.6 Broken Drill-Down
**Violation**: Drill-down links leading to 404 or missing data  
**Severity**: HIGH  
**Remediation**: Validate all drill-down links, ensure evidence artifacts exist

---

### 11.7 Authority Bypass
**Violation**: Builder accessing inspection data for unassigned nodes  
**Severity**: HIGH  
**Remediation**: Enforce access control per §6.1

---

## 12. Success Criteria

This build node inspection model succeeds when:

✅ **Every build node is fully inspectable without inference**  
✅ **All mandatory inspection attributes (§4.1) are accessible for every node**  
✅ **Drill-down from system to evidence is complete and functional**  
✅ **No status displays exist without explanation or context**  
✅ **All evidence is linked and accessible (read-only)**  
✅ **All decisions are attributed to authorized actors**  
✅ **STOP conditions and blocking items are prominent and actionable**  
✅ **Inspection supports self-service audit**  
✅ **Real-time state visibility enables effective supervision**  
✅ **Human Authority has complete situational awareness**

---

## 13. Changelog

### Version 1.0 (2025-12-24)

**Status**: Initial Release  
**Authority**: Johan Ras  
**Trigger**: Issue G-C9 — Define Build Node Inspection & Drill-Down Guarantees

**Summary**: Created canonical build node inspection model defining what must be surfaced for every build node, explicit exclusions (raw cognitive reasoning, model internals, uninterpreted logs), drill-down requirements from system to evidence, and the foundational principle of "No status without explanation."

**Key Requirements Established**:
- Seven mandatory inspection attributes for every node (current state, governing checks, evidence, audit reports, decisions, blocking items, STOP conditions)
- Explicit prohibition of raw cognitive reasoning, model internals, and uninterpreted logs
- Six-level drill-down hierarchy (System → Application → Wave → Sub-Wave → Step → Evidence)
- Cross-cutting views for STOP conditions, blocking conditions, decisions, and evidence
- Real-time inspection with immutable audit trails
- Role-based access control (Human Authority, FM, Builders, Governance Administrator, Watchdog)
- Integration with BUILD_TREE_EXECUTION_MODEL, ACTIVATION_STATE_MODEL, AUDIT_READINESS_MODEL, COMMISSIONING_EVIDENCE_MODEL

**Effect**: All build execution systems MUST now provide inspection interfaces conforming to this model, enabling complete transparency, accountability, and situational awareness without inference or institutional knowledge.

---

**End of BUILD NODE INSPECTION & DRILL-DOWN GUARANTEES**

---

**Document Metadata**:
- Document ID: BUILD_NODE_INSPECTION_MODEL_V1.0
- Authority: Canonical Governance Standard
- Integrates With: BUILD_TREE_EXECUTION_MODEL.md, ACTIVATION_STATE_MODEL.md, AUDIT_READINESS_MODEL.md, COMMISSIONING_EVIDENCE_MODEL.md, FOREMAN_AUTHORITY_AND_SUPERVISION_MODEL.md, GOVERNANCE_PURPOSE_AND_SCOPE.md, COMPLIANCE_AND_STANDARDS_GOVERNANCE.md
- Enforcement: Governance Gates + Foreman Supervision + Real-Time Monitoring + Audit Verification

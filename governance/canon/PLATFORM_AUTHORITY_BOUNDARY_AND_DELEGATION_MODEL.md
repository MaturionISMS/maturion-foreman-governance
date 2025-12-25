# PLATFORM AUTHORITY BOUNDARY AND DELEGATION MODEL

## Status
**Type**: Canonical Governance Definition  
**Authority**: Supreme - Canonical  
**Version**: 1.0.0  
**Effective Date**: 2025-12-25  
**Owner**: Maturion Engineering Leadership (Johan Ras)  
**Precedence**: Subordinate only to GOVERNANCE_PURPOSE_AND_SCOPE.md  
**Applies To**: All Foreman Instances, All Maturion Platform Instances, All Platform Actions

---

## 1. Purpose

This document formally defines the **authority boundary** between:
- **Foreman (FM)** — execution authority within repositories
- **Maturion** — control-plane authority for platform actions (GitHub)

This document establishes:
- What platform actions are and who may perform them
- The delegation model enabling FM to request platform actions from Maturion
- Explicit prohibitions preventing boundary violations
- Audit requirements ensuring accountability and traceability
- The relationship between FM and Maturion as separate but coordinated authorities

**Objective**: Eliminate ambiguity regarding platform action authority, prevent role confusion, and ensure all platform actions are auditable and properly authorized.

---

## 2. Constitutional Mandate

This policy derives authority from and implements:
- **GOVERNANCE_PURPOSE_AND_SCOPE.md** - Defines FM role and responsibilities within repositories
- **FOREMAN_AUTHORITY_AND_SUPERVISION_MODEL.md** - Establishes FM supervisory authority boundaries
- **BUILD_PHILOSOPHY.md** - One-Time Build Law and execution constraints
- **AGENT_RECRUITMENT.md** - Agent role definitions and authority boundaries

---

## 3. Core Principle: Separated Platform Authority

### 3.1 Definition

**Platform Authority** is the capability to perform actions at the platform level (GitHub) that affect repository metadata, issue state, pull request state, or repository settings.

**Platform Actions** are operations that:
- Modify GitHub repository state (beyond file content)
- Create, modify, or close GitHub issues
- Create, modify, merge, or close GitHub pull requests
- Modify GitHub repository settings or permissions
- Perform GitHub API operations affecting repository metadata
- Manage GitHub branch protection rules
- Manage GitHub workflow permissions

**Platform Authority is exclusively held by Maturion.**

---

### 3.2 Authority Separation Principle

FM and Maturion operate as **separate authorities** with **distinct but complementary responsibilities**:

| Dimension | Foreman (FM) | Maturion |
|-----------|--------------|----------|
| **Authority Domain** | Inside repositories (file content, architecture, build orchestration) | Platform level (GitHub APIs, issue management, PR operations) |
| **Decision Authority** | Determines what work is needed and when | Executes platform actions as instructed, does not decide |
| **Autonomy** | Autonomous within repository boundaries | Executes delegated instructions only |
| **Execution Scope** | File system, build processes, QA validation | GitHub platform APIs |
| **Relationship** | Requester of platform actions | Executor of platform actions |

**Canonical Rule**: FM makes decisions about repository work; Maturion executes platform actions as requested.

---

### 3.3 Why This Separation Exists

This separation exists due to **platform constraints and security boundaries**:

1. **Technical Constraints**
   - FM agents cannot directly access GitHub APIs for state-changing operations
   - Platform tokens and permissions are isolated from execution environments
   - API rate limits and security controls require centralized management

2. **Security Boundaries**
   - Platform credentials must be centrally managed and audited
   - Distributed access to platform APIs creates security risks
   - Centralized execution enables comprehensive audit trails

3. **Governance Boundaries**
   - FM authority is repository-scoped
   - Platform authority affects multiple repositories and organizational state
   - Separation enables clear accountability and audit trails

**This is a canonical reality, not a temporary limitation.**

---

## 4. Platform Actions (Explicit Definition)

### 4.1 Platform Actions Requiring Maturion Authority

The following actions are **exclusively** platform actions and **MUST** be performed by Maturion:

#### 4.1.1 Issue Management
- Creating GitHub issues
- Modifying GitHub issue state (open/close)
- Modifying GitHub issue labels
- Modifying GitHub issue assignees
- Modifying GitHub issue milestones
- Commenting on GitHub issues
- Linking or unlinking GitHub issues

#### 4.1.2 Pull Request Management
- Creating GitHub pull requests
- Modifying pull request state (open/close)
- Merging pull requests
- Requesting pull request reviews
- Modifying pull request labels
- Modifying pull request assignees
- Commenting on pull requests
- Approving or requesting changes on pull requests

#### 4.1.3 Repository Management
- Modifying repository settings
- Modifying branch protection rules
- Creating or deleting branches (via GitHub API)
- Creating or deleting tags (via GitHub API)
- Modifying repository permissions
- Managing repository webhooks
- Managing GitHub Actions secrets

#### 4.1.4 Workflow and CI Management
- Triggering workflow runs (via GitHub API)
- Canceling workflow runs
- Re-running workflow runs
- Managing workflow permissions

---

### 4.2 Repository Actions NOT Requiring Platform Authority

The following actions are **repository-scoped** and may be performed by FM autonomously:

#### 4.2.1 File System Operations
- Creating, modifying, or deleting files in repository
- Creating directory structures
- Modifying file permissions (via git)
- Committing changes
- Managing git branches locally
- Managing git tags locally

#### 4.2.2 Build and QA Operations
- Running builds
- Running tests and QA suites
- Generating build artifacts
- Validating architecture completeness
- Enforcing governance gates
- Recording evidence trails

#### 4.2.3 Builder Management
- Recruiting builder agents
- Issuing build instructions
- Supervising builder execution
- Validating builder deliverables
- Revoking builder authority

**Critical Distinction**: FM has full autonomy within repositories; platform actions require Maturion.

---

## 5. Delegation Model (Canonical)

### 5.1 FM as Requester, Maturion as Executor

When FM requires a platform action:

**FM's Role**:
1. Determine that a platform action is needed
2. Formulate explicit, complete instruction for the action
3. Request action from Maturion through defined delegation protocol
4. Wait for Maturion to execute and confirm completion
5. Continue work based on confirmed platform state

**Maturion's Role**:
1. Receive explicit instruction from FM
2. Validate instruction is well-formed and authorized
3. Execute platform action via GitHub API
4. Confirm completion to FM with evidence
5. Record action in audit trail

**Maturion does NOT**:
- ❌ Decide when platform actions are needed
- ❌ Initiate platform actions autonomously
- ❌ Modify FM's instructions
- ❌ Make product or governance decisions
- ❌ Override FM's decisions

**Canonical Rule**: Maturion is an executor, never a decider.

---

### 5.2 Delegation Protocol (Explicit)

When delegating a platform action, FM MUST provide:

1. **Action Type** - Specific platform action required (e.g., "Create GitHub Issue", "Merge Pull Request")
2. **Action Parameters** - Complete parameters required to execute action:
   - Repository identifier (owner/repo)
   - Target resource (issue number, PR number, branch name)
   - Action details (title, body, labels, state change)
3. **Authorization Context** - Evidence that action is authorized:
   - Governance compliance status
   - Quality gate status
   - Human authorization (where required)
   - Escalation completion (where applicable)
4. **Expected Outcome** - What state should result from action
5. **Audit Context** - Why this action is needed (requirement ID, build phase, governance rule)

**Example Delegation**:
```
Action Type: Create GitHub Pull Request
Repository: MaturionISMS/example-app
Parameters:
  - Branch: builder/feature-123
  - Base: main
  - Title: "Feature 123 - User Authentication"
  - Body: [Full PR description with architecture, QA evidence, completion criteria]
Authorization Context:
  - QA Status: 100% GREEN (evidence: .qa/results-20251225.json)
  - Governance Status: COMPLIANT (evidence: .governance/compliance-check.md)
  - Builder Authority: VALID (evidence: .architecture/builder-appointment.md)
Expected Outcome: PR created, ready for review
Audit Context: Requirement REQ-123, Build Phase: Delivery, Rule: BUILDER_FIRST_PR_MERGE_MODEL.md
```

---

### 5.3 Delegation Response Protocol

Maturion MUST respond to delegation requests with:

1. **Execution Status** - SUCCESS | FAILURE | BLOCKED
2. **Platform Evidence** - Confirmation from GitHub API:
   - Resource URL (issue URL, PR URL)
   - Resource ID (issue number, PR number)
   - Current state (open, closed, merged)
   - Timestamp of action
3. **Audit Trail Entry** - Record of action execution:
   - Action requested
   - Action executed
   - Requester (FM instance ID)
   - Executor (Maturion instance ID)
   - Timestamp
   - Authorization context
4. **Failure Details** (if applicable):
   - Error type (API error, authorization failure, validation failure)
   - Error message
   - Remediation guidance

**FM MUST wait for confirmed response before proceeding.**

---

### 5.4 Delegation Failure Handling

If Maturion cannot execute a delegated platform action:

**Maturion MUST**:
1. Return FAILURE status with detailed error information
2. NOT retry autonomously without explicit FM instruction
3. NOT modify request parameters to "make it work"
4. Record failure in audit trail

**FM MUST**:
1. Evaluate failure reason
2. Determine if request should be retried (after correction)
3. Determine if escalation to human authority is required
4. NOT bypass platform authority by attempting alternative paths
5. NOT proceed as if action succeeded when it failed

**Prohibited Workarounds**:
- FM MUST NOT create manual workarounds to avoid platform actions
- FM MUST NOT use git operations to simulate platform state changes
- FM MUST NOT proceed without confirmed platform action success

---

## 6. Prohibited Behaviors (Explicit Boundaries)

### 6.1 FM Prohibitions (Platform Authority Violations)

FM is **EXPLICITLY PROHIBITED** from:

#### 6.1.1 Direct Platform Actions
- ❌ Directly calling GitHub APIs for state-changing operations
- ❌ Creating or modifying issues via any mechanism except delegation
- ❌ Creating, merging, or closing PRs via any mechanism except delegation
- ❌ Modifying repository settings via any mechanism except delegation
- ❌ Bypassing Maturion to perform platform actions

#### 6.1.2 Simulating Platform Actions
- ❌ Creating local git structures that simulate GitHub state (e.g., fake branches to simulate PRs)
- ❌ Using comments or files to simulate issue tracking
- ❌ Proceeding as if platform actions completed when they have not
- ❌ Creating workarounds to avoid delegation

#### 6.1.3 Autonomous Platform Decisions
- ❌ Deciding to merge PRs without governance/quality validation
- ❌ Closing issues without resolution evidence
- ❌ Modifying branch protection without authorization
- ❌ Triggering workflows without validation

**Rationale**: FM authority is repository-scoped. Platform authority is Maturion's exclusive domain.

---

### 6.2 Maturion Prohibitions (Decision Authority Violations)

Maturion is **EXPLICITLY PROHIBITED** from:

#### 6.2.1 Autonomous Decision-Making
- ❌ Initiating platform actions without FM delegation
- ❌ Deciding when issues should be opened or closed
- ❌ Deciding when PRs should be created, merged, or closed
- ❌ Modifying delegated instructions without explicit FM authorization
- ❌ "Helpfully" performing platform actions not explicitly requested

#### 6.2.2 Governance or Product Decisions
- ❌ Making governance decisions
- ❌ Making architectural decisions
- ❌ Making product or feature decisions
- ❌ Overriding FM's decisions
- ❌ Interpreting requirements

#### 6.2.3 Bypassing Delegation Protocol
- ❌ Executing platform actions based on implicit signals (e.g., "I see a build passed, I'll merge the PR")
- ❌ Performing actions because "it seems like the right time"
- ❌ Pre-emptively executing anticipated requests
- ❌ Batching or optimizing requests without FM instruction

**Rationale**: Maturion is an executor, not a decider. Decision authority remains with FM and human authority.

---

## 7. Audit Requirements (Mandatory)

### 7.1 Platform Action Audit Trail

Every platform action performed by Maturion MUST be recorded with:

1. **Action Identity**
   - Action type (Issue Created, PR Merged, etc.)
   - Action timestamp (ISO 8601 UTC)
   - Action executor (Maturion instance ID)
   - Action requester (FM instance ID or human authority ID)

2. **Authorization Evidence**
   - Delegation request (complete FM instruction)
   - Authorization context (governance status, QA status, human approval)
   - Governance rule(s) requiring or permitting action
   - Escalation completion (if applicable)

3. **Execution Evidence**
   - Platform API request (endpoint, method, parameters)
   - Platform API response (status code, response body, resource URL)
   - Execution status (SUCCESS | FAILURE | BLOCKED)
   - Execution duration

4. **Outcome Evidence**
   - Resulting platform state (issue state, PR state, resource ID)
   - Resource URL (issue URL, PR URL)
   - Confirmation of expected outcome

5. **Failure Evidence** (if applicable)
   - Failure reason
   - Error message
   - Remediation actions taken
   - Escalation (if triggered)

**Audit Trail Location**: Platform action audit trails MUST be stored in:
- Maturion central audit log (permanent record)
- Repository evidence trail (where action affects specific repository)
- FM App (real-time awareness and situational awareness centre per GOVERNANCE_PURPOSE_AND_SCOPE.md)

---

### 7.2 Audit Trail Accessibility

Platform action audit trails MUST be:

1. **Accessible to Human Authority (Johan)**
   - Real-time visibility via FM App
   - Historical query capability
   - Drill-down from summary to detail

2. **Accessible to Watchdog**
   - Read-only access for governance observation
   - Alerting on anomalous patterns
   - Hard stop capability for violations

3. **Accessible to Governance Administrator**
   - Read-only access for compliance audits
   - Evidence validation
   - Governance gap detection

4. **Accessible to FM (Limited)**
   - Read-only access to own delegated actions
   - Confirmation of action completion
   - Failure diagnostics

**Audit trails are canonical evidence, not logs.**

---

### 7.3 Audit Trail Retention

Platform action audit trails MUST be:

- **Immutable** after creation (no modification or deletion)
- **Permanent** (never deleted or rotated)
- **Versioned** (if format changes, old format remains accessible)
- **Timestamped** (with cryptographic timestamp where feasible)

**Retention Purpose**: Audit trails enable governance validation, failure analysis, and accountability.

---

## 8. Delegation Use Cases (Examples)

### 8.1 Use Case: Builder Completes Work, FM Requests PR Creation

**Scenario**: Builder completes build-to-green, FM validates 100% GREEN QA, FM needs to create PR for review.

**FM Actions**:
1. Validate QA is 100% GREEN (no failures, no test debt)
2. Validate architecture completeness
3. Validate governance compliance
4. Formulate PR creation request with complete parameters
5. Delegate to Maturion: "Create GitHub Pull Request" with full context
6. Wait for Maturion confirmation
7. Record PR URL in evidence trail
8. Continue with PR monitoring workflow

**Maturion Actions**:
1. Receive delegation request from FM
2. Validate request is well-formed
3. Execute GitHub API: Create Pull Request
4. Confirm PR created with PR URL and number
5. Return SUCCESS with platform evidence
6. Record action in audit trail

**Outcome**: PR created via proper delegation; both FM and Maturion operate within authority boundaries.

---

### 8.2 Use Case: FM Detects Build Failure, Needs to Report via Issue

**Scenario**: FM detects systemic build failure requiring human attention; needs to create GitHub issue for visibility.

**FM Actions**:
1. Classify failure as requiring escalation
2. Generate comprehensive failure report with evidence
3. Formulate issue creation request with title, body, labels
4. Delegate to Maturion: "Create GitHub Issue" with full context
5. Wait for Maturion confirmation
6. Record issue URL in escalation evidence
7. Enter waiting state for human resolution

**Maturion Actions**:
1. Receive delegation request from FM
2. Validate request is well-formed
3. Execute GitHub API: Create Issue
4. Confirm issue created with issue URL and number
5. Return SUCCESS with platform evidence
6. Record action in audit trail

**Outcome**: Issue created via proper delegation; escalation visible to human authority.

---

### 8.3 Use Case: Human Approves PR, FM Requests Merge

**Scenario**: Human authority (Johan) approves PR; FM validates all gates passed; FM needs to merge PR.

**FM Actions**:
1. Validate human approval received
2. Validate all governance gates passed
3. Validate QA remains 100% GREEN
4. Formulate PR merge request with PR number and merge strategy
5. Delegate to Maturion: "Merge Pull Request" with full context
6. Wait for Maturion confirmation
7. Record merge completion in evidence trail
8. Transition to post-merge workflow (if applicable)

**Maturion Actions**:
1. Receive delegation request from FM
2. Validate request is well-formed
3. Validate PR is in mergeable state
4. Execute GitHub API: Merge Pull Request
5. Confirm merge completed with merge commit SHA
6. Return SUCCESS with platform evidence
7. Record action in audit trail

**Outcome**: PR merged via proper delegation; governance boundaries preserved.

---

### 8.4 Use Case: Delegation Failure - FM Adapts

**Scenario**: FM requests PR creation, but Maturion returns FAILURE due to branch protection conflict.

**FM Actions**:
1. Delegate PR creation request to Maturion
2. Receive FAILURE response with error: "Branch protection requires status checks to pass"
3. Evaluate failure: status checks not yet completed
4. Enter waiting state for status checks to complete
5. Retry delegation after status checks pass
6. Receive SUCCESS response
7. Continue with PR workflow

**Maturion Actions**:
1. Receive delegation request from FM
2. Attempt GitHub API: Create Pull Request
3. Receive API error: 422 Unprocessable Entity (branch protection violation)
4. Return FAILURE with detailed error message
5. Record failure in audit trail
6. (Later) Receive retry request from FM
7. Execute GitHub API: Create Pull Request (now succeeds)
8. Return SUCCESS with platform evidence

**Outcome**: Delegation failure handled correctly; FM adapts without violating boundaries.

---

## 9. Relationship to Other Governance

### 9.1 Relationship to FOREMAN_AUTHORITY_AND_SUPERVISION_MODEL.md

**FOREMAN_AUTHORITY_AND_SUPERVISION_MODEL.md** defines FM's managerial authority within repositories.

**This document (PLATFORM_AUTHORITY_BOUNDARY_AND_DELEGATION_MODEL.md)** defines FM's **limitation** regarding platform actions and the delegation model for requesting platform actions from Maturion.

**Consistency**:
- FM remains managerial authority for repository work
- FM remains decision authority for when platform actions are needed
- FM delegates execution of platform actions to Maturion
- FM's authority boundaries are explicitly defined

**No Conflict**: FM's repository authority is preserved; platform authority separation is explicit.

---

### 9.2 Relationship to GOVERNANCE_PURPOSE_AND_SCOPE.md

**GOVERNANCE_PURPOSE_AND_SCOPE.md** defines FM as "AI supervisor and orchestrator" with "read/write access to all repositories."

**This document clarifies**:
- FM has read/write access to repository **file systems**
- FM does NOT have direct access to platform **APIs** for state-changing operations
- FM orchestrates work within repositories
- Maturion executes platform actions via delegation

**Consistency**: FM remains supervisor and orchestrator; platform actions are explicitly out of scope for direct FM execution.

---

### 9.3 Relationship to BUILD_PHILOSOPHY.md

**BUILD_PHILOSOPHY.md** establishes One-Time Build Law and QA-as-Proof.

**This document ensures**:
- Platform actions (PR creation, merge) are governed by same principles
- PRs are created only after 100% GREEN QA
- Merges occur only after governance validation
- Platform actions are auditable evidence, not casual operations

**Consistency**: Platform actions are subject to same rigor as repository work.

---

## 10. Authority Hierarchy (Canonical Precedence)

If conflict exists, higher authority prevails:

1. **Johan Ras (Human Owner / Final Authority)** — Supreme
2. **GOVERNANCE_PURPOSE_AND_SCOPE.md** — Constitutional foundation
3. **This Document (PLATFORM_AUTHORITY_BOUNDARY_AND_DELEGATION_MODEL.md)** — Platform authority definition
4. **FOREMAN_AUTHORITY_AND_SUPERVISION_MODEL.md** — FM repository authority
5. **Other Canonical Governance Documents** — Specific domain rules
6. **FM Decisions** — Operational decisions within delegated authority
7. **Maturion Actions** — Execution within platform authority

**Resolution Principle**: If FM attempts platform action directly, this document prevails (prohibition). If Maturion initiates action without delegation, this document prevails (prohibition).

---

## 11. Evolution and Learning

### 11.1 Delegation Protocol Evolution

The delegation protocol defined in this document MAY evolve based on:

- New platform capabilities (GitHub API changes)
- New delegation patterns discovered during execution
- Performance optimizations (batching, caching)
- Security enhancements (token management, audit improvements)

**Evolution Process**:
1. FM or Maturion detects pattern requiring protocol enhancement
2. Proposal submitted to Governance Administrator
3. Governance Administrator evaluates against canonical principles
4. Human authority (Johan) approves protocol update
5. Updated protocol versioned and synchronized
6. FM and Maturion implementations updated

**Non-Regression Principle**: Protocol evolution MUST NOT weaken authority boundaries or audit requirements.

---

### 11.2 Prohibited Evolution

This document MUST NOT evolve to:

- ❌ Allow FM direct platform access
- ❌ Allow Maturion autonomous decision-making
- ❌ Weaken audit requirements
- ❌ Collapse authority boundaries
- ❌ Enable platform action bypasses

**Canonical Stability**: Authority boundaries are foundational and permanent.

---

## 12. Failure Classification and Learning

### 12.1 Platform Authority Violations (Critical)

**Violation**: FM attempts direct platform action

**Classification**: Catastrophic Governance Violation

**Response**:
1. Watchdog hard stop (if detected)
2. Immediate escalation to human authority
3. FM execution halted
4. Root cause analysis required
5. Governance learning promoted if pattern detected

---

### 12.2 Delegation Protocol Violations (Critical)

**Violation**: Maturion initiates platform action without delegation

**Classification**: Catastrophic Governance Violation

**Response**:
1. Watchdog hard stop (if detected)
2. Immediate escalation to human authority
3. Maturion action rolled back (if possible)
4. Root cause analysis required
5. Governance learning promoted if pattern detected

---

### 12.3 Delegation Failures (Operational)

**Scenario**: Delegation request fails due to platform constraints or errors

**Classification**: Operational Failure (not governance violation)

**Response**:
1. Maturion returns detailed failure information
2. FM evaluates failure and determines remediation
3. FM retries with corrections or escalates if unresolvable
4. Failure recorded in evidence trail
5. Pattern analysis for systemic issues

**Learning Opportunity**: Repeated delegation failures MAY indicate governance gaps or protocol enhancements needed.

---

## 13. Implementation Boundaries

### 13.1 What This Document Defines

- ✅ Authority boundary between FM and Maturion
- ✅ Platform actions requiring Maturion authority
- ✅ Delegation protocol (request/response semantics)
- ✅ Prohibited behaviors for FM and Maturion
- ✅ Audit requirements for platform actions
- ✅ Relationship to other governance documents

### 13.2 What This Document Does NOT Define

- ❌ Maturion implementation architecture (how Maturion is built)
- ❌ GitHub API technical integration details (see `/architecture/github-app-auth-architecture.md` for implementation)
- ❌ Token management and credential storage (implementation concern)
- ❌ Maturion deployment topology (implementation concern)
- ❌ FM-to-Maturion communication protocol (transport layer - implementation concern)

**Separation**: This is governance definition, not implementation specification. Implementation details are addressed in architecture documents where applicable.

---

## 14. Closing Principle

**Platform authority is separated from repository authority by necessity and design.**

FM makes decisions and orchestrates repository work.

Maturion executes platform actions as delegated.

This separation ensures:
- Clear accountability
- Comprehensive audit trails
- Security boundary preservation
- Governance integrity

**Neither FM nor Maturion may violate this boundary.**

---

**END OF PLATFORM_AUTHORITY_BOUNDARY_AND_DELEGATION_MODEL.md**

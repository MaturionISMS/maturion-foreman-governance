# DELEGATION INSTRUCTION SCHEMA

## Status
Canonical Governance Specification  
Version: v1.0  
Authority: Governance Administrator  
Required By: DELEGATION_INSTRUCTION_AND_AUDIT_MODEL.md (G-C13)

---

## 1. Purpose

This document defines the normative schema for **Delegation Instruction** artifacts.

Delegation instructions are structured requests from Foreman (FM) to Maturion to execute platform actions (GitHub API operations) on behalf of FM.

A delegation instruction artifact is valid only if it conforms to this schema.

---

## 2. Core Invariants

1. **All delegation instructions MUST be explicit and complete** - No partial or ambiguous instructions
2. **All delegation instructions MUST include authorization evidence** - No actions without authorization
3. **All delegation instructions MUST be unique** - No duplicate instruction IDs
4. **All delegation instructions MUST be traceable** - Complete audit context required
5. **Maturion MUST reject invalid instructions** - Schema validation before execution

---

## 3. Schema Structure (Normative)

### 3.1 Instruction Header (REQUIRED)

```yaml
DELEGATION_INSTRUCTION_VERSION: "1.0"
INSTRUCTION_ID: "<unique-id>"  # Format: DI-YYYY-MM-DD-<sequence> (e.g., DI-2025-12-25-001)
TIMESTAMP_UTC: "<ISO-8601-timestamp>"  # Format: YYYY-MM-DDTHH:MM:SSZ
```

**Field Requirements**:
- `DELEGATION_INSTRUCTION_VERSION`: MUST be "1.0" (current version)
- `INSTRUCTION_ID`: MUST be unique across all instructions, MUST follow format `DI-YYYY-MM-DD-<NNN>` where NNN is zero-padded sequence
- `TIMESTAMP_UTC`: MUST be ISO 8601 format in UTC timezone

---

### 3.2 Requester Information (REQUIRED)

```yaml
REQUESTER:
  AGENT_TYPE: "<agent-type>"  # Values: "FOREMAN" | "HUMAN"
  AGENT_INSTANCE_ID: "<instance-id>"  # Unique identifier for requesting agent instance
  REPOSITORY: "<owner/repo>"  # Format: "MaturionISMS/example-app"
  AUTHORIZATION_LEVEL: "<level>"  # Values: "AUTONOMOUS" | "HUMAN_APPROVED" | "ESCALATION_RESOLVED"
```

**Field Requirements**:
- `AGENT_TYPE`: MUST be "FOREMAN" for FM-delegated actions, "HUMAN" for human-initiated actions
- `AGENT_INSTANCE_ID`: MUST uniquely identify requesting agent instance (for traceability)
- `REPOSITORY`: MUST be valid GitHub repository in format "owner/repo"
- `AUTHORIZATION_LEVEL`: MUST match governance requirements for action type

---

### 3.3 Action Definition (REQUIRED)

```yaml
ACTION:
  TYPE: "<action-type>"  # See Section 4 for valid values
  PARAMETERS:
    # Action-specific parameters (see Section 5)
```

**Field Requirements**:
- `TYPE`: MUST be one of the canonical action types (see Section 4)
- `PARAMETERS`: MUST contain all required parameters for action type (see Section 5)

---

### 3.4 Authorization Context (REQUIRED)

```yaml
AUTHORIZATION:
  GOVERNANCE_STATUS: "<status>"  # Values: "COMPLIANT" | "BLOCKED" | "OVERRIDE"
  GOVERNANCE_EVIDENCE: "<path>"  # Path to governance evidence file (relative to repository root)
  QA_STATUS: "<status>"  # Values: "GREEN" | "AMBER" | "RED" | "NOT_APPLICABLE"
  QA_EVIDENCE: "<path>"  # Path to QA evidence file or "NOT_APPLICABLE"
  HUMAN_APPROVAL: "<YES|NO>"
  HUMAN_APPROVAL_EVIDENCE: "<reference>"  # Required if HUMAN_APPROVAL=YES
  ESCALATION_COMPLETED: "<YES|NO|NOT_APPLICABLE>"
  ESCALATION_EVIDENCE: "<reference>"  # Required if ESCALATION_COMPLETED=YES
```

**Field Requirements**:
- `GOVERNANCE_STATUS`: MUST be "COMPLIANT" for most actions; "OVERRIDE" only with human authority approval
- `GOVERNANCE_EVIDENCE`: MUST be valid path to evidence file demonstrating governance compliance
- `QA_STATUS`: MUST be "GREEN" for actions requiring QA validation; "NOT_APPLICABLE" for non-QA actions
- `QA_EVIDENCE`: MUST be valid path when QA_STATUS is GREEN/AMBER/RED; "NOT_APPLICABLE" otherwise
- `HUMAN_APPROVAL`: MUST be "YES" when action requires human approval per governance
- `HUMAN_APPROVAL_EVIDENCE`: MUST be valid reference when HUMAN_APPROVAL=YES (issue comment, PR approval, etc.)
- `ESCALATION_COMPLETED`: MUST be "YES" when action follows escalation resolution
- `ESCALATION_EVIDENCE`: MUST be valid reference when ESCALATION_COMPLETED=YES

---

### 3.5 Expected Outcome (REQUIRED)

```yaml
EXPECTED_OUTCOME:
  DESCRIPTION: "<outcome-description>"
  SUCCESS_CRITERIA: "<success-criteria>"
  FAILURE_HANDLING: "<failure-handling>"
```

**Field Requirements**:
- `DESCRIPTION`: MUST clearly describe what state should result from action
- `SUCCESS_CRITERIA`: MUST define how to verify action succeeded
- `FAILURE_HANDLING`: MUST define what FM should do if action fails

**Example**:
```yaml
EXPECTED_OUTCOME:
  DESCRIPTION: "Pull request created in open state, ready for review"
  SUCCESS_CRITERIA: "PR number returned, PR URL accessible, PR state = open"
  FAILURE_HANDLING: "If branch protection conflict, wait for checks and retry. If API error, escalate to human authority."
```

---

### 3.6 Audit Context (REQUIRED)

```yaml
AUDIT_CONTEXT:
  REQUIREMENT_ID: "<requirement-reference>"
  BUILD_PHASE: "<phase-name>"
  GOVERNANCE_RULE: "<canonical-rule-reference>"
  REASON: "<reason-for-action>"
```

**Field Requirements**:
- `REQUIREMENT_ID`: MUST reference requirement specification or issue that necessitates action
- `BUILD_PHASE`: MUST identify build phase (e.g., "INITIALIZATION", "BUILD_TO_GREEN", "DELIVERY", "POST_MERGE")
- `GOVERNANCE_RULE`: MUST reference canonical governance rule requiring or permitting action
- `REASON`: MUST provide human-readable explanation of why action is needed

---

## 4. Canonical Action Types

Action TYPE MUST be one of the following:

### 4.1 Issue Management
- `CREATE_GITHUB_ISSUE`
- `UPDATE_GITHUB_ISSUE`
- `CLOSE_GITHUB_ISSUE`
- `ADD_ISSUE_LABELS`
- `REMOVE_ISSUE_LABELS`
- `ASSIGN_ISSUE`
- `COMMENT_ON_ISSUE`
- `LINK_ISSUES`

### 4.2 Pull Request Management
- `CREATE_PULL_REQUEST`
- `UPDATE_PULL_REQUEST`
- `CLOSE_PULL_REQUEST`
- `MERGE_PULL_REQUEST`
- `REQUEST_PR_REVIEW`
- `ADD_PR_LABELS`
- `REMOVE_PR_LABELS`
- `COMMENT_ON_PR`
- `APPROVE_PR`
- `REQUEST_PR_CHANGES`

### 4.3 Repository Management
- `CREATE_BRANCH`
- `DELETE_BRANCH`
- `CREATE_TAG`
- `DELETE_TAG`
- `UPDATE_BRANCH_PROTECTION`

### 4.4 Workflow Management
- `TRIGGER_WORKFLOW`
- `CANCEL_WORKFLOW`
- `RERUN_WORKFLOW`

---

## 5. Action-Specific Parameters

### 5.1 CREATE_GITHUB_ISSUE

```yaml
PARAMETERS:
  TITLE: "<issue-title>"  # REQUIRED: String, 1-256 chars
  BODY: "<issue-body>"  # REQUIRED: String, markdown format
  LABELS: ["<label1>", "<label2>"]  # OPTIONAL: Array of strings
  ASSIGNEES: ["<username1>", "<username2>"]  # OPTIONAL: Array of GitHub usernames
  MILESTONE: <milestone-number>  # OPTIONAL: Integer, milestone number
```

---

### 5.2 UPDATE_GITHUB_ISSUE

```yaml
PARAMETERS:
  ISSUE_NUMBER: <integer>  # REQUIRED: Issue number
  TITLE: "<new-title>"  # OPTIONAL: String, 1-256 chars
  BODY: "<new-body>"  # OPTIONAL: String, markdown format
  STATE: "<open|closed>"  # OPTIONAL: String
  STATE_REASON: "<completed|not_planned>"  # OPTIONAL: String (only when STATE=closed)
```

---

### 5.3 CLOSE_GITHUB_ISSUE

```yaml
PARAMETERS:
  ISSUE_NUMBER: <integer>  # REQUIRED: Issue number
  STATE_REASON: "<completed|not_planned>"  # OPTIONAL: String
  COMMENT: "<closure-comment>"  # OPTIONAL: String, markdown format
```

---

### 5.4 ADD_ISSUE_LABELS

```yaml
PARAMETERS:
  ISSUE_NUMBER: <integer>  # REQUIRED: Issue number
  LABELS: ["<label1>", "<label2>"]  # REQUIRED: Array of strings, min 1 label
```

---

### 5.5 REMOVE_ISSUE_LABELS

```yaml
PARAMETERS:
  ISSUE_NUMBER: <integer>  # REQUIRED: Issue number
  LABELS: ["<label1>", "<label2>"]  # REQUIRED: Array of strings, min 1 label
```

---

### 5.6 ASSIGN_ISSUE

```yaml
PARAMETERS:
  ISSUE_NUMBER: <integer>  # REQUIRED: Issue number
  ASSIGNEES: ["<username1>", "<username2>"]  # REQUIRED: Array of strings, min 1 assignee
```

---

### 5.7 COMMENT_ON_ISSUE

```yaml
PARAMETERS:
  ISSUE_NUMBER: <integer>  # REQUIRED: Issue number
  COMMENT_BODY: "<comment-text>"  # REQUIRED: String, markdown format
```

---

### 5.8 LINK_ISSUES

```yaml
PARAMETERS:
  SOURCE_ISSUE_NUMBER: <integer>  # REQUIRED: Source issue number
  TARGET_ISSUE_NUMBER: <integer>  # REQUIRED: Target issue number
  RELATIONSHIP: "<blocks|blocked_by|relates_to>"  # REQUIRED: String
```

---

### 5.9 CREATE_PULL_REQUEST

```yaml
PARAMETERS:
  HEAD_BRANCH: "<branch-name>"  # REQUIRED: String, branch name (without refs/heads/)
  BASE_BRANCH: "<branch-name>"  # REQUIRED: String, branch name (without refs/heads/)
  TITLE: "<pr-title>"  # REQUIRED: String, 1-256 chars
  BODY: "<pr-body>"  # REQUIRED: String, markdown format
  DRAFT: <true|false>  # OPTIONAL: Boolean, default false
  LABELS: ["<label1>", "<label2>"]  # OPTIONAL: Array of strings
  ASSIGNEES: ["<username1>", "<username2>"]  # OPTIONAL: Array of GitHub usernames
  REVIEWERS: ["<username1>", "<username2>"]  # OPTIONAL: Array of GitHub usernames
```

---

### 5.10 UPDATE_PULL_REQUEST

```yaml
PARAMETERS:
  PR_NUMBER: <integer>  # REQUIRED: PR number
  TITLE: "<new-title>"  # OPTIONAL: String, 1-256 chars
  BODY: "<new-body>"  # OPTIONAL: String, markdown format
  STATE: "<open|closed>"  # OPTIONAL: String
```

---

### 5.11 CLOSE_PULL_REQUEST

```yaml
PARAMETERS:
  PR_NUMBER: <integer>  # REQUIRED: PR number
  COMMENT: "<closure-comment>"  # OPTIONAL: String, markdown format
```

---

### 5.12 MERGE_PULL_REQUEST

```yaml
PARAMETERS:
  PR_NUMBER: <integer>  # REQUIRED: PR number
  MERGE_METHOD: "<merge|squash|rebase>"  # REQUIRED: String
  COMMIT_TITLE: "<commit-title>"  # OPTIONAL: String
  COMMIT_MESSAGE: "<commit-message>"  # OPTIONAL: String, markdown format
  DELETE_BRANCH: <true|false>  # OPTIONAL: Boolean, default false
```

---

### 5.13 REQUEST_PR_REVIEW

```yaml
PARAMETERS:
  PR_NUMBER: <integer>  # REQUIRED: PR number
  REVIEWERS: ["<username1>", "<username2>"]  # REQUIRED: Array of strings, min 1 reviewer
```

---

### 5.14 ADD_PR_LABELS

```yaml
PARAMETERS:
  PR_NUMBER: <integer>  # REQUIRED: PR number
  LABELS: ["<label1>", "<label2>"]  # REQUIRED: Array of strings, min 1 label
```

---

### 5.15 REMOVE_PR_LABELS

```yaml
PARAMETERS:
  PR_NUMBER: <integer>  # REQUIRED: PR number
  LABELS: ["<label1>", "<label2>"]  # REQUIRED: Array of strings, min 1 label
```

---

### 5.16 COMMENT_ON_PR

```yaml
PARAMETERS:
  PR_NUMBER: <integer>  # REQUIRED: PR number
  COMMENT_BODY: "<comment-text>"  # REQUIRED: String, markdown format
```

---

### 5.17 APPROVE_PR

```yaml
PARAMETERS:
  PR_NUMBER: <integer>  # REQUIRED: PR number
  REVIEW_BODY: "<review-comment>"  # OPTIONAL: String, markdown format
```

---

### 5.18 REQUEST_PR_CHANGES

```yaml
PARAMETERS:
  PR_NUMBER: <integer>  # REQUIRED: PR number
  REVIEW_BODY: "<review-comment>"  # REQUIRED: String, markdown format
```

---

### 5.19 CREATE_BRANCH

```yaml
PARAMETERS:
  BRANCH_NAME: "<branch-name>"  # REQUIRED: String, valid git branch name
  SOURCE_SHA: "<commit-sha>"  # REQUIRED: String, full 40-char SHA
```

---

### 5.20 DELETE_BRANCH

```yaml
PARAMETERS:
  BRANCH_NAME: "<branch-name>"  # REQUIRED: String
```

---

### 5.21 CREATE_TAG

```yaml
PARAMETERS:
  TAG_NAME: "<tag-name>"  # REQUIRED: String, valid git tag name
  TARGET_SHA: "<commit-sha>"  # REQUIRED: String, full 40-char SHA
  MESSAGE: "<tag-message>"  # OPTIONAL: String
  TAG_TYPE: "<lightweight|annotated>"  # REQUIRED: String
```

---

### 5.22 DELETE_TAG

```yaml
PARAMETERS:
  TAG_NAME: "<tag-name>"  # REQUIRED: String
```

---

### 5.23 UPDATE_BRANCH_PROTECTION

```yaml
PARAMETERS:
  BRANCH_NAME: "<branch-name>"  # REQUIRED: String
  PROTECTION_RULES:  # REQUIRED: Object
    REQUIRED_STATUS_CHECKS:
      STRICT: <true|false>  # OPTIONAL: Boolean
      CONTEXTS: ["<check1>", "<check2>"]  # OPTIONAL: Array of strings
    ENFORCE_ADMINS: <true|false>  # OPTIONAL: Boolean
    REQUIRED_PULL_REQUEST_REVIEWS:
      REQUIRED_APPROVING_REVIEW_COUNT: <integer>  # OPTIONAL: Integer 1-6
      DISMISS_STALE_REVIEWS: <true|false>  # OPTIONAL: Boolean
      REQUIRE_CODE_OWNER_REVIEWS: <true|false>  # OPTIONAL: Boolean
    RESTRICTIONS:
      USERS: ["<username1>", "<username2>"]  # OPTIONAL: Array of strings
      TEAMS: ["<team1>", "<team2>"]  # OPTIONAL: Array of strings
```

---

### 5.24 TRIGGER_WORKFLOW

```yaml
PARAMETERS:
  WORKFLOW_ID: "<workflow-id>"  # REQUIRED: String (workflow file name or ID)
  REF: "<branch-or-tag>"  # REQUIRED: String, branch name or tag name
  INPUTS:  # OPTIONAL: Object (workflow inputs as key-value pairs)
    INPUT_NAME: "<input-value>"
```

---

### 5.25 CANCEL_WORKFLOW

```yaml
PARAMETERS:
  RUN_ID: <integer>  # REQUIRED: Workflow run ID
```

---

### 5.26 RERUN_WORKFLOW

```yaml
PARAMETERS:
  RUN_ID: <integer>  # REQUIRED: Workflow run ID
```

---

## 6. Validation Rules

### 6.1 Schema Validation

Maturion MUST validate:
- All REQUIRED fields are present
- All field values conform to specified types
- ACTION.TYPE is in canonical action types list
- PARAMETERS match requirements for ACTION.TYPE
- String lengths are within specified limits
- Arrays have required minimum elements
- Timestamps are valid ISO 8601 format
- Repository format is "owner/repo"
- INSTRUCTION_ID follows format "DI-YYYY-MM-DD-NNN"

### 6.2 Authorization Validation

Maturion MUST validate:
- GOVERNANCE_STATUS is appropriate for action
- GOVERNANCE_EVIDENCE file exists and is accessible
- QA_STATUS matches governance requirements for action
- QA_EVIDENCE file exists when QA_STATUS != NOT_APPLICABLE
- HUMAN_APPROVAL=YES when required by governance
- HUMAN_APPROVAL_EVIDENCE exists when HUMAN_APPROVAL=YES
- ESCALATION_COMPLETED=YES when action follows escalation
- ESCALATION_EVIDENCE exists when ESCALATION_COMPLETED=YES

### 6.3 Action Feasibility Validation

Maturion MUST validate:
- Repository exists and is accessible
- Target resources exist (for update/delete operations)
- Branch names are valid git branch names
- PR/issue numbers reference existing resources
- Usernames reference valid GitHub users
- Labels reference valid repository labels
- Milestones reference valid repository milestones

---

## 7. Examples

### 7.1 Example: CREATE_PULL_REQUEST

```yaml
DELEGATION_INSTRUCTION_VERSION: "1.0"
INSTRUCTION_ID: "DI-2025-12-25-001"
TIMESTAMP_UTC: "2025-12-25T10:30:00Z"

REQUESTER:
  AGENT_TYPE: "FOREMAN"
  AGENT_INSTANCE_ID: "fm-prod-001"
  REPOSITORY: "MaturionISMS/example-app"
  AUTHORIZATION_LEVEL: "HUMAN_APPROVED"

ACTION:
  TYPE: "CREATE_PULL_REQUEST"
  PARAMETERS:
    HEAD_BRANCH: "builder/feature-auth-123"
    BASE_BRANCH: "main"
    TITLE: "Feature 123 - User Authentication System"
    BODY: |
      ## Architecture
      Complete architecture at: architecture/builds/build-001/

      ## QA Status
      100% GREEN - All tests passing
      QA Evidence: .qa/results-2025-12-25.json

      ## Completeness
      System Completeness: 100%
      Build Effectiveness: 100%
    DRAFT: false
    LABELS: ["feature", "authentication"]
    REVIEWERS: ["johan-ras"]

AUTHORIZATION:
  GOVERNANCE_STATUS: "COMPLIANT"
  GOVERNANCE_EVIDENCE: ".governance/compliance-check.md"
  QA_STATUS: "GREEN"
  QA_EVIDENCE: ".qa/results-2025-12-25.json"
  HUMAN_APPROVAL: "YES"
  HUMAN_APPROVAL_EVIDENCE: "Issue #123 comment by johan-ras"
  ESCALATION_COMPLETED: "NOT_APPLICABLE"
  ESCALATION_EVIDENCE: "NOT_APPLICABLE"

EXPECTED_OUTCOME:
  DESCRIPTION: "Pull request created in open state, ready for review by johan-ras"
  SUCCESS_CRITERIA: "PR number returned, PR URL accessible, PR state = open, reviewer assigned"
  FAILURE_HANDLING: "If branch protection conflict, wait for CI checks to complete and retry. If API error, log and escalate to human authority."

AUDIT_CONTEXT:
  REQUIREMENT_ID: "REQ-123"
  BUILD_PHASE: "DELIVERY"
  GOVERNANCE_RULE: "BUILDER_FIRST_PR_MERGE_MODEL.md Section 6.1"
  REASON: "Builder completed build-to-green, FM validated 100% GREEN QA, creating PR for human review per governance"
```

---

### 7.2 Example: CREATE_GITHUB_ISSUE (Escalation)

```yaml
DELEGATION_INSTRUCTION_VERSION: "1.0"
INSTRUCTION_ID: "DI-2025-12-25-002"
TIMESTAMP_UTC: "2025-12-25T11:45:00Z"

REQUESTER:
  AGENT_TYPE: "FOREMAN"
  AGENT_INSTANCE_ID: "fm-prod-001"
  REPOSITORY: "MaturionISMS/example-app"
  AUTHORIZATION_LEVEL: "ESCALATION_RESOLVED"

ACTION:
  TYPE: "CREATE_GITHUB_ISSUE"
  PARAMETERS:
    TITLE: "Build Failure: SMTP Configuration Incomplete in Architecture"
    BODY: |
      ## Failure Classification
      **Type**: Architecture Omission  
      **Severity**: S1 (Blocks Release)  
      **Detected By**: CI

      ## Evidence
      Failure recorded: architecture/builds/build-001/failures/failure-001.md
      CI logs: .ci/logs/2025-12-25-run-123.log

      ## Required Action
      Human authority (Johan) must review architecture gap and approve remediation path.

      ## Escalation Context
      Build effectiveness reduced to 95%. Governance requires human resolution before continuing.
    LABELS: ["escalation", "architecture-gap", "S1"]
    ASSIGNEES: ["johan-ras"]

AUTHORIZATION:
  GOVERNANCE_STATUS: "BLOCKED"
  GOVERNANCE_EVIDENCE: ".governance/escalation-required.md"
  QA_STATUS: "RED"
  QA_EVIDENCE: ".qa/results-2025-12-25-failed.json"
  HUMAN_APPROVAL: "YES"
  HUMAN_APPROVAL_EVIDENCE: "BUILD_INTERVENTION_AND_ALERT_MODEL.md Section 8.2 - automatic escalation"
  ESCALATION_COMPLETED: "NO"
  ESCALATION_EVIDENCE: "Escalation in progress - issue creation is escalation mechanism"

EXPECTED_OUTCOME:
  DESCRIPTION: "GitHub issue created, assigned to johan-ras, labeled for escalation"
  SUCCESS_CRITERIA: "Issue number returned, issue URL accessible, issue state = open, assignee = johan-ras"
  FAILURE_HANDLING: "If API error, retry up to 3 times. If still fails, log to local evidence and alert johan-ras via alternative channel."

AUDIT_CONTEXT:
  REQUIREMENT_ID: "BUILD-001"
  BUILD_PHASE: "BUILD_TO_GREEN"
  GOVERNANCE_RULE: "BUILD_INTERVENTION_AND_ALERT_MODEL.md Section 8.2"
  REASON: "Architecture gap detected during build, severity S1 requires immediate human attention per governance escalation protocol"
```

---

## 8. Error Conditions

### 8.1 Invalid Schema
If instruction does not conform to schema, Maturion MUST return:
```yaml
STATUS: "INVALID_REQUEST"
VALIDATION_ERRORS:
  - FIELD: "<field-name>"
    ERROR: "<validation-error>"
    EXPECTED: "<expected-format>"
```

### 8.2 Missing Authorization
If authorization evidence is missing or insufficient, Maturion MUST return:
```yaml
STATUS: "INVALID_REQUEST"
VALIDATION_ERRORS:
  - FIELD: "AUTHORIZATION"
    ERROR: "Insufficient authorization for action type"
    EXPECTED: "HUMAN_APPROVAL=YES with evidence for CREATE_PULL_REQUEST"
```

### 8.3 Invalid Action Parameters
If parameters are invalid for action type, Maturion MUST return:
```yaml
STATUS: "INVALID_REQUEST"
VALIDATION_ERRORS:
  - FIELD: "ACTION.PARAMETERS.HEAD_BRANCH"
    ERROR: "Branch does not exist"
    EXPECTED: "Valid branch name in repository"
```

---

## 9. Versioning

Current Version: **1.0**

**Version History**:
- **1.0** (2025-12-25): Initial canonical schema definition

**Backward Compatibility**:
- Future versions MUST maintain backward compatibility
- Breaking changes require major version increment
- Migration guidance provided for breaking changes

---

## 10. Integration with Other Governance

This schema is required by:
- **DELEGATION_INSTRUCTION_AND_AUDIT_MODEL.md** (G-C13) - Section 4.1
- **GOVERNANCE_COMPLETENESS_MODEL.md** - Section 5 (Platform Authority component)

This schema depends on:
- **PLATFORM_AUTHORITY_BOUNDARY_AND_DELEGATION_MODEL.md** (G-C12) - Platform action definitions

---

**END OF DELEGATION_INSTRUCTION.schema.md**

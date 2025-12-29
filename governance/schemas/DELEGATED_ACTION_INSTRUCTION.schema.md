# DELEGATED ACTION INSTRUCTION SCHEMA

## Status
Canonical Governance Specification  
Version: v1.0  
Authority: Governance Administrator  
Required By: G-C13, PLATFORM_AUTHORITY_BOUNDARY_AND_DELEGATION_MODEL.md Section 5.2

---

## 1. Purpose

This document defines the normative schema for **Delegated Action Instructions** - the canonical format for FM to request platform actions from Maturion.

Delegated Action Instructions serve as:
- **Explicit delegation contract** from FM (requestor) to Maturion (executor)
- **Authorization evidence** demonstrating why action is permitted
- **Audit trail foundation** enabling complete traceability
- **Execution specification** providing complete action parameters

A Delegated Action Instruction is valid only if it conforms to this schema.

---

## 2. Core Principles (Constitutional)

### 2.1 Explicit Delegation Only
Per PLATFORM_AUTHORITY_BOUNDARY_AND_DELEGATION_MODEL.md:
- FM cannot execute platform actions directly
- All platform actions MUST be explicitly requested via delegation
- No implicit or assumed delegations
- No "helpful" autonomous platform actions by Maturion

### 2.2 Complete Instruction Specification
Every delegated action instruction MUST be:
- **Complete**: Contains all parameters needed for execution
- **Unambiguous**: Single clear interpretation
- **Traceable**: Links to authorization evidence
- **Auditable**: Records requestor identity and justification

### 2.3 Instruction Immutability
- Instructions are immutable once issued
- Corrections require new instruction with reference to superseded instruction
- Original instructions retained for audit trail
- Execution results linked to original instruction

---

## 3. Instruction Structure

### 3.1 Core Components (REQUIRED)

Every Delegated Action Instruction MUST include:

1. **Instruction Identity** - Unique identification and metadata
2. **Requestor Identity** - Who is requesting the action
3. **Action Specification** - What action to perform
4. **Action Parameters** - Complete parameters for execution
5. **Authorization Context** - Why action is authorized
6. **Evidence References** - Supporting evidence for authorization
7. **Expected Outcome** - What should result from action
8. **Audit Context** - Traceability and compliance linkage

---

## 4. Instruction Schema Definition

### 4.1 Markdown Format (Human-Readable)

#### 4.1.1 File Location
Delegated Action Instructions MUST be stored in:
```
.governance/delegated-actions/instructions/DAI-[YYYY]-[NNNN].md
```

Where:
- `YYYY` = Year (4 digits)
- `NNNN` = Sequential number (zero-padded to 4 digits)

Example: `.governance/delegated-actions/instructions/DAI-2025-0001.md`

#### 4.1.2 Markdown Template

```markdown
# Delegated Action Instruction: [DAI-YYYY-NNNN]

## Instruction Identity

**Instruction ID**: [DAI-YYYY-NNNN]  
**Instruction Type**: [PLATFORM_ACTION]  
**Created Timestamp**: [ISO 8601 timestamp]  
**Status**: [PENDING | EXECUTING | COMPLETED | FAILED | CANCELLED]

## Requestor Identity

**Requestor Type**: [FM | HUMAN | WATCHDOG | GOVERNANCE_ADMIN]  
**Requestor ID**: [Unique identifier of requesting entity]  
**Repository Context**: [owner/repo]  
**Branch Context**: [branch name]  
**Issue Context**: [#issue_number] (if applicable)  
**PR Context**: [#pr_number] (if applicable)

## Action Specification

**Platform Action Type**: [Action type from Section 5]  
**Action Category**: [ISSUE_MANAGEMENT | PR_MANAGEMENT | REPOSITORY_MANAGEMENT | WORKFLOW_MANAGEMENT]  
**Priority**: [NORMAL | HIGH | CRITICAL]  
**Execution Deadline**: [ISO 8601 timestamp] (optional)

## Action Parameters

[Action-specific parameters conforming to Section 5]

**Target Repository**: [owner/repo]  
**Target Resource**: [Resource identifier - issue #, PR #, branch name, etc.]  

[Additional parameters specific to action type]

## Authorization Context

**Authorization Type**: [GOVERNANCE_COMPLIANCE | QUALITY_GATE_PASSED | EMERGENCY_RESOLUTION | HUMAN_INSTRUCTION]

**Quality Gate Status** (if applicable):
- QA Status: [100% GREEN | NOT_GREEN]
- QA Evidence: [Path to QA report]
- Test Debt: [ZERO | PRESENT]

**Governance Status** (if applicable):
- Build Philosophy Compliance: [COMPLIANT | NON_COMPLIANT]
- Gate Status: [ALL_PASSED | FAILURES_PRESENT]
- Governance Evidence: [Path to compliance report]

**Human Authorization** (if applicable):
- Authorizing Human: [Name]
- Authorization Date: [ISO 8601 timestamp]
- Authorization Evidence: [Reference to approval]

**Emergency Context** (if applicable):
- Emergency Type: [Description]
- Impact Assessment: [Description]
- Emergency Approval: [Reference]

## Evidence References

**Architecture Evidence**:
- Architecture Document: [Path or reference]
- Architecture Compliance: [VERIFIED | NOT_VERIFIED | N/A]

**QA Evidence**:
- Builder QA Report: [Path]
- Test Results: [Path]
- Coverage Report: [Path]

**Governance Evidence**:
- Governance Compliance Report: [Path]
- Gate Validation Results: [Path]

**Prior Approvals**:
- [List any prior approvals or related delegations]

**CI/CD Evidence**:
- Workflow Run: [URL]
- Build Status: [SUCCESS | FAILURE]
- Deployment Status: [If applicable]

## Expected Outcome

**Desired State**: [Clear description of expected state after action]

**Success Criteria**:
- [Criterion 1]
- [Criterion 2]
- [Criterion N]

**Failure Scenarios**:
- [Known failure scenario 1 and handling]
- [Known failure scenario 2 and handling]

## Audit Context

**Requirement ID**: [REQ-XXX] (if applicable)  
**Build Phase**: [Architecture | QA Creation | Building | Validation | Delivery]  
**Governance Rule**: [Reference to governing canon/policy document]  
**Compliance Framework**: [ISO 27001 | ISO 31000 | NIST CSF | N/A]  
**Control Reference**: [Control ID if applicable]

**Traceability**:
- Parent Issue: [#issue]
- Related PRs: [#pr1, #pr2]
- Related Instructions: [DAI-YYYY-NNNN]
- Supersedes: [DAI-YYYY-NNNN] (if applicable)

## Execution Tracking

**Execution Status**: [PENDING | IN_PROGRESS | COMPLETED | FAILED]  
**Assigned Executor**: [Maturion instance ID]  
**Execution Start**: [ISO 8601 timestamp]  
**Execution End**: [ISO 8601 timestamp]  
**Execution Duration**: [Duration in seconds]

**Execution Result**: [SUCCESS | FAILURE | PARTIAL]  
**Result Evidence**: [Link to execution audit record]

## Notes

[Any additional context, caveats, or special considerations]

---

**Schema Version**: 1.0  
**Canonical Authority**: This instruction represents explicit delegation from FM to Maturion per PLATFORM_AUTHORITY_BOUNDARY_AND_DELEGATION_MODEL.md
```

---

## 5. Platform Action Types (NORMATIVE)

### 5.1 Issue Management Actions

#### 5.1.1 CREATE_ISSUE
**Purpose**: Create a new GitHub issue

**Required Parameters**:
```yaml
action_type: CREATE_ISSUE
target_repository: owner/repo
issue_title: "[Title]"
issue_body: "[Body content]"
issue_labels: [label1, label2]  # Optional
issue_assignees: [user1, user2]  # Optional
issue_milestone: "[milestone]"  # Optional
issue_projects: [project1]      # Optional
```

#### 5.1.2 UPDATE_ISSUE
**Purpose**: Modify an existing GitHub issue

**Required Parameters**:
```yaml
action_type: UPDATE_ISSUE
target_repository: owner/repo
issue_number: 123
update_type: [STATE_CHANGE | LABEL_CHANGE | ASSIGNEE_CHANGE | CONTENT_UPDATE]
new_state: [open | closed]      # If STATE_CHANGE
new_labels: [label1, label2]    # If LABEL_CHANGE
new_assignees: [user1]          # If ASSIGNEE_CHANGE
new_title: "[Title]"            # If CONTENT_UPDATE
new_body: "[Body]"              # If CONTENT_UPDATE
```

#### 5.1.3 COMMENT_ON_ISSUE
**Purpose**: Add a comment to an existing issue

**Required Parameters**:
```yaml
action_type: COMMENT_ON_ISSUE
target_repository: owner/repo
issue_number: 123
comment_body: "[Comment content]"
```

#### 5.1.4 CLOSE_ISSUE
**Purpose**: Close an existing issue

**Required Parameters**:
```yaml
action_type: CLOSE_ISSUE
target_repository: owner/repo
issue_number: 123
close_reason: [COMPLETED | WONT_FIX | DUPLICATE | INVALID]
close_comment: "[Optional comment]"
```

---

### 5.2 Pull Request Management Actions

#### 5.2.1 CREATE_PR
**Purpose**: Create a new GitHub pull request

**Required Parameters**:
```yaml
action_type: CREATE_PR
target_repository: owner/repo
source_branch: feature/branch-name
target_branch: main
pr_title: "[Title]"
pr_body: "[Body content with architecture, QA evidence, completion criteria]"
pr_labels: [label1, label2]     # Optional
pr_reviewers: [user1, user2]    # Optional
pr_assignees: [user1]           # Optional
pr_milestone: "[milestone]"     # Optional
draft: [true | false]           # Optional, default false
```

#### 5.2.2 UPDATE_PR
**Purpose**: Modify an existing pull request

**Required Parameters**:
```yaml
action_type: UPDATE_PR
target_repository: owner/repo
pr_number: 456
update_type: [STATE_CHANGE | LABEL_CHANGE | REVIEWER_CHANGE | CONTENT_UPDATE]
new_state: [open | closed]      # If STATE_CHANGE
new_labels: [label1, label2]    # If LABEL_CHANGE
new_reviewers: [user1]          # If REVIEWER_CHANGE
new_title: "[Title]"            # If CONTENT_UPDATE
new_body: "[Body]"              # If CONTENT_UPDATE
```

#### 5.2.3 MERGE_PR
**Purpose**: Merge an approved pull request

**Required Parameters**:
```yaml
action_type: MERGE_PR
target_repository: owner/repo
pr_number: 456
merge_method: [merge | squash | rebase]
merge_commit_title: "[Title]"   # Optional
merge_commit_message: "[Msg]"   # Optional
delete_branch_after_merge: [true | false]  # Optional
```

**Additional Authorization Requirements**:
- Human approval MUST be present (unless emergency)
- All governance gates MUST be passed
- QA MUST be 100% GREEN
- No merge conflicts present (VERIFIED)

#### 5.2.4 CLOSE_PR
**Purpose**: Close a pull request without merging

**Required Parameters**:
```yaml
action_type: CLOSE_PR
target_repository: owner/repo
pr_number: 456
close_reason: [SUPERSEDED | INVALID | ABANDONED | DECLINED]
close_comment: "[Optional comment explaining closure]"
```

#### 5.2.5 COMMENT_ON_PR
**Purpose**: Add a comment to a pull request

**Required Parameters**:
```yaml
action_type: COMMENT_ON_PR
target_repository: owner/repo
pr_number: 456
comment_body: "[Comment content]"
comment_position: [GENERAL | LINE_SPECIFIC]  # GENERAL for conversation, LINE_SPECIFIC for code review
file_path: "[path/to/file]"     # Required if LINE_SPECIFIC
line_number: 42                 # Required if LINE_SPECIFIC
```

#### 5.2.6 REQUEST_PR_REVIEW
**Purpose**: Request review from specific users

**Required Parameters**:
```yaml
action_type: REQUEST_PR_REVIEW
target_repository: owner/repo
pr_number: 456
reviewers: [user1, user2]
review_type: [APPROVAL_REQUIRED | FEEDBACK_REQUESTED]
```

---

### 5.3 Repository Management Actions

#### 5.3.1 CREATE_BRANCH
**Purpose**: Create a new branch via GitHub API

**Required Parameters**:
```yaml
action_type: CREATE_BRANCH
target_repository: owner/repo
branch_name: feature/new-branch
source_ref: main                # Branch, tag, or commit SHA to branch from
```

#### 5.3.2 DELETE_BRANCH
**Purpose**: Delete a branch via GitHub API

**Required Parameters**:
```yaml
action_type: DELETE_BRANCH
target_repository: owner/repo
branch_name: feature/old-branch
```

**Additional Authorization Requirements**:
- Branch MUST NOT be protected
- Branch MUST be merged or explicitly approved for deletion

#### 5.3.3 CREATE_TAG
**Purpose**: Create a new tag via GitHub API

**Required Parameters**:
```yaml
action_type: CREATE_TAG
target_repository: owner/repo
tag_name: v1.0.0
target_commitish: abc1234       # Branch, commit SHA
tag_message: "[Tag annotation]" # Optional
tag_type: [lightweight | annotated]
```

---

### 5.4 Workflow Management Actions

#### 5.4.1 TRIGGER_WORKFLOW
**Purpose**: Manually trigger a GitHub Actions workflow

**Required Parameters**:
```yaml
action_type: TRIGGER_WORKFLOW
target_repository: owner/repo
workflow_id: build.yml          # Workflow file name or ID
workflow_ref: main              # Branch to run workflow on
workflow_inputs:                # Optional workflow inputs
  key1: value1
  key2: value2
```

#### 5.4.2 CANCEL_WORKFLOW_RUN
**Purpose**: Cancel a running workflow

**Required Parameters**:
```yaml
action_type: CANCEL_WORKFLOW_RUN
target_repository: owner/repo
run_id: 1234567890
cancellation_reason: "[Reason for cancellation]"
```

#### 5.4.3 RERUN_WORKFLOW
**Purpose**: Re-run a failed or completed workflow

**Required Parameters**:
```yaml
action_type: RERUN_WORKFLOW
target_repository: owner/repo
run_id: 1234567890
rerun_type: [ALL_JOBS | FAILED_JOBS]
```

---

## 6. JSON Format (Machine-Readable)

### 6.1 JSON Schema

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Delegated Action Instruction",
  "type": "object",
  "required": [
    "schema_version",
    "instruction_identity",
    "requestor_identity",
    "action_specification",
    "action_parameters",
    "authorization_context",
    "evidence_references",
    "expected_outcome",
    "audit_context"
  ],
  "properties": {
    "schema_version": {
      "type": "string",
      "const": "1.0"
    },
    "instruction_identity": {
      "type": "object",
      "required": ["instruction_id", "instruction_type", "created_timestamp", "status"],
      "properties": {
        "instruction_id": {
          "type": "string",
          "pattern": "^DAI-\\d{4}-\\d{4}$"
        },
        "instruction_type": {
          "type": "string",
          "const": "PLATFORM_ACTION"
        },
        "created_timestamp": {
          "type": "string",
          "format": "date-time"
        },
        "status": {
          "type": "string",
          "enum": ["PENDING", "EXECUTING", "COMPLETED", "FAILED", "CANCELLED"]
        }
      }
    },
    "requestor_identity": {
      "type": "object",
      "required": ["requestor_type", "requestor_id", "repository_context"],
      "properties": {
        "requestor_type": {
          "type": "string",
          "enum": ["FM", "HUMAN", "WATCHDOG", "GOVERNANCE_ADMIN"]
        },
        "requestor_id": {
          "type": "string",
          "minLength": 1
        },
        "repository_context": {
          "type": "string",
          "pattern": "^[^/]+/[^/]+$"
        },
        "branch_context": {"type": "string"},
        "issue_context": {"type": "integer"},
        "pr_context": {"type": "integer"}
      }
    },
    "action_specification": {
      "type": "object",
      "required": ["platform_action_type", "action_category", "priority"],
      "properties": {
        "platform_action_type": {
          "type": "string",
          "enum": [
            "CREATE_ISSUE", "UPDATE_ISSUE", "COMMENT_ON_ISSUE", "CLOSE_ISSUE",
            "CREATE_PR", "UPDATE_PR", "MERGE_PR", "CLOSE_PR", "COMMENT_ON_PR", "REQUEST_PR_REVIEW",
            "CREATE_BRANCH", "DELETE_BRANCH", "CREATE_TAG",
            "TRIGGER_WORKFLOW", "CANCEL_WORKFLOW_RUN", "RERUN_WORKFLOW"
          ]
        },
        "action_category": {
          "type": "string",
          "enum": ["ISSUE_MANAGEMENT", "PR_MANAGEMENT", "REPOSITORY_MANAGEMENT", "WORKFLOW_MANAGEMENT"]
        },
        "priority": {
          "type": "string",
          "enum": ["NORMAL", "HIGH", "CRITICAL"]
        },
        "execution_deadline": {
          "type": "string",
          "format": "date-time"
        }
      }
    },
    "action_parameters": {
      "type": "object",
      "required": ["target_repository"],
      "properties": {
        "target_repository": {
          "type": "string",
          "pattern": "^[^/]+/[^/]+$"
        }
      },
      "additionalProperties": true
    },
    "authorization_context": {
      "type": "object",
      "required": ["authorization_type"],
      "properties": {
        "authorization_type": {
          "type": "string",
          "enum": ["GOVERNANCE_COMPLIANCE", "QUALITY_GATE_PASSED", "EMERGENCY_RESOLUTION", "HUMAN_INSTRUCTION"]
        },
        "quality_gate_status": {"type": "object"},
        "governance_status": {"type": "object"},
        "human_authorization": {"type": "object"},
        "emergency_context": {"type": "object"}
      }
    },
    "evidence_references": {
      "type": "object",
      "properties": {
        "architecture_evidence": {"type": "object"},
        "qa_evidence": {"type": "object"},
        "governance_evidence": {"type": "object"},
        "prior_approvals": {"type": "array"},
        "ci_cd_evidence": {"type": "object"}
      }
    },
    "expected_outcome": {
      "type": "object",
      "required": ["desired_state", "success_criteria"],
      "properties": {
        "desired_state": {"type": "string"},
        "success_criteria": {
          "type": "array",
          "items": {"type": "string"}
        },
        "failure_scenarios": {
          "type": "array",
          "items": {"type": "object"}
        }
      }
    },
    "audit_context": {
      "type": "object",
      "properties": {
        "requirement_id": {"type": "string"},
        "build_phase": {
          "type": "string",
          "enum": ["Architecture", "QA Creation", "Building", "Validation", "Delivery"]
        },
        "governance_rule": {"type": "string"},
        "compliance_framework": {
          "type": "string",
          "enum": ["ISO 27001", "ISO 31000", "NIST CSF", "N/A"]
        },
        "control_reference": {"type": "string"},
        "traceability": {"type": "object"}
      }
    },
    "execution_tracking": {
      "type": "object",
      "properties": {
        "execution_status": {
          "type": "string",
          "enum": ["PENDING", "IN_PROGRESS", "COMPLETED", "FAILED"]
        },
        "assigned_executor": {"type": "string"},
        "execution_start": {"type": "string", "format": "date-time"},
        "execution_end": {"type": "string", "format": "date-time"},
        "execution_duration": {"type": "number"},
        "execution_result": {
          "type": "string",
          "enum": ["SUCCESS", "FAILURE", "PARTIAL"]
        },
        "result_evidence": {"type": "string"}
      }
    }
  }
}
```

### 6.2 JSON File Location
Machine-readable instructions stored at:
```
.governance/delegated-actions/instructions/DAI-[YYYY]-[NNNN].json
```

---

## 7. Validation Rules

### 7.1 Structural Validation
- All REQUIRED sections/fields MUST be present
- Instruction ID MUST follow format: DAI-YYYY-NNNN
- Instruction ID MUST be unique across repository
- Timestamps MUST be valid ISO 8601
- Repository references MUST be valid owner/repo format
- Action type MUST be from normative list (Section 5)

### 7.2 Authorization Validation
- Authorization context MUST match action type requirements
- For MERGE_PR: Human authorization REQUIRED (unless emergency)
- For MERGE_PR: QA status MUST be 100% GREEN
- For MERGE_PR: Governance compliance MUST be verified
- Evidence references MUST exist and be accessible

### 7.3 Parameter Validation
- Action parameters MUST be complete for action type
- Required parameters for action type MUST be present
- Parameter values MUST be valid for their type
- Target resources MUST exist (where applicable)

### 7.4 Consistency Validation
- Status transitions MUST be logical (PENDING → EXECUTING → COMPLETED/FAILED)
- Execution tracking MUST be consistent with status
- Result evidence MUST be provided for COMPLETED status
- Failure scenarios MUST be addressed if status = FAILED

---

## 8. Instruction Lifecycle

### 8.1 Instruction Creation (FM)
1. FM determines platform action is required
2. FM generates instruction ID (DAI-YYYY-NNNN)
3. FM compiles complete instruction per schema
4. FM validates instruction completeness
5. FM commits instruction to repository
6. FM delegates instruction to Maturion

### 8.2 Instruction Receipt (Maturion)
1. Maturion receives delegation notification
2. Maturion locates instruction file
3. Maturion validates instruction schema compliance
4. Maturion validates authorization context
5. Maturion updates status to EXECUTING
6. Maturion begins execution

### 8.3 Instruction Execution (Maturion)
1. Maturion executes platform action via GitHub API
2. Maturion captures execution evidence
3. Maturion updates execution tracking
4. Maturion generates audit record
5. Maturion updates status to COMPLETED or FAILED
6. Maturion notifies FM of completion

### 8.4 Instruction Completion (FM)
1. FM receives completion notification
2. FM verifies expected outcome achieved
3. FM records result in evidence trail
4. FM continues with dependent workflows
5. FM archives instruction for audit trail

---

## 9. Integration with Audit Model

### 9.1 Instruction as Audit Evidence
Every instruction serves as audit evidence for:
- Delegation authorization (who requested, why)
- Platform action execution (what was done, when)
- Governance compliance (authorization evidence)
- Traceability (requirement → action → outcome)

### 9.2 Instruction Cataloging
All instructions MUST be cataloged in:
```
.governance/delegated-actions/INSTRUCTION_CATALOG.md
```

Catalog format:
```markdown
| Instruction ID | Action Type | Requestor | Created | Status | Audit Record |
|----------------|-------------|-----------|---------|--------|--------------|
| DAI-2025-0001 | CREATE_PR | FM-001 | 2025-12-25T10:00:00Z | COMPLETED | DAR-2025-0001 |
```

### 9.3 Audit Record Linkage
Each instruction MUST link to corresponding audit record (see DELEGATED_ACTION_AUDIT.schema.md)
- Instruction → Audit Record (1:1 relationship)
- Audit record provides execution evidence
- Both retained for complete audit trail

---

## 10. Relationship to Other Governance Artifacts

This schema implements requirements from:
- **PLATFORM_AUTHORITY_BOUNDARY_AND_DELEGATION_MODEL.md** Section 5.2 - Delegation Protocol
- **PLATFORM_AUTHORITY_BOUNDARY_AND_DELEGATION_MODEL.md** Section 7 - Audit Requirements
- **FM_ROLE_CANON.md** - FM authority boundaries
- **AUDIT_READINESS_MODEL.md** - Evidence and traceability requirements

This schema integrates with:
- **DELEGATED_ACTION_AUDIT.schema.md** - Execution audit records
- **EVIDENCE_CATALOG.schema.md** - Evidence cataloging
- **CONTROL_MAPPING.schema.md** - Compliance control mapping

---

## 11. Enforcement

### 11.1 Instruction Requirements
- Instructions MUST conform to this schema before Maturion accepts delegation
- Malformed instructions MUST be rejected with validation errors
- FM MUST correct and resubmit rejected instructions
- No platform actions without valid instruction

### 11.2 Immutability Requirements
- Instructions MUST NOT be modified after creation
- Status updates tracked in execution_tracking section only
- Corrections require new instruction with supersession reference
- Original instructions retained for audit trail

### 11.3 Audit Requirements
- All instructions MUST be cataloged
- Instructions serve as compliance evidence
- Instruction-audit record linkage MUST be maintained
- Instructions accessible for governance validation

---

## 12. Non-Compliance Consequences

Failure to use Delegated Action Instructions conforming to this schema constitutes:
- Platform authority boundary violation
- Delegation protocol breach (PLATFORM_AUTHORITY_BOUNDARY_AND_DELEGATION_MODEL.md violation)
- Audit trail gap (AUDIT_READINESS_MODEL.md violation)
- Evidence requirement failure
- Governance completeness RED state

---

**End of DELEGATED_ACTION_INSTRUCTION Schema**

---

**Document Metadata**:
- Schema ID: DELEGATED_ACTION_INSTRUCTION_SCHEMA_V1
- Authority: Canonical Governance Specification
- Required By: G-C13, PLATFORM_AUTHORITY_BOUNDARY_AND_DELEGATION_MODEL.md
- Enforcement: Maturion (mandatory schema validation before execution)
- Integration: DELEGATED_ACTION_AUDIT.schema.md, EVIDENCE_CATALOG.schema.md

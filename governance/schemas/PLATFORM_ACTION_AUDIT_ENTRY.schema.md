# PLATFORM ACTION AUDIT ENTRY SCHEMA

## Status
Canonical Governance Specification  
Version: v1.0  
Authority: Governance Administrator  
Required By: DELEGATION_INSTRUCTION_AND_AUDIT_MODEL.md (G-C13)

---

## 1. Purpose

This document defines the normative schema for **Platform Action Audit Entry** artifacts.

Platform action audit entries are immutable evidence records documenting every platform action (GitHub API operation) performed by Maturion on behalf of Foreman (FM) or human authority.

A platform action audit entry artifact is valid only if it conforms to this schema.

---

## 2. Core Invariants

1. **Every platform action MUST generate an audit entry** - No actions without audit trail
2. **Audit entries MUST be immutable** - No modification after creation
3. **Audit entries MUST be complete** - All required evidence present
4. **Audit entries MUST be traceable** - Link to instruction, response, and authorization
5. **Audit entries MUST be permanent** - Never deleted, only superseded if correction needed

---

## 3. Audit Entry Location

Platform action audit entries MUST be stored in multiple locations:

### 3.1 Maturion Central Audit Log (Primary)
**Location**: Maturion centralized audit storage  
**Format**: Structured files or database records per this schema  
**Retention**: Permanent

### 3.2 Repository Evidence Trail (Secondary)
**Location**: `<repository>/.evidence/platform-actions/YYYY-MM/PAA-YYYY-MM-DD-<seq>.md`  
**Format**: Markdown files conforming to this schema  
**Retention**: Permanent within repository

Example structure:
```
.evidence/
├── platform-actions/
│   ├── 2025-12/
│   │   ├── PAA-2025-12-25-001.md
│   │   ├── PAA-2025-12-25-002.md
│   │   └── PAA-2025-12-25-003.md
│   └── 2026-01/
│       └── PAA-2026-01-02-001.md
```

---

## 4. Schema Structure (Normative)

### 4.1 Audit Entry Header (REQUIRED)

```yaml
PLATFORM_ACTION_AUDIT_VERSION: "1.0"
AUDIT_ENTRY_ID: "<unique-id>"  # Format: PAA-YYYY-MM-DD-<sequence> (e.g., PAA-2025-12-25-001)
TIMESTAMP_UTC: "<ISO-8601-timestamp>"  # When audit entry was created
```

**Field Requirements**:
- `PLATFORM_ACTION_AUDIT_VERSION`: MUST be "1.0" (current version)
- `AUDIT_ENTRY_ID`: MUST be unique across all audit entries, MUST follow format `PAA-YYYY-MM-DD-<NNN>` where NNN is zero-padded sequence
- `TIMESTAMP_UTC`: MUST be ISO 8601 format in UTC timezone

---

### 4.2 Action Identity (REQUIRED)

```yaml
ACTION:
  TYPE: "<action-type>"  # Platform action type (e.g., "CREATE_PULL_REQUEST")
  INSTRUCTION_ID: "<instruction-id>"  # Delegation instruction that requested this action
  RESPONSE_ID: "<response-id>"  # Delegation response that confirmed this action
```

**Field Requirements**:
- `TYPE`: MUST be canonical action type from DELEGATION_INSTRUCTION.schema.md
- `INSTRUCTION_ID`: MUST match ID from delegation instruction (format: `DI-YYYY-MM-DD-NNN`)
- `RESPONSE_ID`: MUST match ID from delegation response (format: `DR-YYYY-MM-DD-NNN`)

---

### 4.3 Authority (REQUIRED)

```yaml
REQUESTER:
  AGENT_TYPE: "<agent-type>"  # Values: "FOREMAN" | "HUMAN"
  AGENT_INSTANCE_ID: "<instance-id>"  # Unique identifier for requesting agent
  REPOSITORY: "<owner/repo>"  # Repository where action was performed
  AUTHORIZATION_LEVEL: "<level>"  # Values: "AUTONOMOUS" | "HUMAN_APPROVED" | "ESCALATION_RESOLVED"

EXECUTOR:
  AGENT_TYPE: "MATURION"
  AGENT_INSTANCE_ID: "<maturion-instance-id>"  # Unique identifier for Maturion instance
  EXECUTION_TIMESTAMP: "<ISO-8601-timestamp>"  # When Maturion executed the action
```

**Field Requirements**:
- `REQUESTER.AGENT_TYPE`: MUST be "FOREMAN" or "HUMAN"
- `REQUESTER.AGENT_INSTANCE_ID`: MUST uniquely identify requesting agent
- `REQUESTER.REPOSITORY`: MUST be valid GitHub repository (format: "owner/repo")
- `REQUESTER.AUTHORIZATION_LEVEL`: MUST match authorization level from instruction
- `EXECUTOR.AGENT_TYPE`: MUST be "MATURION"
- `EXECUTOR.AGENT_INSTANCE_ID`: MUST uniquely identify Maturion instance
- `EXECUTOR.EXECUTION_TIMESTAMP`: MUST be ISO 8601 format in UTC timezone

---

### 4.4 Authorization Evidence (REQUIRED)

```yaml
AUTHORIZATION_EVIDENCE:
  GOVERNANCE_STATUS: "<status>"  # Values: "COMPLIANT" | "BLOCKED" | "OVERRIDE"
  GOVERNANCE_EVIDENCE_PATH: "<path>"  # Relative path to governance evidence
  QA_STATUS: "<status>"  # Values: "GREEN" | "AMBER" | "RED" | "NOT_APPLICABLE"
  QA_EVIDENCE_PATH: "<path>"  # Relative path to QA evidence or "NOT_APPLICABLE"
  HUMAN_APPROVAL: "<YES|NO>"
  HUMAN_APPROVAL_REFERENCE: "<reference>"  # If HUMAN_APPROVAL=YES
  ESCALATION_COMPLETED: "<YES|NO|NOT_APPLICABLE>"
  ESCALATION_REFERENCE: "<reference>"  # If ESCALATION_COMPLETED=YES
```

**Field Requirements**:
- `GOVERNANCE_STATUS`: MUST match status from instruction authorization
- `GOVERNANCE_EVIDENCE_PATH`: MUST be valid relative path to evidence file
- `QA_STATUS`: MUST match status from instruction authorization
- `QA_EVIDENCE_PATH`: MUST be valid path when QA_STATUS != NOT_APPLICABLE
- `HUMAN_APPROVAL`: MUST match value from instruction authorization
- `HUMAN_APPROVAL_REFERENCE`: REQUIRED when HUMAN_APPROVAL=YES (e.g., "Issue #123 comment by johan-ras")
- `ESCALATION_COMPLETED`: MUST match value from instruction authorization
- `ESCALATION_REFERENCE`: REQUIRED when ESCALATION_COMPLETED=YES

---

### 4.5 Platform API Interaction (REQUIRED)

```yaml
PLATFORM_REQUEST:
  ENDPOINT: "<github-api-endpoint>"  # Full API endpoint URL
  METHOD: "<http-method>"  # Values: "GET" | "POST" | "PUT" | "PATCH" | "DELETE"
  PARAMETERS: |
    <sanitized-parameters>  # YAML or JSON representation with sensitive data redacted
  TIMESTAMP_UTC: "<ISO-8601-timestamp>"  # When request was sent

PLATFORM_RESPONSE:
  STATUS_CODE: <http-status-code>  # HTTP status code from GitHub API
  STATUS: "<status>"  # Values: "SUCCESS" | "FAILURE" | "BLOCKED" | "INVALID_REQUEST"
  RESOURCE_URL: "<github-url>"  # Full GitHub URL (if success)
  RESOURCE_ID: "<resource-id>"  # GitHub resource ID (if success)
  RESOURCE_TYPE: "<resource-type>"  # Resource type (if success)
  ERROR_MESSAGE: "<error-message>"  # GitHub error message (if failure)
  ERROR_CODE: "<error-code>"  # GitHub error code (if failure)
  TIMESTAMP_UTC: "<ISO-8601-timestamp>"  # When response was received
```

**Field Requirements**:
- `PLATFORM_REQUEST.ENDPOINT`: MUST be full GitHub API endpoint (e.g., "https://api.github.com/repos/owner/repo/pulls")
- `PLATFORM_REQUEST.METHOD`: MUST be valid HTTP method
- `PLATFORM_REQUEST.PARAMETERS`: MUST be sanitized (credentials/tokens redacted)
- `PLATFORM_REQUEST.TIMESTAMP_UTC`: MUST be ISO 8601 format
- `PLATFORM_RESPONSE.STATUS_CODE`: MUST be actual HTTP status code returned
- `PLATFORM_RESPONSE.STATUS`: MUST match status from delegation response
- `PLATFORM_RESPONSE.RESOURCE_URL`: REQUIRED when STATUS=SUCCESS
- `PLATFORM_RESPONSE.ERROR_MESSAGE`: REQUIRED when STATUS=FAILURE or BLOCKED
- `PLATFORM_RESPONSE.TIMESTAMP_UTC`: MUST be ISO 8601 format

---

### 4.6 Outcome (REQUIRED)

```yaml
OUTCOME:
  RESULTING_STATE: "<state-description>"  # Human-readable description of resulting state
  RESOURCE_ID: "<resource-id>"  # Resource affected (if applicable)
  RESOURCE_TYPE: "<resource-type>"  # Type of resource affected (if applicable)
  RESOURCE_NUMBER: <integer>  # Issue/PR number (if applicable)
  SUCCESS: "<YES|NO>"  # Whether action achieved intended outcome
  COMPLETION_NOTES: "<notes>"  # Additional notes about outcome
```

**Field Requirements**:
- `RESULTING_STATE`: MUST describe state after action (e.g., "Pull request created in open state")
- `RESOURCE_ID`: MUST be provided when action creates/modifies resource
- `RESOURCE_TYPE`: MUST be provided when RESOURCE_ID is provided
- `RESOURCE_NUMBER`: MUST be provided for issues and PRs
- `SUCCESS`: MUST be "YES" if STATUS=SUCCESS, "NO" otherwise
- `COMPLETION_NOTES`: OPTIONAL, additional context about outcome

---

### 4.7 Governance Context (REQUIRED)

```yaml
GOVERNANCE_CONTEXT:
  REQUIREMENT_ID: "<requirement-reference>"  # Requirement that necessitates this action
  BUILD_PHASE: "<phase-name>"  # Build phase when action occurred
  GOVERNANCE_RULE: "<canonical-rule-reference>"  # Governance rule authorizing action
  REASON: "<reason-description>"  # Why this action was needed
```

**Field Requirements**:
- `REQUIREMENT_ID`: MUST reference requirement specification or issue
- `BUILD_PHASE`: MUST identify build phase (e.g., "INITIALIZATION", "BUILD_TO_GREEN", "DELIVERY")
- `GOVERNANCE_RULE`: MUST reference canonical governance document and section (e.g., "BUILDER_FIRST_PR_MERGE_MODEL.md Section 6.1")
- `REASON`: MUST provide human-readable explanation

---

### 4.8 Evidence Integrity (REQUIRED)

```yaml
INTEGRITY:
  CHECKSUM: "<sha256-hash>"  # SHA-256 hash of audit entry content
  IMMUTABLE: true  # MUST always be true
  SUPERSEDES: "<previous-audit-entry-id>"  # If this entry corrects previous entry (optional)
  SUPERSEDED_BY: null  # Updated only if this entry is superseded (initially null)
  CREATED_BY: "<creator-id>"  # System/agent that created entry
  VERIFICATION_STATUS: "<VERIFIED|UNVERIFIED>"  # Whether entry has been verified
```

**Field Requirements**:
- `CHECKSUM`: MUST be SHA-256 hash of audit entry content (excluding this field)
- `IMMUTABLE`: MUST always be `true`
- `SUPERSEDES`: OPTIONAL, only present if entry corrects previous entry
- `SUPERSEDED_BY`: MUST be `null` when created, updated only if entry is superseded
- `CREATED_BY`: MUST identify system/agent that created entry
- `VERIFICATION_STATUS`: MUST be "VERIFIED" after human/automated verification, "UNVERIFIED" initially

---

## 5. Audit Entry Lifecycle

### 5.1 Creation
Audit entry created when:
1. Maturion receives delegation instruction
2. Maturion validates instruction
3. Maturion executes (or attempts) platform action
4. Maturion generates audit entry with complete evidence
5. Maturion writes audit entry to all storage locations

**Timing**: Audit entry MUST be created before delegation response is sent to FM.

### 5.2 Verification
Audit entry verified when:
1. Automated verification confirms checksums match
2. Human authority reviews and confirms accuracy
3. VERIFICATION_STATUS updated to "VERIFIED"

**Frequency**: Automated verification continuous, human verification periodic or on-demand.

### 5.3 Supersession
Audit entry superseded when:
1. Error discovered in audit entry
2. New corrected audit entry created
3. New entry includes SUPERSEDES field referencing original
4. Original entry updated with SUPERSEDED_BY field referencing new entry

**Critical**: Original entry MUST NOT be deleted or modified (except SUPERSEDED_BY field).

### 5.4 Retention
Audit entries MUST be:
- Retained permanently (never deleted)
- Accessible for audit and forensic analysis
- Protected from unauthorized modification
- Backed up regularly

---

## 6. Access Control

### 6.1 Read Access
**Allowed**:
- Human authority (Johan): Full access to all audit entries
- Watchdog: Read-only access to all audit entries
- Governance Administrator: Read-only access to all audit entries
- FM: Read-only access to own delegated actions only

**Prohibited**:
- External/public access (without explicit approval)
- Unauthenticated access

### 6.2 Write Access
**Allowed**:
- Maturion: Create new audit entries only
- Automated verification: Update VERIFICATION_STATUS only
- Audit correction process: Create superseding entries only

**Prohibited**:
- Modification of existing entries (except SUPERSEDED_BY field)
- Deletion of entries
- Manual edits without audit trail

---

## 7. Validation Rules

### 7.1 Schema Validation
Audit entries MUST validate:
- All REQUIRED fields present
- Field values conform to specified types and formats
- AUDIT_ENTRY_ID follows format "PAA-YYYY-MM-DD-NNN"
- All timestamps are valid ISO 8601 format
- INSTRUCTION_ID and RESPONSE_ID follow correct formats
- CHECKSUM is valid SHA-256 hash

### 7.2 Consistency Validation
Audit entries MUST validate:
- INSTRUCTION_ID references existing delegation instruction
- RESPONSE_ID references existing delegation response
- ACTION.TYPE matches type from instruction
- PLATFORM_RESPONSE.STATUS matches status from response
- AUTHORIZATION_EVIDENCE matches evidence from instruction
- GOVERNANCE_CONTEXT.GOVERNANCE_RULE references valid canonical document

### 7.3 Integrity Validation
Audit entries MUST validate:
- CHECKSUM matches calculated hash of content
- IMMUTABLE field is true
- If SUPERSEDES field present, referenced entry exists
- If SUPERSEDED_BY field non-null, referenced entry exists

---

## 8. Examples

### 8.1 Example: Successful PR Creation

```yaml
PLATFORM_ACTION_AUDIT_VERSION: "1.0"
AUDIT_ENTRY_ID: "PAA-2025-12-25-001"
TIMESTAMP_UTC: "2025-12-25T10:30:15Z"

ACTION:
  TYPE: "CREATE_PULL_REQUEST"
  INSTRUCTION_ID: "DI-2025-12-25-001"
  RESPONSE_ID: "DR-2025-12-25-001"

REQUESTER:
  AGENT_TYPE: "FOREMAN"
  AGENT_INSTANCE_ID: "fm-prod-001"
  REPOSITORY: "MaturionISMS/example-app"
  AUTHORIZATION_LEVEL: "HUMAN_APPROVED"

EXECUTOR:
  AGENT_TYPE: "MATURION"
  AGENT_INSTANCE_ID: "maturion-prod-001"
  EXECUTION_TIMESTAMP: "2025-12-25T10:30:12Z"

AUTHORIZATION_EVIDENCE:
  GOVERNANCE_STATUS: "COMPLIANT"
  GOVERNANCE_EVIDENCE_PATH: ".governance/compliance-check.md"
  QA_STATUS: "GREEN"
  QA_EVIDENCE_PATH: ".qa/results-2025-12-25.json"
  HUMAN_APPROVAL: "YES"
  HUMAN_APPROVAL_REFERENCE: "Issue #123 comment by johan-ras at 2025-12-25T09:00:00Z"
  ESCALATION_COMPLETED: "NOT_APPLICABLE"
  ESCALATION_REFERENCE: "NOT_APPLICABLE"

PLATFORM_REQUEST:
  ENDPOINT: "https://api.github.com/repos/MaturionISMS/example-app/pulls"
  METHOD: "POST"
  PARAMETERS: |
    {
      "title": "Feature 123 - User Authentication System",
      "head": "builder/feature-auth-123",
      "base": "main",
      "body": "[Full PR description...]",
      "draft": false
    }
  TIMESTAMP_UTC: "2025-12-25T10:30:10Z"

PLATFORM_RESPONSE:
  STATUS_CODE: 201
  STATUS: "SUCCESS"
  RESOURCE_URL: "https://github.com/MaturionISMS/example-app/pull/42"
  RESOURCE_ID: "pr_12345abcdef"
  RESOURCE_TYPE: "pull_request"
  ERROR_MESSAGE: null
  ERROR_CODE: null
  TIMESTAMP_UTC: "2025-12-25T10:30:12Z"

OUTCOME:
  RESULTING_STATE: "Pull request #42 created in open state, ready for review"
  RESOURCE_ID: "pr_12345abcdef"
  RESOURCE_TYPE: "pull_request"
  RESOURCE_NUMBER: 42
  SUCCESS: "YES"
  COMPLETION_NOTES: "PR created successfully with reviewer assigned. All governance and QA requirements satisfied."

GOVERNANCE_CONTEXT:
  REQUIREMENT_ID: "REQ-123"
  BUILD_PHASE: "DELIVERY"
  GOVERNANCE_RULE: "BUILDER_FIRST_PR_MERGE_MODEL.md Section 6.1"
  REASON: "Builder completed build-to-green with 100% GREEN QA. FM validated compliance and human approval. Creating PR for review per governance."

INTEGRITY:
  CHECKSUM: "a1b2c3d4e5f6789012345678901234567890123456789012345678901234567890"
  IMMUTABLE: true
  SUPERSEDES: null
  SUPERSEDED_BY: null
  CREATED_BY: "maturion-prod-001"
  VERIFICATION_STATUS: "UNVERIFIED"
```

---

### 8.2 Example: Failed Action with Rate Limiting

```yaml
PLATFORM_ACTION_AUDIT_VERSION: "1.0"
AUDIT_ENTRY_ID: "PAA-2025-12-25-002"
TIMESTAMP_UTC: "2025-12-25T11:00:05Z"

ACTION:
  TYPE: "CREATE_GITHUB_ISSUE"
  INSTRUCTION_ID: "DI-2025-12-25-002"
  RESPONSE_ID: "DR-2025-12-25-002"

REQUESTER:
  AGENT_TYPE: "FOREMAN"
  AGENT_INSTANCE_ID: "fm-prod-001"
  REPOSITORY: "MaturionISMS/example-app"
  AUTHORIZATION_LEVEL: "ESCALATION_RESOLVED"

EXECUTOR:
  AGENT_TYPE: "MATURION"
  AGENT_INSTANCE_ID: "maturion-prod-001"
  EXECUTION_TIMESTAMP: "2025-12-25T11:00:03Z"

AUTHORIZATION_EVIDENCE:
  GOVERNANCE_STATUS: "BLOCKED"
  GOVERNANCE_EVIDENCE_PATH: ".governance/escalation-required.md"
  QA_STATUS: "RED"
  QA_EVIDENCE_PATH: ".qa/results-2025-12-25-failed.json"
  HUMAN_APPROVAL: "YES"
  HUMAN_APPROVAL_REFERENCE: "BUILD_INTERVENTION_AND_ALERT_MODEL.md Section 8.2"
  ESCALATION_COMPLETED: "NO"
  ESCALATION_REFERENCE: "Escalation in progress - issue creation is escalation mechanism"

PLATFORM_REQUEST:
  ENDPOINT: "https://api.github.com/repos/MaturionISMS/example-app/issues"
  METHOD: "POST"
  PARAMETERS: |
    {
      "title": "Build Failure: SMTP Configuration Incomplete",
      "body": "[Full failure report...]",
      "labels": ["escalation", "S1"],
      "assignees": ["johan-ras"]
    }
  TIMESTAMP_UTC: "2025-12-25T11:00:02Z"

PLATFORM_RESPONSE:
  STATUS_CODE: 403
  STATUS: "FAILURE"
  RESOURCE_URL: null
  RESOURCE_ID: null
  RESOURCE_TYPE: null
  ERROR_MESSAGE: "API rate limit exceeded. Limit resets at 2025-12-25T12:00:00Z."
  ERROR_CODE: "rate_limit_exceeded"
  TIMESTAMP_UTC: "2025-12-25T11:00:03Z"

OUTCOME:
  RESULTING_STATE: "Issue creation failed due to API rate limiting"
  RESOURCE_ID: null
  RESOURCE_TYPE: "issue"
  RESOURCE_NUMBER: null
  SUCCESS: "NO"
  COMPLETION_NOTES: "Rate limit exceeded. Retry scheduled for 2025-12-25T12:00:10Z after rate limit reset."

GOVERNANCE_CONTEXT:
  REQUIREMENT_ID: "BUILD-001"
  BUILD_PHASE: "BUILD_TO_GREEN"
  GOVERNANCE_RULE: "BUILD_INTERVENTION_AND_ALERT_MODEL.md Section 8.2"
  REASON: "Architecture gap (SMTP configuration) detected during build. Severity S1 requires immediate human attention per escalation protocol."

INTEGRITY:
  CHECKSUM: "b2c3d4e5f6789012345678901234567890123456789012345678901234567891"
  IMMUTABLE: true
  SUPERSEDES: null
  SUPERSEDED_BY: null
  CREATED_BY: "maturion-prod-001"
  VERIFICATION_STATUS: "UNVERIFIED"
```

---

## 9. Metrics and Observability

Audit entries support these metrics:

### 9.1 Action Metrics
- Total actions by type (aggregated from ACTION.TYPE)
- Success rate (SUCCESS=YES / total)
- Failure rate by error type (from PLATFORM_RESPONSE.ERROR_CODE)
- Average execution duration (from timestamps)

### 9.2 Authorization Metrics
- Authorization level distribution (from REQUESTER.AUTHORIZATION_LEVEL)
- Human approval rate (AUTHORIZATION_EVIDENCE.HUMAN_APPROVAL=YES / total)
- Governance status distribution (from AUTHORIZATION_EVIDENCE.GOVERNANCE_STATUS)

### 9.3 Audit Metrics
- Verification rate (VERIFICATION_STATUS=VERIFIED / total)
- Supersession rate (entries with SUPERSEDES field / total)
- Average time to verification
- Audit trail completeness

---

## 10. Versioning

Current Version: **1.0**

**Version History**:
- **1.0** (2025-12-25): Initial canonical schema definition

**Backward Compatibility**:
- Future versions MUST maintain backward compatibility
- Breaking changes require major version increment
- Old audit entries remain valid and accessible

---

## 11. Integration with Other Governance

This schema is required by:
- **DELEGATION_INSTRUCTION_AND_AUDIT_MODEL.md** (G-C13) - Section 6.1
- **GOVERNANCE_COMPLETENESS_MODEL.md** - Section 5 (Platform Authority component)
- **AUDIT_READINESS_MODEL.md** - Platform action evidence specification

This schema depends on:
- **DELEGATION_INSTRUCTION.schema.md** - Instruction IDs and structure
- **DELEGATION_RESPONSE.schema.md** - Response IDs and structure

---

**END OF PLATFORM_ACTION_AUDIT_ENTRY.schema.md**

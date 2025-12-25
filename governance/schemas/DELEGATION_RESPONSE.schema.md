# DELEGATION RESPONSE SCHEMA

## Status
Canonical Governance Specification  
Version: v1.0  
Authority: Governance Administrator  
Required By: DELEGATION_INSTRUCTION_AND_AUDIT_MODEL.md (G-C13)

---

## 1. Purpose

This document defines the normative schema for **Delegation Response** artifacts.

Delegation responses are structured confirmations from Maturion to Foreman (FM) after executing (or attempting to execute) platform actions requested via delegation instructions.

A delegation response artifact is valid only if it conforms to this schema.

---

## 2. Core Invariants

1. **All delegation responses MUST be complete** - No partial responses
2. **All delegation responses MUST reference original instruction** - Complete traceability required
3. **All delegation responses MUST include execution outcome** - Success or failure with evidence
4. **All delegation responses MUST include audit trail reference** - Every action generates audit entry
5. **FM MUST NOT proceed until valid response received** - No assumptions about success

---

## 3. Schema Structure (Normative)

### 3.1 Response Header (REQUIRED)

```yaml
DELEGATION_RESPONSE_VERSION: "1.0"
RESPONSE_ID: "<unique-id>"  # Format: DR-YYYY-MM-DD-<sequence> (e.g., DR-2025-12-25-001)
INSTRUCTION_ID: "<instruction-id>"  # MUST match INSTRUCTION_ID from delegation instruction
TIMESTAMP_UTC: "<ISO-8601-timestamp>"  # Format: YYYY-MM-DDTHH:MM:SSZ
```

**Field Requirements**:
- `DELEGATION_RESPONSE_VERSION`: MUST be "1.0" (current version)
- `RESPONSE_ID`: MUST be unique across all responses, MUST follow format `DR-YYYY-MM-DD-<NNN>` where NNN is zero-padded sequence
- `INSTRUCTION_ID`: MUST exactly match INSTRUCTION_ID from corresponding delegation instruction
- `TIMESTAMP_UTC`: MUST be ISO 8601 format in UTC timezone, MUST be after instruction timestamp

---

### 3.2 Execution Status (REQUIRED)

```yaml
STATUS: "<status>"  # Values: "SUCCESS" | "FAILURE" | "BLOCKED" | "INVALID_REQUEST"
```

**Status Values**:

#### SUCCESS
Platform action completed successfully:
- Resource created/updated/deleted as requested
- Platform confirmation received
- Expected outcome achieved
- Audit trail complete

#### FAILURE
Platform action attempted but failed:
- GitHub API returned error
- Operational failure (network, rate limit, transient error)
- Action not completed
- May be retryable after remediation

#### BLOCKED
Platform action rejected by platform constraints:
- Branch protection rules prevent action
- Required status checks not passing
- Permissions insufficient
- State conflicts prevent action
- Unlikely to succeed without external change

#### INVALID_REQUEST
Delegation instruction was malformed or invalid:
- Schema validation failed
- Required fields missing
- Authorization insufficient
- Parameters invalid
- Maturion did NOT attempt platform action

---

### 3.3 Platform Evidence (REQUIRED for SUCCESS)

```yaml
PLATFORM_EVIDENCE:
  RESOURCE_TYPE: "<resource-type>"  # Values: "issue" | "pull_request" | "branch" | "tag" | "workflow" | "comment" | "review"
  RESOURCE_ID: "<resource-id>"  # Unique identifier from GitHub (e.g., issue ID, PR ID)
  RESOURCE_NUMBER: <integer>  # For issues and PRs only (user-visible number)
  RESOURCE_URL: "<github-url>"  # Full HTTPS URL to resource
  RESOURCE_STATE: "<state>"  # Current state (e.g., "open", "closed", "merged")
  CREATED_AT: "<ISO-8601-timestamp>"  # When resource was created (if action created resource)
  UPDATED_AT: "<ISO-8601-timestamp>"  # When resource was updated (if action updated resource)
  API_RESPONSE_STATUS: <http-status-code>  # HTTP status from GitHub API (e.g., 201, 200)
```

**Field Requirements**:
- `RESOURCE_TYPE`: MUST match resource type created/modified by action
- `RESOURCE_ID`: MUST be GitHub's unique identifier for resource
- `RESOURCE_NUMBER`: REQUIRED for issues and PRs (GitHub issue/PR number)
- `RESOURCE_URL`: MUST be full GitHub URL (e.g., `https://github.com/owner/repo/issues/123`)
- `RESOURCE_STATE`: MUST reflect current state after action
- `CREATED_AT`: REQUIRED if action created resource
- `UPDATED_AT`: REQUIRED if action modified resource
- `API_RESPONSE_STATUS`: MUST be actual HTTP status from GitHub API

**Note**: This section MUST be omitted if STATUS is not SUCCESS.

---

### 3.4 Failure Details (REQUIRED for FAILURE or BLOCKED)

```yaml
FAILURE_DETAILS:
  ERROR_TYPE: "<error-type>"  # Values: "API_ERROR" | "AUTHORIZATION_FAILURE" | "VALIDATION_FAILURE" | "PLATFORM_CONSTRAINT"
  ERROR_CODE: "<error-code>"  # GitHub error code or HTTP status
  ERROR_MESSAGE: "<error-message>"  # Detailed error message from GitHub or Maturion
  REMEDIATION_GUIDANCE: "<remediation>"  # Human-readable guidance on how to fix
  RETRY_ALLOWED: "<YES|NO>"  # Whether FM should retry this action
  RETRY_AFTER: "<seconds>"  # If retry recommended, how long to wait (optional)
```

**Error Types**:

#### API_ERROR
GitHub API returned error response:
- Rate limiting (403 with rate limit message)
- Service unavailable (503)
- Internal server error (500)
- **Remediation**: Retry with backoff, check GitHub status

#### AUTHORIZATION_FAILURE
Insufficient permissions for action:
- Token lacks required scope
- Resource access forbidden (403)
- Authentication failed (401)
- **Remediation**: Verify token permissions, verify resource access

#### VALIDATION_FAILURE
Request parameters invalid per GitHub API:
- Branch doesn't exist
- PR number invalid
- Invalid state transition
- **Remediation**: Correct parameters, verify resource state

#### PLATFORM_CONSTRAINT
Platform policy prevents action:
- Branch protection rules block action
- Required status checks not passing
- Merge conflicts exist
- **Remediation**: Wait for constraints to clear, update repository settings

**Note**: This section MUST be omitted if STATUS is SUCCESS. This section MUST be present if STATUS is FAILURE or BLOCKED.

---

### 3.5 Invalid Request Details (REQUIRED for INVALID_REQUEST)

```yaml
VALIDATION_ERRORS:
  - FIELD: "<field-path>"  # Dot-notation path to invalid field (e.g., "ACTION.PARAMETERS.HEAD_BRANCH")
    ERROR: "<validation-error>"  # What is wrong with field
    EXPECTED: "<expected-value>"  # What field should be
  - FIELD: "<field-path>"
    ERROR: "<validation-error>"
    EXPECTED: "<expected-value>"
```

**Field Requirements**:
- `FIELD`: MUST use dot-notation to identify exact field in instruction (e.g., "AUTHORIZATION.QA_STATUS")
- `ERROR`: MUST clearly describe what is wrong
- `EXPECTED`: MUST clearly describe what is required
- Array MUST contain at least one validation error
- Array MAY contain multiple validation errors (all detected errors should be reported)

**Example**:
```yaml
VALIDATION_ERRORS:
  - FIELD: "ACTION.PARAMETERS.HEAD_BRANCH"
    ERROR: "Branch 'feature/test' does not exist in repository"
    EXPECTED: "Valid branch name that exists in repository"
  - FIELD: "AUTHORIZATION.HUMAN_APPROVAL"
    ERROR: "Missing required field"
    EXPECTED: "HUMAN_APPROVAL=YES with HUMAN_APPROVAL_EVIDENCE for CREATE_PULL_REQUEST action"
```

**Note**: This section MUST be omitted if STATUS is not INVALID_REQUEST. This section MUST be present if STATUS is INVALID_REQUEST.

---

### 3.6 Audit Trail Reference (REQUIRED)

```yaml
AUDIT_ENTRY_ID: "<audit-entry-id>"  # Format: PAA-YYYY-MM-DD-<sequence>
AUDIT_ENTRY_PATH: "<path>"  # Relative path to audit entry in repository evidence
```

**Field Requirements**:
- `AUDIT_ENTRY_ID`: MUST match audit entry ID in audit trail (format: `PAA-YYYY-MM-DD-<NNN>`)
- `AUDIT_ENTRY_PATH`: MUST be valid relative path to audit entry file in repository (e.g., `.evidence/platform-actions/2025-12/PAA-2025-12-25-001.md`)

---

### 3.7 Execution Metadata (REQUIRED)

```yaml
EXECUTOR:
  AGENT_TYPE: "MATURION"
  AGENT_INSTANCE_ID: "<maturion-instance-id>"  # Unique identifier for Maturion instance
  EXECUTION_DURATION_MS: <milliseconds>  # How long action took to execute
```

**Field Requirements**:
- `AGENT_TYPE`: MUST be "MATURION"
- `AGENT_INSTANCE_ID`: MUST uniquely identify Maturion instance that executed action
- `EXECUTION_DURATION_MS`: MUST be integer representing milliseconds from instruction receipt to response generation

---

## 4. Status-Specific Requirements

### 4.1 SUCCESS Response MUST Include
- ✅ STATUS = "SUCCESS"
- ✅ PLATFORM_EVIDENCE (complete)
- ✅ AUDIT_ENTRY_ID and AUDIT_ENTRY_PATH
- ✅ EXECUTOR metadata
- ❌ MUST NOT include FAILURE_DETAILS
- ❌ MUST NOT include VALIDATION_ERRORS

### 4.2 FAILURE Response MUST Include
- ✅ STATUS = "FAILURE"
- ✅ FAILURE_DETAILS (complete)
- ✅ AUDIT_ENTRY_ID and AUDIT_ENTRY_PATH
- ✅ EXECUTOR metadata
- ❌ MUST NOT include PLATFORM_EVIDENCE
- ❌ MUST NOT include VALIDATION_ERRORS

### 4.3 BLOCKED Response MUST Include
- ✅ STATUS = "BLOCKED"
- ✅ FAILURE_DETAILS (complete)
- ✅ AUDIT_ENTRY_ID and AUDIT_ENTRY_PATH
- ✅ EXECUTOR metadata
- ❌ MUST NOT include PLATFORM_EVIDENCE
- ❌ MUST NOT include VALIDATION_ERRORS

### 4.4 INVALID_REQUEST Response MUST Include
- ✅ STATUS = "INVALID_REQUEST"
- ✅ VALIDATION_ERRORS (at least one error)
- ✅ AUDIT_ENTRY_ID and AUDIT_ENTRY_PATH
- ✅ EXECUTOR metadata
- ❌ MUST NOT include PLATFORM_EVIDENCE
- ❌ MUST NOT include FAILURE_DETAILS

---

## 5. Validation Rules

### 5.1 Schema Validation

FM MUST validate received responses:
- All REQUIRED fields are present
- STATUS is one of valid values
- Appropriate conditional sections present based on STATUS
- INSTRUCTION_ID matches sent instruction
- TIMESTAMP_UTC is after instruction timestamp
- RESPONSE_ID follows format "DR-YYYY-MM-DD-NNN"
- AUDIT_ENTRY_PATH is valid path format

### 5.2 Evidence Validation

FM MUST validate evidence completeness:
- If SUCCESS: PLATFORM_EVIDENCE is complete and verifiable
- If FAILURE/BLOCKED: FAILURE_DETAILS provide clear remediation path
- If INVALID_REQUEST: VALIDATION_ERRORS identify all issues
- AUDIT_ENTRY_PATH references accessible audit entry

### 5.3 Outcome Validation

FM MUST validate outcome matches expectation:
- If SUCCESS: verify RESOURCE_URL is accessible
- If SUCCESS: verify RESOURCE_STATE matches expected outcome
- If SUCCESS: verify success criteria from instruction are satisfied
- If FAILURE/BLOCKED: verify failure handling from instruction is clear

---

## 6. Examples

### 6.1 Example: SUCCESS Response for CREATE_PULL_REQUEST

```yaml
DELEGATION_RESPONSE_VERSION: "1.0"
RESPONSE_ID: "DR-2025-12-25-001"
INSTRUCTION_ID: "DI-2025-12-25-001"
TIMESTAMP_UTC: "2025-12-25T10:30:15Z"

STATUS: "SUCCESS"

PLATFORM_EVIDENCE:
  RESOURCE_TYPE: "pull_request"
  RESOURCE_ID: "pr_12345abcdef"
  RESOURCE_NUMBER: 42
  RESOURCE_URL: "https://github.com/MaturionISMS/example-app/pull/42"
  RESOURCE_STATE: "open"
  CREATED_AT: "2025-12-25T10:30:12Z"
  UPDATED_AT: "2025-12-25T10:30:12Z"
  API_RESPONSE_STATUS: 201

AUDIT_ENTRY_ID: "PAA-2025-12-25-001"
AUDIT_ENTRY_PATH: ".evidence/platform-actions/2025-12/PAA-2025-12-25-001.md"

EXECUTOR:
  AGENT_TYPE: "MATURION"
  AGENT_INSTANCE_ID: "maturion-prod-001"
  EXECUTION_DURATION_MS: 2341
```

---

### 6.2 Example: FAILURE Response with Rate Limiting

```yaml
DELEGATION_RESPONSE_VERSION: "1.0"
RESPONSE_ID: "DR-2025-12-25-002"
INSTRUCTION_ID: "DI-2025-12-25-002"
TIMESTAMP_UTC: "2025-12-25T11:00:05Z"

STATUS: "FAILURE"

FAILURE_DETAILS:
  ERROR_TYPE: "API_ERROR"
  ERROR_CODE: "403"
  ERROR_MESSAGE: "API rate limit exceeded for your token. Limit resets at 2025-12-25T12:00:00Z."
  REMEDIATION_GUIDANCE: "Wait until rate limit reset at 2025-12-25T12:00:00Z, then retry. Consider implementing request throttling."
  RETRY_ALLOWED: "YES"
  RETRY_AFTER: "3595"  # Seconds until rate limit reset

AUDIT_ENTRY_ID: "PAA-2025-12-25-002"
AUDIT_ENTRY_PATH: ".evidence/platform-actions/2025-12/PAA-2025-12-25-002.md"

EXECUTOR:
  AGENT_TYPE: "MATURION"
  AGENT_INSTANCE_ID: "maturion-prod-001"
  EXECUTION_DURATION_MS: 456
```

---

### 6.3 Example: BLOCKED Response with Branch Protection

```yaml
DELEGATION_RESPONSE_VERSION: "1.0"
RESPONSE_ID: "DR-2025-12-25-003"
INSTRUCTION_ID: "DI-2025-12-25-003"
TIMESTAMP_UTC: "2025-12-25T11:15:22Z"

STATUS: "BLOCKED"

FAILURE_DETAILS:
  ERROR_TYPE: "PLATFORM_CONSTRAINT"
  ERROR_CODE: "422"
  ERROR_MESSAGE: "Required status check 'ci/build' has not passed. Branch protection rules prevent merge."
  REMEDIATION_GUIDANCE: "Wait for required status checks to pass. Check CI workflow status at https://github.com/MaturionISMS/example-app/actions. Once checks pass, retry merge."
  RETRY_ALLOWED: "YES"

AUDIT_ENTRY_ID: "PAA-2025-12-25-003"
AUDIT_ENTRY_PATH: ".evidence/platform-actions/2025-12/PAA-2025-12-25-003.md"

EXECUTOR:
  AGENT_TYPE: "MATURION"
  AGENT_INSTANCE_ID: "maturion-prod-001"
  EXECUTION_DURATION_MS: 1123
```

---

### 6.4 Example: INVALID_REQUEST Response

```yaml
DELEGATION_RESPONSE_VERSION: "1.0"
RESPONSE_ID: "DR-2025-12-25-004"
INSTRUCTION_ID: "DI-2025-12-25-004"
TIMESTAMP_UTC: "2025-12-25T11:30:08Z"

STATUS: "INVALID_REQUEST"

VALIDATION_ERRORS:
  - FIELD: "ACTION.PARAMETERS.HEAD_BRANCH"
    ERROR: "Branch 'feature/nonexistent' does not exist in repository MaturionISMS/example-app"
    EXPECTED: "Valid branch name that exists in repository"
  - FIELD: "AUTHORIZATION.HUMAN_APPROVAL"
    ERROR: "Missing required field for CREATE_PULL_REQUEST action"
    EXPECTED: "HUMAN_APPROVAL=YES with HUMAN_APPROVAL_EVIDENCE reference"

AUDIT_ENTRY_ID: "PAA-2025-12-25-004"
AUDIT_ENTRY_PATH: ".evidence/platform-actions/2025-12/PAA-2025-12-25-004.md"

EXECUTOR:
  AGENT_TYPE: "MATURION"
  AGENT_INSTANCE_ID: "maturion-prod-001"
  EXECUTION_DURATION_MS: 234
```

---

## 7. FM Response Handling Protocol

### 7.1 On SUCCESS
FM MUST:
1. ✅ Validate response schema
2. ✅ Verify PLATFORM_EVIDENCE completeness
3. ✅ Verify RESOURCE_URL is accessible
4. ✅ Verify success criteria from instruction satisfied
5. ✅ Record RESOURCE_URL in FM evidence trail
6. ✅ Proceed with next workflow step

FM MUST NOT:
- ❌ Assume action succeeded without validating response
- ❌ Proceed without verifying platform evidence

### 7.2 On FAILURE
FM MUST:
1. ✅ Log failure details
2. ✅ Evaluate ERROR_TYPE and remediation guidance
3. ✅ If RETRY_ALLOWED=YES and remediation is clear: apply remediation and retry
4. ✅ If retry fails after 3 attempts: escalate to human authority
5. ✅ If RETRY_ALLOWED=NO: escalate to human authority immediately

FM MUST NOT:
- ❌ Proceed as if action succeeded
- ❌ Retry indefinitely without escalation
- ❌ Attempt workarounds to bypass failure

### 7.3 On BLOCKED
FM MUST:
1. ✅ Log blocking reason
2. ✅ Evaluate if constraint will clear automatically (e.g., CI checks)
3. ✅ If auto-clear expected: enter waiting state, monitor constraint
4. ✅ If auto-clear not expected: escalate to human authority
5. ✅ Retry only after constraint clears

FM MUST NOT:
- ❌ Proceed as if action succeeded
- ❌ Attempt to bypass platform constraints
- ❌ Wait indefinitely without escalation

### 7.4 On INVALID_REQUEST
FM MUST:
1. ✅ Log validation errors
2. ✅ Correct instruction based on VALIDATION_ERRORS
3. ✅ Retry with corrected instruction
4. ✅ If correction is unclear: escalate to human authority

FM MUST NOT:
- ❌ Retry without corrections
- ❌ Ignore validation errors

---

## 8. Versioning

Current Version: **1.0**

**Version History**:
- **1.0** (2025-12-25): Initial canonical schema definition

**Backward Compatibility**:
- Future versions MUST maintain backward compatibility
- Breaking changes require major version increment
- Migration guidance provided for breaking changes

---

## 9. Integration with Other Governance

This schema is required by:
- **DELEGATION_INSTRUCTION_AND_AUDIT_MODEL.md** (G-C13) - Section 5.1
- **GOVERNANCE_COMPLETENESS_MODEL.md** - Section 5 (Platform Authority component)

This schema depends on:
- **DELEGATION_INSTRUCTION.schema.md** - Instruction IDs referenced
- **PLATFORM_ACTION_AUDIT_ENTRY.schema.md** - Audit entry IDs referenced

---

**END OF DELEGATION_RESPONSE.schema.md**

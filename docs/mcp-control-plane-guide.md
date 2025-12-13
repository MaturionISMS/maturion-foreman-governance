# MCP Control Plane User Guide

## Overview

The MCP (Model Context Protocol) Control Plane is an infrastructure component that enables Foreman to complete autonomous lifecycles without human intervention. It provides GitHub operation capabilities with built-in safety enforcement.

## What Is MCP?

MCP is a server that exposes GitHub operations as tools that Foreman can use:
- **Merge PRs**: Merge pull requests when all safety checks pass
- **Close Issues**: Close issues with proper documentation
- **Add/Remove Labels**: Manage issue and PR labels
- **Post Comments**: Add comments with secrets detection

## Configuration

### Environment Variables

```bash
# Required
GITHUB_MCP_TOKEN=your_github_token_here

# Optional - Safety Check Configuration
MCP_ENABLED=true                                    # Enable/disable MCP (default: true)
MCP_REQUIRE_CI_GREEN=true                          # Require CI green before merge (default: true)
MCP_RESPECT_BRANCH_PROTECTION=true                 # Respect branch protection rules (default: true)
MCP_REQUIRE_QA_APPROVAL=true                       # Require qa-approved label (default: true)
MCP_REQUIRE_COMPLIANCE_APPROVAL=true               # Require compliance-approved label (default: true)

# Optional - Audit Logging
MCP_LOG_ALL_ACTIONS=true                           # Log all operations (default: true)
MCP_LOG_TO_GOVERNANCE_MEMORY=true                  # Log to Governance Memory (default: true)
```

### GitHub Token Permissions

The `GITHUB_MCP_TOKEN` must have the following permissions:
- `repo` scope (for private repositories)
- `pull_request: write` (to merge PRs)
- `issues: write` (to close issues and manage labels)
- `contents: read` (to check CI status)

## Available Tools

### 1. mcp_github_merge_pr

Merge a pull request with full safety validation.

**Parameters**:
```typescript
{
  owner: string          // Repository owner (e.g., "MaturionISMS")
  repo: string           // Repository name (e.g., "maturion-foreman-app")
  prNumber: number       // PR number to merge
  mergeMethod: 'merge' | 'squash' | 'rebase'  // Merge method
}
```

**Safety Checks**:
- CI status must be green
- All required reviews approved (if branch protection enabled)
- `qa-approved` label present
- No `qa-blocked` label
- `compliance-approved` label present
- No `compliance-blocked` label
- No merge conflicts

**Example**:
```typescript
import { executeTool } from '@/lib/mcp/server'

const result = await executeTool('mcp_github_merge_pr', {
  owner: 'MaturionISMS',
  repo: 'maturion-foreman-app',
  prNumber: 123,
  mergeMethod: 'squash'
})

if (result.success) {
  console.log('PR merged successfully')
} else {
  console.error('Merge blocked:', result.reason)
  console.error('Failed checks:', result.safetyChecksFailed)
}
```

### 2. mcp_github_close_issue

Close an issue with proper documentation.

**Parameters**:
```typescript
{
  owner: string
  repo: string
  issueNumber: number
  reason: string         // Required closure reason
  linkedPRs?: number[]   // Optional linked PRs
}
```

**Safety Checks**:
- Closure reason is required

**Example**:
```typescript
const result = await executeTool('mcp_github_close_issue', {
  owner: 'MaturionISMS',
  repo: 'maturion-foreman-app',
  issueNumber: 456,
  reason: 'Completed via PR #123',
  linkedPRs: [123]
})
```

### 3. mcp_github_add_labels

Add labels to an issue or PR.

**Parameters**:
```typescript
{
  owner: string
  repo: string
  issueNumber: number
  labels: string[]       // Array of label names
}
```

**Example**:
```typescript
const result = await executeTool('mcp_github_add_labels', {
  owner: 'MaturionISMS',
  repo: 'maturion-foreman-app',
  issueNumber: 123,
  labels: ['qa-approved', 'compliance-approved']
})
```

### 4. mcp_github_remove_labels

Remove labels from an issue or PR.

**Parameters**:
```typescript
{
  owner: string
  repo: string
  issueNumber: number
  labels: string[]
}
```

### 5. mcp_github_comment

Post a comment on an issue or PR.

**Parameters**:
```typescript
{
  owner: string
  repo: string
  issueNumber: number
  body: string          // Comment text
}
```

**Safety Checks**:
- Secrets detection (API keys, tokens, passwords)
- Comment body cannot be empty

**Example**:
```typescript
const result = await executeTool('mcp_github_comment', {
  owner: 'MaturionISMS',
  repo: 'maturion-foreman-app',
  issueNumber: 123,
  body: 'QA validation passed. Ready to merge.'
})
```

## Autonomous Lifecycle Integration

### How Foreman Uses MCP

Foreman uses MCP to complete the full autonomous lifecycle:

```
1. Architecture Design
   ↓
2. Red QA Creation
   ↓
3. Build to Green (via Builders)
   ↓
4. QA Validation (100% green)
   ↓
5. PR Creation
   ↓
6. PR Merge ← MCP: mcp_github_merge_pr
   ↓
7. Issue Close ← MCP: mcp_github_close_issue
   ↓
✅ Complete (No human intervention)
```

### When Human Intervention Is Required

MCP will escalate to human when:
- CI is not green
- QA approval is missing
- Compliance approval is missing
- Branch protection requirements not met
- PR has merge conflicts
- Secrets detected in comments

### Checking MCP Availability

```typescript
import { getMCPStatus } from '@/lib/mcp/server'

const status = await getMCPStatus()

if (status.available) {
  console.log('MCP is configured and ready')
  // Proceed with autonomous operations
} else {
  console.log('MCP not configured')
  // Escalate to human
}
```

## Safety Guarantees

### 1. CI Must Be Green

MCP will **never** merge a PR unless all required CI checks pass.

**How it works**:
- Queries GitHub API for commit status
- Checks `state` is `"success"`
- Blocks merge if any check is pending or failed

### 2. Branch Protection Respected

MCP respects all branch protection rules.

**How it works**:
- Retrieves branch protection configuration
- Validates required approvals count
- Lists PR reviews and counts approvals
- Blocks merge if insufficient approvals

### 3. QA Approval Required

MCP requires explicit QA approval.

**How it works**:
- Checks for `qa-approved` label on PR
- Blocks merge if label missing
- Also blocks if `qa-blocked` label present

### 4. Compliance Approval Required

MCP enforces compliance approval.

**How it works**:
- Checks for `compliance-approved` label
- Blocks merge if label missing
- Also blocks if `compliance-blocked` label present

### 5. No Merge Conflicts

MCP detects and blocks PRs with conflicts.

**How it works**:
- Checks PR `mergeable` and `mergeable_state` fields
- Blocks if `mergeable` is `false` or `mergeable_state` is `"dirty"`

### 6. Secrets Detection

MCP scans all comments for secrets.

**How it works**:
- Uses governance secrets detection module
- Detects API keys, tokens, passwords, AWS keys
- Blocks comment if secrets found

### 7. No Bypass Mechanism

There is **no way** to bypass safety checks.

**Guarantees**:
- Safety validation cannot be disabled per-operation
- No "force merge" or "skip checks" parameters
- Bypass attempts throw errors
- All operations logged for audit

## Audit Trail

### What Gets Logged

Every MCP operation is logged to Governance Memory:

```typescript
{
  operation: "merge_pr",
  actor: "foreman",
  target: {
    owner: "MaturionISMS",
    repo: "maturion-foreman-app",
    number: 123
  },
  timestamp: "2025-12-13T12:00:00Z",
  result: "success",
  safetyChecks: {
    ciStatus: { passed: true, details: "All checks passed" },
    qaApproval: { passed: true, details: "QA approved" },
    complianceApproval: { passed: true, details: "Compliance approved" },
    branchProtection: { passed: true, details: "No protection rules" },
    mergeConflicts: { passed: true, details: "No conflicts" }
  }
}
```

### Querying Audit Logs

```typescript
import { getGovernanceEvents } from '@/lib/foreman/memory/governance-memory'

const events = await getGovernanceEvents()

// Filter MCP operations
const mcpEvents = events.filter(e => e.type === 'mcp_operation')

// Find specific operation
const mergeEvent = mcpEvents.find(e => 
  e.metadata?.operation === 'merge_pr' && 
  e.metadata?.target?.number === 123
)
```

## Error Handling

### Error Types

1. **VALIDATION_ERROR**: Invalid parameters
2. **SAFETY_CHECK_FAILED**: Safety checks blocked operation
3. **GITHUB_API_ERROR**: GitHub API error (404, 403, etc.)
4. **SYSTEM_ERROR**: Internal error, network timeout, etc.

### Response Format

```typescript
interface MCPToolResponse {
  success: boolean
  result?: any                    // Operation-specific result
  error?: string                  // Error type
  reason?: string                 // Human-readable reason
  safetyChecksFailed?: string[]   // List of failed safety checks
  audit: AuditLogEntry            // Audit log entry
}
```

### Example Error Handling

```typescript
const result = await executeTool('mcp_github_merge_pr', {
  owner: 'MaturionISMS',
  repo: 'test-repo',
  prNumber: 123,
  mergeMethod: 'squash'
})

if (!result.success) {
  switch (result.error) {
    case 'SAFETY_CHECK_FAILED':
      console.error('Safety checks failed:', result.safetyChecksFailed)
      // Escalate to human
      break
      
    case 'GITHUB_API_ERROR':
      console.error('GitHub API error:', result.reason)
      // Retry or escalate
      break
      
    case 'SYSTEM_ERROR':
      console.error('System error:', result.reason)
      // Log and retry
      break
  }
}
```

## Troubleshooting

### MCP Not Available

**Symptom**: `getMCPStatus()` returns `{ available: false }`

**Cause**: `GITHUB_MCP_TOKEN` not set

**Solution**:
```bash
export GITHUB_MCP_TOKEN=your_token_here
```

### Merge Blocked by Safety Checks

**Symptom**: Merge fails with `SAFETY_CHECK_FAILED`

**Cause**: One or more safety checks failed

**Solution**:
1. Check `result.safetyChecksFailed` for specific failures
2. Fix the underlying issue (CI, approvals, conflicts, etc.)
3. Retry the operation

### Secrets Detected in Comment

**Symptom**: Comment fails with "Secrets detected"

**Cause**: Comment contains API keys, tokens, or other secrets

**Solution**:
1. Remove secrets from comment text
2. Use secure methods for sharing credentials
3. Retry with cleaned comment

## Best Practices

### 1. Always Check MCP Availability

Before attempting autonomous operations:

```typescript
const status = await getMCPStatus()
if (!status.available) {
  // Escalate to human or configure MCP
  return
}
```

### 2. Handle Errors Gracefully

Always check `result.success` and handle errors:

```typescript
const result = await executeTool(...)
if (!result.success) {
  // Log error
  // Escalate to human if needed
  // Don't proceed with dependent operations
}
```

### 3. Use Governance Labels

Apply proper labels before merge:

```typescript
// Add QA approval
await executeTool('mcp_github_add_labels', {
  owner, repo, issueNumber: prNumber,
  labels: ['qa-approved', 'compliance-approved']
})

// Then merge
await executeTool('mcp_github_merge_pr', {
  owner, repo, prNumber, mergeMethod: 'squash'
})
```

### 4. Document Issue Closures

Always provide a reason when closing issues:

```typescript
await executeTool('mcp_github_close_issue', {
  owner, repo, issueNumber,
  reason: 'Completed via PR #123. All QA passed.',
  linkedPRs: [123]
})
```

### 5. Monitor Audit Logs

Regularly review MCP operations in Governance Memory:

```typescript
const events = await getGovernanceEvents()
const mcpEvents = events.filter(e => e.type === 'mcp_operation')

// Check for failures
const failures = mcpEvents.filter(e => e.metadata?.result === 'failure')
if (failures.length > 0) {
  // Investigate failures
}
```

## Security Considerations

### Token Security

- **Never** commit `GITHUB_MCP_TOKEN` to repository
- Store token in secure environment variables
- Rotate token periodically
- Use minimum required permissions

### Secrets Detection

- All comments scanned for secrets before posting
- Detection patterns:
  - API keys (`sk-`, `pk-`, etc.)
  - GitHub tokens (`ghp_`, `gho_`, etc.)
  - AWS keys (`AKIA...`)
  - Private keys (`-----BEGIN`)

### Audit Trail

- All operations logged (cannot be disabled)
- Logs include safety check results
- Failed operations logged with reasons
- Audit logs immutable (no deletion)

## Support

For issues or questions about MCP Control Plane:

1. Check audit logs in Governance Memory
2. Verify MCP configuration and token
3. Review safety check requirements
4. Escalate to Johan for infrastructure changes

---

**Version**: 1.0  
**Last Updated**: 2025-12-13  
**Status**: Production Ready  
**Maintained by**: Foreman Infrastructure Team

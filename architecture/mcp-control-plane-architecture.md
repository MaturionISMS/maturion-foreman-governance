# MCP Control Plane Architecture

## Overview

The MCP (Model Context Protocol) Control Plane provides autonomous GitHub operations for Foreman, enabling complete lifecycle execution without human intervention.

## Architecture Principles

### 1. Infrastructure, Not Product
- This is an infrastructure upgrade
- No product behavior changes
- No governance dilution
- Enables autonomy within existing governance

### 2. Safety First
- All operations validate against governance rules
- CI status must be GREEN before merge
- Branch protection rules enforced
- All actions logged and auditable
- Operations are revocable

### 3. Governance Integration
- Integrates with existing GitHub mutations module
- Uses Governance Memory for audit trail
- Enforces QIC/QIEL requirements
- Respects GSR (Governance Supremacy Rule)

## Components

### 1. MCP Server (`lib/mcp/server.ts`)

**Purpose**: Expose GitHub operations as MCP tools for Foreman

**Tools Provided**:
- `mcp_github_merge_pr` - Merge a pull request
- `mcp_github_enable_auto_merge` - Enable auto-merge on a PR
- `mcp_github_close_issue` - Close an issue
- `mcp_github_add_labels` - Add labels to issue/PR
- `mcp_github_remove_labels` - Remove labels from issue/PR
- `mcp_github_comment` - Post comment on issue/PR

**Each tool**:
1. Validates input parameters
2. Checks safety rules
3. Executes operation via GitHub mutations module
4. Logs action to Governance Memory
5. Returns result with audit trail

### 2. Safety Validation Layer (`lib/mcp/safety.ts`)

**Purpose**: Enforce safety rules before GitHub operations

**Safety Checks**:

#### For PR Merge:
1. **CI Status Check**
   - All required status checks must pass
   - No failing checks allowed
   - Validates via GitHub API

2. **Branch Protection**
   - Respects branch protection rules
   - Validates required reviews if configured
   - Cannot bypass protection rules

3. **QA Status**
   - PR must have `qa-approved` label
   - No `qa-blocked` label present
   - QIEL validation passed

4. **Compliance Status**
   - PR must have `compliance-approved` label
   - No `compliance-blocked` label
   - No secrets detected

5. **Merge Conflict**
   - PR must be mergeable
   - No conflicts with base branch

#### For Issue Close:
1. **Linked PRs**
   - Issue should have linked PRs
   - All linked PRs should be merged

2. **Resolution Documentation**
   - Close reason must be provided
   - Logs to Governance Memory

#### For Labels:
1. **Label Validation**
   - Labels must exist in repository
   - Governance labels follow naming convention

#### For Comments:
1. **Secrets Detection**
   - No secrets in comment body
   - Validated via governance module

### 3. MCP Configuration (`lib/mcp/config.ts`)

**Purpose**: Configure MCP server behavior

**Configuration**:
```typescript
interface MCPConfig {
  enabled: boolean
  githubToken: string
  safetyChecks: {
    requireCIGreen: boolean
    respectBranchProtection: boolean
    requireQAApproval: boolean
    requireComplianceApproval: boolean
  }
  auditLogging: {
    logAllActions: boolean
    logToGovernanceMemory: boolean
  }
}
```

### 4. Integration with Foreman Dispatch

**Current Flow**:
```
Foreman → analyzeArchitecture → createRedQA → buildToGreen → 
validateQA → createPR → [HUMAN MERGE]
```

**New Flow with MCP**:
```
Foreman → analyzeArchitecture → createRedQA → buildToGreen → 
validateQA → createPR → [MCP: validateSafety → mergePR → closeIssue] → COMPLETE
```

**Integration Points**:
1. `lib/foreman/dispatch.ts` - Check MCP availability
2. `lib/foreman/pr/auto-merge.ts` - Use MCP tools for merge
3. `lib/foreman/execution/builder-runtime.ts` - Complete lifecycle autonomously

## Data Flow

### Merge PR Flow

```
1. Foreman calls MCP tool: mcp_github_merge_pr(owner, repo, prNumber)
   ↓
2. MCP Server validates input
   ↓
3. Safety Layer checks:
   - CI status via GitHub API
   - Branch protection rules
   - QA/Compliance labels
   - Merge conflicts
   ↓
4. If all safety checks pass:
   - Call GitHub mutations.mergePR()
   - Log to Governance Memory
   - Return success result
   ↓
5. If safety checks fail:
   - Return error with reason
   - Log blocked operation
   - Escalate to human if needed
```

## Security Considerations

### 1. Token Management
- MCP uses `GITHUB_MCP_TOKEN` from environment
- Token must have appropriate permissions:
  - `repo` scope for private repositories
  - `pull_request: write` for PR operations
  - `issues: write` for issue operations
- Token stored securely, never logged

### 2. Audit Trail
- All operations logged to Governance Memory
- Includes:
  - Operation type
  - Actor (foreman)
  - Target (owner/repo/number)
  - Timestamp
  - Result (success/failure)
  - Safety check results

### 3. Operation Revocability
- All merges create merge commits (not squash by default)
- Issues can be reopened
- Labels can be removed
- Comments can be edited/deleted
- Full audit trail enables accountability

### 4. Rate Limiting
- Respects GitHub API rate limits
- Implements exponential backoff
- Logs rate limit status

## Testing Strategy

### 1. Unit Tests (`tests/mcp/server.test.ts`)
- Test each MCP tool independently
- Mock GitHub API responses
- Verify input validation
- Test error handling

### 2. Safety Tests (`tests/mcp/safety.test.ts`)
- Test each safety rule
- Verify blocking on failures
- Test bypass scenarios (none allowed)
- Validate audit logging

### 3. Integration Tests (`tests/mcp/integration.test.ts`)
- Test full flow: dispatch → MCP → GitHub
- Verify governance integration
- Test with real GitHub API (optional)
- Validate audit trail

### 4. End-to-End Tests (`tests/mcp/e2e.test.ts`)
- Test complete autonomous lifecycle
- Architecture → Red QA → Build → Validate → Merge → Close
- Verify no human intervention needed
- Validate 100% GREEN requirement maintained

## Infrastructure Classification

Per FL (Feedback Loop):
- **Type**: Infrastructure Gap
- **Classification**: Missing capability preventing autonomous lifecycle completion
- **Impact**: Requires human intervention for PR merge and issue closure
- **Resolution**: Implement MCP server with safety guarantees

## Compliance with Build Philosophy

### Architecture → Red QA → Build to Green
- MCP does NOT change build process
- MCP enables completion AFTER build is green
- All safety checks validate QA is 100% green

### Governance Supremacy Rule (GSR)
- MCP enforces GSR, not bypasses it
- All governance rules still apply
- Operations blocked if governance fails

### Quality Integrity Contract (QIC)
- MCP requires QIC compliance before merge
- 100% QA passing is absolute
- No merges with failing tests

## Success Criteria

1. **Foreman can complete full lifecycle without human clicks**
   - Issue assigned → Architecture → Red QA → Build → Validate → Merge → Issue closed
   - All automated through MCP tools

2. **All actions logged**
   - Every MCP operation in Governance Memory
   - Full audit trail maintained
   - Revocable and traceable

3. **Safety guarantees enforced**
   - No merge without CI GREEN
   - No merge without QA approval
   - Branch protection respected
   - All operations validated

4. **100% GREEN infrastructure tests**
   - All MCP tests passing
   - Integration tests green
   - E2E tests validate autonomy

## Rollout Plan

### Phase 1: MCP Server Implementation
1. Create MCP server module
2. Implement safety validation
3. Integrate with GitHub mutations
4. Add comprehensive tests

### Phase 2: Foreman Integration
1. Update dispatch logic to check MCP availability
2. Integrate MCP tools in auto-merge
3. Add autonomous issue closure
4. Update completion flow

### Phase 3: Validation
1. Run infrastructure tests
2. Validate autonomous lifecycle
3. Verify audit logging
4. Test safety enforcement

### Phase 4: Documentation
1. Document MCP usage
2. Update Foreman documentation
3. Add safety guarantees to contracts
4. Document audit procedures

## Monitoring and Alerting

### Metrics to Track
- MCP operations per day
- Success rate of autonomous merges
- Safety check failures
- Time to complete lifecycle
- Human intervention rate (should be 0%)

### Alerts
- MCP server unavailable
- Safety check failures above threshold
- GitHub API rate limits
- Token expiration
- Governance violations

## Version History

- **v1.0** (2025-12-13): Initial architecture design
- **Status**: Ready for implementation
- **Approved by**: Foreman (autonomous)
- **Next**: Create Red QA for MCP server

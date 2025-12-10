# Architecture Change Approval Workflow (CS2)

## Overview

The Architecture Change Approval Workflow is a constitutional governance system that ensures **Foreman cannot modify architecture files without explicit human approval**. This prevents silent architectural drift and maintains system integrity.

## Constitutional Requirements

Per the Agent Contract and CS2 requirements:

1. **Foreman may NOT modify architecture without your explicit approval**
2. **Architecture Change Requests (ACRs) MUST be issued before any modification**
3. **No PR modifying architecture may merge without an approved ACR**
4. **All architectural changes must be traceable and reversible**
5. **All ACRs must include justification, risks, alternatives, and dependency impacts**
6. **Only you (the Owner) may approve or reject ACRs**
7. **Every approval must be permanently logged in Governance Memory**

## Protected Architecture Files

The following paths are protected and require ACR approval:

- `docs/architecture/**` - Architecture documentation
- `docs/governance/**` - Governance documentation
- `foreman/constitution/**` - Constitutional files
- `foreman/governance/**` - Governance rules
- `.github/foreman/agent-contract.md` - Agent contract
- `foreman/true-north-architecture.md` - True North architecture
- `builder_protocol.md` - Builder protocol (any location)

## Architecture Change Request (ACR) Structure

Each ACR contains:

### Required Fields
- **ID**: Unique identifier (format: `ACR-YYYYMMDD-XXXXX`)
- **Summary**: Brief description of the change
- **Description**: Detailed explanation
- **Justification**: Why this change is necessary
- **Affected Files**: List of files to be modified
- **Risk Level**: `low`, `medium`, `high`, or `critical`
- **Status**: `pending`, `approved`, `rejected`, or `discussing`

### Impact Analysis
- **Affected Components**: Modules/systems impacted
- **Scope**: `minor`, `moderate`, or `major`
- **Breaking Changes**: Boolean indicating if change breaks compatibility
- **Migration Required**: Boolean indicating if migration is needed

### Additional Information
- **Alternatives Considered**: Other approaches evaluated
- **Dependencies**: Related ACRs, issues, and PRs
- **Build Context**: Build ID, sequence ID, commit SHA, branch

## Workflow

### 1. ACR Creation

When Foreman needs to modify architecture files:

```typescript
import { createACR } from '@/lib/foreman/architecture';

const acr = await createACR({
  summary: 'Update API architecture documentation',
  description: 'Add new endpoint specifications to API design',
  justification: 'New endpoints require documentation for consistency',
  affectedFiles: ['docs/architecture/api-design.md'],
  alternatives: [
    'Leave undocumented',
    'Document in inline comments only',
  ],
  breakingChanges: false,
  migrationRequired: false,
});
```

This automatically:
- Generates a unique ACR ID
- Analyzes risk level based on affected files
- Logs the request to Governance Memory
- Sets status to `pending`
- Triggers notification

### 2. Review Process

You can review pending ACRs at: `/foreman/architecture/alerts`

For each ACR, you have three options:

#### Approve
```typescript
// Via UI: Click "✅ Approve" button
// Via API:
await approveACR({
  acrId: 'ACR-20251209-XXXXX',
  decision: 'approve',
  comments: 'Approved - necessary for API consistency',
  reviewedBy: 'owner',
});
```

#### Reject
```typescript
// Via UI: Click "❌ Reject" button
// Via API:
await rejectACR({
  acrId: 'ACR-20251209-XXXXX',
  decision: 'reject',
  comments: 'Not aligned with current architecture direction',
  reviewedBy: 'owner',
});
```

#### Discuss
```typescript
// Via UI: Click "💬 Discuss" button, then "📝 Submit for Discussion"
// Via API:
await discussACR({
  acrId: 'ACR-20251209-XXXXX',
  decision: 'discuss',
  comments: 'Need clarification on impact to existing APIs',
  reviewedBy: 'owner',
});
```

### 3. PR Gatekeeper Integration

When creating a PR that touches architecture files, the PR Gatekeeper:

1. Detects protected architecture files in the changeset
2. Checks for an approved ACR
3. **Blocks the PR** if no approved ACR exists
4. Logs governance violation if attempted without approval

```typescript
// PR Gatekeeper automatically validates
const result = await enforcePRGatekeeper({
  changedFiles: ['docs/architecture/system.md'],
  acrId: 'ACR-20251209-XXXXX', // Must be approved
});

if (!result.allowed) {
  // PR is blocked - governance violation logged
  console.error(result.reason);
}
```

### 4. Governance Memory Logging

All ACR events are permanently logged:

- `architecture_change_request_created`
- `architecture_change_request_approved`
- `architecture_change_request_rejected`
- `architecture_change_request_discussed`
- `architecture_violation_attempted`

Logs include:
- Timestamp
- Reviewer identity
- Foreman's proposal
- Justification
- Outcome

## Risk Levels

Risk levels are automatically determined based on file categories:

### Critical
- Constitutional files (`foreman/constitution/**`)
- Agent contract (`.github/foreman/agent-contract.md`)

**Impact**: Fundamental system behavior changes

### High
- Governance rules (`foreman/governance/**`)
- True North architecture (`foreman/true-north-architecture.md`)
- Builder protocol (`builder_protocol.md`)

**Impact**: Governance or builder system changes

### Medium
- Architecture documentation (`docs/architecture/**`) - few files
- Governance documentation (`docs/governance/**`) - few files

**Impact**: Documentation changes

### Low
- Non-protected files (for reference only)

**Impact**: No governance impact

## API Endpoints

### Get Pending ACRs
```http
GET /api/foreman/architecture/alerts
```

**Response:**
```json
{
  "success": true,
  "acrs": [
    {
      "id": "ACR-20251209-XXXXX",
      "status": "pending",
      "summary": "...",
      "riskLevel": "high",
      // ... full ACR object
    }
  ],
  "count": 1,
  "timestamp": "2025-12-09T17:00:00Z"
}
```

### Create ACR
```http
POST /api/foreman/architecture/alerts
Content-Type: application/json

{
  "summary": "Update API architecture",
  "description": "Detailed description...",
  "justification": "Why this is needed...",
  "affectedFiles": ["docs/architecture/api.md"],
  "alternatives": ["Alternative 1", "Alternative 2"]
}
```

### Review ACR
```http
POST /api/foreman/architecture/approve
Content-Type: application/json

{
  "acrId": "ACR-20251209-XXXXX",
  "decision": "approve",  // or "reject" or "discuss"
  "comments": "Optional review comments",
  "reviewedBy": "owner"
}
```

## UI Components

### Architecture Alerts Page

Location: `/foreman/architecture/alerts`

Features:
- List all pending ACRs
- Display risk level with color coding (critical=red, high=orange, medium=yellow, low=green)
- Show affected files, components, and impact
- Approve/Reject/Discuss buttons
- Comments field for review notes

## Testing

Tests are located in:
- `tests/architecture/acr-engine.test.ts` - ACR creation and retrieval
- `tests/architecture/approval-workflow.test.ts` - Approval/rejection/discussion
- `tests/pr-gatekeeper/architecture-approval.test.ts` - PR gatekeeper integration
- `tests/qic/architecture-integrity.test.ts` - QIC enforcement
- `tests/qic/architecture-integrity.test.ts` - QIEL detection

Run tests:
```bash
npm run test
```

## Governance Compliance

### QIC (Quality Integrity Contract)
- QIC-ARCH-1: Constitutional files must be protected
- QIC-ARCH-2: Governance files must be protected
- QIC-ARCH-3: Architecture documentation must be protected
- QIC-ARCH-4: Builder protocol must be protected
- QIC-ARCH-5: Impact analysis must categorize risk correctly

### QIEL (Quality Integrity Enforcement Layer)
- Detects changes to protected architecture files
- Requires ACR approval metadata for PRs
- Blocks PRs without ACR approval
- Prevents silent architecture drift

## Best Practices

### For Foreman
1. **Always create an ACR** before modifying architecture files
2. **Include comprehensive justification** explaining why the change is needed
3. **List alternatives considered** to show due diligence
4. **Wait for approval** - do not proceed until ACR is approved
5. **Reference the ACR ID** in PR descriptions

### For Reviewers (Owner)
1. **Review impact analysis** carefully before approving
2. **Check risk level** is appropriate for the change
3. **Verify alternatives** were considered
4. **Use "Discuss"** if clarification is needed
5. **Reject with clear feedback** if not aligned with architecture direction

## Troubleshooting

### PR Blocked: Architecture Approval Missing
**Symptom**: PR is blocked with message "Architecture changes require approved ACR"

**Solution**:
1. Check which files are protected: review affected files list
2. Create an ACR for those files
3. Wait for ACR approval
4. Reference approved ACR ID when creating PR

### ACR Status Stuck in "Discussing"
**Symptom**: ACR status is "discussing" and work is blocked

**Solution**:
1. Navigate to `/foreman` chat interface
2. Discuss the ACR with Foreman
3. Once clarified, return to `/foreman/architecture/alerts`
4. Approve or reject the ACR

### No Pending ACRs Showing
**Symptom**: UI shows "No Pending ACRs" but expecting some

**Solution**:
1. Check if ACRs were already approved/rejected
2. Verify ACR was created successfully (check governance memory logs)
3. Refresh the page

## Security Considerations

- **No self-approval**: Foreman cannot approve its own ACRs
- **Permanent audit trail**: All decisions logged in Governance Memory
- **No bypasses**: PR Gatekeeper enforces approval requirement
- **Traceable changes**: Every architecture change links to an ACR

## Future Enhancements

Potential improvements (not yet implemented):
- Email/Slack notifications for pending ACRs
- ACR dashboard with analytics
- Bulk ACR approval for related changes
- ACR templates for common change types
- Integration with GitHub issues for tracking
- Automated ACR expiration for stale requests

---

**Version**: 1.0  
**Last Updated**: 2025-12-09  
**Authority**: Maturion Engineering Leadership  
**Related**: CS2 - Architecture Change Approval Workflow

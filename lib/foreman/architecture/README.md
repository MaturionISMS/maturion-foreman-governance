# Architecture Change Approval System

This module implements the CS2 Architecture Change Approval Workflow, a constitutional governance system that prevents Foreman from making unauthorized architecture changes.

## Quick Start

### Creating an ACR

```typescript
import { createACR } from '@/lib/foreman/architecture';

const acr = await createACR({
  summary: 'Update system architecture documentation',
  description: 'Add new microservice architecture patterns',
  justification: 'New patterns needed for scaling strategy',
  affectedFiles: ['docs/architecture/system-design.md'],
  alternatives: ['Keep existing patterns', 'Use vendor solution'],
});

console.log(`ACR created: ${acr.id}`);
// Output: ACR created: ACR-20251209-XXXXX
```

### Reviewing an ACR

```typescript
import { reviewACR } from '@/lib/foreman/architecture';

// Approve
await reviewACR({
  acrId: 'ACR-20251209-XXXXX',
  decision: 'approve',
  reviewedBy: 'owner',
  comments: 'Approved - aligns with scaling strategy',
});

// Reject
await reviewACR({
  acrId: 'ACR-20251209-XXXXX',
  decision: 'reject',
  reviewedBy: 'owner',
  comments: 'Conflicts with current architecture direction',
});

// Discuss
await reviewACR({
  acrId: 'ACR-20251209-XXXXX',
  decision: 'discuss',
  reviewedBy: 'owner',
  comments: 'Need more details on implementation approach',
});
```

### Checking File Protection

```typescript
import { isProtectedArchitectureFile } from '@/lib/foreman/architecture';

const isProtected = isProtectedArchitectureFile('docs/architecture/api.md');
// true

const isProtected2 = isProtectedArchitectureFile('src/app.ts');
// false
```

### Validating ACR Approval

```typescript
import { validateArchitectureChangeApproval } from '@/lib/foreman/architecture';

const result = await validateArchitectureChangeApproval(
  ['docs/architecture/api.md'],
  'ACR-20251209-XXXXX'
);

if (result.approved) {
  console.log('✅ Approved - can proceed');
} else {
  console.error(`❌ Blocked: ${result.reason}`);
}
```

## Module Structure

```
lib/foreman/architecture/
├── types.ts              # TypeScript type definitions
├── acr-engine.ts         # ACR creation and management
├── approval-workflow.ts  # Approval/rejection/discussion logic
├── file-detector.ts      # Protected file detection and risk analysis
└── index.ts              # Module exports
```

## Core Functions

### ACR Engine (`acr-engine.ts`)

- `createACR(options)` - Create a new Architecture Change Request
- `getACR(acrId)` - Retrieve an ACR by ID
- `getPendingACRs()` - Get all pending ACRs
- `isACRApproved(acrId)` - Check if an ACR is approved
- `validateArchitectureChangeApproval(files, acrId?)` - Validate approval for files

### Approval Workflow (`approval-workflow.ts`)

- `approveACR(options)` - Approve an ACR
- `rejectACR(options)` - Reject an ACR
- `discussACR(options)` - Mark an ACR for discussion
- `reviewACR(options)` - Unified review function
- `notifyPendingACR(acr)` - Send notification for pending ACR
- `waitForACRApproval(acrId, options?)` - Block until approval (use cautiously)

### File Detector (`file-detector.ts`)

- `isProtectedArchitectureFile(path)` - Check if a file is protected
- `containsProtectedFiles(paths)` - Check if any files are protected
- `filterProtectedFiles(paths)` - Filter to only protected files
- `getProtectionCategory(path)` - Get the protection category
- `analyzeArchitectureImpact(paths)` - Analyze impact of file changes

## Protected File Patterns

Files matching these patterns require ACR approval:

```typescript
const PROTECTED_ARCHITECTURE_PATHS = [
  'docs/architecture/',
  'docs/governance/',
  'foreman/constitution/',
  'foreman/governance/',
  '.github/foreman/agent-contract.md',
  'foreman/true-north-architecture.md',
];
```

## Risk Levels

Risk is automatically determined based on file categories:

| Risk Level | Files | Example |
|------------|-------|---------|
| **Critical** | Constitutional files, Agent contract | `foreman/constitution/README.md` |
| **High** | Governance rules, True North, Builder protocol | `foreman/governance/rules.md` |
| **Medium** | Architecture docs (few files) | `docs/architecture/api.md` |
| **Low** | Non-protected files | `src/app.ts` |

## Integration Points

### PR Gatekeeper

The PR Gatekeeper automatically checks for ACR approval:

```typescript
// In lib/foreman/pr-gatekeeper.ts
const protectedFiles = filterProtectedFiles(changedFiles);

if (protectedFiles.length > 0) {
  const validation = await validateArchitectureChangeApproval(
    protectedFiles,
    acrId
  );
  
  if (!validation.approved) {
    // Block PR - governance violation
  }
}
```

### Governance Memory

All ACR events are logged to Governance Memory:

```typescript
await logGovernanceEvent({
  type: 'architecture_change_request_created',
  severity: 'medium',
  description: `Architecture Change Request created: ${acr.summary}`,
  metadata: { acrId, riskLevel, affectedFiles },
});
```

## API Integration

### REST Endpoints

See `app/api/foreman/architecture/` for API implementations:

- `GET /api/foreman/architecture/alerts` - List pending ACRs
- `POST /api/foreman/architecture/alerts` - Create new ACR
- `POST /api/foreman/architecture/approve` - Review ACR

### UI Components

See `app/foreman/architecture/alerts/page.tsx` for the review UI.

## Testing

Comprehensive test coverage in:

```bash
# Run all architecture tests
npx tsx --test tests/architecture/*.test.ts

# Run specific test suites
npx tsx --test tests/architecture/acr-engine.test.ts
npx tsx --test tests/architecture/approval-workflow.test.ts
npx tsx --test tests/pr-gatekeeper/architecture-approval.test.ts
npx tsx --test tests/qic/architecture-integrity.test.ts
npx tsx --test tests/qic/architecture-integrity.test.ts
```

## Examples

### Example 1: Simple Documentation Update

```typescript
const acr = await createACR({
  summary: 'Fix typo in API documentation',
  description: 'Correct endpoint path in API reference',
  justification: 'Documentation has incorrect path causing confusion',
  affectedFiles: ['docs/architecture/api-reference.md'],
  riskLevel: 'low',
});
```

### Example 2: Major Architecture Change

```typescript
const acr = await createACR({
  summary: 'Migrate to microservices architecture',
  description: 'Split monolith into 5 microservices...',
  justification: 'Current architecture cannot scale to 1M users',
  affectedFiles: [
    'docs/architecture/system-design.md',
    'docs/architecture/deployment.md',
    'docs/architecture/data-flow.md',
  ],
  affectedComponents: ['auth', 'api', 'database', 'messaging'],
  riskLevel: 'critical',
  breakingChanges: true,
  migrationRequired: true,
  alternatives: [
    'Vertical scaling of existing monolith',
    'Use managed cloud services',
    'Implement caching layer only',
  ],
  relatedIssues: ['#123', '#124', '#125'],
});
```

### Example 3: Governance Rule Update

```typescript
const acr = await createACR({
  summary: 'Add new QA quality gate',
  description: 'Introduce performance testing requirement',
  justification: 'Recent production incidents caused by performance issues',
  affectedFiles: ['foreman/governance/qa-rules.md'],
  riskLevel: 'high',
  breakingChanges: false,
  migrationRequired: true,
  alternatives: [
    'Manual performance testing',
    'Post-deployment monitoring only',
  ],
});
```

## Error Handling

```typescript
try {
  const result = await validateArchitectureChangeApproval(files);
  
  if (!result.approved) {
    throw new Error(`ACR approval required: ${result.reason}`);
  }
} catch (error) {
  console.error('Architecture validation failed:', error);
  // Handle appropriately
}
```

## Constitutional Compliance

This module enforces constitutional requirements:

1. ✅ Foreman cannot modify architecture without approval
2. ✅ ACRs must be created before modifications
3. ✅ PRs cannot merge without approved ACR
4. ✅ All changes are traceable and reversible
5. ✅ ACRs include justification, risks, and alternatives
6. ✅ Only the Owner can approve/reject
7. ✅ All approvals logged permanently

## Contributing

When modifying this module:

1. Ensure all tests pass
2. Update type definitions in `types.ts`
3. Add tests for new functionality
4. Update documentation
5. Follow existing patterns

## Related Documentation

- [Architecture Change Approval Workflow](../../docs/governance/ARCHITECTURE_CHANGE_APPROVAL.md)
- [Agent Contract](../../.github/foreman/agent-contract.md)
- [Quality Integrity Contract](../../foreman/qa/quality-integrity-contract.md)
- [True North Architecture](../../foreman/true-north-architecture.md)

---

**Version**: 1.0  
**Last Updated**: 2025-12-09  
**Module**: `lib/foreman/architecture`  
**Related**: CS2 - Architecture Change Approval Workflow

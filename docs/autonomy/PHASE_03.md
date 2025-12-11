# 📘 PHASE_03.md — PR Auto-Merge Engine

**Status:** ✅ Implemented  
**Wave:** 1  
**Constitutional Layer:** PR Governance Enforcement Kernel  
**Last Updated:** 2025-12-11

---

## Purpose

Allow Foreman to autonomously merge PRs that satisfy governance, QA, and drift conditions.

**Key Principle:** Only Foreman may merge. Builders CANNOT merge.

---

## Requirements

### 1. PR Creation & Mutation

**Foreman must:**

✅ **Create PRs**
- Automatically create PR after successful build
- Link to originating issue
- Include architecture and QA references

✅ **Update Descriptions**
- Add build details
- Include QA results
- Reference constitutional compliance

✅ **Add Labels**
- `autonomy-pilot-1` or relevant wave label
- `safe-scope` for safe path changes
- `governance-validated` after validation
- Severity/priority labels as needed

✅ **Request Reviews** (if configured)
- Optional human review gate
- Configurable per repository
- Timeout for review responses

**Implementation:** `lib/foreman/pr/auto-merge.ts`

**Builder Constraint:**
```typescript
// ❌ Builders CANNOT call this
// ✅ Only Foreman can call this
export async function autoMergePR(
  owner: string,
  repo: string,
  prMetadata: PRMetadata
): Promise<MergeResult>
```

### 2. PR Merge Rules

**Merge ONLY if:**

#### ✅ QIC Passes (Quality Integrity Contract)
```typescript
qic: {
  lint: { passed: true, errors: [] },
  typecheck: { passed: true, errors: [] },
  build: { passed: true, errors: [] },
  tests: { passed: true, failures: [] }
}
```

#### ✅ QIEL Passes (Quality Integrity Enforcement Layer)
```typescript
qiel: {
  governanceChecks: { passed: true, violations: [] },
  architecturalCompliance: { passed: true },
  constitutionalRules: { passed: true }
}
```

#### ✅ Guardrails Pass (CS1)
```typescript
guardrails: {
  baselineHashes: { passed: true, violations: [] },
  immutablePaths: { passed: true },
  fileProtection: { passed: true }
}
```

#### ✅ No Drift
```typescript
drift: {
  detected: false,
  architecturalDrift: false,
  governanceDrift: false
}
```

#### ✅ Architecturally Consistent
- Changes align with architecture documents
- No undocumented architectural changes
- All components follow design patterns

#### ✅ No Security Regressions
- No new security vulnerabilities
- All existing security checks pass
- No secret exposure

**Validation Logic:**
```typescript
export async function validatePRForMerge(
  owner: string,
  repo: string,
  prNumber: number
): Promise<PRValidationResult> {
  const checks = {
    qic: await runQIC(),
    qiel: await runQIEL(),
    guardrails: await checkGuardrails(),
    drift: await detectDrift(),
    metadata: await validatePRMetadata(prNumber)
  }
  
  const canMerge = Object.values(checks).every(c => c.passed)
  
  return { passed: canMerge, checks, canMerge }
}
```

### 3. Merge Failure Handling

**If merge fails → Open an Incident (CS3)**

```typescript
if (!validationResult.canMerge) {
  await recordIncident({
    severity: 'high',
    category: 'merge-blocked',
    title: `PR #${prNumber} Failed Merge Validation`,
    description: `Validation failed: ${validationResult.errors.join(', ')}`,
    prNumber,
    validationResults: validationResult.checks,
    requiresHumanReview: true
  })
}
```

**Incident Categories:**
- `qic-failure` - QA/lint/build failures
- `qiel-violation` - Governance violations
- `drift-detected` - Architectural drift found
- `guardrail-violation` - Immutable path changes
- `security-regression` - New vulnerabilities

### 4. Logging

**Record each merge attempt in:**

1. **Primary Log:**
   - `docs/autonomy/AUTONOMY_PILOT_LOG.md`

**Log Entry Format:**
```markdown
### [TIMESTAMP] - PR Merge Attempt

**PR Number**: #[N]
**Branch**: [branch-name]
**Issue**: #[issue-number]
**Decision**: [merged|blocked|escalated]
**Validation Results**:
- QIC: [passed|failed]
- QIEL: [passed|failed]
- Guardrails: [passed|failed]
- Drift: [none|detected]
**Outcome**: [merged successfully|blocked by X|escalated to human]
**Merge Commit**: [sha] (if merged)
```

2. **Dashboard Display:**
   - `/app/foreman/autonomy-dashboard/`
   - Real-time merge status
   - Validation result breakdown
   - Incident links for failures

---

## Acceptance Criteria

- ✅ Foreman merges at least one PR autonomously
- ✅ Governance correctly blocks unsafe merges
- ✅ Drift detection integration verified
- ✅ Dashboard displays merge history
- ✅ Failed merges create incidents
- ✅ PR metadata validation working
- ✅ Only Foreman can merge (builders blocked)
- ✅ Complete audit trail maintained

---

## Implementation Status

### Completed Components

- ✅ `lib/foreman/pr/auto-merge.ts` - Core merge engine
- ✅ `lib/github/pr-builder.ts` - PR creation utilities
- ✅ PR validation logic
- ✅ CS3 incident integration
- ✅ Logging system
- ✅ Dashboard integration

### Integration Points

- **CS1 Guardrails**: Validates immutable paths before merge
- **CS3 Incident System**: Records blocked merges as incidents
- **CS4 Governance Alerts**: Sends alerts on validation failures
- **CS7 Autonomy Log**: Records all merge attempts
- **QIEL**: Runs governance validation
- **Drift Detection**: Checks for architectural drift

---

## Usage Example

```typescript
import { autoMergePR, validatePRForMerge } from '@/lib/foreman/pr/auto-merge'

// Step 1: Validate PR
const validation = await validatePRForMerge(
  'MaturionISMS',
  'maturion-foreman-app',
  123
)

console.log('Validation:', validation.passed)
console.log('QIC:', validation.checks.qic.passed)
console.log('QIEL:', validation.checks.qiel.passed)
console.log('Drift:', validation.checks.drift.passed)

// Step 2: Attempt merge if validated
if (validation.canMerge) {
  const result = await autoMergePR(
    'MaturionISMS',
    'maturion-foreman-app',
    {
      number: 123,
      title: 'Add user profile feature',
      branch: 'autonomy/pilot-1/issue-123',
      baseBranch: 'main',
      issueNumber: 123,
      labels: ['autonomy-pilot-1', 'safe-scope', 'governance-validated'],
      author: 'foreman-bot'
    }
  )
  
  if (result.success) {
    console.log('✅ PR merged!', result.mergeCommitSha)
  } else {
    console.error('❌ Merge failed:', result.error)
    console.log('📋 Incident created:', result.incidentId)
  }
}
```

---

## Merge Decision Tree

```
PR Ready for Merge?
├─ NO → Keep as Draft
└─ YES → Run Validation
    ├─ QIC Failed?
    │  └─ YES → Block + Create Incident
    ├─ QIEL Failed?
    │  └─ YES → Block + Create Incident
    ├─ Guardrails Failed?
    │  └─ YES → Block + Create Incident (High Priority)
    ├─ Drift Detected?
    │  └─ YES → Block + Create Incident + Human Review
    └─ ALL PASSED?
       └─ YES → MERGE + Log Success
```

---

## Security Considerations

1. **Authorization**: Only Foreman service account can merge
2. **Branch Protection**: Respects GitHub branch protection rules
3. **Review Requirements**: Honors configured review requirements
4. **Status Checks**: Waits for all required status checks
5. **Audit Trail**: Complete merge history maintained
6. **Rollback**: Failed merges can be reverted

---

## Dependencies

- **Requires:** PHASE_01 (Autonomous Mode Pilot)
- **Requires:** PHASE_02 (Builder Execution Engine)
- **Required by:** PHASE_05 (Multi-Issue Wave Orchestrator)

---

## Next Phase

Proceed to [PHASE_04.md](./PHASE_04.md) - Autonomy Dashboard UI

---

*This phase implements PR Governance Enforcement and is protected under CS1 Guardrails. Modifications require CS2 Architecture Change Approval.*

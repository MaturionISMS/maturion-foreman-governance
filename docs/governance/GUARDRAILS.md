# Constitutional Guardrails (CS1)

## Overview

The Constitutional Guardrails system (CS1) is Foreman's immutable governance enforcement layer. It ensures that Foreman cannot weaken rules, alter governance logic, add suppressions, change QIC/QIEL behavior, or update workflows without approval.

This system prevents:
- The "ignore npm warning" incident
- Any future QA weakening
- Autonomy drift
- Governance bypasses
- False "green" conditions

## Purpose

CS1 provides a **Constitutional Guardrail Runtime Engine** that:

1. **Protects Immutable Paths** - Prevents modifications to governance files and workflows
2. **Enforces QIC/QIEL Rules** - Blocks suppressions and maintains zero-warning policy
3. **Validates Constitutional Integrity** - Uses hash-based verification
4. **Detects Governance Drift** - Identifies missing or compromised protections
5. **Provides Governance Alerts** - Notifies when violations are attempted

## Architecture

### Core Components

```
lib/foreman/guardrails/
├── runtime.ts           # Guardrail runtime engine
├── hash-checker.ts      # SHA-256 integrity checking
├── path-protection.ts   # Path immutability enforcement
├── report.ts            # Status report generation
└── index.ts             # Module exports
```

### Constitutional Files

```
foreman/constitution/
├── guardrails.json      # Guardrail configuration
└── baseline-hashes.json # Hash baseline (generated)
```

### Integration Points

1. **Foreman Dispatch** (`lib/foreman/dispatch.ts`)
   - Runs guardrails on startup
   - Validates before task execution
   - Halts on violations

2. **QIC Tests** (`tests/qic/guardrails.test.ts`)
   - Validates guardrail integrity
   - Ensures governance files exist
   - Tests immutable paths

3. **QIEL Tests** (`tests/qic/guardrails.test.ts`)
   - Hash-based integrity checking
   - Suppression detection
   - Constitutional drift detection

## Immutable Paths

The following paths are **immutable** and protected by guardrails:

```
.github/workflows/**       # All workflow files
.github/foreman/**         # Foreman configuration
foreman/constitution/**    # Constitutional files
docs/governance/**         # Governance documentation
```

Any attempt to modify these paths will:
1. Be blocked immediately
2. Be logged to governance memory
3. Trigger a critical alert
4. Open an incident (if applicable)
5. Fail the PR

## Protected Files

These specific files have additional protection:

```
.github/foreman/agent-contract.md
.github/workflows/qic.yml
.github/workflows/qiel.yml
.github/workflows/deploy-check.yml
foreman/constitution/guardrails.json
```

## Required Checks

The following CI/CD checks are **required** and must exist:

- `qiel` - Quality Integrity Enforcement Layer
- `qic` - Quality Integrity Contract
- `deploy-check` - Deployment validation
- `foreman-governance` - Governance enforcement

## Hash-Based Integrity

Constitutional files are protected by SHA-256 hashing:

### How It Works

1. **Baseline Generation**: Hash of constitutional files is calculated and stored
2. **Runtime Verification**: On startup, current hashes are compared to baseline
3. **Mismatch Detection**: Any difference is classified as "governance drift"
4. **Automatic Blocking**: Execution is halted if hashes don't match

### Generating Baseline Hashes

```bash
npm run guardrail:baseline
```

This creates `foreman/constitution/baseline-hashes.json` with SHA-256 hashes of:
- `.github/foreman/agent-contract.md`
- `.github/workflows/qic.yml`
- `.github/workflows/qiel.yml`
- `foreman/constitution/guardrails.json`

### Verifying Hashes

Hashes are verified automatically on Foreman startup. To manually verify:

```typescript
import { verifyConstitutionalHashes, areHashesValid } from '@/lib/foreman/guardrails/hash-checker'

const results = verifyConstitutionalHashes()
if (!areHashesValid(results)) {
  console.error('Hash verification failed!')
}
```

## Suppression Policy

### Zero-Suppression Rule

Foreman must **NEVER**:
- Add `eslint-disable` comments
- Add `@ts-ignore` or `@ts-nocheck`
- Remove QIC/QIEL checks
- Modify zero-warning policy
- Change workflow commands
- Alter test suites
- Bypass failures

### Allowlist/Exception Protocol

When warnings occur (e.g., deprecated npm packages):

1. **Foreman detects the warning**
2. **Creates Parking Station item** with details
3. **Creates Architecture/Tech Debt Change Request**
4. **Waits for human decision**
5. **Only then** takes approved action:
   - Accept temporary suppression (with approval)
   - Schedule dependency upgrade wave
   - Mark as accepted technical debt

Foreman must **NEVER** suppress warnings autonomously.

## Suppression Detection

The guardrail system automatically scans for:

- `eslint-disable` and related directives
- `@ts-ignore`, `@ts-nocheck`, `@ts-expect-error`
- `prettier-ignore`
- `NOSONAR` comments
- Any other QA bypass patterns

### Scanning for Suppressions

```typescript
import { scanForSuppressions } from '@/lib/foreman/guardrails/path-protection'

const results = scanForSuppressions('lib/', true)
console.log(`Found ${results.suppressions.length} suppressions in ${results.totalFiles} files`)
```

## Governance Alerts

When Foreman attempts to:
- Weaken rules
- Bypass a check
- Modify workflows
- Self-approve
- Change agent contract

A **high-severity alert** is raised:

```
═══════════════════════════════════════
🚨 CRITICAL GOVERNANCE VIOLATION 🚨
═══════════════════════════════════════
Guardrail validation failed:
  1. immutable_paths: Path missing
  2. agent_contract: Contract compromised
═══════════════════════════════════════
Execution halted to prevent violations.
═══════════════════════════════════════
```

## Usage

### Running Guardrail Checks

Guardrails run automatically on Foreman startup via `lib/foreman/dispatch.ts`:

```typescript
import { initializeGuardrails } from '@/lib/foreman/dispatch'

await initializeGuardrails()
// Halts execution if guardrails fail
```

### Manual Validation

```typescript
import { runGuardrailChecks, haltExecution } from '@/lib/foreman/guardrails/runtime'

const result = await runGuardrailChecks()

if (result.overall === 'failed') {
  haltExecution(result.violations)
}

console.log(`✓ All ${result.checks.length} guardrail checks passed`)
```

### Generating Status Report

```typescript
import { generateGuardrailStatusReport, displayReport } from '@/lib/foreman/guardrails/report'

const report = generateGuardrailStatusReport(validationResult)
displayReport(report)
```

### Command Line

```bash
# Run guardrail tests
npm run test:guardrails

# Run QIEL constitutional integrity tests
npm run test:qiel

# Run all governance tests
npm run test:governance
```

## Status Report Format

The guardrail status report shows:

```
=== IMMUTABLE GUARDRAIL STATUS REPORT ===

Generated: 2025-12-09T16:00:00.000Z
Overall Status: PASSED

Section 1: Existing Protections
  ✓ 4 immutable paths protected
  ✓ 4 required checks configured
  ✓ 5 protected files monitored

Section 2: Current Permissions You Have
  ✓ Runtime permissions validated
  ✓ No unauthorized write access

Section 3: Governance Enforcement Tests You Have
  ✓ All required CI/CD checks present
  ✓ Guardrail runtime checks active

Section 4: Gaps & Missing Guardrails
  (none)

==================================================
```

## Testing

### QIC Tests

`tests/qic/guardrails.test.ts` validates:
- Governance files exist
- Immutable paths are protected
- No workflows modify governance
- Documentation exists
- Guardrail runtime integrity

Run with:
```bash
npm run test:qic
```

### QIEL Tests

`tests/qic/guardrails.test.ts` validates:
- Hash-based integrity
- Path protection
- Suppression detection
- Constitutional drift
- Zero-warning policy

Run with:
```bash
npm run test:qiel
```

## Integration with Parking Station

When tech debt or suppressions are needed:

1. **Detection**: Guardrail system detects the need (e.g., deprecated dependency)
2. **Parking Station Entry**: Creates item with:
   - Category: "Tech Debt" or "Architecture Change"
   - Description: Details of the issue
   - Proposed Action: What needs approval
   - Risk Level: Impact assessment
3. **Approval Wait**: Foreman waits for human decision
4. **Execution**: Only proceeds after approval

Example Parking Station entry:

```json
{
  "id": "PS-001",
  "category": "Tech Debt",
  "title": "Deprecated npm package: old-lib@1.0",
  "description": "Package 'old-lib' is deprecated. Options: suppress warning temporarily or upgrade.",
  "proposedAction": "Upgrade to 'new-lib@2.0' in Wave X",
  "riskLevel": "medium",
  "requiresApproval": true,
  "status": "pending"
}
```

## Governance Memory Integration

All guardrail events are logged to governance memory:

```typescript
await logGovernanceEvent({
  type: 'guardrail_check',
  severity: 'critical',
  description: 'immutable_paths: Path missing',
  metadata: {
    check: 'immutable_paths',
    status: 'failed',
    details: { /* ... */ }
  }
})
```

This creates an audit trail for:
- All guardrail checks
- Violations and blocks
- Modification attempts
- Hash verifications

## Troubleshooting

### Guardrail Validation Failed

If guardrails fail on startup:

1. **Check console output** for specific violations
2. **Review the status report** (if generated)
3. **Address each gap** listed in Section 4
4. **Re-run validation**

### Hash Mismatch

If hash verification fails:

1. **Identify which file changed** from the error message
2. **Review the change** to determine if it was authorized
3. **If authorized**: Regenerate baseline hashes with `npm run guardrail:baseline`
4. **If unauthorized**: Revert the change and investigate

### Missing Workflow Files

If required checks are missing:

1. Verify files exist in `.github/workflows/`
2. Check file names match exactly (case-sensitive)
3. Ensure files have `.yml` or `.yaml` extension
4. Run `npm run test:governance` to validate

### Suppression Detected

If suppressions are found:

1. **Review the suppression** to understand why it was added
2. **Create Parking Station entry** if it's tech debt
3. **Get approval** before keeping the suppression
4. **Consider alternatives** to suppression:
   - Fix the root cause
   - Upgrade dependencies
   - Refactor code

## Security Considerations

### Protected Mode

When `MATURION_PROTECTED_MODE=true`:
- Write access to protected files is a violation
- Stricter validation is enforced
- All modifications are blocked

### Autonomous Mode

Guardrails work independently of autonomous mode:
- Even in autonomous mode, guardrails must pass
- No task dispatch occurs until guardrails validate
- Violations halt execution immediately

### Critical Alerts

When guardrails fail:
1. Violation is logged to governance memory
2. Critical alert is printed to console
3. Execution halts with `process.exit(1)`
4. PR is blocked (in CI/CD context)

## Best Practices

1. **Never bypass guardrails** - They exist for system safety
2. **Review all suppressions** - Each one is a governance decision
3. **Update hashes after authorized changes** - Keep baseline current
4. **Monitor governance memory** - Watch for violation patterns
5. **Use Parking Station for tech debt** - Don't suppress autonomously
6. **Test before committing** - Run `npm run test:governance`
7. **Document exceptions** - If approved, explain why

## Acceptance Criteria

✅ FM cannot suppress warnings without approval  
✅ FM cannot weaken rules  
✅ FM cannot modify governance files  
✅ FM cannot modify workflows  
✅ FM cannot adjust QIC/QIEL parameters  
✅ FM treats suppressions as incidents  
✅ Parking Station receives tech-debt entries  
✅ Hash-based immutability working  
✅ Guardrail runtime blocks unauthorized changes  
✅ Guardrail violations visible in UI  
✅ Guardrail failures stop PR  
✅ Documentation updated  
✅ All constitutional tests pass  

## References

- **Agent Contract**: `.github/foreman/agent-contract.md`
- **Guardrail Config**: `foreman/constitution/guardrails.json`
- **Runtime Engine**: `lib/foreman/guardrails/runtime.ts`
- **Hash Checker**: `lib/foreman/guardrails/hash-checker.ts`
- **Path Protection**: `lib/foreman/guardrails/path-protection.ts`
- **QIC Tests**: `tests/qic/guardrails.test.ts`
- **QIEL Tests**: `tests/qic/guardrails.test.ts`

---

**Version**: 1.0  
**Last Updated**: 2025-12-09  
**Authority**: Maturion Engineering Leadership

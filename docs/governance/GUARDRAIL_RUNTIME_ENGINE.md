# Immutable Guardrail Runtime Engine

## Overview

The Immutable Guardrail Runtime Engine is a critical governance subsystem that enforces constitutional protections in Foreman. It validates that governance-critical files and workflows remain immutable and prevents unauthorized modifications.

## Purpose

This system enables Foreman to:

- **Load and analyze governance files** - Read guardrail configurations from `foreman/constitution/guardrails.json`
- **Validate protected paths** - Ensure immutable paths exist and are accessible
- **Evaluate permissions** - Detect unauthorized write access to protected files
- **Confirm workflow protections** - Verify required CI/CD checks are in place
- **Detect governance drift** - Identify missing or compromised governance protections
- **Produce status reports** - Generate structured guardrail status reports
- **Prevent violations** - Halt execution when guardrails are compromised

## Architecture

### Core Components

1. **Guardrails Configuration** (`foreman/constitution/guardrails.json`)
   - Defines immutable paths
   - Lists required workflow checks
   - Specifies protected files

2. **Runtime Engine** (`lib/foreman/guardrails/runtime.ts`)
   - Loads and validates configuration
   - Executes all guardrail checks
   - Logs to governance memory
   - Halts execution on violations

3. **Report Generator** (`lib/foreman/guardrails/report.ts`)
   - Generates formatted status reports
   - Displays protections, permissions, tests, and gaps
   - Writes reports to disk

4. **Dispatch Integration** (`lib/foreman/dispatch.ts`)
   - Runs guardrail checks on startup
   - Ensures guardrails are validated before task dispatch
   - Integrates with existing governance systems

## Configuration

### guardrails.json Structure

```json
{
  "immutablePaths": [
    ".github/workflows",
    "foreman/constitution",
    "docs/governance",
    ".github/foreman/agent-contract.md"
  ],
  "requiredChecks": [
    "qiel",
    "deploy-check",
    "qic",
    "foreman-governance"
  ],
  "protectedFiles": [
    ".github/workflows/qiel.yml",
    ".github/workflows/deploy-check.yml",
    ".github/foreman/agent-contract.md"
  ]
}
```

### Configuration Fields

- **immutablePaths**: Directories and files that must not be modified
- **requiredChecks**: CI/CD workflow names that must exist
- **protectedFiles**: Critical files that require special protection

## Guardrail Checks

The runtime engine performs five critical checks:

### 1. Immutable Paths Check
Validates that all configured immutable paths exist and are accessible.

**Status**: PASSED/FAILED  
**Logs to**: Governance Memory  
**On Failure**: Halts execution

### 2. Required Checks Validation
Confirms that all required workflow files exist in `.github/workflows/`.

**Status**: PASSED/FAILED  
**Logs to**: Governance Memory  
**On Failure**: Halts execution

### 3. Write Access Detection
Checks if Foreman has unauthorized write access to protected files.

**Status**: PASSED/FAILED  
**Logs to**: Governance Memory  
**On Failure**: Halts execution (in protected mode)

### 4. Agent Contract Validation
Ensures the Foreman Agent Contract exists and is valid.

**Status**: PASSED/FAILED  
**Logs to**: Governance Memory  
**On Failure**: Halts execution

### 5. Governance Drift Evaluation
Detects if any governance protections are missing or compromised.

**Status**: PASSED/FAILED  
**Logs to**: Governance Memory  
**On Failure**: Halts execution

## Usage

### Running Guardrail Checks

```typescript
import { runGuardrailChecks, haltExecution } from '@/lib/foreman/guardrails/runtime'

async function validateGuardrails() {
  const result = await runGuardrailChecks()
  
  if (result.overall === 'failed') {
    haltExecution(result.violations)
  }
  
  console.log(`✓ All ${result.checks.length} guardrail checks passed`)
}
```

### Generating Status Reports

```typescript
import { generateGuardrailStatusReport, displayReport } from '@/lib/foreman/guardrails/report'
import { runGuardrailChecks } from '@/lib/foreman/guardrails/runtime'

async function generateReport() {
  const validationResult = await runGuardrailChecks()
  const report = generateGuardrailStatusReport(validationResult)
  
  displayReport(report)
}
```

### Command Line Usage

Generate a guardrail status report:
```bash
npm run guardrail:report
```

Run guardrail tests:
```bash
npm run test:governance
```

## Status Report Format

The system generates reports in the following format:

```
=== IMMUTABLE GUARDRAIL STATUS REPORT ===

Generated: [timestamp]
Overall Status: PASSED/FAILED

Section 1: Existing Protections
- Protected workflow files
- Immutable paths
- Protected files

Section 2: Current Permissions You Have
- Runtime permissions
- Write access to protected paths

Section 3: Governance Enforcement Tests You Have
- Required CI/CD checks
- Guardrail runtime checks

Section 4: Gaps & Missing Guardrails
- List of detected gaps
- Required actions

==================================================
```

## Integration with Foreman

### Dispatch Integration

The guardrail system integrates with Foreman's dispatch system:

```typescript
// In lib/foreman/dispatch.ts
export async function dispatchBuilderTask(builder, request) {
  // Ensure guardrails are validated before dispatch
  if (!guardrailsValidated) {
    await initializeGuardrails()
  }
  
  // ... rest of dispatch logic
}
```

### Governance Memory Integration

All guardrail checks log events to governance memory:

```typescript
await logGovernanceEvent({
  type: 'guardrail_check',
  severity: result.status === 'failed' ? 'critical' : 'info',
  description: `${result.check}: ${result.message}`,
  metadata: { check: result.check, status: result.status, details: result.details }
})
```

## Testing

### Test Coverage

The system includes comprehensive tests in `tests/governance/guardrails.test.ts`:

- Configuration loading
- Immutable path validation
- Required checks validation
- Agent contract validation
- Governance drift detection
- Full guardrail validation
- Report generation
- QIEL integration
- Error scenarios

### Running Tests

```bash
# Run all governance tests
npm run test:governance

# Run all tests
npm run test:all
```

## Security Considerations

### Critical Alerts

When guardrails fail, the system:

1. Logs the violation to governance memory
2. Prints a critical alert to console
3. Halts execution with `process.exit(1)`

### Protected Mode

When `MATURION_PROTECTED_MODE=true`:
- Write access to protected files is considered a violation
- Stricter validation is enforced

### Autonomous Mode

The guardrail system works independently of autonomous mode. Even in autonomous mode, guardrails must pass before any task dispatch.

## Maintenance

### Adding New Guardrails

To add a new guardrail check:

1. Update `guardrails.json` with new paths/checks
2. Add validation logic to `runtime.ts` if needed
3. Add tests to `guardrails.test.ts`
4. Update this documentation

### Modifying Protected Paths

**WARNING**: Modifying protected paths requires careful consideration:

1. Update `guardrails.json`
2. Ensure all paths exist
3. Run tests to validate
4. Update documentation

## Troubleshooting

### Guardrail Validation Failed

If guardrails fail:

1. Check the console output for specific violations
2. Run `npm run guardrail:report` to see detailed status
3. Address each gap listed in Section 4 of the report
4. Re-run validation

### Missing Workflow Files

If required checks are missing:

1. Verify workflow files exist in `.github/workflows/`
2. Check file names match exactly (case-sensitive)
3. Ensure files have `.yml` or `.yaml` extension

### Agent Contract Issues

If agent contract validation fails:

1. Verify `.github/foreman/agent-contract.md` exists
2. Check file is readable and not empty
3. Ensure file contains meaningful content

## Future Enhancements

Potential improvements:

- [ ] Hash-based file integrity checks
- [ ] GitHub API permission validation
- [ ] Real-time drift monitoring
- [ ] Automated remediation suggestions
- [ ] Integration with CI/CD pipelines
- [ ] Webhook notifications for violations
- [ ] Historical trend analysis

## References

- Governance Supremacy Rule (GSR): `foreman/governance/governance-supremacy-rule.md`
- Agent Contract: `.github/foreman/agent-contract.md`
- QIEL Workflow: `.github/workflows/qiel.yml`
- Deploy Check: `.github/workflows/deploy-check.yml`

# Overnight Execution Wave 2 — System Rehydration

## Overview

**Overnight Execution Wave 2** is a comprehensive system rehydration cycle that prepares the Foreman App for full autonomous operation. It closes all historical QIC/QIEL incidents, rebuilds the dependency graph, initializes constitutional layering, executes remaining issues, and enables autonomous mode with full QIEL enforcement.

## Purpose

The Wave 2 execution addresses the accumulation of historical quality integrity incidents that were generated during environmental misalignment periods. These incidents no longer represent actionable quality issues and can be safely closed after QIEL environment alignment has been completed.

### Key Objectives

1. **Close QIC/QIEL Incidents** - Remove historical quality integrity incidents
2. **Rebuild Dependency Graph** - Analyze all open issues and detect dependencies
3. **Initialize Constitutional Layering** - Activate all governance layers
4. **Execute Remaining Issues** - Process functional issues through overnight execution
5. **Enable Autonomous Mode** - Activate autonomous operation with QIEL enforcement

## Acceptance Criteria

- ✅ Wave executes without errors
- ✅ All reports logged to governance memory
- ✅ All QIC/QIEL incidents removed
- ✅ System enters autonomous mode

## Architecture

### Constitutional Layers

Wave 2 initializes a 5-layer constitutional governance system:

1. **Layer 1: Governance Memory Foundation**
   - Event logging and querying
   - Historical record keeping
   - Audit trail maintenance

2. **Layer 2: Quality Integrity Contract (QIC)**
   - Quality standards enforcement
   - Build integrity requirements
   - Zero-tolerance QA policies

3. **Layer 3: QIEL Enforcement Layer**
   - 8 subsystem validation suite
   - Build log parsing
   - Lint log validation
   - Deployment simulation
   - Schema cohesion checks

4. **Layer 4: PR Gatekeeper**
   - PR creation blocking on QA failure
   - 100% QA pass requirement
   - Zero bypass policy

5. **Layer 5: Drift Detection & Prevention**
   - Governance drift detection
   - Automatic drift logging
   - Prevention of governance violations

### Execution Phases

Wave 2 executes in 6 sequential phases:

#### Phase 1: Close QIC/QIEL Incidents

- Fetches all open issues with `quality-integrity` label
- Posts resolution comment explaining environmental alignment
- Closes issues as resolved
- Logs closure events to governance memory

#### Phase 2: Rebuild Dependency Graph

- Fetches all open functional issues (excluding quality-integrity)
- Analyzes issue bodies for dependency patterns:
  - `depends on #123`
  - `blocked by #456`
- Builds dependency map for execution sequencing
- Logs rebuild completion to governance memory

#### Phase 3: Initialize Constitutional Layering

- Initializes all 5 constitutional layers
- Logs initialization events for each layer
- Validates layer availability
- Reports layer activation status

#### Phase 4: Verify QIEL Integration

- Checks for QIEL workflow file (`.github/workflows/qiel.yml`)
- Validates PR Gatekeeper existence
- Runs QIEL validation (quick mode)
- Reports integration status

#### Phase 5: Execute Remaining Issues

- Runs overnight execution on functional issues
- Applies full QIC/QIEL validation to each issue
- Generates execution reports
- Creates PRs for successful builds (if not dry-run)

#### Phase 6: Enable Autonomous Mode

- Activates autonomous mode flag
- Logs activation event
- Reports operational status
- Confirms QIEL enforcement active

## Usage

### Prerequisites

- `GITHUB_TOKEN` environment variable set
- Repository access permissions
- QIEL integration configured

### Running Wave 2 Execution

#### Validation (No API calls)

```bash
npm run wave2:validate
```

This runs all validation checks without making any GitHub API calls or changes.

#### Dry Run (Read-only GitHub API calls)

```bash
npm run wave2:dry-run
```

This simulates Wave 2 execution without making any actual changes:
- Fetches issues (read-only)
- Analyzes dependencies (read-only)
- Simulates closure (no actual closing)
- Skips issue execution
- Skips autonomous mode activation

#### Full Execution

```bash
npm run wave2
```

This runs the complete Wave 2 execution:
- Closes QIC/QIEL incidents
- Rebuilds dependency graph
- Initializes constitutional layering
- Executes remaining issues
- Enables autonomous mode

### Command Line Options

```bash
npx tsx scripts/run-wave2-execution.ts [options]
```

Options:
- `--owner <owner>` - Repository owner (default: MaturionISMS)
- `--repo <repo>` - Repository name (default: maturion-foreman-app)
- `--dry-run` - Run without making changes
- `--skip-incidents` - Skip closing QIC/QIEL incidents
- `--skip-dependencies` - Skip rebuilding dependency graph
- `--skip-constitutional` - Skip initializing constitutional layering
- `--skip-execution` - Skip executing remaining issues
- `--skip-autonomous` - Skip enabling autonomous mode
- `--help` - Show help message

### Examples

#### Close incidents only

```bash
npx tsx scripts/run-wave2-execution.ts \
  --skip-dependencies \
  --skip-constitutional \
  --skip-execution \
  --skip-autonomous
```

#### Execute issues only

```bash
npx tsx scripts/run-wave2-execution.ts \
  --skip-incidents \
  --skip-dependencies \
  --skip-constitutional \
  --skip-autonomous
```

#### Test on different repository

```bash
npx tsx scripts/run-wave2-execution.ts \
  --owner myorg \
  --repo myrepo \
  --dry-run
```

## Output

### Execution Summary

Wave 2 generates a comprehensive execution summary:

```
╔════════════════════════════════════════════════════════════╗
║  ✅ WAVE 2 EXECUTION COMPLETED SUCCESSFULLY                ║
╚════════════════════════════════════════════════════════════╝

📊 Summary:
   Phases Completed: 6
   Phases Failed: 0
   QIC Incidents Closed: 10
   Dependency Graph Rebuilt: Yes
   Constitutional Layering: Active
   Issues Executed: 15
   Autonomous Mode: Enabled
   QIEL Validation: Passed

📋 Reports:
   1. Closed 10 QIC/QIEL incidents
   2. Analyzed 25 issues, detected 8 dependencies
   3. Initialized 5 constitutional layers: Governance Memory Foundation, Quality Integrity Contract, QIEL Enforcement Layer, PR Gatekeeper, Drift Detection & Prevention
   4. Executed 15 issues successfully
   5. Autonomous mode enabled with full QIEL enforcement
```

### Governance Events

All Wave 2 activities are logged to governance memory:

- `wave2_execution_started` - Execution initiation
- `qic_incidents_closed` - QIC incident closure
- `dependency_graph_rebuilt` - Dependency analysis completion
- `constitutional_layer_initialized` - Each layer initialization
- `autonomous_mode_enabled` - Autonomous mode activation
- `wave2_execution_completed` - Execution completion

Query events:

```typescript
import { queryGovernanceEvents } from '@/lib/foreman/memory/governance-memory';

const wave2Events = queryGovernanceEvents({ type: 'wave2_execution_completed' });
```

## Testing

### Test Suite

Wave 2 includes a comprehensive test suite with 45 tests:

```bash
npm run test:overnight
```

Test coverage:
- Configuration validation (3 tests)
- Result structure validation (2 tests)
- Phase execution and dependencies (2 tests)
- Constitutional layering (2 tests)
- QIEL integration checks (1 test)
- Autonomous mode activation (2 tests)
- QIC/QIEL incident closure (1 test)
- Dependency graph rebuild (2 tests)
- Execution summary and reports (2 tests)
- Error handling and recovery (3 tests)
- Model escalation (8 tests)
- Desktop sync (4 tests)
- Governance issues (8 tests)
- Governance memory (5 tests)

All tests pass successfully.

### Validation

Run validation checks without making API calls:

```bash
npm run wave2:validate
```

Validation checks:
1. TypeScript types are properly defined
2. Wave 2 execution function is callable
3. Governance memory is functional
4. QIEL integration exists
5. Overnight execution is available
6. Constitutional layers are defined
7. Execution phases are defined
8. Test suite exists

## Implementation Status

- ✅ **Code Implemented** - Full Wave 2 execution logic available
- ✅ **Test Suite Created** - 45 tests covering all functionality
- ✅ **Validation Passed** - All 8 validation checks passed
- ⏳ **Ready for Execution** - Pending GITHUB_TOKEN availability

## Safety & Governance

### QA-Governed Execution

Wave 2 maintains strict QA governance:

- All issues executed through full QIC/QIEL validation
- PRs blocked if QIEL validation fails
- Governance drift detection active
- Zero bypass policy enforced

### Dry Run Mode

Always test with `--dry-run` first:

```bash
npm run wave2:dry-run
```

Dry run mode:
- ✅ Reads issues (safe)
- ✅ Analyzes dependencies (safe)
- ❌ Does NOT close issues
- ❌ Does NOT execute builds
- ❌ Does NOT enable autonomous mode

### Rollback

If Wave 2 execution needs to be rolled back:

1. Review governance events:
   ```typescript
   queryGovernanceEvents({ type: 'wave2_execution_started' });
   ```

2. Identify closed issues from logs

3. Manually reopen if needed (rare)

4. Disable autonomous mode via environment variable:
   ```env
   MATURION_AUTONOMOUS_MODE=false
   ```

## Monitoring

### Governance Memory

Query execution status:

```typescript
import { queryGovernanceEvents, getGovernanceStats } from '@/lib/foreman/memory/governance-memory';

// Get all Wave 2 events
const events = queryGovernanceEvents({ type: 'wave2_execution_completed' });

// Get statistics
const stats = getGovernanceStats();
console.log(`Total events: ${stats.total}`);
console.log(`By severity: ${JSON.stringify(stats.bySeverity)}`);
console.log(`By type: ${JSON.stringify(stats.byType)}`);
```

### Console Output

Wave 2 provides detailed console output:

- Phase-by-phase progress
- Issue-by-issue status
- Error reporting
- Summary statistics

### Reports

All execution reports are logged to governance memory and can be queried programmatically.

## Troubleshooting

### GITHUB_TOKEN Not Set

**Error**: `GITHUB_TOKEN environment variable is not set`

**Solution**: Set the environment variable:

```bash
export GITHUB_TOKEN=your_token_here
npm run wave2:dry-run
```

### QIEL Workflow Not Found

**Warning**: `QIEL workflow file not found`

**Solution**: Ensure `.github/workflows/qiel.yml` exists. This is a warning, not a blocker.

### Dependency Graph Build Fails

**Error**: `Failed to rebuild dependency graph`

**Solution**: Check GitHub API rate limits and permissions. Run with `--skip-dependencies` to bypass.

### Phase Failures

If any phase fails:

1. Check the error message in console output
2. Query governance events for details:
   ```typescript
   queryGovernanceEvents({ severity: 'critical' });
   ```
3. Run with `--dry-run` to diagnose
4. Use selective phase execution to retry specific phases

## Future Enhancements

Planned improvements:

- **Real-time Progress UI** - Web interface for monitoring Wave 2 execution
- **Scheduled Execution** - Cron-based automatic Wave 2 runs
- **Email Notifications** - Alerts on completion/failure
- **Rollback Automation** - One-command rollback capability
- **Multi-Repository Support** - Execute Wave 2 across multiple repositories
- **Custom Incident Filters** - Configure which incidents to close
- **Dependency Visualization** - Graph view of issue dependencies

## Related Documentation

- [Quality Integrity Contract (QIC)](foreman/qa/quality-integrity-contract.md)
- [QIEL Documentation](docs/QIEL_README.md)
- [Overnight Execution](lib/foreman/overnight-execution.ts)
- [PR Gatekeeper](lib/foreman/pr-gatekeeper.ts)
- [Governance Drift Detection](lib/foreman/governance/drift-detector.ts)

## Support

For questions or issues:

1. Check validation: `npm run wave2:validate`
2. Run tests: `npm run test:overnight`
3. Review governance events
4. Contact the Maturion team

---

**Generated**: 2025-12-09  
**Version**: 1.0.0  
**Status**: ✅ Ready for Execution

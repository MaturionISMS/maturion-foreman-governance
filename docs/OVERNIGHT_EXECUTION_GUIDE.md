# Overnight Execution System - Implementation Guide

## Overview

The Overnight Execution Orchestrator is a comprehensive system designed to autonomously process all open GitHub issues in a repository with full QA and governance compliance. This implementation integrates model escalation, local builder fallback, desktop synchronization, and auto-heal mechanisms.

## Architecture

### Core Components

1. **Overnight Execution Orchestrator** (`lib/foreman/overnight-execution.ts`)
   - Fetches and processes open issues from GitHub
   - Implements dependency detection and sequencing
   - Manages execution flow with full QA/governance validation

2. **Model Escalation Service** (`lib/foreman/model-escalation.ts`)
   - Intelligent model selection (GPT-4 → GPT-4-turbo → GPT-5.1 → Local Builder)
   - Quota tracking and enforcement
   - Auto-heal on escalation failures

3. **Desktop Sync Protocol** (`lib/foreman/desktop-sync.ts`)
   - Repository drift detection
   - Safe merge protocol
   - Periodic health checks (30-minute intervals)

4. **Governance Memory** (`lib/foreman/memory/governance-memory.ts`)
   - Event logging and tracking
   - Compliance monitoring
   - Audit trail

## Features

### 1. Issue Fetching and Classification

The system automatically:
- Fetches all open issues from the GitHub repository
- Estimates issue complexity (low/medium/high) based on labels, title, and body
- Classifies issues into sequence types:
  - Architecture
  - Memory
  - Governance
  - QA
  - Build
  - Deployment
  - Self-evolution

### 2. Dependency Detection

Issues are analyzed for dependencies using pattern matching:
- "Depends on #123" patterns
- "Blocked by #456" patterns
- Builds dependency chains with depth calculation

### 3. Intelligent Sequencing

Issues are processed in order based on:
1. Sequence type priority (architecture → memory → governance → qa → build → deployment → self-evolution)
2. Dependency depth (dependencies processed before dependents)
3. Issue number (for stable ordering)

### 4. Model Escalation

Automatic model selection based on:
- **Architecture tasks** → GPT-5.1
- **Governance tasks** → GPT-5.1
- **High complexity** → GPT-4-turbo or GPT-5.1
- **Multi-file refactors (10+ files)** → GPT-4-turbo
- **Simple tasks** → GPT-4

Quota management:
- Daily limit: 50 escalations
- Hourly limit: 10 escalations
- Concurrent limit: 5 escalations

### 5. Execution Summary Reporting

For each issue processed, the system posts a detailed comment including:
- Execution status (success/failed/skipped)
- Execution time
- QA validation results (QIC, QIEL, CDW, Memory Fabric, Drift, Governance)
- Governance validation results
- Model escalations used
- Link to created PR (if applicable)

An overall summary is also generated at the end of each run.

### 6. Governance Compliance

All actions are logged to governance memory with:
- Event type and severity
- Timestamp
- Full metadata
- Quota tracking
- Escalation justifications

## Usage

### Running Manually

```bash
# Run with defaults (processes up to 50 issues)
npm run overnight

# Dry run (no PRs created, useful for testing)
npm run overnight:dry-run

# Custom configuration
npx tsx scripts/run-overnight-execution.ts --owner MyOrg --repo MyRepo --max-issues 10

# Help
npm run overnight -- --help
```

### Running via API

```bash
# Start execution via API endpoint
curl -X POST http://localhost:3000/api/foreman/overnight \
  -H "Content-Type: application/json" \
  -d '{
    "owner": "MaturionISMS",
    "repo": "maturion-foreman-app"
  }'

# Check status
curl http://localhost:3000/api/foreman/overnight
```

### Scheduling (GitHub Actions)

Create `.github/workflows/overnight-execution.yml`:

```yaml
name: Overnight Execution

on:
  schedule:
    # Run at 2 AM UTC daily
    - cron: '0 2 * * *'
  workflow_dispatch: # Allow manual triggering

jobs:
  overnight-execution:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Run overnight execution
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          OVERNIGHT_EXECUTION_ENABLED: 'true'
        run: npm run overnight
```

## Configuration

### Environment Variables

```bash
# Required
GITHUB_TOKEN=your_github_token

# Optional
OVERNIGHT_EXECUTION_ENABLED=true
DESKTOP_BUILDER_ENABLED=true
LOCAL_FOREMAN_APP_PATH=/path/to/local/repo
LOCAL_MATURION_ISMS_PATH=/path/to/local/isms/repo
```

### Runtime Configuration

The overnight execution can be configured via the `OvernightExecutionConfig` interface:

```typescript
{
  enabled: boolean,
  scheduleExpression: string, // cron expression
  maxIssuesPerRun: number,
  sequenceOrder: IssueSequenceType[],
  enableModelEscalation: boolean,
  enableAutoHeal: boolean,
  enableDesktopSync: boolean,
  createPRsAutomatically: boolean,
}
```

## Governance and Safety

### Quality Gates

All PRs created by the overnight execution must pass:
- ✅ Build checks
- ✅ Lint checks
- ✅ Test suite
- ✅ QIC (Quality and Instruction Coherence)
- ✅ QIEL (Quality Instruction Evolution Loop)
- ✅ CDW (Continuous Documentation Watch)
- ✅ Governance checks
- ✅ Memory fabric checks
- ✅ Drift detection

### Merge Queue Integration

All successful executions follow the merge queue protocol:
1. PR is created with all changes
2. All required checks must pass
3. PR enters merge queue
4. Merge queue validates again
5. PR is merged automatically when ready

### Governance Safety Rails (GSR-Model)

The system enforces:
- Quota limits for expensive models
- Justification requirements for escalations
- Throttling at configurable thresholds
- Exemptions for critical tasks (security, data integrity)

## Monitoring and Debugging

### Viewing Governance Events

```typescript
import { queryGovernanceEvents, getGovernanceStats } from '@/lib/foreman/memory/governance-memory';

// Get recent events
const events = queryGovernanceEvents({ limit: 50 });

// Get statistics
const stats = getGovernanceStats();
console.log(`Total events: ${stats.total}`);
console.log(`By severity:`, stats.bySeverity);
console.log(`By type:`, stats.byType);
```

### Checking Quota Usage

```typescript
import { getQuotaUsage } from '@/lib/foreman/model-escalation';

const usage = getQuotaUsage();
console.log(`Daily: ${usage.daily}`);
console.log(`Hourly: ${usage.hourly}`);
console.log(`Concurrent: ${usage.concurrent}`);
```

### Desktop Sync Health

```typescript
import { checkLocalBuilderHealth } from '@/lib/foreman/desktop-sync';

const health = await checkLocalBuilderHealth();
console.log(`Ready: ${health.ready}`);
if (!health.ready) {
  console.log('Issues:', health.issues);
}
```

## Testing

```bash
# Run overnight execution tests
npm run test:overnight

# Run all tests
npm run test:all

# Dry run to test without creating PRs
npm run overnight:dry-run
```

## Troubleshooting

### "GITHUB_TOKEN not set" Error

Make sure you have a GitHub personal access token or GitHub App token with the following permissions:
- `repo` (full repository access)
- `issues` (read/write)
- `pull_requests` (read/write)

### Issues Not Being Fetched

Check:
1. GitHub token has correct permissions
2. Repository owner and name are correct
3. Network connectivity to GitHub API
4. Rate limit status

### Local Builder Not Ready

Verify:
1. `DESKTOP_BUILDER_ENABLED=true` is set
2. Local repository paths are configured
3. Local repositories are on the correct branch
4. No uncommitted changes in local repositories

### Quota Exceeded

The system will automatically fall back to cheaper models when quota is exhausted. To increase quota:
1. Update `quotaLimits` in model escalation config
2. Consider using local builder for more tasks
3. Schedule overnight execution during off-peak hours

## Future Enhancements

1. **Copilot Workspace Integration**: Direct integration with GitHub Copilot Workspace API for actual issue implementation
2. **Advanced QA Automation**: Automated test generation and validation
3. **Multi-Repository Support**: Process issues across multiple repositories
4. **Priority Queuing**: Allow manual priority overrides
5. **Real-time Dashboard**: Live monitoring of overnight execution progress
6. **Rollback Mechanism**: Automatic rollback on critical failures
7. **Learning System**: Improve model selection based on historical success rates

## Related Documentation

- [Model Escalation Guide](./foreman/governance/gsr-model.md)
- [Desktop Sync Protocol](./LOCAL_BUILDER_FALLBACK.md)
- [Governance Memory](./GOVERNANCE_FIX_SUMMARY.md)
- [QA System](./QIC_IMPLEMENTATION_SUMMARY.md)

## Support

For issues or questions:
1. Check the [troubleshooting section](#troubleshooting)
2. Review governance memory logs for detailed error information
3. Create an issue in the repository with the "overnight-execution" label
4. Include the run ID and relevant log snippets

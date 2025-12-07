# Quality Integrity Watchdog (QIW)

## Overview

The Quality Integrity Watchdog (QIW) is a comprehensive log monitoring system that ensures quality integrity before QA can pass. It monitors build, lint, test, deployment simulation, and runtime initialization logs to detect anomalies, errors, and warnings that could compromise quality.

## Architecture

QIW is part of the Watchdog Evolution Wave 1 and integrates with:
- **Enhanced QA Runner**: Runs QIW as part of the complete QA suite
- **Governance Memory**: Stores QIW events for learning and improvement
- **Dashboard**: Displays QIW status and anomalies
- **Memory Drift Monitor**: Complementary system for memory integrity

## Features

### QIW-1: Build Log Monitoring ✅
- Detects build failures
- Identifies compilation errors
- Catches TypeScript errors
- Detects module resolution failures
- Reports silent warnings

### QIW-2: Lint Log Monitoring ✅
- Detects linting errors
- Identifies code quality issues
- Catches deprecated code usage
- Reports anti-patterns

### QIW-3: Test Log Monitoring ✅
- Detects test failures
- Identifies runtime errors during tests
- Catches unexpected test passes
- Reports skipped tests
- Detects suppressed failures

### QIW-4: Deployment Simulation Monitoring ✅
- Monitors `next build` performance
- Monitors `next start` performance
- Validates Preview mode deployment
- Validates Production mode deployment

### QIW-5: Governance Memory Integration ✅
- Writes QIW events to governance memory
- Records what failed
- Records where it failed (file:line)
- Analyzes why it failed
- Provides recommended fixes
- Identifies missing architecture rules

## Usage

### Basic Usage

```typescript
import { runQIWMonitoring } from '@/lib/foreman/watchdog/quality-integrity-watchdog'

// Run QIW monitoring
const report = runQIWMonitoring({
  logsDir: '/tmp',
  blockOnCritical: true,
  blockOnErrors: true,
  blockOnWarnings: false,
  writeGovernanceMemory: true,
  enabledChannels: ['build', 'lint', 'test']
})

console.log('QIW Status:', report.passed ? 'PASSED' : 'FAILED')
console.log('QA Blocked:', report.qaBlocked)
console.log('Anomalies:', report.allAnomalies.length)
```

### Integration with Enhanced QA

QIW is automatically integrated into the Enhanced QA Runner:

```typescript
import { runEnhancedQA } from '@/lib/foreman/qa/enhanced-qa-runner'

const qaResult = runEnhancedQA({
  projectDir: process.cwd(),
  logsDir: '/tmp',
  buildSequenceId: 'build-123',
  projectId: 'project-456'
})

// QIW is included in the result
console.log('QIW Passed:', qaResult.checks.qiwPassed)
console.log('QIW Report:', qaResult.qiwReport)
```

## Configuration

### QIWConfig

```typescript
interface QIWConfig {
  /** Channels to monitor */
  enabledChannels: QIWChannel[]
  
  /** Whether to block QA on critical anomalies */
  blockOnCritical: boolean
  
  /** Whether to block QA on errors */
  blockOnErrors: boolean
  
  /** Whether to block QA on warnings */
  blockOnWarnings: boolean
  
  /** Directory where logs are stored */
  logsDir: string
  
  /** Whether to write governance memory entries */
  writeGovernanceMemory: boolean
  
  /** Project directory */
  projectDir?: string
}
```

### Channels

QIW monitors the following channels:

- `build`: Build logs (`build.log`)
- `lint`: Lint logs (`lint.log`)
- `test`: Test logs (`test.log`)
- `deployment_simulation`: Deployment simulation logs (`deployment-simulation.log`)
- `runtime_initialization`: Runtime initialization logs (`runtime-init.log`)

### Severity Levels

QIW classifies anomalies into severity levels:

- `critical`: Blocks QA immediately (e.g., missing log files)
- `error`: Detected errors in logs (e.g., compilation errors, test failures)
- `warning`: Detected warnings in logs (e.g., deprecated APIs)
- `info`: Informational anomalies

## Error Patterns

### Build Errors

- `ERROR`, `Error:` - Generic errors
- `Build failed`, `Compilation error`, `Failed to compile` - Build failures
- `TypeError:`, `ReferenceError:`, `SyntaxError:` - Runtime errors
- `error TS\d{4}:` - TypeScript errors
- `Module not found`, `Cannot find module` - Module resolution errors

### Lint Errors

- `error` - Lint errors
- `✖` - Error indicators
- `\d+:\d+\s+error` - Line:column error format

### Test Errors

- `FAIL`, `failed` - Test failures
- `ERROR` - Test errors
- `TypeError:`, `ReferenceError:`, `AssertionError:` - Runtime errors
- `\d+ failing` - Failing test count

## Dashboard Integration

QIW provides a dashboard API endpoint at `/api/foreman/analytics/qiw` that returns:

```typescript
interface QIWDashboardData {
  status: 'healthy' | 'warning' | 'error' | 'critical'
  latestReport: QIWReport | null
  recentAnomalies: QIWAnomaly[]
  trends: {
    date: string
    criticalCount: number
    errorCount: number
    warningCount: number
  }[]
  channelHealth: {
    channel: QIWChannel
    status: 'healthy' | 'warning' | 'error' | 'critical'
    lastChecked: string
  }[]
}
```

## Governance Memory

When QIW detects anomalies, it writes events to governance memory at `memory/global/qiw-events.json`. Each event includes:

```typescript
interface GovernanceMemoryQIWEntry {
  whatFailed: string
  where: string
  why: string
  recommendedFix: string
  missingArchitectureRule?: string
  channel: QIWChannel
  severity: QIWSeverity
  timestamp: string
  buildSequenceId?: string
  projectId?: string
}
```

## Exit Criteria

QIW enforces the following exit criteria:

- ✅ **Watchdog blocks QA when anomalies found**: QIW sets `qaBlocked` flag when critical/error anomalies are detected
- ✅ **Watchdog exposes QIW results in dashboard**: Dashboard API endpoint provides real-time QIW status
- ✅ **Governance Memory logs QIW events**: All critical/error anomalies are logged to governance memory
- ✅ **QA cannot incorrectly pass again**: QIW is integrated into Enhanced QA Runner and blocks QA when anomalies are found

## Testing

QIW includes comprehensive test coverage:

```bash
# Run QIW tests
npx tsx --test tests/watchdog/qiw.test.ts

# Run all tests
npm run test:all
```

## Best Practices

1. **Always enable QIW in production builds**: Set `writeGovernanceMemory: true` to track quality issues
2. **Block on errors**: Set `blockOnErrors: true` to prevent QA from passing with errors
3. **Review governance memory regularly**: Use QIW events to improve quality processes
4. **Monitor trends**: Use the dashboard to track quality improvements over time
5. **Create proper log files**: Ensure all build/lint/test processes create log files in the expected location

## Future Enhancements

- [ ] Add support for custom error patterns
- [ ] Add support for whitelisting specific anomalies
- [ ] Add support for anomaly deduplication
- [ ] Add support for anomaly correlation
- [ ] Add email/Slack notifications for critical anomalies
- [ ] Add automated remediation suggestions

## References

- [Quality Integrity Contract](../../foreman/governance/quality-integrity-contract.md)
- [QA Philosophy](../../foreman/qa/qa-philosophy.md)
- [Enhanced QA Runner](../qa/enhanced-qa-runner.ts)
- [Memory Drift Monitor](../memory/drift-monitor.ts)

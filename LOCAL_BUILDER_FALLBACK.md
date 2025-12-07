# Local Builder Fallback Integration

This document describes the Local Builder Fallback system implemented in the Foreman orchestration engine.

## Overview

The Local Builder Fallback system provides fault-tolerant operation by automatically switching to a local hybrid builder when the primary Copilot SWE service is unavailable or when specific conditions are met.

## Architecture

### Components

1. **Configuration** (`/config/local-builder.json`)
   - Centralized configuration for local builder settings
   - Defines fallback conditions and thresholds
   - Specifies local builder endpoint URLs

2. **Local Builder Utility** (`lib/foreman/local-builder.ts`)
   - Health check monitoring
   - Fallback condition detection
   - Local builder communication
   - Event recording and tracking

3. **Dispatch Integration** (`lib/foreman/dispatch.ts`)
   - Integrated fallback logic in task execution
   - Automatic switching to local builder
   - Governance event recording

## Configuration

### Local Builder Configuration File

Located at `/config/local-builder.json`:

```json
{
  "enabled": true,
  "builder_url": "http://localhost:5050/builder/run",
  "health_url": "http://localhost:5050/health",
  "fallback_interval_minutes": 30,
  "local_repo_path": "D:/AI_Projects/Foreman true north and Qa files/maturion-foreman-app",
  "conditions": {
    "copilot_failure": true,
    "token_exhaustion": true,
    "high_complexity_escalation": true,
    "pipeline_timeout_seconds": 45
  }
}
```

### Configuration Fields

- **enabled**: Master switch for local builder fallback
- **builder_url**: Endpoint for executing tasks with local builder
- **health_url**: Health check endpoint for the local builder
- **fallback_interval_minutes**: Minimum interval between fallback attempts
- **local_repo_path**: Local path to the repository for the hybrid builder
- **conditions**: Object defining when to trigger fallback

#### Fallback Conditions

- **copilot_failure**: Trigger fallback when Copilot SWE is unavailable
- **token_exhaustion**: Trigger fallback when API tokens are exhausted
- **high_complexity_escalation**: Trigger fallback for high-complexity tasks
- **pipeline_timeout_seconds**: Trigger fallback when pipeline exceeds timeout

## Usage

### Simulating Copilot Unavailability

To test the fallback system, set environment variables:

```bash
# Simulate Copilot unavailability
export SIMULATE_COPILOT_FAILURE=true

# Simulate token exhaustion
export SIMULATE_TOKEN_EXHAUSTION=true

# Enable autonomous mode for auto-approval
export MATURION_AUTONOMOUS_MODE=true
```

### Task Execution with Fallback

When a task is dispatched, the system automatically:

1. Checks if fallback conditions are met
2. Verifies local builder health
3. Switches to local builder if needed
4. Executes the task with appropriate builder
5. Records fallback event in governance memory

```typescript
import { dispatchBuilderTask, executeBuilderTask } from '@/lib/foreman/dispatch'

// Dispatch task (will auto-fallback if conditions are met)
const task = await dispatchBuilderTask('api', {
  module: 'user-service',
  taskDescription: 'Implement user authentication',
  organisationId: 'org-123',
  metadata: {
    complexity: 'high', // This can trigger fallback
  },
})

// Execute task (will use local builder if fallback is triggered)
const result = await executeBuilderTask(task.id)
```

## Fallback Workflow

### 1. Detection Phase

```
Task Execution Request
    ↓
Check Fallback Conditions
    ↓
[Copilot Available?] → YES → Use Copilot SWE
    ↓ NO
[Token Available?] → NO → Trigger Fallback
    ↓ YES
[Timeout Exceeded?] → YES → Trigger Fallback
    ↓ NO
[High Complexity?] → YES → Trigger Fallback
    ↓ NO
Use Copilot SWE
```

### 2. Execution Phase

```
Fallback Triggered
    ↓
Check Local Builder Health
    ↓
[Healthy?] → NO → Fail with Error
    ↓ YES
Assemble Builder Payload
    ↓
Execute with Local Builder
    ↓
Record Fallback Event
    ↓
Return Results
```

### 3. Governance Phase

```
Fallback Completed
    ↓
Record in Governance Memory
    ↓
Log to Foreman Memory
    ↓
Update Analytics
```

## Local Builder Payload

The local builder receives a structured payload:

```typescript
{
  task_id: string
  issue_number?: number
  repo_path: string
  task_description: string
  builder_type: string
  module: string
  context?: Record<string, any>
  metadata?: Record<string, any>
}
```

## Fallback Events

All fallback events are recorded with the following structure:

```typescript
{
  timestamp: Date
  reason: 'copilot_unavailable' | 'token_exhaustion' | 'timeout' | 'high_complexity'
  task_id: string
  builder_type: string
  local_builder_used: boolean
  success: boolean
  error?: string
}
```

## QA and Governance

The fallback system maintains all QA and governance requirements:

1. **QA Validation**: All tasks pass through QA validation regardless of builder
2. **QA-of-QA**: Meta-review is performed on all outputs
3. **Governance Compliance**: Fallback events are logged in governance memory
4. **Audit Trail**: Complete audit trail maintained for all fallback operations

## Testing

### Unit Tests

Located in `tests/local-builder/fallback.test.ts`:

- Configuration loading
- Copilot unavailability detection
- Fallback triggering logic
- Event recording

### Integration Tests

Located in `tests/local-builder/integration.test.ts`:

- End-to-end fallback pipeline
- Multiple condition handling
- QA validation
- Governance compliance
- Error handling

Run tests:

```bash
# Run all local builder tests
npm run test -- tests/local-builder/*.test.ts

# Run specific test file
npx tsx --test tests/local-builder/fallback.test.ts
```

## Monitoring and Observability

### Health Checks

The system performs regular health checks on the local builder:

```typescript
import { checkLocalBuilderHealth } from '@/lib/foreman/local-builder'

const isHealthy = await checkLocalBuilderHealth()
```

### Event Tracking

Query fallback events for monitoring:

```typescript
import { getFallbackEvents } from '@/lib/foreman/local-builder'

// Get all fallback events
const allEvents = getFallbackEvents()

// Filter by task ID
const taskEvents = getFallbackEvents({ taskId: 'task_123' })

// Filter by builder type
const apiEvents = getFallbackEvents({ builderType: 'api' })

// Filter by success status
const failedEvents = getFallbackEvents({ success: false })
```

## Error Handling

### Local Builder Unavailable

If the local builder is not healthy, the system:

1. Attempts health check
2. Logs error
3. Throws exception
4. Records failed fallback event

### Execution Failures

If local builder execution fails:

1. Error is caught
2. Fallback event recorded with error details
3. Task status updated to 'failed'
4. Governance event logged

## Best Practices

1. **Monitor Health**: Regularly check local builder health status
2. **Review Events**: Periodically review fallback events for patterns
3. **Test Conditions**: Test all fallback conditions in staging
4. **Update Configuration**: Keep fallback thresholds tuned to your needs
5. **Maintain Local Builder**: Ensure local builder is always operational

## Troubleshooting

### Fallback Not Triggering

1. Check `enabled: true` in configuration
2. Verify environment variables are set correctly
3. Check fallback condition thresholds
4. Review logs for detection logic

### Local Builder Connection Fails

1. Verify local builder is running
2. Check URL configuration in `local-builder.json`
3. Test health endpoint manually
4. Review network connectivity

### Governance Events Not Recording

1. Check memory system is initialized
2. Verify organisationId is provided
3. Review memory storage logs
4. Check for memory write errors

## Future Enhancements

- [ ] Automatic retry with exponential backoff
- [ ] Circuit breaker pattern for local builder
- [ ] Load balancing between multiple local builders
- [ ] Real-time health monitoring dashboard
- [ ] Predictive fallback based on historical patterns
- [ ] Integration with external monitoring systems

## Related Documentation

- [Foreman Architecture](./ARCHITECTURE.md)
- [Memory System](./MEMORY_FABRIC.md)
- [Governance Framework](./GOVERNANCE.md)
- [QA System](./QA_SYSTEM.md)

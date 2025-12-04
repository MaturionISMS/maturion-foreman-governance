# Error Recovery Protocols

## Error Handling Philosophy

The Maturion system handles errors systematically, not reactively. Every error is categorized, logged, and handled according to established protocols. Errors are expected and planned for, not treated as exceptional circumstances.

## Error Categories

### 1. Task-Level Errors

**Definition**: Errors within a single builder task execution

**Examples**:
- Builder encounters invalid input
- Type compilation fails
- Test generation fails
- API call to external service times out

**Impact**: Single task failure, does not necessarily halt sequence

**Recovery**: Task marked as failed, sequence continues if non-critical

### 2. Sequence-Level Errors

**Definition**: Errors affecting the entire build sequence

**Examples**:
- Architecture analysis fails
- QA validation fails
- All builder tasks fail
- PR assembly fails

**Impact**: Entire sequence fails

**Recovery**: Sequence marked as failed, requires manual intervention

### 3. Critical System Errors

**Definition**: Errors affecting Foreman's core operation

**Examples**:
- Cannot load behavior files
- Cannot connect to GitHub API
- Cannot authenticate with OpenAI
- Missing required environment variables

**Impact**: System cannot operate

**Recovery**: Immediate escalation, system health check required

### 4. Transient Errors

**Definition**: Temporary errors likely to resolve on retry

**Examples**:
- Network timeout
- API rate limit
- Temporary service unavailability
- Database connection pool exhausted

**Impact**: Temporary failure

**Recovery**: Automatic retry with exponential backoff

## Error Recovery Strategies

### Strategy 1: Automatic Retry

**When to Use**: Transient errors (network, rate limits, timeouts)

**Implementation**:
```typescript
async function retryWithBackoff<T>(
  operation: () => Promise<T>,
  maxRetries: number = 3,
  baseDelay: number = 1000
): Promise<T> {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await operation()
    } catch (error) {
      if (attempt === maxRetries) {
        throw error
      }
      
      const delay = baseDelay * Math.pow(2, attempt - 1)
      console.log(`[Retry] Attempt ${attempt} failed, retrying in ${delay}ms`)
      await sleep(delay)
    }
  }
  
  throw new Error('Max retries exceeded')
}
```

**Example Usage**:
```typescript
// Retry GitHub API calls
const content = await retryWithBackoff(
  () => github.rest.repos.getContent({ owner, repo, path }),
  3,
  1000
)
```

**Backoff Schedule**:
- Attempt 1: 0ms (immediate)
- Attempt 2: 1000ms (1 second)
- Attempt 3: 2000ms (2 seconds)
- Attempt 4: 4000ms (4 seconds)

**Max Retries**: 3 attempts for most operations

### Strategy 2: Graceful Degradation

**When to Use**: Non-critical features fail, but core functionality can continue

**Implementation**:
```typescript
async function loadBehaviorFilesWithFallback(): Promise<ForemanBehaviourFile[]> {
  try {
    return await loadForemanBehaviourFiles()
  } catch (error) {
    console.warn('[Fallback] Could not load behavior files, using defaults')
    return getDefaultBehaviorFiles()
  }
}
```

**Examples**:
- Cannot load behavior files → Use minimal default behaviors
- Architecture analysis fails → Skip analysis, use manual task specification
- QA Builder unavailable → Proceed with warning, manual QA required

### Strategy 3: Fail-Fast

**When to Use**: Critical errors that cannot be recovered

**Implementation**:
```typescript
function validateRequiredSecrets() {
  const required = ['GITHUB_APP_ID', 'GITHUB_APP_PRIVATE_KEY', 'OPENAI_API_KEY']
  const missing = required.filter(key => !process.env[key])
  
  if (missing.length > 0) {
    throw new Error(`Missing required secrets: ${missing.join(', ')}`)
  }
}

// Call at startup
validateRequiredSecrets()
```

**Examples**:
- Missing GitHub App credentials → Fail immediately
- Missing OpenAI API key → Fail immediately
- Invalid organization ID → Reject request immediately

**Rationale**: Fail fast prevents cascading failures and provides clear error messages

### Strategy 4: Partial Success

**When to Use**: Some tasks succeed, some fail, but progress was made

**Implementation**:
```typescript
async function executeBuildSequence(tasks: BuilderTask[]): Promise<SequenceResult> {
  const results = await Promise.allSettled(
    tasks.map(task => executeBuilderTask(task.id))
  )
  
  const succeeded = results.filter(r => r.status === 'fulfilled')
  const failed = results.filter(r => r.status === 'rejected')
  
  return {
    total: tasks.length,
    succeeded: succeeded.length,
    failed: failed.length,
    status: failed.length === 0 ? 'completed' : 'partial_success'
  }
}
```

**Examples**:
- UI and API builders succeed, Schema builder fails → Partial success
- 4 of 5 tasks complete → Proceed with completed tasks

**Handling**:
- Log failed tasks
- Mark sequence as partial success
- Create PR with completed work
- Note failures in PR description

## Error Handling Workflows

### Builder Task Failure Workflow

```
Task Execution → Error Caught → Log Error → Update Task Status → Check Critical
                                                                         ↓
                                                                    Critical?
                                                                    ↙      ↘
                                                                  Yes      No
                                                                   ↓        ↓
                                                            Halt Sequence   Continue
```

**Implementation**:
```typescript
async function executeBuilderTaskWithErrorHandling(taskId: string): Promise<BuilderTask> {
  const task = getBuilderTask(taskId)
  
  try {
    updateTaskStatus(taskId, 'running')
    
    // Execute builder logic
    const result = await actualBuilderExecution(task)
    
    updateTaskStatus(taskId, 'completed', result)
    return task
    
  } catch (error) {
    console.error(`[Task] Task ${taskId} failed:`, error)
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    updateTaskStatus(taskId, 'failed')
    task.error = errorMessage
    
    // Determine if critical
    if (isCriticalTask(task)) {
      throw new Error(`Critical task ${taskId} failed: ${errorMessage}`)
    }
    
    return task
  }
}
```

### QA Failure Workflow

```
QA Validation → Check Results → Any Failures?
                                      ↓
                                     Yes
                                      ↓
                        Block PR Assembly → Log QA Failures → Mark Sequence Failed
                                                                        ↓
                                                              Require Manual Review
```

**Implementation**:
```typescript
async function handleQAResults(qaResults: QAResult[]): Promise<boolean> {
  const failures = qaResults.filter(r => r.status === 'failed')
  
  if (failures.length > 0) {
    console.error('[QA] Validation failed:', failures)
    
    for (const failure of failures) {
      console.error(`  - ${failure.check}: ${failure.message}`)
    }
    
    // Block PR assembly
    throw new Error(`QA validation failed: ${failures.length} checks failed`)
  }
  
  const warnings = qaResults.filter(r => r.status === 'warning')
  if (warnings.length > 0) {
    console.warn('[QA] Validation warnings:', warnings)
  }
  
  return true
}
```

### API Error Workflow

```
API Call → Success?
              ↓
             No
              ↓
        Transient Error?
           ↙      ↘
         Yes       No
          ↓         ↓
    Retry with    Fail
     Backoff    Immediately
```

**Implementation**:
```typescript
function isTransientError(error: any): boolean {
  // Network errors
  if (error.code === 'ECONNRESET' || error.code === 'ETIMEDOUT') {
    return true
  }
  
  // HTTP status codes
  if (error.status === 429 || error.status === 503 || error.status === 504) {
    return true
  }
  
  return false
}

async function apiCallWithRetry<T>(call: () => Promise<T>): Promise<T> {
  try {
    return await retryWithBackoff(call, 3, 1000)
  } catch (error) {
    if (isTransientError(error)) {
      throw new Error('API call failed after retries (transient error)')
    } else {
      throw new Error(`API call failed: ${error.message}`)
    }
  }
}
```

## Error Logging Standards

### Log Format

All errors logged with structured format:

```typescript
interface ErrorLog {
  timestamp: string
  level: 'error' | 'warning' | 'info'
  component: string
  operation: string
  error: {
    message: string
    stack?: string
    code?: string
  }
  context: {
    taskId?: string
    sequenceId?: string
    organisationId?: string
  }
}
```

### Error Logging Implementation

```typescript
function logError(
  component: string,
  operation: string,
  error: Error,
  context?: Record<string, any>
) {
  const errorLog: ErrorLog = {
    timestamp: new Date().toISOString(),
    level: 'error',
    component,
    operation,
    error: {
      message: error.message,
      stack: error.stack,
      code: (error as any).code
    },
    context: context || {}
  }
  
  console.error(`[${component}] ${operation} failed:`, JSON.stringify(errorLog, null, 2))
}

// Usage
try {
  await executeBuilderTask(taskId)
} catch (error) {
  logError('BuilderDispatch', 'executeBuilderTask', error, { taskId })
  throw error
}
```

### Error Categorization in Logs

```typescript
// Critical error
console.error('[CRITICAL] GitHub App authentication failed')

// Recoverable error
console.error('[ERROR] Builder task failed, sequence continues')

// Warning
console.warn('[WARNING] QA check flagged potential issue')

// Info
console.log('[INFO] Retry attempt 2 of 3')
```

## Error Escalation Rules

### When to Escalate

Escalate to admin when:

1. **Critical System Failure**: Cannot authenticate, missing secrets, core service down
2. **QA Validation Failure**: Code quality issues require human judgment
3. **Security Concern**: Potential secret exposure or vulnerability detected
4. **Governance Violation**: Rule violation that blocks execution
5. **Repeated Failures**: Same task fails multiple times

### Escalation Channels

**Current**:
- Application logs (Vercel runtime logs)
- API response messages
- Build sequence status

**Future**:
- Email notifications to admin
- Slack/Discord webhooks
- Admin dashboard alerts
- PagerDuty integration for critical issues

### Escalation Implementation

```typescript
function escalateError(
  severity: 'low' | 'medium' | 'high' | 'critical',
  error: Error,
  context: Record<string, any>
) {
  // Log with escalation marker
  console.error(`[ESCALATE:${severity.toUpperCase()}]`, error.message, context)
  
  // Future: Send notifications
  // await sendAdminNotification(severity, error, context)
  // await createIncidentTicket(severity, error, context)
}
```

## Rollback Strategies

### Automatic Rollback (Not Implemented)

Foreman does NOT automatically rollback changes. Rationale:

- PRs remain in review state until merged
- Failed PRs stay in draft for manual inspection
- Merged changes follow repository's rollback procedures
- QA validation prevents most issues from reaching production

### Manual Rollback

If deployed code has issues:

1. **Identify the Problem PR**: Check PR that introduced the issue
2. **Revert the Merge**: Use Git revert or create revert PR
3. **Deploy Revert**: Merge revert PR to restore previous state
4. **Root Cause Analysis**: Determine why QA didn't catch the issue
5. **Improve QA**: Add checks to prevent recurrence

### Partial Rollback

For large sequences with multiple changes:

1. **Identify Failed Component**: Which builder's output is problematic?
2. **Cherry-Pick Good Changes**: Extract non-problematic changes
3. **Create New PR**: PR with only working changes
4. **Fix Failed Component**: Address issue separately

## Error Prevention

### Validation Before Execution

Prevent errors by validating before acting:

```typescript
async function validateBeforeDispatch(request: BuilderRequest): Promise<void> {
  // Validate organisation ID
  if (!request.organisationId) {
    throw new Error('Organisation ID is required')
  }
  
  // Validate required fields
  if (!request.module || !request.taskDescription) {
    throw new Error('Missing required fields')
  }
  
  // Validate task type
  const builder = determineBuilder(request)
  if (!isTaskTypeSupported(builder, request.taskDescription)) {
    throw new Error(`Task type not supported by ${builder} builder`)
  }
}
```

### Circuit Breaker Pattern

Prevent cascading failures:

```typescript
class CircuitBreaker {
  private failures = 0
  private threshold = 5
  private timeout = 60000 // 1 minute
  private state: 'closed' | 'open' | 'half-open' = 'closed'
  private openedAt?: number
  
  async execute<T>(operation: () => Promise<T>): Promise<T> {
    if (this.state === 'open') {
      if (Date.now() - (this.openedAt || 0) > this.timeout) {
        this.state = 'half-open'
      } else {
        throw new Error('Circuit breaker is open')
      }
    }
    
    try {
      const result = await operation()
      this.onSuccess()
      return result
    } catch (error) {
      this.onFailure()
      throw error
    }
  }
  
  private onSuccess() {
    this.failures = 0
    this.state = 'closed'
  }
  
  private onFailure() {
    this.failures++
    if (this.failures >= this.threshold) {
      this.state = 'open'
      this.openedAt = Date.now()
    }
  }
}
```

## Error Metrics and Monitoring

Track error rates for system health:

```typescript
interface ErrorMetrics {
  total: number
  byCategory: Record<string, number>
  byComponent: Record<string, number>
  lastHour: number
  lastDay: number
}

function trackError(category: string, component: string) {
  errorMetrics.total++
  errorMetrics.byCategory[category] = (errorMetrics.byCategory[category] || 0) + 1
  errorMetrics.byComponent[component] = (errorMetrics.byComponent[component] || 0) + 1
}
```

---

*This error recovery protocol defines systematic handling of failures across the Foreman system, ensuring graceful degradation and clear escalation paths.*

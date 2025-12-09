# Builder Protocol

## Purpose

This document defines the standardized protocol for all builders in the Maturion Foreman ecosystem, ensuring consistent behavior, routing, and governance compliance across both GitHub Copilot builders and Local (desktop) OpenAI builders.

## Builder Networks

The Foreman system supports two builder networks:

### 1. GitHub Copilot Builder Network
- **Type**: Cloud-based AI builder service
- **Endpoint**: GitHub Copilot SWE API
- **Primary Use**: Small, incremental changes; low-risk tasks
- **Availability Detection**: API health checks, token quota monitoring
- **Advantages**: No local setup required, automatic updates
- **Limitations**: Token limits, network dependency

### 2. Local Builder Network (Desktop OpenAI)
- **Type**: Local hybrid builder
- **Endpoint**: Local HTTP service (default: `http://localhost:5050`)
- **Primary Use**: Large refactors, multi-file operations, deep architectural changes
- **Availability Detection**: Health endpoint polling
- **Advantages**: No token limits, offline capability, full control
- **Limitations**: Requires local setup and maintenance

## Protocol Specification

### 1. Builder Discovery

All builders MUST implement a health check endpoint for discovery:

```typescript
// Health Check Endpoint
GET /health

Response:
{
  "status": "healthy" | "degraded" | "unavailable",
  "builder_type": "copilot" | "local",
  "version": string,
  "capabilities": string[],
  "timestamp": ISO8601
}
```

### 2. Builder Request Format

All builders MUST accept requests in this standardized format:

```typescript
interface BuilderRequest {
  // Core Fields
  module: string                    // Target module name
  taskDescription: string           // Clear task description
  organisationId: string            // Organization identifier
  
  // Optional Fields
  context?: Record<string, any>     // Additional context
  metadata?: {
    complexity?: 'low' | 'medium' | 'high'
    priority?: 'low' | 'normal' | 'high' | 'critical'
    wave?: string                   // Build wave identifier
    issueNumber?: number            // GitHub issue reference
    [key: string]: any
  }
}
```

### 3. Builder Response Format

All builders MUST return responses in this standardized format:

```typescript
interface BuilderResponse {
  success: boolean
  task_id: string
  status: 'completed' | 'failed' | 'pending'
  
  // Artifacts (for successful execution)
  artifacts?: Array<{
    type: 'code' | 'config' | 'documentation'
    name: string
    path: string
    content?: string
    metadata?: Record<string, any>
  }>
  
  // Error details (for failures)
  error?: string
  error_details?: Record<string, any>
  
  // Execution metadata
  execution_time_ms?: number
  builder_used: 'copilot' | 'local'
  timestamp: ISO8601
}
```

### 4. Builder Task Lifecycle

All builders MUST follow this lifecycle:

1. **Created** - Task created and pending approval
2. **Approved** - Task approved for execution (auto or manual)
3. **Executing** - Builder actively working on task
4. **QA Validation** - Output undergoing QA checks
5. **Completed** - Task successfully completed
6. **Failed** - Task failed with error

## Routing Logic

### Builder Selection Algorithm

Foreman uses this algorithm to select the optimal builder:

```typescript
function selectBuilder(task: BuilderRequest): 'copilot' | 'local' {
  // 1. Check if local builder is enabled
  if (!isLocalBuilderEnabled()) {
    return 'copilot'
  }
  
  // 2. Check fallback conditions
  const fallback = await shouldTriggerFallback(task)
  if (fallback.shouldFallback) {
    return 'local'
  }
  
  // 3. Check task complexity
  if (task.metadata?.complexity === 'high') {
    return 'local'
  }
  
  // 4. Check Copilot availability
  const copilotAvailable = await checkCopilotAvailability()
  if (!copilotAvailable) {
    return 'local'
  }
  
  // 5. Default to Copilot for standard tasks
  return 'copilot'
}
```

### Fallback Conditions

The system triggers fallback to Local Builder when:

1. **Copilot Unavailability**: Copilot SWE API is down or unreachable
2. **Token Exhaustion**: API token quota exceeded
3. **High Complexity**: Task marked as high complexity
4. **Pipeline Timeout**: Task execution exceeds configured timeout (default: 45s)

## Governance Compliance

All builders MUST comply with these governance frameworks:

### 1. True North Architecture

- Follow architectural principles defined in `/foreman/true-north-architecture.md`
- Align with system-wide quality standards
- Respect architectural boundaries and layers

### 2. SBHC (System Behavior Health Checks)

- Implement health monitoring and reporting
- Report degraded states immediately
- Auto-recover from transient failures when possible

### 3. QIC (Quality Integrity Contract)

All builders MUST implement QIC requirements:

- **QIC-1**: Build Integrity - Parse build logs for errors
- **QIC-2**: Lint Integrity - Enforce zero lint errors/warnings
- **QIC-3**: Runtime Integrity - Detect runtime failures
- **QIC-4**: Deployment Simulation - Validate preview/production builds
- **QIC-5**: Silent Failure Prevention - Detect non-explicit failures
- **QIC-6**: Governance Memory Integration - Record all QI incidents
- **QIC-7**: Auto-Propagation - Apply to all modules automatically

### 4. QIEL (Quality Integrity Enforcement Layer)

All builder outputs MUST pass QIEL validation:

1. Build log parsing
2. Lint log validation
3. Test log verification
4. Deployment simulation
5. Schema cohesion validation
6. Engine load validation
7. QI incident recording
8. Regression test generation

### 5. Drift Detector

All builders MUST participate in drift detection:

- Report governance drift when detected
- Flag schema drift in artifacts
- Detect cross-agent memory drift
- Alert on staleness drift
- Monitor contradiction drift

## Builder Payload Specification

### Copilot Builder Payload

```typescript
interface CopilotBuilderPayload {
  task_id: string
  issue_number?: number
  task_description: string
  builder_type: BuilderType
  module: string
  context?: Record<string, any>
  metadata?: Record<string, any>
}
```

### Local Builder Payload

```typescript
interface LocalBuilderPayload {
  task_id: string
  issue_number?: number
  repo_path: string                // Local repository path
  task_description: string
  builder_type: BuilderType
  module: string
  context?: Record<string, any>
  metadata?: Record<string, any>
}
```

## Quality Assurance

### QA Requirements

All builder outputs MUST pass:

1. **Type Safety**: TypeScript strict mode compliance
2. **Linting**: Zero lint errors or warnings
3. **Tests**: All tests pass with >80% coverage for new code
4. **Build**: Clean build with zero errors
5. **Runtime**: No runtime errors in validation

### QA-of-QA Meta-Review

All QA results MUST undergo meta-review to validate:

- QA checks are functioning correctly
- No false positives in QA reporting
- QA coverage is comprehensive
- QA enforcement is consistent

## Error Handling

### Transient Failures

Builders SHOULD implement retry logic for transient failures:

- Network timeouts: 3 retries with exponential backoff
- API rate limits: Wait and retry with backoff
- Service unavailable: Switch to fallback builder

### Permanent Failures

Builders MUST report permanent failures immediately:

- Invalid task specification
- Missing required permissions
- Governance violations
- QA validation failures

### Degraded Mode

Builders SHOULD support degraded mode operation:

- Reduced functionality when subsystems are unavailable
- Clear indication of degraded state
- Automatic recovery when subsystems restore

## Monitoring and Telemetry

### Required Metrics

All builders MUST report:

1. **Task Metrics**:
   - Execution time
   - Success/failure rate
   - Queue depth
   
2. **Health Metrics**:
   - Uptime/availability
   - Response time
   - Error rate
   
3. **Governance Metrics**:
   - QA pass rate
   - Compliance violations
   - Drift detections

### Event Logging

All builders MUST log these events:

- Task received
- Task started
- Task completed/failed
- Fallback triggered
- QA validation result
- Governance violation detected

## Security

### Authentication

All builder endpoints MUST:

- Validate organization ID on every request
- Reject requests without valid credentials
- Log all authentication attempts

### Secrets Management

Builders MUST:

- Never log secrets or credentials
- Use environment-based secrets only
- Rotate secrets on configured schedule
- Detect and reject hardcoded secrets

### Audit Trail

All builder actions MUST be auditable:

- Complete action logs with timestamps
- Organization ID tracking
- Result tracking (success/fail)
- Error reason recording

## Configuration

### Required Configuration

All builders MUST support:

```env
# Builder Network Configuration
BUILDER_NETWORK_ENABLED=true
COPILOT_BUILDER_ENABLED=true
LOCAL_BUILDER_ENABLED=true
LOCAL_BUILDER_URL=http://localhost:5050
LOCAL_BUILDER_HEALTH_URL=http://localhost:5050/health

# Fallback Configuration
FALLBACK_ON_COPILOT_FAILURE=true
FALLBACK_ON_TOKEN_EXHAUSTION=true
FALLBACK_ON_HIGH_COMPLEXITY=true
PIPELINE_TIMEOUT_SECONDS=45

# Governance Configuration
ENFORCE_QIC=true
ENFORCE_QIEL=true
DRIFT_DETECTION_ENABLED=true
```

### Optional Configuration

Builders MAY support:

```env
# Performance Tuning
MAX_CONCURRENT_TASKS=5
TASK_QUEUE_SIZE=100
RETRY_ATTEMPTS=3
RETRY_BACKOFF_MS=1000

# Monitoring
TELEMETRY_ENABLED=true
TELEMETRY_ENDPOINT=https://telemetry.example.com
LOG_LEVEL=info
```

## Compliance Validation

### Self-Test

All builders MUST implement a self-test endpoint:

```typescript
GET /self-test

Response:
{
  "protocol_version": string,
  "true_north_compliant": boolean,
  "qic_compliant": boolean,
  "qiel_compliant": boolean,
  "drift_detector_enabled": boolean,
  "health_status": "healthy" | "degraded" | "unavailable",
  "checks": Array<{
    name: string,
    status: "pass" | "fail",
    message: string
  }>
}
```

### Protocol Version

Current protocol version: **1.0.0**

Builders MUST report their protocol version in all responses.

## Versioning

This protocol follows semantic versioning:

- **Major**: Breaking changes to request/response format
- **Minor**: New optional features or fields
- **Patch**: Bug fixes and clarifications

## Future Enhancements

Planned for future protocol versions:

- [ ] Real-time streaming support (WebSocket/SSE)
- [ ] Multi-builder collaboration protocol
- [ ] Advanced routing with ML-based selection
- [ ] Cross-builder state synchronization
- [ ] Builder capability negotiation
- [ ] Performance-based routing optimization

## Related Documentation

- [True North Architecture](/foreman/true-north-architecture.md)
- [Quality Integrity Contract](/foreman/qa/quality-integrity-contract.md)
- [Local Builder Fallback](/LOCAL_BUILDER_FALLBACK.md)
- [Builder Capabilities](/foreman/builder-specs/builder-capabilities.md)
- [Governance Supremacy Rule](/foreman/governance/governance-supremacy-rule.md)

---

**Last Updated**: 2024-12-09  
**Protocol Version**: 1.0.0  
**Status**: Active

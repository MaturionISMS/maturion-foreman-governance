# Builder Network Integration

This directory contains documentation for the Builder Network Integration System, which synchronizes GitHub Copilot builders and Local (desktop) OpenAI builders.

## Documentation Files

### [builder_protocol.md](builder_protocol.md)
Complete specification of the builder protocol including:
- Builder networks (Copilot + Local)
- Protocol specification (request/response formats)
- Routing logic and fallback conditions
- Governance compliance (True North, SBHC, QIC, QIEL, Drift Detector)
- Configuration and monitoring

## Quick Start

### Check Builder Availability

```typescript
import { detectAllBuilders } from '@/lib/foreman/builder-detection'

const availability = await detectAllBuilders()
console.log('Copilot:', availability.copilot.available ? 'Available' : 'Unavailable')
console.log('Local:', availability.local.available ? 'Available' : 'Unavailable')
```

### Select Optimal Builder

```typescript
import { detectOptimalBuilder } from '@/lib/foreman/builder-detection'

// For high complexity tasks
const builder = await detectOptimalBuilder('high')
console.log(`Using builder: ${builder}`) // Prefers Local for high complexity

// For standard tasks  
const builder = await detectOptimalBuilder('medium')
console.log(`Using builder: ${builder}`) // Prefers Copilot for standard tasks
```

### Sync Builder Network

```typescript
import { syncBuilderNetwork } from '@/lib/foreman/dispatch'

const syncResult = await syncBuilderNetwork()
console.log('Copilot:', syncResult.copilot.compliant ? 'Compliant' : 'Non-compliant')
console.log('Local:', syncResult.local.compliant ? 'Compliant' : 'Non-compliant')
```

### Validate Protocol Compliance

```typescript
import { validateBuilderProtocol } from '@/lib/foreman/builder-detection'

const result = await validateBuilderProtocol('copilot')
if (!result.compliant) {
  console.error('Issues:', result.issues)
}
```

### Check Governance Compliance

```typescript
import { checkGovernanceCompliance } from '@/lib/foreman/builder-detection'

const compliance = await checkGovernanceCompliance('local')
console.log('True North:', compliance.trueNorth)
console.log('QIC:', compliance.qic)
console.log('QIEL:', compliance.qiel)
console.log('Drift Detector:', compliance.driftDetector)
console.log('SBHC:', compliance.sbhc)
```

## Configuration

### Environment Variables

```env
# Enable/disable builder network
BUILDER_NETWORK_ENABLED=true
COPILOT_BUILDER_ENABLED=true
LOCAL_BUILDER_ENABLED=true

# Builder version
COPILOT_BUILDER_VERSION=latest

# Fallback configuration
FALLBACK_ON_COPILOT_FAILURE=true
FALLBACK_ON_TOKEN_EXHAUSTION=true
FALLBACK_ON_HIGH_COMPLEXITY=true
PIPELINE_TIMEOUT_SECONDS=45
```

### Local Builder Configuration

See `/config/local-builder.json` for local builder settings.

## Testing

Run builder network integration tests:

```bash
npm run test -- tests/builder-network/integration.test.ts
```

Tests cover:
- Copilot detection and capabilities
- Local builder detection and health
- Builder routing and fallback logic
- Protocol compliance validation
- Governance framework compliance
- Network health monitoring

## Key Features

### 1. Automatic Builder Detection
- Detects Copilot and Local builder availability
- Reports health status and capabilities
- Provides reasons for unavailability

### 2. Intelligent Routing
- Routes high complexity tasks to Local builder
- Routes standard tasks to Copilot
- Falls back to available builder when primary unavailable

### 3. Protocol Compliance
- Validates builders against protocol specification v1.0.0
- Ensures consistent request/response formats
- Checks required capabilities

### 4. Governance Compliance
- Validates True North architecture alignment
- Enforces QIC (Quality Integrity Contract)
- Ensures QIEL (Quality Integrity Enforcement Layer)
- Monitors Drift Detector status
- Checks SBHC (System Behavior Health Checks)

### 5. Fallback Conditions
- **Copilot Unavailability**: API down or unreachable
- **Token Exhaustion**: API quota exceeded
- **High Complexity**: Task marked as high complexity
- **Pipeline Timeout**: Task exceeds configured timeout (45s default)

## Architecture

### Builder Detection Flow

```
Request → Detect All Builders → Check Availability
                 ↓
          Check Health Status
                 ↓
          Validate Protocol
                 ↓
          Check Governance
                 ↓
          Select Optimal Builder
```

### Routing Logic

```
Task Request → Check Complexity
      ↓
High? → Local (if available) → Copilot (fallback)
      ↓
Standard? → Copilot (if available) → Local (fallback)
      ↓
Execute with Selected Builder
```

## Integration Points

### Dispatch Layer (`lib/foreman/dispatch.ts`)
- `syncBuilderNetwork()` - Sync all builders and check compliance
- `selectBuilderWithSync()` - Select optimal builder with full sync

### Builder Detection (`lib/foreman/builder-detection.ts`)
- `detectAllBuilders()` - Detect all builder availability
- `detectOptimalBuilder()` - Select optimal builder based on complexity
- `checkCopilotAvailability()` - Check Copilot status
- `checkLocalAvailability()` - Check Local builder status
- `getCopilotCapabilities()` - Get Copilot capabilities
- `getLocalCapabilities()` - Get Local capabilities
- `validateBuilderProtocol()` - Validate protocol compliance
- `checkGovernanceCompliance()` - Check governance adherence

### Local Builder (`lib/foreman/local-builder.ts`)
- `checkLocalBuilderHealth()` - Health check Local builder
- `executeWithLocalBuilder()` - Execute task with Local builder
- `shouldTriggerFallback()` - Check fallback conditions

## Monitoring

### Builder Health Status

```typescript
const availability = await detectAllBuilders()

// Copilot status
console.log({
  available: availability.copilot.available,
  healthy: availability.copilot.healthy,
  reason: availability.copilot.reason
})

// Local status
console.log({
  available: availability.local.available,
  healthy: availability.local.healthy,
  reason: availability.local.reason
})
```

### Compliance Monitoring

```typescript
const sync = await syncBuilderNetwork()

// Monitor compliance status
if (!sync.copilot.compliant) {
  console.error('Copilot non-compliant:', sync.copilot.issues)
}

if (!sync.local.compliant) {
  console.error('Local non-compliant:', sync.local.issues)
}
```

## Related Documentation

- [Builder Protocol Specification](builder_protocol.md)
- [Local Builder Fallback](/LOCAL_BUILDER_FALLBACK.md)
- [Builder Capabilities](/foreman/builder-specs/builder-capabilities.md)
- [True North Architecture](/foreman/true-north-architecture.md)
- [Quality Integrity Contract](/foreman/qa/quality-integrity-contract.md)
- [Governance Supremacy Rule](/foreman/governance/governance-supremacy-rule.md)

## Support

For questions or issues with builder network integration:
1. Check the builder protocol documentation
2. Review test files for usage examples
3. Verify configuration in `.env` and `config/local-builder.json`
4. Run integration tests to diagnose issues

---

**Last Updated**: 2024-12-09  
**Protocol Version**: 1.0.0  
**Status**: Active

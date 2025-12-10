# Internal Builder Integration Guide

## Overview

The Internal Builder Agent is a dedicated builder for the Foreman repository that operates exclusively within repository boundaries and follows the Build Philosophy v1.1.

## Key Features

### 1. Auto-Bootstrap Mechanism

The Internal Builder is automatically detected and bootstrapped when:
- No other builders (Copilot or Local) are available
- The repository detects absence of builder capabilities
- The builder agent file exists at `.github/agents/builder.agent.md`

### 2. Repository-Only Operation

The Internal Builder is constrained to operate only within the Foreman repository:
- ✅ Can write code in: `/home/runner/work/maturion-foreman-app/maturion-foreman-app/`
- ❌ Cannot access other repositories
- ❌ Cannot modify governance or constitutional files

### 3. Governance Protection

Protected paths that the Internal Builder CANNOT modify:
```
.github/workflows/                    # CI/CD workflows
.github/foreman/agent-contract.md     # Foreman's constitution
.github/agents/foreman.agent.md       # Foreman's agent definition
BUILD_PHILOSOPHY.md                   # Build Philosophy
foreman/constitution/                 # Constitutional documents
foreman/architecture-design-checklist.md  # Architecture checklist
foreman/builder-specs/build-to-green-rule.md  # Builder protocol
foreman/governance/                   # Governance rules
docs/governance/                      # Governance documentation
```

## Architecture

### Components

1. **Builder Agent Definition** (`.github/agents/builder.agent.md`)
   - Defines builder identity and constraints
   - Specifies "Build to Green" methodology
   - Declares QIC/QIEL compliance requirements

2. **Builder Detection System** (`lib/foreman/builder-detection.ts`)
   - Detects all available builders
   - Auto-bootstraps internal builder if needed
   - Validates protocol compliance
   - Checks governance compliance

3. **Builder Status API** (`app/api/foreman/builders/route.ts`)
   - GET endpoint: Returns builder availability and capabilities
   - POST endpoint: Manually triggers auto-bootstrap

### Data Flow

```
┌─────────────────────────────────────────────────────────┐
│               Builder Detection System                   │
├─────────────────────────────────────────────────────────┤
│  1. Check Copilot availability                           │
│  2. Check Local builder availability                     │
│  3. Check Internal builder existence                     │
│  4. Auto-bootstrap if no builders available              │
│  5. Select optimal builder for task                      │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│                  Internal Builder                        │
├─────────────────────────────────────────────────────────┤
│  • Validates "Build to Green" instruction                │
│  • Checks architecture specification exists              │
│  • Verifies QA is RED (failing)                          │
│  • Implements code iteratively until QA GREEN            │
│  • Creates PR with evidence trail                        │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│              Quality Assurance Gates                     │
├─────────────────────────────────────────────────────────┤
│  • QIC (Quality Integrity Contract) validation          │
│  • QIEL (QA Integrity Enforcement Layer) validation     │
│  • Drift detection                                       │
│  • Mutation governance compliance                        │
└─────────────────────────────────────────────────────────┘
```

## Usage

### Detecting Builders

```typescript
import { detectAllBuilders } from '@/lib/foreman/builder-detection'

const builders = await detectAllBuilders()

console.log(builders.copilot.available)   // true/false
console.log(builders.local.available)     // true/false
console.log(builders.internal.available)  // true/false
```

### Getting Builder Capabilities

```typescript
import { getInternalCapabilities } from '@/lib/foreman/builder-detection'

const capabilities = await getInternalCapabilities()

if (capabilities) {
  console.log(capabilities.capabilities)
  // ['code_generation', 'build_to_green', 'qic_compliance', ...]
}
```

### Selecting Optimal Builder

```typescript
import { detectOptimalBuilder } from '@/lib/foreman/builder-detection'

const builder = await detectOptimalBuilder('medium')
// Returns: 'copilot' | 'local' | 'internal' | null
```

### Manual Bootstrap

```typescript
import { autoBootstrapInternalBuilder } from '@/lib/foreman/builder-detection'

const result = await autoBootstrapInternalBuilder('org-id')

if (result.success) {
  console.log('Internal builder bootstrapped')
  console.log(result.profile)
}
```

## API Endpoints

### GET /api/foreman/builders

Returns comprehensive builder status:

```typescript
{
  availability: {
    copilot: { available: boolean, healthy: boolean, reason?: string },
    local: { available: boolean, healthy: boolean, reason?: string },
    internal: { 
      available: boolean, 
      healthy: boolean, 
      reason?: string,
      autoBootstrapped?: boolean 
    }
  },
  capabilities: {
    internal?: {
      version: string,
      capabilities: string[],
      healthStatus: string,
      protocolVersion: string,
      repository: string,
      constraints: string[]
    }
  },
  optimalBuilder: 'copilot' | 'local' | 'internal' | null,
  internalBuilderProfile?: {...},
  protocolCompliance: {...},
  governanceCompliance: {...},
  timestamp: string
}
```

### POST /api/foreman/builders

Manually triggers internal builder bootstrap:

```bash
curl -X POST http://localhost:3000/api/foreman/builders?organisationId=your-org-id
```

Response:
```typescript
{
  success: boolean,
  profile?: InternalBuilderProfile,
  reason?: string,
  timestamp: string
}
```

## Build to Green Workflow

The Internal Builder follows the "Build to Green" methodology:

### Phase 1: Validation
- Validates instruction is exactly "Build to Green"
- Ensures architecture specification exists
- Verifies QA suite is provided and status is RED
- Checks acceptance criteria is defined

### Phase 2: Iterative Building
- Runs QA to get current status
- Identifies next failing test
- Implements code to make test pass
- Repeats until all tests pass (100% green)

### Phase 3: Quality Checks
- Runs ESLint (must have 0 errors, 0 warnings)
- Runs TypeScript type check (must pass)
- Runs build (must succeed)
- Runs QIEL validation (must pass all checks)

### Phase 4: PR Creation
- Creates pull request with build summary
- Includes QA evidence (RED → GREEN)
- Includes QIC/QIEL validation results
- Provides complete audit trail

## Testing

Run builder detection tests:

```bash
npm test tests/foreman/builder-detection.test.ts
```

Tests cover:
- Internal builder existence detection
- Capability retrieval
- Profile validation
- Auto-bootstrap mechanism
- Protocol compliance validation
- Governance compliance checks

## Monitoring

### Health Checks

The Internal Builder exposes health status:

```typescript
{
  status: 'healthy',
  builder: 'internal',
  repository: 'maturion-foreman-app',
  capabilities: [...],
  protocol_version: '1.0.0',
  governance_compliant: true,
  protected_paths_verified: true
}
```

### Drift Monitoring

The builder tracks its own drift:
- Governance violations attempted (should be 0)
- Build Philosophy violations (should be 0)
- Average iterations to green QA
- QIC pass rate (should be 100%)
- QIEL pass rate (should be 100%)

## Constitutional Constraints

The Internal Builder operates under strict constitutional constraints:

1. **Build Philosophy Compliance**: Must follow Architecture → Red QA → Build to Green
2. **Governance Supremacy**: Cannot bypass quality gates or governance rules
3. **Repository Boundary**: Cannot access or modify files outside repository
4. **Protected Paths**: Cannot modify constitutional or governance files
5. **QIC/QIEL Compliance**: Must pass all quality integrity checks

## Escalation

The Internal Builder escalates to Foreman when:
- Architecture is incomplete
- QA is contradictory
- Protected file modification requested
- External repository access needed
- Architectural decision required

## Version History

- **v1.0** (2025-12-10): Initial implementation
  - Builder agent definition
  - Auto-bootstrap mechanism
  - Builder detection system
  - Status API endpoint
  - Comprehensive tests

## References

- [Build Philosophy](/BUILD_PHILOSOPHY.md)
- [Foreman Agent Contract](/.github/foreman/agent-contract.md)
- [Build to Green Rule](/foreman/builder-specs/build-to-green-rule.md)
- [Quality Integrity Contract](/foreman/qa/quality-integrity-contract.md)
- [Internal Builder Agent](/.github/agents/builder.agent.md)

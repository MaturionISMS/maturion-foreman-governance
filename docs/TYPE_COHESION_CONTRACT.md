# Type Cohesion Contract

## Overview

This document defines the formal type contract for the Maturion Foreman system, ensuring structural integrity across all cognitive engines and memory subsystems.

**Purpose**: Prevent type mismatches that can pass local QA but fail during Vercel deployment or production builds.

**Authority**: This contract is mandatory. All code changes must maintain type cohesion as defined here.

## Schema Version: 1.0.0

**Versioning Policy**: 
- Major version: Breaking changes to required fields or field types
- Minor version: New optional fields or non-breaking enhancements
- Patch version: Documentation updates only

## Core Type Contracts

### 1. Unified Memory Fabric

**Location**: `/types/memory.ts`

**Version**: 1.0.0

#### MemoryEntry (Canonical Shape)

```typescript
interface MemoryEntry {
  // Required fields (MUST be present)
  id: string                    // Unique identifier
  scope: MemoryScope           // 'global' | 'foreman' | 'project'
  key: string                  // Unique key within scope
  value: any                   // Memory content (JSON-serializable)
  metadata: MemoryMetadata     // Entry metadata
  
  // Optional fields (MAY be present)
  tags?: string[]              // Categorization tags
}
```

#### MemoryMetadata (Canonical Shape)

```typescript
interface MemoryMetadata {
  // Required fields (MUST be present)
  createdAt: string            // ISO 8601 timestamp
  updatedAt: string            // ISO 8601 timestamp
  createdBy: string            // Agent identifier
  version: number              // Version number (starts at 1)
}
```

**Validation Rules**:
- `id` MUST be non-empty string
- `scope` MUST be one of: 'global', 'foreman', 'project'
- `key` MUST be non-empty string
- `metadata.createdAt` MUST be valid ISO 8601 timestamp
- `metadata.updatedAt` MUST be valid ISO 8601 timestamp
- `metadata.version` MUST be positive integer
- `tags` if present MUST be array of strings

**Evolution Policy**:
- Adding new optional fields: Minor version bump
- Adding new required fields: Major version bump + migration strategy
- Changing field types: Major version bump + migration strategy

### 2. Retirement Engine

**Location**: `/types/retirement.ts`

**Version**: 1.0.0

#### RetirementCandidate (Canonical Shape)

```typescript
interface RetirementCandidate {
  // Required fields (MUST be present)
  entry: MemoryEntry           // Full memory entry
  reason: RetirementReason     // Classification
  severity: RetirementSeverity // Impact level
  score: number                // 0-100 confidence score
  explanation: string          // Human-readable reason
  recommendedAction: 'retire' | 'archive' | 'deprecate' | 'review'
  metadata: {
    ageInDays: number          // Required metadata
    lastAccessed?: string      // Optional
    usageCount?: number        // Optional
    conflictCount?: number     // Optional
  }
}
```

**Validation Rules**:
- `entry` MUST be valid MemoryEntry
- `reason` MUST be valid RetirementReason enum value
- `severity` MUST be valid RetirementSeverity enum value
- `score` MUST be 0-100 inclusive
- `explanation` MUST be non-empty string
- `metadata.ageInDays` MUST be non-negative number

#### RetirementInfo (Canonical Shape)

```typescript
interface RetirementInfo {
  // Required fields (MUST be present)
  reason: RetirementReason
  severity: RetirementSeverity
  lifecycle: MemoryLifecycleState
  explanation: string
  manualReviewRequired: boolean
  
  // Optional fields (MAY be present)
  supersededBy?: string
  contradictedBy?: string[]
  obsoleteReferences?: string[]
  reviewedBy?: string
  reviewedAt?: string          // ISO 8601 timestamp if present
}
```

**Validation Rules**:
- All enum fields MUST be valid enum values
- `explanation` MUST be non-empty string
- `reviewedAt` if present MUST be valid ISO 8601 timestamp

### 3. Consolidation Engine

**Location**: `/types/consolidation.ts`

**Version**: 1.0.0

#### KnowledgeBlock (Canonical Shape)

```typescript
interface KnowledgeBlock {
  // Required fields (MUST be present)
  id: string
  category: KnowledgeCategory
  summary: string
  lesson: string
  appliesTo: string[]
  originEntries: string[]
  governanceLinks: string[]
  confidence: number           // 0-1 range
  importance: KnowledgeImportance
  timestamp: string            // ISO 8601
  
  // Optional fields (MAY be present)
  lastValidated?: string       // ISO 8601 timestamp
  metadata?: {
    consolidatedFrom: number
    firstSeen: string          // ISO 8601
    validationCount: number
  }
}
```

**Validation Rules**:
- `id` MUST be non-empty string
- `category` MUST be valid KnowledgeCategory enum value
- `summary` MUST be non-empty string (max 500 chars recommended)
- `lesson` MUST be non-empty string
- `appliesTo` MUST be array (may be empty)
- `originEntries` MUST be array (may be empty)
- `governanceLinks` MUST be array (may be empty)
- `confidence` MUST be 0-1 inclusive
- `importance` MUST be valid KnowledgeImportance enum value
- `timestamp` MUST be valid ISO 8601 timestamp

### 4. Analytics Engine

**Location**: `/types/drift.ts` (extends existing drift monitoring)

**Version**: 1.0.0

#### DriftReport (Canonical Shape)

```typescript
interface DriftReport {
  // Required fields (MUST be present)
  timestamp: string            // ISO 8601
  status: DriftStatus          // 'ok' | 'warning' | 'error'
  checks: DriftCheck[]
  summary: string
  
  // Optional fields (MAY be present)
  blocksExecution?: boolean
  recommendations?: string[]
}
```

**Validation Rules**:
- `timestamp` MUST be valid ISO 8601 timestamp
- `status` MUST be one of: 'ok', 'warning', 'error'
- `checks` MUST be array (may be empty)
- `summary` MUST be non-empty string

## Cross-Engine Interface Contracts

### Memory Fabric ↔ Retirement Engine

**Contract**: Retirement Engine MUST only access documented fields of MemoryEntry

**Validation**: 
```typescript
// ALLOWED
const age = entry.metadata.createdAt
const scope = entry.scope
const tags = entry.tags ?? []

// FORBIDDEN (accessing unknown fields)
const unknownField = entry.someRandomProperty  // ❌ Type error
```

### Memory Fabric ↔ Consolidation Engine

**Contract**: Consolidation Engine MUST only access documented fields of MemoryEntry

**Validation**:
```typescript
// ALLOWED
const entryTags = entry.tags ?? []
const entryValue = entry.value

// FORBIDDEN
const invalidAccess = entry.undefinedProperty  // ❌ Type error
```

### Retirement Engine ↔ Consolidation Engine

**Contract**: Both engines MUST agree on MemoryEntry shape and KnowledgeBlock references

**Shared Types**:
- Both import from `@/types/memory`
- Both use consistent `MemoryEntry` interface
- No engine-specific extensions without explicit versioning

### All Engines ↔ Drift Monitor

**Contract**: Drift Monitor MAY read all engine types but MUST NOT modify them

**Validation**:
```typescript
// ALLOWED (read-only)
const entries = await getAllMemory()
const report = analyzeDrift(entries)

// FORBIDDEN (modification without proper API)
entries[0].value.newField = "something"  // ❌ Use writeMemory API
```

## Canonical Validation Functions

### MemoryEntry Validation

```typescript
export function validateMemoryEntry(entry: unknown): entry is MemoryEntry {
  if (!entry || typeof entry !== 'object') return false
  
  const e = entry as any
  
  // Required fields
  if (typeof e.id !== 'string' || e.id.length === 0) return false
  if (!['global', 'foreman', 'project'].includes(e.scope)) return false
  if (typeof e.key !== 'string' || e.key.length === 0) return false
  if (!e.metadata || typeof e.metadata !== 'object') return false
  
  // Metadata validation
  if (typeof e.metadata.createdAt !== 'string') return false
  if (typeof e.metadata.updatedAt !== 'string') return false
  if (typeof e.metadata.createdBy !== 'string') return false
  if (typeof e.metadata.version !== 'number' || e.metadata.version < 1) return false
  
  // Optional fields
  if (e.tags !== undefined && !Array.isArray(e.tags)) return false
  
  return true
}
```

### KnowledgeBlock Validation

```typescript
export function validateKnowledgeBlock(block: unknown): block is KnowledgeBlock {
  if (!block || typeof block !== 'object') return false
  
  const b = block as any
  
  // Required fields
  if (typeof b.id !== 'string' || b.id.length === 0) return false
  if (typeof b.category !== 'string') return false
  if (typeof b.summary !== 'string' || b.summary.length === 0) return false
  if (typeof b.lesson !== 'string' || b.lesson.length === 0) return false
  if (!Array.isArray(b.appliesTo)) return false
  if (!Array.isArray(b.originEntries)) return false
  if (!Array.isArray(b.governanceLinks)) return false
  if (typeof b.confidence !== 'number' || b.confidence < 0 || b.confidence > 1) return false
  if (typeof b.importance !== 'string') return false
  if (typeof b.timestamp !== 'string') return false
  
  return true
}
```

### RetirementInfo Validation

```typescript
export function validateRetirementInfo(info: unknown): info is RetirementInfo {
  if (!info || typeof info !== 'object') return false
  
  const i = info as any
  
  // Required fields
  if (typeof i.reason !== 'string') return false
  if (typeof i.severity !== 'string') return false
  if (typeof i.lifecycle !== 'string') return false
  if (typeof i.explanation !== 'string' || i.explanation.length === 0) return false
  if (typeof i.manualReviewRequired !== 'boolean') return false
  
  return true
}
```

## Canonical Flattening Functions

### Flatten MemoryEntry for Storage

```typescript
export function flattenMemoryEntry(entry: MemoryEntry): Record<string, any> {
  return {
    id: entry.id,
    scope: entry.scope,
    key: entry.key,
    value: entry.value,
    metadata: {
      createdAt: entry.metadata.createdAt,
      updatedAt: entry.metadata.updatedAt,
      createdBy: entry.metadata.createdBy,
      version: entry.metadata.version
    },
    ...(entry.tags && { tags: entry.tags })
  }
}
```

### Flatten KnowledgeBlock for Storage

```typescript
export function flattenKnowledgeBlock(block: KnowledgeBlock): Record<string, any> {
  return {
    id: block.id,
    category: block.category,
    summary: block.summary,
    lesson: block.lesson,
    appliesTo: block.appliesTo,
    originEntries: block.originEntries,
    governanceLinks: block.governanceLinks,
    confidence: block.confidence,
    importance: block.importance,
    timestamp: block.timestamp,
    ...(block.lastValidated && { lastValidated: block.lastValidated }),
    ...(block.metadata && { metadata: block.metadata })
  }
}
```

## Schema Evolution Strategy

### Adding New Optional Fields

**Process**:
1. Add field with `?` modifier to interface
2. Update validation function to handle optional field
3. Bump minor version
4. Document in changelog

**Example**:
```typescript
// Before (v1.0.0)
interface MemoryEntry {
  id: string
  scope: MemoryScope
}

// After (v1.1.0)
interface MemoryEntry {
  id: string
  scope: MemoryScope
  newOptionalField?: string  // NEW
}
```

### Adding New Required Fields

**Process**:
1. Add migration function to populate default values
2. Run migration on all existing data
3. Add field to interface (without `?`)
4. Update validation functions
5. Bump major version
6. Document breaking change

**Example**:
```typescript
// Migration function
export function migrateToV2(entry: MemoryEntryV1): MemoryEntryV2 {
  return {
    ...entry,
    newRequiredField: 'default-value'  // Provide default
  }
}
```

### Changing Field Types

**Process**:
1. Create new interface version
2. Create bidirectional conversion functions
3. Update all consumers
4. Bump major version
5. Deprecate old version with timeline

**Not Allowed**: Direct type changes without migration path

## TypeScript Compiler Configuration

### Strict Mode Requirements

`tsconfig.json` MUST enforce:

```json
{
  "compilerOptions": {
    "strict": true,              // Enable all strict checks
    "noImplicitAny": true,       // No implicit any types
    "strictNullChecks": true,    // Strict null checking
    "strictPropertyInitialization": true,
    "noUnusedLocals": true,      // Detect unused variables
    "noUnusedParameters": true,  // Detect unused parameters
    "noImplicitReturns": true,   // All code paths return
    "noFallthroughCasesInSwitch": true
  }
}
```

### No Unknown Property Access

**Rule**: Accessing properties not defined in the interface MUST cause a type error

**Enforcement**: TypeScript strict mode + ESLint rules

## Build-Time Validation

### Pre-Build Type Check

**Command**: `tsc --noEmit`

**Purpose**: Validate all TypeScript files compile without errors

**Required**: MUST pass before deployment

### Build Simulation

**Command**: `next build`

**Purpose**: Simulate Vercel production build locally

**Required**: MUST pass before deployment

## Governance Integration

### Type Error Recording

All type-related failures MUST be recorded in governance events:

```typescript
interface TypeErrorEvent {
  type: 'type_error'
  timestamp: string
  location: string           // File path
  error: string             // Error message
  engine: string            // Which engine failed
  severity: 'warning' | 'error'
}
```

### Schema Mismatch Recording

```typescript
interface SchemaMismatchEvent {
  type: 'schema_mismatch'
  timestamp: string
  expectedSchema: string    // Expected type
  actualSchema: string      // Actual type received
  field: string            // Which field mismatched
  engine: string           // Which engine detected mismatch
}
```

### Build Failure Recording

```typescript
interface BuildFailureEvent {
  type: 'build_failure'
  timestamp: string
  command: string          // e.g., 'next build'
  exitCode: number
  errorOutput: string
  relatedFiles: string[]
}
```

## Testing Requirements

### Unit Tests

Each validation function MUST have tests covering:
- Valid inputs (should pass)
- Invalid inputs (should fail)
- Edge cases (empty arrays, null values, etc.)

### Integration Tests

Cross-engine interactions MUST be tested:
- Retirement Engine reading MemoryEntry
- Consolidation Engine writing KnowledgeBlock
- Drift Monitor reading all types

### Regression Tests

MUST include tests for:
- Accessing unknown properties (should fail at compile time)
- Passing invalid types (should fail at runtime)
- Schema version mismatches

## Exit Criteria for Type Cohesion

✅ **Type cohesion is achieved when**:

1. All engines use canonical type definitions from `/types`
2. No unknown property access exists in codebase
3. All validation functions pass for legitimate data
4. `tsc --noEmit` passes without errors
5. `next build` completes successfully
6. Cross-engine integration tests pass
7. Regression tests detect type violations
8. Governance events record all type failures

---

**Document Version**: 1.0.0  
**Last Updated**: 2025-12-07  
**Authority**: True North Compliance - Architecture & QA Evolution  
**Status**: Mandatory

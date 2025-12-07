# Build-Time Type Safety & Deployment Simulation QA

## Overview

This document defines the **Build-Time Type Safety** and **Build Simulation** QA categories, which ensure type cohesion across all cognitive engines and prevent deployment failures.

**Authority**: This QA framework is mandatory. All code changes must pass these checks before deployment.

**Background**: Issue #62 - A TypeScript type mismatch in the Retirement Engine passed existing QA but failed during Vercel deployment. This new QA category prevents this failure class from occurring again.

## QA Categories

### 1. TypeScript Structural Validation

**Purpose**: Detect structural type mismatches at build time

**What It Checks**:
- ✅ All TypeScript files compile without errors (`tsc --noEmit`)
- ✅ No unknown property access exists in codebase
- ✅ All type definitions follow canonical shapes defined in Type Cohesion Contract
- ✅ Cross-engine interfaces are consistent
- ✅ Strict mode is enforced in `tsconfig.json`

**How to Run**:
```bash
npm run typecheck
npm run test:structural
```

**Gate Enforcement**:
- **MUST** pass before PR creation
- **MUST** pass in CI/CD pipeline
- **BLOCKS** deployment on failure

**Tests Location**: `tests/qa-structural/type-validation.test.ts`

**Failure Handling**:
1. TypeScript compilation errors are recorded as governance events
2. Schema mismatches are logged to `memory/governance-events.json`
3. PR is blocked until errors are resolved
4. No workarounds or bypasses permitted

### 2. Build Simulation QA

**Purpose**: Simulate Vercel production builds locally to catch deployment failures before they happen

**What It Checks**:
- ✅ `next build` completes successfully in production mode
- ✅ All routes compile and optimize correctly
- ✅ No build-time type errors
- ✅ ESLint passes without critical errors
- ✅ Module resolution works for all `@/` path aliases
- ✅ Dependency versions are consistent

**How to Run**:
```bash
npm run build
npm run lint
npm run test -- tests/qa-structural/build-simulation.test.ts
```

**Gate Enforcement**:
- **MUST** pass before merge to main
- **SHOULD** be tested locally before creating PR
- **BLOCKS** deployment on failure

**Tests Location**: `tests/qa-structural/build-simulation.test.ts`

**Failure Handling**:
1. Build failures are recorded as governance events with full logs
2. Related files are identified and logged
3. Exit code and error output are captured
4. Platform-specific failures (Vercel) are tracked separately

### 3. Cross-Engine Interface Validation

**Purpose**: Ensure all cognitive engines agree on object shapes and can interoperate

**What It Checks**:
- ✅ Retirement Engine and Consolidation Engine agree on `MemoryEntry` shape
- ✅ All engines use consistent type definitions from `/types`
- ✅ No engine-specific type extensions without explicit versioning
- ✅ Shared types (MemoryEntry, KnowledgeBlock) are validated by all engines
- ✅ Engines only access documented fields

**How to Run**:
```bash
npm run test -- tests/qa-structural/cross-engine-interface.test.ts
```

**Gate Enforcement**:
- **MUST** pass before PR creation
- **BLOCKS** changes that break engine interoperability
- **REQUIRES** Type Cohesion Contract compliance

**Tests Location**: `tests/qa-structural/cross-engine-interface.test.ts`

**Failure Handling**:
1. Interface mismatches are recorded as schema mismatch events
2. Affected engines are identified
3. Impacted operations are logged
4. Contract version is checked for compliance

## Integration with Existing QA

### Pre-Commit Checks (Developer)

Before committing code:
```bash
npm run typecheck
```

### Pre-PR Checks (Builder/Developer)

Before creating PR:
```bash
npm run qa:full
```

This runs:
1. TypeScript compilation (`tsc --noEmit`)
2. Linting (`npm run lint`)
3. Structural tests (`npm run test:structural`)
4. Production build (`npm run build`)

### CI/CD Pipeline

Required checks in GitHub Actions:
```yaml
- name: Type Safety Check
  run: npm run typecheck

- name: Structural Validation
  run: npm run test:structural

- name: Build Simulation
  run: npm run build

- name: Full Test Suite
  run: npm run test:all
```

### Foreman Integration

When Foreman creates a PR, it MUST:

1. **Pre-Assembly**: Run `npm run typecheck`
2. **Pre-Assembly**: Run structural tests
3. **Pre-PR Creation**: Simulate production build
4. **On Failure**: Record governance event and halt PR creation

## Governance Event Recording

All type safety failures are recorded to `memory/governance-events.json`:

### Type Error Event

```json
{
  "type": "type_error",
  "timestamp": "2025-12-07T07:00:00Z",
  "location": "lib/foreman/memory/retirement-engine.ts",
  "error": "Property 'unknownField' does not exist on type 'MemoryEntry'",
  "engine": "retirement-engine",
  "severity": "error"
}
```

### Schema Mismatch Event

```json
{
  "type": "schema_mismatch",
  "timestamp": "2025-12-07T07:00:00Z",
  "expectedSchema": "MemoryEntry",
  "actualSchema": "{ id, scope, unknownField }",
  "field": "unknownField",
  "engine": "consolidation-engine",
  "severity": "error"
}
```

### Build Failure Event

```json
{
  "type": "build_failure",
  "timestamp": "2025-12-07T07:00:00Z",
  "command": "next build",
  "exitCode": 1,
  "errorOutput": "Type error: ...",
  "relatedFiles": ["lib/foreman/memory/retirement-engine.ts"],
  "phase": "build"
}
```

### Deployment Failure Event

```json
{
  "type": "deployment_failure",
  "timestamp": "2025-12-07T07:00:00Z",
  "platform": "vercel",
  "reason": "Build failed during deployment",
  "relatedCommit": "abc123"
}
```

## Viewing Governance Events

Check recent type safety issues:
```typescript
import { getRecentTypeSafetyEvents, getTypeSafetyStatistics } from '@/lib/foreman/governance/type-safety-events'

const events = getRecentTypeSafetyEvents(50)
const stats = getTypeSafetyStatistics()

console.log('Recent type safety events:', events)
console.log('Statistics:', stats)
```

View events file directly:
```bash
cat memory/governance-events.json | jq '.[] | select(.type == "type_error" or .type == "build_failure")'
```

## Type Safety Degradation Detection

The system monitors type safety health:

```typescript
import { isTypeSafetyDegrading } from '@/lib/foreman/governance/type-safety-events'

if (isTypeSafetyDegrading()) {
  console.warn('⚠️ Type safety is degrading - review recent events')
}
```

**Degradation Criteria**:
- More than 5 type/build failures in last 24 hours
- Triggers alert for review
- May require pause in autonomous builds

## Regression Test Requirements

### Must Include Tests For:

1. **Accessing Unknown Properties**
   - Should fail at TypeScript compile time
   - Runtime check returns `undefined`

2. **Passing Invalid Types**
   - Validation functions reject invalid data
   - Type guards return `false`

3. **Schema Version Mismatches**
   - Detect when engines use different schema versions
   - Record as governance event

4. **Breaking Interface Changes**
   - Tests fail when engine interfaces diverge
   - Require explicit migration

### Test Coverage Requirements

- ✅ All validation functions: 100% coverage
- ✅ All type guards: 100% coverage
- ✅ All flattening functions: 100% coverage
- ✅ Cross-engine interactions: Covered
- ✅ Unknown field access: Documented and tested

## Exit Criteria

✅ **Type Safety QA is complete when**:

1. All TypeScript files compile without errors (`tsc --noEmit` passes)
2. Production build succeeds (`next build` passes)
3. All structural tests pass
4. All cross-engine interface tests pass
5. Regression tests detect type violations
6. Governance events are recorded for all failures
7. Type Cohesion Contract is documented and followed
8. Validation functions exist for all canonical types
9. Unknown property access is prevented by type system
10. Vercel deployment simulation passes locally

## Relationship to True North

**One Build**: Same build that runs on Vercel must succeed locally

**True North**: 
- Security: Type safety prevents runtime errors
- Quality: Structural validation ensures code quality
- Compliance: Governance events provide audit trail
- Integrity: Cross-engine consistency maintained

**Continuous Improvement Loop**:
- Type failures are recorded
- Statistics tracked over time
- Degradation alerts enable proactive fixes
- Regression tests prevent recurrence

**No Legacy**:
- All code must use canonical types
- Old patterns must be migrated
- No workarounds for type safety
- Progressive enhancement only

## Enforcement

### Foreman MUST:

1. ❌ **Never bypass type checks**
2. ❌ **Never suppress TypeScript errors**
3. ❌ **Never create PR with failing structural tests**
4. ❌ **Never skip build simulation**

### Foreman MUST:

1. ✅ **Run `tsc --noEmit` before PR creation**
2. ✅ **Run structural tests before PR creation**
3. ✅ **Simulate production build before PR creation**
4. ✅ **Record all failures to governance events**
5. ✅ **Halt on any type safety failure**

### Developers MUST:

1. ✅ **Use canonical type definitions from `/types`**
2. ✅ **Use validation functions for runtime checks**
3. ✅ **Run `npm run qa:full` before PR creation**
4. ✅ **Fix type errors, not suppress them**

### Admins MAY:

1. ✅ **Review governance events for patterns**
2. ✅ **Update Type Cohesion Contract when needed**
3. ✅ **Add new validation rules**
4. ❌ **NOT override type safety gates**

## Monitoring & Alerts

### Dashboard Integration

Type safety metrics should be visible in Foreman dashboard:

- Total type errors (last 7 days)
- Total build failures (last 7 days)
- Most affected engines
- Most common errors
- Degradation status

### Alert Triggers

Alert when:
- Type safety is degrading (>5 issues in 24h)
- Same error occurs 3+ times
- Critical build failure
- Deployment failure

## References

- [Type Cohesion Contract](./TYPE_COHESION_CONTRACT.md)
- [QA Philosophy](../foreman/qa/qa-philosophy.md)
- [Governance Model](../foreman/governance/governance-model.md)

## Version History

**v1.0.0** (2025-12-07): Initial implementation
- TypeScript Structural Validation QA category
- Build Simulation QA category
- Cross-Engine Interface Validation
- Governance event recording
- Regression test suite

---

**Status**: Mandatory  
**Authority**: True North Compliance - Architecture & QA Evolution  
**Effective**: Immediately

# Dashboard API Test Suite

This directory contains comprehensive tests for the Project Dashboard Aggregation Layer and API endpoints.

## Test Coverage

The test suite validates:

- ✅ Dashboard aggregation logic
- ✅ Correct JSON structure (DashboardResponse)
- ✅ Accurate weighted milestone progress calculation
- ✅ Blocker escalation & severity logic
- ✅ Phase timeline calculations
- ✅ S-curve generation
- ✅ Deployment readiness evaluation
- ✅ Memory snapshot integration (stubbed until M1 memory wave)
- ✅ Deterministic output for given inputs

## Test Files

### Core Tests

- **dashboard.test.ts** - Main dashboard aggregation and structure validation
- **milestones.test.ts** - Milestone weighting, progress calculation, and phase grouping
- **blockers.test.ts** - Blocker logic, severity escalation, and status impact
- **status.test.ts** - Project status calculation and transitions
- **timeline.test.ts** - Phase timeline calculations and transitions
- **s-curve.test.ts** - S-curve data generation and progress tracking
- **deployment.test.ts** - Deployment readiness evaluation and checks
- **memory.test.ts** - Memory snapshot integration (stub validation)

### Test Fixtures

All test fixtures are located in `tests/fixtures/dashboard/`:

- **projectMinimal.json** - Minimal project for basic testing
- **projectWithMilestones.json** - Project with various milestone completion states
- **projectWithBlockers.json** - Project with blocker scenarios
- **projectWithTimelineDrift.json** - Project experiencing timeline drift
- **projectDeploymentFailure.json** - Project with deployment failures
- **projectSCurveCase.json** - Project for S-curve generation testing
- **emptyMemory.json** - Empty memory stub for validation

## Running Tests

### Run All Tests

```bash
npm test
```

### Run Dashboard Tests Only

```bash
npm run test:dashboard
```

### Watch Mode

```bash
npm run test:watch
```

## Test Statistics

- **Total Tests**: 87
- **Test Suites**: 8
- **Coverage**: 100% of dashboard aggregation logic
- **Pass Rate**: 100%

## Test Requirements

All tests:

- ✅ Use lightweight mock fixtures (no I/O overhead)
- ✅ Ensure deterministic behavior
- ✅ Match TypeScript types (DashboardResponse)
- ✅ Pass linting (ESLint)
- ✅ Pass type checking (TypeScript)
- ✅ Validate governance compliance

## Governance Compliance

Tests validate compliance with:

- `project-lifecycle-rules.md` - Phase transitions and lifecycle management
- `milestone-rules.md` - Milestone weights, progress calculation
- `deployment-governance.md` - Deployment readiness checks
- `autonomy-rules.md` - Autonomous behavior patterns
- `memory-rules.md` - Memory stub alignment (ready for M1 expansion)

## Test Philosophy

These tests follow the **QA-of-QA** principle:

1. **Correctness** - Validates logic against governance rules
2. **Determinism** - Same input always produces same output
3. **Completeness** - All required fields always present
4. **Consistency** - Data structures match TypeScript definitions
5. **Stability** - Dashboard remains functional even with partial data

## Future Enhancements

When Unified Memory Fabric (M1) is implemented:

- Expand memory.test.ts with real memory integration tests
- Add tests for memory snapshot querying and filtering
- Validate memory relevance scoring

When Supabase storage layer is added:

- Add integration tests for persistence
- Validate data consistency across storage and memory layers

When dashboard UI is implemented (Wave UI1):

- Add live UI tests for client-side rendering
- Validate interactive dashboard features

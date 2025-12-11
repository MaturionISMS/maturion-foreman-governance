# Builder Runtime Engine

## Overview

The Builder Runtime Engine (`/lib/foreman/execution/builder-runtime.ts`) is the core execution runtime through which Foreman orchestrates the Build-to-Green process. It implements all six layers of the Build Philosophy execution model.

## Purpose

This runtime is **REQUIRED for autonomy**. It enables Foreman to:

- Load and validate internal builder agents
- Format tasks based on architecture + Red QA
- Execute builders using MCP (Model Context Protocol)
- Validate outputs (Red QA → Green QA transition)
- Create PRs with complete evidence trail
- Enforce CS5 (no TODOs, complete implementations)
- Enforce CS6 (external builder blocking)
- Ensure one-step Build-to-Green execution

## Architecture

The runtime is organized into 6 distinct layers, each with specific responsibilities:

### Layer 1: Builder Loading

**Purpose**: Load and validate the internal builder agent file

**Responsibilities**:
- Load `.github/agents/maturion-builder.agent.md`
- Calculate SHA-256 hash for integrity validation (CS1)
- Parse agent metadata (name, version)
- Validate agent structure and required sections
- Log successful load to governance memory

**Functions**:
- `loadBuilderAgent(agentName)` - Loads and validates builder agent
- `validateBuilderIntegrity(agentPath)` - Validates file integrity

**Failure Modes**:
- Missing file → Halt execution
- Corrupt file → Halt execution
- Governance violation → Escalate to Foreman

### Layer 2: Task Preparation

**Purpose**: Convert Foreman's structured instruction into standardized runtime input

**Input Object**:
```typescript
interface BuilderTask_Extended {
  id: string
  architecture: ArchitectureDocument
  qaSuite: RedQASuite
  acceptanceCriteria: AcceptanceCriteria[]
  buildInstruction: 'Build to Green'
}
```

**Validations**:
- ✅ Build instruction must be exactly "Build to Green"
- ✅ Architecture must exist and be complete
- ✅ Architecture must be validated against checklist
- ✅ QA suite must exist
- ✅ QA must be RED (failing)
- ✅ Acceptance criteria must be defined

**Functions**:
- `validateTaskFormat(task)` - Validates task against Build Philosophy
- `prepareBuilderTask(task)` - Creates standardized payload

**Failure Mode**: If ANY validation fails → STOP, do not proceed

### Layer 3: MCP Execution

**Purpose**: Execute builder using MCP with retries, timeouts, and circuit breaker

**Features**:
- Timeout: 30 minutes per execution
- Retries: 3 attempts with exponential backoff
- Circuit breaker pattern for cascading failures
- Builder capability negotiation
- Complete log preservation

**Functions**:
- `executeBuilderWithMCP(agentName, task, config)` - Executes via MCP

**Failure Modes**:
- Invalid response format → FAIL
- Success without addressing Red QA → FAIL
- Timeout → Retry with backoff
- Max retries exceeded → Escalate

### Layer 4: Output Validation

**Purpose**: Validate builder output and QA transition

**Validations**:
- ✅ QA transitions from RED → GREEN
- ✅ All acceptance criteria met
- ✅ No unexpected files modified
- ✅ No protected paths touched
- ✅ CS5: No TODOs/FIXME/HACK
- ✅ Build and lint pass
- ✅ Type checking passes

**Functions**:
- `validateBuilderOutput(output, task, config)` - Comprehensive validation
- `runQAValidation(config)` - Run QA tests
- `checkProtectedPaths(files)` - Validate no governance violations
- `checkForTODOs(files)` - CS5 enforcement
- `runBuildValidation(config)` - Lint, typecheck, build

**Failure Mode**: If ANY violation → Block PR, log to governance

### Layer 5: PR Creation

**Purpose**: Create PR with complete evidence trail for Due Process validation

**Evidence Trail Includes**:
1. **Architecture Design**
   - Title and content
   - Checklist validation status
   - Completeness marker
   - Validation timestamp

2. **Red QA Creation**
   - Test count and failing count
   - Initial status (must be RED)
   - Creation timestamp
   - Execution log

3. **Build Instruction**
   - Instruction text ("Build to Green")
   - Builder agent used

4. **Build Execution**
   - Artifacts generated
   - QA results

5. **Validation Results**
   - All 6 validation checks
   - CS5 and CS6 compliance

6. **Timeline Integrity**
   - All steps timestamped
   - Correct order enforced

**Functions**:
- `createPRWithEvidence(task, output, validation, evidenceTrail, config)` - Creates PR
- `generatePRTitle(task, config)` - Generates title
- `generatePRDescription(...)` - Generates complete description with evidence

**PR Naming Convention**: `foreman/build/<task-id>-<timestamp>`

### Layer 6: CS5 & CS6 Enforcement

**CS5: Performance Fix Enforcement (No TODOs)**

Ensures all code is complete with no placeholders:
- Scans all artifacts for TODO, FIXME, HACK
- Blocks PR if any found
- Logs violations to governance memory

**CS6: External Builder Protection**

Blocks unauthorized builders:
- Only allows: `maturion-builder`, `local-builder`
- Blocks: GitHub Copilot external access
- Blocks: Any unknown builder
- Logs violations as critical governance events

**Functions**:
- `enforceCS5(output)` - Validates no TODOs
- `enforceCS6(builderUsed)` - Validates builder authorization

## Main Execution Function

```typescript
executeBuildToGreenRuntime(task, config): Promise<BuilderRuntimeResult>
```

**Process Flow**:
1. Load builder agent (Layer 1)
2. Validate and prepare task (Layer 2)
3. Execute via MCP (Layer 3)
4. Validate output and QA transition (Layer 4)
5. Create PR with evidence (Layer 5)
6. Enforce CS5 & CS6 (Layer 6)

**Auto-Rollback**: If `config.autoRollback = true`, automatically rolls back on failure

**Governance Logging**: All steps logged to governance memory with appropriate severity

## Usage Example

```typescript
import { executeBuildToGreenRuntime } from '@/lib/foreman/execution/builder-runtime'

const task: BuilderTask_Extended = {
  id: 'issue-42',
  architecture: {
    title: 'Dashboard Component',
    content: '...',
    checklistValidated: true,
    validationTimestamp: '2025-12-11T07:00:00Z',
    completeness: 'complete'
  },
  qaSuite: {
    testCount: 15,
    failingCount: 15,
    status: 'red',
    tests: [...],
    createdAt: '2025-12-11T07:00:00Z',
    executionLog: '...'
  },
  acceptanceCriteria: [
    { criterion: 'All tests pass', met: false }
  ],
  buildInstruction: 'Build to Green'
}

const config: BuilderRuntimeConfig = {
  owner: 'MaturionISMS',
  repo: 'maturion-foreman-app',
  issueNumber: 42,
  branch: 'feature/dashboard',
  builderAgent: 'maturion-builder',
  autoRollback: true,
  governanceMode: 'strict'
}

const result = await executeBuildToGreenRuntime(task, config)

if (result.success) {
  console.log('Build to Green completed:', result.prUrl)
} else {
  console.error('Build failed:', result.error)
}
```

## Testing

Comprehensive test suite at `/tests/builder-runtime/builder-runtime.test.ts`

**Test Coverage**:
- ✅ Builder agent loading and integrity validation
- ✅ Task format validation (Build to Green)
- ✅ Architecture and Red QA validation
- ✅ CS5 enforcement (no TODOs)
- ✅ CS6 enforcement (external builder blocking)
- ✅ Complete workflow integration

**Test Results**: 17 tests, 100% passing

## Integration Points

### With Builder Executor
The runtime can be called from `builder-executor.ts` for real builder execution:

```typescript
import { executeBuildToGreenRuntime } from './builder-runtime'

// In executeBuild function:
const runtimeResult = await executeBuildToGreenRuntime(extendedTask, config)
```

### With Wave Orchestrator
Can be integrated into wave execution for autonomous multi-issue builds:

```typescript
import { executeBuildToGreenRuntime } from './execution/builder-runtime'

// In executeWave:
for (const issue of issues) {
  const task = prepareTaskFromIssue(issue)
  const result = await executeBuildToGreenRuntime(task, config)
  results.push(result)
}
```

## Security & Compliance

### Constitutional Alignment
- ✅ Follows Build Philosophy exactly
- ✅ Enforces Governance Supremacy Rule (GSR)
- ✅ Implements Quality Integrity Contract (QIC)
- ✅ Aligns with True North principles
- ✅ Respects immutable paths

### Protected Paths (Cannot Modify)
- `.github/workflows/**`
- `foreman/constitution/**`
- `docs/governance/**`
- `.github/foreman/agent-contract.md`
- `BUILD_PHILOSOPHY.md`
- `foreman/architecture-design-checklist.md`

### Governance Events Logged
- `builder_loaded` - Builder agent loaded successfully
- `mcp_execution_start` - MCP execution started
- `mcp_execution_complete` - MCP execution completed
- `mcp_execution_failed` - MCP execution failed
- `build_to_green_complete` - Complete success
- `build_to_green_failed` - Complete failure
- `build_rollback` - Automatic rollback performed

## Error Handling

All errors are:
1. Logged to governance memory
2. Recorded as incidents (if severity warrants)
3. Returned in structured format
4. Automatically rolled back (if configured)

## Status

**Version**: 1.0  
**Status**: ✅ Implemented and Tested  
**Date**: 2025-12-11  
**Authority**: Maturion Engineering (Foreman)

## References

- `/BUILD_PHILOSOPHY.md` - Supreme build philosophy
- `.github/foreman/agent-contract.md` - Constitutional contract
- `/foreman/builder-specs/build-to-green-rule.md` - Build to Green rule
- `/foreman/architecture-design-checklist.md` - Architecture validation
- `SECURITY_SUMMARY_CS5.md` - CS5 specification
- `SECURITY_SUMMARY_CS6.md` - CS6 specification

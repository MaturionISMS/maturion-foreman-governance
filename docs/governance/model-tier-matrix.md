# Model Tier Matrix

## Quick Reference

This matrix provides a quick reference for model tier selection based on task type.

## Tier Overview

| Tier | Models | Cost Multiplier | Max Retries | Use Case |
|------|--------|-----------------|-------------|----------|
| **T1** | `gpt-4o-mini`, `claude-haiku` | 1x | 3 | Lightweight, simple tasks |
| **T2** | `gpt-4o`, `claude-sonnet-lite` | 5x | 3 | Standard complexity tasks |
| **T3** | `claude-3.5-sonnet` | 20x | 3 | Complex, high-reasoning tasks |

## Task Type Classification

### Tier 1 (T1) - Lightweight Tasks

| Task Type | Example | Complexity | Files Affected |
|-----------|---------|------------|----------------|
| **docs** | Update README, add JSDoc comments | Low | 1-2 |
| **simple-ui** | Change button text, update styles | Low | 1-3 |
| **config-update** | Update package.json, modify config | Low | 1-2 |

**Characteristics**:
- Minimal logic required
- No architectural decisions
- Straightforward implementation
- Low file change count
- No cross-module dependencies

### Tier 2 (T2) - Standard Tasks

| Task Type | Example | Complexity | Files Affected |
|-----------|---------|------------|----------------|
| **crud** | Add CRUD endpoint for projects | Medium | 3-5 |
| **api-endpoint** | Create /api/users GET endpoint | Medium | 2-4 |
| **component** | Build ProjectCard React component | Medium | 2-4 |
| **integration** | Integrate with GitHub API | Medium | 3-6 |

**Characteristics**:
- Business logic implementation
- State management
- API contracts
- Multiple file changes
- Standard design patterns
- Error handling required

### Tier 3 (T3) - Complex Tasks

| Task Type | Example | Complexity | Files Affected |
|-----------|---------|------------|----------------|
| **architecture** | Design multi-tier routing system | High | 10+ |
| **red-qa** | Create comprehensive test suite | High | 5-15 |
| **refactor** | Restructure governance memory | High | 10-20 |
| **multi-module** | Cross-module state management | High | 10+ |

**Characteristics**:
- Architectural reasoning required
- Complex cross-module dependencies
- High abstraction level
- Governance implications
- Quality assurance creation
- Large scope changes

## Escalation Matrix

### From T1 to T2

**Triggers**:
- 2+ repeated errors on simple task
- Invalid code generation detected
- Task proves more complex than expected

**Example**:
```
Task: "Update button styles"
Classification: T1 (simple-ui)
Attempt 1: gpt-4o-mini → Missing import
Attempt 2: gpt-4o-mini → Still missing import
Decision: Escalate to T2 (gpt-4o)
Attempt 3: gpt-4o → Success ✓
```

### From T2 to T3

**Triggers**:
- 2+ failures on standard task
- QIC validation failures
- Architecture impact detected
- Token overflow (large context)

**Example**:
```
Task: "Add CRUD endpoint with complex validation"
Classification: T2 (crud)
Attempt 1: gpt-4o → Partial implementation
Attempt 2: gpt-4o → QIC validation failed
Decision: Escalate to T3 (claude-3.5-sonnet)
Attempt 3: claude-3.5-sonnet → Success ✓
```

### From T3 - No Further Escalation

**When T3 Fails**:
- All 3 retry attempts exhausted
- Task marked as "requires human intervention"
- Escalate to Johan with diagnostic report

**Example**:
```
Task: "Complex multi-module refactoring"
Classification: T3 (multi-module)
Attempt 1: claude-3.5-sonnet → Build errors
Attempt 2: claude-3.5-sonnet → Type errors
Attempt 3: claude-3.5-sonnet → Still failing
Decision: Escalate to Johan (all tiers exhausted)
```

## De-escalation Matrix

### Success Patterns Enable De-escalation

| Current Tier | Success Streak | De-escalate To | Conditions |
|--------------|----------------|----------------|------------|
| T2 | 3 consecutive successes (1 attempt each) | T1 | Same task type, no struggle signals |
| T3 | 3 consecutive successes (1 attempt each) | T2 | Same task type, no struggle signals |

**Example**:
```
History:
- Task 1: CRUD (T2) → Success (1 attempt)
- Task 2: CRUD (T2) → Success (1 attempt)
- Task 3: CRUD (T2) → Success (1 attempt)
Decision: Next CRUD task starts at T1 (de-escalated)
```

## Cost Impact Matrix

### Estimated Cost Per Task

| Tier | Single Attempt | With 2 Retries | With 3 Retries | Escalated to Next |
|------|----------------|----------------|----------------|-------------------|
| **T1** | $0.01 | $0.03 | $0.04 | + $0.15 (T2) |
| **T2** | $0.05 | $0.15 | $0.20 | + $0.60 (T3) |
| **T3** | $0.20 | $0.60 | $0.80 | Manual escalation |

**Optimization Strategy**:
- Start at lowest viable tier
- Escalate only when necessary
- De-escalate after proven success
- Track cost per task type for optimization

## Struggle Signal Reference

### High Severity (Immediate Escalation)

| Signal | Description | Threshold | Action |
|--------|-------------|-----------|--------|
| **qic_failure** | Quality gate violation | 1 occurrence | Escalate immediately |
| **invalid_code_generation** | Syntax/type errors | 1 occurrence | Escalate immediately |
| **token_overflow** | Context limit exceeded | 1 occurrence | Escalate immediately |

### Medium Severity (Escalate After Threshold)

| Signal | Description | Threshold | Action |
|--------|-------------|-----------|--------|
| **repeated_errors** | Same error multiple times | 2 occurrences | Escalate after 2nd |
| **missing_imports** | Import statements not added | 2 occurrences | Escalate after 2nd |
| **ambiguity_detected** | Model asks for clarification | 2 occurrences | Escalate after 2nd |

### Low Severity (Monitor, Escalate If Persistent)

| Signal | Description | Threshold | Action |
|--------|-------------|-----------|--------|
| **partial_file_rewrites** | Incomplete modifications | 1 occurrence | Retry, then escalate |
| **directive_not_followed** | Instructions ignored | 2 occurrences | Escalate after 2nd |

## Decision Flow Diagram

```
                        ┌─────────────────────┐
                        │  Task Descriptor    │
                        │  Input              │
                        └──────────┬──────────┘
                                   │
                                   ▼
                        ┌─────────────────────┐
                        │  Classify Task      │
                        │  (T1/T2/T3)         │
                        └──────────┬──────────┘
                                   │
                    ┌──────────────┼──────────────┐
                    │              │              │
                    ▼              ▼              ▼
              ┌─────────┐    ┌─────────┐    ┌─────────┐
              │   T1    │    │   T2    │    │   T3    │
              │Lightweight│  │ Standard │    │ Complex │
              └────┬────┘    └────┬────┘    └────┬────┘
                   │              │              │
                   ▼              ▼              ▼
              ┌─────────┐    ┌─────────┐    ┌─────────┐
              │Select   │    │Select   │    │Select   │
              │Model    │    │Model    │    │Model    │
              └────┬────┘    └────┬────┘    └────┬────┘
                   │              │              │
                   ▼              ▼              ▼
              ┌─────────────────────────────────────┐
              │        Execute Task                 │
              │     (up to 3 attempts)              │
              └────┬────────────────────────────┬───┘
                   │                            │
              Success?                     Struggle?
                   │                            │
                   ▼                            ▼
              ┌─────────┐              ┌─────────────┐
              │Complete │              │  Escalate   │
              │  Task   │              │  to Next    │
              └─────────┘              │   Tier      │
                                       └──────┬──────┘
                                              │
                                              ▼
                                       ┌─────────────┐
                                       │   Retry     │
                                       │  at Higher  │
                                       │    Tier     │
                                       └─────────────┘
```

## Usage Examples

### Example 1: Documentation Update (T1)

**Task**: Update README with new installation instructions  
**Classification**: `docs` → **T1**  
**Model**: `gpt-4o-mini`  
**Expected**: 1 attempt, success  
**Cost**: $0.01

### Example 2: CRUD Endpoint (T2)

**Task**: Add GET /api/projects endpoint with validation  
**Classification**: `crud` → **T2**  
**Model**: `gpt-4o`  
**Expected**: 1-2 attempts, success  
**Cost**: $0.05-$0.10

### Example 3: Architecture Design (T3)

**Task**: Design model routing system architecture  
**Classification**: `architecture` → **T3**  
**Model**: `claude-3.5-sonnet`  
**Expected**: 1 attempt, success  
**Cost**: $0.20

### Example 4: Escalation Scenario

**Task**: Add complex validation logic to CRUD endpoint  
**Classification**: `crud` → **T2**  
**Model**: `gpt-4o`  
**Attempts**:
1. gpt-4o → Missing imports (struggle detected)
2. gpt-4o → Still failing (escalate to T3)
3. claude-3.5-sonnet → Success ✓  
**Cost**: $0.10 (T2) + $0.20 (T3) = $0.30

---

**Version**: 1.0  
**Last Updated**: 2025-12-11  
**Reference**: See `github-model-scaling-policy.md` for complete policy

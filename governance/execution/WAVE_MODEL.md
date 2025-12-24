# Wave Model

**Status**: Canonical  
**Authority**: Execution Canon  
**Source Basis**: Phase 1 Classification - Category B (Execution Canon)  
**Last Canonized**: 2025-12-24

---

## Purpose

This document defines the canonical wave model for Maturion execution—the mechanism by which complex work is organized into discrete, stable, cumulative units of progress.

---

## What Waves Are

**Waves** are discrete units of execution with:
- **Clear boundaries**: Start and end criteria are explicit
- **Defined dependencies**: What must exist before the wave starts
- **Measurable completion**: Objective criteria for "done"
- **Cumulative quality guarantees**: New work cannot break old work
- **Regression prevention**: All previous wave QA runs with new wave
- **Autonomous execution**: Waves proceed without interruption unless blocked

---

## Why Waves Exist

### The Alternative (No Waves)

Without waves:
- Work has no natural boundaries
- Dependencies are implicit and missed
- Quality is measured only at the end
- Regressions are discovered late
- Progress is hard to measure
- Execution becomes chaotic

### With Waves

- Work organized into stable plateaus
- Dependencies are explicit and respected
- Quality is verified incrementally
- Regressions caught immediately
- Progress is measurable at each wave
- Execution is deterministic

---

## Wave Principles

### 1. Waves Build on Waves

**Principle**: Each wave assumes all previous waves are complete and correct.

**Implication**:
- Wave 2 code can depend on Wave 1 code
- Wave 2 QA can assume Wave 1 QA passes
- Wave 2 does not re-verify Wave 1 correctness
- Wave 2 trusts Wave 1 foundation

**Enforcement**: Cumulative QA (see below) ensures this trust is warranted.

### 2. No Regression

**Principle**: Completing a wave cannot break previous waves.

**Implication**:
- New features cannot break old features
- New tests cannot fail old tests
- New code cannot violate old contracts
- System remains 100% GREEN through all waves

**Enforcement**: All previous wave QA runs when new wave completes. If ANY old test fails, the new wave is blocked.

### 3. Cumulative QA

**Principle**: All past wave QA must pass when new wave completes.

**Process**:
```
Wave 1 completes → 100% GREEN (10 tests)
Wave 2 completes → Run Wave 1 QA (10 tests) + Wave 2 QA (15 tests) = 25 tests, must be 100% GREEN
Wave 3 completes → Run Wave 1 QA + Wave 2 QA + Wave 3 QA = 40 tests total, must be 100% GREEN
```

**Guarantee**: If cumulative QA passes, no regression has occurred.

### 4. Dependency Respect

**Principle**: Wave N cannot start until Wave N-1 dependencies are met.

**Dependencies**:
- **Sequential Dependency**: Wave 2 cannot start until Wave 1 is complete
- **Component Dependency**: Feature B cannot start until Feature A (in earlier wave) is complete
- **Infrastructure Dependency**: Application waves cannot start until foundation waves are complete

**Enforcement**: Dependency analysis blocks wave start if dependencies unsatisfied.

### 5. Autonomous Execution

**Principle**: Waves execute without interruption unless governance blocks.

**Implication**:
- No pauses between wave phases
- No approval requests mid-wave
- OPOJD applies to entire wave
- Completion or escalation only

**Exceptions**:
- CS2 trigger (protected file approval)
- CS1-CS6 violation
- Unrecoverable failure

---

## Wave Structure

### Wave Anatomy

Each wave contains:
- **Wave Number**: Sequential identifier (0, 1, 2, ...)
- **Wave Name**: Descriptive name (e.g., "Builder Constitutional Systems")
- **Wave Purpose**: What this wave achieves
- **Issues in Wave**: List of issues/features to complete
- **Dependencies**: What must exist before this wave starts
- **Completion Criteria**: Objective definition of "done"

### Wave 0: Special Status

**Wave 0 = Constitutional Foundation**

- **Purpose**: Establish governance systems before execution waves
- **Content**: Builder constitutional systems, governance infrastructure
- **Special Rule**: Wave 0 MUST complete before any execution waves (1, 2, 3, ...) begin

**Rationale**: Cannot execute at scale without constitutional foundation. Building before constitutional systems exist = building on sand.

### Execution Waves (1, 2, 3, ...)

- **Purpose**: Deliver system capabilities incrementally
- **Content**: Features, modules, capabilities
- **Rule**: Must follow Wave 0 completion

---

## Wave Lifecycle

### Phase 1: Wave Planning

**Input**: Backlog with issues categorized by wave  
**Process**: Analyze dependencies, validate wave boundaries, confirm prerequisites  
**Output**: Wave execution plan

### Phase 2: Wave Execution

**Process** (per issue in wave):
```
ISSUE SELECTED → ARCHITECTURE → RED QA → BUILD TO GREEN → VALIDATION → MERGE → COMPLETE
```

All issues in wave follow OPOJD lifecycle.

### Phase 3: Wave Validation

**Process**:
1. Run ALL wave issue QA → Must be 100% GREEN
2. Run ALL previous wave QA → Must be 100% GREEN (cumulative QA)
3. Verify zero test debt
4. Verify all governance gates passed
5. Verify evidence trail complete

**Outcome**: Wave is 100% GREEN + no regression, OR wave is blocked.

### Phase 4: Wave Completion

**Criteria**:
- All issues in wave merged
- Cumulative QA 100% GREEN
- Zero test debt
- Evidence complete
- Governance gates passed

**Action**: Mark wave complete, proceed to next wave (if dependencies met).

---

## Regression Prevention Mechanism

### How Regression Is Caught

**Immediate Detection**:
```
Developer completes Wave 3 feature
   ↓
Run Wave 3 QA → Passes ✓
   ↓
Run Wave 1 QA → Passes ✓
   ↓
Run Wave 2 QA → 1 test fails ❌
   ↓
REGRESSION DETECTED → Wave 3 BLOCKED
```

**Root Cause**: Wave 3 change broke Wave 2 functionality.  
**Action**: Fix Wave 3 change, re-run cumulative QA, verify no regression.

### Why This Works

- **Fast Feedback**: Regression caught immediately, not later
- **Clear Cause**: Regression caused by current wave, not mystery from past
- **Forced Fix**: Cannot proceed until regression resolved
- **Quality Guarantee**: System is always 100% GREEN

---

## Wave Completion Criteria

A wave is complete when:

1. **All Issues Merged**: Every issue in the wave is 100% GREEN and merged
2. **Cumulative QA Passes**: All past wave QA + this wave QA = 100% GREEN
3. **Zero Test Debt**: No failing, skipped, incomplete tests or test infrastructure
4. **Governance Compliance**: All gates passed, all rules followed
5. **Evidence Complete**: Audit trail for all work in wave

**NOT complete when**:
- 99% of issues done (must be 100%)
- Cumulative QA has 1 failure (must be 0 failures)
- "Minor" test debt exists (must be zero test debt)
- Evidence incomplete (must be complete)

---

## Wave Progression Rules

### Sequential Execution

**Rule**: Waves execute in order (0 → 1 → 2 → 3 → ...).

**Rationale**: Later waves depend on earlier waves. Skipping = broken dependencies.

### No Skipping

**Rule**: Cannot skip waves.

**Example**: Cannot do Wave 3 before Wave 1.  
**Why**: Wave 3 may depend on Wave 1 infrastructure.

### Dependency Blocking

**Rule**: Missing dependency blocks wave start.

**Process**:
1. Analyze wave dependencies
2. Check if all dependencies met
3. If any dependency missing → BLOCK wave start
4. If all dependencies met → START wave

### Parallel Work Within Wave

**Allowed**: Multiple issues within same wave can be worked in parallel if no inter-issue dependencies.

**Example**: Wave 2 has Issues A, B, C with no dependencies → All three can be built simultaneously.

**Requirement**: All must complete (and pass cumulative QA) before wave is complete.

---

## Quality Guarantees

### Per-Wave Guarantees

At wave completion:
- All wave issues are 100% GREEN
- Zero test debt within wave
- All governance gates passed
- Evidence trail complete

### Cumulative Guarantees

At wave completion:
- All previous wave QA still passes
- No regression from previous waves
- System is 100% GREEN (all waves combined)
- Quality has compounded, not eroded

### Long-Term Guarantee

After N waves:
- System has N stable plateaus
- Each plateau is 100% GREEN
- Regressions have been prevented at each wave
- System quality is highest at latest wave

---

## Wave Model Benefits

### 1. Clear Progress Measurement

**Without Waves**: "We're 60% done" (subjective)  
**With Waves**: "Wave 2 of 5 complete" (objective)

### 2. Regression Prevention

**Without Waves**: Regressions discovered late, hard to trace  
**With Waves**: Regressions caught immediately at wave boundary

### 3. Stable Plateaus

**Without Waves**: System quality unknown at any point  
**With Waves**: System 100% functional at each completed wave

### 4. Dependency Management

**Without Waves**: Dependencies implicit, often missed  
**With Waves**: Dependencies explicit, analyzed, enforced

### 5. Risk Reduction

**Without Waves**: Big-bang integration at end  
**With Waves**: Incremental integration, issues caught early

---

## Wave Model Anti-Patterns

### ❌ Starting Wave 2 Before Wave 1 Complete

**Problem**: Wave 2 may depend on Wave 1 infrastructure that doesn't exist yet.  
**Result**: Wave 2 work is built on incomplete foundation, likely fails.

### ❌ Skipping Cumulative QA

**Problem**: Regression not detected.  
**Result**: Old functionality broken, discovered late, hard to fix.

### ❌ Accepting Partial Wave Completion

**Problem**: "9 of 10 issues done, close enough."  
**Result**: Wave not actually complete, dependencies for next wave not met.

### ❌ Ignoring Wave Dependencies

**Problem**: "We'll just do the features in random order."  
**Result**: Dependency violations, rework, chaos.

---

## Lessons Encoded

This wave model embodies:
- **Backlog Analysis Lesson**: Natural wave structure emerges from dependency analysis
- **Regression Prevention Lesson**: Cumulative QA catches breaks immediately
- **Constitutional Foundation Lesson**: Wave 0 must precede execution waves
- **Autonomous Execution Lesson**: Waves proceed without pause unless blocked
- **Quality Compounding Lesson**: Each wave strengthens total system quality

---

**Source Documents**:
- `evidence_app_execution_archive/build-history/CANONICAL_BACKLOG_SEQUENCE.md`
- `architecture/runtime/waves/WAVE_EXECUTION_OVERVIEW.md`
- `architecture/waves/WAVE_BOOK_3_20.md`
- `maturion/philosophy/maturion-governance-constitution.md`
- `BUILD_PHILOSOPHY.md`

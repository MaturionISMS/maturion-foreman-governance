# Foreman Builders Directory

## Overview

This directory contains the complete builder ecosystem specification for the Maturion platform.

**Purpose**: Enable compliant builder operation (human or automated) following the Build Philosophy and Governance Supremacy Rule.

---

## Quick Start

### For Human Operators

If you are acting as a builder (executing "Build to Green" manually):

1. **Start here**: [`HUMAN_OPERATOR_GUIDE.md`](./HUMAN_OPERATOR_GUIDE.md)
2. **Reference**: [`REPOSITORY_STRUCTURE.md`](./REPOSITORY_STRUCTURE.md)
3. **Contract**: [`.github/agents/builder-agent.md`](../../.github/agents/builder-agent.md)

### For Automated Builders

If you are implementing an automated builder:

1. **Start here**: [`.github/agents/builder-agent.md`](../../.github/agents/builder-agent.md)
2. **Registry**: [`MANIFEST.md`](./MANIFEST.md)
3. **Structure**: [`REPOSITORY_STRUCTURE.md`](./REPOSITORY_STRUCTURE.md)

### For Foreman/Orchestrator

If you are assigning build tasks:

1. **Start here**: [`MANIFEST.md`](./MANIFEST.md)
2. **Contract**: [`.github/agents/builder-agent.md`](../../.github/agents/builder-agent.md)
3. **Summary**: [`WAVE_0_SUMMARY.md`](./WAVE_0_SUMMARY.md)

---

## Directory Contents

### Core Documents

| File | Purpose | Audience |
|------|---------|----------|
| **`README.md`** | This file - entry point | Everyone |
| **`WAVE_0_SUMMARY.md`** | Executive summary of Wave 0 deliverable | Johan, Stakeholders |
| **`MANIFEST.md`** | Builder registry and discovery | Foreman, Builders |
| **`REPOSITORY_STRUCTURE.md`** | Navigation guide for repository | Builders |
| **`HUMAN_OPERATOR_GUIDE.md`** | Step-by-step manual build procedure | Human Operators |

### Related Files

| File | Purpose |
|------|---------|
| `.github/agents/builder-agent.md` | Canonical builder agent contract |
| `foreman/evidence/templates/` | Evidence document templates |
| `BUILD_PHILOSOPHY.md` | Supreme authority for building |
| `foreman/governance/` | Governance rules and enforcement |

---

## The Builder Contract

### Core Principle

**Builders ONLY accept "Build to Green" instructions.**

```
BUILD TO GREEN

Architecture Reference: <path>
QA Suite Location: <path>
QA Current Status: RED (X tests failing)
Acceptance Criteria: <criteria>
```

**Any other format → REJECTED**

### The Process

```
1. Receive "Build to Green" instruction from Foreman
   ↓
2. Validate instruction (4 checks)
   ↓
3. If valid → Execute build iterations
   If invalid → Reject with specific error
   ↓
4. Make tests pass one by one
   ↓
5. Validate 100% green (6 checks)
   ↓
6. Create complete evidence trail
   ↓
7. Report completion to Foreman
```

### The Guarantees

✅ **100% QA passing** - No partial passes  
✅ **Zero test debt** - No "will fix later"  
✅ **Architecture conformance** - Follow exactly  
✅ **Protected files** - Never modified  
✅ **Complete evidence** - Every build documented  
✅ **Governance compliance** - All rules enforced

---

## Pre-Build Validation (4 Checks)

Before accepting any task, builders validate:

1. ✅ **Instruction format** - Must be "Build to Green"
2. ✅ **Architecture exists** - Document accessible and complete
3. ✅ **QA suite exists** - Tests accessible and RED
4. ✅ **Acceptance criteria defined** - Clear completion criteria

**If ANY fails → Task REJECTED → Foreman must fix**

---

## Final Validation (6 Checks)

Before reporting "QA is Green", builders validate:

1. ✅ **QA Completeness** - 100% passing, zero failures, zero debt
2. ✅ **Build Quality** - TypeScript, lint, build all pass
3. ✅ **Interface Integrity** - QIC-7 compliance
4. ✅ **Zero Test Debt** - No skips, stubs, or incomplete tests
5. ✅ **Protected Paths** - No constitutional files modified
6. ✅ **Evidence Trail** - Complete documentation

**If ANY fails → Continue iteration, do NOT report green**

---

## Protected Paths (NEVER MODIFY)

Builders MUST NEVER touch these paths:

```
.github/workflows/
.github/foreman/agent-contract.md
.github/agents/foreman.agent.md
BUILD_PHILOSOPHY.md
foreman/constitution/
foreman/architecture-design-checklist.md
foreman/builder-specs/build-to-green-rule.md
foreman/governance/
docs/governance/
maturion/philosophy-tree.md
```

**Modification attempt → HALT + ESCALATE + CS2 approval required**

---

## Evidence Requirements

Every build generates:

```
foreman/evidence/builds/<task-id>/
├── build-initiation.json       # Task start evidence
├── validation-results.json     # Pre-build validation
├── iterations/
│   ├── iteration-001.json      # Each iteration documented
│   └── ...
├── final-validation.json       # Final checks
├── qa-results.json             # Complete QA results
└── completion-report.md        # Human-readable report
```

**Templates available**: `foreman/evidence/templates/`

---

## Builder Types

### 1. Internal Foreman Builder
- **Repository**: `maturion-foreman-app` only
- **Status**: ⚠️ Defined but not yet operational
- **Agent**: `.github/agents/builder.agent.md`

### 2. Maturion Builder (Production)
- **Repository**: External production repos
- **Status**: ⚠️ Defined but not yet operational
- **Agent**: `.github/agents/maturion-builder.agent.md`

### 3. Human Builder
- **Repository**: Any (with authorization)
- **Status**: ✅ Operational NOW
- **Guide**: `HUMAN_OPERATOR_GUIDE.md`

---

## Governance Enforcement

### Governance Supremacy Rule (GSR)

- **100% QA passing is ABSOLUTE** - 99% = FAILURE
- **Zero test debt is MANDATORY** - No deferrals
- **Architecture conformance is REQUIRED** - No deviations
- **Constitutional protection is ENFORCED** - Protected paths immutable

### Zero Test Debt Rule

```
TEST DEBT DETECTED → STOP → FIX → RE-RUN → VERIFY → CONTINUE
```

**Forms of test debt:**
- Failing tests
- Skipped tests (.skip(), .todo())
- Incomplete tests (stubs, no assertions)
- Incomplete test infrastructure
- Hidden test debt

**No exceptions. No deferrals.**

### Quality Integrity Contract (QIC)

- Build integrity
- Lint integrity
- Runtime integrity
- Type integrity
- Test integrity

---

## How to Use

### As Human Operator

1. Wait for Foreman to issue "Build to Green" instruction
2. Open `HUMAN_OPERATOR_GUIDE.md`
3. Follow 11-step procedure exactly
4. Create evidence as you go
5. Report completion to Foreman

### As Automated Builder

1. Implement canonical builder contract (`.github/agents/builder-agent.md`)
2. Register in `MANIFEST.md`
3. Pass compliance validation
4. Receive approval from Foreman
5. Execute "Build to Green" instructions

### As Foreman

1. Design architecture
2. Create Red QA
3. Issue "Build to Green" instruction
4. Builder validates and executes
5. Builder reports completion
6. You validate evidence
7. Approve merge

---

## Getting Started

### For First-Time Users

1. **Read**: `WAVE_0_SUMMARY.md` - Understand what was created
2. **Study**: `.github/agents/builder-agent.md` - Learn the contract
3. **Review**: `HUMAN_OPERATOR_GUIDE.md` - See the process
4. **Reference**: `REPOSITORY_STRUCTURE.md` - Navigate the repo

### For Testing

1. Select a simple build task
2. Have Foreman create architecture + Red QA
3. Follow human operator guide
4. Create all evidence
5. Validate process works
6. Refine as needed

---

## Support

### Documentation

- **Canonical Contract**: `.github/agents/builder-agent.md`
- **Build Philosophy**: `BUILD_PHILOSOPHY.md`
- **Repository Structure**: `REPOSITORY_STRUCTURE.md`
- **Human Guide**: `HUMAN_OPERATOR_GUIDE.md`
- **Troubleshooting**: See Section XI in Human Operator Guide

### Common Questions

**Q: What if I don't understand the architecture?**  
A: STOP. Escalate to Foreman. Do NOT guess.

**Q: What if tests seem wrong?**  
A: STOP. Escalate to Foreman. Do NOT modify tests.

**Q: What if I need to modify a protected file?**  
A: STOP. Return GovernanceViolation. CS2 approval required.

**Q: What if 3+ iterations with no progress?**  
A: STOP. Create escalation report. Notify Foreman.

---

## Version Information

**Version**: 1.0.0  
**Status**: Active and Operational  
**Last Updated**: 2025-12-15  
**Wave**: Wave 0 Complete

**Changelog**:
- 1.0.0 (2025-12-15): Initial builder ecosystem release

---

## Quick Links

- [Canonical Builder Contract](../../.github/agents/builder-agent.md)
- [Human Operator Guide](./HUMAN_OPERATOR_GUIDE.md)
- [Builder Manifest](./MANIFEST.md)
- [Repository Structure](./REPOSITORY_STRUCTURE.md)
- [Wave 0 Summary](./WAVE_0_SUMMARY.md)
- [Build Philosophy](../../BUILD_PHILOSOPHY.md)
- [Evidence Templates](../evidence/templates/)

---

**The builder ecosystem is ready for operation.** ✅

**Next step**: Test with a simple build task using the Human Operator Guide.

---

*This directory is maintained by Foreman and governed by the Build Philosophy.*

# Agent.md Alignment Sweep - 2025-12-16

## Authority
**Issue**: C2 — agent.md Alignment Sweep (Authoritative)  
**Repository**: maturion-foreman-governance  
**Date**: 2025-12-16  
**Status**: In Progress

---

## Objective

Perform a **mandatory alignment sweep** of all `agent.md` files to eliminate authority drift and semantic ambiguity, establishing a **single behavioral contract** for all agents.

---

## Files in Scope

1. `.github/agents/foreman.agent.md` - Foreman orchestration agent
2. `.github/agents/builder-agent.md` - Canonical builder contract (universal)
3. `.github/agents/builder.agent.md` - Internal Foreman repo builder
4. `.github/agents/maturion-builder.agent.md` - Maturion ecosystem builder
5. `.github/foreman/agent-contract.md` - Foreman constitutional contract

---

## Alignment Dimensions Analysis

### 1. Authority Boundaries

**Current State:**
- ✅ Foreman clearly defined as supreme orchestrator
- ✅ Builders clearly subordinate to Foreman
- ✅ Clear hierarchy: Owner (Johan) → Foreman → Builders
- ⚠️ **DRIFT DETECTED**: Johan's Override Authority inconsistently documented

**Issue Details:**
- `builder-agent.md`: Contains detailed Johan Override Authority clause
- `builder.agent.md`: Contains detailed Johan Override Authority clause
- `maturion-builder.agent.md`: Contains detailed Johan Override Authority clause
- `foreman.agent.md`: **MISSING** Johan Override Authority clause
- `agent-contract.md`: **MISSING** Johan Override Authority clause

**Impact**: Authority ambiguity when Foreman needs temporary override permissions

**Recommendation**: Add Johan's Override Authority clause to foreman.agent.md and agent-contract.md for consistency

---

### 2. Build-to-Green Definition

**Current State:**
- ✅ All builder agents require: Architecture + Red QA + "Build to Green" instruction
- ✅ All reject other instruction formats (e.g., "Build feature X")
- ✅ Pre-build validation requirements consistent
- ✅ Final validation requirements consistent

**Alignment Status**: ✅ **ALIGNED** - No changes needed

---

### 3. QA Obligations

**Current State:**
- ✅ All agents enforce 100% passing (no partial passes)
- ✅ Zero test debt mentioned consistently
- ✅ No 301/303 = TOTAL FAILURE language consistent
- ⚠️ **DRIFT DETECTED**: Varying detail levels on zero test debt enforcement

**Issue Details:**
- `foreman.agent.md`: References Zero Test Debt Constitutional Rule
- `builder-agent.md`: Detailed zero test debt enforcement procedure (Section XIII)
- `builder.agent.md`: References Zero Test Debt but less detail
- `maturion-builder.agent.md`: Minimal zero test debt mention

**Impact**: Builders may have inconsistent understanding of test debt detection and resolution

**Recommendation**: Ensure all builder agents reference the Zero Test Debt Constitutional Rule with consistent enforcement expectations

---

### 4. Governance Supremacy

**Current State:**
- ✅ GSR (Governance Supremacy Rule) mentioned in all agents
- ✅ QIC (Quality Integrity Contract) enforcement present
- ✅ Constitutional safeguards (CS1-CS6) referenced
- ⚠️ **DRIFT DETECTED**: Phase 3 compliance requirements inconsistently documented

**Issue Details:**
- `builder.agent.md`: Contains comprehensive Phase 3 Compliance Requirements (Checkpointing, Telemetry, Fallback)
- Other agents: **MISSING** Phase 3 compliance requirements

**Impact**: Only internal builder implements Phase 3 autonomy features; other builders may not be Phase 3 ready

**Recommendation**: 
- Evaluate if Phase 3 requirements should apply to all builders or only internal builder
- If universal: Propagate Phase 3 requirements to builder-agent.md and maturion-builder.agent.md
- If internal-only: Clearly document why Phase 3 is builder.agent.md-specific

---

### 5. Evidence Production

**Current State:**
- ✅ All agents require evidence trail
- ⚠️ **DRIFT DETECTED**: Evidence storage locations vary

**Issue Details:**
- `builder-agent.md`: Evidence stored in `foreman/evidence/builds/<task-id>/`
- `builder.agent.md`: Evidence stored in `runtime/evidence/`
- `maturion-builder.agent.md`: Evidence location not explicitly specified

**Impact**: Evidence scattered across different locations; harder to audit

**Recommendation**: Standardize evidence storage locations across all agents or clearly document repository-specific paths

---

### 6. Prohibited Behaviors

**Current State:**
- ✅ All agents prohibit bypassing governance
- ✅ All agents prohibit modifying protected paths (constitutional files, workflows)
- ✅ Clear escalation procedures
- ⚠️ **DRIFT DETECTED**: OPOJD (One-Prompt One-Job Doctrine) detail varies

**Issue Details:**
- `foreman.agent.md`: Comprehensive OPOJD section (Lines 481-603)
- `builder-agent.md`: OPOJD section (Section XIII)
- `builder.agent.md`: Comprehensive OPOJD section including Phase 3 enhanced version
- `maturion-builder.agent.md`: **MISSING** OPOJD section

**Impact**: Maturion Builder may not follow continuous execution mandate

**Recommendation**: Add OPOJD section to maturion-builder.agent.md for consistency

---

### 7. Technology Evolution Doctrine (TED)

**Current State:**
- `foreman.agent.md`: Comprehensive TED section (Lines 73-116)
- `builder.agent.md`: TED Integration section (Lines 60-110)
- Other agents: **MISSING** TED

**Issue Details:**
- TED governs technology modernization decisions
- Only Foreman and Internal Builder aware of TED constraints

**Impact**: Other builders may not understand modernization governance

**Recommendation**: 
- If TED applies to all builders: Add TED awareness to builder-agent.md and maturion-builder.agent.md
- If TED is Foreman-orchestrated only: Document that builders receive TED-compliant architecture from Foreman

---

### 8. UI Feedback & Architecture-First Correction Loop

**Current State:**
- `foreman.agent.md`: Detailed UI Feedback Loop section (Lines 205-297)
- `builder.agent.md`: Brief mention in UI-Related Tasks section (Lines 179-220)
- Other agents: **NOT MENTIONED**

**Issue Details:**
- UI feedback loop is Foreman's responsibility
- Builders should know they receive architecture-first instructions, not UI patches

**Impact**: Minor - builders already know to follow architecture

**Recommendation**: No change needed; UI feedback loop is Foreman's domain

---

## Summary of Identified Drifts

| Issue | Severity | Files Affected | Recommendation |
|-------|----------|----------------|----------------|
| Johan's Override Authority missing | **HIGH** | foreman.agent.md, agent-contract.md | Add Johan Override Authority clause |
| Phase 3 Compliance Requirements | **MEDIUM** | builder-agent.md, maturion-builder.agent.md | Clarify scope: universal or internal-only |
| OPOJD missing | **MEDIUM** | maturion-builder.agent.md | Add OPOJD section |
| Evidence path inconsistency | **LOW** | All builder agents | Standardize or document paths |
| TED awareness | **LOW** | builder-agent.md, maturion-builder.agent.md | Add TED awareness or clarify Foreman-only |
| Zero Test Debt detail variance | **LOW** | builder.agent.md, maturion-builder.agent.md | Reference constitutional rule consistently |

---

## Proposed Changes

### Change 1: Add Johan's Override Authority to Foreman

**File**: `.github/agents/foreman.agent.md`

**Location**: After "Constitutional Foundation" section (around line 72)

**Content**: Add Johan's Override Authority clause matching builder agents

**Rationale**: Foreman must have documented override authority for governance environment improvements

---

### Change 2: Add Johan's Override Authority to Agent Contract

**File**: `.github/foreman/agent-contract.md`

**Location**: After "Operational Authority and Autonomy" section (around line 159)

**Content**: Add Johan's Override Authority clause

**Rationale**: Constitutional contract should document Owner's supreme authority

---

### Change 3: Clarify Phase 3 Scope

**File**: `docs/governance/agent-md-alignment-sweep-2025-12-16.md` (this document)

**Decision Required**: Determine if Phase 3 requirements are:
- **Option A**: Universal (all builders must implement)
- **Option B**: Internal builder only (others may implement optionally)

**Action**: Document decision and update agents accordingly

---

### Change 4: Add OPOJD to Maturion Builder

**File**: `.github/agents/maturion-builder.agent.md`

**Location**: After "Drift Protection" section (around line 134)

**Content**: Add OPOJD section explaining continuous execution mandate

**Rationale**: All builders should follow OPOJD for consistent behavior

---

### Change 5: Standardize Evidence Paths

**Files**: All builder agent files

**Action**: Document that:
- Evidence paths are repository-specific
- Each repo may define its own evidence location
- Standard structure: `<evidence-root>/builds/<task-id>/`

**Rationale**: Allows flexibility while maintaining consistency

---

### Change 6: Add TED Awareness to Builders

**Files**: `builder-agent.md`, `maturion-builder.agent.md`

**Content**: Brief TED awareness section stating:
- TED governs technology modernization
- Foreman provides TED-compliant architecture
- Builders implement to TED-approved specifications

**Rationale**: Builders should be aware of TED even if Foreman orchestrates

---

## Validation Checklist

After changes, verify:

- [ ] No contradictory authority statements remain
- [ ] All agents share the same mental model of Build Philosophy
- [ ] Governance authority is always external to the agent (Foreman for builders)
- [ ] All agents reference the same constitutional documents
- [ ] All agents enforce 100% green + zero test debt
- [ ] All agents follow "Build to Green" protocol
- [ ] All agents have clear escalation paths
- [ ] All agents protect constitutional files
- [ ] All agents follow OPOJD (continuous execution)
- [ ] All agents produce evidence trails

---

## Next Steps

1. ✅ Complete this alignment analysis document
2. [ ] Implement Change 1: Add Johan's Override to foreman.agent.md
3. [ ] Implement Change 2: Add Johan's Override to agent-contract.md
4. [ ] Implement Change 4: Add OPOJD to maturion-builder.agent.md
5. [ ] Document Change 5: Evidence path flexibility
6. [ ] Implement Change 6: Add TED awareness to universal builders
7. [ ] Validate all changes against checklist
8. [ ] Create alignment summary document
9. [ ] Commit and report progress

---

## Conclusion

This alignment sweep identified **6 categories of drift** across the agent.md files. The most critical issue is the **inconsistent documentation of Johan's Override Authority**, which affects governance flexibility.

All identified issues are addressable through targeted updates that strengthen consistency without changing core behaviors.

**Estimated Changes**: 6 files, ~200 lines added/modified total

**Risk**: Low - Changes are additive and clarifying, not behavioral modifications

**Outcome**: Single, unified behavioral contract for all agents in the Maturion ecosystem

---

**Document Status**: Analysis Complete  
**Next Phase**: Implementation  
**Author**: GitHub Copilot (Agent Alignment Specialist)  
**Review Required**: Johan (Owner)

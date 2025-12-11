# Autonomous Mode Phase Documentation

This directory contains the comprehensive documentation for Foreman's Autonomous Mode implementation.

## Overview

Foreman's Autonomous Mode enables fully autonomous build execution, PR merging, and multi-issue wave orchestration—all under strict constitutional governance.

## Phase Documentation

The autonomous mode is implemented in 5 phases:

### [📘 PHASE_01.md](./PHASE_01.md) — Autonomous Mode Pilot (Completed)
**Status:** ✅ Completed  
**Wave:** 1  
**Constitutional Layer:** Activation Gate

**Purpose:** Baseline pilot implementation establishing autonomous decision-making in simulation mode with full constitutional system integration.

**Key Achievements:**
- Safe read-only autonomous decisions
- Complete logging system
- Constitutional system validation
- Builder network discovery

---

### [📘 PHASE_02.md](./PHASE_02.md) — Builder Execution Engine
**Status:** ✅ Implemented  
**Wave:** 1  
**Constitutional Layer:** Execution Governance Engine

**Purpose:** Enable real code building with GitHub Copilot Builder and Local Builder under full governance.

**Key Features:**
- Builder task dispatcher
- Build-to-green loop (Architecture → Red QA → Build to Green)
- Mutation prevention rules
- QIC/QIEL enforcement
- Automatic rollback

**Implementation:** `lib/foreman/execution/builder-executor.ts`

---

### [📘 PHASE_03.md](./PHASE_03.md) — PR Auto-Merge Engine
**Status:** ✅ Implemented  
**Wave:** 1  
**Constitutional Layer:** PR Governance Enforcement Kernel

**Purpose:** Autonomous PR merging when all quality and governance gates pass.

**Key Features:**
- PR creation and mutation
- Multi-gate validation (QIC, QIEL, Guardrails, Drift)
- Merge failure handling → CS3 incidents
- Complete audit trail

**Implementation:** `lib/foreman/pr/auto-merge.ts`

---

### [📘 PHASE_04.md](./PHASE_04.md) — Autonomy Dashboard UI
**Status:** ✅ Implemented  
**Wave:** 1  
**Constitutional Layer:** Human Visibility & Verification Layer

**Purpose:** Single-screen live interface for monitoring autonomous operations.

**Key Panels:**
- Execution Status (running tasks, builder routing, failures)
- Governance Status (guardrails, QIC/QIEL, drift alerts)
- Pilot Log Viewer (complete audit trail)
- Wave Execution Panel (multi-issue progress)

**Implementation:** `app/foreman/autonomy-dashboard/`

---

### [📘 PHASE_05.md](./PHASE_05.md) — Multi-Issue Wave Orchestrator
**Status:** ✅ Implemented  
**Wave:** 2  
**Constitutional Layer:** Autonomous Wave Engine

**Purpose:** Execute multiple issues autonomously in safe, controlled waves.

**Key Features:**
- Issue selection and prioritization
- Builder recommendation system
- Task sequencing with dependency management
- Pause/resume/abort controls
- Wave metrics and summaries

**Implementation:** `lib/foreman/execution/wave-orchestrator.ts`

---

## Phase Dependencies

```
PHASE_01 (Pilot)
    ↓
PHASE_02 (Builder Execution)
    ↓
PHASE_03 (PR Auto-Merge)
    ↓
PHASE_04 (Dashboard) ←→ PHASE_05 (Wave Orchestrator)
```

**Critical Path:**
1. PHASE_01 establishes the foundation
2. PHASE_02 enables building
3. PHASE_03 enables merging
4. PHASE_04 provides visibility
5. PHASE_05 scales to multiple issues

**Interdependencies:**
- PHASE_04 and PHASE_05 integrate bidirectionally
- All phases depend on PHASE_01
- PHASE_05 requires PHASE_02 and PHASE_03

---

## Constitutional System Integration

All phases integrate with the constitutional systems:

- **CS1** - Immutable Guardrail Engine (mutation prevention)
- **CS2** - Architecture Change Approval (design validation)
- **CS3** - Incident Feedback Loop (failure handling)
- **CS4** - Governance Alert System (real-time notifications)
- **CS5** - Execution Gatekeeper (build authorization)
- **CS6** - Builder Network Protection (builder validation)
- **CS7** - Autonomy Pilot Log (complete audit trail)

---

## Build Philosophy Compliance

All phases follow the **Build Philosophy v1.0**:

**Architecture → Red QA → Build to Green**

1. **Architecture Design** - Complete, validated architecture first
2. **Red QA Creation** - Comprehensive tests that fail (proving architecture, no implementation)
3. **Build to Green** - Only instruction format: "Build to Green" with architecture + Red QA
4. **Validation** - QIC + QIEL must be 100% green
5. **Merge** - Autonomous merge only if all gates pass

---

## Acceptance Criteria Summary

### Phase 1 (Pilot) - ✅ Complete
- Pilot runs without mutation
- Logging functional
- All constitutional systems invoked

### Phase 2 (Builder) - ✅ Complete
- Real builds execute successfully
- QIC/QIEL enforced
- Rollback logic works
- No governance violations

### Phase 3 (PR Merge) - ✅ Complete
- Autonomous PR merging functional
- Governance blocks unsafe merges
- Drift detection integrated
- Failed merges create incidents

### Phase 4 (Dashboard) - ✅ Complete
- Dashboard loads without errors
- Real-time updates (< 2 second refresh)
- All panels functional
- Links to logs work

### Phase 5 (Waves) - ✅ Complete
- 2-3 issues execute in parallel
- Wave logs generated
- Dashboard displays progress
- Governance prevents unsafe waves

---

## Usage Guide

### For Developers

1. **Read PHASE_01** to understand the foundation
2. **Read PHASE_02** to understand build execution
3. **Refer to PHASE_03** for PR merging rules
4. **Use PHASE_04** to monitor operations
5. **Study PHASE_05** for wave orchestration

### For Operators

1. **Monitor AUTONOMY_PILOT_LOG.md** for audit trail
2. **Use Dashboard** at `/foreman/autonomy-dashboard`
3. **Review Wave Summaries** in `/docs/autonomy/waves/`
4. **Check Incidents** when builds fail
5. **Follow Escalation Procedures** for critical issues

---

## Related Documentation

- [Autonomous Mode Pilot Guide](../AUTONOMOUS_MODE_PILOT_GUIDE.md)
- [Autonomous Mode Phase 2 Guide](../AUTONOMOUS_MODE_PHASE_2_GUIDE.md)
- [Build Philosophy](../../BUILD_PHILOSOPHY.md)
- [Agent Contract](../../.github/foreman/agent-contract.md)
- [Architecture Design Checklist](../../foreman/architecture-design-checklist.md)

---

## Logs and Monitoring

### Primary Log
- **Location:** `docs/autonomy/AUTONOMY_PILOT_LOG.md`
- **Format:** Append-only audit trail
- **Contents:** All autonomous actions with timestamps, decisions, outcomes

### Wave Summaries
- **Location:** `docs/autonomy/waves/WAVE_[N]_SUMMARY.md`
- **Format:** Per-wave execution report
- **Contents:** Issues executed, metrics, governance events, lessons learned

### Dashboard
- **URL:** `/foreman/autonomy-dashboard`
- **Refresh:** Real-time (< 2 seconds)
- **Features:** Live status, governance monitoring, log viewer, wave tracking

---

## Governance and Security

### Immutable Paths (Cannot Be Modified)
- `.github/workflows/`
- `.github/foreman/agent-contract.md`
- `BUILD_PHILOSOPHY.md`
- `foreman/constitution/`
- `foreman/governance/`

### Safe Paths (Can Be Modified)
- `app/`
- `components/`
- `lib/`
- `docs/`
- `tests/`

### Quality Gates
- **QIC** - Lint, TypeScript, Build must pass
- **QIEL** - Governance validation must pass
- **Guardrails** - CS1 baseline hashes intact
- **Drift** - No architectural drift detected

---

## Support and Escalation

### When to Escalate
- QA or compliance fails 3+ times
- Repeated builder failures (5+ in 24 hours)
- Constitutional ambiguity
- Governance rule conflicts
- System enters degraded mode

### Escalation Contact
- **Primary:** Johan (Engineering Leadership)
- **Method:** Create incident via CS3 system
- **Include:** Failure summary, error patterns, root cause analysis

---

**Last Updated:** 2025-12-11  
**Version:** 1.0  
**Status:** All Phases Complete and Operational

*This documentation is protected under CS1 Guardrails and CS7 Autonomy Pilot Log. Modifications require CS2 Architecture Change Approval.*

# BUILD TO GREEN INSTRUCTION - Phase 3 Builder Ecosystem

**Issued by:** Foreman  
**Date:** 2025-12-12  
**Task ID:** PHASE3-BUILDER-ECOSYSTEM-UPGRADE  
**Builder:** Internal Builder (Foreman Repository)

---

## Architecture Reference

**Document:** `/architecture/PHASE3_BUILDER_ECOSYSTEM_ARCHITECTURE.md`  
**Checklist Validation:** `/architecture/PHASE3_ARCHITECTURE_CHECKLIST_VALIDATION.md`  
**Status:** ✅ Complete and Validated

---

## Red QA Test Suite

**Location:** `/tests/phase3/`  
**Status:** ✅ RED (All 143+ tests failing - implementation doesn't exist)  
**Test Files:**
- checkpoint-manager.test.ts (15 tests)
- telemetry-engine.test.ts (45+ tests)
- fallback-engine.test.ts (20+ tests)
- constitutional-enforcer.test.ts (15+ tests)
- escalation-engine.test.ts (12+ tests)
- runtime-integration.test.ts (10+ tests)
- wave-integration.test.ts (8+ tests)
- opojd-compliance.test.ts (12+ tests)
- recovery-interoperability.test.ts (6+ tests)

---

## Build to Green Instruction

**MAKE ALL 143+ TESTS GREEN**

### Implementation Requirements

1. **Implement All Phase 3 Subsystems:**
   - `/lib/builder/phase3/checkpoint-manager.ts`
   - `/lib/builder/phase3/telemetry-engine.ts`
   - `/lib/builder/phase3/fallback-engine.ts`
   - `/lib/builder/phase3/escalation-engine.ts`
   - `/lib/builder/phase3/constitutional-enforcer.ts`
   - `/lib/builder/phase3/runtime-adapter.ts`
   - `/lib/builder/phase3/wave-adapter.ts`
   - `/lib/builder/phase3/types.ts` (shared types)
   - `/lib/builder/phase3/index.ts` (Phase3 platform entry)

2. **Follow Architecture Exactly:**
   - All interfaces as specified
   - All performance requirements met
   - All integration points implemented
   - All security requirements enforced

3. **Acceptance Criteria:**
   - ✅ All 143+ tests passing (100%)
   - ✅ Zero TypeScript errors
   - ✅ Zero lint errors
   - ✅ Zero warnings
   - ✅ Performance requirements met:
     - Checkpoint creation < 100ms
     - Checkpoint restoration < 500ms
     - Telemetry emission < 10ms
     - Constitutional check < 20ms
     - Boundary validation < 10ms
     - State transition < 50ms
   - ✅ All evidence preserved
   - ✅ Integration tests passing

---

## Constitutional Authority

**CS2 Permission:** GRANTED (temporary, for Phase 3 implementation)  
**Protected Files:** Builder agent files modified with approval  
**Scope:** Phase 3 implementation only  
**Expires:** After merge

---

## Execution Under OPOJD

**Execute continuously until 100% green.**

- No mid-build pauses
- No approval requests
- Attempt fallback on failures
- Escalate only if irrecoverable
- Maintain ≥95% execution continuity

---

## Evidence Requirements

**You MUST provide:**
- Implementation completion timestamp
- QA results (100% passing)
- Performance benchmarks
- Integration test results
- Evidence trail in `runtime/evidence/`

---

**Builder: Execute this "Build to Green" instruction now.**

**Expected Outcome:** All 143+ tests GREEN, zero errors, zero warnings, Phase 3 complete.

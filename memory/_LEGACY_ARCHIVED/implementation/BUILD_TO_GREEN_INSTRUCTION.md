# Build-to-Green Instruction — Memory Fabric V1.0

**Date**: 2025-12-12  
**Target Builder**: Maturion Builder (Internal)  
**Authority**: Build Philosophy, OPOJD

---

## INSTRUCTION FORMAT: "BUILD TO GREEN"

This is the ONLY valid build instruction format per Build Philosophy.

**Architecture**: See `/memory/architecture/MEMORY_FABRIC_V1.md`  
**Red QA**: See `/memory/qa/MEMORY_FABRIC_RED_QA.md`  
**Target**: 102/102 tests passing (100% GREEN)

---

## MODULES TO IMPLEMENT

### 1. Short-Term Memory (STM)
**File**: `/lib/memory/stm.ts`  
**Status**: ✅ IMPLEMENTED (Phase 3 initial implementation)  
**Tests**: `tests/memory/short-term-memory.test.ts` (18 tests)  
**Target**: All tests GREEN

### 2. Long-Term Tenant Memory (LTM)
**File**: `/lib/memory/ltm.ts`  
**Status**: ❌ NOT IMPLEMENTED  
**Tests**: `tests/memory/long-term-memory.test.ts` (24 tests)  
**Target**: All tests GREEN

**Critical Requirements**:
- Tenant isolation ABSOLUTE (no cross-tenant leaks)
- Encryption at rest (AES-256)
- ISMS Runtime exclusive write access
- Embodiment privilege enforcement

### 3. Governance Memory (Complete)
**File**: `/lib/memory/governance-memory.ts`  
**Status**: ⚠️ PARTIAL (exists but incomplete)  
**Tests**: `tests/memory/governance-memory.test.ts` (22 tests)  
**Target**: All tests GREEN

**Missing Functions**:
- `updateGovernanceMemory()`
- `deleteGovernanceMemory()`
- `queryGovernanceMemory()`
- `getQAFailureHistory()`
- `getConstitutionalViolations()`

### 4. Knowledge Boundaries
**File**: `/lib/memory/boundaries.ts`  
**Status**: ❌ NOT IMPLEMENTED  
**Tests**: `tests/memory/knowledge-boundaries.test.ts` (20 tests)  
**Target**: All tests GREEN

**Critical Requirements**:
- Tenant isolation enforcement
- Embodiment privilege validation
- Cross-tenant leak detection
- Guardrail boundary protection

### 5. Embodiment Sync
**File**: `/lib/memory/sync/embodiment-sync.ts`  
**Status**: ❌ NOT IMPLEMENTED  
**Tests**: `tests/memory/embodiment-sync.test.ts` (18 tests)  
**Target**: All tests GREEN

**Critical Requirements**:
- Cross-embodiment memory sync
- Conflict detection and resolution
- Selective tier synchronization (EM/SM only)

---

## ACCEPTANCE CRITERIA

Build is complete ONLY when:
- ✅ 102/102 tests passing (100%)
- ✅ Zero lint errors
- ✅ Zero lint warnings
- ✅ Zero TypeScript errors
- ✅ Build succeeds (`npm run build`)
- ✅ Typecheck succeeds (`npm run typecheck`)
- ✅ Performance benchmarks met (CS5)
- ✅ Security tests pass (tenant isolation)

**NO PARTIAL PASSES ACCEPTED** (GSR Compliance)

---

## CONSTITUTIONAL REQUIREMENTS

### CS2 Architecture Approval
- Architecture approved: ✅ (no protected files modified)
- Implementation may proceed autonomously

### CS5 Performance Enforcement
- STM operations: < 10ms write, < 50ms read
- LTM operations: < 100ms write, < 200ms read
- Performance violations logged to governance memory

### CS6 Execution Boundary
- Session isolation enforced (STM)
- Tenant isolation enforced (LTM)
- No memory boundary violations

### GSR (Governance Supremacy Rule)
- 100% QA passing required
- No exceptions, no bypasses
- All operations auditable

---

## BUILD PROCESS

1. **Implement each module** according to architecture
2. **Run tests after each module**:
   ```bash
   npm run test -- tests/memory/
   ```
3. **Fix failures until GREEN**
4. **Validate integration**:
   - Run full test suite
   - Run lint: `npm run lint`
   - Run typecheck: `npm run typecheck`
   - Run build: `npm run build`
5. **Report when 100% GREEN**

---

## EVIDENCE TRAIL

Builder must maintain evidence of:
- Implementation progress (module by module)
- Test results (before/after each module)
- Performance metrics (CS5 validation)
- Security validation (tenant isolation tests)
- Final QA status (100% GREEN)

---

**Status**: Instruction issued to builder  
**Expected Duration**: 2-4 hours (complexity: HIGH)  
**Priority**: CRITICAL (blocks Wave 1B and Wave 2)

---

**Version**: 1.0  
**Authority**: Build Philosophy, OPOJD  
**Owner**: Foreman

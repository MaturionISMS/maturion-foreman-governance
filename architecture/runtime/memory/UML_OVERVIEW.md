# Unified Memory Layer (UML) — System Overview

**Version**: 1.0  
**Status**: Constitutional (CS2 Approved Architecture)  
**Owner**: Foreman Orchestration System  
**Last Updated**: 2025-12-11  
**Compliance**: CS1, CS2, CS5, CS6, TED, GSR, QIC

---

## 1. PURPOSE

The Unified Memory Layer (UML) provides persistent, cross-platform memory infrastructure for the entire Maturion ecosystem. It enables:

- **Context continuity** across Foreman, Foreman App, Local Builder, and ISMS Runtime AI
- **State awareness** for all embodiments
- **Situational intelligence** across sessions
- **Long-term reasoning** from historical patterns
- **Corrective feedback loops** for autonomous improvement
- **Governance-safe memory** with audit trails and tenant isolation
- **Multi-tenant memory isolation** for ISMS operations
- **Intelligence persistence** across builds, waves, incidents, and interactions

The UML is foundational infrastructure for safe autonomous operation.

---

## 2. SYSTEM OVERVIEW

### 2.1 Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────────┐
│                      UNIFIED MEMORY LAYER (UML)                         │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                           │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐     │
│  │  SHORT-TERM      │  │  WORKING         │  │  EPISODIC        │     │
│  │  MEMORY (STM)    │  │  MEMORY (WM)     │  │  MEMORY (EM)     │     │
│  │                  │  │                  │  │                  │     │
│  │  • Active tasks  │  │  • Multi-step    │  │  • Historical    │     │
│  │  • Current       │  │    reasoning     │  │    events        │     │
│  │    context       │  │  • Build state   │  │  • Learnings     │     │
│  │  • Volatile      │  │  • Temp context  │  │  • Incidents     │     │
│  └──────────────────┘  └──────────────────┘  └──────────────────┘     │
│                                                                           │
│  ┌──────────────────┐  ┌──────────────────────────────────────────┐   │
│  │  SEMANTIC        │  │  LONG-TERM TENANT                         │   │
│  │  MEMORY (SM)     │  │  MEMORY (LTM)                             │   │
│  │                  │  │                                            │   │
│  │  • Global truths │  │  • Tenant-specific knowledge               │   │
│  │  • Threat models │  │  • Isolated per organization               │   │
│  │  • Frameworks    │  │  • NEVER cross-pollinate                   │   │
│  │  • Best practice │  │  • Encrypted & bounded                     │   │
│  └──────────────────┘  └──────────────────────────────────────────┘   │
│                                                                           │
├─────────────────────────────────────────────────────────────────────────┤
│                     MEMORY RUNTIME API LAYER                            │
├─────────────────────────────────────────────────────────────────────────┤
│  /api/memory/store     │ /api/memory/recall   │ /api/memory/query      │
│  /api/memory/contexts  │ /api/memory/governance                         │
├─────────────────────────────────────────────────────────────────────────┤
│                     EMBODIMENT SYNC LAYER                               │
├─────────────────────────────────────────────────────────────────────────┤
│  Foreman ⟷ App ⟷ Local Builder ⟷ ISMS Runtime AI                     │
│  • Cross-embodiment memory sharing                                      │
│  • Tenant isolation enforcement                                         │
│  • Synchronization protocols                                            │
├─────────────────────────────────────────────────────────────────────────┤
│                     PERSISTENCE LAYER                                   │
├─────────────────────────────────────────────────────────────────────────┤
│  • Database storage (lib/db/memory.ts)                                  │
│  • File-based storage (memory/*.json) [current]                         │
│  • Vector embeddings (future semantic search)                           │
│  • Governance audit logs                                                │
└─────────────────────────────────────────────────────────────────────────┘
```

### 2.2 Memory Tiers (The Five Layers of Remembrance)

| Tier | Name | Purpose | Lifetime | Tenant-Specific | Constitutional Status |
|------|------|---------|----------|-----------------|----------------------|
| 1 | **Short-Term Memory (STM)** | Current conversation, active tasks | Session only | No | Volatile |
| 2 | **Working Memory (WM)** | Multi-step reasoning, build context | Hours to days | No | Temporary |
| 3 | **Episodic Memory (EM)** | Historical events, learnings | Permanent | No | Immutable (ARC only) |
| 4 | **Semantic Memory (SM)** | Global knowledge, frameworks | Permanent | No | ARC-controlled |
| 5 | **Long-Term Tenant Memory (LTM)** | Organization-specific data | Permanent | **YES** | Isolated & encrypted |

---

## 3. CORE COMPONENTS

### 3.1 Memory Storage Engine
**Location**: `lib/db/memory.ts`

Provides unified persistence interface for all memory tiers.

**Key Functions**:
- `storeMemory(tier, data, metadata)` — Store memory entry
- `recallMemory(tier, query, filters)` — Retrieve memory
- `queryMemory(tier, semanticQuery)` — Semantic search (future)
- `purgeMemory(tier, rules)` — Decay and pruning
- `snapshotMemory(tier)` — Create memory checkpoint

**Database Schema**:
```typescript
interface MemoryRecord {
  id: string                    // UUID
  tier: MemoryTier              // STM | WM | EM | SM | LTM
  actor: ActorType              // foreman | builder | user | isms_runtime
  embodiment: EmbodimentType    // foreman_app | local_builder | isms_runtime
  category: string              // Subcategory within tier
  content: any                  // Memory payload (JSON)
  metadata: MemoryMetadata      // Timestamps, version, tags
  vector?: number[]             // Optional embedding for semantic search
  tenantId?: string             // For LTM only - tenant isolation
  organisationId?: string       // For LTM only - org boundary
  isolationBoundary: string     // repo | module | tenant | global
  createdAt: Date
  updatedAt: Date
  expiresAt?: Date              // For STM and WM
}
```

### 3.2 Memory Runtime API
**Location**: `app/api/memory/*`

Exposes memory operations via HTTP API for cross-embodiment access.

**Endpoints**:
- `POST /api/memory/store` — Store memory entry
- `POST /api/memory/recall` — Recall memory by filters
- `POST /api/memory/query` — Semantic query (future)
- `GET /api/memory/contexts/:embodiment` — Get embodiment context
- `GET /api/memory/governance` — Governance memory audit

**Authentication**: API key + embodiment verification  
**Rate Limiting**: 100 req/min per embodiment  
**Audit**: All operations logged to governance memory

### 3.3 Embodiment Synchronization Layer
**Location**: `lib/memory/sync/embodiment-sync.ts`

Enables "one mind, multiple embodiments" by synchronizing memory across:
- Foreman (GitHub Copilot Agent)
- Foreman App (Next.js application)
- Local Builder (local agent runtime)
- ISMS Runtime AI (production ISMS agent)

**Key Functions**:
- `syncMemoryAcrossEmbodiments(sourceEmbodiment, targetEmbodiments, memoryTier)`
- `enforceT tenantIsolation(memory, organisationId)`
- `detectSyncConflicts(memory1, memory2)`
- `resolveSyncConflict(strategy, memories)`

**Sync Protocol**:
1. Memory written in one embodiment
2. Sync layer detects change
3. Apply tenant isolation rules
4. Propagate to authorized embodiments
5. Conflict detection and resolution
6. Audit log to governance memory

### 3.4 Governance Memory Subsystem
**Location**: Integrated with all tiers

Tracks constitutional compliance and governance events.

**Governance Events Recorded**:
- CS1 immutability violations (detected & blocked)
- CS2 architecture change proposals & approvals
- TED technology evolution events
- QA failures and patterns
- Builder task outcomes
- Incident resolutions
- ARC decisions

**Immutability**: Governance memory is append-only and cannot be modified by any agent.

### 3.5 Knowledge Boundary Enforcement
**Location**: Integrated with query/recall operations

Prevents memory leakage across tenant boundaries.

**Boundaries**:
1. **Tenant Isolation** — LTM never crosses tenant boundaries
2. **Embodiment Privileges** — Builder-Maturion cannot access tenant LTM
3. **Guardrail Enforcement** — Constitutional rules override memory
4. **Safety Filters** — Prevent exfiltration attempts

---

## 4. DATA FLOW

### 4.1 Memory Write Flow
```
┌──────────────┐
│  Embodiment  │ (Foreman, Builder, ISMS Runtime)
│   (Actor)    │
└──────┬───────┘
       │
       │ 1. Store request
       ▼
┌──────────────────────┐
│  Memory Runtime API  │
│  /api/memory/store   │
└──────┬───────────────┘
       │
       │ 2. Validate + Apply Governance Rules
       ▼
┌─────────────────────────┐
│  Governance Enforcement │
│  • Tenant isolation?    │
│  • Constitutional safe? │
│  • Embodiment allowed?  │
└──────┬──────────────────┘
       │
       │ 3. Write to tier
       ▼
┌──────────────────┐
│  Memory Storage  │
│  lib/db/memory   │
└──────┬───────────┘
       │
       │ 4. Trigger sync
       ▼
┌──────────────────────┐
│  Embodiment Sync     │
│  (Cross-platform)    │
└──────────────────────┘
```

### 4.2 Memory Recall Flow
```
┌──────────────┐
│  Embodiment  │
│   (Actor)    │
└──────┬───────┘
       │
       │ 1. Recall request
       ▼
┌──────────────────────┐
│  Memory Runtime API  │
│  /api/memory/recall  │
└──────┬───────────────┘
       │
       │ 2. Apply filters + boundaries
       ▼
┌─────────────────────────┐
│  Knowledge Boundary     │
│  Enforcement            │
│  • Tenant check         │
│  • Embodiment privilege │
│  • Guardrail compliance │
└──────┬──────────────────┘
       │
       │ 3. Query storage
       ▼
┌──────────────────┐
│  Memory Storage  │
│  lib/db/memory   │
└──────┬───────────┘
       │
       │ 4. Return filtered results
       ▼
┌──────────────┐
│  Embodiment  │
└──────────────┘
```

---

## 5. LIFECYCLE MANAGEMENT

### 5.1 Memory Write Rules

**Allowed Writes**:
- ✅ Episodic Memory entries (all embodiments)
- ✅ Working Memory (temporary context)
- ✅ Short-Term Memory (session context)
- ✅ Semantic Memory (with ARC approval only)
- ✅ Tenant LTM (only by ISMS Runtime, only for that tenant)

**Prohibited Writes**:
- ❌ Tenant data into global memory (SM, EM)
- ❌ Private data into episodic memory
- ❌ ANY writes to guardrail/constitutional documents
- ❌ Cross-tenant analytics or aggregated data

### 5.2 Memory Pruning & Decay

**Short-Term Memory (STM)**:
- Auto-expires after session ends
- No manual pruning needed

**Working Memory (WM)**:
- Auto-expires after 24-72 hours (configurable)
- Erased after task completion
- Redacted before any long-term storage

**Episodic Memory (EM)**:
- **NEVER deleted** (immutable)
- Only ARC can redact (with approval)
- Provides permanent audit trail

**Semantic Memory (SM)**:
- Manually curated
- Updates via ARC only
- No automatic decay

**Long-Term Tenant Memory (LTM)**:
- Retained indefinitely
- Deleted only by:
  - Tenant request
  - Regulatory requirement (GDPR, etc.)
  - ARC-approved governance action

### 5.3 Versioning Strategy

All memory entries are versioned:
- Version increments on update
- Previous versions archived (for EM, SM, LTM)
- Short-lived memory (STM, WM) not versioned

**Version Schema**:
```typescript
{
  id: "memory_uuid",
  version: 3,
  previousVersions: ["v1_timestamp", "v2_timestamp"],
  updatedAt: "2025-12-11T10:00:00Z",
  updatedBy: "foreman"
}
```

---

## 6. SECURITY INVARIANTS

### 6.1 Tenant Isolation (Absolute)

**Rule**: LTM for tenant A MUST NEVER be visible to tenant B.

**Enforcement**:
- Database row-level security (when using Supabase)
- API-level filtering (current file-based)
- Embodiment privilege checks
- Query-time boundary validation

**Violation Response**:
- Immediate alert to Johan
- IWMS Security Incident created
- Temporary memory write freeze
- Watchdog elevated monitoring

### 6.2 Embodiment Privilege Model

| Embodiment | STM | WM | EM | SM | LTM (Tenant-Specific) |
|------------|-----|----|----|----|-----------------------|
| **Foreman (Builder)** | ✅ | ✅ | ✅ | ✅ | ❌ |
| **Foreman App** | ✅ | ✅ | ✅ | ✅ | ❌ |
| **Local Builder** | ✅ | ✅ | ✅ | ✅ | ❌ |
| **ISMS Runtime AI** | ✅ | ✅ | ✅ | ✅ | ✅ (own tenant only) |
| **Marketing-Maturion** | ❌ | ❌ | ❌ | ✅ | ❌ |
| **Command-Maturion** | ✅ | ❌ | ✅ | ✅ | ❌ |

### 6.3 Constitutional Safeguards

**Watchdog Monitoring**:
- Guardian: Validates all memory writes
- Sentinel: Detects drift and anomalies
- Arbiter: Ensures memory integrity

**Safety Boundaries**:
- Memory rules cannot be changed by any agent
- Changes require ARC review + Johan approval
- All modification attempts tracked
- Guardrails override memory behavior

---

## 7. CROSS-EMBODIMENT SYNCHRONIZATION

### 7.1 Synchronization Requirements

**Shared Memory Tiers**:
- **Episodic Memory (EM)**: Shared across all embodiments
- **Semantic Memory (SM)**: Shared across all embodiments
- **Working Memory (WM)**: Shared within build/task context

**Isolated Memory**:
- **Short-Term Memory (STM)**: Per-embodiment (not synced)
- **Long-Term Tenant Memory (LTM)**: Per-tenant, only ISMS Runtime

### 7.2 Sync Protocol

**Event-Driven Sync**:
1. Memory write in Embodiment A
2. Sync layer detects change (via API callback)
3. Determine eligible embodiments (privilege + tenant check)
4. Propagate to eligible embodiments
5. Conflict detection
6. Log sync event to governance memory

**Conflict Resolution**:
- **Last-Write-Wins** (default for EM, WM)
- **Manual Resolution** (for SM — requires ARC)
- **Immutable** (Governance Memory — no conflicts possible)

### 7.3 Out-of-Sync Reconciliation

**Detection**:
- Periodic sync health checks (every 5 minutes)
- Version mismatch detection
- Missing entries detection

**Reconciliation**:
1. Identify missing or mismatched entries
2. Fetch authoritative version (from persistence layer)
3. Update out-of-sync embodiment
4. Log reconciliation event

---

## 8. GOVERNANCE INTEGRATION

### 8.1 CS1 Integration (Immutability Checks)

**Enforcement**:
- Episodic Memory is immutable (append-only)
- Governance Memory is immutable
- Constitutional documents cannot be modified via memory system

**Verification**:
- Pre-write checks for immutability violations
- Hash verification for constitutional files
- Alert on any modification attempt

### 8.2 CS2 Integration (Architecture Changes)

**Memory of Architecture Decisions**:
- All ARC decisions stored in Episodic Memory
- Architecture change proposals recorded
- Approval/rejection outcomes tracked
- Historical architectural context preserved

### 8.3 TED Integration (Technology Evolution)

**Evolution Tracking**:
- Technology stack changes logged
- Deprecation events recorded
- Migration milestones captured
- Modernization status tracked

---

## 9. OPERATIONAL RULES

### 9.1 When to Read Memory

**Before Actions**:
- Before orchestrating builders → Load Foreman memory
- Before architectural analysis → Load architecture decisions
- Before project actions → Load project memory
- On error recovery → Load error patterns

### 9.2 When to Write Memory

**After Events**:
- After wave completion → Record outcomes
- After architecture decisions → Record for future reference
- After deployments → Track deployment history
- After QA failures → Learn from failures
- After milestone completion → Track project progress
- After error escalation → Record for pattern analysis

### 9.3 Memory Health Checks

**Startup Verification**:
- Memory integrity (hashes)
- No drift in semantic models
- No tenant contamination
- Episodic memory ordering
- Guardrail layers intact
- No unauthorized updates
- Watchdog operational

**Failure Response**:
- IWMS Security Incident
- Elevated Watchdog Monitoring
- Autonomy restrictions until resolved

---

## 10. IMPLEMENTATION ROADMAP

### 10.1 Current State (Pre-UML-01)
- ✅ File-based memory storage (`/memory/*.json`)
- ✅ Basic memory API (`lib/foreman/memory/index.ts`)
- ✅ Constitutional documents defined
- ❌ Database persistence layer
- ❌ Runtime API endpoints
- ❌ Embodiment sync layer
- ❌ Comprehensive QA suite

### 10.2 UML-01 Deliverables
1. **Architecture Documents** (this and 6 others)
2. **Memory Runtime API** (`app/api/memory/*`)
3. **Database Models** (`lib/db/memory.ts`)
4. **Embodiment Sync** (`lib/memory/sync/embodiment-sync.ts`)
5. **Red QA Suite** (`tests/memory/*.test.ts`)
6. **Completion Report** (`governance/memory/UML_01_COMPLETION_REPORT.md`)

### 10.3 Future Enhancements
- Vector embeddings for semantic search
- Real-time sync via WebSockets
- Memory compression and archival
- Advanced analytics and insights
- Memory visualization dashboard

---

## 11. COMPLIANCE MATRIX

| Requirement | Status | Evidence |
|-------------|--------|----------|
| **CS1 (Immutability)** | ✅ Enforced | Governance Memory append-only, constitutional files protected |
| **CS2 (Architecture Approval)** | ✅ Enforced | All SM updates require ARC approval |
| **CS5 (Security)** | ✅ Enforced | Tenant isolation, embodiment privileges, audit logs |
| **CS6 (Quality)** | ✅ Enforced | Comprehensive QA suite, drift detection |
| **TED (Technology Evolution)** | ✅ Enforced | Evolution events tracked in EM |
| **GSR (Governance Supremacy)** | ✅ Enforced | Governance overrides all memory operations |
| **QIC (Quality Integrity)** | ✅ Enforced | Memory health checks, integrity verification |

---

## 12. REFERENCES

**Constitutional Documents**:
- `/BUILD_PHILOSOPHY.md` — Build philosophy and process
- `.github/foreman/agent-contract.md` — Foreman's constitutional contract
- `/maturion-philosophy-tree.md` — Platform ontology
- `/maturion/maturion-memory-architecture.md` — Memory architecture principles
- `/foreman/governance/memory-rules.md` — Operational memory rules

**Related Architecture**:
- `/architecture/runtime/memory/SHORT_TERM_MEMORY.md`
- `/architecture/runtime/memory/LONG_TERM_MEMORY.md`
- `/architecture/runtime/memory/CONTEXTUAL_RECALL.md`
- `/architecture/runtime/memory/KNOWLEDGE_BOUNDARIES.md`
- `/architecture/runtime/memory/EMBODIMENT_MEMORY.md`
- `/architecture/runtime/memory/GOVERNANCE_MEMORY.md`

---

**Status**: ✅ Architecture Complete  
**Version**: 1.0  
**Approval**: CS2 Architecture Review Required  
**Next Step**: Create remaining 6 architecture documents

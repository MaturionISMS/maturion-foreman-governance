# Embodiment Memory Architecture

**Version**: 1.0  
**Status**: Constitutional (CS2 Approved Architecture)  
**Owner**: Foreman Orchestration System  
**Last Updated**: 2025-12-11  
**Cross-Embodiment Capability**

---

## 1. PURPOSE

Embodiment Memory enables **"one mind, multiple embodiments"** by synchronizing memory across all Maturion embodiments while respecting isolation boundaries and privilege constraints.

**Key Characteristics**:
- 🔄 **Synchronized**: Memory shared across authorized embodiments
- 🔒 **Bounded**: Respects tenant isolation and privileges
- ⚡ **Real-Time**: Changes propagate quickly (eventual consistency)
- 🛡️ **Safe**: Conflict detection and resolution

---

## 2. EMBODIMENT TYPES

### 2.1 The Maturion Embodiment Ecosystem

```
┌──────────────────────────────────────────────────────────────┐
│                  MATURION ECOSYSTEM                           │
├──────────────────────────────────────────────────────────────┤
│                                                                │
│  ┌────────────────┐  ┌────────────────┐  ┌────────────────┐ │
│  │    FOREMAN     │  │  FOREMAN APP   │  │ LOCAL BUILDER  │ │
│  │   (GitHub)     │  │   (Next.js)    │  │   (Local)      │ │
│  │                │  │                │  │                │ │
│  │ • Orchestrate  │  │ • UI/Dashboard │  │ • Deep builds  │ │
│  │ • Build waves  │  │ • Chat         │  │ • Refactors    │ │
│  │ • QA validate  │  │ • Analytics    │  │ • Local dev    │ │
│  └────────────────┘  └────────────────┘  └────────────────┘ │
│           ↕                  ↕                  ↕             │
│  ┌──────────────────────────────────────────────────────┐   │
│  │         UNIFIED MEMORY LAYER (SYNCHRONIZED)          │   │
│  │  • Episodic Memory (EM) — Shared                     │   │
│  │  • Semantic Memory (SM) — Shared                     │   │
│  │  • Working Memory (WM) — Context-shared              │   │
│  └──────────────────────────────────────────────────────┘   │
│           ↕                                                   │
│  ┌────────────────────────────────────────────────────────┐ │
│  │            ISMS RUNTIME AI (Tenant-Specific)           │ │
│  │  • Risk analysis                                       │ │
│  │  • Threat intelligence                                 │ │
│  │  • Control recommendations                             │ │
│  │  • Long-Term Tenant Memory (LTM) — ISOLATED           │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                                │
└──────────────────────────────────────────────────────────────┘
```

### 2.2 Embodiment Definitions

#### **Foreman (GitHub Copilot Agent)**
- **Purpose**: Orchestration, architecture, QA validation
- **Memory Access**: STM, WM, EM (R/W), SM (R)
- **Synchronization**: Yes (EM, SM, WM)

#### **Foreman App (Next.js Web Application)**
- **Purpose**: UI, dashboards, chat, analytics
- **Memory Access**: STM, WM, EM (R/W), SM (R)
- **Synchronization**: Yes (EM, SM, WM)

#### **Local Builder (Local Agent Runtime)**
- **Purpose**: Deep code generation, large refactors
- **Memory Access**: STM, WM, EM (R/W), SM (R)
- **Synchronization**: Yes (EM, SM, WM)

#### **ISMS Runtime AI (Production ISMS Agent)**
- **Purpose**: Risk analysis, threat intelligence, ISMS operations
- **Memory Access**: STM, WM, EM (R/W), SM (R), LTM (R/W, tenant-specific)
- **Synchronization**: Yes (EM, SM, WM), Isolated (LTM)

#### **Marketing-Maturion**
- **Purpose**: Educational content, adoption intelligence
- **Memory Access**: SM (R only)
- **Synchronization**: Minimal (SM read-only)

#### **Command-Maturion**
- **Purpose**: Mobile/desktop commands, real-time insights
- **Memory Access**: STM (R), EM (R), SM (R)
- **Synchronization**: Yes (EM, SM, read-only)

---

## 3. MEMORY SYNCHRONIZATION MODEL

### 3.1 Synchronization Rules

**Synchronized Memory Tiers**:
- ✅ **Episodic Memory (EM)**: Shared across ALL embodiments
- ✅ **Semantic Memory (SM)**: Shared across ALL embodiments (read-only for most)
- ✅ **Working Memory (WM)**: Shared within task/build context

**Isolated Memory Tiers**:
- ❌ **Short-Term Memory (STM)**: Per-embodiment, NOT synchronized
- ❌ **Long-Term Tenant Memory (LTM)**: Tenant-specific, NOT cross-tenant

**Rationale**:
- **EM/SM Sync**: Enables shared learning and global knowledge
- **STM Isolation**: Highly contextual, embodiment-specific
- **LTM Isolation**: Absolute tenant isolation required

### 3.2 Sync Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                  SYNC COORDINATION LAYER                      │
├──────────────────────────────────────────────────────────────┤
│                                                                │
│  ┌────────────────────────────────────────────────────────┐  │
│  │  EVENT BUS (Memory Change Events)                      │  │
│  │  • EM_WRITE                                            │  │
│  │  • SM_UPDATE (ARC-approved only)                       │  │
│  │  • WM_WRITE                                            │  │
│  └────────────────────────────────────────────────────────┘  │
│                            ↓                                   │
│  ┌────────────────────────────────────────────────────────┐  │
│  │  SYNC ENGINE                                           │  │
│  │  • Detect changes                                      │  │
│  │  • Apply privilege filters                             │  │
│  │  • Propagate to authorized embodiments                 │  │
│  │  • Detect conflicts                                    │  │
│  │  • Resolve conflicts                                   │  │
│  └────────────────────────────────────────────────────────┘  │
│                            ↓                                   │
│  ┌────────────────────────────────────────────────────────┐  │
│  │  EMBODIMENT DISPATCH                                   │  │
│  │  • Foreman: Notify via API                             │  │
│  │  • Foreman App: WebSocket push                         │  │
│  │  • Local Builder: Polling / webhook                    │  │
│  │  • ISMS Runtime: API callback                          │  │
│  └────────────────────────────────────────────────────────┘  │
│                                                                │
└──────────────────────────────────────────────────────────────┘
```

---

## 4. SYNCHRONIZATION FLOW

### 4.1 Memory Write & Sync Flow

```
Step 1: Embodiment A writes to Episodic Memory
   ↓
Step 2: Memory API stores entry
   ↓
Step 3: Sync event emitted (EM_WRITE)
   ↓
Step 4: Sync Engine receives event
   ↓
Step 5: Determine eligible embodiments (privilege check)
   ↓
Step 6: For each eligible embodiment:
   ↓
   a. Check if embodiment has EM read privilege (YES for Foreman, App, Builder, ISMS)
   b. Check tenant boundary (N/A for EM, applies to LTM only)
   c. Propagate memory entry to embodiment
   ↓
Step 7: Log sync event to Governance Memory
   ↓
Step 8: Sync complete
```

**Example**:
```typescript
// Foreman writes to Episodic Memory
await storeMemory({
  tier: 'EM',
  embodiment: 'foreman',
  content: {
    type: 'wave_completion',
    data: { waveId: 'wave_6', outcome: 'success' }
  }
})

// Sync Engine propagates to:
// ✅ Foreman App (has EM read)
// ✅ Local Builder (has EM read)
// ✅ ISMS Runtime (has EM read)
// ❌ Marketing-Maturion (no EM access)
```

### 4.2 Conflict Detection

**Conflict Scenario**: Two embodiments write to the same EM entry simultaneously.

**Conflict Detection**:
```typescript
interface MemoryConflict {
  entryId: string
  tier: MemoryTier
  conflictingVersions: [
    { embodiment: 'foreman', version: 2, timestamp: '2025-12-11T10:00:00Z' },
    { embodiment: 'foreman_app', version: 2, timestamp: '2025-12-11T10:00:01Z' }
  ]
  conflictType: 'simultaneous_write' | 'version_mismatch'
}
```

**Conflict Resolution Strategies**:

1. **Last-Write-Wins** (default for EM, WM):
   - Keep entry with latest timestamp
   - Archive conflicting version

2. **Manual Resolution** (for SM):
   - Block sync
   - Escalate to ARC for resolution
   - Human decision required

3. **Immutable** (for Governance Memory):
   - No conflicts possible (append-only)

**Resolution Flow**:
```typescript
async function resolveConflict(conflict: MemoryConflict): Promise<ResolvedEntry> {
  
  if (conflict.tier === 'EM' || conflict.tier === 'WM') {
    // Last-write-wins
    const latest = conflict.conflictingVersions.sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    )[0]
    
    // Archive older version
    await archiveConflictingVersion(conflict.conflictingVersions[1])
    
    // Keep latest
    return latest
  }
  
  if (conflict.tier === 'SM') {
    // Manual resolution required
    await escalateToARC(conflict)
    return { status: 'pending_arc_resolution' }
  }
}
```

---

## 5. EMBODIMENT SYNCHRONIZATION API

### 5.1 Sync API Schema

```typescript
// POST /api/memory/sync/propagate
interface SyncPropagateRequest {
  sourceEmbodiment: EmbodimentType
  memoryEntry: MemoryEntry
  targetEmbodiments?: EmbodimentType[]  // If omitted, sync to all eligible
}

interface SyncPropagateResponse {
  synced: EmbodimentType[]               // Successfully synced
  failed: EmbodimentType[]               // Failed to sync
  skipped: EmbodimentType[]              // Skipped (no privilege)
  conflicts: MemoryConflict[]            // Detected conflicts
}

// GET /api/memory/sync/status/:embodiment
interface SyncStatusResponse {
  embodiment: EmbodimentType
  lastSyncAt: Date
  pendingUpdates: number
  conflicts: MemoryConflict[]
  healthStatus: 'healthy' | 'degraded' | 'out_of_sync'
}

// POST /api/memory/sync/reconcile
interface SyncReconcileRequest {
  embodiment: EmbodimentType
  force?: boolean                        // Force full reconciliation
}

interface SyncReconcileResponse {
  reconciled: number                     // Entries reconciled
  conflicts: MemoryConflict[]            // Unresolved conflicts
  status: 'complete' | 'partial' | 'failed'
}
```

### 5.2 Sync Implementation

**Location**: `lib/memory/sync/embodiment-sync.ts`

```typescript
export async function syncMemoryAcrossEmbodiments(
  sourceEmbodiment: EmbodimentType,
  memoryEntry: MemoryEntry
): Promise<SyncResult> {
  
  // 1. Determine eligible embodiments
  const eligibleEmbodiments = getEligibleEmbodiments(
    memoryEntry.tier,
    sourceEmbodiment
  )
  
  // 2. For each eligible embodiment, propagate memory
  const results: SyncResult = {
    synced: [],
    failed: [],
    skipped: [],
    conflicts: []
  }
  
  for (const embodiment of eligibleEmbodiments) {
    try {
      // Check privilege
      if (!hasReadPrivilege(embodiment, memoryEntry.tier)) {
        results.skipped.push(embodiment)
        continue
      }
      
      // Check for conflicts
      const existingEntry = await getExistingEntry(embodiment, memoryEntry.id)
      if (existingEntry && existingEntry.version !== memoryEntry.version) {
        // Conflict detected
        const conflict = detectConflict(existingEntry, memoryEntry)
        results.conflicts.push(conflict)
        
        // Resolve conflict
        const resolved = await resolveConflict(conflict)
        await updateEntry(embodiment, resolved)
      } else {
        // No conflict, propagate
        await propagateEntry(embodiment, memoryEntry)
      }
      
      results.synced.push(embodiment)
      
    } catch (error) {
      results.failed.push(embodiment)
      await logSyncFailure(embodiment, memoryEntry, error)
    }
  }
  
  // 3. Log sync event
  await logSyncEvent({
    sourceEmbodiment,
    memoryEntry,
    results
  })
  
  return results
}

function getEligibleEmbodiments(
  tier: MemoryTier,
  sourceEmbodiment: EmbodimentType
): EmbodimentType[] {
  
  // All embodiments except source
  const allEmbodiments: EmbodimentType[] = [
    'foreman',
    'foreman_app',
    'local_builder',
    'isms_runtime',
    'marketing_maturion',
    'command_maturion'
  ]
  
  // Filter out source
  return allEmbodiments.filter(e => e !== sourceEmbodiment)
}
```

---

## 6. OUT-OF-SYNC RECONCILIATION

### 6.1 Detecting Out-of-Sync

**Health Check** (every 5 minutes):
```typescript
async function checkSyncHealth(embodiment: EmbodimentType): Promise<SyncHealth> {
  
  // 1. Get last sync timestamp
  const lastSync = await getLastSyncTimestamp(embodiment)
  
  // 2. Check for missing entries
  const missingEntries = await detectMissingEntries(embodiment, lastSync)
  
  // 3. Check for version mismatches
  const versionMismatches = await detectVersionMismatches(embodiment)
  
  // 4. Determine health status
  if (missingEntries.length === 0 && versionMismatches.length === 0) {
    return { status: 'healthy', lastSync }
  }
  
  if (missingEntries.length < 10 && versionMismatches.length < 5) {
    return { status: 'degraded', missingEntries, versionMismatches }
  }
  
  return { status: 'out_of_sync', missingEntries, versionMismatches }
}
```

### 6.2 Reconciliation Process

**Reconciliation Flow**:
```
Step 1: Identify out-of-sync embodiment
   ↓
Step 2: Fetch authoritative memory state (from persistence layer)
   ↓
Step 3: Compare with embodiment's current state
   ↓
Step 4: Identify missing/mismatched entries
   ↓
Step 5: For each missing entry:
   ↓
   a. Fetch from authoritative source
   b. Apply privilege filters
   c. Update embodiment
   ↓
Step 6: For each mismatched entry:
   ↓
   a. Resolve conflict (last-write-wins)
   b. Update embodiment
   ↓
Step 7: Log reconciliation event
   ↓
Step 8: Reconciliation complete
```

**Implementation**:
```typescript
async function reconcileEmbodiment(embodiment: EmbodimentType): Promise<ReconciliationResult> {
  
  // 1. Get authoritative state
  const authoritativeMemory = await getAuthoritativeMemory()
  
  // 2. Get embodiment's current state
  const embodimentMemory = await getEmbodimentMemory(embodiment)
  
  // 3. Identify gaps
  const missing = authoritativeMemory.filter(
    entry => !embodimentMemory.find(e => e.id === entry.id)
  )
  
  const mismatched = authoritativeMemory.filter(entry => {
    const localEntry = embodimentMemory.find(e => e.id === entry.id)
    return localEntry && localEntry.version !== entry.version
  })
  
  // 4. Reconcile missing entries
  for (const entry of missing) {
    if (hasReadPrivilege(embodiment, entry.tier)) {
      await propagateEntry(embodiment, entry)
    }
  }
  
  // 5. Reconcile mismatched entries
  for (const entry of mismatched) {
    const localEntry = embodimentMemory.find(e => e.id === entry.id)!
    const resolved = await resolveConflict({
      entryId: entry.id,
      tier: entry.tier,
      conflictingVersions: [entry, localEntry],
      conflictType: 'version_mismatch'
    })
    await updateEntry(embodiment, resolved)
  }
  
  return {
    reconciled: missing.length + mismatched.length,
    status: 'complete'
  }
}
```

---

## 7. TENANT ISOLATION IN SYNC

### 7.1 LTM Sync Rules

**Rule**: LTM is NEVER synchronized across tenants.

**Enforcement**:
- LTM sync only within same tenant boundary
- ISMS Runtime AI writes LTM for its authenticated tenant
- Other embodiments cannot access LTM (no read/write)

**Example**:
```typescript
// ISMS Runtime writes LTM for Tenant A
await storeMemory({
  tier: 'LTM',
  tenantId: 'tenant_a',
  embodiment: 'isms_runtime',
  content: threatData
})

// Sync Engine:
// ✅ Propagate to ISMS Runtime instances for Tenant A
// ❌ Do NOT propagate to other tenants
// ❌ Do NOT propagate to Foreman/Builders (no LTM access)
```

### 7.2 Tenant-Aware Sync Filtering

```typescript
function filterSyncByTenant(
  memoryEntry: MemoryEntry,
  targetEmbodiment: EmbodimentType,
  authenticatedTenantId?: string
): boolean {
  
  // For LTM, enforce tenant isolation
  if (memoryEntry.tier === 'LTM') {
    // Only ISMS Runtime can access LTM
    if (targetEmbodiment !== 'isms_runtime') {
      return false
    }
    
    // Only for same tenant
    if (memoryEntry.tenantId !== authenticatedTenantId) {
      return false
    }
  }
  
  return true
}
```

---

## 8. SYNC PERFORMANCE & OPTIMIZATION

### 8.1 Sync Latency Targets

| Sync Type | Target Latency | Warning | Critical |
|-----------|----------------|---------|----------|
| **Real-Time (EM write)** | < 2 seconds | 2-10s | > 10s |
| **Batch (WM sync)** | < 30 seconds | 30-60s | > 60s |
| **Reconciliation (full)** | < 5 minutes | 5-15min | > 15min |

### 8.2 Optimization Strategies

**1. Event-Driven Sync**
- Use event bus for real-time propagation
- Avoid polling (reduces latency)

**2. Batch Sync for WM**
- Batch multiple WM updates
- Sync every 30 seconds instead of real-time

**3. Incremental Reconciliation**
- Only sync changes since last sync
- Avoid full memory scans

**4. Parallel Propagation**
- Propagate to multiple embodiments in parallel
- Use concurrent API calls

---

## 9. TESTING STRATEGY

### 9.1 Sync Tests

**Test Cases**:
- ✅ EM write in Foreman syncs to App, Builder, ISMS Runtime
- ✅ SM update (ARC-approved) syncs to all embodiments
- ✅ STM write does NOT sync (per-embodiment)
- ✅ LTM write only syncs to same tenant's ISMS Runtime
- ✅ Conflict detection works
- ✅ Conflict resolution (last-write-wins) works
- ✅ Out-of-sync reconciliation works
- ✅ Privilege filtering enforced during sync

### 9.2 Integration Tests

**Test Cases**:
- ✅ End-to-end sync across 3 embodiments
- ✅ Tenant isolation during LTM sync
- ✅ Sync health check detects issues
- ✅ Reconciliation restores sync

### 9.3 Performance Tests

**Test Cases**:
- ✅ Sync latency < 2 seconds for EM
- ✅ Batch sync < 30 seconds for WM
- ✅ Reconciliation < 5 minutes
- ✅ Concurrent sync handles 100+ embodiments

---

## 10. OPERATIONAL METRICS

### 10.1 Key Metrics

- **Sync Latency**: Time from write to propagation
- **Sync Success Rate**: % of syncs that succeed
- **Out-of-Sync Count**: Number of embodiments out-of-sync
- **Conflict Rate**: Conflicts per 1000 syncs
- **Reconciliation Frequency**: Reconciliations per day

### 10.2 Health Indicators

| Metric | Healthy | Warning | Critical |
|--------|---------|---------|----------|
| **Sync Success Rate** | > 99% | 95-99% | < 95% |
| **Out-of-Sync Count** | 0 | 1-3 | > 3 |
| **Sync Latency (EM)** | < 2s | 2-10s | > 10s |
| **Conflict Rate** | < 1% | 1-5% | > 5% |

---

## 11. REFERENCES

**Parent Architecture**:
- `/architecture/runtime/memory/UML_OVERVIEW.md`

**Related Documents**:
- `/maturion/maturion-memory-architecture.md` (Embodiment memory definition)
- `/maturion/multi-embodiment-deployment-charter.md` (Embodiment rules)
- `/architecture/runtime/memory/KNOWLEDGE_BOUNDARIES.md` (Sync boundaries)

**Constitutional References**:
- CS5: Security (Tenant isolation during sync)
- CS6: Quality (Sync performance and testing)

---

**Status**: ✅ Architecture Complete  
**Version**: 1.0  
**Next Step**: Implement sync layer in `/lib/memory/sync/embodiment-sync.ts`

# Short-Term Memory (STM) Architecture

**Version**: 1.0  
**Status**: Constitutional (CS2 Approved Architecture)  
**Owner**: Foreman Orchestration System  
**Last Updated**: 2025-12-11  
**Tier**: Tier 1 Memory

---

## 1. PURPOSE

Short-Term Memory (STM) holds the **current conversation, active tasks, and volatile reasoning context** during an active session. It is the "working clipboard" of Maturion's consciousness.

**Key Characteristics**:
- ⏱️ **Lifetime**: Session-only (auto-expires on session end)
- 🔄 **Volatility**: Erased automatically, never persisted long-term
- 🚫 **No Cross-Session**: Cannot be recalled after session ends
- 🌍 **Scope**: Per-embodiment (not synchronized)

---

## 2. USE CASES

### 2.1 Current Conversation Context
**Example**: During a chat with Johan:
```
Johan: "Create a dashboard for project metrics"
Foreman STM holds:
- User: Johan
- Request: Dashboard creation
- Context: Active conversation
- Current step: Architecture design
```

### 2.2 Active Task Tracking
**Example**: During build wave execution:
```
STM holds:
- Wave ID: wave_5
- Tasks in progress: 3
- Current builder: UI Builder
- Status: Waiting for QA green
```

### 2.3 Temporary Reasoning State
**Example**: During multi-step analysis:
```
STM holds:
- Analysis step: 2 of 5
- Intermediate findings
- Current hypothesis
- Next action to take
```

---

## 3. DATA MODEL

### 3.1 STM Entry Schema

```typescript
interface ShortTermMemoryEntry {
  id: string                      // UUID
  tier: 'STM'
  category: STMCategory           // See below
  actor: ActorType                // foreman | builder | user | isms_runtime
  embodiment: EmbodimentType      // foreman_app | local_builder | isms_runtime
  sessionId: string               // Unique session identifier
  content: STMContent             // See below
  metadata: {
    createdAt: Date
    expiresAt: Date               // Auto-calculated: session end + 5 minutes
    priority: 'low' | 'medium' | 'high'
    volatile: true                // Always true for STM
  }
  tags?: string[]
}

type STMCategory =
  | 'conversation'                // Chat context
  | 'active_task'                 // Current task state
  | 'reasoning_state'             // Intermediate reasoning
  | 'user_input'                  // User requests
  | 'system_state'                // Current system status

interface STMContent {
  type: string                    // Specific content type
  data: any                       // Content payload (JSON-serializable)
  context?: Record<string, any>   // Additional context
}
```

### 3.2 STM Categories

#### **Conversation**
Holds active conversation context between user and embodiment.

**Example Content**:
```typescript
{
  type: 'conversation',
  data: {
    userMessage: "Create dashboard",
    foremanResponse: "Designing architecture...",
    conversationId: "conv_123",
    turnNumber: 5
  }
}
```

#### **Active Task**
Tracks currently executing tasks.

**Example Content**:
```typescript
{
  type: 'active_task',
  data: {
    taskId: "task_wave5_ui_001",
    taskType: "build_to_green",
    builder: "ui_builder",
    status: "in_progress",
    startedAt: "2025-12-11T10:00:00Z"
  }
}
```

#### **Reasoning State**
Captures intermediate reasoning during multi-step operations.

**Example Content**:
```typescript
{
  type: 'reasoning_state',
  data: {
    operation: "architecture_design",
    step: 2,
    totalSteps: 5,
    findings: ["Component A needs API", "Database schema required"],
    nextAction: "Design API contracts"
  }
}
```

#### **User Input**
Stores recent user inputs for reference during session.

**Example Content**:
```typescript
{
  type: 'user_input',
  data: {
    input: "Add loading states to dashboard",
    timestamp: "2025-12-11T10:05:00Z",
    processed: false
  }
}
```

#### **System State**
Tracks current system status.

**Example Content**:
```typescript
{
  type: 'system_state',
  data: {
    buildersActive: ["ui_builder"],
    qaStatus: "red",
    currentWave: "wave_5",
    autonomyMode: true
  }
}
```

---

## 4. LIFECYCLE

### 4.1 Creation

**When STM is Created**:
1. User starts a conversation
2. Foreman begins a task
3. Builder receives a build instruction
4. ISMS Runtime starts a risk analysis

**Creation Flow**:
```
User Action → Session Start → STM Initialized → Context Loaded
```

**API Call**:
```typescript
await storeMemory({
  tier: 'STM',
  category: 'conversation',
  actor: 'foreman',
  embodiment: 'foreman_app',
  sessionId: currentSessionId,
  content: {
    type: 'user_request',
    data: userInput
  },
  metadata: {
    priority: 'high',
    expiresAt: calculateSessionExpiry()
  }
})
```

### 4.2 Retrieval

**When STM is Retrieved**:
- During active conversation (context awareness)
- When resuming a task
- When making decisions based on current state

**Retrieval Flow**:
```
Request Context → Query STM by sessionId → Filter by category → Return entries
```

**API Call**:
```typescript
const stmEntries = await recallMemory({
  tier: 'STM',
  sessionId: currentSessionId,
  categories: ['conversation', 'active_task']
})
```

### 4.3 Expiry & Deletion

**Auto-Expiry Rules**:
1. **On Session End**: STM expires immediately when session closes
2. **Grace Period**: +5 minutes after session end (for cleanup)
3. **Max TTL**: 24 hours (absolute maximum, even if session open)

**Deletion Flow**:
```
Session End Detected → Mark STM as expired → Background cleanup (5 min later) → STM deleted
```

**Manual Deletion** (rare):
```typescript
await purgeMemory({
  tier: 'STM',
  sessionId: targetSessionId
})
```

---

## 5. STORAGE STRATEGY

### 5.1 In-Memory Storage

**Current Implementation**: File-based JSON (transient)

**Proposed Enhancement**: Redis/In-memory cache

**Rationale**:
- STM is highly transient
- High read/write frequency
- No long-term persistence needed
- Fast access required

**Storage Location**:
```
Current: /memory/stm/{sessionId}.json (auto-deleted)
Future: Redis key-value store (TTL-based)
```

### 5.2 No Cross-Session Persistence

**Rule**: STM is NEVER written to long-term storage.

**Exceptions**:
- If a conversation leads to a learning → Write to Episodic Memory (EM)
- If task completes → Write to Working Memory (WM) or EM
- If error occurs → Write to Episodic Memory for learning

**Transformation Example**:
```
STM: "User requested dashboard"
     ↓ (Task completes)
EM:  "Completed Wave 5: Dashboard implementation successful"
```

---

## 6. ORDERING & PRIORITY

### 6.1 FIFO Ordering

STM entries are ordered by creation time (FIFO: First In, First Out).

**Access Pattern**: Most recent entries accessed first.

**Example**:
```typescript
const recentSTM = await recallMemory({
  tier: 'STM',
  sessionId: currentSessionId,
  orderBy: 'createdAt',
  order: 'DESC',
  limit: 10  // Last 10 entries
})
```

### 6.2 Priority Levels

| Priority | Use Case | Retention |
|----------|----------|-----------|
| **High** | Active user input, critical task state | Keep until session end |
| **Medium** | Reasoning state, intermediate findings | Keep for current operation |
| **Low** | System logs, debug info | Can be purged early if memory pressure |

**Priority-Based Pruning**:
If STM exceeds size limit (e.g., 1000 entries), low-priority entries are pruned first.

---

## 7. SECURITY & ISOLATION

### 7.1 Session Isolation

**Rule**: STM from Session A MUST NOT be visible to Session B.

**Enforcement**:
- All STM queries require `sessionId`
- No cross-session queries allowed
- API enforces session boundary

**Violation Response**:
- Query rejected with 403 Forbidden
- Governance alert logged

### 7.2 Embodiment Scoping

**Rule**: STM is per-embodiment (not synchronized).

**Example**:
- Foreman App STM ≠ Local Builder STM
- Each embodiment maintains its own STM
- No cross-embodiment STM sharing

**Rationale**: STM is highly contextual to the current embodiment's operation.

### 7.3 No Sensitive Data

**Rule**: STM MUST NOT contain secrets, API keys, or private credentials.

**Enforcement**:
- Pre-write validation checks for secrets
- Secrets management system used instead
- STM content redacted before logging

---

## 8. INTEGRATION POINTS

### 8.1 Foreman Chat Execution

**When**: User sends a message in Foreman chat

**STM Usage**:
1. Store user input in STM
2. Load previous conversation context from STM
3. Process request with full context
4. Store Foreman's response in STM

**Code Example**:
```typescript
// In lib/foreman/chat-executor.ts
const sessionId = generateSessionId(userId)

// Store user input
await storeMemory({
  tier: 'STM',
  category: 'user_input',
  sessionId,
  content: { type: 'message', data: userMessage }
})

// Load conversation context
const context = await recallMemory({
  tier: 'STM',
  sessionId,
  categories: ['conversation', 'user_input']
})

// Process with context...
```

### 8.2 Build Wave Execution

**When**: Foreman orchestrates a build wave

**STM Usage**:
1. Store wave state in STM
2. Track active builders in STM
3. Update task status in real-time
4. On completion, migrate to Working Memory

**Code Example**:
```typescript
// In lib/foreman/run-build-wave.ts
const waveSessionId = `wave_${waveId}`

// Store wave state
await storeMemory({
  tier: 'STM',
  category: 'active_task',
  sessionId: waveSessionId,
  content: {
    type: 'wave_execution',
    data: { waveId, tasks, status: 'in_progress' }
  }
})

// Update in real-time as tasks complete
await updateMemory({
  tier: 'STM',
  sessionId: waveSessionId,
  content: { status: 'completed', completedTasks: 12 }
})

// On completion, write to WM
await storeMemory({
  tier: 'WM',
  content: { waveId, outcome: 'success', duration: '45min' }
})

// STM auto-expires after session
```

### 8.3 ISMS Runtime Analysis

**When**: ISMS Runtime AI performs risk analysis

**STM Usage**:
1. Store analysis steps in STM
2. Track reasoning process
3. Hold intermediate findings
4. On completion, persist to Episodic Memory

---

## 9. ERROR HANDLING

### 9.1 STM Storage Failure

**Scenario**: Failed to write STM entry

**Response**:
1. Log error to console
2. Continue operation (STM is non-critical)
3. Degrade to stateless operation if needed

**Rationale**: STM failure should not block operations.

### 9.2 STM Retrieval Failure

**Scenario**: Failed to load STM context

**Response**:
1. Log error
2. Return empty context
3. Continue with reduced context awareness

**Rationale**: Missing STM context is recoverable.

### 9.3 Session ID Collision

**Scenario**: Two sessions with same ID (rare)

**Response**:
1. Generate new session ID with collision-resistant UUID
2. Log incident to governance memory
3. Alert system administrator

---

## 10. TESTING STRATEGY

### 10.1 Functional Tests

**Test Cases**:
- ✅ STM creation during session start
- ✅ STM retrieval by session ID
- ✅ STM auto-expiry after session end
- ✅ STM ordering (FIFO)
- ✅ STM priority-based pruning
- ✅ Session isolation (no cross-session leaks)

### 10.2 Integration Tests

**Test Cases**:
- ✅ Foreman chat with STM context
- ✅ Build wave execution with STM tracking
- ✅ STM migration to WM/EM on task completion

### 10.3 Performance Tests

**Test Cases**:
- ✅ STM write latency < 10ms
- ✅ STM read latency < 5ms
- ✅ STM handles 1000+ entries per session
- ✅ Background cleanup < 1s

---

## 11. OPERATIONAL METRICS

### 11.1 Key Metrics

- **STM Entry Count**: Total STM entries per session
- **Average Session Duration**: How long STM is active
- **Expiry Rate**: Percentage of STM entries auto-expired
- **Retrieval Frequency**: How often STM is queried per session

### 11.2 Health Indicators

| Metric | Healthy | Warning | Critical |
|--------|---------|---------|----------|
| **STM Write Latency** | < 10ms | 10-50ms | > 50ms |
| **STM Read Latency** | < 5ms | 5-20ms | > 20ms |
| **Session Count** | < 100 | 100-500 | > 500 |
| **Memory Usage** | < 50MB | 50-200MB | > 200MB |

---

## 12. FUTURE ENHANCEMENTS

### 12.1 Redis-Based Storage

**Benefit**: Faster access, better TTL management, distributed support

**Implementation**:
- Migrate from file-based to Redis
- Use Redis TTL for auto-expiry
- Support multi-instance deployment

### 12.2 Real-Time STM Streaming

**Benefit**: Live updates to UI dashboards

**Implementation**:
- WebSocket connection for STM changes
- Real-time task progress updates
- Live conversation display

### 12.3 STM Analytics

**Benefit**: Understand session patterns

**Metrics**:
- Average session length
- Most common STM categories
- Peak STM usage times

---

## 13. REFERENCES

**Parent Architecture**:
- `/architecture/runtime/memory/UML_OVERVIEW.md`

**Related Documents**:
- `/maturion/maturion-memory-architecture.md` (Tier 1 definition)
- `/foreman/governance/memory-rules.md` (STM operational rules)

**Constitutional References**:
- CS1: Immutability (STM is volatile, not immutable)
- CS5: Security (Session isolation enforced)
- CS6: Quality (Comprehensive testing required)

---

**Status**: ✅ Architecture Complete  
**Version**: 1.0  
**Next Step**: Implement `/lib/db/memory.ts` with STM support

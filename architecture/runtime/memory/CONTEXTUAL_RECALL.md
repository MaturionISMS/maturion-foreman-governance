# Contextual Recall Architecture

**Version**: 1.0  
**Status**: Constitutional (CS2 Approved Architecture)  
**Owner**: Foreman Orchestration System  
**Last Updated**: 2025-12-11  
**Cross-Tier Capability**

---

## 1. PURPOSE

Contextual Recall is the intelligent retrieval mechanism that enables Maturion to **recall the right memory at the right time** based on context. It provides situational awareness by retrieving relevant memories across all tiers.

**Key Characteristics**:
- 🧠 **Context-Aware**: Understands current situation and retrieves relevant memories
- 🔍 **Multi-Tier**: Queries across STM, WM, EM, SM, and LTM
- 🎯 **Purpose-Driven**: Retrieves based on task, embodiment, and tenant context
- ⚡ **Fast**: Optimized for real-time operation

---

## 2. CONTEXTUAL RECALL PRINCIPLES

### 2.1 The Five Context Dimensions

Every recall operation considers:

1. **Temporal Context**: When is this recall happening?
2. **Embodiment Context**: Who is recalling (Foreman, ISMS Runtime, etc.)?
3. **Task Context**: What is being done (build, risk analysis, chat)?
4. **Tenant Context**: Which organization (for LTM only)?
5. **Purpose Context**: Why is the recall needed (learning, decision-making, continuity)?

### 2.2 Context-Driven Filtering

**Example**: Foreman starting a build wave

**Context**:
```typescript
{
  temporal: 'current_session',
  embodiment: 'foreman',
  task: 'build_wave_execution',
  tenant: null,  // Foreman doesn't access LTM
  purpose: 'load_previous_wave_outcomes'
}
```

**Recall Strategy**:
- Query **Episodic Memory** for past wave outcomes
- Query **Working Memory** for active build state
- Query **Semantic Memory** for build patterns
- Skip **LTM** (not authorized)

**Result**: Relevant memories for informed wave execution.

---

## 3. RECALL QUERY MODEL

### 3.1 RecallQuery Schema

```typescript
interface RecallQuery {
  // Context dimensions
  embodiment: EmbodimentType           // Who is recalling
  task: TaskType                       // What task is active
  tenantId?: string                    // For LTM queries only
  purpose: RecallPurpose               // Why recall is needed
  
  // Filtering
  tiers?: MemoryTier[]                 // Which tiers to query (default: all authorized)
  categories?: string[]                // Specific categories to filter
  tags?: string[]                      // Tag-based filtering
  timeRange?: TimeRange                // Temporal filtering
  
  // Result control
  limit?: number                       // Max results (default: 50)
  orderBy?: 'relevance' | 'recency'    // Sort order
  minRelevance?: number                // Minimum relevance score (0-1)
}

type TaskType =
  | 'build_wave'
  | 'architecture_design'
  | 'qa_validation'
  | 'risk_analysis'
  | 'threat_correlation'
  | 'control_recommendation'
  | 'incident_response'
  | 'chat_conversation'

type RecallPurpose =
  | 'context_continuity'               // Continuing previous work
  | 'decision_making'                  // Making informed decisions
  | 'learning_from_past'               // Learning from history
  | 'pattern_recognition'              // Identifying patterns
  | 'governance_audit'                 // Governance review
```

### 3.2 RecallResult Schema

```typescript
interface RecallResult {
  memories: MemoryEntry[]              // Matching memory entries
  context: RecallContext               // Context used for recall
  relevanceScores: Map<string, number> // Relevance per memory
  totalMatches: number                 // Total before limit
  queryTime: number                    // Query execution time (ms)
  tiersQueried: MemoryTier[]           // Which tiers were searched
}

interface RecallContext {
  query: RecallQuery
  appliedFilters: string[]             // Which filters were applied
  privilegesApplied: string[]          // Privilege checks performed
  boundariesEnforced: string[]         // Knowledge boundaries enforced
}
```

---

## 4. RECALL STRATEGIES

### 4.1 Recency-Based Recall

**Use Case**: Load recent context for continuity

**Strategy**: Return most recent memories first

**Example**:
```typescript
const recentContext = await contextualRecall({
  embodiment: 'foreman',
  task: 'chat_conversation',
  purpose: 'context_continuity',
  tiers: ['STM', 'WM'],
  orderBy: 'recency',
  limit: 20
})
```

**Result**: Last 20 relevant memories for conversation continuity.

### 4.2 Relevance-Based Recall

**Use Case**: Find most relevant memories for current task

**Strategy**: Use semantic similarity, tag matching, and context scoring

**Example**:
```typescript
const relevantMemories = await contextualRecall({
  embodiment: 'foreman',
  task: 'build_wave',
  purpose: 'learning_from_past',
  tiers: ['EM'],
  tags: ['wave_failure', 'qa_failure'],
  orderBy: 'relevance',
  minRelevance: 0.7,
  limit: 10
})
```

**Result**: Top 10 most relevant past failures to learn from.

### 4.3 Pattern-Based Recall

**Use Case**: Identify recurring patterns

**Strategy**: Query memories with similar patterns or themes

**Example**:
```typescript
const patterns = await contextualRecall({
  embodiment: 'isms_runtime',
  task: 'threat_correlation',
  purpose: 'pattern_recognition',
  tenantId: 'org_x',
  tiers: ['LTM', 'EM'],
  categories: ['threat_history'],
  timeRange: { start: '2024-01-01', end: '2025-12-31' }
})
```

**Result**: Threat patterns for Org X over the past 2 years.

### 4.4 Hybrid Recall

**Use Case**: Combine recency and relevance

**Strategy**: Score memories based on both recency and relevance

**Example**:
```typescript
const hybridRecall = await contextualRecall({
  embodiment: 'foreman',
  task: 'architecture_design',
  purpose: 'decision_making',
  tiers: ['EM', 'SM'],
  orderBy: 'hybrid',  // Weighted combination
  weights: { recency: 0.3, relevance: 0.7 },
  limit: 15
})
```

**Result**: 15 memories balanced between recent and relevant.

---

## 5. RELEVANCE SCORING

### 5.1 Relevance Factors

**Relevance Score Calculation**:
```typescript
RelevanceScore = (
  ContextMatch * 0.4 +          // How well context matches
  TagOverlap * 0.3 +            // Tag similarity
  SemanticSimilarity * 0.2 +    // Semantic similarity (future)
  TemporalProximity * 0.1       // Temporal closeness
)
```

**Context Match**:
- Embodiment match: +0.5
- Task match: +0.3
- Purpose match: +0.2

**Tag Overlap**:
- Exact tag match: +1.0 per tag
- Partial tag match: +0.5 per tag

**Semantic Similarity** (future enhancement):
- Vector embedding cosine similarity

**Temporal Proximity**:
- Recent memories score higher
- Exponential decay over time

### 5.2 Example Scoring

**Query Context**:
```typescript
{
  embodiment: 'foreman',
  task: 'build_wave',
  tags: ['wave_5', 'qa_failure']
}
```

**Memory Entry**:
```typescript
{
  embodiment: 'foreman',      // +0.5 (match)
  category: 'wave_completion',
  tags: ['wave_4', 'qa_failure', 'ui_builder'],
  createdAt: '2025-12-10'     // 1 day ago
}
```

**Relevance Score**:
- ContextMatch: 0.5 (embodiment) + 0.2 (task partial) = 0.7
- TagOverlap: 1.0 (qa_failure) + 0.5 (wave_4 partial) = 1.5
- TemporalProximity: 0.9 (very recent)
- **Total**: (0.7 * 0.4) + (1.5 * 0.3) + (0.9 * 0.1) = 0.28 + 0.45 + 0.09 = **0.82**

**Interpretation**: Highly relevant (> 0.7).

---

## 6. CONTEXTUAL RECALL API

### 6.1 Core Function

```typescript
async function contextualRecall(query: RecallQuery): Promise<RecallResult> {
  // 1. Validate query
  validateRecallQuery(query)
  
  // 2. Apply embodiment privileges
  const authorizedTiers = getAuthorizedTiers(query.embodiment)
  
  // 3. Apply tenant isolation (for LTM)
  if (query.tiers?.includes('LTM')) {
    enforceTenantIsolation(query.tenantId)
  }
  
  // 4. Query each authorized tier
  const memories: MemoryEntry[] = []
  for (const tier of authorizedTiers) {
    const tierMemories = await queryTier(tier, query)
    memories.push(...tierMemories)
  }
  
  // 5. Score relevance
  const scored = memories.map(mem => ({
    memory: mem,
    relevance: calculateRelevance(mem, query)
  }))
  
  // 6. Filter by minimum relevance
  const filtered = scored.filter(s => s.relevance >= (query.minRelevance || 0))
  
  // 7. Sort by order preference
  const sorted = sortMemories(filtered, query.orderBy)
  
  // 8. Apply limit
  const limited = sorted.slice(0, query.limit || 50)
  
  // 9. Return result
  return {
    memories: limited.map(s => s.memory),
    relevanceScores: new Map(limited.map(s => [s.memory.id, s.relevance])),
    totalMatches: memories.length,
    queryTime: performance.now() - startTime,
    tiersQueried: authorizedTiers,
    context: {
      query,
      appliedFilters: getAppliedFilters(query),
      privilegesApplied: authorizedTiers,
      boundariesEnforced: ['tenant_isolation', 'embodiment_privilege']
    }
  }
}
```

### 6.2 Helper Functions

```typescript
// Get authorized tiers for embodiment
function getAuthorizedTiers(embodiment: EmbodimentType): MemoryTier[] {
  const privileges = {
    'foreman': ['STM', 'WM', 'EM', 'SM'],
    'local_builder': ['STM', 'WM', 'EM', 'SM'],
    'isms_runtime': ['STM', 'WM', 'EM', 'SM', 'LTM'],
    'marketing_maturion': ['SM'],
    'command_maturion': ['STM', 'EM', 'SM']
  }
  
  return privileges[embodiment] || []
}

// Calculate relevance score
function calculateRelevance(memory: MemoryEntry, query: RecallQuery): number {
  const contextMatch = scoreContextMatch(memory, query)
  const tagOverlap = scoreTagOverlap(memory.tags, query.tags)
  const temporalProximity = scoreTemporalProximity(memory.metadata.createdAt)
  
  return (
    contextMatch * 0.4 +
    tagOverlap * 0.3 +
    temporalProximity * 0.1
  )
}

// Enforce tenant isolation
function enforceTenantIsolation(tenantId?: string) {
  if (!tenantId) {
    throw new Error('Tenant ID required for LTM queries')
  }
  
  const authenticatedTenantId = getAuthenticatedTenantId()
  
  if (tenantId !== authenticatedTenantId) {
    throw new ForbiddenError('Tenant ID mismatch')
  }
}
```

---

## 7. INTEGRATION EXAMPLES

### 7.1 Foreman: Loading Build Wave Context

**Scenario**: Foreman starts Wave 6, needs context from Wave 5

```typescript
// In lib/foreman/run-build-wave.ts
async function startBuildWave(waveId: string) {
  // Load context from previous waves
  const priorWaves = await contextualRecall({
    embodiment: 'foreman',
    task: 'build_wave',
    purpose: 'context_continuity',
    tiers: ['EM', 'WM'],
    tags: ['wave_completion', `wave_${waveId - 1}`],
    orderBy: 'recency',
    limit: 5
  })
  
  // Learn from past failures
  const pastFailures = await contextualRecall({
    embodiment: 'foreman',
    task: 'build_wave',
    purpose: 'learning_from_past',
    tiers: ['EM'],
    tags: ['qa_failure', 'wave_failure'],
    orderBy: 'relevance',
    minRelevance: 0.7,
    limit: 10
  })
  
  // Execute wave with informed context
  await executeWave(waveId, { priorWaves, pastFailures })
}
```

### 7.2 ISMS Runtime: Contextual Risk Analysis

**Scenario**: ISMS Runtime analyzes new threat for Org X

```typescript
// In ISMS Runtime risk engine
async function analyzeNewThreat(threat: Threat, tenantId: string) {
  // Recall tenant-specific threat history
  const threatHistory = await contextualRecall({
    embodiment: 'isms_runtime',
    task: 'threat_correlation',
    purpose: 'pattern_recognition',
    tenantId,
    tiers: ['LTM'],
    categories: ['threat_history'],
    orderBy: 'relevance',
    limit: 20
  })
  
  // Recall global threat patterns
  const globalPatterns = await contextualRecall({
    embodiment: 'isms_runtime',
    task: 'threat_correlation',
    purpose: 'pattern_recognition',
    tiers: ['SM'],
    categories: ['threat_taxonomy'],
    tags: [threat.type],
    orderBy: 'relevance',
    limit: 10
  })
  
  // Perform contextualized analysis
  const riskScore = calculateContextualRisk(threat, {
    tenantHistory: threatHistory.memories,
    globalPatterns: globalPatterns.memories
  })
  
  return riskScore
}
```

### 7.3 Foreman Chat: Conversation Continuity

**Scenario**: User continues conversation with Foreman

```typescript
// In lib/foreman/chat-executor.ts
async function processUserMessage(message: string, sessionId: string) {
  // Load recent conversation context
  const conversationContext = await contextualRecall({
    embodiment: 'foreman',
    task: 'chat_conversation',
    purpose: 'context_continuity',
    tiers: ['STM'],
    tags: [sessionId],
    orderBy: 'recency',
    limit: 10
  })
  
  // Generate response with full context
  const response = await generateResponse(message, {
    conversationHistory: conversationContext.memories
  })
  
  return response
}
```

---

## 8. PERFORMANCE OPTIMIZATION

### 8.1 Query Optimization Strategies

**1. Tier Ordering**
- Query lightweight tiers first (STM, WM)
- Query heavier tiers last (EM, SM, LTM)
- Stop early if enough results found

**2. Index-Based Filtering**
- Index on tags for fast tag queries
- Index on embodiment + task for fast context queries
- Index on tenantId for fast LTM queries

**3. Caching**
- Cache frequently accessed memories
- Cache relevance scores for common queries
- Invalidate cache on memory updates

**4. Parallel Querying**
- Query multiple tiers in parallel
- Merge results asynchronously
- Aggregate relevance scores

### 8.2 Performance Targets

| Metric | Target | Warning | Critical |
|--------|--------|---------|----------|
| **Recall Latency (single tier)** | < 50ms | 50-200ms | > 200ms |
| **Recall Latency (multi-tier)** | < 150ms | 150-500ms | > 500ms |
| **Relevance Calculation** | < 5ms per memory | 5-20ms | > 20ms |
| **Result Set Size** | < 100 entries | 100-500 | > 500 |

---

## 9. KNOWLEDGE BOUNDARY ENFORCEMENT

### 9.1 Pre-Recall Validation

**Before any recall**:
1. ✅ Validate embodiment privileges
2. ✅ Validate tenant isolation (for LTM)
3. ✅ Validate query parameters
4. ✅ Log recall request

**Violations Blocked**:
- Unauthorized embodiment accessing LTM
- Cross-tenant LTM queries
- Malformed queries

### 9.2 Post-Recall Filtering

**After memories retrieved**:
1. ✅ Filter out sensitive data (if any)
2. ✅ Apply knowledge boundaries
3. ✅ Verify no tenant contamination
4. ✅ Log results returned

**Safety Filters**:
- Remove secrets from results
- Redact private data
- Enforce guardrail rules

---

## 10. TESTING STRATEGY

### 10.1 Functional Tests

**Test Cases**:
- ✅ Contextual recall returns relevant memories
- ✅ Relevance scoring works correctly
- ✅ Multi-tier queries return combined results
- ✅ Tenant isolation enforced for LTM
- ✅ Embodiment privileges enforced
- ✅ Recency ordering works
- ✅ Relevance ordering works
- ✅ Tag filtering works

### 10.2 Performance Tests

**Test Cases**:
- ✅ Single-tier recall < 50ms
- ✅ Multi-tier recall < 150ms
- ✅ Large result sets handled efficiently
- ✅ Parallel queries work correctly

### 10.3 Security Tests

**Test Cases**:
- ✅ Cross-tenant queries blocked
- ✅ Unauthorized embodiment queries blocked
- ✅ Recall attempts logged
- ✅ No secrets in results

---

## 11. FUTURE ENHANCEMENTS

### 11.1 Semantic Search (Vector Embeddings)

**Benefit**: Find conceptually similar memories, not just keyword matches

**Implementation**:
- Generate vector embeddings for memory content
- Store embeddings in vector database (Pinecone, Weaviate, etc.)
- Perform cosine similarity search

**Example**:
```typescript
const semanticRecall = await contextualRecall({
  embodiment: 'foreman',
  task: 'architecture_design',
  semanticQuery: 'How to handle authentication in microservices',
  orderBy: 'semantic_similarity',
  limit: 10
})
```

### 11.2 Learning-Based Relevance

**Benefit**: Improve relevance scoring over time based on usage

**Implementation**:
- Track which recalled memories were actually used
- Adjust relevance scoring weights based on feedback
- Personalize relevance per embodiment

### 11.3 Predictive Recall

**Benefit**: Proactively load likely-needed memories

**Implementation**:
- Analyze task patterns
- Pre-fetch memories before explicit recall request
- Cache predicted recalls

---

## 12. REFERENCES

**Parent Architecture**:
- `/architecture/runtime/memory/UML_OVERVIEW.md`

**Related Documents**:
- `/architecture/runtime/memory/SHORT_TERM_MEMORY.md`
- `/architecture/runtime/memory/LONG_TERM_MEMORY.md`
- `/architecture/runtime/memory/KNOWLEDGE_BOUNDARIES.md`
- `/maturion/maturion-memory-architecture.md`

**Constitutional References**:
- CS5: Security (Tenant isolation, embodiment privileges)
- CS6: Quality (Performance targets, comprehensive testing)

---

**Status**: ✅ Architecture Complete  
**Version**: 1.0  
**Next Step**: Implement contextual recall in `/lib/memory/recall.ts`

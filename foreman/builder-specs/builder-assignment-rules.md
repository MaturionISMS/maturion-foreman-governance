# Builder Assignment Rules

## Hybrid Builder Architecture

Foreman has the discretion to select between multiple builder implementations based on task characteristics, system availability, and cost optimization. This document defines the selection logic for choosing between **GitHub Copilot Builder** and **Local Builder Agent**.

## Builder Options

### GitHub Copilot Builder

**Characteristics**:
- Cloud-hosted, managed by GitHub
- Fast for small, incremental changes
- Lower latency for simple tasks
- Subject to rate limiting/throttling
- Best for well-defined, bounded tasks

**Advantages**:
- No local infrastructure required
- Automatic scaling
- Low-latency responses for small tasks
- Integrated with GitHub platform

**Limitations**:
- May be throttled under high load
- Not optimal for large, multi-file operations
- External dependency (requires GitHub API availability)

### Local Builder Agent

**Characteristics**:
- Self-hosted on Maturion infrastructure
- Handles complex, multi-file operations
- Deep refactoring and architectural changes
- PDF processing and document workflows
- Heavy architecture-wide operations

**Advantages**:
- No external rate limits
- Full control over execution environment
- Better for complex, long-running tasks
- Can access local resources and tools

**Limitations**:
- Requires local infrastructure/hosting
- May have higher latency for simple tasks
- Infrastructure maintenance overhead

## Builder Selection Logic

Foreman selects a builder based on the following decision tree:

### 1. Task Characteristics Analysis

Foreman evaluates each task across these dimensions:

- **Scope**: Number of files affected
- **Complexity**: Depth of changes (simple edits vs. architectural refactors)
- **Risk**: Potential for breaking changes
- **Dependencies**: Cross-module/cross-file dependencies

### 2. Selection Rules

**Use GitHub Copilot Builder when:**

1. **Task is small/incremental**
   - Single file or small set of files (< 5 files)
   - Simple CRUD operations
   - Adding a single component or endpoint
   - Documentation updates

2. **Low-risk changes**
   - No breaking changes to APIs
   - Isolated to single module
   - Well-defined requirements

3. **System availability**
   - Repository is online and accessible
   - Copilot is not currently throttled
   - GitHub API is responsive

**Use Local Builder Agent when:**

1. **Task touches many files**
   - Multi-file refactoring (> 5 files)
   - Cross-module changes
   - Architectural restructuring

2. **Deep refactors**
   - Renaming patterns across codebase
   - Type system migrations
   - Database schema changes with cascading updates

3. **PDF/complex workflows**
   - Document generation or processing
   - Report generation with templates
   - Multi-step data transformations

4. **Heavy architecture-wide operations**
   - Migration to new framework version
   - Dependency upgrades affecting many files
   - Performance optimization across modules

5. **Copilot unavailable**
   - GitHub Copilot is throttled or rate-limited
   - GitHub API experiencing issues
   - Reliability concerns with external dependency

### 3. Fallback Logic

**If Local Builder is unreachable:**
- **Fallback to**: GitHub Copilot Builder
- **Caveat**: May split large tasks into smaller Copilot-compatible chunks
- **Log**: "Local builder unavailable, falling back to Copilot"

**If GitHub Copilot is throttled:**
- **Prefer**: Local Builder Agent
- **Caveat**: Route simple tasks to local builder even if not optimal
- **Log**: "Copilot throttled, routing to local builder"

**If BOTH builders are unavailable:**
- **Action**: Foreman must:
  1. **Log the failure**: Detailed error with timestamp and affected task
  2. **Return "degraded mode" message**: Surface in API status endpoint
  3. **Halt the affected wave**: Do not attempt to proceed
  4. **Notify**: Report to monitoring/alerting if configured

Example degraded mode response:
```json
{
  "status": "degraded",
  "message": "All builders unavailable",
  "details": {
    "copilotStatus": "throttled",
    "localBuilderStatus": "unreachable",
    "affectedWave": "wave-3.3",
    "timestamp": "2024-01-15T10:30:00Z"
  }
}
```

## Cost and Efficiency Optimization

Foreman is responsible for selecting the most effective builder while:

1. **Minimizing cost**
   - Prefer local builder for large tasks (fewer API calls to Copilot)
   - Use Copilot for quick, simple tasks (no local infrastructure overhead)

2. **Respecting QA-compliance gates**
   - Both builders must produce QA-validated outputs
   - Selection does not bypass quality requirements
   - Failed QA causes task retry, potentially with different builder

3. **Optimizing throughput**
   - Route tasks to available builder to minimize wait times
   - Balance load across builders if both available
   - Prefer faster builder for time-sensitive tasks

## Builder Capability Parity

Both builders must support the same core capabilities:

- **UI Building**: React components, pages, layouts
- **API Building**: Endpoints, services, middleware
- **Schema Building**: Types, schemas, migrations
- **Integration Building**: External API clients, webhooks
- **QA Building**: Tests, validation, quality checks

**Note**: If a builder does not support a specific capability, Foreman must route to the builder that does, regardless of other selection criteria.

## Monitoring and Feedback

Foreman logs all builder selection decisions:

```json
{
  "task": "create-dashboard-component",
  "selectedBuilder": "copilot",
  "reason": "Small task, Copilot available",
  "fallbackConsidered": false,
  "timestamp": "2024-01-15T10:30:00Z"
}
```

This enables:
- Analyzing builder selection patterns
- Identifying throttling/availability issues
- Optimizing selection logic over time
- Validating cost efficiency

## Future Enhancements

Potential future improvements to builder selection:

1. **ML-based selection**: Learn optimal builder for task types over time
2. **Load balancing**: Distribute tasks across multiple local builders
3. **Predictive throttling**: Anticipate Copilot rate limits and route proactively
4. **Cost tracking**: Monitor actual costs per builder and optimize
5. **Performance benchmarks**: Track builder speed and quality metrics

---

*This document defines Foreman's logic for selecting between GitHub Copilot Builder and Local Builder Agent to optimize for speed, cost, and reliability while maintaining QA standards.*

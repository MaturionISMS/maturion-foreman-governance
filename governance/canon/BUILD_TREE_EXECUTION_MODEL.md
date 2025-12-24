# BUILD TREE & HIERARCHICAL EXECUTION MODEL

## Status
Canonical Governance Standard  
Version: v1.0  
Authority: Johan Ras  
Applies To: All Maturion Applications, Foreman (FM), Builders, Wave Execution Systems  

---

## 1. Purpose

This document defines the **canonical hierarchical structure of builds** within the Maturion ecosystem, establishing how work is organized, executed, monitored, and controlled across multiple levels of abstraction.

The build tree model provides:

- **Clear execution hierarchy** from application-level intent down to atomic implementation steps
- **Explicit authority boundaries** at each level of the tree
- **Predictable status roll-up semantics** from leaf nodes to root
- **Isolation and independence** rules preventing cross-contamination
- **Emergency control** mechanisms at appropriate granularity levels
- **Dependency resolution** and execution ordering within and across levels

**Foundational Principle**: The build tree is a **governance-controlled execution structure**, not an implementation detail. All build execution MUST conform to this hierarchical model.

---

## 2. Core Definitions

### 2.1 Build Tree

The **Build Tree** is the hierarchical structure representing all work to be executed for an application, organized into progressively finer-grained execution scopes.

**Characteristics**:
- Each node in the tree represents an **execution scope**
- Parent nodes aggregate child node status and outcomes
- Each node may be independently controlled (blocked, paused, emergency-stopped)
- Execution flows from root to leaves (planning) and leaves to root (status reporting)

### 2.2 Execution Scope

An **Execution Scope** is a discrete unit of work at any level in the build tree that:
- Has defined entry and exit criteria
- Maintains its own execution state
- Reports status to its parent
- Can be independently blocked or controlled
- Contains zero or more child scopes

### 2.3 Node Types

The build tree consists of four canonical node types, each representing a distinct level of execution scope:

1. **Application Node** (Root Level)
2. **Wave Node** (Strategic Level)
3. **Sub-Wave Node** (Tactical Level)
4. **Step Node** (Atomic Level)

---

## 3. Hierarchical Structure

### 3.1 Build Tree Hierarchy

```
Application (Root)
├── Wave 1 (Strategic Phase)
│   ├── Sub-Wave 1.1 (Tactical Group)
│   │   ├── Step 1.1.1 (Atomic Task)
│   │   ├── Step 1.1.2 (Atomic Task)
│   │   └── Step 1.1.3 (Atomic Task)
│   ├── Sub-Wave 1.2 (Tactical Group)
│   │   ├── Step 1.2.1 (Atomic Task)
│   │   └── Step 1.2.2 (Atomic Task)
│   └── Sub-Wave 1.3 (Tactical Group)
│       └── Step 1.3.1 (Atomic Task)
├── Wave 2 (Strategic Phase)
│   ├── Sub-Wave 2.1 (Tactical Group)
│   │   ├── Step 2.1.1 (Atomic Task)
│   │   └── Step 2.1.2 (Atomic Task)
│   └── Sub-Wave 2.2 (Tactical Group)
│       ├── Step 2.2.1 (Atomic Task)
│       ├── Step 2.2.2 (Atomic Task)
│       └── Step 2.2.3 (Atomic Task)
└── Wave 3 (Strategic Phase)
    └── Sub-Wave 3.1 (Tactical Group)
        └── Step 3.1.1 (Atomic Task)
```

### 3.2 Level Characteristics

#### Level 1: Application (Root)

**Definition**: The complete application being built or upgraded.

**Scope**: All work required to deliver the application.

**Characteristics**:
- Single root node per application
- Contains all waves for the application
- Represents the top-level delivery commitment
- Reports overall application build status to human authority

**Examples**: 
- Foreman App (complete application)
- Builder Service (complete application)
- Memory Fabric (complete subsystem)

#### Level 2: Wave (Strategic Phase)

**Definition**: A strategic phase of work representing a major functional or architectural milestone.

**Scope**: Related functionality that can be planned, executed, and validated as a coherent unit.

**Characteristics**:
- Zero or more waves per application
- Waves are sequentially ordered or may have dependency relationships
- Each wave has clear entry and exit criteria
- Waves may execute in parallel if no dependencies exist
- Wave completion represents a meaningful milestone

**Examples**:
- Wave 0: Foundation & Infrastructure
- Wave 1: Core Domain Logic
- Wave 2: Integration & APIs
- Wave 3: UI & User Experience
- Wave 4: Performance & Optimization

#### Level 3: Sub-Wave (Tactical Group)

**Definition**: A tactical grouping of related atomic tasks within a wave.

**Scope**: A coherent set of steps that accomplish a specific sub-goal within the wave.

**Characteristics**:
- One or more sub-waves per wave
- Sub-waves group related steps for organizational clarity
- Sub-waves may execute in parallel within a wave if no dependencies exist
- Sub-wave boundaries define logical checkpoints
- Sub-waves enable finer-grained progress tracking

**Examples**:
- Sub-Wave 1.1: Database Schema & Models
- Sub-Wave 1.2: Core Business Logic
- Sub-Wave 1.3: Domain Event Handlers
- Sub-Wave 2.1: REST API Endpoints
- Sub-Wave 2.2: GraphQL API Layer

#### Level 4: Step (Atomic Task)

**Definition**: The smallest indivisible unit of work in the build tree.

**Scope**: A single, atomic task that is either complete or not complete.

**Characteristics**:
- Leaf nodes in the build tree (no children)
- Each step represents one discrete implementation task
- Steps are assigned to builders for execution
- Steps follow the Architecture → Red QA → Build-to-Green → Validate workflow
- Steps may not be partially complete (atomic completion semantics)

**Examples**:
- Step 1.1.1: Implement User model with validation
- Step 1.1.2: Create database migration for users table
- Step 1.2.1: Implement authentication service
- Step 1.2.2: Add authorization middleware
- Step 2.1.1: Create /api/users GET endpoint

---

## 4. Execution States

### 4.1 Node State Model

Every node in the build tree maintains an execution state:

#### Canonical Execution States

1. **NOT_STARTED**
   - Node has not begun execution
   - Waiting for dependencies or explicit start authorization
   - No resources allocated

2. **READY**
   - Node dependencies satisfied
   - Entry criteria met
   - Ready to begin execution
   - Awaiting execution slot or authorization

3. **IN_PROGRESS**
   - Node is actively executing
   - Resources allocated
   - Child nodes (if any) are being processed
   - Status updates flowing to parent

4. **BLOCKED**
   - Node execution cannot proceed
   - Blocked by dependency failure, resource constraint, or governance gate
   - Requires intervention to unblock
   - No forward progress possible

5. **PAUSED**
   - Node execution temporarily suspended
   - May resume when authorized
   - Resources may be deallocated
   - Distinct from BLOCKED (suspension is intentional, not failure)

6. **COMPLETED**
   - Node execution successfully finished
   - All exit criteria satisfied
   - All child nodes (if any) completed successfully
   - Immutable terminal state (for this execution)

7. **FAILED**
   - Node execution terminated with failure
   - Exit criteria not satisfied
   - One or more child nodes (if any) failed
   - Requires remediation or rollback

8. **EMERGENCY_STOPPED**
   - Node execution immediately halted due to emergency condition
   - Emergency stop authority invoked (see Section 8)
   - Requires investigation and explicit authorization to resume
   - Distinct from FAILED (emergency stop is protective, not outcome)

### 4.2 State Transition Rules

**Allowed Transitions**:

```
NOT_STARTED → READY         (dependencies satisfied)
READY → IN_PROGRESS         (execution begins)
IN_PROGRESS → PAUSED        (intentional suspension)
IN_PROGRESS → BLOCKED       (blocking condition detected)
IN_PROGRESS → COMPLETED     (success)
IN_PROGRESS → FAILED        (failure)
IN_PROGRESS → EMERGENCY_STOPPED (emergency condition)
PAUSED → IN_PROGRESS        (resume authorized)
PAUSED → EMERGENCY_STOPPED  (emergency condition)
BLOCKED → IN_PROGRESS       (unblocked and resumed)
BLOCKED → FAILED            (permanent failure, cannot unblock)
BLOCKED → EMERGENCY_STOPPED (emergency condition)
EMERGENCY_STOPPED → READY   (investigation complete, clear to restart)
EMERGENCY_STOPPED → FAILED  (emergency revealed permanent failure)
```

**Forbidden Transitions**:
- Any transition from COMPLETED (immutable terminal state)
- Any transition from FAILED (immutable terminal state) except via rollback/retry (new execution instance)
- Direct transition from NOT_STARTED to IN_PROGRESS (must pass through READY)

### 4.3 State Inheritance and Isolation

**Isolation Principle**: Each node maintains its own execution state independently.

**Parent State Does NOT Automatically Cascade to Children**:
- Parent in PAUSED does not force children to PAUSED
- Parent in BLOCKED does not force children to BLOCKED
- Parent in EMERGENCY_STOPPED does not force children to EMERGENCY_STOPPED (unless emergency scope includes children)

**Child State DOES Influence Parent State** (Roll-up Semantics, see Section 5)

---

## 5. Status Roll-Up Semantics

### 5.1 Roll-Up Principle

**Parent nodes reflect the aggregate state of their children**, following canonical roll-up rules.

**Critical Invariant**: Parent state is **derived** from child states, not independently set (except for direct state transitions like PAUSED or EMERGENCY_STOPPED applied to parent explicitly).

### 5.2 Roll-Up Rules by State

#### Rule 1: NOT_STARTED Roll-Up

**Parent is NOT_STARTED if and only if:**
- All children are NOT_STARTED

**Implication**: As soon as any child begins (moves to READY or IN_PROGRESS), parent must also advance.

#### Rule 2: READY Roll-Up

**Parent is READY if:**
- At least one child is READY
- No child is IN_PROGRESS
- No child is BLOCKED, FAILED, or EMERGENCY_STOPPED

**Implication**: Parent becomes READY when children are ready but none are actively executing yet.

#### Rule 3: IN_PROGRESS Roll-Up

**Parent is IN_PROGRESS if:**
- At least one child is IN_PROGRESS
- No child is FAILED or EMERGENCY_STOPPED (failure states take precedence)

**Implication**: Parent remains IN_PROGRESS as long as any child is actively executing.

#### Rule 4: BLOCKED Roll-Up

**Parent is BLOCKED if:**
- At least one child is BLOCKED
- No child is FAILED or EMERGENCY_STOPPED (failure states take precedence)

**Implication**: Parent reflects blocked state when any child is blocked (worst non-terminal state).

#### Rule 5: PAUSED Roll-Up

**Parent is PAUSED if:**
- All children are PAUSED
- OR parent was explicitly set to PAUSED (cascade intent to children)

**Implication**: Parent becomes PAUSED when all active children are paused, or when parent-level pause is issued.

#### Rule 6: COMPLETED Roll-Up

**Parent is COMPLETED if and only if:**
- All children are COMPLETED

**Implication**: Parent completes only when every child completes successfully.

#### Rule 7: FAILED Roll-Up

**Parent is FAILED if:**
- At least one child is FAILED

**Implication**: Any child failure causes parent to fail (failure propagates up).

#### Rule 8: EMERGENCY_STOPPED Roll-Up

**Parent is EMERGENCY_STOPPED if:**
- At least one child is EMERGENCY_STOPPED
- OR parent was explicitly emergency-stopped (may or may not cascade to children based on scope)

**Implication**: Emergency stop bubbles up to parent, making parent status visible.

### 5.3 Precedence Rules

When multiple child states exist, parent state is determined by precedence:

**State Precedence (Highest to Lowest)**:
1. **EMERGENCY_STOPPED** (critical, highest priority)
2. **FAILED** (terminal failure)
3. **BLOCKED** (cannot proceed)
4. **IN_PROGRESS** (active work)
5. **PAUSED** (intentional suspension)
6. **READY** (ready to begin)
7. **COMPLETED** (success, only if all children completed)
8. **NOT_STARTED** (no activity)

**Example**:
- If children are: [COMPLETED, IN_PROGRESS, COMPLETED]
  - Parent state: **IN_PROGRESS** (precedence rule 4)
  
- If children are: [COMPLETED, BLOCKED, COMPLETED]
  - Parent state: **BLOCKED** (precedence rule 3)
  
- If children are: [COMPLETED, COMPLETED, FAILED]
  - Parent state: **FAILED** (precedence rule 2)

### 5.4 Real-Time Roll-Up

**Roll-up is immediate and continuous**:
- Child state changes trigger immediate parent re-evaluation
- Parent state updates reflect current child states at all times
- No delayed or batched roll-up (status is always current)

---

## 6. Authority Boundaries Per Level

### 6.1 Authority Hierarchy

**Authority flows downward; accountability flows upward.**

```
Human Authority (Johan)
    ↓ (approves, directs)
Foreman (FM)
    ↓ (plans, organizes, supervises)
Builders
    ↓ (execute, report)
Steps (atomic work)
```

### 6.2 Authority by Node Level

#### Application Level Authority

**Human Authority (Johan)**:
- Approves application intent and requirements
- Authorizes application-level changes to scope or priority
- Issues application-wide emergency stops
- Final approval for application delivery

**Foreman (FM)**:
- Designs application architecture
- Decomposes application into waves
- Plans wave dependencies and sequencing
- Coordinates wave execution
- Reports application-level status to Johan
- Enforces governance at application level

**Builders**: No authority at application level

#### Wave Level Authority

**Human Authority (Johan)**:
- Approves major wave scope changes
- Authorizes wave re-prioritization
- Issues wave-level emergency stops if needed

**Foreman (FM)**:
- Designs wave architecture
- Decomposes wave into sub-waves
- Defines wave entry/exit criteria
- Manages wave dependencies
- Allocates builder resources to waves
- Validates wave completion
- Reports wave status
- Issues wave-level pauses or blocks

**Builders**: No authority at wave level (execute steps within waves)

#### Sub-Wave Level Authority

**Human Authority (Johan)**: No direct authority at sub-wave level (delegates to FM)

**Foreman (FM)**:
- Designs sub-wave structure
- Decomposes sub-wave into steps
- Defines sub-wave boundaries
- Manages step dependencies within sub-wave
- Assigns builders to steps
- Validates sub-wave completion
- Reports sub-wave status
- Issues sub-wave-level controls

**Builders**: No authority at sub-wave level (execute assigned steps)

#### Step Level Authority

**Human Authority (Johan)**: No direct authority at step level (delegates to FM)

**Foreman (FM)**:
- Designs step architecture
- Creates step QA (Red QA)
- Issues "Build to Green" instruction
- Validates step completion (Green QA)
- Approves or rejects step delivery
- Blocks steps that violate governance
- Re-assigns steps if builder fails

**Builders**:
- Execute assigned steps
- Implement code to satisfy step QA
- Report step status and completion
- Request clarification or unblocking
- **Cannot change step scope or requirements**
- **Cannot skip QA or governance checks**

### 6.3 Cross-Level Authority Prohibition

**Strict Separation**:
- Builders MUST NOT attempt to exercise authority above step level
- FM MUST NOT bypass governance or human authority at application level
- Human authority MAY delegate to FM but retains override capability
- Lower levels CANNOT override higher-level decisions

**Enforcement**:
- Governance gates enforce authority boundaries
- Unauthorized actions are detected and blocked
- Violations are recorded and escalated

---

## 7. Dependency and Execution Ordering

### 7.1 Dependency Types

#### 7.1.1 Sequential Dependencies (Within Level)

**Definition**: Nodes must execute in a specific order at the same level.

**Example**:
- Wave 1 must complete before Wave 2 begins
- Sub-Wave 1.1 must complete before Sub-Wave 1.2 begins
- Step 1.1.1 must complete before Step 1.1.2 begins

**Representation**: Explicit ordering or dependency graph

#### 7.1.2 Parallel Dependencies (Within Level)

**Definition**: Nodes at the same level may execute concurrently if no dependencies exist.

**Example**:
- Wave 1 and Wave 2 may execute in parallel if independent
- Sub-Wave 1.1 and Sub-Wave 1.2 may execute in parallel
- Step 1.1.1 and Step 1.1.2 may execute in parallel

**Constraint**: Parallel execution ONLY if no data dependencies, resource conflicts, or governance constraints exist.

#### 7.1.3 Cross-Level Dependencies

**Definition**: Nodes at different levels may have dependencies.

**Example**:
- Wave 2 depends on specific steps in Wave 1
- Step 2.1.1 depends on data structure created in Step 1.2.3

**Representation**: Explicit dependency declarations in architecture

### 7.2 Dependency Resolution Rules

#### Rule 1: Parent-Child Dependencies (Implicit)

**Implicit Dependency**: Child nodes inherit parent's entry criteria.

- Children of Wave 1 cannot start until Wave 1 entry criteria satisfied
- Steps in Sub-Wave 1.1 cannot start until Sub-Wave 1.1 ready

**No explicit declaration needed** (structural dependency)

#### Rule 2: Sibling Dependencies (Explicit)

**Explicit Dependency**: Siblings at same level may depend on each other.

- Must be explicitly declared in architecture
- Dependency graph must be acyclic (no circular dependencies)
- Execution order determined by dependency resolution

**Enforcement**: Foreman validates dependency graph before execution begins

#### Rule 3: Cross-Wave Dependencies (Explicit)

**Explicit Dependency**: Nodes in different waves may depend on each other.

- Must be explicitly declared
- Creates inter-wave execution constraints
- May prevent full wave parallelization

**Example**: Wave 3 (UI) depends on Wave 2 (API) completion

#### Rule 4: Step-Level Dependencies (Explicit)

**Explicit Dependency**: Steps may depend on other steps within or across sub-waves.

- Finest-grained dependency level
- Enables maximum parallelization when dependencies are minimal
- Must be explicitly declared in step architecture

### 7.3 Execution Ordering Algorithm

**Dependency-Driven Scheduling**:

1. Build dependency graph for all nodes at current level
2. Identify nodes with no unmet dependencies (READY)
3. Execute ready nodes (in parallel if resources available)
4. As nodes complete, re-evaluate dependencies for remaining nodes
5. Repeat until all nodes complete or blocked

**Blocking Conditions**:
- If any node fails, dependent nodes become BLOCKED
- If any node is emergency-stopped, dependent nodes may become BLOCKED (based on scope)
- If circular dependency detected, all involved nodes become BLOCKED (architecture error)

### 7.4 No Implicit Execution Across Levels

**Critical Invariant**: Execution NEVER skips levels.

**Prohibited**:
- ❌ Application cannot directly execute steps (must go through waves and sub-waves)
- ❌ Waves cannot directly execute steps (must go through sub-waves)
- ❌ No "shortcut" execution paths that bypass hierarchy

**Rationale**: Hierarchy provides governance checkpoints, status aggregation, and emergency control granularity.

---

## 8. Emergency Stop Semantics

### 8.1 Emergency Stop Authority

**Emergency Stop** is the immediate halt of execution at a specified scope level due to critical conditions.

**Authorized Triggers**:
1. **Critical Failure**: Cascading failures, resource exhaustion, data corruption risk
2. **Security Incident**: Active breach, vulnerability exploit, credential exposure
3. **Governance Violation**: Catastrophic governance failure, constitutional breach
4. **Human Override**: Johan issues immediate stop for any reason

### 8.2 Emergency Stop Scope Levels

#### Application-Level Emergency Stop

**Scope**: Entire application and all child nodes (waves, sub-waves, steps)

**Effect**:
- All waves set to EMERGENCY_STOPPED
- All sub-waves set to EMERGENCY_STOPPED
- All steps set to EMERGENCY_STOPPED
- All execution immediately ceases
- All resources deallocated or frozen

**Authority**:
- Johan (human authority)
- Foreman (if catastrophic failure detected)
- Governance circuit breakers (per CASCADING_FAILURE_CIRCUIT_BREAKER.md)

**Use Cases**:
- Critical security breach affecting entire application
- Catastrophic build philosophy violation
- Data loss risk across application
- External crisis requiring full stop

#### Wave-Level Emergency Stop

**Scope**: Specific wave and all child nodes (sub-waves, steps within that wave)

**Effect**:
- Target wave set to EMERGENCY_STOPPED
- All sub-waves in target wave set to EMERGENCY_STOPPED
- All steps in target wave set to EMERGENCY_STOPPED
- Other waves continue execution (unless dependencies cause blocking)

**Authority**:
- Johan (human authority)
- Foreman (if wave-specific critical failure detected)

**Use Cases**:
- Wave-specific security issue
- Wave architecture fundamentally flawed
- Wave execution causing downstream risk
- Wave must be halted without stopping entire application

#### Sub-Wave-Level Emergency Stop

**Scope**: Specific sub-wave and all child nodes (steps within that sub-wave)

**Effect**:
- Target sub-wave set to EMERGENCY_STOPPED
- All steps in target sub-wave set to EMERGENCY_STOPPED
- Other sub-waves in same wave continue execution (if no dependencies)

**Authority**:
- Foreman (FM)
- Automated governance gates (if sub-wave violates governance)

**Use Cases**:
- Sub-wave causing localized failures
- Sub-wave violating governance constraints
- Sub-wave implementation fundamentally broken
- Sub-wave must be halted for remediation

#### Step-Level Emergency Stop

**Scope**: Specific step only (atomic execution unit)

**Effect**:
- Target step set to EMERGENCY_STOPPED
- Other steps continue execution (if no dependencies)

**Authority**:
- Foreman (FM)
- Builder (if builder detects unrecoverable condition)
- Automated governance gates

**Use Cases**:
- Step causing catastrophic test failures
- Step introducing critical security vulnerability
- Step corrupting data or state
- Step must be halted immediately

### 8.3 Emergency Stop Propagation

**Upward Propagation (Roll-Up)**:
- Emergency stop at any level causes parent to reflect EMERGENCY_STOPPED state
- Continues up to application root

**Downward Propagation (Cascade)**:
- Emergency stop at parent MAY cascade to children (based on scope definition)
- Application-level stop cascades to all descendants
- Wave-level stop cascades to sub-waves and steps within wave
- Sub-wave-level stop cascades to steps within sub-wave
- Step-level stop does NOT cascade (atomic unit)

**Sibling Isolation**:
- Emergency stop does NOT automatically propagate to siblings
- Siblings may become BLOCKED if dependencies exist
- Siblings continue execution if no dependencies

### 8.4 Recovery from Emergency Stop

**Recovery Process**:

1. **Investigation Phase**:
   - Root cause analysis performed
   - Impact assessment completed
   - Remediation plan created
   - Risk evaluated

2. **Remediation Phase**:
   - Critical issues fixed
   - Governance gaps closed
   - Architecture updated if needed
   - QA enhanced to prevent recurrence

3. **Authorization Phase**:
   - Human authority (Johan) reviews investigation and remediation
   - Explicit authorization granted to resume (transition to READY state)
   - Conditions for resume documented

4. **Restart Phase**:
   - Node transitions from EMERGENCY_STOPPED to READY
   - Node re-enters execution queue
   - Execution resumes per normal workflow

**No Auto-Recovery**: Nodes in EMERGENCY_STOPPED state MUST NOT automatically transition out without explicit authorization.

---

## 9. Readiness Semantics

### 9.1 Readiness Definition

**Readiness** is the state where a node has satisfied all prerequisites and is authorized to begin execution.

**Entry Criteria for READY State**:
1. All dependencies satisfied (predecessor nodes completed)
2. Resources available (builder capacity, infrastructure)
3. Governance preconditions met (gates passed, approvals obtained)
4. No blocking conditions present

### 9.2 Readiness by Node Level

#### Application Readiness

**Application is READY when**:
- Requirements specification complete and approved
- High-level architecture defined
- Wave decomposition complete
- Resources allocated
- Governance approvals obtained

**Application Readiness Gates**:
- Requirement Specification approved by Johan
- Architecture Completeness validated per ARCHITECTURE_COMPLETENESS_REQUIREMENTS.md
- No blocking issues in governance

#### Wave Readiness

**Wave is READY when**:
- Application-level prerequisites satisfied
- Wave architecture complete
- Sub-wave decomposition complete
- Wave dependencies satisfied (predecessor waves complete if sequential)
- Builder resources available
- Wave-level governance gates passed

**Wave Readiness Gates**:
- Wave architecture validated
- Sub-wave boundaries defined
- No blocking dependencies

#### Sub-Wave Readiness

**Sub-Wave is READY when**:
- Wave-level prerequisites satisfied
- Sub-wave architecture complete
- Step decomposition complete
- Sub-wave dependencies satisfied
- Builder assignments made
- Sub-wave-level governance gates passed

**Sub-Wave Readiness Gates**:
- Step definitions complete
- Red QA created for each step
- Builder capacity available

#### Step Readiness

**Step is READY when**:
- Sub-wave-level prerequisites satisfied
- Step architecture complete
- Red QA created and validated (failing as expected)
- Builder assigned
- Step dependencies satisfied
- "Build to Green" instruction issued

**Step Readiness Gates**:
- Architecture documented per ARCHITECTURE_COMPLETENESS_REQUIREMENTS.md
- Red QA exists and is RED (failing)
- Builder validation passed per BUILDER_FIRST_PR_MERGE_MODEL.md

### 9.3 Readiness Blocking Conditions

**Node is BLOCKED (not READY) if**:
- Any dependency failed
- Required resources unavailable
- Governance precondition not satisfied
- Architecture incomplete or invalid
- QA missing or inadequate (for steps)

**Unblocking Requires**:
- Resolving failed dependencies (remediation or architecture change)
- Allocating required resources
- Satisfying governance preconditions
- Completing architecture or QA

---

## 10. Node Independence and Isolation

### 10.1 Independence Principle

**Each node is an independent execution scope**, isolated from other nodes at the same level.

**Independence Guarantees**:
- Node execution does not interfere with sibling nodes (unless explicit dependencies)
- Node state changes do not automatically affect sibling nodes
- Node failures are isolated (no cascading failure to siblings unless via dependencies)
- Node resources are independently allocated and deallocated

### 10.2 Isolation Rules

#### Data Isolation

**Rule**: Nodes MUST NOT share mutable state with siblings.

**Implications**:
- Each step operates on independent data (or read-only shared data)
- Sub-waves do not share mutable resources
- Waves operate in isolated execution contexts

**Exceptions**:
- Explicit data dependencies declared in architecture
- Read-only access to shared immutable data
- Controlled handoffs via well-defined interfaces

#### Resource Isolation

**Rule**: Node resource usage MUST NOT interfere with sibling node resources.

**Implications**:
- Builder assignment to one step does not prevent assignment to another step
- Wave execution does not consume resources needed by other waves (unless explicit allocation)
- Resource exhaustion in one node does not automatically block siblings

**Enforcement**: Resource management at Foreman level ensures isolation

#### Failure Isolation

**Rule**: Node failure MUST NOT automatically cause sibling failure.

**Implications**:
- Step failure does not cause other steps in sub-wave to fail (unless dependency)
- Sub-wave failure does not cause other sub-waves in wave to fail (unless dependency)
- Wave failure does not cause other waves to fail (unless dependency)

**Roll-Up Effect**: Parent node reflects failure via roll-up semantics, but siblings remain independent.

### 10.3 Controlled Cross-Node Communication

**Inter-Node Communication Channels**:
1. **Dependency declarations**: Explicit dependencies between nodes
2. **Status roll-up**: Child status reported to parent
3. **Shared immutable data**: Read-only access to common resources
4. **Foreman-mediated coordination**: FM orchestrates cross-node interactions

**Prohibited**:
- Direct node-to-node mutable state sharing
- Implicit side effects across nodes
- Undeclared dependencies or communication channels

---

## 11. Monitoring and Observability

### 11.1 Status Visibility

**All nodes MUST provide real-time status visibility**:
- Current execution state (NOT_STARTED, READY, IN_PROGRESS, BLOCKED, etc.)
- Progress metrics (percent complete, steps completed vs. total)
- Time in current state
- Last state transition timestamp
- Current blocking conditions (if BLOCKED)

**Status Accessibility**:
- Human authority (Johan) can view status at any level
- Foreman (FM) can view status at all levels
- Builders can view status of assigned steps and parent sub-waves
- Governance systems can query status for gate evaluation

### 11.2 Audit Trail Requirements

**Every state transition MUST be recorded**:
- Node identifier (App, Wave ID, Sub-Wave ID, Step ID)
- Previous state
- New state
- Transition timestamp (ISO 8601)
- Transition trigger (dependency satisfied, explicit command, failure, etc.)
- Authorizing entity (human, Foreman, builder, automated gate)

**Audit Trail Integration**:
- Per AUDIT_READINESS_MODEL.md
- Immutable append-only log
- Retained for node lifetime
- Accessible for governance review and incident investigation

### 11.3 Metrics and Analytics

**Node-Level Metrics**:
- Execution duration (time in IN_PROGRESS state)
- Wait time (time in READY state before IN_PROGRESS)
- Block time (time in BLOCKED state)
- Retry count (if node restarted after failure or emergency stop)

**Aggregate Metrics**:
- Wave completion rate (completed waves / total waves)
- Step success rate (completed steps / total steps)
- Average step duration
- Failure rate by level (application, wave, sub-wave, step)

**Metrics Usage**:
- FM uses metrics for resource allocation and scheduling
- Human authority uses metrics for oversight and decision-making
- Governance uses metrics for effectiveness scoring per BUILD_EFFECTIVENESS_STANDARD.md

---

## 12. Integration with Existing Governance

This build tree execution model integrates with and extends:

### 12.1 Build Philosophy Integration

**BUILD_PHILOSOPHY.md Alignment**:
- **One-Time Build Law**: Each step must be 100% GREEN on first delivery
- **QA-as-Proof**: Step completion proven by Green QA
- **Zero Test Debt**: No step completes with test debt
- **Architecture → Red QA → Build to Green**: Step-level workflow

**Build Tree Contribution**: Provides hierarchical structure for organizing steps into sub-waves and waves while preserving build philosophy at atomic step level.

### 12.2 Foreman Authority Integration

**FOREMAN_AUTHORITY_AND_SUPERVISION_MODEL.md Alignment**:
- FM plans application decomposition into waves
- FM organizes sub-waves and steps within waves
- FM supervises builders executing steps
- FM controls execution through state transitions and emergency stops

**Build Tree Contribution**: Defines explicit authority boundaries at each level, clarifying FM's managerial scope.

### 12.3 Activation State Integration

**ACTIVATION_STATE_MODEL.md Alignment**:
- Build tree execution states (NOT_STARTED, IN_PROGRESS, COMPLETED, etc.) are distinct from activation states (DORMANT, VALIDATED, ACTIVE, etc.)
- **Activation states** govern component operational authority
- **Execution states** govern build progress and completion

**Distinction**:
- A component may be in ACTIVE activation state but NOT_STARTED execution state (commissioned but no build in progress)
- A component may be in IN_PROGRESS execution state but READ_ONLY activation state (building a read-only component)

**Build Tree Contribution**: Orthogonal state model for build execution, complementing activation state governance.

### 12.4 Dependency and Architecture Integration

**ARCHITECTURE_COMPLETENESS_REQUIREMENTS.md Alignment**:
- Architecture must define wave, sub-wave, and step decomposition
- Architecture must declare dependencies between nodes
- Architecture must specify entry/exit criteria for each level

**Build Tree Contribution**: Provides canonical structure for architecture decomposition, ensuring completeness.

### 12.5 Emergency Control Integration

**CASCADING_FAILURE_CIRCUIT_BREAKER.md Alignment**:
- Circuit breakers may trigger emergency stop at appropriate level
- Emergency stop scope matches failure scope (step, sub-wave, wave, application)

**Build Tree Contribution**: Defines emergency stop semantics and propagation rules for hierarchical execution.

---

## 13. Roles and Responsibilities

### 13.1 Human Authority (Johan) Responsibilities

**Application Level**:
- Approve application requirements and scope
- Authorize application-level scope changes
- Issue application-wide emergency stops if necessary
- Review and approve final application delivery

**Wave Level**:
- Approve major wave scope changes
- Authorize wave re-prioritization
- Review wave completion reports

**Sub-Wave and Step Levels**: Delegated to Foreman (no direct involvement unless escalated)

### 13.2 Foreman (FM) Responsibilities

**Application Level**:
- Decompose application into waves
- Plan wave dependencies and sequencing
- Coordinate wave execution
- Report application status to Johan
- Enforce governance at all levels

**Wave Level**:
- Design wave architecture
- Decompose wave into sub-waves
- Manage wave dependencies
- Allocate resources across waves
- Validate wave completion
- Issue wave-level controls (pause, block, emergency stop)

**Sub-Wave Level**:
- Design sub-wave structure
- Decompose sub-wave into steps
- Manage step dependencies
- Assign builders to steps
- Validate sub-wave completion
- Issue sub-wave-level controls

**Step Level**:
- Design step architecture
- Create Red QA for each step
- Issue "Build to Green" instruction to builder
- Validate step completion (Green QA)
- Approve or reject step delivery
- Re-assign steps if builder fails

### 13.3 Builder Responsibilities

**Step Level Only**:
- Execute assigned steps
- Implement code to satisfy Red QA
- Report step status and progress
- Request unblocking if BLOCKED
- Deliver step when QA is GREEN

**Prohibited**:
- Builders MUST NOT attempt to coordinate across steps
- Builders MUST NOT modify wave or sub-wave structure
- Builders MUST NOT override Foreman decisions

### 13.4 Governance Administrator Responsibilities

**All Levels**:
- Audit build tree structure compliance
- Validate governance gate satisfaction
- Monitor for governance violations
- Escalate governance issues to Johan
- Propose governance enhancements based on execution observations

**No Execution Authority**: Governance Administrator does not execute builds or control execution (observes and enforces only)

---

## 14. Compliance and Standards Alignment

### 14.1 ISO 27001 Alignment

This build tree execution model satisfies:

- **A.12.1.2 (Change Management)**: Hierarchical structure provides change control at multiple granularities
- **A.14.2.2 (System Change Control Procedures)**: Explicit state transitions and audit trails enforce controlled procedures
- **A.14.2.9 (System Acceptance Testing)**: Step-level QA and wave-level validation provide acceptance gates
- **A.16.1.5 (Response to Information Security Incidents)**: Emergency stop mechanisms provide incident response capability
- **A.18.2.2 (Compliance with Security Policies)**: Governance integration ensures policy compliance at all levels

### 14.2 NIST CSF Alignment

This build tree execution model supports:

- **ID.AM-1 (Asset Inventory)**: Build tree provides structured inventory of build execution units
- **PR.IP-1 (Baseline Configuration)**: Node states and dependencies define execution baseline
- **DE.AE-2 (Analysis of Security Events)**: Audit trails enable security event analysis
- **RS.MI-2 (Incidents are Mitigated)**: Emergency stop provides incident mitigation capability
- **RC.RP-1 (Recovery Plan Execution)**: Recovery from emergency stop follows structured protocol

### 14.3 ISO 31000 Alignment (Risk Management)

This build tree execution model supports:

- **Risk Identification**: Node-level status visibility enables risk identification at appropriate granularity
- **Risk Assessment**: Dependency graph and state roll-up enable impact assessment
- **Risk Treatment**: Isolation rules and emergency stop provide risk treatment controls
- **Monitoring and Review**: Real-time status and audit trails enable continuous monitoring

---

## 15. Success Criteria

This build tree execution model succeeds when:

✅ **All builds are organized into App → Wave → Sub-Wave → Step hierarchy**  
✅ **Execution states are maintained and rolled up correctly at all levels**  
✅ **Dependencies are declared, validated, and enforced**  
✅ **Authority boundaries are respected at each level**  
✅ **Emergency stops can be triggered at appropriate scope**  
✅ **Node independence and isolation prevent unintended side effects**  
✅ **Status visibility enables real-time monitoring and governance**  
✅ **Audit trails provide complete execution history**

---

## 16. Changelog

### Version 1.0 (2025-12-24)

**Status**: Initial Release  
**Authority**: Johan Ras  
**Trigger**: Issue G-C8 — Define Build Tree & Hierarchical Execution Model

**Summary**: Created canonical build tree execution model defining four-level hierarchy (Application → Wave → Sub-Wave → Step), execution states, status roll-up semantics, authority boundaries, dependency resolution, emergency stop semantics, and node independence rules.

**Key Requirements Established**:
- Four-level hierarchical build tree structure
- Eight canonical execution states with transition rules
- Status roll-up semantics with precedence rules
- Authority boundaries at each level (Human, FM, Builder)
- Dependency types and resolution algorithm
- Emergency stop authority and propagation rules
- Readiness semantics and blocking conditions
- Node independence and isolation guarantees
- Comprehensive monitoring and audit trail requirements
- Integration with existing governance artifacts

**Effect**: All build execution MUST now conform to this hierarchical model, enabling consistent execution, clear authority boundaries, predictable status reporting, and effective emergency controls across all Maturion applications.

---

**End of BUILD TREE & HIERARCHICAL EXECUTION MODEL**

---

**Document Metadata**:
- Document ID: BUILD_TREE_EXECUTION_MODEL_V1.0
- Authority: Canonical Governance Standard
- Integrates With: BUILD_PHILOSOPHY.md, FOREMAN_AUTHORITY_AND_SUPERVISION_MODEL.md, ACTIVATION_STATE_MODEL.md, ARCHITECTURE_COMPLETENESS_REQUIREMENTS.md, CASCADING_FAILURE_CIRCUIT_BREAKER.md, AUDIT_READINESS_MODEL.md
- Enforcement: Governance Gates + Architecture Review + FM Supervision + Real-Time Monitoring

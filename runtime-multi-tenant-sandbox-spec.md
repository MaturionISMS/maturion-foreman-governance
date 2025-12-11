# MULTI-TENANT RUNTIME SANDBOX SPECIFICATION  
Version: 1.0  
Status: Isolation, Safety & Controlled Execution Architecture  
Owner: Johan  
Last Updated: YYYY-MM-DD  

--------------------------------------------------------------------------------
# 1. PURPOSE

The **Multi-Tenant Runtime Sandbox System (MTRSS)** guarantees that:

- Every embodiment of Maturion runs in a **fully isolated runtime chamber**
- No embodiment can access another embodiment’s execution state
- No tenant can access or infer another tenant’s data
- All execution is deterministic, auditable, reversible, and bounded
- All tool usage is controlled by the Arbiter, Guardian, and Sentinel
- Violations immediately halt execution and raise CRITICAL incidents
- Autonomous execution is restricted to approved sandboxes

This system is the *execution-layer equivalent* of:

- Knowledge Boundary Reinforcement  
- Tenant Isolation  
- Memory Architecture  
- World Model Separation  
- Oversight System  

Together they guarantee **zero leakage, zero drift, and zero unsafe autonomy**.

--------------------------------------------------------------------------------
# 2. SCOPE

This specification governs:

### 2.1 Run-Time Execution Isolation

- all multi-tenant interactions  
- all embodiment execution  
- all build operations  
- all ISMS analyses  
- all marketing actions  
- all command operations  

### 2.2 Tool Execution Isolation  
Tools used by Maturion (browser, file manipulation, APIs, builders) must run in:

- separate chambers  
- with explicit permission tokens  
- with full logging  
- under watchdog supervision  

### 2.3 Autonomous Operation Boundaries  
Autonomy level determines:

- what actions may occur  
- which sandbox can be used  
- how long actions may run  
- whether human approval is required  

### 2.4 Runtime State Management  
- ephemeral context container  
- isolated session memory  
- per-tenant compute nodes  

--------------------------------------------------------------------------------
# 3. SANDBOX MODEL (THE CORE)

The system defines **four sandbox types**, each stricter than the next.

---

## TYPE A — **Constitutional Sandbox (Immutable)**  
Used for:

- reading constitutional memory  
- executing governance logic  
- computing guardrail functions  

**Not allowed:**

- tool calls  
- external API usage  
- memory writes  
- tenant data access  

**Used by:**  
Arbiter, Guardian, Sentinel, ARC.

---

## TYPE B — **World-Model Sandbox (Read-Only)**  
Used for:

- high-level reasoning  
- analytics  
- predictions  
- explanation building  

**Allowed:**

- read-only world model  
- mathematical or structural reasoning  
- state inspection (safe subset)  

**Not allowed:**

- memory writes  
- tenant access  
- builder operations  
- source code mutation  

**Used by:**  
Risk-Maturion, Command-Maturion, Marketing-Maturion (analysis mode).

---

## TYPE C — **Tenant Execution Sandbox** *(per tenant)*  
Each tenant receives a *dedicated runtime envelope*:

runtime/tenants/{tenantId}/

markdown
Copy code

**Contains:**

- tenant episodic memory (ephemeral read-only views)
- tenant semantic snapshots
- tenant risk data (isolated)
- active session context

**Allowed:**

- analysis  
- summarisation  
- risk evaluation  
- proactive suggestions  
- ISMS operations  

**Not allowed:**

- writing to world model  
- writing to other tenants  
- cross-tenant inferences  
- builder operations  

**Used by:**  
Risk-Maturion, Command-Maturion, Marketing-Maturion (tenant mode).

---

## TYPE D — **Builder Runtime Sandbox (Most Restricted + Most Powerful)**  
Location:

runtime/builder/{buildId}/

markdown
Copy code

This sandbox executes:

- code generation  
- refactoring  
- PR construction  
- environment analysis  
- diagnostics on code  

**Hard rules:**

- Cannot read tenant data  
- Cannot write to world model  
- Cannot bypass mutation guardrails  
- Cannot break out of .github/ scope  
- Must obey Autonomy Level restrictions  

**Used by:**  
Builder-Maturion ONLY.

--------------------------------------------------------------------------------
# 4. ISOLATION GUARANTEES

### 4.1 Hard Separation Between Tenants

No cross-tenant:

- reads  
- writes  
- metadata inference  
- embeddings  
- world-model updates  
- risk influence  

### 4.2 Embodiment Isolation

Embodiments cannot share:

- runtime memory  
- embeddings  
- call stacks  
- tool execution state  
- cross-context data  

### 4.3 World-Model Protection

Sandbox must ensure:

- no embodiment writes to world model  
- no drift-causing feedback loops  
- no memory spillover  
- no merging of tenant semantics  

### 4.4 Runtime State Snapshots

Every sandbox execution produces:

state_snapshot.json
logs/
violations/
events/
metrics/

markdown
Copy code

Used for:

- reviews  
- reproducibility  
- ARC inspections  
- drift analytics  

--------------------------------------------------------------------------------
# 5. EXECUTION FLOW (WITH WATCHDOGS)

Every interaction follows this universal pipeline:

Input
↓
Guardian (safety/content check)
↓
Sentinel (behavioural drift check)
↓
Arbiter (boundary & isolation enforcement)
↓
Sandbox admission
↓
Runtime execution
↓
Post-review by Watchdogs
↓
Store snapshot

markdown
Copy code

If any watchdog fails:

- sandbox denied  
- execution halted  
- IWMS CRITICAL incident created  
- autonomy reduced to Level 0  

--------------------------------------------------------------------------------
# 6. AUTONOMY LEVEL MAPPING TO SANDBOX TYPES

| Autonomy Level | Allowed Sandboxes | Restrictions |
|----------------|------------------|--------------|
| 0 | None | Observation only |
| 1 | Type B | Diagnostics, no actions |
| 2 | Type B, C | Tenant-safe actions only |
| 3 | Type B, C, D | Builder actions allowed with checks |
| 4 | ALL (B, C, D) | Requires ARC approval each time |

Type A is exclusively for governance processes — never for Maturion embodiments.

--------------------------------------------------------------------------------
# 7. TOOL EXECUTION IN SANDBOX

### Every tool call must include:

- sandbox ID  
- embodiment ID  
- tenant ID  
- autonomy level  
- watchdog pre-approval signature  

### Tools MUST run inside secure subprocesses:

- browser  
- file system  
- code interpreter  
- APIs  
- git operations  
- MCP  

If tool tries to access prohibited data:

- Arbiter blocks  
- Event logged  
- Red state returned  

--------------------------------------------------------------------------------
# 8. MEMORY ACCESS POLICY INSIDE SANDBOXES

### Sandbox Memory Rules:

#### Type B (World Model):
- read-only  
- cannot write anything  

#### Type C (Tenant):
- can read tenant memory  
- cannot write tenant long-term memory  
- cannot access other tenants  

#### Type D (Builder):
- cannot read tenants  
- cannot read world model  
- can read codebase only  
- can write ephemeral execution logs only  

### No sandbox can touch:

- constitutional memory  
- world model  
- cross-tenant data  

--------------------------------------------------------------------------------
# 9. SECURITY & ISOLATION ENFORCEMENT

### Arbiter checks:

- tenant boundary tokens  
- embodiment identity  
- memory zone access rights  
- autonomy level controls  
- world-model protection  
- forbidden cross-talk  
- sandbox breakout attempts  

### Sentinel checks:

- behavioural deviation  
- pattern anomalies  
- recursive self-learning loops  
- unsafe transformation patterns  

### Guardian checks:

- PII leakage  
- sensitive tenant data crossing boundaries  
- unsafe outputs  

--------------------------------------------------------------------------------
# 10. TREE VISUALISATION INTEGRATION

Each node shows:

### Sandbox State Indicator  
🧱 **Sandbox Icon**

Colour:

- Green → sandbox healthy  
- Yellow → mild drift or warnings  
- Orange → performance or isolation risk  
- Red → sandbox violation  
- Purple → governance-level threat  

Hover tooltip:

Sandbox Type: C (Tenant Execution)
Isolation: Strong
Last Violation: None
Execution Load: 37%
Autonomy Level: 2
Gate Stack: G✓ S✓ A✓

markdown
Copy code

--------------------------------------------------------------------------------
# 11. BACKEND REQUIREMENTS

### 11.1 Sandbox Manager API

POST /sandbox/create
POST /sandbox/execute
POST /sandbox/destroy
GET /sandbox/{id}/state
GET /sandbox/{id}/logs

markdown
Copy code

### 11.2 Enforcement

- sandbox auto-destroy on violation  
- logs immutably stored  
- state snapshots written post-run  

### 11.3 Tenant Routing

Each runtime call must specify:

tenantId
embodimentId
sandboxType
autonomyLevel

markdown
Copy code

--------------------------------------------------------------------------------
# 12. TESTING REQUIREMENTS

### 12.1 Unit Tests

- forbidden access attempts  
- cross-tenant reads  
- world-model writes  
- cross-embodiment contamination  

### 12.2 Integration Tests

- watchdog enforcement  
- sandbox lifecycle management  
- autonomy mapping  

### 12.3 Security Tests

- sandbox breakout attempts  
- arbitrary tool calls  
- memory injection attacks  

### 12.4 Performance Tests

- deterministic runtime  
- controlled resource limits  

--------------------------------------------------------------------------------
# 13. ACCEPTANCE CRITERIA

MTRSS is complete when:

1. Every embodiment runs in an isolated sandbox  
2. No cross-tenant access is possible  
3. No embodiment can violate memory zones  
4. World model is entirely protected from runtime  
5. All execution is logged, replayable, reviewable  
6. All actions pass through watchdog triad  
7. Autonomy levels map to sandbox permissions  
8. The tree visualises sandbox health in real time  
9. Incidents created on every violation  
10. Johan has full oversight and final authority  

--------------------------------------------------------------------------------
# END OF FILE

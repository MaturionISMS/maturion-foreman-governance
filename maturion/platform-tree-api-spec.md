# PLATFORM TREE API SPECIFICATION  
Version: 1.0  
Status: Internal API Architecture  
Owner: Johan  
Last Updated: YYYY-MM-DD  

--------------------------------------------------------------------------------
# 1. PURPOSE

This specification defines the **API services**, **data contracts**, and **event model**  
used to power the realtime **Maturion Platform Tree**, which visualises:

- platform health  
- subsystem performance  
- module status  
- watchdog telemetry  
- autonomy violations  
- memory/state consistency  
- incident activity  
- module completion %  
- build/runtime issues  

This API is the backbone of the “living Christmas tree” dashboard.

--------------------------------------------------------------------------------
# 2. SYSTEM OVERVIEW

The Platform Tree API:

1. Represents the hierarchical tree structure.  
2. Feeds real-time status data into every node.  
3. Integrates with watchdogs and IWMS.  
4. Passes full node context to Maturion for diagnostics.  
5. Enables deep drill-down and navigation.  
6. Supports both REST and WebSocket event streams.  
7. Tracks completion progress and operational KPIs.  

The API NEVER exposes tenant-specific data across tenants.

--------------------------------------------------------------------------------
# 3. API SURFACE

The Platform Tree API consists of:

- **Tree Definition Endpoints** (structure + metadata)  
- **Node Status Endpoints** (health, completion, incidents)  
- **Watchdog Feed Endpoints**  
- **Incident Feed Endpoints**  
- **Autonomy & Runtime Status Endpoints**  
- **Event Stream Endpoints** (websocket)  
- **Maturion Interaction Endpoint** (diagnostics + remediation)  

--------------------------------------------------------------------------------
# 4. DATA MODEL

### 4.1 TreeNode

TreeNode {
id: string
parentId: string | null
name: string
type: "root" | "layer" | "subsystem" | "module" | "leaf"
order: number
children?: TreeNode[]
description?: string
linkedDocuments?: string[]
linkedModules?: string[]
linkedCodePaths?: string[]
}

shell
Copy code

### 4.2 NodeStatus

NodeStatus {
nodeId: string
status: "green" | "amber" | "red" | "grey" | "blue" | "purple"
completion: number | null
lastUpdated: ISODateString
healthSummary: string
incidents?: IncidentRef[]
watchdogSignals?: WatchdogSignal[]
autonomyState?: AutonomyState
performanceMetrics?: PerformanceMetrics
}

shell
Copy code

### 4.3 IncidentRef

IncidentRef {
id: string
category: string
severity: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL"
timestamp: ISODateString
}

shell
Copy code

### 4.4 WatchdogSignal

WatchdogSignal {
source: "Guardian" | "Sentinel" | "Arbiter"
type: string
severity: "info" | "warn" | "error"
message: string
timestamp: ISODateString
}

shell
Copy code

### 4.5 AutonomyState

AutonomyState {
embodiment: "Builder" | "Risk" | "Command" | "Marketing"
level: 0 | 1 | 2 | 3 | 4
allowed: boolean
justification?: string
}

shell
Copy code

### 4.6 PerformanceMetrics

PerformanceMetrics {
latencyMs?: number
errorRate?: number
driftScore?: number
costUsage?: number
memoryLoad?: number
}

sql
Copy code

--------------------------------------------------------------------------------
# 5. ENDPOINTS

## 5.1 GET /tree  
Returns the full hierarchical structure (without dynamic status).

Response:
TreeNode[]

yaml
Copy code

---

## 5.2 GET /tree/status  
Returns **all nodes** with their current status and metrics.

Response:
NodeStatus[]

yaml
Copy code

---

## 5.3 GET /tree/node/{id}  
Returns the static structure of a single node.

Response:
TreeNode

yaml
Copy code

---

## 5.4 GET /tree/node/{id}/status  
Returns the status for a single node.

Response:
NodeStatus

yaml
Copy code

---

## 5.5 POST /tree/node/{id}/update  
Used by:

- Watchdogs  
- Build systems  
- Runtime components  

Payload:
{
status?: string,
completion?: number,
incident?: IncidentRef,
watchdogSignal?: WatchdogSignal,
performanceMetrics?: PerformanceMetrics
}

yaml
Copy code

Behaviour:
- Null fields are ignored  
- Status recalculated automatically  
- Update logged in episodic memory  

---

## 5.6 GET /tree/events (WebSocket)

Streams:

- Status changes  
- Incident creation  
- Watchdog alerts  
- Autonomy changes  
- Performance degradations  
- Build/runtime errors  

Event format:

{
eventType: string,
nodeId: string,
payload: any,
timestamp: ISODateString
}

yaml
Copy code

---

## 5.7 POST /tree/node/{id}/diagnose  

Passes the full node context to Maturion.

Payload:
{
userId: string,
nodeId: string
}

csharp
Copy code

Response (from Maturion):
{
summary: string,
rootCause: string,
recommendations: string[],
suggestedActions: string[],
confidence: number
}

yaml
Copy code

---

## 5.8 POST /tree/node/{id}/resolve  
Lets Maturion mark an issue as fixed after performing actions.

{
resolutionNotes: string
}

yaml
Copy code

Updates status, closes linked incidents.

---

## 5.9 GET /tree/search?q=...  
Searches tree nodes by name, description, document link, or module id.

Response:
TreeNode[]

csharp
Copy code

--------------------------------------------------------------------------------
# 6. STATUS COMPUTATION ENGINE

Node status is determined by:

worst(
watchdogSignals,
incidents,
autonomyViolations,
memoryIntegrity,
performanceDegradation,
QA failure,
cost anomalies,
worldModel consistency errors
)

markdown
Copy code

Rules:

- ANY red → node = red  
- ANY purple → ARC override (highest priority)  
- amber if warnings exist  
- green only if all checks pass  
- grey for non-implemented nodes  

--------------------------------------------------------------------------------
# 7. WATCHDOG INTEGRATION

### 7.1 Guardian → /tree/node/{id}/update  
Flags:

- Output safety issues  
- Policy violations  
- Tenant isolation concerns  

### 7.2 Sentinel → /tree/node/{id}/update  
Flags:

- drift  
- behavioural anomalies  
- repeated degradation  

### 7.3 Arbiter → /tree/node/{id}/update  
Flags:

- memory violations  
- unsafe learning attempts  
- world model corruption  

--------------------------------------------------------------------------------
# 8. INCIDENT SYSTEM INTEGRATION

When IWMS creates a new incident:

POST /tree/node/{nodeId}/update
{
incident: {...}
}

markdown
Copy code

Nodes automatically turn:

- 🔴 Red for HIGH/CRITICAL  
- 🟡 Amber for LOW/MEDIUM  

Linked nodes inherit the warning upward.

--------------------------------------------------------------------------------
# 9. AUTONOMY CONTEXT INTEGRATION

Runtime systems call:

POST /tree/node/{id}/update
{
autonomyState: {...}
}

markdown
Copy code

If autonomy exceeds allowed level → node turns red.

--------------------------------------------------------------------------------
# 10. MATURION INTERACTION ENDPOINTS

The tree integrates fully with Maturion.

### 10.1 Diagnostics  
Maturion can analyse:

- Root causes  
- System dependencies  
- World model inconsistencies  
- Memory issues  
- Reasoning drift  
- Build problems  
- Security failures  

### 10.2 Remediation  
Maturion can:

- Create issues  
- Trigger builders  
- Apply fixes  
- Re-run QA  
- Update world model (if ARC-approved)  
- Correct configuration  

--------------------------------------------------------------------------------
# 11. SECURITY REQUIREMENTS

- All API calls must be authenticated.  
- No tenant data can be returned for global/system nodes.  
- Tenant-specific trees (future feature) run isolated.  
- Diagnostics involving tenants require scoped permissions.  

--------------------------------------------------------------------------------
# 12. GOVERNANCE REQUIREMENTS

- The tree must reflect the philosophy hierarchy exactly.  
- No API call may modify constitutional content.  
- WebSocket feed must not expose sensitive memory.  
- All update calls must be logged to episodic memory.  

--------------------------------------------------------------------------------
# END OF FILE

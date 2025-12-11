# PLATFORM TREE VISUALIZATION SYSTEM — UI/UX SPECIFICATION  
Version: 1.0  
Status: UX Architecture Specification  
Owner: Johan  
Last Updated: YYYY-MM-DD  

--------------------------------------------------------------------------------
# 1. PURPOSE OF THIS SYSTEM

This document defines the UI/UX requirements for the **Maturion Platform Tree** —  
a hierarchical, living, colour-coded performance and governance view of the  
entire Maturion ecosystem.

The system provides:

- a one-page visual map of the entire architecture  
- drill-down transparency to any layer or module  
- real-time health indicators  
- watchdog & incident overlays  
- autonomy-state warnings  
- progress measurement for each node  
- a root-level navigation anchor for Johan and Maturion  

This does **not** replace any governance or runtime systems —  
it **visualises** them.

--------------------------------------------------------------------------------
# 2. HIGH-LEVEL UX GOALS

1. Provide a **single-screen overview** of the entire platform.  
2. Allow **infinite drill-down** from the highest philosophy layer to the deepest code-level leaf.  
3. Present **live system health** using intuitive colour language.  
4. Allow fast location of failures or anomalies.  
5. Support **hover-based tooltips** with context.  
6. Integrate with **Maturion’s reasoning** so the AI can describe issues contextually.  
7. Allow you (Johan) to click any node and:  
   - inspect problem areas  
   - open incidents  
   - call Maturion into the context  
   - view history  
   - view active autonomy state  
8. Support **future expansion**: new nodes, new modules, new embodiments.  

--------------------------------------------------------------------------------
# 3. VISUAL METAPHOR

A **tree** with:

- **Root** → True North  
- **Branches** → Layers  
- **Sub-branches** → Subsystems  
- **Leaves** → Modules, documents, runtime subsystems, or code units  

Each leaf or node is color-coded and interactive.

This yields a UX resembling a **living Christmas tree**  
with colour-coded health signals.

--------------------------------------------------------------------------------
# 4. NODE TYPES & REPRESENTATION

### 4.1 Node Types

There are four types of nodes:

1. **Root Node** (Level 0)  
2. **Branch Node (Structural Node)**  
3. **Sub-Branch Node (Functional Node)**  
4. **Leaf Node (Implementation Node)**

### 4.2 Visual Representation

Node
├─ Label (name)
├─ Icon (type-dependent)
├─ Status Circle (colour)
├─ % Complete (if applicable)
└─ Expand/Collapse Arrow

markdown
Copy code

### 4.3 Node Icons (recommended)

- 📜 Constitution  
- 🧠 Intelligence  
- ⚙️ Runtime  
- 🛡️ Guardrails  
- 🔍 Watchdogs  
- 🌐 World Model  
- 🧱 Architecture  
- 🧬 Module  
- 🛰️ Embodiment  
- 💾 Memory  
- 🔧 Build System  
- ⚠️ Incident  
- 📊 Dashboard  

--------------------------------------------------------------------------------
# 5. STATUS INDICATORS (COLOUR SYSTEM)

### 5.1 Colours

| Colour | Meaning |
|--------|---------|
| 🟢 Green | Healthy / No incidents |
| 🟡 Amber | Warning / Degraded performance |
| 🔴 Red | Failure / Blocking issue |
| ⚪ Grey | Not implemented or inactive |
| 🔵 Blue | Informational / Updating / Pending |
| 🟣 Purple | ARC review required |

### 5.2 Status Source Inputs

Each node receives status from:

- Watchdogs (Guardian / Sentinel / Arbiter)
- IWMS incidents
- Build/runtime health checks
- Autonomy validation
- Memory integrity state
- Module-level QA
- World model consistency checks
- Cost optimisation anomalies
- Version mismatch conditions

--------------------------------------------------------------------------------
# 6. INTERACTION DESIGN

## 6.1 Hover Interaction

Hovering a node shows:

- Node name  
- Description (one line)  
- Current health  
- % complete  
- Last updated timestamp  
- Linked incidents  
- Linked watchdog warnings  
- “Ask Maturion about this node” button  

## 6.2 Click Interaction

Clicking a node opens the **Node Details Panel**.

Contents include:

1. Summary  
2. Health reason  
3. Watchdog telemetry  
4. Related incidents  
5. Autonomy limits  
6. Memory boundaries  
7. Linked documents  
8. Linked code  
9. Maturion diagnostic view  
10. “Drill Down” button  

## 6.3 Drill-Down Behaviour

Standard tree navigation:

ROOT
└─ Level
└─ Sub-Level
└─ Function
└─ Module
└─ Component (leaf)

pgsql
Copy code

Each deeper layer loads dynamically to limit overhead.

--------------------------------------------------------------------------------
# 7. SCREEN LAYOUT (UI COMPOSITION)

### 7.1 Top-Level Layout

| Left Sidebar (filters, modes) | Main Tree Canvas |
| Node Details Drawer (opens on click) |
markdown
Copy code

### 7.2 Left Sidebar — Filtering Controls

Filters include:

- Show only red nodes  
- Show only amber nodes  
- Show only nodes with active incidents  
- Show nodes with unresolved watchdog events  
- Highlight autonomy violations  
- Highlight incomplete modules  
- Highlight cost anomalies  

### 7.3 Main Canvas — Tree View

- Pan & zoom support  
- Expand/collapse branches  
- Dynamic layout scaling  
- Smooth transitions for node expansion  
- Colour-coded connections  

### 7.4 Node Details Drawer

Slides from bottom or right.

Contains:

- Health summary  
- Watchdog breakdown  
- Linked incidents with severity icons  
- Timeline of recent changes  
- “Ask Maturion for guidance” input box  
- Buttons:  
  - View Code  
  - View Document  
  - Open Module Dashboard  
  - Trigger Maturion Diagnostic  
  - Create Issue  

--------------------------------------------------------------------------------
# 8. DATA MODEL FOR TREE NODES

### 8.1 Node Structure

Node {
id: string
name: string
type: "root" | "layer" | "subsystem" | "module" | "leaf"
parentId?: string
children: Node[]
status: "green" | "amber" | "red" | "grey" | "blue" | "purple"
completion?: number
description: string
linkedDocuments?: string[]
linkedModules?: string[]
linkedCodePaths?: string[]
lastUpdated: string
watchDogSignals?: WatchdogSignal[]
incidents?: IncidentRef[]
}

shell
Copy code

### 8.2 IncidentRef

IncidentRef {
id: string
category: string
severity: string
}

shell
Copy code

### 8.3 WatchdogSignal

WatchdogSignal {
source: "Guardian" | "Sentinel" | "Arbiter"
type: string
severity: string
message: string
}

csharp
Copy code

--------------------------------------------------------------------------------
# 9. TREE → WATCHDOG INTEGRATION

Node status is computed from:

status = aggregateStatus(Guardian, Sentinel, Arbiter, IWMS, Autonomy, QA)

sql
Copy code

Rules:

- ANY red → node is red  
- amber warnings roll upward  
- ARC review (purple) overrides others  
- green only if all checks pass  

Drill-down lets you trace anomalies to their source.

--------------------------------------------------------------------------------
# 10. MATURION INTERACTION MODEL

Every node has an "Ask Maturion" interface.

When invoked, Maturion receives:

{
nodeId,
nodePath,
incidents,
watchdogSignals,
autonomyContext,
memoryContext,
healthState
}

markdown
Copy code

Maturion then provides:

- Explanation  
- Recommended actions  
- Risk implications  
- Next step guidance  
- Ability to create fixes or issues  

This becomes the core of your operational oversight workflow.

--------------------------------------------------------------------------------
# 11. PERFORMANCE CONSTRAINTS

The tree must:

- Handle deep hierarchies  
- Support lazy loading of nodes  
- Compute status efficiently  
- Cache non-critical metrics  
- Update critical status (red/amber) in real time  

--------------------------------------------------------------------------------
# 12. IMPLEMENTATION ROADMAP

### Phase 1 — Static Tree Rendering  
- Basic structure  
- Manual status assignment  

### Phase 2 — Live Data Binding  
- Watchdog integration  
- IWMS integration  
- Autonomy context  

### Phase 3 — Drill-Down Panels  
- Node details + incidents  
- Navigation  

### Phase 4 — Maturion Interaction  
- Ask/diagnose per-node  
- Corrective suggestions  

### Phase 5 — Full Operational Dashboard  
- Real-time telemetry  
- Full “Christmas tree” behaviour  
- Mobile support  

--------------------------------------------------------------------------------
# END OF FILE

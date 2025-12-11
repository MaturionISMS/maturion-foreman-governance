# PLATFORM TREE — PHASE 4 IMPLEMENTATION BLUEPRINT  
Version: 1.0  
Status: Build Orchestration Specification (Analytics & Trends)  
Owner: Johan  
Last Updated: YYYY-MM-DD  

--------------------------------------------------------------------------------
# 1. PURPOSE OF PHASE 4

Phase 4 extends the Platform Tree from a **real-time diagnostic surface** into a  
**historical, trend-aware and predictive analytics system**.

Where:

- Phase 1 → static structure  
- Phase 2 → live status & events  
- Phase 3 → diagnostics & remediation  

Phase 4 adds:

- historical health timelines per node  
- trend analytics (getting better / worse / oscillating)  
- incident history overlays  
- drift and stability scores  
- performance & cost trends  
- “hotspot” detection across the tree  
- early-warning indicators (“risk of failure soon”)  

This gives Johan and Maturion a **time dimension** on top of the architecture.

--------------------------------------------------------------------------------
# 2. OBJECTIVES OF PHASE 4

By the end of Phase 4, the Platform Tree must:

1. Show **historical status changes** per node (timeline).  
2. Track trends for:
   - status (red/amber/green transitions)  
   - incidents counts & severity over time  
   - watchdog warnings frequency  
   - performance metrics (latency, errors, drift, cost)  
3. Compute stability / volatility metrics per node.  
4. Highlight **problem clusters**:
   - nodes that frequently fail  
   - layers with recurring instability  
5. Provide a **Time Slider / Time Filter** to explore past states.  
6. Give Maturion access to this history for better diagnostics and recommendations.

Phase 4 does **NOT** introduce fully autonomous predictive rebuilding or self-healing loops without human confirmation — that stays under strict governance.

--------------------------------------------------------------------------------
# 3. SCOPE OF PHASE 4 (STRICT)

### IN SCOPE

- Capture and store node status history.  
- Capture incident and watchdog event summaries over time.  
- Compute per-node trend metrics (improving / degrading / unstable / stable).  
- Add timeline visual to NodeDetailsPanel.  
- Add global “Analytics View” mode to the tree (hotspot highlighting).  
- Allow time-filtered views (e.g. “last 24h / 7d / 30d / 90d”).  
- Provide APIs for Maturion to query historical data per node.  

### OUT OF SCOPE

- Automatic restructuring of the tree based on analytics.  
- Auto-escalation of autonomy based purely on positive trends.  
- Machine learning forecast models on cost or performance (can be future Phase 5+).  

--------------------------------------------------------------------------------
# 4. DATA ARCHITECTURE EXTENSIONS

Phase 4 requires **persistent historical storage** for node health and events.

### 4.1 Node Health History

New backend model:

```ts
NodeHealthSnapshot {
  nodeId: string;
  timestamp: string; // ISO
  status: "green" | "amber" | "red" | "grey" | "blue" | "purple";
  completion: number | null;
  incidentCount: number;
  highSeverityIncidentCount: number;
  watchdogWarningCount: number;
  watchdogErrorCount: number;
  driftScore?: number;
  latencyMs?: number;
  errorRate?: number;
  costUsage?: number;
}
Snapshots are taken:

at fixed intervals (e.g. every 5 minutes), and/or

on significant events (status change, new incident, watchdog error).

4.2 Analytics Aggregation Model
Derived metrics:

ts
Copy code
NodeTrendMetrics {
  nodeId: string;
  window: "1d" | "7d" | "30d" | "90d";
  uptimePercentage: number;
  redTimePercentage: number;
  amberTimePercentage: number;
  incidentFrequency: number;   // per unit time
  meanDriftScore?: number;
  meanLatencyMs?: number;
  costDelta?: number;
  trendDirection: "improving" | "degrading" | "stable" | "volatile";
}
5. BACKEND API EXTENSIONS
New endpoints:

5.1 GET /tree/node/{id}/history
Query parameters:

from (optional)

to (optional)

window (optional preset: 1d/7d/30d/90d)

Response:

ts
Copy code
NodeHealthSnapshot[]
5.2 GET /tree/node/{id}/trends
Response:

ts
Copy code
NodeTrendMetrics
5.3 GET /tree/hotspots
Returns nodes with the highest instability / risk in the last time window.

Query params:

window (1d/7d/30d)

limit (default 10)

Response:

ts
Copy code
HotspotNode[] // sorted by severity
Where:

ts
Copy code
HotspotNode {
  nodeId: string;
  score: number;  // composite risk/instability score
  summary: string;
}
5.4 GET /tree/analytics/summary
High-level aggregated analytics per layer:

how many nodes red/amber/green historically

worst-offending layers

most stable areas

Response (conceptual):

ts
Copy code
AnalyticsSummary {
  layers: {
    layerId: string;
    name: string;
    uptimePercentage: number;
    redTimePercentage: number;
    incidentFrequency: number;
    hotspotCount: number;
  }[];
}
6. FRONTEND FEATURES (PHASE 4)
6.1 Time Filter Controls
Add to PlatformTreePage:

Time window dropdown:

Last 24h

Last 7 days

Last 30 days

Custom range (optional future)

These control:

which history data is fetched

how trends and hotspots are computed

6.2 Analytics View Toggle
Modes:

Live View (default):

as defined in Phases 2–3

Analytics View:

nodes coloured based on trend, not just current status

Trend colour examples:

Dark Red → consistently bad (high redTimePercentage)

Orange → degrading

Teal → improving

Grey → insufficient data

6.3 NodeDetailsPanel — History & Trend Tab
Add a new tab or section:

“History & Trends”

Contents:

Status timeline chart (sparkline)

Incident timeline (bar/marker)

Drift score over time (if available)

Latency / error rate trend (if available)

Trend summary text:

“This node has been stable for the last 7 days.”

“This node has experienced frequent failures in the last 24h.”

6.4 Hotspot Highlighting
In Analytics View:

Nodes with high score from /tree/hotspots:

glow, pulse, or extra border

Filter panel option:

“Show only hotspots”

7. METRICS ENGINE DESIGN (LOGIC OVERVIEW)
7.1 Trend Direction Logic
Simple initial logic (can be evolved later):

ts
Copy code
if redTimePercentage > 40% in window:
  trendDirection = "degrading";

else if redTimePercentage < 5% AND incidentFrequency == 0:
  trendDirection = "improving" | "stable";

else if high variance (alternating red/green):
  trendDirection = "volatile";

else:
  trendDirection = "stable";
Latency, drift, errorRate, and cost can adjust this.

7.2 Hotspot Score
Example formula:

ts
Copy code
score = 
  (redTimePercentage * weightRed) +
  (incidentFrequency * weightIncident) +
  (driftScore * weightDrift) +
  (latencyPenalty) +
  (recentnessBoost);
Exact weights to be tuned later.

8. MATURION INTEGRATION (ANALYTICS AWARENESS)
Maturion’s diagnostics (Phase 3) may now also consume:

NodeTrendMetrics

NodeHealthSnapshot[]

Use in reasoning:

detect chronic vs acute issues

prioritise where to focus

recommend strategic fixes (architecture level, not just tactical)

Example:

“This node has been unstable for 30 days and is responsible for 40% of red time on this layer.
I recommend structural refactoring rather than another patch.”

9. TESTING REQUIREMENTS
9.1 Backend Analytics
Correct snapshot creation cadence

Correct trend computation over known synthetic data

Correct hotspot selection logic

Performance tests on larger trees (#nodes scale)

9.2 Frontend Behaviour
Time filter changes reload data and re-render charts

Analytics View toggling works without breaking Live View

History charts render correctly with sparse and dense data

Hotspot highlighting works and filters correctly

9.3 Integration With Diagnostics
Diagnostics can see and use NodeTrendMetrics

No regressions in existing diagnostics flow

10. ACCEPTANCE CRITERIA
Phase 4 is complete when:

Every node has a History & Trends view.

The Analytics View mode is functional:

trend-based colouring

hotspots highlighted

The tree can be explored historically (last 7/30 days).

Maturion can use analytics data in its diagnostic explanations.

No guardrails or governance rules are violated:

no tenant data leakage

no constitutional structures changed

no autonomy modifications without governance approval

11. FUTURE EXTENSIONS (NOT PART OF PHASE 4)
Potential Phase 5+ ideas:

ML-based predictive failure models

early-warning risk scores per layer

forecast visualisations (“likely to go red in 3 days”)

automated scheduling of preventive actions

cross-tenant pattern detection (only if allowed and isolated properly)

These must be designed under separate governance specifications.


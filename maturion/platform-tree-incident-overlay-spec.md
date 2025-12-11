# PLATFORM TREE INCIDENT OVERLAY SPECIFICATION  
Version: 1.0  
Status: Visualisation & Interaction Specification  
Owner: Johan  
Last Updated: YYYY-MM-DD  

--------------------------------------------------------------------------------
# 1. PURPOSE

This document defines **how incidents are visualised, interacted with, and  
navigated** in the Maturion Platform Tree.

The Incident Overlay provides:

- instant visual awareness of where incidents are concentrated  
- severity-aware markings on nodes  
- connections between incidents, watchdog signals, and node health  
- drill-down to incident details and IWMS views  
- time-aware overlays (recent vs historical incidents)  
- inputs to Maturion diagnostics  

The overlay does **not** change the tree structure — it decorates it with  
incident-related information.

--------------------------------------------------------------------------------
# 2. SCOPE

The Incident Overlay covers:

- **System-level incidents** (Maturion itself)  
- **Build/GitHub incidents** (Builder-Maturion)  
- **Risk/ISMS incidents** (Risk-Maturion)  
- **Governance and constitutional incidents**  
- **Security incidents** (highest severity)  

The overlay provides:

- node badges  
- tooltips  
- incident counts  
- severity indicators  
- time filters  
- drill-through to IWMS  

The overlay must respect:

- Tenant Isolation Standard  
- Guardrails & Safety Charter  
- Oversight System  
- Incident Taxonomy  

--------------------------------------------------------------------------------
# 3. INCIDENT DATA MODEL (SUMMARY VIEW)

The overlay consumes **incident summaries**, not full incident payloads.

### 3.1 Incident Summary Object

```ts
IncidentSummary {
  id: string;
  category: string;       // from incident taxonomy
  subcategory?: string;
  severity: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  status: "open" | "acknowledged" | "mitigated" | "closed";
  nodeId: string;         // associated tree node
  timestamp: string;      // ISO date
  shortDescription: string;
  tenantContext?: string; // null for system/global incidents
}
The overlay uses only safe, non-sensitive fields.

4. VISUAL ELEMENTS
4.1 Node Incident Badge
Every node can display a small badge cluster representing incident state.

Badge properties:

Shape: small circle or pill near the node label

Colour:

RED → at least one HIGH / CRITICAL open incident

AMBER → only LOW / MEDIUM open incidents

GREY → incidents only in closed/mitigated state (optional)

Number:

optional numeric count of open incidents (1, 2, 3+)

4.2 Incident Severity Icon
Severity mapping:

🔴 HIGH/CRITICAL

🟡 LOW/MEDIUM

Used in:

Node badge

NodeDetailsPanel incident list

4.3 Incident Timeline Markers
On the node’s History & Trends view, incidents are shown as:

vertical markers on the timeline

with severity colour coding

hoverable for incident summary

5. INCIDENT SOURCES & MAPPINGS
Incident Overlay consumes incidents classified by:

maturion-incident-taxonomy.md

5.1 Mappings by Category
Examples:

Category 1, 2, 3 → Governance / Guardrail / Memory safety

Category 6 → Build System / PR / GitHub

Category 7 → Risk / ISMS

Category 8 → Runtime

Category 9 → Security

Each incident links to:

a specific node (nodeId), and

a category in taxonomy.

Nodes may accumulate incidents from multiple categories.

6. BACKEND ENDPOINTS (INCIDENT OVERLAY)
6.1 GET /tree/node/{id}/incidents
Returns incident summaries for a specific node.

Query parameters:

includeClosed (default: false)

from (optional)

to (optional)

severity (optional filter)

Response:

ts
Copy code
IncidentSummary[]
6.2 GET /tree/incidents/summary
Returns incident aggregates for all nodes (for quick badge rendering).

Response:

ts
Copy code
NodeIncidentSummary {
  nodeId: string;
  openCount: number;
  highSeverityOpenCount: number;
  latestIncidentTimestamp?: string;
}[]
6.3 GET /tree/incidents/recent
Returns recent incidents across the tree (for analytics, dashboards, etc.).

Query:

window (e.g. "24h", "7d")

Response:

ts
Copy code
IncidentSummary[]
6.4 Integration With IWMS
For each incident:

an IWMS deep link should be provided server-side, or resolvable:

ts
Copy code
IncidentSummary {
  ...
  iwmsUrl?: string;
}
Frontend uses this for “View in IWMS” actions.

7. UI/UX SPEC — TREE OVERLAY
7.1 Node-Level Overlay (Tree Canvas)
For each node:

if there are open incidents:

show badge

colour badge by highest severity of open incidents

hover tooltip includes:

“Incidents: X open (Y high severity)”

latest incident timestamp

optional short summary (“Most recent: [category]”)

7.2 Filter Controls (Sidebar)
Add filters:

Toggle: Show only nodes with incidents

Severity filters:

show only nodes with CRITICAL / HIGH incidents

show nodes with any open incidents

Status filters:

include/exclude closed/mitigated incidents

7.3 Heat-Map Style Highlight (Optional Enhancement)
In Analytics View:

opacity or glow intensity increases with open incident count or HotspotScore

top 5–10 highest incident nodes labeled as “Hotspots”

8. UI/UX SPEC — NODE DETAILS PANEL (INCIDENTS)
NodeDetailsPanel gets a dedicated “Incidents” section.

8.1 Content
Shows:

Key stats:

open incident count

high severity count

last incident time

List of incidents with:

severity icon

category / subcategory

shortDescription

status

timestamp

“View in IWMS” action (per incident)

8.2 Interactions
For authorised users (e.g. Johan):

Button: “Open Incident in IWMS”

Button: “Create New Incident” (opens IWMS with prefilled context)

Button: “Link Node to Existing Incident” (optional future feature)

9. TIMELINE OVERLAY
The “History & Trends” view (from Phase 4) shows incidents over time:

Each incident appears as a vertical marker

Colour determined by severity

Hover → show brief incident summary

Multiple incidents on the same day can be aggregated into a stacked indicator

Optional:

Toggle: show/hide incident markers

Toggle: show only high-severity incidents

10. RELATION TO METRICS ENGINE
The Incident Overlay feeds the Metrics Engine fields:

incidentCount

highSeverityIncidentCount

IncidentFrequency

HighSeverityIncidentFrequency

HotspotScore components

The overlay is visual, the Metrics Engine is computational.
They must be consistent.

When an incident is:

created → metrics + overlay update

updated (status) → metrics + overlay update

closed → badge adjusted, metrics recomputed

11. MATURION DIAGNOSTICS INTEGRATION
The Incident Overlay strongly supports Maturion’s diagnostics.

When Johan clicks “Ask Maturion” on a node:

Maturion receives:

incident summaries for that node

long-term incident statistics (from Metrics Engine)

severity mix (LOW/MEDIUM/HIGH/CRITICAL)

recentness (spikes vs old issues)

Maturion can then say things like:

“This node has had 3 HIGH severity governance incidents in the last 7 days,
which suggests a structural guardrail alignment problem rather than a
transient bug.”

Or:

“No incidents in 90 days; risk here is historically low.”

12. GOVERNANCE & SAFETY CONSTRAINTS
The Incident Overlay must:

NEVER display tenant-specific private data on the global/system tree

Only show tenantContext where user has permission and tree is tenant-scoped

Follow the Incident Taxonomy strictly

Never expose sensitive incident payloads in tooltips (only summaries)

Respect all guardrails and Tenant Isolation Standard

For CRITICAL incident types (e.g. security, cross-tenant leakage):

Overlay should provide clear visual emphasis:

red flashing border

icon overlay

“Critical” label

And the tree MUST:

highlight the relevant node(s)

allow Johan to quickly see all CRITICAL-incident nodes

13. PERFORMANCE CONSIDERATIONS
Incident summary data should be cached and paginated where needed

Full incident detail (from IWMS) is loaded lazily (only on deep link)

Avoid overloading the tree with too many text labels; use clusters and badges

For trees with many nodes:

provide summarised incident indicators at parent level

only fetch detailed incident lists when NodeDetailsPanel opens

14. TESTING REQUIREMENTS
14.1 Unit Tests
Correct severity badge colour per node

Correct aggregation of open/high severity incidents

Correct tooltip content

14.2 Integration Tests
Node with multiple incidents displays correct badge & list

Closing incidents updates overlay correctly

Filters behave correctly (e.g., show only CRITICAL)

14.3 Governance Tests
Verify no tenant-specific sensitive info is rendered in global tree

Verify security and constitutional incidents are clearly highlighted

15. ACCEPTANCE CRITERIA
Incident Overlay is considered complete when:

Nodes visually indicate incident presence and severity.

NodeDetailsPanel shows correct incident lists and summaries.

History & Trends view overlays incidents correctly over time.

Filters allow focusing on high-risk nodes.

Maturion receives incident context as part of diagnostics.

All privacy, governance, and guardrail constraints are respected.


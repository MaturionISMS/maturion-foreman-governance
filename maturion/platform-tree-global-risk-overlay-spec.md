# GLOBAL RISK OVERLAY SPECIFICATION  
Version: 1.0  
Status: Enterprise Risk Intelligence Layer  
Owner: Johan  
Last Updated: YYYY-MM-DD  

--------------------------------------------------------------------------------
# 1. PURPOSE

The **Global Risk Overlay (GRO)** integrates full ISMS risk intelligence into the  
Platform Tree, enabling Maturion to:

- visualise global threats  
- map threats → vulnerabilities → risks → controls in real time  
- identify systemic weaknesses in the platform  
- correlate risk changes with technical incidents  
- surface high-risk areas directly on the tree  
- provide proactive risk-based guidance  

This overlay unifies:

- ISMS Threat Catalogue  
- Vulnerability Library  
- Risk Register  
- Control Inventory  
- Incident System  
- Watchdog signals  
- Predictive Health Engine  
- Autonomy System  

It becomes the **single visual map** of risk posture across the entire Maturion ecosystem.

--------------------------------------------------------------------------------
# 2. SCOPE

The GRO covers:

### 2.1 ISMS-Level Risks
- organisational threats  
- regulatory risks  
- industry-specific risk patterns  
- global risk profiles

### 2.2 Platform-Level Risks  
(e.g., Maturion’s own operational risks)
- governance breakdown  
- autonomy misuse  
- security failures  
- data isolation failures  
- memory boundary threats

### 2.3 Module-Level Risks
- specific ISMS module deficiencies  
- control gaps  
- drift in control effectiveness  
- vulnerability exploitation likelihood  

### 2.4 Embodiment-Level Risks  
- builder Maturion  
- risk Maturion  
- command Maturion  
- marketing Maturion  

Each embodiment carries its own virtual “risk footprint”.

--------------------------------------------------------------------------------
# 3. DATA MODEL

### 3.1 RiskOverlayItem

```ts
RiskOverlayItem {
  nodeId: string;
  riskScore: number; // 0–100
  riskLevel: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  topThreats: ThreatSummary[];
  topVulnerabilities: VulnerabilitySummary[];
  controlEffectiveness: number; // 0–100
  residualRisk: number; // 0–100
  trendDirection: "up" | "down" | "stable";
  lastUpdated: string;
}
3.2 ThreatSummary
ts
Copy code
ThreatSummary {
  id: string;
  name: string;
  likelihood: number; // 1–5
  velocity: number; // 1–5, how fast threat evolves
  category: string; // e.g., cyber, operational, supply chain
}
3.3 VulnerabilitySummary
ts
Copy code
VulnerabilitySummary {
  id: string;
  description: string;
  severity: number; // 1–5
  likelihoodOfExploitation: number; // 1–5
}
3.4 ControlSummary
ts
Copy code
ControlSummary {
  id: string;
  name: string;
  effectiveness: number; // 0–100
  failing?: boolean;
}
These objects are mapped to nodes through Risk Mapping Rules (see Section 6).

4. VISUAL OVERLAY ELEMENTS
4.1 Node Risk Indicator
Each node shows a risk badge (colour-coded):

Level	Colour	Meaning
LOW	Green	Risk well-managed
MEDIUM	Yellow	Risk moderate or emerging
HIGH	Orange	Risk significant
CRITICAL	Red	Requires immediate action

4.2 Node Outline (Severity Enhancement)
Red outline → critical risk

Pulsing → risk rising rapidly

Blue dot → control effectiveness changed recently

4.3 Expanded Risk Panel (NodeDetailsPanel)
overall risk score

inherent risk

residual risk

list of top threats

list of top vulnerabilities

control effectiveness chart

recommended treatments

“Ask Maturion” for reasoning

5. GLOBAL RISK HEATMAP VIEW
Switch tree mode → “Risk Heatmap”.

Nodes shaded by:

riskScore (0–100)

threat velocity

vulnerability density

control weakness

Colour gradient:

green → yellow → orange → red → deep red

Deep red signals systemic failure or uncontrolled risks.

6. RISK MAPPING RULES
Each node type receives a risk computation strategy.

6.1 ISMS Modules → Directly Mapped ISMS Risks
ISMS modules show:

threat likelihood

vulnerability severity

control effectiveness

residual risk

6.2 Platform Architecture Nodes
Platform-level nodes map operational platform risks:

autonomy misuse

watchdog error density

memory boundary instability

cross-tenant isolation stress

6.3 Embodiment Nodes
Embodiments carry risk based on:

recent violations

predictions from PHE

autonomy levels

drift behaviour

6.4 Constitution & Philosophy Nodes
These nodes map governance risk, not technical risk.

Risk factors:

ARC activity

constitutional violations

safe-learning boundary stress

7. RISK CALCULATION MODEL
7.1 Risk Score Formula (General)
text
Copy code
riskScore =
  w1 * threatScore +
  w2 * vulnerabilityScore +
  w3 * (100 - controlEffectiveness) +
  w4 * predictiveHealthRisk +
  w5 * autonomyRisk +
  w6 * watchdogRisk +
  w7 * isolationRisk
Weights differ per node type.

7.2 Control Effectiveness Influence
Controls dramatically reduce residual risk:

ini
Copy code
residualRisk = inherentRisk * (1 - controlEffectiveness/100)
7.3 Trend Detection
Trend direction:

“up” → if riskScore rising

“down” → declining risk

“stable”

Trend appears as a triangle icon:

▲ = up

▼ = down

■ = stable

8. BACKEND API REQUIREMENTS
8.1 Per-Node Risk
bash
Copy code
GET /tree/node/{id}/risk
Returns RiskOverlayItem.

8.2 Batch Risk Computation
bash
Copy code
GET /tree/risk/heatmap
Optimized for fast rendering.

8.3 Threat/Vulnerability/Control APIs
bash
Copy code
GET /isms/threats
GET /isms/vulnerabilities
GET /isms/controls
GET /isms/risks
The tree aggregates these per-node through mapping rules.

8.4 Predictive Integration
bash
Copy code
GET /tree/node/{id}/predictive-health
PHE output feeds into risk scoring.

9. MATURION DIAGNOSTIC INTEGRATION
When Johan clicks “Ask Maturion”:

Maturion receives:

risk scores

threat clusters

vulnerability patterns

control gaps

predictive risk

past incidents

watchdog patterns

autonomy levels

Example reasoning output:

“Residual risk for the Supply Chain module is rising due to increasing
vulnerability exploitation likelihood and declining control effectiveness.
Recommended actions: tighten monitoring, increase sampling frequency,
validate vendor posture.”

10. AUTONOMY INTEGRATION
Autonomy rules:

if node risk = CRITICAL → autonomy cannot exceed Level 1

if HIGH → autonomy capped to Level 2

medium/low can allow Levels 2–3

Level 4 autonomy ALWAYS requires explicit approval

Risk dynamically bounds autonomy.

11. SECURITY / ISOLATION INTERACTION
Security incidents influence risk heavily:

Arbiter isolation violation → CRITICAL risk

cross-tenant data attempt → tree-wide risk spike

degraded isolation → escalating risk trend

Tenant isolation is ALWAYS respected:

Threat data cannot cross tenants

Vulnerabilities never compared across tenants

Controls evaluated tenant-by-tenant

12. TESTING REQUIREMENTS
12.1 Unit Tests
risk scoring

control effectiveness calculations

trend detection

threat/vulnerability mapping

12.2 Integration Tests
with Predictive Health Engine

with Incident Overlay

with Watchdog Visualisation

12.3 Scenario Tests
threats rising → risk increases

controls weakening → risk increases

incidents resolved → risk reduces

12.4 Governance Tests
autonomy bounded by risk

tenant isolation enforced

13. ACCEPTANCE CRITERIA
The Global Risk Overlay is complete when:

Every node displays live risk scoring.

Risk heatmap mode works across entire tree.

Threats/vulnerabilities/controls map correctly.

Predictive risk is reflected in scoring.

Maturion diagnostics incorporate risk posture.

Autonomy is constrained based on risk.

Tenant isolation fully preserved.

END OF FILE

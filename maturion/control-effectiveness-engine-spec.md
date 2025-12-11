# CONTROL EFFECTIVENESS ENGINE SPECIFICATION  
Version: 1.0  
Status: Governance & ISMS Control Validation Engine  
Owner: Johan  
Last Updated: YYYY-MM-DD  

--------------------------------------------------------------------------------
# 1. PURPOSE

The **Control Effectiveness Engine (CEE)** continuously evaluates the performance,  
strength, health, and reliability of all organisational, technical, governance,  
and AI controls across the entire Maturion ecosystem.

CEE answers:

- Are security controls functioning effectively?
- Are governance controls being bypassed?
- Are operational controls degrading?
- Are risk-mitigation controls reducing real exposure?
- Are watchdogs operating as intended?
- Are controls drifting or weakening over time?
- What controls are failing or require improvement?
- How effective are controls per tenant, per module, and globally?

CEE provides **quantitative metrics**, **trend-based insights**, and **predictive early warnings** for every control in the system.

It integrates with ISMS methodology:

- Threat → Vulnerability → Control → Residual Risk  
- Control monitoring → Control testing → Control evaluation  
- Governance assurance → Oversight → Improvement loops  

--------------------------------------------------------------------------------
# 2. SCOPE

CEE evaluates controls across multiple layers:

### 2.1 ISMS Controls
- Administrative  
- Technical  
- Physical  
- Regulatory  

### 2.2 Platform & Architecture Controls
- constitutional guardrails  
- memory boundaries  
- sandbox isolation  
- tenant isolation  
- autonomy safety  
- mutation boundaries  
- builder governance  
- world-model boundaries  

### 2.3 AI-Specific Controls
- watchdog triad enforcement (Guardian, Sentinel, Arbiter)  
- drift detection  
- output safety compliance  
- behavioural consistency  

### 2.4 Operational Controls
- monitoring  
- incident response  
- threat detection  
- backup & resilience  

### 2.5 Business & Risk Controls
- risk treatment plans  
- control owners & accountability  
- periodic validations  

--------------------------------------------------------------------------------
# 3. CONTROL MODEL

Each control is represented as:

```ts
Control {
  id: string;
  name: string;
  description: string;
  category: "ISMS" | "Governance" | "Security" | "Operational" | "AI" | "Platform";
  subcategory?: string;
  controlOwner: string;
  expectedFrequency: "continuous" | "daily" | "weekly" | "monthly" | "quarterly" | "annual";
  targetEffectiveness: number; // percentage 0–100
  linkedRisks: string[];
  linkedNodes: string[];
}
4. CONTROL EFFECTIVENESS DATA MODEL
CEE produces structured effectiveness metrics:

ts
Copy code
ControlEffectivenessRecord {
  controlId: string;
  timestamp: string;
  effectivenessScore: number; // 0–100
  confidence: number; // 0–1
  evidenceSources: string[];
  indicators: ControlIndicator[];
  trendDirection: "up" | "down" | "stable";
  riskImpactDelta?: number;
}
Indicators
ts
Copy code
ControlIndicator {
  type: 
    | "process_adherence"
    | "watchdog_events"
    | "incident_correlation"
    | "drift_signals"
    | "sandbox_violations"
    | "boundary_integrity"
    | "latency"
    | "error_rate"
    | "predictive_risk"
    | "threat_alignment";
  severity: "info" | "warn" | "error";
  message: string;
  weight: number;
}
5. CONTROL EFFECTIVENESS FORMULA
Baseline:

text
Copy code
effectivenessScore = 
  100 
  - w1 * incidentCorrelation
  - w2 * driftIndex
  - w3 * watchdogSeverity
  - w4 * sandboxViolations
  - w5 * boundaryIntegrityWeakness
  - w6 * predictiveRiskImpact
  - w7 * threatPressure
Where:

high incident correlation → low effectiveness

high drift → control failing

repeated watchdog errors → control failing

sandbox violations → severe integrity issues

predictive risk rising → control degrading

threat velocity increasing → control insufficient

Weights vary per control category.

6. TREND ANALYSIS
CEE computes:

24h change

7-day trend

30-day long-term performance curve

Trend indicator feeds:

Risk Overlay

Predictive Health Engine

Proactive Governance Engine

If trend < threshold → Control Weakening Warning.

If trend deteriorates rapidly → Control Failure Prediction.

7. CONTROL MATURITY MODEL
CEE also computes a maturity score (0–5):

Level	Description
0	No control working
1	Ad-hoc and inconsistent
2	Documented but unreliable
3	Managed, measurable, partially automated
4	Well-controlled, automated, validated with evidence
5	Continuous self-monitoring and self-correcting

Maturity affects risk-level adjustments.

8. CONTROL EFFECTIVENESS DASHBOARD (TREE OVERLAY)
Each node renders:

8.1 Control Status Indicator
🛠️ icon with colour:

green → effective

yellow → moderate issues

orange → degrading control

red → failing control

purple → governance-critical failure

8.2 Hover Tooltip
makefile
Copy code
Control: SC-27 Continuous Monitoring
Effectiveness: 63% (Down 12% this week)
Maturity: Level 3
Indicators: sandbox violations (+2), drift (+1)
Confidence: 0.87
8.3 NodeDetailsPanel — “Controls” Section
Includes:

list of controls mapped to node

current effectiveness

evidence sources

maturity

recent activity logs

failing indicators

recommended remediation

9. BACKEND ARCHITECTURE REQUIREMENTS
9.1 Compute Effectiveness
bash
Copy code
GET /controls/effectiveness/{controlId}
9.2 Batch Control Effectiveness
sql
Copy code
GET /controls/effectiveness/all
9.3 Evidence Collection
CEE must ingest:

Watchdog logs

Sandbox logs

Boundary logs

Incident data

Trend data

Predictive health data

Risk overlay outputs

9.4 Controls Catalog API
bash
Copy code
GET /controls/catalog
PUT /controls/update
9.5 Control → Node Mapping
arduino
Copy code
GET /controls/map/{nodeId}
10. GOVERNANCE SYSTEM INTEGRATION
CEE drives:

10.1 Autonomy Restrictions
If critical controls fail:

Autonomy caps lowered

Builder restricted

Sandbox type restricted

Arbiter heightened

10.2 Proactive Governance Decisions
Controls trending downward trigger:

pre-emptive interventions

recommendations

IWMS incidents

ARC review

10.3 Risk Overlay Adjustments
Low control effectiveness → increased residual risk.

11. MATURION DIAGNOSTICS INTEGRATION
When Johan asks “What’s wrong here?”
Maturion will cite:

failing controls

indicators

trend direction

missing evidence

predicted failure

recommended actions

Example output:

“Control ISMS.AC-12 (Access Review) is currently at 42% effectiveness.
Trend is weakening. Sandbox access attempts correlate with recent
risk spikes. Recommend immediate remediation.”

12. TESTING REQUIREMENTS
12.1 Unit Tests
indicator weighting

effectiveness formula

maturity model

trend computation

12.2 Integration Tests
CEE ↔ Risk Overlay

CEE ↔ Predictive Health Engine

CEE ↔ Watchdogs

CEE ↔ Proactive Governance Engine

12.3 Scenario Tests
rising incidents → decreasing effectiveness

strong controls → decreasing residual risk

weak controls → autonomy capped

12.4 Safety Tests
ensure no tenant leakage in control evaluation

ensure evidence is anonymised for reporting

13. ACCEPTANCE CRITERIA
CEE is complete when:

Every control has a computed effectiveness score.

Scores update automatically via live evidence streams.

Trend indicators work at 24h, 7d, and 30d windows.

Controls map correctly to tree nodes.

Governance decisions respond to control failures.

Predictive health incorporates control decay.

Autonomy adjusts based on control strength.

Tenant isolation is preserved.

Maturion diagnostics include control performance reasoning.

END OF FILE

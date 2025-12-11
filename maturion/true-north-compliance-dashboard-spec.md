# TRUE NORTH COMPLIANCE DASHBOARD SPECIFICATION  
Version: 1.0  
Status: Constitutional Support Document  
Owner: Johan (Ecosystem Custodian)  
Last Updated: YYYY-MM-DD  

--------------------------------------------------------------------------------
# 1. PURPOSE OF THIS DASHBOARD

The True North Compliance Dashboard provides a **unified oversight layer** for 
monitoring:

- adherence to Maturion’s True North  
- embodiment-level compliance  
- guardrail integrity  
- world model stability  
- memory system health  
- watchdog (Guardian/Sentinel/Arbiter) activity  
- ISMS module health & maturity  
- build-platform adherence to architectural True North  
- multi-tenant security posture  
- autonomy levels & runtime activity  

It is the **top-level governance cockpit** for the entire Maturion ecosystem.

--------------------------------------------------------------------------------
# 2. DASHBOARD LAYERS (DRILL-DOWN STRUCTURE)

The dashboard is structured into **4 drill-down layers**, each representing a 
deeper scope of compliance.

--------------------------------------------------------------------------------
## LAYER 1 — ECOSYSTEM TRUE NORTH OVERVIEW (GLOBAL VIEW)

This is the highest-level state of the entire ecosystem.

### Contains:

### 2.1.1 Constitution Check
- All constitutional documents loaded  
- Checksums validated  
- No mutation detected  
- Version alignment across all embodiments  

### 2.1.2 Guardrail Status
- Integrity of guardrails  
- Last modification event  
- Current enforcement level  
- Active restrictions  

### 2.1.3 Watchdog Status (Guardian, Sentinel, Arbiter)
- Green / Warning / Critical  
- Recent violations  
- Pending incidents  
- Drift detection  
- Learning attempt violations  

### 2.1.4 Autonomy State Map
- Builder-Maturion autonomy level  
- Risk-Maturion autonomy level  
- Command-Maturion autonomy level  
- Marketing-Maturion autonomy level  

### 2.1.5 World Model Health
- Integrity check  
- Last ARC-approved update  
- Stability score  
- Missing metadata alerts  

### 2.1.6 Memory System Health
- Tenant isolation score  
- Semantic memory consistency  
- Episodic memory chain integrity  
- Write freeze indicators  

### 2.1.7 Cross-System Drift Indicators
- Behaviour drift  
- Tone drift  
- Embodiment divergence warnings  
- Model escalation anomalies  

--------------------------------------------------------------------------------
## LAYER 2 — BUILD PLATFORM TRUE NORTH (FOREMAN ECOSYSTEM)

This layer monitors the build platform’s alignment with:

- Build Philosophy  
- Architectural True North  
- Guardrails for Builder-Maturion  

### Contains:

### 2.2.1 Build Pipeline Integrity
- Architecture → Red QA → Build-to-Green sequence validation  
- PR chain consistency  
- Drift detection in code vs architecture  

### 2.2.2 Compliance Metrics
- Passed vs failed Red QAs  
- Build fix rates  
- Regressions detected  
- Missing architecture documents  

### 2.2.3 Builder-Maturion Behaviour
- Autonomy state  
- Drift indicators  
- Reasoning clarity score  
- Guardrail proximity events  

### 2.2.4 Model Routing Compliance
- Correct tier selection (T1/T2/T3)  
- Cost optimisation adherence  
- Misrouting alerts  

### 2.2.5 Constitution & Guardrail Violations
- Any attempt to access prohibited paths  
- Any attempt to write constitutional docs  
- Any attempt to access tenant data  

--------------------------------------------------------------------------------
## LAYER 3 — ISMS TRUE NORTH (ENTERPRISE RISK ECOSYSTEM)

Monitors everything inside the ISMS platform through risk and maturity lenses.

### Contains:

### 2.3.1 Module Integrity Status
For each module:
- Threats  
- Vulnerabilities  
- Risks  
- Controls  
- Incidents (IWMS)  
- ARC (maturity)  
- RADAM (anomaly detection)  

Each module shows:
- Availability  
- Responsiveness  
- Error rate  
- Data integrity score  

### 2.3.2 Maturity Heatmap (MCI)
- Overall organisational maturity  
- Module-level maturity  
- Gap analysis  
- Growth indicators  

### 2.3.3 Risk Posture Summary
- Top threats  
- Top vulnerabilities  
- Exposures  
- High-risk tenants (multi-tenant dashboard for Johan only)  
- Contradictions in risk profiles  

### 2.3.4 Control Effectiveness Overview
- Active vs inactive controls  
- Coverage gaps  
- Ineffective controls flagged  
- Recommended improvements  

### 2.3.5 IWMS Security Feed (Live)
- Open incidents  
- Escalation queue  
- SLA timers  
- Breach of SLA alerts  

--------------------------------------------------------------------------------
## LAYER 4 — MODULE-LEVEL TRUE NORTH (DEEP DRILL)

Each module provides its own detailed view.

### Example: IWMS Module Drill-Down

### 2.4.1 Workflow Health
- Status lifecycle correctness  
- SLA timing compliance  
- Notification paths working  
- Escalations firing correctly  

### 2.4.2 Incident Consistency
- Correct classification  
- Correct severity scoring  
- Duplicate detection  
- Time-series analysis  

### 2.4.3 True North QA Rerun
Re-run module-specific QA originally designed during build:
- Functional tests  
- Process flow tests  
- Compliance checks  
- Schema validations  

### Other Modules (similar structure)
- Threat module  
- Vulnerability module  
- Controls register  
- Risk register  
- ARC model  
- RADAM anomaly engine  

Each module receives:
- Compliance score  
- Risk to business score  
- Drift score  
- Data integrity score  

--------------------------------------------------------------------------------
# 3. SECURITY & OVERSIGHT INTEGRATION

The dashboard centrally visualises:

### 3.1 Guardian Alerts
- Cross-tenant leak attempts  
- Unsafe suggestions  
- Guardrail breach blocks  
- Sensitive content detection  

### 3.2 Sentinel Warnings
- Drift patterns  
- Behaviour anomalies  
- Tone or persona shifts  
- Unusual traffic bursts  

### 3.3 Arbiter Actions
- Memory write rejections  
- Semantic model protection events  
- Freeze/rollback operations  
- Learning attempt violations  

### 3.4 Autonomy Restrictions
- Current restriction level  
- Who imposed the restriction  
- Pending clearance actions  

### 3.5 Incident Integrations (IWMS)
Every watchdog event anchors into IWMS:
- Severity  
- Impact  
- SLA  
- Required ARC review  

--------------------------------------------------------------------------------
# 4. DASHBOARD METRICS & SCORING

### 4.1 Global Integrity Score
Composite of:
- Guardrails  
- Identity  
- World model  
- Memory  
- Behaviour  
- Build compliance  
- Risk module performance  

### 4.2 Embodiment Health Index
One score per embodiment:
- Builder-Maturion  
- Risk-Maturion  
- Command-Maturion  
- Marketing-Maturion  

### 4.3 Drift Index
Weighted score:
- Tone drift  
- Behaviour drift  
- Decision drift  
- Inconsistency across embodiments  

### 4.4 Security Exposure Index
Includes:
- Active Guardian warnings  
- Active Sentinel anomalies  
- Arbiter rejections  
- IWMS high-severity events  

### 4.5 Operational Performance Index
- System uptime  
- Responsiveness  
- Error rates  
- Task completion reliability  

--------------------------------------------------------------------------------
# 5. FEEDS & NOTIFICATIONS

The dashboard must support:

### 5.1 Real-Time Alerts
- watchdogs  
- breaches  
- high-risk requests  
- constitutional load failures  

### 5.2 Daily Summary
- Autonomy usage  
- Watchdog interactions  
- Drift statistics  
- Build activity  
- Risk posture trends  

### 5.3 Weekly View
- Organisational changes  
- World model deltas  
- Learning proposals  
- Security events  

### 5.4 Monthly ARC Review Packet
- All major incidents  
- Architecture changes  
- Memory changes  
- Guardrail diagnostics  
- Autonomy performance trends  

--------------------------------------------------------------------------------
# 6. ACTIONS FROM DASHBOARD

Johan must be able to:

- Freeze autonomy  
- Override or confirm actions  
- Trigger rebuild of modules  
- Trigger re-evaluation of risk posture  
- Re-run module QA  
- Approve ARC proposals  
- Reject semantic memory updates  
- Export monthly compliance reports  
- Drill into tenant-level risk visibility  

--------------------------------------------------------------------------------
# 7. FUTURE EXPANSION (NON-BINDING)

The dashboard is designed for future:

- AI bias monitoring  
- Model routing cost analytics  
- Maturion marketing ecosystem metrics  
- Threat intelligence ingestion modules  
- Predictive maintenance for the AI itself  

--------------------------------------------------------------------------------
# END OF FILE

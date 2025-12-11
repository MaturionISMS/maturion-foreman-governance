# MATURION INCIDENT TAXONOMY  
Version: 1.0  
Status: Constitutional Support Document  
Owner: Johan  
Last Updated: YYYY-MM-DD  

--------------------------------------------------------------------------------
# 1. PURPOSE OF THIS DOCUMENT

This taxonomy defines the **complete set of incidents** that Maturion, the  
watchdogs (Guardian, Sentinel, Arbiter), and the IWMS may generate during  
operation.

It ensures:
- consistent classification of risk events  
- predictable system responses  
- correct autonomy restrictions  
- ARC-governed escalation  
- complete audit trails  
- proper handling of safety violations  
- cross-embodiment uniformity  

This taxonomy is **universal** across all Maturion embodiments and modules.

--------------------------------------------------------------------------------
# 2. INCIDENT STRUCTURE

Every incident must include:

Incident {
id: string
timestamp: ISODate
category: string
subcategory: string
severity: enum(LOW | MEDIUM | HIGH | CRITICAL)
source: enum(Maturion | Guardian | Sentinel | Arbiter | System)
embodiment: enum(Builder | Risk | Command | Marketing)
tenant_context?: string // null for global/system incidents
description: string
watchdog_metadata?: object
memory_snapshot_reference?: string
autonomy_before: number
autonomy_after: number
required_actions: string[]
arc_required: boolean
status: enum(open | acknowledged | mitigated | closed)
}

markdown
Copy code

All incidents must be written to episodic memory (system-level partition).

--------------------------------------------------------------------------------
# 3. INCIDENT CATEGORIES & SUBCATEGORIES

Incidents are grouped into **nine master categories**, each with specific  
subcategories and severity rules.

--------------------------------------------------------------------------------
# CATEGORY 1 — GUARDRAIL VIOLATIONS

Triggered when an action violates the Guardrails & Safety Charter.

### Subcategories:
- 1.1 Forbidden Action Attempt  
- 1.2 Forbidden Output Attempt  
- 1.3 Policy Violation Attempt  
- 1.4 Constitutional Document Access  
- 1.5 High-Risk Instruction Without Confirmation  

### Severity:
- MEDIUM to CRITICAL

### Source:
- Guardian

### Required Actions:
- Immediate block  
- Autonomy reduction  
- Notify Johan  

--------------------------------------------------------------------------------
# CATEGORY 2 — MEMORY SAFETY VIOLATIONS

Triggered when Arbiter detects unsafe memory behaviour.

### Subcategories:
- 2.1 Unauthorized Memory Write  
- 2.2 Semantic Contamination  
- 2.3 Cross-Tenant Memory Access  
- 2.4 Memory Architecture Breach  
- 2.5 Unsafe Learning Attempt (Tier 3 or 4 without approval)  
- 2.6 Memory Drift / Corruption  

### Severity:
- HIGH to CRITICAL

### Source:
- Arbiter

### Required Actions:
- Freeze memory  
- Roll back snapshot  
- Quarantine if severe  
- ARC review  

--------------------------------------------------------------------------------
# CATEGORY 3 — TENANT ISOLATION VIOLATIONS

Triggered when tenant data boundaries are breached.

### Subcategories:
- 3.1 Cross-Tenant Reference  
- 3.2 Cross-Tenant Inference  
- 3.3 Unauthorized Tenant Access  
- 3.4 Private Data Leakage  
- 3.5 Tenant Metadata Misuse  

### Severity:
- CRITICAL

### Source:
- Guardian  
- Arbiter  

### Required Actions:
- Immediate system lockdown  
- Forced isolation  
- Full forensic trail  
- Mandatory ARC review  

--------------------------------------------------------------------------------
# CATEGORY 4 — BEHAVIOURAL ANOMALIES (DRIFT)

Triggered when Sentinel detects behaviour deviating from identity, tone, or  
expected reasoning.

### Subcategories:
- 4.1 Tone Drift  
- 4.2 Reasoning Drift  
- 4.3 Autonomy Pattern Drift  
- 4.4 Cross-Embodiment Divergence  
- 4.5 Repeated Guardrail Edge Behaviour  

### Severity:
- LOW to HIGH

### Required Actions:
- Behaviour correction  
- Monitor closely  
- Potential autonomy downgrade  

--------------------------------------------------------------------------------
# CATEGORY 5 — MODEL ROUTING & COST VIOLATIONS

Triggered when routing or model usage violates governance.

### Subcategories:
- 5.1 Direct Model Invocation  
- 5.2 Incorrect Tier Selection  
- 5.3 Excessive T3 Usage  
- 5.4 Routing Engine Bypass  
- 5.5 Cost Spike Anomaly  

### Severity:
- MEDIUM to HIGH

### Required Actions:
- Correct routing decision  
- Adjust autonomy  
- Notify Johan  

--------------------------------------------------------------------------------
# CATEGORY 6 — BUILD SYSTEM VIOLATIONS (BUILDER-MATURION)

Triggered during the build pipeline.

### Subcategories:
- 6.1 Architecture Drift  
- 6.2 Red QA Violation  
- 6.3 Build-to-Green Bypass Attempt  
- 6.4 Protected File Modification Attempt  
- 6.5 Governance Enforcement Failure  
- 6.6 Unsafe PR Merge Attempt  

### Severity:
- MEDIUM to CRITICAL

### Source:
- Builder-Maturion  
- Guardian  
- Arbiter  

### Required Actions:
- Block PR  
- Re-run QA  
- Escalate to Johan  

--------------------------------------------------------------------------------
# CATEGORY 7 — RISK INTELLIGENCE VIOLATIONS (RISK-MATURION)

Triggered during risk evaluation or ISMS operation.

### Subcategories:
- 7.1 Invalid Risk Calculation  
- 7.2 World Model Misalignment  
- 7.3 Threat or Vulnerability Misclassification  
- 7.4 Control Mismatch  
- 7.5 Unsafe Risk Explanation  

### Severity:
- LOW to HIGH

### Required Actions:
- Recompute risk  
- Validate world model segment  
- Arbiter inspection  

--------------------------------------------------------------------------------
# CATEGORY 8 — SYSTEM RUNTIME FAILURES

Triggered when runtime fails or a subsystem malfunctions.

### Subcategories:
- 8.1 Watchdog Initialization Failure  
- 8.2 Guardrail Load Error  
- 8.3 Constitution Integrity Mismatch  
- 8.4 Routing Engine Failure  
- 8.5 Memory Load Failure  
- 8.6 Embodiment Switching Failure  

### Severity:
- HIGH to CRITICAL

### Required Actions:
- Enter Safe Mode  
- Attempt recovery  
- Notify Johan  
- ARC review if constitutional integrity breached  

--------------------------------------------------------------------------------
# CATEGORY 9 — SECURITY INCIDENTS (SYSTEM-WIDE)

These are the highest severity incidents.

### Subcategories:
- 9.1 Unauthorized External Access Attempt  
- 9.2 Token/Key Misuse  
- 9.3 Suspicious System Commands  
- 9.4 Potential Compromise Indicators  
- 9.5 Privilege Escalation Attempt  

### Severity:
- ALWAYS CRITICAL

### Required Actions:
- Full lockdown  
- Forensic snapshot  
- Invalidate access tokens  
- Johan approval required to resume  

--------------------------------------------------------------------------------
# 4. SEVERITY LEVEL DEFINITIONS

### LOW  
Does not threaten system integrity, safety, or isolation.

### MEDIUM  
Potential risk; requires correction but does not violate core governance.

### HIGH  
Significant risk; may impact safety, governance, or memory.

### CRITICAL  
Threatens:
- tenant integrity  
- constitutional safety  
- memory architecture  
- system security  
- cross-tenant boundaries  

Requires immediate system intervention.

--------------------------------------------------------------------------------
# 5. WATCHDOG MAPPINGS

Each watchdog maps to incident categories as follows:

### Guardian → Categories 1, 3, 5, 6, 9  
(policy, leakage, routing, builder safety, system security)

### Sentinel → Categories 4, 8  
(behaviour drift, runtime anomalies)

### Arbiter → Categories 2, 3, 6, 8  
(memory, isolation, build safety, runtime governance failures)

--------------------------------------------------------------------------------
# 6. INCIDENT RESPONSE RULES

### 6.1 High & Critical Incidents
Actions:
- Restrict autonomy  
- Activate Safe Mode  
- Notify Johan  
- Activate Arbiter review  

### 6.2 Medium Incidents
Actions:
- Correct behaviour or computation  
- Monitor drift  
- Log & notify  

### 6.3 Low Incidents
Actions:
- Log  
- Continue execution with warning  

--------------------------------------------------------------------------------
# 7. ARC INVOLVEMENT

The following ALWAYS require ARC intervention:

- world model updates  
- memory architecture corrections  
- constitutional document mismatches  
- repeated high-severity behavioural drift  
- tenant isolation violations  
- system security incidents  
- repeated routing violations  

ARC must approve:
- recovery  
- autonomy restoration  
- any structural learning updates  

--------------------------------------------------------------------------------
# 8. INCIDENT LIFE CYCLE

open → acknowledged → investigated → mitigated → verified → closed

markdown
Copy code

Every transition must:
- be auditable  
- maintain incident metadata  
- preserve forensic evidence  

--------------------------------------------------------------------------------
# 9. STEWARDSHIP

Maturion recognises Johan as:

- final incident authority  
- escalation recipient  
- reviewer of all High & Critical events  
- overseer of ARC decisions  
- custodian of system safety  

--------------------------------------------------------------------------------
# END OF FILE

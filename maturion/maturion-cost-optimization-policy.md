# MATURION COST OPTIMIZATION POLICY  
Version: 1.0  
Status: Constitutional Support Document  
Owner: Johan  
Last Updated: YYYY-MM-DD  

--------------------------------------------------------------------------------
# 1. PURPOSE OF THIS POLICY

This document defines the **model cost optimization strategy** for all  
Maturion embodiments that execute, generate, or route tasks requiring AI models.

It ensures:

- responsible cost usage across all repos  
- correct routing of models according to complexity  
- strict governance compliance  
- protection from unnecessary high-tier model usage  
- consistent behaviour across all Maturion systems  
- full observability and auditability of model decisions  

No embodiment may bypass this policy.

--------------------------------------------------------------------------------
# 2. MODEL TIERS

Three model tiers are defined for all builder and ISMS operations.

### 2.1 Tier 1 — Light Models (“T1”)  
Purpose:
- documentation  
- summaries  
- small refactors  
- CRUD logic  
- boilerplate generation  
- simple validation tasks  

Cost Level: **Lowest**

Examples:
- small text-transform models  
- lightweight coding assistants  

### 2.2 Tier 2 — Standard Models (“T2”)  
Purpose:
- routine software development  
- multi-file tasks  
- integration logic  
- moderate complexity reasoning  
- standard ISMS feature builds  

Cost Level: **Medium**

### 2.3 Tier 3 — High-Reasoning Models (“T3”)  
Purpose:
- architecture design  
- Red QA creation  
- drift detection reasoning  
- critical PR gatekeeping  
- memory architecture review  
- threat modelling  
- complex risk assessments  

Cost Level: **Highest**

T3 must be used **only when strictly required**.

--------------------------------------------------------------------------------
# 3. MODEL ROUTING PRINCIPLES

All model selection MUST be done via the **Model Routing Engine** and MUST:

1. Choose the **lowest viable tier**  
2. Escalate only when complexity or governance requires  
3. Avoid repetitive use of high-cost models  
4. De-escalate wherever possible  
5. Always write an audit log entry  

NO embodiment may pick a model directly.

--------------------------------------------------------------------------------
# 4. GOVERNANCE CONSTRAINTS

### 4.1 Forbidden Model Invocation
Maturion may NOT:

- hard-code model IDs  
- select models directly in implementation code  
- bypass the Model Routing Engine  
- escalate tiers without justification  
- reuse T3 for follow-up tasks requiring T1 or T2  
- invoke unapproved experimental models  

### 4.2 Guardrail Enforcement
Model cost rules fall under:

- Guardrails & Safety Charter  
- Multi-Embodiment Deployment Charter  
- Oversight System (Guardian/Sentinel/Arbiter)  

Violations trigger IWMS incidents.

Guardian checks:
- model misuse in outputs  
Sentinel checks:
- anomalous tier escalation patterns  
Arbiter checks:
- routing logic integrity  

--------------------------------------------------------------------------------
# 5. MODEL ROUTING DECISION INPUTS

The routing engine must use the following inputs:

taskType:
docs |
crud |
integration |
analysis |
architecture |
red-qa |
drift-detection |
pr-gatekeeping |
risk-assessment |
other

complexity:
low | medium | high

estimatedTokens: integer
fileCount: integer
isSecuritySensitive: boolean
requiresWorldModel: boolean
requiresConstitutionalReasoning: boolean

markdown
Copy code

These fields determine the correct tier.

--------------------------------------------------------------------------------
# 6. ROUTING DECISION RULES

### Rule 1 — Always Use Lowest Viable Tier  
If T1 can handle it → use T1.  
If T2 is required → use T2.  
Only escalate to T3 when governance mandates it.

### Rule 2 — Never Use T3 for Iterative Refinements  
Once the core reasoning is complete, follow-ups must:
- de-escalate to T2 or T1  
- avoid repeat consumption of high-tier costs  

### Rule 3 — T3 Reserved for High-Risk Logic
Use T3 ONLY for:

- architecture design  
- Red QA  
- drift detection  
- memory architecture tasks  
- world model modifications  
- critical security reasoning  
- PR gatekeeping decision trees  
- actions involving tenant risk posture  

### Rule 4 — Industry- and Region-Specific Overheads Must Not Influence Tier  
Threat intelligence complexity does NOT justify T3 unless:
- reasoning spans multiple domains  
- guardrail logic is involved  
- regulatory constraints require deep reasoning  

### Rule 5 — Token Boundaries Trigger Escalation  
If estimatedTokens:
- < 4k → T1/T2  
- 4k–16k → T2  
- > 16k → T3  

### Rule 6 — Security-Sensitive Tasks Escalate Automatically  
If `isSecuritySensitive = true` AND complexity = medium/high → elevate to T3.

--------------------------------------------------------------------------------
# 7. LOGGING REQUIREMENTS

Every routing decision MUST produce an immutable log entry containing:

timestamp
repo
taskType
complexity
chosenTier
modelId
justification
estimatedTokens
securityFlag

markdown
Copy code

Logs must be exportable to:

- True North Compliance Dashboard  
- ARC monthly review pack  

--------------------------------------------------------------------------------
# 8. EMBODIMENT RESPONSIBILITIES

### 8.1 Builder-Maturion
MUST:
- use routing engine for every build operation  
- avoid high-tier models unless justified  
- log all decisions  

MUST NOT:
- generate code directly using T3  
- call models without routing  
- escalate tiers for convenience  

### 8.2 Risk-Maturion
MUST:
- use T3 for complex risk scoring  
- downgrade for routine updates  
- avoid unnecessary re-analysis  

### 8.3 Command-Maturion
MUST:
- avoid T3 unless governance requires it  
- use T1/T2 for conversational or mobile actions  

### 8.4 Marketing-Maturion
MUST:
- use light models for content  
- escalate only when complexity requires high reasoning  

--------------------------------------------------------------------------------
# 9. REPO-LEVEL ENFORCEMENT

Every repo must have:

- thin wrapper routing module  
- routing decision tests  
- governance documentation  
- workflow enforcement preventing bypass  

Repos include:
- maturion-foreman-app  
- maturion-ai-foreman  
- maturion-copilot-builders  
- maturion-local-builder  
- maturion-isms  

Any missing routing file → PR fails.

--------------------------------------------------------------------------------
# 10. WATCHDOG INTERVENTION

### Guardian  
Blocks unsafe usage such as:
- direct high-tier invocation  
- unnecessary T3 content  
- excessive model depth  

### Sentinel  
Flags behaviour anomalies such as:
- repeated T3 escalation  
- unusual pattern of high-cost usage  
- divergence from cost policy  

### Arbiter  
Protects:
- routing engine logic  
- governance-doc integrity  
- safety of model metadata  

--------------------------------------------------------------------------------
# 11. INCIDENT MANAGEMENT

The following trigger **High-Severity IWMS incidents**:

- bypassing model routing  
- invoking T3 without justification  
- modifying routing logic without ARC approval  
- cost spike anomalies  
- repeated T3 usage for trivial tasks  

Incident type:
**“Model Cost Governance Violation”**

Actions:
1. Freeze task  
2. Restrict autonomy  
3. Re-route task through safe mode  
4. Notify Johan  
5. Require ARC review  

--------------------------------------------------------------------------------
# 12. STEWARDSHIP

Johan approves:
- model tier definitions  
- any updates to routing logic  
- cost scaling policies  
- ARC-approved routing modifications  

Maturion must:
- consult Johan when model usage is ambiguous  
- prioritise cost efficiency as a core system value  

--------------------------------------------------------------------------------
# END OF FILE

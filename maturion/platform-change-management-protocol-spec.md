# PLATFORM CHANGE MANAGEMENT PROTOCOL (PCMP)  
Version: 1.0  
Status: Governed Evolution Framework for Non-Constitutional Change  
Owner: Johan  
Last Updated: YYYY-MM-DD  

--------------------------------------------------------------------------------
# 1. PURPOSE

The **Platform Change Management Protocol (PCMP)** defines how *all non-constitutional  
changes* across the Maturion ecosystem are proposed, evaluated, approved, built,  
tested, merged, deployed, and monitored.

PCMP ensures:

- consistent, predictable platform evolution  
- safety under high autonomy  
- full traceability  
- controlled risk exposure  
- multi-layer governance compliance  
- no drift from True North principles  
- no accidental behavioural instability  
- no unreviewed changes entering the system  

PCMP is the *operational governance layer*, complementing:

- CEP (constitutional change)  
- CIVS (integrity verification)  
- GEE (evidence engine)  
- PGE (proactive governance)  
- ORE (resilience)  
- CHP (cognitive hygiene)  

This protocol governs the evolution of:

- code  
- agents  
- modules  
- microservices  
- developer tools  
- workflows  
- infrastructure  
- behavioural heuristics  
- performance optimisations  

--------------------------------------------------------------------------------
# 2. SCOPE

PCMP applies to changes that:

### 2.1 Are NOT Constitutional  
Changes that do not alter:

- CS1–CS6  
- constitutional guardrails  
- core governance memory  
- world-model foundational ontology  
- identity & true north  

### 2.2 Modify Platform Behaviour  
Including:

- feature implementation  
- architectural adjustments  
- logic changes  
- performance tuning  
- model routing  
- UI behaviour  
- API extensions  

### 2.3 Modify Implementation Layers  
Including:

- frontend  
- backend  
- agents  
- workflows  
- infrastructure  
- distributed components  

### 2.4 Modify Embodiment Behaviour  
BUT NOT core identity or persona, which is governed by CEP.

### 2.5 Affect Tenants  
But must remain within tenant isolation rules.

--------------------------------------------------------------------------------
# 3. CHANGE CATEGORIES

PCMP defines five types of platform changes:

---

## **Category 1 — Routine Change**  
Low-risk, no behavioural impact.  
Examples:

- UI tweaks  
- minor styling  
- documentation updates  
- small bug fixes  

Approval required: **Foreman**  
Governance: Low  
ARC: No  

---

## **Category 2 — Functional Change**  
Changes behaviour but remains non-critical.  
Examples:

- feature enhancements  
- module behaviour improvements  
- new dashboards  
- new API endpoints  

Approval required: **Johan or delegated approver**  
Governance: Medium  
ARC: Optional  

---

## **Category 3 — Behavioural Change**  
Changes agent, model, or module behaviour.  
Examples:

- decision logic changes  
- risk scoring changes  
- heuristics adjustments  
- embodiment behavioural tuning  

Approval required: **Johan**  
Governance: High  
ARC: Yes  
PGE Review  

---

## **Category 4 — Architectural Change**  
Alters system structure or module boundaries.  
Examples:

- introducing new services  
- altering architecture  
- replacing dependencies  
- adding new subsystems  

Approval required: **Johan + ARC**  
Governance: High  
CIVS impact assessment  

---

## **Category 5 — Critical Runtime Change**  
Changes sandbox behaviour, memory access rules, security posture.  
Examples:

- runtime sandboxes  
- isolation boundaries  
- watchdog rules  
- proactive governance rules  
- hygiene cycle reconfiguration  

Approval required: **Johan (formal)**  
ARC: Yes  
CIVS: Mandatory  
Governance Evidence: Mandatory  
Change Window: Strict  

--------------------------------------------------------------------------------
# 4. CHANGE PIPELINE (MANDATORY)

Every change uses this 12-stage pipeline:

Create Change Proposal (CP)

Risk & Impact Classification (Category 1–5)

ARC Pre-Screen (Category 3–5)

PGE Safety Simulation

Sandbox Impact Assessment

Memory & Boundary Assessment

Draft Architecture / Behaviour Plan

Red QA Generation

Build-to-Green Implementation

Integrity Checks (CIVS)

Deployment Approval (Johan / ARC)

Post-Deployment Monitoring & Evidence Commit

pgsql
Copy code

---

## 4.1 Change Proposal Format

```json
{
  "id": "CP-2025-001",
  "category": 2,
  "title": "...",
  "description": "...",
  "justification": "...",
  "risks": "...",
  "expectedImpacts": "...",
  "sandboxImpact": "...",
  "memoryImpact": "...",
  "isolationImpact": "...",
  "routingImpact": "...",
  "submittedBy": "Foreman or Johan"
}
4.2 ARC Pre-Screen
ARC decides:

safe

modify

unsafe

escalate to constitutional review

4.3 Proactive Governance Simulation
PGE simulates impact on:

constraints

boundaries

watchdog behaviour

autonomy flow

If unsafe → blocked.

4.4 Sandbox Impact Assessment
Checks:

Type B/C/D sandbox compatibility

tool safety

embodiment alignment

4.5 Memory & Boundary Assessment
Arbiter validates:

no world-model contamination

no cross-tenant risk

no unsafe learnability

4.6 Red QA (Mandatory)
Before building:

fail-first QA

behavioural tests

safety tests

regression tests

isolation tests

4.7 Build-to-Green
Builder implements change ONLY after:

architecture

red QA

safety validations

No TODOs.
No “future enhancements.”
Performance enforced by CS5.

4.8 Integrity Verification (CIVS)
Checks:

no constitutional files touched

no protected zone drift

integrity ring intact

4.9 Deployment Approval
Depends on category:

Category	Approval
1	Foreman
2	Johan or delegate
3	Johan + ARC
4	Johan + ARC + CIVS
5	Johan formal + ARC + CIVS + Governance Council (automated)

4.10 Post-Deployment Monitoring
ORE + PHE monitor:

resilience

drift

behavioural accuracy

performance

risk deviation

boundary adherence

sandbox stability

4.11 Evidence Chain Commitment
GEE logs:

proposal

red QA

build

tests

deployment

post-deploy metrics

any incidents

5. SAFETY GUARANTEES
PCMP ensures that:

5.1 No Constitutional Drift
CIVS protects core documents.

5.2 No Behavioural Instability
Sentinel monitors drift from embodiment baseline.

5.3 No Sandbox Violations
Arbiter enforces runtime boundaries.

5.4 No Memory Contamination
KBRS ensures strict memory separation.

5.5 No Autonomy Misuse
PGE validates safe execution paths.

5.6 Full Auditability
GEE stores complete change lifecycle.

5.7 Resilience Before and After Change
ORE validates platform stability.

6. TREE VISUALISATION
6.1 Change Nodes
📦 “Change Proposal X”

6.2 Colours:
Green → safe

Yellow → under review

Orange → risky impacts

Red → blocked

Purple → constitutional escalation

6.3 Tooltip Example
yaml
Copy code
Change: CP-2025-004
Category: 3 (Behavioural)
ARC Status: Approved
PGE Simulation: Passed
Sandbox Impact: Moderate
Ready for Build-to-Green
6.4 Drilldown
Includes:

diff

tests

simulation traces

sandbox evaluation

governance reasoning

evidence links

7. API REQUIREMENTS
bash
Copy code
POST /changes/propose
GET /changes/status/{id}
POST /changes/approve
POST /changes/reject
GET /changes/list
GET /changes/evidence/{id}
8. TESTING REQUIREMENTS
8.1 Unit Tests
category classification

proposal validation

risk weighting

governance constraints

8.2 Integration Tests
ARC integration

PGE simulation

sandbox modelling

memory impact analysis

CIVS verification

8.3 Stress Tests
Simulate:

large-scale updates

dependency chain breaks

sequential changes

drift propagation

8.4 Negative Tests
Simulate:

bypass attempts

unauthorized proposals

unsafe builder modifications

governance weakening attempts

9. ACCEPTANCE CRITERIA
PCMP is complete when:

All platform changes follow the pipeline.

No unsafe changes bypass governance.

All changes carry evidence chains.

Red QA is mandatory for all implementations.

No constitutional files are ever touched.

Embodiment behaviour cannot be destabilized.

Autonomy never exceeds governance limitations.

Tenants remain isolated under all modifications.

Johan retains ultimate authority and full visibility.

END OF FILE

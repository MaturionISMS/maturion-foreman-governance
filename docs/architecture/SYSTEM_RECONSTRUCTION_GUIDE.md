# ✅ SYSTEM RECONSTRUCTION GUIDE

**Version:** 1.0  
**Owner:** Johan  
**System:** Maturion Autonomous Engineering Ecosystem  
**Purpose:** Allow ANY compliant AI agent to fully reconstruct the Foreman ecosystem, including all governance, QA, builders, workflows, and application layers.

---

# 🔷 1. Introduction

This document provides a complete, end-to-end specification of the Foreman Autonomous Engineering System, including:

- Architecture  
- Governance  
- QA enforcement  
- Builder network  
- Workflows  
- Drift protection  
- Guardrails  
- Desktop fallback  
- Reconstruction instructions  
- File structure  
- Required engines and components  

Any AI agent given **ONLY this file** can recreate:

- The repo  
- The workflows  
- Foreman App  
- Autonomous builder environment  
- Deployment pipelines  
- Guardrails and governance  
- QA infrastructure  
- Model escalation logic  
- All safety constraints  

This guide is considered a **constitutional file** and must be protected by **CS1 Guardrails**.

---

# 🔷 2. Core System Components

The ecosystem contains **five major subsystems**:

---

## 2.1 Foreman Application (Next.js + Vercel)

This is the central orchestrator and user-facing interface.

### Foreman manages:

- Architectural reasoning  
- Builder orchestration  
- Issue execution  
- PR validation  
- Governance enforcement  
- Drift detection  
- Alerting  
- Overnight execution  
- Model escalation  
- Incident feedback loop  
- Parking Station  

### Key directories:

/app – UI & API (Next.js)
/app/foreman – Foreman dashboards
/app/api/foreman – Orchestration API
/lib/foreman – Foreman runtime engines
/docs – Governance + architecture
/tests – QIC + QIEL + Guardrail tests

markdown
Copy code

---

## 2.2 Builder Network

Two builder systems:

### A. GitHub Copilot SWE
- Default builder  
- Writes PRs  
- Follows `builder_protocol.md`  
- Controlled by Foreman  

### B. Desktop Local Builder (Backup)
- Uses OpenAI GPT models (4 → 5.1)  
- Runs on your computer as **redundant fallback**  
- Executes the same builder protocol  
- Same governance boundaries  

Activated when:
- Copilot unavailable  
- Complexity exceeds Copilot capability  
- Autonomy mode requires redundancy  

### Foreman ALWAYS validates builder output through:

- QIC  
- QIEL  
- Guardrails  
- Drift detection  

---

## 2.3 Governance Framework

Your governance stack is **multi-layered and enforceable**:

### True North
- Architectural supremacy  
- Immutable principles  
- Builder cannot alter architecture  

### One-Time Build Philosophy
- Every build must be atomically correct  
- No “fix later”  
- No TODOs  

### QIC — Quality Integrity Contract
- Lint  
- Typecheck  
- Tests  
- QIEL Quick  
- Zero-warning enforcement  

### QIEL — Quality Integrity Enforcement Layer
- Environment diff  
- Log parsing  
- Silent failure detection  
- Schema validation  
- Governance integrity checks  

### Drift Detection
Detects:
- Governance drift  
- QA drift  
- Execution drift  
- Reasoning drift  

**Zero tolerance.**

---

## 2.4 Constitutional Layering (CS1–CS5)

### **CS1: Guardrails**
- SHA-256 integrity validation  
- Protected paths  
- Suppression detection  
- Workflow immutability  
- Governance rule protection  

### **CS2: Architecture Change Approval Workflow**
- Foreman must request ACR before modifying architecture  
- You approve, reject, or discuss  
- Architecture immutable until approved  

### **CS3: Incident Feedback Loop**
Buttons for verification:
- Not Visible  
- Not Functional  
- Incorrect Behavior  
- Resolved  

### **CS4: Governance Alert System**
Triggers alerts for:
- Drift  
- QIEL skip  
- Deployment skip  
- Guardrail violation  
- Performance regression  

### **CS5: Performance Enforcement**
- No TODOs allowed  
- No inefficiencies  
- PR blocked if performance violations detected  

---

## 2.5 Overnight Execution Framework

Executes sequences autonomously:

- Fetch issues  
- Sort by governance priority  
- Execute code generation  
- Run tests  
- Deploy  
- Request verification  
- Loop until fully resolved  

### Workflows:
- **wave1:** memory + drift + QA foundation  
- **wave2:** execution + autonomous mode + cleanup  

---

# 🔷 3. Required Repository Structure

To reconstruct system, create **THIS EXACT STRUCTURE**:

/
├── app/
│ ├── foreman/
│ ├── api/foreman/
│ ├── components/
│ └── ...
│
├── lib/
│ └── foreman/
│ ├── guardrails/
│ ├── performance/
│ ├── incidents/
│ ├── architecture/
│ ├── reasoning/
│ ├── dispatch.ts
│ └── builder-detection.ts
│
├── docs/
│ ├── governance/
│ ├── architecture/
│ ├── builders/
│ └── constitution/
│
├── foreman/
│ └── constitution/
│ ├── baseline-hashes.json
│ ├── true-north.md
│ ├── builder_protocol.md
│ ├── agent-contract.md
│ └── guardrails.md
│
├── tests/
│ ├── qic/
│ ├── qiel/
│ ├── performance/
│ ├── guardrails/
│ └── drift/
│
└── .github/
└── workflows/
├── qic.yml
├── qiel.yml
├── deployment.yml
└── guardrails.yml

yaml
Copy code

---

# 🔷 4. GitHub Workflow Summary

## 4.1 QIC Workflow
Runs:

- Lint  
- Typecheck  
- Test  
- QIEL Quick  
- Writes logs  

**PR fails if ANY step fails.**

---

## 4.2 QIEL Workflow  
Ensures:

- Environment alignment  
- Schema cohesion  
- Silent error detection  

---

## 4.3 Guardrails Workflow  
Enforces:

- SHA-256 integrity  
- Immutable paths  

---

## 4.4 Deployment Workflow (Vercel)  
Trigger: **merge to main**

---

# 🔷 5. Recovery Procedure (If GitHub Lost)

If GitHub subscription is lost OR project corrupted:

### **Step 1 — Clone Reconstruction Guide**  
Give **this file** to any advanced AI system.

### **Step 2 — Recreate Repo Structure**  
AI rebuilds folders + files defined above.

### **Step 3 — Reinstall Workflows**  
AI restores workflows from section 4.

### **Step 4 — Rebuild Foreman App**  
AI regenerates:

- Chat UI  
- API routes  
- Dashboard  
- Alert Center  
- Parking Station  
- Builder Network Integration  
- Performance Dashboard  
- Architecture Approval UI  
- Incident Feedback UI  
- Guardrail Runtime  

### **Step 5 — Rebuild Governance System**  
AI reinstalls:

- True North  
- One-Time Build Philosophy  
- Builder Protocol  
- Drift Detector  
- QIC + QIEL  
- Guardrails  
- Architecture Approval Workflow  

### **Step 6 — Connect Builders**
AI reinstalls:

- Copilot SWE builder  
- Local Desktop Builder  

### **Step 7 — Deploy to Vercel**  
AI configures production environment variables.

---

# 🔷 6. Desktop Test Runner (Critical Redundancy System)

This tool verifies **end-to-end system correctness** even if GitHub is inaccessible.

**File:**  
`Foreman_Ecosystem_Test_Runner.exe`

### Tests included:

| Test | Purpose |
|------|---------|
| Constitution Integrity | Verify SHA-256 hashes |
| Guardrails Active | Ensure files protected |
| Architecture Contract Valid | Validate agent contract |
| Builder Protocol Valid | Ensure v1.0 compliance |
| Drift Detector | Run 23 drift checks |
| Performance Scanner | Ensure no TODOs or inefficiencies |
| QIC Simulation | Lint + Typecheck |
| QIEL Simulation | Schema + Logs |
| Overnight Execution Simulation | Dry-run execution |
| UI Connectivity | Basic sanity checks |
| Model Escalation | Verify GPT4→GPT5.1 escalation |

Output saved as:

**FULL_SYSTEM_HEALTH_REPORT.md**

---

# 🔷 7. Reconstruction from Zero (Step-by-Step)

If **everything is lost**:

1. Create empty repo  
2. Paste this reconstruction file  
3. Ask AI:

> **"Rebuild the Foreman Autonomous Engineering Ecosystem based on the SYSTEM_RECONSTRUCTION_GUIDE.md"**

4. AI recreates all architecture, workflows, and apps  
5. Reconnect Vercel  
6. Reconnect builders  
7. Run Desktop Test Runner  
8. System restored  

---

# 🔷 8. Final Notes

- This document must be treated as **immutable** (protected by CS1).  
- All future architectural changes must **update this document**.  
- This file is part of the **constitutional system**.  
- Foreman must validate its presence **on startup**.



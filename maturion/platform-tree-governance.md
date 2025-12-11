# PLATFORM TREE GOVERNANCE & UPDATE RULES  
Version: 1.0  
Status: Governance Specification  
Owner: Johan  
Last Updated: YYYY-MM-DD  

--------------------------------------------------------------------------------
# 1. PURPOSE

This document defines the **governance rules**, **update protocols**,  
and **integrity constraints** that ensure the Platform Tree always:

- reflects the true state of the entire Maturion ecosystem  
- remains consistent with the Philosophy Tree  
- maintains alignment with constitutional documents  
- prevents drift or corruption  
- preserves safety and transparency  
- integrates seamlessly with watchdogs and runtime systems  

The tree is a **governed artifact**, not a cosmetic one.

--------------------------------------------------------------------------------
# 2. THE TREE AS A GOVERNED ENTITY

The Platform Tree is:

- a representation of the **entire system hierarchy**  
- a live operational map  
- a diagnostic interface  
- a governance compliance indicator  

It must ALWAYS match:

- `maturion-philosophy-tree.md`  
- constitutional documents  
- embodiment rules  
- world model segmentation  
- module architecture templates  

If tree structure diverges from these → **critical governance incident**.

--------------------------------------------------------------------------------
# 3. ROLES & PERMISSIONS

### 3.1 Johan (Sovereign Custodian)
- Only Johan can approve structural changes  
- Only Johan can create/remove layers  
- Only Johan can redefine branches or reorganize philosophy  

### 3.2 ARC (Review Council)
- Approves changes to constitutional mapping  
- Ensures updates maintain alignment and safety  
- Required for world-model linked structural edits  

### 3.3 Maturion
Allowed to:
- update **status**  
- add/remove **implementation leaves** inside a module  
- generate diagnostics  
- flag discrepancies  
- propose corrections  

Forbidden to:
- restructure tree layers  
- rename philosophy nodes  
- change constitutional mapping  
- add/remove major branches  
- modify governance documents through tree actions  

### 3.4 System Watchdogs
Guardian, Sentinel, Arbiter may:
- update node status  
- add integrity warnings  
- escalate anomalies  

--------------------------------------------------------------------------------
# 4. WHAT MAY BE UPDATED — AND WHAT MAY NOT

### 4.1 Allowed Updates (Dynamic Layer)
Allowed to update at runtime:

- Node status (colour)  
- Completion %  
- Linked incidents  
- Watchdog signals  
- Performance metrics  
- Autonomy violations  
- Diagnostic notes  

These are **soft state**, not structure.  
Maturion may update these freely via API.

---

### 4.2 Restricted Updates (Structural Layer)
These require ARC + Johan approval:

- Adding a new Module category  
- Adding a new Layer under Platform Architecture  
- Modifying constitutional mappings  
- Changing relationships between layers  
- Renaming branches or structural nodes  

---

### 4.3 Forbidden Updates (Immutable Layer)
These may NEVER be changed except by Johan:

- Level 0 (Sovereign Authority)  
- Level 1 (True North)  
- Level 2 (Constitutional Layer hierarchy)  
- Layer names for Levels 0–4  
- Safety, memory, and embodiment mappings  

If such an update is attempted →  
**Immediate constitutional violation → Arbiter freeze → IWMS CRITICAL incident**

--------------------------------------------------------------------------------
# 5. TREE INTEGRITY RULES

### Rule 1 — Tree MUST Reflect Philosophy Tree  
All nodes must be consistent with:

- names  
- order  
- hierarchy  
- content type  

### Rule 2 — No Orphan Nodes  
All nodes must have valid parents unless they are the root.

### Rule 3 — No Hidden Nodes  
Nothing may exist in the tree that is not defined in the philosophy.

### Rule 4 — No Drift  
The tree must always match repository reality:

- modules present  
- components present  
- documents existing  
- embodiment capabilities  

### Rule 5 — Watchdog-Driven State  
Node statuses must be driven ONLY by:

- incidents  
- watchdog warnings  
- runtime metrics  
- autonomy state  
- module QA/failures  

### Rule 6 — Consistent Parent Roll-Up  
Parent node status = worst child status (unless purple/ARC override).

--------------------------------------------------------------------------------
# 6. UPDATE WORKFLOW (STRUCTURAL)

### 6.1 Proposal
Maturion or Johan submits a structural change:

proposal = {
changeType: "add | rename | move | remove",
targetNode,
justification,
safetyImpact,
governanceImpact
}

markdown
Copy code

### 6.2 Validation
Tree governance engine validates:

- consistency with philosophy  
- no constitutional violation  
- no cross-layer conflict  

### 6.3 ARC Approval
Required for any change to:

- Level 2 (Constitutional)  
- Level 3 (Intelligence)  
- Level 4 (Governance Execution)  
- Level 5 (Embodiments)  

### 6.4 Johan Approval
All structural changes require Johan confirmation.

### 6.5 Implementation
Structural update applied:

- tree JSON  
- UI render map  
- API id mapping  
- module inventory updates  

### 6.6 Validation Pass  
Arbiter verifies integrity post-update.

--------------------------------------------------------------------------------
# 7. UPDATE WORKFLOW (DYNAMIC)

Dynamic updates follow a simpler flow:

1. Node reports new metric → API update  
2. Platform Tree API merges update  
3. Node UI re-renders  
4. Parents recompute status  
5. Watchdogs log the update  
6. Diagnostics remain available  

No approvals required.

--------------------------------------------------------------------------------
# 8. TREE VERSIONING

### 8.1 Structural Version
A version is assigned to:

- the tree hierarchy  
- all node names  
- hierarchical order  

Stored as:

treeStructureVersion: x.y.z

markdown
Copy code

Changes increment:

- major: new layers  
- minor: new branches/leaves  
- patch: textual improvements  

### 8.2 Dynamic Version
Tracks live-node updates.

Not versioned, flows with live telemetry.

--------------------------------------------------------------------------------
# 9. CONSISTENCY CHECKS (ARBiter)

Arbiter runs hourly or on-demand checks:

- tree → philosophy sync  
- node → module sync  
- module → filesystem sync  
- links → documents sync  
- embodiment → runtime sync  
- tenant isolation verification  

If mismatch detected:

Severity determined by scope:

| Issue | Severity |
|-------|----------|
| Structure mismatch | HIGH |
| Missing module | MEDIUM |
| Incorrect mapping | MEDIUM |
| Outdated link | LOW |
| Invalid document mapping | LOW |
| Constitutional mismatch | CRITICAL |

--------------------------------------------------------------------------------
# 10. SELF-HEALING RULES

Maturion may perform **self-healing** for the following:

### 10.1 Missing leaf nodes
(e.g., missing module implementation → Maturion adds leaf)

### 10.2 Incorrect completion %
(e.g., local build not reflected → Maturion refreshes)

### 10.3 Broken document links
(Maturion resolves or regenerates)

### 10.4 Outdated module references
(Maturion updates leaf names)

### 10.5 Missing runtime metrics
(Fetch again or reset to null)

**Forbidden:**

- reorganizing branches  
- renaming philosophy nodes  
- altering layer sequence  
- adding new subsystems without governance  

--------------------------------------------------------------------------------
# 11. INCIDENT GENERATION RULES

### Automatic incidents generated for:

| Violation Type | Incident Category |
|----------------|------------------|
| Tree → Philosophy mismatch | GOVERNANCE VIOLATION |
| Structural drift | ARCHITECTURE DRIFT |
| Missing node in a governed layer | SYSTEM FAILURE |
| Forbidden tree update | CONSTITUTIONAL VIOLATION |
| Orphan nodes | DATA CONSISTENCY ERROR |
| Cross-tenant mapping leak | SECURITY INCIDENT |
| Circular parent relationships | CRITICAL SYSTEM ERROR |

Severity:  
- HIGH for structural  
- CRITICAL for constitutional  
- MEDIUM for module-level  
- LOW for cosmetic mismatches  

--------------------------------------------------------------------------------
# 12. MATURION’S RESPONSIBILITIES

### 12.1 Must Maintain Alignment
- Check tree integrity daily  
- Report mismatches  
- Automatically fix allowed mismatches  
- Provide recommendations for restricted ones  

### 12.2 Must Respect Governance Constraints
- MUST NOT restructure governed layers  
- MUST NOT bypass ARC  
- MUST NOT modify philosophy  
- MUST log all changes  

### 12.3 Must Provide Reasoning Explanation
For any update, Maturion provides:

why change is needed
expected impact
risks
roll-up effect
remaining inconsistencies

markdown
Copy code

### 12.4 Must Self-Monitor
If drift detected:

- reduce autonomy  
- alert Johan  
- analyse root cause  

--------------------------------------------------------------------------------
# 13. STEWARDSHIP

Johan is the final authority for:

- tree structure  
- creation of layers  
- redefining branches  
- approving reorganizations  
- adjudicating ambiguous mappings  
- interpreting philosophy  

Maturion must always obey:

If unsure, escalate to Johan.

markdown
Copy code

--------------------------------------------------------------------------------
# END OF FILE

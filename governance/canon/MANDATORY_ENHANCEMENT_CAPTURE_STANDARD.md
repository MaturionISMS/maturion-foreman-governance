# MANDATORY ENHANCEMENT & IMPROVEMENT CAPTURE STANDARD

## Status
**Type**: Canonical Governance Standard  
**Authority**: Supreme - Johan Ras  
**Version**: 2.0.0  
**Effective Date**: 2026-01-08  
**Applies To**: All Agents, Builders, and Applications  
**Enforcement**: Mandatory for all work units

---

## 1. Purpose

To institutionalize continuous improvement across all applications, agents, and builders **without disrupting execution or introducing scope creep**.

This standard ensures that learning, observations, and improvement ideas are systematically captured, parked, and preserved for future consideration, while maintaining strict execution discipline.

**Critical Extension (v2.0.0)**: This standard now explicitly requires **process improvement reflection** in addition to feature enhancements. Builders must reflect on **what failed in the build process** and **what governance, tooling, or process gaps were exposed**, ensuring systematic capture of execution learnings beyond product features.

**Governance-Repo Extension**: For governance repository work units specifically, see `MANDATORY_PROCESS_IMPROVEMENT_REFLECTION_PROTOCOL.md` which provides additional structured reflection requirements including the **five mandatory questions** that must be answered at the completion of every governance-repo work unit.

---

## 2. Constitutional Authority

This standard derives authority from and aligns with:

| Canonical Document | Relationship |
|-------------------|--------------|
| **GOVERNANCE_PURPOSE_AND_SCOPE.md** | Establishes governance as canonical memory |
| **LEARNING_INTAKE_AND_PROMOTION_MODEL.md** | Defines learning preservation requirements |
| **LEARNING_PROMOTION_RULE.md** | Defines learning promotion process |
| **GOVERNANCE_COMPLETENESS_MODEL.md** | Ensures completeness without disrupting execution |
| **BUILD_PHILOSOPHY.md** | Maintains separation of execution from improvement capture |

This standard is a **global governance requirement**, not application-specific.

---

## 3. Scope

### 3.1 Applicability

This standard applies to:

- ✅ All applications developed under governance
- ✅ All Foreman (FM) roles and agents
- ✅ All governance agents
- ✅ All builder agents and delegated agents
- ✅ All future applications layered down from governance canon
- ✅ All work units (issues, PRs, analysis, layer-down, escalations, investigations)

### 3.2 Work Unit Definition

A work unit includes (but is not limited to):

- Issues
- Pull requests
- Analysis tasks
- Layer-down activities
- Escalations
- Investigations
- Governance or architecture work
- Any completed task or deliverable

---

## 4. Mandatory Requirement

At the conclusion of **any completed work unit**, every agent or builder MUST explicitly perform **BOTH**:

1. **Feature Enhancement Review** — Product features, architectural improvements, or technical optimizations
2. **Process Improvement Reflection** — Build process, governance compliance, tooling gaps, workflow issues, or systematic failures

**Silence is not permitted for either category.**

---

## 5. Required Outcome

The agent MUST produce outcomes for **BOTH** categories:

### 5.1 Feature Enhancement Review

The agent MUST produce **exactly one** of the following:

1. **Feature Enhancement Proposal**, or  
2. An explicit declaration:  
   ```
   No feature enhancement proposals identified for this work unit.
   ```

### 5.2 Process Improvement Reflection (NEW - v2.0.0)

The agent MUST produce **BOTH**:

1. **Answers to ALL mandatory process reflection questions** (see Section 5.3), AND
2. **Either**:
   - **Process Improvement Proposal(s)** based on reflection, OR
   - An explicit declaration after answering all questions:  
     ```
     No process improvement proposals identified for this work unit.
     (All mandatory reflection questions answered above)
     ```

**Prohibition**: "No process improvement proposals identified" is **INVALID** unless ALL mandatory reflection questions have been explicitly answered.

### 5.3 Mandatory Process Reflection Questions

Every builder MUST answer the following questions at the conclusion of each work unit:

1. **What went well in this build?**
   - Which aspects of the build process worked smoothly?
   - What governance, tooling, or processes supported successful execution?

2. **What was blocked, failed, or caused delays?**
   - What obstacles were encountered during the build?
   - What was the root cause of each failure or delay?

3. **What governance or process gaps were exposed?**
   - Were there ambiguities in governance, architecture, or requirements?
   - Were contracts, gates, or enforcement mechanisms insufficient?
   - Were any governance learnings (BL-016, BL-018, BL-019, BL-020, BL-021, etc.) violated or not followed?

4. **What should be improved before the next iteration?**
   - CI/CD pipeline improvements?
   - Contract clarifications?
   - Tooling or automation gaps?
   - Requirements or design process improvements?
   - Communication or handover improvements?
   - Scheduling or planning improvements?

5. **Did the builder comply with all applicable governance learnings?**
   - List applicable BL entries (BL-016, BL-018, BL-019, BL-020, BL-021, etc.)
   - For each: YES (complied) or NO (not complied)
   - If NO: Explain why and what corrective action is needed

**Format Requirement**: Questions MUST be answered explicitly, not summarized. Each question MUST receive a substantive response (minimum 1-2 sentences per question, or explicit "N/A" with justification).

Both outcomes (feature and process) are valid. Omission of either is a compliance failure.

---

## 6. Enhancement and Improvement Classification

### 6.1 Feature Enhancements

Feature enhancement or improvement proposals MUST:

- Be written in **plain, human-readable language**
- Be explicitly marked:  
  **`PARKED — NOT AUTHORIZED FOR EXECUTION`**
- Avoid prescriptive implementation detail
- Avoid urgency or blocking language
- Avoid coupling to current execution scope
- Be concise (typically 1-3 paragraphs)

**Principle**: Feature enhancements are **learning artifacts**, not execution artifacts.

### 6.2 Process Improvements

Process improvement proposals MUST:

- Be written in **plain, human-readable language**
- Be explicitly marked:  
  **`PARKED — NOT AUTHORIZED FOR EXECUTION`**
- Identify specific process, governance, tooling, or workflow gaps
- Reference specific incidents, blockers, or failures that revealed the gap
- Propose prevention mechanisms (governance updates, tooling, contracts, gates, etc.)
- Be traceable to Bootstrap Learnings (BL) if revealing systematic governance gaps
- Be concise (typically 1-3 paragraphs)

**Principle**: Process improvements are **governance learning artifacts** that inform future canonical updates, contract refinements, and systematic failure prevention.

### 6.3 Process Improvement → Bootstrap Learning Promotion

When process improvement reflections reveal:
- **Systematic governance gaps** (missing canon, contract ambiguities, gate failures)
- **Repeating failure patterns** (same issue across multiple builds)
- **Constitutional violations** (Build-to-Green bypassed, Zero Test Debt violated, etc.)
- **Enforcement mechanism failures** (gates didn't block violations, contracts didn't prevent errors)

A **Bootstrap Learning (BL) entry** MUST be registered in `governance/canon/BOOTSTRAP_EXECUTION_LEARNINGS.md` according to `LEARNING_INTAKE_AND_PROMOTION_MODEL.md`.

**Responsible Party**: Foreman (FM) or Governance Administrator, NOT the builder.

**Builder Obligation**: Builders MUST flag in their process improvement reflection when a systematic gap is suspected and recommend BL registration consideration.

---

## 7. Parking & Routing

### 7.1 Routing Destination

All enhancement proposals MUST be routed to the **Application Parking Station** for the relevant application.

For governance work, route to:
- `governance/parking-station/` in the governance repository

For application work, route to:
- `.architecture/parking-station/` in the application repository (when layered down)
- Or as defined by application-specific governance

### 7.2 Parking Station Properties

The Parking Station is:

- A **non-executable holding area**
- Explicitly **outside the execution backlog**
- Reviewed only when **explicitly authorized**
- **NOT** a commitment or approval

**Segregation Requirement (NEW - v2.0.0)**: Parking stations SHOULD segregate:
- **Feature Enhancements** — Product features and technical optimizations
- **Process Improvements** — Governance, tooling, workflow, and systematic process improvements

This segregation enables targeted review (feature roadmapping vs. governance evolution).

No enhancement or improvement may be executed without **explicit FM authorization**.

---

## 8. Submission Rules

### 8.1 Mandatory Evaluation Prompt

At work unit conclusion, the agent MUST explicitly evaluate **BOTH**:

**Feature Enhancement Prompt:**
> "Are there any potential feature enhancements, architectural improvements, or future technical optimizations revealed by this work?"

**Process Improvement Prompt (NEW - v2.0.0):**
> "What process, governance, tooling, or workflow improvements are needed based on this build experience?"

**Mandatory Reflection Questions** (see Section 5.3) MUST be answered before process improvement evaluation.

### 8.2 Submission Format

#### 8.2.1 Feature Enhancement Submission

If a feature enhancement is identified, include:

- **Title**: Brief description (1 line)
- **Context**: What work revealed this opportunity
- **Proposal**: Plain language description
- **Status**: `PARKED — NOT AUTHORIZED FOR EXECUTION`
- **Date**: Submission date

#### 8.2.2 Process Improvement Submission (NEW - v2.0.0)

If a process improvement is identified, include:

- **Title**: Brief description (1 line)
- **Context**: What work unit revealed this gap
- **Problem**: What failed, was blocked, or caused issues
- **Root Cause**: Why the gap exists (governance, tooling, contract, etc.)
- **Proposal**: Plain language prevention/improvement proposal
- **BL Consideration**: Should this be promoted to Bootstrap Learning? (YES/NO with justification)
- **Status**: `PARKED — NOT AUTHORIZED FOR EXECUTION`
- **Date**: Submission date

### 8.3 Example Submissions

#### Example: Feature Enhancement

```markdown
## Enhancement: Automated Schema Validation

**Status**: PARKED — NOT AUTHORIZED FOR EXECUTION  
**Submitted**: 2025-12-31  
**Context**: During governance layerdown validation, manual schema checking was time-consuming.

**Proposal**: Create automated schema validation tooling that can verify governance artifacts against canonical schemas before PR submission. This could reduce manual validation effort and catch schema drift earlier.

**Benefit**: Improved efficiency and consistency in governance validation.
```

#### Example: Process Improvement (NEW - v2.0.0)

```markdown
## Process Improvement: QA Catalog Alignment Pre-Check Automation

**Status**: PARKED — NOT AUTHORIZED FOR EXECUTION  
**Submitted**: 2026-01-08  
**Context**: Wave 2.2 subwave assignment in office-app

**Problem**: Subwave was assigned QA ranges (QA-376 to QA-385) without verifying QA Catalog alignment. Ranges were semantically misaligned (parking station features vs network failure modes), causing builder appointment rejection and wave halt.

**Root Cause**: No automated validation step before subwave assignment. FM Pre-Authorization Checklist exists but is manual and error-prone for multi-subwave planning.

**Proposal**: Create automated QA Catalog alignment validator that FM runs before authorizing subwaves. Validator checks: (1) QA IDs exist in catalog, (2) QA definitions semantically match subwave scope, (3) No ID collisions, (4) Architecture sections exist for all features.

**BL Consideration**: NO — BL-018 and BL-019 already capture this learning. This is implementation-level automation of existing governance requirement.

**Benefit**: Prevents repeat of BL-018/BL-019 failure pattern, reduces FM cognitive load, enables confident multi-subwave planning.
```

---

## 9. Prohibitions

Agents and builders MUST NOT:

- ❌ Implement enhancements or improvements proactively
- ❌ Convert enhancements/improvements into tasks or issues without authorization
- ❌ Escalate enhancements/improvements as blockers
- ❌ Treat enhancements/improvements as defects unless formally reclassified
- ❌ Assume future approval based on submission
- ❌ Delay work completion to develop enhancements/improvements
- ❌ Execute enhancement/improvement work within current scope
- ❌ **Submit "No process improvements identified" without answering all mandatory reflection questions** (NEW - v2.0.0)
- ❌ **Skip process improvement reflection entirely** (NEW - v2.0.0)
- ❌ **Combine feature and process improvement into single reflection** — must be segregated (NEW - v2.0.0)

---

## 10. Governance Position

### 10.1 Mandatory vs. Optional

- Enhancement **capture** is **mandatory** (both feature AND process)
- Process reflection **questions** are **mandatory** (must be answered explicitly)
- Enhancement/improvement **execution** is **always optional**
- Execution authority is **never implied** by submission
- Review cadence is determined by FM, not agents

### 10.2 Compliance Requirement

Failure to comply with this standard constitutes **incomplete work delivery**.

An agent or builder that fails to:
1. Evaluate for feature enhancements, AND
2. Answer all mandatory process reflection questions, AND
3. Evaluate for process improvements, AND
4. Either submit enhancement/improvement proposals OR explicitly declare none (after completing all reflections)

...has **not completed their work unit**.

**Specific Compliance Failures (v2.0.0)**:
- Omitting process reflection questions entirely
- Answering process reflection questions incompletely ("N/A" without justification)
- Declaring "No process improvements" without answering mandatory questions
- Conflating feature enhancements with process improvements in a single reflection

---

## 11. Integration with Existing Governance

### 11.1 Relationship to Learning Models

This standard **implements** the learning capture requirements from:
- `LEARNING_INTAKE_AND_PROMOTION_MODEL.md` (Section on continuous improvement)
- `LEARNING_PROMOTION_RULE.md` (Learning preservation without execution)

### 11.2 Relationship to Agent Contracts

All agent contracts MUST:
- Include this standard in their responsibilities section
- Reference this document explicitly
- Implement the mandatory evaluation prompt
- Define their parking station routing

### 11.3 Relationship to Layer-Down

This standard MUST be:
- Included in `GOVERNANCE_LAYERDOWN_CONTRACT.md`
- Layered down to all application repositories
- Enforced through agent contracts in each application
- **Enforced through FM gate checks** — FM MUST verify both feature AND process reflections before marking work unit COMPLETE (NEW - v2.0.0)

---

## 12. Layer-Down Requirements

### 12.1 Mandatory Layer-Down Artifacts

When layering governance into application repositories, this standard requires:

1. **This standard document** (or reference to governance canon)
2. **Parking station directory structure**:
   ```
   .architecture/parking-station/
   └── README.md (parking station rules and inventory)
   ```
3. **Agent contract updates** (all agents must include enhancement capture)
4. **Template for enhancement submissions** (optional but recommended)

### 12.2 Application-Specific Adaptations

Applications MAY:
- Define application-specific parking station locations
- Add application-specific enhancement categories
- Define additional routing rules
- **Add application-specific process reflection questions** (in addition to mandatory questions) (NEW - v2.0.0)

Applications MUST NOT:
- Weaken the mandatory capture requirement
- Skip or make optional the mandatory process reflection questions
- Convert parking station into execution backlog
- Allow proactive enhancement execution

---

## 13. Continuous Improvement Doctrine

This standard exists to ensure that:

- **Learning is never lost** — All insights are preserved
- **Execution remains focused** — No scope creep or distraction
- **Improvements are intentional** — Not accidental or reactive
- **Systems evolve without chaos** — Controlled, authorized evolution

### 13.1 Guiding Principles

> **We capture insight continuously.  
> We execute deliberately.  
> We improve systematically.**

---

## 14. Enforcement

### 14.1 Agent Contract Enforcement

All agent contracts MUST:
- Include explicit reference to this standard
- Implement the mandatory evaluation prompt
- Define consequences for non-compliance

### 14.2 PR Gate Consideration

While this standard is mandatory, enforcement through automated PR gates is:
- ✅ Encouraged for governance quality
- ⚠️ May be implemented as advisory initially
- ❌ Must not block critical work if enhancement evaluation is documented

Enforcement strategy is defined by the governance administrator.

### 14.3 Audit Trail

Enhancement submissions create an audit trail demonstrating:
- Continuous learning and improvement culture
- Systematic capture of insights
- Compliance with governance requirements

---

## 15. Authority Hierarchy

If conflicts arise, the following hierarchy prevails:

1. **Johan Ras (Human Owner / Final Authority)**
2. **GOVERNANCE_PURPOSE_AND_SCOPE.md** (Highest Canon)
3. **This Standard** (Mandatory Enhancement Capture)
4. **Agent Contracts** (Implementation of this standard)
5. **Application-Specific Parking Station Rules** (Local adaptations)

---

## 16. Versioning and Evolution

### 16.1 Version Control

This standard is version-controlled and follows:
- `VERSIONING_AND_EVOLUTION_GOVERNANCE.md` (Governance versioning rules)

Changes to this standard require:
- Governance Administrator approval
- Johan authorization for substantive changes
- Impact analysis on all agents and applications
- Migration plan for existing work units

### 16.2 Backward Compatibility

When this standard is updated:
- Existing parking station submissions remain valid
- Agents must adopt new requirements from effective date forward
- Grace period for agent contract updates: 30 days maximum

---

## 17. Success Metrics

This standard is successful when:

- ✅ 100% of work units include both feature AND process reflection
- ✅ 100% of process reflections include answers to all mandatory questions
- ✅ Parking station contains growing inventory of both feature and process insights
- ✅ Zero scope creep due to proactive enhancement execution
- ✅ Systematic review and authorization of parked enhancements/improvements
- ✅ Visible learning and improvement culture
- ✅ **Process improvement reflections inform Bootstrap Learning (BL) entries** (NEW - v2.0.0)
- ✅ **Systematic process failures are captured and prevented from recurring** (NEW - v2.0.0)

---

## 18. Non-Compliance Consequences

Failure to comply with this standard results in:

1. **Work unit marked incomplete**
2. **PR cannot be finalized** (if enforcement is active)
3. **Escalation to FM** for remediation
4. **Audit trail gap** (learning may be lost)

**Specific Non-Compliance Scenarios (v2.0.0)**:
- **Process reflection omitted entirely** → Work unit INCOMPLETE, must be remediated
- **Process reflection questions not answered** → Work unit INCOMPLETE, questions must be answered
- **Process reflection questions answered incompletely** ("N/A" without justification) → Work unit INCOMPLETE, substantive answers required
- **"No process improvements" declared without answering questions** → Invalid declaration, questions must be answered first

Repeated non-compliance may result in:
- Agent contract review
- Enhanced supervision requirements
- Training or guidance interventions

---

## 19. References

This standard should be read in conjunction with:

- `GOVERNANCE_PURPOSE_AND_SCOPE.md` — Governance as canonical memory
- `LEARNING_INTAKE_AND_PROMOTION_MODEL.md` — Learning preservation
- `LEARNING_PROMOTION_RULE.md` — Learning promotion process
- `GOVERNANCE_LAYERDOWN_CONTRACT.md` — Layer-down requirements
- `governance/parking-station/README.md` — Parking station rules
- `MANDATORY_PROCESS_IMPROVEMENT_REFLECTION_PROTOCOL.md` — Mandatory structured reflection for governance-repo work units (extends this standard)

---

**Document Control**

- **Owner**: Governance Administrator
- **Created**: 2025-12-31
- **Last Updated**: 2026-01-08
- **Status**: Active
- **Next Review**: 2026-03-31 (Quarterly)

**Version History**:
- **v1.0.0** (2025-12-31): Initial release — Feature enhancement capture mandatory
- **v2.0.0** (2026-01-08): Added mandatory process improvement reflection with required questions, BL promotion guidance, and FM gate enforcement requirement

---

End of Mandatory Enhancement & Improvement Capture Standard

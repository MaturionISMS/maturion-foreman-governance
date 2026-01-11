# MANDATORY PROCESS IMPROVEMENT REFLECTION PROTOCOL

## Status
**Type**: Canonical Governance Standard  
**Authority**: Supreme - Johan Ras (Maturion)  
**Version**: 1.0.0  
**Effective Date**: 2026-01-11  
**Applies To**: All Governance-Repo Work Units  
**Enforcement**: Mandatory

---

## 1. Purpose

This protocol establishes a **mandatory structured reflection process** for all governance repository work units. It ensures that every governance action—whether canon update, incident response, ripple planning, or template migration—generates explicit, traceable learning about **what worked, what failed, and what should improve**.

This protocol extends and complements `MANDATORY_ENHANCEMENT_CAPTURE_STANDARD.md` by requiring **systematic process analysis** at the completion of every governance-repo work unit, ensuring continuous improvement of governance processes, tooling, and canon itself.

---

## 2. Constitutional Authority

This protocol derives authority from and aligns with:

| Canonical Document | Relationship |
|-------------------|--------------|
| **GOVERNANCE_PURPOSE_AND_SCOPE.md** | Establishes governance as canonical memory and learning system |
| **MANDATORY_ENHANCEMENT_CAPTURE_STANDARD.md** | Defines mandatory enhancement capture (feature and process) |
| **LEARNING_INTAKE_AND_PROMOTION_MODEL.md** | Defines learning preservation and promotion requirements |
| **BOOTSTRAP_EXECUTION_LEARNINGS.md** | Records systematic execution learnings (BL entries) |
| **BUILD_PHILOSOPHY.md** | Maintains separation of execution from improvement capture |

This protocol is a **global governance requirement** specific to governance-repo work units.

---

## 3. Scope

### 3.1 Applicability

This protocol applies to **all governance repository work units**, including but not limited to:

- ✅ Governance canon updates, additions, or restructuring
- ✅ Incident response and RCA (Root Cause Analysis)
- ✅ Ripple planning and cross-repository layer-down coordination
- ✅ Template creation, migration, or updates
- ✅ Agent contract updates or migrations
- ✅ Governance gap analysis and remediation
- ✅ Bootstrap learning capture and promotion
- ✅ Policy updates and enforcement mechanism changes
- ✅ CI/CD gate modifications affecting governance

### 3.2 Work Unit Definition

A **governance-repo work unit** is any discrete, completable task performed in the `maturion-foreman-governance` repository that:
- Results in a commit to the repository,
- Produces governance documentation or canon updates,
- Involves governance analysis, planning, or coordination,
- Implements or enforces governance policy,
- OR is tracked as an issue, PR, or documented task in governance records.

---

## 4. Mandatory Reflection Requirement

At the conclusion of **every governance-repo work unit**, the responsible agent MUST complete a **Structured Process Improvement Reflection** that explicitly addresses **all five** of the following mandatory questions.

### 4.1 The Five Mandatory Questions

**Question 1: What went well in this work unit?**
- Identify governance processes, templates, tools, or canon elements that enabled success.
- Highlight which aspects should be preserved or amplified in future governance work.
- Identify strengths to build upon.

**Question 2: What failed, was blocked, or required rework?**
- Document any failures, blockers, or rework cycles, with root causes.
- Include governance gaps, tooling limitations, ambiguous specifications, or cross-repo coordination issues.
- Identify friction points that slowed or complicated the work.

**Question 3: What process, governance, or tooling changes would have improved this work unit or prevented waste?**
- Propose specific improvements that would have reduced friction or prevented rework.
- Identify friction points in workflow, escalation, verification, or evidence recording.
- Suggest concrete prevention mechanisms.

**Question 4: Did you comply with all relevant governance learnings (BLs / bootstrap learnings)?**
- Verify compliance with active learning and ratchet conditions.
- Check all BL entries marked as "Active" or "Ratchet" in `governance/canon/BOOTSTRAP_EXECUTION_LEARNINGS.md`
- For each applicable BL:
  - State: **COMPLIANT** or **NON-COMPLIANT**
  - If non-compliant: Document the reason and escalate immediately
- If no BLs are applicable to this work unit: State explicitly: "No applicable BL entries for this work unit."
- **Note**: The canonical source for active BL entries is `BOOTSTRAP_EXECUTION_LEARNINGS.md`. Always reference the most current version of that document rather than relying on any hardcoded list.

**Question 5: What actionable improvement should be layered up to governance canon or processes for future prevention?**
- Propose concrete governance/process changes suitable for canonization or policy update.
- Identify whether this should be:
  - A new canonical document,
  - An update to existing canon,
  - A new template or schema,
  - A CI/CD gate addition or modification,
  - A Bootstrap Learning (BL) entry,
  - OR provide clear justification why no upstream change is warranted for this particular case.
- If no upstream change is warranted, justify with: "This was a one-time situation unlikely to recur because [specific reason]."

---

## 5. Format Requirements

### 5.1 Reflection Structure

The reflection MUST:
- Be written in plain, human-readable markdown.
- Answer **all five questions explicitly** with substantive responses.
- Use clear section headers corresponding to each question.
- Include **minimum 2-3 sentences per question** unless "N/A" is explicitly justified.
- Be stored in a traceable location (see Section 6).

### 5.2 Prohibited Responses

The following are **explicitly forbidden**:
- ❌ "None identified" without substantive justification
- ❌ "N/A" without explaining why the question is not applicable
- ❌ Superficial or generic answers (e.g., "Everything went fine")
- ❌ Skipping questions entirely
- ❌ Combining multiple questions into a single vague response
- ❌ Declaring BL compliance without checking each relevant BL entry

### 5.3 Minimum Acceptable Response

If a question genuinely has no issues or improvements to report, the agent MUST provide:
- A brief description of why the question does not apply, OR
- A statement that no issues were encountered with supporting context.

**Example of acceptable "no issues" response:**
> **Question 2: What failed, was blocked, or required rework?**
> 
> No failures or blockers were encountered. This work unit involved a straightforward template migration with clear requirements, existing examples to reference, and no dependencies on external systems or coordination. The governance canon was unambiguous, and all necessary context was readily available.

---

## 6. Evidence Storage Requirements

### 6.1 Storage Locations

Process improvement reflections MUST be stored in **one of the following canonical locations**:

**Primary Locations:**
- `governance/memory/` — For reflections that inform future governance memory and agent behavior
- `governance/reports/` — For reflections tied to specific work units, completions, or deliverables
- `governance/evidence/` — For reflections supporting audit trails or incident investigations

**Contextual Locations:**
- Inline in completion reports (e.g., `COMPLETION_SUMMARY.md` for a wave or work unit)
- Inline in incident reports (e.g., `governance/incidents/INCIDENT-YYYY-MM-DD-*.md`)
- Inline in RCA documents (e.g., `RCA_*.md`)

**Minimum Requirement**: The reflection MUST be discoverable, traceable, and stored in a governance-tracked file (not ephemeral, not in comments only).

### 6.2 File Naming Convention

For standalone reflections, use:
```
PROCESS_IMPROVEMENT_REFLECTION_<WORK_UNIT_ID>_<DATE>.md
```

Where:
- `<WORK_UNIT_ID>` = Issue number (ISSUE_285), PR number (PR_123), or descriptive identifier (CANON_RESTRUCTURING)
- `<DATE>` = ISO 8601 date format: YYYY-MM-DD

Example:
```
PROCESS_IMPROVEMENT_REFLECTION_ISSUE_285_2026-01-11.md
```

For inline reflections within completion reports or incident documents, clearly label the section:
```markdown
## Process Improvement Reflection (Mandatory)

[Answers to all five questions]
```

---

## 7. Enforcement

### 7.1 Completion Gate

Before marking any governance-repo work unit as **COMPLETE**, the responsible agent MUST:

1. Complete the mandatory process improvement reflection.
2. Ensure all five questions are answered substantively.
3. Store the reflection in an appropriate evidence location (Section 6).
4. Reference the reflection in the work unit completion summary or PR description.

**Failure to complete the reflection = incomplete work unit.**

### 7.2 Escalation Requirement

If Question 4 (BL compliance check) reveals **non-compliance** with any applicable Bootstrap Learning:

1. **STOP immediately.**
2. Document the non-compliance explicitly in the reflection.
3. **Escalate to Maturion / FM** as appropriate (per agent contract escalation protocol).
4. **Do NOT mark the work unit as complete** until the escalation is resolved.

### 7.3 Non-Compliance Consequences

Failure to comply with this protocol results in:

1. **Work unit marked INCOMPLETE** — Cannot be closed or merged.
2. **PR cannot be finalized** — Handover verification blocked.
3. **Escalation to Governance Administrator or Maturion** for remediation.
4. **Audit trail gap** — Learning may be permanently lost.
5. **Repeat non-compliance** may result in agent contract review or supervision requirements.

---

## 8. Integration with Existing Governance

### 8.1 Relationship to MANDATORY_ENHANCEMENT_CAPTURE_STANDARD.md

This protocol **extends** `MANDATORY_ENHANCEMENT_CAPTURE_STANDARD.md` by:
- Requiring **process improvement reflection** as part of the mandatory process improvement review.
- Providing **structured questions** to guide the reflection (the five mandatory questions).
- Ensuring reflections are **evidence-tracked** in canonical locations.

Both standards MUST be followed:
- **Feature Enhancement Review** (from MANDATORY_ENHANCEMENT_CAPTURE_STANDARD.md)
- **Process Improvement Reflection** (from this protocol)

### 8.2 Relationship to Bootstrap Learnings (BOOTSTRAP_EXECUTION_LEARNINGS.md)

This protocol **feeds into** Bootstrap Learnings by:
- Requiring explicit BL compliance verification (Question 4).
- Identifying systematic governance gaps that may warrant new BL entries (Question 5).
- Creating audit trails that support future BL promotion decisions.

**Responsible Party for BL Promotion**: Governance Administrator or FM, NOT the agent completing the reflection (unless that agent is the Governance Administrator).

### 8.3 Relationship to Incident Response

For governance incident responses (e.g., `governance/incidents/INCIDENT-*.md`), the process improvement reflection MUST be included **within the incident report** or as a standalone companion document.

Incident reports that lack process improvement reflections are **incomplete** and cannot be closed.

---

## 9. Example Process Improvement Reflection

### Example: Governance Restructuring Work Unit

```markdown
# Process Improvement Reflection — Governance Restructuring (Issue #285)

**Work Unit**: Governance folder restructuring and canon organization  
**Date**: 2026-01-11  
**Agent**: Governance Repo Administrator

---

## Question 1: What went well in this work unit?

The existing governance canon was well-documented, making it straightforward to identify relationships and dependencies between documents. The `GOVERNANCE_RIPPLE_MODEL.md` and `CROSS_REPOSITORY_LAYER_DOWN_PROTOCOL.md` provided clear guidance on how to handle cross-repository impacts. The use of `grep` and `glob` tools enabled efficient scanning of references across the repository, preventing broken links during restructuring.

The governance-repo-administrator contract provided clear authority boundaries, and the escalation protocol ensured that any ambiguous decisions were appropriately routed to Maturion for approval.

---

## Question 2: What failed, was blocked, or required rework?

No significant failures or blockers were encountered during this work unit. However, one minor rework cycle occurred when initial file moves broke internal references in incident reports. This was quickly identified and corrected by re-running grep scans after each move.

A small coordination gap emerged when determining whether certain documents belonged in `governance/canon/` vs `governance/policy/`. The distinction was not always clear from existing documentation, requiring manual judgment calls.

---

## Question 3: What process, governance, or tooling changes would have improved this work unit or prevented waste?

**Improvement 1: Automated Reference Validation**  
An automated tool that scans all markdown files for internal links and validates them after file moves would have prevented the rework cycle. This could be implemented as a pre-commit hook or CI gate.

**Improvement 2: Canon vs. Policy Classification Guide**  
A clear decision tree or classification guide for determining whether a document is "canon" (binding authority) vs "policy" (implementation detail) would reduce ambiguity and judgment calls during restructuring. This could be added to `GOVERNANCE_PURPOSE_AND_SCOPE.md`.

**Improvement 3: Dry-Run Mode for Restructuring**  
A governance restructuring runbook with a "dry-run" validation step (grep all references, validate all links, check CI gates) before committing changes would reduce risk of breaking changes.

---

## Question 4: Did you comply with all relevant governance learnings (BLs / bootstrap learnings)?

**BL-016 (FM Complexity Recognition)**: Not applicable — this work unit did not involve FM delegation or complexity escalation.

**BL-018 (QA Catalog Alignment)**: Not applicable — this work unit did not involve QA ID assignment or subwave authorization.

**BL-019 (Forward-Scan Obligation)**: **COMPLIANT** — After identifying the reference validation pattern, forward-scan was performed across all governance documents to ensure no other broken references existed.

**BL-022 (Constitutional Sandbox)**: **COMPLIANT** — This work unit involved governance restructuring, which aligns with constitutional sandbox principles. All changes were reviewed against canonical authority hierarchy.

**Verdict**: COMPLIANT with all applicable BL entries.

---

## Question 5: What actionable improvement should be layered up to governance canon or processes for future prevention?

**Proposed Canonical Update:**  
Add a new section to `GOVERNANCE_PURPOSE_AND_SCOPE.md` titled "Canon vs. Policy Classification Criteria" with explicit decision criteria:
- **Canon**: Binding authority, applies globally, requires Maturion approval to change
- **Policy**: Implementation guidance, may vary by context, FM/Governance Admin can update

**Proposed Tooling Enhancement:**  
Create a governance pre-commit hook or CI gate that validates internal markdown references. This should be added to `.github/workflows/governance-gate.yml` to run on all PRs affecting governance documents.

**Proposed Runbook:**  
Create `governance/runbooks/GOVERNANCE_RESTRUCTURING_RUNBOOK.md` with step-by-step validation procedures for restructuring work, including dry-run validation steps.

**BL Consideration**: No new BL entry required — this is implementation-level tooling, not a systematic governance gap. Existing BL-019 (forward-scan) already captures the principle.

---

**Reflection Completed**: 2026-01-11  
**Stored**: governance/memory/PROCESS_IMPROVEMENT_REFLECTION_ISSUE_285_2026-01-11.md  
**Status**: COMPLETE
```

---

## 10. Authority Hierarchy

If conflicts arise, the following hierarchy prevails:

1. **Johan Ras (Maturion) — Human Owner / Final Authority**
2. **GOVERNANCE_PURPOSE_AND_SCOPE.md** — Highest Canon
3. **MANDATORY_ENHANCEMENT_CAPTURE_STANDARD.md** — Parent standard for enhancement capture
4. **This Protocol** — Specific requirements for governance-repo work units
5. **Agent Contracts** — Implementation of this protocol

---

## 11. Versioning and Evolution

### 11.1 Version Control

This protocol is version-controlled and follows:
- `VERSIONING_AND_EVOLUTION_GOVERNANCE.md` (Governance versioning rules)

Changes to this protocol require:
- Governance Administrator review
- Maturion authorization for substantive changes
- Impact analysis on governance-repo workflows
- Migration plan for in-flight governance work units

### 11.2 Backward Compatibility

When this protocol is updated:
- Existing reflections remain valid.
- Agents must adopt new requirements from effective date forward.
- Grace period for agent contract updates: 30 days maximum.

---

## 12. Success Metrics

This protocol is successful when:

- ✅ 100% of governance-repo work units include process improvement reflections
- ✅ All five mandatory questions are answered substantively in every reflection
- ✅ Reflections are stored in traceable, canonical locations
- ✅ BL compliance is explicitly verified in every reflection
- ✅ Systematic governance gaps are identified and promoted to canon updates or BL entries
- ✅ Governance processes improve measurably over time based on reflection insights
- ✅ Zero incidents of non-compliance with BL entries due to missed reflection

---

## 13. References

This protocol should be read in conjunction with:

- **MANDATORY_ENHANCEMENT_CAPTURE_STANDARD.md** — Parent standard for enhancement capture
- **GOVERNANCE_PURPOSE_AND_SCOPE.md** — Governance as canonical memory
- **LEARNING_INTAKE_AND_PROMOTION_MODEL.md** — Learning preservation and promotion
- **BOOTSTRAP_EXECUTION_LEARNINGS.md** — Active BL entries and ratchet conditions
- **LEARNING_PROMOTION_RULE.md** — Learning promotion process
- **BUILD_PHILOSOPHY.md** — Separation of execution from improvement capture
- **Agent Contracts** — Governance Repo Administrator, FM, and other governance agents

---

## 14. Document Control

**Owner**: Governance Administrator  
**Created**: 2026-01-11  
**Last Updated**: 2026-01-11  
**Status**: Active  
**Next Review**: 2026-04-11 (Quarterly)

**Version History**:
- **v1.0.0** (2026-01-11): Initial release — Mandatory process improvement reflection for governance-repo work units

---

**End of Mandatory Process Improvement Reflection Protocol**

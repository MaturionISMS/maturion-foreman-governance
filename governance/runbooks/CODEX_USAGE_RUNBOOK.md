# Codex Usage Runbook

**Status:** DRAFT — Awaiting Ratification  
**Authority:** Canonical (upon ratification)  
**Version:** 1.0  
**Effective Date:** Upon Ratification  
**Ratified By:** Pending — Johan Ras (CS2)  
**Applies To:** All Humans, Foreman, Governance Agent, Future AI Agents  
**Scope:** All Governed Repositories (MaturionISMS/*)  
**Related Artifacts:**
- `.github/agents/CodexAdvisor-agent.md` — CodexAdvisor Agent Contract
- `governance/canon/FOREMAN_AUTHORITY_AND_SUPERVISION_MODEL.md` — Authority Model
- `governance/escalation/ESCALATION_POLICY.md` — Escalation Protocol

---

## Purpose

This runbook defines **how CodexAdvisor is used in daily operations** across the Maturion ecosystem.

This runbook governs **human and agent interaction with CodexAdvisor**, not CodexAdvisor's internal identity (which is defined by its agent contract at `.github/agents/CodexAdvisor-agent.md`).

**Critical Distinction:**
- **CodexAdvisor Agent Contract:** Defines what CodexAdvisor IS (identity, capabilities, constraints)
- **This Runbook:** Defines how humans and agents USE CodexAdvisor (operational patterns, interaction rules)

---

## 1. When CodexAdvisor MAY Be Used

CodexAdvisor may be invoked in the following **explicit, permitted contexts**:

### Pre-Execution Advisory
- **Pre-build advisory review:** Foreman seeks architectural guidance before initiating a build
- **Pre-PR review:** Foreman or human seeks guidance on whether a PR is ready for submission
- **Issue drafting assistance:** Human seeks guidance on how to structure governance or execution issues
- **Architecture validation:** Foreman or human seeks validation of proposed architectural approaches

### Governance and Compliance
- **Governance compliance checks:** Verify that proposed changes align with canonical governance
- **Drift and risk detection:** Identify potential governance drift, architectural drift, or quality risks
- **Gate precondition analysis:** Assess whether gate preconditions are likely to be satisfied

### Uncertainty Analysis
- **Ambiguity clarification:** Seek advisory input when requirements, architecture, or governance are ambiguous
- **Risk assessment:** Evaluate potential risks in proposed changes or approaches
- **Best practice identification:** Identify industry best practices or governance-aligned patterns

### Execution Support (Advisory Only)
- **Builder instruction review:** Foreman seeks advisory review of builder instructions before issuance
- **Evidence review:** Foreman or human seeks advisory assessment of whether evidence is complete
- **Completion verification guidance:** Advisory input on whether completion criteria are satisfied

**Prohibited Use:**  
CodexAdvisor MUST NOT be treated as a general-purpose assistant, chatbot, or execution agent.

---

## 2. When CodexAdvisor MUST NOT Be Used

CodexAdvisor is **explicitly prohibited** from being used for:

### Execution Requests
- **Implementation requests:** "Implement feature X" or "Write code for Y"
- **Code modification:** "Fix this bug" or "Refactor this module"
- **Build execution:** "Run the build" or "Execute tests"
- **File operations:** "Create file X" or "Delete file Y"

### Decision-Making
- **Approval decisions:** "Should I approve this PR?"
- **Merge decisions:** "Should I merge this branch?"
- **Binding decisions:** "Decide whether this meets requirements"
- **Gate bypass decisions:** "Should we skip this QA gate?"

### Governance Authority
- **Governance interpretation:** "What does OPOJD doctrine mean?" (refer to canonical governance instead)
- **Governance redefinition:** "Rewrite this governance rule"
- **Authority escalation:** "Override Foreman's decision"
- **Canonical governance creation:** "Draft a new canonical governance artifact" (governance agent does this)

### Prohibited Patterns
- ❌ "CodexAdvisor, implement feature X"
- ❌ "CodexAdvisor, approve this PR"
- ❌ "CodexAdvisor, decide whether to merge"
- ❌ "CodexAdvisor, interpret what OPOJD means"
- ❌ "CodexAdvisor, bypass the QA gate"
- ❌ "CodexAdvisor, fix this failing test"

**Enforcement:**  
This section governs **human and agent behavior**, not CodexAdvisor capability. Violations indicate misuse by the requesting party, not CodexAdvisor malfunction.

---

## 3. How Requests to CodexAdvisor MUST Be Framed

All requests to CodexAdvisor MUST follow these mandatory framing rules:

### Rule 1: Use Advisory Language Only
Requests MUST be framed as requests for **advice, guidance, or recommendations**, not commands or execution instructions.

**Correct Patterns:**
- ✅ "CodexAdvisor, please advise: Does this architecture align with OPOJD principles?"
- ✅ "CodexAdvisor, I need guidance: What risks do you see in this PR?"
- ✅ "CodexAdvisor, please review: Is this builder instruction clear and complete?"
- ✅ "CodexAdvisor, advisory input requested: Does this approach align with governance?"

**Incorrect Patterns:**
- ❌ "CodexAdvisor, implement this feature"
- ❌ "CodexAdvisor, approve this PR"
- ❌ "CodexAdvisor, fix this code"
- ❌ "CodexAdvisor, decide whether to proceed"

### Rule 2: Acknowledge Non-Authority Explicitly
Requests SHOULD explicitly acknowledge that CodexAdvisor has no execution or decision-making authority.

**Example Pattern:**
> "CodexAdvisor, I acknowledge you have no authority to approve or decide, but please advise: Does this PR satisfy completion criteria?"

### Rule 3: Provide Clear Context
Requests MUST include sufficient context for CodexAdvisor to provide meaningful advice:
- **Repository:** Which repository is being discussed
- **PR or Issue Number:** Specific PR or issue reference
- **Phase or Stage:** Current execution phase (architecture, red QA, build-to-green, etc.)
- **Governance Context:** Relevant governance artifacts or constraints
- **Specific Question:** Clear, focused question requiring advisory input

**Example Pattern:**
> "CodexAdvisor, context: Repository `maturion-foreman-office-app`, PR #123, currently in Red QA phase. Question: Does the proposed Red QA test suite adequately cover edge cases for the authentication module?"

### Rule 4: Expect and Accept Escalation
Requests SHOULD acknowledge that escalation is a valid and expected response.

**Example Pattern:**
> "CodexAdvisor, if this question requires Foreman or human authority, please escalate with context."

---

## 4. How CodexAdvisor Output MUST Be Interpreted

All CodexAdvisor output MUST be interpreted according to these rules:

### Rule 1: Codex Output is Input, Not Truth
CodexAdvisor recommendations are **advisory inputs** to decision-making, not binding truth or decisions.

**Correct Interpretation:**
- ✅ "CodexAdvisor suggests this approach may violate OPOJD. I will review canonical governance to confirm."
- ✅ "CodexAdvisor identifies a potential risk. I will assess whether this risk is acceptable."
- ✅ "CodexAdvisor recommends additional testing. I will decide whether to add tests."

**Incorrect Interpretation:**
- ❌ "CodexAdvisor said it's fine, so it's approved"
- ❌ "CodexAdvisor said to do X, so I will do X without further consideration"
- ❌ "CodexAdvisor says this passes, so no further review needed"

### Rule 2: Codex Recommendations Are Non-Binding
CodexAdvisor recommendations carry **zero authority**. Final decisions rest with:
- **Foreman:** Execution planning, builder instruction, quality validation
- **Johan (CS2):** Product decisions, governance ratification, final approval
- **Governance Agent:** Governance canon updates, governance interpretation
- **Builders:** Implementation decisions within scope

**Key Principle:**  
CodexAdvisor advises → Authority decides → Execution proceeds

### Rule 3: Codex Risk Flags Are Signals, Not Blockers
When CodexAdvisor identifies risks, these are **signals for consideration**, not automatic blockers.

**Response Pattern:**
1. Acknowledge the risk signal
2. Assess whether the risk is real and material
3. Decide whether to mitigate, accept, or escalate
4. Document the decision
5. Proceed according to the decision

**Not:**  
"CodexAdvisor flagged a risk, so execution is blocked."

### Rule 4: Codex Uncertainty Requires Escalation
When CodexAdvisor explicitly states uncertainty, this MUST trigger escalation to the appropriate authority.

**Response Pattern:**
- CodexAdvisor uncertain about governance → Escalate to Governance Agent or canonical governance
- CodexAdvisor uncertain about architecture → Escalate to Foreman
- CodexAdvisor uncertain about product direction → Escalate to Johan (CS2)
- CodexAdvisor uncertain about implementation → Escalate to Foreman (who may delegate to builders)

**Key Principle:**  
Uncertainty disclosure is a **success condition**, not a failure. It prevents incorrect advice propagation.

---

## 5. Mandatory Handoff Rules

CodexAdvisor advisory output MUST be handed off correctly to preserve authority separation:

### Pattern 1: Codex → Foreman (Advisory Handoff)
When CodexAdvisor provides advice to Foreman:
1. **Foreman receives** CodexAdvisor advice as advisory input
2. **Foreman assesses** advice against governance, architecture, and execution context
3. **Foreman decides** whether to accept, modify, or reject advice
4. **Foreman proceeds** with execution authority intact

**Prohibited:**  
Codex advice bypassing Foreman and going directly to builders or humans as "instructions."

### Pattern 2: Foreman → Builders (Execution Authority)
Builders receive instructions **only from Foreman**, never directly from CodexAdvisor.

**Correct Flow:**
1. CodexAdvisor advises Foreman
2. Foreman decides and formulates builder instructions
3. Builders execute Foreman instructions

**Prohibited Flow:**
1. ❌ CodexAdvisor advises Builder directly
2. ❌ Builder executes CodexAdvisor advice without Foreman instruction

### Pattern 3: Codex → Governance Agent (Governance Escalation)
When CodexAdvisor identifies governance gaps, contradictions, or ambiguities:
1. **CodexAdvisor escalates** to Governance Agent
2. **Governance Agent assesses** whether governance update is required
3. **Governance Agent drafts** governance update (if required)
4. **Johan (CS2) ratifies** governance update

**Prohibited:**  
CodexAdvisor interpreting or redefining governance without escalation.

### Pattern 4: Codex → Johan (Human Authority Escalation)
When CodexAdvisor identifies issues requiring human judgment:
1. **CodexAdvisor escalates** to Johan (CS2) with context
2. **Johan decides** based on product, business, or strategic considerations
3. **Johan communicates** decision to Foreman or Governance Agent
4. **Execution proceeds** according to Johan's decision

**Prohibited:**  
CodexAdvisor making product or strategic decisions on behalf of Johan.

---

## 6. Escalation Handling

CodexAdvisor escalation MUST be handled as follows:

### What Constitutes a Codex Escalation
CodexAdvisor MUST escalate when encountering:
- **Governance interpretation questions:** Ambiguity in canonical governance
- **Conflicting requirements or guidance:** Contradictions between artifacts
- **Ambiguous scope boundaries:** Unclear whether action is within governance bounds
- **Potential governance violations:** Suspected violation of canonical governance
- **Critical security or compliance concerns:** Risks requiring immediate human attention
- **Situations requiring binding decisions:** Any decision CodexAdvisor cannot make
- **Requests for execution authority:** Attempts to use CodexAdvisor as executor

### How Foreman Must Respond to Codex Escalation
When CodexAdvisor escalates:
1. **Acknowledge** the escalation and review the context provided
2. **Assess** whether escalation is within Foreman authority or requires further escalation
3. **Decide** the appropriate response (resolve, escalate to Johan, escalate to Governance Agent)
4. **Document** the escalation and resolution in evidence trail
5. **Proceed** with execution according to resolution

**Foreman MUST NOT:**
- ❌ Ignore or dismiss CodexAdvisor escalations without assessment
- ❌ Override escalations without documented justification
- ❌ Treat escalations as failures or punitive events

### When Johan Is Involved
Johan (CS2) is involved when escalation concerns:
- **Product or feature decisions:** What to build, prioritization, scope changes
- **Governance ratification:** Approval of new governance canon or updates
- **Strategic direction:** Long-term architectural or business decisions
- **Irresolvable ambiguity:** Situations where no clear governance or authority exists

### Evidence Recording for Escalations
All escalations MUST be recorded with:
- **Escalation trigger:** What caused the escalation
- **Context provided:** Information available at escalation time
- **Authority involved:** Who received and resolved the escalation
- **Resolution decision:** What was decided and why
- **Execution outcome:** What happened after resolution

**Location:**  
Escalations are recorded in PR comments, issue comments, or governance reports as appropriate.

### Escalation as Success Condition
**Key Principle:**  
Escalation is a **designed success condition**, not a failure or defect.

Escalation indicates:
- ✅ CodexAdvisor correctly identified its authority boundary
- ✅ CodexAdvisor disclosed uncertainty instead of guessing
- ✅ Governance-safe behavior preserved
- ✅ Authority separation maintained

Escalation MUST NOT be treated as:
- ❌ CodexAdvisor failure
- ❌ Punitive event
- ❌ Reason to bypass CodexAdvisor

---

## 7. Evidence & Audit Trail Requirements

CodexAdvisor usage MUST leave an auditable trail:

### When Codex Advice Must Be Recorded
CodexAdvisor advice MUST be explicitly recorded when:
- **Pre-build advisory review:** Advisory input influenced architecture or planning decisions
- **Pre-PR review:** Advisory input influenced PR readiness assessment
- **Risk or drift detection:** Advisory input identified material risks
- **Escalation events:** Any escalation to Foreman, Governance Agent, or Johan
- **Decision justification:** Advisory input was a factor in a binding decision

**Recording Method:**  
Record in PR comments, issue comments, or governance evidence trail with:
- **Context:** What question was asked
- **Codex Response:** Summary of CodexAdvisor advice
- **Decision:** What was decided based on (or despite) advice
- **Justification:** Why decision was made

### Where Advisory Input is Referenced
CodexAdvisor advice MUST be referenced in:
- **PRs:** When advice influenced PR content, scope, or approach
- **Issues:** When advice influenced issue framing or scoping
- **Evidence Trail:** When advice was material to execution decisions
- **Governance Reports:** When advice identified governance gaps or contradictions

**Format Example:**
> **CodexAdvisor Advisory Input:**  
> CodexAdvisor advised that the proposed architecture may introduce circular dependencies. After review, Foreman assessed the risk as manageable with explicit module boundaries. Proceeding with mitigation plan documented in architecture.md.

### How Advisory Input Is Challenged or Overridden
When CodexAdvisor advice is **not followed**, this MUST be explicitly documented:

**Required Documentation:**
1. **Codex Advice:** What CodexAdvisor recommended
2. **Decision:** What was decided instead
3. **Justification:** Why CodexAdvisor advice was not followed
4. **Risk Assessment:** Whether risks identified by CodexAdvisor were accepted or mitigated differently

**Example:**
> **CodexAdvisor Advice Not Followed:**  
> CodexAdvisor recommended adding integration tests for the authentication module. Foreman assessed that unit tests and contract tests provide adequate coverage for this phase. Integration tests deferred to Wave 2.2. Risk accepted: potential integration issues not caught until later wave.

### Audit Trail Integrity
CodexAdvisor advisory inputs and resulting decisions MUST be:
- **Traceable:** Clear link from advice to decision
- **Timestamped:** When advice was given and when decision was made
- **Attributed:** Who made the decision (Foreman, Johan, Governance Agent)
- **Justified:** Why the decision was made

**Purpose:**  
Enable retrospective analysis of decision quality and advisory effectiveness.

---

## 8. Failure & Misuse Handling

When CodexAdvisor is misused or fails to operate correctly, follow these procedures:

### Scenario 1: Codex Is Asked to Execute
**Trigger:** CodexAdvisor is asked to implement, build, modify code, or perform execution actions.

**Response:**
1. **CodexAdvisor MUST refuse** and cite its agent contract constraints
2. **CodexAdvisor MUST escalate** to Foreman or Governance Agent
3. **Requesting party MUST reframe** request as advisory, or route to correct executor

**Corrective Action:**  
If pattern repeats, Governance Agent reviews whether requesting party understands CodexAdvisor role.

**Preventative Action:**  
Ensure all humans and agents have read this runbook and CodexAdvisor agent contract.

### Scenario 2: Codex Advice Is Treated as a Decision
**Trigger:** Human or agent treats CodexAdvisor advice as binding decision without independent assessment.

**Response:**
1. **Foreman or Governance Agent identifies** the misuse
2. **Requesting party is reminded** that Codex advice is input only
3. **Decision authority reasserts** authority and makes explicit decision
4. **Evidence trail is corrected** to reflect actual decision-maker

**Corrective Action:**  
Record incident in Bootstrap Execution Learnings if systemic pattern emerges.

**Preventative Action:**  
Reinforce authority separation in agent contracts and this runbook.

### Scenario 3: Codex Is Bypassed When Required
**Trigger:** Advisory review was required but not performed, leading to avoidable issues.

**Response:**
1. **Identify gap:** Why was advisory review skipped?
2. **Assess impact:** Did bypass cause governance drift, quality issues, or risk?
3. **Corrective action:** Perform late advisory review if issue is still active
4. **Preventative action:** Update runbook or governance to make requirement clearer

**Example:**  
Pre-build advisory review was skipped, leading to architecture that violates OPOJD. Corrective action: halt build, perform advisory review, revise architecture.

### Scenario 4: Codex Is Over-Used or Misused
**Trigger:** CodexAdvisor is invoked for trivial decisions, used as a crutch, or asked repetitive questions.

**Response:**
1. **Assess pattern:** Is over-use indicating lack of confidence, unclear governance, or process inefficiency?
2. **Root cause:** Address underlying cause (training gap, governance ambiguity, unclear authority)
3. **Guidance:** Clarify when CodexAdvisor use is appropriate vs. when agent should decide independently

**Corrective Action:**  
Governance Agent reviews whether governance is sufficiently clear, or whether agent training is needed.

**Preventative Action:**  
Update this runbook with clearer guidance on when CodexAdvisor use is appropriate.

### Scenario 5: Codex Provides Incorrect or Harmful Advice
**Trigger:** CodexAdvisor advice is demonstrably wrong, misleading, or harmful.

**Response:**
1. **Halt execution** if advice was already acted upon
2. **Assess impact:** What was affected by incorrect advice?
3. **Correct course:** Reverse or mitigate harm caused by incorrect advice
4. **Document incident:** Record in governance reports or Bootstrap Execution Learnings
5. **Escalate to Johan:** If incident is material or indicates systemic issue

**Corrective Action:**  
Review whether CodexAdvisor agent contract needs clarification, or whether requesting context was insufficient.

**Preventative Action:**  
Reinforce principle that Codex advice is input, not truth, and MUST be assessed by decision authority.

---

## Explicit Non-Goals

This runbook explicitly **does not and must not**:

- ❌ **Redefine CodexAdvisor authority:** Authority is defined in `.github/agents/CodexAdvisor-agent.md`
- ❌ **Duplicate the CodexAdvisor agent contract:** This runbook references the contract, not replaces it
- ❌ **Introduce execution capability:** CodexAdvisor remains advisory-only
- ❌ **Act as governance canon:** This is an operational runbook, not Tier-0 or Tier-1 governance
- ❌ **Define technical implementation details:** This runbook is operational and human-readable

---

## Alignment Requirements

This runbook MUST remain aligned with:

### Agent Contracts
- **CodexAdvisor Agent Contract:** `.github/agents/CodexAdvisor-agent.md`
- **Foreman Agent Contract:** `MaturionISMS/maturion-foreman-office-app/.github/agents/ForemanApp-agent.md`
- **Builder Agent Contracts:** `MaturionISMS/maturion-foreman-office-app/.github/agents/*-builder.md`

### Canonical Governance
- **Foreman Authority Model:** `governance/canon/FOREMAN_AUTHORITY_AND_SUPERVISION_MODEL.md`
- **Escalation Policy:** `governance/escalation/ESCALATION_POLICY.md`
- **OPOJD Doctrine:** `governance/opojd/OPOJD_DOCTRINE.md`
- **Build Philosophy:** `BUILD_PHILOSOPHY.md`

### Authority Separation
This runbook MUST:
- ✅ Preserve Foreman as sole supervisory authority over builders
- ✅ Preserve Johan (CS2) as final human authority
- ✅ Preserve Governance Agent as sole governance canon authority
- ✅ Preserve CodexAdvisor as advisory-only, non-executing, non-deciding

---

## Readability and Usability

This runbook is written to be:
- **Clear:** Unambiguous language, explicit rules
- **Concise:** Focused on operational usage, not theory
- **Non-technical:** Accessible to non-coders (Johan, future human staff)
- **Actionable:** Specific patterns, examples, and response procedures
- **Governance-aligned:** Consistent with canonical governance and agent contracts

---

## Versioning and Updates

**Version:** 1.0  
**Effective Date:** Upon Ratification  
**Next Review:** After Wave 1.1 completion or upon CodexAdvisor agent contract update  

**Update Authority:**  
- **Minor updates (clarifications, examples):** Governance Agent
- **Major updates (rule changes, scope changes):** Governance Agent → Johan (CS2) ratification

**Update Triggers:**
- CodexAdvisor agent contract update
- Foreman authority model update
- Observed misuse patterns requiring clarification
- Bootstrap Execution Learnings indicating runbook gap

---

## Success Criteria

This runbook is considered COMPLETE when:

- ✅ All 8 mandatory sections are present and complete
- ✅ Runbook is clear, concise, and non-technical
- ✅ No authority or execution drift introduced
- ✅ Fully aligned with CodexAdvisor agent contract
- ✅ Fully aligned with Foreman authority model
- ✅ Fully aligned with escalation policy
- ⏳ Johan (CS2) formally ratifies the runbook — **PENDING**

---

## Ratification

**Proposed By:** Johan Ras (CS2) via Issue (Draft and Ratify Codex Usage Runbook for Daily Operations)  
**Drafted By:** Governance Agent (2026-01-07)  
**Status:** Draft Complete — Awaiting Johan Ras (CS2) Formal Ratification  

**Upon Ratification:**
- Set Status to "ACTIVE — Operational Governance"
- Set Authority to "Canonical"
- Set Effective Date to ratification date
- Update "Ratified By" field with Johan Ras (CS2) and date

---

**End of Codex Usage Runbook v1.0 (DRAFT)**

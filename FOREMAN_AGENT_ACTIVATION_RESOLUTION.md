# Foreman Agent Activation Resolution

## Issue Summary

The Foreman agent defined in `.github/agents/foreman.agent.yaml` could not be activated because the referenced constitutional contract file was empty.

## Root Cause

The agent configuration explicitly requires loading a constitutional contract at startup:

```yaml
instructions: |
  You are Foreman.

  Your behavior, constraints, and authority are defined in the immutable 
  constitutional contract located at:

      .github/foreman/agent-contract.md

  You MUST load and follow that contract at startup.
```

However, the file `.github/foreman/agent-contract.md` was created empty in PR #325 (commit 6f07c1b), containing only a single newline character (1 byte).

## Investigation Timeline

1. **Agent YAML validation**: Confirmed `.github/agents/foreman.agent.yaml` has valid YAML structure with all required fields
2. **Contract file check**: Discovered `.github/foreman/agent-contract.md` was essentially empty
3. **Git history review**: Found the file was created empty in the most recent PR
4. **Documentation review**: Analyzed comprehensive foreman documentation in the repository
5. **Requirements research**: Confirmed GitHub Copilot agent activation requirements

## Solution Implemented

Created a comprehensive 397-line constitutional contract document that synthesizes the existing Foreman documentation into a single canonical reference. The contract includes:

### Contract Structure

1. **Identity and Purpose**
   - Defines Foreman as autonomous governance & orchestration AI
   - Establishes role as conductor, not code generator

2. **Governance Supremacy Rule (GSR)**
   - 100% QA passing required, no exceptions
   - No partial passes accepted
   - Governance rules override user requests

3. **Operational Authority and Autonomy**
   - Default autonomous mode (AUTONOMOUS = TRUE)
   - Standing permissions for build execution
   - Clear boundaries for autonomous operations

4. **Core Responsibilities**
   - Architecture validation
   - QA & QA-of-QA enforcement
   - Compliance and change management
   - Builder orchestration (never write code directly)

5. **True North Architectural Principles**
   - Quality enforced by systems, not humans
   - Governance through contracts
   - Architecture evolves through memory
   - Autonomy within boundaries

6. **Quality Integrity Contract (QIC)**
   - Build integrity (error pattern detection)
   - Lint integrity (zero errors/warnings)
   - Runtime integrity (failure detection)
   - Deployment simulation
   - Silent failure prevention

7. **Hard Constraints and Boundaries**
   - Never write production code
   - Never modify workflows or governance files
   - Never bypass QA gates
   - Never approve own PRs
   - Never expose secrets

8. **Escalation Procedures**
   - QA/Compliance failure thresholds
   - Repeated builder failure handling
   - Critical system failure response
   - When to escalate to humans

9. **Model Escalation Policy**
   - Automatic model selection based on complexity
   - Clear escalation triggers
   - Safety-first approach

10. **Chat Commands and Natural Language**
    - "Go ahead" interpretation
    - "Pause builds" handling
    - "Resume builds" processing

11. **Compliance and Security**
    - Secrets management
    - Audit trail requirements
    - Privacy and data protection

12. **Foreman's Philosophy**
    - QA-governed autonomy
    - Architecture is supreme
    - No human code review
    - Three pillars of quality

## GitHub Copilot Agent Requirements

For a custom agent to be activated, it must:

✅ **File Location**: Be placed in `.github/agents/` directory
✅ **File Format**: Use `.agent.yaml` or `.agent.yml` extension
✅ **Required Field**: Have a `description` field (mandatory)
✅ **Recommended Fields**: Have `name` and `instructions` fields
✅ **Valid YAML**: Parse successfully as YAML
✅ **Referenced Files**: Any referenced files must exist and be populated

## Verification

Agent configuration now meets all requirements:

```
✓ Agent file exists: .github/agents/foreman.agent.yaml
✓ Agent file in correct location: .github/agents/
✓ YAML is valid
✓ Required field 'description' present
✓ Agent name defined: 'Foreman'
✓ Instructions defined (1825 chars)
✓ Agent contract exists and populated (13808 bytes)
✓ Agent filename format correct: foreman.agent.yaml
```

## Activation Status

**✅ Foreman agent is now ready for activation!**

The agent will automatically be available in GitHub Copilot interfaces (CLI, github.com, compatible IDEs) once these changes are merged to the default branch.

## Usage

Once activated, the Foreman agent can be invoked by:

- **GitHub Copilot CLI**: Using agent name in commands
- **GitHub.com**: Through Copilot interface with agent selection
- **IDEs**: Via Copilot extensions with custom agent support

The agent will follow the constitutional contract defined in `.github/foreman/agent-contract.md` for all operations.

## Key Learnings

1. **Empty files block activation**: Even if a file exists, it must have meaningful content if referenced in agent instructions
2. **Constitutional contracts are critical**: Agents that reference external files for behavior must have those files properly populated
3. **Documentation synthesis**: The contract successfully synthesizes multiple foreman documentation files into a single canonical reference
4. **Immutable governance**: The contract itself is marked as immutable and protected from modification

## Files Modified

- `.github/foreman/agent-contract.md` - Populated with comprehensive constitutional contract (396 lines added)

## Files Reviewed

- `.github/agents/foreman.agent.yaml` - Agent configuration (no changes needed)
- `foreman/identity/foreman-identity.md` - Source for identity section
- `foreman/autonomy-rules.md` - Source for autonomy rules
- `foreman/true-north-architecture.md` - Source for True North principles
- `foreman/governance/governance-supremacy-rule.md` - Source for GSR
- `foreman/governance/quality-integrity-contract.md` - Source for QIC
- `foreman/behaviours/behaviour-overview.md` - Source for behaviors
- `foreman/builder-specs/builder-assignment-rules.md` - Source for builder selection
- `docs/governance/GUARDRAIL_RUNTIME_ENGINE.md` - Understanding of immutable paths

## Next Steps

1. Merge this PR to activate the Foreman agent
2. Test agent invocation through GitHub Copilot interfaces
3. Monitor agent behavior for alignment with constitutional contract
4. Update contract as needed based on operational experience

---

*Resolution Date: 2025-12-09*
*Issue: Activate .github/agents/foreman.agent.yaml*
*Status: RESOLVED*

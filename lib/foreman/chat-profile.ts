/**
 * Foreman Chat Profile
 * Builds chat-specific system prompts for the Foreman orchestration engine
 */

import { loadForemanBehaviourFiles } from "@/lib/github/loadFiles";
import type { ForemanBehaviourFile } from "@/lib/github/loadFiles";
import type { ChatMessageMetadata } from "@/types/foreman";

/**
 * Compile Foreman chat context with specialized chat instructions
 * This builds on top of the base behavior loading but adds chat-specific guidance
 */
export async function compileForemanChatContext(
  organisationId: string
): Promise<string> {
  // Load behavior files from configured repository or local fallback
  const files = await loadForemanBehaviourFiles();
  
  // Compile behavior file blocks
  const behaviorBlocks = files.map(
    (f) => `# FILE: ${f.path}\n\n${f.content}`
  );

  // Chat-specific system prompt layer
  const chatPrompt = `
# Foreman Chat System

You are the Maturion Foreman, an autonomous orchestration agent designed to coordinate software development workflows.

## Your Identity in Chat

When conversing with Johan (or other admins), remember:

1. **You are the Foreman, NOT a builder**
   - You orchestrate and coordinate
   - You do NOT write code yourself
   - Builders write code under your coordination

2. **You use builders for code generation**
   - UI Builder for components and pages
   - API Builder for endpoints and services
   - Schema Builder for types and data models
   - Integration Builder for external services
   - QA Builder for testing and validation

3. **You follow QA, QA-of-QA, Compliance, and True North**
   - Architecture is supreme (True North)
   - QA validation is mandatory, not optional
   - QA-of-QA ensures quality assurance quality
   - Compliance rules are absolute
   - No shortcuts, no bypasses

4. **Johan does NOT review code; Architecture + QA are your judges**
   - Human code review is replaced by systematic QA
   - QA validation is more consistent than human review
   - Architecture conformance is deterministic
   - You answer to governance rules, not personal preferences

5. **When asked to act, you respond with proposed actions and their risks**
   - Never execute builders automatically in chat (unless explicitly approved)
   - Propose clear action plans with builder task breakdowns
   - Highlight risks, dependencies, and QA requirements
   - Show which governance rules apply
   - Explain trade-offs and alternatives

## Chat Response Guidelines

When responding in chat:

- Be concise but thorough
- Reference specific behavior rules when relevant
- Propose actionable builder tasks, don't just discuss
- Highlight QA and compliance implications
- Use structured responses for complex topics
- Tag responses with metadata (wave, module, action type)
- Link to relevant architecture documentation

## Capabilities You Can Discuss

You can help with:
- **Architecture Analysis**: Detect gaps, suggest improvements
- **Build Planning**: Plan multi-builder sequences
- **Self-Tests**: Run system diagnostics
- **Integration Tests**: Coordinate test execution
- **Governance Interpretation**: Explain rules and policies
- **Builder Coordination**: Explain how builders work together
- **QA Strategy**: Discuss testing and validation approaches
- **Risk Assessment**: Evaluate proposed changes
- **Pilot Builds**: Execute pilot build waves to validate the complete pipeline

## Pilot Build Commands

When Johan asks you to run a pilot build, respond with:

\`\`\`json
{
  "replyText": "I'll execute the pilot build wave now. This validates the chat → builder → QA → PR pipeline.",
  "proposedActions": [
    {
      "type": "RUN_BUILD_WAVE",
      "params": {
        "wave": "pilot_foreman_sandbox"
      },
      "requiresApproval": false,
      "organisationId": "maturion_isms"
    }
  ],
  "autonomyIntent": "execute"
}
\`\`\`

Pilot build command patterns:
- "Run pilot build"
- "Run the pilot build"
- "Execute pilot wave"
- "Foreman, run pilot build"
- "Run pilot build wave"

## Response Format

For action requests, respond in this format:

\`\`\`json
{
  "replyText": "Your conversational response",
  "proposedActions": [
    {
      "type": "TRIGGER_BUILDER_TASK",
      "builder": "ui",
      "module": "dashboard",
      "description": "Create dashboard component",
      "risks": ["May require schema updates", "UI/UX review needed"],
      "qaRequirements": ["Component tests", "Integration tests"],
      "estimatedComplexity": "medium"
    }
  ],
  "telemetry": {
    "subSystemsInvolved": ["orchestrator", "behaviour-loader"],
    "behaviourRulesReferenced": ["qa-enforcement", "approval-rules"],
    "contextFlags": []
  }
}
\`\`\`

## Organisation Context

Current organisation: ${organisationId}

---

# Behaviour Files Loaded

${behaviorBlocks.join("\n\n---\n\n")}
`;

  return chatPrompt;
}

/**
 * Build a simplified chat context for quick responses
 * Used when full behavior loading is not needed
 */
export function buildQuickChatContext(organisationId: string): string {
  return `
# Foreman Chat (Quick Context)

You are the Maturion Foreman orchestrating software development.

**Organisation**: ${organisationId}

**Key Principles**:
- Orchestrate builders, don't write code
- QA validation is mandatory
- Follow architecture (True North)
- Propose actions with risks

Respond concisely and reference governance when needed.
`;
}

/**
 * Parse Foreman response to extract metadata
 */
export function extractChatMetadata(
  response: string
): ChatMessageMetadata {
  const metadata: ChatMessageMetadata = {
    tags: []
  };

  // Try to parse as JSON first
  try {
    const parsed = JSON.parse(response);
    if (parsed.proposedActions && Array.isArray(parsed.proposedActions)) {
      const firstAction = parsed.proposedActions[0];
      if (firstAction) {
        metadata.actionType = firstAction.type;
        metadata.builderType = firstAction.builder;
        metadata.module = firstAction.module;
        metadata.complexity = firstAction.estimatedComplexity;
      }
    }
  } catch {
    // Not JSON, extract from text patterns
    const waveMatch = response.match(/wave[:\s]+([^\s,]+)/i);
    if (waveMatch) metadata.wave = waveMatch[1];

    const moduleMatch = response.match(/module[:\s]+([^\s,]+)/i);
    if (moduleMatch) metadata.module = moduleMatch[1];

    const actionMatch = response.match(/action[:\s]+([^\s,]+)/i);
    if (actionMatch) metadata.actionType = actionMatch[1];
  }

  // Extract common tags
  if (response.toLowerCase().includes("qa")) metadata.tags?.push("qa");
  if (response.toLowerCase().includes("compliance")) metadata.tags?.push("compliance");
  if (response.toLowerCase().includes("builder")) metadata.tags?.push("builder");
  if (response.toLowerCase().includes("architecture")) metadata.tags?.push("architecture");

  return metadata;
}

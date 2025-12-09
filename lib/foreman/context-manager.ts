/**
 * Context Window Management for Foreman Chat
 * Implements token counting, compression, and context limiting to prevent API errors
 */

import type { ChatMessage } from '@/types/foreman';
import { compressPrompt, requiresCompression, type CompressionOptions } from './context/prompt-compressor';

// Conservative token limits to stay well under API limits
export const MAX_TOTAL_TOKENS = 8000; // Target max for entire context
export const MAX_SYSTEM_PROMPT_TOKENS = 4000; // Reserve half for system prompt
export const MAX_CONVERSATION_TOKENS = 3500; // Reserve for conversation history
export const MAX_COMPLETION_TOKENS = 2000; // Reserve for response

// Extended limits for large prompts (with model escalation)
export const MAX_TOTAL_TOKENS_EXTENDED = 120000; // For gpt-4-turbo
export const MAX_USER_MESSAGE_TOKENS = 20000; // Support up to 20k token prompts

// Approximate token counting (rough estimate: 1 token ≈ 4 characters)
const AVG_CHARS_PER_TOKEN = 4;

/**
 * Estimate token count from text
 * Uses character-based approximation for speed
 */
export function estimateTokenCount(text: string): number {
  if (!text) return 0;
  return Math.ceil(text.length / AVG_CHARS_PER_TOKEN);
}

/**
 * Truncate text to fit within token limit
 */
export function truncateToTokenLimit(text: string, maxTokens: number): string {
  const maxChars = maxTokens * AVG_CHARS_PER_TOKEN;
  if (text.length <= maxChars) return text;
  
  return text.substring(0, maxChars - 20) + '\n\n[... truncated]';
}

/**
 * Compress chat message for context efficiency
 */
export function compressMessage(message: ChatMessage): string {
  // Format: [role] message
  const prefix = message.role === 'user' ? 'User: ' : 'Foreman: ';
  return prefix + message.content;
}

/**
 * Compress conversation history to fit within token budget
 * Keeps most recent messages, summarizes or drops older ones
 */
export function compressConversationHistory(
  messages: ChatMessage[],
  maxTokens: number = MAX_CONVERSATION_TOKENS
): string {
  if (messages.length === 0) return '';

  let compressed: string[] = [];
  let currentTokens = 0;
  const summaryText = `[... earlier messages omitted for context efficiency]`;
  const summaryTokens = estimateTokenCount(summaryText);

  // Process messages in reverse (most recent first)
  for (let i = messages.length - 1; i >= 0; i--) {
    const message = messages[i];
    const messageText = compressMessage(message);
    const messageTokens = estimateTokenCount(messageText);

    if (currentTokens + messageTokens <= maxTokens) {
      // Add full message
      compressed.unshift(messageText);
      currentTokens += messageTokens;
    } else if (compressed.length === 0) {
      // First message is too large, truncate it
      const available = maxTokens - currentTokens;
      compressed.unshift(truncateToTokenLimit(messageText, available));
      break;
    } else {
      // Summarize remaining older messages
      const remaining = messages.length - i;
      if (remaining > 0) {
        const summaryMessage = `[... ${remaining} earlier messages omitted for context efficiency]`;
        const summaryMessageTokens = estimateTokenCount(summaryMessage);
        // Make sure we have room for the summary
        if (currentTokens + summaryMessageTokens <= maxTokens) {
          compressed.unshift(summaryMessage);
        }
      }
      break;
    }
  }

  return compressed.join('\n\n');
}

/**
 * Create condensed system prompt for chat
 * Provides essential governance without full file contents
 */
export function createCondensedSystemPrompt(organisationId: string): string {
  return `# Foreman System Prompt - Maturion Orchestration AI (Condensed)

## Identity & Role

You are the Maturion Foreman, an autonomous orchestration agent operating under **Autonomy Class A1** (QA-Gated Autonomous Execution).

### Core Responsibilities
1. **Architecture Governance** - Ensure alignment with True North principles
2. **Build Orchestration** - Coordinate specialized builders (UI, API, Schema, Integration, QA)
3. **QA Enforcement** - All code must pass QA validation before PR assembly
4. **Compliance Verification** - Enforce security, privacy, and governance rules
5. **Memory Management** - Load memory context before acting
6. **Change Management** - Assemble PRs with proper documentation

### What You Are NOT
- NOT a code writer (you orchestrate; builders write code)
- NOT a generic chatbot (you are a specialized orchestration AI)
- NOT subject to human code review (QA validation replaces manual review)

## Autonomy Class A1

**Operational Mode**: Autonomous orchestration with QA enforcement gates
- Auto-approval enabled when MATURION_AUTONOMOUS_MODE=true
- Full operational autonomy within governance boundaries
- QA validation gates remain absolute and cannot be bypassed
- Human approval bypassed for standard operations when QA passes
- Human oversight required for: QA failures, security issues, or governance violations

## Chat Response Format

For action requests, respond in JSON format:

\`\`\`json
{
  "replyText": "Your conversational response",
  "proposedActions": [
    {
      "type": "TRIGGER_BUILDER_TASK",
      "builder": "ui",
      "module": "dashboard",
      "description": "Task description",
      "requiresApproval": false
    }
  ],
  "autonomyIntent": "execute"
}
\`\`\`

## Key Commands

- **Dashboard queries**: "Show dashboard", "Show project [name]"
- **Blocker analysis**: "Show blockers for [project]"
- **Pilot builds**: "Run pilot build"
- **Status checks**: "Check deployment readiness for [project]"

## Organisation Context

**Current Organisation**: ${organisationId}
**Autonomy Mode**: Enabled (QA-gated)
**QA Enforcement**: Always active and mandatory

---

**Note**: This is a condensed prompt for context efficiency. Full governance files are available when needed.`;
}

/**
 * Validate that total context fits within limits
 */
export function validateContextSize(
  systemPrompt: string,
  conversationHistory: string,
  userMessage: string
): { valid: boolean; totalTokens: number; breakdown: Record<string, number> } {
  const systemTokens = estimateTokenCount(systemPrompt);
  const conversationTokens = estimateTokenCount(conversationHistory);
  const userTokens = estimateTokenCount(userMessage);
  const totalTokens = systemTokens + conversationTokens + userTokens;

  return {
    valid: totalTokens <= MAX_TOTAL_TOKENS,
    totalTokens,
    breakdown: {
      system: systemTokens,
      conversation: conversationTokens,
      user: userTokens,
      reserved: MAX_COMPLETION_TOKENS
    }
  };
}

/**
 * Build optimized context for chat API
 * Automatically compresses if needed to stay within limits
 * Supports large prompts with intelligent compression
 */
export async function buildOptimizedContext(
  messages: ChatMessage[],
  currentMessage: string,
  organisationId: string,
  options: {
    useCondensedPrompt?: boolean;
    maxConversationTokens?: number;
    enableLargePrompts?: boolean;
  } = {}
): Promise<{
  systemPrompt: string;
  conversationHistory: string;
  userMessage: string;
  metadata: {
    totalTokens: number;
    compressed: boolean;
    messagesIncluded: number;
    promptCompressed?: boolean;
    promptCompressionRatio?: number;
  };
}> {
  const useCondensed = options.useCondensedPrompt ?? false;
  const maxConvTokens = options.maxConversationTokens ?? MAX_CONVERSATION_TOKENS;
  const enableLargePrompts = options.enableLargePrompts ?? true;

  // Build system prompt (always use condensed for now to prevent context overflow)
  const systemPrompt = createCondensedSystemPrompt(organisationId);

  // Compress conversation history
  const conversationHistory = compressConversationHistory(messages, maxConvTokens);

  // Handle large prompts with intelligent compression
  let userMessage = currentMessage;
  let promptCompressed = false;
  let promptCompressionRatio = 1.0;

  const userMessageTokens = estimateTokenCount(currentMessage);

  // Check if user message requires compression
  if (enableLargePrompts && requiresCompression(currentMessage, MAX_USER_MESSAGE_TOKENS)) {
    console.log(`[ContextManager] Large prompt detected: ${userMessageTokens} tokens, applying compression`);
    
    const compressionOptions: CompressionOptions = {
      targetMaxTokens: 4000, // Compress to reasonable size
      preserveGovernance: true,
      preserveArchitecture: true,
      preserveCriticalInstructions: true,
    };

    const compressed = await compressPrompt(currentMessage, compressionOptions);
    userMessage = compressed.compressedPrompt;
    promptCompressed = true;
    promptCompressionRatio = compressed.compressionRatio;

    console.log(`[ContextManager] Prompt compressed: ${compressed.originalTokens} -> ${compressed.compressedTokens} tokens (${(promptCompressionRatio * 100).toFixed(1)}%)`);
  } else if (userMessageTokens > 500 && !enableLargePrompts) {
    // Fallback to truncation if large prompts not enabled
    userMessage = truncateToTokenLimit(currentMessage, 500);
  }

  // Calculate totals
  const validation = validateContextSize(systemPrompt, conversationHistory, userMessage);

  // Determine if conversation history compression occurred
  const wasCompressed = messages.length > 0 && (
    conversationHistory.includes('earlier messages omitted') || 
    estimateTokenCount(conversationHistory) < estimateTokenCount(messages.map(compressMessage).join('\n\n'))
  );

  return {
    systemPrompt,
    conversationHistory,
    userMessage,
    metadata: {
      totalTokens: validation.totalTokens,
      compressed: wasCompressed || promptCompressed,
      messagesIncluded: messages.length,
      promptCompressed,
      promptCompressionRatio: promptCompressed ? promptCompressionRatio : undefined,
    }
  };
}

/**
 * Synchronous version for backward compatibility
 */
export function buildOptimizedContextSync(
  messages: ChatMessage[],
  currentMessage: string,
  organisationId: string,
  options: {
    useCondensedPrompt?: boolean;
    maxConversationTokens?: number;
  } = {}
): {
  systemPrompt: string;
  conversationHistory: string;
  userMessage: string;
  metadata: {
    totalTokens: number;
    compressed: boolean;
    messagesIncluded: number;
  };
} {
  const useCondensed = options.useCondensedPrompt ?? false;
  const maxConvTokens = options.maxConversationTokens ?? MAX_CONVERSATION_TOKENS;

  // Build system prompt (always use condensed for now to prevent context overflow)
  const systemPrompt = createCondensedSystemPrompt(organisationId);

  // Compress conversation history
  const conversationHistory = compressConversationHistory(messages, maxConvTokens);

  // Truncate user message if needed (sync version doesn't support large prompts)
  const userMessage = truncateToTokenLimit(currentMessage, 500);

  // Calculate totals
  const validation = validateContextSize(systemPrompt, conversationHistory, userMessage);

  // Determine if actual compression occurred
  const wasCompressed = messages.length > 0 && (
    conversationHistory.includes('earlier messages omitted') || 
    estimateTokenCount(conversationHistory) < estimateTokenCount(messages.map(compressMessage).join('\n\n'))
  );

  return {
    systemPrompt,
    conversationHistory,
    userMessage,
    metadata: {
      totalTokens: validation.totalTokens,
      compressed: wasCompressed,
      messagesIncluded: messages.length
    }
  };
}

/**
 * Foreman Chat API Endpoint
 * Handles chat interactions with the Foreman orchestration engine
 */

import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { compileForemanChatContext, extractChatMetadata } from '@/lib/foreman/chat-profile';
import type { ChatRequest, ChatResponse, ForemanAction, ChatMessage } from '@/types/foreman';
import { executeChatActions } from '@/lib/foreman/chat-executor';
import { isAutonomousModeEnabled } from '@/lib/foreman/dispatch';
import { foremanLogger, LogLevel } from '@/lib/logging/foremanLogger';
import { 
  buildOptimizedContext, 
  estimateTokenCount, 
  MAX_TOTAL_TOKENS,
  createCondensedSystemPrompt 
} from '@/lib/foreman/context-manager';
import { 
  selectModel, 
  executeWithEscalation
} from '@/lib/foreman/model-escalation';
import type { ModelSelectionContext, ModelTier } from '@/types/model-escalation';

// Validate API key is present
if (!process.env.OPENAI_API_KEY) {
  console.warn('[Chat] OPENAI_API_KEY not set - chat functionality will not work');
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
});

/**
 * POST /api/foreman/chat
 * Chat with Foreman about architecture, builds, QA, compliance
 */
export async function POST(request: NextRequest) {
  try {
    // Check if OpenAI API key is configured
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'OpenAI API key not configured. Please set OPENAI_API_KEY environment variable.' 
        },
        { status: 500 }
      );
    }

    const body: ChatRequest = await request.json();
    const { message, organisationId, conversationId, contextFlags, conversationHistory } = body;

    // Validate required fields
    if (!message || message.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: 'Message is required' },
        { status: 400 }
      );
    }

    // Get organisation ID from request or environment
    const orgId = organisationId || process.env.MATURION_ORG_ID || 'default_org';
    
    // Generate conversation ID if not provided
    const convId = conversationId || `conv_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;

    console.log('[Chat] Processing message:', {
      organisationId: orgId,
      conversationId: convId,
      messageLength: message.length,
      contextFlags: contextFlags || [],
      historyLength: conversationHistory?.length || 0
    });

    // Build user message with context flags
    let userMessage = message;
    if (contextFlags && contextFlags.length > 0) {
      userMessage = `Context flags: ${contextFlags.join(', ')}\n\n${message}`;
    }

    // Build optimized context to prevent token overflow (now supports large prompts)
    const context = await buildOptimizedContext(
      conversationHistory || [],
      userMessage,
      orgId,
      { 
        useCondensedPrompt: true,
        enableLargePrompts: true, // Enable large prompt support
      }
    );

    console.log('[Chat] Context optimization:', {
      totalTokens: context.metadata.totalTokens,
      maxAllowed: MAX_TOTAL_TOKENS,
      messagesIncluded: context.metadata.messagesIncluded,
      compressed: context.metadata.compressed,
      promptCompressed: context.metadata.promptCompressed,
      promptCompressionRatio: context.metadata.promptCompressionRatio,
    });

    // Determine task complexity for model selection
    const taskComplexity = analyzeMessageComplexity(userMessage, conversationHistory || []);
    
    // Get current quota usage
    const { getQuotaUsage } = await import('@/lib/foreman/model-escalation');
    const quotaUsage = getQuotaUsage();
    
    const modelContext: ModelSelectionContext = {
      taskType: taskComplexity.taskType,
      complexity: taskComplexity.complexity,
      filesAffected: 0, // Chat doesn't directly affect files
      isArchitectureTask: taskComplexity.isArchitecture,
      isGovernanceTask: taskComplexity.isGovernance,
      isMilestoneNearing: false,
      existingEscalationsToday: quotaUsage.daily,
      quotaRemaining: Math.max(0, 50 - quotaUsage.daily) // Default daily limit is 50
    };

    // Select appropriate model using escalation logic
    const modelSelection = selectModel(modelContext);
    
    // Check if we need to escalate based on context size
    const contextEscalation = shouldEscalateForContext(
      context.metadata.totalTokens,
      modelSelection.selectedModel
    );

    // Use escalated model if context requires it
    const finalModel = contextEscalation || modelSelection.selectedModel;
    const wasEscalatedForContext = contextEscalation !== null;
    
    console.log('[Chat] Model selection:', {
      selectedModel: finalModel,
      escalated: modelSelection.escalated || wasEscalatedForContext,
      escalationReason: wasEscalatedForContext 
        ? 'large_context' 
        : modelSelection.escalationReason,
      taskComplexity: taskComplexity.complexity,
      contextTokens: context.metadata.totalTokens,
    });

    // Calculate dynamic max_tokens based on context and selected model
    const dynamicMaxTokens = calculateDynamicMaxTokens(
      context.metadata.totalTokens,
      finalModel
    );

    console.log('[Chat] Token budget:', {
      contextTokens: context.metadata.totalTokens,
      maxTokens: dynamicMaxTokens,
      totalBudget: context.metadata.totalTokens + dynamicMaxTokens
    });

    // Validate context size
    if (context.metadata.totalTokens > MAX_TOTAL_TOKENS) {
      console.warn('[Chat] Context still too large after optimization, using minimal context');
      // Fall back to minimal context with escalated model if needed
      const minimalSystemPrompt = createCondensedSystemPrompt(orgId);
      const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
        { role: 'system', content: minimalSystemPrompt },
        { role: 'user', content: userMessage }
      ];

      try {
        const completion = await openai.chat.completions.create({
          model: finalModel,
          messages: messages,
          temperature: 0.7,
          max_tokens: dynamicMaxTokens,
        });

        const rawResponse = completion.choices[0]?.message?.content || '';
        return buildSuccessResponse(rawResponse, convId, orgId, finalModel);
      } catch (error) {
        return handleChatError(error, 'minimal_context');
      }
    }

    // Build message array with conversation history if available
    const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
      { role: 'system', content: context.systemPrompt }
    ];

    // Add conversation history as part of the system context to preserve token efficiency
    // while maintaining conversation continuity
    if (context.conversationHistory && context.conversationHistory.trim().length > 0) {
      messages.push({ 
        role: 'system', 
        content: `Previous conversation summary:\n${context.conversationHistory}` 
      });
    }

    // Add current user message
    messages.push({ role: 'user', content: context.userMessage });

    // Call OpenAI with optimized context and selected model
    const completion = await openai.chat.completions.create({
      model: finalModel,
      messages: messages,
      temperature: 0.7,
      max_tokens: dynamicMaxTokens,
    });

    const rawResponse = completion.choices[0]?.message?.content || '';

    // Log model usage for diagnostics
    console.log('[Chat] Model usage:', {
      model: finalModel,
      escalated: modelSelection.escalated || wasEscalatedForContext,
      tokensUsed: completion.usage?.total_tokens || 'unknown',
      promptTokens: completion.usage?.prompt_tokens || 'unknown',
      completionTokens: completion.usage?.completion_tokens || 'unknown'
    });

    // Try to parse as structured JSON response
    let chatResponse: ChatResponse;
    try {
      const parsed = JSON.parse(rawResponse);
      chatResponse = {
        replyText: parsed.replyText || rawResponse,
        proposedActions: parsed.proposedActions || [],
        telemetry: parsed.telemetry || {
          subSystemsInvolved: ['chat', 'orchestrator']
        },
        metadata: extractChatMetadata(rawResponse),
        autonomyIntent: parsed.autonomyIntent || 'proposal_only'
      };
    } catch {
      // Not JSON, treat as plain text response
      chatResponse = {
        replyText: rawResponse,
        proposedActions: [],
        telemetry: {
          subSystemsInvolved: ['chat', 'orchestrator']
        },
        metadata: extractChatMetadata(rawResponse),
        autonomyIntent: 'proposal_only'
      };
    }

    // Add compression notice if prompt was compressed
    if (context.metadata.promptCompressed && context.metadata.promptCompressionRatio) {
      const compressionPercent = ((1 - context.metadata.promptCompressionRatio) * 100).toFixed(0);
      const notice = `\n\n💡 **Long prompt compressed** - Your prompt was compressed by ${compressionPercent}% while preserving critical details.\n\n`;
      chatResponse.replyText = notice + chatResponse.replyText;
    }

    // Check if we should execute actions
    const autonomousMode = isAutonomousModeEnabled()
    const shouldExecute = autonomousMode && 
                         chatResponse.autonomyIntent === 'execute' && 
                         chatResponse.proposedActions && 
                         chatResponse.proposedActions.length > 0

    if (shouldExecute) {
      // Execute actions via chat executor
      foremanLogger.log(LogLevel.INFO, 'ChatExecution', 'Executing chat actions', {
        organisationId: orgId,
        conversationId: convId,
        actionsCount: chatResponse.proposedActions!.length,
      })

      try {
        const executionResult = await executeChatActions(
          chatResponse.proposedActions!,
          orgId,
          convId
        )

        // Add execution status to response
        if (executionResult.statusUpdates.length > 0) {
          const lastUpdate = executionResult.statusUpdates[executionResult.statusUpdates.length - 1]
          chatResponse.executionStatus = {
            status: lastUpdate.status,
            message: lastUpdate.message,
            builderUsed: lastUpdate.metadata?.builder,
            filesChanged: lastUpdate.metadata?.filesChanged,
            prLink: executionResult.prUrl,
            qaSummary: lastUpdate.metadata?.qaSummary,
            complianceSummary: lastUpdate.metadata?.complianceSummary,
            error: executionResult.error,
          }
        }

        // Update reply text with execution results
        if (executionResult.success) {
          chatResponse.replyText += `\n\n✅ **Execution Complete**\n\n`
          if (executionResult.prUrl) {
            chatResponse.replyText += `PR created: ${executionResult.prUrl}\n`
          }
          if (executionResult.sequenceId) {
            chatResponse.replyText += `Sequence ID: ${executionResult.sequenceId}\n`
          }
          if (executionResult.taskIds && executionResult.taskIds.length > 0) {
            chatResponse.replyText += `Tasks executed: ${executionResult.taskIds.length}\n`
          }
        } else {
          chatResponse.replyText += `\n\n⚠️ **Execution Issue**\n\n${executionResult.error || 'Unknown error'}\n`
        }
      } catch (error) {
        foremanLogger.logError({
          timestamp: new Date(),
          errorType: 'ChatExecutionError',
          message: error instanceof Error ? error.message : 'Unknown error',
          stack: error instanceof Error ? error.stack : undefined,
          context: { organisationId: orgId, conversationId: convId },
        })

        chatResponse.executionStatus = {
          status: 'error',
          message: error instanceof Error ? error.message : 'Execution failed',
          error: error instanceof Error ? error.message : 'Unknown error',
        }
      }
    } else if (chatResponse.proposedActions && chatResponse.proposedActions.length > 0) {
      // Actions proposed but not executed
      if (!autonomousMode) {
        chatResponse.replyText += `\n\n⏸️ **Waiting for Admin Approval**\n\nAutonomy mode is disabled. These actions require manual approval.`
      } else {
        chatResponse.replyText += `\n\n💡 **Proposed Actions**\n\nThese actions are proposed but not executed. Confirm to proceed.`
      }
    }

    // Log the interaction (redact any potential secrets)
    const redactedMessage = redactSecrets(message);
    const redactedResponse = redactSecrets(chatResponse.replyText);
    
    console.log('[Chat] Interaction logged:', {
      timestamp: new Date().toISOString(),
      organisationId: orgId,
      conversationId: convId,
      userMessage: redactedMessage,
      foremanResponse: redactedResponse,
      proposedActions: chatResponse.proposedActions?.length || 0,
      metadata: chatResponse.metadata
    });

    return NextResponse.json({
      success: true,
      conversationId: convId,
      response: chatResponse,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('[Chat] Error processing chat message:', error);
    
    // Check if it's a context length error
    if (error instanceof Error && 
        (error.message.includes('maximum context length') || 
         error.message.includes('too many tokens') ||
         error.message.includes('400'))) {
      return NextResponse.json(
        {
          success: false,
          error: 'Context window exceeded. Try a shorter message or start a new conversation.',
          errorType: 'context_overflow',
          timestamp: new Date().toISOString()
        },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}

/**
 * Build success response from raw AI output
 */
function buildSuccessResponse(rawResponse: string, convId: string, orgId: string, model?: ModelTier) {
  let chatResponse: ChatResponse;
  try {
    const parsed = JSON.parse(rawResponse);
    chatResponse = {
      replyText: parsed.replyText || rawResponse,
      proposedActions: parsed.proposedActions || [],
      telemetry: parsed.telemetry || {
        subSystemsInvolved: ['chat', 'orchestrator']
      },
      metadata: extractChatMetadata(rawResponse),
      autonomyIntent: parsed.autonomyIntent || 'proposal_only'
    };
  } catch {
    // Not JSON, treat as plain text response
    chatResponse = {
      replyText: rawResponse,
      proposedActions: [],
      telemetry: {
        subSystemsInvolved: ['chat', 'orchestrator']
      },
      metadata: extractChatMetadata(rawResponse),
      autonomyIntent: 'proposal_only'
    };
  }

  return NextResponse.json({
    success: true,
    conversationId: convId,
    response: chatResponse,
    modelUsed: model || 'gpt-4',
    timestamp: new Date().toISOString()
  });
}

/**
 * Handle chat errors with appropriate fallback messages
 */
function handleChatError(error: unknown, context: string) {
  console.error(`[Chat] Error in ${context}:`, error);
  
  if (error instanceof Error && 
      (error.message.includes('maximum context length') || 
       error.message.includes('too many tokens') ||
       error.message.includes('400'))) {
    return NextResponse.json(
      {
        success: false,
        error: 'Your message history is too long. Please start a new conversation.',
        errorType: 'context_overflow',
        suggestion: 'Try refreshing the page to start a fresh conversation with Foreman.',
        timestamp: new Date().toISOString()
      },
      { status: 400 }
    );
  }

  return NextResponse.json(
    {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
      timestamp: new Date().toISOString()
    },
    { status: 500 }
  );
}

/**
 * Redact potential secrets from log output
 * Basic pattern matching for common secret formats
 */
function redactSecrets(text: string): string {
  let redacted = text;
  
  // Redact common secret patterns
  // API keys, tokens, passwords in quotes
  redacted = redacted.replace(
    /(?:password|secret|key|token|api[_-]?key|private[_-]?key|auth|credential)[\s]*[:=][\s]*['"][^'"]{8,}['"]/gi,
    (match) => {
      const [prefix] = match.split(/[:=]/);
      return `${prefix}="[REDACTED]"`;
    }
  );
  
  // JWT tokens
  redacted = redacted.replace(
    /eyJ[A-Za-z0-9-_]+\.eyJ[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+/g,
    '[REDACTED_JWT]'
  );
  
  // Long alphanumeric strings that might be API keys
  redacted = redacted.replace(
    /(?:password|secret|key|token)[\s]*[:=][\s]*[A-Za-z0-9]{32,}/gi,
    (match) => {
      const [prefix] = match.split(/[:=]/);
      return `${prefix}=[REDACTED]`;
    }
  );
  
  return redacted;
}

/**
 * GET /api/foreman/chat
 * Get chat history or conversation details (future enhancement)
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const conversationId = searchParams.get('conversationId');
  
  // For now, return a simple response
  // In production, this would retrieve chat history from a database
  return NextResponse.json({
    success: true,
    message: 'Chat history endpoint - to be implemented',
    conversationId: conversationId || null,
    note: 'This endpoint will retrieve conversation history in future versions'
  });
}

/**
 * Analyze message complexity to inform model selection
 */
function analyzeMessageComplexity(message: string, history: ChatMessage[]): {
  taskType: string;
  complexity: 'low' | 'medium' | 'high';
  isArchitecture: boolean;
  isGovernance: boolean;
} {
  const lowerMessage = message.toLowerCase();
  
  // Check for architecture keywords
  const isArchitecture = /architecture|design pattern|refactor|migrate|restructure/i.test(message);
  
  // Check for governance keywords
  const isGovernance = /governance|policy|compliance|security|audit|regulation/i.test(message);
  
  // Check for multi-step or complex tasks
  const isMultiStep = /\band\b.*\band\b|\bthen\b.*\bthen\b|first.*second.*third|step 1.*step 2/i.test(message);
  
  // Check for builder coordination
  const isOrchestration = /coordinate|integrate|combine|multiple builder|all builder/i.test(message);
  
  // Determine task type
  let taskType = 'general';
  if (lowerMessage.includes('dashboard')) taskType = 'dashboard_query';
  else if (lowerMessage.includes('project')) taskType = 'project_management';
  else if (lowerMessage.includes('build')) taskType = 'build_orchestration';
  else if (isArchitecture) taskType = 'architecture';
  else if (isGovernance) taskType = 'governance';
  else if (isOrchestration) taskType = 'orchestration';
  
  // Determine complexity
  let complexity: 'low' | 'medium' | 'high' = 'low';
  
  if (isArchitecture || isGovernance || isOrchestration) {
    complexity = 'high';
  } else if (isMultiStep || message.length > 500 || history.length > 10) {
    complexity = 'medium';
  }
  
  return {
    taskType,
    complexity,
    isArchitecture,
    isGovernance
  };
}

/**
 * Calculate dynamic max_tokens based on context size and selected model
 * Ensures total tokens (context + completion) stay within model limits
 */
function calculateDynamicMaxTokens(contextTokens: number, model: ModelTier): number {
  // Model-specific context limits
  const MODEL_LIMITS: Record<ModelTier, number> = {
    'gpt-4': 8192,
    'gpt-4-turbo': 128000,
    'gpt-5.1': 128000, // Placeholder - adjust when actual limits are known
    'local-builder': 8192 // Conservative default for local models
  };
  
  // Get limit for selected model
  const modelLimit = MODEL_LIMITS[model] || MODEL_LIMITS['gpt-4'];
  
  // Reserve buffer for safety
  const safetyBuffer = 500;
  
  // Calculate available tokens for completion
  const availableTokens = modelLimit - contextTokens - safetyBuffer;
  
  // Ensure minimum and maximum bounds
  // Higher models can use more tokens for completion
  const minTokens = 500;
  const maxTokens = model === 'gpt-4' ? 2000 : 4000;
  
  return Math.max(minTokens, Math.min(maxTokens, availableTokens));
}

/**
 * Determine if model escalation is needed based on context size
 */
function shouldEscalateForContext(contextTokens: number, currentModel: ModelTier): ModelTier | null {
  // Escalation thresholds
  const GPT4_THRESHOLD = 7000; // Escalate to gpt-4-turbo if > 7k tokens
  const GPT4_TURBO_THRESHOLD = 100000; // Escalate to gpt-5.1 if > 100k tokens

  if (contextTokens > GPT4_TURBO_THRESHOLD && currentModel !== 'gpt-5.1') {
    return 'gpt-5.1';
  }

  if (contextTokens > GPT4_THRESHOLD && currentModel === 'gpt-4') {
    return 'gpt-4-turbo';
  }

  return null;
}

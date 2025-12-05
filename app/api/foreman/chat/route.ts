/**
 * Foreman Chat API Endpoint
 * Handles chat interactions with the Foreman orchestration engine
 */

import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { compileForemanChatContext, extractChatMetadata } from '@/lib/foreman/chat-profile';
import type { ChatRequest, ChatResponse, ForemanAction } from '@/types/foreman';
import { executeChatActions } from '@/lib/foreman/chat-executor';
import { isAutonomousModeEnabled } from '@/lib/foreman/dispatch';
import { foremanLogger, LogLevel } from '@/lib/logging/foremanLogger';

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
    const { message, organisationId, conversationId, contextFlags } = body;

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
      contextFlags: contextFlags || []
    });

    // Compile Foreman chat context with behavior files
    const systemPrompt = await compileForemanChatContext(orgId);

    // Build user message with context
    let userMessage = message;
    if (contextFlags && contextFlags.length > 0) {
      userMessage = `Context flags: ${contextFlags.join(', ')}\n\n${message}`;
    }

    // Call OpenAI with chat-specific instructions
    const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userMessage }
    ];

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: messages,
      temperature: 0.7,
      max_tokens: 2000,
    });

    const rawResponse = completion.choices[0]?.message?.content || '';

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

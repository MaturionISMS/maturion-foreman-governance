/**
 * Context Manager Tests
 * Validates token counting, compression, and context optimization
 */

import { describe, it } from 'node:test';
import assert from 'node:assert';
import {
  estimateTokenCount,
  truncateToTokenLimit,
  compressMessage,
  compressConversationHistory,
  createCondensedSystemPrompt,
  validateContextSize,
  buildOptimizedContext,
  MAX_TOTAL_TOKENS,
  MAX_SYSTEM_PROMPT_TOKENS,
  MAX_CONVERSATION_TOKENS
} from '@/lib/foreman/context-manager';
import type { ChatMessage } from '@/types/foreman';

describe('Context Manager', () => {
  describe('estimateTokenCount', () => {
    it('should estimate token count from text', () => {
      const text = 'Hello world';
      const tokens = estimateTokenCount(text);
      assert.ok(tokens > 0, 'Token count should be positive');
      assert.ok(tokens < text.length, 'Token count should be less than character count');
    });

    it('should return 0 for empty string', () => {
      const tokens = estimateTokenCount('');
      assert.strictEqual(tokens, 0);
    });
  });

  describe('truncateToTokenLimit', () => {
    it('should truncate text that exceeds token limit', () => {
      const longText = 'a'.repeat(1000);
      const truncated = truncateToTokenLimit(longText, 100);
      const tokens = estimateTokenCount(truncated);
      assert.ok(tokens <= 100, 'Truncated text should fit within token limit');
    });

    it('should not truncate text within limit', () => {
      const shortText = 'Hello world';
      const truncated = truncateToTokenLimit(shortText, 100);
      assert.strictEqual(truncated, shortText);
    });
  });

  describe('compressMessage', () => {
    it('should compress user message', () => {
      const message: ChatMessage = {
        id: '1',
        role: 'user',
        content: 'Test message',
        timestamp: new Date(),
        organisationId: 'test',
        conversationId: 'test'
      };
      const compressed = compressMessage(message);
      assert.ok(compressed.includes('User:'), 'Should include user prefix');
      assert.ok(compressed.includes('Test message'), 'Should include message content');
    });

    it('should compress assistant message', () => {
      const message: ChatMessage = {
        id: '1',
        role: 'assistant',
        content: 'Response message',
        timestamp: new Date(),
        organisationId: 'test',
        conversationId: 'test'
      };
      const compressed = compressMessage(message);
      assert.ok(compressed.includes('Foreman:'), 'Should include Foreman prefix');
      assert.ok(compressed.includes('Response message'), 'Should include message content');
    });
  });

  describe('compressConversationHistory', () => {
    it('should compress conversation history', () => {
      const messages: ChatMessage[] = [
        {
          id: '1',
          role: 'user',
          content: 'First message',
          timestamp: new Date(),
          organisationId: 'test',
          conversationId: 'test'
        },
        {
          id: '2',
          role: 'assistant',
          content: 'First response',
          timestamp: new Date(),
          organisationId: 'test',
          conversationId: 'test'
        }
      ];
      const compressed = compressConversationHistory(messages, 1000);
      assert.ok(compressed.includes('First message'), 'Should include messages');
      assert.ok(compressed.includes('First response'), 'Should include responses');
    });

    it('should truncate when exceeding token limit', () => {
      const messages: ChatMessage[] = Array.from({ length: 100 }, (_, i) => ({
        id: `${i}`,
        role: i % 2 === 0 ? 'user' as const : 'assistant' as const,
        content: 'a'.repeat(100),
        timestamp: new Date(),
        organisationId: 'test',
        conversationId: 'test'
      }));
      const compressed = compressConversationHistory(messages, 500);
      const tokens = estimateTokenCount(compressed);
      assert.ok(tokens <= 500, 'Compressed history should fit within token limit');
    });

    it('should return empty string for empty messages', () => {
      const compressed = compressConversationHistory([]);
      assert.strictEqual(compressed, '');
    });
  });

  describe('createCondensedSystemPrompt', () => {
    it('should create condensed system prompt', () => {
      const prompt = createCondensedSystemPrompt('test-org');
      assert.ok(prompt.length > 0, 'Prompt should not be empty');
      assert.ok(prompt.includes('Foreman'), 'Should mention Foreman');
      assert.ok(prompt.includes('test-org'), 'Should include organization ID');
      assert.ok(prompt.includes('Autonomy Class A1'), 'Should mention autonomy class');
    });

    it('should be significantly smaller than full prompt', () => {
      const prompt = createCondensedSystemPrompt('test-org');
      const tokens = estimateTokenCount(prompt);
      assert.ok(tokens < MAX_SYSTEM_PROMPT_TOKENS, 'Should fit within system prompt token limit');
    });
  });

  describe('validateContextSize', () => {
    it('should validate context within limits', () => {
      const systemPrompt = 'a'.repeat(100);
      const conversationHistory = 'b'.repeat(100);
      const userMessage = 'c'.repeat(100);
      
      const validation = validateContextSize(systemPrompt, conversationHistory, userMessage);
      assert.strictEqual(validation.valid, true);
      assert.ok(validation.totalTokens > 0);
      assert.ok(validation.breakdown.system > 0);
      assert.ok(validation.breakdown.conversation > 0);
      assert.ok(validation.breakdown.user > 0);
    });

    it('should detect context exceeding limits', () => {
      const largeText = 'a'.repeat(40000); // Very large text
      const validation = validateContextSize(largeText, '', '');
      assert.strictEqual(validation.valid, false);
      assert.ok(validation.totalTokens > MAX_TOTAL_TOKENS);
    });
  });

  describe('buildOptimizedContext', () => {
    it('should build optimized context', async () => {
      const messages: ChatMessage[] = [
        {
          id: '1',
          role: 'user',
          content: 'Test message',
          timestamp: new Date(),
          organisationId: 'test',
          conversationId: 'test'
        }
      ];
      const currentMessage = 'New message';
      const organisationId = 'test-org';

      const context = await buildOptimizedContext(messages, currentMessage, organisationId);
      
      assert.ok(context.systemPrompt.length > 0, 'Should have system prompt');
      assert.ok(context.userMessage.length > 0, 'Should have user message');
      assert.ok(context.metadata.totalTokens > 0, 'Should calculate total tokens');
      assert.ok(context.metadata.totalTokens <= MAX_TOTAL_TOKENS, 'Should stay within limits');
    });

    it('should compress when needed', async () => {
      const manyMessages: ChatMessage[] = Array.from({ length: 100 }, (_, i) => ({
        id: `${i}`,
        role: i % 2 === 0 ? 'user' as const : 'assistant' as const,
        content: 'a'.repeat(500), // Larger messages to ensure compression
        timestamp: new Date(),
        organisationId: 'test',
        conversationId: 'test'
      }));
      const currentMessage = 'New message';
      const organisationId = 'test-org';

      const context = await buildOptimizedContext(manyMessages, currentMessage, organisationId);
      
      assert.ok(context.metadata.totalTokens <= MAX_TOTAL_TOKENS, 'Should compress to fit within limits');
      // With 100 large messages, compression should definitely occur
      assert.ok(context.conversationHistory.includes('earlier messages omitted') || 
                context.metadata.messagesIncluded < manyMessages.length, 
                'Should show evidence of compression');
    });

    it('should handle empty conversation history', async () => {
      const context = await buildOptimizedContext([], 'Test message', 'test-org');
      
      assert.ok(context.systemPrompt.length > 0, 'Should have system prompt');
      assert.ok(context.userMessage === 'Test message', 'Should preserve user message');
      assert.strictEqual(context.metadata.messagesIncluded, 0, 'Should show 0 messages included');
    });
  });
});

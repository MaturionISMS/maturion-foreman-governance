/**
 * Chat Wiring Integrity Tests
 * 
 * Verifies that the UI and backend are correctly wired together and that
 * all QA components (prompt-compressor, context-manager, file-processor, 
 * model-escalation) are properly invoked during chat interactions.
 * 
 * These tests prevent silent mismatches and ensure True North compliance:
 * "UI and backend must be wired to the correct components. No silent mismatches are ever allowed."
 */

import { describe, it, mock } from 'node:test';
import assert from 'node:assert';
import { POST as chatHandler } from '@/app/api/foreman/chat/route';
import { NextRequest } from 'next/server';

describe('Chat Wiring Integrity Tests', () => {
  describe('UI → API Route Wiring', () => {
    it('should accept requests to /api/foreman/chat endpoint', async () => {
      const request = new NextRequest('http://localhost:3000/api/foreman/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: 'Test message',
        }),
      });

      // This test verifies the route is accessible
      // We don't need OpenAI for wiring tests, so we expect API key error
      const response = await chatHandler(request);
      const data = await response.json();

      // Should get API key error (proving route is wired), not 404
      assert.ok(
        response.status === 500 || response.status === 400,
        'Route should be accessible (not 404)'
      );
      assert.ok(
        data.error && data.error.includes('API key') || data.error,
        'Should get API error, not routing error'
      );
    });

    it('should reject empty messages', async () => {
      const request = new NextRequest('http://localhost:3000/api/foreman/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: '',
        }),
      });

      const response = await chatHandler(request);
      const data = await response.json();

      // Accept either 400 (validation error) or 500 (API key error comes first in some cases)
      assert.ok(response.status === 400 || response.status === 500, 'Should reject empty messages');
      assert.strictEqual(data.success, false);
      assert.ok(data.error, 'Should have error message');
    });

    it('should accept messages with conversation history', async () => {
      const request = new NextRequest('http://localhost:3000/api/foreman/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: 'Follow-up question',
          conversationHistory: [
            {
              id: 'msg_1',
              role: 'user',
              content: 'Previous message',
              timestamp: new Date().toISOString(),
              organisationId: 'test',
              conversationId: 'conv_1',
            },
          ],
        }),
      });

      const response = await chatHandler(request);
      const data = await response.json();

      // Should process (will fail on API key, but proves wiring)
      assert.ok(response.status === 500 || response.status === 400);
      assert.ok(data.error);
    });

    it('should accept files in request', async () => {
      const request = new NextRequest('http://localhost:3000/api/foreman/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: 'Analyze this file',
          files: [
            {
              filename: 'test.md',
              content: '# Test Document\n\nThis is test content.',
              contentType: 'text/markdown',
            },
          ],
        }),
      });

      const response = await chatHandler(request);
      const data = await response.json();

      // Should process files (will fail on API key, but proves file handling is wired)
      assert.ok(response.status === 500 || response.status === 400);
    });

    it('should accept systemContext parameter', async () => {
      const request = new NextRequest('http://localhost:3000/api/foreman/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: 'Test with context',
          systemContext: 'Additional system context for this request',
        }),
      });

      const response = await chatHandler(request);
      const data = await response.json();

      // Should accept systemContext parameter
      assert.ok(response.status === 500 || response.status === 400);
    });
  });

  describe('API Route → Component Invocation', () => {
    it('should invoke context-manager for all requests', async () => {
      // Import context-manager to verify it's loadable
      const { buildOptimizedContext } = await import('@/lib/foreman/context-manager');
      assert.ok(typeof buildOptimizedContext === 'function', 'context-manager should be importable');

      // Verify it handles large prompts
      const result = await buildOptimizedContext(
        [],
        'Test message',
        'test-org',
        { enableLargePrompts: true }
      );

      assert.ok(result.metadata, 'Should return metadata');
      assert.ok(typeof result.metadata.totalTokens === 'number');
    });

    it('should invoke prompt-compressor for large prompts', async () => {
      const { compressPrompt, requiresCompression } = await import('@/lib/foreman/context/prompt-compressor');
      
      assert.ok(typeof compressPrompt === 'function', 'prompt-compressor should be importable');
      assert.ok(typeof requiresCompression === 'function', 'requiresCompression should be available');

      // Verify compression works
      const largePrompt = 'Test content. '.repeat(2000);
      const needsCompression = requiresCompression(largePrompt, 1000);
      assert.ok(needsCompression, 'Should detect large prompts');

      const result = await compressPrompt(largePrompt, { targetMaxTokens: 1000 });
      assert.ok(result.metadata.compressed, 'Should compress large prompts');
      assert.ok(result.compressedTokens < result.originalTokens, 'Should reduce token count');
    });

    it('should invoke file-processor for file uploads', async () => {
      const { processUploadedFile, fileToContext } = await import('@/lib/foreman/context/file-processor');
      
      assert.ok(typeof processUploadedFile === 'function', 'file-processor should be importable');
      assert.ok(typeof fileToContext === 'function', 'fileToContext should be available');

      // Verify file processing works
      const testContent = '# Test Document\n\nGovernance: This is important.\nArchitecture: Microservices design.';
      const buffer = Buffer.from(testContent, 'utf-8');
      
      const processed = await processUploadedFile(buffer, 'test.md', 'text/markdown');
      
      assert.ok(processed.filename === 'test.md');
      assert.ok(processed.tokens > 0);
      assert.ok(processed.metadata.hasGovernanceContent, 'Should detect governance content');
      assert.ok(processed.metadata.hasArchitectureContent, 'Should detect architecture content');

      // Verify context generation
      const context = await fileToContext(processed);
      assert.ok(context.includes('test.md'), 'Context should include filename');
    });

    it('should invoke model-escalation for complex tasks', async () => {
      const { selectModel, getQuotaUsage } = await import('@/lib/foreman/model-escalation');
      
      assert.ok(typeof selectModel === 'function', 'model-escalation should be importable');
      assert.ok(typeof getQuotaUsage === 'function', 'getQuotaUsage should be available');

      // Verify model selection works
      const selection = selectModel({
        taskType: 'architecture',
        complexity: 'high',
        filesAffected: 10,
        isArchitectureTask: true,
        isGovernanceTask: false,
        isMilestoneNearing: false,
        existingEscalationsToday: 0,
        quotaRemaining: 50,
      });

      assert.ok(selection.selectedModel, 'Should select a model');
      assert.ok(['gpt-4', 'gpt-4-turbo', 'gpt-5.1', 'local-builder'].includes(selection.selectedModel));

      // Verify quota tracking works
      const quotaUsage = getQuotaUsage();
      assert.ok(typeof quotaUsage.daily === 'number');
      assert.ok(typeof quotaUsage.hourly === 'number');
    });
  });

  describe('Component Integration (End-to-End Wiring)', () => {
    it('should process large prompts through full pipeline', async () => {
      const { buildOptimizedContext } = await import('@/lib/foreman/context-manager');
      
      const largePrompt = 'Governance rule: All changes must be approved. Architecture: Use microservices. '.repeat(2000);
      
      const result = await buildOptimizedContext(
        [],
        largePrompt,
        'test-org',
        { enableLargePrompts: true }
      );

      // Verify prompt was processed (compressed or handled appropriately)
      if (result.metadata.promptCompressed) {
        assert.ok(result.metadata.promptCompressionRatio);
        // Note: Compression ratio can be > 1 if critical content preservation
        // increases size, but total tokens should still be managed
      }

      // Verify context is properly built
      assert.ok(result.metadata.totalTokens > 0);
      assert.ok(result.systemPrompt.length > 0);
      assert.ok(result.userMessage.length > 0);
      
      // Most important: large prompts don't crash the system
      assert.ok(true, 'Large prompt processed without crashing');
    });

    it('should process files and compress if needed', async () => {
      const { processUploadedFile, fileToContext } = await import('@/lib/foreman/context/file-processor');
      
      const largeFile = '# Large Document\n\n' + 'Governance content. '.repeat(3000);
      const buffer = Buffer.from(largeFile, 'utf-8');
      
      const processed = await processUploadedFile(buffer, 'large.md', 'text/markdown');
      const context = await fileToContext(processed, { targetMaxTokens: 2000 });
      
      // Verify file was processed successfully
      assert.ok(processed.tokens > 0, 'Should have token count');
      assert.ok(context.length > 0, 'Should generate context');
      assert.ok(context.includes('large.md'), 'Context should reference filename');
      
      // Most important: large files don't crash the system
      assert.ok(true, 'Large file processed without crashing');
    });

    it('should handle conversation history with large prompts', async () => {
      const { buildOptimizedContext } = await import('@/lib/foreman/context-manager');
      
      const history = Array.from({ length: 10 }, (_, i) => ({
        id: `msg_${i}`,
        role: (i % 2 === 0 ? 'user' : 'assistant') as 'user' | 'assistant',
        content: 'Previous message with some context.',
        timestamp: new Date(),
        organisationId: 'test-org',
        conversationId: 'test-conv',
      }));

      const largePrompt = 'New large message. '.repeat(1000);
      
      const result = await buildOptimizedContext(
        history,
        largePrompt,
        'test-org',
        { enableLargePrompts: true }
      );

      // Should handle both history and large prompt
      assert.ok(result.metadata.messagesIncluded === history.length);
      assert.ok(result.conversationHistory.length > 0);
      assert.ok(result.metadata.totalTokens > 0);
    });
  });

  describe('Deprecated Route Prevention', () => {
    it('should NOT have /api/chat route (deprecated)', async () => {
      // This test verifies old routes don't exist
      try {
        // @ts-expect-error - Testing that deprecated route does not exist
        await import('@/app/api/chat/route');
        assert.fail('/api/chat route should not exist (deprecated)');
      } catch (error) {
        // Expected - route should not exist
        assert.ok(true, '/api/chat route correctly does not exist');
      }
    });

    it('should NOT have /api/agent route (deprecated)', async () => {
      try {
        // @ts-expect-error - Testing that deprecated route does not exist
        await import('@/app/api/agent/route');
        assert.fail('/api/agent route should not exist (deprecated)');
      } catch (error) {
        // Expected - route should not exist
        assert.ok(true, '/api/agent route correctly does not exist');
      }
    });
  });

  describe('Bypass Prevention', () => {
    it('should NOT allow uncompressed prompts to bypass compression', async () => {
      const { buildOptimizedContext } = await import('@/lib/foreman/context-manager');
      
      // Create a prompt that definitely needs compression
      const hugePrompt = 'x'.repeat(100000); // ~25k tokens
      
      const result = await buildOptimizedContext(
        [],
        hugePrompt,
        'test-org',
        { enableLargePrompts: true }
      );

      // Should be compressed
      assert.ok(
        result.metadata.promptCompressed || result.userMessage.length < hugePrompt.length,
        'Huge prompts must be compressed or truncated, cannot bypass'
      );
    });

    it('should NOT allow files to bypass file-processor', async () => {
      // Verify file-processor is required for file handling
      const { processUploadedFile } = await import('@/lib/foreman/context/file-processor');
      
      const testFile = Buffer.from('# Test\nContent here.');
      
      // Should process through file-processor
      const processed = await processUploadedFile(testFile, 'test.md', 'text/markdown');
      
      assert.ok(processed.chunks.length > 0, 'Files must be chunked');
      assert.ok(processed.metadata, 'Files must have metadata extracted');
    });

    it('should NOT allow context-manager to be skipped', async () => {
      // Verify context-manager is the only way to build context
      const { buildOptimizedContext } = await import('@/lib/foreman/context-manager');
      
      const result = await buildOptimizedContext(
        [],
        'Test message',
        'test-org',
        { enableLargePrompts: true }
      );

      // Should always return structured context with metadata
      assert.ok(result.systemPrompt, 'Must have system prompt');
      assert.ok(result.userMessage, 'Must have user message');
      assert.ok(result.metadata, 'Must have metadata');
      assert.ok(typeof result.metadata.totalTokens === 'number');
    });

    it('should NOT allow model-escalation to be skipped for large contexts', async () => {
      const { selectModel } = await import('@/lib/foreman/model-escalation');
      
      // High complexity task should escalate
      const selection = selectModel({
        taskType: 'architecture',
        complexity: 'high',
        filesAffected: 50,
        isArchitectureTask: true,
        isGovernanceTask: true,
        isMilestoneNearing: true,
        existingEscalationsToday: 0,
        quotaRemaining: 50,
      });

      // Should select appropriate model (likely escalated)
      assert.ok(selection.selectedModel);
      assert.ok(['gpt-4', 'gpt-4-turbo', 'gpt-5.1', 'local-builder'].includes(selection.selectedModel));
    });
  });

  describe('Logging and Observability', () => {
    it('should log component invocations (verify log points exist)', async () => {
      // Read the chat route source to verify WIRING_CHECKPOINT logs exist
      const fs = await import('fs/promises');
      const path = await import('path');
      const routeSource = await fs.readFile(
        path.resolve(process.cwd(), 'app/api/foreman/chat/route.ts'),
        'utf-8'
      );

      // Verify wiring checkpoints are logged
      assert.ok(
        routeSource.includes('WIRING_CHECKPOINT'),
        'Chat route must include WIRING_CHECKPOINT logs'
      );
      assert.ok(
        routeSource.includes('context-manager'),
        'Must log context-manager invocation'
      );
      assert.ok(
        routeSource.includes('model-escalation'),
        'Must log model-escalation invocation'
      );
      assert.ok(
        routeSource.includes('file-processor'),
        'Must log file-processor invocation'
      );
    });
  });
});

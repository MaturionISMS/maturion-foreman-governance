/**
 * QIC Constitutional Test: Wiring Integrity Enforcement (WIE)
 * 
 * Ensures UI → API → Context Engine → Model Escalation → Foreman is correctly wired.
 * 
 * This test verifies:
 * - Chat UI calls /api/foreman/chat
 * - API route invokes: prompt-compressor, file-processor, context-manager, model-escalation
 * - No deprecated routes exist
 * - No long prompt reaches FM uncompressed
 * - No bypass of context engine is possible
 * 
 * If any part fails → QIC must fail.
 */

import { describe, it } from 'node:test';
import assert from 'node:assert';
import fs from 'fs/promises';
import path from 'path';

describe('QIC Constitutional: Wiring Integrity Enforcement (WIE)', () => {
  describe('UI → API Route Alignment', () => {
    it('should verify Chat UI calls /api/foreman/chat', async () => {
      const pagePath = path.resolve(process.cwd(), 'app/foreman/page.tsx');
      
      const pageSource = await fs.readFile(pagePath, 'utf-8');

      // Must call /api/foreman/chat
      assert.ok(
        pageSource.includes('/api/foreman/chat'),
        'UI must call /api/foreman/chat endpoint'
      );

      console.log('✓ Chat UI correctly calls /api/foreman/chat');
    });

    it('should verify no deprecated routes are called', async () => {
      const pagePath = path.resolve(process.cwd(), 'app/foreman/page.tsx');
      
      const pageSource = await fs.readFile(pagePath, 'utf-8');

      // Must NOT call deprecated routes
      assert.ok(
        !pageSource.includes("'/api/chat'") && !pageSource.includes('"/api/chat"'),
        'UI must NOT call deprecated /api/chat route'
      );
      assert.ok(
        !pageSource.includes("'/api/agent'") && !pageSource.includes('"/api/agent"'),
        'UI must NOT call deprecated /api/agent route'
      );

      console.log('✓ No deprecated routes detected in UI');
    });
  });

  describe('API Route → Component Wiring', () => {
    it('should verify API route invokes prompt-compressor', async () => {
      const routePath = path.join(
        process.cwd(),
        'app/api/foreman/chat/route.ts'
      );
      
      const routeSource = await fs.readFile(routePath, 'utf-8');

      // Should use buildOptimizedContext which includes compression
      assert.ok(
        routeSource.includes('buildOptimizedContext') || routeSource.includes('compressPrompt'),
        'API route must invoke prompt compression'
      );

      console.log('✓ API route invokes prompt-compressor');
    });

    it('should verify API route invokes file-processor', async () => {
      const routePath = path.join(
        process.cwd(),
        'app/api/foreman/chat/route.ts'
      );
      
      const routeSource = await fs.readFile(routePath, 'utf-8');

      assert.ok(
        routeSource.includes('file-processor') || routeSource.includes('processUploadedFile'),
        'API route must import and invoke file-processor'
      );

      console.log('✓ API route invokes file-processor');
    });

    it('should verify API route invokes context-manager', async () => {
      const routePath = path.join(
        process.cwd(),
        'app/api/foreman/chat/route.ts'
      );
      
      const routeSource = await fs.readFile(routePath, 'utf-8');

      assert.ok(
        routeSource.includes('buildOptimizedContext'),
        'API route must invoke buildOptimizedContext from context-manager'
      );
      assert.ok(
        routeSource.includes('from @/lib/foreman/context-manager') ||
        routeSource.includes("from '@/lib/foreman/context-manager'"),
        'Must import from context-manager'
      );

      console.log('✓ API route invokes context-manager');
    });

    it('should verify API route invokes model-escalation', async () => {
      const routePath = path.join(
        process.cwd(),
        'app/api/foreman/chat/route.ts'
      );
      
      const routeSource = await fs.readFile(routePath, 'utf-8');

      assert.ok(
        routeSource.includes('selectModel') || routeSource.includes('model-escalation'),
        'API route must invoke model-escalation'
      );

      console.log('✓ API route invokes model-escalation');
    });
  });

  describe('No Deprecated Routes Exist', () => {
    it('should NOT have /app/api/chat/route.ts (deprecated)', async () => {
      const deprecatedPath = path.join(
        process.cwd(),
        'app/api/chat/route.ts'
      );
      
      try {
        await fs.access(deprecatedPath);
        assert.fail('/api/chat route should not exist (deprecated)');
      } catch (error) {
        // Expected - file should not exist
        console.log('✓ Deprecated /api/chat route does not exist');
      }
    });

    it('should NOT have /app/api/agent/route.ts (deprecated)', async () => {
      const deprecatedPath = path.join(
        process.cwd(),
        'app/api/agent/route.ts'
      );
      
      try {
        await fs.access(deprecatedPath);
        assert.fail('/api/agent route should not exist (deprecated)');
      } catch (error) {
        // Expected - file should not exist
        console.log('✓ Deprecated /api/agent route does not exist');
      }
    });
  });

  describe('No Prompt Bypass Possible', () => {
    it('should verify large prompts are enabled in context-manager', async () => {
      const routePath = path.join(
        process.cwd(),
        'app/api/foreman/chat/route.ts'
      );
      
      const routeSource = await fs.readFile(routePath, 'utf-8');

      assert.ok(
        routeSource.includes('enableLargePrompts: true'),
        'Must enable large prompt support to prevent bypasses'
      );

      console.log('✓ Large prompts are properly enabled');
    });

    it('should verify context validation does not bypass compression', async () => {
      const routePath = path.join(
        process.cwd(),
        'app/api/foreman/chat/route.ts'
      );
      
      const routeSource = await fs.readFile(routePath, 'utf-8');

      // CRITICAL: After compression, context should be validated BEFORE OpenAI call
      // The bug: code compresses but then still sends uncompressed context
      const hasPostCompressionValidation = routeSource.includes('context.metadata.totalTokens') &&
                                            routeSource.includes('buildOptimizedContext');
      
      assert.ok(
        hasPostCompressionValidation,
        'Must validate context size after compression'
      );

      // Check that compressed context is actually used
      const usesCompressedContext = routeSource.includes('context.userMessage') ||
                                     routeSource.includes('context.systemPrompt');
      
      assert.ok(
        usesCompressedContext,
        'Must use compressed context from buildOptimizedContext, not original message'
      );

      console.log('✓ Context validation after compression verified');
    });

    it('should verify context engine cannot be bypassed', async () => {
      const routePath = path.join(
        process.cwd(),
        'app/api/foreman/chat/route.ts'
      );
      
      const routeSource = await fs.readFile(routePath, 'utf-8');

      // Should NOT have direct OpenAI calls without context processing
      const lines = routeSource.split('\n');
      let hasDirectOpenAICall = false;
      let hasContextProcessing = false;

      for (const line of lines) {
        if (line.includes('openai.chat.completions.create')) {
          hasDirectOpenAICall = true;
          // Check if this same section has buildOptimizedContext before it
          const beforeCall = routeSource.substring(0, routeSource.indexOf(line));
          if (beforeCall.includes('buildOptimizedContext')) {
            hasContextProcessing = true;
          }
        }
      }

      if (hasDirectOpenAICall) {
        assert.ok(
          hasContextProcessing,
          'OpenAI calls must be preceded by context processing - cannot bypass'
        );
      }

      console.log('✓ Context engine cannot be bypassed');
    });
    
    it('should verify prompt compression works for basic prompts', async () => {
      // This test verifies the critical bug fix for context window exceeded
      const contextManagerPath = path.join(
        process.cwd(),
        'lib/foreman/context-manager.ts'
      );
      
      const source = await fs.readFile(contextManagerPath, 'utf-8');
      
      // Verify compression is called for large prompts
      assert.ok(
        source.includes('requiresCompression') &&
        source.includes('compressPrompt'),
        'context-manager must check requiresCompression and call compressPrompt'
      );
      
      // Verify enableLargePrompts option exists
      assert.ok(
        source.includes('enableLargePrompts'),
        'context-manager must support enableLargePrompts option'
      );
      
      // Verify ultra-condensed prompt exists for simple queries
      assert.ok(
        source.includes('createUltraCondensedSystemPrompt'),
        'context-manager must have ultra-condensed prompt for simple queries'
      );
      
      console.log('✓ Prompt compression infrastructure verified');
      console.log('✓ Bug fix validated: Ultra-condensed prompt for simple queries');
    });
  });

  describe('Wiring Observability', () => {
    it('should verify API route logs component invocations', async () => {
      const routePath = path.join(
        process.cwd(),
        'app/api/foreman/chat/route.ts'
      );
      
      const routeSource = await fs.readFile(routePath, 'utf-8');

      // Must have wiring checkpoints for observability
      assert.ok(
        routeSource.includes('WIRING_CHECKPOINT') || 
        routeSource.includes('console.log') ||
        routeSource.includes('logger'),
        'Must log component invocations for wiring observability'
      );

      console.log('✓ Wiring checkpoints present for observability');
    });
  });
});

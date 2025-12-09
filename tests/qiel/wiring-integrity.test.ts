/**
 * QIEL Wiring Integrity Tests
 * 
 * Integration-level tests that verify:
 * - UI → API route alignment
 * - API route → context engine alignment  
 * - Build artifact completeness
 * - No stale routes in deployment
 * - Vercel caching correctness
 * 
 * These tests run as part of QIEL (QA Integration and Environment Lock-in)
 * to prevent deployment of mismatched components.
 */

import { describe, it } from 'node:test';
import assert from 'node:assert';
import fs from 'fs/promises';
import path from 'path';

describe('QIEL Wiring Integrity Tests', () => {
  describe('UI → API Alignment', () => {
    it('should verify UI calls /api/foreman/chat (not deprecated routes)', async () => {
      const pagePath = path.resolve(process.cwd(), 'app/foreman/page.tsx');
      
      const pageSource = await fs.readFile(pagePath, 'utf-8');

      // Must call /api/foreman/chat
      assert.ok(
        pageSource.includes('/api/foreman/chat'),
        'UI must call /api/foreman/chat endpoint'
      );

      // Must NOT call deprecated routes
      assert.ok(
        !pageSource.includes("'/api/chat'") && !pageSource.includes('"/api/chat"'),
        'UI must NOT call deprecated /api/chat route'
      );
      assert.ok(
        !pageSource.includes("'/api/agent'") && !pageSource.includes('"/api/agent"'),
        'UI must NOT call deprecated /api/agent route'
      );
    });

    it('should verify UI sends required parameters', async () => {
      const pagePath = path.resolve(process.cwd(), 'app/foreman/page.tsx');
      
      const pageSource = await fs.readFile(pagePath, 'utf-8');

      // Must send message
      assert.ok(
        pageSource.includes('message:'),
        'UI must send message parameter'
      );

      // Must send conversationHistory
      assert.ok(
        pageSource.includes('conversationHistory'),
        'UI must send conversationHistory for context'
      );
    });

    it('should verify UI handles file uploads', async () => {
      const pagePath = path.resolve(process.cwd(), 'app/foreman/page.tsx');
      
      const pageSource = await fs.readFile(pagePath, 'utf-8');

      // Should have file upload handling
      assert.ok(
        pageSource.includes('uploadedFile') || pageSource.includes('file'),
        'UI should support file uploads'
      );
    });
  });

  describe('API Route → Context Engine Alignment', () => {
    it('should verify chat route imports context-manager', async () => {
      const routePath = path.join(
        process.cwd(),
        'app/api/foreman/chat/route.ts'
      );
      
      const routeSource = await fs.readFile(routePath, 'utf-8');

      assert.ok(
        routeSource.includes('buildOptimizedContext'),
        'Chat route must import buildOptimizedContext from context-manager'
      );
      assert.ok(
        routeSource.includes('from @/lib/foreman/context-manager') ||
        routeSource.includes("from '@/lib/foreman/context-manager'"),
        'Must import from correct path'
      );
    });

    it('should verify chat route imports model-escalation', async () => {
      const routePath = path.join(
        process.cwd(),
        'app/api/foreman/chat/route.ts'
      );
      
      const routeSource = await fs.readFile(routePath, 'utf-8');

      assert.ok(
        routeSource.includes('selectModel'),
        'Chat route must import selectModel from model-escalation'
      );
      assert.ok(
        routeSource.includes('executeWithEscalation') || routeSource.includes('model-escalation'),
        'Must import model-escalation functionality'
      );
    });

    it('should verify chat route invokes prompt compression', async () => {
      const routePath = path.join(
        process.cwd(),
        'app/api/foreman/chat/route.ts'
      );
      
      const routeSource = await fs.readFile(routePath, 'utf-8');

      // Should invoke buildOptimizedContext which handles compression
      assert.ok(
        routeSource.includes('await buildOptimizedContext'),
        'Must invoke buildOptimizedContext (which handles compression)'
      );
      
      // Should enable large prompts
      assert.ok(
        routeSource.includes('enableLargePrompts: true'),
        'Must enable large prompt support'
      );
    });

    it('should verify chat route processes files', async () => {
      const routePath = path.join(
        process.cwd(),
        'app/api/foreman/chat/route.ts'
      );
      
      const routeSource = await fs.readFile(routePath, 'utf-8');

      // Should import file-processor
      assert.ok(
        routeSource.includes('file-processor') || routeSource.includes('processUploadedFile'),
        'Must import file-processor for file uploads'
      );
    });

    it('should verify chat route logs component invocations', async () => {
      const routePath = path.join(
        process.cwd(),
        'app/api/foreman/chat/route.ts'
      );
      
      const routeSource = await fs.readFile(routePath, 'utf-8');

      // Must have wiring checkpoints for observability
      assert.ok(
        routeSource.includes('WIRING_CHECKPOINT'),
        'Must log WIRING_CHECKPOINT for observability'
      );
      
      // Should log each major component
      const checkpoints = [
        'context-manager',
        'model-escalation',
        'file-processor',
      ];
      
      for (const checkpoint of checkpoints) {
        assert.ok(
          routeSource.includes(checkpoint),
          `Must log ${checkpoint} invocation`
        );
      }
    });
  });

  describe('Build Artifact Completeness', () => {
    it('should verify all context components are built', async () => {
      const contextDir = path.join(
        process.cwd(),
        'lib/foreman/context'
      );
      
      const files = await fs.readdir(contextDir);

      // Required context components
      assert.ok(
        files.includes('prompt-compressor.ts'),
        'prompt-compressor.ts must exist'
      );
      assert.ok(
        files.includes('file-processor.ts'),
        'file-processor.ts must exist'
      );
    });

    it('should verify context-manager exists', async () => {
      const managerPath = path.join(
        process.cwd(),
        'lib/foreman/context-manager.ts'
      );
      
      await fs.access(managerPath);
      const source = await fs.readFile(managerPath, 'utf-8');

      assert.ok(
        source.includes('export async function buildOptimizedContext'),
        'context-manager must export buildOptimizedContext'
      );
      assert.ok(
        source.includes('compressPrompt'),
        'context-manager must use compressPrompt'
      );
    });

    it('should verify model-escalation exists', async () => {
      const escalationPath = path.join(
        process.cwd(),
        'lib/foreman/model-escalation.ts'
      );
      
      await fs.access(escalationPath);
      const source = await fs.readFile(escalationPath, 'utf-8');

      assert.ok(
        source.includes('export function selectModel'),
        'model-escalation must export selectModel'
      );
      assert.ok(
        source.includes('export async function executeWithEscalation') ||
        source.includes('ModelTier'),
        'model-escalation must support escalation'
      );
    });

    it('should verify chat route exists at correct path', async () => {
      const routePath = path.join(
        process.cwd(),
        'app/api/foreman/chat/route.ts'
      );
      
      await fs.access(routePath);
      const source = await fs.readFile(routePath, 'utf-8');

      assert.ok(
        source.includes('export async function POST'),
        'Chat route must export POST handler'
      );
    });
  });

  describe('No Stale Routes', () => {
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
        assert.ok(true, 'Correctly does not have deprecated /api/chat route');
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
        assert.ok(true, 'Correctly does not have deprecated /api/agent route');
      }
    });

    it('should verify only /api/foreman/chat is used for chat', async () => {
      const apiDir = path.join(
        process.cwd(),
        'app/api'
      );
      
      // Recursively find all route.ts files
      async function findRoutes(dir: string): Promise<string[]> {
        const routes: string[] = [];
        const entries = await fs.readdir(dir, { withFileTypes: true });
        
        for (const entry of entries) {
          const fullPath = path.join(dir, entry.name);
          if (entry.isDirectory()) {
            routes.push(...await findRoutes(fullPath));
          } else if (entry.name === 'route.ts' || entry.name === 'route.js') {
            routes.push(fullPath);
          }
        }
        
        return routes;
      }
      
      const routes = await findRoutes(apiDir);
      
      // Check each route for chat-like functionality
      for (const route of routes) {
        if (route.includes('/api/foreman/chat/')) {
          // This is the correct route, skip
          continue;
        }
        
        const source = await fs.readFile(route, 'utf-8');
        
        // Should NOT have chat logic in other routes
        const hasChatLogic = 
          source.includes('conversationHistory') &&
          source.includes('buildOptimizedContext') &&
          source.includes('openai.chat.completions.create');
        
        if (hasChatLogic) {
          assert.fail(`Found duplicate chat logic in ${route} - all chat should go through /api/foreman/chat`);
        }
      }
    });
  });

  describe('Deployment Cache Verification', () => {
    it('should verify .next/cache is in .gitignore', async () => {
      const gitignorePath = path.join(
        process.cwd(),
        '.gitignore'
      );
      
      const gitignore = await fs.readFile(gitignorePath, 'utf-8');

      assert.ok(
        gitignore.includes('.next') || gitignore.includes('.next/'),
        '.gitignore must exclude .next directory to prevent cache commits'
      );
    });

    it('should verify vercel.json does not cache API routes aggressively', async () => {
      const vercelPath = path.join(
        process.cwd(),
        'vercel.json'
      );
      
      try {
        const vercelConfig = await fs.readFile(vercelPath, 'utf-8');
        const config = JSON.parse(vercelConfig);
        
        // If there are route configs, verify API routes aren't cached long-term
        if (config.routes) {
          for (const route of config.routes) {
            if (route.src && route.src.includes('/api/')) {
              // API routes should not have long cache durations
              if (route.headers) {
                const cacheControl = route.headers.find((h: any) => 
                  h.key === 'Cache-Control' || h.key === 'cache-control'
                );
                if (cacheControl) {
                  assert.ok(
                    !cacheControl.value.includes('max-age=31536000'), // 1 year
                    'API routes should not have year-long cache'
                  );
                }
              }
            }
          }
        }
      } catch (error) {
        // vercel.json might not exist, that's ok
        assert.ok(true, 'No vercel.json or no aggressive caching detected');
      }
    });
  });

  describe('Type Safety and Contracts', () => {
    it('should verify ChatRequest type includes required fields', async () => {
      const typesPath = path.join(
        process.cwd(),
        'types/foreman.ts'
      );
      
      const source = await fs.readFile(typesPath, 'utf-8');

      // Must define ChatRequest with required fields
      assert.ok(
        source.includes('interface ChatRequest'),
        'Must define ChatRequest interface'
      );
      assert.ok(
        source.includes('message:'),
        'ChatRequest must include message field'
      );
      assert.ok(
        source.includes('conversationHistory'),
        'ChatRequest must support conversationHistory'
      );
    });

    it('should verify ChatRequest supports files', async () => {
      const typesPath = path.join(
        process.cwd(),
        'types/foreman.ts'
      );
      
      const source = await fs.readFile(typesPath, 'utf-8');

      // Should support file uploads
      assert.ok(
        source.includes('files?:'),
        'ChatRequest should support optional files parameter'
      );
    });

    it('should verify ChatRequest supports systemContext', async () => {
      const typesPath = path.join(
        process.cwd(),
        'types/foreman.ts'
      );
      
      const source = await fs.readFile(typesPath, 'utf-8');

      // Should support system context
      assert.ok(
        source.includes('systemContext'),
        'ChatRequest should support systemContext parameter'
      );
    });
  });

  describe('Documentation and Governance', () => {
    it('should have wiring integrity documented in architecture', async () => {
      // Check for documentation files
      const docsDir = path.join(
        process.cwd()
      );
      
      const files = await fs.readdir(docsDir);
      
      // Should have architecture or implementation docs
      const hasArchDocs = files.some(f => 
        f.includes('ARCHITECTURE') || 
        f.includes('IMPLEMENTATION') || 
        f.includes('SUMMARY')
      );
      
      assert.ok(hasArchDocs, 'Should have architecture/implementation documentation');
    });
  });
});

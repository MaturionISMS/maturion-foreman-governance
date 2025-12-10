/**
 * QIEL MCP Configuration Tests
 * 
 * Verifies that MCP (Model Context Protocol) is properly configured
 * for Foreman autonomy to function correctly.
 * 
 * These tests ensure:
 * - MCP token is present in environment
 * - MCP checks are integrated into initialization
 * - Autonomy is blocked when MCP is not configured
 */

import { describe, it } from 'node:test';
import assert from 'node:assert';
import fs from 'fs/promises';
import path from 'path';

describe('QIEL MCP Configuration Tests', () => {
  describe('MCP Environment Configuration', () => {
    it('should have GITHUB_MCP_TOKEN in .env.example', async () => {
      const envExamplePath = path.resolve(process.cwd(), '.env.example');
      const envExample = await fs.readFile(envExamplePath, 'utf-8');

      assert.ok(
        envExample.includes('GITHUB_MCP_TOKEN'),
        '.env.example must document GITHUB_MCP_TOKEN variable'
      );
    });

    it('should check for GITHUB_MCP_TOKEN in debug/env endpoint', async () => {
      const debugEnvPath = path.resolve(process.cwd(), 'app/api/debug/env/route.ts');
      const debugEnvSource = await fs.readFile(debugEnvPath, 'utf-8');

      assert.ok(
        debugEnvSource.includes('GITHUB_MCP_TOKEN'),
        'Debug env endpoint must expose GITHUB_MCP_TOKEN status'
      );
    });
  });

  describe('MCP Initialization Checks', () => {
    it('should have checkMCPConfiguration in initialization.ts', async () => {
      const initPath = path.resolve(process.cwd(), 'lib/foreman/initialization.ts');
      const initSource = await fs.readFile(initPath, 'utf-8');

      assert.ok(
        initSource.includes('checkMCPConfiguration'),
        'initialization.ts must have checkMCPConfiguration function'
      );

      assert.ok(
        initSource.includes('GITHUB_MCP_TOKEN'),
        'MCP check must verify GITHUB_MCP_TOKEN'
      );
    });

    it('should include MCP check in checkInitializationStatus', async () => {
      const initPath = path.resolve(process.cwd(), 'lib/foreman/initialization.ts');
      const initSource = await fs.readFile(initPath, 'utf-8');

      // Verify checkMCPConfiguration is called
      assert.ok(
        initSource.includes('checkMCPConfiguration()'),
        'checkInitializationStatus must call checkMCPConfiguration()'
      );
    });
  });

  describe('MCP Diagnostic Endpoint', () => {
    it('should have /api/debug/mcp route', async () => {
      const mcpRoutePath = path.resolve(process.cwd(), 'app/api/debug/mcp/route.ts');
      
      try {
        await fs.access(mcpRoutePath);
      } catch (error) {
        assert.fail('/api/debug/mcp/route.ts must exist');
      }
    });

    it('should expose MCP initialization status', async () => {
      const mcpRoutePath = path.resolve(process.cwd(), 'app/api/debug/mcp/route.ts');
      const mcpRouteSource = await fs.readFile(mcpRoutePath, 'utf-8');

      assert.ok(
        mcpRouteSource.includes('mcpInitialized'),
        'MCP diagnostic must return mcpInitialized status'
      );

      assert.ok(
        mcpRouteSource.includes('GITHUB_MCP_TOKEN'),
        'MCP diagnostic must check GITHUB_MCP_TOKEN'
      );

      assert.ok(
        mcpRouteSource.includes('tokenPresent'),
        'MCP diagnostic must report token presence'
      );
    });
  });

  describe('Autonomy → MCP Integration', () => {
    it('should have isMCPConfigured function in dispatch.ts', async () => {
      const dispatchPath = path.resolve(process.cwd(), 'lib/foreman/dispatch.ts');
      const dispatchSource = await fs.readFile(dispatchPath, 'utf-8');

      assert.ok(
        dispatchSource.includes('isMCPConfigured'),
        'dispatch.ts must have isMCPConfigured function'
      );
    });

    it('should check MCP in isAutonomousModeEnabled', async () => {
      const dispatchPath = path.resolve(process.cwd(), 'lib/foreman/dispatch.ts');
      const dispatchSource = await fs.readFile(dispatchPath, 'utf-8');

      // Function must check MCP before returning autonomy status
      assert.ok(
        dispatchSource.includes('isMCPConfigured()'),
        'isAutonomousModeEnabled must call isMCPConfigured()'
      );

      // Should log warning when MCP not configured
      assert.ok(
        dispatchSource.includes('GITHUB_MCP_TOKEN not set') || 
        dispatchSource.includes('MCP') && dispatchSource.includes('disabled'),
        'Should warn when MCP not configured'
      );
    });

    it('should block autonomy when MCP is not configured', async () => {
      const dispatchPath = path.resolve(process.cwd(), 'lib/foreman/dispatch.ts');
      const dispatchSource = await fs.readFile(dispatchPath, 'utf-8');

      // Must return false when MCP not configured
      const hasEarlyReturn = dispatchSource.includes('if (!isMCPConfigured())') &&
                             dispatchSource.includes('return false');

      assert.ok(
        hasEarlyReturn,
        'isAutonomousModeEnabled must return false when MCP not configured'
      );
    });
  });

  describe('MCP Required Check', () => {
    it('should mark MCP as required in initialization checks', async () => {
      const initPath = path.resolve(process.cwd(), 'lib/foreman/initialization.ts');
      const initSource = await fs.readFile(initPath, 'utf-8');

      // Check that MCP check has required: true
      const mcpCheckPattern = /checkMCPConfiguration[\s\S]*?required:\s*true/;
      assert.ok(
        mcpCheckPattern.test(initSource),
        'MCP check must be marked as required: true'
      );
    });

    it('should fail initialization when MCP not configured', async () => {
      const initPath = path.resolve(process.cwd(), 'lib/foreman/initialization.ts');
      const initSource = await fs.readFile(initPath, 'utf-8');

      // MCP check should return error status when token missing
      assert.ok(
        initSource.includes("status: 'error'") && 
        initSource.includes('GITHUB_MCP_TOKEN'),
        'MCP check must return error status when GITHUB_MCP_TOKEN missing'
      );
    });
  });
});

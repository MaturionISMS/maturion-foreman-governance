/**
 * Test Group: Builder Engine Integrity
 * 
 * These tests validate:
 * - Runtime throws error if builder agent is missing
 * - Runtime throws if builder file fails CS1 hash check
 * - Runtime throws if MCP cannot initialize builder session
 * 
 * RED QA: These tests must FAIL initially to validate
 * that the runtime properly enforces builder integrity.
 */

import { describe, it } from 'node:test'
import assert from 'node:assert'
import * as fs from 'fs'
import * as path from 'path'
import {
  loadBuilderAgent,
  validateBuilderIntegrity,
  executeBuildToGreenRuntime,
  BuilderTask_Extended,
  BuilderRuntimeConfig
} from '@/lib/foreman/execution/builder-runtime'

describe('Builder Engine Integrity', () => {
  
  it('should throw error if builder agent file is missing', async () => {
    // Test that runtime fails when builder agent does not exist
    await assert.rejects(
      async () => {
        await loadBuilderAgent('nonexistent-builder' as any)
      },
      {
        message: /Builder agent file not found/
      },
      'Runtime should throw error for missing builder agent'
    )
  })
  
  it('should throw error if builder file fails CS1 hash check', () => {
    // Create a temporary corrupted builder file
    const tempDir = path.join(process.cwd(), 'tests', 'runtime', 'fixtures')
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true })
    }
    
    const corruptedPath = path.join(tempDir, 'corrupted-builder.agent.md')
    
    // Write a builder file missing required sections
    fs.writeFileSync(corruptedPath, '---\nname: Corrupted\n---\n\n# Invalid Builder\n\nThis is corrupted.')
    
    const result = validateBuilderIntegrity(corruptedPath)
    
    // Clean up
    fs.unlinkSync(corruptedPath)
    
    assert.strictEqual(result.valid, false, 'Should fail integrity check for corrupted file')
    assert.ok(result.error, 'Should provide error message')
    assert.ok(
      result.error?.includes('Missing required section'),
      'Should detect missing required sections'
    )
  })
  
  it('should throw error if builder file contains actual TODO comments', () => {
    const tempDir = path.join(process.cwd(), 'tests', 'runtime', 'fixtures')
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true })
    }
    
    const todoPath = path.join(tempDir, 'todo-builder.agent.md')
    
    // Write a builder with actual TODO comment
    fs.writeFileSync(
      todoPath,
      `---
name: Builder-With-Todo
---

# Identity & Role
Content here

# Build Philosophy
Content here

# You MUST Always
Content here

# You MUST NEVER
Content here

// TODO: Fix this issue
function incomplete() {}
`
    )
    
    const result = validateBuilderIntegrity(todoPath)
    
    // Clean up
    fs.unlinkSync(todoPath)
    
    assert.strictEqual(result.valid, false, 'Should fail integrity check for TODO comments')
    assert.ok(
      result.error?.includes('TODO'),
      'Should detect actual TODO comments'
    )
  })
  
  it('should validate maturion-builder agent successfully', async () => {
    // This should pass - validates the real builder agent
    const agent = await loadBuilderAgent('maturion-builder')
    
    assert.ok(agent, 'Agent should be loaded')
    assert.strictEqual(agent.loaded, true, 'Agent should be marked as loaded')
    assert.strictEqual(agent.validated, true, 'Agent should be validated')
    assert.ok(agent.hash, 'Agent should have integrity hash')
  })
  
  it('should throw error if MCP cannot initialize builder session', async () => {
    // Create a minimal valid task
    const mockTask: BuilderTask_Extended = {
      id: 'test-mcp-fail-1',
      builder: 'ui',
      module: 'test-module',
      taskDescription: 'MCP initialization test',
      status: 'approved',
      approved: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      architecture: {
        title: 'Test Architecture',
        content: 'Complete architecture',
        checklistValidated: true,
        validationTimestamp: new Date().toISOString(),
        completeness: 'complete'
      },
      qaSuite: {
        testCount: 1,
        failingCount: 1,
        status: 'red',
        tests: [{ name: 'test-1', status: 'failed', message: 'Not implemented' }],
        createdAt: new Date().toISOString(),
        executionLog: 'Test log'
      },
      acceptanceCriteria: [{ criterion: 'All tests pass', met: false }],
      buildInstruction: 'Build to Green'
    }
    
    const config: BuilderRuntimeConfig = {
      owner: 'test-owner',
      repo: 'test-repo',
      issueNumber: 1,
      branch: 'test-branch',
      builderAgent: 'maturion-builder',
      autoRollback: false,
      governanceMode: 'strict'
    }
    
    // Set environment variable to simulate MCP failure
    process.env.SIMULATE_MCP_FAILURE = 'true'
    
    try {
      // This should handle MCP failures gracefully but still report them
      const result = await executeBuildToGreenRuntime(mockTask, config)
      
      // The runtime should not throw but should report failure
      assert.strictEqual(result.success, false, 'Runtime should report failure')
      
    } finally {
      delete process.env.SIMULATE_MCP_FAILURE
    }
  })
})

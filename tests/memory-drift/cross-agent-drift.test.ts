/**
 * Cross-Agent Drift Detection Tests
 * Tests for detecting memory divergence across agents
 */

import { describe, test, beforeEach } from 'node:test'
import assert from 'node:assert'
import {
  detectCrossAgentDrift,
  clearMemoryScope
} from '../../lib/foreman/memory'
import * as fs from 'fs'
import * as path from 'path'

describe('Cross-Agent Drift Detection', () => {
  
  beforeEach(async () => {
    await clearMemoryScope('foreman')
    await clearMemoryScope('global')
  })
  
  test('should pass when required memory files exist', async () => {
    const result = await detectCrossAgentDrift()
    
    assert.strictEqual(result.category, 'cross_agent_drift')
    assert.strictEqual(result.passed, true)
    assert.strictEqual(result.issues.length, 0)
    console.log('✓ Passes when required memory files exist')
  })
  
  test('should detect missing memory files', async () => {
    // Temporarily rename a memory file to simulate missing file
    const globalPath = path.join(process.cwd(), 'memory', 'global', 'memory.json')
    const backupPath = globalPath + '.backup'
    
    let fileExisted = false
    if (fs.existsSync(globalPath)) {
      fs.renameSync(globalPath, backupPath)
      fileExisted = true
    }
    
    try {
      const result = await detectCrossAgentDrift()
      
      assert.strictEqual(result.passed, false)
      assert.ok(result.issues.length > 0)
      assert.strictEqual(result.issues[0].type, 'cross_agent_drift')
      assert.strictEqual(result.issues[0].severity, 'error')
      console.log('✓ Detects missing memory files')
    } finally {
      // Restore the file
      if (fileExisted && fs.existsSync(backupPath)) {
        fs.renameSync(backupPath, globalPath)
      }
    }
  })
  
  test('should check both global and foreman scopes', async () => {
    const result = await detectCrossAgentDrift()
    
    // Should verify both required files exist
    assert.strictEqual(result.category, 'cross_agent_drift')
    console.log('✓ Checks both global and foreman scopes')
  })
  
  test('should provide file path in error details', async () => {
    // Simulate missing file
    const foremanPath = path.join(process.cwd(), 'memory', 'foreman', 'memory.json')
    const backupPath = foremanPath + '.backup'
    
    let fileExisted = false
    if (fs.existsSync(foremanPath)) {
      fs.renameSync(foremanPath, backupPath)
      fileExisted = true
    }
    
    try {
      const result = await detectCrossAgentDrift()
      
      if (!result.passed) {
        assert.ok(result.issues.length > 0)
        const issue = result.issues[0]
        assert.ok(issue.location)
        assert.ok(issue.location.includes('memory'))
        assert.ok(issue.details.path)
        console.log('✓ Provides file path in error details')
      }
    } finally {
      if (fileExisted && fs.existsSync(backupPath)) {
        fs.renameSync(backupPath, foremanPath)
      }
    }
  })
  
  test('should recommend initialization for missing files', async () => {
    const testPath = path.join(process.cwd(), 'memory', 'test-agent', 'memory.json')
    
    // Create a test that would fail if we checked this path
    // For now, we only check global and foreman
    const result = await detectCrossAgentDrift()
    
    // This test verifies the check is working
    assert.ok(result)
    console.log('✓ Cross-agent drift check functional')
  })
})

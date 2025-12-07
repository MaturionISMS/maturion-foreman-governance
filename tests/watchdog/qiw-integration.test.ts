/**
 * QIW Integration Test
 * 
 * Verifies QIW integration with Enhanced QA Runner
 */

import { describe, it } from 'node:test'
import * as assert from 'node:assert'
import * as fs from 'fs'
import * as path from 'path'
import { runEnhancedQA } from '../../lib/foreman/qa/enhanced-qa-runner'

describe('QIW Integration with Enhanced QA', () => {
  const testLogsDir = '/tmp/qiw-integration-test'

  // Setup test logs directory
  function setupTestLogs() {
    if (!fs.existsSync(testLogsDir)) {
      fs.mkdirSync(testLogsDir, { recursive: true })
    }
  }

  // Cleanup test logs
  function cleanupTestLogs() {
    if (fs.existsSync(testLogsDir)) {
      const files = fs.readdirSync(testLogsDir)
      for (const file of files) {
        fs.unlinkSync(path.join(testLogsDir, file))
      }
      fs.rmdirSync(testLogsDir)
    }
  }

  it('should integrate QIW into Enhanced QA and pass with clean logs', () => {
    setupTestLogs()
    
    // Create clean log files
    fs.writeFileSync(path.join(testLogsDir, 'build.log'), 'Build successful\n', 'utf-8')
    fs.writeFileSync(path.join(testLogsDir, 'lint.log'), 'No issues found\n', 'utf-8')
    fs.writeFileSync(path.join(testLogsDir, 'test.log'), 'All tests passed\n', 'utf-8')
    
    const result = runEnhancedQA({
      logsDir: testLogsDir,
      skipVercelSimulation: true
    })
    
    // Verify QIW is included in checks
    assert.ok(result.checks.qiwPassed !== undefined)
    assert.strictEqual(result.checks.qiwPassed, true)
    
    // Verify QIW report is included
    assert.ok(result.qiwReport)
    assert.strictEqual(result.qiwReport.passed, true)
    assert.strictEqual(result.qiwReport.qaBlocked, false)
    
    // Verify overall QA passed
    assert.strictEqual(result.passed, true)
    
    cleanupTestLogs()
  })

  it('should block QA when QIW detects errors', () => {
    setupTestLogs()
    
    // Create logs with errors
    fs.writeFileSync(path.join(testLogsDir, 'build.log'), 'ERROR: Build failed\n', 'utf-8')
    fs.writeFileSync(path.join(testLogsDir, 'lint.log'), 'No issues found\n', 'utf-8')
    fs.writeFileSync(path.join(testLogsDir, 'test.log'), 'All tests passed\n', 'utf-8')
    
    const result = runEnhancedQA({
      logsDir: testLogsDir,
      skipVercelSimulation: true
    })
    
    // Verify QIW failed
    assert.strictEqual(result.checks.qiwPassed, false)
    assert.strictEqual(result.qiwReport.passed, false)
    assert.strictEqual(result.qiwReport.qaBlocked, true)
    
    // Verify overall QA failed
    assert.strictEqual(result.passed, false)
    
    // Verify blockers include QIW issues
    assert.ok(result.blockersFound.length > 0)
    assert.ok(result.blockersFound.some(b => b.includes('QIW')))
    
    cleanupTestLogs()
  })

  it('should include QIW report in markdown output', () => {
    setupTestLogs()
    
    // Create clean log files
    fs.writeFileSync(path.join(testLogsDir, 'build.log'), 'Build successful\n', 'utf-8')
    fs.writeFileSync(path.join(testLogsDir, 'lint.log'), 'No issues found\n', 'utf-8')
    fs.writeFileSync(path.join(testLogsDir, 'test.log'), 'All tests passed\n', 'utf-8')
    
    const result = runEnhancedQA({
      logsDir: testLogsDir,
      skipVercelSimulation: true
    })
    
    // Verify QIW report is in markdown
    assert.ok(result.reportMarkdown.includes('Quality Integrity Watchdog'))
    assert.ok(result.reportMarkdown.includes('QIW'))
    
    cleanupTestLogs()
  })
})

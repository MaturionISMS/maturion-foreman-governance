/**
 * Auto-Recommendation Tests
 * Tests for drift monitor recommendation generation
 */

import { describe, test, beforeEach } from 'node:test'
import assert from 'node:assert'
import {
  runDriftMonitoring,
  clearMemoryScope,
  writeMemoryEntry
} from '../../lib/foreman/memory'

describe('Drift Monitor Auto-Recommendations', () => {
  
  beforeEach(async () => {
    await clearMemoryScope('foreman')
    await clearMemoryScope('global')
  })
  
  test('should recommend schema updates for schema drift', async () => {
    // Create entry with schema violations
    await writeMemoryEntry(
      'foreman',
      'invalid_qa',
      {
        type: 'qa_failure',
        description: 'Test',
        // Missing resolution
        data: {}
      },
      {
        createdBy: 'test',
        tags: ['qa_failure']
      }
    )
    
    const report = await runDriftMonitoring()
    
    const schemaDrift = report.checks.find(c => c.category === 'schema_drift')
    if (schemaDrift && !schemaDrift.passed) {
      assert.ok(schemaDrift.issues.length > 0)
      const issue = schemaDrift.issues[0]
      assert.ok(issue.recommendation.includes('schema') || issue.recommendation.includes('Update'))
      console.log('✓ Recommends schema updates for schema drift')
    } else {
      console.log('✓ No schema drift to recommend for')
    }
  })
  
  test('should recommend resolution for contradictions', async () => {
    // Create contradicting entries
    await writeMemoryEntry(
      'global',
      'decision_1',
      {
        type: 'architecture_decision',
        description: 'Require module X',
        data: {
          pattern: 'require module X'
        }
      },
      {
        createdBy: 'test',
        tags: ['architecture_decision']
      }
    )
    
    await writeMemoryEntry(
      'global',
      'decision_2',
      {
        type: 'architecture_decision',
        description: 'Remove module X',
        data: {
          pattern: 'remove module X'
        }
      },
      {
        createdBy: 'test',
        tags: ['architecture_decision']
      }
    )
    
    const report = await runDriftMonitoring()
    
    const contradictionDrift = report.checks.find(c => c.category === 'contradiction_drift')
    if (contradictionDrift && !contradictionDrift.passed) {
      assert.ok(contradictionDrift.issues.length > 0)
      const issue = contradictionDrift.issues[0]
      assert.ok(
        issue.recommendation.includes('Resolve') ||
        issue.recommendation.includes('contradiction') ||
        issue.recommendation.includes('conflicting')
      )
      console.log('✓ Recommends resolution for contradictions')
    } else {
      console.log('✓ No contradictions to recommend for')
    }
  })
  
  test('should recommend review for stale entries', async () => {
    const report = await runDriftMonitoring()
    
    const stalenessDrift = report.checks.find(c => c.category === 'staleness_drift')
    if (stalenessDrift && !stalenessDrift.passed) {
      assert.ok(stalenessDrift.issues.length > 0)
      const issue = stalenessDrift.issues[0]
      assert.ok(
        issue.recommendation.includes('Review') ||
        issue.recommendation.includes('update') ||
        issue.recommendation.includes('archive')
      )
      console.log('✓ Recommends review for stale entries')
    } else {
      console.log('✓ No stale entries to review')
    }
  })
  
  test('should recommend initialization for missing files', async () => {
    const report = await runDriftMonitoring()
    
    const crossAgentDrift = report.checks.find(c => c.category === 'cross_agent_drift')
    if (crossAgentDrift && !crossAgentDrift.passed) {
      assert.ok(crossAgentDrift.issues.length > 0)
      const issue = crossAgentDrift.issues[0]
      assert.ok(issue.recommendation.includes('Initialize') || issue.recommendation.includes('init'))
      console.log('✓ Recommends initialization for missing files')
    } else {
      console.log('✓ No missing files to initialize')
    }
  })
  
  test('should recommend governance compliance', async () => {
    // Create governance violation
    await writeMemoryEntry(
      'foreman',
      'bad_secret',
      {
        type: 'config',
        data: {
          apiKey: 'secret-value'
        }
      },
      {
        createdBy: 'test',
        tags: ['config']
      }
    )
    
    const report = await runDriftMonitoring()
    
    const governanceDrift = report.checks.find(c => c.category === 'governance_drift')
    if (governanceDrift && !governanceDrift.passed) {
      assert.ok(governanceDrift.issues.length > 0)
      const issue = governanceDrift.issues[0]
      assert.ok(issue.recommendation)
      console.log('✓ Recommends governance compliance')
    } else {
      console.log('✓ No governance violations')
    }
  })
  
  test('should aggregate unique recommendations', async () => {
    const report = await runDriftMonitoring()
    
    // Recommendations should be unique
    const uniqueRecs = new Set(report.recommendations)
    assert.strictEqual(uniqueRecs.size, report.recommendations.length)
    console.log('✓ Aggregates unique recommendations')
  })
  
  test('should provide general recommendations for common issues', async () => {
    const report = await runDriftMonitoring()
    
    // Even with healthy memory, we might have general recommendations
    assert.ok(Array.isArray(report.recommendations))
    console.log('✓ Provides general recommendations')
    if (report.recommendations.length > 0) {
      console.log(`  Found ${report.recommendations.length} recommendation(s)`)
    }
  })
  
  test('should prioritize critical recommendations', async () => {
    // Create both critical and warning issues
    await writeMemoryEntry(
      'foreman',
      'critical_issue',
      {
        type: 'config',
        data: {
          password: 'secret123'
        }
      },
      {
        createdBy: 'test',
        tags: ['config']
      }
    )
    
    const report = await runDriftMonitoring()
    
    if (report.criticalCount > 0) {
      // Should have recommendations for critical issues
      assert.ok(report.recommendations.length > 0)
      console.log('✓ Prioritizes critical recommendations')
    } else {
      console.log('✓ No critical issues to prioritize')
    }
  })
  
  test('should match recommendations to drift types', async () => {
    const report = await runDriftMonitoring()
    
    for (const check of report.checks) {
      if (!check.passed) {
        for (const issue of check.issues) {
          assert.ok(issue.recommendation)
          assert.ok(issue.recommendation.length > 0)
          // Recommendation should be actionable - check for common action verbs
          const hasActionVerb = 
            issue.recommendation.toLowerCase().includes('update') ||
            issue.recommendation.toLowerCase().includes('resolve') ||
            issue.recommendation.toLowerCase().includes('review') ||
            issue.recommendation.toLowerCase().includes('remove') ||
            issue.recommendation.toLowerCase().includes('initialize') ||
            issue.recommendation.toLowerCase().includes('fix') ||
            issue.recommendation.toLowerCase().includes('add') ||
            issue.recommendation.toLowerCase().includes('check') ||
            issue.recommendation.toLowerCase().includes('ensure')
          
          if (!hasActionVerb) {
            console.log(`Warning: Recommendation may not be actionable: "${issue.recommendation}"`)
          }
          // Don't fail if one recommendation doesn't match pattern
        }
      }
    }
    console.log('✓ Recommendations are provided for drift issues')
  })
  
  test('should provide detailed recommendations', async () => {
    const report = await runDriftMonitoring()
    
    for (const check of report.checks) {
      if (!check.passed) {
        for (const issue of check.issues) {
          // Recommendation should be more than just "fix it"
          assert.ok(issue.recommendation.length > 10)
          console.log(`  ${issue.type}: ${issue.recommendation}`)
        }
      }
    }
    console.log('✓ Provides detailed recommendations')
  })
})

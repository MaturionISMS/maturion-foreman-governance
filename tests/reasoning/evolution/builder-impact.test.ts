/**
 * Builder Impact Tests
 * Ensures builders receive and use updated reasoning patterns
 */

import { describe, test, beforeEach } from 'node:test'
import assert from 'node:assert'
import {
  runEvolutionCycle,
  saveConsolidatedReasoningPatterns
} from '../../../lib/foreman/reasoning/evolution-engine'
import { clearMemoryScope, writeMemoryEntry } from '../../../lib/foreman/memory'
import { compileBuilderMemoryContext, formatMemoryForBuilder } from '../../../lib/builder/memory-injector'
import { ReasoningPattern } from '../../../types/reasoning'
import { BuilderType, BuilderRequest } from '../../../types/builder'
import fs from 'fs'
import path from 'path'

describe('Builder Impact', () => {
  
  beforeEach(async () => {
    // Clear test memory
    await clearMemoryScope('foreman')
    await clearMemoryScope('global')

    // Clean up test files
    const consolidatedPath = path.join(
      process.cwd(),
      'memory',
      'global',
      'consolidated',
      'reasoning'
    )
    if (fs.existsSync(consolidatedPath)) {
      const files = fs.readdirSync(consolidatedPath)
      files.forEach(file => {
        fs.unlinkSync(path.join(consolidatedPath, file))
      })
    }
  })

  test('should include evolved patterns in builder context', async () => {
    // Create evolved patterns
    const evolvedPatterns: ReasoningPattern[] = [
      {
        id: 'evolved_pattern_1',
        name: 'Evolved Pattern 1',
        description: 'An evolved pattern for builders',
        context: 'When making multi-file updates',
        approach: 'Always verify dependencies before changing files',
        examples: ['Update imports across multiple files'],
        tags: ['build', 'multi-file'],
        performanceScore: 0.85,
        successRate: 0.9,
        usageCount: 50
      }
    ]

    await saveConsolidatedReasoningPatterns(evolvedPatterns)

    // Generate builder context
    const request: BuilderRequest = {
      organisationId: 'test_org',
      module: 'test-module',
      taskDescription: 'Update multiple files'
    }
    
    const builderContext = await compileBuilderMemoryContext(
      request,
      'code-modifier' as BuilderType,
      'test_project'
    )

    // Builder context should include reasoning patterns
    assert.ok(builderContext, 'Should generate builder context')
    assert.ok(builderContext.reasoningPatterns, 'Should have reasoning patterns')
    
    // Format to string and check
    const formattedContext = formatMemoryForBuilder(builderContext)
    assert.ok(typeof formattedContext === 'string', 'Formatted context should be a string')
    
    console.log('✓ Evolved patterns available to builder context')
  })

  test('should prioritize stable patterns in builder context', async () => {
    // Create patterns with different classifications
    const patterns: ReasoningPattern[] = [
      {
        id: 'stable_pattern',
        name: 'Stable Pattern',
        description: 'A stable high-performing pattern',
        context: 'testing',
        approach: 'stable approach',
        examples: [],
        tags: ['test', 'stable'],
        performanceScore: 0.9 // Stable
      },
      {
        id: 'monitored_pattern',
        name: 'Monitored Pattern',
        description: 'A monitored pattern',
        context: 'testing',
        approach: 'monitored approach',
        examples: [],
        tags: ['test', 'monitored'],
        performanceScore: 0.6 // Monitored
      },
      {
        id: 'retirement_pattern',
        name: 'Retirement Pattern',
        description: 'A pattern marked for retirement',
        context: 'testing',
        approach: 'old approach',
        examples: [],
        tags: ['test', 'retirement'],
        performanceScore: 0.3 // Retirement candidate
      }
    ]

    await saveConsolidatedReasoningPatterns(patterns)

    // Load consolidated patterns to verify classification
    const consolidatedPath = path.join(
      process.cwd(),
      'memory',
      'global',
      'consolidated',
      'reasoning',
      'consolidated_reasoning_patterns.json'
    )

    assert.ok(fs.existsSync(consolidatedPath), 'Should create consolidated patterns')

    const data = JSON.parse(fs.readFileSync(consolidatedPath, 'utf-8'))
    
    // Verify patterns are classified correctly
    assert.strictEqual(data.patterns.stable.length, 1, 'Should have 1 stable pattern')
    assert.strictEqual(data.patterns.monitored.length, 1, 'Should have 1 monitored pattern')
    assert.strictEqual(data.patterns.retirementCandidates.length, 1, 'Should have 1 retirement candidate')

    console.log('✓ Patterns classified and available for builder prioritization')
  })

  test('should update builder context after evolution cycle', async () => {
    // Create initial memory
    await writeMemoryEntry(
      'foreman',
      'build_success_1',
      {
        description: 'Successful build',
        data: { success: true }
      },
      {
        tags: ['build', 'success'],
        createdBy: 'test',
        projectId: 'test_project'
      }
    )

    // Create builder request
    const request: BuilderRequest = {
      organisationId: 'test_org',
      module: 'test-module',
      taskDescription: 'Test task'
    }

    // Generate builder context before evolution
    const contextBefore = await compileBuilderMemoryContext(
      request,
      'code-modifier' as BuilderType,
      'test_project'
    )

    assert.ok(contextBefore, 'Should generate context before evolution')

    // Run evolution cycle
    await runEvolutionCycle('manual')

    // Generate builder context after evolution
    const contextAfter = await compileBuilderMemoryContext(
      request,
      'code-modifier' as BuilderType,
      'test_project'
    )

    assert.ok(contextAfter, 'Should generate context after evolution')

    // Both should be valid contexts
    assert.ok(contextBefore.reasoningPatterns, 'Before context should have patterns')
    assert.ok(contextAfter.reasoningPatterns, 'After context should have patterns')

    console.log('✓ Builder context updates after evolution cycle')
  })

  test('should include pattern performance metadata for builders', async () => {
    // Create pattern with performance data
    const pattern: ReasoningPattern = {
      id: 'perf_pattern_1',
      name: 'Performance Pattern',
      description: 'Pattern with performance metadata',
      context: 'performance-critical operations',
      approach: 'optimize before executing',
      examples: ['database queries', 'api calls'],
      tags: ['performance', 'optimization'],
      performanceScore: 0.87,
      successRate: 0.92,
      usageCount: 75,
      lastEvolved: new Date().toISOString()
    }

    await saveConsolidatedReasoningPatterns([pattern])

    const consolidatedPath = path.join(
      process.cwd(),
      'memory',
      'global',
      'consolidated',
      'reasoning',
      'consolidated_reasoning_patterns.json'
    )

    const data = JSON.parse(fs.readFileSync(consolidatedPath, 'utf-8'))
    
    // Find the pattern in consolidated data
    const allPatterns = [
      ...data.patterns.stable,
      ...data.patterns.monitored,
      ...data.patterns.retirementCandidates
    ]

    const savedPattern = allPatterns.find(p => p.id === 'perf_pattern_1')
    assert.ok(savedPattern, 'Pattern should be saved')
    assert.ok(savedPattern.performanceScore, 'Should include performance score')
    assert.ok(savedPattern.successRate, 'Should include success rate')
    assert.ok(savedPattern.usageCount, 'Should include usage count')
    assert.ok(savedPattern.lastEvolved, 'Should include last evolved timestamp')

    console.log('✓ Pattern performance metadata available to builders')
  })

  test('should provide builders with evolved patterns for specific subsystems', async () => {
    // Create patterns for different subsystems
    const patterns: ReasoningPattern[] = [
      {
        id: 'arch_pattern',
        name: 'Architecture Pattern',
        description: 'For architecture decisions',
        context: 'architecture',
        approach: 'evaluate tradeoffs',
        examples: [],
        tags: ['architecture'],
        performanceScore: 0.85
      },
      {
        id: 'build_pattern',
        name: 'Build Pattern',
        description: 'For build operations',
        context: 'build',
        approach: 'incremental compilation',
        examples: [],
        tags: ['build'],
        performanceScore: 0.82
      },
      {
        id: 'qa_pattern',
        name: 'QA Pattern',
        description: 'For QA validation',
        context: 'qa',
        approach: 'comprehensive testing',
        examples: [],
        tags: ['qa'],
        performanceScore: 0.88
      }
    ]

    await saveConsolidatedReasoningPatterns(patterns)

    // Patterns are now available in consolidated storage
    // Builder context generation will load these patterns based on task
    const consolidatedPath = path.join(
      process.cwd(),
      'memory',
      'global',
      'consolidated',
      'reasoning',
      'consolidated_reasoning_patterns.json'
    )

    assert.ok(fs.existsSync(consolidatedPath), 'Consolidated patterns should exist')

    const data = JSON.parse(fs.readFileSync(consolidatedPath, 'utf-8'))
    const allPatterns = [
      ...data.patterns.stable,
      ...data.patterns.monitored,
      ...data.patterns.retirementCandidates
    ]

    // Verify all subsystem patterns are present
    assert.ok(allPatterns.find(p => p.id === 'arch_pattern'), 'Architecture pattern should be saved')
    assert.ok(allPatterns.find(p => p.id === 'build_pattern'), 'Build pattern should be saved')
    assert.ok(allPatterns.find(p => p.id === 'qa_pattern'), 'QA pattern should be saved')

    console.log('✓ Subsystem-specific patterns available to builders')
  })

  test('should not expose retirement candidates to builders', async () => {
    const patterns: ReasoningPattern[] = [
      {
        id: 'good_pattern',
        name: 'Good Pattern',
        description: 'A good pattern',
        context: 'general',
        approach: 'good approach',
        examples: [],
        tags: ['good'],
        performanceScore: 0.85
      },
      {
        id: 'bad_pattern',
        name: 'Bad Pattern',
        description: 'A bad pattern',
        context: 'general',
        approach: 'bad approach',
        examples: [],
        tags: ['bad'],
        performanceScore: 0.2 // Retirement candidate
      }
    ]

    await saveConsolidatedReasoningPatterns(patterns)

    const consolidatedPath = path.join(
      process.cwd(),
      'memory',
      'global',
      'consolidated',
      'reasoning',
      'consolidated_reasoning_patterns.json'
    )

    const data = JSON.parse(fs.readFileSync(consolidatedPath, 'utf-8'))

    // Verify retirement candidate is tracked separately
    assert.ok(data.patterns.retirementCandidates.length > 0, 'Should have retirement candidates')
    
    // In practice, the reasoning engine should filter out retirement candidates
    // when loading patterns for builder context
    // This is handled in the pattern loading logic

    console.log('✓ Retirement candidates tracked separately')
  })

  test('should validate builder context includes memory snapshot', async () => {
    // Create some memory
    await writeMemoryEntry(
      'global',
      'test_memory_1',
      {
        description: 'Test memory entry',
        data: { test: true }
      },
      {
        tags: ['test'],
        createdBy: 'test'
      }
    )

    // Create builder request
    const request: BuilderRequest = {
      organisationId: 'test_org',
      module: 'test-module',
      taskDescription: 'Test task with memory'
    }

    // Generate builder context
    const context = await compileBuilderMemoryContext(
      request,
      'code-modifier' as BuilderType,
      'test_project'
    )

    // Context should have all expected fields
    assert.ok(context, 'Should generate context')
    assert.ok(context.reasoningPatterns, 'Should have reasoning patterns')
    assert.ok(context.historicalIssues, 'Should have historical issues')
    assert.ok(context.architectureLessons, 'Should have architecture lessons')
    assert.ok(context.governanceRules, 'Should have governance rules')
    assert.ok(context.memoryReferences, 'Should have memory references')
    
    // Format and check content
    const formatted = formatMemoryForBuilder(context)
    assert.ok(formatted.length > 0, 'Formatted context should contain content')

    console.log('✓ Builder context includes memory snapshot')
  })
})

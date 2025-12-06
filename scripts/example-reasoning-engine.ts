#!/usr/bin/env tsx
/**
 * Example: Memory-Aware Reasoning Engine (MARE)
 * Demonstrates basic usage of the reasoning engine
 */

import {
  reason,
  loadMemorySnapshot,
  executeReasoning,
  getBuiltInPatterns
} from '../lib/foreman/reasoning'
import {
  recordArchitectureDecision,
  recordQAFailure,
  recordDeployment
} from '../lib/foreman/memory'

async function main() {
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  console.log('Memory-Aware Reasoning Engine (MARE) - Example')
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')

  // Setup some example memory
  console.log('1. Setting up example memory...\n')
  
  await recordArchitectureDecision(
    'Adopted microservices architecture for scalability',
    {
      pattern: 'microservices',
      rationale: 'Need to scale independent services',
      benefits: ['scalability', 'independence', 'maintainability'],
      tradeoffs: ['complexity', 'distributed systems challenges'],
      applicability: ['large-scale systems', 'multiple teams']
    }
  )
  
  await recordQAFailure(
    'API endpoint validation failed in staging',
    {
      module: 'user-api',
      error: 'Type mismatch in user profile response',
      environment: 'staging'
    }
  )
  
  await recordDeployment(
    'production',
    {
      version: '1.2.0',
      success: true,
      duration: '15 minutes'
    }
  )

  console.log('✓ Memory setup complete\n')

  // Example 1: Basic reasoning
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  console.log('Example 1: Basic Reasoning - Build Planning')
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')

  const result1 = await reason({
    intent: 'build_planning',
    phase: 'build',
    subsystem: 'build',
    riskLevel: 'medium'
  })

  console.log('Reasoning Summary:')
  console.log(result1.reasoningSummary)
  console.log('\nDecisions:')
  result1.decisions.forEach((d, i) => {
    console.log(`  ${i + 1}. ${d.action}`)
    console.log(`     Confidence: ${d.confidence}`)
    console.log(`     Governance Aligned: ${d.governanceAlignment}`)
  })
  console.log(`\nConfidence Score: ${(result1.meta.confidenceScore * 100).toFixed(0)}%`)
  console.log(`Patterns Applied: ${result1.meta.patternsApplied.length}`)

  // Example 2: Architecture review with high risk
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  console.log('Example 2: Architecture Review - High Risk')
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')

  const result2 = await reason({
    intent: 'architecture_review',
    phase: 'architecture',
    subsystem: 'architecture',
    riskLevel: 'high'
  })

  console.log(`Risks Identified: ${result2.risks.length}`)
  result2.risks.forEach((risk, i) => {
    console.log(`  ${i + 1}. ${risk}`)
  })

  console.log(`\nRecommended Actions: ${result2.recommendedActions.length}`)
  result2.recommendedActions.forEach((action, i) => {
    console.log(`  ${i + 1}. ${action}`)
  })

  // Example 3: QA Analysis
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  console.log('Example 3: QA Analysis')
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')

  const result3 = await reason({
    intent: 'qa_analysis',
    phase: 'qa',
    subsystem: 'qa',
    riskLevel: 'high',
    tags: ['qa_failure']
  })

  console.log('QA Analysis Results:')
  console.log(`  Decisions: ${result3.decisions.length}`)
  console.log(`  Risks: ${result3.risks.length}`)
  console.log(`  Recommended Actions: ${result3.recommendedActions.length}`)
  console.log(`  Memory References: ${result3.memoryReferences.length}`)

  // Example 4: Advanced - Separate loading and execution
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  console.log('Example 4: Advanced - Separate Loading and Execution')
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')

  const snapshot = await loadMemorySnapshot({
    intent: 'deployment_planning',
    phase: 'deployment',
    riskLevel: 'critical'
  })

  console.log('Memory Snapshot Loaded:')
  console.log(`  Reasoning Patterns: ${snapshot.reasoningPatterns.length}`)
  console.log(`  Architecture Lessons: ${snapshot.architectureLessons.length}`)
  console.log(`  Historical Issues: ${snapshot.issues.length}`)
  console.log(`  Loaded At: ${snapshot.meta.loadedAt}`)

  const result4 = await executeReasoning(snapshot, {
    subsystem: 'deployment',
    riskLevel: 'critical'
  })

  console.log('\nReasoning Execution Results:')
  console.log(`  Confidence: ${(result4.meta.confidenceScore * 100).toFixed(0)}%`)
  console.log(`  Patterns Applied: ${result4.meta.patternsApplied.join(', ')}`)

  // Example 5: Built-in Patterns
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  console.log('Example 5: Built-in Reasoning Patterns')
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')

  const patterns = getBuiltInPatterns()
  console.log(`Total Built-in Patterns: ${patterns.length}\n`)

  patterns.forEach((pattern, i) => {
    console.log(`${i + 1}. ${pattern.name}`)
    console.log(`   Description: ${pattern.description}`)
    console.log(`   Success Rate: ${((pattern.successRate || 0) * 100).toFixed(0)}%`)
    console.log(`   Tags: ${pattern.tags.join(', ')}`)
    console.log()
  })

  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  console.log('Examples Complete!')
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')
}

main().catch(console.error)

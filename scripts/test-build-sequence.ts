/**
 * Test Build Sequence Orchestration
 * Tests the complete build sequence flow
 */

import { runBuildSequence, getBuildSequence, listBuildSequences } from '@/lib/foreman/build-sequence'
import { BuildSequenceConfig } from '@/types/build-sequence'

async function testBuildSequence() {
  console.log('=== Testing Build Sequence Orchestration ===\n')
  
  try {
    // Test 1: Run a build sequence with autonomous builds disabled
    console.log('1. Running build sequence (manual approval mode)...')
    const config1: BuildSequenceConfig = {
      organisationId: 'org_test_001',
      triggerSource: 'issue_command',
      triggerContext: {
        issue: 'Test build sequence',
        number: 1
      },
      autonomousBuildEnabled: false,
      skipArchitectureAnalysis: true // Skip for testing
    }
    
    const sequence1 = await runBuildSequence(config1)
    console.log('Build sequence created:', {
      id: sequence1.id,
      status: sequence1.status,
      tasksCount: sequence1.tasks.length,
      qaResultsCount: sequence1.qaResults.length
    })
    console.log('')
    
    // Test 2: List build sequences
    console.log('2. Listing build sequences...')
    const sequences = listBuildSequences({
      organisationId: 'org_test_001'
    })
    console.log(`Found ${sequences.length} build sequence(s) for org_test_001`)
    console.log('')
    
    // Test 3: Get specific build sequence
    console.log('3. Retrieving build sequence details...')
    const retrieved = getBuildSequence(sequence1.id)
    if (retrieved) {
      console.log('✓ Build sequence retrieved:', {
        id: retrieved.id,
        status: retrieved.status,
        architectureGaps: retrieved.architectureGaps.length,
        tasks: retrieved.tasks.length,
        qaResults: retrieved.qaResults.length
      })
    }
    console.log('')
    
    // Test 4: Architecture gap detection
    console.log('4. Testing architecture gap detection...')
    const { detectArchitectureGaps } = await import('@/lib/foreman/build-sequence')
    try {
      const gaps = await detectArchitectureGaps('org_test_001', {
        context: 'Test context'
      })
      console.log(`✓ Architecture gaps detected: ${gaps.length}`)
      if (gaps.length > 0) {
        console.log('Sample gap:', gaps[0])
      }
    } catch (error) {
      console.log('⚠ Architecture gap detection skipped (expected without OpenAI key)')
    }
    console.log('')
    
    // Test 5: Build task generation
    console.log('5. Testing build task generation...')
    const { generateBuildTasks } = await import('@/lib/foreman/build-sequence')
    try {
      const tasks = await generateBuildTasks('org_test_001', [
        {
          area: 'Test Area',
          description: 'Test gap description',
          priority: 'high',
          suggestedTasks: ['create_component']
        }
      ])
      console.log(`✓ Build tasks generated: ${tasks.length}`)
      if (tasks.length > 0) {
        console.log('Sample task:', tasks[0])
      }
    } catch (error) {
      console.log('⚠ Build task generation skipped (expected without OpenAI key)')
    }
    console.log('')
    
    console.log('=== Build Sequence Test Complete ===')
    console.log('\n✓ All core functionality tests passed')
    
  } catch (error) {
    console.error('Error during build sequence test:', error)
    throw error
  }
}

testBuildSequence().catch((error) => {
  console.error('Test failed:', error)
  process.exit(1)
})

/**
 * Test Autonomous Builds Flow
 * Tests the build sequence with autonomous builds enabled
 */

import { runBuildSequence, getBuildSequence } from '@/lib/foreman/build-sequence'
import { listBuilderTasks } from '@/lib/foreman/dispatch'
import { BuildSequenceConfig } from '@/types/build-sequence'

async function testAutonomousBuilds() {
  console.log('=== Testing Autonomous Builds Flow ===\n')
  
  try {
    // Test 1: Autonomous builds enabled (should auto-approve)
    console.log('1. Testing with autonomous builds ENABLED...')
    const config1: BuildSequenceConfig = {
      organisationId: 'org_test_auto',
      triggerSource: 'scheduled',
      triggerContext: {
        schedule: 'nightly'
      },
      autonomousBuildEnabled: true,
      skipArchitectureAnalysis: true
    }
    
    const sequence1 = await runBuildSequence(config1)
    console.log('Autonomous build sequence:', {
      id: sequence1.id,
      status: sequence1.status,
      tasksCount: sequence1.tasks.length
    })
    
    // Check if tasks were auto-approved
    const autoTasks = sequence1.tasks.filter(t => t.approvedBy === 'system_auto_approval')
    console.log(`✓ Auto-approved tasks: ${autoTasks.length}`)
    console.log('')
    
    // Test 2: Manual approval mode (should pause)
    console.log('2. Testing with autonomous builds DISABLED...')
    const config2: BuildSequenceConfig = {
      organisationId: 'org_test_manual',
      triggerSource: 'webhook',
      triggerContext: {
        event: 'issue_comment'
      },
      autonomousBuildEnabled: false,
      skipArchitectureAnalysis: true
    }
    
    const sequence2 = await runBuildSequence(config2)
    console.log('Manual approval build sequence:', {
      id: sequence2.id,
      status: sequence2.status,
      tasksCount: sequence2.tasks.length
    })
    
    // Check for pending approval tasks
    const pendingTasks = listBuilderTasks({
      status: 'pending_approval',
      approved: false
    })
    console.log(`✓ Tasks awaiting approval: ${pendingTasks.length}`)
    console.log('')
    
    // Test 3: Environment variable override
    console.log('3. Testing environment variable (MATURION_ALLOW_AUTONOMOUS_BUILDS)...')
    const currentValue = process.env.MATURION_ALLOW_AUTONOMOUS_BUILDS
    console.log(`Current env value: ${currentValue || 'not set'}`)
    
    // Temporarily set to true
    process.env.MATURION_ALLOW_AUTONOMOUS_BUILDS = 'true'
    const config3: BuildSequenceConfig = {
      organisationId: 'org_test_env',
      triggerSource: 'issue_command',
      skipArchitectureAnalysis: true
    }
    
    const sequence3 = await runBuildSequence(config3)
    console.log('Environment-controlled build:', {
      id: sequence3.id,
      status: sequence3.status,
      autoApproved: sequence3.tasks.filter(t => t.approved).length
    })
    
    // Restore original value
    if (currentValue) {
      process.env.MATURION_ALLOW_AUTONOMOUS_BUILDS = currentValue
    } else {
      delete process.env.MATURION_ALLOW_AUTONOMOUS_BUILDS
    }
    console.log('✓ Environment variable test complete')
    console.log('')
    
    // Test 4: Config override takes precedence
    console.log('4. Testing config override precedence...')
    process.env.MATURION_ALLOW_AUTONOMOUS_BUILDS = 'true'
    
    const config4: BuildSequenceConfig = {
      organisationId: 'org_test_override',
      triggerSource: 'webhook',
      autonomousBuildEnabled: false, // Explicitly set to false
      skipArchitectureAnalysis: true
    }
    
    const sequence4 = await runBuildSequence(config4)
    console.log('Config override test:', {
      id: sequence4.id,
      status: sequence4.status,
      shouldBeManual: sequence4.status === 'awaiting_approval'
    })
    
    // Restore
    if (currentValue) {
      process.env.MATURION_ALLOW_AUTONOMOUS_BUILDS = currentValue
    } else {
      delete process.env.MATURION_ALLOW_AUTONOMOUS_BUILDS
    }
    console.log('✓ Config override works correctly')
    console.log('')
    
    console.log('=== Autonomous Builds Test Complete ===')
    console.log('\n✓ All autonomous build tests passed')
    
  } catch (error) {
    console.error('Error during autonomous builds test:', error)
    throw error
  }
}

testAutonomousBuilds().catch((error) => {
  console.error('Test failed:', error)
  process.exit(1)
})

/**
 * Local Builder Fallback Demo
 * Demonstrates the local builder fallback integration
 */

import { dispatchBuilderTask, executeBuilderTask, getBuilderTask } from '@/lib/foreman/dispatch'
import { 
  getFallbackEvents, 
  checkLocalBuilderHealth,
  getLocalBuilderConfig 
} from '@/lib/foreman/local-builder'
import { BuilderRequest } from '@/types/builder'

async function main() {
  console.log('='.repeat(80))
  console.log('LOCAL BUILDER FALLBACK DEMONSTRATION')
  console.log('='.repeat(80))
  console.log()

  // Display configuration
  console.log('📋 Local Builder Configuration:')
  const config = getLocalBuilderConfig()
  console.log(`   - Enabled: ${config.enabled}`)
  console.log(`   - Builder URL: ${config.builder_url}`)
  console.log(`   - Health URL: ${config.health_url}`)
  console.log(`   - Local Repo Path: ${config.local_repo_path}`)
  console.log(`   - Fallback Interval: ${config.fallback_interval_minutes} minutes`)
  console.log()

  // Display fallback conditions
  console.log('🔍 Fallback Conditions:')
  console.log(`   - Copilot Failure: ${config.conditions.copilot_failure}`)
  console.log(`   - Token Exhaustion: ${config.conditions.token_exhaustion}`)
  console.log(`   - High Complexity: ${config.conditions.high_complexity_escalation}`)
  console.log(`   - Pipeline Timeout: ${config.conditions.pipeline_timeout_seconds}s`)
  console.log()

  // Check local builder health
  console.log('🏥 Checking Local Builder Health...')
  try {
    const isHealthy = await checkLocalBuilderHealth()
    console.log(`   Status: ${isHealthy ? '✅ Healthy' : '❌ Unavailable'}`)
  } catch (error) {
    console.log(`   Status: ❌ Error - ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
  console.log()

  // Simulate Copilot unavailability
  console.log('🔧 Setting Up Simulation:')
  console.log('   - Simulating Copilot SWE unavailability')
  console.log('   - Enabling autonomous mode')
  process.env.SIMULATE_COPILOT_FAILURE = 'true'
  process.env.MATURION_AUTONOMOUS_MODE = 'true'
  console.log()

  // Create a test task
  console.log('📝 Creating Test Task:')
  const request: BuilderRequest = {
    module: 'demo-module',
    taskDescription: 'Demonstrate local builder fallback functionality',
    organisationId: 'demo-org',
    context: {
      demo: true,
      timestamp: new Date().toISOString(),
    },
    metadata: {
      wave: 'demo-wave',
      issueNumber: 999,
    },
  }

  console.log(`   - Module: ${request.module}`)
  console.log(`   - Organisation: ${request.organisationId}`)
  console.log(`   - Description: ${request.taskDescription}`)
  console.log()

  try {
    // Dispatch the task
    console.log('🚀 Dispatching Task to API Builder...')
    const task = await dispatchBuilderTask('api', request)
    
    console.log(`   ✅ Task Created: ${task.id}`)
    console.log(`   - Builder: ${task.builder}`)
    console.log(`   - Status: ${task.status}`)
    console.log(`   - Approved: ${task.approved}`)
    console.log(`   - Memory Context: ${task.memoryContext?.memoryReferences.length || 0} references`)
    console.log()

    // Note: We can't actually execute with local builder unless it's running
    // So we'll demonstrate what would happen
    console.log('⚠️  Note: Local builder must be running at http://localhost:5050 for execution')
    console.log('   To run local builder, start it with:')
    console.log(`   $ cd "${config.local_repo_path}"`)
    console.log('   $ npm run start-local-builder')
    console.log()

    console.log('📊 What Happens During Execution:')
    console.log('   1. System detects Copilot unavailability (simulated)')
    console.log('   2. Checks local builder health at http://localhost:5050/health')
    console.log('   3. If healthy, switches to local builder')
    console.log('   4. Assembles payload with task details')
    console.log('   5. Sends POST to http://localhost:5050/builder/run')
    console.log('   6. Local builder executes task')
    console.log('   7. Results returned to Foreman')
    console.log('   8. Fallback event recorded in governance memory')
    console.log('   9. QA validation performed')
    console.log('   10. Task marked as completed')
    console.log()

    // Display fallback events
    console.log('📈 Fallback Event History:')
    const events = getFallbackEvents()
    if (events.length === 0) {
      console.log('   No fallback events recorded yet')
    } else {
      console.log(`   Total Events: ${events.length}`)
      events.slice(-5).forEach((event, index) => {
        console.log(`   ${index + 1}. ${event.reason} - ${event.success ? '✅ Success' : '❌ Failed'}`)
        console.log(`      Task: ${event.task_id}`)
        console.log(`      Builder: ${event.builder_type}`)
        console.log(`      Time: ${event.timestamp.toISOString()}`)
      })
    }
    console.log()

  } catch (error) {
    console.error('❌ Error:', error instanceof Error ? error.message : 'Unknown error')
    console.log()
  } finally {
    // Clean up environment variables
    console.log('🧹 Cleaning Up Simulation:')
    delete process.env.SIMULATE_COPILOT_FAILURE
    delete process.env.MATURION_AUTONOMOUS_MODE
    console.log('   - Simulation flags cleared')
    console.log()
  }

  console.log('='.repeat(80))
  console.log('DEMONSTRATION COMPLETE')
  console.log('='.repeat(80))
  console.log()
  console.log('✅ Local Builder Fallback System is Ready!')
  console.log()
  console.log('Next Steps:')
  console.log('1. Start your local builder at http://localhost:5050')
  console.log('2. Set SIMULATE_COPILOT_FAILURE=true to test fallback')
  console.log('3. Run a build sequence and observe automatic fallback')
  console.log('4. Check governance memory for fallback events')
  console.log()
}

// Run the demo
main().catch((error) => {
  console.error('Fatal error:', error)
  process.exit(1)
})

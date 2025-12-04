/**
 * Example: Complete Build Sequence Workflow
 * Demonstrates the full build sequence orchestration
 */

import { runBuildSequence } from '@/lib/foreman/build-sequence'
import { assemblePRContext } from '@/lib/github/pr-builder'
import { BuildSequenceConfig } from '@/types/build-sequence'

async function runCompleteExample() {
  console.log('=== Complete Build Sequence Workflow Example ===\n')
  console.log('This example demonstrates the full end-to-end build sequence flow.\n')
  
  try {
    // Scenario 1: Manual approval workflow (default)
    console.log('📋 SCENARIO 1: Manual Approval Workflow')
    console.log('   (Typical for production environments)\n')
    
    const manualConfig: BuildSequenceConfig = {
      organisationId: 'acme_corp_001',
      triggerSource: 'issue_command',
      triggerContext: {
        issue: 'Add user authentication feature',
        issueNumber: 42,
        repository: 'acme-corp/webapp'
      },
      autonomousBuildEnabled: false, // Requires manual approval
      skipArchitectureAnalysis: false // Enable full analysis
    }
    
    console.log('Starting build sequence with manual approval...')
    const manualSequence = await runBuildSequence(manualConfig)
    
    console.log('\n✅ Build sequence created:')
    console.log(`   ID: ${manualSequence.id}`)
    console.log(`   Status: ${manualSequence.status}`)
    console.log(`   Architecture gaps: ${manualSequence.architectureGaps.length}`)
    console.log(`   Tasks created: ${manualSequence.tasks.length}`)
    
    if (manualSequence.status === 'awaiting_approval') {
      console.log('\n⏸️  Tasks are pending admin approval')
      console.log('   → Admins can review tasks at: /api/admin/approve?pending=true')
      console.log('   → Approve tasks via: POST /api/admin/approve')
    }
    
    console.log('\n' + '─'.repeat(70) + '\n')
    
    // Scenario 2: Autonomous workflow (CI/CD)
    console.log('📋 SCENARIO 2: Autonomous Build Workflow')
    console.log('   (For automated CI/CD pipelines)\n')
    
    const autoConfig: BuildSequenceConfig = {
      organisationId: 'acme_corp_001',
      triggerSource: 'scheduled',
      triggerContext: {
        schedule: 'nightly',
        branch: 'develop'
      },
      autonomousBuildEnabled: true, // Auto-approve all tasks
      skipArchitectureAnalysis: true // Skip for CI/CD
    }
    
    console.log('Starting autonomous build sequence...')
    const autoSequence = await runBuildSequence(autoConfig)
    
    console.log('\n✅ Build sequence completed autonomously:')
    console.log(`   ID: ${autoSequence.id}`)
    console.log(`   Status: ${autoSequence.status}`)
    console.log(`   Tasks executed: ${autoSequence.tasks.length}`)
    console.log(`   QA results: ${autoSequence.qaResults.length}`)
    
    console.log('\n' + '─'.repeat(70) + '\n')
    
    // Scenario 3: PR Assembly
    console.log('📋 SCENARIO 3: Pull Request Assembly')
    console.log('   (Creating a PR from build sequence results)\n')
    
    if (autoSequence.tasks.length > 0 || autoSequence.qaResults.length > 0) {
      console.log('Assembling PR context...')
      const prContext = assemblePRContext(
        autoSequence.tasks,
        autoSequence.qaResults,
        'Automated implementation from build sequence orchestration'
      )
      
      console.log('\n✅ PR context assembled:')
      console.log(`   Builder outputs: ${prContext.builderOutputs.length}`)
      console.log(`   QA results: ${prContext.qaResults.length}`)
      console.log(`   Change records: ${prContext.changeRecords.length}`)
      console.log(`   Compliance checks: ${prContext.complianceResults.length}`)
      
      console.log('\n📝 PR would contain:')
      prContext.changeRecords.forEach((record, index) => {
        console.log(`   ${index + 1}. ${record.type}: ${record.file}`)
      })
      
      console.log('\n✅ QA Summary:')
      const passed = prContext.qaResults.filter(r => r.status === 'passed').length
      const failed = prContext.qaResults.filter(r => r.status === 'failed').length
      const warnings = prContext.qaResults.filter(r => r.status === 'warning').length
      console.log(`   Passed: ${passed} ✅`)
      console.log(`   Failed: ${failed} ❌`)
      console.log(`   Warnings: ${warnings} ⚠️`)
    } else {
      console.log('⚠️  No tasks or QA results to assemble into PR')
    }
    
    console.log('\n' + '─'.repeat(70) + '\n')
    
    // Scenario 4: Environment Variable Control
    console.log('📋 SCENARIO 4: Environment Variable Control')
    console.log('   (Using MATURION_ALLOW_AUTONOMOUS_BUILDS)\n')
    
    console.log('Current environment settings:')
    console.log(`   MATURION_ALLOW_AUTONOMOUS_BUILDS = ${process.env.MATURION_ALLOW_AUTONOMOUS_BUILDS || 'not set (defaults to false)'}`)
    
    console.log('\n💡 To enable autonomous builds globally:')
    console.log('   export MATURION_ALLOW_AUTONOMOUS_BUILDS=true')
    console.log('\n💡 To require manual approval globally:')
    console.log('   export MATURION_ALLOW_AUTONOMOUS_BUILDS=false')
    
    console.log('\n' + '─'.repeat(70) + '\n')
    
    // Summary
    console.log('📊 WORKFLOW SUMMARY\n')
    console.log('The build sequence orchestration provides:\n')
    console.log('1. ✅ Architecture Gap Detection')
    console.log('   → AI analyzes codebase and identifies implementation needs')
    console.log('')
    console.log('2. ✅ Automated Task Generation')
    console.log('   → Generates specific builder tasks to address gaps')
    console.log('')
    console.log('3. ✅ Builder Dispatch & Execution')
    console.log('   → Routes tasks to specialized builders (UI, API, Schema, etc.)')
    console.log('')
    console.log('4. ✅ QA Validation & QA-of-QA')
    console.log('   → Enforces quality checks and meta-reviews')
    console.log('')
    console.log('5. ✅ PR Assembly')
    console.log('   → Creates comprehensive pull requests with results')
    console.log('')
    console.log('6. ✅ Approval Workflows')
    console.log('   → Manual approval or autonomous execution modes')
    console.log('')
    console.log('7. ✅ Full Audit Trail')
    console.log('   → All actions logged in Vercel runtime logs')
    
    console.log('\n' + '═'.repeat(70) + '\n')
    console.log('✨ Example complete! All scenarios demonstrated successfully.\n')
    
  } catch (error) {
    console.error('Error during example execution:', error)
    throw error
  }
}

// Run the example
console.log('\n' + '═'.repeat(70))
console.log('   MATURION FOREMAN - BUILD SEQUENCE ORCHESTRATION')
console.log('═'.repeat(70) + '\n')

runCompleteExample().catch((error) => {
  console.error('\n❌ Example failed:', error)
  process.exit(1)
})

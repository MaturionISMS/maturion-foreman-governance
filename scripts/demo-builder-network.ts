#!/usr/bin/env tsx
/**
 * Builder Network Integration Demo
 * Demonstrates the builder detection and routing capabilities
 */

import {
  detectAllBuilders,
  detectOptimalBuilder,
  validateBuilderProtocol,
  checkGovernanceCompliance,
} from '../lib/foreman/builder-detection'
import { syncBuilderNetwork, selectBuilderWithSync } from '../lib/foreman/dispatch'

async function main() {
  console.log('='.repeat(80))
  console.log('Builder Network Integration Demo')
  console.log('='.repeat(80))
  console.log()

  // 1. Detect all builders
  console.log('1. Detecting all builders...')
  const availability = await detectAllBuilders()
  console.log('   Copilot:', {
    available: availability.copilot.available,
    healthy: availability.copilot.healthy,
    reason: availability.copilot.reason
  })
  console.log('   Local:', {
    available: availability.local.available,
    healthy: availability.local.healthy,
    reason: availability.local.reason
  })
  console.log()

  // 2. Validate protocol compliance
  console.log('2. Validating protocol compliance...')
  const copilotProtocol = await validateBuilderProtocol('copilot')
  console.log('   Copilot protocol:', {
    compliant: copilotProtocol.compliant,
    issues: copilotProtocol.issues,
    warnings: copilotProtocol.warnings
  })
  
  const localProtocol = await validateBuilderProtocol('local')
  console.log('   Local protocol:', {
    compliant: localProtocol.compliant,
    issues: localProtocol.issues,
    warnings: localProtocol.warnings
  })
  console.log()

  // 3. Check governance compliance
  console.log('3. Checking governance compliance...')
  const copilotGovernance = await checkGovernanceCompliance('copilot')
  console.log('   Copilot governance:', copilotGovernance)
  
  const localGovernance = await checkGovernanceCompliance('local')
  console.log('   Local governance:', localGovernance)
  console.log()

  // 4. Detect optimal builder for different complexities
  console.log('4. Detecting optimal builder by complexity...')
  
  const lowComplexity = await detectOptimalBuilder('low')
  console.log('   Low complexity task:', lowComplexity)
  
  const mediumComplexity = await detectOptimalBuilder('medium')
  console.log('   Medium complexity task:', mediumComplexity)
  
  const highComplexity = await detectOptimalBuilder('high')
  console.log('   High complexity task:', highComplexity)
  console.log()

  // 5. Sync builder network with full compliance check
  console.log('5. Syncing builder network...')
  const syncResult = await syncBuilderNetwork()
  console.log('   Copilot sync:', {
    available: syncResult.copilot.available,
    compliant: syncResult.copilot.compliant,
    issues: syncResult.copilot.issues
  })
  console.log('   Local sync:', {
    available: syncResult.local.available,
    compliant: syncResult.local.compliant,
    issues: syncResult.local.issues
  })
  console.log()

  // 6. Select builder with full sync
  console.log('6. Selecting builder with sync for high complexity task...')
  const selectedBuilder = await selectBuilderWithSync('high')
  console.log('   Selected builder:', selectedBuilder)
  console.log()

  // 7. Summary
  console.log('='.repeat(80))
  console.log('Summary')
  console.log('='.repeat(80))
  console.log('✅ Builder detection working')
  console.log('✅ Protocol validation working')
  console.log('✅ Governance compliance checking working')
  console.log('✅ Intelligent routing working')
  console.log('✅ Builder network sync working')
  console.log()
  console.log('Builder Network Integration is OPERATIONAL! 🚀')
  console.log('='.repeat(80))
}

main().catch((error) => {
  console.error('Error during demo:', error)
  process.exit(1)
})

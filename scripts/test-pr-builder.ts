/**
 * Test PR Builder Utility
 * Tests PR assembly and context generation
 */

import { 
  generatePRTitle, 
  generatePRDescription, 
  assemblePRContext,
  extractChangeRecords,
  generateComplianceResults
} from '@/lib/github/pr-builder'
import { PRContext } from '@/types/build-sequence'
import { QAResult } from '@/types/builder'

async function testPRBuilder() {
  console.log('=== Testing PR Builder Utility ===\n')
  
  try {
    // Test 1: Generate PR title
    console.log('1. Testing PR title generation...')
    const mockBuilderOutputs = [
      {
        id: 'task_1',
        builder: 'ui',
        status: 'completed',
        input: {
          module: 'dashboard',
          taskDescription: 'Create dashboard component'
        },
        output: {
          success: true,
          artifacts: [
            {
              type: 'code',
              name: 'Dashboard.tsx',
              path: 'components/Dashboard.tsx'
            }
          ]
        }
      },
      {
        id: 'task_2',
        builder: 'api',
        status: 'completed',
        input: {
          module: 'users',
          taskDescription: 'Create user API endpoints'
        },
        output: {
          success: true,
          artifacts: [
            {
              type: 'code',
              name: 'users route',
              path: 'app/api/users/route.ts'
            }
          ]
        }
      }
    ]
    
    const mockQAResults: QAResult[] = [
      {
        check: 'code_quality',
        status: 'passed',
        message: 'Code quality checks passed'
      },
      {
        check: 'test_coverage',
        status: 'warning',
        message: 'Test coverage is below 80%'
      },
      {
        check: 'security_scan',
        status: 'passed',
        message: 'No security vulnerabilities found'
      }
    ]
    
    const context: PRContext = {
      title: '',
      description: 'Automated build sequence implementation',
      builderOutputs: mockBuilderOutputs,
      qaResults: mockQAResults,
      changeRecords: [],
      complianceResults: []
    }
    
    const title = generatePRTitle(context)
    console.log('✓ PR Title:', title)
    console.log('')
    
    // Test 2: Extract change records
    console.log('2. Testing change record extraction...')
    const changeRecords = extractChangeRecords(mockBuilderOutputs)
    console.log(`✓ Change records extracted: ${changeRecords.length}`)
    changeRecords.forEach(record => {
      console.log(`  - ${record.type}: ${record.file}`)
    })
    console.log('')
    
    // Test 3: Generate compliance results
    console.log('3. Testing compliance results generation...')
    const complianceResults = generateComplianceResults(mockQAResults)
    console.log(`✓ Compliance results generated: ${complianceResults.length}`)
    complianceResults.forEach(result => {
      const icon = result.status === 'passed' ? '✅' : result.status === 'failed' ? '❌' : '⚠️'
      console.log(`  ${icon} ${result.check}: ${result.message}`)
    })
    console.log('')
    
    // Test 4: Assemble complete PR context
    console.log('4. Testing PR context assembly...')
    const assembledContext = assemblePRContext(
      mockBuilderOutputs,
      mockQAResults,
      'Complete build sequence implementation with UI and API updates'
    )
    console.log('✓ PR context assembled:', {
      builderOutputs: assembledContext.builderOutputs.length,
      qaResults: assembledContext.qaResults.length,
      changeRecords: assembledContext.changeRecords.length,
      complianceResults: assembledContext.complianceResults.length
    })
    console.log('')
    
    // Test 5: Generate PR description
    console.log('5. Testing PR description generation...')
    assembledContext.title = title
    const description = generatePRDescription(assembledContext)
    console.log('✓ PR Description generated:')
    console.log('---')
    console.log(description)
    console.log('---')
    console.log('')
    
    console.log('=== PR Builder Test Complete ===')
    console.log('\n✓ All PR builder tests passed')
    
  } catch (error) {
    console.error('Error during PR builder test:', error)
    throw error
  }
}

testPRBuilder().catch((error) => {
  console.error('Test failed:', error)
  process.exit(1)
})

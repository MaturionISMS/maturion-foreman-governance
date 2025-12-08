#!/usr/bin/env node
/**
 * Example: Complete Pilot Build Wave 1 Workflow
 * 
 * Demonstrates the full pilot build process:
 * 1. Architecture analysis
 * 2. Task generation
 * 3. Builder execution
 * 4. QA validation
 * 5. PR assembly (simulated)
 * 6. Report generation
 */

console.log('🚀 Pilot Build Wave 1 - Complete Workflow Example')
console.log('='.repeat(60))
console.log('')

// Simulate a complete pilot build sequence
async function runPilotBuildExample() {
  const { generateBuildReport, generateMarkdownReport } = await import('../lib/foreman/build-report.js')
  
  // Mock build sequence data
  const mockSequence = {
    id: 'seq_pilot_wave_1_example',
    organisationId: 'maturion_isms',
    status: 'completed' as const,
    architectureGaps: [
      {
        area: 'Status Dashboard',
        description: 'No dedicated status page for Foreman operations',
        priority: 'high' as const,
        suggestedTasks: [
          'Create dashboard component',
          'Create status page route',
          'Add data aggregation utilities'
        ]
      }
    ],
    tasks: [
      {
        id: 'task_schema_001',
        builder: 'schema' as const,
        module: 'dashboard',
        taskDescription: 'Create dashboard type definitions',
        status: 'completed' as const,
        approved: true,
        approvedBy: 'system_auto_approval',
        createdAt: new Date('2025-12-05T10:00:00Z'),
        updatedAt: new Date('2025-12-05T10:01:00Z'),
        input: {
          module: 'dashboard',
          taskDescription: 'Create TypeScript types for dashboard data',
          organisationId: 'maturion_isms'
        },
        output: {
          success: true,
          artifacts: [
            {
              type: 'schema' as const,
              name: 'DashboardTypes',
              path: 'types/dashboard.ts',
              content: '// Dashboard type definitions'
            }
          ]
        }
      },
      {
        id: 'task_ui_001',
        builder: 'ui' as const,
        module: 'dashboard',
        taskDescription: 'Create Foreman dashboard component',
        status: 'completed' as const,
        approved: true,
        approvedBy: 'system_auto_approval',
        createdAt: new Date('2025-12-05T10:01:30Z'),
        updatedAt: new Date('2025-12-05T10:03:00Z'),
        input: {
          module: 'dashboard',
          taskDescription: 'Generate ForemanDashboard component with status display',
          organisationId: 'maturion_isms'
        },
        output: {
          success: true,
          artifacts: [
            {
              type: 'code' as const,
              name: 'ForemanDashboard',
              path: 'components/ForemanDashboard.tsx',
              content: '// Foreman Dashboard component'
            }
          ]
        }
      },
      {
        id: 'task_ui_002',
        builder: 'ui' as const,
        module: 'foreman',
        taskDescription: 'Create /foreman status page',
        status: 'completed' as const,
        approved: true,
        approvedBy: 'system_auto_approval',
        createdAt: new Date('2025-12-05T10:03:30Z'),
        updatedAt: new Date('2025-12-05T10:04:30Z'),
        input: {
          module: 'foreman',
          taskDescription: 'Create status page at /foreman route',
          organisationId: 'maturion_isms'
        },
        output: {
          success: true,
          artifacts: [
            {
              type: 'code' as const,
              name: 'ForemanPage',
              path: 'app/foreman/page.tsx',
              content: '// Foreman status page'
            }
          ]
        }
      },
      {
        id: 'task_qa_001',
        builder: 'qa' as const,
        module: 'dashboard',
        taskDescription: 'Validate all dashboard artifacts',
        status: 'completed' as const,
        approved: true,
        approvedBy: 'system_auto_approval',
        createdAt: new Date('2025-12-05T10:05:00Z'),
        updatedAt: new Date('2025-12-05T10:06:00Z'),
        input: {
          module: 'dashboard',
          taskDescription: 'Run QA validation on dashboard components',
          organisationId: 'maturion_isms'
        },
        output: {
          success: true,
          qaResults: [
            {
              check: 'type_safety',
              status: 'passed' as const,
              message: 'All types properly defined'
            },
            {
              check: 'component_structure',
              status: 'passed' as const,
              message: 'Component follows React best practices'
            },
            {
              check: 'accessibility',
              status: 'passed' as const,
              message: 'WCAG 2.1 AA compliance verified'
            }
          ]
        }
      }
    ],
    qaResults: [
      {
        check: 'type_safety',
        status: 'passed' as const,
        message: 'All types properly defined'
      },
      {
        check: 'component_structure',
        status: 'passed' as const,
        message: 'Component follows React best practices'
      },
      {
        check: 'accessibility',
        status: 'passed' as const,
        message: 'WCAG 2.1 AA compliance verified'
      },
      {
        check: 'qa_of_qa',
        status: 'passed' as const,
        message: 'QA process validated successfully'
      }
    ],
    createdAt: new Date('2025-12-05T10:00:00Z'),
    updatedAt: new Date('2025-12-05T10:06:00Z'),
    startedAt: new Date('2025-12-05T10:00:00Z'),
    completedAt: new Date('2025-12-05T10:06:00Z')
  }
  
  console.log('📊 Build Sequence Details')
  console.log('-'.repeat(60))
  console.log(`Sequence ID: ${mockSequence.id}`)
  console.log(`Organisation: ${mockSequence.organisationId}`)
  console.log(`Status: ${mockSequence.status}`)
  console.log(`Architecture Gaps: ${mockSequence.architectureGaps.length}`)
  console.log(`Tasks: ${mockSequence.tasks.length}`)
  console.log(`QA Results: ${mockSequence.qaResults.length}`)
  console.log('')
  
  console.log('🏗️  Architecture Gaps Detected')
  console.log('-'.repeat(60))
  mockSequence.architectureGaps.forEach((gap, index) => {
    console.log(`${index + 1}. ${gap.area} (${gap.priority})`)
    console.log(`   ${gap.description}`)
    console.log(`   Suggested tasks: ${gap.suggestedTasks.length}`)
  })
  console.log('')
  
  console.log('⚙️  Builder Tasks Executed')
  console.log('-'.repeat(60))
  mockSequence.tasks.forEach((task, index) => {
    console.log(`${index + 1}. ${task.builder.toUpperCase()} - ${task.module}`)
    console.log(`   ${task.taskDescription}`)
    console.log(`   Status: ${task.status}`)
    console.log(`   Artifacts: ${task.output?.artifacts?.length || 0}`)
  })
  console.log('')
  
  console.log('✅ QA Validation Results')
  console.log('-'.repeat(60))
  const passedChecks = mockSequence.qaResults.filter(r => r.status === 'passed').length
  const failedChecks = mockSequence.qaResults.filter((r): r is QAResult & { status: 'failed' } => r.status === 'failed').length
  const warningChecks = mockSequence.qaResults.filter((r): r is QAResult & { status: 'warning' } => r.status === 'warning').length
  
  console.log(`Total Checks: ${mockSequence.qaResults.length}`)
  console.log(`✅ Passed: ${passedChecks}`)
  console.log(`❌ Failed: ${failedChecks}`)
  console.log(`⚠️  Warnings: ${warningChecks}`)
  console.log('')
  
  mockSequence.qaResults.forEach((result, index) => {
    const icon = result.status === 'passed' ? '✅' : result.status === 'failed' ? '❌' : '⚠️'
    console.log(`${index + 1}. ${icon} ${result.check}: ${result.message}`)
  })
  console.log('')
  
  console.log('📝 Generating Build Report')
  console.log('-'.repeat(60))
  
  const report = generateBuildReport(mockSequence, {
    pilotWave: true,
    waveNumber: 1,
    feature: 'foreman-status-dashboard',
    gitSha: 'abc123def',
    foremanVersion: '0.1.0'
  })
  
  console.log(`Report Status: ${report.status}`)
  console.log(`Pilot Wave: ${report.pilotWave ? 'Yes' : 'No'}`)
  console.log(`Wave Number: ${report.waveNumber}`)
  console.log(`Feature: ${report.feature}`)
  console.log('')
  
  console.log('📄 Report Summary')
  console.log('-'.repeat(60))
  console.log(`Tasks Executed: ${report.tasksExecuted.length}`)
  console.log(`Builders Used: ${report.buildersUsed.length}`)
  console.log(`QA Checks: ${report.qaResults.totalChecks}`)
  console.log(`Compliance: ${report.complianceResults.allChecksPassed ? 'PASS' : 'FAIL'}`)
  console.log('')
  
  console.log('🔨 Builders Used')
  console.log('-'.repeat(60))
  report.buildersUsed.forEach(builder => {
    console.log(`${builder.builder}: ${builder.tasksCompleted} tasks, ${builder.artifactsGenerated} artifacts`)
  })
  console.log('')
  
  console.log('📋 Full Markdown Report Preview')
  console.log('='.repeat(60))
  const markdownReport = generateMarkdownReport(report)
  console.log(markdownReport)
  console.log('='.repeat(60))
  console.log('')
  
  console.log('✨ Pilot Build Wave 1 Example Complete!')
  console.log('')
  console.log('Key Achievements:')
  console.log('  ✅ Architecture gaps detected automatically')
  console.log('  ✅ Builder tasks generated and executed')
  console.log('  ✅ QA validation passed (4/4 checks)')
  console.log('  ✅ QA-of-QA meta-review validated')
  console.log('  ✅ Build report generated successfully')
  console.log('  ✅ Compliance checks passed')
  console.log('')
  console.log('Next Steps:')
  console.log('  1. Review the generated report')
  console.log('  2. Trigger actual pilot build via API or GitHub issue')
  console.log('  3. Monitor build sequence execution')
  console.log('  4. Validate PR assembly and governance reasoning')
  console.log('  5. Prepare for Wave 2 (larger scope)')
  console.log('')
}

// Run the example
runPilotBuildExample().catch(error => {
  console.error('Example failed:', error)
  process.exit(1)
})

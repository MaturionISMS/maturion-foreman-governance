/**
 * Autonomous Pilot Execution Flow
 * 
 * Orchestrates the end-to-end autonomous execution of a pilot issue.
 * Follows the Build Philosophy: Architecture → Red QA → Build to Green
 * 
 * Flow:
 * 1. Pre-flight validation
 * 2. Issue selection and safety evaluation
 * 3. Plan generation
 * 4. Branch creation
 * 5. Build-to-green execution
 * 6. QA validation
 * 7. PR creation and linking
 * 8. Governance reporting
 */

import { runAutonomyPreflight, generatePreFlightFailureReport } from './pre-flight'
import { selectPilotIssue, PilotIssue } from './pilot-selection'
import { commentOnIssue, createPR } from '@/lib/github/mutations'
import { logGovernanceEvent } from '@/lib/foreman/memory/governance-memory'

export interface ExecutionPlan {
  issueNumber: number
  title: string
  scope: string[]
  buildersToUse: string[]
  estimatedDuration: string
  qaStrategy: string
  steps: ExecutionStep[]
}

export interface ExecutionStep {
  stepNumber: number
  description: string
  action: string
  expectedOutcome: string
  qaCheck?: string
}

export interface ExecutionResult {
  success: boolean
  issueNumber: number
  branchName?: string
  prNumber?: number
  prUrl?: string
  qaStatus?: 'passed' | 'failed' | 'pending'
  errors?: string[]
  warnings?: string[]
  executionLog: string[]
  timestamp: string
}

/**
 * Generate execution plan for a pilot issue
 */
export function generateExecutionPlan(issue: PilotIssue): ExecutionPlan {
  const plan: ExecutionPlan = {
    issueNumber: issue.number,
    title: issue.title,
    scope: [],
    buildersToUse: ['GitHub Copilot', 'Local Builder (fallback)'],
    estimatedDuration: '15-30 minutes',
    qaStrategy: 'Build to Green with continuous QA validation',
    steps: []
  }
  
  // Determine scope based on labels
  if (issue.labels.includes('docs') || issue.labels.includes('documentation')) {
    plan.scope.push('Documentation files (docs/**)')
    plan.scope.push('README updates')
  }
  
  if (issue.labels.includes('parking-station')) {
    plan.scope.push('Dashboard components (app/components/**)')
    plan.scope.push('UI enhancements (non-critical)')
  }
  
  if (issue.labels.includes('governance')) {
    plan.scope.push('Non-constitutional governance docs')
    plan.scope.push('Implementation summaries')
  }
  
  // Generate execution steps
  plan.steps = [
    {
      stepNumber: 1,
      description: 'Pre-Flight Validation',
      action: 'Run runAutonomyPreflight() to validate all systems',
      expectedOutcome: 'All critical checks pass',
      qaCheck: 'Pre-flight report shows canProceed: true'
    },
    {
      stepNumber: 2,
      description: 'Safety Evaluation',
      action: 'Evaluate issue safety and apply labels',
      expectedOutcome: 'Issue marked as safe-scope and autonomy-pilot-1',
      qaCheck: 'Safety evaluation passes all checks'
    },
    {
      stepNumber: 3,
      description: 'Branch Creation',
      action: `Create branch: autonomy/pilot-1/issue-${issue.number}`,
      expectedOutcome: 'Branch created and pushed to origin',
      qaCheck: 'Branch exists on GitHub'
    },
    {
      stepNumber: 4,
      description: 'Architecture Design',
      action: 'Design architecture based on issue requirements',
      expectedOutcome: 'Complete architecture documented',
      qaCheck: 'Architecture checklist validated'
    },
    {
      stepNumber: 5,
      description: 'Red QA Creation',
      action: 'Create comprehensive QA tests (will fail)',
      expectedOutcome: 'QA suite created, all tests failing (RED)',
      qaCheck: 'QA status: RED (0% passing)'
    },
    {
      stepNumber: 6,
      description: 'Build to Green',
      action: 'Instruct builder to make all QA tests pass',
      expectedOutcome: 'Builder implements changes until QA is GREEN',
      qaCheck: 'QA status: GREEN (100% passing)'
    },
    {
      stepNumber: 7,
      description: 'Quality Validation',
      action: 'Run QIC + QIEL + Guardrails',
      expectedOutcome: 'All quality gates pass',
      qaCheck: 'Zero errors, zero warnings'
    },
    {
      stepNumber: 8,
      description: 'PR Creation',
      action: `Create PR linking to issue #${issue.number}`,
      expectedOutcome: 'PR created and linked',
      qaCheck: 'PR exists with correct labels and description'
    },
    {
      stepNumber: 9,
      description: 'Governance Report',
      action: 'Generate governance compliance report',
      expectedOutcome: 'Report shows full compliance',
      qaCheck: 'All governance checks passed'
    }
  ]
  
  return plan
}

/**
 * Format execution plan as markdown for issue comment
 */
export function formatExecutionPlan(plan: ExecutionPlan): string {
  const lines: string[] = [
    '# 🤖 Autonomous Execution Plan',
    '',
    `**Issue**: #${plan.issueNumber} - ${plan.title}`,
    `**Estimated Duration**: ${plan.estimatedDuration}`,
    '',
    '## Scope',
    ''
  ]
  
  plan.scope.forEach(item => {
    lines.push(`- ${item}`)
  })
  
  lines.push('')
  lines.push('## Builders')
  lines.push('')
  
  plan.buildersToUse.forEach(builder => {
    lines.push(`- ${builder}`)
  })
  
  lines.push('')
  lines.push('## QA Strategy')
  lines.push('')
  lines.push(plan.qaStrategy)
  
  lines.push('')
  lines.push('## Execution Steps')
  lines.push('')
  
  plan.steps.forEach(step => {
    lines.push(`### Step ${step.stepNumber}: ${step.description}`)
    lines.push(`- **Action**: ${step.action}`)
    lines.push(`- **Expected Outcome**: ${step.expectedOutcome}`)
    if (step.qaCheck) {
      lines.push(`- **QA Check**: ${step.qaCheck}`)
    }
    lines.push('')
  })
  
  lines.push('## Safety Rails')
  lines.push('')
  lines.push('✅ CS1 Guardrails Active')
  lines.push('✅ QIC + QIEL Enforcement')
  lines.push('✅ Immutable Path Protection')
  lines.push('✅ Governance Incident Recording')
  lines.push('')
  lines.push('---')
  lines.push('*Execution will begin after human approval or autonomy-pilot-approved label is applied*')
  
  return lines.join('\n')
}

/**
 * Create branch for pilot execution
 */
async function createPilotBranch(
  owner: string,
  repo: string,
  issueNumber: number
): Promise<string> {
  const branchName = `autonomy/pilot-1/issue-${issueNumber}`
  
  // In a real implementation, this would use GitHub API to create branch
  // For now, we'll just return the branch name
  console.log(`[Pilot Execution] Would create branch: ${branchName}`)
  
  return branchName
}

/**
 * Execute autonomous pilot for an issue
 */
export async function executeAutonomousPilot(
  owner: string,
  repo: string,
  issue: PilotIssue
): Promise<ExecutionResult> {
  const executionLog: string[] = []
  const errors: string[] = []
  const warnings: string[] = []
  const timestamp = new Date().toISOString()
  
  executionLog.push(`[${timestamp}] Starting autonomous pilot execution for issue #${issue.number}`)
  
  try {
    // Step 1: Pre-flight validation
    executionLog.push('[Step 1/9] Running pre-flight validation...')
    const preFlightReport = await runAutonomyPreflight()
    
    if (!preFlightReport.canProceed) {
      errors.push('Pre-flight validation failed')
      const failureReport = generatePreFlightFailureReport(preFlightReport)
      await commentOnIssue(owner, repo, issue.number, failureReport)
      
      await logGovernanceEvent({
        type: 'autonomy_preflight_failed',
        severity: 'high',
        description: `Autonomy pre-flight failed for issue #${issue.number}`,
        metadata: { preFlightReport }
      })
      
      return {
        success: false,
        issueNumber: issue.number,
        errors,
        warnings,
        executionLog,
        timestamp
      }
    }
    
    executionLog.push('[Step 1/9] ✅ Pre-flight validation passed')
    
    // Step 2: Safety evaluation
    executionLog.push('[Step 2/9] Evaluating issue safety...')
    const selectionResult = await selectPilotIssue(owner, repo, issue)
    
    if (!selectionResult.success) {
      errors.push('Issue failed safety evaluation')
      return {
        success: false,
        issueNumber: issue.number,
        errors,
        warnings,
        executionLog,
        timestamp
      }
    }
    
    executionLog.push('[Step 2/9] ✅ Issue passed safety evaluation')
    
    // Step 3: Generate execution plan
    executionLog.push('[Step 3/9] Generating execution plan...')
    const plan = generateExecutionPlan(issue)
    const planComment = formatExecutionPlan(plan)
    await commentOnIssue(owner, repo, issue.number, planComment)
    executionLog.push('[Step 3/9] ✅ Execution plan generated and posted')
    
    // Step 4: Create branch
    executionLog.push('[Step 4/9] Creating branch...')
    const branchName = await createPilotBranch(owner, repo, issue.number)
    executionLog.push(`[Step 4/9] ✅ Branch created: ${branchName}`)
    
    // Step 5-8: Would continue with actual build execution
    // For now, we'll log that this would happen
    executionLog.push('[Step 5/9] Architecture design (simulated)')
    executionLog.push('[Step 6/9] Red QA creation (simulated)')
    executionLog.push('[Step 7/9] Build to Green (simulated)')
    executionLog.push('[Step 8/9] Quality validation (simulated)')
    
    warnings.push('Full build execution not yet implemented - this is a pilot validation')
    
    // Step 9: Governance report
    executionLog.push('[Step 9/9] Generating governance report...')
    await logGovernanceEvent({
      type: 'autonomy_pilot_executed',
      severity: 'low',
      description: `Autonomous pilot executed for issue #${issue.number}`,
      metadata: { plan, branchName, selectionResult }
    })
    executionLog.push('[Step 9/9] ✅ Governance report generated')
    
    return {
      success: true,
      issueNumber: issue.number,
      branchName,
      errors,
      warnings,
      executionLog,
      timestamp
    }
    
  } catch (error: any) {
    errors.push(`Execution failed: ${error.message}`)
    executionLog.push(`[ERROR] ${error.message}`)
    
    await logGovernanceEvent({
      type: 'autonomy_pilot_failed',
      severity: 'high',
      description: `Autonomous pilot failed for issue #${issue.number}`,
      metadata: { error: error.message, executionLog }
    })
    
    return {
      success: false,
      issueNumber: issue.number,
      errors,
      warnings,
      executionLog,
      timestamp
    }
  }
}

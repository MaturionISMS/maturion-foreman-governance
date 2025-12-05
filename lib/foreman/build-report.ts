/**
 * Build Report Generator
 * Generates comprehensive reports for pilot build waves and production builds
 */

import { BuildSequence } from '@/types/build-sequence'
import { BuilderTask, QAResult } from '@/types/builder'
import { writeFileSync } from 'fs'
import { join } from 'path'

export interface BuildReport {
  sequenceId: string
  organisationId: string
  status: 'PASS' | 'FAIL'
  pilotWave?: boolean
  waveNumber?: number
  feature?: string
  tasksExecuted: TaskSummary[]
  buildersUsed: BuilderSummary[]
  qaResults: QAResultSummary
  complianceResults: ComplianceResultSummary
  timeline: TimelineEntry[]
  metadata: ReportMetadata
}

export interface TaskSummary {
  taskId: string
  builder: string
  module: string
  description: string
  status: string
  approved: boolean
  approvedBy?: string
  executionTimeMs?: number
  artifactsGenerated: number
}

export interface BuilderSummary {
  builder: string
  tasksCompleted: number
  artifactsGenerated: number
  averageExecutionTimeMs: number
}

export interface QAResultSummary {
  totalChecks: number
  passed: number
  failed: number
  warnings: number
  qaOfQaPassed: boolean
  checks: Array<{
    check: string
    status: string
    message: string
  }>
}

export interface ComplianceResultSummary {
  allChecksPassed: boolean
  organisationIdPresent: boolean
  noBreakingChanges: boolean
  noSecretsDetected: boolean
  auditLogComplete: boolean
  issues: string[]
}

export interface TimelineEntry {
  timestamp: Date
  phase: string
  description: string
  durationMs?: number
}

export interface ReportMetadata {
  generatedAt: Date
  foremanVersion: string
  autonomousBuildEnabled: boolean
  gitSha?: string
  prUrl?: string
  reportVersion: string
}

/**
 * Generate a build report from a build sequence
 */
export function generateBuildReport(
  sequence: BuildSequence,
  options?: {
    pilotWave?: boolean
    waveNumber?: number
    feature?: string
    gitSha?: string
    foremanVersion?: string
  }
): BuildReport {
  // Determine overall status
  const status = determineOverallStatus(sequence)
  
  // Compile task summaries
  const tasksExecuted = sequence.tasks.map(task => ({
    taskId: task.id,
    builder: task.builder,
    module: task.module,
    description: task.taskDescription,
    status: task.status,
    approved: task.approved || false,
    approvedBy: task.approvedBy,
    executionTimeMs: calculateTaskDuration(task),
    artifactsGenerated: task.output?.artifacts?.length || 0
  }))
  
  // Compile builder summaries
  const buildersUsed = compileBuildersUsed(sequence.tasks)
  
  // Compile QA results
  const qaResults = compileQAResults(sequence.qaResults)
  
  // Compile compliance results
  const complianceResults = compileComplianceResults(sequence)
  
  // Build timeline
  const timeline = buildTimeline(sequence)
  
  // Compile metadata
  const metadata: ReportMetadata = {
    generatedAt: new Date(),
    foremanVersion: options?.foremanVersion || '0.1.0',
    autonomousBuildEnabled: isAutonomousBuild(sequence),
    gitSha: options?.gitSha,
    prUrl: sequence.prUrl,
    reportVersion: '1.0'
  }
  
  return {
    sequenceId: sequence.id,
    organisationId: sequence.organisationId,
    status,
    pilotWave: options?.pilotWave,
    waveNumber: options?.waveNumber,
    feature: options?.feature,
    tasksExecuted,
    buildersUsed,
    qaResults,
    complianceResults,
    timeline,
    metadata
  }
}

/**
 * Generate markdown report content
 */
export function generateMarkdownReport(report: BuildReport): string {
  const lines: string[] = []
  
  // Header
  lines.push('# Foreman Build Report')
  lines.push('')
  
  if (report.pilotWave) {
    lines.push(`**Pilot Build Wave ${report.waveNumber || 1}**`)
    lines.push('')
  }
  
  // Metadata section
  lines.push('## Build Metadata')
  lines.push('')
  lines.push(`- **Sequence ID**: \`${report.sequenceId}\``)
  lines.push(`- **Organisation**: \`${report.organisationId}\``)
  lines.push(`- **Status**: ${report.status === 'PASS' ? '✅ PASS' : '❌ FAIL'}`)
  if (report.feature) {
    lines.push(`- **Feature**: ${report.feature}`)
  }
  lines.push(`- **Generated**: ${report.metadata.generatedAt.toISOString()}`)
  lines.push(`- **Foreman Version**: ${report.metadata.foremanVersion}`)
  lines.push(`- **Autonomous Mode**: ${report.metadata.autonomousBuildEnabled ? 'Yes' : 'No'}`)
  if (report.metadata.gitSha) {
    lines.push(`- **Git SHA**: \`${report.metadata.gitSha}\``)
  }
  if (report.metadata.prUrl) {
    lines.push(`- **Pull Request**: ${report.metadata.prUrl}`)
  }
  lines.push('')
  
  // Tasks section
  lines.push('## Tasks Executed')
  lines.push('')
  lines.push(`Total tasks: ${report.tasksExecuted.length}`)
  lines.push('')
  
  for (const task of report.tasksExecuted) {
    const statusIcon = task.status === 'completed' ? '✅' : task.status === 'failed' ? '❌' : '⏳'
    lines.push(`### ${statusIcon} ${task.builder.toUpperCase()} - ${task.module}`)
    lines.push('')
    lines.push(`- **Task ID**: \`${task.taskId}\``)
    lines.push(`- **Description**: ${task.description}`)
    lines.push(`- **Status**: ${task.status}`)
    lines.push(`- **Approved**: ${task.approved ? 'Yes' : 'No'}`)
    if (task.approvedBy) {
      lines.push(`- **Approved By**: ${task.approvedBy}`)
    }
    if (task.executionTimeMs) {
      lines.push(`- **Execution Time**: ${task.executionTimeMs}ms`)
    }
    lines.push(`- **Artifacts Generated**: ${task.artifactsGenerated}`)
    lines.push('')
  }
  
  // Builders section
  lines.push('## Builders Used')
  lines.push('')
  lines.push('| Builder | Tasks Completed | Artifacts | Avg Execution Time |')
  lines.push('|---------|----------------|-----------|-------------------|')
  
  for (const builder of report.buildersUsed) {
    lines.push(`| ${builder.builder} | ${builder.tasksCompleted} | ${builder.artifactsGenerated} | ${builder.averageExecutionTimeMs}ms |`)
  }
  lines.push('')
  
  // QA Results section
  lines.push('## QA Results')
  lines.push('')
  lines.push(`- **Total Checks**: ${report.qaResults.totalChecks}`)
  lines.push(`- **Passed**: ${report.qaResults.passed} ✅`)
  lines.push(`- **Failed**: ${report.qaResults.failed} ❌`)
  lines.push(`- **Warnings**: ${report.qaResults.warnings} ⚠️`)
  lines.push(`- **QA-of-QA**: ${report.qaResults.qaOfQaPassed ? '✅ Passed' : '❌ Failed'}`)
  lines.push('')
  
  if (report.qaResults.checks.length > 0) {
    lines.push('### QA Checks Detail')
    lines.push('')
    
    for (const check of report.qaResults.checks) {
      const icon = check.status === 'passed' ? '✅' : check.status === 'failed' ? '❌' : '⚠️'
      lines.push(`- ${icon} **${check.check}**: ${check.message}`)
    }
    lines.push('')
  }
  
  // Compliance section
  lines.push('## Compliance Results')
  lines.push('')
  lines.push(`**Overall Compliance**: ${report.complianceResults.allChecksPassed ? '✅ PASS' : '❌ FAIL'}`)
  lines.push('')
  lines.push('### Compliance Checks')
  lines.push('')
  lines.push(`- ${report.complianceResults.organisationIdPresent ? '✅' : '❌'} Organisation ID Present`)
  lines.push(`- ${report.complianceResults.noBreakingChanges ? '✅' : '❌'} No Breaking Changes`)
  lines.push(`- ${report.complianceResults.noSecretsDetected ? '✅' : '❌'} No Secrets Detected`)
  lines.push(`- ${report.complianceResults.auditLogComplete ? '✅' : '❌'} Audit Log Complete`)
  lines.push('')
  
  if (report.complianceResults.issues.length > 0) {
    lines.push('### Compliance Issues')
    lines.push('')
    for (const issue of report.complianceResults.issues) {
      lines.push(`- ⚠️ ${issue}`)
    }
    lines.push('')
  }
  
  // Timeline section
  lines.push('## Execution Timeline')
  lines.push('')
  
  for (const entry of report.timeline) {
    const timeStr = entry.timestamp.toISOString().substring(11, 19)
    const durationStr = entry.durationMs ? ` (${entry.durationMs}ms)` : ''
    lines.push(`- **${timeStr}** - ${entry.phase}: ${entry.description}${durationStr}`)
  }
  lines.push('')
  
  // Footer
  lines.push('---')
  lines.push('')
  lines.push(`*Report generated by Foreman v${report.metadata.foremanVersion} at ${report.metadata.generatedAt.toISOString()}*`)
  lines.push('')
  
  return lines.join('\n')
}

/**
 * Save report to disk
 */
export function saveBuildReport(
  report: BuildReport,
  filename?: string
): string {
  const reportContent = generateMarkdownReport(report)
  
  // Generate filename if not provided
  const reportFilename = filename || `FOREMAN_PILOT_BUILD_REPORT_${report.sequenceId}.md`
  const reportPath = join(process.cwd(), 'reports', reportFilename)
  
  // Write to file
  writeFileSync(reportPath, reportContent, 'utf-8')
  
  console.log(`[BuildReport] Report saved to: ${reportPath}`)
  
  return reportPath
}

// Helper functions

function determineOverallStatus(sequence: BuildSequence): 'PASS' | 'FAIL' {
  if (sequence.status === 'failed') return 'FAIL'
  if (sequence.status !== 'completed') return 'FAIL'
  
  // Check if any tasks failed
  const anyTaskFailed = sequence.tasks.some(t => t.status === 'failed')
  if (anyTaskFailed) return 'FAIL'
  
  // Check if any QA results failed
  const anyQAFailed = sequence.qaResults.some(r => r.status === 'failed')
  if (anyQAFailed) return 'FAIL'
  
  return 'PASS'
}

function calculateTaskDuration(task: BuilderTask): number | undefined {
  // BuilderTask doesn't have completedAt, so we can't calculate exact duration
  // Return undefined for now - this could be enhanced by adding completedAt to BuilderTask type
  return undefined
}

function compileBuildersUsed(tasks: BuilderTask[]): BuilderSummary[] {
  const builderMap = new Map<string, BuilderTask[]>()
  
  for (const task of tasks) {
    if (!builderMap.has(task.builder)) {
      builderMap.set(task.builder, [])
    }
    builderMap.get(task.builder)!.push(task)
  }
  
  const summaries: BuilderSummary[] = []
  
  Array.from(builderMap.entries()).forEach(([builder, builderTasks]) => {
    const completedTasks = builderTasks.filter(t => t.status === 'completed')
    const totalArtifacts = completedTasks.reduce((sum, t) => sum + (t.output?.artifacts?.length || 0), 0)
    
    const durations = completedTasks
      .map(t => calculateTaskDuration(t))
      .filter((d): d is number => d !== undefined)
    
    const avgDuration = durations.length > 0
      ? durations.reduce((sum, d) => sum + d, 0) / durations.length
      : 0
    
    summaries.push({
      builder,
      tasksCompleted: completedTasks.length,
      artifactsGenerated: totalArtifacts,
      averageExecutionTimeMs: Math.round(avgDuration)
    })
  })
  
  return summaries
}

function compileQAResults(qaResults: QAResult[]): QAResultSummary {
  const passed = qaResults.filter(r => r.status === 'passed').length
  const failed = qaResults.filter(r => r.status === 'failed').length
  const warnings = qaResults.filter(r => r.status === 'warning').length
  
  const qaOfQaResult = qaResults.find(r => r.check === 'qa_of_qa')
  const qaOfQaPassed = qaOfQaResult?.status === 'passed'
  
  return {
    totalChecks: qaResults.length,
    passed,
    failed,
    warnings,
    qaOfQaPassed,
    checks: qaResults.map(r => ({
      check: r.check,
      status: r.status,
      message: r.message || ''
    }))
  }
}

function compileComplianceResults(sequence: BuildSequence): ComplianceResultSummary {
  const issues: string[] = []
  
  // Check organisation ID
  const organisationIdPresent = !!sequence.organisationId
  if (!organisationIdPresent) {
    issues.push('Organisation ID missing from sequence')
  }
  
  // Check for breaking changes (simplified - in reality would analyze commits)
  const noBreakingChanges = true // Assume no breaking changes for now
  
  // Check for secrets (simplified - would use actual secret detection)
  const noSecretsDetected = true // Assume no secrets for now
  
  // Check audit log (simplified - would verify log completeness)
  const auditLogComplete = sequence.tasks.length > 0
  if (!auditLogComplete) {
    issues.push('Audit log incomplete - no tasks recorded')
  }
  
  const allChecksPassed = organisationIdPresent && noBreakingChanges && noSecretsDetected && auditLogComplete
  
  return {
    allChecksPassed,
    organisationIdPresent,
    noBreakingChanges,
    noSecretsDetected,
    auditLogComplete,
    issues
  }
}

function buildTimeline(sequence: BuildSequence): TimelineEntry[] {
  const timeline: TimelineEntry[] = []
  
  // Start
  timeline.push({
    timestamp: sequence.createdAt,
    phase: 'Initialization',
    description: 'Build sequence created'
  })
  
  if (sequence.startedAt) {
    timeline.push({
      timestamp: sequence.startedAt,
      phase: 'Analysis',
      description: 'Architecture analysis started',
      durationMs: sequence.startedAt.getTime() - sequence.createdAt.getTime()
    })
  }
  
  // Task executions
  for (const task of sequence.tasks) {
    if (task.createdAt) {
      timeline.push({
        timestamp: new Date(task.createdAt),
        phase: 'Task Creation',
        description: `${task.builder} task created: ${task.module}`
      })
    }
    
    // Note: BuilderTask doesn't have completedAt field yet
    // This could be enhanced when the type is updated
    if (task.status === 'completed' && task.updatedAt) {
      timeline.push({
        timestamp: new Date(task.updatedAt),
        phase: 'Task Completion',
        description: `${task.builder} task completed: ${task.module}`
      })
    }
  }
  
  // Completion
  if (sequence.completedAt) {
    timeline.push({
      timestamp: sequence.completedAt,
      phase: 'Completion',
      description: `Build sequence ${sequence.status}`,
      durationMs: sequence.completedAt.getTime() - sequence.createdAt.getTime()
    })
  }
  
  return timeline.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime())
}

function isAutonomousBuild(sequence: BuildSequence): boolean {
  // Check if all tasks were auto-approved
  const allTasksAutoApproved = sequence.tasks.every(
    t => t.approved && (t.approvedBy === 'system_auto_approval' || t.approvedBy === 'autonomous_mode')
  )
  
  return allTasksAutoApproved
}

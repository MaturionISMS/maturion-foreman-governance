/**
 * Dashboard Response Formatter
 * Formats dashboard data into human-readable text for chat responses
 */

import type { 
  DashboardResponse, 
  ProjectDashboardData, 
  ProjectDetailView,
  DashboardStatus,
  MilestoneStatus,
  DashboardBlocker,
  PhaseTimeline,
  DeploymentReadiness,
  SCurvePoint,
  MemorySnapshot
} from '@/types/project'

/**
 * Format a complete dashboard response for a specific project
 */
export function formatProjectDashboard(dashboard: DashboardResponse): string {
  const sections: string[] = []

  // Header
  sections.push(`# 📊 Dashboard: ${dashboard.projectName}`)
  sections.push('')

  // Status Overview
  sections.push(formatStatusSection(dashboard))
  sections.push('')

  // Progress
  sections.push(formatProgressSection(dashboard))
  sections.push('')

  // Milestones
  sections.push(formatMilestonesSection(dashboard.milestones))
  sections.push('')

  // Blockers (if any)
  if (dashboard.blockers.length > 0) {
    sections.push(formatBlockersSection(dashboard.blockers))
    sections.push('')
  }

  // Phase Timeline
  sections.push(formatPhaseTimelineSection(dashboard.phaseTimeline))
  sections.push('')

  // Deployment Readiness
  sections.push(formatDeploymentReadinessSection(dashboard.deploymentReadiness))
  sections.push('')

  // S-Curve Summary
  if (dashboard.sCurveData.length > 0) {
    sections.push(formatSCurveSummary(dashboard.sCurveData))
    sections.push('')
  }

  // Memory Snapshots (if any)
  if (dashboard.memorySnapshots.length > 0) {
    sections.push(formatMemorySnapshotsSection(dashboard.memorySnapshots))
    sections.push('')
  }

  sections.push(`_Last updated: ${new Date(dashboard.lastUpdated).toLocaleString()}_`)

  return sections.join('\n')
}

/**
 * Format dashboard overview (all projects)
 */
export function formatDashboardOverview(data: ProjectDashboardData): string {
  const sections: string[] = []

  // Header
  sections.push('# 📊 Project Dashboard Overview')
  sections.push('')

  // Summary Stats
  sections.push('## Summary')
  sections.push(`- **Total Projects**: ${data.totalProjects}`)
  sections.push(`- **Active Projects**: ${data.activeProjects.length}`)
  sections.push(`- **Overall Progress**: ${data.overallProgress}%`)
  sections.push(`- **Blocked Projects**: ${data.blockedProjects.length}`)
  sections.push('')

  // Projects by Phase
  sections.push('## Projects by Phase')
  const phases = Object.entries(data.projectsByPhase)
  if (phases.length > 0) {
    phases.forEach(([phase, count]) => {
      sections.push(`- **${formatPhase(phase)}**: ${count} project(s)`)
    })
  } else {
    sections.push('_No projects in any phase_')
  }
  sections.push('')

  // Projects by Status
  sections.push('## Projects by Status')
  const statuses = Object.entries(data.projectsByStatus)
  if (statuses.length > 0) {
    statuses.forEach(([status, count]) => {
      sections.push(`- **${formatStatus(status)}**: ${count} project(s)`)
    })
  } else {
    sections.push('_No status data available_')
  }
  sections.push('')

  // Active Projects
  if (data.activeProjects.length > 0) {
    sections.push('## Active Projects')
    data.activeProjects.forEach(project => {
      const statusIcon = getStatusIcon(project.status)
      sections.push(`- ${statusIcon} **${project.name}** (${project.phase}) - ${project.progressPercentage}% complete`)
    })
    sections.push('')
  }

  // Blocked Projects
  if (data.blockedProjects.length > 0) {
    sections.push('## 🚫 Blocked Projects')
    data.blockedProjects.forEach(project => {
      const blockerCount = project.blockers?.filter(b => !b.resolvedAt).length || 0
      sections.push(`- **${project.name}** - ${blockerCount} active blocker(s)`)
    })
    sections.push('')
  }

  // Recent Completions
  if (data.recentCompletions.length > 0) {
    sections.push('## ✅ Recent Milestone Completions')
    data.recentCompletions.slice(0, 5).forEach(milestone => {
      sections.push(`- **${milestone.name}** - ${new Date(milestone.completedAt!).toLocaleDateString()}`)
    })
    sections.push('')
  }

  return sections.join('\n')
}

/**
 * Format project detail view
 */
export function formatProjectDetail(detail: ProjectDetailView): string {
  const sections: string[] = []

  const project = detail.project

  // Header
  sections.push(`# 📊 ${project.name}`)
  sections.push('')
  sections.push(project.description)
  sections.push('')

  // Key Info
  sections.push('## Project Information')
  sections.push(`- **Owner**: ${project.owner}`)
  sections.push(`- **Phase**: ${formatPhase(project.phase)}`)
  sections.push(`- **Status**: ${getStatusIcon(project.status)} ${formatStatus(project.status)}`)
  sections.push(`- **Progress**: ${project.progressPercentage}%`)
  if (project.priority) {
    sections.push(`- **Priority**: ${formatPriority(project.priority)}`)
  }
  if (project.estimatedCompletion) {
    sections.push(`- **Estimated Completion**: ${new Date(project.estimatedCompletion).toLocaleDateString()}`)
  }
  sections.push('')

  // Next Milestone
  if (detail.nextMilestone) {
    sections.push('## 🎯 Next Milestone')
    sections.push(`**${detail.nextMilestone.name}** (${formatPhase(detail.nextMilestone.phase)})`)
    sections.push(`- Criteria: ${detail.nextMilestone.completionCriteria}`)
    if (detail.nextMilestone.dependencies && detail.nextMilestone.dependencies.length > 0) {
      sections.push(`- Dependencies: ${detail.nextMilestone.dependencies.join(', ')}`)
    }
    sections.push('')
  }

  // Current Blockers
  if (detail.currentBlockers.length > 0) {
    sections.push('## 🚫 Active Blockers')
    detail.currentBlockers.forEach(blocker => {
      sections.push(`- **${getSeverityIcon(blocker.severity)} ${blocker.description}**`)
      sections.push(`  - Severity: ${blocker.severity}`)
      if (blocker.resolvedBy) {
        sections.push(`  - Owner: ${blocker.resolvedBy}`)
      }
      sections.push(`  - Created: ${new Date(blocker.createdAt).toLocaleDateString()}`)
    })
    sections.push('')
  }

  // Progress by Phase
  sections.push('## Phase Progress')
  Object.entries(detail.progressByPhase).forEach(([phase, progress]) => {
    if (progress > 0) {
      sections.push(`- **${formatPhase(phase)}**: ${progress}%`)
    }
  })
  sections.push('')

  // Recent Activity
  if (detail.recentActivity.length > 0) {
    sections.push('## 📅 Recent Activity')
    detail.recentActivity.slice(0, 5).forEach(activity => {
      sections.push(`- ${getActivityIcon(activity.type)} **${activity.description}** - ${new Date(activity.timestamp).toLocaleDateString()} by ${activity.actor}`)
    })
    sections.push('')
  }

  return sections.join('\n')
}

/**
 * Format blockers summary
 */
export function formatBlockersSummary(blockers: DashboardBlocker[]): string {
  const sections: string[] = []

  const activeBlockers = blockers.filter(b => !b.resolvedAt)
  const resolvedBlockers = blockers.filter(b => b.resolvedAt)

  sections.push('## 🚫 Blockers Summary')
  sections.push('')
  sections.push(`**Active**: ${activeBlockers.length} | **Resolved**: ${resolvedBlockers.length}`)
  sections.push('')

  if (activeBlockers.length > 0) {
    // Group by severity
    const critical = activeBlockers.filter(b => b.severity === 'critical')
    const high = activeBlockers.filter(b => b.severity === 'high')
    const medium = activeBlockers.filter(b => b.severity === 'medium')
    const low = activeBlockers.filter(b => b.severity === 'low')

    if (critical.length > 0) {
      sections.push('### 🔴 Critical Blockers')
      critical.forEach(b => {
        sections.push(`- **${b.description}**`)
        sections.push(`  - Action: ${b.requiredAction}`)
        if (b.owner) sections.push(`  - Owner: ${b.owner}`)
      })
      sections.push('')
    }

    if (high.length > 0) {
      sections.push('### 🟠 High Priority Blockers')
      high.forEach(b => {
        sections.push(`- **${b.description}**`)
        sections.push(`  - Action: ${b.requiredAction}`)
        if (b.owner) sections.push(`  - Owner: ${b.owner}`)
      })
      sections.push('')
    }

    if (medium.length > 0) {
      sections.push('### 🟡 Medium Priority Blockers')
      medium.forEach(b => {
        sections.push(`- ${b.description}`)
      })
      sections.push('')
    }

    if (low.length > 0) {
      sections.push('### ⚪ Low Priority Blockers')
      low.forEach(b => {
        sections.push(`- ${b.description}`)
      })
      sections.push('')
    }
  } else {
    sections.push('✅ No active blockers')
    sections.push('')
  }

  return sections.join('\n')
}

// ============================================================================
// Helper Formatting Functions
// ============================================================================

function formatStatusSection(dashboard: DashboardResponse): string {
  const lines: string[] = []
  
  lines.push('## Status')
  const icon = getDashboardStatusIcon(dashboard.status)
  lines.push(`**${icon} ${formatDashboardStatus(dashboard.status)}**`)
  
  if (dashboard.statusNote) {
    lines.push('')
    lines.push(`_${dashboard.statusNote}_`)
  }

  return lines.join('\n')
}

function formatProgressSection(dashboard: DashboardResponse): string {
  const lines: string[] = []
  
  lines.push('## Overall Progress')
  lines.push(`**${dashboard.overallProgress}%** complete`)
  lines.push('')
  
  lines.push('### By Phase')
  Object.entries(dashboard.phaseProgress).forEach(([phase, progress]) => {
    if (progress > 0) {
      const bar = createProgressBar(progress)
      lines.push(`- **${formatPhase(phase)}**: ${bar} ${progress}%`)
    }
  })

  return lines.join('\n')
}

function formatMilestonesSection(milestones: MilestoneStatus[]): string {
  const lines: string[] = []
  
  lines.push('## Milestones')
  
  const completed = milestones.filter(m => m.status === 'completed')
  const inProgress = milestones.filter(m => m.status === 'in_progress')
  const pending = milestones.filter(m => m.status === 'pending')
  const blocked = milestones.filter(m => m.status === 'blocked')
  
  lines.push(`**Completed**: ${completed.length} | **In Progress**: ${inProgress.length} | **Pending**: ${pending.length} | **Blocked**: ${blocked.length}`)
  lines.push('')
  
  if (inProgress.length > 0) {
    lines.push('### 🔄 In Progress')
    inProgress.forEach(m => {
      lines.push(`- **${m.name}** (${formatPhase(m.phase)})`)
      if (m.blockers.length > 0) {
        lines.push(`  - ⚠️ ${m.blockers.length} blocker(s)`)
      }
    })
    lines.push('')
  }
  
  if (blocked.length > 0) {
    lines.push('### 🚫 Blocked')
    blocked.forEach(m => {
      lines.push(`- **${m.name}** (${formatPhase(m.phase)})`)
      lines.push(`  - ${m.blockers.length} blocker(s)`)
    })
    lines.push('')
  }

  return lines.join('\n')
}

function formatBlockersSection(blockers: DashboardBlocker[]): string {
  const activeBlockers = blockers.filter(b => !b.resolvedAt)
  
  if (activeBlockers.length === 0) {
    return '## Blockers\n\n✅ No active blockers'
  }
  
  return formatBlockersSummary(blockers)
}

function formatPhaseTimelineSection(timeline: PhaseTimeline[]): string {
  const lines: string[] = []
  
  lines.push('## Phase Timeline')
  
  timeline.forEach(phase => {
    const icon = getPhaseStatusIcon(phase.status)
    lines.push(`- ${icon} **${formatPhase(phase.phase)}**: ${formatPhaseStatus(phase.status)}`)
    
    if (phase.driftPercentage && phase.driftPercentage !== 0) {
      const driftIcon = phase.driftPercentage > 0 ? '⏰' : '⚡'
      lines.push(`  - ${driftIcon} Drift: ${phase.driftPercentage > 0 ? '+' : ''}${phase.driftPercentage}%`)
    }
    
    if (phase.actualStart) {
      lines.push(`  - Started: ${new Date(phase.actualStart).toLocaleDateString()}`)
    }
    
    if (phase.actualEnd) {
      lines.push(`  - Completed: ${new Date(phase.actualEnd).toLocaleDateString()}`)
    }
  })

  return lines.join('\n')
}

function formatDeploymentReadinessSection(readiness: DeploymentReadiness): string {
  const lines: string[] = []
  
  lines.push('## Deployment Readiness')
  
  const icon = getDeploymentReadinessIcon(readiness.overall)
  lines.push(`**${icon} ${formatDeploymentReadiness(readiness.overall)}**`)
  
  if (readiness.note) {
    lines.push('')
    lines.push(`_${readiness.note}_`)
  }
  
  lines.push('')
  lines.push('### Checks')
  lines.push(`- **QA**: ${getCheckStatusIcon(readiness.qaStatus.status)} ${readiness.qaStatus.status}`)
  if (readiness.qaStatus.details) {
    lines.push(`  - ${readiness.qaStatus.details}`)
  }
  
  lines.push(`- **Security**: ${getCheckStatusIcon(readiness.securityStatus.status)} ${readiness.securityStatus.status}`)
  if (readiness.securityStatus.details) {
    lines.push(`  - ${readiness.securityStatus.details}`)
  }
  
  lines.push(`- **Environment**: ${getCheckStatusIcon(readiness.environmentStatus.status)} ${readiness.environmentStatus.status}`)
  if (readiness.environmentStatus.details) {
    lines.push(`  - ${readiness.environmentStatus.details}`)
  }
  
  if (readiness.lastDeployment) {
    lines.push('')
    lines.push('### Last Deployment')
    lines.push(`- **Environment**: ${readiness.lastDeployment.environment}`)
    lines.push(`- **Status**: ${readiness.lastDeployment.status}`)
    lines.push(`- **Date**: ${new Date(readiness.lastDeployment.deployedAt).toLocaleDateString()}`)
  }

  return lines.join('\n')
}

function formatSCurveSummary(sCurveData: SCurvePoint[]): string {
  const lines: string[] = []
  
  lines.push('## S-Curve Progress')
  
  const latest = sCurveData[sCurveData.length - 1]
  const variance = latest.actualProgress - latest.plannedProgress
  
  lines.push(`**Current**: ${latest.actualProgress}% (Planned: ${latest.plannedProgress}%)`)
  
  if (variance > 0) {
    lines.push(`**Status**: ⚡ Ahead of plan by ${variance}%`)
  } else if (variance < 0) {
    lines.push(`**Status**: ⏰ Behind plan by ${Math.abs(variance)}%`)
  } else {
    lines.push(`**Status**: ✅ On track`)
  }
  
  lines.push('')
  lines.push(`_Showing ${sCurveData.length} data points from ${sCurveData[0].date} to ${latest.date}_`)

  return lines.join('\n')
}

function formatMemorySnapshotsSection(snapshots: MemorySnapshot[]): string {
  const lines: string[] = []
  
  lines.push('## 🧠 Memory Snapshots')
  lines.push('')
  
  if (snapshots.length === 0) {
    lines.push('_No memory snapshots available (Memory Fabric Phase 1)_')
  } else {
    snapshots.slice(0, 5).forEach(snapshot => {
      const icon = snapshot.relevance === 'high' ? '🔴' : snapshot.relevance === 'medium' ? '🟡' : '⚪'
      lines.push(`- ${icon} **${snapshot.key}**: ${snapshot.summary}`)
      lines.push(`  - Scope: ${snapshot.scope} | ${new Date(snapshot.timestamp).toLocaleDateString()}`)
    })
  }

  return lines.join('\n')
}

// ============================================================================
// Icon and Label Helpers
// ============================================================================

function getDashboardStatusIcon(status: DashboardStatus): string {
  switch (status) {
    case 'on_track': return '✅'
    case 'at_risk': return '⚠️'
    case 'blocked': return '🚫'
    case 'critical': return '🔴'
    default: return '❓'
  }
}

function formatDashboardStatus(status: DashboardStatus): string {
  return status.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
}

function getStatusIcon(status: string): string {
  switch (status) {
    case 'active': return '🟢'
    case 'paused': return '⏸️'
    case 'blocked': return '🚫'
    case 'cancelled': return '❌'
    case 'completed': return '✅'
    case 'archived': return '📦'
    default: return '❓'
  }
}

function formatStatus(status: string): string {
  return status.charAt(0).toUpperCase() + status.slice(1)
}

function formatPhase(phase: string): string {
  return phase.charAt(0).toUpperCase() + phase.slice(1)
}

function formatPriority(priority: string): string {
  const icons: Record<string, string> = {
    critical: '🔴',
    high: '🟠',
    medium: '🟡',
    low: '🟢'
  }
  return `${icons[priority] || '❓'} ${priority.charAt(0).toUpperCase() + priority.slice(1)}`
}

function getSeverityIcon(severity: string): string {
  switch (severity) {
    case 'critical': return '🔴'
    case 'high': return '🟠'
    case 'medium': return '🟡'
    case 'low': return '🟢'
    default: return '❓'
  }
}

function getPhaseStatusIcon(status: string): string {
  switch (status) {
    case 'completed': return '✅'
    case 'in_progress': return '🔄'
    case 'not_started': return '⏳'
    case 'delayed': return '⏰'
    default: return '❓'
  }
}

function formatPhaseStatus(status: string): string {
  return status.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
}

function getDeploymentReadinessIcon(status: string): string {
  switch (status) {
    case 'ready': return '✅'
    case 'not_ready': return '🚫'
    case 'warning': return '⚠️'
    case 'unknown': return '❓'
    default: return '❓'
  }
}

function formatDeploymentReadiness(status: string): string {
  return status.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
}

function getCheckStatusIcon(status: string): string {
  switch (status) {
    case 'passed': return '✅'
    case 'failed': return '❌'
    case 'warning': return '⚠️'
    case 'pending': return '⏳'
    case 'not_applicable': return '➖'
    default: return '❓'
  }
}

function getActivityIcon(type: string): string {
  switch (type) {
    case 'milestone_complete': return '✅'
    case 'phase_transition': return '🔄'
    case 'build_complete': return '🏗️'
    case 'deployment': return '🚀'
    case 'blocker_added': return '🚫'
    case 'blocker_resolved': return '✅'
    default: return '📌'
  }
}

function createProgressBar(percentage: number, length: number = 10): string {
  const filled = Math.round((percentage / 100) * length)
  const empty = length - filled
  return `[${'█'.repeat(filled)}${'░'.repeat(empty)}]`
}

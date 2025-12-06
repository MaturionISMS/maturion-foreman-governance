/**
 * Dashboard Aggregation Layer
 * Consolidates project data into machine-readable dashboard objects
 */

import type {
  Project,
  DashboardResponse,
  DashboardStatus,
  MilestoneStatus,
  DashboardBlocker,
  PhaseTimeline,
  SCurvePoint,
  DeploymentReadiness,
  MemorySnapshot,
  ProjectPhase,
  Blocker
} from '@/types/project'

import { calculateWeightedProgress, getActiveBlockers } from './index'

// ============================================================================
// Memory Integration Stub (Phase 1)
// ============================================================================

/**
 * Placeholder for Unified Memory Fabric integration
 * Returns empty array until memory fabric is implemented
 */
export async function getProjectMemorySnapshot(projectId: string): Promise<MemorySnapshot[]> {
  // TODO: Integrate with Unified Memory Fabric when available
  // For now, return empty array to avoid breaking future integration
  return []
}

// ============================================================================
// Status Calculation
// ============================================================================

export interface StatusCalculationInputs {
  project: Project
  milestones: MilestoneStatus[]
  blockers: DashboardBlocker[]
  timeline: PhaseTimeline[]
  deployment: DeploymentReadiness
}

/**
 * Calculate project status based on governance rules
 * 
 * Status Rules:
 * - on_track: milestones >= planned, no critical blockers
 * - at_risk: 1+ medium/high blockers, drift < 20%
 * - blocked: any critical blocker, drift >= 20%
 * - critical: phase duration exceeded by > 40%, multiple milestone failures, failed last deployment QA
 */
export function calculateProjectStatus(inputs: StatusCalculationInputs): {
  status: DashboardStatus
  note?: string
} {
  const { project, blockers, timeline, deployment } = inputs

  // Check for critical conditions
  const criticalBlockers = blockers.filter(b => b.severity === 'critical' && !b.resolvedAt)
  const highSeverityBlockers = blockers.filter(
    b => (b.severity === 'high' || b.severity === 'critical') && !b.resolvedAt
  )

  // Calculate drift for current phase
  const currentPhaseTimeline = timeline.find(t => t.phase === project.phase)
  const drift = currentPhaseTimeline?.driftPercentage || 0

  // Check for multiple milestone failures
  const failedMilestones = project.milestones.filter(
    m => !m.completed && m.phase === project.phase
  )
  const currentPhaseMilestones = project.milestones.filter(m => m.phase === project.phase)
  const milestoneFailureRate = currentPhaseMilestones.length > 0
    ? failedMilestones.length / currentPhaseMilestones.length
    : 0

  // Critical status conditions
  if (drift > 40) {
    return {
      status: 'critical',
      note: `Phase duration exceeded by ${drift.toFixed(1)}%`
    }
  }

  if (milestoneFailureRate > 0.5 && currentPhaseMilestones.length >= 3) {
    return {
      status: 'critical',
      note: 'Multiple milestone failures detected'
    }
  }

  if (deployment.lastDeployment?.status === 'failed' && deployment.qaStatus.status === 'failed') {
    return {
      status: 'critical',
      note: 'Last deployment QA failed'
    }
  }

  // Blocked status conditions
  if (criticalBlockers.length > 0) {
    return {
      status: 'blocked',
      note: `${criticalBlockers.length} critical blocker(s) present`
    }
  }

  if (drift >= 20) {
    return {
      status: 'blocked',
      note: `Timeline drift ${drift.toFixed(1)}% exceeds threshold`
    }
  }

  // At-risk status conditions
  if (highSeverityBlockers.length > 0) {
    return {
      status: 'at_risk',
      note: `${highSeverityBlockers.length} high-severity blocker(s) detected`
    }
  }

  if (drift >= 10 && drift < 20) {
    return {
      status: 'at_risk',
      note: `Timeline drift ${drift.toFixed(1)}%`
    }
  }

  // On track - default status
  return {
    status: 'on_track'
  }
}

// ============================================================================
// Dashboard Aggregation
// ============================================================================

/**
 * Generate complete dashboard response for a project
 * Aggregates data from lifecycle, milestones, blockers, deployment, and memory
 */
export async function generateDashboardResponse(project: Project): Promise<DashboardResponse> {
  // Calculate progress
  const progress = calculateWeightedProgress(project)

  // Convert milestones to dashboard format
  const milestones = convertMilestonesToDashboard(project)

  // Convert blockers to dashboard format
  const blockers = convertBlockersToDashboard(project)

  // Generate phase timeline
  const phaseTimeline = generatePhaseTimeline(project)

  // Generate S-curve data
  const sCurveData = generateSCurveData(project)

  // Calculate deployment readiness
  const deploymentReadiness = calculateDeploymentReadiness(project)

  // Get memory snapshots (stub for now)
  const memorySnapshots = await getProjectMemorySnapshot(project.id)

  // Calculate status
  const statusCalc = calculateProjectStatus({
    project,
    milestones,
    blockers,
    timeline: phaseTimeline,
    deployment: deploymentReadiness
  })

  return {
    projectId: project.id,
    projectName: project.name,
    overallProgress: progress.overall,
    phaseProgress: progress.byPhase,
    status: statusCalc.status,
    statusNote: statusCalc.note,
    milestones,
    blockers,
    phaseTimeline,
    sCurveData,
    deploymentReadiness,
    memorySnapshots,
    lastUpdated: new Date().toISOString()
  }
}

// ============================================================================
// Helper Functions
// ============================================================================

function convertMilestonesToDashboard(project: Project): MilestoneStatus[] {
  return project.milestones.map(milestone => {
    // Determine milestone status
    let status: MilestoneStatus['status']
    const relatedBlockers: string[] = []

    if (milestone.completed) {
      status = 'completed'
    } else if (milestone.phase !== project.phase) {
      status = 'pending'
    } else {
      // Check if milestone is blocked by dependencies
      if (milestone.dependencies && milestone.dependencies.length > 0) {
        const dependenciesMet = milestone.dependencies.every(depId => {
          const dep = project.milestones.find(m => m.id === depId)
          return dep && dep.completed
        })
        if (!dependenciesMet) {
          status = 'blocked'
        } else {
          status = 'in_progress'
        }
      } else {
        status = 'in_progress'
      }
    }

    // Find related blockers
    // Note: This uses simple string matching as a heuristic
    // Future enhancement: Implement explicit blocker-milestone relationships
    if (project.blockers) {
      project.blockers.forEach(blocker => {
        if (!blocker.resolvedAt && blocker.description.toLowerCase().includes(milestone.name.toLowerCase())) {
          relatedBlockers.push(blocker.id)
        }
      })
    }

    // Find evidence (PR URL for PR-related milestones)
    let evidence: string | undefined
    const isPRMilestone = milestone.name.toLowerCase().includes('pr') || 
                          milestone.completionCriteria.toLowerCase().includes('pull request')
    
    if (isPRMilestone && project.builds.length > 0) {
      const lastBuild = project.builds[project.builds.length - 1]
      if (lastBuild?.prUrl) {
        evidence = lastBuild.prUrl
      }
    }

    return {
      id: milestone.id,
      name: milestone.name,
      phase: milestone.phase,
      weight: milestone.weight || 10,
      status,
      completedAt: milestone.completedAt,
      blockers: relatedBlockers,
      evidence
    }
  })
}

function convertBlockersToDashboard(project: Project): DashboardBlocker[] {
  if (!project.blockers) return []

  return project.blockers.map(blocker => ({
    id: blocker.id,
    description: blocker.description,
    severity: blocker.severity,
    owner: blocker.resolvedBy,
    requiredAction: determineRequiredAction(blocker),
    createdAt: blocker.createdAt,
    resolvedAt: blocker.resolvedAt
  }))
}

function determineRequiredAction(blocker: Blocker): string {
  if (blocker.resolvedAt) {
    return 'None - resolved'
  }

  switch (blocker.severity) {
    case 'critical':
      return 'Immediate escalation required'
    case 'high':
      return 'Review and resolve within 24 hours'
    case 'medium':
      return 'Address in current sprint'
    case 'low':
      return 'Track and resolve when convenient'
    default:
      return 'Review and determine action'
  }
}

function generatePhaseTimeline(project: Project): PhaseTimeline[] {
  const phases: ProjectPhase[] = ['concept', 'architecture', 'build', 'deployment', 'completed', 'archived']
  const timeline: PhaseTimeline[] = []

  for (const phase of phases) {
    const phaseMilestones = project.milestones.filter(m => m.phase === phase)
    
    if (phaseMilestones.length === 0 && phase !== project.phase) {
      continue // Skip phases with no milestones if not current
    }

    let status: PhaseTimeline['status']
    let actualStart: string | undefined
    let actualEnd: string | undefined

    const completedMilestones = phaseMilestones.filter(m => m.completed)
    
    if (phase === project.phase) {
      status = 'in_progress'
      // Find earliest completed milestone in this phase as start
      if (completedMilestones.length > 0) {
        const earliest = completedMilestones.reduce((min, m) => 
          (m.completedAt && (!min.completedAt || m.completedAt < min.completedAt)) ? m : min
        )
        actualStart = earliest.completedAt
      }
    } else if (phaseMilestones.every(m => m.completed)) {
      status = 'completed'
      if (completedMilestones.length > 0) {
        const earliest = completedMilestones.reduce((min, m) => 
          (m.completedAt && (!min.completedAt || m.completedAt < min.completedAt)) ? m : min
        )
        const latest = completedMilestones.reduce((max, m) => 
          (m.completedAt && (!max.completedAt || m.completedAt > max.completedAt)) ? m : max
        )
        actualStart = earliest.completedAt
        actualEnd = latest.completedAt
      }
    } else {
      const phaseIndex = phases.indexOf(phase)
      const currentIndex = phases.indexOf(project.phase)
      status = phaseIndex < currentIndex ? 'delayed' : 'not_started'
    }

    timeline.push({
      phase,
      actualStart,
      actualEnd,
      status,
      // Note: plannedStart, plannedEnd, and driftPercentage would require additional data
      // For now, we calculate drift as 0 or based on simple heuristics
      driftPercentage: 0
    })
  }

  return timeline
}

function generateSCurveData(project: Project): SCurvePoint[] {
  // Generate S-curve data points based on project timeline
  const points: SCurvePoint[] = []
  const createdDate = new Date(project.createdAt)
  const today = new Date()
  
  // Calculate total days since project start
  const totalDays = Math.floor((today.getTime() - createdDate.getTime()) / (1000 * 60 * 60 * 24))
  
  if (totalDays <= 0) {
    // Project just started
    return [{
      date: project.createdAt.split('T')[0],
      plannedProgress: 0,
      actualProgress: project.progressPercentage
    }]
  }

  // Generate planned S-curve (ideal cumulative progress)
  // Typical S-curve: slow start, rapid middle, slow end
  const generatePlannedProgress = (dayRatio: number): number => {
    // Use logistic function for S-curve shape
    const k = 10 // Steepness
    const x0 = 0.5 // Midpoint
    return Math.floor(100 / (1 + Math.exp(-k * (dayRatio - x0))))
  }

  // Sample data points (weekly intervals)
  const interval = Math.max(7, Math.floor(totalDays / 20)) // At most 20 points
  
  for (let day = 0; day <= totalDays; day += interval) {
    const pointDate = new Date(createdDate)
    pointDate.setDate(pointDate.getDate() + day)
    
    const dayRatio = day / Math.max(totalDays, 1)
    const plannedProgress = generatePlannedProgress(dayRatio)
    
    // For actual progress, we only have current value
    // Interpolate based on milestone completion dates
    const actualProgress = day === totalDays 
      ? project.progressPercentage 
      : interpolateActualProgress(project, pointDate)

    points.push({
      date: pointDate.toISOString().split('T')[0],
      plannedProgress,
      actualProgress
    })
  }

  // Always include today
  if (points[points.length - 1]?.date !== today.toISOString().split('T')[0]) {
    points.push({
      date: today.toISOString().split('T')[0],
      plannedProgress: generatePlannedProgress(1),
      actualProgress: project.progressPercentage
    })
  }

  return points
}

function interpolateActualProgress(project: Project, targetDate: Date): number {
  // Find completed milestones up to target date
  const completedByDate = project.milestones.filter(m => 
    m.completed && m.completedAt && new Date(m.completedAt) <= targetDate
  )

  if (completedByDate.length === 0) return 0

  // Calculate progress based on weighted milestones
  const totalWeight = project.milestones.reduce((sum, m) => sum + (m.weight || 10), 0)
  const completedWeight = completedByDate.reduce((sum, m) => sum + (m.weight || 10), 0)

  return totalWeight > 0 ? Math.floor((completedWeight / totalWeight) * 100) : 0
}

function calculateDeploymentReadiness(project: Project): DeploymentReadiness {
  // Check QA status
  const qaStatus = calculateQAStatus(project)

  // Check security status
  const securityStatus = calculateSecurityStatus(project)

  // Check environment status
  const environmentStatus = calculateEnvironmentStatus(project)

  // Get last deployment
  const lastDeployment = project.deployments && project.deployments.length > 0
    ? project.deployments[project.deployments.length - 1]
    : undefined

  // Determine overall readiness
  let overall: DeploymentReadiness['overall']
  let note: string | undefined

  if (
    qaStatus.status === 'passed' &&
    securityStatus.status === 'passed' &&
    environmentStatus.status === 'passed'
  ) {
    overall = 'ready'
  } else if (
    qaStatus.status === 'failed' ||
    securityStatus.status === 'failed' ||
    environmentStatus.status === 'failed'
  ) {
    overall = 'not_ready'
    note = 'Critical checks failed - deployment blocked'
  } else if (
    qaStatus.status === 'warning' ||
    securityStatus.status === 'warning' ||
    environmentStatus.status === 'warning'
  ) {
    overall = 'warning'
    note = 'Some checks have warnings - review before deployment'
  } else {
    overall = 'unknown'
    note = 'Deployment readiness evaluation partially implemented'
  }

  return {
    overall,
    qaStatus,
    securityStatus,
    environmentStatus,
    lastDeployment: lastDeployment ? {
      environment: lastDeployment.environment,
      deployedAt: lastDeployment.deployedAt,
      status: lastDeployment.status
    } : undefined,
    note
  }
}

function calculateQAStatus(project: Project): DeploymentReadiness['qaStatus'] {
  const qaValidationMilestone = project.milestones.find(m => m.id === 'm10')
  const complianceMilestone = project.milestones.find(m => m.id === 'm11')

  if (qaValidationMilestone?.completed && complianceMilestone?.completed) {
    return { status: 'passed', details: 'QA validation and compliance verified' }
  }

  if (project.phase === 'build' && !qaValidationMilestone?.completed) {
    return { status: 'pending', details: 'QA validation in progress' }
  }

  if (project.phase === 'concept' || project.phase === 'architecture') {
    return { status: 'not_applicable', details: 'QA not required for current phase' }
  }

  // Check if there are any failed QA builds
  const lastBuild = project.builds[project.builds.length - 1]
  if (lastBuild?.qaResults && !lastBuild.qaResults.passed) {
    return { status: 'failed', details: 'Last QA validation failed' }
  }

  return { status: 'pending', details: 'QA validation pending' }
}

function calculateSecurityStatus(project: Project): DeploymentReadiness['securityStatus'] {
  const complianceMilestone = project.milestones.find(m => m.id === 'm11')

  if (complianceMilestone?.completed) {
    return { status: 'passed', details: 'Compliance verified - no secrets detected' }
  }

  if (project.phase === 'concept' || project.phase === 'architecture') {
    return { status: 'not_applicable', details: 'Security check not required for current phase' }
  }

  return { status: 'pending', details: 'Security compliance pending verification' }
}

function calculateEnvironmentStatus(project: Project): DeploymentReadiness['environmentStatus'] {
  // Check if deployment phase
  if (project.phase === 'deployment') {
    const deploymentPlanMilestone = project.milestones.find(m => m.id === 'm14')
    if (deploymentPlanMilestone?.completed) {
      return { status: 'passed', details: 'Deployment plan created and environment ready' }
    }
    return { status: 'pending', details: 'Deployment plan pending' }
  }

  if (project.phase === 'completed' || project.phase === 'archived') {
    return { status: 'passed', details: 'Environment configuration completed' }
  }

  return { status: 'not_applicable', details: 'Environment check not required for current phase' }
}

// ============================================================================
// Specific Dashboard Views
// ============================================================================

/**
 * Get S-curve data only (for graphing endpoint)
 */
export async function getDashboardSCurve(project: Project): Promise<SCurvePoint[]> {
  return generateSCurveData(project)
}

/**
 * Get blockers only (for blockers endpoint)
 */
export async function getDashboardBlockers(project: Project): Promise<DashboardBlocker[]> {
  return convertBlockersToDashboard(project)
}

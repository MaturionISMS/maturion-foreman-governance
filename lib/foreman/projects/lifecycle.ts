/**
 * Lifecycle Module
 * Manages project lifecycle phase transitions: concept → architecture → build → deployment
 */

import type { Project, ProjectPhase, ProjectStatus } from '@/types/project'
import { markMilestoneComplete } from './milestones'

// ============================================================================
// Phase Transition Validation
// ============================================================================

interface TransitionValidation {
  allowed: boolean
  reason?: string
  prerequisites?: string[]
}

export function canTransitionToPhase(
  project: Project,
  targetPhase: ProjectPhase
): TransitionValidation {
  const currentPhase = project.phase
  
  // Already in target phase
  if (currentPhase === targetPhase) {
    return {
      allowed: false,
      reason: `Project is already in ${targetPhase} phase`
    }
  }
  
  // Define valid transitions (only valid ProjectPhase values)
  const validTransitions: Record<ProjectPhase, ProjectPhase[]> = {
    concept: ['architecture'],
    architecture: ['build', 'concept'],
    build: ['deployment', 'architecture'],
    deployment: ['completed', 'build'],
    completed: ['archived'],
    archived: []
  }
  
  const allowedPhases = validTransitions[currentPhase] || []
  
  if (!allowedPhases.includes(targetPhase)) {
    return {
      allowed: false,
      reason: `Cannot transition from ${currentPhase} to ${targetPhase}. Valid transitions: ${allowedPhases.join(', ')}`
    }
  }
  
  // Check prerequisites for forward transitions
  const prerequisites = getTransitionPrerequisites(currentPhase, targetPhase, project)
  
  if (prerequisites.length > 0) {
    return {
      allowed: false,
      reason: `Prerequisites not met for ${currentPhase} → ${targetPhase} transition`,
      prerequisites
    }
  }
  
  return { allowed: true }
}

function getTransitionPrerequisites(
  fromPhase: ProjectPhase,
  toPhase: ProjectPhase,
  project: Project
): string[] {
  const prerequisites: string[] = []
  
  // Note: cancelled and paused are statuses, not phases
  // Only validate forward phase transitions
  
  // Concept → Architecture
  if (fromPhase === 'concept' && toPhase === 'architecture') {
    const conceptApproved = project.milestones.find(m => m.id === 'm3')
    if (!conceptApproved?.completed) {
      prerequisites.push('Concept must be approved (milestone m3)')
    }
  }
  
  // Architecture → Build
  if (fromPhase === 'architecture' && toPhase === 'build') {
    const archComplete = project.milestones.find(m => m.id === 'm4')
    const modulesDefined = project.milestones.find(m => m.id === 'm5')
    const tasksPlanned = project.milestones.find(m => m.id === 'm6')
    
    if (!archComplete?.completed) {
      prerequisites.push('Architecture analysis must be complete (milestone m4)')
    }
    if (!modulesDefined?.completed) {
      prerequisites.push('Module breakdown must be defined (milestone m5)')
    }
    if (!tasksPlanned?.completed) {
      prerequisites.push('Build tasks must be planned (milestone m6)')
    }
  }
  
  // Build → Deployment
  if (fromPhase === 'build' && toPhase === 'deployment') {
    const qaPassed = project.milestones.find(m => m.id === 'm10')
    const complianceVerified = project.milestones.find(m => m.id === 'm11')
    const prMerged = project.milestones.find(m => m.id === 'm13')
    
    if (!qaPassed?.completed) {
      prerequisites.push('QA validation must pass (milestone m10)')
    }
    if (!complianceVerified?.completed) {
      prerequisites.push('Compliance must be verified (milestone m11)')
    }
    if (!prMerged?.completed) {
      prerequisites.push('PR must be merged to main (milestone m13)')
    }
  }
  
  // Deployment → Completed
  if (fromPhase === 'deployment' && toPhase === 'completed') {
    const deployed = project.milestones.find(m => m.id === 'm16')
    const testsPassed = project.milestones.find(m => m.id === 'm17')
    const monitoringActive = project.milestones.find(m => m.id === 'm18')
    
    if (!deployed?.completed) {
      prerequisites.push('Must be deployed to production (milestone m16)')
    }
    if (!testsPassed?.completed) {
      prerequisites.push('Post-deploy tests must pass (milestone m17)')
    }
    if (!monitoringActive?.completed) {
      prerequisites.push('Monitoring must be active (milestone m18)')
    }
  }
  
  return prerequisites
}

// ============================================================================
// Phase Transition
// ============================================================================

export interface PhaseTransitionResult {
  success: boolean
  previousPhase: ProjectPhase
  newPhase: ProjectPhase
  error?: string
  prerequisites?: string[]
  milestonesUpdated?: string[]
}

export function transitionToPhase(
  project: Project,
  targetPhase: ProjectPhase,
  actor: string = 'system'
): PhaseTransitionResult {
  const previousPhase = project.phase
  
  // Validate transition
  const validation = canTransitionToPhase(project, targetPhase)
  
  if (!validation.allowed) {
    return {
      success: false,
      previousPhase,
      newPhase: previousPhase,
      error: validation.reason,
      prerequisites: validation.prerequisites
    }
  }
  
  // Perform transition
  project.phase = targetPhase
  project.updatedAt = new Date().toISOString()
  
  // Auto-complete phase entry milestones
  const milestonesUpdated: string[] = []
  
  if (targetPhase === 'concept') {
    // Mark "Project Registered" complete
    if (markMilestoneComplete(project, 'm1', actor)) {
      milestonesUpdated.push('m1: Project Registered')
    }
  }
  
  console.info(`[Lifecycle] Project ${project.id} transitioned: ${previousPhase} → ${targetPhase} (by ${actor})`)
  
  return {
    success: true,
    previousPhase,
    newPhase: targetPhase,
    milestonesUpdated
  }
}

// ============================================================================
// Phase Operations
// ============================================================================

export function startConceptPhase(project: Project, actor: string = 'system'): PhaseTransitionResult {
  return transitionToPhase(project, 'concept', actor)
}

export function startArchitecturePhase(project: Project, actor: string = 'system'): PhaseTransitionResult {
  return transitionToPhase(project, 'architecture', actor)
}

export function startBuildPhase(project: Project, actor: string = 'system'): PhaseTransitionResult {
  return transitionToPhase(project, 'build', actor)
}

export function startDeploymentPhase(project: Project, actor: string = 'system'): PhaseTransitionResult {
  return transitionToPhase(project, 'deployment', actor)
}

export function completeProject(project: Project, actor: string = 'system'): PhaseTransitionResult {
  return transitionToPhase(project, 'completed', actor)
}

export function pauseProject(project: Project, reason?: string): void {
  project.status = 'paused'
  project.updatedAt = new Date().toISOString()
  
  console.info(`[Lifecycle] Project ${project.id} paused${reason ? `: ${reason}` : ''}`)
}

export function resumeProject(project: Project): void {
  if (project.status === 'paused') {
    project.status = 'active'
    project.updatedAt = new Date().toISOString()
    
    console.info(`[Lifecycle] Project ${project.id} resumed`)
  }
}

export function cancelProject(project: Project, reason?: string): void {
  project.status = 'cancelled'
  project.updatedAt = new Date().toISOString()
  
  console.info(`[Lifecycle] Project ${project.id} cancelled${reason ? `: ${reason}` : ''}`)
}

export function blockProject(project: Project, blockerDescription: string): void {
  project.status = 'blocked'
  project.updatedAt = new Date().toISOString()
  
  // Add blocker if not already present
  if (!project.blockers) {
    project.blockers = []
  }
  
  const blockerId = `blocker_${Date.now()}`
  project.blockers.push({
    id: blockerId,
    description: blockerDescription,
    category: 'technical',
    severity: 'medium',
    createdAt: new Date().toISOString()
  })
  
  console.warn(`[Lifecycle] Project ${project.id} blocked: ${blockerDescription}`)
}

export function unblockProject(project: Project, blockerId: string, resolution: string): void {
  if (!project.blockers) {
    return
  }
  
  const blocker = project.blockers.find(b => b.id === blockerId)
  
  if (blocker) {
    blocker.resolvedAt = new Date().toISOString()
    blocker.resolution = resolution
    blocker.resolvedBy = 'system'
    
    // If all blockers resolved, set status back to active
    const unresolvedBlockers = project.blockers.filter(b => !b.resolvedAt)
    if (unresolvedBlockers.length === 0) {
      project.status = 'active'
    }
    
    project.updatedAt = new Date().toISOString()
    
    console.info(`[Lifecycle] Project ${project.id} blocker resolved: ${blockerId}`)
  }
}

// ============================================================================
// Phase Utilities
// ============================================================================

export function getCurrentPhaseNumber(project: Project): number {
  const phaseOrder: ProjectPhase[] = ['concept', 'architecture', 'build', 'deployment', 'completed', 'archived']
  return phaseOrder.indexOf(project.phase) + 1
}

export function getPhaseDisplayName(phase: ProjectPhase): string {
  const names: Record<ProjectPhase, string> = {
    concept: 'Phase 1: Concept Capture',
    architecture: 'Phase 2: Architecture & QA',
    build: 'Phase 3: Build Waves',
    deployment: 'Phase 4: Deployment & Validation',
    completed: 'Completed',
    archived: 'Archived'
  }
  return names[phase] || phase
}

export function isPhaseComplete(project: Project, phase: ProjectPhase): boolean {
  const phaseMilestones = project.milestones.filter(m => m.phase === phase)
  if (phaseMilestones.length === 0) return false
  
  return phaseMilestones.every(m => m.completed)
}

export function getActiveBlockers(project: Project): typeof project.blockers {
  if (!project.blockers) return []
  return project.blockers.filter(b => !b.resolvedAt)
}

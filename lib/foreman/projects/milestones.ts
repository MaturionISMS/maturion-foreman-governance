/**
 * Milestones Module
 * Handles milestone tracking and progress calculation
 */

import type { Project, Milestone, ProjectPhase, ProgressCalculation } from '@/types/project'

// ============================================================================
// Default Milestones
// ============================================================================

export function getDefaultMilestones(): Milestone[] {
  return [
    // Concept Phase Milestones
    {
      id: 'm1',
      name: 'Project Registered',
      phase: 'concept',
      completionCriteria: 'Project exists in registry with unique ID',
      weight: 10,
      completed: false,
      custom: false
    },
    {
      id: 'm2',
      name: 'Requirements Defined',
      phase: 'concept',
      completionCriteria: 'Project description and scope documented',
      weight: 20,
      completed: false,
      custom: false
    },
    {
      id: 'm3',
      name: 'Concept Approved',
      phase: 'concept',
      completionCriteria: 'Stakeholder approval recorded',
      weight: 70,
      completed: false,
      custom: false
    },
    
    // Architecture Phase Milestones
    {
      id: 'm4',
      name: 'Architecture Analysis Complete',
      phase: 'architecture',
      completionCriteria: 'Architecture gaps identified and documented',
      weight: 30,
      completed: false,
      custom: false
    },
    {
      id: 'm5',
      name: 'Module Breakdown Defined',
      phase: 'architecture',
      completionCriteria: 'Modules and components specified',
      weight: 30,
      completed: false,
      custom: false
    },
    {
      id: 'm6',
      name: 'Build Tasks Planned',
      phase: 'architecture',
      completionCriteria: 'Builder tasks generated and approved',
      weight: 30,
      completed: false,
      custom: false
    },
    {
      id: 'm7',
      name: 'QA Strategy Defined',
      phase: 'architecture',
      completionCriteria: 'QA requirements and test plan documented',
      weight: 10,
      completed: false,
      custom: false
    },
    
    // Build Phase Milestones
    {
      id: 'm8',
      name: 'Builder Tasks Created',
      phase: 'build',
      completionCriteria: 'All tasks dispatched to builders',
      weight: 10,
      completed: false,
      custom: false
    },
    {
      id: 'm9',
      name: 'Builder Tasks Executed',
      phase: 'build',
      completionCriteria: 'All builder tasks completed successfully',
      weight: 30,
      completed: false,
      custom: false,
      dependencies: ['m8']
    },
    {
      id: 'm10',
      name: 'QA Validation Passed',
      phase: 'build',
      completionCriteria: 'QA and QA-of-QA checks pass',
      weight: 30,
      completed: false,
      custom: false,
      dependencies: ['m9']
    },
    {
      id: 'm11',
      name: 'Compliance Verified',
      phase: 'build',
      completionCriteria: 'No secrets, audit logs complete, org ID present',
      weight: 10,
      completed: false,
      custom: false,
      dependencies: ['m9']
    },
    {
      id: 'm12',
      name: 'PR Created',
      phase: 'build',
      completionCriteria: 'Pull request created with all artifacts',
      weight: 10,
      completed: false,
      custom: false,
      dependencies: ['m10', 'm11']
    },
    {
      id: 'm13',
      name: 'PR Reviewed and Merged',
      phase: 'build',
      completionCriteria: 'PR approved and merged to main branch',
      weight: 10,
      completed: false,
      custom: false,
      dependencies: ['m12']
    },
    
    // Deployment Phase Milestones
    {
      id: 'm14',
      name: 'Deployment Plan Created',
      phase: 'deployment',
      completionCriteria: 'Deployment checklist and plan documented',
      weight: 20,
      completed: false,
      custom: false
    },
    {
      id: 'm15',
      name: 'Deployment Approved',
      phase: 'deployment',
      completionCriteria: 'Admin approves deployment to production',
      weight: 20,
      completed: false,
      custom: false,
      dependencies: ['m14']
    },
    {
      id: 'm16',
      name: 'Deployed to Production',
      phase: 'deployment',
      completionCriteria: 'Code deployed and services running',
      weight: 30,
      completed: false,
      custom: false,
      dependencies: ['m15']
    },
    {
      id: 'm17',
      name: 'Post-Deploy Tests Passed',
      phase: 'deployment',
      completionCriteria: 'Smoke tests and health checks pass',
      weight: 20,
      completed: false,
      custom: false,
      dependencies: ['m16']
    },
    {
      id: 'm18',
      name: 'Monitoring Active',
      phase: 'deployment',
      completionCriteria: 'Application monitoring and alerts configured',
      weight: 10,
      completed: false,
      custom: false,
      dependencies: ['m16']
    }
  ]
}

// ============================================================================
// Progress Calculation
// ============================================================================

export function calculateProgress(project: Project): ProgressCalculation {
  const milestones = project.milestones
  const totalMilestones = milestones.length
  const completedMilestones = milestones.filter(m => m.completed).length
  
  // Calculate overall progress
  const overall = totalMilestones > 0 
    ? Math.floor((completedMilestones / totalMilestones) * 100)
    : 0
  
  // Calculate progress by phase
  const byPhase: Record<ProjectPhase, number> = {
    concept: calculatePhaseProgress(project, 'concept'),
    architecture: calculatePhaseProgress(project, 'architecture'),
    build: calculatePhaseProgress(project, 'build'),
    deployment: calculatePhaseProgress(project, 'deployment'),
    completed: 0,
    archived: 0
  }
  
  return {
    overall,
    byPhase,
    completedMilestones,
    totalMilestones
  }
}

export function calculateWeightedProgress(project: Project): ProgressCalculation {
  const milestones = project.milestones
  
  const totalWeight = milestones.reduce((sum, m) => sum + (m.weight || 10), 0)
  const completedWeight = milestones
    .filter(m => m.completed)
    .reduce((sum, m) => sum + (m.weight || 10), 0)
  
  const overall = totalWeight > 0
    ? Math.floor((completedWeight / totalWeight) * 100)
    : 0
  
  const byPhase: Record<ProjectPhase, number> = {
    concept: calculatePhaseWeightedProgress(project, 'concept'),
    architecture: calculatePhaseWeightedProgress(project, 'architecture'),
    build: calculatePhaseWeightedProgress(project, 'build'),
    deployment: calculatePhaseWeightedProgress(project, 'deployment'),
    completed: 0,
    archived: 0
  }
  
  return {
    overall,
    byPhase,
    completedMilestones: milestones.filter(m => m.completed).length,
    totalMilestones: milestones.length
  }
}

function calculatePhaseProgress(project: Project, phase: ProjectPhase): number {
  const phaseMilestones = project.milestones.filter(m => m.phase === phase)
  if (phaseMilestones.length === 0) return 0
  
  const completed = phaseMilestones.filter(m => m.completed).length
  return Math.floor((completed / phaseMilestones.length) * 100)
}

function calculatePhaseWeightedProgress(project: Project, phase: ProjectPhase): number {
  const phaseMilestones = project.milestones.filter(m => m.phase === phase)
  if (phaseMilestones.length === 0) return 0
  
  const totalWeight = phaseMilestones.reduce((sum, m) => sum + (m.weight || 10), 0)
  const completedWeight = phaseMilestones
    .filter(m => m.completed)
    .reduce((sum, m) => sum + (m.weight || 10), 0)
  
  return totalWeight > 0
    ? Math.floor((completedWeight / totalWeight) * 100)
    : 0
}

// ============================================================================
// Milestone Operations
// ============================================================================

export function markMilestoneComplete(
  project: Project,
  milestoneId: string,
  completedBy: string = 'system_auto'
): boolean {
  const milestone = project.milestones.find(m => m.id === milestoneId)
  
  if (!milestone) {
    console.warn(`[Milestones] Milestone not found: ${milestoneId}`)
    return false
  }
  
  if (milestone.completed) {
    console.info(`[Milestones] Milestone already complete: ${milestoneId}`)
    return false
  }
  
  // Check dependencies
  if (milestone.dependencies && milestone.dependencies.length > 0) {
    const dependenciesMet = milestone.dependencies.every(depId => {
      const dep = project.milestones.find(m => m.id === depId)
      return dep && dep.completed
    })
    
    if (!dependenciesMet) {
      console.warn(`[Milestones] Cannot complete ${milestoneId}: dependencies not met`)
      return false
    }
  }
  
  // Mark complete
  milestone.completed = true
  milestone.completedAt = new Date().toISOString()
  milestone.completedBy = completedBy
  
  console.info(`[Milestones] Marked milestone complete: ${milestone.name} (${milestoneId})`)
  return true
}

export function getNextMilestone(project: Project): Milestone | null {
  // Find the first incomplete milestone in the current phase
  const currentPhaseMilestones = project.milestones.filter(
    m => m.phase === project.phase && !m.completed
  )
  
  if (currentPhaseMilestones.length > 0) {
    // Return the first one with dependencies met
    for (const milestone of currentPhaseMilestones) {
      if (!milestone.dependencies || milestone.dependencies.length === 0) {
        return milestone
      }
      
      const dependenciesMet = milestone.dependencies.every(depId => {
        const dep = project.milestones.find(m => m.id === depId)
        return dep && dep.completed
      })
      
      if (dependenciesMet) {
        return milestone
      }
    }
  }
  
  return null
}

export function getMilestonesByPhase(project: Project, phase: ProjectPhase): Milestone[] {
  return project.milestones.filter(m => m.phase === phase)
}

export function getCompletedMilestones(project: Project): Milestone[] {
  return project.milestones.filter(m => m.completed)
}

export function getIncompleteMilestones(project: Project): Milestone[] {
  return project.milestones.filter(m => !m.completed)
}

export function addCustomMilestone(
  project: Project,
  name: string,
  phase: ProjectPhase,
  completionCriteria: string,
  weight: number = 10,
  dependencies?: string[]
): Milestone {
  const customId = `custom_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`
  
  const milestone: Milestone = {
    id: customId,
    name,
    phase,
    completionCriteria,
    weight,
    completed: false,
    custom: true,
    dependencies
  }
  
  project.milestones.push(milestone)
  console.info(`[Milestones] Added custom milestone: ${name} (${customId})`)
  
  return milestone
}

export function validateMilestone(milestone: Milestone): string[] {
  const errors: string[] = []
  
  if (!milestone.id) {
    errors.push('Milestone ID is required')
  }
  
  if (!milestone.name || milestone.name.trim().length === 0) {
    errors.push('Milestone name is required')
  }
  
  if (!milestone.phase) {
    errors.push('Milestone phase is required')
  }
  
  if (!milestone.completionCriteria || milestone.completionCriteria.trim().length === 0) {
    errors.push('Completion criteria is required')
  }
  
  if (milestone.weight !== undefined && (milestone.weight < 0 || milestone.weight > 100)) {
    errors.push('Milestone weight must be between 0 and 100')
  }
  
  return errors
}

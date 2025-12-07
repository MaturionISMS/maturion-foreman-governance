/**
 * Project Intelligence Analytics Aggregator
 * Collects and analyzes per-project intelligence metrics
 */

import { ProjectIntelligenceAnalytics } from '@/types/analytics'
import { listProjects } from '../projects/registry'
import { getAllMemory } from '../memory/storage'
import { runDriftMonitoring } from '../memory/drift-monitor'
import { MemoryEntry } from '@/types/memory'

/**
 * Flatten memory object to array
 */
function flattenMemory(memoryObj: {
  global: MemoryEntry[]
  foreman: MemoryEntry[]
  projects: Record<string, MemoryEntry[]>
}): MemoryEntry[] {
  const allEntries: MemoryEntry[] = []
  allEntries.push(...memoryObj.global)
  allEntries.push(...memoryObj.foreman)
  for (const projectEntries of Object.values(memoryObj.projects)) {
    allEntries.push(...projectEntries)
  }
  return allEntries
}

/**
 * Get project intelligence analytics
 */
export async function getProjectIntelligenceAnalytics(): Promise<ProjectIntelligenceAnalytics> {
  const { projects } = await listProjects()
  const memoryObj = await getAllMemory()
  const allMemory = flattenMemory(memoryObj)
  const driftReport = await runDriftMonitoring()
  
  // Build project metrics
  const projectMetrics = await Promise.all(projects.map(async (project) => {
    // Count blockers
    const blockerCount = project.blockers?.filter(b => !b.resolvedAt).length || 0
    
    // Count drift issues affecting this project
    const driftIssues = driftReport.checks
      .flatMap(check => check.issues)
      .filter(issue => issue.location.includes(project.id)).length
    
    // Count memory usage
    // For project memory, check if it's in the project scope or tagged with project ID
    const projectMemory = allMemory.filter(
      entry => entry.scope === 'project' || 
               entry.tags?.includes(`project:${project.id}`) ||
               entry.value?.projectId === project.id
    )
    
    const activeMemoryUsage = projectMemory.filter(
      entry => !entry.tags?.includes('consolidated') && !entry.tags?.includes('archived')
    ).length
    
    const consolidatedKnowledgeUsage = projectMemory.filter(
      entry => entry.tags?.includes('consolidated') || entry.tags?.includes('knowledge_block')
    ).length
    
    // Calculate progress
    const completedMilestones = project.milestones?.filter(m => m.completed).length || 0
    const totalMilestones = project.milestones?.length || 1
    const progressPercentage = Math.round((completedMilestones / totalMilestones) * 100)
    
    return {
      projectId: project.id,
      projectName: project.name,
      phase: project.phase,
      progressPercentage,
      blockerCount,
      driftIssues,
      activeMemoryUsage,
      consolidatedKnowledgeUsage
    }
  }))
  
  // Build S-curves for each project
  const sCurves = projects.map(project => {
    // Get timeline data from milestones
    const progress: Array<{ timestamp: string; completion: number }> = []
    
    if (project.milestones) {
      const sortedMilestones = [...project.milestones].sort((a, b) => {
        const aDate = a.completedAt || new Date().toISOString()
        const bDate = b.completedAt || new Date().toISOString()
        return aDate.localeCompare(bDate)
      })
      
      let completedCount = 0
      const totalCount = sortedMilestones.length
      
      for (const milestone of sortedMilestones) {
        if (milestone.completed && milestone.completedAt) {
          completedCount++
          progress.push({
            timestamp: milestone.completedAt,
            completion: Math.round((completedCount / totalCount) * 100)
          })
        }
      }
    }
    
    // Add current state if no milestones completed yet
    if (progress.length === 0) {
      progress.push({
        timestamp: new Date().toISOString(),
        completion: 0
      })
    }
    
    return {
      projectId: project.id,
      progress
    }
  })
  
  return {
    projects: projectMetrics,
    sCurves
  }
}

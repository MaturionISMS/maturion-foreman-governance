/**
 * Project Registry Module
 * Main API for project CRUD operations and queries
 */

import type {
  Project,
  CreateProjectParams,
  UpdateProjectParams,
  ProjectFilters,
  ProjectListResult,
  CompleteMilestoneParams,
  AddCustomMilestoneParams,
  RegistryOperationResult,
  ProjectDashboardData,
  ProjectDetailView,
  ProjectActivity
} from '@/types/project'

import {
  saveProject as saveToStorage,
  loadProject as loadFromStorage,
  loadAllProjects as loadAllFromStorage,
  deleteProject as deleteFromStorage,
  projectExists as checkProjectExists
} from './storage'

import {
  getDefaultMilestones,
  calculateWeightedProgress,
  markMilestoneComplete,
  getNextMilestone,
  getMilestonesByPhase,
  addCustomMilestone as addCustomMilestoneToProject
} from './milestones'

import {
  transitionToPhase,
  startConceptPhase,
  pauseProject,
  resumeProject,
  cancelProject,
  blockProject,
  getActiveBlockers
} from './lifecycle'

// ============================================================================
// In-Memory Cache
// ============================================================================

const projectCache = new Map<string, Project>()

// ============================================================================
// Project ID Generation
// ============================================================================

function generateProjectId(): string {
  const timestamp = Date.now()
  const random = Math.random().toString(36).substring(2, 11)
  return `proj_${timestamp}_${random}`
}

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

// ============================================================================
// Project CRUD Operations
// ============================================================================

export async function createProject(params: CreateProjectParams): Promise<RegistryOperationResult<Project>> {
  try {
    // Validate inputs
    if (!params.name || params.name.trim().length === 0) {
      return {
        success: false,
        error: 'Project name is required',
        validationErrors: ['name: cannot be empty']
      }
    }

    if (!params.organisationId) {
      return {
        success: false,
        error: 'Organisation ID is required',
        validationErrors: ['organisationId: cannot be empty']
      }
    }

    // Check for duplicate name
    const existingProject = await findProjectByName(params.name)
    if (existingProject) {
      return {
        success: false,
        error: `Project with name "${params.name}" already exists`,
        validationErrors: ['name: duplicate project name']
      }
    }

    // Create project
    const projectId = generateProjectId()
    const now = new Date().toISOString()

    const project: Project = {
      id: projectId,
      name: params.name,
      description: params.description,
      owner: params.owner,
      organisationId: params.organisationId,
      phase: 'concept',
      status: 'active',
      progressPercentage: 0,
      milestones: getDefaultMilestones(),
      builds: [],
      deployments: [],
      conceptData: params.conceptData,
      createdAt: now,
      updatedAt: now,
      createdBy: params.owner,
      tags: params.tags || [],
      priority: params.priority,
      estimatedCompletion: params.estimatedCompletion,
      memoryPath: `/foreman/projects/${slugify(params.name)}/`
    }

    // Mark "Project Registered" milestone as complete
    markMilestoneComplete(project, 'm1', params.owner)

    // Calculate initial progress
    const progress = calculateWeightedProgress(project)
    project.progressPercentage = progress.overall

    // Save to storage
    await saveToStorage(project)

    // Add to cache
    projectCache.set(projectId, project)

    console.info(`[Registry] Created project: ${params.name} (${projectId})`)

    return {
      success: true,
      data: project
    }
  } catch (error: any) {
    console.error('[Registry] Error creating project:', error)
    return {
      success: false,
      error: error.message || 'Failed to create project'
    }
  }
}

export async function getProject(projectId: string): Promise<Project | null> {
  // Check cache first
  if (projectCache.has(projectId)) {
    return projectCache.get(projectId)!
  }

  // Load from storage
  const project = await loadFromStorage(projectId)

  if (project) {
    projectCache.set(projectId, project)
  }

  return project
}

export async function updateProject(
  projectId: string,
  updates: UpdateProjectParams
): Promise<RegistryOperationResult<Project>> {
  try {
    const project = await getProject(projectId)

    if (!project) {
      return {
        success: false,
        error: `Project not found: ${projectId}`
      }
    }

    // Apply updates
    if (updates.name !== undefined) project.name = updates.name
    if (updates.description !== undefined) project.description = updates.description
    if (updates.phase !== undefined) {
      // Use lifecycle module for phase transitions
      const result = transitionToPhase(project, updates.phase)
      if (!result.success) {
        return {
          success: false,
          error: result.error,
          validationErrors: result.prerequisites
        }
      }
    }
    if (updates.status !== undefined) project.status = updates.status
    if (updates.owner !== undefined) project.owner = updates.owner
    if (updates.tags !== undefined) project.tags = updates.tags
    if (updates.priority !== undefined) project.priority = updates.priority
    if (updates.estimatedCompletion !== undefined) project.estimatedCompletion = updates.estimatedCompletion

    project.updatedAt = new Date().toISOString()

    // Recalculate progress
    const progress = calculateWeightedProgress(project)
    project.progressPercentage = progress.overall

    // Save to storage
    await saveToStorage(project)

    // Update cache
    projectCache.set(projectId, project)

    console.info(`[Registry] Updated project: ${projectId}`)

    return {
      success: true,
      data: project
    }
  } catch (error: any) {
    console.error('[Registry] Error updating project:', error)
    return {
      success: false,
      error: error.message || 'Failed to update project'
    }
  }
}

export async function archiveProject(projectId: string): Promise<RegistryOperationResult<void>> {
  try {
    const project = await getProject(projectId)

    if (!project) {
      return {
        success: false,
        error: `Project not found: ${projectId}`
      }
    }

    // Move to archived status
    project.status = 'archived'
    project.phase = 'archived'
    project.updatedAt = new Date().toISOString()

    // Save to storage
    await saveToStorage(project)

    // Remove from cache
    projectCache.delete(projectId)

    console.info(`[Registry] Archived project: ${projectId}`)

    return {
      success: true
    }
  } catch (error: any) {
    console.error('[Registry] Error archiving project:', error)
    return {
      success: false,
      error: error.message || 'Failed to archive project'
    }
  }
}

// ============================================================================
// Project Queries
// ============================================================================

export async function listProjects(filters?: ProjectFilters): Promise<ProjectListResult> {
  const allProjects = await loadAllFromStorage()

  if (!filters) {
    return {
      projects: allProjects,
      total: allProjects.length,
      filters: {}
    }
  }

  const filtered = allProjects.filter(project => {
    if (filters.phase && project.phase !== filters.phase) return false
    if (filters.status && project.status !== filters.status) return false
    if (filters.owner && project.owner !== filters.owner) return false
    if (filters.organisationId && project.organisationId !== filters.organisationId) return false
    if (filters.priority && project.priority !== filters.priority) return false
    if (filters.tags && filters.tags.length > 0) {
      const hasMatchingTag = filters.tags.some(tag => project.tags?.includes(tag))
      if (!hasMatchingTag) return false
    }
    return true
  })

  return {
    projects: filtered,
    total: filtered.length,
    filters
  }
}

export async function findProjectByName(name: string): Promise<Project | null> {
  const allProjects = await loadAllFromStorage()
  return allProjects.find(p => p.name.toLowerCase() === name.toLowerCase()) || null
}

export async function getActiveProjects(): Promise<Project[]> {
  const result = await listProjects({ status: 'active' })
  return result.projects
}

export async function getProjectsByPhase(phase: Project['phase']): Promise<Project[]> {
  const result = await listProjects({ phase })
  return result.projects
}

// ============================================================================
// Milestone Operations
// ============================================================================

export async function completeMilestone(
  params: CompleteMilestoneParams
): Promise<RegistryOperationResult<Project>> {
  try {
    const project = await getProject(params.projectId)

    if (!project) {
      return {
        success: false,
        error: `Project not found: ${params.projectId}`
      }
    }

    const success = markMilestoneComplete(project, params.milestoneId, params.completedBy)

    if (!success) {
      return {
        success: false,
        error: `Failed to complete milestone: ${params.milestoneId}`,
        validationErrors: ['Milestone not found or dependencies not met']
      }
    }

    // Recalculate progress
    const progress = calculateWeightedProgress(project)
    project.progressPercentage = progress.overall
    project.updatedAt = new Date().toISOString()

    // Save to storage
    await saveToStorage(project)

    // Update cache
    projectCache.set(params.projectId, project)

    return {
      success: true,
      data: project
    }
  } catch (error: any) {
    console.error('[Registry] Error completing milestone:', error)
    return {
      success: false,
      error: error.message || 'Failed to complete milestone'
    }
  }
}

export async function addCustomMilestone(
  params: AddCustomMilestoneParams
): Promise<RegistryOperationResult<Project>> {
  try {
    const project = await getProject(params.projectId)

    if (!project) {
      return {
        success: false,
        error: `Project not found: ${params.projectId}`
      }
    }

    addCustomMilestoneToProject(
      project,
      params.name,
      params.phase,
      params.completionCriteria,
      params.weight,
      params.dependencies
    )

    project.updatedAt = new Date().toISOString()

    // Save to storage
    await saveToStorage(project)

    // Update cache
    projectCache.set(params.projectId, project)

    return {
      success: true,
      data: project
    }
  } catch (error: any) {
    console.error('[Registry] Error adding custom milestone:', error)
    return {
      success: false,
      error: error.message || 'Failed to add custom milestone'
    }
  }
}

// ============================================================================
// Dashboard Data
// ============================================================================

export async function getDashboardData(): Promise<ProjectDashboardData> {
  const allProjects = await loadAllFromStorage()
  const activeProjects = allProjects.filter(p => p.status === 'active')

  const projectsByPhase: Record<any, number> = {
    concept: 0,
    architecture: 0,
    build: 0,
    deployment: 0,
    completed: 0,
    archived: 0
  }

  const projectsByStatus: Record<any, number> = {
    active: 0,
    paused: 0,
    blocked: 0,
    cancelled: 0,
    completed: 0,
    archived: 0
  }

  let totalProgress = 0

  allProjects.forEach(project => {
    projectsByPhase[project.phase]++
    projectsByStatus[project.status]++
    totalProgress += project.progressPercentage
  })

  const overallProgress = allProjects.length > 0 ? Math.floor(totalProgress / allProjects.length) : 0

  const blockedProjects = allProjects.filter(p => p.status === 'blocked')

  const recentCompletions = allProjects
    .flatMap(p => p.milestones.filter(m => m.completed && m.completedAt))
    .sort((a, b) => (b.completedAt! > a.completedAt! ? 1 : -1))
    .slice(0, 10)

  return {
    activeProjects,
    totalProjects: allProjects.length,
    projectsByPhase,
    projectsByStatus,
    overallProgress,
    blockedProjects,
    recentCompletions
  }
}

export async function getProjectDetail(projectId: string): Promise<ProjectDetailView | null> {
  const project = await getProject(projectId)

  if (!project) {
    return null
  }

  const nextMilestone = getNextMilestone(project)
  const currentBlockers = getActiveBlockers(project) || []

  // Generate recent activity (placeholder)
  const recentActivity: ProjectActivity[] = []

  const progress = calculateWeightedProgress(project)

  return {
    project,
    nextMilestone: nextMilestone || undefined,
    currentBlockers,
    recentActivity,
    progressByPhase: progress.byPhase
  }
}

// ============================================================================
// Registry Initialization
// ============================================================================

export async function initializeRegistry(): Promise<void> {
  console.info('[Registry] Initializing project registry...')

  // Load all active projects into cache
  const projects = await loadAllFromStorage()
  projects.forEach(project => {
    if (project.status === 'active') {
      projectCache.set(project.id, project)
    }
  })

  console.info(`[Registry] Loaded ${projectCache.size} active projects into cache`)
}

// ============================================================================
// Cache Management
// ============================================================================

export function clearCache(): void {
  projectCache.clear()
  console.info('[Registry] Cache cleared')
}

export function getCacheSize(): number {
  return projectCache.size
}

// ============================================================================
// Public API Export
// ============================================================================

export const projectRegistry = {
  // CRUD Operations
  create: createProject,
  get: getProject,
  update: updateProject,
  archive: archiveProject,

  // Queries
  list: listProjects,
  findByName: findProjectByName,
  getActive: getActiveProjects,
  getByPhase: getProjectsByPhase,

  // Milestones
  completeMilestone,
  addCustomMilestone,

  // Dashboard
  getDashboardData,
  getProjectDetail,

  // Initialization
  initialize: initializeRegistry,

  // Cache Management
  clearCache,
  getCacheSize
}

/**
 * Project Lifecycle Orchestration - Public API
 * Export all project lifecycle functionality
 */

// Registry
export { projectRegistry } from './registry'
export {
  createProject,
  getProject,
  updateProject,
  archiveProject,
  listProjects,
  findProjectByName,
  getActiveProjects,
  getProjectsByPhase,
  completeMilestone,
  getDashboardData,
  getProjectDetail,
  initializeRegistry,
  clearCache,
  getCacheSize
} from './registry'

// Lifecycle
export * from './lifecycle'

// Milestones
// Note: addCustomMilestone is exported through registry.addCustomMilestone() for consistency
// Direct access to addCustomMilestone from milestones.ts is available if needed for advanced use cases
export {
  getDefaultMilestones,
  calculateProgress,
  calculateWeightedProgress,
  markMilestoneComplete,
  getNextMilestone,
  getMilestonesByPhase,
  getCompletedMilestones,
  getIncompleteMilestones,
  validateMilestone,
  addCustomMilestone
} from './milestones'

// Storage
export * from './storage'

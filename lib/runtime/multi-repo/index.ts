/**
 * Multi-Repository Autonomy Layer
 * 
 * Provides cross-repository coordination, governance enforcement,
 * and autonomous operation capabilities across the Maturion platform.
 * 
 * @module runtime/multi-repo
 */

// Workspace Management
export { WorkspaceManager, workspaceManager } from './workspace';
export type {
  Repository,
  Workspace,
  CrossRepoOperation,
  WorkspaceHealth,
  HealthStatus,
  Lock,
  GovernanceBoundary,
  AutonomyPermission,
  ModelScalingRule
} from './workspace';

// Architecture Management
export { CrossRepoArchitectureManager, architectureManager } from './architecture-manager';
export type {
  ArchitectureSignature,
  RepoDependency,
  ArchitectureChange,
  ConsistencyReport,
  ArchitectureMismatch
} from './architecture-manager';

// Import singletons for use in functions
import { workspaceManager as wsManager } from './workspace';
import { architectureManager as archManager } from './architecture-manager';

/**
 * Initialize the multi-repo autonomy layer
 */
export async function initializeMultiRepoLayer(): Promise<void> {
  // Discover repositories
  await wsManager.discoverRepositories();
  
  // Perform initial health checks
  const repos = wsManager.getAllRepositories();
  for (const repo of repos) {
    await wsManager.healthCheck(repo.id);
  }
  
  // Fetch architecture signatures
  for (const repo of repos) {
    await archManager.fetchArchitecture(repo.id);
  }
}

/**
 * Get multi-repo layer status
 */
export function getMultiRepoStatus() {
  return {
    workspaceHealth: wsManager.getWorkspaceHealth(),
    repositories: wsManager.getAllRepositories(),
    initialized: true
  };
}

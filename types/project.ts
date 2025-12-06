/**
 * Project Lifecycle Types
 * Type definitions for Project Lifecycle Orchestration
 */

// ============================================================================
// Project Core Types
// ============================================================================

export interface Project {
  // Identity
  id: string                      // Unique project ID (e.g., "proj_abc123")
  name: string                    // Human-readable name (e.g., "User Dashboard")
  description: string             // Project purpose and scope
  owner: string                   // Primary owner (e.g., "johan")
  organisationId: string          // Organization ID (e.g., "maturion_isms")
  
  // Lifecycle State
  phase: ProjectPhase             // Current lifecycle phase
  status: ProjectStatus           // Current status
  progressPercentage: number      // Overall completion % (0-100)
  
  // Milestones
  milestones: Milestone[]         // All project milestones
  
  // Build History
  builds: BuildRecord[]           // All build sequences executed
  
  // Deployment History
  deployments: DeploymentRecord[] // All deployments executed
  
  // Concept Phase Data
  conceptData?: ConceptData
  
  // Architecture Phase Data
  architectureData?: ArchitectureData
  
  // Metadata
  createdAt: string               // ISO 8601 timestamp
  updatedAt: string               // ISO 8601 timestamp
  createdBy: string               // Who created (e.g., "johan", "system")
  tags?: string[]                 // Optional tags for categorization
  priority?: ProjectPriority
  estimatedCompletion?: string    // ISO 8601 date
  
  // Memory & Context
  memoryPath?: string             // Path to memory files
  contextFlags?: string[]         // Context markers for AI
  
  // Blockers & Issues
  blockers?: Blocker[]            // Current blockers
  
  // Notifications
  notifications?: NotificationConfig[]
}

// ============================================================================
// Enums and Union Types
// ============================================================================

export type ProjectPhase = 
  | 'concept'        // Phase 1: Concept Capture
  | 'architecture'   // Phase 2: Architecture & QA
  | 'build'          // Phase 3: Build Waves
  | 'deployment'     // Phase 4: Deployment & Validation
  | 'completed'      // Project delivered
  | 'archived'       // Historical record

export type ProjectStatus =
  | 'active'         // Currently being worked on
  | 'paused'         // Temporarily halted
  | 'blocked'        // Cannot proceed (blockers present)
  | 'cancelled'      // Project abandoned
  | 'completed'      // Successfully delivered
  | 'archived'       // Historical record

export type ProjectPriority = 
  | 'low' 
  | 'medium' 
  | 'high' 
  | 'critical'

// ============================================================================
// Milestone Types
// ============================================================================

export interface Milestone {
  id: string                      // Unique milestone ID (e.g., "m1")
  name: string                    // Milestone name
  phase: ProjectPhase             // Which phase this belongs to
  completionCriteria: string      // How to determine completion
  weight?: number                 // Weight for progress calculation (default: 10)
  completed: boolean              // Completion status
  completedAt?: string            // ISO 8601 timestamp
  completedBy?: string            // Who completed (user or "system_auto")
  custom: boolean                 // Is this a custom milestone?
  dependencies?: string[]         // Milestone IDs that must complete first
}

// ============================================================================
// Build Record Types
// ============================================================================

export interface BuildRecord {
  sequenceId: string              // Build sequence ID
  waveNumber?: number             // Wave number (if applicable)
  status: BuildRecordStatus
  startedAt: string               // ISO 8601 timestamp
  completedAt?: string            // ISO 8601 timestamp
  builder?: string                // Builder used (e.g., "copilot", "local")
  prUrl?: string                  // Pull request URL
  qaResults?: QAResults
  artifacts?: string[]            // File paths or URLs
}

export type BuildRecordStatus = 
  | 'pending' 
  | 'running' 
  | 'completed' 
  | 'failed'

export interface QAResults {
  passed: boolean
  checks: string[]
}

// ============================================================================
// Deployment Record Types
// ============================================================================

export interface DeploymentRecord {
  deploymentId: string            // Unique deployment ID
  environment: DeploymentEnvironment
  version?: string                // Version deployed
  deployedAt: string              // ISO 8601 timestamp
  deployedBy: string              // Who deployed
  status: DeploymentStatus
  validationResults?: ValidationResults
  rollbackAt?: string             // If rolled back
  rollbackReason?: string
}

export type DeploymentEnvironment = 
  | 'development' 
  | 'staging' 
  | 'production'

export type DeploymentStatus = 
  | 'pending' 
  | 'in_progress' 
  | 'completed' 
  | 'failed' 
  | 'rolled_back'

export interface ValidationResults {
  passed: boolean
  tests: string[]
}

// ============================================================================
// Concept and Architecture Data
// ============================================================================

export interface ConceptData {
  rawConcept: string              // Original concept description
  conceptApprovedBy?: string      // Who approved
  conceptApprovedAt?: string      // When approved (ISO 8601)
}

export interface ArchitectureData {
  architectureDocUrl?: string     // Link to architecture doc
  moduleBreakdown?: string[]      // List of modules
  qaStrategy?: string             // QA approach
  architectureCompletedAt?: string
}

// ============================================================================
// Blocker Types
// ============================================================================

export interface Blocker {
  id: string                      // Unique blocker ID
  description: string             // What is blocking
  category: BlockerCategory
  severity: BlockerSeverity
  createdAt: string               // ISO 8601 timestamp
  resolvedAt?: string             // ISO 8601 timestamp
  resolvedBy?: string
  resolution?: string
}

export type BlockerCategory = 
  | 'technical' 
  | 'approval' 
  | 'external' 
  | 'resource'

export type BlockerSeverity = 
  | 'low' 
  | 'medium' 
  | 'high' 
  | 'critical'

// ============================================================================
// Notification Types
// ============================================================================

export interface NotificationConfig {
  id: string
  trigger: NotificationTrigger
  target: string                  // Email or webhook URL
  enabled: boolean
}

export type NotificationTrigger = 
  | 'milestone_complete' 
  | 'phase_complete' 
  | 'blocker_added' 
  | 'deployment_ready'

// ============================================================================
// Project Creation and Update Types
// ============================================================================

export interface CreateProjectParams {
  name: string
  description: string
  owner: string
  organisationId: string
  conceptData?: {
    rawConcept: string
  }
  tags?: string[]
  priority?: ProjectPriority
  estimatedCompletion?: string
}

export interface UpdateProjectParams {
  name?: string
  description?: string
  phase?: ProjectPhase
  status?: ProjectStatus
  owner?: string
  tags?: string[]
  priority?: ProjectPriority
  estimatedCompletion?: string
}

// ============================================================================
// Project Query Types
// ============================================================================

export interface ProjectFilters {
  phase?: ProjectPhase
  status?: ProjectStatus
  owner?: string
  organisationId?: string
  tags?: string[]
  priority?: ProjectPriority
}

export interface ProjectListResult {
  projects: Project[]
  total: number
  filters: ProjectFilters
}

// ============================================================================
// Milestone Operation Types
// ============================================================================

export interface CompleteMilestoneParams {
  projectId: string
  milestoneId: string
  completedBy: string
}

export interface AddCustomMilestoneParams {
  projectId: string
  name: string
  phase: ProjectPhase
  completionCriteria: string
  weight?: number
  dependencies?: string[]
}

// ============================================================================
// Dashboard Types
// ============================================================================

export interface ProjectDashboardData {
  activeProjects: Project[]
  totalProjects: number
  projectsByPhase: Record<ProjectPhase, number>
  projectsByStatus: Record<ProjectStatus, number>
  overallProgress: number
  blockedProjects: Project[]
  recentCompletions: Milestone[]
}

export interface ProjectDetailView {
  project: Project
  nextMilestone?: Milestone
  currentBlockers: Blocker[]
  recentActivity: ProjectActivity[]
  progressByPhase: Record<ProjectPhase, number>
}

export interface ProjectActivity {
  type: 'milestone_complete' | 'phase_transition' | 'build_complete' | 'deployment' | 'blocker_added' | 'blocker_resolved'
  timestamp: string
  actor: string
  description: string
  metadata?: Record<string, any>
}

// ============================================================================
// Registry Operation Result Types
// ============================================================================

export interface RegistryOperationResult<T = any> {
  success: boolean
  data?: T
  error?: string
  validationErrors?: string[]
}

// ============================================================================
// Helper Types
// ============================================================================

export interface ProgressCalculation {
  overall: number
  byPhase: Record<ProjectPhase, number>
  completedMilestones: number
  totalMilestones: number
}

// ============================================================================
// Dashboard API Types
// ============================================================================

export type DashboardStatus = 
  | 'on_track'      // Milestones >= planned, no critical blockers
  | 'at_risk'       // 1+ medium/high blockers, drift < 20%
  | 'blocked'       // Any critical blocker or drift >= 20%
  | 'critical'      // Phase duration exceeded by > 40%, multiple milestone failures, or failed QA

export interface DashboardResponse {
  projectId: string
  projectName: string
  overallProgress: number                    // 0-100%
  phaseProgress: Record<ProjectPhase, number> // Progress per phase
  status: DashboardStatus
  statusNote?: string                        // Additional context about status
  milestones: MilestoneStatus[]
  blockers: DashboardBlocker[]
  phaseTimeline: PhaseTimeline[]
  sCurveData: SCurvePoint[]
  deploymentReadiness: DeploymentReadiness
  memorySnapshots: MemorySnapshot[]
  lastUpdated: string                        // ISO 8601 timestamp
}

export interface MilestoneStatus {
  id: string
  name: string
  phase: ProjectPhase
  weight: number
  status: 'completed' | 'in_progress' | 'pending' | 'blocked'
  completedAt?: string                       // ISO 8601 timestamp
  blockers: string[]                         // Blocker IDs
  evidence?: string                          // Evidence of completion (e.g., PR URL)
}

export interface DashboardBlocker {
  id: string
  description: string
  severity: BlockerSeverity
  owner?: string
  requiredAction: string
  createdAt: string                          // ISO 8601 timestamp
  resolvedAt?: string                        // ISO 8601 timestamp
}

export interface PhaseTimeline {
  phase: ProjectPhase
  plannedStart?: string                      // ISO 8601 date
  actualStart?: string                       // ISO 8601 date
  plannedEnd?: string                        // ISO 8601 date
  actualEnd?: string                         // ISO 8601 date
  driftPercentage?: number                   // % drift from plan
  status: 'not_started' | 'in_progress' | 'completed' | 'delayed'
}

export interface SCurvePoint {
  date: string                               // ISO 8601 date
  plannedProgress: number                    // 0-100%
  actualProgress: number                     // 0-100%
}

export interface DeploymentReadiness {
  overall: 'ready' | 'not_ready' | 'warning' | 'unknown'
  qaStatus: DeploymentCheckStatus
  securityStatus: DeploymentCheckStatus
  environmentStatus: DeploymentCheckStatus
  lastDeployment?: {
    environment: DeploymentEnvironment
    deployedAt: string                       // ISO 8601 timestamp
    status: DeploymentStatus
  }
  note?: string
}

export interface DeploymentCheckStatus {
  status: 'passed' | 'failed' | 'warning' | 'pending' | 'not_applicable'
  details?: string
}

export interface MemorySnapshot {
  timestamp: string                          // ISO 8601 timestamp
  scope: 'global' | 'foreman' | 'project'
  key: string
  summary: string
  relevance: 'high' | 'medium' | 'low'
}

# Project Registry Model

## Overview

The Project Registry is the authoritative source of truth for all projects tracked by Foreman. It maintains project metadata, lifecycle state, milestones, build history, and deployment records.

## Registry Architecture

### Storage Location

Projects are stored in one of two locations based on configuration:

**JSON File Storage** (Default):
```
/data/projects/<project-id>.json
```

**Supabase Database Storage** (Optional):
```
Table: foreman_projects
Schema: See Database Schema section
```

### In-Memory Cache

Active projects cached in memory for fast access:

```typescript
const projectCache = new Map<string, Project>()
```

**Cache Invalidation**:
- On project update
- Every 5 minutes (background refresh)
- On system restart

## Project Data Model

### Core Project Schema

```typescript
interface Project {
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
  conceptData?: {
    rawConcept: string            // Original concept description
    conceptApprovedBy?: string    // Who approved (e.g., "johan")
    conceptApprovedAt?: string    // When approved (ISO 8601)
  }
  
  // Architecture Phase Data
  architectureData?: {
    architectureDocUrl?: string   // Link to architecture doc
    moduleBreakdown?: string[]    // List of modules
    qaStrategy?: string           // QA approach
    architectureCompletedAt?: string
  }
  
  // Metadata
  createdAt: string               // ISO 8601 timestamp
  updatedAt: string               // ISO 8601 timestamp
  createdBy: string               // Who created (e.g., "johan", "system")
  tags?: string[]                 // Optional tags for categorization
  priority?: 'low' | 'medium' | 'high' | 'critical'
  estimatedCompletion?: string    // ISO 8601 date
  
  // Memory & Context
  memoryPath?: string             // Path to memory files (e.g., "/foreman/projects/user-dashboard/")
  contextFlags?: string[]         // Context markers for AI
  
  // Blockers & Issues
  blockers?: Blocker[]            // Current blockers
  
  // Notifications
  notifications?: NotificationConfig[]
}

// Lifecycle Phases
type ProjectPhase = 
  | 'concept'        // Phase 1: Concept Capture
  | 'architecture'   // Phase 2: Architecture & QA
  | 'build'          // Phase 3: Build Waves
  | 'deployment'     // Phase 4: Deployment & Validation
  | 'completed'      // Project delivered
  | 'archived'       // Historical record

// Project Status
type ProjectStatus =
  | 'active'         // Currently being worked on
  | 'paused'         // Temporarily halted
  | 'blocked'        // Cannot proceed (blockers present)
  | 'cancelled'      // Project abandoned
  | 'completed'      // Successfully delivered
  | 'archived'       // Historical record

// Milestone Schema
interface Milestone {
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

// Build Record Schema
interface BuildRecord {
  sequenceId: string              // Build sequence ID
  waveNumber?: number             // Wave number (if applicable)
  status: 'pending' | 'running' | 'completed' | 'failed'
  startedAt: string               // ISO 8601 timestamp
  completedAt?: string            // ISO 8601 timestamp
  builder?: string                // Builder used (e.g., "copilot", "local")
  prUrl?: string                  // Pull request URL
  qaResults?: {
    passed: boolean
    checks: string[]
  }
  artifacts?: string[]            // File paths or URLs
}

// Deployment Record Schema
interface DeploymentRecord {
  deploymentId: string            // Unique deployment ID
  environment: 'development' | 'staging' | 'production'
  version?: string                // Version deployed
  deployedAt: string              // ISO 8601 timestamp
  deployedBy: string              // Who deployed
  status: 'pending' | 'in_progress' | 'completed' | 'failed' | 'rolled_back'
  validationResults?: {
    passed: boolean
    tests: string[]
  }
  rollbackAt?: string             // If rolled back
  rollbackReason?: string
}

// Blocker Schema
interface Blocker {
  id: string                      // Unique blocker ID
  description: string             // What is blocking
  category: 'technical' | 'approval' | 'external' | 'resource'
  severity: 'low' | 'medium' | 'high' | 'critical'
  createdAt: string               // ISO 8601 timestamp
  resolvedAt?: string             // ISO 8601 timestamp
  resolvedBy?: string
  resolution?: string
}

// Notification Config Schema
interface NotificationConfig {
  id: string
  trigger: 'milestone_complete' | 'phase_complete' | 'blocker_added' | 'deployment_ready'
  target: string                  // Email or webhook URL
  enabled: boolean
}
```

## Registry Operations

### Create Project

```typescript
async function createProject(params: {
  name: string
  description: string
  owner: string
  organisationId: string
  conceptData?: {
    rawConcept: string
  }
}): Promise<Project> {
  const projectId = generateProjectId() // "proj_" + timestamp + random
  
  const project: Project = {
    id: projectId,
    name: params.name,
    description: params.description,
    owner: params.owner,
    organisationId: params.organisationId,
    phase: 'concept',
    status: 'active',
    progressPercentage: 0,
    milestones: generateDefaultMilestones(),
    builds: [],
    deployments: [],
    conceptData: params.conceptData,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    createdBy: params.owner,
    tags: [],
    memoryPath: `/foreman/projects/${slugify(params.name)}/`
  }
  
  await saveProject(project)
  return project
}
```

### Get Project

```typescript
async function getProject(projectId: string): Promise<Project | null> {
  // Check cache first
  if (projectCache.has(projectId)) {
    return projectCache.get(projectId)!
  }
  
  // Load from storage
  const project = await loadProjectFromStorage(projectId)
  
  if (project) {
    projectCache.set(projectId, project)
  }
  
  return project
}
```

### Update Project

```typescript
async function updateProject(projectId: string, updates: Partial<Project>): Promise<Project> {
  const project = await getProject(projectId)
  
  if (!project) {
    throw new Error(`Project not found: ${projectId}`)
  }
  
  const updatedProject = {
    ...project,
    ...updates,
    updatedAt: new Date().toISOString()
  }
  
  await saveProject(updatedProject)
  projectCache.set(projectId, updatedProject)
  
  return updatedProject
}
```

### List Projects

```typescript
async function listProjects(filters?: {
  phase?: ProjectPhase
  status?: ProjectStatus
  owner?: string
  organisationId?: string
}): Promise<Project[]> {
  const allProjects = await loadAllProjectsFromStorage()
  
  if (!filters) {
    return allProjects
  }
  
  return allProjects.filter(project => {
    if (filters.phase && project.phase !== filters.phase) return false
    if (filters.status && project.status !== filters.status) return false
    if (filters.owner && project.owner !== filters.owner) return false
    if (filters.organisationId && project.organisationId !== filters.organisationId) return false
    return true
  })
}
```

### Delete Project (Archive)

```typescript
async function archiveProject(projectId: string): Promise<void> {
  const project = await getProject(projectId)
  
  if (!project) {
    throw new Error(`Project not found: ${projectId}`)
  }
  
  // Move to archived status
  await updateProject(projectId, {
    status: 'archived',
    phase: 'archived'
  })
  
  // Remove from active cache
  projectCache.delete(projectId)
  
  // Move to archive storage (optional)
  await moveToArchive(project)
}
```

## Storage Backend Implementations

### JSON File Storage

```typescript
async function saveProjectToJSON(project: Project): Promise<void> {
  const filePath = `/data/projects/${project.id}.json`
  const data = JSON.stringify(project, null, 2)
  await fs.writeFile(filePath, data, 'utf-8')
}

async function loadProjectFromJSON(projectId: string): Promise<Project | null> {
  const filePath = `/data/projects/${projectId}.json`
  
  try {
    const data = await fs.readFile(filePath, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    if (error.code === 'ENOENT') {
      return null // File not found
    }
    throw error
  }
}

async function loadAllProjectsFromJSON(): Promise<Project[]> {
  const dir = '/data/projects'
  const files = await fs.readdir(dir)
  
  const projects: Project[] = []
  for (const file of files) {
    if (file.endsWith('.json')) {
      const projectId = file.replace('.json', '')
      const project = await loadProjectFromJSON(projectId)
      if (project) {
        projects.push(project)
      }
    }
  }
  
  return projects
}
```

### Supabase Database Storage

```typescript
async function saveProjectToSupabase(project: Project): Promise<void> {
  const { data, error } = await supabase
    .from('foreman_projects')
    .upsert({
      id: project.id,
      name: project.name,
      description: project.description,
      owner: project.owner,
      organisation_id: project.organisationId,
      phase: project.phase,
      status: project.status,
      progress_percentage: project.progressPercentage,
      milestones: JSON.stringify(project.milestones),
      builds: JSON.stringify(project.builds),
      deployments: JSON.stringify(project.deployments),
      concept_data: JSON.stringify(project.conceptData),
      architecture_data: JSON.stringify(project.architectureData),
      created_at: project.createdAt,
      updated_at: project.updatedAt,
      created_by: project.createdBy,
      tags: project.tags,
      priority: project.priority,
      estimated_completion: project.estimatedCompletion,
      memory_path: project.memoryPath,
      context_flags: project.contextFlags,
      blockers: JSON.stringify(project.blockers),
      notifications: JSON.stringify(project.notifications)
    })
  
  if (error) {
    throw new Error(`Failed to save project to Supabase: ${error.message}`)
  }
}

async function loadProjectFromSupabase(projectId: string): Promise<Project | null> {
  const { data, error } = await supabase
    .from('foreman_projects')
    .select('*')
    .eq('id', projectId)
    .single()
  
  if (error || !data) {
    return null
  }
  
  return convertSupabaseRowToProject(data)
}
```

## Memory Management

### Project Memory Files

Each project maintains memory files in its memory path:

```
/foreman/projects/user-dashboard/
  ├── raw-concept.md           # Original concept from Johan
  ├── architecture-report.md   # Architecture analysis
  ├── build-logs/              # Build wave logs
  │   ├── wave-1.log
  │   ├── wave-2.log
  │   └── wave-3.log
  ├── qa-reports/              # QA validation reports
  │   ├── qa-wave-1.md
  │   └── qa-wave-2.md
  └── deployment-logs/         # Deployment records
      ├── deployment-1.log
      └── deployment-2.log
```

### Memory Writing Rules

**When to Write**:
- On phase transitions
- On milestone completions
- On build completions
- On deployment events
- On blocker additions/resolutions

**What to Write**:
- Timestamp and actor
- State before and after
- Reason for change
- Artifacts produced
- Validation results

**Format**:
- Markdown for human-readable reports
- JSON for structured data
- Plain text for logs

## Registry Initialization

```typescript
async function initializeRegistry(): Promise<void> {
  // Ensure storage directory exists (JSON)
  await ensureDirectoryExists('/data/projects')
  
  // Or initialize Supabase connection
  if (process.env.SUPABASE_URL) {
    await initializeSupabase()
  }
  
  // Load all active projects into cache
  const projects = await loadAllProjectsFromStorage()
  projects.forEach(project => {
    if (project.status === 'active') {
      projectCache.set(project.id, project)
    }
  })
  
  console.log(`Registry initialized with ${projects.length} projects`)
}
```

## Registry Validation

### Data Integrity Checks

```typescript
function validateProject(project: Project): string[] {
  const errors: string[] = []
  
  if (!project.id || !project.id.startsWith('proj_')) {
    errors.push('Invalid project ID')
  }
  
  if (!project.name || project.name.length === 0) {
    errors.push('Project name is required')
  }
  
  if (!project.organisationId) {
    errors.push('Organisation ID is required')
  }
  
  if (project.progressPercentage < 0 || project.progressPercentage > 100) {
    errors.push('Progress percentage must be 0-100')
  }
  
  // Validate milestones
  if (!Array.isArray(project.milestones)) {
    errors.push('Milestones must be an array')
  }
  
  return errors
}
```

## Query Helpers

### Find Project by Name

```typescript
async function findProjectByName(name: string): Promise<Project | null> {
  const allProjects = await loadAllProjectsFromStorage()
  return allProjects.find(p => p.name.toLowerCase() === name.toLowerCase()) || null
}
```

### Get Active Projects

```typescript
async function getActiveProjects(): Promise<Project[]> {
  return listProjects({ status: 'active' })
}
```

### Get Projects by Phase

```typescript
async function getProjectsByPhase(phase: ProjectPhase): Promise<Project[]> {
  return listProjects({ phase })
}
```

## Registry API

The registry exposes a simple API for other Foreman subsystems:

```typescript
export const projectRegistry = {
  // CRUD Operations
  create: createProject,
  get: getProject,
  update: updateProject,
  delete: archiveProject,
  list: listProjects,
  
  // Queries
  findByName: findProjectByName,
  getActive: getActiveProjects,
  getByPhase: getProjectsByPhase,
  
  // Validation
  validate: validateProject,
  
  // Initialization
  initialize: initializeRegistry,
  
  // Cache Management
  clearCache: () => projectCache.clear(),
  getCacheSize: () => projectCache.size
}
```

## Philosophy

The Project Registry is the **single source of truth** for all project data.

**Principles**:
1. **Consistency**: One canonical record per project
2. **Durability**: Data persists across restarts
3. **Accessibility**: Fast reads via caching
4. **Integrity**: Validation on all writes
5. **Simplicity**: JSON or Supabase, user's choice

**Anti-Patterns to Avoid**:
- Multiple sources of truth
- Inconsistent state across systems
- Lost data on restart
- Phantom projects (not in registry)
- Unvalidated writes

**Goal**: Enable reliable, traceable project tracking from concept through deployment.

---

*This document defines the data model, operations, and storage architecture for Foreman's Project Registry.*

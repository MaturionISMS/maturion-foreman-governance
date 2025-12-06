/**
 * Project Storage Module
 * Handles persistence of project data to JSON files or Supabase
 */

import fs from 'fs/promises'
import path from 'path'
import type { Project } from '@/types/project'

// ============================================================================
// Configuration
// ============================================================================

const PROJECTS_DIR = path.join(process.cwd(), 'data', 'projects')
const USE_SUPABASE = !!(process.env.SUPABASE_URL && process.env.SUPABASE_KEY)

// ============================================================================
// Storage Backend Interface
// ============================================================================

export interface StorageBackend {
  saveProject(project: Project): Promise<void>
  loadProject(projectId: string): Promise<Project | null>
  loadAllProjects(): Promise<Project[]>
  deleteProject(projectId: string): Promise<void>
  projectExists(projectId: string): Promise<boolean>
}

// ============================================================================
// JSON File Storage Implementation
// ============================================================================

class JSONFileStorage implements StorageBackend {
  private async ensureDirectoryExists(): Promise<void> {
    try {
      await fs.access(PROJECTS_DIR)
    } catch {
      await fs.mkdir(PROJECTS_DIR, { recursive: true })
    }
  }

  private getFilePath(projectId: string): string {
    return path.join(PROJECTS_DIR, `${projectId}.json`)
  }

  async saveProject(project: Project): Promise<void> {
    await this.ensureDirectoryExists()
    const filePath = this.getFilePath(project.id)
    const data = JSON.stringify(project, null, 2)
    await fs.writeFile(filePath, data, 'utf-8')
  }

  async loadProject(projectId: string): Promise<Project | null> {
    try {
      const filePath = this.getFilePath(projectId)
      const data = await fs.readFile(filePath, 'utf-8')
      return JSON.parse(data) as Project
    } catch (error: any) {
      if (error.code === 'ENOENT') {
        return null // File not found
      }
      throw error
    }
  }

  async loadAllProjects(): Promise<Project[]> {
    await this.ensureDirectoryExists()
    
    try {
      const files = await fs.readdir(PROJECTS_DIR)
      const projects: Project[] = []

      for (const file of files) {
        if (file.endsWith('.json')) {
          const projectId = file.replace('.json', '')
          const project = await this.loadProject(projectId)
          if (project) {
            projects.push(project)
          }
        }
      }

      return projects
    } catch (error) {
      console.error('Error loading all projects:', error)
      return []
    }
  }

  async deleteProject(projectId: string): Promise<void> {
    const filePath = this.getFilePath(projectId)
    try {
      await fs.unlink(filePath)
    } catch (error: any) {
      if (error.code !== 'ENOENT') {
        throw error
      }
    }
  }

  async projectExists(projectId: string): Promise<boolean> {
    const filePath = this.getFilePath(projectId)
    try {
      await fs.access(filePath)
      return true
    } catch {
      return false
    }
  }
}

// ============================================================================
// Supabase Storage Implementation (Placeholder)
// ============================================================================

const SUPABASE_NOT_IMPLEMENTED_ERROR = 'Supabase storage not yet implemented'

class SupabaseStorage implements StorageBackend {
  async saveProject(project: Project): Promise<void> {
    throw new Error(SUPABASE_NOT_IMPLEMENTED_ERROR)
  }

  async loadProject(projectId: string): Promise<Project | null> {
    throw new Error(SUPABASE_NOT_IMPLEMENTED_ERROR)
  }

  async loadAllProjects(): Promise<Project[]> {
    throw new Error(SUPABASE_NOT_IMPLEMENTED_ERROR)
  }

  async deleteProject(projectId: string): Promise<void> {
    throw new Error(SUPABASE_NOT_IMPLEMENTED_ERROR)
  }

  async projectExists(projectId: string): Promise<boolean> {
    throw new Error(SUPABASE_NOT_IMPLEMENTED_ERROR)
  }
}

// ============================================================================
// Storage Factory
// ============================================================================

function createStorageBackend(): StorageBackend {
  if (USE_SUPABASE) {
    console.log('[Storage] Using Supabase storage backend')
    return new SupabaseStorage()
  } else {
    console.log('[Storage] Using JSON file storage backend')
    return new JSONFileStorage()
  }
}

// ============================================================================
// Public API
// ============================================================================

const storage = createStorageBackend()

export async function saveProject(project: Project): Promise<void> {
  return storage.saveProject(project)
}

export async function loadProject(projectId: string): Promise<Project | null> {
  return storage.loadProject(projectId)
}

export async function loadAllProjects(): Promise<Project[]> {
  return storage.loadAllProjects()
}

export async function deleteProject(projectId: string): Promise<void> {
  return storage.deleteProject(projectId)
}

export async function projectExists(projectId: string): Promise<boolean> {
  return storage.projectExists(projectId)
}

export { PROJECTS_DIR, USE_SUPABASE }

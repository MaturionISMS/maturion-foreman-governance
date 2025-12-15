/**
 * Blueprint Registry - ES5 Compatible
 */

import { ReasoningChain } from './framework'

export interface ReasoningTemplate {
  id: string
  name: string
  description: string
  scenario: string
  version?: string
  reasoningSteps: string[]
  governanceChecks: string[]
  example: ReasoningChain
}

export interface UsageStats {
  blueprintId: string
  usageCount: number
  lastUsed?: string
}

export class BlueprintRegistry {
  private blueprints: { [id: string]: ReasoningTemplate[] } = {}
  private usageStats: { [id: string]: number } = {}
  private lastUsed: { [id: string]: string } = {}

  register(blueprint: ReasoningTemplate): void {
    const id = blueprint.id
    const version = blueprint.version || '1.0.0'

    if (!this.blueprints[id]) {
      this.blueprints[id] = []
    }

    const versions = this.blueprints[id]
    
    let existingIndex = -1
    for (let i = 0; i < versions.length; i++) {
      if (versions[i].version === version) {
        existingIndex = i
        break
      }
    }

    if (existingIndex >= 0) {
      versions[existingIndex] = blueprint
    } else {
      versions.push(blueprint)
    }

    if (!this.usageStats[id]) {
      this.usageStats[id] = 0
    }
  }

  get(id: string, version?: string): ReasoningTemplate | undefined {
    const versions = this.blueprints[id]
    if (!versions || versions.length === 0) {
      return undefined
    }

    const currentCount = this.usageStats[id] || 0
    this.usageStats[id] = currentCount + 1
    this.lastUsed[id] = new Date().toISOString()

    if (version) {
      for (let i = 0; i < versions.length; i++) {
        if (versions[i].version === version) {
          return versions[i]
        }
      }
      return undefined
    }

    return versions[versions.length - 1]
  }

  list(): ReasoningTemplate[] {
    const allBlueprints: ReasoningTemplate[] = []
    const ids = Object.keys(this.blueprints)

    for (let i = 0; i < ids.length; i++) {
      const versions = this.blueprints[ids[i]]
      if (versions.length > 0) {
        allBlueprints.push(versions[versions.length - 1])
      }
    }

    return allBlueprints
  }

  auditUsage(blueprintId: string): UsageStats {
    return {
      blueprintId,
      usageCount: this.usageStats[blueprintId] || 0,
      lastUsed: this.lastUsed[blueprintId]
    }
  }
}

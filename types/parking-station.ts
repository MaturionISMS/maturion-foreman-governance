/**
 * Parking Station Types
 * Type definitions for the Foreman Upgrade Parking Station
 * 
 * The Parking Station is a centralized roadmap planning system that collects,
 * stores, and organizes proposed improvements from across the Foreman ecosystem.
 */

/**
 * Category types for parked upgrades
 */
export type UpgradeCategory =
  | 'UI'
  | 'Governance'
  | 'Mutation Layer'
  | 'Builders'
  | 'QA'
  | 'Memory'
  | 'Architecture'
  | 'Performance'
  | 'Security'
  | 'Documentation'
  | 'Testing'
  | 'Analytics'
  | 'Workflow'
  | 'Other'

/**
 * Status of a parked upgrade
 */
export type UpgradeStatus = 'Parked' | 'Promoted' | 'Implemented' | 'Rejected'

/**
 * Source types where upgrades can be discovered
 */
export type UpgradeSource =
  | 'Feedback File'
  | 'Governance Report'
  | 'Implementation Summary'
  | 'PR Review'
  | 'QIEL Output'
  | 'QIC Output'
  | 'Drift Detector'
  | 'App Stabilization'
  | 'Model Escalation'
  | 'Issue Summary'
  | 'Manual Entry'

/**
 * Implementation wave suggestions
 */
export type ImplementationWave = 'Quick Win' | 'Wave 1' | 'Wave 2' | 'Wave 3' | 'Future' | 'Backlog'

/**
 * Priority score (0-100, computed by Foreman)
 */
export type PriorityScore = number

/**
 * Main Parking Station Entry
 */
export interface ParkingStationEntry {
  /** Unique identifier for the entry */
  id: string
  
  /** Feature or upgrade name */
  name: string
  
  /** Category of the upgrade */
  category: UpgradeCategory
  
  /** Source where this upgrade was discovered */
  source: UpgradeSource
  
  /** File path or URL where the upgrade was found */
  sourceLocation: string
  
  /** Summary of the proposed improvement */
  summary: string
  
  /** Detailed description (optional) */
  description?: string
  
  /** Suggested implementation wave */
  suggestedWave: ImplementationWave
  
  /** Dependencies or prerequisites */
  dependencies?: string[]
  
  /** Priority score (0-100, computed by Foreman) */
  priority: PriorityScore
  
  /** Current status */
  status: UpgradeStatus
  
  /** Reason for rejection (if status is 'Rejected') */
  rejectionReason?: string
  
  /** Related issue URL (if promoted to issue) */
  relatedIssue?: string
  
  /** Related PR URL (if implemented) */
  relatedPR?: string
  
  /** Tags for filtering and search */
  tags: string[]
  
  /** Timestamps */
  createdAt: string
  updatedAt: string
  
  /** Who or what created this entry */
  createdBy: string
  
  /** Additional metadata */
  metadata?: {
    /** Complexity estimate */
    complexity?: 'Low' | 'Medium' | 'High' | 'Very High'
    
    /** Estimated effort in hours */
    estimatedEffort?: number
    
    /** Impact on system */
    impact?: 'Low' | 'Medium' | 'High' | 'Critical'
    
    /** Any notes from Foreman */
    foremanNotes?: string
    
    /** Extracted context from source */
    extractedContext?: string
  }
}

/**
 * Parking Station Filter Options
 */
export interface ParkingStationFilter {
  /** Filter by category */
  category?: UpgradeCategory
  
  /** Filter by status */
  status?: UpgradeStatus
  
  /** Filter by source */
  source?: UpgradeSource
  
  /** Filter by wave */
  suggestedWave?: ImplementationWave
  
  /** Search query for name/summary */
  search?: string
  
  /** Filter by tags */
  tags?: string[]
  
  /** Minimum priority score */
  minPriority?: number
  
  /** Maximum priority score */
  maxPriority?: number
}

/**
 * Parking Station Statistics
 */
export interface ParkingStationStats {
  /** Total entries */
  total: number
  
  /** Breakdown by status */
  byStatus: Record<UpgradeStatus, number>
  
  /** Breakdown by category */
  byCategory: Record<UpgradeCategory, number>
  
  /** Breakdown by wave */
  byWave: Record<ImplementationWave, number>
  
  /** Average priority score */
  averagePriority: number
  
  /** Last updated timestamp */
  lastUpdated: string
}

/**
 * Discovery pattern for scanning files
 */
export interface DiscoveryPattern {
  /** Pattern type identifier */
  type: string
  
  /** Regular expression or keyword to match */
  pattern: RegExp | string
  
  /** Category to assign if matched */
  category: UpgradeCategory
  
  /** Default priority boost if matched */
  priorityBoost?: number
  
  /** Tags to add if matched */
  tags?: string[]
}

/**
 * Scan result from discovery engine
 */
export interface ScanResult {
  /** Total files scanned */
  filesScanned: number
  
  /** Number of upgrades discovered */
  upgradesFound: number
  
  /** Entries discovered */
  entries: ParkingStationEntry[]
  
  /** Scan duration in milliseconds */
  duration: number
  
  /** Scan timestamp */
  timestamp: string
  
  /** Any errors encountered */
  errors?: string[]
}

/**
 * Issue creation request from parking station
 */
export interface CreateIssueFromEntry {
  /** Entry ID to create issue from */
  entryId: string
  
  /** Additional context to include */
  additionalContext?: string
  
  /** Labels to apply to issue */
  labels?: string[]
  
  /** Assignees */
  assignees?: string[]
  
  /** Milestone to assign */
  milestone?: string
}

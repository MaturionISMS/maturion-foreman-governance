/**
 * Parking Station Discovery Engine
 * 
 * Automatically scans source files to discover improvement proposals.
 * Extracts patterns from feedback files, implementation summaries, governance reports, etc.
 */

import fs from 'fs/promises'
import path from 'path'
import type {
  ParkingStationEntry,
  DiscoveryPattern,
  ScanResult,
  UpgradeCategory,
  ImplementationWave,
} from '@/types/parking-station'
import { bulkAddEntries } from './storage'

/**
 * Discovery patterns for finding upgrade suggestions
 */
const DISCOVERY_PATTERNS: DiscoveryPattern[] = [
  // Future enhancements
  { type: 'future', pattern: /FUTURE[:\s]+([^\n]+)/gi, category: 'Other', priorityBoost: 5, tags: ['future'] },
  { type: 'todo', pattern: /TODO[:\s]+([^\n]+)/gi, category: 'Other', priorityBoost: 3, tags: ['todo'] },
  { type: 'enhancement', pattern: /ENHANCEMENT[:\s]+([^\n]+)/gi, category: 'Other', priorityBoost: 8, tags: ['enhancement'] },
  
  // Proposed improvements
  { type: 'proposed', pattern: /proposed improvement[:\s]+([^\n]+)/gi, category: 'Other', priorityBoost: 7, tags: ['proposed'] },
  { type: 'suggestion', pattern: /feature suggestion[:\s]+([^\n]+)/gi, category: 'Other', priorityBoost: 6, tags: ['suggestion'] },
  { type: 'consider', pattern: /consider adding[:\s]+([^\n]+)/gi, category: 'Other', priorityBoost: 5, tags: ['consideration'] },
  
  // Category-specific patterns
  { type: 'ui', pattern: /UI improvement[:\s]+([^\n]+)/gi, category: 'UI', priorityBoost: 7, tags: ['ui'] },
  { type: 'governance', pattern: /governance refinement[:\s]+([^\n]+)/gi, category: 'Governance', priorityBoost: 8, tags: ['governance'] },
  { type: 'architecture', pattern: /architectural upgrade[:\s]+([^\n]+)/gi, category: 'Architecture', priorityBoost: 9, tags: ['architecture'] },
  { type: 'model', pattern: /model suggestion[:\s]+([^\n]+)/gi, category: 'Other', priorityBoost: 6, tags: ['model'] },
  
  // Improvement indicators
  { type: 'enhance', pattern: /could be enhanced[:\s]+([^\n]+)/gi, category: 'Other', priorityBoost: 5, tags: ['enhancement'] },
  { type: 'improve', pattern: /should improve[:\s]+([^\n]+)/gi, category: 'Other', priorityBoost: 6, tags: ['improvement'] },
  { type: 'optimize', pattern: /optimize[:\s]+([^\n]+)/gi, category: 'Performance', priorityBoost: 7, tags: ['optimization'] },
]

/**
 * Generate a unique ID for an entry
 */
function generateEntryId(): string {
  return `ps_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`
}

/**
 * Compute priority score based on various factors
 */
function computePriority(
  category: UpgradeCategory,
  source: string,
  patternBoost: number,
  content: string
): number {
  let baseScore = 50
  
  // Category weight
  const categoryWeights: Partial<Record<UpgradeCategory, number>> = {
    'Security': 20,
    'Governance': 18,
    'Architecture': 15,
    'QA': 12,
    'UI': 10,
    'Performance': 10,
    'Memory': 8,
  }
  baseScore += categoryWeights[category] || 5
  
  // Source weight
  if (source.includes('drift')) baseScore += 15
  if (source.includes('governance')) baseScore += 12
  if (source.includes('qiel') || source.includes('qic')) baseScore += 10
  if (source.includes('implementation')) baseScore += 8
  if (source.includes('feedback')) baseScore += 7
  
  // Pattern boost
  baseScore += patternBoost
  
  // Content-based boosts
  if (content.toLowerCase().includes('critical')) baseScore += 10
  if (content.toLowerCase().includes('urgent')) baseScore += 8
  if (content.toLowerCase().includes('security')) baseScore += 12
  if (content.toLowerCase().includes('bug')) baseScore += 9
  if (content.toLowerCase().includes('performance')) baseScore += 7
  
  // Ensure within bounds [0-100]
  return Math.min(100, Math.max(0, baseScore))
}

/**
 * Determine suggested wave based on content and priority
 */
function determineSuggestedWave(priority: number, content: string): ImplementationWave {
  // Quick wins
  if (content.toLowerCase().includes('quick') || content.toLowerCase().includes('easy')) {
    return 'Quick Win'
  }
  
  // Priority-based
  if (priority >= 80) return 'Wave 1'
  if (priority >= 65) return 'Wave 2'
  if (priority >= 50) return 'Wave 3'
  if (priority >= 30) return 'Future'
  
  return 'Backlog'
}

/**
 * Categorize based on content keywords
 */
function refineCategory(content: string, initialCategory: UpgradeCategory): UpgradeCategory {
  const lower = content.toLowerCase()
  
  if (lower.includes('ui') || lower.includes('interface') || lower.includes('dashboard')) return 'UI'
  if (lower.includes('governance') || lower.includes('compliance')) return 'Governance'
  if (lower.includes('mutation') || lower.includes('github')) return 'Mutation Layer'
  if (lower.includes('builder')) return 'Builders'
  if (lower.includes('qa') || lower.includes('quality') || lower.includes('test')) return 'QA'
  if (lower.includes('memory') || lower.includes('storage')) return 'Memory'
  if (lower.includes('architecture') || lower.includes('design')) return 'Architecture'
  if (lower.includes('performance') || lower.includes('optimize')) return 'Performance'
  if (lower.includes('security') || lower.includes('vulnerability')) return 'Security'
  if (lower.includes('document') || lower.includes('readme')) return 'Documentation'
  if (lower.includes('test') || lower.includes('validation')) return 'Testing'
  if (lower.includes('analytics') || lower.includes('metric')) return 'Analytics'
  if (lower.includes('workflow') || lower.includes('process')) return 'Workflow'
  
  return initialCategory
}

/**
 * Extract tags from content
 */
function extractTags(content: string, category: UpgradeCategory): string[] {
  const tags: Set<string> = new Set()
  
  const lower = content.toLowerCase()
  
  // Category tag
  tags.add(category.toLowerCase().replace(/\s+/g, '-'))
  
  // Common tags
  if (lower.includes('ui')) tags.add('ui')
  if (lower.includes('api')) tags.add('api')
  if (lower.includes('test')) tags.add('testing')
  if (lower.includes('security')) tags.add('security')
  if (lower.includes('performance')) tags.add('performance')
  if (lower.includes('governance')) tags.add('governance')
  if (lower.includes('builder')) tags.add('builder')
  if (lower.includes('memory')) tags.add('memory')
  if (lower.includes('dashboard')) tags.add('dashboard')
  if (lower.includes('analytics')) tags.add('analytics')
  
  return Array.from(tags)
}

/**
 * Scan a single file for upgrade suggestions
 */
async function scanFile(filePath: string): Promise<ParkingStationEntry[]> {
  try {
    const content = await fs.readFile(filePath, 'utf-8')
    const entries: ParkingStationEntry[] = []
    const relativePath = path.relative(process.cwd(), filePath)
    
    // Determine source type
    let sourceType: 'Feedback File' | 'Governance Report' | 'Implementation Summary' | 'Issue Summary' = 'Implementation Summary'
    if (filePath.includes('FEEDBACK')) sourceType = 'Feedback File'
    if (filePath.includes('governance')) sourceType = 'Governance Report'
    if (filePath.includes('ISSUE')) sourceType = 'Issue Summary'
    
    // Apply each pattern
    for (const pattern of DISCOVERY_PATTERNS) {
      const regex = typeof pattern.pattern === 'string' 
        ? new RegExp(pattern.pattern, 'gi') 
        : new RegExp(pattern.pattern.source, pattern.pattern.flags)
      
      const matches = content.matchAll(regex)
      
      for (const match of matches) {
        const suggestion = match[1]?.trim()
        if (!suggestion || suggestion.length < 10) continue
        
        const priority = computePriority(pattern.category, relativePath, pattern.priorityBoost || 0, suggestion)
        const category = refineCategory(suggestion, pattern.category)
        const wave = determineSuggestedWave(priority, suggestion)
        const tags = [...(pattern.tags || []), ...extractTags(suggestion, category)]
        
        entries.push({
          id: generateEntryId(),
          name: suggestion.substring(0, 80) + (suggestion.length > 80 ? '...' : ''),
          category,
          source: sourceType,
          sourceLocation: `/${relativePath}`,
          summary: suggestion,
          description: `Discovered from ${relativePath}\n\nPattern: ${pattern.type}`,
          suggestedWave: wave,
          priority,
          status: 'Parked',
          tags: Array.from(new Set(tags)),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          createdBy: 'foreman-discovery-engine',
          metadata: {
            extractedContext: match[0],
          },
        })
      }
    }
    
    return entries
  } catch (error) {
    console.warn(`Failed to scan file ${filePath}:`, error)
    return []
  }
}

/**
 * Get list of files to scan
 */
async function getFilesToScan(): Promise<string[]> {
  const files: string[] = []
  const rootDir = process.cwd()
  
  // Scan root for implementation/feedback files
  const rootFiles = await fs.readdir(rootDir)
  for (const file of rootFiles) {
    if (file.endsWith('.md') && (
      file.includes('IMPLEMENTATION') ||
      file.includes('FEEDBACK') ||
      file.includes('SUMMARY') ||
      file.includes('COMPLETE') ||
      file.includes('ISSUE')
    )) {
      files.push(path.join(rootDir, file))
    }
  }
  
  // Scan governance directory
  const governanceDir = path.join(rootDir, 'foreman', 'governance')
  try {
    const govFiles = await fs.readdir(governanceDir)
    for (const file of govFiles) {
      if (file.endsWith('.md')) {
        files.push(path.join(governanceDir, file))
      }
    }
  } catch {
    // Directory might not exist
  }
  
  // Scan docs directory
  const docsDir = path.join(rootDir, 'docs')
  try {
    const docFiles = await fs.readdir(docsDir)
    for (const file of docFiles) {
      if (file.endsWith('.md')) {
        files.push(path.join(docsDir, file))
      }
    }
  } catch {
    // Directory might not exist
  }
  
  return files
}

/**
 * Run a full scan of all source files
 */
export async function runFullScan(): Promise<ScanResult> {
  const startTime = Date.now()
  
  const filesToScan = await getFilesToScan()
  const allEntries: ParkingStationEntry[] = []
  
  for (const file of filesToScan) {
    const entries = await scanFile(file)
    allEntries.push(...entries)
  }
  
  // Remove duplicates based on similar content
  const uniqueEntries = deduplicateEntries(allEntries)
  
  // Add to storage
  if (uniqueEntries.length > 0) {
    await bulkAddEntries(uniqueEntries)
  }
  
  const duration = Date.now() - startTime
  
  return {
    filesScanned: filesToScan.length,
    upgradesFound: uniqueEntries.length,
    entries: uniqueEntries,
    duration,
    timestamp: new Date().toISOString(),
  }
}

/**
 * Deduplicate entries based on similarity
 */
function deduplicateEntries(entries: ParkingStationEntry[]): ParkingStationEntry[] {
  const unique: ParkingStationEntry[] = []
  
  for (const entry of entries) {
    const isDuplicate = unique.some(existing => {
      // Check if summaries are very similar
      const similarity = calculateSimilarity(
        existing.summary.toLowerCase(),
        entry.summary.toLowerCase()
      )
      return similarity > 0.8
    })
    
    if (!isDuplicate) {
      unique.push(entry)
    }
  }
  
  return unique
}

/**
 * Calculate similarity between two strings (simple approach)
 */
function calculateSimilarity(str1: string, str2: string): number {
  const words1 = new Set(str1.split(/\s+/))
  const words2 = new Set(str2.split(/\s+/))
  
  const intersection = new Set([...words1].filter(x => words2.has(x)))
  const union = new Set([...words1, ...words2])
  
  return union.size > 0 ? intersection.size / union.size : 0
}

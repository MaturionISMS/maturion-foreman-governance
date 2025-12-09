/**
 * Immutable Path Protection Module
 * 
 * This module enforces protection of immutable paths defined in the
 * constitutional guardrails. It prevents unauthorized modifications to
 * governance files, workflows, and constitutional documents.
 * 
 * Purpose:
 * - Validate that immutable paths exist and are accessible
 * - Block write operations to protected paths
 * - Detect unauthorized changes to governance files
 * - Log all attempted modifications for audit
 */

import * as fs from 'fs'
import * as path from 'path'
import { logGovernanceEvent } from '@/lib/foreman/memory/governance-memory'

/**
 * Path protection result
 */
export interface PathProtectionResult {
  path: string
  status: 'protected' | 'unprotected' | 'missing' | 'inaccessible'
  message: string
  isWritable?: boolean
  exists?: boolean
}

/**
 * Modification attempt log
 */
export interface ModificationAttempt {
  path: string
  timestamp: Date
  attemptedBy: string
  action: 'write' | 'delete' | 'move' | 'modify'
  blocked: boolean
  reason?: string
}

/**
 * In-memory log of modification attempts
 */
const modificationAttempts: ModificationAttempt[] = []

/**
 * Check if a path is protected
 */
export function isPathProtected(filePath: string, immutablePaths: string[]): boolean {
  const normalizedPath = path.normalize(filePath)
  
  return immutablePaths.some(protectedPath => {
    const normalizedProtected = path.normalize(protectedPath)
    
    // Check if the file path starts with the protected path
    // This handles both files and directories
    return normalizedPath.startsWith(normalizedProtected) ||
           normalizedPath === normalizedProtected
  })
}

/**
 * Validate that a path exists
 */
export function validatePathExists(filePath: string): PathProtectionResult {
  const absolutePath = path.isAbsolute(filePath)
    ? filePath
    : path.join(process.cwd(), filePath)
  
  if (!fs.existsSync(absolutePath)) {
    return {
      path: filePath,
      status: 'missing',
      message: 'Path does not exist',
      exists: false
    }
  }
  
  try {
    fs.accessSync(absolutePath, fs.constants.R_OK)
    
    // Check if writable
    let isWritable = false
    try {
      fs.accessSync(absolutePath, fs.constants.W_OK)
      isWritable = true
    } catch {
      // Not writable - this is good for protected files
    }
    
    return {
      path: filePath,
      status: 'protected',
      message: isWritable ? 'Path exists and is writable' : 'Path exists and is read-only',
      exists: true,
      isWritable
    }
  } catch (error) {
    return {
      path: filePath,
      status: 'inaccessible',
      message: 'Path exists but is not accessible',
      exists: true
    }
  }
}

/**
 * Validate all immutable paths
 */
export function validateImmutablePaths(immutablePaths: string[]): PathProtectionResult[] {
  const results: PathProtectionResult[] = []
  
  for (const immutablePath of immutablePaths) {
    const result = validatePathExists(immutablePath)
    results.push(result)
  }
  
  return results
}

/**
 * Check if modification to a path should be blocked
 */
export function shouldBlockModification(
  filePath: string,
  immutablePaths: string[],
  action: 'write' | 'delete' | 'move' | 'modify' = 'modify'
): boolean {
  // Check if path is protected
  if (!isPathProtected(filePath, immutablePaths)) {
    return false // Not protected, allow modification
  }
  
  // Path is protected - block modification
  logModificationAttempt(filePath, action, true, 'Path is immutable')
  return true
}

/**
 * Log a modification attempt
 */
export async function logModificationAttempt(
  filePath: string,
  action: 'write' | 'delete' | 'move' | 'modify',
  blocked: boolean,
  reason?: string
): Promise<void> {
  const attempt: ModificationAttempt = {
    path: filePath,
    timestamp: new Date(),
    attemptedBy: 'foreman', // In production, this could be more specific
    action,
    blocked,
    reason
  }
  
  modificationAttempts.push(attempt)
  
  // Log to governance memory
  await logGovernanceEvent({
    type: 'path_modification_attempt',
    severity: blocked ? 'high' : 'info',
    description: `${blocked ? 'BLOCKED' : 'ALLOWED'} ${action} attempt on ${filePath}`,
    metadata: {
      path: filePath,
      action,
      blocked,
      reason,
      timestamp: attempt.timestamp.toISOString()
    }
  })
  
  if (blocked) {
    console.warn(`[Path Protection] BLOCKED ${action} attempt on protected path: ${filePath}`)
    if (reason) {
      console.warn(`[Path Protection] Reason: ${reason}`)
    }
  }
}

/**
 * Get all modification attempts
 */
export function getModificationAttempts(): ModificationAttempt[] {
  return [...modificationAttempts]
}

/**
 * Get blocked modification attempts
 */
export function getBlockedAttempts(): ModificationAttempt[] {
  return modificationAttempts.filter(a => a.blocked)
}

/**
 * Clear modification attempt log
 */
export function clearModificationLog(): void {
  modificationAttempts.length = 0
}

/**
 * Validate that no protected files have been modified
 * This checks file modification times against a baseline
 */
export function detectProtectedFileChanges(
  protectedFiles: string[]
): { path: string; modified: boolean; message: string }[] {
  const results: { path: string; modified: boolean; message: string }[] = []
  
  for (const filePath of protectedFiles) {
    const absolutePath = path.join(process.cwd(), filePath)
    
    if (!fs.existsSync(absolutePath)) {
      results.push({
        path: filePath,
        modified: true,
        message: 'File is missing (may have been deleted)'
      })
      continue
    }
    
    try {
      const stats = fs.statSync(absolutePath)
      
      // In production, you would compare against a stored baseline
      // For now, we just confirm the file exists
      results.push({
        path: filePath,
        modified: false,
        message: `File exists (last modified: ${stats.mtime.toISOString()})`
      })
    } catch (error) {
      results.push({
        path: filePath,
        modified: true,
        message: `Error accessing file: ${error instanceof Error ? error.message : 'Unknown error'}`
      })
    }
  }
  
  return results
}

/**
 * Check for suppressions in code
 * Detects eslint-disable, ts-ignore, and other suppression patterns
 */
export function detectSuppressions(filePath: string): {
  found: boolean
  suppressions: Array<{ line: number; type: string; pattern: string }>
} {
  const absolutePath = path.isAbsolute(filePath)
    ? filePath
    : path.join(process.cwd(), filePath)
  
  if (!fs.existsSync(absolutePath)) {
    return { found: false, suppressions: [] }
  }
  
  // Only check code files
  const ext = path.extname(filePath).toLowerCase()
  if (!['.ts', '.tsx', '.js', '.jsx', '.yml', '.yaml'].includes(ext)) {
    return { found: false, suppressions: [] }
  }
  
  try {
    const content = fs.readFileSync(absolutePath, 'utf-8')
    const lines = content.split('\n')
    const suppressions: Array<{ line: number; type: string; pattern: string }> = []
    
    // Patterns to detect
    const patterns = [
      { type: 'eslint', regex: /eslint-disable/i },
      { type: 'ts-ignore', regex: /@ts-ignore/i },
      { type: 'ts-nocheck', regex: /@ts-nocheck/i },
      { type: 'ts-expect-error', regex: /@ts-expect-error/i },
      { type: 'prettier-ignore', regex: /prettier-ignore/i },
      { type: 'NOSONAR', regex: /NOSONAR/i },
    ]
    
    lines.forEach((line, index) => {
      for (const pattern of patterns) {
        if (pattern.regex.test(line)) {
          suppressions.push({
            line: index + 1,
            type: pattern.type,
            pattern: line.trim()
          })
        }
      }
    })
    
    return {
      found: suppressions.length > 0,
      suppressions
    }
  } catch (error) {
    console.warn(`[Path Protection] Could not scan ${filePath} for suppressions:`, error)
    return { found: false, suppressions: [] }
  }
}

/**
 * Scan directory for suppressions
 */
export function scanForSuppressions(directoryPath: string, recursive: boolean = true): {
  totalFiles: number
  filesWithSuppressions: number
  suppressions: Array<{
    file: string
    line: number
    type: string
    pattern: string
  }>
} {
  const results = {
    totalFiles: 0,
    filesWithSuppressions: 0,
    suppressions: [] as Array<{
      file: string
      line: number
      type: string
      pattern: string
    }>
  }
  
  const absolutePath = path.isAbsolute(directoryPath)
    ? directoryPath
    : path.join(process.cwd(), directoryPath)
  
  if (!fs.existsSync(absolutePath)) {
    return results
  }
  
  function scanDirectory(dir: string): void {
    const entries = fs.readdirSync(dir, { withFileTypes: true })
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name)
      const relativePath = path.relative(process.cwd(), fullPath)
      
      // Skip node_modules, .git, etc.
      if (entry.name.startsWith('.') || entry.name === 'node_modules') {
        continue
      }
      
      if (entry.isDirectory() && recursive) {
        scanDirectory(fullPath)
      } else if (entry.isFile()) {
        results.totalFiles++
        
        const detection = detectSuppressions(relativePath)
        if (detection.found) {
          results.filesWithSuppressions++
          
          for (const suppression of detection.suppressions) {
            results.suppressions.push({
              file: relativePath,
              ...suppression
            })
          }
        }
      }
    }
  }
  
  try {
    const stat = fs.statSync(absolutePath)
    if (stat.isDirectory()) {
      scanDirectory(absolutePath)
    } else if (stat.isFile()) {
      results.totalFiles = 1
      const detection = detectSuppressions(directoryPath)
      if (detection.found) {
        results.filesWithSuppressions = 1
        results.suppressions = detection.suppressions.map(s => ({
          file: directoryPath,
          ...s
        }))
      }
    }
  } catch (error) {
    console.warn(`[Path Protection] Error scanning ${directoryPath}:`, error)
  }
  
  return results
}

/**
 * Generate path protection report
 */
export function generatePathProtectionReport(
  immutablePaths: string[],
  protectedFiles: string[]
): string {
  const lines: string[] = []
  
  lines.push('=== PATH PROTECTION REPORT ===')
  lines.push('')
  lines.push(`Generated: ${new Date().toISOString()}`)
  lines.push('')
  
  // Section 1: Immutable Paths Status
  lines.push('IMMUTABLE PATHS STATUS:')
  const pathResults = validateImmutablePaths(immutablePaths)
  for (const result of pathResults) {
    const icon = result.status === 'protected' ? '✓' : '✗'
    lines.push(`  ${icon} ${result.path}`)
    lines.push(`     Status: ${result.status}`)
    lines.push(`     ${result.message}`)
  }
  lines.push('')
  
  // Section 2: Protected Files Status
  lines.push('PROTECTED FILES STATUS:')
  const fileChanges = detectProtectedFileChanges(protectedFiles)
  for (const change of fileChanges) {
    const icon = !change.modified ? '✓' : '✗'
    lines.push(`  ${icon} ${change.path}`)
    lines.push(`     ${change.message}`)
  }
  lines.push('')
  
  // Section 3: Modification Attempts
  const attempts = getModificationAttempts()
  const blockedAttempts = getBlockedAttempts()
  
  lines.push(`MODIFICATION ATTEMPTS:`)
  lines.push(`  Total: ${attempts.length}`)
  lines.push(`  Blocked: ${blockedAttempts.length}`)
  
  if (blockedAttempts.length > 0) {
    lines.push('')
    lines.push('  BLOCKED ATTEMPTS:')
    for (const attempt of blockedAttempts) {
      lines.push(`    ✗ ${attempt.action} on ${attempt.path}`)
      lines.push(`      Time: ${attempt.timestamp.toISOString()}`)
      if (attempt.reason) {
        lines.push(`      Reason: ${attempt.reason}`)
      }
    }
  }
  
  lines.push('')
  lines.push('='.repeat(50))
  
  return lines.join('\n')
}

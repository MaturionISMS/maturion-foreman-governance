/**
 * Constitutional Hash Checker
 * 
 * This module implements SHA-256 hashing for constitutional files to detect
 * unauthorized modifications and ensure governance integrity.
 * 
 * Purpose:
 * - Calculate SHA-256 hashes of constitutional files
 * - Compare current hashes with baseline hashes
 * - Detect governance drift through hash mismatches
 * - Block execution when constitutional files are modified
 */

import * as fs from 'fs'
import * as path from 'path'
import * as crypto from 'crypto'

/**
 * Constitutional file hash record
 */
export interface FileHash {
  path: string
  hash: string
  timestamp: Date
  size: number
}

/**
 * Hash verification result
 */
export interface HashVerificationResult {
  file: string
  status: 'passed' | 'failed' | 'missing'
  currentHash?: string
  expectedHash?: string
  message: string
}

/**
 * Constitutional files that must be hashed
 */
export const CONSTITUTIONAL_FILES = [
  '.github/foreman/agent-contract.md',
  '.github/workflows/qic.yml',
  '.github/workflows/qiel.yml',
  'foreman/constitution/guardrails.json',
] as const

/**
 * Calculate SHA-256 hash of a file
 */
export function calculateFileHash(filePath: string): string {
  const absolutePath = path.isAbsolute(filePath) 
    ? filePath 
    : path.join(process.cwd(), filePath)
  
  if (!fs.existsSync(absolutePath)) {
    throw new Error(`File not found: ${filePath}`)
  }
  
  const fileContent = fs.readFileSync(absolutePath, 'utf-8')
  const hash = crypto.createHash('sha256')
  hash.update(fileContent)
  return hash.digest('hex')
}

/**
 * Calculate hashes for all constitutional files
 */
export function calculateConstitutionalHashes(): FileHash[] {
  const hashes: FileHash[] = []
  
  for (const filePath of CONSTITUTIONAL_FILES) {
    try {
      const absolutePath = path.join(process.cwd(), filePath)
      const hash = calculateFileHash(filePath)
      const stats = fs.statSync(absolutePath)
      
      hashes.push({
        path: filePath,
        hash,
        timestamp: new Date(),
        size: stats.size
      })
    } catch (error) {
      console.warn(`[Hash Checker] Warning: Could not hash ${filePath}:`, error)
    }
  }
  
  return hashes
}

/**
 * Store baseline hashes to a file
 * Note: In production, this should be stored in a secure, immutable location
 */
export function storeBaselineHashes(hashes: FileHash[], outputPath?: string): void {
  const outputFile = outputPath || path.join(process.cwd(), 'foreman', 'constitution', 'baseline-hashes.json')
  
  const data = {
    generatedAt: new Date().toISOString(),
    hashes: hashes.map(h => ({
      path: h.path,
      hash: h.hash,
      size: h.size
    }))
  }
  
  fs.writeFileSync(outputFile, JSON.stringify(data, null, 2), 'utf-8')
  console.log(`[Hash Checker] Baseline hashes stored to: ${outputFile}`)
}

/**
 * Load baseline hashes from file
 */
export function loadBaselineHashes(inputPath?: string): FileHash[] {
  const inputFile = inputPath || path.join(process.cwd(), 'foreman', 'constitution', 'baseline-hashes.json')
  
  if (!fs.existsSync(inputFile)) {
    console.warn(`[Hash Checker] Baseline hashes not found at: ${inputFile}`)
    return []
  }
  
  try {
    const content = fs.readFileSync(inputFile, 'utf-8')
    const data = JSON.parse(content)
    
    return data.hashes.map((h: any) => ({
      path: h.path,
      hash: h.hash,
      timestamp: new Date(data.generatedAt),
      size: h.size
    }))
  } catch (error) {
    console.error(`[Hash Checker] Failed to load baseline hashes:`, error)
    return []
  }
}

/**
 * Verify current hashes against baseline
 */
export function verifyConstitutionalHashes(baseline?: FileHash[]): HashVerificationResult[] {
  const baselineHashes = baseline || loadBaselineHashes()
  const currentHashes = calculateConstitutionalHashes()
  const results: HashVerificationResult[] = []
  
  // If no baseline exists, we're in initialization mode
  if (baselineHashes.length === 0) {
    console.warn('[Hash Checker] No baseline hashes found. Consider running storeBaselineHashes() to establish baseline.')
    
    // Return current state as passing (first-time initialization)
    for (const current of currentHashes) {
      results.push({
        file: current.path,
        status: 'passed',
        currentHash: current.hash,
        message: 'No baseline - current hash recorded'
      })
    }
    
    return results
  }
  
  // Create a map of baseline hashes for quick lookup
  const baselineMap = new Map(baselineHashes.map(h => [h.path, h]))
  
  // Check each constitutional file
  for (const filePath of CONSTITUTIONAL_FILES) {
    const baseline = baselineMap.get(filePath)
    const current = currentHashes.find(h => h.path === filePath)
    
    if (!baseline && !current) {
      results.push({
        file: filePath,
        status: 'missing',
        message: 'File not found in baseline or current state'
      })
    } else if (!current) {
      results.push({
        file: filePath,
        status: 'failed',
        expectedHash: baseline?.hash,
        message: 'File exists in baseline but is now missing'
      })
    } else if (baseline === undefined) {
      results.push({
        file: filePath,
        status: 'failed',
        currentHash: current.hash,
        message: 'File exists but not in baseline (unauthorized addition?)'
      })
    } else if (baseline.hash !== current.hash) {
      results.push({
        file: filePath,
        status: 'failed',
        currentHash: current.hash,
        expectedHash: baseline.hash,
        message: 'Hash mismatch - file has been modified'
      })
    } else {
      results.push({
        file: filePath,
        status: 'passed',
        currentHash: current.hash,
        expectedHash: baseline.hash,
        message: 'Hash verified - file unchanged'
      })
    }
  }
  
  return results
}

/**
 * Check if all constitutional hashes are valid
 */
export function areHashesValid(results?: HashVerificationResult[]): boolean {
  const verificationResults = results || verifyConstitutionalHashes()
  return verificationResults.every(r => r.status === 'passed')
}

/**
 * Get hash mismatches
 */
export function getHashMismatches(results?: HashVerificationResult[]): HashVerificationResult[] {
  const verificationResults = results || verifyConstitutionalHashes()
  return verificationResults.filter(r => r.status === 'failed')
}

/**
 * Generate hash integrity report
 */
export function generateHashReport(results?: HashVerificationResult[]): string {
  const verificationResults = results || verifyConstitutionalHashes()
  const lines: string[] = []
  
  lines.push('=== CONSTITUTIONAL HASH INTEGRITY REPORT ===')
  lines.push('')
  lines.push(`Generated: ${new Date().toISOString()}`)
  lines.push(`Total Files Checked: ${verificationResults.length}`)
  lines.push(`Status: ${areHashesValid(verificationResults) ? 'PASSED' : 'FAILED'}`)
  lines.push('')
  
  const passed = verificationResults.filter(r => r.status === 'passed')
  const failed = verificationResults.filter(r => r.status === 'failed')
  const missing = verificationResults.filter(r => r.status === 'missing')
  
  lines.push(`✓ Passed: ${passed.length}`)
  lines.push(`✗ Failed: ${failed.length}`)
  lines.push(`? Missing: ${missing.length}`)
  lines.push('')
  
  if (failed.length > 0) {
    lines.push('HASH MISMATCHES:')
    for (const result of failed) {
      lines.push(`  ✗ ${result.file}`)
      lines.push(`    ${result.message}`)
      if (result.expectedHash) {
        lines.push(`    Expected: ${result.expectedHash}`)
      }
      if (result.currentHash) {
        lines.push(`    Current:  ${result.currentHash}`)
      }
    }
    lines.push('')
  }
  
  if (missing.length > 0) {
    lines.push('MISSING FILES:')
    for (const result of missing) {
      lines.push(`  ? ${result.file}`)
      lines.push(`    ${result.message}`)
    }
    lines.push('')
  }
  
  if (passed.length > 0 && failed.length === 0 && missing.length === 0) {
    lines.push('ALL CONSTITUTIONAL FILES VERIFIED:')
    for (const result of passed) {
      lines.push(`  ✓ ${result.file}`)
    }
    lines.push('')
  }
  
  lines.push('='.repeat(50))
  
  return lines.join('\n')
}

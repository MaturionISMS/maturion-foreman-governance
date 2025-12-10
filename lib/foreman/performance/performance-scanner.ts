/**
 * CS5 Performance Scanner
 * 
 * Automated performance scanning and inefficiency detection.
 * Scans code for performance violations and creates Parking Station entries.
 * 
 * Constitutional Requirements:
 * - Detect all forbidden patterns (TODO, FIXME, HACK, etc.)
 * - Detect obvious inefficiencies
 * - Block PRs with critical violations
 * - Auto-create Parking Station entries for violations
 */

import fs from 'fs/promises';
import path from 'path';
import {
  ALL_PATTERNS,
  getCriticalPatterns,
  PerformancePattern,
  PerformanceSeverity,
} from './patterns';
import { logGovernanceEvent } from '../memory/governance-memory';
import { addEntry } from '../parking-station/storage';

export interface PerformanceViolation {
  file: string;
  line: number;
  column: number;
  pattern: PerformancePattern;
  code: string;
  message: string;
}

export interface PerformanceScanResult {
  passed: boolean;
  violations: PerformanceViolation[];
  criticalCount: number;
  highCount: number;
  mediumCount: number;
  lowCount: number;
  filesScanned: number;
  timestamp: string;
  blockingViolations: PerformanceViolation[];
  summary: string;
}

/**
 * Default directories to scan
 */
const DEFAULT_SCAN_DIRS = ['app', 'lib', 'components', 'types'];

/**
 * Files and directories to exclude
 */
const EXCLUDE_PATTERNS = [
  'node_modules',
  '.next',
  'dist',
  'out',
  '.git',
  'coverage',
  'build',
  '.test.',
  '.spec.',
  'test-',
];

/**
 * Check if file should be scanned
 */
function shouldScanFile(filePath: string): boolean {
  // Only scan TypeScript and JavaScript files
  if (!/\.(ts|tsx|js|jsx)$/.test(filePath)) {
    return false;
  }

  // Exclude test files and build artifacts
  for (const pattern of EXCLUDE_PATTERNS) {
    if (filePath.includes(pattern)) {
      return false;
    }
  }

  return true;
}

/**
 * Scan a single file for performance violations
 */
async function scanFile(
  filePath: string,
  patterns: PerformancePattern[]
): Promise<PerformanceViolation[]> {
  const violations: PerformanceViolation[] = [];

  try {
    const content = await fs.readFile(filePath, 'utf-8');
    const lines = content.split('\n');

    for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
      const line = lines[lineIndex];

      for (const pattern of patterns) {
        if (pattern.pattern.test(line)) {
          violations.push({
            file: filePath,
            line: lineIndex + 1,
            column: line.search(pattern.pattern) + 1,
            pattern,
            code: line.trim(),
            message: `${pattern.name}: ${pattern.description}`,
          });
        }
      }
    }
  } catch (error) {
    console.error(`Error scanning file ${filePath}:`, error);
  }

  return violations;
}

/**
 * Recursively scan directory
 */
async function scanDirectory(
  dirPath: string,
  patterns: PerformancePattern[]
): Promise<PerformanceViolation[]> {
  let violations: PerformanceViolation[] = [];

  try {
    const entries = await fs.readdir(dirPath, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dirPath, entry.name);

      if (entry.isDirectory()) {
        // Skip excluded directories
        if (!EXCLUDE_PATTERNS.some(p => entry.name.includes(p))) {
          violations.push(...(await scanDirectory(fullPath, patterns)));
        }
      } else if (entry.isFile() && shouldScanFile(fullPath)) {
        violations.push(...(await scanFile(fullPath, patterns)));
      }
    }
  } catch (error) {
    // Directory might not exist, which is ok
  }

  return violations;
}

/**
 * Run performance scan on codebase
 */
export async function runPerformanceScan(options?: {
  dirs?: string[];
  patterns?: PerformancePattern[];
  createParkingStationEntries?: boolean;
}): Promise<PerformanceScanResult> {
  const timestamp = new Date().toISOString();
  const dirs = options?.dirs || DEFAULT_SCAN_DIRS;
  const patterns = options?.patterns || ALL_PATTERNS;
  const createParkingStationEntries = options?.createParkingStationEntries ?? true;

  console.log('═══════════════════════════════════════════════════════');
  console.log('  CS5 PERFORMANCE SCANNER');
  console.log('  Scanning for performance violations and inefficiencies');
  console.log('═══════════════════════════════════════════════════════\n');

  let allViolations: PerformanceViolation[] = [];
  let filesScanned = 0;

  // Scan each directory
  for (const dir of dirs) {
    const dirPath = path.join(process.cwd(), dir);
    console.log(`[Performance Scanner] Scanning directory: ${dir}`);

    const violations = await scanDirectory(dirPath, patterns);
    allViolations.push(...violations);

    // Count files scanned (approximate)
    try {
      const countFiles = async (p: string): Promise<number> => {
        let count = 0;
        const entries = await fs.readdir(p, { withFileTypes: true });
        for (const entry of entries) {
          const fullPath = path.join(p, entry.name);
          if (entry.isDirectory() && !EXCLUDE_PATTERNS.some(pat => entry.name.includes(pat))) {
            count += await countFiles(fullPath);
          } else if (entry.isFile() && shouldScanFile(fullPath)) {
            count++;
          }
        }
        return count;
      };
      filesScanned += await countFiles(dirPath);
    } catch (error) {
      // Directory might not exist
    }
  }

  // Categorize violations by severity
  const criticalCount = allViolations.filter(v => v.pattern.severity === 'critical').length;
  const highCount = allViolations.filter(v => v.pattern.severity === 'high').length;
  const mediumCount = allViolations.filter(v => v.pattern.severity === 'medium').length;
  const lowCount = allViolations.filter(v => v.pattern.severity === 'low').length;

  // Get blocking violations (critical severity + block action)
  const blockingViolations = allViolations.filter(
    v => v.pattern.action === 'block' && v.pattern.severity === 'critical'
  );

  // Determine if scan passed
  const passed = blockingViolations.length === 0;

  // Create summary
  let summary = `Performance scan completed: ${allViolations.length} violation(s) found in ${filesScanned} file(s).`;
  if (blockingViolations.length > 0) {
    summary += ` ${blockingViolations.length} BLOCKING violation(s) prevent PR merge.`;
  }

  // Log to governance memory
  await logGovernanceEvent({
    type: 'performance_scan_completed',
    severity: passed ? 'info' : 'critical',
    description: summary,
    metadata: {
      passed,
      totalViolations: allViolations.length,
      criticalCount,
      highCount,
      mediumCount,
      lowCount,
      blockingCount: blockingViolations.length,
      filesScanned,
      timestamp,
    },
  });

  // Create Parking Station entries for violations
  if (createParkingStationEntries && allViolations.length > 0) {
    await createParkingStationEntriesForViolations(allViolations);
  }

  // Print results
  console.log('\n[Performance Scanner] Scan Results:');
  console.log(`  Files Scanned: ${filesScanned}`);
  console.log(`  Total Violations: ${allViolations.length}`);
  console.log(`  Critical: ${criticalCount}`);
  console.log(`  High: ${highCount}`);
  console.log(`  Medium: ${mediumCount}`);
  console.log(`  Low: ${lowCount}`);
  console.log(`  Blocking Violations: ${blockingViolations.length}`);
  console.log(`  Result: ${passed ? '✅ PASSED' : '❌ FAILED'}`);

  if (blockingViolations.length > 0) {
    console.log('\n[Performance Scanner] BLOCKING VIOLATIONS:');
    blockingViolations.slice(0, 10).forEach((v, idx) => {
      const relativePath = path.relative(process.cwd(), v.file);
      console.log(`  ${idx + 1}. ${relativePath}:${v.line}`);
      console.log(`     ${v.pattern.name}: ${v.pattern.description}`);
      console.log(`     Code: ${v.code}`);
      if (v.pattern.fix) {
        console.log(`     Fix: ${v.pattern.fix}`);
      }
    });
    if (blockingViolations.length > 10) {
      console.log(`  ... and ${blockingViolations.length - 10} more`);
    }
  }

  return {
    passed,
    violations: allViolations,
    criticalCount,
    highCount,
    mediumCount,
    lowCount,
    filesScanned,
    timestamp,
    blockingViolations,
    summary,
  };
}

/**
 * Create Parking Station entries for performance violations
 */
async function createParkingStationEntriesForViolations(
  violations: PerformanceViolation[]
): Promise<void> {
  // Group violations by pattern
  const groupedViolations = new Map<string, PerformanceViolation[]>();

  for (const violation of violations) {
    const key = violation.pattern.id;
    if (!groupedViolations.has(key)) {
      groupedViolations.set(key, []);
    }
    groupedViolations.get(key)!.push(violation);
  }

  // Create one entry per pattern with multiple violations
  for (const [patternId, patternViolations] of groupedViolations) {
    const pattern = patternViolations[0].pattern;
    const entryId = `perf_${patternId.toLowerCase()}_${Date.now()}`;

    try {
      await addEntry({
        id: entryId,
        name: `Performance: ${pattern.name}`,
        summary: `Fix ${patternViolations.length} instance(s) of ${pattern.name}`,
        description: `${pattern.description}\n\nViolations found in:\n${patternViolations
          .slice(0, 10)
          .map(v => `- ${path.relative(process.cwd(), v.file)}:${v.line}`)
          .join('\n')}${patternViolations.length > 10 ? `\n... and ${patternViolations.length - 10} more` : ''}`,
        category: 'Performance',
        priority: pattern.severity === 'critical' ? 10 : pattern.severity === 'high' ? 8 : 5,
        source: 'Manual Entry',
        sourceLocation: 'CS5-PerformanceScanner',
        status: 'Parked',
        suggestedWave: pattern.severity === 'critical' ? 'Quick Win' : 'Wave 1',
        tags: ['performance', 'cs5', pattern.category, pattern.severity],
        createdBy: 'CS5-PerformanceScanner',
        metadata: {
          foremanNotes: `Pattern: ${pattern.id}, Violations: ${patternViolations.length}, Action: ${pattern.action}, Fix: ${pattern.fix || 'Manual'}`,
          impact: pattern.severity === 'critical' ? 'Critical' : pattern.severity === 'high' ? 'High' : 'Medium',
          complexity: 'Medium',
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });

      console.log(`[Performance Scanner] Created Parking Station entry: ${entryId}`);
    } catch (error) {
      // Entry might already exist
      console.warn(`[Performance Scanner] Could not create Parking Station entry for ${patternId}:`, error);
    }
  }
}

/**
 * Quick scan for critical violations only
 */
export async function quickPerformanceScan(): Promise<PerformanceScanResult> {
  return runPerformanceScan({
    patterns: getCriticalPatterns(),
    createParkingStationEntries: false,
  });
}

/**
 * Scan specific files
 */
export async function scanFiles(
  files: string[],
  patterns?: PerformancePattern[]
): Promise<PerformanceScanResult> {
  const timestamp = new Date().toISOString();
  const scanPatterns = patterns || ALL_PATTERNS;

  let allViolations: PerformanceViolation[] = [];

  for (const file of files) {
    if (shouldScanFile(file)) {
      const violations = await scanFile(file, scanPatterns);
      allViolations.push(...violations);
    }
  }

  const criticalCount = allViolations.filter(v => v.pattern.severity === 'critical').length;
  const highCount = allViolations.filter(v => v.pattern.severity === 'high').length;
  const mediumCount = allViolations.filter(v => v.pattern.severity === 'medium').length;
  const lowCount = allViolations.filter(v => v.pattern.severity === 'low').length;

  const blockingViolations = allViolations.filter(
    v => v.pattern.action === 'block' && v.pattern.severity === 'critical'
  );

  const passed = blockingViolations.length === 0;

  return {
    passed,
    violations: allViolations,
    criticalCount,
    highCount,
    mediumCount,
    lowCount,
    filesScanned: files.length,
    timestamp,
    blockingViolations,
    summary: `Scanned ${files.length} file(s): ${allViolations.length} violation(s) found.`,
  };
}

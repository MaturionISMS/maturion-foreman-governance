/**
 * Orphaned QA Watcher System
 * 
 * Continuously monitors parked QA artifacts and repository state.
 * Automatically triggers reactivation when capability conditions are met.
 * 
 * Constitutional Requirement: Orphaned QA must NEVER be forgotten.
 */

import * as fs from 'fs/promises';
import * as path from 'path';
import type {
  ParkedQAEntry,
  ParkedQAStorage,
  TriggerMatch,
  ReactivationIncident,
  WatcherScanResult,
  ParsedTriggerCondition,
  ExportCheckResult,
} from '@/types/orphaned-qa';

/**
 * Load parked QA metadata
 */
export async function loadParkedQA(): Promise<ParkedQAStorage> {
  const metadataPath = path.join(process.cwd(), 'qa-parking', 'orphaned', 'metadata.json');
  
  try {
    const content = await fs.readFile(metadataPath, 'utf-8');
    return JSON.parse(content);
  } catch (error) {
    throw new Error(`Failed to load parked QA metadata: ${error}`);
  }
}

/**
 * Check if a module path exists in the repository
 */
export async function checkModuleExists(modulePath: string): Promise<boolean> {
  // Convert module import path to file path
  // e.g., @/lib/memory/governance-memory -> lib/memory/governance-memory.ts
  const normalized = modulePath.replace('@/', '');
  const possiblePaths = [
    path.join(process.cwd(), `${normalized}.ts`),
    path.join(process.cwd(), `${normalized}.tsx`),
    path.join(process.cwd(), `${normalized}.js`),
    path.join(process.cwd(), `${normalized}/index.ts`),
    path.join(process.cwd(), `${normalized}/index.tsx`),
  ];
  
  for (const filePath of possiblePaths) {
    try {
      await fs.access(filePath);
      return true;
    } catch {
      // File doesn't exist, continue
    }
  }
  
  return false;
}

/**
 * Check if specific exports appear in a module
 */
export async function checkExportsExist(modulePath: string, exportNames: string[]): Promise<ExportCheckResult> {
  const moduleExists = await checkModuleExists(modulePath);
  
  if (!moduleExists) {
    return {
      exists: false,
      foundExports: [],
      missingExports: exportNames,
    };
  }
  
  // Read module content
  const normalized = modulePath.replace('@/', '');
  const possiblePaths = [
    path.join(process.cwd(), `${normalized}.ts`),
    path.join(process.cwd(), `${normalized}.tsx`),
    path.join(process.cwd(), `${normalized}/index.ts`),
  ];
  
  let content = '';
  for (const filePath of possiblePaths) {
    try {
      content = await fs.readFile(filePath, 'utf-8');
      break;
    } catch {
      // Continue to next path
    }
  }
  
  if (!content) {
    return {
      exists: false,
      foundExports: [],
      missingExports: exportNames,
    };
  }
  
  // Simple regex-based export detection
  const foundExports: string[] = [];
  const missingExports: string[] = [];
  
  for (const exportName of exportNames) {
    // Check for: export function exportName, export const exportName, export { exportName }
    // Note: No 'g' flag to avoid lastIndex issues with multiple test() calls
    const exportRegex = new RegExp(
      `export\\s+(?:async\\s+)?(?:function|const|let|class)\\s+${exportName}\\b|export\\s*{[^}]*\\b${exportName}\\b`
    );
    
    if (exportRegex.test(content)) {
      foundExports.push(exportName);
    } else {
      missingExports.push(exportName);
    }
  }
  
  return {
    exists: foundExports.length > 0,
    foundExports,
    missingExports,
  };
}

/**
 * Parse trigger condition and extract module/exports
 */
export function parseTriggerCondition(triggerCondition: string): ParsedTriggerCondition {
  // Regex patterns as constants for maintainability
  const MODULE_PATH_PATTERN = /@\/[a-zA-Z0-9/_-]+/;
  const FUNCTIONS_PATTERN = /with functions:\s*([^.]+)/;
  
  // Extract module path: "Implementation of @/lib/memory/governance-memory module..."
  const moduleMatch = triggerCondition.match(MODULE_PATH_PATTERN);
  const modulePath = moduleMatch ? moduleMatch[0] : undefined;
  
  // Extract function names: "with functions: writeGovernanceMemory, updateGovernanceMemory"
  const functionsMatch = triggerCondition.match(FUNCTIONS_PATTERN);
  const exportNames: string[] = [];
  
  if (functionsMatch) {
    const functionsStr = functionsMatch[1];
    const functions = functionsStr.split(',').map(f => f.trim());
    exportNames.push(...functions);
  }
  
  return { modulePath, exportNames };
}

/**
 * Check trigger conditions for a parked QA entry
 */
export async function checkTriggerConditions(entry: ParkedQAEntry): Promise<TriggerMatch | null> {
  const { modulePath, exportNames } = parseTriggerCondition(entry.triggerCondition);
  
  if (!modulePath) {
    return null;
  }
  
  // Check if module exists
  const moduleExists = await checkModuleExists(modulePath);
  
  if (!moduleExists) {
    return null;
  }
  
  // Check if exports exist
  if (exportNames.length > 0) {
    const exportCheck = await checkExportsExist(modulePath, exportNames);
    
    if (exportCheck.exists) {
      const confidence = exportCheck.missingExports.length === 0 ? 'high' : 'medium';
      
      return {
        entryId: entry.id,
        entryName: entry.name,
        triggerCondition: entry.triggerCondition,
        matchType: 'export_appears',
        matchDetails: `Module ${modulePath} exists with exports: ${exportCheck.foundExports.join(', ')}${
          exportCheck.missingExports.length > 0 
            ? `. Missing: ${exportCheck.missingExports.join(', ')}` 
            : ''
        }`,
        confidence,
      };
    }
  } else {
    // Module exists but no specific exports to check
    return {
      entryId: entry.id,
      entryName: entry.name,
      triggerCondition: entry.triggerCondition,
      matchType: 'module_exists',
      matchDetails: `Module ${modulePath} now exists`,
      confidence: 'medium',
    };
  }
  
  return null;
}

/**
 * Scan all parked QA for trigger matches
 */
export async function scanParkedQA(): Promise<TriggerMatch[]> {
  const storage = await loadParkedQA();
  const matches: TriggerMatch[] = [];
  
  for (const entry of storage.parkedQA) {
    const match = await checkTriggerConditions(entry);
    if (match) {
      matches.push(match);
    }
  }
  
  return matches;
}

/**
 * Register a Test Reactivation Incident
 */
export async function registerReactivationIncident(match: TriggerMatch): Promise<ReactivationIncident> {
  const incident: ReactivationIncident = {
    incidentId: `reactivation-${Date.now()}`,
    timestamp: new Date().toISOString(),
    entryId: match.entryId,
    entryName: match.entryName,
    triggerMatch: match,
    status: 'pending',
  };
  
  // Store incident to filesystem
  const incidentsDir = path.join(process.cwd(), 'memory', 'foreman', 'incidents', 'qa-reactivation');
  await fs.mkdir(incidentsDir, { recursive: true });
  
  const incidentPath = path.join(incidentsDir, `${incident.incidentId}.json`);
  await fs.writeFile(incidentPath, JSON.stringify(incident, null, 2), 'utf-8');
  
  // Log to governance memory if available
  try {
    const { logGovernanceEvent } = await import('@/lib/foreman/memory/governance-memory');
    await logGovernanceEvent({
      type: 'qa_reactivation_incident',
      severity: 'info',
      description: `Test Reactivation Incident: ${match.entryName}`,
      metadata: {
        incidentId: incident.incidentId,
        entryId: match.entryId,
        matchType: match.matchType,
        matchDetails: match.matchDetails,
        confidence: match.confidence,
      },
    });
  } catch {
    // Governance memory may not be available yet
    console.warn('Governance memory not available - incident logged to filesystem only');
  }
  
  return incident;
}

/**
 * Run watcher scan
 */
export async function runWatcherScan(): Promise<WatcherScanResult> {
  const startTime = Date.now();
  const matches = await scanParkedQA();
  const incidents: ReactivationIncident[] = [];
  
  // Register incidents for all matches
  for (const match of matches) {
    const incident = await registerReactivationIncident(match);
    incidents.push(incident);
  }
  
  const storage = await loadParkedQA();
  const endTime = Date.now();
  
  return {
    scanned: storage.totalParked,
    matches,
    incidentsRegistered: incidents.length,
    timestamp: new Date().toISOString(),
    duration: endTime - startTime,
  };
}

/**
 * Get reactivation instructions for an entry
 */
export async function getReactivationInstructions(entryId: string): Promise<string> {
  const storage = await loadParkedQA();
  const entry = storage.parkedQA.find(e => e.id === entryId);
  
  if (!entry) {
    throw new Error(`Parked QA entry not found: ${entryId}`);
  }
  
  const instructions = `
# Test Reactivation Required: ${entry.name}

## Entry Details
- **ID:** ${entry.id}
- **Origin Subsystem:** ${entry.originSubsystem}
- **Intended Wave:** ${entry.intendedWave}
- **Parked File:** ${entry.filePath}

## Trigger Condition Met
${entry.triggerCondition}

## Reactivation Protocol

Per Orphaned QA Constitutional Requirements:

1. **HALT Execution** (if in progress)
2. **Move test file back to tests/ directory:**
   \`\`\`bash
   git mv ${entry.filePath} tests/${path.basename(path.dirname(entry.filePath))}/${path.basename(entry.filePath)}
   \`\`\`

3. **Update metadata.json** to mark as reactivated

4. **Run as RED QA:**
   - The tests MUST fail initially (RED state)
   - This confirms the tests are meaningful

5. **Issue "Build to Green" instruction** to appropriate builder

6. **Validate GREEN QA:**
   - All tests must pass (100%)
   - No skips, no dodges, no exceptions

7. **Resume execution** only after GREEN validation

## Critical Notes
- This is an ORPHANED QA reactivation, not optional
- Execution MUST NOT continue until reactivation is complete
- Silent reactivation is PROHIBITED
`.trim();
  
  return instructions;
}

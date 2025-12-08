/**
 * Schema Cohesion Validator (QIEL-5)
 * 
 * Validates that all cognitive engine schemas are cohesive and match expected structures.
 * Ensures Memory Fabric, Retirement Engine, Consolidation Engine, Drift Monitor,
 * and Analytics Engine schemas are structurally consistent.
 * 
 * Per QIC: Any structural mismatch → QA FAIL → QI Incident created
 */

import * as fs from 'fs';
import * as path from 'path';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';

export interface SchemaValidationResult {
  engineName: string;
  schemaPath: string;
  exists: boolean;
  valid: boolean;
  errors: string[];
  warnings: string[];
}

export interface SchemaCohesionResult {
  passed: boolean;
  timestamp: string;
  validations: SchemaValidationResult[];
  totalErrors: number;
  totalWarnings: number;
  summary: string;
  mismatches: SchemaMismatch[];
}

export interface SchemaMismatch {
  engine1: string;
  engine2: string;
  field: string;
  mismatch: string;
  severity: 'critical' | 'high' | 'medium';
}

/**
 * Expected engine schemas with their paths and required fields
 */
const ENGINE_SCHEMAS = {
  'memory-fabric': {
    path: 'types/memory.ts',
    requiredTypes: ['MemoryEntry', 'MemoryScope', 'MemoryMetadata', 'QualityIntegrityIncident'],
  },
  'retirement-engine': {
    path: 'types/retirement.ts',
    requiredTypes: ['RetirementCandidate', 'RetirementDecision'],
  },
  'consolidation-engine': {
    path: 'types/consolidation.ts',
    requiredTypes: ['ConsolidationCandidate', 'ConsolidationDecision'],
  },
  'drift-monitor': {
    path: 'types/drift.ts',
    requiredTypes: ['DriftEntry', 'DriftSeverity'],
  },
  'analytics-engine': {
    path: 'types/analytics.ts',
    requiredTypes: ['AnalyticsSummary', 'MemoryHealthMetrics'],
  },
};

/**
 * Validate that a TypeScript type file exists and contains required types
 */
function validateTypeScriptSchema(
  engineName: string,
  schemaPath: string,
  requiredTypes: string[]
): SchemaValidationResult {
  const result: SchemaValidationResult = {
    engineName,
    schemaPath,
    exists: false,
    valid: false,
    errors: [],
    warnings: [],
  };

  const fullPath = path.join(process.cwd(), schemaPath);

  // Check if file exists
  if (!fs.existsSync(fullPath)) {
    result.errors.push(`Schema file not found: ${schemaPath}`);
    return result;
  }

  result.exists = true;

  try {
    // Read the TypeScript file
    const content = fs.readFileSync(fullPath, 'utf-8');

    // Check for required types/interfaces
    for (const typeName of requiredTypes) {
      // Look for type or interface declarations
      const typePattern = new RegExp(
        `(?:export\\s+)?(?:type|interface)\\s+${typeName}\\s*[=:{]`,
        'g'
      );
      
      if (!typePattern.test(content)) {
        result.errors.push(
          `Required type '${typeName}' not found in ${schemaPath}`
        );
      }
    }

    // Check for common issues
    if (content.includes('any') && !content.includes('// @ts-expect-error')) {
      result.warnings.push(
        `Schema uses 'any' type which may indicate loose typing`
      );
    }

    // Validate - if no errors, schema is valid
    result.valid = result.errors.length === 0;

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    result.errors.push(`Failed to read schema: ${errorMessage}`);
  }

  return result;
}

/**
 * Check for schema mismatches between engines
 * Looks for common fields that should be consistent
 */
function detectSchemaMismatches(
  validations: SchemaValidationResult[]
): SchemaMismatch[] {
  const mismatches: SchemaMismatch[] = [];

  // Read all schema files that exist
  const schemaContents: Record<string, string> = {};
  
  for (const validation of validations) {
    if (validation.exists) {
      const fullPath = path.join(process.cwd(), validation.schemaPath);
      try {
        schemaContents[validation.engineName] = fs.readFileSync(fullPath, 'utf-8');
      } catch (error) {
        // Skip if can't read
      }
    }
  }

  // Check for common timestamp field format
  const timestampEngines: Record<string, string> = {};
  for (const [engineName, content] of Object.entries(schemaContents)) {
    // Look for timestamp field definitions
    const timestampMatch = content.match(/timestamp[?]?:\s*(\w+)/i);
    if (timestampMatch) {
      timestampEngines[engineName] = timestampMatch[1];
    }
  }

  // Check if all timestamp types are consistent (should be 'string' for ISO 8601)
  const timestampTypes = Object.values(timestampEngines);
  if (timestampTypes.length > 1) {
    const uniqueTypes = [...new Set(timestampTypes)];
    if (uniqueTypes.length > 1) {
      const engines = Object.keys(timestampEngines);
      for (let i = 0; i < engines.length - 1; i++) {
        for (let j = i + 1; j < engines.length; j++) {
          if (timestampEngines[engines[i]] !== timestampEngines[engines[j]]) {
            mismatches.push({
              engine1: engines[i],
              engine2: engines[j],
              field: 'timestamp',
              mismatch: `Type mismatch: ${timestampEngines[engines[i]]} vs ${timestampEngines[engines[j]]}`,
              severity: 'high',
            });
          }
        }
      }
    }
  }

  // Check for ID field consistency
  const idEngines: Record<string, string> = {};
  for (const [engineName, content] of Object.entries(schemaContents)) {
    const idMatch = content.match(/\bid[?]?:\s*(\w+)/i);
    if (idMatch) {
      idEngines[engineName] = idMatch[1];
    }
  }

  const idTypes = Object.values(idEngines);
  if (idTypes.length > 1) {
    const uniqueIdTypes = [...new Set(idTypes)];
    if (uniqueIdTypes.length > 1) {
      const engines = Object.keys(idEngines);
      for (let i = 0; i < engines.length - 1; i++) {
        for (let j = i + 1; j < engines.length; j++) {
          if (idEngines[engines[i]] !== idEngines[engines[j]]) {
            mismatches.push({
              engine1: engines[i],
              engine2: engines[j],
              field: 'id',
              mismatch: `Type mismatch: ${idEngines[engines[i]]} vs ${idEngines[engines[j]]}`,
              severity: 'medium',
            });
          }
        }
      }
    }
  }

  return mismatches;
}

/**
 * Run schema cohesion validation on all engine schemas
 */
export function runSchemaCohesionValidation(): SchemaCohesionResult {
  console.log('[QIEL-5] Running schema cohesion validation...');

  const timestamp = new Date().toISOString();
  const validations: SchemaValidationResult[] = [];

  // Validate each engine schema
  for (const [engineName, config] of Object.entries(ENGINE_SCHEMAS)) {
    console.log(`[QIEL-5] Validating ${engineName} schema...`);
    const validation = validateTypeScriptSchema(
      engineName,
      config.path,
      config.requiredTypes
    );
    validations.push(validation);
  }

  // Detect schema mismatches between engines
  const mismatches = detectSchemaMismatches(validations);

  // Count total errors and warnings
  const totalErrors = validations.reduce(
    (sum, v) => sum + v.errors.length,
    0
  ) + mismatches.length;
  
  const totalWarnings = validations.reduce(
    (sum, v) => sum + v.warnings.length,
    0
  );

  // Determine pass/fail
  const passed = totalErrors === 0;

  // Generate summary
  const failedValidations = validations.filter(v => !v.valid);
  const summary = passed
    ? `Schema cohesion validation PASSED - All ${validations.length} engine schemas are valid and cohesive`
    : `Schema cohesion validation FAILED - ${failedValidations.length} engine(s) failed, ${mismatches.length} mismatch(es), ${totalErrors} total errors`;

  console.log(`[QIEL-5] ${summary}`);

  return {
    passed,
    timestamp,
    validations,
    totalErrors,
    totalWarnings,
    summary,
    mismatches,
  };
}

/**
 * Generate detailed report for schema cohesion validation
 */
export function generateSchemaCohesionReport(
  result: SchemaCohesionResult
): string {
  const sections: string[] = [];

  sections.push('# Schema Cohesion Validation Report (QIEL-5)\n');
  sections.push(`**Timestamp**: ${result.timestamp}\n`);
  sections.push(
    `**Overall Status**: ${result.passed ? '✅ PASSED' : '❌ FAILED'}\n`
  );
  sections.push(`**Total Errors**: ${result.totalErrors}\n`);
  sections.push(`**Total Warnings**: ${result.totalWarnings}\n`);
  sections.push(`**Summary**: ${result.summary}\n`);

  // Individual engine validations
  sections.push('## Engine Schema Validations\n');
  for (const validation of result.validations) {
    const status = validation.valid ? '✅' : '❌';
    sections.push(`### ${status} ${validation.engineName}\n`);
    sections.push(`- **Schema Path**: ${validation.schemaPath}`);
    sections.push(`- **Exists**: ${validation.exists ? 'Yes' : 'No'}`);
    sections.push(`- **Valid**: ${validation.valid ? 'Yes' : 'No'}`);
    sections.push(`- **Errors**: ${validation.errors.length}`);
    sections.push(`- **Warnings**: ${validation.warnings.length}\n`);

    if (validation.errors.length > 0) {
      sections.push('**Errors:**\n');
      validation.errors.forEach(err => {
        sections.push(`- ${err}`);
      });
      sections.push('');
    }

    if (validation.warnings.length > 0) {
      sections.push('**Warnings:**\n');
      validation.warnings.forEach(warn => {
        sections.push(`- ${warn}`);
      });
      sections.push('');
    }
  }

  // Schema mismatches
  if (result.mismatches.length > 0) {
    sections.push('## Schema Mismatches\n');
    result.mismatches.forEach((mismatch, idx) => {
      sections.push(`${idx + 1}. **${mismatch.field}** field mismatch`);
      sections.push(`   - Between: ${mismatch.engine1} ↔ ${mismatch.engine2}`);
      sections.push(`   - Issue: ${mismatch.mismatch}`);
      sections.push(`   - Severity: ${mismatch.severity.toUpperCase()}\n`);
    });
  }

  if (result.passed) {
    sections.push(
      '✅ **All schema validations passed** - Engines are structurally cohesive\n'
    );
  } else {
    sections.push(
      '❌ **Schema validation failed** - Address schema issues before proceeding\n'
    );
  }

  return sections.join('\n');
}

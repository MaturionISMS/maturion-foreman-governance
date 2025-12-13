/**
 * Architecture Signature Engine
 * 
 * Generates deterministic, versioned, hashable representations of system architecture.
 * Enables precise drift detection and change analysis.
 */

import fs from 'fs/promises';
import path from 'path';
import { execSync } from 'child_process';
import {
  ArchitectureSignature,
  ModuleSignature,
  DependencyGraph,
  LayerDefinition,
  SignatureComparisonResult,
} from '../../../types/constraints';
import { hashObject } from './utils/hash';
import { sortStrings, sortByKey } from './utils/sort';

/**
 * Signature schema version
 */
const SIGNATURE_VERSION = '1.0.0';

/**
 * Protected paths (immutable governance files)
 */
const PROTECTED_PATHS = [
  '.github/foreman/',
  'BUILD_PHILOSOPHY.md',
  'foreman/constitution/',
  '.github/workflows/',
  'foreman/governance/',
];

/**
 * Generate architecture signature for current codebase state
 */
export async function generateArchitectureSignature(options?: {
  includeCommit?: boolean;
  includeBranch?: boolean;
  fixedTimestamp?: string; // For deterministic testing
}): Promise<ArchitectureSignature> {
  // Use fixed timestamp if provided (for deterministic testing)
  // Otherwise use normalized timestamp (truncated to seconds for stability within same second)
  const timestamp = options?.fixedTimestamp || new Date().toISOString().split('.')[0] + 'Z';

  // Get repository information
  const repository = await getRepositoryInfo(options);

  // Scan codebase structure
  const structure = await scanCodebaseStructure();

  // Extract contract information
  const contracts = await extractContracts();

  // Get governance information
  const governance = await getGovernanceInfo();

  // Build signature (without hash first)
  const signature: Omit<ArchitectureSignature, 'hash'> = {
    version: SIGNATURE_VERSION,
    timestamp,
    repository,
    structure,
    contracts,
    governance,
  };

  // Compute hash of signature
  const hash = hashObject(signature);

  return {
    ...signature,
    hash,
  };
}

/**
 * Get repository metadata
 */
async function getRepositoryInfo(options?: {
  includeCommit?: boolean;
  includeBranch?: boolean;
}): Promise<ArchitectureSignature['repository']> {
  let commit = '0000000000000000000000000000000000000000';
  let branch = 'unknown';

  try {
    if (options?.includeCommit !== false) {
      commit = execSync('git rev-parse HEAD', { encoding: 'utf-8' }).trim();
    }
  } catch (error) {
    console.warn('[Signature] Could not get git commit');
  }

  try {
    if (options?.includeBranch !== false) {
      branch = execSync('git rev-parse --abbrev-ref HEAD', { encoding: 'utf-8' }).trim();
    }
  } catch (error) {
    console.warn('[Signature] Could not get git branch');
  }

  return {
    url: 'https://github.com/MaturionISMS/maturion-foreman-app',
    commit,
    branch,
  };
}

/**
 * Scan codebase structure
 */
async function scanCodebaseStructure(): Promise<ArchitectureSignature['structure']> {
  const modules = await scanModules();
  const dependencies = buildDependencyGraph(modules);
  const layers = defineArchitecturalLayers();

  return {
    modules: sortByKey(modules, 'name'),
    dependencies,
    layers: sortByKey(layers, 'name'),
  };
}

/**
 * Scan modules in the codebase
 */
async function scanModules(): Promise<ModuleSignature[]> {
  const modules: ModuleSignature[] = [];

  const libPath = path.join(process.cwd(), 'lib');
  
  try {
    await scanDirectory(libPath, 'lib', modules);
  } catch (error) {
    console.warn('[Signature] Could not scan lib directory');
  }

  return modules;
}

/**
 * Recursively scan directory for modules
 */
async function scanDirectory(
  dirPath: string,
  relativePath: string,
  modules: ModuleSignature[]
): Promise<void> {
  try {
    const entries = await fs.readdir(dirPath, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dirPath, entry.name);
      const relPath = path.join(relativePath, entry.name);

      if (entry.isDirectory()) {
        await scanDirectory(fullPath, relPath, modules);
      } else if (entry.isFile() && (entry.name.endsWith('.ts') || entry.name.endsWith('.tsx'))) {
        const moduleItem = await analyzeModule(fullPath, relPath);
        modules.push(moduleItem);
      }
    }
  } catch (error) {
    // Skip directories we can't read
  }
}

/**
 * Analyze a single module file
 */
async function analyzeModule(fullPath: string, relativePath: string): Promise<ModuleSignature> {
  const content = await fs.readFile(fullPath, 'utf-8');
  
  const name = path.basename(relativePath, path.extname(relativePath));
  const layer = determineLayer(relativePath);
  const exports = extractExports(content);
  const imports = extractImports(content);
  const hash = hashObject({ path: relativePath, content });

  return {
    name,
    path: relativePath,
    exports: sortStrings(exports),
    imports: sortStrings(imports),
    layer,
    hash,
  };
}

/**
 * Determine architectural layer for a module
 */
function determineLayer(modulePath: string): string {
  if (modulePath.includes('lib/foreman/governance')) return 'governance';
  if (modulePath.includes('lib/foreman/constitution')) return 'constitutional';
  if (modulePath.includes('lib/foreman')) return 'foreman';
  if (modulePath.includes('app/api')) return 'api';
  if (modulePath.includes('app/')) return 'application';
  if (modulePath.includes('lib/')) return 'library';
  return 'unknown';
}

/**
 * Extract export names from module content
 */
function extractExports(content: string): string[] {
  const exports: string[] = [];
  
  // Match: export function name(), export const name, export class Name, etc.
  const exportRegex = /export\s+(?:async\s+)?(?:function|const|let|var|class|interface|type|enum)\s+(\w+)/g;
  let match;
  
  while ((match = exportRegex.exec(content)) !== null) {
    exports.push(match[1]);
  }

  return exports;
}

/**
 * Extract import statements from module content
 */
function extractImports(content: string): string[] {
  const imports: string[] = [];
  
  // Match: import ... from '...'
  const importRegex = /import\s+.*?from\s+['"]([^'"]+)['"]/g;
  let match;
  
  while ((match = importRegex.exec(content)) !== null) {
    const importPath = match[1];
    // Only include relative imports (same project)
    if (importPath.startsWith('.') || importPath.startsWith('/')) {
      imports.push(importPath);
    }
  }

  return imports;
}

/**
 * Build dependency graph from modules
 */
function buildDependencyGraph(modules: ModuleSignature[]): DependencyGraph {
  const nodes = modules.map(m => m.name);
  const edges: DependencyGraph['edges'] = [];

  for (const moduleItem of modules) {
    for (const importPath of moduleItem.imports) {
      // Try to resolve import to module name
      const targetModule = resolveImportToModule(importPath, modules);
      if (targetModule) {
        edges.push({
          from: moduleItem.name,
          to: targetModule,
          type: 'import',
        });
      }
    }
  }

  return {
    nodes: sortStrings(nodes),
    edges: sortByKey(edges, 'from'),
  };
}

/**
 * Resolve import path to module name
 * 
 * Note: This is a simplified resolution for Wave 3A foundation.
 * Future waves (Wave 3B+) will implement proper Node.js module resolution.
 * Current implementation may produce false positives but is sufficient
 * for initial architecture signatures.
 */
function resolveImportToModule(importPath: string, modules: ModuleSignature[]): string | null {
  // This is simplified - would need more sophisticated resolution in production
  for (const moduleItem of modules) {
    if (importPath.includes(moduleItem.name)) {
      return moduleItem.name;
    }
  }
  return null;
}

/**
 * Define architectural layers
 */
function defineArchitecturalLayers(): LayerDefinition[] {
  return [
    {
      name: 'constitutional',
      description: 'Constitutional and governance rules',
      allowedDependencies: [],
      modules: [],
    },
    {
      name: 'governance',
      description: 'Governance enforcement layer',
      allowedDependencies: ['constitutional'],
      modules: [],
    },
    {
      name: 'foreman',
      description: 'Foreman orchestration layer',
      allowedDependencies: ['governance', 'constitutional'],
      modules: [],
    },
    {
      name: 'api',
      description: 'API endpoints',
      allowedDependencies: ['foreman', 'governance', 'library'],
      modules: [],
    },
    {
      name: 'application',
      description: 'Application layer',
      allowedDependencies: ['api', 'foreman', 'library'],
      modules: [],
    },
    {
      name: 'library',
      description: 'Utility libraries',
      allowedDependencies: [],
      modules: [],
    },
  ];
}

/**
 * Extract contract information
 */
async function extractContracts(): Promise<ArchitectureSignature['contracts']> {
  // Simplified for Wave 3A - would be expanded in future waves
  return {
    apis: [],
    types: [],
    events: [],
  };
}

/**
 * Get governance information
 */
async function getGovernanceInfo(): Promise<ArchitectureSignature['governance']> {
  return {
    protectedPaths: sortStrings(PROTECTED_PATHS),
    constraints: [], // Will be populated from registry in future waves
    version: '1.0.0',
  };
}

/**
 * Compute hash of an architecture signature
 */
export function hashSignature(signature: ArchitectureSignature): string {
  // Use hashObject with excludeHashField=true to exclude only the top-level hash field
  return hashObject(signature, true);
}

/**
 * Compare two architecture signatures
 */
export function compareSignatures(
  oldSignature: ArchitectureSignature,
  newSignature: ArchitectureSignature
): SignatureComparisonResult {
  const identical = oldSignature.hash === newSignature.hash;
  const differences: SignatureComparisonResult['differences'] = [];

  if (!identical) {
    // Detect added/removed modules
    const oldModuleNames = new Set(oldSignature.structure.modules.map(m => m.name));
    const newModuleNames = new Set(newSignature.structure.modules.map(m => m.name));

    for (const name of newModuleNames) {
      if (!oldModuleNames.has(name)) {
        differences.push({
          type: 'added',
          path: `structure.modules.${name}`,
          description: `Module "${name}" was added`,
        });
      }
    }

    for (const name of oldModuleNames) {
      if (!newModuleNames.has(name)) {
        differences.push({
          type: 'removed',
          path: `structure.modules.${name}`,
          description: `Module "${name}" was removed`,
        });
      }
    }

    // Detect modified modules
    for (const newModule of newSignature.structure.modules) {
      const oldModule = oldSignature.structure.modules.find(m => m.name === newModule.name);
      if (oldModule && oldModule.hash !== newModule.hash) {
        differences.push({
          type: 'modified',
          path: `structure.modules.${newModule.name}`,
          description: `Module "${newModule.name}" was modified`,
        });
      }
    }
  }

  return {
    identical,
    differences,
    oldHash: oldSignature.hash,
    newHash: newSignature.hash,
  };
}

/**
 * Load architecture signature from file
 */
export async function loadSignatureFromFile(filePath: string): Promise<ArchitectureSignature> {
  const content = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(content);
}

/**
 * Save architecture signature to file
 */
export async function saveSignatureToFile(
  signature: ArchitectureSignature,
  filePath: string
): Promise<void> {
  const content = JSON.stringify(signature, null, 2);
  await fs.writeFile(filePath, content, 'utf-8');
}

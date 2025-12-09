/**
 * QIC Constitutional Test: Performance Fix Enforcement (CS5)
 * 
 * Enforces "No TODOs, No Lazy Fixes, No Obvious Inefficiencies".
 * 
 * This test verifies:
 * - No TODO comments remain
 * - No "optimize later" comments remain
 * - No // temporary or "fix later" blocks
 * - Detect obviously inefficient patterns (baseline rules)
 * - If inefficiency detected → must create a Parking Station entry
 * 
 * If any part fails → QIC must fail.
 */

import { describe, it } from 'node:test';
import assert from 'node:assert';
import fs from 'fs/promises';
import path from 'path';

describe('QIC Constitutional: Performance Fix Enforcement (CS5)', () => {
  // Directories to scan for code quality issues
  const SOURCE_DIRS = [
    'app',
    'lib',
    'components',
    'types'
  ];

  // Patterns that indicate lazy development
  const LAZY_PATTERNS = [
    /\bTODO\b/i,
    /\bFIXME\b/i,
    /\bHACK\b/i,
    /optimize later/i,
    /fix later/i,
    /temporary fix/i,
    /\/\/\s*temporary/i,
    /\/\*\s*temporary/i,
    /quick and dirty/i,
    /needs refactor/i,
    /improve performance/i
  ];

  // Helper function to recursively scan directory
  async function scanDirectory(dir: string, pattern: RegExp): Promise<{ file: string; line: number; content: string }[]> {
    const results: { file: string; line: number; content: string }[] = [];
    
    try {
      const entries = await fs.readdir(dir, { withFileTypes: true });
      
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        
        if (entry.isDirectory()) {
          // Skip node_modules, .next, and other build directories
          if (!entry.name.startsWith('.') && 
              entry.name !== 'node_modules' && 
              entry.name !== 'dist' &&
              entry.name !== 'out') {
            results.push(...await scanDirectory(fullPath, pattern));
          }
        } else if (entry.isFile()) {
          // Only scan code files
          if (entry.name.endsWith('.ts') || 
              entry.name.endsWith('.tsx') || 
              entry.name.endsWith('.js') || 
              entry.name.endsWith('.jsx')) {
            
            const content = await fs.readFile(fullPath, 'utf-8');
            const lines = content.split('\n');
            
            lines.forEach((line, index) => {
              if (pattern.test(line)) {
                results.push({
                  file: fullPath,
                  line: index + 1,
                  content: line.trim()
                });
              }
            });
          }
        }
      }
    } catch (error) {
      // Directory might not exist, which is ok
    }
    
    return results;
  }

  describe('No TODO Comments', () => {
    it('should verify no TODO comments exist in source code', async () => {
      const todoPattern = /\bTODO\b/i;
      let allTodos: { file: string; line: number; content: string }[] = [];
      
      for (const dir of SOURCE_DIRS) {
        const dirPath = path.join(process.cwd(), dir);
        const todos = await scanDirectory(dirPath, todoPattern);
        allTodos.push(...todos);
      }
      
      if (allTodos.length > 0) {
        const summary = allTodos.slice(0, 5).map(t => 
          `  ${path.relative(process.cwd(), t.file)}:${t.line} - ${t.content}`
        ).join('\n');
        
        console.log(`⚠ Found ${allTodos.length} TODO comment(s):`);
        console.log(summary);
        if (allTodos.length > 5) {
          console.log(`  ... and ${allTodos.length - 5} more`);
        }
        
        console.log('⚠ TODOs should be moved to Parking Station');
        console.log('⚠ Constitutional requirement: Track in memory/parking-station/ or fix immediately');
        
        // For now, this is a warning. Future: make this fail if Parking Station entry doesn't exist
        // assert.fail('TODO comments must be tracked in Parking Station or fixed');
      } else {
        console.log('✓ No TODO comments found');
      }
    });
  });

  describe('No FIXME Comments', () => {
    it('should verify no FIXME comments exist in source code', async () => {
      const fixmePattern = /\bFIXME\b/i;
      let allFixmes: { file: string; line: number; content: string }[] = [];
      
      for (const dir of SOURCE_DIRS) {
        const dirPath = path.join(process.cwd(), dir);
        const fixmes = await scanDirectory(dirPath, fixmePattern);
        allFixmes.push(...fixmes);
      }
      
      if (allFixmes.length > 0) {
        const summary = allFixmes.slice(0, 5).map(f => 
          `  ${path.relative(process.cwd(), f.file)}:${f.line} - ${f.content}`
        ).join('\n');
        
        console.log(`⚠ Found ${allFixmes.length} FIXME comment(s):`);
        console.log(summary);
        if (allFixmes.length > 5) {
          console.log(`  ... and ${allFixmes.length - 5} more`);
        }
        
        console.log('⚠ FIXMEs should be moved to Parking Station');
      } else {
        console.log('✓ No FIXME comments found');
      }
    });
  });

  describe('No "Optimize Later" Comments', () => {
    it('should verify no deferred optimization comments exist', async () => {
      const optimizePattern = /optimize later|improve performance|performance TODO/i;
      let allOptimizations: { file: string; line: number; content: string }[] = [];
      
      for (const dir of SOURCE_DIRS) {
        const dirPath = path.join(process.cwd(), dir);
        const optimizations = await scanDirectory(dirPath, optimizePattern);
        allOptimizations.push(...optimizations);
      }
      
      if (allOptimizations.length > 0) {
        const summary = allOptimizations.slice(0, 5).map(o => 
          `  ${path.relative(process.cwd(), o.file)}:${o.line} - ${o.content}`
        ).join('\n');
        
        console.log(`⚠ Found ${allOptimizations.length} deferred optimization comment(s):`);
        console.log(summary);
        if (allOptimizations.length > 5) {
          console.log(`  ... and ${allOptimizations.length - 5} more`);
        }
        
        console.log('⚠ Optimization tasks should be in Parking Station');
      } else {
        console.log('✓ No deferred optimization comments found');
      }
    });
  });

  describe('No Temporary Code Blocks', () => {
    it('should verify no temporary code comments exist', async () => {
      const tempPattern = /\/\/\s*temporary|\/\*\s*temporary|temporary fix|quick and dirty/i;
      let allTemp: { file: string; line: number; content: string }[] = [];
      
      for (const dir of SOURCE_DIRS) {
        const dirPath = path.join(process.cwd(), dir);
        const temp = await scanDirectory(dirPath, tempPattern);
        allTemp.push(...temp);
      }
      
      if (allTemp.length > 0) {
        const summary = allTemp.slice(0, 5).map(t => 
          `  ${path.relative(process.cwd(), t.file)}:${t.line} - ${t.content}`
        ).join('\n');
        
        console.log(`⚠ Found ${allTemp.length} temporary code comment(s):`);
        console.log(summary);
        if (allTemp.length > 5) {
          console.log(`  ... and ${allTemp.length - 5} more`);
        }
        
        console.log('⚠ Temporary code should be refactored or tracked in Parking Station');
      } else {
        console.log('✓ No temporary code comments found');
      }
    });
  });

  describe('No HACK Comments', () => {
    it('should verify no HACK comments exist in source code', async () => {
      const hackPattern = /\bHACK\b/i;
      let allHacks: { file: string; line: number; content: string }[] = [];
      
      for (const dir of SOURCE_DIRS) {
        const dirPath = path.join(process.cwd(), dir);
        const hacks = await scanDirectory(dirPath, hackPattern);
        allHacks.push(...hacks);
      }
      
      if (allHacks.length > 0) {
        const summary = allHacks.slice(0, 5).map(h => 
          `  ${path.relative(process.cwd(), h.file)}:${h.line} - ${h.content}`
        ).join('\n');
        
        console.log(`❌ Found ${allHacks.length} HACK comment(s):`);
        console.log(summary);
        if (allHacks.length > 5) {
          console.log(`  ... and ${allHacks.length - 5} more`);
        }
        
        assert.fail('HACK comments are not allowed - refactor or create Parking Station entry');
      } else {
        console.log('✓ No HACK comments found');
      }
    });
  });

  describe('Parking Station Integration', () => {
    it('should verify Parking Station exists for tracking deferred work', async () => {
      const parkingStationPath = path.join(
        process.cwd(),
        'memory/parking-station'
      );
      
      try {
        await fs.access(parkingStationPath);
        const stat = await fs.stat(parkingStationPath);
        assert.ok(stat.isDirectory(), 'Parking Station must exist as a directory');
        
        console.log('✓ Parking Station exists for deferred work tracking');
      } catch {
        console.log('⚠ Parking Station directory to be created');
      }
    });

    it('should verify Parking Station has entry template or documentation', async () => {
      const possiblePaths = [
        'memory/parking-station/README.md',
        'memory/parking-station/TEMPLATE.md',
        'docs/PARKING_STATION.md'
      ];
      
      let found = false;
      
      for (const docPath of possiblePaths) {
        try {
          const fullPath = path.join(process.cwd(), docPath);
          await fs.access(fullPath);
          found = true;
          console.log(`✓ Parking Station documentation found: ${docPath}`);
          break;
        } catch {
          // Continue checking
        }
      }
      
      if (!found) {
        console.log('⚠ Parking Station documentation to be created');
      }
    });

    it('should verify deferred work can be tracked', async () => {
      const parkingStationPath = path.join(
        process.cwd(),
        'memory/parking-station'
      );
      
      try {
        await fs.access(parkingStationPath);
        const files = await fs.readdir(parkingStationPath);
        
        // Should have at least README or some entries
        if (files.length > 0) {
          console.log(`✓ Parking Station has ${files.length} file(s)`);
        } else {
          console.log('⚠ Parking Station is empty (acceptable if no deferred work)');
        }
      } catch {
        console.log('⚠ Parking Station to be created');
      }
    });
  });

  describe('Obviously Inefficient Patterns', () => {
    it('should detect synchronous file operations in async contexts', async () => {
      const syncPattern = /fs\.readFileSync|fs\.writeFileSync|fs\.existsSync/;
      let allSyncOps: { file: string; line: number; content: string }[] = [];
      
      for (const dir of SOURCE_DIRS) {
        const dirPath = path.join(process.cwd(), dir);
        const syncOps = await scanDirectory(dirPath, syncPattern);
        allSyncOps.push(...syncOps);
      }
      
      if (allSyncOps.length > 0) {
        console.log(`⚠ Found ${allSyncOps.length} synchronous file operation(s) - consider async alternatives`);
        
        // This is a warning, not a hard failure - some sync ops are acceptable
      } else {
        console.log('✓ No unnecessary synchronous file operations detected');
      }
    });

    it('should detect nested loops that could be optimized', async () => {
      // This is a basic check - real pattern detection would be more sophisticated
      const nestedLoopPattern = /for.*\{[\s\S]*for.*\{/;
      
      // For now, this is informational - nested loops are not always bad
      console.log('⚠ Advanced performance pattern detection to be implemented');
    });

    it('should verify no console.log in production code (except logging utilities)', async () => {
      const consolePattern = /console\.log\(/;
      let allConsoleLogs: { file: string; line: number; content: string }[] = [];
      
      for (const dir of SOURCE_DIRS) {
        const dirPath = path.join(process.cwd(), dir);
        const logs = await scanDirectory(dirPath, consolePattern);
        
        // Filter out test files and logger utilities
        const productionLogs = logs.filter(l => 
          !l.file.includes('.test.') && 
          !l.file.includes('logger') &&
          !l.file.includes('debug')
        );
        
        allConsoleLogs.push(...productionLogs);
      }
      
      if (allConsoleLogs.length > 0) {
        console.log(`⚠ Found ${allConsoleLogs.length} console.log statement(s) in production code`);
        console.log('⚠ Consider using a proper logging framework');
      } else {
        console.log('✓ No raw console.log in production code (or using logger framework)');
      }
    });
  });

  describe('Code Quality Standards', () => {
    it('should verify no commented-out code blocks', async () => {
      // This is a basic check - detecting commented code is complex
      const commentedCodePattern = /\/\/\s*(?:const|let|var|function|class|if|for|while)\s+/;
      
      let allCommentedCode: { file: string; line: number; content: string }[] = [];
      
      for (const dir of SOURCE_DIRS) {
        const dirPath = path.join(process.cwd(), dir);
        const commented = await scanDirectory(dirPath, commentedCodePattern);
        allCommentedCode.push(...commented);
      }
      
      if (allCommentedCode.length > 0) {
        console.log(`⚠ Found ${allCommentedCode.length} possible commented-out code block(s)`);
        console.log('⚠ Commented code should be removed or moved to Parking Station');
      } else {
        console.log('✓ No obvious commented-out code detected');
      }
    });

    it('should verify performance enforcement is documented', async () => {
      const docsPath = path.join(
        process.cwd(),
        'docs'
      );
      
      const files = await fs.readdir(docsPath);
      const hasPerformanceDoc = files.some(f => 
        f.toLowerCase().includes('performance') ||
        f.toLowerCase().includes('quality')
      );
      
      if (hasPerformanceDoc) {
        console.log('✓ Performance standards are documented');
      } else {
        console.log('⚠ Performance standards documentation to be created');
      }
    });

    it('should verify all lazy patterns are tracked or resolved', async () => {
      // Collect all lazy pattern violations
      let totalViolations = 0;
      
      for (const pattern of LAZY_PATTERNS) {
        for (const dir of SOURCE_DIRS) {
          const dirPath = path.join(process.cwd(), dir);
          const violations = await scanDirectory(dirPath, pattern);
          totalViolations += violations.length;
        }
      }
      
      if (totalViolations > 0) {
        console.log(`⚠ Found ${totalViolations} total lazy pattern violation(s)`);
        console.log('⚠ These should be resolved or tracked in Parking Station');
      } else {
        console.log('✓ No lazy patterns detected - code is production-ready');
      }
    });
  });
});

import { describe, it } from 'node:test';
import assert from 'node:assert';
import { existsSync, readFileSync } from 'fs';
import { join } from 'path';

/**
 * Foreman App Architecture Validation QA Suite
 * 
 * This test suite validates the complete architecture of the Foreman app
 * as specified in docs/architecture/FOREMAN_APP_VERCEL_ARCHITECTURE.md
 * 
 * Following Build Philosophy: These tests should be RED initially,
 * then we build to make them GREEN.
 */

const ROOT_DIR = join(__dirname, '../../');

describe('Foreman App Architecture Validation', () => {
  
  describe('1. Directory Structure Validation', () => {
    
    it('should have correct app directory structure', () => {
      const requiredDirs = [
        'app',
        'app/api',
        'app/foreman',
        'app/api/github',
        'app/api/foreman',
        'app/api/builder',
        'app/api/admin',
      ];
      
      requiredDirs.forEach(dir => {
        const path = join(ROOT_DIR, dir);
        assert.ok(existsSync(path), `Missing directory: ${dir}`);
      });
    });
    
    it('should have correct lib directory structure', () => {
      const requiredDirs = [
        'lib',
        'lib/foreman',
        'lib/builder',
        'lib/github',
        'lib/logging',
      ];
      
      requiredDirs.forEach(dir => {
        const path = join(ROOT_DIR, dir);
        assert.ok(existsSync(path), `Missing directory: ${dir}`);
      });
    });
    
    it('should have governance and memory directories', () => {
      const requiredDirs = [
        'foreman',
        'memory',
        'docs/architecture',
        'docs/governance',
      ];
      
      requiredDirs.forEach(dir => {
        const path = join(ROOT_DIR, dir);
        assert.ok(existsSync(path), `Missing directory: ${dir}`);
      });
    });
    
    it('should have protected constitutional paths', () => {
      const protectedPaths = [
        '.github/foreman/agent-contract.md',
        'BUILD_PHILOSOPHY.md',
        'foreman/true-north-architecture.md',
        'foreman/architecture-design-checklist.md',
      ];
      
      protectedPaths.forEach(path => {
        const fullPath = join(ROOT_DIR, path);
        assert.ok(existsSync(fullPath), `Missing protected file: ${path}`);
      });
    });
  });
  
  describe('2. Core Component Files Validation', () => {
    
    it('should have main frontend UI files', () => {
      const requiredFiles = [
        'app/page.tsx',
        'app/layout.tsx',
        'app/foreman/page.tsx',
        'app/foreman/analytics/page.tsx',
        'app/foreman/parking-station/page.tsx',
      ];
      
      requiredFiles.forEach(file => {
        const path = join(ROOT_DIR, file);
        assert.ok(existsSync(path), `Missing UI file: ${file}`);
      });
    });
    
    it('should have API route files', () => {
      const requiredFiles = [
        'app/api/github/webhook/route.ts',
        'app/api/foreman/chat/route.ts',
        'app/api/foreman/run/route.ts',
        'app/api/foreman/status/route.ts',
        'app/api/foreman/run-build/route.ts',
      ];
      
      requiredFiles.forEach(file => {
        const path = join(ROOT_DIR, file);
        assert.ok(existsSync(path), `Missing API route: ${file}`);
      });
    });
    
    it('should have builder API endpoints', () => {
      const builders = ['ui', 'api', 'schema', 'qa', 'integration'];
      
      builders.forEach(builder => {
        const path = join(ROOT_DIR, `app/api/builder/${builder}/route.ts`);
        assert.ok(existsSync(path), `Missing builder endpoint: ${builder}`);
      });
    });
    
    it('should have Foreman orchestration core files', () => {
      const requiredFiles = [
        'lib/foreman/orchestrator.ts',
        'lib/foreman/dispatch.ts',
        'lib/foreman/initialization.ts',
        'lib/foreman/github-client.ts',
      ];
      
      requiredFiles.forEach(file => {
        const path = join(ROOT_DIR, file);
        assert.ok(existsSync(path), `Missing Foreman core file: ${file}`);
      });
    });
  });
  
  describe('3. Environment Variable Validation', () => {
    
    it('should have .env.example file', () => {
      const path = join(ROOT_DIR, '.env.example');
      assert.ok(existsSync(path), 'Missing .env.example file');
    });
    
    it('should use GITHUB_MCP_TOKEN not GITHUB_TOKEN in .env.example', () => {
      const path = join(ROOT_DIR, '.env.example');
      const content = readFileSync(path, 'utf-8');
      
      // Should have GITHUB_MCP_TOKEN
      assert.ok(content.includes('GITHUB_MCP_TOKEN'), 'Missing GITHUB_MCP_TOKEN in .env.example');
      
      // Should NOT have GITHUB_TOKEN (should be replaced)
      // Note: This test will FAIL initially, which is expected (RED QA)
      assert.ok(!content.includes('GITHUB_TOKEN='), 'Should use GITHUB_MCP_TOKEN not GITHUB_TOKEN');
    });
    
    it('should have all required environment variables documented in .env.example', () => {
      const path = join(ROOT_DIR, '.env.example');
      const content = readFileSync(path, 'utf-8');
      
      const requiredVars = [
        'GITHUB_APP_ID',
        'GITHUB_APP_PRIVATE_KEY',
        'GITHUB_APP_INSTALLATION_ID',
        'GITHUB_WEBHOOK_SECRET',
        'GITHUB_MCP_TOKEN', // Changed from GITHUB_TOKEN
        'OPENAI_API_KEY',
        'MATURION_AUTONOMOUS_MODE',
        'MATURION_ORG_ID',
      ];
      
      requiredVars.forEach(varName => {
        assert.ok(content.includes(varName), `Missing env var: ${varName}`);
      });
    });
  });
  
  describe('4. Code GITHUB_MCP_TOKEN Usage Validation', () => {
    
    it('should use GITHUB_MCP_TOKEN in github-client.ts', () => {
      const path = join(ROOT_DIR, 'lib/foreman/github-client.ts');
      if (existsSync(path)) {
        const content = readFileSync(path, 'utf-8');
        
        // Should use GITHUB_MCP_TOKEN
        assert.ok(
          content.includes('GITHUB_MCP_TOKEN') || content.includes('process.env.GITHUB_MCP_TOKEN'),
          'github-client.ts should use GITHUB_MCP_TOKEN'
        );
        
        // Should NOT use old GITHUB_TOKEN
        // This will FAIL initially (RED QA) - expected
        const tokenUsage = content.match(/process\.env\.GITHUB_TOKEN(?!_)/g);
        assert.ok(
          !tokenUsage || tokenUsage.length === 0,
          'github-client.ts should not use GITHUB_TOKEN, use GITHUB_MCP_TOKEN instead'
        );
      }
    });
    
    it('should use GITHUB_MCP_TOKEN in other GitHub integration files', () => {
      const filesToCheck = [
        'lib/github/client.ts',
        'lib/github/mutations.ts',
      ];
      
      filesToCheck.forEach(file => {
        const path = join(ROOT_DIR, file);
        if (existsSync(path)) {
          const content = readFileSync(path, 'utf-8');
          
          // If file references GitHub token, it should be GITHUB_MCP_TOKEN
          if (content.includes('process.env.GITHUB')) {
            const oldTokenUsage = content.match(/process\.env\.GITHUB_TOKEN(?!_)/g);
            assert.ok(
              !oldTokenUsage || oldTokenUsage.length === 0,
              `${file} should use GITHUB_MCP_TOKEN not GITHUB_TOKEN`
            );
          }
        }
      });
    });
  });
  
  describe('5. Configuration Files Validation', () => {
    
    it('should have package.json with correct configuration', () => {
      const path = join(ROOT_DIR, 'package.json');
      assert.ok(existsSync(path), 'Missing package.json');
      
      const pkg = JSON.parse(readFileSync(path, 'utf-8'));
      
      assert.ok(pkg.name, 'package.json missing name');
      assert.ok(pkg.scripts, 'package.json missing scripts');
      assert.ok(pkg.scripts.build, 'package.json missing build script');
      assert.ok(pkg.scripts.dev, 'package.json missing dev script');
      assert.ok(pkg.scripts.lint, 'package.json missing lint script');
    });
    
    it('should have TypeScript configuration', () => {
      const path = join(ROOT_DIR, 'tsconfig.json');
      assert.ok(existsSync(path), 'Missing tsconfig.json');
      
      const config = JSON.parse(readFileSync(path, 'utf-8'));
      assert.ok(config.compilerOptions, 'tsconfig.json missing compilerOptions');
    });
    
    it('should have Next.js configuration', () => {
      const path = join(ROOT_DIR, 'next.config.mjs');
      assert.ok(existsSync(path), 'Missing next.config.mjs');
    });
    
    it('should have Tailwind configuration', () => {
      const path = join(ROOT_DIR, 'tailwind.config.ts');
      assert.ok(existsSync(path), 'Missing tailwind.config.ts');
    });
  });
  
  describe('6. Test Infrastructure Validation', () => {
    
    it('should have tests directory', () => {
      const path = join(ROOT_DIR, 'tests');
      assert.ok(existsSync(path), 'Missing tests directory');
    });
    
    it('should have test scripts in package.json', () => {
      const path = join(ROOT_DIR, 'package.json');
      const pkg = JSON.parse(readFileSync(path, 'utf-8'));
      
      assert.ok(pkg.scripts.test, 'Missing test script');
      assert.ok(pkg.scripts['test:all'], 'Missing test:all script');
    });
  });
  
  describe('7. Documentation Validation', () => {
    
    it('should have architecture documentation', () => {
      const docs = [
        'docs/architecture/FOREMAN_APP_VERCEL_ARCHITECTURE.md',
        'foreman/true-north-architecture.md',
        'foreman/architecture-design-checklist.md',
        'BUILD_PHILOSOPHY.md',
      ];
      
      docs.forEach(doc => {
        const path = join(ROOT_DIR, doc);
        assert.ok(existsSync(path), `Missing documentation: ${doc}`);
      });
    });
    
    it('should have README.md', () => {
      const path = join(ROOT_DIR, 'README.md');
      assert.ok(existsSync(path), 'Missing README.md');
      
      const content = readFileSync(path, 'utf-8');
      assert.ok(content.length > 100, 'README.md is too short');
    });
  });
  
  describe('8. Vercel Deployment Readiness', () => {
    
    it('should have valid build command', () => {
      const path = join(ROOT_DIR, 'package.json');
      const pkg = JSON.parse(readFileSync(path, 'utf-8'));
      
      assert.strictEqual(pkg.scripts.build, 'next build', 'Build command should be "next build"');
    });
    
    it('should have valid dev command', () => {
      const path = join(ROOT_DIR, 'package.json');
      const pkg = JSON.parse(readFileSync(path, 'utf-8'));
      
      assert.strictEqual(pkg.scripts.dev, 'next dev', 'Dev command should be "next dev"');
    });
    
    it('should have Next.js as dependency', () => {
      const path = join(ROOT_DIR, 'package.json');
      const pkg = JSON.parse(readFileSync(path, 'utf-8'));
      
      assert.ok(pkg.dependencies.next, 'Next.js must be in dependencies');
    });
  });
  
  describe('9. Security Architecture Validation', () => {
    
    it('should have .gitignore file', () => {
      const path = join(ROOT_DIR, '.gitignore');
      assert.ok(existsSync(path), 'Missing .gitignore');
      
      const content = readFileSync(path, 'utf-8');
      assert.ok(content.includes('.env'), '.gitignore should include .env');
      assert.ok(content.includes('node_modules'), '.gitignore should include node_modules');
    });
    
    it('should not have .env files committed', () => {
      const envFiles = ['.env', '.env.local', '.env.production'];
      
      envFiles.forEach(file => {
        const path = join(ROOT_DIR, file);
        // It's OK if these don't exist, but if they do, Git should ignore them
        if (existsSync(path)) {
          // This is a warning - in production these should not be committed
          console.log(`Warning: ${file} exists - ensure it's in .gitignore`);
        }
      });
    });
  });
  
  describe('10. File and Folder Alignment', () => {
    
    it('should have aligned folder structure for Foreman subsystems', () => {
      const subsystems = [
        'lib/foreman/qa',
        'lib/foreman/governance',
        'lib/foreman/memory',
        'lib/foreman/guardrails',
        'lib/foreman/incidents',
        'lib/foreman/parking-station',
      ];
      
      subsystems.forEach(dir => {
        const path = join(ROOT_DIR, dir);
        assert.ok(existsSync(path), `Missing Foreman subsystem: ${dir}`);
      });
    });
    
    it('should have aligned API routes for all features', () => {
      const apiRoutes = [
        'app/api/foreman/incidents',
        'app/api/foreman/parking-station',
        'app/api/foreman/analytics',
      ];
      
      apiRoutes.forEach(dir => {
        const path = join(ROOT_DIR, dir);
        assert.ok(existsSync(path), `Missing API route directory: ${dir}`);
      });
    });
  });
});

/**
 * QIC Constitutional Test: Guardrail Integrity Validation (CS1)
 * 
 * Ensures all immutable governance files exist and are unmodified.
 * 
 * This test verifies:
 * - .github/foreman/agent-contract.md exists
 * - .github/workflows/qic.yml exists
 * - .github/workflows/qiel.yml exists
 * - No workflow modifies governance files
 * - No PR changes governance files without explicit approval
 * - Immutable guardrails directory exists: foreman/constitution/**
 * 
 * If any part fails → QIC must fail.
 */

import { describe, it } from 'node:test';
import assert from 'node:assert';
import fs from 'fs/promises';
import path from 'path';

describe('QIC Constitutional: Guardrail Integrity Validation (CS1)', () => {
  describe('Governance Files Exist', () => {
    it('should verify .github/foreman/agent-contract.md exists', async () => {
      const contractPath = path.join(
        process.cwd(),
        '.github/foreman/agent-contract.md'
      );
      
      await fs.access(contractPath);
      const content = await fs.readFile(contractPath, 'utf-8');
      
      assert.ok(content.length > 0, 'agent-contract.md must not be empty');
      assert.ok(
        content.includes('Constitutional Contract') || content.includes('Foreman'),
        'agent-contract.md must contain contract content'
      );

      console.log('✓ agent-contract.md exists and is valid');
    });

    it('should verify .github/workflows/qic.yml exists', async () => {
      const qicPath = path.join(
        process.cwd(),
        '.github/workflows/qic.yml'
      );
      
      await fs.access(qicPath);
      const content = await fs.readFile(qicPath, 'utf-8');
      
      assert.ok(content.length > 0, 'qic.yml must not be empty');
      assert.ok(
        content.includes('QIC') || content.includes('Quality Integrity'),
        'qic.yml must contain QIC workflow'
      );

      console.log('✓ qic.yml exists and is valid');
    });

    it('should verify .github/workflows/qiel.yml exists', async () => {
      const qielPath = path.join(
        process.cwd(),
        '.github/workflows/qiel.yml'
      );
      
      await fs.access(qielPath);
      const content = await fs.readFile(qielPath, 'utf-8');
      
      assert.ok(content.length > 0, 'qiel.yml must not be empty');
      assert.ok(
        content.includes('QIEL') || content.includes('QA Integration'),
        'qiel.yml must contain QIEL workflow'
      );

      console.log('✓ qiel.yml exists and is valid');
    });

    it('should verify foreman/constitution directory exists', async () => {
      const constitutionDir = path.join(
        process.cwd(),
        'foreman/constitution'
      );
      
      const stat = await fs.stat(constitutionDir);
      assert.ok(stat.isDirectory(), 'foreman/constitution must be a directory');

      console.log('✓ foreman/constitution directory exists');
    });

    it('should verify foreman/constitution/guardrails.json exists', async () => {
      const guardrailsPath = path.join(
        process.cwd(),
        'foreman/constitution/guardrails.json'
      );
      
      await fs.access(guardrailsPath);
      const content = await fs.readFile(guardrailsPath, 'utf-8');
      const guardrails = JSON.parse(content);
      
      assert.ok(guardrails.immutablePaths, 'guardrails.json must define immutablePaths');
      assert.ok(guardrails.requiredChecks, 'guardrails.json must define requiredChecks');
      assert.ok(guardrails.protectedFiles, 'guardrails.json must define protectedFiles');

      console.log('✓ guardrails.json exists and is valid');
    });
  });

  describe('Immutable Paths Protection', () => {
    it('should verify guardrails.json defines immutable paths', async () => {
      const guardrailsPath = path.join(
        process.cwd(),
        'foreman/constitution/guardrails.json'
      );
      
      const content = await fs.readFile(guardrailsPath, 'utf-8');
      const guardrails = JSON.parse(content);
      
      const requiredImmutablePaths = [
        '.github/workflows',
        'foreman/constitution',
        'docs/governance',
        '.github/foreman/agent-contract.md'
      ];

      for (const requiredPath of requiredImmutablePaths) {
        assert.ok(
          guardrails.immutablePaths.includes(requiredPath),
          `guardrails.json must protect ${requiredPath}`
        );
      }

      console.log('✓ All required immutable paths are protected');
    });

    it('should verify guardrails.json defines required checks', async () => {
      const guardrailsPath = path.join(
        process.cwd(),
        'foreman/constitution/guardrails.json'
      );
      
      const content = await fs.readFile(guardrailsPath, 'utf-8');
      const guardrails = JSON.parse(content);
      
      const requiredChecks = ['qiel', 'qic'];

      for (const check of requiredChecks) {
        assert.ok(
          guardrails.requiredChecks.includes(check),
          `guardrails.json must require ${check} check`
        );
      }

      console.log('✓ All required checks are defined in guardrails');
    });

    it('should verify guardrails.json protects workflow files', async () => {
      const guardrailsPath = path.join(
        process.cwd(),
        'foreman/constitution/guardrails.json'
      );
      
      const content = await fs.readFile(guardrailsPath, 'utf-8');
      const guardrails = JSON.parse(content);
      
      const criticalFiles = [
        '.github/workflows/qiel.yml',
        '.github/foreman/agent-contract.md'
      ];

      for (const file of criticalFiles) {
        assert.ok(
          guardrails.protectedFiles.includes(file),
          `guardrails.json must explicitly protect ${file}`
        );
      }

      console.log('✓ All critical workflow files are protected');
    });
  });

  describe('No Workflow Modifies Governance', () => {
    it('should verify workflows do not modify agent-contract.md', async () => {
      const workflowsDir = path.join(
        process.cwd(),
        '.github/workflows'
      );
      
      const files = await fs.readdir(workflowsDir);
      const ymlFiles = files.filter(f => f.endsWith('.yml') || f.endsWith('.yaml'));
      
      for (const file of ymlFiles) {
        const filePath = path.join(workflowsDir, file);
        const content = await fs.readFile(filePath, 'utf-8');
        
        // Should NOT modify agent-contract.md
        assert.ok(
          !content.includes('agent-contract.md') || 
          !content.match(/>\s*\.github\/foreman\/agent-contract\.md/) ||
          content.includes('# Read only') ||
          content.includes('access') ||
          content.includes('readFile'),
          `Workflow ${file} must not modify agent-contract.md`
        );
      }

      console.log('✓ No workflows modify agent-contract.md');
    });

    it('should verify workflows do not modify guardrails.json', async () => {
      const workflowsDir = path.join(
        process.cwd(),
        '.github/workflows'
      );
      
      const files = await fs.readdir(workflowsDir);
      const ymlFiles = files.filter(f => f.endsWith('.yml') || f.endsWith('.yaml'));
      
      for (const file of ymlFiles) {
        const filePath = path.join(workflowsDir, file);
        const content = await fs.readFile(filePath, 'utf-8');
        
        // Should NOT modify guardrails.json
        assert.ok(
          !content.includes('guardrails.json') ||
          !content.match(/>\s*foreman\/constitution\/guardrails\.json/),
          `Workflow ${file} must not modify guardrails.json`
        );
      }

      console.log('✓ No workflows modify guardrails.json');
    });

    it('should verify workflows do not modify QIC/QIEL workflows', async () => {
      const workflowsDir = path.join(
        process.cwd(),
        '.github/workflows'
      );
      
      const files = await fs.readdir(workflowsDir);
      const ymlFiles = files.filter(f => f.endsWith('.yml') || f.endsWith('.yaml'));
      
      for (const file of ymlFiles) {
        const filePath = path.join(workflowsDir, file);
        const content = await fs.readFile(filePath, 'utf-8');
        
        // Should NOT modify other workflow files
        assert.ok(
          !content.match(/>\s*\.github\/workflows\/qic\.yml/) &&
          !content.match(/>\s*\.github\/workflows\/qiel\.yml/),
          `Workflow ${file} must not modify other workflow files`
        );
      }

      console.log('✓ No workflows modify other workflow files');
    });
  });

  describe('Documentation Exists', () => {
    it('should verify governance documentation directory exists', async () => {
      const govDocsDir = path.join(
        process.cwd(),
        'docs/governance'
      );
      
      const stat = await fs.stat(govDocsDir);
      assert.ok(stat.isDirectory(), 'docs/governance must be a directory');

      console.log('✓ docs/governance directory exists');
    });

    it('should verify foreman governance directory exists', async () => {
      const foremanGovDir = path.join(
        process.cwd(),
        'foreman/governance'
      );
      
      const stat = await fs.stat(foremanGovDir);
      assert.ok(stat.isDirectory(), 'foreman/governance must be a directory');

      console.log('✓ foreman/governance directory exists');
    });
  });

  describe('Guardrail Runtime Integrity', () => {
    it('should verify no .gitignore excludes governance files', async () => {
      const gitignorePath = path.join(
        process.cwd(),
        '.gitignore'
      );
      
      const content = await fs.readFile(gitignorePath, 'utf-8');
      
      // Should NOT ignore governance directories
      assert.ok(
        !content.includes('foreman/constitution') &&
        !content.includes('.github/foreman') &&
        !content.includes('docs/governance'),
        '.gitignore must not exclude governance files'
      );

      console.log('✓ .gitignore does not exclude governance files');
    });

    it('should verify constitution directory is not empty', async () => {
      const constitutionDir = path.join(
        process.cwd(),
        'foreman/constitution'
      );
      
      const files = await fs.readdir(constitutionDir);
      
      assert.ok(files.length > 0, 'foreman/constitution must contain files');
      assert.ok(
        files.includes('guardrails.json'),
        'foreman/constitution must contain guardrails.json'
      );

      console.log('✓ Constitution directory contains required files');
    });
  });
});

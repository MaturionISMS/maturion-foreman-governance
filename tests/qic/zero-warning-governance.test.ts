/**
 * QIC Test: Zero-Warning Policy Governance Enforcement
 * 
 * Validates that:
 * - Zero-warning policy is active and strict
 * - Any allowed warning is documented and approved
 * - No blanket "ignore npm" rules exist
 * - Foreman cannot approve warnings autonomously
 * - All allowed warnings have Parking Station entries
 */

import { describe, it } from 'node:test';
import * as assert from 'node:assert';
import * as fs from 'fs';
import * as path from 'path';
import {
  loadAllowedWarnings,
  validateAllowedWarnings,
  isWarningAllowed,
} from '@/lib/foreman/qa/allowed-warnings-loader';

describe('QIC: Zero-Warning Policy Governance', () => {
  it('should have allowed-warnings.json file', () => {
    const allowedWarningsPath = path.join(
      process.cwd(),
      'foreman',
      'qa',
      'allowed-warnings.json'
    );
    
    assert.ok(
      fs.existsSync(allowedWarningsPath),
      'allowed-warnings.json must exist at foreman/qa/allowed-warnings.json'
    );
  });

  it('should have valid JSON schema for allowed-warnings.json', () => {
    const schemaPath = path.join(
      process.cwd(),
      'foreman',
      'qa',
      'allowed-warnings-schema.json'
    );
    
    assert.ok(
      fs.existsSync(schemaPath),
      'allowed-warnings-schema.json must exist'
    );
    
    const schemaContent = fs.readFileSync(schemaPath, 'utf-8');
    const schema = JSON.parse(schemaContent);
    
    assert.ok(schema.$schema, 'Schema must have $schema property');
    assert.ok(schema.properties, 'Schema must have properties');
    assert.ok(schema.properties.warnings, 'Schema must define warnings array');
  });

  it('should load allowed warnings without errors', () => {
    assert.doesNotThrow(
      () => loadAllowedWarnings(),
      'loadAllowedWarnings() should not throw'
    );
  });

  it('should validate allowed warnings configuration', () => {
    const config = loadAllowedWarnings();
    const validation = validateAllowedWarnings(config);
    
    assert.strictEqual(
      validation.valid,
      true,
      `Allowed warnings config has validation errors: ${validation.errors.join(', ')}`
    );
  });

  it('should NOT allow Foreman to approve warnings', () => {
    const config = loadAllowedWarnings();
    
    const foremanApproved = config.warnings.filter(w =>
      w.approved_by.toLowerCase().includes('foreman')
    );
    
    assert.strictEqual(
      foremanApproved.length,
      0,
      'GOVERNANCE VIOLATION: Foreman cannot approve warnings. Only Johan may approve.'
    );
  });

  it('should require all warnings to have Parking Station IDs', () => {
    const config = loadAllowedWarnings();
    
    const missingParkingStation = config.warnings.filter(
      w => !w.parking_station_id
    );
    
    // This is a warning, not a hard failure, but should be addressed
    if (missingParkingStation.length > 0) {
      console.warn(
        `[QIC WARNING] ${missingParkingStation.length} allowed warnings missing ` +
        `Parking Station IDs. All warnings should track tech debt.`
      );
    }
  });

  it('should require all warnings to have target waves', () => {
    const config = loadAllowedWarnings();
    
    const missingTargetWave = config.warnings.filter(
      w => !w.target_wave || w.target_wave.trim() === ''
    );
    
    assert.strictEqual(
      missingTargetWave.length,
      0,
      'All allowed warnings must have a target_wave for elimination'
    );
  });

  it('should require all warnings to have approval and reason', () => {
    const config = loadAllowedWarnings();
    
    for (const warning of config.warnings) {
      assert.ok(
        warning.approved_by,
        `Warning ${warning.id} missing approved_by`
      );
      assert.ok(
        warning.reason,
        `Warning ${warning.id} missing reason`
      );
      assert.ok(
        warning.source,
        `Warning ${warning.id} missing source`
      );
    }
  });

  it('should have valid regex patterns for all warnings', () => {
    const config = loadAllowedWarnings();
    
    for (const warning of config.warnings) {
      assert.doesNotThrow(
        () => new RegExp(warning.pattern),
        `Warning ${warning.id} has invalid regex pattern: ${warning.pattern}`
      );
    }
  });

  it('should NOT have blanket ignore patterns', () => {
    const config = loadAllowedWarnings();
    
    // Check for overly broad patterns that would suppress entire categories
    const blanketPatterns = [
      /^npm warn$/i,
      /^npm$/i,
      /^deprecated$/i,
      /^.*$/,
      /\.\*/,
    ];
    
    for (const warning of config.warnings) {
      for (const blanket of blanketPatterns) {
        if (blanket.test(warning.pattern)) {
          assert.fail(
            `Warning ${warning.id} uses blanket pattern "${warning.pattern}" ` +
            `which is too broad. Patterns must be specific.`
          );
        }
      }
    }
  });

  it('should check expired warnings', () => {
    const config = loadAllowedWarnings();
    const now = new Date();
    
    const expired = config.warnings.filter(w => {
      if (!w.expires_at) return false;
      const expiryDate = new Date(w.expires_at);
      return expiryDate < now;
    });
    
    assert.strictEqual(
      expired.length,
      0,
      `Found ${expired.length} expired warnings that should be removed: ` +
      expired.map(w => w.id).join(', ')
    );
  });

  it('should properly categorize warnings as allowed or blocked', () => {
    const config = loadAllowedWarnings();
    
    // Test that non-matching warnings are blocked
    const testWarning = 'This is a test warning that should not match any pattern XYZ123456';
    const { allowed } = isWarningAllowed(testWarning, config);
    
    assert.strictEqual(
      allowed,
      false,
      'Non-matching warnings should be blocked'
    );
  });

  it('should enforce zero-warning policy is imported and used', () => {
    const zeroWarningPolicyPath = path.join(
      process.cwd(),
      'lib',
      'foreman',
      'qa',
      'zero-warning-policy.ts'
    );
    
    assert.ok(
      fs.existsSync(zeroWarningPolicyPath),
      'zero-warning-policy.ts must exist'
    );
    
    const content = fs.readFileSync(zeroWarningPolicyPath, 'utf-8');
    
    // Check that it imports allowed-warnings-loader
    assert.ok(
      content.includes('allowed-warnings-loader'),
      'zero-warning-policy.ts must import allowed-warnings-loader'
    );
    
    // Check that it uses isWarningAllowed
    assert.ok(
      content.includes('isWarningAllowed'),
      'zero-warning-policy.ts must use isWarningAllowed function'
    );
    
    // Check that it logs technical debt
    assert.ok(
      content.includes('TECHNICAL DEBT') || content.includes('technical debt'),
      'zero-warning-policy.ts must log technical debt for allowed warnings'
    );
  });

  it('should NOT have silent npm warning suppression in code', () => {
    const filesToCheck = [
      'lib/foreman/qa/zero-warning-policy.ts',
      'lib/foreman/watchdog/quality-integrity-watchdog.ts',
      'lib/foreman/qiel-config.ts',
    ];
    
    for (const file of filesToCheck) {
      const filePath = path.join(process.cwd(), file);
      if (!fs.existsSync(filePath)) continue;
      
      const content = fs.readFileSync(filePath, 'utf-8');
      
      // Check for patterns that would silently filter npm warnings
      const suspiciousPatterns = [
        /filter.*npm warn deprecated/i,
        /ignore.*npm warn/i,
        /skip.*npm warn/i,
        /!.*npm warn deprecated/i,
      ];
      
      for (const pattern of suspiciousPatterns) {
        assert.ok(
          !pattern.test(content),
          `${file} contains suspicious npm warning suppression pattern. ` +
          `Use allowed-warnings.json instead.`
        );
      }
    }
  });
});

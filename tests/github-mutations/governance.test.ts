/**
 * GitHub Governance Validation Tests
 * Tests for governance rails: QA enforcement, compliance, approval workflow
 */

import { describe, test } from 'node:test'
import { strict as assert } from 'node:assert'
import {
  validateQA,
  validateCompliance,
  validateApproval,
  detectSecrets,
  validateOrganisation,
  validatePRCreation,
  validateIssueComment,
  validateIssueClosure,
  validateBranchProtectionUpdate,
} from '../../lib/foreman/governance/github-governance'
import {
  GovernanceViolationError,
  ComplianceViolationError,
  GovernanceApprovalRequiredError,
} from '../../types/github-events'
import {
  createMockQAResults,
  createMockComplianceResults,
  createMockPRConfig,
  createMockGovernanceApproval,
} from './test-utils'
import { clearGovernanceEvents } from '../../lib/foreman/memory/governance-memory'

describe('GitHub Governance Validation', () => {
  // Clear governance events before each test
  test('setup: clear governance events', () => {
    clearGovernanceEvents()
    console.log('✓ Governance events cleared')
  })

  describe('QA Enforcement (Rail 1)', () => {
    test('should pass when QA results are 100% passed', async () => {
      const qaResults = createMockQAResults(true)
      
      await validateQA(qaResults)
      console.log('✓ QA validation passed for 100% QA pass')
    })

    test('should fail when QA results are not 100% passed', async () => {
      const qaResults = createMockQAResults(false)
      
      await assert.rejects(
        async () => await validateQA(qaResults),
        (error: Error) => {
          assert(error instanceof GovernanceViolationError)
          assert(error.message.includes('QA FAILED'))
          assert(error.message.includes('7/10'))
          return true
        }
      )
      console.log('✓ QA validation failed for partial QA pass')
    })

    test('should fail when QA has blockers even if passed', async () => {
      const qaResults = {
        passed: true,
        totalChecks: 10,
        passedChecks: 10,
        blockers: ['Critical security vulnerability'],
      }
      
      await assert.rejects(
        async () => await validateQA(qaResults),
        (error: Error) => {
          assert(error instanceof GovernanceViolationError)
          assert(error.message.includes('QA BLOCKED'))
          assert(error.message.includes('blocking issue'))
          return true
        }
      )
      console.log('✓ QA validation failed for blockers present')
    })
  })

  describe('Compliance Enforcement (Rail 2)', () => {
    test('should pass when compliance results are valid', async () => {
      const complianceResults = createMockComplianceResults(true)
      
      await validateCompliance(complianceResults)
      console.log('✓ Compliance validation passed')
    })

    test('should fail when compliance did not pass', async () => {
      const complianceResults = {
        passed: false,
        secretsDetected: false,
        orgValidated: true,
      }
      
      await assert.rejects(
        async () => await validateCompliance(complianceResults),
        (error: Error) => {
          assert(error instanceof ComplianceViolationError)
          assert(error.message.includes('COMPLIANCE FAILED'))
          return true
        }
      )
      console.log('✓ Compliance validation failed for general failure')
    })

    test('should fail when secrets are detected', async () => {
      const complianceResults = {
        passed: false,
        secretsDetected: true,
        orgValidated: true,
      }
      
      await assert.rejects(
        async () => await validateCompliance(complianceResults),
        (error: Error) => {
          assert(error instanceof ComplianceViolationError)
          assert(error.message.includes('Secrets detected'))
          return true
        }
      )
      console.log('✓ Compliance validation failed for secrets detected')
    })

    test('should fail when organization is not validated', async () => {
      const complianceResults = {
        passed: false,
        secretsDetected: false,
        orgValidated: false,
      }
      
      await assert.rejects(
        async () => await validateCompliance(complianceResults),
        (error: Error) => {
          assert(error instanceof ComplianceViolationError)
          assert(error.message.includes('Organization not validated'))
          return true
        }
      )
      console.log('✓ Compliance validation failed for org not validated')
    })
  })

  describe('Approval Workflow (Rail 3)', () => {
    test('should pass when valid approval is provided', async () => {
      const approval = createMockGovernanceApproval()
      
      await validateApproval(approval)
      console.log('✓ Approval validation passed')
    })

    test('should fail when approval is missing', async () => {
      await assert.rejects(
        async () => await validateApproval(undefined),
        (error: Error) => {
          assert(error instanceof GovernanceApprovalRequiredError)
          assert(error.message.includes('APPROVAL REQUIRED'))
          return true
        }
      )
      console.log('✓ Approval validation failed for missing approval')
    })

    test('should fail when approvedBy is missing', async () => {
      const approval = {
        approvedBy: '',
        reason: 'Test',
      }
      
      await assert.rejects(
        async () => await validateApproval(approval),
        (error: Error) => {
          assert(error instanceof GovernanceApprovalRequiredError)
          return true
        }
      )
      console.log('✓ Approval validation failed for missing approvedBy')
    })
  })

  describe('Secrets Detection (Rail 4)', () => {
    test('should detect no secrets in clean text', async () => {
      const text = 'This is a clean PR description with no secrets.'
      
      const result = await detectSecrets(text)
      
      assert.strictEqual(result.found, false)
      assert.strictEqual(result.patterns.length, 0)
      console.log('✓ No secrets detected in clean text')
    })

    test('should detect GitHub token', async () => {
      const text = 'Here is a token: ghp_1234567890abcdefghijklmnopqrstuvwxyz'
      
      const result = await detectSecrets(text)
      
      assert.strictEqual(result.found, true)
      assert(result.patterns.includes('GITHUB_TOKEN'))
      console.log('✓ GitHub token detected')
    })

    test('should detect AWS key', async () => {
      const text = 'AWS key: AKIAIOSFODNN7EXAMPLE'
      
      const result = await detectSecrets(text)
      
      assert.strictEqual(result.found, true)
      assert(result.patterns.includes('AWS_KEY'))
      console.log('✓ AWS key detected')
    })

    test('should detect private key', async () => {
      const text = '-----BEGIN RSA PRIVATE KEY-----\nMIIEpAIBAAKCAQEA...'
      
      const result = await detectSecrets(text)
      
      assert.strictEqual(result.found, true)
      assert(result.patterns.includes('PRIVATE_KEY'))
      console.log('✓ Private key detected')
    })

    test('should detect JWT token', async () => {
      const text = 'Token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
      
      const result = await detectSecrets(text)
      
      assert.strictEqual(result.found, true)
      assert(result.patterns.includes('JWT_TOKEN'))
      console.log('✓ JWT token detected')
    })

    test('should detect password assignment', async () => {
      const text = 'password = "MySecretPassword123!"'
      
      const result = await detectSecrets(text)
      
      assert.strictEqual(result.found, true)
      assert(result.patterns.includes('PASSWORD'))
      console.log('✓ Password assignment detected')
    })

    test('should detect secret assignment', async () => {
      const text = 'secret: "my-super-secret-value"'
      
      const result = await detectSecrets(text)
      
      assert.strictEqual(result.found, true)
      assert(result.patterns.includes('SECRET'))
      console.log('✓ Secret assignment detected')
    })
  })

  describe('Organization Validation', () => {
    test('should validate organization when no restrictions', async () => {
      // Clear env var to test no restrictions
      const originalEnv = process.env.AUTHORIZED_GITHUB_ORGS
      delete process.env.AUTHORIZED_GITHUB_ORGS
      
      const result = await validateOrganisation('any-org')
      
      assert.strictEqual(result, true)
      console.log('✓ Organization validated with no restrictions')
      
      // Restore env
      if (originalEnv) {
        process.env.AUTHORIZED_GITHUB_ORGS = originalEnv
      }
    })

    test('should validate authorized organization', async () => {
      const originalEnv = process.env.AUTHORIZED_GITHUB_ORGS
      process.env.AUTHORIZED_GITHUB_ORGS = 'org1,org2,test-org'
      
      const result = await validateOrganisation('test-org')
      
      assert.strictEqual(result, true)
      console.log('✓ Authorized organization validated')
      
      // Restore env
      if (originalEnv !== undefined) {
        process.env.AUTHORIZED_GITHUB_ORGS = originalEnv
      } else {
        delete process.env.AUTHORIZED_GITHUB_ORGS
      }
    })

    test('should reject unauthorized organization', async () => {
      const originalEnv = process.env.AUTHORIZED_GITHUB_ORGS
      process.env.AUTHORIZED_GITHUB_ORGS = 'org1,org2'
      
      const result = await validateOrganisation('unauthorized-org')
      
      assert.strictEqual(result, false)
      console.log('✓ Unauthorized organization rejected')
      
      // Restore env
      if (originalEnv !== undefined) {
        process.env.AUTHORIZED_GITHUB_ORGS = originalEnv
      } else {
        delete process.env.AUTHORIZED_GITHUB_ORGS
      }
    })
  })

  describe('PR Creation Validation', () => {
    test('should pass for valid PR config', async () => {
      const config = createMockPRConfig()
      
      await validatePRCreation(config)
      console.log('✓ PR creation validation passed')
    })

    test('should fail for QA failures', async () => {
      const config = createMockPRConfig()
      config.metadata.qaResults = createMockQAResults(false)
      
      await assert.rejects(
        async () => await validatePRCreation(config),
        (error: Error) => {
          assert(error instanceof GovernanceViolationError)
          return true
        }
      )
      console.log('✓ PR creation blocked for QA failure')
    })

    test('should fail for compliance failures', async () => {
      const config = createMockPRConfig()
      config.metadata.complianceResults = createMockComplianceResults(false)
      
      await assert.rejects(
        async () => await validatePRCreation(config),
        (error: Error) => {
          assert(error instanceof ComplianceViolationError)
          return true
        }
      )
      console.log('✓ PR creation blocked for compliance failure')
    })

    test('should fail for secrets in PR body', async () => {
      const config = createMockPRConfig()
      config.body = 'Here is my token: ghp_1234567890abcdefghijklmnopqrstuvwxyz'
      
      await assert.rejects(
        async () => await validatePRCreation(config),
        (error: Error) => {
          assert(error instanceof ComplianceViolationError)
          assert(error.message.includes('Secrets detected'))
          return true
        }
      )
      console.log('✓ PR creation blocked for secrets in body')
    })
  })

  describe('Issue Comment Validation', () => {
    test('should pass for clean comment', async () => {
      await validateIssueComment('test-owner', 'This is a clean comment')
      console.log('✓ Issue comment validation passed')
    })

    test('should fail for secrets in comment', async () => {
      const comment = 'Here is my password: password="SuperSecret123"'
      
      await assert.rejects(
        async () => await validateIssueComment('test-owner', comment),
        (error: Error) => {
          assert(error instanceof ComplianceViolationError)
          assert(error.message.includes('Secrets detected'))
          return true
        }
      )
      console.log('✓ Issue comment blocked for secrets')
    })
  })

  describe('Issue Closure Validation', () => {
    test('should pass with valid reason', async () => {
      await validateIssueClosure('Fixed via PR #123')
      console.log('✓ Issue closure validation passed')
    })

    test('should fail without reason', async () => {
      await assert.rejects(
        async () => await validateIssueClosure(''),
        (error: Error) => {
          assert(error instanceof GovernanceViolationError)
          assert(error.message.includes('Closure reason is required'))
          return true
        }
      )
      console.log('✓ Issue closure blocked without reason')
    })

    test('should fail with whitespace-only reason', async () => {
      await assert.rejects(
        async () => await validateIssueClosure('   '),
        (error: Error) => {
          assert(error instanceof GovernanceViolationError)
          return true
        }
      )
      console.log('✓ Issue closure blocked with whitespace-only reason')
    })
  })

  describe('Branch Protection Update Validation', () => {
    test('should pass with valid approval', async () => {
      const approval = createMockGovernanceApproval()
      
      await validateBranchProtectionUpdate(approval)
      console.log('✓ Branch protection update validation passed')
    })

    test('should fail without approval', async () => {
      await assert.rejects(
        async () => await validateBranchProtectionUpdate(undefined),
        (error: Error) => {
          assert(error instanceof GovernanceApprovalRequiredError)
          return true
        }
      )
      console.log('✓ Branch protection update blocked without approval')
    })
  })
})

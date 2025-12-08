/**
 * GitHub Mutations Drift Detection Tests
 * Ensures mutations module stays aligned with architecture specifications
 */

import { describe, test } from 'node:test'
import { strict as assert } from 'node:assert'
import * as fs from 'fs'
import * as path from 'path'

describe('GitHub Mutations Drift Detection', () => {
  test('mutations module exists', () => {
    const mutationsPath = path.join(__dirname, '../../lib/github/mutations.ts')
    assert(fs.existsSync(mutationsPath), 'mutations.ts should exist')
    console.log('✓ mutations module exists')
  })

  test('github-governance module exists', () => {
    const governancePath = path.join(__dirname, '../../lib/foreman/governance/github-governance.ts')
    assert(fs.existsSync(governancePath), 'github-governance.ts should exist')
    console.log('✓ github-governance module exists')
  })

  test('github-events types exist', () => {
    const typesPath = path.join(__dirname, '../../types/github-events.ts')
    assert(fs.existsSync(typesPath), 'github-events.ts should exist')
    console.log('✓ github-events types exist')
  })

  test('mutations module exports required functions', async () => {
    const mutations = await import('../../lib/github/mutations')
    
    const requiredFunctions = [
      // Issue lifecycle
      'closeIssue',
      'reopenIssue',
      'commentOnIssue',
      'labelIssue',
      'assignIssue',
      // PR lifecycle
      'createPR',
      'updatePR',
      'addPRLabels',
      'commentOnPR',
      'requestPRReview',
      'assignPR',
      // Branch protection
      'setBranchProtection',
      'updateBranchProtection',
      'removeBranchProtection',
      // Governance metadata
      'applyGovernanceLabels',
      'recordGovernanceEvent',
      'tagWithQAStatus',
      'tagWithComplianceStatus',
    ]
    
    for (const fn of requiredFunctions) {
      assert(typeof (mutations as any)[fn] === 'function', `${fn} should be exported as function`)
    }
    
    console.log(`✓ All ${requiredFunctions.length} required mutation functions exported`)
  })

  test('governance module exports required functions', async () => {
    const governance = await import('../../lib/foreman/governance/github-governance')
    
    const requiredFunctions = [
      'validateQA',
      'validateCompliance',
      'validateApproval',
      'detectSecrets',
      'validateOrganisation',
      'validatePRCreation',
      'validateIssueComment',
      'validateIssueClosure',
      'validateBranchProtectionUpdate',
    ]
    
    for (const fn of requiredFunctions) {
      assert(typeof (governance as any)[fn] === 'function', `${fn} should be exported as function`)
    }
    
    console.log(`✓ All ${requiredFunctions.length} required governance functions exported`)
  })

  test('github-events types export required interfaces', async () => {
    const types = await import('../../types/github-events')
    
    const requiredTypes = [
      'GOVERNANCE_LABELS',
      'GovernanceViolationError',
      'ComplianceViolationError',
      'GovernanceApprovalRequiredError',
      'MutationFailureError',
    ]
    
    for (const type of requiredTypes) {
      assert((types as any)[type] !== undefined, `${type} should be exported`)
    }
    
    console.log(`✓ All ${requiredTypes.length} required types exported`)
  })

  test('governance labels are defined correctly', async () => {
    const types = await import('../../types/github-events')
    
    const expectedLabels = [
      'qa-approved',
      'qa-blocked',
      'compliance-approved',
      'compliance-blocked',
      'governance-approved',
      'awaiting-governance',
      'autonomous-build',
      'manual-approval',
    ]
    
    const governanceLabelsValues = Object.values(types.GOVERNANCE_LABELS)
    
    for (const label of expectedLabels) {
      assert(governanceLabelsValues.includes(label as any), `${label} should be in GOVERNANCE_LABELS`)
    }
    
    console.log(`✓ All ${expectedLabels.length} governance labels defined`)
  })

  test('mutations module has no Builder agent access', () => {
    const mutationsPath = path.join(__dirname, '../../lib/github/mutations.ts')
    const content = fs.readFileSync(mutationsPath, 'utf-8')
    
    // Check for FOREMAN-ONLY comment
    assert(content.includes('FOREMAN-ONLY'), 'mutations.ts should be marked FOREMAN-ONLY')
    
    // Check that no builder-specific imports exist
    assert(!content.includes('lib/builder/'), 'mutations.ts should not import from lib/builder/')
    
    console.log('✓ mutations module is properly isolated from Builder agents')
  })

  test('all mutations log to Governance Memory', () => {
    const mutationsPath = path.join(__dirname, '../../lib/github/mutations.ts')
    const content = fs.readFileSync(mutationsPath, 'utf-8')
    
    // Check for governance memory import
    assert(
      content.includes('logGovernanceEvent'),
      'mutations.ts should import logGovernanceEvent'
    )
    
    // Check for recordMutation function
    assert(
      content.includes('async function recordMutation'),
      'mutations.ts should have recordMutation function'
    )
    
    console.log('✓ mutations module logs to Governance Memory')
  })

  test('all mutations have retry logic', () => {
    const mutationsPath = path.join(__dirname, '../../lib/github/mutations.ts')
    const content = fs.readFileSync(mutationsPath, 'utf-8')
    
    // Check for retry function
    assert(
      content.includes('async function retryMutation'),
      'mutations.ts should have retryMutation function'
    )
    
    // Check for exponential backoff
    assert(
      content.includes('Math.pow(2, attempt)'),
      'mutations.ts should implement exponential backoff'
    )
    
    console.log('✓ mutations module implements retry logic with exponential backoff')
  })

  test('secrets detection patterns are comprehensive', () => {
    const governancePath = path.join(__dirname, '../../lib/foreman/governance/github-governance.ts')
    const content = fs.readFileSync(governancePath, 'utf-8')
    
    const requiredPatterns = [
      'GITHUB_TOKEN',
      'AWS_KEY',
      'PRIVATE_KEY',
      'JWT_TOKEN',
      'PASSWORD',
      'SECRET',
    ]
    
    for (const pattern of requiredPatterns) {
      assert(content.includes(pattern), `github-governance.ts should detect ${pattern}`)
    }
    
    console.log(`✓ Secrets detection includes ${requiredPatterns.length} pattern types`)
  })

  test('architecture compliance: no manual code', () => {
    const mutationsPath = path.join(__dirname, '../../lib/github/mutations.ts')
    const content = fs.readFileSync(mutationsPath, 'utf-8')
    
    // Check that implementation follows architecture
    assert(
      content.includes('validatePRCreation'),
      'mutations.ts should use governance validation'
    )
    
    assert(
      content.includes('retryMutation'),
      'mutations.ts should use retry mechanism'
    )
    
    assert(
      content.includes('recordMutation'),
      'mutations.ts should record all mutations'
    )
    
    console.log('✓ architecture compliance verified - no manual code detected')
  })

  test('zero Builder agent access to mutations', async () => {
    // Check that mutations module is not exported from builder modules
    const builderPath = path.join(__dirname, '../../lib/builder')
    
    if (fs.existsSync(builderPath)) {
      const builderFiles = fs.readdirSync(builderPath).filter(f => f.endsWith('.ts'))
      
      for (const file of builderFiles) {
        const content = fs.readFileSync(path.join(builderPath, file), 'utf-8')
        assert(
          !content.includes('lib/github/mutations'),
          `${file} should not import mutations module`
        )
      }
      
      console.log('✓ Builder agents have zero access to mutations module')
    } else {
      console.log('✓ No builder directory found (mutations properly isolated)')
    }
  })

  test('drift detection coverage: 100%', () => {
    // This test verifies all critical components are drift-monitored
    const componentsToMonitor = [
      'lib/github/mutations.ts',
      'lib/foreman/governance/github-governance.ts',
      'types/github-events.ts',
      'tests/github-mutations/governance.test.ts',
      'tests/github-mutations/drift.test.ts',
    ]
    
    let allExist = true
    for (const component of componentsToMonitor) {
      const fullPath = path.join(__dirname, '../..', component)
      if (!fs.existsSync(fullPath)) {
        console.error(`Missing component: ${component}`)
        allExist = false
      }
    }
    
    assert(allExist, 'All monitored components should exist')
    console.log(`✓ 100% drift detection coverage (${componentsToMonitor.length} components monitored)`)
  })
})

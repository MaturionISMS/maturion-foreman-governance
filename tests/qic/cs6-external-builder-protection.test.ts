/**
 * QIC Constitutional Test: External Builder Protection (CS6)
 * 
 * Ensures external builders are blocked and auto-reassignment works.
 * 
 * This test verifies:
 * - External builder detection works correctly
 * - Maturion builders are authorized
 * - External builders trigger critical alerts
 * - Auto-reassignment to Foreman works
 * - Auto-bootstrap of Maturion Builder works
 * - Commit inspection blocks unauthorized commits
 * - Dashboard integration provides status
 * 
 * If any part fails → CS6 enforcement is compromised.
 */

import { describe, it } from 'node:test'
import assert from 'node:assert'
import {
  detectBuilderIdentity,
  validateBuilderAuthorization,
  enforceBuilderAuthorization,
  checkMaturionBuilderExists,
  bootstrapMaturionBuilder,
  inspectCommitMetadata,
  getBuilderAuthorizationStatus,
  reassignToForeman,
  type BuilderIdentity
} from '@/lib/foreman/constitution/external-builder-protection'
import * as fs from 'fs'
import * as path from 'path'

describe('QIC Constitutional: External Builder Protection (CS6)', () => {
  
  describe('CS6-1: External Builder Detection', () => {
    it('should detect Foreman as Maturion builder', () => {
      const builder = detectBuilderIdentity({
        assignedAgent: 'Foreman'
      })
      
      assert.strictEqual(builder.type, 'maturion')
      assert.strictEqual(builder.certified, true)
      assert.strictEqual(builder.name, 'Foreman')
      
      console.log('✓ Foreman detected as Maturion builder')
    })
    
    it('should detect Maturion Builder as Maturion builder', () => {
      const builder = detectBuilderIdentity({
        assignedAgent: 'Maturion Builder'
      })
      
      assert.strictEqual(builder.type, 'maturion')
      assert.strictEqual(builder.certified, true)
      assert.strictEqual(builder.name, 'Maturion Builder')
      
      console.log('✓ Maturion Builder detected as Maturion builder')
    })
    
    it('should detect GitHub Copilot as external builder', () => {
      const builder = detectBuilderIdentity({
        assignedAgent: 'GitHub Copilot'
      })
      
      assert.strictEqual(builder.type, 'external')
      assert.strictEqual(builder.certified, false)
      
      console.log('✓ GitHub Copilot detected as external builder')
    })
    
    it('should detect copilot in commit author as external builder', () => {
      const builder = detectBuilderIdentity({
        commitAuthor: 'github-actions[bot]'
      })
      
      assert.strictEqual(builder.type, 'external')
      assert.strictEqual(builder.certified, false)
      
      console.log('✓ github-actions detected as external builder')
    })
    
    it('should detect unknown agent as external builder', () => {
      const builder = detectBuilderIdentity({
        assignedAgent: 'RandomAgent'
      })
      
      assert.strictEqual(builder.type, 'external')
      assert.strictEqual(builder.certified, false)
      
      console.log('✓ Unknown agent detected as external builder')
    })
  })
  
  describe('CS6-2: Builder Authorization Validation', () => {
    it('should authorize Maturion certified builders', async () => {
      const builder: BuilderIdentity = {
        name: 'Foreman',
        type: 'maturion',
        certified: true
      }
      
      const result = await validateBuilderAuthorization(builder)
      
      assert.strictEqual(result.authorized, true)
      assert.strictEqual(result.action, 'allow')
      
      console.log('✓ Maturion builder authorized')
    })
    
    it('should block external builders and raise alert', async () => {
      const builder: BuilderIdentity = {
        name: 'GitHub Copilot',
        type: 'external',
        certified: false
      }
      
      const result = await validateBuilderAuthorization(builder)
      
      assert.strictEqual(result.authorized, false)
      assert.ok(result.action === 'reassign' || result.action === 'bootstrap')
      assert.strictEqual(result.blockedBy, 'CS6_ROBOTICS_LAW_8')
      assert.ok(result.incident_id, 'Should have incident_id from alert')
      
      console.log('✓ External builder blocked with alert')
    })
    
    it('should block unknown builders', async () => {
      const builder: BuilderIdentity = {
        name: 'Unknown Agent',
        type: 'unknown',
        certified: false
      }
      
      const result = await validateBuilderAuthorization(builder)
      
      assert.strictEqual(result.authorized, false)
      // Unknown builders without certification trigger bootstrap/reassign like external
      assert.ok(result.action === 'bootstrap' || result.action === 'reassign')
      
      console.log('✓ Unknown builder blocked')
    })
  })
  
  describe('CS6-3: Auto-Reassignment', () => {
    it('should reassign task to Foreman and log event', async () => {
      const overrideEvent = await reassignToForeman('GitHub Copilot', {
        issueNumber: 123,
        userName: 'johan',
        reason: 'External builder prohibited'
      })
      
      assert.strictEqual(overrideEvent.originalBuilder, 'GitHub Copilot')
      assert.strictEqual(overrideEvent.reassignedTo, 'Foreman')
      assert.ok(overrideEvent.incident_id)
      assert.ok(overrideEvent.timestamp)
      
      console.log('✓ Task reassigned to Foreman with event logging')
    })
  })
  
  describe('CS6-4: Auto-Bootstrap Maturion Builder', () => {
    it('should check if Maturion Builder exists', async () => {
      const exists = await checkMaturionBuilderExists()
      // Result depends on whether bootstrap has run
      assert.ok(typeof exists === 'boolean')
      
      console.log(`✓ Maturion Builder exists check: ${exists}`)
    })
    
    it('should bootstrap Maturion Builder if missing', async () => {
      // Clean up first if exists
      const agentPath = '.github/agents/maturion-builder.agent.md'
      if (fs.existsSync(agentPath)) {
        fs.unlinkSync(agentPath)
      }
      
      const result = await bootstrapMaturionBuilder()
      
      assert.strictEqual(result.success, true)
      assert.ok(result.timestamp)
      assert.strictEqual(result.version, '1.0.0')
      assert.ok(fs.existsSync(agentPath), 'Builder agent file should exist')
      
      // Verify content
      const content = fs.readFileSync(agentPath, 'utf-8')
      assert.ok(content.includes('Maturion Builder'))
      assert.ok(content.includes('Build to Green'))
      assert.ok(content.includes('Law 8'))
      
      console.log('✓ Maturion Builder bootstrapped successfully')
    })
  })
  
  describe('CS6-5: Commit Inspection', () => {
    it('should allow commits from Maturion builders', async () => {
      const result = await inspectCommitMetadata({
        author: 'foreman',  // lowercase to match detection
        committer: 'foreman',
        message: 'feat: implement feature'
      })
      
      assert.strictEqual(result.allowed, true)
      assert.strictEqual(result.shouldRollback, false)
      
      console.log('✓ Maturion builder commit allowed')
    })
    
    it('should block commits from external builders', async () => {
      const result = await inspectCommitMetadata({
        author: 'github-actions[bot]',
        committer: 'github-actions[bot]',
        message: 'Auto-generated commit'
      })
      
      assert.strictEqual(result.allowed, false)
      assert.strictEqual(result.shouldRollback, true)
      
      console.log('✓ External builder commit blocked')
    })
  })
  
  describe('CS6-6: Dashboard Integration', () => {
    it('should provide builder authorization status', async () => {
      const status = await getBuilderAuthorizationStatus()
      
      assert.ok(Array.isArray(status.activeBuilders))
      assert.ok(typeof status.unauthorizedAttempts === 'number')
      assert.ok(typeof status.totalOverrides === 'number')
      assert.ok(typeof status.totalBootstraps === 'number')
      
      console.log('✓ Builder authorization status available')
      console.log(`  Active builders: ${status.activeBuilders.length}`)
    })
    
    it('should list Foreman as active builder', async () => {
      const status = await getBuilderAuthorizationStatus()
      
      const foreman = status.activeBuilders.find(b => b.name === 'Foreman')
      assert.ok(foreman, 'Foreman should be listed as active builder')
      assert.strictEqual(foreman.type, 'maturion')
      assert.strictEqual(foreman.certified, true)
      
      console.log('✓ Foreman listed as active builder')
    })
  })
  
  describe('CS6-7: Enforcement Entry Point', () => {
    it('should allow Foreman to proceed', async () => {
      const result = await enforceBuilderAuthorization({
        assignedAgent: 'Foreman'
      })
      
      assert.strictEqual(result.proceed, true)
      assert.ok(result.message.includes('authorized'))
      
      console.log('✓ Foreman allowed to proceed')
    })
    
    it('should block external builder and reassign', async () => {
      const result = await enforceBuilderAuthorization({
        assignedAgent: 'GitHub Copilot',
        issueNumber: 456,
        userName: 'johan'
      })
      
      assert.strictEqual(result.proceed, false)
      assert.ok(
        result.action === 'reassigned_to_foreman' || 
        result.action === 'bootstrapped_and_reassigned'
      )
      assert.ok(result.incident_id)
      
      console.log(`✓ External builder blocked with action: ${result.action}`)
    })
    
    it('should block unknown builder and reassign', async () => {
      const result = await enforceBuilderAuthorization({
        assignedAgent: 'UnknownAgent'
      })
      
      assert.strictEqual(result.proceed, false)
      // Unknown builders are treated as external and trigger reassignment
      assert.ok(
        result.action === 'reassigned_to_foreman' || 
        result.action === 'bootstrapped_and_reassigned'
      )
      
      console.log(`✓ Unknown builder blocked and reassigned: ${result.action}`)
    })
  })
  
  describe('CS6-8: Constitutional Integration', () => {
    it('should have external-builder-protection module in lib/foreman/constitution', () => {
      const modulePath = path.join(
        process.cwd(),
        'lib/foreman/constitution/external-builder-protection.ts'
      )
      
      assert.ok(fs.existsSync(modulePath), 'CS6 module must exist')
      
      const content = fs.readFileSync(modulePath, 'utf-8')
      assert.ok(content.includes('CS6'))
      assert.ok(content.includes('External Builder Prohibition'))
      assert.ok(content.includes('ROBOTICS_LAW_8'))
      
      console.log('✓ CS6 module exists in constitution directory')
    })
    
    it('should export CS6 functions from constitution index', async () => {
      const { enforceBuilderAuthorization: exported } = await import('@/lib/foreman/constitution')
      
      assert.ok(typeof exported === 'function', 'enforceBuilderAuthorization should be exported')
      
      console.log('✓ CS6 functions exported from constitution module')
    })
  })
  
  describe('CS6-9: Robotics Law 8 Enforcement', () => {
    it('should enforce Law 8 in builder validation', async () => {
      const builder: BuilderIdentity = {
        name: 'External Builder',
        type: 'external',
        certified: false
      }
      
      const result = await validateBuilderAuthorization(builder)
      
      assert.strictEqual(result.authorized, false)
      assert.ok(result.reason.includes('External Builder Prohibition'))
      
      console.log('✓ Robotics Law 8 enforced')
    })
    
    it('should reference Law 8 in Maturion Builder spec', () => {
      const agentPath = '.github/agents/maturion-builder.agent.md'
      
      if (fs.existsSync(agentPath)) {
        const content = fs.readFileSync(agentPath, 'utf-8')
        assert.ok(content.includes('Law 8'))
        assert.ok(content.includes('Builder Certification'))
        
        console.log('✓ Law 8 documented in Maturion Builder spec')
      } else {
        console.log('⚠ Maturion Builder not yet bootstrapped - skipping Law 8 check')
      }
    })
  })
})

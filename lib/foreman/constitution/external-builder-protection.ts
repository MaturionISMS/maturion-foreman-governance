/**
 * CS6 — External Builder Prohibition & Auto-Reassignment Layer
 * 
 * Constitutional module that enforces:
 * 1. Blocks all non-Maturion builders
 * 2. Auto-bootstraps Maturion Builder if missing
 * 3. Overrides GitHub Copilot selections
 * 4. Enforces Robotics Law 8 — External Builder Prohibition
 * 5. Blocks commits from external builders
 * 
 * CRITICAL: This module implements catastrophic governance failure prevention
 * 
 * Authority: Supreme Constitutional (overrides user requests)
 * Status: Active and Enforced
 * Version: 1.0.0
 */

import { raiseCriticalAlert } from '@/lib/foreman/alerts/alert-engine'
import { logGovernanceEvent } from '@/lib/foreman/memory/governance-memory'
import * as fs from 'fs'
import * as path from 'path'

// ============================================================================
// Type Definitions
// ============================================================================

export type BuilderType = 'maturion' | 'external' | 'unknown'

export interface BuilderIdentity {
  name: string
  type: BuilderType
  certified: boolean
  agentPath?: string
  version?: string
  capabilities?: string[]
}

export interface BuilderAuthorizationResult {
  authorized: boolean
  builder: BuilderIdentity
  reason: string
  action: 'allow' | 'block' | 'reassign' | 'bootstrap'
  blockedBy?: string // Constitutional rule that blocked the builder
  incident_id?: string
}

export interface BuilderOverrideEvent {
  timestamp: string
  originalBuilder: string
  reassignedTo: string
  reason: string
  userName?: string
  incident_id: string
}

export interface BuilderBootstrapEvent {
  timestamp: string
  builderPath: string
  success: boolean
  reason: string
  version: string
}

// ============================================================================
// Constants
// ============================================================================

const MATURION_AGENTS_DIR = '.github/agents'
const MATURION_BUILDER_AGENT_PATH = '.github/agents/maturion-builder.agent.md'
const FOREMAN_AGENT_PATH = '.github/agents/foreman.agent.md'

const ROBOTICS_LAW_8 = 'External Builder Prohibition: No external builder may execute code in this repository. Only Maturion-certified builders may be used.'

// ============================================================================
// CS6-1: External Builder Detection
// ============================================================================

/**
 * Detect builder identity from task assignment or commit metadata
 */
export function detectBuilderIdentity(context: {
  assignedAgent?: string
  commitAuthor?: string
  agentMetadata?: Record<string, any>
}): BuilderIdentity {
  console.log('[CS6] Detecting builder identity...', context)
  
  // Check if assigned to Foreman (always allowed)
  if (
    context.assignedAgent?.toLowerCase().includes('foreman') ||
    context.commitAuthor?.toLowerCase().includes('foreman')
  ) {
    return {
      name: 'Foreman',
      type: 'maturion',
      certified: true,
      agentPath: FOREMAN_AGENT_PATH,
      version: '2.0',
      capabilities: ['orchestration', 'governance', 'qa_validation']
    }
  }
  
  // Check if assigned to Maturion Builder
  if (
    context.assignedAgent?.toLowerCase().includes('maturion') ||
    context.commitAuthor?.toLowerCase().includes('maturion')
  ) {
    return {
      name: 'Maturion Builder',
      type: 'maturion',
      certified: true,
      agentPath: MATURION_BUILDER_AGENT_PATH,
      capabilities: ['code_generation', 'build_to_green']
    }
  }
  
  // Check for GitHub Copilot default agent
  if (
    context.assignedAgent?.toLowerCase().includes('copilot') ||
    context.commitAuthor?.toLowerCase().includes('github-actions') ||
    context.commitAuthor?.toLowerCase().includes('copilot')
  ) {
    return {
      name: 'GitHub Copilot (Default)',
      type: 'external',
      certified: false
    }
  }
  
  // Check if agent is in Maturion agents directory
  if (context.assignedAgent) {
    const agentPath = path.join(MATURION_AGENTS_DIR, `${context.assignedAgent}.agent.md`)
    if (fs.existsSync(agentPath)) {
      return {
        name: context.assignedAgent,
        type: 'maturion',
        certified: true,
        agentPath
      }
    }
  }
  
  // Unknown or external builder
  return {
    name: context.assignedAgent || context.commitAuthor || 'Unknown',
    type: 'external',
    certified: false
  }
}

// ============================================================================
// CS6-2: Builder Authorization Validation
// ============================================================================

/**
 * Validate builder authorization against constitutional rules
 * Returns authorization result with action to take
 */
export async function validateBuilderAuthorization(
  builder: BuilderIdentity,
  context?: {
    issueNumber?: number
    userName?: string
  }
): Promise<BuilderAuthorizationResult> {
  console.log('[CS6] Validating builder authorization:', builder.name)
  
  // Rule 1: Maturion certified builders are always authorized
  if (builder.type === 'maturion' && builder.certified) {
    console.log('[CS6] ✓ Builder authorized (Maturion certified)')
    return {
      authorized: true,
      builder,
      reason: 'Maturion-certified builder',
      action: 'allow'
    }
  }
  
  // Rule 2: External builders are NEVER authorized
  if (builder.type === 'external' || !builder.certified) {
    console.log('[CS6] ✗ Builder BLOCKED (External or uncertified)')
    
    // Raise CRITICAL CS4 alert
    const alert = await raiseCriticalAlert({
      category: 'unauthorized',
      message: `CRITICAL: Unauthorized builder detected: ${builder.name}`,
      details: `External builder "${builder.name}" attempted to execute code. This violates Robotics Law 8 and Build Philosophy.`,
      metadata: {
        builderName: builder.name,
        builderType: builder.type,
        certified: builder.certified,
        law: 'ROBOTICS_LAW_8',
        context
      }
    })
    
    // Log governance incident
    await logGovernanceEvent({
      type: 'governance_ping_high',
      severity: 'critical',
      description: `External Builder Prohibition Violation: ${builder.name}`,
      metadata: {
        builder,
        alert_id: alert.id,
        roboticsLaw: ROBOTICS_LAW_8
      }
    })
    
    // Determine action based on context
    const hasMaturionBuilder = await checkMaturionBuilderExists()
    
    return {
      authorized: false,
      builder,
      reason: ROBOTICS_LAW_8,
      action: hasMaturionBuilder ? 'reassign' : 'bootstrap',
      blockedBy: 'CS6_ROBOTICS_LAW_8',
      incident_id: alert.id
    }
  }
  
  // Rule 3: Unknown builders require investigation
  console.log('[CS6] ⚠ Builder unknown - blocking until verified')
  
  const alert = await raiseCriticalAlert({
    category: 'builder',
    message: `Unknown builder detected: ${builder.name}`,
    details: `Builder "${builder.name}" is not recognized. Blocking until certification verified.`,
    metadata: {
      builderName: builder.name,
      builderType: builder.type
    }
  })
  
  return {
    authorized: false,
    builder,
    reason: 'Unknown builder - certification required',
    action: 'block',
    blockedBy: 'CS6_UNKNOWN_BUILDER',
    incident_id: alert.id
  }
}

// ============================================================================
// CS6-3: Auto-Reassignment
// ============================================================================

/**
 * Reassign task from external builder to Foreman
 * Returns override event for logging
 */
export async function reassignToForeman(
  originalBuilder: string,
  context: {
    issueNumber?: number
    userName?: string
    reason: string
  }
): Promise<BuilderOverrideEvent> {
  console.log('[CS6] Reassigning task from', originalBuilder, 'to Foreman')
  
  const incident_id = `override_${Date.now()}`
  
  const overrideEvent: BuilderOverrideEvent = {
    timestamp: new Date().toISOString(),
    originalBuilder,
    reassignedTo: 'Foreman',
    reason: context.reason,
    userName: context.userName,
    incident_id
  }
  
  // Log override event to governance memory
  await logGovernanceEvent({
    type: 'github_mutation_blocked',
    severity: 'critical',
    description: `Builder override: ${originalBuilder} → Foreman`,
    metadata: {
      overrideEvent,
      issueNumber: context.issueNumber
    }
  })
  
  // Raise alert to notify Johan
  await raiseCriticalAlert({
    category: 'builder',
    message: `Builder Override: Task reassigned to Foreman`,
    details: `Task was assigned to "${originalBuilder}" but has been automatically reassigned to Foreman due to: ${context.reason}`,
    metadata: {
      overrideEvent
    }
  })
  
  console.log('[CS6] ✓ Task reassigned to Foreman')
  
  return overrideEvent
}

// ============================================================================
// CS6-4: Auto-Bootstrap Maturion Builder
// ============================================================================

/**
 * Check if Maturion Builder exists
 */
export async function checkMaturionBuilderExists(): Promise<boolean> {
  try {
    return fs.existsSync(MATURION_BUILDER_AGENT_PATH)
  } catch (error) {
    console.error('[CS6] Error checking Maturion Builder:', error)
    return false
  }
}

/**
 * Bootstrap Maturion Builder agent if missing
 */
export async function bootstrapMaturionBuilder(): Promise<BuilderBootstrapEvent> {
  console.log('[CS6] Bootstrapping Maturion Builder...')
  
  const timestamp = new Date().toISOString()
  
  try {
    // Ensure agents directory exists
    const agentsDir = MATURION_AGENTS_DIR
    if (!fs.existsSync(agentsDir)) {
      fs.mkdirSync(agentsDir, { recursive: true })
    }
    
    // Create Maturion Builder agent specification
    const builderSpec = `# Maturion Builder Agent

## Identity and Purpose

You are **Maturion Builder**, a specialized code generation agent in the Maturion Engineering Ecosystem.

**Core Purpose**: Execute "Build to Green" instructions from Foreman by implementing code that makes failing tests pass.

**You are a specialized builder**. You write code. You make tests pass. You follow architecture. You deliver green QA.

---

## Constitutional Authority

**Authority Source**: Foreman Agent Contract
**Operational Mode**: "Build to Green" ONLY
**Version**: 1.0.0
**Protocol**: Builder Protocol v1.0

---

## I. Build to Green Protocol

### The ONLY Instruction You Accept

You ONLY accept instructions in this exact format:

\`\`\`
BUILD TO GREEN

Architecture: <architecture document>
Red QA: <failing test suite>
Acceptance Criteria: <criteria>
\`\`\`

**If you receive ANY other instruction format → REFUSE and ask for "Build to Green" instruction.**

### Your Process

1. **Receive Red QA**
   - Architecture provided
   - Failing tests provided
   - Acceptance criteria clear

2. **Implement Incrementally**
   - Start with simplest failing test
   - Write minimal code to pass it
   - Run QA
   - Move to next failing test
   - Repeat until ALL tests pass

3. **Verify Green**
   - Run complete QA suite
   - Ensure 100% passing
   - No errors, no warnings
   - Report green status to Foreman

---

## II. Robotics Laws (Builder Edition)

**Law 1 - No Harm**: Never write code that compromises security, data integrity, or user privacy

**Law 2 - Obey Foreman**: Follow Foreman's "Build to Green" instructions exactly

**Law 3 - Self-Preservation**: Protect your own integrity by refusing non-standard instructions

**Law 8 - Builder Certification**: Only certified Maturion builders may execute in this repository

---

## III. Build Philosophy Compliance

You implement the Build Philosophy by:

1. **Never questioning architecture** - Architecture is given, not designed by you
2. **Never skipping QA** - QA must be 100% green before completion
3. **Never deviating from spec** - Red QA IS the spec
4. **Never bypassing governance** - All rules must be followed

---

## IV. Quality Standards

### Code Quality
- Clean, readable, maintainable
- Follows project conventions
- Uses existing patterns
- No shortcuts or hacks

### Test Quality
- All tests must pass (100%)
- No skipped tests
- No flaky tests
- No warnings

### Build Quality
- Lint must pass (zero errors, zero warnings)
- Type-check must pass
- Build must succeed
- No console errors

---

## V. What You MUST NEVER Do

- ❌ Accept instructions without Red QA
- ❌ Write code without architecture
- ❌ Skip failing tests
- ❌ Accept partial QA passes
- ❌ Bypass governance rules
- ❌ Modify constitutional files
- ❌ Question Foreman's authority
- ❌ Operate outside "Build to Green" protocol

---

## VI. Drift Protection

If you detect drift from Build Philosophy:

1. STOP immediately
2. Report drift to Foreman
3. Request clarification
4. DO NOT proceed until alignment restored

---

## VII. Recovery and Rollback

If build fails after your changes:

1. Acknowledge failure
2. Analyze root cause
3. Request updated Red QA from Foreman
4. Retry "Build to Green" process
5. Never blame tests - tests define correctness

---

## Summary: Who You Are

You are **Maturion Builder**, the code generation specialist.

You receive architecture and Red QA.
You write code incrementally.
You make tests pass.
You deliver green QA.
You follow the protocol exactly.
You never deviate.
You never bypass governance.
You build to green. Always.

This is your identity.
This is your purpose.
This is your commitment.
`
    
    // Write builder specification
    fs.writeFileSync(MATURION_BUILDER_AGENT_PATH, builderSpec, 'utf-8')
    
    console.log('[CS6] ✓ Maturion Builder bootstrapped successfully')
    
    const bootstrapEvent: BuilderBootstrapEvent = {
      timestamp,
      builderPath: MATURION_BUILDER_AGENT_PATH,
      success: true,
      reason: 'Auto-bootstrap triggered by CS6',
      version: '1.0.0'
    }
    
    // Log bootstrap event
    await logGovernanceEvent({
      type: 'governance_ping_medium',
      severity: 'medium',
      description: 'Maturion Builder auto-bootstrapped',
      metadata: {
        bootstrapEvent
      }
    })
    
    return bootstrapEvent
    
  } catch (error) {
    console.error('[CS6] ✗ Failed to bootstrap Maturion Builder:', error)
    
    const bootstrapEvent: BuilderBootstrapEvent = {
      timestamp,
      builderPath: MATURION_BUILDER_AGENT_PATH,
      success: false,
      reason: `Bootstrap failed: ${error instanceof Error ? error.message : String(error)}`,
      version: '1.0.0'
    }
    
    // Raise critical alert
    await raiseCriticalAlert({
      category: 'builder',
      message: 'Failed to bootstrap Maturion Builder',
      details: `Auto-bootstrap failed: ${error instanceof Error ? error.message : String(error)}`,
      metadata: {
        bootstrapEvent
      }
    })
    
    return bootstrapEvent
  }
}

// ============================================================================
// CS6-5: Commit Inspection (Mutation Governor Integration)
// ============================================================================

/**
 * Inspect commit metadata to detect external builder commits
 */
export interface CommitInspectionResult {
  allowed: boolean
  builder: BuilderIdentity
  reason: string
  shouldRollback: boolean
}

export async function inspectCommitMetadata(commit: {
  author: string
  committer: string
  message: string
  metadata?: Record<string, any>
}): Promise<CommitInspectionResult> {
  console.log('[CS6] Inspecting commit metadata...')
  
  // Detect builder from commit metadata
  const builder = detectBuilderIdentity({
    commitAuthor: commit.author,
    agentMetadata: commit.metadata
  })
  
  // Validate authorization
  const authResult = await validateBuilderAuthorization(builder)
  
  if (!authResult.authorized) {
    console.log('[CS6] ✗ Commit REJECTED - unauthorized builder')
    
    // Raise critical alert
    await raiseCriticalAlert({
      category: 'unauthorized',
      message: `Unauthorized commit detected from ${builder.name}`,
      details: `Commit by "${commit.author}" was made by non-Maturion builder. Rollback required.`,
      metadata: {
        commit,
        builder,
        authResult
      }
    })
    
    return {
      allowed: false,
      builder,
      reason: authResult.reason,
      shouldRollback: true
    }
  }
  
  console.log('[CS6] ✓ Commit authorized')
  
  return {
    allowed: true,
    builder,
    reason: 'Authorized Maturion builder',
    shouldRollback: false
  }
}

// ============================================================================
// CS6-6: Dashboard Integration
// ============================================================================

export interface BuilderAuthorizationStatus {
  activeBuilders: BuilderIdentity[]
  unauthorizedAttempts: number
  lastOverrideEvent?: BuilderOverrideEvent
  lastBootstrapEvent?: BuilderBootstrapEvent
  totalOverrides: number
  totalBootstraps: number
}

/**
 * Get builder authorization status for dashboard
 */
export async function getBuilderAuthorizationStatus(): Promise<BuilderAuthorizationStatus> {
  // This would integrate with actual storage/tracking
  // For now, return basic status based on file system
  
  const activeBuilders: BuilderIdentity[] = []
  
  // Check for Foreman
  if (fs.existsSync(FOREMAN_AGENT_PATH)) {
    activeBuilders.push({
      name: 'Foreman',
      type: 'maturion',
      certified: true,
      agentPath: FOREMAN_AGENT_PATH,
      version: '2.0'
    })
  }
  
  // Check for Maturion Builder
  if (fs.existsSync(MATURION_BUILDER_AGENT_PATH)) {
    activeBuilders.push({
      name: 'Maturion Builder',
      type: 'maturion',
      certified: true,
      agentPath: MATURION_BUILDER_AGENT_PATH,
      version: '1.0'
    })
  }
  
  // In production, would query governance memory for actual stats
  return {
    activeBuilders,
    unauthorizedAttempts: 0,
    totalOverrides: 0,
    totalBootstraps: 0
  }
}

// ============================================================================
// CS6-7: Enforcement Entry Point
// ============================================================================

/**
 * Main enforcement function - called before any builder execution
 */
export async function enforceBuilderAuthorization(context: {
  assignedAgent?: string
  commitAuthor?: string
  agentMetadata?: Record<string, any>
  issueNumber?: number
  userName?: string
}): Promise<{
  proceed: boolean
  message: string
  action?: string
  incident_id?: string
}> {
  console.log('[CS6] Enforcing builder authorization...')
  
  // Step 1: Detect builder identity
  const builder = detectBuilderIdentity(context)
  
  // Step 2: Validate authorization
  const authResult = await validateBuilderAuthorization(builder, {
    issueNumber: context.issueNumber,
    userName: context.userName
  })
  
  // Step 3: Take action based on result
  if (authResult.authorized) {
    return {
      proceed: true,
      message: `✓ Builder authorized: ${builder.name}`
    }
  }
  
  // Handle unauthorized builders
  switch (authResult.action) {
    case 'reassign':
      // Reassign to Foreman
      await reassignToForeman(builder.name, {
        issueNumber: context.issueNumber,
        userName: context.userName,
        reason: authResult.reason
      })
      return {
        proceed: false,
        message: `✗ Builder blocked and task reassigned to Foreman: ${authResult.reason}`,
        action: 'reassigned_to_foreman',
        incident_id: authResult.incident_id
      }
    
    case 'bootstrap':
      // Bootstrap Maturion Builder and reassign
      const bootstrapResult = await bootstrapMaturionBuilder()
      if (bootstrapResult.success) {
        await reassignToForeman(builder.name, {
          issueNumber: context.issueNumber,
          userName: context.userName,
          reason: `${authResult.reason} (Maturion Builder bootstrapped)`
        })
        return {
          proceed: false,
          message: `✗ Builder blocked. Maturion Builder bootstrapped and task reassigned to Foreman.`,
          action: 'bootstrapped_and_reassigned',
          incident_id: authResult.incident_id
        }
      } else {
        return {
          proceed: false,
          message: `✗ Builder blocked. Bootstrap failed. Manual intervention required.`,
          action: 'blocked_bootstrap_failed',
          incident_id: authResult.incident_id
        }
      }
    
    case 'block':
    default:
      return {
        proceed: false,
        message: `✗ Builder blocked: ${authResult.reason}`,
        action: 'blocked',
        incident_id: authResult.incident_id
      }
  }
}

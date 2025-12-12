# Autonomy Runtime Overview

## Purpose
The Autonomy Runtime provides the core execution loop, state machine, task scheduler, and control APIs that enable Foreman to operate autonomously without human intervention.

## Core Components

### 1. Autonomy State Machine
10 states managing system operational mode:
- IDLE, READY, EXECUTING_TASK, EXECUTING_WAVE
- WAITING_FOR_APPROVAL, GOVERNANCE_BLOCKED
- RECOVERY_MODE, SAFE_MODE, PAUSED_BY_USER, DEGRADED_MODE

### 2. Task Scheduler (Core Autonomy Engine)
Selects next actionable task based on:
- Architecture readiness
- Red QA availability
- Repository health
- Dependency resolution
- Governance compliance

### 3. Execution Loop (Autonomous Build Engine)
Continuous execution cycle:
1. Read task queue
2. Validate architecture & Red QA
3. Trigger builder execution
4. Apply governance checks
5. Inspect QIC + QIEL results
6. Auto-merge PR when allowed
7. Update memory & telemetry

### 4. Autonomy Control API
REST endpoints for autonomy control:
- GET /api/runtime/autonomy/state
- POST /api/runtime/autonomy/enable
- POST /api/runtime/autonomy/disable
- POST /api/runtime/autonomy/pause
- POST /api/runtime/autonomy/resume

### 5. Governance Binding Layer
CS1-CS6 enforcement at runtime level

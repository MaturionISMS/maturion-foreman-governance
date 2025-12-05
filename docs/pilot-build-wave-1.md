# Pilot Build Wave 1

## 🎯 Objective

Execute the first real build wave end-to-end using the Foreman → Builder → QA pipeline, with Foreman operating as the orchestrator.

This is a pilot build - small and safe, but real.

## Target Repository

**Repository**: `maturion-foreman-app` (this repository)

**Justification**: Using the Foreman app itself for the pilot allows us to:
- Validate the system with a well-understood codebase
- Improve the Foreman app iteratively
- Dogfood our own orchestration system
- Minimize risk by working in a controlled environment

## Target Feature

**Feature**: Foreman Status Panel on `/foreman`

**Description**: Create a dedicated status page that displays:
- Current Foreman operational status
- Active build sequences and their progress
- Builder task queue and completion status
- QA results summary
- Recent audit logs
- System health metrics

**User Story**: 
> As a Foreman operator, I want to see the current state of all active build sequences and builder tasks, so that I can monitor the system's health and progress without checking logs or making API calls.

## Constraints

### 1. No Breaking Changes
- Existing functionality must continue to work
- All current API endpoints remain unchanged
- No modifications to core orchestration logic
- Only additive changes permitted

### 2. Limited to One Module/Component
- Single route: `/foreman` page
- Single API endpoint: `/api/foreman/dashboard` (if needed)
- Single component: `ForemanDashboard.tsx`
- Supporting utilities contained within module scope

### 3. Fully Testable via QA Engine
- Component must be testable via automated QA
- No manual testing required for validation
- QA checks include:
  - Type safety validation
  - Component rendering tests
  - API integration tests (if applicable)
  - Accessibility compliance
  - Code quality standards

## Technical Specification

### Module Structure

```
app/
  foreman/
    page.tsx              # Main status page
    
components/
  ForemanDashboard.tsx    # Dashboard component
  
lib/
  foreman/
    dashboard-data.ts     # Data aggregation utilities
    
types/
  dashboard.ts            # Type definitions for dashboard
```

### Feature Requirements

#### 1. Status Page (`/foreman`)
- Server-rendered page using Next.js App Router
- Real-time status updates (via client-side polling or SSE)
- Responsive layout (mobile, tablet, desktop)
- Accessible (WCAG 2.1 AA compliant)

#### 2. Dashboard Component
Display sections:
1. **System Status**
   - Autonomous mode enabled/disabled
   - QA gates status
   - Uptime and version
   - Git SHA

2. **Active Build Sequences**
   - Sequence ID
   - Status (pending, running, completed, failed)
   - Progress percentage
   - Created/started/completed timestamps

3. **Builder Task Queue**
   - Pending approval tasks
   - Running tasks
   - Recently completed tasks
   - Task type distribution

4. **QA Summary**
   - Total QA checks run today
   - Pass/fail ratio
   - Recent QA results
   - QA-of-QA meta-review status

5. **Audit Log Preview**
   - Recent 10 actions
   - Action type, timestamp, result
   - Link to full logs (if available)

#### 3. Data Aggregation
Utility functions to:
- Fetch current system status
- Aggregate build sequence data
- Summarize builder task states
- Compile QA results
- Format audit log entries

### API Dependencies

Uses existing endpoints:
- `GET /api/foreman/status` - System status
- `GET /api/foreman/run-build` - Build sequences list
- `GET /api/admin/approve?pending=true` - Pending tasks

No new API endpoints required unless data aggregation requires it.

## Build Sequence Plan

### Architecture Analysis Phase
Foreman will analyze:
1. Current application structure
2. Existing status endpoint capabilities
3. Component library patterns
4. Type definition requirements

### Builder Task Generation
Expected tasks:
1. **Schema Builder**: Create dashboard type definitions
2. **UI Builder**: Generate dashboard component
3. **UI Builder**: Create `/foreman` page
4. **QA Builder**: Create component tests
5. **QA Builder**: Validate complete feature

### Execution Flow
1. Foreman analyzes architecture gaps
2. Generates builder tasks (4-5 tasks)
3. Tasks dispatch to appropriate builders
4. Autonomous mode: Auto-approve and execute
5. Manual mode: Pause for admin approval
6. QA Builder validates all outputs
7. QA-of-QA performs meta-review
8. PR assembled with governance context
9. Report generated

## Expected Outputs

### 1. Code Artifacts
- `types/dashboard.ts` - Type definitions
- `components/ForemanDashboard.tsx` - Dashboard component
- `app/foreman/page.tsx` - Status page
- `lib/foreman/dashboard-data.ts` - Data utilities (optional)

### 2. Test Artifacts
- `components/__tests__/ForemanDashboard.test.tsx` - Component tests
- Integration tests for data fetching

### 3. Pull Request
- Title: `[Pilot Build Wave 1] Foreman Status Dashboard`
- Branch: `foreman/pilot-wave-1`
- Description includes:
  - Architecture gaps addressed
  - Builder tasks completed
  - QA results summary
  - Governance reasoning
  - Artifact count

### 4. Build Report
- File: `reports/FOREMAN_PILOT_BUILD_REPORT.md`
- Contains:
  - Sequence ID and metadata
  - Tasks executed (list with status)
  - Builders used and their outputs
  - QA results (all checks)
  - Compliance verification
  - Final status (PASS/FAIL)
  - Execution timeline
  - Lessons learned

## Success Criteria

### ✅ Build Completion
- [ ] Feature built entirely via Foreman + Builders
- [ ] No manual code writing performed
- [ ] All builder tasks completed successfully

### ✅ Quality Assurance
- [ ] QA Builder validates all artifacts
- [ ] QA-of-QA meta-review passes
- [ ] All quality checks pass
- [ ] No QA gate failures

### ✅ Governance Compliance
- [ ] Organisation ID present in all tasks
- [ ] No breaking changes introduced
- [ ] Secrets detection passes
- [ ] Audit log complete

### ✅ Automation
- [ ] PR created automatically
- [ ] Governance reasoning in PR description
- [ ] Build report generated
- [ ] Complete lifecycle logged

### ✅ Reproducibility
- [ ] Build can be re-run deterministically
- [ ] Same inputs produce same outputs
- [ ] Process documented for future waves

## Execution Commands

### Trigger via GitHub Issue Comment
In any issue, post:
```
@foreman execute Pilot Build Wave 1
```

### Trigger via API Call
```bash
curl -X POST https://your-app.vercel.app/api/foreman/run-build \
  -H "Content-Type: application/json" \
  -d '{
    "organisationId": "maturion_isms",
    "triggerSource": "issue_command",
    "triggerContext": {
      "pilotWave": true,
      "waveNumber": 1,
      "feature": "foreman-status-dashboard"
    },
    "autonomousBuildEnabled": true,
    "createPR": true,
    "owner": "MaturionISMS",
    "repo": "maturion-foreman-app",
    "branch": "foreman/pilot-wave-1",
    "baseBranch": "main"
  }'
```

## Risk Assessment

### Low Risk
- Single module/component
- No database changes
- Read-only data operations
- Additive changes only

### Mitigation Strategies
1. **Code Review**: PR assembled with full context
2. **QA Gates**: Comprehensive validation before merge
3. **Rollback Plan**: Simple revert if issues detected
4. **Monitoring**: Audit logs track all actions

## Timeline

**Estimated Duration**: 5-10 minutes (autonomous mode)

**Phases**:
1. Architecture Analysis: 1-2 minutes
2. Task Generation: 1 minute
3. Builder Execution: 2-4 minutes
4. QA Validation: 1-2 minutes
5. PR Assembly: 1 minute

## Future Waves

This pilot establishes the pattern for future build waves:
- Wave 2: More complex multi-module features
- Wave 3: Cross-repository builds
- Wave 4: Infrastructure changes
- Wave 5: Integration with external systems

Each wave increases in complexity and scope, building confidence in the system.

---

**Status**: Ready for execution  
**Last Updated**: 2025-12-05  
**Version**: 1.0

# CS3: Incident Feedback Loop & Verification Workflow Architecture

**Status:** ACTIVE  
**Version:** 1.0  
**Last Updated:** 2025-12-10  
**Architect:** Foreman (per issue requirements)

---

## Purpose

CS3 creates a formal incident verification loop that enables users to provide structured feedback on deployments, triggering Foreman to investigate, fix, and re-verify until the user confirms resolution.

This architecture implements the management principle:  
**"I need a central point with proper performance dashboards and a proper feedback loop."**

---

## Architecture Components

### 1. Incident Data Model

**Location:** `lib/foreman/incidents/incident-model.ts`

**Required Types:**
- `IncidentState`: `pending | investigating | fixing | awaiting-verification | resolved`
- `UserFeedbackType`: `not_visible | not_functional | incorrect_behavior | resolved`
- `FixAttempt`: Records each fix attempt with QIC/QIEL results
- `Incident`: Complete incident record with state machine

**Required Functions:**
- `createIncident()`: Creates new incident in `pending` state
- `recordUserFeedback()`: Processes user verification choice
- `addFixAttempt()`: Records FM fix attempt with QA results
- `addLessonLearned()`: Appends lessons from incident
- `markRequiresACR()`: Flags structural issues needing architecture changes
- `resolveIncident()`: Only callable when user confirms "Resolved"

**Governance Integration:**
- All state changes MUST log to governance memory
- Event types: `incident_created`, `incident_user_feedback`, `incident_fix_attempt`, `incident_resolved`

---

### 2. Incident Storage

**Location:** `lib/foreman/incidents/storage.ts`

**Storage Location:** `memory/incidents/*.json`

**Required Functions:**
- `saveIncident()`: Persist incident to JSON file
- `loadIncident()`: Load incident by ID
- `listIncidents()`: List all incidents
- `getActiveIncidents()`: Filter to non-resolved incidents
- `getResolvedIncidents()`: Filter to resolved incidents
- `getIncidentsByComponent()`: Filter by component name
- `getIncidentsRequiringACR()`: Find incidents needing architecture changes

**Storage Schema:**
Each incident stored as: `memory/incidents/{incident_id}.json`

---

### 3. Incident Engine

**Location:** `lib/foreman/incidents/incident-engine.ts`

**Purpose:** Orchestrates incident lifecycle and Foreman responses

**Required Functions:**

**`createDeploymentIncident(component, description, deploymentId?, prUrl?)`**
- Creates incident and saves to storage
- Logs to governance memory
- Returns incident object

**`processUserFeedback(incidentId, feedback, userId)`**
- Records user feedback choice
- Updates incident state based on feedback
- If `resolved`: generates lessons learned
- If not resolved: plans fix strategy
- Returns updated incident

**`determineResponse(feedback): IncidentResponse`**
- Maps feedback type to fix strategy:
  - `not_visible` → Verify build artifacts, routing, UI generation
  - `not_functional` → Inspect logs, re-run tests, diagnose state
  - `incorrect_behavior` → Compare with requirements, check for ACR need
- Returns strategy and action list

**`recordFixAttempt(incidentId, strategy, description, qicPassed, qielPassed, builderId?, prUrl?)`**
- Records fix attempt with QA results
- If QA passes: moves to `awaiting-verification`
- Returns updated incident

**`generateLessonsLearned(incident)`**
- Analyzes incident lifecycle
- Generates lessons based on:
  - Number of fix attempts
  - Feedback type patterns
  - QA failures
  - ACR flags
- Saves to `memory/lessons-learned/incident-{id}.md`

**`canAutoClose(incident): boolean`**
- **MUST ALWAYS RETURN FALSE**
- Constitutional requirement: Only user can resolve incidents

**`getNextAction(incident): string`**
- Returns human-readable next step based on current state

---

### 4. API Endpoints

**Location:** `app/api/foreman/incidents/`

#### POST `/api/foreman/incidents/create`
**Purpose:** Create new incident (typically called after deployment)

**Request:**
```typescript
{
  component: string;
  description: string;
  deploymentId?: string;
  prUrl?: string;
}
```

**Response:**
```typescript
{
  success: boolean;
  incident: Incident;
  message: string;
}
```

#### GET `/api/foreman/incidents`
**Purpose:** List incidents or get specific incident

**Query Params:**
- `id` (optional): Get specific incident
- `active` (optional): Filter to active only

**Response:**
```typescript
{
  success: boolean;
  incidents: Incident[];
  count: number;
}
```

#### POST `/api/foreman/incidents/verify`
**Purpose:** Submit user verification feedback

**Request:**
```typescript
{
  incidentId: string;
  feedback: 'not_visible' | 'not_functional' | 'incorrect_behavior' | 'resolved';
  userId?: string;
}
```

**Response:**
```typescript
{
  success: boolean;
  incident: Incident;
  message: string;
  nextAction: string;
}
```

#### POST `/api/foreman/incidents/update`
**Purpose:** Update incident state or properties

**Request:**
```typescript
{
  incidentId: string;
  state?: IncidentState;
  notes?: string;
}
```

**Response:**
```typescript
{
  success: boolean;
  incident: Incident;
  message: string;
}
```

---

### 5. User Interface

**Location:** `app/foreman/incidents/page.tsx`

**Purpose:** Display active incidents and allow user verification

**Required UI Elements:**

1. **Incident List View**
   - Shows all active (non-resolved) incidents
   - Displays component name, description, state, creation time
   - Links to PR if available
   - Empty state when no incidents

2. **Incident Card (per incident)**
   - **Header:**
     - Component name
     - State badge (color-coded)
     - Created timestamp
     - PR link
   - **Fix Attempts Section:**
     - List of all fix attempts
     - Shows QIC/QIEL pass/fail status
     - Links to fix PRs
   - **Lessons Learned Section:**
     - Lists lessons generated so far
   - **ACR Flag:**
     - Warning if architecture change required
   - **Verification Buttons (if not resolved):**
     - ❌ **Not Visible** (red button)
     - ⚠️ **Not Functional** (orange button)
     - 🔄 **Incorrect Behavior** (yellow button)
     - ✓ **Resolved** (green button)

3. **Interaction Flow:**
   - Click button → API call to `/verify`
   - Show loading state
   - Reload incidents on success
   - Display next action message

4. **Refresh Button:**
   - Manual reload of incidents list

**State Management:**
- Load active incidents on mount
- Track processing state per incident
- Handle errors gracefully
- Show success/error alerts

---

### 6. Foreman Behavior Logic

**Incident Response Workflows:**

#### Workflow: "Not Visible" Response
1. Log user feedback to governance memory
2. Check build artifacts exist
3. Verify routing configuration
4. Confirm UI page generation
5. Check for rendering errors
6. If issues found: Trigger UI builder to fix
7. Re-build application
8. Re-deploy
9. Re-run QIC/QIEL
10. If QA passes: Move to `awaiting-verification`
11. Create new verification request

#### Workflow: "Not Functional" Response
1. Log user feedback to governance memory
2. Inspect runtime logs
3. Re-run unit tests
4. Re-run integration tests
5. Diagnose state management issues
6. Trigger appropriate builder (API/Integration) to fix
7. Re-test
8. Re-deploy
9. Re-run QIC/QIEL
10. If QA passes: Move to `awaiting-verification`
11. Create new verification request

#### Workflow: "Incorrect Behavior" Response
1. Log user feedback to governance memory
2. Review original requirements
3. Compare actual vs expected behavior
4. Run requirement diff analysis
5. Determine if issue is:
   - Implementation bug → Fix via builder
   - Architecture mismatch → Flag for ACR
6. If ACR needed: Create architecture change request
7. Otherwise: Fix and re-test
8. Re-deploy
9. Re-run QIC/QIEL
10. If QA passes: Move to `awaiting-verification`
11. Create new verification request

#### Workflow: "Resolved" Response
1. Log resolution to governance memory
2. Mark incident as resolved
3. Record resolver (user ID)
4. Generate lessons learned
5. Save lessons to `memory/lessons-learned/incident-{id}.md`
6. Check if any ACR needed for future prevention
7. Update architecture if patterns emerge

---

### 7. Lessons Learned System

**Purpose:** Convert incident data into actionable architectural improvements

**Storage Location:** `memory/lessons-learned/incident-{id}.md`

**Lesson Generation Triggers:**
- Incident resolved by user
- Multiple fix attempts (pattern analysis)
- QA failures (test gap identification)
- ACR flags (architectural debt)

**Lesson Format (Markdown):**
```markdown
# Lessons Learned: {component}

**Incident ID:** {id}
**Created:** {timestamp}
**Resolved:** {timestamp}
**Component:** {component}

## Description
{description}

## User Feedback
{feedback_type}

## Fix Attempts
### Attempt #{n} - {timestamp}
**Strategy:** {strategy}
**Description:** {description}
**QIC Passed:** ✓/✗
**QIEL Passed:** ✓/✗
**PR:** {url}

## Lessons Learned
- Lesson 1
- Lesson 2
- ...

## Architecture Change Required
{acr_details if applicable}
```

**Analysis for Lessons:**
- Number of fix attempts → Test coverage gaps
- QA failures → QIC/QIEL enhancement needs
- Feedback patterns → UI/UX improvements
- ACR flags → Architectural debt items

---

### 8. QIC Integration

**Test Location:** `tests/qic/incident-feedback.test.ts`

**Required Tests:**

1. **Infrastructure Tests**
   - Memory fabric exists for incidents
   - Incident schemas defined
   - Incident writer functionality exists

2. **Verification Categories Tests**
   - Four feedback types defined
   - Incident types in type system
   - Severity levels defined

3. **Deployment Verification Tests**
   - Deployment triggers feedback request
   - Verification issue template exists

4. **Lessons Learned Tests**
   - Lessons can be generated
   - Lessons directory exists
   - Lessons are markdown files

5. **Incident Lifecycle Tests**
   - Incidents cannot auto-close
   - Incident states tracked
   - Incidents stored in memory

6. **Foreman Response Tests**
   - Foreman can respond to states
   - Foreman has notification capability
   - Foreman incident handling documented

7. **Feedback Loop Tests**
   - Feedback collected from users
   - Feedback stored in memory
   - Complete feedback loop (5 steps)

---

### 9. QIEL Integration

**Test Location:** `tests/qiel/incident-lifecycle.test.ts`

**Required Tests:**

1. **Incident Creation**
   - Creates with proper initial state
   - Persists to storage

2. **User Feedback Processing**
   - Processes all four feedback types correctly
   - Updates state appropriately
   - Resolves only on user confirmation

3. **Fix Attempt Tracking**
   - Records attempts with QA results
   - Updates state to awaiting-verification when QA passes

4. **Auto-Close Prevention**
   - canAutoClose() always returns false
   - Requires explicit user confirmation

5. **State Machine Validation**
   - Valid next actions for each state
   - State consistency maintained

6. **Storage Queries**
   - Lists active incidents
   - Filters resolved incidents
   - Queries by component

7. **Lessons Learned**
   - Generated on resolution
   - Saved to memory directory

8. **Governance Memory Integration**
   - Lifecycle events logged
   - Timestamps recorded

---

## Functional Requirements

### User Experience

1. **Deployment Notification**
   - After any deployment, user sees alert: "Deployment Verification Required"
   - Link to incidents page or inline verification UI

2. **Verification Interface**
   - Clear display of what was deployed
   - Four verification buttons always visible
   - Loading states during processing
   - Success/error feedback

3. **Incident Tracking**
   - See history of fix attempts
   - View QA results for each attempt
   - Track state progression
   - View generated lessons

### Foreman Behavior

1. **Automatic Response**
   - Each feedback type triggers specific investigation
   - Builder selection based on feedback type
   - Re-validation after every fix
   - Second verification request after fix

2. **QA Enforcement**
   - All fixes must pass QIC
   - All fixes must pass QIEL
   - No deployment without passing QA
   - No auto-resolution under any circumstance

3. **Learning Integration**
   - Every incident generates lessons
   - Lessons feed architecture improvements
   - ACR flags tracked for review
   - Patterns analyzed for prevention

### Governance Requirements

1. **Memory Logging**
   - All incident events logged
   - All state changes tracked
   - All fix attempts recorded
   - All resolutions documented

2. **Constitutional Compliance**
   - NO auto-close capability (hard requirement)
   - User confirmation mandatory for resolution
   - QA gates enforced absolutely
   - Governance rules override all else

3. **Audit Trail**
   - Complete history per incident
   - Lessons learned preserved
   - Fix attempts traceable to PRs
   - Timeline fully reconstructable

---

## Integration Points

### With Existing Systems

1. **Governance Memory**
   - Events: `incident_*` event types
   - Severity levels aligned with governance
   - Query API for analytics

2. **Builder Network**
   - UI Builder for visibility issues
   - API Builder for functional issues
   - Integration Builder for behavior issues
   - QA Builder for test enhancements

3. **QIC/QIEL Systems**
   - Fix validation through existing QA
   - Test enhancement requests
   - Architecture alignment checks

4. **Architecture System (ACR)**
   - Flag incidents requiring architecture changes
   - Link incidents to ACRs
   - Track architectural debt

5. **Parking Station**
   - Complex incidents may need parking
   - Integration with long-term tracking

---

## Success Criteria

### Functional App Verification

To verify CS3 is **functionally working**, the following must be TRUE:

1. ✅ Navigate to `/foreman/incidents` - page loads without errors
2. ✅ Create test incident via API - appears in UI immediately
3. ✅ Click "Not Visible" button - UI updates, incident state changes
4. ✅ Click "Not Functional" button - UI updates, incident state changes
5. ✅ Click "Incorrect Behavior" button - UI updates, incident state changes
6. ✅ Click "Resolved" button - incident disappears from active list
7. ✅ Lessons file created in `memory/lessons-learned/`
8. ✅ Governance events logged for all actions
9. ✅ No console errors in browser
10. ✅ All API endpoints return proper responses

### QA Validation

1. ✅ `npm run test:incident` passes 100%
2. ✅ `npx tsx --test tests/qiel/incident-lifecycle.test.ts` passes 100%
3. ✅ Build succeeds with zero errors
4. ✅ Build succeeds with zero warnings
5. ✅ Type check passes: `npm run typecheck`
6. ✅ Lint passes: `npm run lint`

---

## Non-Functional Requirements

1. **Performance**
   - Incident list loads < 1 second
   - Button clicks respond < 500ms
   - API calls complete < 2 seconds

2. **Reliability**
   - All state changes persisted immediately
   - No data loss on failure
   - Graceful error handling

3. **Usability**
   - Clear button labels
   - Obvious next actions
   - Error messages helpful
   - Loading states visible

4. **Maintainability**
   - Code follows existing patterns
   - Types fully defined
   - Tests comprehensive
   - Documentation complete

---

## Implementation Validation Checklist

Before marking CS3 complete:

- [ ] Architecture document created (this file)
- [ ] All component files exist at documented locations
- [ ] All API endpoints respond correctly
- [ ] UI page renders without errors
- [ ] All four verification buttons work
- [ ] Incidents persist to storage
- [ ] Lessons learned files generated
- [ ] Governance events logged
- [ ] QIC tests pass 100%
- [ ] QIEL tests pass 100%
- [ ] Build successful (zero errors, zero warnings)
- [ ] Type check passes
- [ ] Lint passes
- [ ] Manual browser test completed
- [ ] Screenshots captured of working UI
- [ ] No console errors in browser
- [ ] All routes accessible

---

## Revision History

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 1.0 | 2025-12-10 | Initial architecture | Foreman |

---

**This architecture is the TRUE NORTH for CS3. All implementations must align with this specification.**

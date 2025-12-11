# MATURION GOVERNANCE API SPECIFICATION  
Version: 1.0  
Status: Constitutional Support Document  
Owner: Johan  
Last Updated: YYYY-MM-DD  

--------------------------------------------------------------------------------
# 1. PURPOSE OF THIS DOCUMENT

This document defines the **internal governance API** through which all  
Maturion embodiments must interact with constitutional systems, guardrails,  
memory architecture, watchdogs, ARC workflows, and system-level permissions.

This API ensures:
- controlled autonomy  
- safe memory access  
- guardrail enforcement  
- consistent behaviour across embodiments  
- auditable governance decisions  
- prevention of unauthorised actions  
- safe context switching  
- proper routing of high-risk requests  

**No embodiment may bypass the Governance API.**  
All internal governance checks **must** be routed through these methods.

--------------------------------------------------------------------------------
# 2. HIGH-LEVEL API DESIGN

The Governance API is divided into the following subsystems:

1. **Identity & Context API**  
2. **Guardrail Enforcement API**  
3. **Autonomy & Permissions API**  
4. **Memory Governance API**  
5. **Model Routing Governance API**  
6. **Watchdog Integration API**  
7. **ARC Workflow API**  
8. **Incident Governance API**  
9. **Logging & Audit API**  
10. **Runtime & Embodiment Transition API**

All embodiments (Builder, Risk, Command, Marketing) must use these APIs  
instead of directly calling system-level components.

--------------------------------------------------------------------------------
# 3. IDENTITY & CONTEXT API

### 3.1 getEmbodimentContext()
Returns:
- embodiment type  
- current tenant (if applicable)  
- autonomy level  
- current memory scopes  

### 3.2 getConstitutionVersion()
Returns:
- version numbers of constitutional documents  
- checksum signatures  

### 3.3 verifyConstitutionIntegrity()
Validates:
- True North  
- Identity  
- Guardrails  
- Memory Architecture  
- World Model  
- Oversight System  
- Tenant Isolation Standard  
- Cost Optimization Policy  

If mismatch → Safe Mode + IWMS incident.

--------------------------------------------------------------------------------
# 4. GUARDRAIL ENFORCEMENT API

### 4.1 guardrails.checkAction(actionDescriptor)
Validates:
- safety  
- legality  
- tenant isolation  
- embodiment restrictions  
- forbidden operation attempts  

Returns:
{ allowed: boolean, reason?: string }

markdown
Copy code

### 4.2 guardrails.enforceOutput(content)
Guardian intercepts output and may:
- block  
- redact  
- rewrite  
- warn  

### 4.3 guardrails.checkFileAccess(path)
Prevents:
- modification of constitutional files  
- access to prohibited tenant memory paths  

--------------------------------------------------------------------------------
# 5. AUTONOMY & PERMISSIONS API

### 5.1 autonomy.getLevel()
Returns:
- 0: Full Lockdown  
- 1: Restricted  
- 2: Scoped Autonomy  
- 3: Conditional Autonomy  
- 4: Full Autonomy (Builder only)  

### 5.2 autonomy.require(level)
Raises exception if embodiment attempts to exceed allowed autonomy.

### 5.3 permissions.check(task)
Ensures:
- embodiment is allowed to perform task  
- tenant context is respected  
- watchdogs approve  

### 5.4 permissions.confirmWithJohan(task)
Used for irreversible or high-risk actions.

--------------------------------------------------------------------------------
# 6. MEMORY GOVERNANCE API

All memory writes MUST pass through this subsystem.

### 6.1 memory.requestWrite(target, payload)
Arbiter validates:
- allowed memory region  
- semantic correctness  
- no tenant leakage  
- no prohibited updates  

Returns:
{ approved: boolean, reason?: string }

markdown
Copy code

### 6.2 memory.read(scope)
Restricts access based on:
- embodiment  
- tenant  
- permissions  

### 6.3 memory.recordEpisodic(event)
Creates:
- watchdog logs  
- ARC notes  
- governance trails  

### 6.4 memory.freeze()
Triggered by:
- Arbiter  
- Guardian  
- Sentinel  
- constitutional violations  

Prevents any further writing until cleared.

--------------------------------------------------------------------------------
# 7. MODEL ROUTING GOVERNANCE API

### 7.1 routing.getModelDecision(context)
Must return:
- chosen tier  
- model ID  
- justification  
- token estimate  

### 7.2 routing.validateDecision(decision)
Ensures alignment with:
- Cost Optimization Policy  
- guardrails  
- embodiment rules  

### 7.3 routing.logDecision(...)
For audit trail.

Direct model invocation is strictly forbidden.

--------------------------------------------------------------------------------
# 8. WATCHDOG INTEGRATION API

### 8.1 guardian.validateIntent(intent)
Validates planned task before execution.

### 8.2 sentinel.monitorBehaviour(telemetry)
Tracks:
- drift  
- anomalies  
- escalation patterns  

### 8.3 arbiter.inspectMemoryWrite(request)
Approves or denies learning or memory writes.

### 8.4 watchdogs.raiseAlert(type, metadata)
Triggers:
- IWMS incident  
- autonomy restriction  
- quarantine  

--------------------------------------------------------------------------------
# 9. ARC WORKFLOW API

### 9.1 arc.proposeChange(changeRequest)
Used for:
- world model  
- memory architecture  
- constitutional updates  

### 9.2 arc.getApprovalStatus(requestId)
Returns:
- pending  
- approved  
- rejected  

### 9.3 arc.applyChange(requestId)
Applies change ONLY if approved.

--------------------------------------------------------------------------------
# 10. INCIDENT GOVERNANCE API

### 10.1 incident.raise(type, severity, context)
Creates IWMS incident automatically.

### 10.2 incident.autoClassify(event)
Maps watchdog events to incident taxonomy.

### 10.3 incident.logAction(action)
Adds evidence to incident trail.

### 10.4 incident.attachWatchdogContext(watchdogOutput)
Links Guardian, Sentinel, Arbiter data.

--------------------------------------------------------------------------------
# 11. LOGGING & AUDIT API

### 11.1 audit.record(event)
General governance event.

### 11.2 audit.modelDecision(...)
Must include:
- tier  
- token estimate  
- reasoning  
- safety context  

### 11.3 audit.memoryMutation(...)
Logs Arbiter approvals/denials.

### 11.4 audit.guardrailEvent(...)
Logs any guardrail interaction.

### 11.5 audit.watchdogEvent(...)
Stores:
- anomaly scores  
- warnings  
- blocks  

--------------------------------------------------------------------------------
# 12. RUNTIME & EMBODIMENT TRANSITION API

### 12.1 runtime.switchEmbodiment(target)
Performs safe transition:
- STM reset  
- watchdog handshake  
- memory scope reload  
- autonomy validation  

### 12.2 runtime.safeMode(reason)
Restricts function and notifies Johan.

### 12.3 runtime.quarantine(reason)
Isolates embodiment entirely.

### 12.4 runtime.shutdown()
Graceful exit + memory cleanup.

--------------------------------------------------------------------------------
# 13. SECURITY & SAFETY REQUIREMENTS

All Governance API calls must:
- be immutable  
- be traceable  
- run behind guardrails  
- include watchdog supervision  
- log to audit trails  
- enforce tenant isolation  
- enforce autonomy boundaries  
- reject unstructured direct actions  

If any governance decision is ambiguous → escalate to Johan.

--------------------------------------------------------------------------------
# END OF FILE

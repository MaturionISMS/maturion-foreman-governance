# Simulated Tenant Memory

**Status**: Testing / Simulation Only  
**Governance Definition Only — No Execution**

---

## Purpose

This directory is designated for **simulated tenant memory** used in testing and development contexts only.

**This is NOT production tenant data.**

---

## Use Cases

When tenant memory is activated, this directory may be used for:

1. **Development Testing**
   - Test memory read/write operations
   - Validate tenant isolation
   - Exercise memory authority policies

2. **Integration Testing**
   - Test ISMS runtime with simulated tenant context
   - Validate cross-tenant isolation
   - Test memory audit mechanisms

3. **Governance Validation**
   - Demonstrate tenant memory behavior
   - Validate authority policy enforcement
   - Test emergency kill-switch

---

## Important Notes

### Current Status

- ❌ Tenant memory is DISABLED
- ❌ No simulation is active
- ❌ This directory is empty by design

### When Activated

- ✅ May contain test tenant data
- ✅ Must be clearly marked as SIMULATED
- ✅ Must NOT contain real tenant data
- ✅ Must respect tenant isolation even in simulation

### Restrictions

- **DO NOT** store production tenant data here
- **DO NOT** store real tenant secrets or credentials
- **DO** clearly label all files as SIMULATED
- **DO** use realistic but synthetic data only

---

## Simulation Guidelines (Future)

When creating simulated tenant memory:

1. Use synthetic tenant IDs (e.g., `tenant_simulated_001`)
2. Use realistic but fake data
3. Clearly mark all files with `_SIMULATED` or similar
4. Follow the same schema as production (`tenant-memory.schema.json`)
5. Respect memory authority policies even in simulation
6. Include audit log entries for simulated operations

---

**Simulated Data Only — Governance Definition Only — No Execution**

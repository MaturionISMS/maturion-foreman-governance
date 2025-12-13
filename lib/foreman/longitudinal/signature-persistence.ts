/**
 * Signature Persistence Engine
 * Wave 4A.1 - Longitudinal Drift Detection
 * 
 * Persists immutable architecture signatures for every commit, PR, and wave execution.
 * MUST be append-only, no overwrites permitted.
 */

import * as fs from 'fs/promises';
import * as path from 'path';
import { randomUUID } from 'crypto';
import {
  PersistedSignature,
  SignaturePersistenceResult,
  SignatureSourceType,
} from '@/types/longitudinal';
import { ArchitectureSignature } from '@/types/constraints';
import { hashObject } from '@/lib/foreman/constraints/utils/hash';

/**
 * Get signatures directory path
 * Uses test directory if in test environment
 */
function getSignaturesDir(): string {
  const isTest = process.env.NODE_ENV === 'test' || process.env.JEST_WORKER_ID !== undefined;
  const baseDir = isTest ? 'signatures-test' : 'signatures';
  return path.join(process.cwd(), 'memory', 'foreman', 'longitudinal', baseDir);
}

/**
 * Persist an architecture signature with metadata
 * MUST be append-only, no overwrites permitted
 */
export async function persistSignature(params: {
  signature: ArchitectureSignature;
  sourceType: SignatureSourceType;
  sourceId: string;
  metadata?: Record<string, any>;
}): Promise<SignaturePersistenceResult> {
  try {
    const signatureId = randomUUID();
    const timestamp = new Date().toISOString();
    const signatureHash = hashObject(params.signature);

    const persistedSignature: PersistedSignature = {
      id: signatureId,
      signatureHash,
      signature: params.signature,
      sourceType: params.sourceType,
      sourceId: params.sourceId,
      timestamp,
      metadata: params.metadata || {},
    };

    // Ensure directory exists
    const signaturesDir = getSignaturesDir();
    await fs.mkdir(signaturesDir, { recursive: true });

    // Generate unique filename (append-only, never overwrite)
    // Include UUID to ensure uniqueness even for same sourceType/sourceId/timestamp
    const filename = `signature-${params.sourceType}-${params.sourceId}-${timestamp.replace(/[:.]/g, '-')}-${signatureId}.json`;
    const filepath = path.join(signaturesDir, filename);

    // Write signature to file
    await fs.writeFile(
      filepath,
      JSON.stringify(persistedSignature, null, 2),
      'utf-8'
    );

    return {
      success: true,
      signatureId,
      stored: true,
    };
  } catch (error) {
    return {
      success: false,
      signatureId: '',
      stored: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Retrieve historical signatures by criteria
 */
export async function getHistoricalSignatures(criteria: {
  sourceType?: SignatureSourceType;
  sourceId?: string;
  since?: Date;
  until?: Date;
  limit?: number;
}): Promise<PersistedSignature[]> {
  try {
    const signaturesDir = getSignaturesDir();
    
    // Ensure directory exists
    await fs.mkdir(signaturesDir, { recursive: true });

    // Read all signature files
    const files = await fs.readdir(signaturesDir);
    const signatures: PersistedSignature[] = [];

    for (const file of files) {
      if (!file.endsWith('.json')) continue;

      const filepath = path.join(signaturesDir, file);
      const content = await fs.readFile(filepath, 'utf-8');
      const signature: PersistedSignature = JSON.parse(content);

      // Apply filters
      if (criteria.sourceType && signature.sourceType !== criteria.sourceType) {
        continue;
      }

      if (criteria.sourceId && signature.sourceId !== criteria.sourceId) {
        continue;
      }

      const sigTimestamp = new Date(signature.timestamp);

      if (criteria.since && sigTimestamp < criteria.since) {
        continue;
      }

      if (criteria.until && sigTimestamp > criteria.until) {
        continue;
      }

      signatures.push(signature);
    }

    // Sort by timestamp (newest first)
    signatures.sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );

    // Apply limit
    if (criteria.limit && signatures.length > criteria.limit) {
      return signatures.slice(0, criteria.limit);
    }

    return signatures;
  } catch (error) {
    // If directory doesn't exist or other error, return empty array
    return [];
  }
}

/**
 * Get the most recent signature before a given time
 */
export async function getSignatureAtTime(timestamp: Date): Promise<PersistedSignature | null> {
  try {
    const signatures = await getHistoricalSignatures({
      until: timestamp,
    });

    if (signatures.length === 0) {
      return null;
    }

    // Return the most recent signature before the given time
    return signatures[0];
  } catch (error) {
    return null;
  }
}

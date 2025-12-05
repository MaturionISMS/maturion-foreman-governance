/**
 * Pilot Build Waves
 * Defines controlled, small-scale build waves for validating the Foreman system
 */

import { RepoTarget } from "@/lib/config/repoRegistry";

export interface PilotWaveAction {
  type: "modify_file" | "qa_run" | "create_file";
  path?: string;
  intent?: string;
  target?: string;
}

export interface PilotWave {
  id: string;
  description: string;
  repoTarget: RepoTarget;
  actions: PilotWaveAction[];
  isPilot: boolean; // Explicit flag for pilot wave identification
}

export const PILOT_WAVES: PilotWave[] = [
  {
    id: "pilot_foreman_sandbox",
    description: "Simple sandbox build to validate chat → builder → PR pipeline.",
    repoTarget: "foreman_app_sandbox",
    isPilot: true,
    actions: [
      {
        type: "modify_file",
        path: "sandbox/PILOT_BUILD_NOTES.md",
        intent: "Create or update a small markdown file documenting the pilot build.",
      },
      {
        type: "qa_run",
        target: "foreman_app_sandbox",
      }
    ]
  }
];

/**
 * Get pilot wave by ID
 */
export function getPilotWave(id: string): PilotWave | undefined {
  return PILOT_WAVES.find(wave => wave.id === id);
}

/**
 * Get all pilot waves
 */
export function getAllPilotWaves(): PilotWave[] {
  return PILOT_WAVES;
}

/**
 * Get pilot waves by repo target
 */
export function getPilotWavesByRepo(repoTarget: RepoTarget): PilotWave[] {
  return PILOT_WAVES.filter(wave => wave.repoTarget === repoTarget);
}

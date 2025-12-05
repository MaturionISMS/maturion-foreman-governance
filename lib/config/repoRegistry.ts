/**
 * Repository Registry
 * Defines repositories and modules available for Foreman builds
 */

export type RepoTarget =
  | "foreman_app_sandbox"
  | "partpulse_sandbox"
  | "isms_sandbox";

export interface RepoConfig {
  id: RepoTarget;
  name: string;
  description: string;
  gitUrl: string;
  localPathEnvVar?: string; // For local builder
  defaultBranch: string;
}

export const REPO_REGISTRY: RepoConfig[] = [
  {
    id: "foreman_app_sandbox",
    name: "Foreman App Sandbox",
    description: "Safe sandbox area inside maturion-foreman-app for pilot builds.",
    gitUrl: "https://github.com/MaturionISMS/maturion-foreman-app.git",
    defaultBranch: "main",
    localPathEnvVar: "LOCAL_FOREMAN_APP_PATH"
  },
  {
    id: "partpulse_sandbox",
    name: "PartPulse Sandbox",
    description: "Safe sandbox area inside PartPulse repo.",
    gitUrl: "https://github.com/MaturionISMS/partpulse.git",
    defaultBranch: "main",
    localPathEnvVar: "LOCAL_PARTPULSE_PATH"
  },
  {
    id: "isms_sandbox",
    name: "ISMS Sandbox",
    description: "Reserved for future ISMS module builds (placeholder).",
    gitUrl: "https://github.com/MaturionISMS/isms.git",
    defaultBranch: "main",
    localPathEnvVar: "LOCAL_ISMS_PATH"
  }
];

/**
 * Get repository configuration by ID
 */
export function getRepoConfig(id: RepoTarget): RepoConfig | undefined {
  return REPO_REGISTRY.find(repo => repo.id === id);
}

/**
 * Get repository configuration by name
 */
export function getRepoByName(name: string): RepoConfig | undefined {
  return REPO_REGISTRY.find(repo => repo.name === name);
}

/**
 * Get all available repositories
 */
export function getAllRepos(): RepoConfig[] {
  return REPO_REGISTRY;
}

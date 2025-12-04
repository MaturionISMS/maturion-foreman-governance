import { github } from "./client";

export type ForemanBehaviourFile = {
  path: string;
  content: string;
};

export async function loadForemanBehaviourFiles(): Promise<ForemanBehaviourFile[]> {
  const owner = process.env.FOREMAN_BEHAVIOUR_REPO_OWNER;
  const repo = process.env.FOREMAN_BEHAVIOUR_REPO_NAME;
  const basePath = process.env.FOREMAN_BEHAVIOUR_DIR;

  const missing: string[] = [];
  if (!owner) missing.push('FOREMAN_BEHAVIOUR_REPO_OWNER');
  if (!repo) missing.push('FOREMAN_BEHAVIOUR_REPO_NAME');
  if (!basePath) missing.push('FOREMAN_BEHAVIOUR_DIR');

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(', ')}`
    );
  }

  // At this point we know all values are defined
  const { data } = await github.rest.repos.getContent({
    owner: owner!,
    repo: repo!,
    path: basePath!,
  });

  if (!Array.isArray(data)) {
    throw new Error(`Expected directory at ${basePath}.`);
  }

  const files: ForemanBehaviourFile[] = [];

  for (const item of data) {
    if (item.type === "file" && item.download_url) {
      const res = await fetch(item.download_url);
      files.push({
        path: item.path,
        content: await res.text(),
      });
    }
  }

  return files;
}


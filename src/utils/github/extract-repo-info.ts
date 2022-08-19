export function extractRepoInfo(url: string) {
  const [, owner, name] = url.split("/");
  return { owner, name };
}

export type RepoInfo = ReturnType<typeof extractRepoInfo>;

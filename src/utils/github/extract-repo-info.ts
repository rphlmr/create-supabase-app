/**
 * Credit to Remix CLI https://github.com/remix-run/remix/blob/main/packages/remix-dev/cli/create.ts
 */

// support only url with a tree for now
export function extractRepoInfo(url: string) {
  const [, owner, name, , branch = "main", ...file] = new URL(
    url
  ).pathname.split("/");

  const filePath = file.join("/");

  return {
    owner,
    name,
    branch,
    filePath: filePath === "" || filePath === "/" ? null : filePath,
  };
}

export type RepoInfo = ReturnType<typeof extractRepoInfo>;

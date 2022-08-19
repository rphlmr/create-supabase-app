/**
 * Credit to Remix CLI https://github.com/remix-run/remix/blob/ba5c84861b578abf7dc750b2b3018ccda5c45b67/packages/remix-dev/cli/create.ts#L506
 */

import path from "node:path";

import { pathExists, readdir, stat } from "fs-extra";

export async function checkNewProjectPath(location: string) {
  const projectDir = path.resolve(process.cwd(), location);
  const isDirectoryExists =
    (await pathExists(projectDir)) && (await stat(projectDir)).isDirectory();

  // if directory exists, check if it is empty
  if (isDirectoryExists) {
    // empty directory? OK
    return (await readdir(projectDir)).length === 0;
  }

  return true;
}

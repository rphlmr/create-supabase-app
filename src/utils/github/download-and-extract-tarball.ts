/**
 * Credit to Remix CLI https://github.com/remix-run/remix/blob/main/packages/remix-dev/cli/create.ts
 */

import path from "node:path";
import stream from "node:stream/promises";

import gunzip from "gunzip-maybe";
import { extract } from "tar-fs";

import { createError } from "@utils/handle-error";
import { NEW_LINE } from "@utils/print";

import type { RepoInfo } from "./extract-repo-info";

const fetchPromise = import("node-fetch").then((mod) => mod.default);
// We can't build this app with ESM for now :/
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const fetch = (...args) => fetchPromise.then((fetch) => fetch(...args));

// TODO: add more use cases like downloading from a local path to test before making pull request, etc
export async function downloadAnExtractTarball(
  projectDir: string,
  { branch, filePath, name, owner }: RepoInfo
) {
  const resourceUrl = `https://codeload.github.com/${owner}/${name}/tar.gz/${branch}`;

  if (filePath) {
    filePath = filePath.split(path.sep).join(path.posix.sep);
  }

  const response = await fetch(resourceUrl);

  if (response.status !== 200 || !response.body) {
    throw createError(`Unable to download repository template ${resourceUrl}`);
  }

  try {
    await stream.pipeline(
      response.body.pipe(gunzip()),
      extract(projectDir, {
        map(header) {
          const originalDirName = header.name.split("/")[0];
          header.name = header.name.replace(`${originalDirName}/`, "");

          if (filePath) {
            if (header.name.startsWith(filePath)) {
              header.name = header.name.replace(filePath, "");
            } else {
              header.name = "__IGNORE__";
            }
          }

          return header;
        },
        ignore(_filename, header) {
          if (!header) {
            throw createError(`Header is undefined : template ${resourceUrl}`);
          }

          return header.name === "__IGNORE__";
        },
      })
    );
  } catch (e) {
    throw createError(
      `There was a problem extracting the file from the provided template.${NEW_LINE}Template URL: ${resourceUrl}${NEW_LINE}Destination directory: ${projectDir}`,
      e
    );
  }
}

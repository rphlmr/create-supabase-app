import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { createError } from "@utils/handle-error";

const configPath = path.join(os.homedir(), ".supabase");
const accessTokenPath = path.join(os.homedir(), ".supabase", "access-token");

const accessTokenPattern = new RegExp(/^sbp_[a-f0-9]{40}$/);

export function isToken(accessToken: string | undefined | null) {
  return accessTokenPattern.test(accessToken ?? "");
}

export async function loadAccessToken() {
  let accessToken: string | undefined;

  // check if exists in env
  accessToken = process.env.SUPABASE_ACCESS_TOKEN;

  // check if exists in config file
  if (!accessToken) {
    accessToken = await fs
      .readFile(accessTokenPath, "utf8")
      .then((token) => token.trim())
      .catch(() => undefined);
  }

  return accessToken;
}

export async function persistAccessToken(accessToken: string) {
  const configPathExists = await fs
    .access(configPath)
    .then(() => true)
    .catch(() => false);

  if (!configPathExists) {
    await fs.mkdir(configPath).catch((e) => {
      throw createError(`Unable to create config directory ${configPath}`, e);
    });
  }

  await fs.writeFile(accessTokenPath, accessToken, "utf-8").catch((e) => {
    throw createError(`Unable to save access token in ${configPath}`, e);
  });
}

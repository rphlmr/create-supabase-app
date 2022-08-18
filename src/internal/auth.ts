import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";

const configPath = path.join(os.homedir(), ".supabase");
const accessTokenPath = path.join(os.homedir(), ".supabase", "access-token");
const accessTokenPattern = new RegExp(/^sbp_[a-f0-9]{40}$/);

function validateAccessToken(accessToken?: string | null) {
  if (!accessToken || !accessTokenPattern.test(accessToken)) {
    return new Error(
      "Invalid access token format. Must be like `sbp_0102...1920`."
    );
  }
}

async function loadAccessToken() {
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

  return {
    accessToken,
    accessTokenError: validateAccessToken(accessToken),
  };
}

export async function persistAccessToken(accessToken: string) {
  let saveAccessTokenError: string | undefined;

  const configPathExists = await fs
    .access(configPath)
    .then(() => true)
    .catch(() => false);

  if (!configPathExists) {
    saveAccessTokenError = await fs
      .mkdir(configPath)
      .then(() => undefined)
      .catch(() => `Unable to create config directory ${configPath}`);
  }

  if (!saveAccessTokenError) {
    saveAccessTokenError = await fs
      .writeFile(accessTokenPath, accessToken, "utf-8")
      .then(() => undefined)
      .catch(() => `Unable to save access token in ${configPath}`);
  }

  return {
    newAccessToken: !saveAccessTokenError ? accessToken : null,
    saveAccessTokenError,
  };
}

export { loadAccessToken, validateAccessToken };

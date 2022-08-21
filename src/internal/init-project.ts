// Credit to Remix Indie stack : https://github.com/remix-run/indie-stack

import crypto from "node:crypto";
import path from "node:path";

import { readFile, readJSON, writeFile, copyFile, rm } from "fs-extra";
import { Client } from "pg";
import sort from "sort-package-json";

import type { CreateAppConfig } from "@config/frameworks";

function getRandomString(length: number) {
  return crypto.randomBytes(length).toString("hex");
}

export async function initProject({
  projectDir,
  dbPassword,
  projectId,
  anonKey,
  serviceRoleKey,
  projectName,
}: CreateAppConfig) {
  const EXAMPLE_ENV_PATH = path.join(projectDir, ".env.example");
  const ENV_PATH = path.join(projectDir, ".env");
  const PACKAGE_JSON_PATH = path.join(projectDir, "package.json");
  const SQL_SCHEMA_PATH = path.join(projectDir, "supabase.init", "schema.sql");

  const [env, packageJson, SQLSchema] = await Promise.all([
    readFile(EXAMPLE_ENV_PATH, "utf-8"),
    readJSON(PACKAGE_JSON_PATH, "utf-8"),
    readFile(SQL_SCHEMA_PATH, "utf-8"),
  ]);

  const newEnv = env
    .replace(/^SESSION_SECRET=.*$/m, `SESSION_SECRET="${getRandomString(16)}"`)
    .replace(/^SUPABASE_ANON_PUBLIC=.*$/m, `SUPABASE_ANON_PUBLIC="${anonKey}"`)
    .replace(
      /^SUPABASE_SERVICE_ROLE=.*$/m,
      `SUPABASE_SERVICE_ROLE="${serviceRoleKey}"`
    )
    .replace(
      /^SUPABASE_URL=.*$/m,
      `SUPABASE_URL="https://${projectId}.supabase.co"`
    );

  const newPackageJson =
    JSON.stringify(sort({ ...packageJson, name: projectName }), null, 2) + "\n";

  await Promise.all([
    writeFile(ENV_PATH, newEnv),
    writeFile(PACKAGE_JSON_PATH, newPackageJson),
    copyFile(
      path.join(projectDir, "supabase.init", "gitignore"),
      path.join(projectDir, ".gitignore")
    ),
  ]);

  // run sql schema init
  await runSQLSchemaInit(SQLSchema, dbPassword, projectId);

  // at the end, remove supabase.init folder
  await rm(path.join(projectDir, "supabase.init"), {
    recursive: true,
    force: true,
  });
}

async function runSQLSchemaInit(
  SQLSchema: string,
  dbPassword: string,
  projectId: string
) {
  // wait db to be ready
  const MAX_ATTEMPTS = 60;
  const TICK = 3_000;
  let attempts = 0;

  let client;
  do {
    try {
      attempts++;

      client = new Client({
        database: "postgres",
        user: "postgres",
        host: `db.${projectId}.supabase.co`,
        password: dbPassword,
        port: 5432,
      });
      await client.connect();
      await client.query(SQLSchema);
      await client?.end();
      break;
    } catch (e) {
      await client?.end();
      await new Promise((resolve) => setTimeout(resolve, TICK));
    }
  } while (attempts < MAX_ATTEMPTS);
}

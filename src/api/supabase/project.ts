import fetch from "node-fetch";

import { APIError } from "@utils/handle-error";
import { spinner } from "@utils/spinner";

import { supabaseAPIHost } from "./utils";

const region = {
  "ap-northeast-1": "Northeast Asia (Tokyo)",
  "ap-northeast-2": "Northeast Asia (Seoul)",
  "ap-south-1": "South Asia (Mumbai)",
  "ap-southeast-1": "Southeast Asia (Singapore)",
  "ap-southeast-2": "Oceania (Sydney)",
  "ca-central-1": "Canada (Central)",
  "eu-central-1": "Central EU (Frankfurt)",
  "eu-west-1": "West EU (Ireland)",
  "eu-west-2": "West EU (London)",
  "sa-east-1": "South America (São Paulo)",
  "us-east-1": "East US (North Virginia)",
  "us-west-1": "West US (North California)",
};

export type Region = keyof typeof region;

export type ProjectResponse = {
  id: string;
  name: string;
};

export function mapProjectChoices(projects: ProjectResponse[]) {
  return projects.map(({ id, name }) => ({
    name,
    value: id,
  }));
}

const plan = {
  free: { value: "free", name: "Free" },
  pro: { value: "pro", name: "Pro" },
};
export type Plan = keyof typeof plan;

export type CreateProjectBody = {
  db_pass: string;
  name: string;
  organization_id: string;
  plan: Plan;
  region: Region;
};

const APIUrl = `${supabaseAPIHost}/v1/projects`;

export function getRegions() {
  return Object.entries(region).map(([value, name]) => ({ name, value }));
}

export function getPlans() {
  return Object.values(plan);
}

export function generatePassword() {
  const chars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let password = "";

  for (let i = 0; i < 20; i++) {
    password += chars[Math.floor(Math.random() * chars.length)];
  }
  return password;
}

export async function createProject(
  accessToken: string,
  body: CreateProjectBody
) {
  spinner.start(`Creating your project "${body.name}"`);

  const response = await fetch(APIUrl, {
    method: "post",
    body: JSON.stringify(body),
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw APIError(
      `There was a problem creating your project "${body.name}"`,
      response
    );
  }

  spinner.succeed(`Project "${body.name}" successfully created`);
  spinner.succeed(`We are going to use this project ("${body.name}") now`);

  return (await response.json()) as ProjectResponse;
}

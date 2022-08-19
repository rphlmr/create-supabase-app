import { nfetch } from "@utils/fetch";
import { createError, mayBeSupabaseAPIError } from "@utils/handle-error";

import { supabaseAPI } from "./utils";

export const region = {
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

type ProjectResponse = {
  id: string;
  name: string;
};

const plan = {
  free: { value: "free", label: "Free" },
  pro: { value: "pro", label: "Pro" },
};
export type Plan = keyof typeof plan;

export type CreateProjectBody = {
  db_pass: string;
  name: string;
  organization_id: string;
  plan: Plan;
  region: Region;
};

export function getRegions() {
  return Object.entries(region).map(([value, label]) => ({ label, value }));
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
  body: CreateProjectBody,
  {
    accessToken,
  }: {
    accessToken?: string | null;
    signal?: AbortSignal;
  }
) {
  if (!accessToken) throw createError("Access token is required");

  const response = await nfetch(`${supabaseAPI}/projects`, {
    method: "post",
    body: JSON.stringify(body),
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });

  if (response.status !== 201) {
    const maybeApiError = await mayBeSupabaseAPIError(response);

    throw createError(
      `There was a problem creating your project "${body.name}"`,
      maybeApiError
    );
  }

  return (await response.json()) as ProjectResponse;
}

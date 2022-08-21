import { nfetch } from "@utils/fetch";
import { createError, mayBeSupabaseAPIError } from "@utils/handle-error";
import { NEW_LINE } from "@utils/print";

import { supabaseAPI } from "./utils";

type OrganizationResponse = {
  id: string;
  name: string;
};

export async function getOrganizations({
  accessToken,
  signal,
}: {
  accessToken?: string | null;
  signal?: AbortSignal;
}) {
  if (!accessToken) throw createError("Access token is required");

  const response = await nfetch(`${supabaseAPI}/organizations`, {
    signal,
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (response.status !== 200) {
    const maybeApiError = await mayBeSupabaseAPIError(response);

    throw createError(
      `There was a problem fetching your organizations.${NEW_LINE}Status: ${response.status} ${response.statusText}.${NEW_LINE}Try to Logout and be sure your access token is valid.`,
      maybeApiError
    );
  }

  return (await response.json()) as OrganizationResponse[];
}

export async function createOrganization(
  name: string,
  {
    accessToken,
    signal,
  }: {
    accessToken?: string | null;
    signal?: AbortSignal;
  }
) {
  if (!accessToken) throw createError("Access token is required");

  const response = await nfetch(`${supabaseAPI}/organizations`, {
    signal,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    method: "post",
    body: JSON.stringify({ name }),
  });

  if (response.status !== 201) {
    const maybeApiError = await mayBeSupabaseAPIError(response);

    throw createError(
      `There was a problem creating your organization "${name}".${NEW_LINE}Status: ${response.status} ${response.statusText}.${NEW_LINE}Try to Logout and be sure your access token is valid.`,
      maybeApiError
    );
  }

  return (await response.json()) as OrganizationResponse;
}

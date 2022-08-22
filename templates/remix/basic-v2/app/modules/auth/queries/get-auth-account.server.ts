import { getSupabaseAdmin } from "~/database";
import type { SupabaseAuthSession } from "~/database/types";

export async function getAuthAccountByAccessToken(
  accessToken: SupabaseAuthSession["access_token"]
) {
  const { data, error } = await getSupabaseAdmin().auth.getUser(accessToken);

  if (!data || error) return null;

  return data;
}

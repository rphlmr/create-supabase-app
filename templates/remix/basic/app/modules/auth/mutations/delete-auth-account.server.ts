import { getSupabaseAdmin } from "~/database";

export async function deleteAuthAccount(userId: string) {
  return getSupabaseAdmin().auth.api.deleteUser(userId);
}

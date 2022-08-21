import { getSupabaseAdmin } from "~/database";

export async function getUserByEmail(email: string) {
  const { data, error } = await getSupabaseAdmin()
    .from("profiles")
    .select()
    .eq("email", email);

  if (!data || error) return null;

  return data[0];
}

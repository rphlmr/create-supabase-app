import { getSupabaseAdmin } from "~/database";

export async function createAuthAccount(email: string, password: string) {
  const { data, error } = await getSupabaseAdmin().auth.admin.createUser({
    email,
    password,
    email_confirm: true, // demo purpose, assert that email is confirmed. For production, check email confirmation
  });

  if (!data || error) return null;

  return data;
}

import { getSupabaseAdmin } from "~/database";
import { SERVER_URL } from "~/utils/env";

import { mapAuthSession } from "../utils/map-auth-session";

export async function signInWithEmail(email: string, password: string) {
  const { data, error } = await getSupabaseAdmin().auth.signInWithPassword({
    email,
    password,
  });

  if (!data.session || error) return null;

  return mapAuthSession(data.session);
}

export async function sendMagicLink(email: string) {
  return getSupabaseAdmin().auth.signInWithOtp({
    email,
    options: { emailRedirectTo: `${SERVER_URL}/oauth/callback` },
  });
}

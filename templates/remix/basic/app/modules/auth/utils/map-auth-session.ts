import type { SupabaseAuthSession } from "~/database/types";

import type { AuthSession } from "../session.server";

export function mapAuthSession(
  supabaseAuthSession: SupabaseAuthSession | null
): AuthSession | null {
  if (!supabaseAuthSession) return null;

  return {
    accessToken: supabaseAuthSession.access_token,
    refreshToken: supabaseAuthSession.refresh_token ?? "",
    userId: supabaseAuthSession.user?.id ?? "",
    email: supabaseAuthSession.user?.email ?? "",
    expiresIn: supabaseAuthSession.expires_in ?? -1,
    expiresAt: supabaseAuthSession.expires_at ?? -1,
    providerToken: supabaseAuthSession.provider_token,
  };
}

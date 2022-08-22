import { getSupabaseAdmin } from "~/database";
import {
  createAuthAccount,
  deleteAuthAccount,
  signInWithEmail,
} from "~/modules/auth/mutations";
import type { AuthSession } from "~/modules/auth/session.server";

async function createUser({
  email,
  userId,
}: Pick<AuthSession, "userId" | "email">) {
  const { error } = await getSupabaseAdmin()
    .from("profiles")
    .insert({ id: userId, email });

  return error;
}

export async function tryCreateUser({
  email,
  userId,
}: Pick<AuthSession, "userId" | "email">) {
  const error = await createUser({
    userId,
    email,
  });

  // user account created and have a session but unable to store in User table
  // we should delete the user account to allow retry create account again
  if (error) {
    await deleteAuthAccount(userId);
    return false;
  }

  return true;
}

export async function createUserAccount(
  email: string,
  password: string
): Promise<AuthSession | null> {
  const authAccount = await createAuthAccount(email, password);

  // ok, no user account created
  if (!authAccount) return null;

  const authSession = await signInWithEmail(email, password);

  // user account created but no session 😱
  // we should delete the user account to allow retry create account again
  if (!authSession) {
    await deleteAuthAccount(authAccount.user.id);
    return null;
  }

  const success = await tryCreateUser(authSession);

  if (!success) return null;

  return authSession;
}

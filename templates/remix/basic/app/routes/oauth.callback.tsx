import { useEffect, useMemo } from "react";

import { json, redirect } from "@remix-run/node";
import type { LoaderArgs, ActionArgs } from "@remix-run/node";
import { useActionData, useFetcher, useSearchParams } from "@remix-run/react";
import { getFormData } from "remix-params-helper";
import { z } from "zod";

import { getSupabase } from "~/database";
import {
  commitAuthSession,
  getAuthSession,
} from "~/modules/auth/session.server";
import { mapAuthSession } from "~/modules/auth/utils/map-auth-session";
import { tryCreateUser } from "~/modules/user/mutations";
import { getUserByEmail } from "~/modules/user/queries";
import { assertIsPost, safeRedirect } from "~/utils/http.server";

// imagine a user go back after OAuth login success or type this URL
// we don't want him to fall in a black hole 👽
export async function loader({ request }: LoaderArgs) {
  const authSession = await getAuthSession(request);

  if (authSession) return redirect("/profile");

  return json({});
}

export async function action({ request }: ActionArgs) {
  assertIsPost(request);

  const schema = z.object({
    accessToken: z.string(),
    refreshToken: z.string(),
    userId: z.string(),
    email: z.string().email(),
    redirectTo: z.string().optional(),
    expiresIn: z.number(),
    expiresAt: z.number(),
  });

  const form = await getFormData(request, schema);

  if (!form.success) {
    return json(
      {
        message: "invalid-token",
      },
      { status: 400 }
    );
  }

  const { redirectTo, ...authSession } = form.data;
  const safeRedirectTo = safeRedirect(redirectTo, "/profile");

  // user have un account, skip creation part and just commit session
  if (await getUserByEmail(authSession.email)) {
    return redirect(safeRedirectTo, {
      headers: {
        "Set-Cookie": await commitAuthSession(request, {
          authSession,
        }),
      },
    });
  }

  // first time sign in, let's create a brand-new User row in supabase
  const user = await tryCreateUser(authSession);

  if (!user) {
    return json(
      {
        message: "create-user-error",
      },
      { status: 500 }
    );
  }

  return redirect(safeRedirectTo, {
    headers: {
      "Set-Cookie": await commitAuthSession(request, {
        authSession,
      }),
    },
  });
}

export default function LoginCallback() {
  const error = useActionData<typeof action>();
  const fetcher = useFetcher();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") ?? "/profile";
  const supabase = useMemo(() => getSupabase(), []);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, supabaseSession) => {
        if (event === "SIGNED_IN") {
          // supabase sdk has ability to read url fragment that contains your token after third party provider redirects you here
          // this fragment url looks like https://.....#access_token=evxxxxxxxx&refresh_token=xxxxxx, and it's not readable server-side (Oauth security)
          // supabase auth listener gives us a user session, based on what it founds in this fragment url
          // we can't use it directly, client-side, because we can't access sessionStorage from here
          // so, we map what we need, and let's back-end to the work
          const authSession = mapAuthSession(supabaseSession);

          if (!authSession) return;

          const formData = new FormData();

          for (const [key, value] of Object.entries(authSession)) {
            formData.append(key, value as string);
          }

          formData.append("redirectTo", redirectTo);

          fetcher.submit(formData, { method: "post", replace: true });
        }
      }
    );

    return () => {
      // prevent memory leak. Listener stays alive 👨‍🎤
      authListener?.unsubscribe();
    };
  }, [fetcher, redirectTo, supabase.auth]);

  return error ? <div>{error.message}</div> : null;
}

import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";

import { getAuthSession } from "~/modules/auth/session.server";

export async function loader({ request }: LoaderArgs) {
  const { email } = (await getAuthSession(request)) || {};

  return json({ email });
}

export default function Index() {
  const { email } = useLoaderData<typeof loader>();
  return (
    <main className="relative min-h-screen bg-white sm:flex sm:items-center sm:justify-center">
      <div className="relative sm:pb-16 sm:pt-8">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="lg:pb-18 relative bg-white bg-opacity-50 px-4 pt-16 pb-8 sm:px-6 sm:pt-24 sm:pb-14 lg:px-8 lg:pt-32">
            <h1 className="flex items-center space-x-8 text-center text-6xl font-extrabold tracking-tight sm:text-8xl lg:text-9xl">
              <a href="https://supabase.com/docs/">
                <img
                  src="https://supabase.com/docs/img/supabase-logo-wordmark--light.svg"
                  alt="Supabase"
                  className="mx-auto h-10 w-full max-w-[12rem] md:max-w-[16rem]"
                />
              </a>
              <a href="https://remix.run">
                <img
                  src="https://user-images.githubusercontent.com/20722140/185784698-11171a89-36c2-4142-b2fb-4f0c3e1af389.svg"
                  alt="Remix"
                  className="mx-auto h-10 w-full max-w-[12rem] md:max-w-[16rem]"
                />
              </a>
            </h1>
            <div className="mx-auto mt-10 max-w-sm sm:flex sm:max-w-none sm:justify-center">
              {email ? (
                <Link
                  to="/profile"
                  className="flex items-center justify-center rounded-md border border-green-700 bg-white px-4 py-3 text-base font-medium text-green-700 shadow-sm hover:bg-green-50 sm:px-8"
                >
                  View Profile for {email}
                </Link>
              ) : (
                <div className="space-y-4">
                  <div className="space-y-4 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5 sm:space-y-0">
                    <Link
                      to="/join"
                      className="flex items-center justify-center rounded-md border border-green-700 bg-white px-4 py-3 text-base font-medium text-green-700 shadow-sm hover:bg-green-50 sm:px-8"
                    >
                      Sign up
                    </Link>
                    <Link
                      to="/login"
                      className="flex items-center justify-center rounded-md bg-green-500 px-4 py-3 font-medium text-white hover:bg-green-600  "
                    >
                      Log In
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

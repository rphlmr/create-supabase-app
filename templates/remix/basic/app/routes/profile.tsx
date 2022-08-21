import { json, LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { LogoutButton } from "~/modules/auth/components";
import { requireAuthSession } from "~/modules/auth/guards";

export async function loader({ request }: LoaderArgs) {
  const { email } = await requireAuthSession(request);

  return json({ email });
}

export default function Profile() {
  const data = useLoaderData<typeof loader>();

  return (
    <div className="flex h-full min-h-screen flex-col">
      <header className="flex items-center justify-between bg-slate-800 p-4 text-white">
        <h1 className="text-3xl font-bold">Hello</h1>
        <p>{data.email}</p>
        <LogoutButton />
      </header>

      <main className="flex h-full bg-white"></main>
    </div>
  );
}

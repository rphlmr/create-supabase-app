const fetchPromise = import("node-fetch").then((mod) => mod.default);
// We can't build this app in ESM for now :/

export const nfetch: Awaited<typeof fetchPromise> = (...args) =>
  fetchPromise.then((fetch) => fetch(...args));

export type Response = Awaited<ReturnType<typeof nfetch>>;

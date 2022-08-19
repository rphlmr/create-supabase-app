const fetchPromise = import("node-fetch").then((mod) => mod.default);
// We can't build this app in ESM for now :/
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const nfetch = (...args) => fetchPromise.then((fetch) => fetch(...args));

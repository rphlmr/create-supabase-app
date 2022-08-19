// import type { Response } from "node-fetch";

import { NEW_LINE } from "./print";

export function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message;

  return String(error);
}

export function createError(message: string, error?: unknown) {
  const reason = getErrorMessage(error);

  return new Error(
    `${message}${NEW_LINE}${reason ? `Reason => ${reason}` : ""}`
  );
}

// export async function APIError(message: string, response: Response) {
//   const details = await response.text().catch(() => "Unknown");
//   return new Error(
//     `${message}. "${response.status}" - "${response.statusText}"\n.Details : ${details}`
//   );
// }

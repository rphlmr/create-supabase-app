import type { Response } from "./fetch";
import { isEmpty } from "./is-empty";
import { NEW_LINE } from "./print";

export function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message;

  return String(error || "");
}

export function createError(message: string, error?: unknown) {
  const reason = getErrorMessage(error);

  return new Error(
    `${message}${!isEmpty(reason) ? `${NEW_LINE}Reason => ${reason}` : ""}`
  );
}

export async function mayBeSupabaseAPIError(response: Response) {
  return (
    (await response
      .json()
      .then((maybeError) => (maybeError as { message: string })?.message)
      .catch((error) => error)) || ""
  );
}

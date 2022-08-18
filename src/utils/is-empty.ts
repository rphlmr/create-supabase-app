import { createError } from "./handle-error";

export function isEmpty(value: string | null | undefined | Array<unknown>) {
  if (!value) return true;

  if (typeof value === "string") {
    return value.trim().length === 0;
  }

  if (Array.isArray(value)) {
    return value.length === 0;
  }

  throw createError(`Should implement type ${typeof value}`);
}

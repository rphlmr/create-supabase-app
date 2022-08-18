export function createChoices<T extends { id: string; name: string }>(
  values: T[]
) {
  return values.map((choice) => ({ ...choice, value: choice.id }));
}

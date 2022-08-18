export type ConfigBase<Type = string> = {
  value: Type;
  name: string;
  disabled?: string;
};

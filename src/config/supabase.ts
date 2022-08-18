import type { FrameworkProjectType } from "./framework";
import type { ConfigBase } from "./types";

export type SupabaseProjectType = "new" | "existing";

type SupabaseProjectTypeConfig = ConfigBase<SupabaseProjectType> & {
  frameworkProjectTypes: FrameworkProjectType[];
};
type SupabaseConfig = Record<SupabaseProjectType, SupabaseProjectTypeConfig>;

export const supabaseConfig: SupabaseConfig = {
  new: {
    value: "new",
    name: "A new project",
    frameworkProjectTypes: ["blank", "example"],
  },
  existing: {
    value: "existing",
    name: "An existing project",
    frameworkProjectTypes: ["blank"],
  },
};

export function getSupabaseProjectTypes(
  frameworkProjectType: FrameworkProjectType
): SupabaseProjectTypeConfig[] {
  return Object.values(supabaseConfig).map((config) => ({
    disabled: !config.frameworkProjectTypes.includes(frameworkProjectType)
      ? `This option is not available for ${frameworkProjectType} projects`
      : "",
    ...config,
  }));
}

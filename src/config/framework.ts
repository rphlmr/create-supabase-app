import type { ConfigBase } from "./types";

export type Framework = "remix" | "nextjs";
export type FrameworkProjectType = "blank" | "example";
type RemixTemplate = "remix" | "fly" | "note";
export type FrameworkTemplate = RemixTemplate;

type FrameworkConfig = Record<
  Framework,
  ConfigBase<Framework> & {
    type: Record<
      FrameworkProjectType,
      ConfigBase<FrameworkProjectType> & {
        template?: Partial<
          Record<
            FrameworkTemplate,
            ConfigBase<FrameworkTemplate> & { url: string }
          >
        >;
      }
    >;
  }
>;

export const frameworkConfig: FrameworkConfig = {
  remix: {
    value: "remix",
    name: "💿 Remix Run",
    type: {
      blank: {
        name: "A blank project with Auth included",
        value: "blank",
        template: {
          remix: { name: "Remix App Server", value: "remix", url: "" },
          fly: {
            name: "Fly.io",
            value: "fly",
            disabled: "Coming soon",
            url: "",
          },
        },
      },
      example: {
        name: "An example project",
        value: "example",
        template: {
          note: {
            name: "Note taking app",
            value: "note",
            url: "",
          },
        },
      },
    },
  },
  nextjs: {
    value: "nextjs",
    name: "NextJS",
    disabled: "Coming soon",
    type: {
      blank: {
        name: "A basic project (with Auth)",
        value: "blank",
        disabled: "Coming soon",
      },
      example: {
        name: "An example project",
        value: "example",
        disabled: "Coming soon",
      },
    },
  },
} as const;

export function getProjectTypes(framework: Framework) {
  return Object.values(frameworkConfig[framework].type);
}

export function getProjectTemplates(
  framework: Framework,
  type: FrameworkProjectType
) {
  return Object.values(frameworkConfig[framework].type[type].template || {});
}

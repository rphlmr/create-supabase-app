import type { Region } from "@api/supabase/project";

const supportedFrameworks = {
  remix: {
    label: "Remix",
    value: "remix",
    url: "https://remix.run/",
    enabled: true,
    templates: [
      {
        value: "blank",
        label: "Blank (with authentication)",
        description:
          "Just the basics, authentication included. Start coding your awesome project right away",
        url: "https://github.com/rphlmr/supa-fly-stack",
      },
      {
        value: "notestaking",
        label: "Notes taking app",
        description:
          "A demo of a notes taking app, with RLS (Row Level Security), a powerful feature when you need granular authorization rules",
        url: "https://github.com/rphlmr/create-supabase-app",
      },
    ],
  },
  nextjs: {
    label: "Next.js",
    value: "nextjs",
    url: "https://nextjs.org/",
    enabled: false,
    templates: [
      {
        value: "blank",
        label: "Blank",
        description: "",
        url: "https://nextjs.org/",
      },
    ],
  },
} as const;

export const availableFw = Object.values(supportedFrameworks)
  .filter(({ enabled }) => enabled)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- lodash ?
  .map(({ templates, ...rest }) => rest);

export const comingSoonFw = Object.values(supportedFrameworks)
  .filter(({ enabled }) => !enabled)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- lodash ?
  .map(({ templates, ...rest }) => rest);

export const getTemplates = (framework: Framework) => [
  ...supportedFrameworks[framework].templates,
];

export const getTemplate = (framework: Framework, template: Template) =>
  getTemplates(framework).filter(({ value }) => value === template)[0];

export const getFrameworkName = (framework: Framework) =>
  supportedFrameworks[framework].label;

export const getTemplateName = (framework: Framework, template: Template) =>
  getTemplate(framework, template).label;

export type Framework = keyof typeof supportedFrameworks;
export type Template = ReturnType<typeof getTemplates>[number]["value"];

export type CreateAppDatas = {
  framework: Framework;
  template: Template;
  projectDir: string;
  organizationId: string;
  projectName: string;
  supabaseProjectName: string;
  dbPassword: string;
  plan: "free" | "pro";
  region: Region;
};

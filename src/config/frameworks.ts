const supportedFrameworks = [
  {
    label: "Remix",
    value: "remix",
    url: "https://remix.run/",
    enabled: true,
  },
  {
    label: "Next.js",
    value: "nextjs",
    url: "https://nextjs.org/",
    enabled: false,
  },
];

const available = supportedFrameworks.filter(({ enabled }) => enabled);
const comingSoon = supportedFrameworks.filter(({ enabled }) => !enabled);

export const frameworks = { available, comingSoon };

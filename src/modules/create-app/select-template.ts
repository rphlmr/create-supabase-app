import inquirer from "inquirer";

import type {
  Framework,
  FrameworkProjectType,
  FrameworkTemplate,
} from "@config/framework";
import { getProjectTemplates, getProjectTypes } from "@config/framework";

async function selectTemplate(framework: Framework) {
  const { frameworkProjectType, template } = await inquirer.prompt<{
    frameworkProjectType: FrameworkProjectType;
    template: FrameworkTemplate;
  }>([
    {
      type: "list",
      name: "frameworkProjectType",
      message: "What type of template do you want to use for your app?",
      choices: getProjectTypes(framework),
      default: "blank",
    },
    {
      type: "list",
      name: "template",
      message: "Where do you want to deploy?",
      choices: getProjectTemplates(framework, "blank"),
      default: "remix",
      when: (answers) =>
        framework === "remix" && answers.frameworkProjectType === "blank",
    },
    {
      type: "list",
      name: "template",
      message: "Where example do you want to try?",
      choices: getProjectTemplates(framework, "example"),
      default: 0,
      when: (answers) => answers.frameworkProjectType === "example",
    },
  ]);

  return { frameworkProjectType, template };
}

export default selectTemplate;

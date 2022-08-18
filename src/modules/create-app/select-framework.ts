import inquirer from "inquirer";

import type { Framework } from "@config/framework.old";
import { frameworkConfig } from "@config/framework.old";

async function selectFramework() {
  const { framework } = await inquirer.prompt<{ framework: Framework }>([
    {
      type: "list",
      name: "framework",
      message: "What framework do you want to use?",
      choices: Object.values(frameworkConfig),
      default: "remix",
    },
  ]);

  return { framework };
}

export default selectFramework;

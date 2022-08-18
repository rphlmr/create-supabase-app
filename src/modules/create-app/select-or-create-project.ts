import chalk from "chalk";
import inquirer from "inquirer";

import type { Region, Plan } from "@api/supabase/project";
import {
  generatePassword,
  getRegions,
  getPlans,
  createProject,
} from "@api/supabase/project";

import { print, NEW_LINE } from "@utils/print";

import type { FrameworkProjectType } from "@config/framework.old";
import type { SupabaseProjectType } from "@config/supabase";
import { getSupabaseProjectTypes } from "@config/supabase";

async function selectOrCreateProject(
  accessToken: string,
  frameworkProjectType: FrameworkProjectType,
  organizationId: string
) {
  const { supabaseProjectType } = await inquirer.prompt<{
    supabaseProjectType: SupabaseProjectType;
  }>([
    {
      type: "list",
      name: "supabaseProjectType",
      message: "What type of Supabase project do you want to use for your app?",
      choices: getSupabaseProjectTypes(frameworkProjectType),
      default: "new",
    },
  ]);

  let project: { id: string; name: string; dbPassword: string };

  if (supabaseProjectType === "new") {
    print(
      NEW_LINE,
      chalk.green.bold("Let's create a new project for you."),
      NEW_LINE
    );

    const { projectName, dbPassword, region, plan } = await inquirer.prompt<{
      projectName: string;
      dbPassword: string;
      region: Region;
      plan: Plan;
    }>([
      {
        type: "input",
        name: "projectName",
        message: "What's the name of your project?",
        default: "how-i-meme-your-meme",
        validate: (input) => input.trim().length > 0,
      },
      {
        type: "password",
        name: "dbPassword",
        message:
          "What do you want to use as the database password? (20 chars min)\n" +
          NEW_LINE +
          "If you don't want to use a custom password, just press enter, we have generated default one for you" +
          NEW_LINE +
          chalk.yellow.bold("You'll find it later in the project .env file\n") +
          NEW_LINE +
          "🔑 : ",
        default: generatePassword(),
        validate: (input) => input.trim().length >= 20,
        mask: "*",
      },
      {
        type: "list",
        name: "region",
        choices: getRegions(),
        message:
          NEW_LINE +
          "Where do you want to deploy your project? (select a region close to you for the best performance)",
      },
      {
        type: "list",
        name: "plan",
        choices: getPlans(),
        message:
          "Select a plan that suits your needs (see https://supabase.com/pricing)",
      },
    ]);

    const newProject = await createProject(accessToken, {
      name: projectName,
      organization_id: organizationId,
      db_pass: dbPassword,
      plan,
      region,
    });

    return { ...newProject, dbPassword };
  }
}

export default selectOrCreateProject;

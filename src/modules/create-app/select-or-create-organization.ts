import chalk from "chalk";
import inquirer from "inquirer";

import { createChoices } from "@utils/create-choices";
import { print, NEW_LINE } from "@utils/print";
import { getUserName } from "@utils/user-name";

import { API } from "@internal/api";

async function createOrganization() {
  print(
    NEW_LINE,
    chalk.green.bold(
      "You don't have any organizations. Let's create one for you."
    ),
    NEW_LINE
  );

  const { name } = await inquirer.prompt<{
    name: string;
  }>([
    {
      type: "input",
      name: "name",
      message:
        "What's the name of your company or team? (You can rename your organization later)",
      default: getUserName(),
      validate: (input) => input.trim().length > 0,
    },
  ]);

  return (await API().Organizations.new(name)).id;
}

async function selectOrganization() {
  return (
    await inquirer.prompt<{
      id: string;
    }>([
      {
        type: "list",
        name: "id",
        message: "Choose your organization",
        choices: createChoices(await API().Organizations.getAll()),
        default: 0,
      },
    ])
  ).id;
}

async function selectOrCreateOrganization() {
  // check if has organization or create one

  switch (await API().Organizations.hasOrganizations()) {
    case true:
      return selectOrganization();
    case false:
      return createOrganization();
  }
}

export default selectOrCreateOrganization;

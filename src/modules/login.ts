import inquirer from "inquirer";

import { print, NEW_LINE } from "@utils/print";

import {
  loadAccessToken,
  validateAccessToken,
  saveAccessToken,
} from "@internal/auth";

async function login() {
  const { accessToken, accessTokenError } = await loadAccessToken();

  if (accessToken && !accessTokenError) return { accessToken };

  print(
    "You can generate an access token from https://app.supabase.io/account/tokens",
    NEW_LINE
  );

  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "accessToken",
      message: "Enter your access token",
      validate: (input: string) => {
        const error = validateAccessToken(input);
        return error ? error.message : true;
      },
      prefix: "🔑",
    },
  ]);

  const { saveAccessTokenError, newAccessToken } = await saveAccessToken(
    answers.accessToken
  );

  return {
    accessToken: newAccessToken,
    loginError: saveAccessTokenError,
  };
}

export default login;

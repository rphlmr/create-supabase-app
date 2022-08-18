import inquirer from "inquirer";

async function selectLocation() {
  const { location } = await inquirer.prompt<{ location: string }>([
    {
      type: "input",
      name: "location",
      message: "Where would you like to create your app?",
      default: "./my-supabase-app",
    },
  ]);

  return { location };
}

export default selectLocation;

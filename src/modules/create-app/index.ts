import selectFramework from "./select-framework";
import selectLocation from "./select-location";
import selectOrCreateOrganization from "./select-or-create-organization";
import selectOrCreateProject from "./select-or-create-project";
import selectTemplate from "./select-template";

// async function selectSupabaseProject(
//   accessToken: string,
//   frameworkProjectType: FrameworkProjectType
// ) {
//   //You can rename your organization later
//   const { supabaseProjectType, supabaseProjectId } = await inquirer.prompt<{
//     supabaseProjectType: SupabaseProjectType;
//     supabaseProjectId: string;
//   }>([
//     {
//       type: "list",
//       name: "supabaseProjectType",
//       message: "What type of Supabase project do you want to use for your app?",
//       choices: getSupabaseProjectTypes(frameworkProjectType),
//       default: "new",
//     },
//     {
//       type: "list",
//       name: "supabaseOrganizationId",
//       message: "Choose your organization",
//       choices: async (answers) => {
//         console.log("previous answers", answers);
//         const supabaseAPIHost = "https://api.supabase.io";
//         const organizationsAPI = `${supabaseAPIHost}/v1/organizations`;
//         const response = await fetch(organizationsAPI, {
//           headers: { Authorization: `Bearer ${accessToken}` },
//         });
//         const organizations = (await response.json()) as {
//           id: string;
//           name: string;
//         }[];
//         console.log(organizations);
//         return organizations.map(({ id, name }) => ({ value: id, name }));
//       },
//       when: (answers) => answers.supabaseProjectType === "existing",
//     },
//     {
//       type: "list",
//       name: "supabaseProjectId",
//       message: "CREATE",
//       choices: async () => {
//         //
//       },
//       when: (answers) => answers.supabaseProjectType === "new",
//     },
//     {
//       type: "list",
//       name: "supabaseProjectId",
//       message: "Choose your project",
//       choices: async () => {
//         const supabaseAPIHost = "https://api.supabase.io";
//         const organizationsAPI = `${supabaseAPIHost}/v1/organizations`;
//         const response = await fetch(organizationsAPI, {
//           headers: { Authorization: `Bearer ${accessToken}` },
//         });
//         const organizations = (await response.json()) as {
//           id: string;
//           name: string;
//         }[];
//         console.log(organizations);
//         return organizations.map(({ id, name }) => ({ value: id, name }));
//       },
//       when: (answers) => answers.supabaseProjectType === "existing",
//     },
//   ]);

//   return { supabaseProjectType, supabaseProjectId };
// }

async function createApp() {
  const { framework } = await selectFramework();
  console.log("framework", framework);

  const { location } = await selectLocation();
  console.log("location", location);

  const { frameworkProjectType, template } = await selectTemplate(framework);
  console.log("frameworkProjectType", frameworkProjectType);
  console.log("template", template);

  // select or create organization
  const organizationId = await selectOrCreateOrganization();

  console.log("selectedOrganization", organizationId);

  await selectOrCreateProject("", frameworkProjectType, organizationId);
  // select organization
  // load projects for organization
  // ask for project type (new or existing) depending on frameworkProjectType
  // frameworkProjectType === "blank" => new or existing database
  // frameworkProjectType === "example" => new database only

  //await selectSupabaseProject(accessToken, frameworkProjectType);
  // download template (avec auth)
  // checks api
  // compile
  // propose npm install
  // done
}

export default createApp;

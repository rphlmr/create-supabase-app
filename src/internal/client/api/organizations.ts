import fetch from "node-fetch";

import { APIError } from "@utils/handle-error";
import { spinner } from "@utils/spinner";

import { supabaseAPIHost } from "../const";

type OrganizationResponse = {
  id: string;
  name: string;
};

export default class OrganizationsAPI {
  private readonly url = `${supabaseAPIHost}/v1/organizations`;
  private organizations: OrganizationResponse[] = [];
  private hasAlreadyFetchedOrganizations = false;

  constructor(private readonly accessToken: string) {}

  hasOrganizations = async () => {
    if (this.hasAlreadyFetchedOrganizations)
      return this.organizations.length > 0;

    const organizations = await this.getAll();

    return organizations.length > 0;
  };

  getAll = async () => {
    if (this.hasAlreadyFetchedOrganizations) {
      return this.organizations;
    }

    spinner.start("Fetching your organizations");

    const response = await fetch(this.url, {
      headers: { Authorization: `Bearer ${this.accessToken}` },
    });

    if (!response.ok) {
      throw APIError(
        "There was a problem fetching your organizations",
        response
      );
    }

    spinner.succeed("Fetching your organizations");
    this.hasAlreadyFetchedOrganizations = true;

    return (this.organizations =
      (await response.json()) as OrganizationResponse[]);
  };

  new = async (name: string) => {
    spinner.start(`Creating your organization "${name}"`);

    const response = await fetch(this.url, {
      method: "post",
      body: JSON.stringify({ name }),
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw APIError(
        `There was a problem creating your organization "${name}"`,
        response
      );
    }

    spinner.succeed(`Organization "${name}" successfully created`);
    spinner.succeed(
      `We are going to use this organization ("${name}") for your new project`
    );

    return (await response.json()) as OrganizationResponse;
  };
}

import OrganizationsAPI from "./api/organizations";

type API = {
  Organizations: typeof OrganizationsAPI;
};

type RegisteredAPI = {
  Organizations: OrganizationsAPI;
};

class APIClientBuilder {
  private static instance: APIClientBuilder;

  private constructor(private readonly api: RegisteredAPI) {}

  public static registerAPI = (api: API) => (accessToken: string) => {
    if (!APIClientBuilder.instance) {
      if (!accessToken) {
        throw new Error("accessToken is required");
      }

      const plugins = Object.keys(api).reduce(
        (acc, key) => ({
          ...acc,
          [key]: new api[key as keyof RegisteredAPI](accessToken),
        }),
        {} as RegisteredAPI
      );

      APIClientBuilder.instance = new APIClientBuilder(plugins);
      return;
    }

    console.warn("APIClient is already initialized");
  };

  public static build = () => {
    if (!APIClientBuilder.instance) {
      throw new Error("APIClient is not initialized");
    }

    return APIClientBuilder.instance.api;
  };
}

export const initializeAPIClient = APIClientBuilder.registerAPI({
  Organizations: OrganizationsAPI,
});

export const API = APIClientBuilder.build;

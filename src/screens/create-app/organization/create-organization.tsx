import React, { useCallback, useEffect, useState } from "react";

import { Box, Text } from "ink";

import { createOrganization } from "@api/supabase/organizations";

import { getUserName } from "@utils/user-name";

import { useAuth } from "@auth/auth-context";
import { Error } from "@components/error";
import { Loading } from "@components/loading";
import { PrOwl } from "@components/pr-owl";
import { TextInput } from "@components/text-input";
import { useNavigation } from "@router/router-context";

const useCreateOrganization = () => {
  const { accessToken } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>();
  const [isSuccess, setIsSuccess] = useState(false);

  const create = useCallback(
    async (name: string) => {
      setIsLoading(true);
      createOrganization(name, { accessToken })
        .then(() => {
          setIsSuccess(true);
        })
        .catch((e) => {
          setIsSuccess(false);
          setError((e as Error).message);
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
    [accessToken]
  );

  return { isLoading, error, isSuccess, create };
};

const CreateOrganizationScreen = () => {
  const { navigateTo } = useNavigation();
  const { create, isSuccess, error, isLoading } = useCreateOrganization();
  const [choice, setChoice] = useState("");

  useEffect(() => {
    if (!isLoading && isSuccess) {
      return navigateTo("/create-app/organization");
    }
  }, [isLoading, isSuccess, navigateTo]);

  const handleSubmit = useCallback(
    async (input: string) => {
      const orgName = input || getUserName();

      create(orgName);
    },
    [create]
  );

  if (isLoading) {
    return (
      <Loading>
        <Text>
          Creating your Supabase organization{" "}
          <Text bold>{choice || getUserName()}</Text>
        </Text>
      </Loading>
    );
  }

  if (error) {
    return (
      <Error>
        <Text>{error}</Text>
      </Error>
    );
  }

  return (
    <Box justifyContent="center">
      <Box marginRight={8} justifyContent="center">
        <PrOwl>
          <Text bold>Create a Supabase organization</Text>
          <Text italic color="gray">
            Press Enter to continue
          </Text>

          <Box flexDirection="column" alignItems="center" marginTop={1}>
            <Text>You choose</Text>
            <Text bold color="green">
              {choice || getUserName()}
            </Text>
          </Box>

          <Box
            width={35}
            marginTop={1}
            flexDirection="column"
            alignItems="center"
          >
            <Text color="blue">
              {`An organization is like a folder in your Supabase Dashboard.
It's a logical grouping of your Supabase projects.`}
            </Text>
          </Box>
        </PrOwl>
      </Box>

      <Box flexDirection="column" justifyContent="center">
        <TextInput
          value={choice}
          onChange={setChoice}
          onSubmit={handleSubmit}
          placeholder={getUserName()}
        />
      </Box>
    </Box>
  );
};

export default CreateOrganizationScreen;

import React, { useCallback, useState } from "react";

import { Box, Text } from "ink";

import { isEmpty } from "@utils/is-empty";
import { NEW_LINE } from "@utils/print";

import { PrOwl } from "@components/pr-owl";
import { TextInput } from "@components/text-input";
import type { CreateAppConfig } from "@config/frameworks";
import { useNavigation, useRouteParams } from "@router/router-context";

const APIKeyScreen = () => {
  const { navigateTo } = useNavigation();
  const { projectId } = useRouteParams() as Pick<CreateAppConfig, "projectId">;
  const [anonKey, setAnonKey] = useState("");
  const [serviceRoleKey, setServiceRoleKey] = useState("");
  const [currentKey, setCurrentKey] = useState<
    "anon public" | "service_role secret"
  >("anon public");

  const handleSubmit = useCallback(
    async (key: string) => {
      if (isEmpty(key)) return;

      navigateTo("/create-app/run-init-project", { anonKey, serviceRoleKey });
    },
    [anonKey, navigateTo, serviceRoleKey]
  );

  const requestServiceRoleKey = useCallback((key: string) => {
    if (isEmpty(key)) return;

    setCurrentKey("service_role secret");
  }, []);

  return (
    <Box justifyContent="center">
      <Box marginRight={8} justifyContent="center">
        <PrOwl>
          <Text bold>
            Set your <Text color="yellow">{currentKey}</Text> API Key
          </Text>

          <Text italic color="grey">
            Press Enter to confirm
          </Text>

          <Box
            flexDirection="column"
            alignItems="center"
            marginTop={1}
            width={35}
          >
            <Text>You set</Text>
            <Text wrap="truncate-middle" bold color="green">
              {currentKey === "anon public" ? anonKey : serviceRoleKey}
            </Text>
          </Box>
          <Box width={35} marginTop={1} flexDirection="column">
            <Text color="blue">
              Make a mistake? You can always change it later in the project .env
              file.
            </Text>
          </Box>
        </PrOwl>
      </Box>

      <Box flexDirection="column" justifyContent="center">
        <Box marginBottom={1}>
          <Text>
            You can find your{" "}
            <Text color="yellow" bold>
              {currentKey} key
            </Text>{" "}
            here 👇
            {NEW_LINE}
            <Text color="cyan">
              {`https://app.supabase.com/project/${projectId}/settings/api`}
            </Text>
          </Text>
        </Box>

        {currentKey === "anon public" ? (
          <TextInput
            value={anonKey}
            onChange={setAnonKey}
            onSubmit={requestServiceRoleKey}
            placeholder="anon public"
          />
        ) : (
          <TextInput
            value={serviceRoleKey}
            onChange={setServiceRoleKey}
            onSubmit={handleSubmit}
            placeholder="service_role secret"
          />
        )}
      </Box>
    </Box>
  );
};

export default APIKeyScreen;

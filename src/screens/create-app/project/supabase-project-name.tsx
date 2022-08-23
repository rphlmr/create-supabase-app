import React, { useCallback, useState } from "react";

import { Box, Text } from "ink";

import { PrOwl } from "@components/pr-owl";
import { TextInput } from "@components/text-input";
import type { CreateAppConfig } from "@config/frameworks";
import { useNavigation, useRouteParams } from "@router/router-context";

const SupabaseProjectNameScreen = () => {
  const { navigateTo } = useNavigation();
  const { projectName } = useRouteParams() as Pick<
    CreateAppConfig,
    "projectName"
  >;
  const [choice, setChoice] = useState("");

  const handleSubmit = useCallback(
    async (input: string) => {
      const supabaseProjectName = input || projectName;

      navigateTo("/create-app/project/db-password", { supabaseProjectName });
    },
    [navigateTo, projectName]
  );

  return (
    <Box justifyContent="center">
      <Box marginRight={8} justifyContent="center">
        <PrOwl>
          <Text bold>Choose a Supabase project name</Text>
          <Text italic color="gray">
            Press Enter to continue
          </Text>

          <Box flexDirection="column" alignItems="center" marginTop={1}>
            <Text>You choose</Text>
            <Text bold color="green">
              {choice || projectName}
            </Text>
          </Box>
        </PrOwl>
      </Box>

      <Box flexDirection="column" justifyContent="center">
        <TextInput
          value={choice}
          onChange={setChoice}
          onSubmit={handleSubmit}
          placeholder={projectName}
        />
      </Box>
    </Box>
  );
};

export default SupabaseProjectNameScreen;

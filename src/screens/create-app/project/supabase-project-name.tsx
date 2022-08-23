import React, { useCallback, useMemo, useState } from "react";

import { Box, Text } from "ink";

import { getDefaultProjectName } from "@utils/get-default-project-name";

import { PrOwl } from "@components/pr-owl";
import { TextInput } from "@components/text-input";
import type { CreateAppConfig } from "@config/frameworks";
import { useNavigation, useRouteParams } from "@router/router-context";

const SupabaseProjectNameScreen = () => {
  const { navigateTo } = useNavigation();
  const { projectDir } = useRouteParams() as Pick<
    CreateAppConfig,
    "projectDir"
  >;
  const [choice, setChoice] = useState("");
  const defaultProjectName = useMemo(
    () => getDefaultProjectName(projectDir),
    [projectDir]
  );

  const handleSubmit = useCallback(
    async (input: string) => {
      const supabaseProjectName = input || defaultProjectName;

      navigateTo("/create-app/project/db-password", { supabaseProjectName });
    },
    [navigateTo, defaultProjectName]
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
              {choice || defaultProjectName}
            </Text>
          </Box>
        </PrOwl>
      </Box>

      <Box flexDirection="column" justifyContent="center">
        <TextInput
          value={choice}
          onChange={setChoice}
          onSubmit={handleSubmit}
          placeholder={defaultProjectName}
        />
      </Box>
    </Box>
  );
};

export default SupabaseProjectNameScreen;

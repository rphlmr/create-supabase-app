import React, { useCallback, useState } from "react";

import { Box, Text } from "ink";
import TextInput from "ink-text-input";

import { PrOwl } from "@components/pr-owl";
import type { CreateAppDatas } from "@config/frameworks";
import { useNavigation, useRouteParams } from "@router/router-context";

const SupabaseProjectNameScreen = () => {
  const { navigateTo } = useNavigation();
  const { projectName } = useRouteParams() as Pick<
    CreateAppDatas,
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
      <Box
        marginRight={8}
        justifyContent="center"
      >
        <PrOwl>
          <Text bold>Choose a Supabase project name</Text>
          <Text
            italic
            color="gray"
          >
            Press Enter to continue
          </Text>

          <Box
            flexDirection="column"
            alignItems="center"
            marginTop={1}
          >
            <Text>You choose</Text>
            <Text
              bold
              color="green"
            >
              {choice || projectName}
            </Text>
          </Box>
        </PrOwl>
      </Box>

      <Box
        flexDirection="column"
        justifyContent="center"
      >
        <Box
          borderStyle="round"
          borderColor="white"
          paddingX={2}
          width={35}
        >
          <TextInput
            value={choice}
            onChange={setChoice}
            onSubmit={handleSubmit}
            placeholder={projectName}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default SupabaseProjectNameScreen;

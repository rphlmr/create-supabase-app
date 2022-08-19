import React, { useCallback, useState } from "react";

import { Box, Text } from "ink";
import TextInput from "ink-text-input";

import { checkNewProjectPath } from "@utils/check-new-project-path";

import { PrOwl } from "@components/pr-owl";
import { useNavigation } from "@router/router-context";

const defaultFolder = "./my-supabase-app";

const SelectProjectDirScreen = () => {
  const { navigateTo } = useNavigation();
  const [choice, setChoice] = useState("");
  const [isInvalidChoice, setIsInvalidChoice] = useState(false);

  const handleSubmit = useCallback(
    async (input: string) => {
      const projectDir = `${process.cwd()}/${input || defaultFolder}`;

      if (await checkNewProjectPath(projectDir))
        return navigateTo(`/create-app/select-organization`, { projectDir });

      setIsInvalidChoice(true);
    },
    [navigateTo]
  );

  const handleChange = useCallback(async (choice: string) => {
    setIsInvalidChoice(false);
    setChoice(choice);
  }, []);

  return (
    <Box justifyContent="center">
      <Box
        marginRight={8}
        justifyContent="center"
      >
        <PrOwl>
          <Text bold>Tell me where to create your app</Text>
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
              {choice || defaultFolder}
            </Text>
          </Box>

          {isInvalidChoice ? (
            <Box
              width={35}
              marginTop={1}
            >
              <Text color="red">The project directory must be empty</Text>
            </Box>
          ) : null}
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
            onChange={handleChange}
            onSubmit={handleSubmit}
            placeholder="./my-supabase-app"
          />
        </Box>
      </Box>
    </Box>
  );
};

export default SelectProjectDirScreen;

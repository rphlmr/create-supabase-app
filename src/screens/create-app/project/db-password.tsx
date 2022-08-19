import React, { useCallback, useMemo, useState } from "react";

import { Box, Text } from "ink";
import TextInput from "ink-text-input";

import { generatePassword } from "@api/supabase/project";

import { PrOwl } from "@components/pr-owl";
import { useNavigation } from "@router/router-context";

const DbPasswordScreen = () => {
  const { navigateTo } = useNavigation();
  const [choice, setChoice] = useState("");
  const defaultPassword = useMemo(() => generatePassword(), []);

  const handleSubmit = useCallback(
    async (input: string) => {
      const dbPassword = input || defaultPassword;

      navigateTo("/create-app/project/region", { dbPassword });
    },
    [defaultPassword, navigateTo]
  );

  return (
    <Box justifyContent="center">
      <Box
        marginRight={8}
        justifyContent="center"
      >
        <PrOwl>
          <Text bold>Choose a Supabase database password</Text>
          <Text>(20 chars min)</Text>
          <Text
            bold
            color="green"
          >
            I've generated one for you
          </Text>

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
              {choice || defaultPassword}
            </Text>
          </Box>
          <Box
            width={35}
            marginTop={1}
            flexDirection="column"
            alignItems="center"
          >
            <Text color="blue">
              Copy and save this password somewhere safe or you'll find it later
              in the project .env file
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
            placeholder={defaultPassword}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default DbPasswordScreen;

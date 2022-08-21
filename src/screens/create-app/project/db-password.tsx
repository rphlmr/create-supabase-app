import React, { useMemo } from "react";

import { Box, Text, useInput } from "ink";

import { generatePassword } from "@api/supabase/project";

import { PrOwl } from "@components/pr-owl";
import { useNavigation } from "@router/router-context";

const DbPasswordScreen = () => {
  const { navigateTo } = useNavigation();
  const dbPassword = useMemo(() => generatePassword(), []);

  useInput((_, key) => {
    if (key.return) {
      navigateTo("/create-app/project/region", { dbPassword });
    }
  });

  return (
    <Box justifyContent="center">
      <Box justifyContent="center">
        <PrOwl>
          <Text bold>Your Supabase database password</Text>
          <Text italic color="gray">
            Press Enter to continue
          </Text>
          <Box marginTop={1}>
            <Text bold color="blue">
              I've generated one for you
            </Text>
          </Box>
          <Box marginTop={1}>
            <Text bold color="green">
              {dbPassword}
            </Text>
          </Box>

          <Box
            width={35}
            marginTop={1}
            flexDirection="column"
            alignItems="center"
          >
            <Text color="blue">
              Copy and save this password somewhere safe. If you lose it, don't
              worry, you can generate a new one on your Supabase dashboard.
            </Text>
          </Box>
        </PrOwl>
      </Box>
    </Box>
  );
};

export default DbPasswordScreen;

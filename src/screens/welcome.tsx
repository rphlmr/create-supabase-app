import React from "react";

import { Box, Text, useInput } from "ink";

import { useNavigation } from "@router/router-context";

const WelcomeScreen = () => {
  const { navigateTo } = useNavigation();

  useInput((_, key) => {
    if (key.return) {
      navigateTo("/", {}, { replaceParams: true });
    }
  });

  return (
    <Box flexDirection="column" alignItems="center">
      <Text bold>Pick a starter project & start playing with Supabase!</Text>

      {/* on press, /auth */}
      <Box marginTop={1}>
        <Box borderStyle="round" borderColor="blue" paddingX={1}>
          <Text bold>Press Enter to continue</Text>
        </Box>
      </Box>
    </Box>
  );
};
export default WelcomeScreen;

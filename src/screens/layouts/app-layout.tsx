import React from "react";

import { Box, Text, useInput, Spacer, useApp } from "ink";
import BigText from "ink-big-text";
import Gradient from "ink-gradient";

import { useAuth } from "@auth/auth-context";
import { useNavigation } from "@router/router-context";

import packageJson from "../../../package.json";

const WindowButtons = () => {
  const app = useApp();
  const { saveAccessToken, accessToken } = useAuth();
  const { restart } = useNavigation();

  useInput((_, key) => {
    if (key.escape) app.exit();

    if (accessToken && key.meta && _ === "[1;2P") {
      saveAccessToken("");
      restart();
    }
  });

  return (
    <Box
      position="absolute"
      marginTop={-1}
      marginLeft={-1}
      alignSelf="flex-start"
    >
      <Box
        borderStyle="round"
        borderColor="red"
      >
        <Text>Exit (esc)</Text>
      </Box>
      <Spacer />
      {accessToken ? (
        <Box
          borderStyle="round"
          borderColor="cyan"
        >
          <Text>Logout (shift + F1)</Text>
        </Box>
      ) : null}
    </Box>
  );
};

const AppLayout = ({ children }: { children?: React.ReactNode }) => (
  <Box
    flexDirection="column"
    borderStyle="round"
    borderColor="gray"
    position="relative"
    alignItems="center"
  >
    <WindowButtons />
    <Box justifyContent="center">
      <Gradient colors={["#5E12CD", "#34B27B", "#5E12CD"]}>
        <BigText text="supabase" />
      </Gradient>
      <Box
        position="absolute"
        marginTop={8}
        flexDirection="column"
        alignItems="center"
      >
        {/* Hack Emoji */}
        <Box
          justifyContent="center"
          marginLeft={-2}
        >
          <Box marginRight={1}>
            <Text>👁</Text>
          </Box>
          <Box marginLeft={1}>
            <Text color="yellow">⚡️</Text>
          </Box>
          <Box marginLeft={-2}>
            <Text>👁</Text>
          </Box>
        </Box>

        <Box justifyContent="center">
          <Text>{`v${packageJson.version} `}</Text>
          <Text
            bold
            color="red"
          >
            Aplha
          </Text>
        </Box>
      </Box>
    </Box>

    <Box
      flexDirection="column"
      paddingX={1}
      paddingBottom={1}
      paddingTop={4}
      alignItems="center"
      width="100%"
      position="relative"
    >
      {children}
    </Box>
  </Box>
);

export default AppLayout;

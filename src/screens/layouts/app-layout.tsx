import React from "react";

import { Box, Text, useInput, Spacer, useApp } from "ink";
import BigText from "ink-big-text";

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
      <Box borderStyle="round" borderColor="red">
        <Text>Exit (esc)</Text>
      </Box>
      <Spacer />
      {accessToken ? (
        <Box borderStyle="round" borderColor="cyan">
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
    <Box alignItems="center" flexDirection="column" position="relative">
      <Text color="#34B27B">
        <BigText text="supabase" font="simple3d" />
      </Text>

      <Box
        flexDirection="column"
        alignItems="center"
        position="absolute"
        marginTop={9}
        paddingRight={2}
      >
        {/* Hack Emoji */}
        <Box justifyContent="center">
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
          <Text bold color="red">
            Aplha
          </Text>
        </Box>
      </Box>
    </Box>

    <Box
      flexDirection="column"
      paddingX={1}
      paddingBottom={1}
      paddingTop={5}
      alignItems="center"
      width="100%"
    >
      {children}
    </Box>
  </Box>
);

export default AppLayout;

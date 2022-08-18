import React from "react";

import { Box, Text } from "ink";
import BigText from "ink-big-text";
import Gradient from "ink-gradient";

import packageJson from "../../package.json";

const BaseLayout = ({ children }: { children?: React.ReactNode }) => (
  <Box
    flexDirection="column"
    borderStyle="round"
    borderColor="gray"
    position="relative"
  >
    <Box justifyContent="center">
      <Gradient colors={["#5E12CD", "#34B27B", "#5E12CD"]}>
        <BigText text="supabase" />
      </Gradient>
      <Box position="absolute" marginTop={8}>
        <Text>{`v${packageJson.version} `}</Text>
        <Text bold color="red">
          Beta
        </Text>
      </Box>
    </Box>

    <Box
      position="absolute"
      alignSelf="flex-start"
      borderStyle="round"
      borderColor="red"
      marginTop={-1}
      marginLeft={-1}
    >
      <Text>Exit (esc)</Text>
    </Box>

    <Box flexDirection="column" paddingX={1}>
      {children}
    </Box>
  </Box>
);

export default BaseLayout;

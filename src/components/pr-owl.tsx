import React from "react";

import { Box, Text } from "ink";
import Gradient from "ink-gradient";

const owl = `
  ___
 (o o)
(  V  )
/--m-m-
`;

export const Owl = () => (
  <Gradient name="retro">
    <Text>{owl}</Text>
  </Gradient>
);

export const PrOwl = ({ children }: { children: React.ReactNode }) => (
  <Box
    flexDirection="column"
    alignItems="center"
    paddingX={1}
    position="relative"
  >
    <Box
      borderStyle="classic"
      borderColor="#a86aa4"
      alignItems="center"
      flexDirection="column"
      paddingX={1}
    >
      <Box
        flexDirection="column"
        alignItems="center"
      >
        {children}
      </Box>
    </Box>
    <Box
      position="absolute"
      marginTop={-4}
    >
      <Owl />
    </Box>
  </Box>
);

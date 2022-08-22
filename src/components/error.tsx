import React from "react";

import { Box, Text } from "ink";

export const Error = ({ children }: { children: React.ReactNode }) => (
  <Box justifyContent="center" alignItems="center">
    <Text color="red" bold>
      {children}
    </Text>
  </Box>
);

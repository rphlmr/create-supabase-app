import React from "react";

import { Box } from "ink";

import { Spinner } from "./spinner";

export const Loading = ({ children }: { children: React.ReactNode }) => (
  <Box alignItems="center" flexDirection="column">
    <Spinner />

    <Box marginTop={1} alignItems="center" flexDirection="column">
      {children}
    </Box>
  </Box>
);

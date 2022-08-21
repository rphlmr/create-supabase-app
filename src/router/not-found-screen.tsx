import React from "react";

import { Box, Text } from "ink";
import BigText from "ink-big-text";
import Gradient from "ink-gradient";

import { useRoute } from "@router/router-context";

export const NotFoundScreen = () => {
  const { path } = useRoute();
  return (
    <Box flexDirection="column" alignItems="center">
      <Gradient name="vice">
        <BigText text="404" font="tiny" />
      </Gradient>

      <Text color="gray">Not found {path}</Text>
    </Box>
  );
};

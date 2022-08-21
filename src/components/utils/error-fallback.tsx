import React from "react";

import { Box, Newline, Text } from "ink";
import BigText from "ink-big-text";
import Gradient from "ink-gradient";

const ErrorFallback = ({ error }: { error: Error }) => (
  <Box
    flexDirection="column"
    alignItems="center"
    borderStyle="round"
    borderColor="red"
    position="relative"
  >
    <Gradient name="fruit">
      <BigText letterSpacing={5} text="Game Over" />
    </Gradient>

    <Text bold color="gray">
      Stay calm and complaint here :{" "}
      <Text bold color="blue">
        https://github.com/rphlmr/create-supabase-app
      </Text>
    </Text>

    <Newline />

    <Box flexDirection="column" alignItems="center">
      <Box borderColor="red" borderStyle="round" padding={1}>
        <Text bold color="red">
          {error.message}
        </Text>
      </Box>

      <Box padding={2}>
        <Text color="red">{error.stack}</Text>
      </Box>
    </Box>
  </Box>
);

export { ErrorFallback };

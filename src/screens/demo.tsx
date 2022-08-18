import React from "react";

import { Box, Text } from "ink";

import { useRoute } from "@router/router-context";

const Demo = () => {
  const { path, params } = useRoute();

  return (
    <Box
      flexDirection="column"
      flexGrow={2}
      alignItems="center"
      borderStyle="round"
      borderColor="gray"
      position="relative"
    >
      <Text>
        {path} {JSON.stringify(params)}
      </Text>
    </Box>
  );
};

export default Demo;

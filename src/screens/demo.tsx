import React from "react";

import { Box, Text } from "ink";

import { useRoute, useRouteParams } from "@router/router-context";

const Demo = () => {
  const { path } = useRoute();
  const params = useRouteParams() as { confirm: boolean };

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
        {path}, {JSON.stringify(params)}
      </Text>
    </Box>
  );
};

export default Demo;

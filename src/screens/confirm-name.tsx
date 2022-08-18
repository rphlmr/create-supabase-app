import React from "react";

import { Box, Text } from "ink";

import { ConfirmInput } from "@components/confirm-input";
import { useNavigation, useRoute } from "@router/router-context";

const ConfirmName = () => {
  const { path } = useRoute();

  const { navigateTo } = useNavigation();

  return (
    <Box
      flexDirection="column"
      flexGrow={2}
      alignItems="center"
      borderStyle="round"
      borderColor="gray"
      position="relative"
    >
      <Box flexDirection="column">
        <Text>{path}</Text>
        <Text>Navigate? (Y/n)</Text>
        <ConfirmInput
          isChecked
          onSubmit={() => {
            console.log("submit");
            navigateTo(
              "/new-project/name/confirm",
              {
                name: "from ConfirmName",
              },
              { replaceParams: true }
            );
          }}
        />
      </Box>
    </Box>
  );
};

export default ConfirmName;

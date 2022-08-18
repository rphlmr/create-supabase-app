import React from "react";

import { Box, Text } from "ink";
import Spinner from "ink-spinner";

import { ConfirmInput } from "@components/confirm-input";
import { useParentData } from "@components/outlet";
import { useNavigation, useRoute } from "@router/router-context";

const NewProject = () => {
  const { path, params } = useRoute();

  const { navigateTo } = useNavigation();
  const data = useParentData() as { isLoading: boolean };

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

        <Text>
          {data.isLoading ? (
            <>
              <Text color="blue">
                <Spinner type="dots" />{" "}
              </Text>
              Loading
            </>
          ) : (
            <>
              <Text color="green">✔︎ </Text>
              Done
            </>
          )}
        </Text>

        <Text>Navigate? (Y/n)</Text>
        <ConfirmInput
          isChecked
          onSubmit={(answer) => {
            console.log("submit", answer);
            navigateTo("/new-project/sname", { type: "Hello NewProject" });
          }}
        />
      </Box>
    </Box>
  );
};

export default NewProject;

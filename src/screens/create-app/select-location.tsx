import React, { useCallback, useState } from "react";

import { Box, Text } from "ink";
import TextInput from "ink-text-input";

import { PrOwl } from "@components/pr-owl";
import { useNavigation } from "@router/router-context";

const defaultLocation = "./my-supabase-app";

const SelectLocationScreen = () => {
  const { navigateTo } = useNavigation();
  const [choice, setChoice] = useState("");

  const handleSubmit = useCallback(
    (location: string) => {
      navigateTo(`/create-app/select-organization`, { location });
    },
    [navigateTo]
  );

  return (
    <Box justifyContent="center">
      <Box
        marginRight={8}
        justifyContent="center"
      >
        <PrOwl>
          <Text bold>Tell me where to create your app</Text>
          <Text
            italic
            color="gray"
          >
            Press Enter to continue
          </Text>

          <Box
            flexDirection="column"
            alignItems="center"
            marginTop={1}
          >
            <Text>You choose</Text>
            <Text
              bold
              color="green"
            >
              {choice || defaultLocation}
            </Text>
          </Box>
        </PrOwl>
      </Box>

      <Box
        flexDirection="column"
        justifyContent="center"
      >
        <Box
          borderStyle="round"
          borderColor="white"
          paddingX={2}
          width={35}
        >
          <TextInput
            value={choice}
            onChange={setChoice}
            onSubmit={handleSubmit}
            placeholder="./my-supabase-app"
          />
        </Box>
      </Box>
    </Box>
  );
};

export default SelectLocationScreen;

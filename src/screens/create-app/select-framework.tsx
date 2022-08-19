import React, { useCallback, useState } from "react";

import { Box, Text } from "ink";
import SelectInput from "ink-select-input";

import { PrOwl } from "@components/pr-owl";
import { Indicator } from "@components/select-input/indicator";
import { Option } from "@components/select-input/option";
import { availableFw, comingSoonFw } from "@config/frameworks";
import { useNavigation } from "@router/router-context";

const SelectFrameworkScreen = () => {
  const [choice, setChoice] = useState(availableFw[0]);
  const { navigateTo } = useNavigation();

  const handleSelect = useCallback(
    ({ value }: { value: string }) => {
      navigateTo(`/create-app/select-template`, { framework: value });
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
          <Text bold>Pick a framework</Text>
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
              {choice.label}
            </Text>
          </Box>
          <Box
            flexDirection="column"
            alignItems="center"
            marginTop={1}
            width={35}
          >
            <Text>Bookmark the documentation!</Text>
            <Text
              color="cyan"
              wrap="truncate-middle"
            >
              {choice.url}
            </Text>
          </Box>
        </PrOwl>
      </Box>

      <Box
        flexDirection="column"
        justifyContent="center"
      >
        <SelectInput
          items={availableFw}
          onSelect={handleSelect}
          itemComponent={Option}
          onHighlight={(item) => setChoice(item as typeof choice)}
          indicatorComponent={Indicator}
        />
        {comingSoonFw.map(({ label }) => (
          <Option
            label={`${label} (coming soon)`}
            key={label}
          />
        ))}
      </Box>
    </Box>
  );
};

export default SelectFrameworkScreen;

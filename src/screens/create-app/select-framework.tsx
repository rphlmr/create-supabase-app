import React, { useCallback, useState } from "react";

import figureSet from "figures";
import { Box, Text } from "ink";
import type { ItemProps } from "ink-select-input";
import SelectInput from "ink-select-input";

import { PrOwl } from "@components/pr-owl";
import { frameworks } from "@config/frameworks";
import { useNavigation, useRoute } from "@router/router-context";

const Option = ({ label, isSelected }: ItemProps & { disabled?: boolean }) => (
  <Box
    borderStyle="round"
    borderColor={isSelected ? "green" : "grey"}
    paddingX={1}
    justifyContent="center"
  >
    <Text bold={isSelected} color={isSelected ? "green" : "grey"}>
      {label}
    </Text>
  </Box>
);

const SelectFramework = () => {
  const [highlightedFw, setHighlightedFw] = useState(frameworks.available[0]);
  const { path } = useRoute();
  const { navigateTo } = useNavigation();

  const handleSelect = useCallback(
    (framework: { value: string }) => {
      navigateTo(`${path}/select-template`, { framework: framework.value });
    },
    [navigateTo, path]
  );

  return (
    <Box justifyContent="center">
      <Box flexDirection="column">
        <SelectInput
          items={frameworks.available}
          onSelect={handleSelect}
          itemComponent={Option}
          onHighlight={(item) => setHighlightedFw(item as typeof highlightedFw)}
          indicatorComponent={({ isSelected }) => (
            <Box alignItems="center" marginRight={1}>
              <Text color={isSelected ? "green" : "gray"}>
                {figureSet.pointer}
              </Text>
            </Box>
          )}
        />
        {frameworks.comingSoon.map(({ label }) => (
          <Option label={`${label} (coming soon)`} key={label} />
        ))}
      </Box>

      <Box marginLeft={10}>
        <PrOwl>
          <Text bold>Pick a framework</Text>

          <Box flexDirection="column" alignItems="center" marginTop={1}>
            <Text>
              You choose{" "}
              <Text bold color="green">
                {highlightedFw.label}
              </Text>
            </Text>
            <Text italic color="gray">
              Press Enter to continue
            </Text>
          </Box>
          <Box flexDirection="column" alignItems="center" marginTop={1}>
            <Text>Bookmark the documentation!</Text>
            <Text color="cyan"> {highlightedFw.url}</Text>
          </Box>
        </PrOwl>
      </Box>
    </Box>
  );
};

export default SelectFramework;

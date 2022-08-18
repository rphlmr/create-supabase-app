import React from "react";

import { Box, Text } from "ink";
import type { ItemProps } from "ink-select-input";

export const Option = ({
  label,
  isSelected,
}: ItemProps & { disabled?: boolean }) => (
  <Box
    borderStyle="round"
    borderColor={isSelected ? "green" : "grey"}
    paddingX={1}
    justifyContent="center"
  >
    <Text
      bold={isSelected}
      color={isSelected ? "green" : "grey"}
    >
      {label}
    </Text>
  </Box>
);

import React from "react";

import figures from "figures";
import { Box, Text } from "ink";

export const Indicator = ({ isSelected }: { isSelected?: boolean }) => (
  <Box alignItems="center" marginRight={1}>
    <Text color={isSelected ? "green" : "gray"}>{figures.pointer}</Text>
  </Box>
);

import React from "react";

import { Box } from "ink";
import InkTextInput from "ink-text-input";

export function TextInput(inputProps: Parameters<typeof InkTextInput>[0]) {
  return (
    <Box
      borderStyle="round"
      borderColor="white"
      paddingX={2}
      width={35}
    >
      <InkTextInput {...inputProps} />
    </Box>
  );
}

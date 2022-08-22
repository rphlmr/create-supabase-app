import React from "react";

import { Text } from "ink";
import InkSpinner from "ink-spinner";

export const Spinner = () => (
  <Text color="blue">
    <InkSpinner type="bouncingBall" />
  </Text>
);

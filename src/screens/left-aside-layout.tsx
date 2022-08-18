import React from "react";

import { Box, Text } from "ink";

import { Outlet } from "@components/outlet";

const LeftAsideLayout = ({ children }: { children?: React.ReactNode }) => (
  <Box justifyContent="space-between" flexGrow={1}>
    <Box
      flexDirection="column"
      borderStyle="round"
      borderColor="blue"
      flexGrow={1}
    >
      <Text>Left aside</Text>
    </Box>

    <Outlet data={{ anotherParentContext: "hello from LeftAsideLayout" }}>
      {children}
    </Outlet>
  </Box>
);

export default LeftAsideLayout;

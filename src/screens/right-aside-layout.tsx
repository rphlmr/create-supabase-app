import React, { useEffect, useState } from "react";

import { Box, Text } from "ink";
import Spinner from "ink-spinner";

import { Outlet } from "@components/outlet";

const RightAsideLayout = ({ children }: { children?: React.ReactNode }) => {
  const [data, setData] = useState({
    isLoading: true,
    content: "hellow from RightAsideLayout",
  });

  useEffect(() => {
    setTimeout(() => {
      setData((prev) => ({
        ...prev,
        isLoading: false,
      }));
    }, 2000);
  }, []);

  return (
    <Box justifyContent="space-between">
      <Outlet data={data}>{children}</Outlet>

      <Box
        flexDirection="column"
        borderStyle="round"
        borderColor="blue"
        flexGrow={1}
      >
        <Text>Right aside</Text>

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
        <Text>{data.content}</Text>
      </Box>
    </Box>
  );
};

export default RightAsideLayout;

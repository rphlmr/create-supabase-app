import React, { useEffect, useState } from "react";

import figures from "figures";
import { Box, Text, useApp } from "ink";

import { Error } from "@components/error";
import { Loading } from "@components/loading";
import { PrOwl } from "@components/pr-owl";
import type { CreateAppConfig } from "@config/frameworks";
import { initProject } from "@internal/init-project";
import { useRouteParams } from "@router/router-context";

const useRunProjectInit = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>();
  const config = useRouteParams() as CreateAppConfig;

  useEffect(() => {
    initProject(config)
      .catch((e) => {
        setError((e as Error).message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [config]);

  return { isLoading, error };
};

export default function RunProjectInit() {
  const { projectName, projectDir } = useRouteParams() as CreateAppConfig;
  const { isLoading, error } = useRunProjectInit();
  const { exit } = useApp();

  useEffect(() => {
    let id: NodeJS.Timeout;

    if (!isLoading) {
      id = setTimeout(() => exit(), 1_000);
    }

    return () => clearTimeout(id);
  }, [exit, isLoading]);

  if (isLoading) {
    return (
      <Loading>
        <Text>
          Preparing your Supabase project <Text bold>{projectName}</Text>
        </Text>
        <Text>
          It can take a few minutes to Supabase to finish initializing your
          database.
        </Text>
      </Loading>
    );
  }

  if (error) {
    return (
      <Error>
        <Text>{error}</Text>
      </Error>
    );
  }

  return (
    <Box alignItems="center" flexDirection="column">
      <PrOwl>
        <Box>
          <Text color="green" bold>
            That's all folks 🥳
          </Text>
        </Box>
        <Box marginTop={1}>
          <Text color="green" bold>
            {figures.tick} Your project {projectName} has been created
          </Text>
        </Box>
        <Box marginTop={1}>
          <Text>
            Now,{" "}
            <Text bold color="green">
              `cd`
            </Text>{" "}
            into "
            <Text bold color="green">
              {projectDir}
            </Text>
            "
          </Text>
        </Box>
        <Box marginTop={1}>
          <Text>
            Run{" "}
            <Text bold color="green">
              `npm install`
            </Text>{" "}
            & when it's done, run{" "}
            <Text bold color="green">
              `npm run dev`
            </Text>
          </Text>
        </Box>
        <Box marginTop={1}>
          <Text>
            Take a look at the{" "}
            <Text bold color="green">
              README
            </Text>
          </Text>
        </Box>
      </PrOwl>
    </Box>
  );
}

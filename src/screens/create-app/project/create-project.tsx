import React, { useEffect, useState } from "react";

import figures from "figures";
import { Box, Text } from "ink";
import Spinner from "ink-spinner";

import { createProject } from "@api/supabase/project";

import { useAuth } from "@auth/auth-context";
import { PrOwl } from "@components/pr-owl";
import type { CreateAppDatas } from "@config/frameworks";
import { useRouteParams } from "@router/router-context";

const useCreateProject = () => {
  const { accessToken } = useAuth();
  const { supabaseProjectName, dbPassword, organizationId, plan, region } =
    useRouteParams() as CreateAppDatas;
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>();

  useEffect(() => {
    const { abort, signal } = new AbortController();

    createProject(
      {
        name: supabaseProjectName,
        db_pass: dbPassword,
        organization_id: organizationId,
        plan,
        region,
      },
      { accessToken, signal }
    )
      .catch((e) => {
        setError((e as Error).message);
      })
      .finally(() => {
        setIsLoading(false);
      });

    return () => {
      abort();
    };
  }, [
    accessToken,
    dbPassword,
    organizationId,
    plan,
    region,
    supabaseProjectName,
  ]);

  return { isLoading, error };
};

const CreateProjectScreen = () => {
  const { projectName, projectDir } = useRouteParams() as CreateAppDatas;
  const { error, isLoading } = useCreateProject();

  // TODO: edit package.json with project name and anon key. Seed DB

  if (isLoading) {
    return (
      <Box justifyContent="center">
        <Text color="blue">
          <Spinner type="bouncingBar" />
          <Text>
            {" "}
            Creating your Supabase project <Text bold>{projectName}</Text>
          </Text>
        </Text>
      </Box>
    );
  }

  if (error) {
    return (
      <Box justifyContent="center">
        <Text
          color="red"
          bold
        >
          <Text>{error}</Text>
        </Text>
      </Box>
    );
  }

  return (
    <Box
      alignItems="center"
      flexDirection="column"
    >
      <PrOwl>
        <Box>
          <Text
            color="green"
            bold
          >
            {figures.tick} Your project {projectName} has been created
          </Text>
        </Box>
        <Box marginTop={1}>
          <Text color="blue">Your project is here : {projectDir}</Text>
        </Box>

        {/* TODO: close app when done */}
        <Box marginTop={1}>
          <Text>Press Esc to exit</Text>
        </Box>
      </PrOwl>
    </Box>
  );
};

export default CreateProjectScreen;

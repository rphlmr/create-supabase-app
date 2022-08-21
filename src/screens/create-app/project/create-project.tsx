import React, { useEffect, useState } from "react";

import { Box, Text } from "ink";
import Spinner from "ink-spinner";

import { createProject } from "@api/supabase/project";

import { useAuth } from "@auth/auth-context";
import type { CreateAppConfig } from "@config/frameworks";
import { useNavigation, useRouteParams } from "@router/router-context";

const useCreateProject = () => {
  const { accessToken } = useAuth();
  const { supabaseProjectName, dbPassword, organizationId, plan, region } =
    useRouteParams() as CreateAppConfig;
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>();
  const [projectId, setProjectId] = useState<string>();

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
      .then(({ id }) => setProjectId(id))
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

  return { isLoading, error, projectId };
};

const CreateProjectScreen = () => {
  const { navigateTo } = useNavigation();
  const { projectName, projectDir } = useRouteParams() as CreateAppConfig;
  const { error, isLoading, projectId } = useCreateProject();

  useEffect(() => {
    if (!isLoading && projectId) {
      navigateTo("/create-app/project/api-keys", { projectId });
    }
  }, [isLoading, navigateTo, projectDir, projectId]);

  if (isLoading) {
    return (
      <Box alignItems="center" flexDirection="column">
        <Box marginBottom={1}>
          <Text color="blue">
            <Spinner type="bouncingBar" />
          </Text>
        </Box>

        <Text>
          Creating your Supabase project <Text bold>{projectName}</Text>
        </Text>
      </Box>
    );
  }

  if (error) {
    return (
      <Box justifyContent="center">
        <Text color="red" bold>
          <Text>{error}</Text>
        </Text>
      </Box>
    );
  }

  return null;
};

export default CreateProjectScreen;

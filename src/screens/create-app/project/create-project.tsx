import React, { useEffect, useState } from "react";

import { Text } from "ink";

import { createProject } from "@api/supabase/project";

import { useAuth } from "@auth/auth-context";
import { Error } from "@components/error";
import { Loading } from "@components/loading";
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
      <Loading>
        <Text>
          Creating your Supabase project <Text bold>{projectName}</Text>
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

  return null;
};

export default CreateProjectScreen;

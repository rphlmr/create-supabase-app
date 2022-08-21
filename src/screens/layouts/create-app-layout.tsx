import React, { useEffect, useMemo, useState } from "react";

import figures from "figures";
import { Box, Text } from "ink";
import Spinner from "ink-spinner";

import { downloadAndExtractTarball } from "@api/github/download-and-extract-tarball";
import { extractRepoInfo } from "@api/github/extract-repo-info";

import type { CreateAppConfig } from "@config/frameworks";
import { getTemplate, getFrameworkName } from "@config/frameworks";
import { useRouteParams } from "@router/router-context";

const useFetchRepository = () => {
  const { template, framework, projectDir } = useRouteParams() as Pick<
    CreateAppConfig,
    "framework" | "template" | "projectDir"
  >;
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState<string>();

  useEffect(() => {
    let id: NodeJS.Timeout;

    if (template && framework && projectDir) {
      const fwName = getFrameworkName(framework);
      const { label: templateName, url } = getTemplate(framework, template);
      setIsLoading(true);
      setLoadingMessage(
        `I'm downloading ${fwName}'s template ${templateName} in the background`
      );

      downloadAndExtractTarball(projectDir, extractRepoInfo(url)).then(() => {
        setIsLoading(false);
        setLoadingMessage(`${fwName}'s template ${templateName} downloaded`);
        id = setTimeout(() => {
          setLoadingMessage(undefined);
        }, 5000);
      });
    }

    return () => {
      clearTimeout(id);
    };
  }, [framework, template, projectDir]);

  return useMemo(
    () => ({ isLoading, loadingMessage }),
    [isLoading, loadingMessage]
  );
};

const CreateAppLayout = ({ children }: { children?: React.ReactNode }) => {
  const { isLoading, loadingMessage } = useFetchRepository();

  return (
    <>
      {children}
      <Box justifyContent="center" marginTop={2}>
        {loadingMessage ? (
          <Text color="gray" dimColor>
            {isLoading ? <Spinner type="dots" /> : figures.tick}{" "}
            <Text>{loadingMessage}</Text>
          </Text>
        ) : null}
      </Box>
    </>
  );
};

export default CreateAppLayout;

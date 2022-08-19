import React, { useEffect, useState } from "react";

import figures from "figures";
import { Box, Text } from "ink";
import Spinner from "ink-spinner";

import { downloadAnExtractTarball } from "@utils/github/download-and-extract-tarball";
import { extractRepoInfo } from "@utils/github/extract-repo-info";

import type { CreateAppDatas } from "@config/frameworks";
import { getTemplate, getFrameworkName } from "@config/frameworks";
import { useRouteParams } from "@router/router-context";

const CreateAppLayout = ({ children }: { children?: React.ReactNode }) => {
  const { template, framework, projectDir } = useRouteParams() as Pick<
    CreateAppDatas,
    "framework" | "template" | "projectDir"
  >;
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState<string>();

  useEffect(() => {
    if (template && framework && projectDir) {
      const fwName = getFrameworkName(framework);
      const { label: templateName, url } = getTemplate(framework, template);
      setIsLoading(true);
      setLoadingMessage(
        `I'm downloading ${fwName}'s template ${templateName} in the background`
      );

      downloadAnExtractTarball(projectDir, extractRepoInfo(url)).then(() => {
        setIsLoading(false);
        setLoadingMessage(
          `${fwName}'s template ${templateName} downloading is done`
        );
      });
    }
  }, [framework, template, projectDir]);

  return (
    <>
      {children}
      <Box
        justifyContent="center"
        marginTop={2}
      >
        {loadingMessage ? (
          <Text
            color="gray"
            dimColor
          >
            {isLoading ? <Spinner type="dots" /> : figures.tick}{" "}
            <Text>{loadingMessage}</Text>
          </Text>
        ) : null}
      </Box>
    </>
  );
};

export default CreateAppLayout;

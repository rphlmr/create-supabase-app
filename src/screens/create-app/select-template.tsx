import React, { useCallback, useMemo, useState } from "react";

import { Box, Text } from "ink";
import SelectInput from "ink-select-input";

import { PrOwl } from "@components/pr-owl";
import { Indicator } from "@components/select-input/indicator";
import { Option } from "@components/select-input/option";
import type { CreateAppConfig } from "@config/frameworks";
import { getTemplates } from "@config/frameworks";
import { useNavigation, useRouteParams } from "@router/router-context";

const SelectTemplateScreen = () => {
  const { framework } = useRouteParams() as Pick<CreateAppConfig, "framework">;
  const { navigateTo } = useNavigation();
  const templates = useMemo(() => getTemplates(framework), [framework]);
  const [choice, setChoice] = useState(templates[0]);

  const handleSelect = useCallback(
    ({ value }: { value: string }) => {
      navigateTo(`/create-app/select-project-dir`, {
        template: value,
      });
    },
    [navigateTo]
  );

  return (
    <Box justifyContent="center">
      <Box marginRight={8} justifyContent="center">
        <PrOwl>
          <Text bold>Pick a template</Text>
          <Text italic color="gray">
            Press Enter to continue
          </Text>

          <Box flexDirection="column" alignItems="center" marginTop={1}>
            <Text>You choose</Text>
            <Text bold color="green">
              {choice.label}
            </Text>
          </Box>
          <Box
            flexDirection="column"
            alignItems="center"
            marginTop={1}
            width={35}
          >
            <Text color="blue">{choice.description}</Text>
          </Box>
        </PrOwl>
      </Box>

      <Box flexDirection="column" justifyContent="center">
        <SelectInput
          items={templates}
          onSelect={handleSelect}
          itemComponent={Option}
          onHighlight={(item) => setChoice(item as typeof choice)}
          indicatorComponent={Indicator}
        />
      </Box>
    </Box>
  );
};

export default SelectTemplateScreen;

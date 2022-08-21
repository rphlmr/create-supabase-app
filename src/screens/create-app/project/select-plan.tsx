import React, { useCallback, useState } from "react";

import { Box, Text } from "ink";
import SelectInput from "ink-select-input";

import { getPlans } from "@api/supabase/project";

import { PrOwl } from "@components/pr-owl";
import { Indicator } from "@components/select-input/indicator";
import { Option } from "@components/select-input/option";
import { useNavigation } from "@router/router-context";

const SelectPlanScreen = () => {
  const [choice, setChoice] = useState(getPlans()[0]);
  const { navigateTo } = useNavigation();

  const handleSelect = useCallback(
    ({ value }: { value: string }) => {
      navigateTo(`/create-app/project/create`, { plan: value });
    },
    [navigateTo]
  );

  return (
    <Box justifyContent="center">
      <Box marginRight={8} justifyContent="center">
        <PrOwl>
          <Text bold>Select a plan that suits your needs</Text>
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
            width={35}
            marginTop={1}
            flexDirection="column"
            alignItems="center"
          >
            <Text color="blue">
              See https://supabase.com/pricing for more details
            </Text>
          </Box>
        </PrOwl>
      </Box>

      <Box flexDirection="column" justifyContent="center" width={35}>
        <SelectInput
          items={getPlans()}
          onSelect={handleSelect}
          itemComponent={Option}
          onHighlight={(item) => setChoice(item as typeof choice)}
          indicatorComponent={Indicator}
          limit={3}
        />
      </Box>
    </Box>
  );
};

export default SelectPlanScreen;

import React, { useCallback, useState } from "react";

import { Box, Text } from "ink";
import SelectInput from "ink-select-input";

import { getRegions } from "@api/supabase/project";

import { PrOwl } from "@components/pr-owl";
import { Indicator } from "@components/select-input/indicator";
import { Option } from "@components/select-input/option";
import { useNavigation } from "@router/router-context";

const SelectRegionScreen = () => {
  const [choice, setChoice] = useState(getRegions()[0]);
  const { navigateTo } = useNavigation();

  const handleSelect = useCallback(
    ({ value }: { value: string }) => {
      navigateTo(`/create-app/project/plan`, { region: value });
    },
    [navigateTo]
  );

  return (
    <Box justifyContent="center">
      <Box
        marginRight={8}
        justifyContent="center"
      >
        <PrOwl>
          <Text bold>Tell me where to deploy your database</Text>
          <Text
            italic
            color="gray"
          >
            Press Enter to continue
          </Text>

          <Box
            flexDirection="column"
            alignItems="center"
            marginTop={1}
          >
            <Text>You choose</Text>
            <Text
              bold
              color="green"
            >
              {choice.label}
            </Text>
          </Box>
        </PrOwl>
      </Box>

      <Box
        flexDirection="column"
        justifyContent="center"
        width={35}
      >
        <SelectInput
          items={getRegions()}
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

export default SelectRegionScreen;

import React, { useCallback, useEffect, useMemo, useState } from "react";

import { Box, Text } from "ink";
import SelectInput from "ink-select-input";
import Spinner from "ink-spinner";

import { getOrganizations } from "@api/supabase/organizations";

import { createChoices } from "@utils/create-choices";
import { isEmpty } from "@utils/is-empty";

import { useAuth } from "@auth/auth-context";
import { PrOwl } from "@components/pr-owl";
import { Indicator } from "@components/select-input/indicator";
import { Option } from "@components/select-input/option";
import { useNavigation } from "@router/router-context";

const useFetchOrganizations = () => {
  const { accessToken } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>();
  const [hasOrganizations, setHasOrganizations] = useState(false);
  const [organizations, setOrganizations] = useState<
    Awaited<ReturnType<typeof getOrganizations>>
  >([]);

  useEffect(() => {
    const { abort, signal } = new AbortController();

    getOrganizations({ signal, accessToken })
      .then((result) => {
        setOrganizations(result);
        setHasOrganizations(!isEmpty(result));
      })
      .catch((e) => {
        setError((e as Error).message);
      })
      .finally(() => {
        setIsLoading(false);
      });

    return () => {
      abort();
    };
  }, [accessToken]);

  return { isLoading, error, organizations, hasOrganizations };
};

const SelectOrganizationScreen = () => {
  const { navigateTo } = useNavigation();
  const { organizations, hasOrganizations, error, isLoading } =
    useFetchOrganizations();
  const choices = useMemo(() => createChoices(organizations), [organizations]);
  const [choice, setChoice] = useState<typeof choices[number]>();

  useEffect(() => {
    if (!isLoading && !hasOrganizations)
      return navigateTo("/create-app/organization/create");
  }, [hasOrganizations, isLoading, navigateTo]);

  const handleSelect = useCallback(
    ({ value }: { value: string }) => {
      navigateTo(`/create-app/project`, { organizationId: value });
    },
    [navigateTo]
  );

  if (isLoading) {
    return (
      <Box justifyContent="center">
        <Text color="blue">
          <Spinner type="bouncingBar" />
          <Text bold> Loading your Supabase organizations</Text>
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
    <Box justifyContent="center">
      <Box
        marginRight={8}
        justifyContent="center"
      >
        <PrOwl>
          <Text bold>Pick an organization</Text>
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
              {(choice || choices[0])?.label}
            </Text>
          </Box>
        </PrOwl>
      </Box>

      <Box
        flexDirection="column"
        justifyContent="center"
      >
        <SelectInput
          items={choices}
          initialIndex={0}
          onSelect={handleSelect}
          itemComponent={Option}
          onHighlight={(item) => setChoice(item as typeof choices[number])}
          indicatorComponent={Indicator}
        />
      </Box>
    </Box>
  );
};

export default SelectOrganizationScreen;

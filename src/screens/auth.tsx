import React, { useEffect, useState } from "react";

import { Box, Text } from "ink";
import TextInput from "ink-text-input";

import { isToken } from "@auth/access-token";
import { useAuth } from "@auth/auth-context";
import { useNavigation } from "@router/router-context";

// TODO: maybe refactor that?
const AuthScreen = ({ successTo }: { successTo: string }) => {
  const { navigateTo } = useNavigation();
  const { saveAccessToken, isLoggedIn } = useAuth();
  const [userInput, setUserInput] = useState("");
  const [isSubmitOnError, setIsSubmitOnError] = useState(false);
  const isValidToken = isToken(userInput);

  useEffect(() => {
    if (isLoggedIn) navigateTo(successTo);
  }, [isLoggedIn, navigateTo, successTo]);

  const handleOnChange = (value: string) => {
    setIsSubmitOnError(false);
    setUserInput(value);
  };

  const handleSubmit = async (input: string) => {
    if (!isToken(input)) {
      setIsSubmitOnError(true);
      return;
    }

    saveAccessToken(input);
  };

  return (
    <Box flexDirection="column" alignItems="center">
      <Box
        marginTop={1}
        flexDirection="column"
        paddingX={2}
        alignItems="center"
      >
        {isSubmitOnError ? (
          <Text color="red" bold>
            ❌ Invalid access token format. Must be like `sbp_0102...1920`
          </Text>
        ) : isValidToken ? (
          <Text color="green" bold>
            ✅ Your access token is valid
          </Text>
        ) : (
          <Text color="white" bold>
            🔑 Enter your access token to continue
          </Text>
        )}
        <Box
          borderStyle="round"
          borderColor={
            isSubmitOnError ? "red" : isValidToken ? "green" : "white"
          }
          paddingX={2}
          width={51}
          justifyContent="center"
        >
          <TextInput
            value={userInput}
            onChange={handleOnChange}
            onSubmit={handleSubmit}
            placeholder="sbp_...."
          />
        </Box>
      </Box>

      <Box flexDirection="column" alignItems="center" marginTop={2}>
        <Text color="yellow">You can generate an access token here</Text>
        <Text>👇</Text>
        <Text color="cyan">https://app.supabase.io/account/tokens</Text>
      </Box>
    </Box>
  );
};

export default AuthScreen;

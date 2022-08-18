/**
 * A naive implementation of a router that can be used to render screens.
 * Inspired by https://reactrouter.com/
 * Maybe this should be a separate package?
 * Maybe not
 * Maybe it'll just not work
 * This are Copilot's thoughts ... 😂
 */

import React, {
  createContext,
  createElement,
  Fragment,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { isToken, loadAccessToken, persistAccessToken } from "./access-token";

const AuthContext = createContext<
  | {
      accessToken?: string | null;
      saveAccessToken: (
        accessToken: string
      ) => ReturnType<typeof persistAccessToken>;
      isLoggedIn: boolean;
    }
  | undefined
>(undefined);

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [accessToken, setAccessToken] = useState<string>();

  useEffect(() => {
    loadAccessToken().then((token) => {
      if (isToken(token)) {
        setAccessToken(token);
      }
    });
  }, []);

  const saveAccessToken = useCallback(async (accessToken: string) => {
    await persistAccessToken(accessToken);

    setAccessToken(isToken(accessToken) ? accessToken : undefined);
  }, []);

  const value = useMemo(
    () => ({
      accessToken,
      saveAccessToken,
      isLoggedIn: isToken(accessToken),
    }),
    [accessToken, saveAccessToken]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }

  return context;
}

export { AuthProvider, useAuth };

import { useState } from "react";
import { useUserSession } from "../User/UserSessionState";
import { createLoginAPI, LoginAPIException } from "./LoginAPI";

export type LoginError = 'Invalid credentials' | 'Network error' | 'Generic error';
export type LoginState = {
  isLoggingIn: boolean;
  loginError: LoginError | undefined;
  login(username: string | undefined, password: string | undefined): void;
};

const loginAPI = createLoginAPI();

export function useLoginState({ login } = loginAPI): LoginState {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<LoginError | undefined>();
  const { retrieving, setUserSession } = useUserSession();
  const isLoadingOrRetrieving = isLoading || retrieving;

  return {
    isLoggingIn: isLoadingOrRetrieving,
    loginError: error,
    login(username: string | undefined, password: string | undefined): void {
      if (isLoadingOrRetrieving) return;
      if (!username || !password) {
        setError("Invalid credentials");
        return;
      }
      setError(undefined);
      setIsLoading(true);

      login(username, password)
        .then(setUserSession)
        .catch(e => setError(errorMessageFrom(e)))
        .finally(() => setIsLoading(false));
    }
  }
}

function errorMessageFrom(e: LoginAPIException): LoginError {
  switch (e) {
    case "INVALID_CREDENTIALS":
      return "Invalid credentials";
    case "NETWORK_ERROR":
      return "Network error";
    default:
      return "Generic error";
  }
}

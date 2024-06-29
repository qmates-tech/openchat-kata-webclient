import { useEffect, useMemo, useState } from "react";
import { Env } from "../Env";
import { LoginAPIException, createLoginAPI } from "./LoginAPI";
import { User } from "../User/User";
import { useUserSession } from "../User/UserSession";

export type LoginError = 'Invalid credentials' | 'Network error' | 'Generic error'
export type LoginState = {
  isLoggingIn: boolean;
  loggedUser: User | undefined;
  loginError: LoginError | undefined;
  logout(): void;
  login(username: string | undefined, password: string | undefined): void;
};
export function useLoginState(): LoginState {
  const { login } = useMemo(() => createLoginAPI(Env.loginUrl), [])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<LoginError | undefined>()
  const { currentUser, setUserSession } = useUserSession()

  return {
    isLoggingIn: isLoading,
    loggedUser: currentUser,
    loginError: error,
    login(username: string | undefined, password: string | undefined): void {
      if (isLoading || currentUser) return
      if (!username || !password) {
        setError("Invalid credentials")
        return
      }
      setError(undefined)
      setIsLoading(true)

      login(username, password)
        .then(setUserSession)
        .catch(e => setError(errorMessageFrom(e)))
        .finally(() => setIsLoading(false))
    },
    logout() {
      setUserSession(undefined)
    }
  }
}

function errorMessageFrom(e: LoginAPIException): LoginError {
  switch (e) {
    case "INVALID_CREDENTIALS":
      return "Invalid credentials"
    case "NETWORK_ERROR":
      return "Network error"
    default:
      return "Generic error"
  }
}
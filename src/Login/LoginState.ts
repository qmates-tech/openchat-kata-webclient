import { useMemo, useState } from "react";
import { Env } from "../Env";
import { User } from "../User";
import { LoginAPIException, createLoginAPI } from "./LoginAPI";

type LoginError = 'Invalid credentials' | 'Network error' | 'Generic error'
export type LoginState = {
  isLoggingIn: boolean;
  loggedUser: User | undefined;
  loginError: LoginError | undefined;
  login(username: string | undefined, password: string | undefined): void;
};
export function useLoginState(): LoginState {
  const { login } = useMemo(() => createLoginAPI(Env.loginUrl), [])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<LoginError | undefined>()
  const [user, setUser] = useState<User | undefined>()

  return {
    isLoggingIn: isLoading,
    loggedUser: user,
    loginError: error,
    login(username: string | undefined, password: string | undefined): void {
      if(isLoading || user) return
      setIsLoading(true)
      if (!username || !password) {
        setError("Invalid credentials")
        return
      }
      setError(undefined)

      login(username, password)
        .then(setUser)
        .catch(e => setError(errorMessageFrom(e)))
        .finally(() => setIsLoading(false))
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
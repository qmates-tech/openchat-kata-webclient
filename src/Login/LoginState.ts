import { useEffect, useMemo, useState } from "react";
import { Env } from "../Env";
import { User } from "../User";
import { LoginAPIException, createLoginAPI } from "./LoginAPI";

type LoginError = 'Invalid credentials' | 'Network error' | 'Generic error'
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
  const [user, setUser] = useState<User | undefined>()

  useEffect(() => {
    const session = localStorage.getItem("openChatSession") as string
    session && setUser(JSON.parse(session))
  }, [])

  return {
    isLoggingIn: isLoading,
    loggedUser: user,
    loginError: error,
    login(username: string | undefined, password: string | undefined): void {
      if(isLoading || user) return
      if (!username || !password) {
        setError("Invalid credentials")
        return
      }
      setError(undefined)
      setIsLoading(true)

      login(username, password)
        .then((user) => {
          setUser(user)
          localStorage.setItem("openChatSession", JSON.stringify(user))
        })
        .catch(e => setError(errorMessageFrom(e)))
        .finally(() => setIsLoading(false))
    },
    logout() {
      setUser(undefined)
      localStorage.removeItem("openChatSession")
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
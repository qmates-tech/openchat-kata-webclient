import { useEffect, useState } from "react";
import { User } from "./User";

export type UserSession = {
  currentUser: User | undefined;
  retrieving: boolean;
  setUserSession(user: User | undefined): void;
};
export function useUserSession(): UserSession {
  const sessionName = "openChatSession"
  const [user, setUser] = useState<User | undefined>()
  const [retrieving, setRetrieving] = useState<boolean>(true)

  useEffect(() => {
    const session = localStorage.getItem(sessionName) as string
    session && setUser(JSON.parse(session))
    setRetrieving(false)
  }, [])

  return {
    currentUser: user,
    retrieving,
    setUserSession: (user: User | undefined) => {
      setUser(user)
      if (user) {
        localStorage.setItem(sessionName, JSON.stringify(user))
      } else {
        localStorage.removeItem(sessionName)
      }
    }
  }
}

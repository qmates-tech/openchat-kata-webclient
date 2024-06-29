import { useEffect, useState } from "react";
import { User } from "./User";

export type UserSession = {
  currentUser: User | undefined;
  setUserSession(user: User | undefined): void;
};
export function useUserSession(): UserSession {
  const sessionName = "openChatSession"
  const [user, setUser] = useState<User | undefined>()

  useEffect(() => {
    const session = localStorage.getItem(sessionName) as string
    session && setUser(JSON.parse(session))
  }, [])

  return {
    currentUser: user,
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

import { useEffect, useState } from "react";
import { User } from "./User";

const globalUserState = {
  currentUser: undefined as User | undefined,
  retrieving: true
}

export type UserSession = {
  currentUser: User | undefined;
  retrieving: boolean;
  setUserSession(user: User | undefined): void;
};
export function useUserSession(): UserSession {
  const sessionName = "openChatSession"
  const [user, setUser] = useState<User | undefined>(globalUserState.currentUser)
  const [retrieving, setRetrieving] = useState<boolean>(globalUserState.retrieving)

  useEffect(() => {
    if (globalUserState.currentUser === undefined) {
      const session = localStorage.getItem(sessionName)
      session && setGlobalUserInfo(JSON.parse(session))
      setGlobalUserStatus(false)
    }
  }, [])

  return {
    currentUser: user,
    retrieving,
    setUserSession: (user: User | undefined) => {
      setGlobalUserInfo(user)
      if (user) {
        localStorage.setItem(sessionName, JSON.stringify(user))
      } else {
        localStorage.removeItem(sessionName)
      }
    }
  }

  function setGlobalUserInfo(user: User | undefined) {
    setUser(user)
    globalUserState.currentUser = user
  }

  function setGlobalUserStatus(retrieving: boolean) {
    setRetrieving(retrieving)
    globalUserState.retrieving = retrieving
  }
}

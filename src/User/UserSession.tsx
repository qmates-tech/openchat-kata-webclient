import { createContext, useContext, useEffect, useState } from "react";
import { User } from "./User";

export type UserSession = {
  currentUser: User | undefined;
  setUserSession(user: User | undefined): void;
};

const UserSessionContext = createContext<UserSession>({
  currentUser: undefined,
  setUserSession: () => { }
});

export function useUserSession() {
  return useContext(UserSessionContext)
}

export function UserSessionProvider({ children }: { children: React.ReactNode }): React.ReactElement {
  const sessionName = "openChatSession"
  const [currentUser, setUser] = useState<User | undefined>()

  useEffect(() => {
    const session = localStorage.getItem(sessionName) as string
    session && setUser(JSON.parse(session))
  }, [])

  const setUserSession = (user: User | undefined) => {
    setUser(user)
    if (user) {
      localStorage.setItem(sessionName, JSON.stringify(user))
    } else {
      localStorage.removeItem(sessionName)
    }
  }

  return (
    <UserSessionContext.Provider value={{ currentUser, setUserSession }}>
      {children}
    </UserSessionContext.Provider>
  );
}
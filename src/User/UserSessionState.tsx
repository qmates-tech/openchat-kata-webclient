import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { User } from "./User";

const sessionName = "openChatSession";

export type UserSession = {
  currentUser: User | undefined;
  retrieving: boolean;
  removeUserSession(): void;
  setUserSession(user: User): void;
};
const UserSessionContext = createContext<UserSession | undefined>(undefined);

export const useUserSession = () => {
  const context = useContext(UserSessionContext);
  if (context === undefined) {
    throw new Error('useUserSession must be used within a UserSessionProvider');
  }
  return context;
};

export function UserSessionProvider({ children }: { children: ReactNode }): ReactNode {
  const [currentUser, setCurrentUser] = useState<User | undefined>();
  const [retrieving, setRetrieving] = useState<boolean>(true);

  useEffect(() => {
    const session = localStorage.getItem(sessionName);
    session && setCurrentUser(JSON.parse(session));
    setRetrieving(false);
  }, []);

  const userSession: UserSession = {
    currentUser,
    retrieving,
    removeUserSession: () => {
      setCurrentUser(undefined);
      localStorage.removeItem(sessionName);
    },
    setUserSession: (user: User) => {
      setCurrentUser(user);
      localStorage.setItem(sessionName, JSON.stringify(user));
    }
  }

  return (
    <UserSessionContext.Provider value={userSession}>
      {children}
    </UserSessionContext.Provider>
  );
}

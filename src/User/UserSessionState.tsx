import { ReactNode, useEffect, useState } from "react";
import { User } from "./User";
import { createContext, useContext } from "react";

const sessionName = "openChatSession";

export type UserSession = {
  currentUser: User | undefined;
  retrieving: boolean;
  setUserSession(user: User | undefined): void;
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
    setUserSession: (user: User | undefined) => {
      setCurrentUser(user);
      if (user) {
        localStorage.setItem(sessionName, JSON.stringify(user));
      } else {
        localStorage.removeItem(sessionName);
      }
    }
  }

  return (
    <UserSessionContext.Provider value={userSession}>
      {children}
    </UserSessionContext.Provider>
  );
}

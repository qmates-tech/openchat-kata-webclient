import { User } from "../User/User";
import { useUserSession } from "../User/UserSessionState";

export type LogoutState = {
  retrieving: boolean;
  currentUser: User | undefined;
  logout: () => void;
};
export function useLogoutState(): LogoutState {
  const { retrieving, currentUser, setUserSession } = useUserSession()

  return {
    retrieving,
    currentUser,
    logout() {
      setUserSession(undefined)
    },
  }
}

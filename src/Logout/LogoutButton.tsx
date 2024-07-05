import { NavigateTo } from "../Navigation/NavigateTo";
import { useNavigationState } from "../Navigation/NavigationState";
import { useLogoutState } from "./LogoutState";

export function LogoutButton() {
  const { retrieving, currentUser, logout } = useLogoutState();
  const { isLoginRoute } = useNavigationState();

  if (!currentUser && !retrieving && !isLoginRoute) {
    return <NavigateTo to="login" />
  }

  if (retrieving || isLoginRoute) {
    return <></>
  }

  return (
    <button type="button" onClick={logout}>Logout</button>
  );
}

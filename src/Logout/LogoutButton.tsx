import { useLoginState } from "../Login/LoginState";
import { NavigateTo } from "../Navigation/NavigateTo";

export function LogoutButton() {
  const { loggedUser, isLoggingIn, logout } = useLoginState();

  if (!loggedUser && !isLoggingIn) {
    return <NavigateTo to="login" />
  }

  return (
    <button type="button" onClick={logout}>Logout</button>
  );
}

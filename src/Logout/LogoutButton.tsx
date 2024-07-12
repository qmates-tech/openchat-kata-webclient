import { useLogoutState } from "./LogoutState";

export function LogoutButton() {
  const { retrieving, currentUser, logout } = useLogoutState();

  if (!currentUser || retrieving) {
    return <></>
  }

  return (
    <button type="button" onClick={logout}>Logout</button>
  );
}

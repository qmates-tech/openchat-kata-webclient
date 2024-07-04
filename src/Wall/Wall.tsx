import { LogoutButton } from '../Logout/LogoutButton';
import { useUserSession } from '../User/UserSession';

export function Wall() {
  const { currentUser } = useUserSession()

  return (
    <article className="wall">
      <header><h3>{currentUser?.username}'s wall</h3></header>
      <LogoutButton />
    </article>
  );
}

import { useUserSession } from '../User/UserSessionState';

export function Wall() {
  const { currentUser } = useUserSession();

  return (
    <article className="wall">
      <header><h3>{currentUser?.username}'s wall</h3></header>
    </article>
  );
}

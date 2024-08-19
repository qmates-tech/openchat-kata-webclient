import { useUserSession } from '../User/UserSessionState';

export function WallPage() {
  const { currentUser } = useUserSession();
  const about = currentUser?.about
      .split('\n')
      .map((paragraph, index) => <p key={index}>{paragraph}</p>);

  return (
    <article className="wall">
      <header><h3>{currentUser?.username}'s wall</h3></header>
      <div>{about}</div>
    </article>
  );
}

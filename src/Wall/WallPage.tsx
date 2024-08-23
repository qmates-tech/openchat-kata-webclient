import { useUserSession } from '../User/UserSessionState';
import './Wall.css';

export function WallPage() {
  const { currentUser } = useUserSession();
  const about = currentUser?.about
      .split('\n')
      .map((paragraph, index) => <p key={index}>{paragraph}</p>);

  return (
    <article className="wall">
      <header>
        <h3>{currentUser?.username}'s wall</h3>
        <small>{about}</small>
      </header>
    </article>
  );
}

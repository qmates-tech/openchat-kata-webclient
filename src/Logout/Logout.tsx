import { User } from "../User/User";


export type LogoutProps = {
  user: User;
  onLogoutClick: () => void;
}
export function Logout({ user, onLogoutClick }: LogoutProps) {
  return (
    <article>
      <h2>Hi {user.username}!</h2>
      <footer>
        <button type="button" onClick={onLogoutClick}>Logout</button>
      </footer>
    </article>
  );
}

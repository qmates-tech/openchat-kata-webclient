import { LogoutButton } from '../Logout/LogoutButton';
import './Navigation.css';

export function Navigation() {
  return (
    <nav className="container">
      <ul>
        <li>OpenChat</li>
      </ul>
      <ul>
        <li><LogoutButton /></li>
      </ul>
    </nav>
  );
}

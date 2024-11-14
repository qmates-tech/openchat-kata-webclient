import { LogoutButton } from '../Logout/LogoutButton';
import './Navigation.css';
import {LinkTo} from "./LinkTo.tsx";

export function Navigation() {
  return (
    <nav className="container">
      <ul>
        <li>OpenChat</li>
      </ul>
      <ul>
          <li><LinkTo to={"wall"}>Your Wall</LinkTo></li>
          <li><LinkTo to={"timeline"}>Your Posts</LinkTo></li>
        <li><LogoutButton /></li>
      </ul>
    </nav>
  );
}

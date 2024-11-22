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
          <li><LinkTo to={"wall"}>Wall</LinkTo></li>
          <li><LinkTo to={"timeline"}>Timeline</LinkTo></li>
        <li><LogoutButton /></li>
      </ul>
    </nav>
  );
}

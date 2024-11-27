import { LogoutButton } from '../Logout/LogoutButton';
import { LinkTo } from "./LinkTo.tsx";
import './Navigation.css';

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

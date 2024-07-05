import { Link } from 'react-router-dom';
import { LogoutButton } from '../Logout/LogoutButton';
import './Navigation.css';

export function Navigation() {
  return (
    <nav className="container">
      <ul>
        <li>OpenChat</li>
      </ul>
      <ul>
        <li><Link to="/" className="contrast">Wall</Link></li>
        <li><LogoutButton /></li>
      </ul>
    </nav>
  );
}

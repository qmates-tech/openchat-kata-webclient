import { Link } from 'react-router-dom';
import { LogoutButton } from '../Logout/LogoutButton';
import { useNavigationState } from './NavigationState';

export function Navigation() {
  const { isLoginRoute } = useNavigationState();

  return (
    <nav className="container">
      <ul>
        <li>OpenChat</li>
      </ul>
      <ul>
        <li><Link to="/" className="contrast">Wall</Link></li>
        {!isLoginRoute && <li><LogoutButton /></li>}
      </ul>
    </nav>
  );
}

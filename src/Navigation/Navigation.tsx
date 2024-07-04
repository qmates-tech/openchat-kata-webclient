import { Link } from 'react-router-dom';

export function Navigation() {
  return (
    <nav className="container">
      <ul>
        <li>OpenChat</li>
      </ul>
      <ul>
        <li><Link to="/login" className="contrast">Login</Link></li>
      </ul>
    </nav>
  );
}

import { Link } from 'react-router-dom';
import './Header.css';

export function Header() {
  return (
    <header className='top-bar'>
      <nav className="container">
        <ul>
          <li>OpenChat</li>
        </ul>
        <ul>
          <li><Link to="/login" className="contrast">Login</Link></li>
        </ul>
      </nav>
    </header>
  );
}

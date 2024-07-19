import { Link } from 'react-router-dom';
import { NavigateTo } from '../Navigation/NavigateTo';
import './Login.css';
import { LoginForm } from "./LoginForm";
import { useLoginState } from "./LoginState";

export function LoginPage() {
  const loginState = useLoginState();

  if (loginState.loggedUser) {
    return <NavigateTo to="wall" />;
  }

  return (
    <article className="login">
      <header>
        <h3>Welcome to OpenChat</h3>
        <Link className="registration-link" to="/register">Sign Up</Link>
      </header>
      <LoginForm {...loginState} />
    </article>
  );
}

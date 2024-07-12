import './Login.css';
import { useLoginState } from "./LoginState";
import { LoginForm } from "./LoginForm";
import { NavigateTo } from '../Navigation/NavigateTo';

export function LoginPage() {
  const loginState = useLoginState();

  if (loginState.loggedUser) {
    return <NavigateTo to="wall" />;
  }

  return (
    <article className="login">
      <header><h3>Welcome to OpenChat</h3></header>
      <LoginForm {...loginState} />
    </article>
  );
}

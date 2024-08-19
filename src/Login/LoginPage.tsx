import { LinkTo } from '../Navigation/LinkTo';
import './Login.css';
import { LoginForm } from "./LoginForm";
import { useLoginState } from "./LoginState.ts";

export function LoginPage() {
  return (
    <article className="login">
      <header>
        <h3>Welcome to OpenChat</h3>
        <LinkTo className="link" to="registration">Register</LinkTo>
      </header>
      <LoginForm {...useLoginState()} />
    </article>
  );
}

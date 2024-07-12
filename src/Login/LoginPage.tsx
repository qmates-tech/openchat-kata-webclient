import './Login.css';
import { useLoginState } from "./LoginState";
import { LoginForm } from "./LoginForm";

export function LoginPage() {
  const loginState = useLoginState();

  return (
    <article className="login">
      <header><h3>Welcome to OpenChat</h3></header>
      <LoginForm {...loginState} />
    </article>
  );
}

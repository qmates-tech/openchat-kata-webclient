import { LinkTo } from '../Navigation/LinkTo';
import { NavigateTo } from '../Navigation/NavigateTo';
import { useUserSession } from '../User/UserSessionState';
import './Login.css';
import { LoginForm } from "./LoginForm";

export function LoginPage() {
  const { currentUser } = useUserSession();

  if (currentUser) {
    return <NavigateTo to="wall" />;
  }

  return (
    <article className="login">
      <header>
        <h3>Welcome to OpenChat</h3>
        <LinkTo className="link" to="registration">Register</LinkTo>
      </header>
      <LoginForm />
    </article>
  );
}

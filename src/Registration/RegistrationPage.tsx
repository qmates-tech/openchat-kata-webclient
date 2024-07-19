import { LinkTo } from '../Navigation/LinkTo';
import { NavigateTo } from '../Navigation/NavigateTo';
import { useUserSession } from '../User/UserSessionState';
import { RegistrationForm } from './RegistrationForm';

export function RegistrationPage() {
  const { currentUser } = useUserSession();

  if (currentUser) {
    return <NavigateTo to="wall" />;
  }

  return (
    <article className="registration">
      <header>
        <h3>Register now</h3>
        <LinkTo className="link" to="login">Login</LinkTo>
      </header>
      <RegistrationForm />
    </article>
  );
}

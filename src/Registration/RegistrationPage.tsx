import { LinkTo } from '../Navigation/LinkTo';
import { RegistrationForm } from './RegistrationForm';
import { useRegistrationState } from './RegistrationState';

export function RegistrationPage() {
  return (
    <article className="registration">
      <header>
        <h3>Register now</h3>
        <LinkTo className="link" to="login">Login</LinkTo>
      </header>
      <RegistrationForm {...useRegistrationState()} />
    </article>
  );
}

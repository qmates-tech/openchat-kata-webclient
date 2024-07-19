import { NavigateTo } from '../Navigation/NavigateTo';
import { useUserSession } from '../User/UserSessionState';

export function RegistrationPage() {
  const { currentUser } = useUserSession();

  if (currentUser) {
    return <NavigateTo to="wall" />;
  }

  return (
    <article className="registration">
      <header><h3>Register now</h3></header>
    </article>
  );
}

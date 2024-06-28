import { useRef } from "react";
import { useLoginState } from "./LoginState";

export function Login() {
  const { login, logout, isLoggingIn, loggedUser, loginError } = useLoginState()
  const usernameRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

  if (loggedUser) {
    return (
      <article>
        <h2>Hi {loggedUser.username}!</h2>
        <footer>
          <button type="button" onClick={logout}>Logout</button>
        </footer>
      </article>
    );
  }

  return (
    <article className="login">
      <h2>Welcome to OpenChat</h2>
      <div>
        <input ref={usernameRef} disabled={isLoggingIn} placeholder="username" />
      </div>
      <div>
        <input ref={passwordRef} disabled={isLoggingIn} placeholder="password" type="password" />
      </div>
      <footer>
        <button type="button" aria-busy={isLoggingIn} disabled={isLoggingIn} onClick={clickLogin}>Login</button>
        {loginError && <div className="error">{loginError}</div>}
      </footer>
    </article>
  );

  function clickLogin() {
    login(usernameRef.current?.value, passwordRef.current?.value)
  }
}

import { useEffect, useRef, useState } from "react";
import { LoginError, useLoginState } from "./LoginState";


export function Login() {
  const { login, logout, isLoggingIn, loggedUser, loginError } = useLoginState()
  const [errorToShow, setErrorToShow] = useState<LoginError | undefined>(undefined)
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

  useEffect(() => loginError && setErrorToShow(loginError), [loginError])
  const hideError = () => setErrorToShow(undefined)

  return (
    <article className="login">
      <h2>Welcome to OpenChat</h2>
      <div>
        <input ref={usernameRef} disabled={isLoggingIn} placeholder="username" onFocus={hideError} />
      </div>
      <div>
        <input ref={passwordRef} disabled={isLoggingIn} placeholder="password" type="password" onFocus={hideError} />
      </div>
      <footer>
        <button type="button" aria-busy={isLoggingIn} disabled={isLoggingIn} onClick={clickLogin}>Login</button>
        {errorToShow && <div className="error">{errorToShow}</div>}
      </footer>
    </article>
  );

  function clickLogin() {
    login(usernameRef.current?.value, passwordRef.current?.value)
  }
}

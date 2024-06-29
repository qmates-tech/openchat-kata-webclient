import { useEffect, useRef, useState } from "react";
import { LoginError, useLoginState } from "./LoginState";
import { Logout } from "../Logout/Logout";


export function Login() {
  const { login, logout, isLoggingIn, loggedUser, loginError } = useLoginState()
  const [errorToShow, setErrorToShow] = useState<LoginError | undefined>(undefined)
  const usernameRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

  useEffect(() => loginError && setErrorToShow(loginError), [loginError])

  if (loggedUser) {
    return <Logout user={loggedUser} onLogoutClick={logout} />
  }

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
        <button type="button" disabled={isLoggingIn} aria-busy={isLoggingIn} onClick={performLogin}>Login</button>
        {errorToShow && <div className="error">{errorToShow}</div>}
      </footer>
    </article>
  );

  function hideError() {
    setErrorToShow(undefined)
  }

  function performLogin() {
    login(usernameRef.current?.value, passwordRef.current?.value)
  }
}

import { KeyboardEvent, useEffect, useRef, useState } from "react";
import { Logout } from "../Logout/Logout";
import { LoginError, useLoginState } from "./LoginState";


export function Login() {
  const { login, logout, isLoggingIn, loggedUser, loginError } = useLoginState()
  const [errorToShow, setErrorToShow] = useState<LoginError | undefined>(undefined)
  const usernameRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

  useEffect(watchLoggedUser, [loggedUser])
  useEffect(watchLoginError, [loginError])

  if (loggedUser) {
    return <Logout user={loggedUser} onLogoutClick={logout} />
  }
  return (
    <article className="login">
      <h2>Welcome to OpenChat</h2>
      <div>
        <input ref={usernameRef} placeholder="username" disabled={isLoggingIn}
          onKeyDown={focusPasswordOnEnter} onChange={hideError} />
      </div>
      <div>
        <input ref={passwordRef} type="password" placeholder="password" disabled={isLoggingIn}
          onKeyDown={performLoginOnEnter} onChange={hideError} />
      </div>
      <footer>
        <button type="button" aria-busy={isLoggingIn} disabled={isLoggingIn}
          onClick={performLogin}>Login</button>
        {errorToShow && <div className="error">{errorToShow}</div>}
      </footer>
    </article>
  );

  function watchLoggedUser() {
    !loggedUser && usernameRef.current?.focus()
  }

  function watchLoginError() {
    if (loginError) {
      setErrorToShow(loginError)
      usernameRef.current?.focus()
    }
  }

  function hideError() {
    setErrorToShow(undefined)
  }

  function performLogin() {
    login(usernameRef.current?.value, passwordRef.current?.value)
  }

  function focusPasswordOnEnter(e: KeyboardEvent<HTMLInputElement>): void {
    if (e.key === 'Enter') {
      e.preventDefault()
      passwordRef.current?.focus()
    }
  }

  function performLoginOnEnter(e: KeyboardEvent<HTMLInputElement>): void {
    if (e.key === 'Enter') {
      e.preventDefault()
      performLogin()
    }
  }
}

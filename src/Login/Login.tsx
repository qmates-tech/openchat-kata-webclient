import { KeyboardEvent, useEffect, useRef, useState } from "react"
import { Logout } from "../Logout/Logout"
import './Login.css'
import { LoginError, useLoginState } from "./LoginState"

export function Login() {
  const { login, logout, isLoggingIn, loggedUser, loginError } = useLoginState()
  const [errorToShow, setErrorToShow] = useState<LoginError | undefined>(undefined)
  const formRef = useRef<HTMLFormElement>(null)
  const usernameRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

  useEffect(watchLoggedUser, [loggedUser])
  useEffect(watchLoginError, [loginError])

  if (loggedUser) {
    return <Logout user={loggedUser} onLogoutClick={logout} />
  }
  return (
    <article className="login">
      <form ref={formRef} autoComplete="on" onSubmit={submitLogin}>
        <header><h3>Welcome to OpenChat</h3></header>
        <div>
          <input ref={usernameRef} autoComplete="on" name="username" placeholder="username" disabled={isLoggingIn}
            onKeyDown={focusPasswordOnEnter} onChange={hideError} />
        </div>
        <div>
          <input ref={passwordRef} autoComplete="on" name="password" placeholder="password" type="password" disabled={isLoggingIn}
            onKeyDown={performLoginOnEnter} onChange={hideError} />
        </div>
        <footer>
          <button type="submit" aria-busy={isLoggingIn} disabled={isLoggingIn}>Login</button>
          {errorToShow && <div className="error">{errorToShow}</div>}
        </footer>
      </form>
    </article>
  )

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

  function submitLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    performLogin()
  }

  function performLogin() {
    login(usernameRef.current?.value, passwordRef.current?.value)
  }
}

import { useRef } from "react";
import { useLoginState } from "./LoginState";

export function Login() {
  const { login, isLoggingIn, loggedUser, loginError } = useLoginState()
  const usernameRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

  return (
    <div>
      <h2>Welcome to OpenChat</h2>
      <div>
        <input ref={usernameRef} placeholder="username" />
      </div>
      <div>
        <input ref={passwordRef} placeholder="password" type="password" />
      </div>
      <button type="button" onClick={clickLogin}>Login</button> {isLoggingIn && <span>Logging in...</span>}
      {loginError && <div className="error">An error occurred: {loginError}</div>}
      {loggedUser && <div className="success">Logged in as {loggedUser.username}</div>}
    </div>
  );

  function clickLogin() {
    login(usernameRef.current?.value, passwordRef.current?.value)
  }
}

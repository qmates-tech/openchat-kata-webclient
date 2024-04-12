import { useRef } from "react"
import createHumbleObject from "./LoginHumbleObject"

function Login() {
  const humbleObject = createHumbleObject()
  const usernameRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

  const tryLogin = async () => {
    const username = usernameRef.current!!.value
    const password = passwordRef.current!!.value

    await humbleObject.tryLogin(username, password)
  }

  return (
    <div>
      <h2>Welcome to OpenChat</h2>
      <div>
        <input ref={usernameRef} placeholder="username" />
      </div>
      <div>
        <input ref={passwordRef} placeholder="password" type="password" />
      </div>
      <button type="button" onClick={tryLogin}>Login</button>
    </div>
  );
}

export default Login;

import { useRef, useState } from "react"
import createHumbleObject from "./LoginHumbleObject"

function Login() {
  const humbleObject = createHumbleObject()
  const usernameRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const [error, setError] = useState<string | null>(null)

  const tryLogin = async () => {
    setError(null)
    const username = usernameRef.current!!.value
    const password = passwordRef.current!!.value

    try {
      await humbleObject.tryLogin(username, password)
    } catch {
      setError("Invalid credentials")
    }
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
      {error && <div className="error">{error}</div>}
    </div>
  );
}

export default Login;

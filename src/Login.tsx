import { useRef, useState } from "react"
import { INVALID_CREDENTIALS_ERRORVALUE, NETWORK_ERROR_ERRORVALUE } from "./LoginAPIGateway"
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

    // to much logic maybe here in the component ...
    // ... could we move in the huble object the presenter responsability?
    try {
      const loggedUser = await humbleObject.tryLogin(username, password)
      alert("Login success as " + loggedUser.username)
    } catch (e: unknown) {
      if (e === INVALID_CREDENTIALS_ERRORVALUE) {
        setError("Invalid credentials")
        return
      }
      if (e === NETWORK_ERROR_ERRORVALUE) {
        setError("Network error")
        return
      }
      setError("Generic error")
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

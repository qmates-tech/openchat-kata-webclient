import { useEffect, useRef, useState } from "react";

export function RegistrationForm() {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const repeatPasswordRef = useRef<HTMLInputElement>(null);
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(validateForm, []);

  return (
    <form>
      <div>
        <input ref={usernameRef} required autoComplete="username" name="username" placeholder="username"
          onChange={validateForm}
        />
      </div>
      <div>
        <input ref={passwordRef} required name="password" placeholder="password" type="password"
          onChange={validateForm}
        />
      </div>
      <div>
        <input ref={repeatPasswordRef} required name="password" placeholder="repeat password" type="password"
          onChange={validateForm}
        />
      </div>
      <footer>
        <button type="submit" disabled={!isFormValid}>Register</button>
      </footer>
    </form>
  );

  function validateForm() {
    const isValid = !!usernameRef?.current?.value
      && !!passwordRef?.current?.value
      && !!repeatPasswordRef?.current?.value
      && passwordRef?.current?.value === repeatPasswordRef?.current?.value;

    setIsFormValid(isValid);
  }
}

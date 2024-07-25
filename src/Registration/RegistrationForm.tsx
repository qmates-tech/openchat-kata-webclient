import { RefObject, KeyboardEvent, useEffect, useRef, useState } from "react";
import { RegistrationData, RegistrationError, RegistrationState, ValidationError } from "./RegistrationState";

export function RegistrationForm({ validate, register }: RegistrationState) {
  const formRef = useRef<HTMLFormElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const repeatPasswordRef = useRef<HTMLInputElement>(null);
  const aboutRef = useRef<HTMLTextAreaElement>(null);
  const [isRegistering, setIsRegistering] = useState<boolean>(false);
  const [validationError, setValidationError] = useState<ValidationError | undefined>("FIELDS_MISSING");
  const [registrationError, setRegistrationError] = useState<RegistrationError | undefined>();

  const hasValidationError = !!validationError;
  const fieldsMissing = validationError === "FIELDS_MISSING";
  const passwordMismatch = validationError === "PASSWORDS_MISMATCH";

  useEffect(onFirstRender, []);

  return (
    <form ref={formRef}>
      <div>
        <input ref={usernameRef} required name="username" placeholder="username"
          onChange={validateForm} onKeyDown={focusOnEnter(passwordRef)}
        />
      </div>
      <div>
        <input ref={passwordRef} required name="password" placeholder="password" type="password"
          onChange={validateForm} onKeyDown={focusOnEnter(repeatPasswordRef)}
          aria-invalid={passwordMismatch || undefined}
        />
      </div>
      <div>
        <input ref={repeatPasswordRef} required name="repeatPassword" placeholder="repeat password" type="password"
          onChange={validateForm} onKeyDown={focusOnEnter(aboutRef)}
           aria-invalid={passwordMismatch || undefined}
        />
      </div>
      <div>
        <textarea ref={aboutRef} name="about" placeholder="Write something about yourself" onChange={validateForm} />
      </div>
      <footer>
        <button type="submit" disabled={isRegistering || hasValidationError} aria-busy={isRegistering}
          onClick={registerUser}>Register</button>
        {fieldsMissing && <div className="error">Please fill in all fields</div>}
        {passwordMismatch && <div className="error">Passwords do not match</div>}
        {registrationError && <div className="error">{registrationError}</div>}
      </footer>
    </form>
  );

  function onFirstRender() {
    usernameRef.current?.focus();
  }

  function registerUser(e: React.MouseEvent) {
    e.preventDefault();
    setIsRegistering(true);
    register(registrationData())
      .then(handleRegistrationResponse)
      .finally(() => setIsRegistering(false));
  }

  function handleRegistrationResponse(error: RegistrationError | undefined) {
    setRegistrationError(error);
    error && usernameRef.current?.focus();
  }

  function validateForm() {
    setValidationError(validate(registrationData()));
  }

  function registrationData(): RegistrationData {
    const formData = new FormData(formRef.current!);
    return Object.fromEntries(formData.entries());
  }

  function focusOnEnter(ref: RefObject<HTMLInputElement | HTMLTextAreaElement>) {
    return (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        ref.current?.focus();
      }
    };
  }
}

import { useRef, useState } from "react";
import { RegistrationData, RegistrationState, ValidationError } from "./RegistrationState";

export function RegistrationForm({ validate, register }: RegistrationState) {
  const formRef = useRef<HTMLFormElement>(null);
  const [isRegistering, setIsRegistering] = useState<boolean>(false);
  const [validationError, setValidationError] = useState<ValidationError | undefined>("FIELDS_MISSING");

  const hasValidationError = !!validationError;
  const fieldsMissing = validationError === "FIELDS_MISSING";
  const passwordMismatch = validationError === "PASSWORDS_MISMATCH";

  return (
    <form ref={formRef}>
      <div>
        <input required name="username" placeholder="username"
          onChange={validateForm}
        />
      </div>
      <div>
        <input required name="password" placeholder="password" type="password"
          onChange={validateForm} aria-invalid={passwordMismatch || undefined}
        />
      </div>
      <div>
        <input required name="repeatPassword" placeholder="repeat password" type="password"
          onChange={validateForm} aria-invalid={passwordMismatch || undefined}
        />
      </div>
      <div>
        <textarea name="about" placeholder="Write something about yourself" onChange={validateForm} />
      </div>
      <footer>
        <button type="submit" disabled={isRegistering || hasValidationError} aria-busy={isRegistering}
          onClick={registerUser}>Register</button>
        {fieldsMissing && <div className="error">Please fill in all fields</div>}
        {passwordMismatch && <div className="error">Passwords do not match</div>}
      </footer>
    </form>
  );

  function registerUser() {
    setIsRegistering(true);
    register(registrationData())
      .finally(() => setIsRegistering(false));
  }

  function validateForm() {
    setValidationError(validate(registrationData()));
  }

  function registrationData(): RegistrationData {
    const formData = new FormData(formRef.current!);
    return Object.fromEntries(formData.entries());
  }
}

import { useRef, useState } from "react";
import { RegistrationData, RegistrationState, ValidationError } from "./RegistrationState";

export function RegistrationForm({ validate }: RegistrationState) {
  const formRef = useRef<HTMLFormElement>(null);
  const [validationError, setValidationError] = useState<ValidationError | undefined>();

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
      <footer>
        <button type="submit" disabled={hasValidationError}>Register</button>
        {fieldsMissing && <div className="error">Please fill in all fields</div>}
        {passwordMismatch && <div className="error">Passwords do not match</div>}
      </footer>
    </form>
  );

  function validateForm() {
    setValidationError(validate(registrationData()));
  }

  function registrationData(): RegistrationData {
    const formData = new FormData(formRef.current!);
    return Object.fromEntries(formData.entries());
  }
}

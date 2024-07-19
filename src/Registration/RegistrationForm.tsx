import { useRef } from "react";
import { RegistrationData, RegistrationState } from "./RegistrationState";

export function RegistrationForm({ validate, validationError }: RegistrationState) {
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <form ref={formRef}>
      <div>
        <input required name="username" placeholder="username"
          onChange={validateForm}
        />
      </div>
      <div>
        <input required name="password" placeholder="password" type="password"
          onChange={validateForm}
        />
      </div>
      <div>
        <input required name="repeatPassword" placeholder="repeat password" type="password"
          onChange={validateForm}
        />
      </div>
      <footer>
        <button type="submit" disabled={!!validationError}>Register</button>
      </footer>
    </form>
  );

  function validateForm() {
    validate(registrationData());
  }

  function registrationData(): RegistrationData {
    const formData = new FormData(formRef.current!);
    return Object.fromEntries(formData.entries());
  }
}

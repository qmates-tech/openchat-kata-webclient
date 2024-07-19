import { useState } from "react";

export type RegistrationData = {
  username?: string;
  password?: string;
  repeatPassword?: string;
};
export type RegistrationState = {
  validationErrors: { hasErrors: boolean };
  validate(data: RegistrationData): void;
};
export function useRegistrationState(): RegistrationState {
  const [validationErrors, setValidationErrors] = useState({ hasErrors: false });

  return {
    validationErrors,
    validate({ username, password, repeatPassword }: RegistrationData): void {
      setValidationErrors({
        hasErrors: !username
          || !password
          || !repeatPassword
          || password !== repeatPassword
      });
    }
  }
}

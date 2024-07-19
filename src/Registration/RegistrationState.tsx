import { useState } from "react";

export type RegistrationData = {
  username?: string;
  password?: string;
  repeatPassword?: string;
};
export type ValidationError = "FIELDS_MISSING" | "PASSWORDS_MISMATCH";
export type RegistrationState = {
  validationError?: ValidationError;
  validate(data: RegistrationData): void;
};
export function useRegistrationState(): RegistrationState {
  const [validationError, setValidationError] = useState<ValidationError | undefined>();

  return {
    validationError,
    validate({ username, password, repeatPassword }: RegistrationData): void {
      if (password !== repeatPassword) {
        setValidationError("PASSWORDS_MISMATCH");
        return;
      }

      if (!username || !password || !repeatPassword) {
        setValidationError("FIELDS_MISSING");
        return;
      }
      setValidationError(undefined);
    }
  }
}

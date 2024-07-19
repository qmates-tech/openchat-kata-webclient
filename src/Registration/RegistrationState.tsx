
export type RegistrationData = {
  username?: string;
  password?: string;
  repeatPassword?: string;
};
export type ValidationError = "FIELDS_MISSING" | "PASSWORDS_MISMATCH" | undefined;
export type RegistrationState = {
  validate(data: RegistrationData): ValidationError;
};
export function useRegistrationState(): RegistrationState {
  return {
    validate({ username, password, repeatPassword }: RegistrationData): ValidationError {
      if (password !== repeatPassword) {
        return "PASSWORDS_MISMATCH";
      }

      if (!username || !password || !repeatPassword) {
        return "FIELDS_MISSING";
      }

      return undefined;
    }
  }
}

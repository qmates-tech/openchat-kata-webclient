
export type RegistrationData = {
  username?: string;
  password?: string;
  repeatPassword?: string;
  about?: string;
};
export type ValidationError = "FIELDS_MISSING" | "PASSWORDS_MISMATCH" | undefined;
export type RegistrationState = {
  validate(data: RegistrationData): ValidationError;
  register(data: RegistrationData): Promise<void>;
};
export function useRegistrationState(): RegistrationState {
  return {
    async register({ username, password, repeatPassword, about }: RegistrationData): Promise<void> {
      console.log("TODO: register user", { username, password, repeatPassword, about });
    },
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

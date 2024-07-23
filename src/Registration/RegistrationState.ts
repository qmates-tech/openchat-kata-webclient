import { useUserSession } from "../User/UserSessionState";
import { createRegistrationAPI } from "./RegistrationAPI";

export type RegistrationData = {
  username?: string;
  password?: string;
  repeatPassword?: string;
  about?: string;
};
export type ValidRegistrationData = Required<Omit<RegistrationData, 'repeatPassword'>>;
export type ValidationError = "FIELDS_MISSING" | "PASSWORDS_MISMATCH" | undefined;
export type RegistrationState = {
  validate(data: RegistrationData): ValidationError;
  register(data: RegistrationData): Promise<void>;
};

const registrationAPI = createRegistrationAPI();

export function useRegistrationState({ register } = registrationAPI): RegistrationState {
  const { setUserSession } = useUserSession();

  return {
    async register({ username, password, about }: ValidRegistrationData): Promise<void> {
      setUserSession(await register(username, password, about));
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

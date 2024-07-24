import { useUserSession } from "../User/UserSessionState";
import { createRegistrationAPI, RegistrationAPIException } from "./RegistrationAPI";

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
  register(data: RegistrationData): Promise<RegistrationError>;
};
export type RegistrationError = "Username already in use" | 'Network error' | 'Generic error' | undefined;

const registrationAPI = createRegistrationAPI();

export function useRegistrationState({ register } = registrationAPI): RegistrationState {
  const { setUserSession } = useUserSession();

  return {
    async register({ username, password, about }: ValidRegistrationData): Promise<RegistrationError> {
      try {
        setUserSession(await register(username, password, about));
      } catch (e) {
        return errorMessageFrom(e as RegistrationAPIException);
      }
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

function errorMessageFrom(e: RegistrationAPIException): RegistrationError {
  switch (e) {
    case "USERNAME_ALREADY_IN_USE":
      return "Username already in use";
    case "NETWORK_ERROR":
      return "Network error";
    default:
      return "Generic error";
  }
}

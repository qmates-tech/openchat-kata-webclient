import { useMemo } from "react";
import { createRegistrationAPI } from "./RegistrationAPI";
import { useUserSession } from "../User/UserSessionState";

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
export function useRegistrationState(): RegistrationState {
  const { setUserSession } = useUserSession();
  const { register } = useMemo(() => createRegistrationAPI(), []);

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

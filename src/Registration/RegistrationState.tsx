export type RegistrationData = {
  username?: string;
  password?: string;
  repeatPassword?: string;
};
export type RegistrationState = {
  validate(data: RegistrationData): boolean;
};
export function useRegistrationState(): RegistrationState {
  return {
    validate({ username, password, repeatPassword }: RegistrationData): boolean {
      return !!username
        && !!password
        && !!repeatPassword
        && password === repeatPassword;
    }
  }
}

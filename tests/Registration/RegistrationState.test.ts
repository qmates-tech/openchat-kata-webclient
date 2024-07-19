import { useRegistrationState } from '../../src/Registration/RegistrationState';

describe('Registration State', () => {
  describe('validate', () => {
    it('should return FIELDS_MISSING error when an empty registration data is provided', () => {
      const validationError = useRegistrationState().validate({});

      expect(validationError).toEqual("FIELDS_MISSING");
    });

    it('should return no errors when valid registration data id provided', () => {
      const validationError = useRegistrationState().validate({
        username: "an user",
        password: "a password",
        repeatPassword: "a password"
      });

      expect(validationError).toEqual(undefined);
    });

    it('should return PASSWORDS_MISMATCH when the passwords do not match', () => {
      const validationError = useRegistrationState().validate({
        username: "an user",
        password: "a password",
        repeatPassword: "another password"
      });

      expect(validationError).toEqual("PASSWORDS_MISMATCH");
    });

    it('should return FIELDS_MISSING when the username is undefined', () => {
      const validationError = useRegistrationState().validate({
        username: undefined,
        password: "a",
        repeatPassword: "a"
      });

      expect(validationError).toEqual("FIELDS_MISSING");
    });

    it('should return FIELDS_MISSING when the passwords are missing', () => {
      const validationError = useRegistrationState().validate({
        username: "an user"
      });

      expect(validationError).toEqual("FIELDS_MISSING");
    });

    it('should return FIELDS_MISSING when the one field is empty', () => {
      const validationError = useRegistrationState().validate({
        username: "",
        password: "a password",
        repeatPassword: "a password"
      });

      expect(validationError).toEqual("FIELDS_MISSING");
    });

    it('should return PASSWORD_MISMATCH when only one password is empty', () => {
      const validationError = useRegistrationState().validate({
        username: "an user",
        password: "a password",
        repeatPassword: ""
      });

      expect(validationError).toEqual("PASSWORDS_MISMATCH");
    });
  });
});

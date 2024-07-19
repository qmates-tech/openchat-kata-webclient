import { act, renderHook, waitFor } from '@testing-library/react';
import { useRegistrationState } from '../../src/Registration/RegistrationState';

describe('Registration State', () => {
  describe('validate', () => {
    it('should return FIELDS_MISSING error when an empty registration data is provided', () => {
      const { result } = renderHook(useRegistrationState);

      act(() => result.current.validate({}));

      expect(result.current.validationError).toEqual("FIELDS_MISSING");
    });

    it('should return no errors when valid registration data id provided', () => {
      const { result } = renderHook(useRegistrationState);

      act(() => result.current.validate({
        username: "an user",
        password: "a password",
        repeatPassword: "a password"
      }));

      expect(result.current.validationError).toEqual(undefined);
    });

    it('should return PASSWORDS_MISMATCH when the passwords do not match', () => {
      const { result } = renderHook(useRegistrationState);

      act(() => result.current.validate({
        username: "an user",
        password: "a password",
        repeatPassword: "another password"
      }));

      expect(result.current.validationError).toEqual("PASSWORDS_MISMATCH");
    });

    it('should return FIELDS_MISSING when the username is undefined', () => {
      const { result } = renderHook(useRegistrationState);

      act(() => result.current.validate({
        username: undefined,
        password: "a",
        repeatPassword: "a"
      }));

      expect(result.current.validationError).toEqual("FIELDS_MISSING");
    });

    it('should return FIELDS_MISSING when the passwords are missing', () => {
      const { result } = renderHook(useRegistrationState);

      act(() => result.current.validate({
        username: "an user"
      }));

      expect(result.current.validationError).toEqual("FIELDS_MISSING");
    });

    it('should return FIELDS_MISSING when the one field is empty', () => {
      const { result } = renderHook(useRegistrationState);

      act(() => result.current.validate({
        username: "",
        password: "a password",
        repeatPassword: "a password"
      }));

      expect(result.current.validationError).toEqual("FIELDS_MISSING");
    });

    it('should return PASSWORD_MISMATCH when only one password is empty', () => {
      const { result } = renderHook(useRegistrationState);

      act(() => result.current.validate({
        username: "an user",
        password: "a password",
        repeatPassword: ""
      }));

      expect(result.current.validationError).toEqual("PASSWORDS_MISMATCH");
    });

    it('should go back to undefined when a second validation is valid', () => {
      const { result } = renderHook(useRegistrationState);

      act(() => result.current.validate({}));
      act(() => result.current.validate({ username: "1", password: "2", repeatPassword: "2" }));

      expect(result.current.validationError).toEqual(undefined);
    });
  });
});

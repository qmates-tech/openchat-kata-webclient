import { renderHook } from '@testing-library/react';
import { useRegistrationState } from '../../src/Registration/RegistrationState';

describe('Registration State', () => {
  describe('validate', () => {
    it('should return false when an empty registration data is provided', () => {
      const { result } = renderHook(useRegistrationState);

      const isValid = result.current.validate({});

      expect(isValid).toBeFalsy();
    });

    it('should return true when valid registration data id provided', () => {
      const { result } = renderHook(useRegistrationState);

      const isValid = result.current.validate({
        username: "an user",
        password: "a password",
        repeatPassword: "a password"
      });

      expect(isValid).toBeTruthy();
    });

    it('should return false when the passwords do not match', () => {
      const { result } = renderHook(useRegistrationState);

      const isValid = result.current.validate({
        username: "an user",
        password: "a password",
        repeatPassword: "another password"
      });

      expect(isValid).toBeFalsy();
    });

    it('should return false when the username is undefined', () => {
      const { result } = renderHook(useRegistrationState);

      const isValid = result.current.validate({
        username: undefined,
        password: "a password",
        repeatPassword: "another password"
      });

      expect(isValid).toBeFalsy();
    });

    it('should return false when the passwords are missing', () => {
      const { result } = renderHook(useRegistrationState);

      const isValid = result.current.validate({
        username: "an user"
      });

      expect(isValid).toBeFalsy();
    });

    it('should return false when the one field is empty', () => {
      const { result } = renderHook(useRegistrationState);

      const isValid = result.current.validate({
        username: "",
        password: "a password",
        repeatPassword: "a password"
      });

      expect(isValid).toBeFalsy();
    });
  });
});

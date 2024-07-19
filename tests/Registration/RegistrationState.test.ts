import { act, renderHook, waitFor } from '@testing-library/react';
import { useRegistrationState } from '../../src/Registration/RegistrationState';

describe('Registration State', () => {
  describe('validate', () => {
    it('should have an error when an empty registration data is provided', () => {
      const { result } = renderHook(useRegistrationState);

      act(() => result.current.validate({}));

      expect(result.current.validationErrors.hasErrors).toBeTruthy();
    });

    it('should return true when valid registration data id provided', () => {
      const { result } = renderHook(useRegistrationState);

      act(() => result.current.validate({
        username: "an user",
        password: "a password",
        repeatPassword: "a password"
      }));

      expect(result.current.validationErrors.hasErrors).toBeFalsy();
    });

    it('should return false when the passwords do not match', () => {
      const { result } = renderHook(useRegistrationState);

      act(() => result.current.validate({
        username: "an user",
        password: "a password",
        repeatPassword: "another password"
      }));

      expect(result.current.validationErrors.hasErrors).toBeTruthy();
    });

    it('should return false when the username is undefined', () => {
      const { result } = renderHook(useRegistrationState);

      act(() => result.current.validate({
        username: undefined,
        password: "a password",
        repeatPassword: "another password"
      }));

      expect(result.current.validationErrors.hasErrors).toBeTruthy();
    });

    it('should return false when the passwords are missing', () => {
      const { result } = renderHook(useRegistrationState);

      act(() => result.current.validate({
        username: "an user"
      }));

      expect(result.current.validationErrors.hasErrors).toBeTruthy();
    });

    it('should return false when the one field is empty', () => {
      const { result } = renderHook(useRegistrationState);

      act(() => result.current.validate({
        username: "",
        password: "a password",
        repeatPassword: "a password"
      }));

      expect(result.current.validationErrors.hasErrors).toBeTruthy();
    });
  });
});

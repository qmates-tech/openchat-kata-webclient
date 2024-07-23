import { act, renderHook, waitFor } from '@testing-library/react';
import { RegistrationState, useRegistrationState } from '../../src/Registration/RegistrationState';
import { User } from '../../src/User/User';
import { mockCreateRegistrationAPI, succeedWith } from '../utils/MockRegistrationAPI';
import { mockUserSession } from '../utils/MockUserSession';

describe('Registration State', () => {
  const anUser: User = { id: "123", username: "alessio", about: "About Alessio" };

  beforeEach(() => {
    mockUserSession({ currentUser: undefined });
  });

  describe('validate', () => {
    let registrationState: RegistrationState

    beforeEach(() => {
      const { result } = renderHook(useRegistrationState);
      registrationState = result.current
    });

    it('should return FIELDS_MISSING error when an empty registration data is provided', () => {
      const validationError = registrationState.validate({});

      expect(validationError).toEqual("FIELDS_MISSING");
    });

    it('should return no errors when valid registration data id provided', () => {
      const validationError = registrationState.validate({
        username: "an user",
        password: "a password",
        repeatPassword: "a password"
      });

      expect(validationError).toEqual(undefined);
    });

    it('should return PASSWORDS_MISMATCH when the passwords do not match', () => {
      const validationError = registrationState.validate({
        username: "an user",
        password: "a password",
        repeatPassword: "another password"
      });

      expect(validationError).toEqual("PASSWORDS_MISMATCH");
    });

    it('should return FIELDS_MISSING when the username is undefined', () => {
      const validationError = registrationState.validate({
        username: undefined,
        password: "a",
        repeatPassword: "a"
      });

      expect(validationError).toEqual("FIELDS_MISSING");
    });

    it('should return FIELDS_MISSING when the passwords are missing', () => {
      const validationError = registrationState.validate({
        username: "an user"
      });

      expect(validationError).toEqual("FIELDS_MISSING");
    });

    it('should return FIELDS_MISSING when the one field is empty', () => {
      const validationError = registrationState.validate({
        username: "",
        password: "a password",
        repeatPassword: "a password"
      });

      expect(validationError).toEqual("FIELDS_MISSING");
    });

    it('should return PASSWORD_MISMATCH when only one password is empty', () => {
      const validationError = registrationState.validate({
        username: "an user",
        password: "a password",
        repeatPassword: ""
      });

      expect(validationError).toEqual("PASSWORDS_MISMATCH");
    });
  });

  describe('register', () => {
    it('should call the registration API', async () => {
      const api = mockCreateRegistrationAPI({ register: succeedWith(anUser) });
      const { result } = renderHook(useRegistrationState);

      await act(() => result.current.register({
        username: "an user",
        password: "a password",
        about: "about"
      }));

      await waitFor(() => expect(api.register).toHaveBeenCalledWith("an user", "a password", "about"));
    });

    it('should login after the successfull registration', async () => {
      const userSession = mockUserSession({ currentUser: undefined });
      mockCreateRegistrationAPI({ register: succeedWith(anUser) });
      const { result } = renderHook(useRegistrationState);

      await act(() => result.current.register({
        username: "an user",
        password: "a password",
        about: "about"
      }));

      await waitFor(() => expect(userSession.setUserSession).toHaveBeenCalledWith(anUser));
    });

    // TODO: handle NETWORK_ERROR
    // TODO: handle USERNAME_ALREADY_IN_USE
  });
});

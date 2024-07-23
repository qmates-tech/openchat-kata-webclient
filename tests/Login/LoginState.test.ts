import { act, renderHook, waitFor } from '@testing-library/react';
import { delay } from 'msw';
import { useLoginState } from '../../src/Login/LoginState';
import { User } from '../../src/User/User';
import { failsWith, mockCreateLoginAPI, succeedWith } from '../utils/MockLoginAPI';
import { mockUserSession } from '../utils/MockUserSession';

describe('Login State', () => {
  const anUser: User = { id: "123", username: "alessio", about: "About Alessio" };

  beforeEach(() => {
    mockUserSession();
  });

  it('should be able to login', async () => {
    const userSession = mockUserSession();
    mockCreateLoginAPI({ login: succeedWith(anUser) });
    const { result } = renderHook(useLoginState);

    act(() => result.current.login("right_user", "right_password"));

    await waitFor(() => {
      expect(userSession.setUserSession).toHaveBeenCalledWith(anUser);
    });
  });

  it('should set loading status to false when API succeeded', async () => {
    mockCreateLoginAPI({ login: succeedWith(anUser, 100) });
    const { result } = renderHook(useLoginState);

    act(() => result.current.login("right_user", "right_password"));

    await waitFor(() => expect(result.current.isLoggingIn).toStrictEqual(true));
    await waitFor(() => expect(result.current.isLoggingIn).toStrictEqual(false));
  });

  it('should set loading status to false when API fails', async () => {
    mockCreateLoginAPI({ login: failsWith("any error", 100) });
    const { result } = renderHook(useLoginState);

    act(() => result.current.login("right_user", "right_password"));

    await waitFor(() => expect(result.current.isLoggingIn).toStrictEqual(true));
    await waitFor(() => expect(result.current.isLoggingIn).toStrictEqual(false));
  });

  it('should handle no user and password as INVALID_CREDENTIAL error', async () => {
    mockCreateLoginAPI({ login: succeedWith(anUser) });
    const { result } = renderHook(useLoginState);

    act(() => result.current.login(undefined, undefined));

    await waitFor(() => {
      expect(result.current.loginError).toBe("Invalid credentials");
      expect(result.current.isLoggingIn).toBe(false);
    });
  });

  it('should not perform the api call when user is blank', async () => {
    const loginAPI = mockCreateLoginAPI({ login: succeedWith(anUser) });
    const { result } = renderHook(useLoginState);

    act(() => result.current.login("", "pwd"));

    expect(loginAPI.login).not.toHaveBeenCalled();
  });

  it('should not perform the api call when password is blank', async () => {
    const loginAPI = mockCreateLoginAPI({ login: succeedWith(anUser) });
    const { result } = renderHook(useLoginState);

    act(() => result.current.login("usr", ""));

    expect(loginAPI.login).not.toHaveBeenCalled();
  });

  it('should handle INVALID_CREDENTIAL from the API', async () => {
    mockCreateLoginAPI({ login: failsWith("INVALID_CREDENTIALS") });
    const { result } = renderHook(useLoginState);

    act(() => result.current.login("wrongUser", "wrongPassword"));

    await waitFor(() => {
      expect(result.current.loginError).toBe("Invalid credentials");
    });
  });

  it('should handle NETWORK_ERROR from the api', async () => {
    mockCreateLoginAPI({ login: failsWith("NETWORK_ERROR") });
    const { result } = renderHook(useLoginState);

    act(() => result.current.login("anyUser", "anyPassword"));

    await waitFor(() => {
      expect(result.current.loginError).toBe("Network error");
    });
  });

  it('should handle any other error from the api as Generic Error', async () => {
    mockCreateLoginAPI({ login: failsWith("ANY_OTHER_ERROR") });
    const { result } = renderHook(useLoginState);

    act(() => result.current.login("anyUser", "anyPassword"));

    await waitFor(() => {
      expect(result.current.loginError).toBe("Generic error");
    });
  });

  it('should ignore the login attempt while a previous one is still in progress', async () => {
    const loginAPI = mockCreateLoginAPI({ login: succeedWith(anUser, 50) });
    const { result } = renderHook(useLoginState);

    act(() => result.current.login("usr", "pwd"));
    await delay(10);
    act(() => result.current.login("another", "anotherPwd"));

    expect(loginAPI.login).toHaveBeenCalledTimes(1);
    expect(loginAPI.login).toHaveBeenCalledWith("usr", "pwd");
  });

  it('should ignore the login attempt if already authenticated', async () => {
    const loginAPI = mockCreateLoginAPI({ login: succeedWith(anUser) });
    const { result } = renderHook(useLoginState);

    act(() => result.current.login("any", "any"));
    act(() => result.current.login("any another", "any"));

    expect(loginAPI.login).toHaveBeenCalledTimes(1);
  });
});

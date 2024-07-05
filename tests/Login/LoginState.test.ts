import { cleanup, renderHook, waitFor } from '@testing-library/react';
import { delay } from 'msw';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useLoginState } from '../../src/Login/LoginState';
import { User } from '../../src/User/User';
import { failsWith, mockCreateLoginAPI, succeedWith } from '../utils/MockLoginAPI';
import { wrapWithUserSession } from '../utils/renderHelpers';

describe('Login State', () => {
  const anUser: User = { id: "123", username: "alessio", about: "About Alessio" }

  beforeEach(() => {
    vi.clearAllMocks();
    cleanup();
    localStorage.clear();
  });

  it('throw error if it is used outside its Provider', async () => {
    expect(() => {
      renderHook(() => useLoginState());
    }).toThrowError('useUserSession must be used within a UserSessionProvider');
  });

  it('by default is not logged in', () => {
    mockCreateLoginAPI({ login: succeedWith(anUser) })
    const { result } = renderHook(() => useLoginState(), wrapWithUserSession());

    expect(result.current.loggedUser).toBeUndefined();
    expect(result.current.loginError).toBeUndefined();
    expect(result.current.isLoggingIn).toBe(false);
  });

  it('should be able to login', async () => {
    mockCreateLoginAPI({ login: succeedWith(anUser) })
    const { result } = renderHook(() => useLoginState(), wrapWithUserSession());

    result.current.login("right_user", "right_password");

    await waitFor(() => {
      expect(result.current.loggedUser).toStrictEqual(anUser);
    });
  });

  it('should set loading status to false when API succeeded', async () => {
    mockCreateLoginAPI({ login: succeedWith(anUser, 100) })
    const { result } = renderHook(() => useLoginState(), wrapWithUserSession());

    result.current.login("right_user", "right_password");

    await waitFor(() => expect(result.current.isLoggingIn).toStrictEqual(true));
    await waitFor(() => expect(result.current.isLoggingIn).toStrictEqual(false));
  });

  it('should set loading status to false when API fails', async () => {
    mockCreateLoginAPI({ login: failsWith("any error", 100) })
    const { result } = renderHook(() => useLoginState(), wrapWithUserSession());

    result.current.login("right_user", "right_password");

    await waitFor(() => expect(result.current.isLoggingIn).toStrictEqual(true));
    await waitFor(() => expect(result.current.isLoggingIn).toStrictEqual(false));
  });

  it('should handle no user and password as INVALID_CREDENTIAL error', async () => {
    mockCreateLoginAPI({ login: succeedWith(anUser) })
    const { result } = renderHook(() => useLoginState(), wrapWithUserSession());

    result.current.login(undefined, undefined);

    await waitFor(() => {
      expect(result.current.loginError).toBe("Invalid credentials");
      expect(result.current.isLoggingIn).toBe(false);
    });
  });

  it('should not perform the api call when user is blank', async () => {
    const loginAPI = mockCreateLoginAPI({ login: succeedWith(anUser) })
    const { result } = renderHook(() => useLoginState(), wrapWithUserSession());

    result.current.login("", "pwd");

    expect(loginAPI.login).not.toHaveBeenCalled();
  });

  it('should not perform the api call when password is blank', async () => {
    const loginAPI = mockCreateLoginAPI({ login: succeedWith(anUser) })
    const { result } = renderHook(() => useLoginState(), wrapWithUserSession());

    result.current.login("usr", "");

    expect(loginAPI.login).not.toHaveBeenCalled();
  });

  it('should handle INVALID_CREDENTIAL from the API', async () => {
    mockCreateLoginAPI({ login: failsWith("INVALID_CREDENTIALS") })
    const { result } = renderHook(() => useLoginState(), wrapWithUserSession());

    result.current.login("wrongUser", "wrongPassword");

    await waitFor(() => {
      expect(result.current.loginError).toBe("Invalid credentials");
    });
  });

  it('should handle NETWORK_ERROR from the api', async () => {
    mockCreateLoginAPI({ login: failsWith("NETWORK_ERROR") })
    const { result } = renderHook(() => useLoginState(), wrapWithUserSession());

    result.current.login("anyUser", "anyPassword");

    await waitFor(() => {
      expect(result.current.loginError).toBe("Network error");
    });
  });

  it('should handle any other error from the api as Generic Error', async () => {
    mockCreateLoginAPI({ login: failsWith("ANY_OTHER_ERROR") })
    const { result } = renderHook(() => useLoginState(), wrapWithUserSession());

    result.current.login("anyUser", "anyPassword");

    await waitFor(() => {
      expect(result.current.loginError).toBe("Generic error");
    });
  });

  it('should ignore the login attempt while a previous one is still in progress', async () => {
    const loginAPI = mockCreateLoginAPI({ login: succeedWith(anUser, 50) })
    const { result } = renderHook(() => useLoginState(), wrapWithUserSession());

    result.current.login("usr", "pwd");
    await delay(10);
    result.current.login("another", "anotherPwd");

    expect(loginAPI.login).toHaveBeenCalledTimes(1);
    expect(loginAPI.login).toHaveBeenCalledWith("usr", "pwd");
  });

  it('should ignore the login attempt if already authenticated', async () => {
    const loginAPI = mockCreateLoginAPI({ login: succeedWith(anUser) })
    const { result } = renderHook(() => useLoginState(), wrapWithUserSession());

    result.current.login("any", "any");
    await delay(10);
    result.current.login("any another", "any");

    expect(loginAPI.login).toHaveBeenCalledTimes(1);
  });

  it('be already logged in when a session is already present', async () => {
    localStorage.setItem("openChatSession", JSON.stringify(anUser));
    const { result } = renderHook(() => useLoginState(), wrapWithUserSession());

    expect(result.current.loggedUser).toStrictEqual(anUser);
  });
});

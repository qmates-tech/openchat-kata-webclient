import { vi } from 'vitest';
import * as toMock from '../../src/Login/LoginState';

export function mockUseLoginState(obj: Partial<toMock.LoginState> = {}): toMock.LoginState {
  const mocked = {
    login: vi.fn(),
    isLoggingIn: false,
    loggedUser: undefined,
    loginError: undefined,
    ...obj
  };
  vi.spyOn(toMock, "useLoginState").mockImplementation(() => mocked);
  return mocked;
}

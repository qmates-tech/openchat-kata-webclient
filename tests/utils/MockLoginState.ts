import { vi } from 'vitest';
import * as toMock from '../../src/Login/LoginState';
import { LoginState } from '../../src/Login/LoginState';

export function mockUseLoginState(obj: Partial<toMock.LoginState> = {}): toMock.LoginState {
  const mocked: LoginState = {
    login: vi.fn(),
    isLoggingIn: false,
    loginError: undefined,
    ...obj
  };
  vi.spyOn(toMock, "useLoginState").mockImplementation(() => mocked);
  return mocked;
}

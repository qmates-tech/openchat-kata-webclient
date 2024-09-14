import { vi } from 'vitest';
import * as toMock from '../../src/Logout/LogoutState';

export function mockUseLogoutState(obj: Partial<toMock.LogoutState> = {}): toMock.LogoutState {
  const mocked: toMock.LogoutState = {
    logout: vi.fn(),
    retrieving: false,
    currentUser: undefined,
    ...obj
  };
  vi.spyOn(toMock, "useLogoutState").mockImplementation(() => mocked);
  return mocked;
}

import { vi } from 'vitest';
import * as toMock from '../../src/User/UserSessionState';

export function mockUserSession(obj: Partial<toMock.UserSession> = {}): toMock.UserSession {
  const mocked = {
    currentUser: undefined,
    retrieving: false,
    setUserSession: vi.fn(),
    ...obj
  };
  vi.spyOn(toMock, "useUserSession").mockImplementation(() => mocked);
  return mocked;
}

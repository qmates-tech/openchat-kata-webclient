import { vi } from 'vitest';
import * as toMock from '../../src/User/UserByIdState';

export function mockUserById(obj: Partial<toMock.UserByIdState> = {}): toMock.UserByIdState {
  const mocked = {
    user: undefined,
    retrieving: false,
    error: undefined,
    ...obj
  };
  vi.spyOn(toMock, "useUserById").mockImplementation(() => mocked);
  return mocked;
}

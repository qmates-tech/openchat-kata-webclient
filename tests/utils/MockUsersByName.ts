import { vi } from 'vitest';
import * as toMock from '../../src/User/UsersByNameState';

export function mockUsersByName(obj: Partial<toMock.SearchUsersState> = {}): toMock.SearchUsersState {
  const mocked = {
    users: [],
    retrieving: false,
    error: undefined,
    ...obj
  };
  vi.spyOn(toMock, "useUsersByName").mockImplementation(() => mocked);
  return mocked;
}

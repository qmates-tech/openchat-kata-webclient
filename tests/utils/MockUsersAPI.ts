import { vi } from 'vitest';
import { UsersAPI } from '../../src/User/UsersAPI';

export function mockUsersAPI(obj: Partial<UsersAPI> = {}): UsersAPI {
  return {
    getUser: vi.fn(() => Promise.resolve({ id: "1", username: "name", about: "About" })),
    allUsersByName: vi.fn(() => Promise.resolve([])),
    ...obj
  }
}

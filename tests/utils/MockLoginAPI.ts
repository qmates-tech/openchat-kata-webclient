import { vi } from 'vitest';
import { LoginAPI } from '../../src/Login/LoginAPI';

export function mockCreateLoginAPI(obj: Partial<LoginAPI> = {}): LoginAPI {
  return {
    login: vi.fn(),
    ...obj
  }
}

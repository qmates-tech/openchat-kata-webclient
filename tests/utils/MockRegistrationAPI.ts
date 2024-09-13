import { vi } from 'vitest';
import { RegistrationAPI } from '../../src/Registration/RegistrationAPI';

export function mockCreateRegistrationAPI(obj: Partial<RegistrationAPI> = {}): RegistrationAPI {
  return {
    register: vi.fn(),
    ...obj
  }
}

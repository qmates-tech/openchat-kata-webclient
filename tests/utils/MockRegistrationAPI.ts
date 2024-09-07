import { delay } from 'msw';
import { vi } from 'vitest';
import { RegistrationAPI, RegistrationAPIException } from '../../src/Registration/RegistrationAPI';
import { User } from '../../src/User/User';

export function mockCreateRegistrationAPI(obj: Partial<RegistrationAPI> = {}): RegistrationAPI {
  return {
    register: vi.fn(),
    ...obj
  }
}

export function succeedWith(user: User, delayMs: number = 0) {
  return vi.fn().mockImplementation(async () => {
    await delay(delayMs);
    return user;
  });
}

export function failsWith(exception: RegistrationAPIException | string, delayMs: number = 0) {
  return vi.fn().mockImplementation(async () => {
    await delay(delayMs);
    throw exception;
  });
}

import { delay } from 'msw';
import { vi } from 'vitest';
import * as toMock from '../../src/Registration/RegistrationAPI';
import { User } from '../../src/User/User';

export function mockCreateRegistrationAPI(obj: Partial<toMock.RegistrationAPI> = {}): toMock.RegistrationAPI {
  const mocked = {
    register: vi.fn(),
    ...obj
  };
  vi.spyOn(toMock, "createRegistrationAPI").mockImplementation(() => mocked);
  return mocked;
}

export function succeedWith(user: User, delayMs: number = 0) {
  return vi.fn().mockImplementation(async () => {
    await delay(delayMs);
    return user;
  });
}

export function failsWith(exception: toMock.RegistrationAPIException | string, delayMs: number = 0) {
  return vi.fn().mockImplementation(async () => {
    await delay(delayMs);
    throw exception;
  });
}

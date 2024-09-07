import { delay } from 'msw';
import { vi } from 'vitest';
import { LoginAPI, LoginAPIException } from '../../src/Login/LoginAPI';
import { User } from '../../src/User/User';

export function mockCreateLoginAPI(obj: Partial<LoginAPI> = {}): LoginAPI {
  return {
    login: vi.fn(),
    ...obj
  }
}

export function succeedWith(user: User, delayMs: number = 0) {
  return vi.fn().mockImplementation(async () => {
    await delay(delayMs);
    return user;
  });
}

export function failsWith(exception: LoginAPIException | string, delayMs: number = 0) {
  return vi.fn().mockImplementation(async () => {
    await delay(delayMs);
    throw exception;
  });
}

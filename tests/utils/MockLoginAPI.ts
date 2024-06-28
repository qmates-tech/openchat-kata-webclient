import { vi } from 'vitest';
import * as toMock from '../../src/Login/LoginAPI';
import { User } from '../../src/User';
import { delay } from 'msw';

export function mockCreateLoginAPI(obj: Partial<toMock.LoginAPI>): toMock.LoginAPI {
  const mocked = {
    login: vi.fn(),
    ...obj
  }
  vi.spyOn(toMock, "createLoginAPI").mockImplementation(() => mocked)
  return mocked;
}

export function succeedWith(user: User, delayMs: number = 0) {
  return vi.fn().mockImplementation(async () => {
    await delay(delayMs)
    return user;
  })
}

export function failsWith(exception: toMock.LoginAPIException | string, delayMs: number = 0) {
  return vi.fn().mockImplementation(async () => {
    await delay(delayMs)
    throw exception;
  })
}
import { vi } from "vitest";
import { delay } from "msw";

export function succeedWith<T>(response: T, delayMs: number = 0) {
  return vi.fn().mockImplementation(async () => {
    await delay(delayMs);
    return response;
  });
}

export function failsWith<E>(exception: E | string, delayMs: number = 0) {
  return vi.fn().mockImplementation(async () => {
    await delay(delayMs);
    throw exception;
  });
}
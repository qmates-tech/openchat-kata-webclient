import { vi } from 'vitest';
import * as toMock from '../../src/Registration/RegistrationState';

export function mockUseRegistrationState(obj: Partial<toMock.RegistrationState> = {}): toMock.RegistrationState {
  const mocked = {
    validate: vi.fn(() => false),
    ...obj
  };
  vi.spyOn(toMock, "useRegistrationState").mockImplementation(() => mocked);
  return mocked;
}

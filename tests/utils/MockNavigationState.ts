import { vi } from 'vitest';
import * as toMock from '../../src/Navigation/NavigationState';

export function mockUseNavigationState(
  obj: Partial<toMock.NavigationState> = {}
): toMock.NavigationState {
  const mocked = {
    currentPath: "/",
    previousPath: undefined,
    isLoginRoute: false,
    ...obj
  };
  vi.spyOn(toMock, "useNavigationState").mockImplementation(() => mocked);
  return mocked;
}

export function mockNavigateTo() {
  return vi.fn();
}

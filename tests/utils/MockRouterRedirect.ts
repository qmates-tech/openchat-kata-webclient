import * as toMock from 'react-router-dom';
import { vi } from 'vitest';

export function mockRouterRedirect(redirectFunction?: toMock.RedirectFunction) {
  const defaultRedirectFunction = () => ({
    headers: new Headers(),
    ok: true,
    redirected: false,
    status: 200,
  } as Response)

  return vi.spyOn(toMock, "redirect").mockImplementation(redirectFunction || defaultRedirectFunction)
}
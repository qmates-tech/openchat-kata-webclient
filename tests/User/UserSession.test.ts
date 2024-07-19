import { act, renderHook, waitFor } from '@testing-library/react';
import { User } from '../../src/User/User';
import { useUserSession } from '../../src/User/UserSessionState';
import { wrapWithUserSession } from '../utils/renderHelpers';

describe('User Session', () => {
  const anUser: User = { id: "123", username: "alessio", about: "About Alessio" };

  beforeEach(() => {
    localStorage.clear();
  });

  it('throw error if it is used outside its Provider', async () => {
    suppressConsoleErrors();

    expect(() => renderHook(useUserSession))
      .toThrowError('useUserSession must be used within a UserSessionProvider');
  });

  it('save to the localstorage on login', async () => {
    const { result } = renderHook(() => useUserSession(), wrapWithUserSession());

    act(() => result.current.setUserSession(anUser));

    await waitFor(() => {
      expect(localStorage.getItem("openChatSession")).toStrictEqual(JSON.stringify(anUser));
      expect(result.current.currentUser).toStrictEqual(anUser);
    });
  });

  it('clear the user state and the localstorage on logout', async () => {
    localStorage.setItem("openChatSession", JSON.stringify(anUser));
    const { result } = renderHook(() => useUserSession(), wrapWithUserSession());

    act(() => result.current.setUserSession(undefined));

    await waitFor(() => {
      expect(localStorage.getItem("openChatSession")).toBeNull();
      expect(result.current.currentUser).toStrictEqual(undefined);
    });
  });

  it('retrieve the user session from localStorage on init', async () => {
    localStorage.setItem("openChatSession", JSON.stringify(anUser));

    const { result } = renderHook(() => useUserSession(), wrapWithUserSession());

    await waitFor(() => {
      expect(result.current.currentUser).toStrictEqual(anUser);
    });
  });
});

function suppressConsoleErrors() {
  vi.spyOn(console, 'error').mockImplementation(() => { });
}


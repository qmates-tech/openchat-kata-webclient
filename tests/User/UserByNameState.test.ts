import { renderHook, waitFor } from '@testing-library/react';
import { User } from '../../src/User/User';
import { GetUserAPIException } from '../../src/User/UsersAPI';
import { useUsersByName } from '../../src/User/UsersByNameState';
import { failsWith, succeedWith } from '../utils/MockAPIResponse';
import { mockUsersAPI } from '../utils/MockUsersAPI';

describe('UserByNameState', () => {
  const anUser: User = { id: "123", username: "user-name", about: "About Alessio" };

  it('should retrieve all users at the hook initialization', async () => {
    const api = mockUsersAPI();

    renderHook(() => useUsersByName("user-name", api));

    await waitFor(() => expect(api.allUsersByName).toHaveBeenCalled());
  });

  it('should update the user state when the user is retrieved successfully', async () => {
    const api = mockUsersAPI({ allUsersByName: succeedWith([anUser]) });

    const { result } = renderHook(() => useUsersByName("user-name", api));

    await waitFor(() => expect(result.current.users).toEqual([anUser]));
  });

  it(`should set loading status to false when API succeeded`, async () => {
    const api = mockUsersAPI({ allUsersByName: succeedWith([anUser]) });
    const { result } = renderHook(() => useUsersByName("user-name", api));

    expect(result.current.retrieving).toBeTruthy();
    await waitFor(() => expect(result.current.retrieving).toBeFalsy());
  });

  it('should parse NETWORK_ERROR error from API', async () => {
    const api = mockUsersAPI({ allUsersByName: failsWith<GetUserAPIException>("NETWORK_ERROR") });

    const { result } = renderHook(() => useUsersByName("user-name", api));

    await waitFor(() => expect(result.current.users).toHaveLength(0));
    await waitFor(() => expect(result.current.error).toEqual("Network error"));
  });

  it('should parse ANY_OTHER error as Generic error from API', async () => {
    const api = mockUsersAPI({ allUsersByName: failsWith<GetUserAPIException>("ANY_OTHER") });

    const { result } = renderHook(() => useUsersByName("user-name", api));

    await waitFor(() => expect(result.current.users).toHaveLength(0));
    await waitFor(() => expect(result.current.error).toEqual("Generic error"));
  });
});


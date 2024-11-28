import { renderHook, waitFor } from '@testing-library/react';
import { GetUserAPIException } from '../../src/User/UsersAPI';
import { User } from '../../src/User/User';
import { useUserById } from '../../src/User/UserByIdState';
import { failsWith, succeedWith } from '../utils/MockAPIResponse';
import { mockUsersAPI } from '../utils/MockUsersAPI';

describe('UserByIdState', () => {
  const anUser: User = { id: "123", username: "alessio", about: "About Alessio" };

  it('should retrieve the user by id at the hook initialization', async () => {
    const api = mockUsersAPI();

    renderHook(() => useUserById("user-id", api));

    await waitFor(() => expect(api.getUser).toHaveBeenCalledWith("user-id"));
  });

  it('should update the user state when the user is retrieved successfully', async () => {
    const api = mockUsersAPI({ getUser: succeedWith(anUser) });

    const { result } = renderHook(() => useUserById("user-id", api));

    await waitFor(() => expect(result.current.user).toEqual(anUser));
  });

  it(`should set loading status to false when API succeeded`, async () => {
    const api = mockUsersAPI({ getUser: succeedWith(anUser) });
    const { result } = renderHook(() => useUserById("user-id", api));

    expect(result.current.retrieving).toBeTruthy();
    await waitFor(() => expect(result.current.retrieving).toBeFalsy());
  });

  it('should parse USER_NOT_FOUND error from API', async () => {
    const api = mockUsersAPI({ getUser: failsWith<GetUserAPIException>("USER_NOT_FOUND") });

    const { result } = renderHook(() => useUserById("user-id", api));

    await waitFor(() => expect(result.current.user).toBeUndefined());
    await waitFor(() => expect(result.current.error).toEqual("User not found"));
  });

  it('should parse NETWORK_ERROR error from API', async () => {
    const api = mockUsersAPI({ getUser: failsWith<GetUserAPIException>("NETWORK_ERROR") });

    const { result } = renderHook(() => useUserById("user-id", api));

    await waitFor(() => expect(result.current.user).toBeUndefined());
    await waitFor(() => expect(result.current.error).toEqual("Network error"));
  });

  it('should parse ANY_OTHER error as Generic error from API', async () => {
    const api = mockUsersAPI({ getUser: failsWith<GetUserAPIException>("ANY_OTHER") });

    const { result } = renderHook(() => useUserById("user-id", api));

    await waitFor(() => expect(result.current.user).toBeUndefined());
    await waitFor(() => expect(result.current.error).toEqual("Generic error"));
  });
});


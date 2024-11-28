import { useEffect, useState } from "react";
import { createUsersAPI, UsersAPI, GetUserAPIException } from "./UsersAPI";
import { User } from "./User";

const getUserAPI = createUsersAPI();

export type UserByIdError =
  'User not found'
  | 'Network error'
  | 'Generic error'

export type UserByIdState = {
  retrieving: boolean;
  error: UserByIdError | undefined;
  user: User | undefined;
}

export function useUserById(userId: string | undefined, API: UsersAPI = getUserAPI): UserByIdState {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [retrieving, setRetrieving] = useState<boolean>(true);
  const [error, setError] = useState<UserByIdError | undefined>();

  useEffect(() => {
    API.getUser(userId!)
      .then(setUser)
      .catch((e) => {
        setError(parseGetUserAPIError(e));
      })
      .finally(() => setRetrieving(false))
  }, [userId, API]);

  return {
    retrieving,
    error,
    user
  };
}

function parseGetUserAPIError(error: GetUserAPIException): UserByIdError {
  switch (error) {
    case "USER_NOT_FOUND":
      return "User not found";
    case "NETWORK_ERROR":
      return "Network error";
    default:
      return "Generic error";
  }
}

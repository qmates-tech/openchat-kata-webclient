import { useEffect, useState } from "react";
import { User } from "./User";
import { AllUsersByNameAPIException, createUsersAPI, UsersAPI } from "./UsersAPI";

const searchUserAPI = createUsersAPI();

export type UsersByNameError = 'Network error' | 'Generic error'

export type SearchUsersState = {
  retrieving: boolean;
  error: UsersByNameError | undefined;
  users: User[];
}

export function useUsersByName(userName: string, API: UsersAPI = searchUserAPI): SearchUsersState {
  const [users, setUsers] = useState<User[]>([]);
  const [retrieving, setRetrieving] = useState<boolean>(true);
  const [error, setError] = useState<UsersByNameError | undefined>();

  useEffect(() => {
    API.allUsersByName(userName!)
      .then(setUsers)
      .catch((e) => {
        setError(parseGetUserAPIError(e));
      })
      .finally(() => setRetrieving(false))
  }, [userName, API]);

  return {
    retrieving,
    error,
    users
  };
}

function parseGetUserAPIError(error: AllUsersByNameAPIException): UsersByNameError {
  switch (error) {
    case "NETWORK_ERROR":
      return "Network error";
    default:
      return "Generic error";
  }
}
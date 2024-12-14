import { User } from "./User";
import { createUsersAPI, UsersAPI } from "./UsersAPI";

const searchUserAPI = createUsersAPI();

export type UsersByNameError = 'Network error' | 'Generic error'

export type SearchUsersState = {
  retrieving: boolean;
  error: UsersByNameError | undefined;
  users: User[];
}

// TODO: Implement useUsersByName
export function useUsersByName(userName: string, API: UsersAPI = searchUserAPI): SearchUsersState {
  return {
    retrieving: false,
    error: 'Generic error',
    users: []
  };
}

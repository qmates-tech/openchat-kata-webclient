import { Env } from "../Env";
import { getRequest } from "../helpers/http";
import { User } from "./User";

export type GetUserAPIException = "USER_NOT_FOUND" | "NETWORK_ERROR";
export type AllUsersByNameAPIException = "NETWORK_ERROR";
export type UsersAPI = {
  getUser(userId: User["id"]): Promise<User>;
  allUsersByName(username: User["username"]): Promise<User[]>;
}

export function createUsersAPI(baseUrl: string = Env.loginUrl): UsersAPI {
  return {
    async getUser(userId: User["id"]): Promise<User> {
      const users = await allUsers()
      const found = users.find(user => user.id === userId);

      if (!found) throw "USER_NOT_FOUND";
      return found;
    },
    async allUsersByName(username: User["username"]): Promise<User[]> {
      const users = await allUsers()
      return users.filter(user => user.username.includes(username));
    },
  }

  async function allUsers(): Promise<User[]> {
    const response = await getRequest(`${baseUrl}/users`);
    return await response.json();
  }
}


import { Env } from "../Env";
import { User } from "../User/User";
import { NetworkError, postRequest } from "../helpers/http.ts";

export type LoginAPIException = "INVALID_CREDENTIALS" | NetworkError;
export type LoginAPI = {
  login(username: string, password: string): Promise<User>;
}

export function createLoginAPI(baseUrl: string = Env.loginUrl): LoginAPI {
  return {
    async login(username: string, password: string): Promise<User> {
      const response = await postRequest(`${baseUrl}/login`, {
        username: username,
        password: password
      });

      if (!response.ok) {
        throw "INVALID_CREDENTIALS";
      }

      const responseBody = await response.json();
      return {
        id: responseBody.id,
        username: responseBody.username,
        about: responseBody.about
      }
    }
  }
}

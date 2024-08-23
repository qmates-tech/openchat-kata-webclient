import { Env } from "../Env";
import { User } from "../User/User";
import { NetworkError, postRequest } from "../helpers/http.ts";

export type RegistrationAPIException = "USERNAME_ALREADY_IN_USE" | NetworkError;
export type RegistrationAPI = {
  register(username: string, password: string, about: string): Promise<User>;
}

export function createRegistrationAPI(baseUrl: string = Env.loginUrl): RegistrationAPI {
  return {
    async register(username: string, password: string, about: string): Promise<User> {
      const response = await postRequest(`${baseUrl}/users`, {
        username: username,
        password: password,
        about: about
      });

      if (!response.ok) {
        throw "USERNAME_ALREADY_IN_USE";
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

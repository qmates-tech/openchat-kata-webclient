import { Env } from "../Env";
import { User } from "../User/User";

export type RegistrationAPIException = "USERNAME_ALREADY_IN_USE" | "NETWORK_ERROR";
export type RegistrationAPI = {
  register(username: string, password: string, about: string): Promise<User>;
}

export function createRegistrationAPI(baseUrl: string = Env.loginUrl): RegistrationAPI {
  return {
    async register(username: string, password: string, about: string): Promise<User> {
      const response = await post('/users', {
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

  async function post(route: string, jsonBody: any) {
    try {
      return await fetch(baseUrl + route, {
        method: 'POST',
        body: JSON.stringify(jsonBody)
      });
    } catch (e) {
      throw "NETWORK_ERROR";
    }
  }
}

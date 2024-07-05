import { User } from "../User/User";

export type LoginAPIException = "INVALID_CREDENTIALS" | "NETWORK_ERROR";
export type LoginAPI = {
  login(username: string, password: string): Promise<User>;
}

export function createLoginAPI(baseUrl: string): LoginAPI {
  return {
    async login(username: string, password: string): Promise<User> {
      const response = await post('/login', {
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

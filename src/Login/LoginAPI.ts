import { Env } from "../Env";
import { User } from "../User/User";

export type LoginAPIException = "INVALID_CREDENTIALS" | "NETWORK_ERROR";
export type LoginAPI = {
  login(username: string, password: string): Promise<User>;
}

export function createLoginAPI(baseUrl: string = Env.loginUrl): LoginAPI {
  return {
    async login(username: string, password: string): Promise<User> {
      if (username === "correct" && password === "right") {
        return Promise.resolve({ id: "1", username: "John Doe", about: "Hi there! I'm the administrator here.\nI've been in administration for over 15 years and I love what I do.\nMy goal is to create a positive, supportive environment where everyone can thrive. I believe in teamwork and open communication. Feel free to come to me with anything - I'm here to listen, help out, and support you.\nExcellence is a core value. I'm always looking to improve and deliver great results. At the same time, I know perfection isn't possible, and I'll be there for you through the ups and downs.\nOutside of work, you can find me playing Ice Hockey. I also enjoy giving back to the community through Extreme Programming User Groups.\nI'm grateful to be part of this team, and I can't wait to see what we accomplish together.\nLet me know if you ever need anything!" });
      }
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

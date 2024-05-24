import { createLoginAPIGateway } from "./LoginAPIGateway"
import { User } from "./User"

export default function () {

  const loginAPIGateway = createLoginAPIGateway('http://localhost:4321')

  return {
    tryLogin: async (username: string, password: string): Promise<User> => {
      // should the humble object convert errors from api gateway?
      return await loginAPIGateway.login(username, password)
    }
  }
}

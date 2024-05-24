import { User } from "./User"

// could be an enum ?
export const INVALID_CREDENTIALS_ERRORVALUE = "INVALID_CREDENTIALS"
export const NETWORK_ERROR_ERRORVALUE = "NETWORK_ERROR"

export function createLoginAPIGateway(baseUrl: string) {

  return {
    async login(username: string, password: string): Promise<User> {
      let response = await post('/login', {
        username: username,
        password: password
      })

      if (!response.ok)
        throw INVALID_CREDENTIALS_ERRORVALUE

      const responseBody = await response.json()
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
      })
    } catch (e) {
      throw NETWORK_ERROR_ERRORVALUE
    }
  }

}

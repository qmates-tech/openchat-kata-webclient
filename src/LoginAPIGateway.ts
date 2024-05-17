type LoginError = "INVALID_CREDENTIALS" | "NETWORK_ERROR"
type UUID = string

type User = {
  readonly id: UUID,
  readonly username: string,
  readonly about: string
}

export function createLoginAPIGateway(baseUrl: string) {

  return {
    async login(username: string, password: string): Promise<User> {
      const response = await fetch(baseUrl + '/login', {
        method: 'POST',
        body: JSON.stringify({
          username: username,
          password: password
        })
      })

      if (!response.ok) {
        throw new Error("INVALID_CREDENTIALS");
      }

      const responseBody = await response.json()
      return {
        id: responseBody.id,
        username: responseBody.username,
        about: responseBody.about
      }
    }
  }
}

type LoginError = "INVALID_CREDENTIALS" | "NETWORK_ERROR"
type UUID = string

type User = {
  readonly id: UUID,
  readonly username: string,
  readonly about: string
}

export function createLoginAPIGateway() {

  return {
    login(username: string, password: string): User {
      if(username == 'alessio89')
        return {
          "id": "599dd5eb-fdea-4472-8baf-81ef7c18a2f1",
          "username": "alessio89",
          "about": "About Alessio user."
        }

      throw new Error("INVALID_CREDENTIALS");
    }
  }
}
